import * as Bus from "./bus.js";
import * as Widget from "./objects/widget/widget.js";
import * as State from "./state/state.js";
import * as UI from "./ui/ui.js";
import * as Selector from "./objects/selector/selector.js";

const $openBtn = document.querySelector(".open-widget-btn");
const $closeBtn = document.querySelector(".close-widget-btn");
const $toggleSelectorBtn = document.querySelector(".toggle-selector-btn");

function init() {
  const state = State.createState();
  UI.init();
  addListeners(state);
};

/**
 * @param {State} state 
 */
function addListeners(state) {
  $openBtn.addEventListener('click', function() {
    Widget.toggle(state);
    Bus.publish('open-widget', {});
  });

  $closeBtn.addEventListener('click', function() {
    Widget.toggle(state);
    Bus.publish('close-widget', {});
  });
  $toggleSelectorBtn.addEventListener('click', function() {
    Selector.toggle(state);
    Bus.publish('toggle-selector', { isActive: state.widget.selector.isActive });
  });
};

init();
