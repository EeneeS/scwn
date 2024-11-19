import * as Bus from "../../bus.js";

/**
 * @returns {Selector}
 */
export function createSelector() {
  const selector = {
    isActive: false,
    selectedElement: null,
    listener: null,
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
  state.widget.selector.isActive = false;
  if (state.widget.selector.selectedElement) {
    state.widget.selector.selectedElement.classList.remove('element-highlight');
  };
  state.widget.selector.selectedElement = null;

  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mouseout', handleMouseOut);
  document.removeEventListener('click', state.widget.selector.listener);

  Bus.publish('toggle-selector', { isActive: state.widget.selector.isActive });
};

/**
 * @param {State} state 
 */
function initElementSelector(state) {
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  state.widget.selector.listener = (e) => handleMouseClick(e, state);
  document.addEventListener('click', state.widget.selector.listener);
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
    Bus.publish('element-selected', { type: state.widget.selector.selectedElement });
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
