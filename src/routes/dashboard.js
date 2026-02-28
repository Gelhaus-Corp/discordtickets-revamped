'use strict';

// Redirect /dashboard to /settings (keeps old links working)
module.exports.get = fastify => ({
	handler: async req => {
		return {
			statusCode: 302,
			headers: { location: '/settings' },
			body: ''
		};
	},
	onRequest: [fastify.authenticate]
});
