import { createState } from "../../state/state.js";
import * as Utils from "../../utils.js";

export function createEditor() {
  return {
    textEditor: {
      listeners: {
        size: null,
        color: null,
      }
    }
  };
}

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 */
export function watch(state, el) {
  resetListeners(state);
  if (Utils.selectedElementType(el) === "TEXT") handleWatchText(state, el);
  else {
    alert(`${el.tagName} not yet implemented`);
  }
};

/**
 * @param {State} state
 * @param {HTMLElement} el
  */
function handleWatchText(state, el) {
  const $te = document.querySelector(".text-element-editor");

  /** @type {HTMLInputElement|null} */
  const $tsi = $te.querySelector("#text-size");
  /** @type {HTMLInputElement|null} */
  const $tci = $te.querySelector("#text-color");

  const computedSize = getComputedStyle(el).fontSize.slice(0, -2);
  const computedColor = getComputedStyle(el).color;

  $tsi.value = computedSize;
  $tci.value = computedColor;

  state.widget.editor.textEditor.listeners.size = (e) => handleTextSizeChange(e, el);
  state.widget.editor.textEditor.listeners.color = (e) => handleTextColorChange(e, el);

  $tsi.addEventListener('change', state.widget.editor.textEditor.listeners.size);
  $tci.addEventListener('change', state.widget.editor.textEditor.listeners.color);
};

/**
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextSizeChange(evt, el) {
  const target = /** @type {HTMLInputElement} */ (evt.target);
  el.style.fontSize = target.value;
}

/**
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextColorChange(evt, el) {
  const target = /** @type {HTMLInputElement} */ (evt.target);
  el.style.color = target.value;
}

/**
 * @param {State} state
 */
function resetListeners(state) {
  const $te = document.querySelector(".text-element-editor");
  const $tsi = $te.querySelector("#text-size");
  const $tci = $te.querySelector("#text-color");
  $tsi.removeEventListener('change', state.widget.editor.textEditor.listeners.size);
  $tci.removeEventListener('change', state.widget.editor.textEditor.listeners.color);
  state.widget.editor = createEditor();
};
