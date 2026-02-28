import { p as push, d as store_get, u as unsubscribe_stores, a as pop } from './index-7U-6WjDo.js';
import { n as navigating } from './stores-CEFs9okW.js';
import { S as Spinner } from './Spinner-Cw5qBRbk.js';
import './escaping-CqgfEcN3.js';
import './client-BY__J2mj.js';
import './exports-DdSQfVyA.js';

function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children } = $$props;
  $$payload.out += `<div class="absolute h-max min-h-screen w-full bg-dgrey-100 text-dgrey-600 dark:bg-dgrey-800 dark:text-dgrey-300">`;
  if (store_get($$store_subs ??= {}, "$navigating", navigating) || true) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="h-dvh flex items-center justify-center">`;
    Spinner($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-Beox8tnQ.js.map
