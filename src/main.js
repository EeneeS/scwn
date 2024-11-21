import * as Bus from "./bus.js";
import * as Widget from "./objects/widget/widget.js";
import * as State from "./state/state.js";
import * as UI from "./ui/ui.js";
import * as Selector from "./objects/selector/selector.js";
import * as Editor from "./objects/editor/editor.js";

const $toggleWidgetBtn = document.querySelector(".open-widget-btn");
const $toggleSelectorBtn = document.querySelector(".toggle-selector-btn");
const $saveChangesBtn = document.querySelector(".save-editor-changes");

/**
 * @param {Object} opts 
 */
function init(opts) {
  const state = State.createState(opts);
  UI.init();
  addListeners(state);
};

/**
 * @param {State} state 
 */
function addListeners(state) {
  $toggleWidgetBtn.addEventListener('click', function() {
    Widget.toggle(state);
    Bus.publish('toggle-widget', {});
  });

  $toggleSelectorBtn.addEventListener('click', function() {
    Selector.toggle(state);
    Bus.publish('toggle-selector', { isActive: state.widget.selector.isActive });
  });

  $saveChangesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    Editor.publishChanges(state);
  });
};

export const version = "1.0.0";
export { init };

init({
  position: "bottom-right"
}); // for development
