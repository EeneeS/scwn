import * as Bus from "../../bus.js";
import * as Editor from "./editor.js";

/**
 * @param {State} state 
 * @param {Change} change
 */
export function save(state, change) {
  if (change.original === change.newValue) {
    removeFromChanges(state, change.id, change.type);
  } else {
    const existingChange = state.widget.editor.changes.find(
      c => c.id === change.id && c.type === change.type
    );
    if (existingChange) {
      existingChange.newValue = change.newValue;
    } else {
      state.widget.editor.changes.push(change);
    }
    addToUndoStack(state, change);
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
  removeFromUndoStack(state, id, type);
  state.widget.editor.changes = state.widget.editor.changes.filter(change => {
    return !(change.id === id && change.type === type);
  });
};

/**
 * @param {State} state 
 * @param {Change} change 
 */
function addToUndoStack(state, change) {
  state.widget.editor.undoStack.push(change);
  Bus.publish('update-undo-stack', { amount: state.widget.editor.undoStack.length });
  Bus.publish('update-redo-stack', { amount: state.widget.editor.redoStack.length });
};

/**
 * @param {State} state 
 * @param {string} id 
 * @param {string} type 
 */
function removeFromUndoStack(state, id, type) {
  state.widget.editor.undoStack = state.widget.editor.changes.filter(c => {
    return !(c.id === id && c.type === type)
  });
  Bus.publish('update-redo-stack', { amount: state.widget.editor.redoStack.length });
  Bus.publish('update-undo-stack', { amount: state.widget.editor.undoStack.length });
};

/**
 * @param {State} state 
 * @param {Change} change 
 */
function addToRedoStack(state, change) {
  state.widget.editor.redoStack.push(change);
  Bus.publish('update-undo-stack', { amount: state.widget.editor.undoStack.length });
  Bus.publish('update-redo-stack', { amount: state.widget.editor.redoStack.length });
};

/**
 * @param {State} state
 */
export function undo(state) {
  const lastChange = state.widget.editor.undoStack.pop();
  addToRedoStack(state, lastChange);
  const type = lastChange.type;
  switch (type) {
    case "text-value":
      lastChange.el.textContent = lastChange.original;
      break;
    case "text-size":
      lastChange.el.style.fontSize = lastChange.original;
      break;
    case "text-color":
      lastChange.el.style.color = lastChange.original;
      break;
    case "text-weight":
      lastChange.el.style.fontWeight = lastChange.original;
  }
};

/**
 * @param {State} state
 */
export function redo(state) {
  const lastChange = state.widget.editor.redoStack.pop();
  addToUndoStack(state, lastChange);
  const type = lastChange.type;
  switch (type) {
    case "text-value":
      lastChange.el.textContent = lastChange.newValue;
      break;
    case "text-size":
      lastChange.el.style.fontSize = lastChange.newValue;
      break;
    case "text-color":
      lastChange.el.style.color = lastChange.newValue;
      break;
    case "text-weight":
      lastChange.el.style.fontWeight = lastChange.newValue;
  }
};

