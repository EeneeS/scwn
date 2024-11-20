import * as Widget from "../objects/widget/widget.js";

/**
 * @returns {State}
 */
export function createState() {
  const state = {
    widget: Widget.createWidget(),
    // TODO: add history to keep track what has been changed.
  };
  return state;
};
