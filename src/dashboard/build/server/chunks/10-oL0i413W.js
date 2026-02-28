import { _ as __variableDynamicImportRuntimeHelper } from './dynamic-import-helper-uMTE3ehW.js';
import { i as importJSON } from './i18n-ue4QmWvy.js';

async function load({ parent, url }) {
  const { locale } = await parent();
  return {
    translations: importJSON(
      await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../lib/locales/en-GB/_common.json": () => import('./_common-BCxAG6Xd.js') }), `../../../lib/locales/${locale}/_common.json`, 7),
      await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../lib/locales/en-GB/misc.json": () => import('./misc-Gf_O-cD6.js') }), `../../../lib/locales/${locale}/misc.json`, 7)
    ),
    query: url.search
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BCZsPgXQ.js')).default;
const universal_id = "src/routes/(default)/login/+page.js";
const imports = ["_app/immutable/nodes/10.DTJ2Zgy6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DS7_lcac.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/D0Xv9YzD.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DH41_4OW.js","_app/immutable/chunks/B4B08OCC.js","_app/immutable/chunks/D2WCpLRk.js","_app/immutable/chunks/BCej-IkM.js","_app/immutable/chunks/CEchPJ_u.js","_app/immutable/chunks/Jce5emvo.js","_app/immutable/chunks/DzrszLNB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=10-oL0i413W.js.map
