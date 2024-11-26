import * as Bus from "../bus.js";
import * as Utils from "../utils.js";

/**
 * @param {Options} opts 
 */
export function init(opts) {
  //const position = opts.position || "right";
  //moveWidget(position);
  addListeners();
};

/**
 * @param {String} position 
 */
function moveWidget(position) {
  /** @type {HTMLElement|null} */
  const $container = document.querySelector(".widget-container");
  if (position === "right") {
    $container.style.removeProperty("left");
    $container.style.right = "25px";
    $container.style.alignItems = "flex-end";
  } else {
    $container.style.removeProperty("align-items");
    $container.style.removeProperty("right");
    $container.style.left = "25px";
  }
}

function addListeners() {
  Bus.listen('toggle-widget', toggleWidget);
  Bus.listen('toggle-selector', toggleSelector);
  Bus.listen('element-selected', handleElementSelected);
  Bus.listen('change-saved', handleChangeSaved);
  Bus.listen('changes-published', handlePublishChanges);
  Bus.listen('update-undo-stack', handleUndoButton);
  Bus.listen('update-redo-stack', handleRedoButton);
  Bus.listen('toggle-text-bold', handleToggleTextBold);
  Bus.listen('toggle-text-italic', handleToggleTextItalic);
  Bus.listen('toggle-text-underline', handleToggleTextunderline);
  //Bus.listen('move-widget', handleMoveWidget);
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
  };
};

/**
 * @param {CustomEvent} e 
 */
function handleMoveWidget(e) {
  const { position } = e.detail;
  const $moveLeftBtn = document.querySelector(".widget-move-left");
  const $moveRightBtn = document.querySelector(".widget-move-right");
  $moveLeftBtn.classList.toggle("hidden");
  $moveRightBtn.classList.toggle("hidden");
  moveWidget(position);
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
  //hideEditors();
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
