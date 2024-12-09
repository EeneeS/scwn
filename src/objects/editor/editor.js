import * as Utils from "../../utils.js";
import * as TextEditor from "./textEditor.js";
import * as ImageEditor from "./imageEditor.js";

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
    },
    imageEditor: {
      listeners: {
        width: null,
        height: null,
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
  if (Utils.selectedElementType(el) === "TEXT") TextEditor.watch(state, el);
  else if (Utils.selectedElementType(el) === "IMAGE") ImageEditor.watch(state, el);
  else {
    alert(`${el.tagName} not yet implemented`);
  }
};

