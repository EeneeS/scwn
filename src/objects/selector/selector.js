import * as Bus from "../../bus.js";

/**
 * @returns {Selector}
 */
export function createSelector() {
  const selector = {
    isActive: false,
    selectedElement: null,
  };
  return selector;
};

/**
 * @param {State} state 
 */
export function toggle(state) {
  const isActive = state.widget.selector.isActive;
  state.widget.selector.isActive = !isActive;
  !isActive ? initElementSelector(state) : resetElementSelector(state);
}

/**
 * @param {State} state 
 */
function resetElementSelector(state) {
  const { selector } = state.widget;
  selector.isActive = false;
  if (selector.selectedElement) {
    selector.selectedElement.classList.remove('element-highlight');
  };
  selector.selectedElement = null;
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mouseout', handleMouseOut);
  document.removeEventListener('click', (e) => handleMouseClick(e, state));
  Bus.publish('toggle-selector', { isActive: selector.isActive });
};

/**
 * @param {State} state 
 */
function initElementSelector(state) {
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('click', (e) => handleMouseClick(e, state));
}

/**
 * @param {MouseEvent} e 
 */
function handleMouseOver(e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (isSelectable(target)) {
    target.classList.add('element-highlight');
  };
}

/**
 * @param {MouseEvent} e 
 */
function handleMouseOut(e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (isSelectable(target)) {
    target.classList.remove('element-highlight');
  };

};

/**
 * @param {MouseEvent} e 
 * @param {State} state 
 */
function handleMouseClick(e, state) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (isSelectable(target)) {
    state.widget.selector.selectedElement = target;
    toggle(state);
    resetElementSelector(state);
  };
};

/**
 * @param {HTMLElement} element 
 * @returns {boolean}
 */
function isSelectable(element) {
  return !(element === document.body || element === document.documentElement || element.closest('.widget-container'));
};
