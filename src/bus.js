const eb = document.createComment('my-event-bus');

// use for debugging
//document.body.append(eb);

export function listen(evt, cb) {
  eb.addEventListener(evt, cb);
};

export function publish(evt, data) {
  eb.dispatchEvent(
    new CustomEvent(evt, { detail: data })
  );
};

