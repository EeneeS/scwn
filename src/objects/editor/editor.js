import * as Utils from "../../utils.js";
import * as TextEditor from "./text.js";

export function createEditor() {
  return {
    changes: [],
    undoStack: [],
    redoStack: [],
    textEditor: {
      listeners: {
        value: null,
        size: null,
        sizeIncr: null,
        sizeDecr: null,
        color: null,
        bold: null,
        italic: null,
        underline: null,
      }
    }
  };
};

/**
 * @param {State} state 
 */
export function resetEditor(state) {
  TextEditor.resetListeners(state);
  state.widget.editor = createEditor();
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 */
export function watch(state, el) {
  TextEditor.resetListeners(state);
  if (Utils.selectedElementType(el) === "TEXT") TextEditor.handleWatchText(state, el);
  else {
    alert(`${el.tagName} not yet implemented`);
  }
};

