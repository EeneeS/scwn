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
    console.log(el);
  } else {
    alert("NYI");
  }
};

// TODO: when resetting hide all the editors

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
  $sizeInput.addEventListener('change', function() {
    el.style.fontSize = $sizeInput.value + "px";
  });

  /** @type {HTMLInputElement|null} */
  const $colorInput = $textElementEditor.querySelector("#text-color");
  const computedColor = getComputedStyle(el).color;
  $colorInput.value = computedColor;
  $colorInput.addEventListener('change', function() {
    el.style.color = $colorInput.value;
  });

};

