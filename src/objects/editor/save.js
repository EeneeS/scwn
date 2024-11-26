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
  if (state.loginTokens.github) {
    try {
      console.log(`changes: ${state.widget.editor.changes} token: ${state.loginTokens.github}`);
      Bus.publish('changes-published', {});
      Editor.resetEditor(state);
    } catch (e) {
      console.log('failed');
    };
  }
};

/**
 * @param {State} state 
 */
export function cancel(state) {
  while (state.widget.editor.undoStack.length > 0) {
    undo(state);
  };
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
  Bus.publish('update-undo-stack', { amount: state.widget.editor.undoStack.length });
  Bus.publish('update-redo-stack', { amount: state.widget.editor.redoStack.length });
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
  if (lastChange) {
    const change = {
      ...lastChange,
      newValue: lastChange.original,
    };
    addToRedoStack(state, lastChange);
    save(state, change);
    updateUIvalues(lastChange.el, lastChange.type, lastChange.original);
  };
};

/**
 * @param {State} state
 */
export function redo(state) {
  const lastChange = state.widget.editor.redoStack.pop();
  if (lastChange) {
    addToUndoStack(state, lastChange);
    save(state, lastChange);
    updateUIvalues(lastChange.el, lastChange.type, lastChange.newValue);
  };
};

/**
 * @param {HTMLElement} el 
 * @param {string} type 
 * @param {string} value 
 */
function updateUIvalues(el, type, value) {
  switch (type) {
    case "text-value":
      el.textContent = value;
      break;
    case "text-size":
      el.style.fontSize = value;
      break;
    case "text-color":
      el.style.color = value;
      break;
    case "text-weight":
      el.style.fontWeight = value;
  }
};
