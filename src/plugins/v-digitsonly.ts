import { Directive, DirectiveBinding, VNode } from "vue";
import { getNumCharacters, queryInputElementInside } from "@/helpers/index";

export const DigitsOnlyDirective: Directive = {
  mounted(el, binding, vnode) {
    const input = queryInputElementInside(el);

    input.addEventListener("keyup", (e) => {
      handler(e, vnode, input, binding);
    });
  },
  beforeUnmount(el, binding, vnode) {
    const input = queryInputElementInside(el);

    input.removeEventListener("keyup", (e) => {
      handler(e, vnode, input, binding);
    });
  },
};

function handler(e: KeyboardEvent, vnode: VNode, input: HTMLInputElement, binding?: DirectiveBinding<any>) {
  const newValue = getNumCharacters((e.target as HTMLInputElement).value, binding);
  input.value = newValue;

  if (!/^Digit/i.test(e.code)) {
    e.preventDefault();
    return;
  }

  queryInputElementInside(vnode.el)?.dispatchEvent(new CustomEvent("input"));
}
