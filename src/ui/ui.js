import * as Bus from "../bus.js";
import * as Utils from "../utils.js";

export function init() {
  Bus.listen('toggle-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('element-selected', handleElementSelected);
  Bus.listen('change-saved', handleChangeSaved);
  Bus.listen('changes-published', handlePublishChanges);
};

function toggleWidget() {
  const $openWidgetContainer = document.querySelector(".open-widget-container");
  $openWidgetContainer.classList.toggle("hidden");
}

/**
 * @param {CustomEvent} e
 */
function toggleSelector(e) {
  const { isActive } = e.detail;

  /** @type {HTMLElement|null} */
  const $toggleSelectorButton = document.querySelector(".toggle-selector-btn");
  const $selectorText = document.querySelector(".start-select-box p");

  if (isActive) {
    hideEditors();
    $toggleSelectorButton.style.fill = "#0084FF";
    $selectorText.textContent = "Element selector active.";
  } else {
    $toggleSelectorButton.style.fill = "black";
    $selectorText.textContent = "Select an element you want to edit.";
  };
}

/**
 * @param {CustomEvent} e 
 */
function handleElementSelected(e) {
  const el = e.detail.el;
  if (Utils.selectedElementType(el) === "TEXT") {
    loadTextEditor();
  };
};

function loadTextEditor() {
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.remove("hidden");
};

function hideEditors() {
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.add("hidden");
};

/**
 * @param {CustomEvent} e
 */
function handleChangeSaved(e) {
  /** @type {HTMLButtonElement|null} */
  const $saveBtn = document.querySelector(".save-editor-changes");
  /** @type {HTMLButtonElement|null} */
  const $cancelBtn = document.querySelector(".cancel-editor-changes");
  const amount = e.detail.amount;
  if (amount > 0) {
    $saveBtn.disabled = false;
    $cancelBtn.disabled = false;
  } else {
    $saveBtn.disabled = true;
    $cancelBtn.disabled = false;
  };
};

function handlePublishChanges() {
  /** @type {HTMLButtonElement|null} */
  const $saveBtn = document.querySelector(".save-editor-changes");
  $saveBtn.disabled = true;
  hideEditors();
};
