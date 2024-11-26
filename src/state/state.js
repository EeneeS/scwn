import * as Widget from "../objects/widget/widget.js";

/**
 * @param {Options} opts 
 * @returns {State}
 */
export function createState(opts) {
  const state = {
    widget: Widget.createWidget(),
    options: opts,
    projectId: null,
  };
  return state;
};
