import * as Selector from "../selector/selector.js";
import * as Editor from "../editor/editor.js";
import * as Bus from "../../bus.js";

/**
 * @returns {Widget}
 */
export function createWidget() {
  const widget = {
    isOpen: false,
    historyOpen: false,
    selector: Selector.createSelector(),
    editor: Editor.createEditor(),
  };
  return widget;
};

/**
 * @param {State} state
 */
export function toggle(state) {
  state.widget.isOpen = !state.widget.isOpen;
  Bus.publish('toggle-widget', {});
}

/**
 * @param {State} state
 */
export function toggleHistory(state) {
  state.widget.historyOpen = !state.widget.historyOpen;
  Bus.publish("toggle-history", { isActive: state.widget.historyOpen });
}
