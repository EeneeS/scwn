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
 * @param {Array} data
 */
function renderHistory(data) {
  const $container = document.querySelector(".history-items");

  const groupedArray = groupData(data);

  // TODO: style this better :)
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

/**
 * @param {Array} data 
  */
function groupData(data) {
  const grouped = data.reduce((acc, item) => {
    const { batch_id } = item;
    if (!acc[batch_id]) acc[batch_id] = [];
    acc[batch_id].push(item);
    return acc;
  }, {});
  return Object.entries(grouped);
}
