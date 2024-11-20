import * as Selector from "../selector/selector.js";
import * as Editor from "../editor/editor.js";

/**
 * @returns {Widget}
 */
export function createWidget() {
  const widget = {
    isOpen: false,
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
}
