import * as Utils from "../../utils.js";

export function createEditor() {
  return {
    changes: [],
    textEditor: {
      listeners: {
        value: null,
        size: null,
        color: null,
        weight: null,
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

  const elements = getTextEditorElements();

  const textValue = el.innerText;
  const computedSize = getComputedStyle(el).fontSize.slice(0, -2);
  const computedColor = getComputedStyle(el).color;
  const computedWeight = getComputedStyle(el).fontWeight;

  elements.$tvi.value = textValue;
  elements.$tsi.value = computedSize;
  elements.$tci.value = Utils.rgbToHex(computedColor);
  elements.$dtw.value = computedWeight;

  state.widget.editor.textEditor.listeners.value = (e) => handleTextValueChange(state, e, el);
  state.widget.editor.textEditor.listeners.size = (e) => handleTextSizeChange(state, e, el);
  state.widget.editor.textEditor.listeners.color = (e) => handleTextColorChange(state, e, el);
  state.widget.editor.textEditor.listeners.weight = (e) => handleTextWeightChange(state, e, el);

  addTextListeners(state, elements);
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextValueChange(state, evt, el) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.innerText = input.value;
  saveChange(state, uniqueId, el, 'text-value', input.value);
};

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextSizeChange(state, evt, el) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.fontSize = input.value;
  saveChange(state, uniqueId, el, 'text-size', input.value);
}

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextWeightChange(state, evt, el) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.fontWeight = input.value;
  saveChange(state, uniqueId, el, 'text-weight', input.value);
}

/**
 * @param {State} state
 * @param {Event} evt 
 * @param {HTMLElement} el 
 */
function handleTextColorChange(state, evt, el) {
  const uniqueId = Utils.getOrCreateUniqueId(el);
  const input = /** @type {HTMLInputElement} */ (evt.target);
  el.style.color = input.value;
  saveChange(state, uniqueId, el, 'text-color', input.value);
}

/**
 * @param {State} state 
 * @param {Object} elements 
 */
function addTextListeners(state, elements) {
  elements.$tvi.addEventListener('change', state.widget.editor.textEditor.listeners.value);
  elements.$tsi.addEventListener('change', state.widget.editor.textEditor.listeners.size);
  elements.$tci.addEventListener('change', state.widget.editor.textEditor.listeners.color);
  elements.$twi.addEventListener('change', state.widget.editor.textEditor.listeners.weight);
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
  elements.$tci.removeEventListener('change', state.widget.editor.textEditor.listeners.color);
  elements.$twi.removeEventListener('change', state.widget.editor.textEditor.listeners.weight);
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
    $tci: $te.querySelector("#text-color"),
    $twi: $te.querySelector("#text-weight"),
    $dtw: $te.querySelector("#default-text-weight"),
  }
};

/**
 * @param {State} state 
 * @param {string} id 
 * @param {HTMLElement} el 
 * @param {string} type 
 * @param {string} value 
  */
function saveChange(state, id, el, type, value) {
  const existingChange = state.widget.editor.changes.find(change => change.id === id && change.type === type);
  if (existingChange) {
    existingChange.value = value;
  } else {
    const change = { id, el, type, value };
    state.widget.editor.changes.push(change);
  }
};
