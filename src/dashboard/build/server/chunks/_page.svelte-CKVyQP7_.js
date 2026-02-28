import { p as push, b as attr, d as store_get, u as unsubscribe_stores, a as pop } from './index-7U-6WjDo.js';
import { b as base } from './paths-DEXY_3zL.js';
import { p as page } from './stores-CEFs9okW.js';
import './escaping-CqgfEcN3.js';
import './client-BY__J2mj.js';
import './exports-DdSQfVyA.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1 class="m-4 text-center text-4xl font-bold">Feedback</h1> <div class="mx-auto my-8 max-w-lg text-center"><div class="my-8"><img${attr("src", `${base}/assets/undraw_reviews.svg`)} alt="Reviews illustration" width="70%" height="auto" class="mx-auto"></div> <div class="my-8 text-lg font-semibold"><a${attr("href", `${base}/${store_get($$store_subs ??= {}, "$page", page).params.guild}/feedback`)} class="transition duration-300 hover:text-blurple">View feedback in the portal <i class="fa-solid fa-arrow-right-long"></i></a></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CKVyQP7_.js.map
