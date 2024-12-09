/**
 * @param {State} state 
 * @param {HTMLElement} el 
 */
export function watch(state, el) {
  const elements = getEditorElements();

  const styles = getComputedStyle(el);

  let { width, height } = styles;

  elements.$iew.value = width;
  elements.$ieh.value = height;

  console.log(width, height);
}

/**
 * @returns {Object}
  */
function getEditorElements() {
  const $ie = document.querySelector(".image-element-editor");
  return {
    $ie,
    $iew: $ie.querySelector("#image-width"),
    $ieh: $ie.querySelector("#image-height"),
  }
}
