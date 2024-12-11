import { api } from "../../api.js";

/**
 * @param {State} state 
 */
export async function loadHistory(state) {
  const changes = state.widget.editor.changes;
  populateHistoryContainer(changes);
};

/**
 * @param {Change[]} data
 */
function populateHistoryContainer(data) {
  const $container = document.querySelector(".history-items");
  $container.innerHTML = "";
  let html = "";
  data.forEach((change, index) => {
    const className = index % 2 == 0 ? "history-item-light" : "history-item-dark";
    html += generateChangeHTML(change, className);
  });
  $container.insertAdjacentHTML("beforeend", html);
};

/**
 * @param {Change} change 
 * @param {string} className 
  */
function generateChangeHTML(change, className) {
  return `<div class="${className}">${generateHTMLForChangeType(change)}</div>`;
}

/**
 * @param {Change} change 
  */
function generateHTMLForChangeType(change) {
  const type = change.type
  if (type === "text-value") {
    return `Change <span>${change.original}</span> to <span>${change.newValue}</span>`;
  } else if (type === "text-color") {
    return `Change to color of <span>${change.el.innerHTML}</span> to <span style="color: ${change.newValue}">${change.newValue.toUpperCase()}</span>`;
  } else if (type === "text-size") {
    return `Change font size of <span>${change.el.innerHTML}</span> to ${change.newValue}`;
  } else {
    // TODO: refactor this...
    const action = change.original === "normal" ? "Add" : "Remove";
    const value = action === "Add" ? change.newValue : change.original;
    const verb = action === "Add" ? "to" : "from";
    return `${action} ${value} ${verb} <span>${change.el.innerHTML}</span>`;
  };
}
