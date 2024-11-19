import * as Widget from "../objects/widget/widget.js";

export function createState(opts) {
  const state = {
    widget: Widget.createWidget(opts),
  };
  return state;
};
