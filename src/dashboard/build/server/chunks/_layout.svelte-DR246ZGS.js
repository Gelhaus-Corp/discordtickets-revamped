import { e as escape_html } from './escaping-CqgfEcN3.js';

function _layout($$payload, $$props) {
  let { data, children } = $$props;
  const { guild } = data;
  $$payload.out += `<div class="text-center"><a href="./" class="link mb-4 inline-block rounded-xl bg-gray-50/75 p-2 px-4 font-medium text-gray-500 shadow-sm dark:bg-slate-800/75 dark:text-slate-400"><i class="fa-solid fa-arrow-left"></i> ${escape_html(guild.name)}</a></div> `;
  children?.($$payload);
  $$payload.out += `<!---->`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DR246ZGS.js.map
