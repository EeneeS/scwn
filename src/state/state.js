import * as Widget from "../objects/widget/widget.js";

export function create(opts) {
  const state = {
    widget: Widget.create(opts),
  };
  return state;
};
