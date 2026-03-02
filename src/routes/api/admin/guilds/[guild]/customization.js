const { logAdminEvent } = require('../../../../../lib/logging.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE64_IMAGE_REGEX = /^data:(image\/(?:png|jpeg|jpg|webp|gif));base64,([A-Za-z0-9+/=]+)$/;
const MAX_IMAGE_BYTES = { botAvatar: 1024 * 1024 }; // 1MB

function getBase64ByteLength(base64) {
	const padding = base64.endsWith('==') ? 2 : (base64.endsWith('=') ? 1 : 0);
	return Math.floor((base64.length * 3) / 4) - padding;
}

function validateCustomization(data) {
	const validated = {};
	const allowedFields = ['botAvatar', 'botBio', 'botUsername'];

	for (const field of allowedFields) {
		if (!Object.prototype.hasOwnProperty.call(data, field)) continue;
		const value = data[field];

		if (value === null || value === '') {
			validated[field] = null;
			continue;
		}

		if (typeof value !== 'string') throw new Error(`${field} must be a string.`);

		if (field === 'botBio') {
			if (value.length > 500) throw new Error('botBio cannot exceed 500 characters.');
			validated[field] = value;
			continue;
		}

		if (field === 'botUsername') {
			if (value.length > 80) throw new Error('botUsername cannot exceed 80 characters.');
			validated[field] = value;
			continue;
		}

		const match = value.match(BASE64_IMAGE_REGEX);
		if (!match) throw new Error(`${field} must be a valid image Data URI.`);
		const imageSize = getBase64ByteLength(match[2]);
		if (imageSize > MAX_IMAGE_BYTES[field]) {
			throw new Error(`${field} exceeds 1MB.`);
		}
		validated[field] = value;
	}

	return validated;
}

module.exports.get = fastify => ({
	handler: async req => {
		const client = req.routeOptions.config.client;
		const id = req.params.guild;
		const guild = await client.prisma.guild.findUnique({
			where: { id },
			select: { botAvatar: true, botBio: true, botUsername: true },
		});

		return guild || { botAvatar: null, botBio: null, botUsername: null };
	},
	onRequest: [fastify.authenticate, fastify.isAdmin],
});

module.exports.patch = fastify => ({
	handler: async req => {
		const data = req.body ?? {};
		const filteredData = validateCustomization(data);
		const client = req.routeOptions.config.client;
		const id = req.params.guild;

		const original = await client.prisma.guild.findUnique({
			where: { id },
			select: { botAvatar: true, botBio: true, botUsername: true },
		});

		// 1. Update Database
		const customization = await client.prisma.guild.upsert({
			create: { id, ...filteredData },
			update: filteredData,
			where: { id },
			select: { botAvatar: true, botBio: true, botUsername: true },
		});

		// 2. Direct API Request to Discord
		const payload = {};
		if (filteredData.botUsername !== undefined) payload.nick = filteredData.botUsername;
		if (filteredData.botAvatar !== undefined) payload.avatar = filteredData.botAvatar;

		if (Object.keys(payload).length > 0) {
			try {
				// We use /members/@me which is the "Modify Current Member" endpoint.
				// This endpoint specifically requires the CHANGE_NICKNAME permission.
				const response = await fetch(`https://discord.com/api/v10/guilds/${id}/members/@me`, {
					method: 'PATCH',
					headers: {
						'Authorization': `Bot ${client.token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					const errorData = await response.json();
					// Log the JSON error—it will contain a "code" that tells us the exact issue
					client.log.error(`Discord API Reject: ${response.status} - ${JSON.stringify(errorData)}`);
				} else {
					client.log.info(`Direct API update successful for guild ${id}`);
				}
			} catch (error) {
				client.log.error(`Manual API request failed: ${error.message}`);
			}
		}

		logAdminEvent(client, {
			action: 'update',
			diff: {
				original: original ? { botBio: original.botBio, botUsername: original.botUsername } : null,
				updated: customization ? { botBio: customization.botBio, botUsername: customization.botUsername } : null,
			},
			guildId: id,
			target: { id, name: client.guilds.cache.get(id)?.name || id, type: 'customization' },
			userId: req.user.id,
		});

		return customization;
	},
	onRequest: [fastify.authenticate, fastify.isAdmin],
});
