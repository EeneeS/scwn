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
        color: null,
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

  elements.$tvi.value = textValue;
  elements.$tsi.value = computedSize;
  elements.$tci.value = Utils.rgbToHex(computedColor);

  state.widget.editor.textEditor.listeners.value = (e) => handleTextValueChange(state, e, el, textValue);
  state.widget.editor.textEditor.listeners.size = (e) => handleTextSizeChange(state, e, el, computedSize);
  state.widget.editor.textEditor.listeners.sizeIncr = () => handleTextSizeChangeBtn(state, el, computedSize, 1, elements.$tsi);
  state.widget.editor.textEditor.listeners.sizeDecr = () => handleTextSizeChangeBtn(state, el, computedSize, -1, elements.$tsi);
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
  console.log('change in text');
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
  const size = getComputedStyle(el).fontSize;
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const newValue = (parseInt(size) + amount).toString();
  el.style.fontSize = newValue;
  inputField.value = newValue;
  const change = { id: uniqueId, el: el, type: "text-size", original: original, newValue: newValue };
  EditorSave.save(state, change);
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
    $tci: $te.querySelector("#text-color"),
  }
};
