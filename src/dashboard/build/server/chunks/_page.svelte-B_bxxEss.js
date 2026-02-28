import { p as push, h as head, b as attr, d as store_get, u as unsubscribe_stores, a as pop } from './index-7U-6WjDo.js';
import { p as page } from './stores-CEFs9okW.js';
import { I as I18nLite } from './I18n-ChmA8YU3.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './client-BY__J2mj.js';
import './exports-DdSQfVyA.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data } = $$props;
  const { client, guild, translations } = data;
  const i18n = new I18nLite();
  const t = i18n.loadParsed(...translations).createTranslator();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(t("common:title", { guild: guild.name, client: client.username }))}</title>`;
  });
  $$payload.out += `<div>`;
  if (guild.privilegeLevel > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="w-full bg-dgrey-400 p-1 text-xs dark:bg-dgrey-950"><div class="container mx-auto"><div class="flex justify-center gap-8"><a${attr("href", `/${store_get($$store_subs ??= {}, "$page", page).params.guild}/staff`)} class="rounded-md bg-dgrey-900/10 px-2 py-1 text-dgrey-700 duration-300 hover:bg-dgrey-900/20 dark:bg-dgrey-400/10 dark:text-dgrey-400/75 dark:hover:bg-dgrey-400/20 hover:dark:text-dgrey-400/100"><div class="flex items-center gap-2"><i class="fa-solid fa-user-group"></i> ${escape_html(t("common:staff_dashboard"))}</div></a> `;
    if (guild.privilegeLevel >= 2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", `/settings/${guild.id}`)} class="rounded-md bg-dgrey-900/10 px-2 py-1 text-dgrey-700 duration-300 hover:bg-dgrey-900/20 dark:bg-dgrey-400/10 dark:text-dgrey-400/75 dark:hover:bg-dgrey-400/20 hover:dark:text-dgrey-400/100"><div class="flex items-center gap-2"><i class="fa-solid fa-gear"></i> ${escape_html(t("common:settings_panel"))}</div></a>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div>todo</div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B_bxxEss.js.map
