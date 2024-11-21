export const textElements = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "span", "strong", "em", "b", "i",
  "u", "small", "mark", "del", "ins",
  "sub", "sup", "abbr", "cite", "q",
  "code", "pre", "kbd", "samp", "var",
  "blockquote", "address", "figure", "figcaption"
];

/**
 * @param {HTMLElement} el
 */
export function selectedElementType(el) {
  const type = el.tagName.toLowerCase();
  if (textElements.includes(type)) {
    return "TEXT";
  };
};

/**
 * @param {string} rgb
 * @returns {string}
 */
export function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * @param {HTMLElement} el 
 */
export function getOrCreateUniqueId(el) {
  if (!el.dataset.uniqueId) {
    el.dataset.uniqueId = `el-${Math.random().toString(36).slice(2, 11)}`;
  }
  return el.dataset.uniqueId;
}

