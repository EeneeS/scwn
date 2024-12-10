import * as Bus from "../../bus.js";
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

  const widthNum = parseInt(width.slice(0, -2));
  const heightNum = parseInt(height.slice(0, -2));

  elements.$iew.value = widthNum;
  elements.$ieh.value = heightNum;

  state.widget.editor.imageEditor.listeners.width = (e) => handleWidthChange(state, e, el, width, height);
  state.widget.editor.imageEditor.listeners.height = (e) => handleHeightChange(state, e, el, width, height);
  state.widget.editor.imageEditor.listeners.aspectRatio = () => handleAspectRatioChange();
  addEventListener(state, elements);

};

/**
 * @param {State} state 
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} originalWidth
 * @param {string} originalHeight
 */
function handleWidthChange(state, evt, el, originalWidth, originalHeight) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);

  if (isAspectRatioLocked()) {
    const originalAspectRatio = parseFloat(originalWidth) / parseFloat(originalHeight);
    const newWidth = parseFloat(input.value);
    const newHeight = newWidth / originalAspectRatio;
    /** @type {HTMLInputElement|null} */
    const heightInput = document.querySelector(".image-element-editor #image-height");
    heightInput.value = newHeight.toString();
    el.style.width = newWidth + "px";
    el.style.height = newHeight.toFixed(2) + "px";

    /** @type {Change} */
    const widthChange = { id: uniqueId, el: el, type: "image-width", original: originalWidth, newValue: newWidth + "px" };
    /** @type {Change} */
    const heightChange = { id: uniqueId, el: el, type: "image-height", original: originalHeight, newValue: newHeight.toFixed(2) + "px" };
    EditorSave.save(state, widthChange);
    EditorSave.save(state, heightChange);
  } else {
    el.style.width = input.value + "px";
    /** @type {Change} */
    const change = { id: uniqueId, el: el, type: "image-width", original: originalWidth, newValue: input.value + "px" };
    EditorSave.save(state, change);
  }
};


/**
 * @param {State} state 
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} originalWidth
 * @param {string} originalHeight
 */
function handleHeightChange(state, evt, el, originalWidth, originalHeight) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);

  if (isAspectRatioLocked()) {
    const originalAspectRatio = parseFloat(originalWidth) / parseFloat(originalHeight);
    const newHeight = parseFloat(input.value);
    const newWidth = newHeight * originalAspectRatio;
    el.style.height = newHeight + "px";
    el.style.width = newWidth.toFixed(2) + "px";
    /** @type {HTMLInputElement|null} */
    const widthInput = document.querySelector(".image-element-editor #image-width");
    widthInput.value = newHeight.toString();
    /** @type {Change} */
    const heightChange = { id: uniqueId, el: el, type: "image-height", original: originalHeight, newValue: newHeight + "px" };
    /** @type {Change} */
    const widthChange = { id: uniqueId, el: el, type: "image-width", original: originalWidth, newValue: newWidth.toFixed(2) + "px" };
    EditorSave.save(state, heightChange);
    EditorSave.save(state, widthChange);
  } else {
    el.style.height = input.value + "px";
    /** @type {Change} */
    const change = { id: uniqueId, el: el, type: "image-height", original: originalHeight, newValue: input.value + "px" };
    EditorSave.save(state, change);
  }
};

function handleAspectRatioChange() {
  const selected = isAspectRatioLocked();
  Bus.publish('toggle-aspect-ratio-lock', { selected: !selected });
}

function isAspectRatioLocked() {
  const locked = document.querySelector(".lock-aspect-ratio-btn").classList.contains("icon-selected");
  return locked;
}

/**
 * @param {State} state 
 * @param {Object} elements 
 */
function addEventListener(state, elements) {
  elements.$iew.addEventListener('change', state.widget.editor.imageEditor.listeners.width);
  elements.$ieh.addEventListener('change', state.widget.editor.imageEditor.listeners.height);
  elements.$iear.addEventListener('click', state.widget.editor.imageEditor.listeners.aspectRatio);
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
    $iear: $ie.querySelector(".lock-aspect-ratio-btn"),
  }
}
