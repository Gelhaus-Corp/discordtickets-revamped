const { PermissionFlagsBits, Routes } = require('discord.js');

module.exports.patch = fastify => ({
	handler: async req => {
		const data = req.body ?? {};
		const filteredData = validateCustomization(data);
		const client = req.routeOptions.config.client;
		const id = req.params.guild;

		// 1. Update DB first
		const customization = await client.prisma.guild.upsert({
			create: { id, ...filteredData },
			update: filteredData,
			where: { id },
			select: { botAvatar: true, botBio: true, botUsername: true },
		});

		// 2. Prep Discord REST body (use Routes.guildMember to PATCH /guilds/:guild/members/@me)
		const body = {};
		if (typeof filteredData.botUsername === 'string') body.nick = filteredData.botUsername || null;
		if (typeof filteredData.botAvatar === 'string') body.avatar = filteredData.botAvatar; // expect data URI
		if (filteredData.botAvatar === null) body.avatar = null;

		const guild = client.guilds.cache.get(id);
		if (guild) {
			try {
				const me = guild.members.me || await guild.members.fetch(client.user.id);
				client.log.info('Bot user id: ' + client.user.id);
				client.log.info('Guild id: ' + id);
				client.log.info('Bot highest role position: ' + (me.roles?.highest?.position ?? 'unknown'));

				// Permission check for changing nickname
				const canChangeNick = me.permissions?.has(PermissionFlagsBits.ChangeNickname);
				client.log.info('Has CHANGE_NICKNAME: ' + !!canChangeNick);
				if (body.nick && !canChangeNick) {
					client.log.warn('Bot lacks CHANGE_NICKNAME — nickname update may fail');
				}

				// Use REST PATCH for the guild member @me endpoint for more explicit control
				const url = Routes.guildMember(id, '@me');
				const res = await client.rest.patch(url, { body });
				client.log.info(`[SUCCESS] Guild member @me patched for ${id}`);
				// If banner or global avatar/bio changes are present, attempt user-level patch
				if (typeof filteredData.botBanner === 'string' || filteredData.botBanner === null) {
					const userBody = {};
					if (typeof filteredData.botBanner === 'string') userBody.banner = filteredData.botBanner;
					if (filteredData.botBanner === null) userBody.banner = null;
					try {
						await client.rest.patch(Routes.user(client.user.id), { body: userBody });
						client.log.info(`[SUCCESS] User-level profile patched (banner) for ${client.user.id}`);
					} catch (userErr) {
						client.log.error('[DISCORD USER PATCH ERROR] ' + (userErr?.message || userErr));
					}
				}

				// return REST result when successful
				return res;
			} catch (error) {
				client.log.error('[DISCORD ERROR] Failed to update guild member @me: ' + (error?.message || error));
				if (error?.status) client.log.error('HTTP status: ' + error.status);
				if (error?.code) client.log.error('Discord API code: ' + error.code);
				if (error?.body) client.log.error('Error body: ' + JSON.stringify(error.body));
				// Fall through — we already updated DB, return stored customization below
			}
		}

		return customization;
	},
	onRequest: [fastify.authenticate, fastify.isAdmin],
});
