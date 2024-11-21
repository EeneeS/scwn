import * as Bus from "../../bus.js";
import * as Editor from "./editor.js";

/**
 * @param {State} state 
 * @param {string} id 
 * @param {HTMLElement} el 
 * @param {string} type 
 * @param {string} original
 * @param {string} newValue 
 */
export function save(state, id, el, type, original, newValue) {
  if (state.widget.editor.changes.length === 0) {
    Bus.publish('change-saved', {});
  };
  const existingChange = state.widget.editor.changes.find(change => change.id === id && change.type === type);
  if (existingChange) {
    existingChange.newValue = newValue;
  } else {
    const change = { id, el, type, original, newValue };
    state.widget.editor.changes.push(change);
  }
};

/**
 * @param {State} state
 */
export function publish(state) {
  Bus.publish('changes-published', {});
  console.log(state.widget.editor.changes); // TODO: backend
  Editor.resetEditor(state);
};
