import * as Bus from "../bus.js";
import { selectedElementType, textElements } from "../utils.js";

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
  const el = e.detail.el;
  if (selectedElementType(el) === "TEXT") {
    loadTextEditor();
  };
};

// TODO: when resetting hide all the editors

function loadTextEditor() {
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.remove("hidden");
};

