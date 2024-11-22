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
  if (original === newValue) {
    removeFromChanges(state, id, type);
  } else {
    const existingChange = state.widget.editor.changes.find(
      change => change.id === id && change.type === type
    );
    if (existingChange) {
      existingChange.newValue = newValue;
    } else {
      state.widget.editor.changes.push({ id, el, type, original, newValue });
    }
  }
  Bus.publish('change-saved', { amount: state.widget.editor.changes.length });
};

/**
 * @param {State} state
 */
export function publish(state) {
  Bus.publish('changes-published', {});
  console.log(state.widget.editor.changes); // TODO: backend
  Editor.resetEditor(state);
};

/**
 * @param {State} state
 * @param {string} id 
 * @param {string} type 
 */
function removeFromChanges(state, id, type) {
  console.log('change should be removed from the undo stack');
  state.widget.editor.changes = state.widget.editor.changes.filter(change => {
    return !(change.id === id && change.type === type);
  });
};

/**
 * @param {State} state
 */
export function undo(state) {
  console.log('undo');
};

/**
 * @param {State} state
 */
export function redo(state) {
  console.log('redo');
};

