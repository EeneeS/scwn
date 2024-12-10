import { api } from "../../api.js";

/**
 * @param {State} state 
 */
export async function loadHistory(state) {
  const projectId = state.options.projectId;
  const result = await api(`/projects/${projectId}/changes`, "GET");
  renderHistory(result);
};

/**
 * Renders a history view based on grouped data.
 * @param {Array} data - The data to render.
 * @param {object} data[] - An object representing a history item.
 * @param {string} data[].batch_id - The batch ID to group items by.
 * @param {string} data[].element - The element to display.
 * @param {string} data[].type - The type of the element.
 * @param {string} data[].new_value
 * @param {string} data[].original_value
 * @param {string} data[].route
 */
function renderHistory(data) {
  const $container = document.querySelector(".history-container");

  const grouped = data.reduce((acc, item) => {
    const { batch_id } = item;
    if (!acc[batch_id]) acc[batch_id] = [];
    acc[batch_id].push(item);
    return acc;
  }, {});

  const groupedArray = Object.entries(grouped);

  let html = '';
  groupedArray.forEach(([batch_id, items], index) => {
    const className = index % 2 === 0 ? 'history-item-light' : 'history-item-dark';
    html += `<div class="${className} batch" id="${batch_id}">`;
    items.forEach((/** @type {{ element: string; type: string; original_value: string; new_value: string; route: string; }} */ item) => {
      html += `<p>${item.element} - ${item.type} - from ${item.original_value} to ${item.new_value} - ${item.route}</p>`;
    });
    html += `</div>`;
  });

  $container.innerHTML = html;
};
