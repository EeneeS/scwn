import * as Bus from "../../bus.js";
import * as Utils from "../../utils.js";
import * as EditorSave from "./save.js";

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
  resetListeners(state);
  state.widget.editor = createEditor();
};

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
  const elements = getTextEditorElements();

  const textValue = el.innerText;
  const computedSize = getComputedStyle(el).fontSize.slice(0, -2);
  const computedColor = getComputedStyle(el).color;
  const computedWeight = getComputedStyle(el).fontWeight;
  const computedStyle = getComputedStyle(el).fontStyle;
  const computedDecoration = getComputedStyle(el).textDecorationLine;

  elements.$tvi.value = textValue;
  elements.$tsi.value = computedSize;
  elements.$tci.value = Utils.rgbToHex(computedColor);

  parseInt(computedWeight) > 400 ?
    elements.$tbb.classList.add("icon-selected") :
    elements.$tbb.classList.remove("icon-selected");
  computedStyle === "italic" ?
    elements.$tib.classList.add("icon-selected") :
    elements.$tib.classList.remove("icon-selected");
  computedDecoration === "underline" ?
    elements.$tub.classList.add("icon-selected") :
    elements.$tub.classList.remove("icon-selected");

  state.widget.editor.textEditor.listeners.value = (e) => handleTextValueChange(state, e, el, textValue);
  state.widget.editor.textEditor.listeners.size = (e) => handleTextSizeChange(state, e, el, computedSize);
  state.widget.editor.textEditor.listeners.sizeIncr = () => handleTextSizeChangeBtn(state, el, computedSize, 1, elements.$tsi);
  state.widget.editor.textEditor.listeners.sizeDecr = () => handleTextSizeChangeBtn(state, el, computedSize, -1, elements.$tsi);
  state.widget.editor.textEditor.listeners.bold = () => handleTextBoldChange(state, el, computedWeight);
  state.widget.editor.textEditor.listeners.italic = () => handleTextItalicChange(state, el, computedStyle);
  state.widget.editor.textEditor.listeners.underline = () => handleTextUnderlineChange(state, el, computedDecoration);
  state.widget.editor.textEditor.listeners.color = (e) => handleTextColorChange(state, e, el, Utils.rgbToHex(computedColor));

  addTextListeners(state, elements);
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleTextValueChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
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
function handleTextSizeChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.fontSize = input.value;
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
function handleTextSizeChangeBtn(state, el, original, amount, inputField) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const size = getComputedStyle(el).fontSize;
  const newValue = (parseInt(size) + amount).toString();
  el.style.fontSize = newValue;
  inputField.value = newValue;
  const change = { id: uniqueId, el: el, type: "text-size", original: original, newValue: newValue };
  EditorSave.save(state, change);
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleTextBoldChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const weight = parseInt(getComputedStyle(el).fontWeight);
  const isBold = weight > 400;
  const newValue = isBold ? (original || "400") : "bold";
  el.style.fontWeight = newValue;
  const change = { id: uniqueId, el: el, type: "text-weight", original: original, newValue: newValue };
  EditorSave.save(state, change);
  Bus.publish("toggle-text-bold", { selected: !isBold });
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleTextItalicChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const style = getComputedStyle(el).fontStyle;
  const isItalic = style === "italic";
  const newValue = isItalic ? "normal" : "italic";
  el.style.fontStyle = newValue;
  const change = { id: uniqueId, el: el, type: "text-style", original: original, newValue: newValue };
  EditorSave.save(state, change);
  Bus.publish("toggle-text-italic", { selected: !isItalic });
};

/**
 * @param {State} state 
 * @param {HTMLElement} el 
 * @param {string} original 
 */
function handleTextUnderlineChange(state, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const decoration = getComputedStyle(el).textDecorationLine;
  const isUnderline = decoration === "underline";
  const newValue = isUnderline ? "none" : "underline";
  el.style.textDecoration = newValue;
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
function handleTextColorChange(state, evt, el, original) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.color = input.value;
  const change = { id: uniqueId, el: el, type: "text-color", original: original, newValue: input.value };
  EditorSave.save(state, change);
}

/**
 * @param {State} state 
 * @param {Object} elements 
 */
function addTextListeners(state, elements) {
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
function resetListeners(state) {
  const elements = {
    ...getTextEditorElements(),
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
function getTextEditorElements() {
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
