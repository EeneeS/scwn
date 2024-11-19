import * as Widget from "../objects/widget/widget.js";

/**
 * @returns {State}
 */
export function createState() {
  const state = {
    widget: Widget.createWidget(),
  };
  return state;
};
