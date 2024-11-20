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

