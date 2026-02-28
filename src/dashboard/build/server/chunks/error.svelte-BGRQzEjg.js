import { e as escape_html } from './escaping-CqgfEcN3.js';
import { p as push, g as getContext, a as pop } from './index-7U-6WjDo.js';
import { s as stores } from './client-BY__J2mj.js';
import './exports-DdSQfVyA.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-BGRQzEjg.js.map
