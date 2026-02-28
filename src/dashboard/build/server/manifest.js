const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/topgg-dark.webp","assets/topgg-light.webp","assets/undraw_reviews.svg","assets/wordmark-dark.png","assets/wordmark-light.png","favicon.png"]),
	mimeTypes: {".webp":"image/webp",".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CY4Y8nvl.js",app:"_app/immutable/entry/app.IltRqKv1.js",imports:["_app/immutable/entry/start.CY4Y8nvl.js","_app/immutable/chunks/D7lDQOeK.js","_app/immutable/chunks/DQMzYwo6.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BTVoBDnD.js","_app/immutable/chunks/B4RMsXsq.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/entry/app.IltRqKv1.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DEn2hETk.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DH41_4OW.js","_app/immutable/chunks/B4B08OCC.js","_app/immutable/chunks/D2WCpLRk.js","_app/immutable/chunks/BCej-IkM.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/C1nl-272.js","_app/immutable/chunks/CdBMWnb0.js","_app/immutable/chunks/y_msc5TT.js","_app/immutable/chunks/DiUvGWfG.js","_app/immutable/chunks/BTVoBDnD.js","_app/immutable/chunks/C6RyfrLQ.js","_app/immutable/chunks/DQMzYwo6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-XvlmiIY3.js')),
			__memo(() => import('./chunks/1-wjOBrq5X.js')),
			__memo(() => import('./chunks/2-BWYPIbi-.js')),
			__memo(() => import('./chunks/3-D5lWuRue.js')),
			__memo(() => import('./chunks/4-DYjQAp5v.js')),
			__memo(() => import('./chunks/5-DvX6LXpH.js')),
			__memo(() => import('./chunks/6-B32Z1cYJ.js')),
			__memo(() => import('./chunks/7--1iLpmKT.js')),
			__memo(() => import('./chunks/8-LCHn45TI.js')),
			__memo(() => import('./chunks/9-Ct2zUE6c.js')),
			__memo(() => import('./chunks/10-oL0i413W.js')),
			__memo(() => import('./chunks/11-Dqc9VmnX.js')),
			__memo(() => import('./chunks/12-CO3SVPP0.js')),
			__memo(() => import('./chunks/13-CmSZi0Ds.js')),
			__memo(() => import('./chunks/14-B6Wr0C1y.js')),
			__memo(() => import('./chunks/15-BjZjgD05.js')),
			__memo(() => import('./chunks/16-CAffHYUN.js')),
			__memo(() => import('./chunks/17-Dq1Vj4qC.js')),
			__memo(() => import('./chunks/18-CTqP1i1l.js')),
			__memo(() => import('./chunks/19-C9gC8U_y.js')),
			__memo(() => import('./chunks/20-D7xJxJm-.js')),
			__memo(() => import('./chunks/21-BO7rMmr1.js')),
			__memo(() => import('./chunks/22-DCUKJ1o4.js')),
			__memo(() => import('./chunks/23-BEwTNGWn.js'))
		],
		routes: [
			{
				id: "/(default)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(default)/invite",
				pattern: /^\/invite\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(default)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,6,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/settings/[guild]",
				pattern: /^\/settings\/([^/]+?)\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,], errors: [1,6,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/categories",
				pattern: /^\/settings\/([^/]+?)\/categories\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/categories/[category]",
				pattern: /^\/settings\/([^/]+?)\/categories\/([^/]+?)\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false},{"name":"category","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/feedback",
				pattern: /^\/settings\/([^/]+?)\/feedback\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/general",
				pattern: /^\/settings\/([^/]+?)\/general\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/panels",
				pattern: /^\/settings\/([^/]+?)\/panels\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/settings/[guild]/tags",
				pattern: /^\/settings\/([^/]+?)\/tags\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,5,7,], errors: [1,6,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(default)/view/[ticket]",
				pattern: /^\/view\/([^/]+?)\/?$/,
				params: [{"name":"ticket","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(default)/[guild]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,4,], errors: [1,3,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(default)/[guild]/feedback",
				pattern: /^\/([^/]+?)\/feedback\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,4,], errors: [1,3,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(default)/[guild]/staff",
				pattern: /^\/([^/]+?)\/staff\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,4,], errors: [1,3,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(default)/[guild]/tickets",
				pattern: /^\/([^/]+?)\/tickets\/?$/,
				params: [{"name":"guild","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,4,], errors: [1,3,,], leaf: 15 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
