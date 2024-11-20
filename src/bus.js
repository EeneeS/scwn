const eb = document.createComment('widget-event-bus');

// use for debugging
//document.body.append(eb);

/**
 * @param {string} evt 
 * @param {EventListenerOrEventListenerObject} cb
 */
export function listen(evt, cb) {
  eb.addEventListener(evt, cb);
};

/**
 * @param {string} evt 
 * @param {Object} data 
 */
export function publish(evt, data) {
  eb.dispatchEvent(
    new CustomEvent(evt, { detail: data })
  );
};

