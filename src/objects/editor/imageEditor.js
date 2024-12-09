import * as Utils from "../../utils.js";
import * as EditorSave from "./save.js";

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 */
export function watch(state, el) {
  const elements = getEditorElements();

  const styles = getComputedStyle(el);

  let { width, height } = styles;

  elements.$iew.value = width.slice(0, -2);
  elements.$ieh.value = height.slice(0, -2);


  state.widget.editor.imageEditor.listeners.width = (e) => handleWidthChange(state, e, el, width);
  state.widget.editor.imageEditor.listeners.height = (e) => handleHeightChange(state, e, el, height);

  addEventListener(state, elements);

};

/**
 * @param {State} state 
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleWidthChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.width = input.value + "px";
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "image-width", original: original, newValue: input.value + "px" };
  EditorSave.save(state, change);
};

/**
 * @param {State} state 
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleHeightChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.height = input.value + "px";
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "image-height", original: original, newValue: input.value + "px" };
  EditorSave.save(state, change);
};

/**
 * @param {State} state 
 * @param {Object} elements 
 */
function addEventListener(state, elements) {
  elements.$iew.addEventListener('change', state.widget.editor.imageEditor.listeners.width);
  elements.$ieh.addEventListener('change', state.widget.editor.imageEditor.listeners.height);
}

/**
 * @returns {Object}
  */
function getEditorElements() {
  const $ie = document.querySelector(".image-element-editor");
  return {
    $ie,
    $iew: $ie.querySelector("#image-width"),
    $ieh: $ie.querySelector("#image-height"),
  }
}
