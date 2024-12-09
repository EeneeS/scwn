import * as Bus from "../bus.js";
import * as Utils from "../utils.js";

export function init() {
  addListeners();
};

function addListeners() {
  Bus.listen('toggle-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('toggle-bug', toggleBugEditor);
  Bus.listen('toggle-color-picker', toggleColorPicker);
  Bus.listen('element-selected', handleElementSelected);
  Bus.listen('change-saved', handleChangeSaved);
  Bus.listen('changes-published', handlePublishChanges);
  Bus.listen('changes-published-failed', handlePublishChangesFailed);
  Bus.listen('toggle-text-bold', handleToggleTextBold);
  Bus.listen('toggle-text-italic', handleToggleTextItalic);
  Bus.listen('toggle-text-underline', handleToggleTextunderline);
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
  if (isActive) {
    $toggleSelectorButton.classList.add("icon-selected");
  } else {
    $toggleSelectorButton.classList.remove("icon-selected");
  };
}

/**
 * @param {CustomEvent} e 
 */
function handleElementSelected(e) {
  const el = e.detail.el;
  if (Utils.selectedElementType(el) === "TEXT") {
    loadTextEditor();
  } else if (Utils.selectedElementType(el) === "IMAGE") {
    loadImageEditor();
  }
};

function loadTextEditor() {
  hideEditors();
  loadUndoRedo();
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.remove("hidden");
};

function loadImageEditor() {
  hideEditors();
  loadUndoRedo();
  const $imageElementEditor = document.querySelector(".image-element-editor");
  $imageElementEditor.classList.remove("hidden");
};

function toggleBugEditor() {
  const $bugEditor = document.querySelector(".bug-editor");
  const $bugEditorBtn = document.querySelector(".toggle-bug-btn");
  if ($bugEditor.classList.contains("hidden")) {
    hideEditors();
    hideUndoRedo();
    $bugEditor.classList.remove("hidden");
    $bugEditorBtn.classList.add("icon-selected");
  } else {
    loadTextEditor();
    $bugEditor.classList.add("hidden");
    $bugEditorBtn.classList.remove("icon-selected");
  }
}

function toggleColorPicker() {
  /** @type {HTMLInputElement} */
  const $colorPicker = document.querySelector(".color-picker");
  $colorPicker.click();
}

function hideEditors() {
  const $textElementEditor = document.querySelector(".text-element-editor");
  const $imageElementEditor = document.querySelector(".image-element-editor");
  const $bugEditor = document.querySelector(".bug-editor");
  const $bugEditorBtn = document.querySelector(".toggle-bug-btn");
  $textElementEditor.classList.add("hidden");
  $imageElementEditor.classList.add("hidden");
  $bugEditor.classList.add("hidden");
  $bugEditorBtn.classList.remove("icon-selected");
};

function loadUndoRedo() {
  const $undoRedoWrapper = document.querySelector(".undo-redo-wrapper");
  $undoRedoWrapper.classList.remove("hidden");
};

function hideUndoRedo() {
  const $undoRedoWrapper = document.querySelector(".undo-redo-wrapper");
  $undoRedoWrapper.classList.add("hidden");
}

/**
 * @param {CustomEvent} e 
 */
function handleToggleTextBold(e) {
  const selected = e.detail.selected;
  const $boldBtn = document.querySelector(".text-bold");
  if (selected) {
    $boldBtn.classList.add("icon-selected");
  } else {
    $boldBtn.classList.remove("icon-selected");
  }
}

/**
 * @param {CustomEvent} e
 */
function handleToggleTextItalic(e) {
  const selected = e.detail.selected;
  const $italicBtn = document.querySelector(".text-italic");
  if (selected) {
    $italicBtn.classList.add("icon-selected");
  } else {
    $italicBtn.classList.remove("icon-selected");
  }
};

/**
 * @param {CustomEvent} e 
 */
function handleToggleTextunderline(e) {
  const selected = e.detail.selected;
  const $underlineBtn = document.querySelector(".text-underline");
  if (selected) {
    $underlineBtn.classList.add("icon-selected");
  } else {
    $underlineBtn.classList.remove("icon-selected");
  }

}

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
    Utils.setCursor("default", $saveBtn, $cancelBtn);
  } else {
    Utils.setCursor("not-allowed", $saveBtn, $cancelBtn);
  };
};

function handlePublishChanges() {
  /** @type {HTMLButtonElement|null} */
  const $saveBtn = document.querySelector(".save-editor-changes");
  Utils.setCursor("not-allowed", $saveBtn);
  hideEditors();
  loadTextEditor();
  toggleWidget();
  const openWidgetBtn = document.querySelector('.open-widget-btn');
  Utils.initAnimation(openWidgetBtn, 'rotate');
};

/**
 * @param {CustomEvent} e 
 */
function handlePublishChangesFailed(e) {
  const error = e.detail.error;
  console.log(error.message);
}
