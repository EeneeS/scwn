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
export function enable(state) {
};
