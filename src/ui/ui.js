import * as Bus from "../bus.js";
import { textElements } from "../utils.js";

export function init() {
  Bus.listen('open-widget', toggleWidget);
  Bus.listen('close-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('element-selected', handleElementSelected);
};

function toggleWidget() {
  const $openBtn = document.querySelector(".open-widget-btn");
  const $openWidgetContainer = document.querySelector(".open-widget-container");
  $openBtn.classList.toggle("hidden");
  $openWidgetContainer.classList.toggle("hidden");
}

/**
 * @param {CustomEvent} e 
 */
function toggleSelector(e) {
  const isActive = e.detail.isActive;
  const $toggleSelctorButton = document.querySelector(".toggle-selector-btn");
  const t = isActive ? "disable selector" : "start selector";
  $toggleSelctorButton.textContent = t;
};

/**
 * @param {CustomEvent} e 
 */
function handleElementSelected(e) {
  const el = e.detail.type;
  const type = el.tagName.toLowerCase();
  if (textElements.includes(type)) {
    loadTextEditor(el);
  } else {
    alert("NYI");
  }
};

// TODO: when resetting hide all the editors

// BUG: bug with eventlisteners not being removed properly. store them in state?
// if you select multiple without changing size / color the corresponding event listener is never removed.
// i know you can only change the value once when it's selected.

/**
 * @param {HTMLElement} el 
 */
function loadTextEditor(el) {
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.remove("hidden");

  /** @type {HTMLInputElement|null} */
  const $sizeInput = $textElementEditor.querySelector("#text-size");
  const computedFontSize = getComputedStyle(el).fontSize.slice(0, -2);
  $sizeInput.value = computedFontSize;
  const sizeChangeHandler = function() {
    el.style.fontSize = $sizeInput.value;
    $sizeInput.removeEventListener('change', sizeChangeHandler);
  };
  $sizeInput.addEventListener('change', sizeChangeHandler);

  /** @type {HTMLInputElement|null} */
  const $colorInput = $textElementEditor.querySelector("#text-color");
  const computedColor = getComputedStyle(el).color;
  $colorInput.value = computedColor;
  const colorChangeHandler = function() {
    el.style.color = $colorInput.value;
    $colorInput.removeEventListener('change', colorChangeHandler);
  };
  $colorInput.addEventListener('change', colorChangeHandler);

};

