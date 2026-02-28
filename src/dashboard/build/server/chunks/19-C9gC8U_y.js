import { e as error } from './index2-DzcLzHBX.js';

async function load({ fetch, params }) {
  const fetchOptions = { credentials: "include" };
  let body;
  if (params.category === "new") {
    body = {
      channelName: "",
      claiming: false,
      description: "",
      discordCategory: "new",
      enableFeedback: false,
      emoji: "",
      image: "",
      memberLimit: 1,
      name: "",
      openingMessage: "",
      pingRoles: [],
      questions: [],
      ratelimit: null,
      requiredRoles: [],
      requireTopic: false,
      staffRoles: [],
      totalLimit: 50
    };
  } else {
    const response = await fetch(
      `/api/admin/guilds/${params.guild}/categories/${params.category}`,
      fetchOptions
    );
    const isJSON = response.headers.get("Content-Type")?.includes("json");
    body = isJSON ? await response.json() : await response.text();
    if (!response.ok) {
      error(response.status, isJSON ? JSON.stringify(body) : body);
    }
  }
  let url = `/api/admin/guilds/${params.guild}/categories`;
  if (params.category !== "new") url += `/${params.category}`;
  return {
    url,
    category: body,
    channels: await (await fetch(`/api/admin/guilds/${params.guild}/data?query=channels.cache`, fetchOptions)).json(),
    roles: await (await fetch(`/api/admin/guilds/${params.guild}/data?query=roles.cache`, fetchOptions)).json(),
    settings: await (await fetch(`/api/admin/guilds/${params.guild}/settings`, fetchOptions)).json()
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-jurd1hJ-.js')).default;
const universal_id = "src/routes/settings/[guild]/categories/[category]/+page.js";
const imports = ["_app/immutable/nodes/19.DX0Fe2Zd.js","_app/immutable/chunks/PD1Wq3xD.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DH41_4OW.js","_app/immutable/chunks/B4B08OCC.js","_app/immutable/chunks/D2WCpLRk.js","_app/immutable/chunks/BCej-IkM.js","_app/immutable/chunks/C1nl-272.js","_app/immutable/chunks/BU36I_Bd.js","_app/immutable/chunks/13u9z0kj.js","_app/immutable/chunks/CEchPJ_u.js","_app/immutable/chunks/Jce5emvo.js","_app/immutable/chunks/DzI3iajh.js","_app/immutable/chunks/BdT_oPZe.js","_app/immutable/chunks/y_msc5TT.js","_app/immutable/chunks/DiUvGWfG.js","_app/immutable/chunks/BTVoBDnD.js","_app/immutable/chunks/r2wwZTEc.js","_app/immutable/chunks/DQMzYwo6.js","_app/immutable/chunks/DEn2hETk.js","_app/immutable/chunks/5EBxWskT.js","_app/immutable/chunks/Cpj98o6Y.js","_app/immutable/chunks/DSwvs_u7.js","_app/immutable/chunks/DfHyukg_.js","_app/immutable/chunks/DzrszLNB.js","_app/immutable/chunks/C6RyfrLQ.js","_app/immutable/chunks/DyFsth0o.js","_app/immutable/chunks/D7lDQOeK.js","_app/immutable/chunks/B4RMsXsq.js","_app/immutable/chunks/DniPBx13.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Cd4xBISH.js","_app/immutable/chunks/BPwLybW9.js","_app/immutable/chunks/CdBMWnb0.js","_app/immutable/chunks/B4GhYNxf.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=19-C9gC8U_y.js.map
