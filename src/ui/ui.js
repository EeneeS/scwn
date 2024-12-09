import * as Bus from "../bus.js";
import * as Utils from "../utils.js";

export function init() {
  addListeners();
};

function addListeners() {
  Bus.listen('toggle-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('toggle-bug', toggleBugEditor);
  Bus.listen('element-selected', handleElementSelected);
  Bus.listen('change-saved', handleChangeSaved);
  Bus.listen('changes-published', handlePublishChanges);
  Bus.listen('changes-published-failed', handlePublishChangesFailed);
  Bus.listen('update-undo-stack', handleUndoButton);
  Bus.listen('update-redo-stack', handleRedoButton);
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
  loadTextEditor();
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
  };
};

function loadTextEditor() {
  hideEditors();
  loadUndoRedo();
  const $textElementEditor = document.querySelector(".text-element-editor");
  $textElementEditor.classList.remove("hidden");
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

function hideEditors() {
  const $textElementEditor = document.querySelector(".text-element-editor");
  const $bugEditor = document.querySelector(".bug-editor");
  const $bugEditorBtn = document.querySelector(".toggle-bug-btn");
  $textElementEditor.classList.add("hidden");
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
    $saveBtn.style.cursor = "default";
    $cancelBtn.style.cursor = "default";
  } else {
    $saveBtn.style.cursor = "not-allowed";
    $cancelBtn.style.cursor = "not-allowed";
  };
};

function handlePublishChanges() {
  /** @type {HTMLButtonElement|null} */
  const $saveBtn = document.querySelector(".save-editor-changes");
  $saveBtn.style.cursor = "not-allowed";
  hideEditors();
  loadTextEditor();
  toggleWidget();
};

/**
 * @param {CustomEvent} e 
 */
function handlePublishChangesFailed(e) {
  const error = e.detail.error;
  console.log(error.message);
}

/**
 * @param {CustomEvent} e
 */
function handleUndoButton(e) {
  const amount = e.detail.amount;
  /** @type {HTMLButtonElement|null} */
  const $undoBtn = document.querySelector(".undo-editor-change");
  if (amount > 0) {
    $undoBtn.style.cursor = "default";
  } else {
    $undoBtn.style.cursor = "not-allowed";
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
    $redoBtn.style.cursor = "default";
  } else {
    $redoBtn.style.cursor = "not-allowed";
  }
};
