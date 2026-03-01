const { logAdminEvent } = require('../../../../../lib/logging.js');

module.exports.get = fastify => ({
	handler: async req => {
		/** @type {import('client')} */
		const client = req.routeOptions.config.client;
		const id = req.params.guild;
		const guild = await client.prisma.guild.findUnique({
			where: { id },
			select: {
				botAvatar: true,
				botBio: true,
				botBanner: true,
				botUsername: true,
			},
		});

		if (!guild) {
			return {
				botAvatar: null,
				botBio: null,
				botBanner: null,
				botUsername: null,
			};
		}

		return guild;
	},
	onRequest: [fastify.authenticate, fastify.isAdmin],
});

module.exports.patch = fastify => ({
	handler: async req => {
		const data = req.body;
		const allowedFields = ['botAvatar', 'botBio', 'botBanner', 'botUsername'];
		const filteredData = {};

		for (const field of allowedFields) {
			if (Object.prototype.hasOwnProperty.call(data, field)) {
				filteredData[field] = data[field];
			}
		}

		/** @type {import('client')} */
		const client = req.routeOptions.config.client;
		const id = req.params.guild;
		const original = await client.prisma.guild.findUnique({
			where: { id },
			select: {
				botAvatar: true,
				botBio: true,
				botBanner: true,
				botUsername: true,
			},
		});

		const customization = await client.prisma.guild.update({
			data: filteredData,
			where: { id },
			select: {
				botAvatar: true,
				botBio: true,
				botBanner: true,
				botUsername: true,
			},
		});

		// Apply customization to the bot in the guild if avatar or username is set
		try {
			const guild = client.guilds.cache.get(id);
			if (guild) {
				const botMember = await guild.members.fetchMe();

				// Set custom nickname for the guild
				if (filteredData.botUsername) {
					await botMember.setNickname(filteredData.botUsername);
				} else if (original?.botUsername) {
					await botMember.setNickname(null);
				}
			}
		} catch (error) {
			client.log.warn(`Failed to apply bot customization to guild ${id}: ${error.message}`);
		}

		logAdminEvent(client, {
			action: 'update',
			diff: {
				original,
				updated: customization,
			},
			guildId: id,
			target: {
				id,
				name: client.guilds.cache.get(id)?.name || id,
				type: 'customization',
			},
			userId: req.user.id,
		});

		return customization;
	},
	onRequest: [fastify.authenticate, fastify.isAdmin],
});
