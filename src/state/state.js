import * as Widget from "../objects/widget/widget.js";

/**
 * @param {Object} opts 
 * @returns {State}
 */
export function createState(opts) {
  const state = {
    widget: Widget.createWidget(),
    options: opts
    // TODO: add history to keep track what has been changed.
  };
  return state;
};
