import * as Bus from "../bus.js";
import * as Utils from "../utils.js";

/**
 * @param {Options} opts 
 */
export function init(opts) {
  const position = opts.position || "right";
  /** @type {HTMLElement|null} */
  const $container = document.querySelector(".widget-container");
  if (position === "right") {
    $container.style.right = "25px";
    $container.style.alignItems = "flex-end";
  } else {
    $container.style.left = "25px";
  }
  addListeners();
};

function addListeners() {
  Bus.listen('toggle-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('element-selected', handleElementSelected);
  Bus.listen('change-saved', handleChangeSaved);
  Bus.listen('changes-published', handlePublishChanges);
  Bus.listen('update-undo-stack', handleUndoButton);
  Bus.listen('update-redo-stack', handleRedoButton);
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
    $cancelBtn.disabled = true;
  };
};

function handlePublishChanges() {
  /** @type {HTMLButtonElement|null} */
  const $saveBtn = document.querySelector(".save-editor-changes");
  $saveBtn.disabled = true;
  hideEditors();
};

/**
 * @param {CustomEvent} e
 */
function handleUndoButton(e) {
  const amount = e.detail.amount;
  /** @type {HTMLButtonElement|null} */
  const $undoBtn = document.querySelector(".undo-editor-change");
  if (amount > 0) {
    $undoBtn.disabled = false;
  } else {
    $undoBtn.disabled = true;
  }
};

/**
 * @param {CustomEvent} e 
 */
function handleRedoButton(e) {
  const amount = e.detail.amount;
  /** @type {HTMLButtonElement|null} */
  const $redoBtn = document.querySelector(".redo-editor-change");
  if (amount > 0) {
    $redoBtn.disabled = false;
  } else {
    $redoBtn.disabled = true;
  }
};
