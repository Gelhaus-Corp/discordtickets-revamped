import { _ as __variableDynamicImportRuntimeHelper } from './dynamic-import-helper-uMTE3ehW.js';
import { r as redirect } from './index2-DzcLzHBX.js';
import { i as importJSON } from './i18n-ue4QmWvy.js';

async function load({ parent, fetch }) {
  redirect(302, "/settings");
  const { locale } = await parent();
  const guilds = await (await fetch(`/api/guilds`)).json();
  if (guilds.length === 0) {
    redirect(302, "/settings");
  } else if (guilds.length === 1) {
    redirect(302, `/${guilds[0].id}`);
  }
  return {
    translations: importJSON(
      await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../lib/locales/en-GB/_common.json": () => import('./_common-BCxAG6Xd.js') }), `../../lib/locales/${locale}/_common.json`, 6),
      await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../lib/locales/en-GB/misc.json": () => import('./misc-Gf_O-cD6.js') }), `../../lib/locales/${locale}/misc.json`, 6)
    ),
    guilds
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uT_L6sEW.js')).default;
const universal_id = "src/routes/(default)/+page.js";
const imports = ["_app/immutable/nodes/8.CPMkevXZ.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DS7_lcac.js","_app/immutable/chunks/PD1Wq3xD.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DH41_4OW.js","_app/immutable/chunks/B4B08OCC.js","_app/immutable/chunks/D2WCpLRk.js","_app/immutable/chunks/BCej-IkM.js","_app/immutable/chunks/BU36I_Bd.js","_app/immutable/chunks/CEchPJ_u.js","_app/immutable/chunks/Jce5emvo.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=8-LCHn45TI.js.map
