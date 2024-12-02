import * as Bus from "../../bus.js";
import * as Utils from "../../utils.js";
import * as EditorSave from "./save.js";

/**
 * @param {State} state
 * @param {HTMLElement} el
  */
export function watch(state, el) {
  const elements = getEditorElements();

  const textValue = el.innerText;

  const styles = getComputedStyle(el);

  let { fontSize, color, fontWeight, fontStyle, textDecorationLine } = styles;
  fontSize = fontSize.slice(0, -2);

  elements.$tvi.value = textValue;
  elements.$tsi.value = fontSize;
  elements.$tci.value = Utils.rgbToHex(color);

  parseInt(fontWeight) > 400 ?
    elements.$tbb.classList.add("icon-selected") :
    elements.$tbb.classList.remove("icon-selected");

  fontStyle === "italic" ?
    elements.$tib.classList.add("icon-selected") :
    elements.$tib.classList.remove("icon-selected");

  textDecorationLine === "underline" ?
    elements.$tub.classList.add("icon-selected") :
    elements.$tub.classList.remove("icon-selected");

  state.widget.editor.textEditor.listeners.value = (e) => handleValueChange(state, e, el, textValue);
  state.widget.editor.textEditor.listeners.size = (e) => handleSizeChange(state, e, el, fontSize);
  state.widget.editor.textEditor.listeners.sizeIncr = () => handleSizeChangeBtn(state, el, fontSize, 1, elements.$tsi);
  state.widget.editor.textEditor.listeners.sizeDecr = () => handleSizeChangeBtn(state, el, fontSize, -1, elements.$tsi);
  state.widget.editor.textEditor.listeners.bold = () => handleBoldChange(state, el, fontWeight);
  state.widget.editor.textEditor.listeners.italic = () => handleItalicChange(state, el, fontStyle);
  state.widget.editor.textEditor.listeners.underline = () => handleUnderlineChange(state, el, textDecorationLine);
  state.widget.editor.textEditor.listeners.color = (e) => handleColorChange(state, e, el, Utils.rgbToHex(color));

  addListeners(state, elements);
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleValueChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-value", original: original, newValue: input.value };
  EditorSave.save(state, change);
  el.innerText = input.value;
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original
 */
function handleSizeChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.fontSize = input.value + "px";
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-size", original: original, newValue: input.value };
  EditorSave.save(state, change);
}

/**
 * @param {State} state
 * @param {HTMLElement} el 
 * @param {string} original
 * @param {number} amount 
 * @param {HTMLInputElement} inputField 
 */
function handleSizeChangeBtn(state, el, original, amount, inputField) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const size = getComputedStyle(el).fontSize;
  const newValue = (parseInt(size) + amount).toString();
  el.style.fontSize = newValue + "px";
  inputField.value = newValue;
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-size", original: original, newValue: newValue };
  EditorSave.save(state, change);
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleBoldChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const weight = parseInt(getComputedStyle(el).fontWeight);
  const isBold = weight > 400;
  let newValue = isBold ? (original || "400") : "bold";
  if (isBold && parseInt(original) >= 700) {
    newValue = "400";
  }
  el.style.fontWeight = newValue;
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-weight", original: original, newValue: newValue };
  EditorSave.save(state, change);
  Bus.publish("toggle-text-bold", { selected: !isBold });
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleItalicChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const style = getComputedStyle(el).fontStyle;
  const isItalic = style === "italic";
  const newValue = isItalic ? "normal" : "italic";
  el.style.fontStyle = newValue;
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-style", original: original, newValue: newValue };
  EditorSave.save(state, change);
  Bus.publish("toggle-text-italic", { selected: !isItalic });
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleUnderlineChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const decoration = getComputedStyle(el).textDecorationLine;
  const isUnderline = decoration === "underline";
  const newValue = isUnderline ? "none" : "underline";
  el.style.textDecoration = newValue;
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-decoration", original: original, newValue: newValue };
  EditorSave.save(state, change);
  Bus.publish("toggle-text-underline", { selected: !isUnderline });
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original
 */
function handleColorChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.color = input.value;
  /** @type {Change} */
  const change = { id: uniqueId, el: el, type: "text-color", original: original, newValue: input.value };
  EditorSave.save(state, change);
}

/**
 * @param {State} state 
 * @param {Object} elements 
 */
function addListeners(state, elements) {
  elements.$tvi.addEventListener('change', state.widget.editor.textEditor.listeners.value);
  elements.$tsi.addEventListener('change', state.widget.editor.textEditor.listeners.size);
  elements.$tsid.addEventListener('click', state.widget.editor.textEditor.listeners.sizeDecr);
  elements.$tsii.addEventListener('click', state.widget.editor.textEditor.listeners.sizeIncr);
  elements.$tbb.addEventListener('click', state.widget.editor.textEditor.listeners.bold);
  elements.$tib.addEventListener('click', state.widget.editor.textEditor.listeners.italic);
  elements.$tub.addEventListener('click', state.widget.editor.textEditor.listeners.underline);
  elements.$tci.addEventListener('change', state.widget.editor.textEditor.listeners.color);
};

/**
 * @param {State} state
 */
export function resetListeners(state) {
  const elements = {
    ...getEditorElements(),
  };
  elements.$tvi.removeEventListener('change', state.widget.editor.textEditor.listeners.value);
  elements.$tsi.removeEventListener('change', state.widget.editor.textEditor.listeners.size);
  elements.$tsid.removeEventListener('click', state.widget.editor.textEditor.listeners.sizeDecr);
  elements.$tsii.removeEventListener('click', state.widget.editor.textEditor.listeners.sizeIncr);
  elements.$tbb.removeEventListener('click', state.widget.editor.textEditor.listeners.bold);
  elements.$tib.removeEventListener('click', state.widget.editor.textEditor.listeners.italic);
  elements.$tub.removeEventListener('click', state.widget.editor.textEditor.listeners.underline);
  elements.$tci.removeEventListener('change', state.widget.editor.textEditor.listeners.color);
};

/**
 * @returns {Object}
 */
function getEditorElements() {
  const $te = document.querySelector(".text-element-editor");
  return {
    $te,
    $tvi: $te.querySelector("#text-value"),
    $tsi: $te.querySelector("#text-size"),
    $tsii: $te.querySelector(".text-size-incr-btn"),
    $tsid: $te.querySelector(".text-size-decr-btn"),
    $tbb: $te.querySelector(".text-bold"),
    $tib: $te.querySelector(".text-italic"),
    $tub: $te.querySelector(".text-underline"),
    $tci: $te.querySelector("#text-color"),
  }
};
