import * as Bus from "./bus.js";
import * as Widget from "./objects/widget/widget.js";
import * as State from "./state/state.js";
import * as UI from "./ui/ui.js";
import * as Selector from "./objects/selector/selector.js";
import * as EditorSave from "./objects/editor/save.js";

const $toggleWidgetBtn = document.querySelector(".open-widget-btn");
const $toggleSelectorBtn = document.querySelector(".toggle-selector-btn");
const $toggleCommentBtn = document.querySelector(".toggle-comment-btn");
const $toggleColorPickerBtn = document.querySelector(".color-picker-btn"); // TODO: move to textEditor.js
const $saveChangesBtn = document.querySelector(".save-editor-changes");
const $cancelChangesBtn = document.querySelector(".cancel-editor-changes");
const $undoChangeBtn = document.querySelector(".undo-editor-change");
const $redoChangeBtn = document.querySelector(".redo-editor-change");
const $toggleHistoryBtn = document.querySelector(".toggle-history-btn");

/**
 * @param {Options} opts 
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
  });

  $toggleSelectorBtn.addEventListener('click', function() {
    Selector.toggle(state);
    Bus.publish('toggle-selector', { isActive: state.widget.selector.isActive });
  });

  $toggleCommentBtn.addEventListener('click', function() {
    Bus.publish("toggle-comment", {});
  });

  $toggleColorPickerBtn.addEventListener('click', function() {
    Bus.publish("toggle-color-picker", {});
  });

  $saveChangesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    EditorSave.publish(state);
  });

  $cancelChangesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    EditorSave.cancel(state);
  });

  $undoChangeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    EditorSave.undo(state);
  });

  $redoChangeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    EditorSave.redo(state);
  });

  $toggleHistoryBtn.addEventListener('click', function(e) {
    e.preventDefault();
    Widget.toggleHistory(state);
  });

};

export const version = "1.0.0";
export { init };

init({
  position: "bottom-left",
  projectId: "fc1c2693-e872-48cb-8703-76cf7c3b84be"
}); // for development
