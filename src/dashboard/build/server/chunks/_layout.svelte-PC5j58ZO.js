import { p as push, h as head, a1 as ensure_array_like, a3 as once, s as setContext, a as pop, a4 as await_block, a5 as spread_props, d as store_get, u as unsubscribe_stores } from './index-7U-6WjDo.js';
import './index-CZvAxaSW.js';
import './index-B7gr3AnY.js';
import { n as navigating } from './stores-CEFs9okW.js';
import { S as Spinner } from './Spinner-Cw5qBRbk.js';
import './escaping-CqgfEcN3.js';
import './_commonjsHelpers-BFTU3MAI.js';
import './client-BY__J2mj.js';
import './exports-DdSQfVyA.js';

const key = Symbol("modal");
function setModal(modal) {
  setContext(key, modal);
}
function StackedModalContext($$payload, $$props) {
  push();
  const { modal, children } = $$props;
  setModal(modal);
  children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
class StackedModal extends EventTarget {
  static _idCounter = 0;
  _props;
  result = createDeferredPromise();
  id;
  component;
  modals;
  exitBeforeEnter = false;
  constructor(modals2, { id, component, props }) {
    super();
    this.id = id || (StackedModal._idCounter++).toString();
    this.component = component;
    this._props = props ?? {};
    this.modals = modals2;
  }
  #isOpen = once(() => {
    if (this.modals.stack.length === 0) {
      return false;
    }
    const isCurrent = this.modals.stack[this.modals.stack.length - 1].id === this.id;
    return isCurrent && !this.modals.transitioning;
  });
  get isOpen() {
    return this.#isOpen();
  }
  get index() {
    return this.modals.stack.indexOf(this);
  }
  get props() {
    return {
      ...this._props,
      id: this.id,
      index: this.index,
      isOpen: this.isOpen,
      close: this.close
    };
  }
  close = (...args) => {
    if (this.onBeforeClose?.() === false) {
      return false;
    }
    const value = args[0];
    this.dispatchEvent(new CustomEvent("close", { detail: value }));
    this.result.resolve(value);
    return true;
  };
  get promise() {
    return this.result.promise;
  }
  onBeforeClose;
}
function createDeferredPromise() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
class ModalStack {
  /**
   * The current stack of modals
   */
  stack = [];
  /**
   * The last action that was performed on the modals stack. This
   * can be useful for animations
   */
  action = null;
  /**
   * Whether we're currently waiting for transitions to finish
   * before opening the next modal
   */
  transitioning = false;
  /**
   * Opens a new modal
   */
  open = async (component, props, options) => {
    if (this.transitioning) {
      return;
    }
    if (options?.replace) {
      const closed = this.stack[this.stack.length - 1]?.close();
      if (!closed) {
        throw new Error("Current modal prevented closing");
      }
    }
    this.action = "push";
    const currentModal = this.stack[this.stack.length - 1];
    if (currentModal?.exitBeforeEnter) {
      this.transitioning = true;
    }
    const modal = new StackedModal(this, { id: options?.id, component, props });
    this.stack.push(modal);
    modal.addEventListener(
      "close",
      () => {
        if (modal.exitBeforeEnter) {
          this.transitioning = true;
        }
        if (this.stack.indexOf(modal) > -1) {
          this.stack.splice(this.stack.indexOf(modal), 1);
        }
        this.action = "pop";
      },
      { once: true }
    );
    return modal.promise;
  };
  /**
   * Closes the last `amount` of modals in the stack
   *
   * If closing was prevented by any modal it returns false
   */
  close = (amount = 1) => {
    if (typeof amount !== "number" || amount < 1) {
      throw new Error(`amount must be a number greater than 0. Received ${amount}`);
    }
    const closedModals = this.stack.slice(this.stack.length - amount).reverse();
    let closedAmount = 0;
    for (const modal of closedModals) {
      const closed = modal.close();
      if (!closed) {
        break;
      }
      closedAmount++;
    }
    return amount === closedAmount;
  };
  /**
   * Closes a modal by its id. Can be provided with `options.id` in modals.open(Comp, props, options)
   */
  closeById = (id) => {
    const modal = this.stack.find((modal2) => modal2.id === id);
    if (!modal) {
      return false;
    }
    return modal.close();
  };
  /**
   * Closes all modals in the stack.
   *
   * If closing was prevented by any modal, it returns false
   */
  closeAll = () => {
    return this.close(this.stack.length);
  };
}
const modals = new ModalStack();
function Modals($$payload, $$props) {
  push();
  function isLazyModal(component) {
    return typeof component.prototype === "undefined";
  }
  const { $$slots, $$events, ...props } = $$props;
  const each_array = ensure_array_like(modals.stack);
  if (modals.stack.length > 0) {
    $$payload.out += "<!--[-->";
    props.backdrop?.($$payload, modals);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let m = each_array[i];
    StackedModalContext($$payload, {
      modal: m,
      children: ($$payload2) => {
        if (isLazyModal(m.component)) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          await_block(
            m.component(),
            () => {
              props.loading?.($$payload2, modals);
              $$payload2.out += `<!---->`;
            },
            (component) => {
              if (props.modal) {
                $$payload2.out += "<!--[-->";
                props.modal($$payload2, { component: component.default, props: m.props }, modals);
                $$payload2.out += `<!---->`;
              } else {
                $$payload2.out += "<!--[!-->";
                $$payload2.out += `<!---->`;
                component.default($$payload2, spread_props([m.props]));
                $$payload2.out += `<!---->`;
              }
              $$payload2.out += `<!--]-->`;
            }
          );
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          if (props.modal) {
            $$payload2.out += "<!--[-->";
            props.modal($$payload2, { component: m.component, props: m.props }, modals);
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<!---->`;
            m.component($$payload2, spread_props([m.props]));
            $$payload2.out += `<!---->`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]-->`;
      }
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, children } = $$props;
  const { client, user, theme } = data;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Discord Tickets</title>`;
    $$payload2.out += `<link rel="icon" href="/favicon.png">`;
  });
  $$payload.out += `<div class="absolute h-max min-h-screen w-full bg-gray-200 dark:bg-slate-900">`;
  {
    let backdrop = function($$payload2, { close }) {
      $$payload2.out += `<div class="backdrop"></div>`;
    }, loading = function($$payload2) {
      $$payload2.out += `<div>`;
      Spinner($$payload2);
      $$payload2.out += `<!----></div>`;
    };
    Modals($$payload, {
      backdrop,
      loading,
      $$slots: { backdrop: true, loading: true }
    });
  }
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="text-gray-800 dark:text-slate-300">`;
  if (store_get($$store_subs ??= {}, "$navigating", navigating) || true) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex h-dvh items-center justify-center">`;
    Spinner($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-PC5j58ZO.js.map
