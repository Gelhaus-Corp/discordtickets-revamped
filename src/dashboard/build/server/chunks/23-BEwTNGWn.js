import { e as error } from './index2-DzcLzHBX.js';

async function load({ fetch, params }) {
  const response = await fetch(`/api/admin/guilds/${params.guild}/tags`);
  const isJSON = response.headers.get("Content-Type")?.includes("json");
  const body = isJSON ? await response.json() : await response.text();
  if (!response.ok) {
    error(response.status, isJSON ? JSON.stringify(body) : body);
  } else {
    return {
      tags: body
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 23;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BOpVxFZu.js')).default;
const universal_id = "src/routes/settings/[guild]/tags/+page.js";
const imports = ["_app/immutable/nodes/23.DwzxJx8H.js","_app/immutable/chunks/PD1Wq3xD.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DH41_4OW.js","_app/immutable/chunks/B4B08OCC.js","_app/immutable/chunks/D2WCpLRk.js","_app/immutable/chunks/BCej-IkM.js","_app/immutable/chunks/C1nl-272.js","_app/immutable/chunks/BU36I_Bd.js","_app/immutable/chunks/CEchPJ_u.js","_app/immutable/chunks/Jce5emvo.js","_app/immutable/chunks/DzrszLNB.js","_app/immutable/chunks/DzI3iajh.js","_app/immutable/chunks/y_msc5TT.js","_app/immutable/chunks/DiUvGWfG.js","_app/immutable/chunks/BTVoBDnD.js","_app/immutable/chunks/r2wwZTEc.js","_app/immutable/chunks/DyFsth0o.js","_app/immutable/chunks/D7lDQOeK.js","_app/immutable/chunks/DQMzYwo6.js","_app/immutable/chunks/B4RMsXsq.js","_app/immutable/chunks/DniPBx13.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DfHyukg_.js","_app/immutable/chunks/13u9z0kj.js","_app/immutable/chunks/DIt2gZ8Z.js","_app/immutable/chunks/CdBMWnb0.js","_app/immutable/chunks/BabSYDxt.js","_app/immutable/chunks/C5KiJ9nI.js","_app/immutable/chunks/D7lO7nIc.js","_app/immutable/chunks/B4GhYNxf.js"];
const stylesheets = ["_app/immutable/assets/23.BcU0FeOp.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=23-BEwTNGWn.js.map
