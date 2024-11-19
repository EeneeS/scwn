import * as Selector from "../selector/selector.js";

export function create(opts) {
  const widget = {
    isOpen: false,
    selector: Selector.create(),
  };
  return widget;
};

export function toggle(state) {
  state.isOpen = !state.isOpen;
};
