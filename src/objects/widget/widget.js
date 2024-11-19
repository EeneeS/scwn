import * as Selector from "../selector/selector.js";

/**
 * @returns {Widget}
 */
export function createWidget() {
  const widget = {
    isOpen: false,
    selector: Selector.createSelector(),
  };
  return widget;
};

export function toggle(state) {
  state.isOpen = !state.isOpen;
};
