import * as Bus from "./bus.js";
import * as Widget from "./objects/widget/widget.js";
import * as State from "./state/state.js";
import * as UI from "./ui/ui.js";

const $openBtn = document.querySelector(".open-widget-btn");
const $closeBtn = document.querySelector(".close-widget-btn");

function init() {

  const state = State.createState();
  UI.init();

  $openBtn.addEventListener('click', function() {
    Bus.publish('open-widget', {});
    Widget.toggle(state);
  });

  $closeBtn.addEventListener('click', function() {
    Bus.publish('close-widget', {});
    Widget.toggle(state);
  });

};

init();

// testing code
//Bus.listen('start-selector', function() {
//  Widget.toggle(state);
//});
