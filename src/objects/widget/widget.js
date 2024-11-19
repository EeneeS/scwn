import * as Selector from "../selector/selector.js";

export function createWidget(opts) {
  const widget = {
    isOpen: false,
    selector: Selector.createSelector(),
  };
  return widget;
};

export function toggle(state) {
  state.isOpen = !state.isOpen;
};
