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
}
