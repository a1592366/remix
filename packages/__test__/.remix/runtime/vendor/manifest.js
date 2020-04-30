/*** MARK_1588231179898 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

/***/ "../remix-cli/node_modules/events/events.js":
/*!**************************************************!*\
  !*** ../remix-cli/node_modules/events/events.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = $getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = [];

  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

/***/ }),

/***/ "../remix-cli/node_modules/process/browser.js":
/*!****************************************************!*\
  !*** ../remix-cli/node_modules/process/browser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "../remix-cli/node_modules/setimmediate/setImmediate.js":
/*!**************************************************************!*\
  !*** ../remix-cli/node_modules/setimmediate/setImmediate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function (handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function (event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function (handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function (handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function (handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function (handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../remix-cli/node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../remix-cli/node_modules/process/browser.js")))

/***/ }),

/***/ "../remix-cli/node_modules/timers-browserify/main.js":
/*!***********************************************************!*\
  !*** ../remix-cli/node_modules/timers-browserify/main.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(/*! setimmediate */ "../remix-cli/node_modules/setimmediate/setImmediate.js"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../remix-cli/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../remix-cli/node_modules/webpack/buildin/global.js":
/*!***********************************************************!*\
  !*** ../remix-cli/node_modules/webpack/buildin/global.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../remix/config.js":
/*!**************************!*\
  !*** ../remix/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.inspectLogicUUID = exports.inspectTerminalUUID = exports.inspectTerminalTypes = exports.inspectMessageTypes = exports.internalUIURL = exports.inspectWSURL = exports.isInspectMode = void 0;
var isInspectMode = process.env.IS_INSPECT_MODE;
exports.isInspectMode = isInspectMode;
var inspectWSURL = process.env.INSPECT_WS_URL;
exports.inspectWSURL = inspectWSURL;
var internalUIURL = process.env.INSPECT_UI_URL;
exports.internalUIURL = internalUIURL;
var inspectMessageTypes = process.env.INSEPCT_MESSAGE_TYPES;
exports.inspectMessageTypes = inspectMessageTypes;
var inspectTerminalTypes = process.env.INSPECT_TERMINAL_TYPES;
exports.inspectTerminalTypes = inspectTerminalTypes;
var inspectTerminalUUID = process.env.INSPECT_TERMINAL_UUID;
exports.inspectTerminalUUID = inspectTerminalUUID;
var inspectLogicUUID = process.env.INSPECT_LOGIC_UUID;
exports.inspectLogicUUID = inspectLogicUUID;
var _default = {
  isInspectMode: isInspectMode,
  inspectWSURL: inspectWSURL,
  internalUIURL: internalUIURL,
  inspectMessageTypes: inspectMessageTypes,
  inspectTerminalTypes: inspectTerminalTypes,
  inspectTerminalUUID: inspectTerminalUUID,
  inspectLogicUUID: inspectLogicUUID
};
exports["default"] = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../remix-cli/node_modules/process/browser.js */ "../remix-cli/node_modules/process/browser.js")))

/***/ }),

/***/ "../remix/env.js":
/*!***********************!*\
  !*** ../remix/env.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.inspectLogicUUID = exports.inspectTerminalUUID = exports.inspectTerminalTypes = exports.inspectMessageTypes = exports.internalUIURL = exports.inspectWSURL = exports.isInspectMode = void 0;
var isInspectMode = process.env.IS_INSPECT_MODE;
exports.isInspectMode = isInspectMode;
var inspectWSURL = process.env.INSPECT_WS_URL;
exports.inspectWSURL = inspectWSURL;
var internalUIURL = process.env.INSPECT_UI_URL;
exports.internalUIURL = internalUIURL;
var inspectMessageTypes = process.env.INSEPCT_MESSAGE_TYPES;
exports.inspectMessageTypes = inspectMessageTypes;
var inspectTerminalTypes = process.env.INSPECT_TERMINAL_TYPES;
exports.inspectTerminalTypes = inspectTerminalTypes;
var inspectTerminalUUID = process.env.INSPECT_TERMINAL_UUID;
exports.inspectTerminalUUID = inspectTerminalUUID;
var inspectLogicUUID = process.env.INSPECT_LOGIC_UUID;
exports.inspectLogicUUID = inspectLogicUUID;
var _default = {
  isInspectMode: isInspectMode,
  inspectWSURL: inspectWSURL,
  internalUIURL: internalUIURL,
  inspectMessageTypes: inspectMessageTypes,
  inspectTerminalTypes: inspectTerminalTypes,
  inspectTerminalUUID: inspectTerminalUUID,
  inspectLogicUUID: inspectLogicUUID
};
exports["default"] = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../remix-cli/node_modules/process/browser.js */ "../remix-cli/node_modules/process/browser.js")))

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!**********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!*************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!*****************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!**********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/construct.js":
/*!*****************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/construct.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/createClass.js":
/*!*******************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/createClass.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!**********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!**********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/inherits.js":
/*!****************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/inherits.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!*****************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!******************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!***********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!****************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!***********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!*************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!*******************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!************************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!*********************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!**********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!*********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "../remix/node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "../remix/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "../remix/node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!*************************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../remix/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../remix/node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../remix/node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/typeof.js":
/*!**************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/typeof.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../remix/node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!***********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeFunction = __webpack_require__(/*! ./isNativeFunction */ "../remix/node_modules/@babel/runtime/helpers/isNativeFunction.js");

var construct = __webpack_require__(/*! ./construct */ "../remix/node_modules/@babel/runtime/helpers/construct.js");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),

/***/ "../remix/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!*****************************************************************************************!*\
  !*** ../remix/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "../remix/node_modules/react-is/index.js");
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ "../remix/node_modules/react-is/cjs/react-is.development.js":
/*!******************************************************************!*\
  !*** ../remix/node_modules/react-is/cjs/react-is.development.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.9.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
    }
    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */


    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });

        if (typeof console !== 'undefined') {
          console.warn(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_LAZY_TYPE:
          case REACT_MEMO_TYPE:
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true;
          lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.typeOf = typeOf;
    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isValidElementType = isValidElementType;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
  })();
}

/***/ }),

/***/ "../remix/node_modules/react-is/index.js":
/*!***********************************************!*\
  !*** ../remix/node_modules/react-is/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "../remix/node_modules/react-is/cjs/react-is.development.js");
}

/***/ }),

/***/ "../remix/node_modules/tiny-emitter/index.js":
/*!***************************************************!*\
  !*** ../remix/node_modules/tiny-emitter/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function E() {// Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    return this;
  },
  once: function (name, callback, ctx) {
    var self = this;

    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    ;
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },
  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    } // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
module.exports = E;
module.exports.TinyEmitter = E;

/***/ }),

/***/ "../remix/node_modules/uuid/index.js":
/*!*******************************************!*\
  !*** ../remix/node_modules/uuid/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "../remix/node_modules/uuid/v1.js");

var v4 = __webpack_require__(/*! ./v4 */ "../remix/node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
module.exports = uuid;

/***/ }),

/***/ "../remix/node_modules/uuid/lib/bytesToUuid.js":
/*!*****************************************************!*\
  !*** ../remix/node_modules/uuid/lib/bytesToUuid.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

module.exports = bytesToUuid;

/***/ }),

/***/ "../remix/node_modules/uuid/lib/rng-browser.js":
/*!*****************************************************!*\
  !*** ../remix/node_modules/uuid/lib/rng-browser.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

/***/ }),

/***/ "../remix/node_modules/uuid/v1.js":
/*!****************************************!*\
  !*** ../remix/node_modules/uuid/v1.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../remix/node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../remix/node_modules/uuid/lib/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html


var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/broofa/node-uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = rng();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

/***/ }),

/***/ "../remix/node_modules/uuid/v4.js":
/*!****************************************!*\
  !*** ../remix/node_modules/uuid/v4.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../remix/node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../remix/node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),

/***/ "../remix/project.js":
/*!***************************!*\
  !*** ../remix/project.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _project = __webpack_require__(/*! ./src/project */ "../remix/src/project/index.js");

Object.keys(_project).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _project[key];
    }
  });
});

/***/ }),

/***/ "../remix/src/Fiber.js":
/*!*****************************!*\
  !*** ../remix/src/Fiber.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneFiber = cloneFiber;
exports.createFiber = createFiber;
exports.createFiberFromText = createFiberFromText;
exports.createFiberFromElement = createFiberFromElement;
exports.createFiberFromFragment = createFiberFromFragment;
exports.createRootFiber = createRootFiber;
exports.createWorkInProgress = createWorkInProgress;

var _workTags = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

function createFiberNode(tag, pendingProps, key) {
  return {
    tag: tag,
    pendingProps: pendingProps,
    key: key,
    effectTag: _effectTags.NO_EFFECT,
    type: null,
    elementType: null,
    stateNode: null,
    update: null,
    memoizedProps: null,
    memoizedState: null,
    memoizedFibers: null,
    memoizedReactElements: null,
    pendingReactElements: null,
    pendingFibers: null,
    "return": null,
    child: null,
    sibling: null,
    status: _shared.NO_WORK
  };
}

function cloneFiber(fiber) {
  var tag = fiber.tag,
      pendingProps = fiber.pendingProps,
      key = fiber.key;
  var created = createFiber(tag, pendingProps, key);
  created.stateNode = fiber.stateNode;
  created.memoizedProps = fiber.memoizedProps;
  created.pendingFibers = fiber.pendingFibers;
  created.memoizedFibers = fiber.memoizedFibers;
  created.memoizedState = fiber.memoizedFibers;
  created.type = fiber.type;
  created.elementType = fiber.elementType;
  created.effectTag = _effectTags.NO_EFFECT;
  return created;
}

function createFiber(tag, pendingProps, key) {
  return createFiberNode(tag, pendingProps, key);
}

function createFiberFromText(content) {
  var fiber = createFiber(_workTags.HOST_TEXT, content, null);
  return fiber;
}

function createFiberFromElement(element) {
  var owner = element._owner;
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  return fiber;
}

function createFiberFromFragment(elements) {
  var fiber = createFiber(_workTags.FRAGMENT, elements);
  return fiber;
}

function createFiberFromTypeAndProps(type, // React$ElementType
key, pendingProps, owner) {
  var fiber;
  var fiberTag = _workTags.FUNCTION_COMPONENT;
  ;
  var resolvedType = type;

  if (typeof type === 'function') {
    var prototype = type.prototype;

    if (prototype && prototype.isReactComponent) {
      fiberTag = _workTags.CLASS_COMPONENT;
    }
  } else if (typeof type === 'string') {
    fiberTag = _workTags.HOST_COMPONENT;
  }

  fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  return fiber;
}

function createRootFiber(container) {
  var uninitializedFiber = createFiberNode(_workTags.HOST_ROOT, null, null);
  var root = {
    containerInfo: container,
    workInProgress: uninitializedFiber
  };
  uninitializedFiber.stateNode = root;
  uninitializedFiber[_shared.INTERNAL_ROOTFIBER_KEY] = uninitializedFiber;
  return root;
}

function createWorkInProgress() {}

/***/ }),

/***/ "../remix/src/ReactCommit.js":
/*!***********************************!*\
  !*** ../remix/src/ReactCommit.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;
exports.commitAllWork = commitAllWork;

var _effectTags = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");

var _workTags = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var _DOMProperties = __webpack_require__(/*! ./renderer/config/DOMProperties */ "../remix/src/renderer/config/DOMProperties.js");

var _appendChildToContainer = _interopRequireDefault(__webpack_require__(/*! ./renderer/config/appendChildToContainer */ "../remix/src/renderer/config/appendChildToContainer.js"));

var _appendChild = _interopRequireDefault(__webpack_require__(/*! ./renderer/config/appendChild */ "../remix/src/renderer/config/appendChild.js"));

var _insertBefore = _interopRequireDefault(__webpack_require__(/*! ./renderer/config/insertBefore */ "../remix/src/renderer/config/insertBefore.js"));

var ReactCommitQueue = [];

function push(workInProgress) {
  if (workInProgress.effectTag & _effectTags.NO_EFFECT) {// nothing to do
  } else {
    ReactCommitQueue.push(workInProgress);
  }
}

function commitAllWork() {
  var workInProgress = ReactCommitQueue.shift();

  while (workInProgress) {
    var _workInProgress = workInProgress,
        effectTag = _workInProgress.effectTag,
        tag = _workInProgress.tag;

    if (tag === _workTags.HOST_COMPONENT || tag === _workTags.HOST_TEXT || tag === _workTags.HOST_ROOT) {
      if (effectTag & _effectTags.PLACEMENT) {
        commitPlacement(workInProgress);
        workInProgress.effectTag &= ~_effectTags.PLACEMENT;
      } else if (effectTag & _effectTags.UPDATE) {
        commitUpdate(workInProgress);
        workInProgress.effectTag &= ~_effectTags.UPDATE;
      } else if (effectTag & _effectTags.DELETION) {
        commitDeletion(workInProgress);
        workInProgress.effectTag &= ~_effectTags.DELETION;
      }
    }

    workInProgress.memoizedProps = workInProgress.pendingProps;
    workInProgress = ReactCommitQueue.shift();
  }
}

function commitDeletion(workInProgress) {
  var stateNode = workInProgress.stateNode,
      type = workInProgress.type,
      pendingProps = workInProgress.pendingProps,
      memoizedProps = workInProgress.memoizedProps;
  var instance = stateNode;
  instance[_shared.INTERNAL_EVENT_HANDLERS_KEY] = null;
  (0, _DOMProperties.updateDOMProperties)(type, instance, {}, memoizedProps);
  instance.parentNode.removeChild(instance);
}

function commitUpdate(workInProgress) {
  var stateNode = workInProgress.stateNode,
      type = workInProgress.type,
      pendingProps = workInProgress.pendingProps,
      memoizedProps = workInProgress.memoizedProps;
  var instance = stateNode;
  instance[_shared.INTERNAL_EVENT_HANDLERS_KEY] = pendingProps;
  (0, _DOMProperties.updateDOMProperties)(type, instance, pendingProps, memoizedProps);
}

function commitPlacement(workInProgress) {
  var parentFiber = getHostParentFiber(workInProgress);
  var tag = parentFiber.tag,
      stateNode = parentFiber.stateNode;
  var parent;
  var isContainer;

  if (tag === _workTags.HOST_COMPONENT) {
    parent = stateNode;
    isContainer = false;
  } else if (tag === _workTags.HOST_ROOT) {
    parent = stateNode.containerInfo;
    isContainer = true;
  } else {}

  var before = getHostSibling(workInProgress);
  var node = workInProgress;

  while (true) {
    var isHost = node.tag === _workTags.HOST_COMPONENT || node.tag === _workTags.HOST_TEXT;

    if (isHost) {
      var _stateNode = isHost ? node.stateNode : node.stateNode.instance;

      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, _stateNode, before);
        } else {
          (0, _insertBefore["default"])(parent, _stateNode, before);
        }
      } else {
        if (isContainer) {
          (0, _appendChildToContainer["default"])(parent, _stateNode);
        } else {
          (0, _appendChild["default"])(parent, _stateNode);
        }
      }
    } else if (node.tag === _workTags.HOST_PORTAL) {} else if (node.child !== null) {
      node.child["return"] = node;
      node = node.child;
      continue;
    }

    if (node === workInProgress) {
      return;
    }

    while (node.sibling === null) {
      if (node["return"] === null || node["return"] === workInProgress) {
        return;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;
  }
}

function isHostParent(fiber) {
  return fiber.tag === _workTags.HOST_COMPONENT || fiber.tag === _workTags.HOST_ROOT || fiber.tag === _workTags.HOST_PORTAL;
}

function getHostSibling(fiber) {
  var node = fiber;

  siblings: while (true) {
    while (node.sibling === null) {
      if (node["return"] === null || isHostParent(node["return"])) {
        return null;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;

    while (node.tag !== _workTags.HOST_COMPONENT && node.tag !== _workTags.HOST_TEXT) {
      if (node.effectTag & _effectTags.PLACEMENT) {
        continue siblings;
      }

      if (node.child === null || node.tag === _workTags.HOST_PORTAL) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = node.child;
      }
    }

    if (!(node.effectTag & _effectTags.PLACEMENT)) {
      return node.stateNode;
    }
  }
}

function getHostParentFiber(fiber) {
  var node = fiber["return"];

  while (node !== null) {
    if (isHostParent(node)) {
      return node;
    }

    node = node["return"];
  }
}

/***/ }),

/***/ "../remix/src/ReactDOMUpdator.js":
/*!***************************************!*\
  !*** ../remix/src/ReactDOMUpdator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMUpdateQueue = DOMUpdateQueue;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _document = __webpack_require__(/*! ./document */ "../remix/src/document/index.js");

var _project = __webpack_require__(/*! ./project */ "../remix/src/project/index.js");

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var flattern = function flattern(element) {
  var child = element.child;

  if (child) {
    var siblings = [];
    var sibling = child.sibling;

    if (child.child) {
      flattern(child);
    }

    while (sibling) {
      if (sibling.child) {
        flattern(sibling);
      }

      var _sibling = sibling,
          s = _sibling.sibling,
          rest = (0, _objectWithoutProperties2["default"])(_sibling, ["sibling"]);
      siblings.push(rest);
      sibling = sibling.sibling;
    }

    if (siblings.length > 0) {
      child.siblings = siblings;
    }

    delete child.sibling;
  }
};

function DOMUpdateQueue(workInProgress) {
  var stateNode = workInProgress.stateNode;

  if (stateNode) {
    var containerInfo = stateNode.containerInfo;

    if (containerInfo.tagName === 'view-controller') {
      var element = containerInfo.serialize();
      flattern(element);

      _project.ViewNativeSupport.Publisher.Data(containerInfo[_shared.INTERNAL_RELATIVE_KEY], element.child);
    }
  }
}

/***/ }),

/***/ "../remix/src/ReactEvent.js":
/*!**********************************!*\
  !*** ../remix/src/ReactEvent.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleWork = scheduleWork;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _nextTick = _interopRequireDefault(__webpack_require__(/*! ./shared/nextTick */ "../remix/src/shared/nextTick.js"));

var _performance = _interopRequireDefault(__webpack_require__(/*! ./shared/performance */ "../remix/src/shared/performance.js"));

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var ReactCurrentScheduler;
var ReactCurrentSchedulerHeap = [];
var _ref = [0, parseInt(1000 / _shared.SCHEDULE_FPS), parseInt(2000 / _shared.SCHEDULE_FPS)],
    IMMEDIATE = _ref[0],
    FIRST = _ref[1],
    DEFAULT = _ref[2];
var bubbleEvents = ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'tap', 'longpress', 'longtap', 'touchforcechange', 'transitionend', 'animationstart', 'animationiteration', 'animationend', 'input'];
var priority = {
  touchstart: IMMEDIATE,
  touchmove: IMMEDIATE,
  touchcancel: IMMEDIATE,
  touchend: IMMEDIATE,
  tap: IMMEDIATE,
  longpress: IMMEDIATE,
  longtap: IMMEDIATE,
  touchforcechange: IMMEDIATE,
  transitionend: IMMEDIATE,
  animationstart: IMMEDIATE,
  animationiteration: IMMEDIATE,
  animationend: IMMEDIATE,
  scroll: IMMEDIATE,
  onInput: IMMEDIATE,
  focus: FIRST,
  blur: FIRST,
  confirm: FIRST,
  timeupdate: FIRST,
  defaults: DEFAULT
};

var ViewEvent = /*#__PURE__*/function () {
  function ViewEvent(event) {
    (0, _classCallCheck2["default"])(this, ViewEvent);
    this.nativeEvent = event;
    var type = event.type,
        detail = event.detail,
        touches = event.touches,
        timeStamp = event.timeStamp,
        changedTouches = event.changedTouches;
    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = bubbleEvents.includes(this.type);
    this.cancelBubble = false;
    this.detail = detail;
  }

  (0, _createClass2["default"])(ViewEvent, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.cancelBubble = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {}
  }]);
  return ViewEvent;
}();

function push(node) {
  ReactCurrentSchedulerHeap.push(node);

  if (ReactCurrentSchedulerHeap.length > 1) {
    siftup(node, ReactCurrentSchedulerHeap.length);
  }
}

function siftup(node, leaf) {
  while (leaf > 0) {
    // 父节点 索引 
    var index = leaf - 1 >>> 2;
    var parent = ReactCurrentSchedulerHeap[index]; // 与父节点比较

    if (parent.level < node.level) {
      ReactCurrentSchedulerHeap[index] = node;
      ReactCurrentSchedulerHeap[leaf] = parent;
      leaf = index;
    } else if (parent.level === node.level) {
      if (parent.begin > node.level) {
        ReactCurrentSchedulerHeap[index] = node;
        ReactCurrentSchedulerHeap[leaf] = parent;
        leaf = index;
      }
    }
  }
}

function siftdown(node, first) {
  var length = ReactCurrentSchedulerHeap.length;

  while (true) {
    var l = first * 2 + 1;
    var left = ReactCurrentSchedulerHeap[l];

    if (l > length) {
      break;
    } // 右边叶子索引 = 父节点索引 * 2 + 2 = 左边索引 + 1


    var r = l + 1;
    var right = ReactCurrentSchedulerHeap[r]; // 选左右叶子索引

    var c = r < length && right.level - left.level < 0 ? r : l;
    var child = ReactCurrentSchedulerHeap[c]; // 不用交换

    if (child) {
      if (child.level < node.level < 0 || child.begin > node.begin) {
        break;
      }
    } // 交换节点


    ReactCurrentSchedulerHeap[c] = node;
    ReactCurrentSchedulerHeap[first] = child;
    first = c;
  }
}

function pop() {
  var first = ReactCurrentSchedulerHeap[0];

  if (first) {
    var last = ReactCurrentSchedulerHeap.pop();

    if (last === first) {
      return first;
    }

    ReactCurrentSchedulerHeap[0] = last;
    siftdown(last, 0);
    return first;
  } else {
    return null;
  }
}

function peek() {
  return ReactCurrentSchedulerHeap[0] || null;
}

function flush() {
  var next = peek();

  while (next) {
    var schedule = next.schedule;
    schedule.schedule = null;
    schedule();
    pop();
    next = peek();
  }
}

function flushWork() {
  ReactCurrentScheduler = flush;

  var next = function next() {
    if (ReactCurrentScheduler) {
      ReactCurrentScheduler();
      peek() ? flushWork() : ReactCurrentScheduler = null;
    }
  };

  (0, _nextTick["default"])(next);
}

function dispatchEvent(view, type, event) {
  var props = view[_shared.INTERNAL_EVENT_HANDLERS_KEY];

  if (typeof props[type] === 'function') {
    props[type](new ViewEvent(event));
  }
}

function scheduleWork(_ref2) {
  var type = _ref2.type,
      event = _ref2.event,
      view = _ref2.view;
  return dispatchEvent(view, type, event);
  var level = priority[type] || priority.defaults;

  if (level === IMMEDIATE) {
    dispatchEvent(view, type, event);
  } else {
    var work = {
      schedule: function schedule() {
        return dispatchEvent(view, type, event);
      },
      begin: _performance["default"].now(),
      level: level
    };
    push(work);
    flushWork();
  }
}

/***/ }),

/***/ "../remix/src/ReactHook.js":
/*!*********************************!*\
  !*** ../remix/src/ReactHook.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetReactCurrentHookCursor = resetReactCurrentHookCursor;
exports.useMemo = useMemo;
exports.useCallback = useCallback;
exports.useEffect = useEffect;
exports.useContext = useContext;
exports.createContext = createContext;
exports.useState = useState;
exports.useReducer = useReducer;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../remix/node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _ReactScheduler = __webpack_require__(/*! ./ReactScheduler */ "../remix/src/ReactScheduler.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ReactHook = {
  ReactCurrentHookFiber: null,
  ReactCurrentHookCursor: 0,
  ReactCurrentHookContextId: 0,

  get ReactHookContextId() {
    return "@".concat(this.ReactCurrentHookContextId++);
  },

  get ReactCurrentHooks() {
    var cursor = ReactHook.ReactCurrentHookCursor++;
    var fiber = ReactHook.ReactCurrentHookFiber;
    var hooks = fiber.memoizedHooks;

    if (!hooks) {
      hooks = fiber.memoizedHooks = createMemoizedHooks();
    }

    if (cursor >= hooks.defaults.length) {
      hooks.defaults.push([]);
    }

    return [hooks.defaults[cursor], fiber];
  }

};

var _DEFAULTEFFECTLAYOU = 'DEFAULT EFFECT LAYOUT'.split(' '),
    _DEFAULTEFFECTLAYOU2 = (0, _slicedToArray2["default"])(_DEFAULTEFFECTLAYOU, 3),
    DEFAULT = _DEFAULTEFFECTLAYOU2[0],
    EFFECT = _DEFAULTEFFECTLAYOU2[1],
    LAYOUT = _DEFAULTEFFECTLAYOU2[2];

function createMemoizedHooks() {
  var defaultHooks = null;
  var effectHooks = null;
  var layoutHooks = null;
  return {
    get defaults() {
      return defaultHooks || (defaultHooks = new Hooks(DEFAULT));
    },

    get effects() {
      return effectHooks || (effectHooks = new Hooks(EFFECT));
    },

    get layouts() {
      return layoutHooks || (layoutHooks = new Hooks(LAYOUT));
    }

  };
}

var Hooks = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(Hooks, _Array);

  var _super = _createSuper(Hooks);

  function Hooks(type) {
    var _this;

    (0, _classCallCheck2["default"])(this, Hooks);
    _this = _super.call(this);
    _this.type = type;
    return _this;
  }

  return Hooks;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array));

var hasChanged = function hasChanged(memoized, pending) {
  if (!memoized) {
    return true;
  }

  return pending.some(function (ref, index) {
    return ref !== memoized[index];
  });
};

function resetReactCurrentHookCursor() {
  ReactHook.ReactCurrentHookCursor = 0;
}

function useMemo(callback, dependences) {
  var _ReactHook$ReactCurre = (0, _slicedToArray2["default"])(ReactHook.ReactCurrentHooks, 1),
      hook = _ReactHook$ReactCurre[0];

  if (hasChanged(hook[1], dependences)) {
    hook[1] = dependences;
    return hook[0] = callback();
  }

  return hook[0];
}

function useCallback(callback, dependences) {
  return useMemo(function () {
    return callback;
  }, dependences);
}

function useEffect(callback, dependences) {
  return;
}

function useContext(context, selector) {
  var _ReactHook$ReactCurre2 = (0, _slicedToArray2["default"])(ReactHook.ReactCurrentHooks, 2),
      hooks = _ReactHook$ReactCurre2[0],
      fiber = _ReactHook$ReactCurre2[1];

  var value = fiber.context[context.id];
  var selected = selector ? selector(value) : value;

  if (selected === null) {
    return defaultValue;
  }

  if (hooks[0] !== selected) {
    hooks[0] = selected;
  }

  return hooks[0];
}

function createContext(defaultValue) {
  var id = ReactHook.ReactHookContextId;
  var context = {
    id: id,
    defaultValue: defaultValue,
    Consumer: function Consumer(props, context) {
      if (typeof props.children === 'function') {
        return props.children(context[id]);
      } else {// 
      }
    },
    Provider: function Provider(props) {
      var currentFiber = ReactHook.ReactCurrentHookFiber;
      currentFiber.context = currentFiber.context || (currentFiber.context = {});
      currentFiber.context[id] = props.value;
      return props.children;
    }
  };
  return context;
}

function useState(initialState) {
  return useReducer(null, initialState);
}

function useReducer(reducer, initialState) {
  var _ReactHook$ReactCurre3 = (0, _slicedToArray2["default"])(ReactHook.ReactCurrentHooks, 2),
      hooks = _ReactHook$ReactCurre3[0],
      fiber = _ReactHook$ReactCurre3[1];

  var setter = function setter(value) {
    var result;

    if (typeof reducer === 'function') {
      result = reducer(hooks[0], value);
    } else if (typeof value === 'function') {
      result = value(hooks[0]);
    } else {
      result = value;
    }

    if (result !== hooks[0]) {
      hooks[0] = result;
      (0, _ReactScheduler.scheduleUpdate)(fiber);
    }
  };

  if (hooks.length) {
    return [hooks[0], setter];
  }

  return [hooks[0] = initialState, setter];
}

var _default = ReactHook;
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/ReactReconciler.js":
/*!***************************************!*\
  !*** ../remix/src/ReactReconciler.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFragment = updateFragment;
exports.updateHostComponent = updateHostComponent;
exports.updateFunctionComponent = updateFunctionComponent;
exports.updateHostRoot = updateHostRoot;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js"));

var _effectTags = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ./shared/is */ "../remix/src/shared/is.js");

var _Fiber = __webpack_require__(/*! ./Fiber */ "../remix/src/Fiber.js");

var _renderer = __webpack_require__(/*! ./renderer */ "../remix/src/renderer/index.js");

var _DOMProperties = __webpack_require__(/*! ./renderer/config/DOMProperties */ "../remix/src/renderer/config/DOMProperties.js");

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var _ReactCommit = __webpack_require__(/*! ./ReactCommit */ "../remix/src/ReactCommit.js");

var _ReactHook = _interopRequireWildcard(__webpack_require__(/*! ./ReactHook */ "../remix/src/ReactHook.js"));

var _createInstance = _interopRequireDefault(__webpack_require__(/*! ./renderer/config/createInstance */ "../remix/src/renderer/config/createInstance.js"));

var _classComponentUpdater = _interopRequireDefault(__webpack_require__(/*! ./classComponentUpdater */ "../remix/src/classComponentUpdater.js"));

function updateFragment(workInProgress) {
  var nextChildren = workInProgress.pendingProps;
  reconcileChildren(workInProgress, nextChildren);
  return workInProgress.child;
}

function updateHostComponent(workInProgress) {
  var nextProps = workInProgress.pendingProps;
  var children = nextProps.children;
  var typeofChildren = (0, _typeof2["default"])(children);
  var isDirectTextChild = typeofChildren === 'string' || typeofChildren === 'number';
  var nextChildren = nextProps.children;
  var instance = workInProgress.stateNode;

  if (isDirectTextChild) {
    nextChildren = null;
  }

  if (instance === null) {
    var type = workInProgress.type;
    var _nextProps = workInProgress.pendingProps;
    var memoizedProps = workInProgress.memoizedProps;
    var rootContainerInstance = getRootHostContainer();
    instance = workInProgress.stateNode = (0, _createInstance["default"])(type, _nextProps, rootContainerInstance, workInProgress);
    (0, _DOMProperties.updateDOMProperties)(type, instance, _nextProps, memoizedProps);
  } else {
    var _nextProps2 = workInProgress.pendingProps;
    var _memoizedProps = workInProgress.memoizedProps;

    if ((0, _shared.shallowEqual)(_memoizedProps, _nextProps2)) {
      (0, _Fiber.cloneFiber)(workInProgress);
      return workInProgress.child;
    }
  }

  reconcileChildren(workInProgress, nextChildren);
  return workInProgress.child;
}

function updateFunctionComponent(workInProgress) {
  var stateNode = workInProgress.stateNode,
      memoizedProps = workInProgress.memoizedProps,
      pendingProps = workInProgress.pendingProps;
  var instance = stateNode;

  if (instance && workInProgress.status === _shared.NO_WORK && (0, _shared.shallowEqual)(memoizedProps, pendingProps)) {
    return cloneChildren(workInProgress);
  }

  if (workInProgress["return"] && workInProgress["return"].context) {
    workInProgress.context = workInProgress["return"].context;
  }

  _ReactHook["default"].ReactCurrentHookFiber = workInProgress;
  (0, _ReactHook.resetReactCurrentHookCursor)();
  var children = workInProgress.type(workInProgress.pendingProps, workInProgress.context);

  if ((0, _is.isString)(children)) {
    children = createText(children);
  }

  workInProgress.stateNode = workInProgress.stateNode || workInProgress;
  reconcileChildren(workInProgress, children);
  return workInProgress.child;
}

function updateHostRoot(workInProgress) {
  var update = workInProgress.update;
  var payload = update.payload;
  var pendingProps = workInProgress.pendingProps;
  var memoizedState = workInProgress.memoizedState;
  var children = memoizedState !== null ? memoizedState.element : null;
  var resultState;

  if (typeof payload === 'function') {
    resultState = payload.call(instance, prevState, nextProps);
  } else {
    resultState = payload;
  }

  workInProgress.memoizedState = resultState;
  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;

  if (children === nextChildren) {} else {
    reconcileChildren(workInProgress, nextChildren);
  }

  return workInProgress.child;
}

function createPendingReactElements(children) {
  var pendingKeys = {};
  children.forEach(function (child, index) {
    if ((0, _is.isArray)(child)) {
      child.filter(function (child) {
        return child;
      }).forEach(function (child, i) {
        pendingKeys[createReactElementKey(index, i, child.key)] = child;
      });
    } else {
      pendingKeys[createReactElementKey(0, null, child.key)] = child;
    }
  });
  return pendingKeys;
}

function createChild(returnFiber, newChild) {
  // 判断是否是纯文本
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    var created = (0, _Fiber.createFiberFromText)('' + newChild);
    created["return"] = returnFiber;
    created[_shared.INTERNAL_ROOTFIBER_KEY] = returnFiber[_shared.INTERNAL_ROOTFIBER_KEY];
    return created;
  } // 如果是对象


  if ((0, _typeof2["default"])(newChild) === 'object' && newChild !== null) {
    // TODO 根据 $$typeof 构建 fiber
    if (newChild.$$typeof) {
      var _created = (0, _Fiber.createFiberFromElement)(newChild);

      _created["return"] = returnFiber;
      _created[_shared.INTERNAL_ROOTFIBER_KEY] = returnFiber[_shared.INTERNAL_ROOTFIBER_KEY];
      return _created;
    }
  } // 如果是数组


  if ((0, _is.isArray)(newChild)) {
    var _created2 = (0, _Fiber.createFiberFromFragment)(newChild, null);

    _created2["return"] = returnFiber;
    _created2[_shared.INTERNAL_ROOTFIBER_KEY] = returnFiber[_shared.INTERNAL_ROOTFIBER_KEY];
    return _created2;
  }

  return null;
}

function createReactElementKey(index, next, key) {
  if (key !== null && next !== null) {
    return ".".concat(index, ".").concat(key);
  } else if (next !== null) {
    return ".".concat(index, ".").concat(next);
  } else if (key !== null) {
    return ".".concat(key);
  } else {
    return ".".concat(index);
  }
}

function reconcileChildren(workInProgress, children) {
  if (children) {
    var memoizedReactElements = workInProgress.memoizedReactElements;
    var memoizedReactFibers = workInProgress.memoizedReactFibers;
    var pendingReactElements = workInProgress.pendingReactElements = createPendingReactElements([children]);
    var reactElements = {};
    var pendingReactFibers = {}; // 标记删除

    for (var key in memoizedReactElements) {
      var newChild = pendingReactElements[key];
      var child = memoizedReactElements[key];
      var fiber = memoizedReactFibers[key];

      if (newChild && newChild.type === child.type) {
        reactElements[key] = child;
      } else {
        fiber.effectTag |= _effectTags.DELETION;
        (0, _ReactCommit.push)(fiber);
      }
    }

    var prevChild = null;

    for (var _key in pendingReactElements) {
      var newFiber = void 0;
      var _newChild = pendingReactElements[_key];
      var _child = reactElements[_key]; // 如果

      if (_child) {
        var alternate = memoizedReactFibers[_key];
        newFiber = createChild(workInProgress, _newChild);
        newFiber.effectTag |= _effectTags.UPDATE;
        newFiber.memoizedProps = alternate.memoizedProps;
        newFiber.memoizedReactFibers = alternate.memoizedReactFibers;
        newFiber.memoizedReactElements = alternate.memoizedReactElements;
        newFiber.stateNode = alternate.stateNode; // debugger;
        // if (shouldPlace(newChild)) {
        //   newChild.effectTag |= PLACEMENT;
        // }
      } else {
        newFiber = createChild(workInProgress, _newChild);
        newFiber.effectTag |= _effectTags.PLACEMENT;
      }

      (0, _ReactCommit.push)(newFiber);
      pendingReactFibers[_key] = newFiber;

      if (prevChild) {
        prevChild.sibling = newFiber;
      } else {
        workInProgress.child = newFiber;
      }

      prevChild = newFiber;
    }

    workInProgress.memoizedReactFibers = pendingReactFibers;
    workInProgress.memoizedReactElements = workInProgress.pendingReactElements;

    if (prevChild) {
      prevChild.sibling = null;
    }
  }
}

function cloneChildren(fiber) {
  if (fiber.child) {
    var child = fiber.child;
    var newChild = (0, _Fiber.cloneFiber)(child);
    newChild["return"] = fiber;
    newChild.sibling = null;
    fiber.child = newChild;
  }
}

function getRootHostContainer() {
  var root = _renderer.ReactCurrentRoot.current.internalRoot;
  return root.containerInfo;
}

/***/ }),

/***/ "../remix/src/ReactScheduler.js":
/*!**************************************!*\
  !*** ../remix/src/ReactScheduler.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleUpdate = scheduleUpdate;
exports.scheduleRootUpdate = scheduleRootUpdate;

var _performance = _interopRequireDefault(__webpack_require__(/*! ./shared/performance */ "../remix/src/shared/performance.js"));

var _nextTick = _interopRequireDefault(__webpack_require__(/*! ./shared/nextTick */ "../remix/src/shared/nextTick.js"));

var _ReactCommit = __webpack_require__(/*! ./ReactCommit */ "../remix/src/ReactCommit.js");

var _ReactUpdater = __webpack_require__(/*! ./ReactUpdater */ "../remix/src/ReactUpdater.js");

var _ReactReconciler = __webpack_require__(/*! ./ReactReconciler */ "../remix/src/ReactReconciler.js");

var _ReactDOMUpdator = __webpack_require__(/*! ./ReactDOMUpdator */ "../remix/src/ReactDOMUpdator.js");

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var _workTags = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");

var isRendering = false;
var isCommiting = false;
var ReactCurrentScheduler;
var scheduleDeadline = 0;
var workInProgress = null;
var pendingCommitWorkInProgress = null;
var ReactCurrentSchedulerHeap = [];

function push(node) {
  ReactCurrentSchedulerHeap.push(node);
  siftup(node, ReactCurrentSchedulerHeap.length);
}

function siftup(node, leaf) {
  while (leaf > 0) {
    // 父节点 索引 
    var index = leaf - 1 >>> 2;
    var parent = ReactCurrentSchedulerHeap[index]; // 与父节点比较

    if (parent[_shared.SCHEDULE_KEY] - node[_shared.SCHEDULE_KEY] >= 0) {
      // 交换位置
      ReactCurrentSchedulerHeap[index] = node;
      ReactCurrentSchedulerHeap[leaf] = parent;
      leaf = index;
    }
  }
}

function siftdown(node, first) {
  var length = ReactCurrentSchedulerHeap.length;

  while (true) {
    var l = first * 2 + 1;
    var left = ReactCurrentSchedulerHeap[l];

    if (l > length) {
      break;
    } // 右边叶子索引 = 父节点索引 * 2 + 2 = 左边索引 + 1


    var r = l + 1;
    var right = ReactCurrentSchedulerHeap[r]; // 选左右叶子索引

    var c = r < length && right.due - left.due < 0 ? r : l;
    var child = ReactCurrentSchedulerHeap[c]; // 不用交换

    if (child) {
      if (child[_shared.SCHEDULE_KEY] - node[_shared.SCHEDULE_KEY] < 0) {
        break;
      }
    } // 交换节点


    ReactCurrentSchedulerHeap[c] = node;
    ReactCurrentSchedulerHeap[first] = child;
    first = c;
  }
}

function pop() {
  var first = ReactCurrentSchedulerHeap[0];

  if (first) {
    var last = ReactCurrentSchedulerHeap.pop();

    if (last === first) {
      return first;
    }

    ReactCurrentSchedulerHeap[0] = last;
    siftdown(last, 0);
    return first;
  } else {
    return null;
  }
}

function peek() {
  return ReactCurrentSchedulerHeap[0] || null;
}

function flush(now) {
  var nextUnitOfWork = peek();

  while (nextUnitOfWork) {
    var isExpired = isRendering ? false : nextUnitOfWork.due > now;

    if (isExpired && shouldYeild()) {
      break;
    }

    var schedule = nextUnitOfWork.schedule;
    schedule.schedule = null;
    schedule(isExpired);
    isExpired && workInProgress ? nextUnitOfWork.schedule = workLoop : pop();
    nextUnitOfWork = peek();
    now = _performance["default"].now();
  }
}

function flushWork() {
  ReactCurrentScheduler = flush;

  var next = function next() {
    if (ReactCurrentScheduler) {
      var now = _performance["default"].now();

      scheduleDeadline = now + 1000 / _shared.SCHEDULE_FPS;
      ReactCurrentScheduler(now);
      peek() ? flushWork() : ReactCurrentScheduler = null;
    }
  };

  isRendering ? next() : (0, _nextTick["default"])(next);
}

function scheduleWork() {
  var begin = _performance["default"].now();

  var due = begin + _shared.SCHEDULE_TIMEOUT;
  var work = {
    schedule: workLoop,
    begin: begin,
    due: due
  };
  push(work);
  flushWork();
}

function shouldYeild() {
  return isRendering ? false : _performance["default"].now() >= scheduleDeadline;
}

function workLoop(isExpired) {
  if (!workInProgress) {
    workInProgress = (0, _ReactUpdater.dequeueUpdateQueue)();
  }

  while (workInProgress && (!shouldYeild() || !isExpired)) {
    workInProgress = performUnitOfWork(workInProgress);
  }

  if (pendingCommitWorkInProgress) {
    (0, _ReactCommit.commitAllWork)();
    (0, _ReactDOMUpdator.DOMUpdateQueue)(pendingCommitWorkInProgress);
    pendingCommitWorkInProgress = null;
  }
}

function performUnitOfWork(workInProgress) {
  beginWork(workInProgress);
  workInProgress.status = _shared.NO_WORK;

  if (workInProgress.child) {
    return workInProgress.child;
  }

  var node = workInProgress;

  while (node) {
    completeWork(node);

    if (node.sibling) {
      return node.sibling;
    }

    node = node["return"];
  }
}

function completeWork(workInProgress) {
  if (!workInProgress["return"]) {
    pendingCommitWorkInProgress = workInProgress;
  }
}

function beginWork(workInProgress) {
  var tag = workInProgress.tag;

  switch (tag) {
    case _workTags.FRAGMENT:
      {
        return (0, _ReactReconciler.updateFragment)(workInProgress);
      }

    case _workTags.HOST_ROOT:
      {
        return (0, _ReactReconciler.updateHostRoot)(workInProgress);
      }

    case _workTags.FUNCTION_COMPONENT:
    case _workTags.CLASS_COMPONENT:
      {
        return (0, _ReactReconciler.updateFunctionComponent)(workInProgress);
      }

    case _workTags.HOST_COMPONENT:
      {
        return (0, _ReactReconciler.updateHostComponent)(workInProgress);
      }
  }
}

function scheduleUpdate(fiber) {
  (0, _ReactUpdater.enqueueUpdateQueue)(fiber);
  scheduleWork();
}

function scheduleRootUpdate(fiber) {
  isRendering = true;
  scheduleUpdate(fiber);
}

/***/ }),

/***/ "../remix/src/ReactUpdater.js":
/*!************************************!*\
  !*** ../remix/src/ReactUpdater.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enqueueUpdateQueue = enqueueUpdateQueue;
exports.dequeueUpdateQueue = dequeueUpdateQueue;

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var UpdaterQueue = [];

function enqueueUpdateQueue(fiber) {
  if (fiber.status === _shared.NO_WORK) {
    fiber.status = _shared.PENDING_WORK;
    UpdaterQueue.push(fiber);
  }
}

function dequeueUpdateQueue() {
  return UpdaterQueue.shift();
}

/***/ }),

/***/ "../remix/src/classComponentUpdater.js":
/*!*********************************************!*\
  !*** ../remix/src/classComponentUpdater.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UNMOUNTED = exports.MOUNTED = exports.MOUNTING = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var _effectTags = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");

var _workTags = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");

var _ReactScheduler = __webpack_require__(/*! ./ReactScheduler */ "../remix/src/ReactScheduler.js");

var MOUNTING = 1,
    MOUNTED = 2,
    UNMOUNTED = 3;
exports.UNMOUNTED = UNMOUNTED;
exports.MOUNTED = MOUNTED;
exports.MOUNTING = MOUNTING;
var _default = {
  isMounted: function isMounted(component) {
    var fiber = component._reactInternalFiber;

    if (fiber) {
      var node = fiber;

      if (!fiber.alternate) {
        if ((node.effectTag & _effectTags.PLACEMENT) !== NoEffect) {
          return MOUNTING;
        }

        while (node["return"]) {
          node = node["return"];

          if ((node.effectTag & _effectTags.PLACEMENT) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node["return"]) {
          node = node["return"];
        }
      }

      if (node.tag === _workTags.HOST_ROOT) {
        return MOUNTED;
      }

      return UNMOUNTED;
    }

    return false;
  },
  enqueueSetState: function enqueueSetState(inst, payload, callback) {
    var fiber = inst._reactInternalFiber;
    var update = {
      payload: payload,
      tag: _shared.UPDATE_STATE
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.update = update;
    (0, _ReactScheduler.scheduleUpdate)(fiber);
  },
  enqueueReplaceState: function enqueueReplaceState(inst, payload, callback) {
    var fiber = inst._reactInternalFiber;
    var update = {
      payload: payload,
      tag: _shared.REPLACE_STATE
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.update = update;
    (0, _ReactScheduler.scheduleUpdate)(fiber);
  },
  enqueueForceUpdate: function enqueueForceUpdate(inst, callback) {
    var fiber = inst._reactInternalFiber;
    var update = {
      payload: payload,
      tag: _shared.FORCE_UPDATE
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    (0, _ReactScheduler.scheduleUpdate)(fiber);
  }
};
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/components/Application.js":
/*!**********************************************!*\
  !*** ../remix/src/components/Application.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Application;

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var Children = _interopRequireWildcard(__webpack_require__(/*! ../react/Children */ "../remix/src/react/Children.js"));

var _router = __webpack_require__(/*! ../router */ "../remix/src/router/index.js");

var _TabBar = _interopRequireDefault(__webpack_require__(/*! ./TabBar */ "../remix/src/components/TabBar.js"));

function Application(props) {
  var cloneApplicationChildren = function cloneApplicationChildren() {
    var children = [];
    Children.forEach(props.children, function (child) {
      if (child !== null) {
        var type = child.type;

        if (type === _router.Router || type === _TabBar["default"]) {
          children.push(child);
        }
      }
    });
    return children;
  };

  return cloneApplicationChildren();
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/TabBar.js":
/*!*****************************************!*\
  !*** ../remix/src/components/TabBar.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var _Component3 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _hooks = __webpack_require__(/*! ../hooks */ "../remix/src/hooks/index.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TabBarItem = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(TabBarItem, _Component);

  var _super = _createSuper(TabBarItem);

  function TabBarItem() {
    (0, _classCallCheck2["default"])(this, TabBarItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(TabBarItem, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("view", null, this.props.children);
    }
  }]);
  return TabBarItem;
}(_Component3["default"]);

(0, _defineProperty2["default"])(TabBarItem, "propTypes", {
  path: _PropTypes["default"].string,
  icon: _PropTypes["default"].string,
  selectedIcon: _PropTypes["default"].string,
  children: _PropTypes["default"].string
});

var TabBar = /*#__PURE__*/function (_Component2) {
  (0, _inherits2["default"])(TabBar, _Component2);

  var _super2 = _createSuper(TabBar);

  function TabBar() {
    (0, _classCallCheck2["default"])(this, TabBar);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2["default"])(TabBar, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("tabbar", null, this.props.children);
    }
  }]);
  return TabBar;
}(_Component3["default"]);

(0, _defineProperty2["default"])(TabBar, "TabBarItem", (0, _hooks.useComponent)(TabBarItem));
(0, _defineProperty2["default"])(TabBar, "propTypes", {
  color: _PropTypes["default"].string,
  selectedColor: _PropTypes["default"].string,
  backgroundColor: _PropTypes["default"].string,
  borderStyle: _PropTypes["default"].oneOf(['black', 'white']),
  position: _PropTypes["default"].oneOf(['bottom', 'top']),
  custom: _PropTypes["default"].bool
});
(0, _defineProperty2["default"])(TabBar, "defaultProps", {
  position: 'bottom',
  bottom: false
});

var _default = (0, _hooks.useComponent)(TabBar);

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/ViewController.js":
/*!*************************************************!*\
  !*** ../remix/src/components/ViewController.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _createElement = __webpack_require__(/*! ../react/createElement */ "../remix/src/react/createElement.js");

var _notification = _interopRequireWildcard(__webpack_require__(/*! ../project/notification */ "../remix/src/project/notification/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var defineProperty = Object.defineProperty;

var ViewController = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(ViewController, _Component);

  var _super = _createSuper(ViewController);

  function ViewController(props, context) {
    (0, _classCallCheck2["default"])(this, ViewController);
    return _super.call(this, props, context);
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "render",
    value: function render() {
      throw new Error("Must be implatated");
    }
  }]);
  return ViewController;
}(_Component2["default"]);

exports["default"] = ViewController;
(0, _defineProperty2["default"])(ViewController, "propTypes", {});
(0, _defineProperty2["default"])(ViewController, "defaultProps", {});
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/index.js":
/*!****************************************!*\
  !*** ../remix/src/components/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Application: true,
  ViewController: true,
  TabBar: true,
  Router: true
};
Object.defineProperty(exports, "Application", {
  enumerable: true,
  get: function get() {
    return _Application["default"];
  }
});
Object.defineProperty(exports, "ViewController", {
  enumerable: true,
  get: function get() {
    return _ViewController["default"];
  }
});
Object.defineProperty(exports, "TabBar", {
  enumerable: true,
  get: function get() {
    return _TabBar["default"];
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return _router["default"];
  }
});

var _Application = _interopRequireDefault(__webpack_require__(/*! ./Application */ "../remix/src/components/Application.js"));

var _ViewController = _interopRequireDefault(__webpack_require__(/*! ./ViewController */ "../remix/src/components/ViewController.js"));

var _TabBar = _interopRequireDefault(__webpack_require__(/*! ./TabBar */ "../remix/src/components/TabBar.js"));

var _router = _interopRequireDefault(__webpack_require__(/*! ../router */ "../remix/src/router/index.js"));

var _remixUi = __webpack_require__(/*! ./remix-ui */ "../remix/src/components/remix-ui/index.js");

Object.keys(_remixUi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _remixUi[key];
    }
  });
});

/***/ }),

/***/ "../remix/src/components/remix-ui/EventHandle.js":
/*!*******************************************************!*\
  !*** ../remix/src/components/remix-ui/EventHandle.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! ../../react */ "../remix/src/react/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventHandle = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(EventHandle, _Component);

  var _super = _createSuper(EventHandle);

  function EventHandle() {
    (0, _classCallCheck2["default"])(this, EventHandle);
    return _super.apply(this, arguments);
  }

  return EventHandle;
}(_react.Component);

var _default = EventHandle;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/elements.js":
/*!****************************************************!*\
  !*** ../remix/src/components/remix-ui/elements.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _remixView["default"];
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function get() {
    return _remixText["default"];
  }
});
Object.defineProperty(exports, "Picker", {
  enumerable: true,
  get: function get() {
    return _remixPicker["default"];
  }
});
Object.defineProperty(exports, "Video", {
  enumerable: true,
  get: function get() {
    return _remixVideo["default"];
  }
});
Object.defineProperty(exports, "ScrollView", {
  enumerable: true,
  get: function get() {
    return _remixScrollView["default"];
  }
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function get() {
    return _remixSwiper["default"];
  }
});
Object.defineProperty(exports, "SwiperItem", {
  enumerable: true,
  get: function get() {
    return _remixSwiperItem["default"];
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _remixMap["default"];
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _remixImage["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _remixButton["default"];
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _remixInput["default"];
  }
});
Object.defineProperty(exports, "TextArea", {
  enumerable: true,
  get: function get() {
    return _remixTextarea["default"];
  }
});
Object.defineProperty(exports, "Editor", {
  enumerable: true,
  get: function get() {
    return _remixEditor["default"];
  }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function get() {
    return _remixSlider["default"];
  }
});
Object.defineProperty(exports, "Audio", {
  enumerable: true,
  get: function get() {
    return _remixAudio["default"];
  }
});
Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function get() {
    return _remixCanvas["default"];
  }
});
exports["default"] = void 0;

var _remixView = _interopRequireDefault(__webpack_require__(/*! ./remix-view */ "../remix/src/components/remix-ui/remix-view/index.js"));

var _remixText = _interopRequireDefault(__webpack_require__(/*! ./remix-text */ "../remix/src/components/remix-ui/remix-text/index.js"));

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ./remix-picker */ "../remix/src/components/remix-ui/remix-picker/index.js"));

var _remixVideo = _interopRequireDefault(__webpack_require__(/*! ./remix-video */ "../remix/src/components/remix-ui/remix-video/index.js"));

var _remixScrollView = _interopRequireDefault(__webpack_require__(/*! ./remix-scroll-view */ "../remix/src/components/remix-ui/remix-scroll-view/index.js"));

var _remixSwiper = _interopRequireDefault(__webpack_require__(/*! ./remix-swiper */ "../remix/src/components/remix-ui/remix-swiper/index.js"));

var _remixSwiperItem = _interopRequireDefault(__webpack_require__(/*! ./remix-swiper-item */ "../remix/src/components/remix-ui/remix-swiper-item/index.js"));

var _remixMap = _interopRequireDefault(__webpack_require__(/*! ./remix-map */ "../remix/src/components/remix-ui/remix-map/index.js"));

var _remixImage = _interopRequireDefault(__webpack_require__(/*! ./remix-image */ "../remix/src/components/remix-ui/remix-image/index.js"));

var _remixButton = _interopRequireDefault(__webpack_require__(/*! ./remix-button */ "../remix/src/components/remix-ui/remix-button/index.js"));

var _remixInput = _interopRequireDefault(__webpack_require__(/*! ./remix-input */ "../remix/src/components/remix-ui/remix-input/index.js"));

var _remixTextarea = _interopRequireDefault(__webpack_require__(/*! ./remix-textarea */ "../remix/src/components/remix-ui/remix-textarea/index.js"));

var _remixEditor = _interopRequireDefault(__webpack_require__(/*! ./remix-editor */ "../remix/src/components/remix-ui/remix-editor/index.js"));

var _remixSlider = _interopRequireDefault(__webpack_require__(/*! ./remix-slider */ "../remix/src/components/remix-ui/remix-slider/index.js"));

var _remixAudio = _interopRequireDefault(__webpack_require__(/*! ./remix-audio */ "../remix/src/components/remix-ui/remix-audio/index.js"));

var _remixCanvas = _interopRequireDefault(__webpack_require__(/*! ./remix-canvas */ "../remix/src/components/remix-ui/remix-canvas/index.js"));

var _default = {
  View: _remixView["default"],
  Text: _remixText["default"],
  Picker: _remixPicker["default"],
  Video: _remixVideo["default"],
  ScrollView: _remixScrollView["default"],
  Swiper: _remixSwiper["default"],
  SwiperItem: _remixSwiperItem["default"],
  Map: _remixMap["default"],
  Image: _remixImage["default"],
  Button: _remixButton["default"],
  Input: _remixInput["default"],
  TextArea: _remixTextarea["default"],
  Editor: _remixEditor["default"],
  Slider: _remixSlider["default"],
  Audio: _remixAudio["default"],
  Canvas: _remixCanvas["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/components/remix-ui/index.js":
/*!*************************************************!*\
  !*** ../remix/src/components/remix-ui/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _elements = _interopRequireWildcard(__webpack_require__(/*! ./elements */ "../remix/src/components/remix-ui/elements.js"));

Object.keys(_elements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elements[key];
    }
  });
});
var _default = _elements["default"];
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-audio/index.js":
/*!*************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-audio/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixAudio = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixAudio, _EventHandle);

  var _super = _createSuper(RemixAudio);

  function RemixAudio() {
    (0, _classCallCheck2["default"])(this, RemixAudio);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixAudio, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          id = _this$props.id,
          src = _this$props.src,
          loop = _this$props.loop,
          controls = _this$props.controls,
          poster = _this$props.poster,
          name = _this$props.name,
          author = _this$props.author,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onError = _this$props.onError,
          onPlay = _this$props.onPlay,
          onPause = _this$props.onPause,
          onTimeUpdate = _this$props.onTimeUpdate,
          onEnded = _this$props.onEnded;
      return /*#__PURE__*/_react["default"].createElement("audio", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onError: onError ? 'onError' : null,
        onPlay: onPlay ? 'onPlay' : null,
        onPause: onPause ? 'onPause' : null,
        onTimeUpdate: onTimeUpdate ? 'onTimeUpdate' : null,
        onEnded: onEnded ? 'onEnded' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        id: id,
        src: src,
        loop: loop,
        controls: controls,
        poster: poster,
        name: name,
        author: author
      }, this.props.children);
    }
  }]);
  return RemixAudio;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixAudio, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  id: _PropTypes["default"].string,
  src: _PropTypes["default"].string,
  loop: _PropTypes["default"]["boolean"],
  controls: _PropTypes["default"]["boolean"],
  poster: _PropTypes["default"].string,
  name: _PropTypes["default"].string,
  author: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onError: _PropTypes["default"].string,
  onPlay: _PropTypes["default"].string,
  onPause: _PropTypes["default"].string,
  onTimeUpdate: _PropTypes["default"].string,
  onEnded: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixAudio, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  id: null,
  src: null,
  loop: false,
  controls: true,
  poster: null,
  name: null,
  author: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onError: null,
  onPlay: null,
  onPause: null,
  onTimeUpdate: null,
  onEnded: null
});
var _default = RemixAudio;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-button/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-button/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixButton = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixButton, _EventHandle);

  var _super = _createSuper(RemixButton);

  function RemixButton() {
    (0, _classCallCheck2["default"])(this, RemixButton);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          size = _this$props.size,
          type = _this$props.type,
          plain = _this$props.plain,
          disabled = _this$props.disabled,
          loading = _this$props.loading,
          formType = _this$props.formType,
          openType = _this$props.openType,
          hoverClass = _this$props.hoverClass,
          hoverStopPropagation = _this$props.hoverStopPropagation,
          hoverStartTime = _this$props.hoverStartTime,
          hoverStayTime = _this$props.hoverStayTime,
          lang = _this$props.lang,
          sessionFrom = _this$props.sessionFrom,
          sendMessageTitle = _this$props.sendMessageTitle,
          sendMessagePath = _this$props.sendMessagePath,
          sendMessageImg = _this$props.sendMessageImg,
          appParameter = _this$props.appParameter,
          showMessageCard = _this$props.showMessageCard,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onGetUserInfo = _this$props.onGetUserInfo,
          onContact = _this$props.onContact,
          onGetPhoneNumber = _this$props.onGetPhoneNumber,
          onOpenSetting = _this$props.onOpenSetting,
          onLaunchApp = _this$props.onLaunchApp,
          onError = _this$props.onError;
      return /*#__PURE__*/_react["default"].createElement("button", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onGetUserInfo: onGetUserInfo ? 'onGetUserInfo' : null,
        onContact: onContact ? 'onContact' : null,
        onGetPhoneNumber: onGetPhoneNumber ? 'onGetPhoneNumber' : null,
        onOpenSetting: onOpenSetting ? 'onOpenSetting' : null,
        onLaunchApp: onLaunchApp ? 'onLaunchApp' : null,
        onError: onError ? 'onError' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        size: size,
        type: type,
        plain: plain,
        disabled: disabled,
        loading: loading,
        formType: formType,
        openType: openType,
        hoverClass: hoverClass,
        hoverStopPropagation: hoverStopPropagation,
        hoverStartTime: hoverStartTime,
        hoverStayTime: hoverStayTime,
        lang: lang,
        sessionFrom: sessionFrom,
        sendMessageTitle: sendMessageTitle,
        sendMessagePath: sendMessagePath,
        sendMessageImg: sendMessageImg,
        appParameter: appParameter,
        showMessageCard: showMessageCard
      }, this.props.children);
    }
  }]);
  return RemixButton;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixButton, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  size: _PropTypes["default"].string,
  type: _PropTypes["default"].string,
  plain: _PropTypes["default"]["boolean"],
  disabled: _PropTypes["default"]["boolean"],
  loading: _PropTypes["default"]["boolean"],
  formType: _PropTypes["default"].string,
  openType: _PropTypes["default"].string,
  hoverClass: _PropTypes["default"].string,
  hoverStopPropagation: _PropTypes["default"]["boolean"],
  hoverStartTime: _PropTypes["default"].number,
  hoverStayTime: _PropTypes["default"].number,
  lang: _PropTypes["default"].string,
  sessionFrom: _PropTypes["default"].string,
  sendMessageTitle: _PropTypes["default"].string,
  sendMessagePath: _PropTypes["default"].string,
  sendMessageImg: _PropTypes["default"].string,
  appParameter: _PropTypes["default"].string,
  showMessageCard: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onGetUserInfo: _PropTypes["default"].string,
  onContact: _PropTypes["default"].string,
  onGetPhoneNumber: _PropTypes["default"].string,
  onOpenSetting: _PropTypes["default"].string,
  onLaunchApp: _PropTypes["default"].string,
  onError: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixButton, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  size: 'default',
  type: 'default',
  plain: false,
  disabled: false,
  loading: false,
  formType: null,
  openType: null,
  hoverClass: 'button-hover',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  lang: 'en',
  sessionFrom: null,
  sendMessageTitle: null,
  sendMessagePath: null,
  sendMessageImg: null,
  appParameter: null,
  showMessageCard: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onGetUserInfo: null,
  onContact: null,
  onGetPhoneNumber: null,
  onOpenSetting: null,
  onLaunchApp: null,
  onError: null
});
var _default = RemixButton;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-canvas/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-canvas/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixCanvas = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixCanvas, _EventHandle);

  var _super = _createSuper(RemixCanvas);

  function RemixCanvas() {
    (0, _classCallCheck2["default"])(this, RemixCanvas);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixCanvas, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          type = _this$props.type,
          canvasId = _this$props.canvasId,
          webp = _this$props.webp,
          disableScroll = _this$props.disableScroll,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd;
      return /*#__PURE__*/_react["default"].createElement("canvas", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        type: type,
        canvasId: canvasId,
        webp: webp,
        disableScroll: disableScroll
      }, this.props.children);
    }
  }]);
  return RemixCanvas;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixCanvas, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  type: _PropTypes["default"].string,
  canvasId: _PropTypes["default"].string,
  webp: _PropTypes["default"]["boolean"],
  disableScroll: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixCanvas, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  type: '2d',
  canvasId: null,
  webp: false,
  disableScroll: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null
});
var _default = RemixCanvas;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-editor/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-editor/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixEditor = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixEditor, _EventHandle);

  var _super = _createSuper(RemixEditor);

  function RemixEditor() {
    (0, _classCallCheck2["default"])(this, RemixEditor);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          readOnly = _this$props.readOnly,
          placeholder = _this$props.placeholder,
          showImgSize = _this$props.showImgSize,
          showImgToolbar = _this$props.showImgToolbar,
          showImgResize = _this$props.showImgResize,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onInput = _this$props.onInput,
          onReady = _this$props.onReady,
          onStatusChange = _this$props.onStatusChange;
      return /*#__PURE__*/_react["default"].createElement("editor", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onFocus: onFocus ? 'onFocus' : null,
        onBlur: onBlur ? 'onBlur' : null,
        onInput: onInput ? 'onInput' : null,
        onReady: onReady ? 'onReady' : null,
        onStatusChange: onStatusChange ? 'onStatusChange' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        readOnly: readOnly,
        placeholder: placeholder,
        showImgSize: showImgSize,
        showImgToolbar: showImgToolbar,
        showImgResize: showImgResize
      }, this.props.children);
    }
  }]);
  return RemixEditor;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixEditor, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  readOnly: _PropTypes["default"]["boolean"],
  placeholder: _PropTypes["default"].string,
  showImgSize: _PropTypes["default"]["boolean"],
  showImgToolbar: _PropTypes["default"]["boolean"],
  showImgResize: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onFocus: _PropTypes["default"].string,
  onBlur: _PropTypes["default"].string,
  onInput: _PropTypes["default"].string,
  onReady: _PropTypes["default"].string,
  onStatusChange: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixEditor, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  readOnly: false,
  placeholder: null,
  showImgSize: false,
  showImgToolbar: false,
  showImgResize: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onFocus: null,
  onBlur: null,
  onInput: null,
  onReady: null,
  onStatusChange: null
});
var _default = RemixEditor;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-image/index.js":
/*!*************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-image/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixImage = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixImage, _EventHandle);

  var _super = _createSuper(RemixImage);

  function RemixImage() {
    (0, _classCallCheck2["default"])(this, RemixImage);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixImage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          src = _this$props.src,
          mode = _this$props.mode,
          webp = _this$props.webp,
          lazyLoad = _this$props.lazyLoad,
          showMenuByLongpress = _this$props.showMenuByLongpress,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onLoad = _this$props.onLoad,
          onError = _this$props.onError;
      return /*#__PURE__*/_react["default"].createElement("image", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onLoad: onLoad ? 'onLoad' : null,
        onError: onError ? 'onError' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        src: src,
        mode: mode,
        webp: webp,
        lazyLoad: lazyLoad,
        showMenuByLongpress: showMenuByLongpress
      }, this.props.children);
    }
  }]);
  return RemixImage;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixImage, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  src: _PropTypes["default"].string,
  mode: _PropTypes["default"].string,
  webp: _PropTypes["default"]["boolean"],
  lazyLoad: _PropTypes["default"]["boolean"],
  showMenuByLongpress: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onLoad: _PropTypes["default"].string,
  onError: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixImage, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  src: null,
  mode: 'scaleToFill',
  webp: false,
  lazyLoad: false,
  showMenuByLongpress: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onLoad: null,
  onError: null
});
var _default = RemixImage;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-input/index.js":
/*!*************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-input/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixInput = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixInput, _EventHandle);

  var _super = _createSuper(RemixInput);

  function RemixInput() {
    (0, _classCallCheck2["default"])(this, RemixInput);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          value = _this$props.value,
          type = _this$props.type,
          password = _this$props.password,
          placeholder = _this$props.placeholder,
          placeholderStyle = _this$props.placeholderStyle,
          placeholderClass = _this$props.placeholderClass,
          disabled = _this$props.disabled,
          maxlength = _this$props.maxlength,
          cursorSpacing = _this$props.cursorSpacing,
          autoFocus = _this$props.autoFocus,
          focus = _this$props.focus,
          confirmType = _this$props.confirmType,
          confirmHold = _this$props.confirmHold,
          cursor = _this$props.cursor,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd,
          adjustPosition = _this$props.adjustPosition,
          holdKeyboard = _this$props.holdKeyboard,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onInput = _this$props.onInput,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onConfirm = _this$props.onConfirm,
          onKeyboardHeightChange = _this$props.onKeyboardHeightChange;
      return /*#__PURE__*/_react["default"].createElement("input", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onInput: onInput ? 'onInput' : null,
        onFocus: onFocus ? 'onFocus' : null,
        onBlur: onBlur ? 'onBlur' : null,
        onConfirm: onConfirm ? 'onConfirm' : null,
        onKeyboardHeightChange: onKeyboardHeightChange ? 'onKeyboardHeightChange' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        value: value,
        type: type,
        password: password,
        placeholder: placeholder,
        placeholderStyle: placeholderStyle,
        placeholderClass: placeholderClass,
        disabled: disabled,
        maxlength: maxlength,
        cursorSpacing: cursorSpacing,
        autoFocus: autoFocus,
        focus: focus,
        confirmType: confirmType,
        confirmHold: confirmHold,
        cursor: cursor,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        adjustPosition: adjustPosition,
        holdKeyboard: holdKeyboard
      }, this.props.children);
    }
  }]);
  return RemixInput;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixInput, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  value: _PropTypes["default"].string,
  type: _PropTypes["default"].string,
  password: _PropTypes["default"]["boolean"],
  placeholder: _PropTypes["default"].string,
  placeholderStyle: _PropTypes["default"].string,
  placeholderClass: _PropTypes["default"].string,
  disabled: _PropTypes["default"]["boolean"],
  maxlength: _PropTypes["default"].number,
  cursorSpacing: _PropTypes["default"].number,
  autoFocus: _PropTypes["default"]["boolean"],
  focus: _PropTypes["default"]["boolean"],
  confirmType: _PropTypes["default"].string,
  confirmHold: _PropTypes["default"]["boolean"],
  cursor: _PropTypes["default"].number,
  selectionStart: _PropTypes["default"].number,
  selectionEnd: _PropTypes["default"].number,
  adjustPosition: _PropTypes["default"]["boolean"],
  holdKeyboard: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onInput: _PropTypes["default"].string,
  onFocus: _PropTypes["default"].string,
  onBlur: _PropTypes["default"].string,
  onConfirm: _PropTypes["default"].string,
  onKeyboardHeightChange: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixInput, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  value: null,
  type: 'text',
  password: false,
  placeholder: null,
  placeholderStyle: null,
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  cursorSpacing: 0,
  autoFocus: false,
  focus: false,
  confirmType: 'done',
  confirmHold: false,
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onInput: null,
  onFocus: null,
  onBlur: null,
  onConfirm: null,
  onKeyboardHeightChange: null
});
var _default = RemixInput;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-map/index.js":
/*!***********************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-map/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixMap = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixMap, _EventHandle);

  var _super = _createSuper(RemixMap);

  function RemixMap() {
    (0, _classCallCheck2["default"])(this, RemixMap);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixMap, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          longitude = _this$props.longitude,
          latitude = _this$props.latitude,
          scale = _this$props.scale,
          markers = _this$props.markers,
          covers = _this$props.covers,
          polyline = _this$props.polyline,
          circles = _this$props.circles,
          controls = _this$props.controls,
          includePoints = _this$props.includePoints,
          showLocation = _this$props.showLocation,
          polygons = _this$props.polygons,
          subkey = _this$props.subkey,
          layerStyle = _this$props.layerStyle,
          rotate = _this$props.rotate,
          skew = _this$props.skew,
          enable3D = _this$props.enable3D,
          showCompass = _this$props.showCompass,
          showScale = _this$props.showScale,
          enableOverlooking = _this$props.enableOverlooking,
          enableZoom = _this$props.enableZoom,
          enableScroll = _this$props.enableScroll,
          enableRotate = _this$props.enableRotate,
          enableSatellite = _this$props.enableSatellite,
          enableTraffic = _this$props.enableTraffic,
          setting = _this$props.setting,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onMarkerTap = _this$props.onMarkerTap,
          onLabelTap = _this$props.onLabelTap,
          onControlTap = _this$props.onControlTap,
          onCalloutTap = _this$props.onCalloutTap,
          onUpdated = _this$props.onUpdated,
          onRegionChange = _this$props.onRegionChange,
          onPoiTap = _this$props.onPoiTap;
      return /*#__PURE__*/_react["default"].createElement("map", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onMarkerTap: onMarkerTap ? 'onMarkerTap' : null,
        onLabelTap: onLabelTap ? 'onLabelTap' : null,
        onControlTap: onControlTap ? 'onControlTap' : null,
        onCalloutTap: onCalloutTap ? 'onCalloutTap' : null,
        onUpdated: onUpdated ? 'onUpdated' : null,
        onRegionChange: onRegionChange ? 'onRegionChange' : null,
        onPoiTap: onPoiTap ? 'onPoiTap' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        longitude: longitude,
        latitude: latitude,
        scale: scale,
        markers: markers,
        covers: covers,
        polyline: polyline,
        circles: circles,
        controls: controls,
        includePoints: includePoints,
        showLocation: showLocation,
        polygons: polygons,
        subkey: subkey,
        layerStyle: layerStyle,
        rotate: rotate,
        skew: skew,
        enable3D: enable3D,
        showCompass: showCompass,
        showScale: showScale,
        enableOverlooking: enableOverlooking,
        enableZoom: enableZoom,
        enableScroll: enableScroll,
        enableRotate: enableRotate,
        enableSatellite: enableSatellite,
        enableTraffic: enableTraffic,
        setting: setting
      }, this.props.children);
    }
  }]);
  return RemixMap;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixMap, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  longitude: _PropTypes["default"].number,
  latitude: _PropTypes["default"].number,
  scale: _PropTypes["default"].number,
  markers: _PropTypes["default"].array,
  covers: _PropTypes["default"].array,
  polyline: _PropTypes["default"].array,
  circles: _PropTypes["default"].array,
  controls: _PropTypes["default"].array,
  includePoints: _PropTypes["default"].array,
  showLocation: _PropTypes["default"]["boolean"],
  polygons: _PropTypes["default"].array,
  subkey: _PropTypes["default"].string,
  layerStyle: _PropTypes["default"].number,
  rotate: _PropTypes["default"].number,
  skew: _PropTypes["default"].number,
  enable3D: _PropTypes["default"]["boolean"],
  showCompass: _PropTypes["default"]["boolean"],
  showScale: _PropTypes["default"]["boolean"],
  enableOverlooking: _PropTypes["default"]["boolean"],
  enableZoom: _PropTypes["default"]["boolean"],
  enableScroll: _PropTypes["default"]["boolean"],
  enableRotate: _PropTypes["default"]["boolean"],
  enableSatellite: _PropTypes["default"]["boolean"],
  enableTraffic: _PropTypes["default"]["boolean"],
  setting: _PropTypes["default"].object,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onMarkerTap: _PropTypes["default"].string,
  onLabelTap: _PropTypes["default"].string,
  onControlTap: _PropTypes["default"].string,
  onCalloutTap: _PropTypes["default"].string,
  onUpdated: _PropTypes["default"].string,
  onRegionChange: _PropTypes["default"].string,
  onPoiTap: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixMap, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  longitude: null,
  latitude: null,
  scale: 16,
  markers: null,
  covers: null,
  polyline: null,
  circles: null,
  controls: null,
  includePoints: null,
  showLocation: false,
  polygons: null,
  subkey: null,
  layerStyle: 1,
  rotate: 0,
  skew: 0,
  enable3D: false,
  showCompass: false,
  showScale: false,
  enableOverlooking: false,
  enableZoom: false,
  enableScroll: false,
  enableRotate: false,
  enableSatellite: false,
  enableTraffic: false,
  setting: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onMarkerTap: null,
  onLabelTap: null,
  onControlTap: null,
  onCalloutTap: null,
  onUpdated: null,
  onRegionChange: null,
  onPoiTap: null
});
var _default = RemixMap;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-picker/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-picker/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixPicker = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixPicker, _EventHandle);

  var _super = _createSuper(RemixPicker);

  function RemixPicker() {
    (0, _classCallCheck2["default"])(this, RemixPicker);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixPicker, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          mode = _this$props.mode,
          disabled = _this$props.disabled,
          range = _this$props.range,
          rangeKey = _this$props.rangeKey,
          value = _this$props.value,
          start = _this$props.start,
          end = _this$props.end,
          fields = _this$props.fields,
          customItem = _this$props.customItem,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onCancel = _this$props.onCancel,
          onError = _this$props.onError,
          onChange = _this$props.onChange,
          onColumnChange = _this$props.onColumnChange;
      return /*#__PURE__*/_react["default"].createElement("picker", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onCancel: onCancel ? 'onCancel' : null,
        onError: onError ? 'onError' : null,
        onChange: onChange ? 'onChange' : null,
        onColumnChange: onColumnChange ? 'onColumnChange' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        mode: mode,
        disabled: disabled,
        range: range,
        rangeKey: rangeKey,
        value: value,
        start: start,
        end: end,
        fields: fields,
        customItem: customItem
      }, this.props.children);
    }
  }]);
  return RemixPicker;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixPicker, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  mode: _PropTypes["default"].string,
  disabled: _PropTypes["default"]["boolean"],
  range: _PropTypes["default"].object,
  rangeKey: _PropTypes["default"].string,
  value: _PropTypes["default"].number,
  start: _PropTypes["default"].string,
  end: _PropTypes["default"].string,
  fields: _PropTypes["default"].string,
  customItem: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onCancel: _PropTypes["default"].string,
  onError: _PropTypes["default"].string,
  onChange: _PropTypes["default"].string,
  onColumnChange: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixPicker, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  mode: 'selector',
  disabled: false,
  range: [],
  rangeKey: null,
  value: 0,
  start: null,
  end: null,
  fields: 'day',
  customItem: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onCancel: null,
  onError: null,
  onChange: null,
  onColumnChange: null
});
var _default = RemixPicker;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-scroll-view/index.js":
/*!*******************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-scroll-view/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixScrollView = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixScrollView, _EventHandle);

  var _super = _createSuper(RemixScrollView);

  function RemixScrollView() {
    (0, _classCallCheck2["default"])(this, RemixScrollView);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixScrollView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          scrollX = _this$props.scrollX,
          scrollY = _this$props.scrollY,
          upperThreshold = _this$props.upperThreshold,
          lowerThreshold = _this$props.lowerThreshold,
          scrollTop = _this$props.scrollTop,
          scrollLeft = _this$props.scrollLeft,
          scrollIntoView = _this$props.scrollIntoView,
          scrollWithAnimation = _this$props.scrollWithAnimation,
          enableBackToTop = _this$props.enableBackToTop,
          enableFlex = _this$props.enableFlex,
          scrollAnchoring = _this$props.scrollAnchoring,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onScrollToUpper = _this$props.onScrollToUpper,
          onScrollToLower = _this$props.onScrollToLower,
          onScroll = _this$props.onScroll;
      return /*#__PURE__*/_react["default"].createElement("scroll-view", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onScrollToUpper: onScrollToUpper ? 'onScrollToUpper' : null,
        onScrollToLower: onScrollToLower ? 'onScrollToLower' : null,
        onScroll: onScroll ? 'onScroll' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        scrollX: scrollX,
        scrollY: scrollY,
        upperThreshold: upperThreshold,
        lowerThreshold: lowerThreshold,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        scrollIntoView: scrollIntoView,
        scrollWithAnimation: scrollWithAnimation,
        enableBackToTop: enableBackToTop,
        enableFlex: enableFlex,
        scrollAnchoring: scrollAnchoring
      }, this.props.children);
    }
  }]);
  return RemixScrollView;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixScrollView, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  scrollX: _PropTypes["default"]["boolean"],
  scrollY: _PropTypes["default"]["boolean"],
  upperThreshold: _PropTypes["default"].number,
  lowerThreshold: _PropTypes["default"].number,
  scrollTop: _PropTypes["default"].number,
  scrollLeft: _PropTypes["default"].number,
  scrollIntoView: _PropTypes["default"].string,
  scrollWithAnimation: _PropTypes["default"]["boolean"],
  enableBackToTop: _PropTypes["default"]["boolean"],
  enableFlex: _PropTypes["default"]["boolean"],
  scrollAnchoring: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onScrollToUpper: _PropTypes["default"].string,
  onScrollToLower: _PropTypes["default"].string,
  onScroll: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixScrollView, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  scrollX: false,
  scrollY: false,
  upperThreshold: 50,
  lowerThreshold: 50,
  scrollTop: null,
  scrollLeft: null,
  scrollIntoView: null,
  scrollWithAnimation: false,
  enableBackToTop: false,
  enableFlex: false,
  scrollAnchoring: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onScrollToUpper: null,
  onScrollToLower: null,
  onScroll: null
});
var _default = RemixScrollView;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-slider/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-slider/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixSlider = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixSlider, _EventHandle);

  var _super = _createSuper(RemixSlider);

  function RemixSlider() {
    (0, _classCallCheck2["default"])(this, RemixSlider);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixSlider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          disabled = _this$props.disabled,
          value = _this$props.value,
          color = _this$props.color,
          selectedColor = _this$props.selectedColor,
          backgroundColor = _this$props.backgroundColor,
          activeColor = _this$props.activeColor,
          blockSize = _this$props.blockSize,
          blockColor = _this$props.blockColor,
          showValue = _this$props.showValue,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onChange = _this$props.onChange,
          onChanging = _this$props.onChanging;
      return /*#__PURE__*/_react["default"].createElement("slider", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onChange: onChange ? 'onChange' : null,
        onChanging: onChanging ? 'onChanging' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        min: min,
        max: max,
        step: step,
        disabled: disabled,
        value: value,
        color: color,
        selectedColor: selectedColor,
        backgroundColor: backgroundColor,
        activeColor: activeColor,
        blockSize: blockSize,
        blockColor: blockColor,
        showValue: showValue
      }, this.props.children);
    }
  }]);
  return RemixSlider;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixSlider, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  min: _PropTypes["default"].number,
  max: _PropTypes["default"].number,
  step: _PropTypes["default"].number,
  disabled: _PropTypes["default"]["boolean"],
  value: _PropTypes["default"].number,
  color: _PropTypes["default"].string,
  selectedColor: _PropTypes["default"].string,
  backgroundColor: _PropTypes["default"].string,
  activeColor: _PropTypes["default"].string,
  blockSize: _PropTypes["default"].number,
  blockColor: _PropTypes["default"].string,
  showValue: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onChange: _PropTypes["default"].string,
  onChanging: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixSlider, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  value: 0,
  color: '#e9e9e9',
  selectedColor: '#1aad19',
  backgroundColor: '#e9e9e9',
  activeColor: '#1aad19',
  blockSize: 28,
  blockColor: '#ffffff',
  showValue: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onChange: null,
  onChanging: null
});
var _default = RemixSlider;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-swiper-item/index.js":
/*!*******************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-swiper-item/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixSwiperItem = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixSwiperItem, _EventHandle);

  var _super = _createSuper(RemixSwiperItem);

  function RemixSwiperItem() {
    (0, _classCallCheck2["default"])(this, RemixSwiperItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixSwiperItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          itemId = _this$props.itemId,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd;
      return /*#__PURE__*/_react["default"].createElement("swiper-item", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        itemId: itemId
      }, this.props.children);
    }
  }]);
  return RemixSwiperItem;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixSwiperItem, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  itemId: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixSwiperItem, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  itemId: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null
});
var _default = RemixSwiperItem;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-swiper/index.js":
/*!**************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-swiper/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixSwiper = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixSwiper, _EventHandle);

  var _super = _createSuper(RemixSwiper);

  function RemixSwiper() {
    (0, _classCallCheck2["default"])(this, RemixSwiper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixSwiper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          indicatorDots = _this$props.indicatorDots,
          indicatorColor = _this$props.indicatorColor,
          indicatorActiveColor = _this$props.indicatorActiveColor,
          autoplay = _this$props.autoplay,
          current = _this$props.current,
          interval = _this$props.interval,
          duration = _this$props.duration,
          circular = _this$props.circular,
          vertical = _this$props.vertical,
          previousMargin = _this$props.previousMargin,
          nextMargin = _this$props.nextMargin,
          displayMultipleItems = _this$props.displayMultipleItems,
          skipHiddenItemLayou = _this$props.skipHiddenItemLayou,
          easingFunction = _this$props.easingFunction,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onChange = _this$props.onChange,
          onAnimationFinish = _this$props.onAnimationFinish;
      return /*#__PURE__*/_react["default"].createElement("swiper", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onChange: onChange ? 'onChange' : null,
        onAnimationFinish: onAnimationFinish ? 'onAnimationFinish' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        indicatorDots: indicatorDots,
        indicatorColor: indicatorColor,
        indicatorActiveColor: indicatorActiveColor,
        autoplay: autoplay,
        current: current,
        interval: interval,
        duration: duration,
        circular: circular,
        vertical: vertical,
        previousMargin: previousMargin,
        nextMargin: nextMargin,
        displayMultipleItems: displayMultipleItems,
        skipHiddenItemLayou: skipHiddenItemLayou,
        easingFunction: easingFunction
      }, this.props.children);
    }
  }]);
  return RemixSwiper;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixSwiper, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  indicatorDots: _PropTypes["default"]["boolean"],
  indicatorColor: _PropTypes["default"].string,
  indicatorActiveColor: _PropTypes["default"].string,
  autoplay: _PropTypes["default"]["boolean"],
  current: _PropTypes["default"].number,
  interval: _PropTypes["default"].number,
  duration: _PropTypes["default"].number,
  circular: _PropTypes["default"]["boolean"],
  vertical: _PropTypes["default"]["boolean"],
  previousMargin: _PropTypes["default"].string,
  nextMargin: _PropTypes["default"].string,
  displayMultipleItems: _PropTypes["default"].number,
  skipHiddenItemLayou: _PropTypes["default"]["boolean"],
  easingFunction: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onChange: _PropTypes["default"].string,
  onAnimationFinish: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixSwiper, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  indicatorDots: false,
  indicatorColor: 'rgba(0, 0, 0, .3)',
  indicatorActiveColor: '#000000',
  autoplay: false,
  current: 0,
  interval: 5000,
  duration: 500,
  circular: false,
  vertical: false,
  previousMargin: '0px',
  nextMargin: '0px',
  displayMultipleItems: 1,
  skipHiddenItemLayou: false,
  easingFunction: 'default',
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onChange: null,
  onAnimationFinish: null
});
var _default = RemixSwiper;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-text/index.js":
/*!************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-text/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixText = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixText, _EventHandle);

  var _super = _createSuper(RemixText);

  function RemixText() {
    (0, _classCallCheck2["default"])(this, RemixText);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          selectable = _this$props.selectable,
          space = _this$props.space,
          decode = _this$props.decode,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd;
      return /*#__PURE__*/_react["default"].createElement("text", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        selectable: selectable,
        space: space,
        decode: decode
      }, this.props.children);
    }
  }]);
  return RemixText;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixText, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  selectable: _PropTypes["default"]["boolean"],
  space: _PropTypes["default"]["boolean"],
  decode: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixText, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  selectable: false,
  space: false,
  decode: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null
});
var _default = RemixText;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-textarea/index.js":
/*!****************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-textarea/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixTextarea = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixTextarea, _EventHandle);

  var _super = _createSuper(RemixTextarea);

  function RemixTextarea() {
    (0, _classCallCheck2["default"])(this, RemixTextarea);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixTextarea, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          value = _this$props.value,
          placeholder = _this$props.placeholder,
          placeholderStyle = _this$props.placeholderStyle,
          placeholderClass = _this$props.placeholderClass,
          disabled = _this$props.disabled,
          maxlength = _this$props.maxlength,
          autoFocus = _this$props.autoFocus,
          focus = _this$props.focus,
          autoHeight = _this$props.autoHeight,
          fixed = _this$props.fixed,
          cursorSpacing = _this$props.cursorSpacing,
          cursor = _this$props.cursor,
          showConfirmBar = _this$props.showConfirmBar,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd,
          adjustPosition = _this$props.adjustPosition,
          holdKeyboard = _this$props.holdKeyboard,
          disableDefaultPadding = _this$props.disableDefaultPadding,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onLineChange = _this$props.onLineChange,
          onInput = _this$props.onInput,
          onConfirm = _this$props.onConfirm,
          onKeyboardHeightChange = _this$props.onKeyboardHeightChange;
      return /*#__PURE__*/_react["default"].createElement("textarea", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onFocus: onFocus ? 'onFocus' : null,
        onBlur: onBlur ? 'onBlur' : null,
        onLineChange: onLineChange ? 'onLineChange' : null,
        onInput: onInput ? 'onInput' : null,
        onConfirm: onConfirm ? 'onConfirm' : null,
        onKeyboardHeightChange: onKeyboardHeightChange ? 'onKeyboardHeightChange' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        value: value,
        placeholder: placeholder,
        placeholderStyle: placeholderStyle,
        placeholderClass: placeholderClass,
        disabled: disabled,
        maxlength: maxlength,
        autoFocus: autoFocus,
        focus: focus,
        autoHeight: autoHeight,
        fixed: fixed,
        cursorSpacing: cursorSpacing,
        cursor: cursor,
        showConfirmBar: showConfirmBar,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        adjustPosition: adjustPosition,
        holdKeyboard: holdKeyboard,
        disableDefaultPadding: disableDefaultPadding
      }, this.props.children);
    }
  }]);
  return RemixTextarea;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixTextarea, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  value: _PropTypes["default"].string,
  placeholder: _PropTypes["default"].string,
  placeholderStyle: _PropTypes["default"].string,
  placeholderClass: _PropTypes["default"].string,
  disabled: _PropTypes["default"]["boolean"],
  maxlength: _PropTypes["default"].number,
  autoFocus: _PropTypes["default"]["boolean"],
  focus: _PropTypes["default"]["boolean"],
  autoHeight: _PropTypes["default"]["boolean"],
  fixed: _PropTypes["default"]["boolean"],
  cursorSpacing: _PropTypes["default"].number,
  cursor: _PropTypes["default"].number,
  showConfirmBar: _PropTypes["default"]["boolean"],
  selectionStart: _PropTypes["default"].number,
  selectionEnd: _PropTypes["default"].number,
  adjustPosition: _PropTypes["default"]["boolean"],
  holdKeyboard: _PropTypes["default"]["boolean"],
  disableDefaultPadding: _PropTypes["default"]["boolean"],
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onFocus: _PropTypes["default"].string,
  onBlur: _PropTypes["default"].string,
  onLineChange: _PropTypes["default"].string,
  onInput: _PropTypes["default"].string,
  onConfirm: _PropTypes["default"].string,
  onKeyboardHeightChange: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixTextarea, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  value: null,
  placeholder: null,
  placeholderStyle: null,
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  autoFocus: false,
  focus: false,
  autoHeight: false,
  fixed: false,
  cursorSpacing: 0,
  cursor: 0,
  showConfirmBar: false,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  disableDefaultPadding: false,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onFocus: null,
  onBlur: null,
  onLineChange: null,
  onInput: null,
  onConfirm: null,
  onKeyboardHeightChange: null
});
var _default = RemixTextarea;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-video/index.js":
/*!*************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-video/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixVideo = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixVideo, _EventHandle);

  var _super = _createSuper(RemixVideo);

  function RemixVideo() {
    (0, _classCallCheck2["default"])(this, RemixVideo);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixVideo, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          src = _this$props.src,
          duration = _this$props.duration,
          controls = _this$props.controls,
          danmuList = _this$props.danmuList,
          danmuButton = _this$props.danmuButton,
          enableDanmu = _this$props.enableDanmu,
          autoplay = _this$props.autoplay,
          loop = _this$props.loop,
          muted = _this$props.muted,
          initialTime = _this$props.initialTime,
          pageGesture = _this$props.pageGesture,
          direction = _this$props.direction,
          showProgress = _this$props.showProgress,
          showFullscreenButton = _this$props.showFullscreenButton,
          showPlayButton = _this$props.showPlayButton,
          showCenterPlayButton = _this$props.showCenterPlayButton,
          enableProgressGesture = _this$props.enableProgressGesture,
          objectFit = _this$props.objectFit,
          poster = _this$props.poster,
          showMuteButton = _this$props.showMuteButton,
          title = _this$props.title,
          playButtonPosition = _this$props.playButtonPosition,
          enablePlayGesture = _this$props.enablePlayGesture,
          autoPauseIfNavigate = _this$props.autoPauseIfNavigate,
          autoPauseIfOpenNative = _this$props.autoPauseIfOpenNative,
          vslideGesture = _this$props.vslideGesture,
          vslideGestureInFullscreen = _this$props.vslideGestureInFullscreen,
          adUnitId = _this$props.adUnitId,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd,
          onPlay = _this$props.onPlay,
          onPause = _this$props.onPause,
          onEnded = _this$props.onEnded,
          onTimeUpdate = _this$props.onTimeUpdate,
          onFullScreenChange = _this$props.onFullScreenChange,
          onWaiting = _this$props.onWaiting,
          onError = _this$props.onError,
          onProgress = _this$props.onProgress,
          onLoadedMetaData = _this$props.onLoadedMetaData;
      return /*#__PURE__*/_react["default"].createElement("video", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        onPlay: onPlay ? 'onPlay' : null,
        onPause: onPause ? 'onPause' : null,
        onEnded: onEnded ? 'onEnded' : null,
        onTimeUpdate: onTimeUpdate ? 'onTimeUpdate' : null,
        onFullScreenChange: onFullScreenChange ? 'onFullScreenChange' : null,
        onWaiting: onWaiting ? 'onWaiting' : null,
        onError: onError ? 'onError' : null,
        onProgress: onProgress ? 'onProgress' : null,
        onLoadedMetaData: onLoadedMetaData ? 'onLoadedMetaData' : null,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        src: src,
        duration: duration,
        controls: controls,
        danmuList: danmuList,
        danmuButton: danmuButton,
        enableDanmu: enableDanmu,
        autoplay: autoplay,
        loop: loop,
        muted: muted,
        initialTime: initialTime,
        pageGesture: pageGesture,
        direction: direction,
        showProgress: showProgress,
        showFullscreenButton: showFullscreenButton,
        showPlayButton: showPlayButton,
        showCenterPlayButton: showCenterPlayButton,
        enableProgressGesture: enableProgressGesture,
        objectFit: objectFit,
        poster: poster,
        showMuteButton: showMuteButton,
        title: title,
        playButtonPosition: playButtonPosition,
        enablePlayGesture: enablePlayGesture,
        autoPauseIfNavigate: autoPauseIfNavigate,
        autoPauseIfOpenNative: autoPauseIfOpenNative,
        vslideGesture: vslideGesture,
        vslideGestureInFullscreen: vslideGestureInFullscreen,
        adUnitId: adUnitId
      }, this.props.children);
    }
  }]);
  return RemixVideo;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixVideo, "propTypes", {
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  src: _PropTypes["default"].string,
  duration: _PropTypes["default"].number,
  controls: _PropTypes["default"]["boolean"],
  danmuList: _PropTypes["default"].array,
  danmuButton: _PropTypes["default"]["boolean"],
  enableDanmu: _PropTypes["default"]["boolean"],
  autoplay: _PropTypes["default"]["boolean"],
  loop: _PropTypes["default"]["boolean"],
  muted: _PropTypes["default"]["boolean"],
  initialTime: _PropTypes["default"].number,
  pageGesture: _PropTypes["default"]["boolean"],
  direction: _PropTypes["default"].number,
  showProgress: _PropTypes["default"]["boolean"],
  showFullscreenButton: _PropTypes["default"]["boolean"],
  showPlayButton: _PropTypes["default"]["boolean"],
  showCenterPlayButton: _PropTypes["default"]["boolean"],
  enableProgressGesture: _PropTypes["default"]["boolean"],
  objectFit: _PropTypes["default"]["boolean"],
  poster: _PropTypes["default"].string,
  showMuteButton: _PropTypes["default"]["boolean"],
  title: _PropTypes["default"].string,
  playButtonPosition: _PropTypes["default"].string,
  enablePlayGesture: _PropTypes["default"]["boolean"],
  autoPauseIfNavigate: _PropTypes["default"]["boolean"],
  autoPauseIfOpenNative: _PropTypes["default"]["boolean"],
  vslideGesture: _PropTypes["default"]["boolean"],
  vslideGestureInFullscreen: _PropTypes["default"]["boolean"],
  adUnitId: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string,
  onPlay: _PropTypes["default"].string,
  onPause: _PropTypes["default"].string,
  onEnded: _PropTypes["default"].string,
  onTimeUpdate: _PropTypes["default"].string,
  onFullScreenChange: _PropTypes["default"].string,
  onWaiting: _PropTypes["default"].string,
  onError: _PropTypes["default"].string,
  onProgress: _PropTypes["default"].string,
  onLoadedMetaData: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixVideo, "defaultProps", {
  uuid: null,
  parent: null,
  style: null,
  className: null,
  src: null,
  duration: null,
  controls: true,
  danmuList: null,
  danmuButton: false,
  enableDanmu: false,
  autoplay: false,
  loop: false,
  muted: false,
  initialTime: 0,
  pageGesture: false,
  direction: null,
  showProgress: true,
  showFullscreenButton: true,
  showPlayButton: true,
  showCenterPlayButton: true,
  enableProgressGesture: true,
  objectFit: 0,
  poster: null,
  showMuteButton: false,
  title: null,
  playButtonPosition: 'bottom',
  enablePlayGesture: false,
  autoPauseIfNavigate: true,
  autoPauseIfOpenNative: true,
  vslideGesture: true,
  vslideGestureInFullscreen: true,
  adUnitId: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null,
  onPlay: null,
  onPause: null,
  onEnded: null,
  onTimeUpdate: null,
  onFullScreenChange: null,
  onWaiting: null,
  onError: null,
  onProgress: null,
  onLoadedMetaData: null
});
var _default = RemixVideo;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/components/remix-ui/remix-view/index.js":
/*!************************************************************!*\
  !*** ../remix/src/components/remix-ui/remix-view/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remix/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js"));

var _EventHandle2 = _interopRequireDefault(__webpack_require__(/*! ../EventHandle */ "../remix/src/components/remix-ui/EventHandle.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixView = /*#__PURE__*/function (_EventHandle) {
  (0, _inherits2["default"])(RemixView, _EventHandle);

  var _super = _createSuper(RemixView);

  function RemixView() {
    (0, _classCallCheck2["default"])(this, RemixView);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          child = _this$props.child,
          innerText = _this$props.innerText,
          uuid = _this$props.uuid,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          hoverClass = _this$props.hoverClass,
          hoverStopPropagation = _this$props.hoverStopPropagation,
          hoverStartTime = _this$props.hoverStartTime,
          hoverStayTime = _this$props.hoverStayTime,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchCancel = _this$props.onTouchCancel,
          onTouchEnd = _this$props.onTouchEnd,
          onTap = _this$props.onTap,
          onLongPress = _this$props.onLongPress,
          onLongTap = _this$props.onLongTap,
          onTouchForceChange = _this$props.onTouchForceChange,
          onTransitionEnd = _this$props.onTransitionEnd,
          onAnimationStart = _this$props.onAnimationStart,
          onAnimationIteration = _this$props.onAnimationIteration,
          onAnimationEnd = _this$props.onAnimationEnd;
      return /*#__PURE__*/_react["default"].createElement("view", {
        onTouchStart: onTouchStart ? 'onTouchStart' : null,
        onTouchMove: onTouchMove ? 'onTouchMove' : null,
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : null,
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : null,
        onTap: onTap ? 'onTap' : null,
        onLongPress: onLongPress ? 'onLongPress' : null,
        onLongTap: onLongTap ? 'onLongTap' : null,
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : null,
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : null,
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : null,
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : null,
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : null,
        child: child,
        innerText: innerText,
        uuid: uuid,
        parent: parent,
        style: style,
        className: className,
        hoverClass: hoverClass,
        hoverStopPropagation: hoverStopPropagation,
        hoverStartTime: hoverStartTime,
        hoverStayTime: hoverStayTime
      }, this.props.children);
    }
  }]);
  return RemixView;
}(_EventHandle2["default"]);

(0, _defineProperty2["default"])(RemixView, "propTypes", {
  child: _PropTypes["default"].object,
  innerText: _PropTypes["default"].string,
  uuid: _PropTypes["default"].string,
  parent: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  onTouchStart: _PropTypes["default"].string,
  onTouchMove: _PropTypes["default"].string,
  onTouchCancel: _PropTypes["default"].string,
  onTouchEnd: _PropTypes["default"].string,
  onTap: _PropTypes["default"].string,
  onLongPress: _PropTypes["default"].string,
  onLongTap: _PropTypes["default"].string,
  onTouchForceChange: _PropTypes["default"].string,
  onTransitionEnd: _PropTypes["default"].string,
  onAnimationStart: _PropTypes["default"].string,
  onAnimationIteration: _PropTypes["default"].string,
  onAnimationEnd: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixView, "defaultProps", {
  child: null,
  innerText: null,
  uuid: null,
  parent: null,
  style: null,
  className: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null,
  onTap: null,
  onLongPress: null,
  onLongTap: null,
  onTouchForceChange: null,
  onTransitionEnd: null,
  onAnimationStart: null,
  onAnimationIteration: null,
  onAnimationEnd: null
});
var _default = RemixView;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/Element.js":
/*!****************************************!*\
  !*** ../remix/src/document/Element.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remix/src/document/document.js"));

var id = 0;

var Element = /*#__PURE__*/function () {
  function Element() {
    (0, _classCallCheck2["default"])(this, Element);
    this.uuid = "rx-".concat(id++);
    this.tagName = null;
    this.nodeType = null;
    this.child = null;
    this["return"] = null;
    this.sibling = null;
    this.previous = null;
    this.lastChild = null;
  }

  (0, _createClass2["default"])(Element, [{
    key: "ownerDocument",
    get: function get() {
      return _document["default"];
    }
  }]);
  return Element;
}();

exports["default"] = Element;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLBodyElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLBodyElement.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remix/src/document/document.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLBodyElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLBodyElement, _HTMLElement);

  var _super = _createSuper(HTMLBodyElement);

  function HTMLBodyElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLBodyElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "tagName", _HTMLTypes.BODY);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "nodeType", _HTMLNodeType.ELEMENT_NODE);
    return _this;
  }

  (0, _createClass2["default"])(HTMLBodyElement, [{
    key: "ownerDocument",
    get: function get() {
      return _document["default"];
    }
  }]);
  return HTMLBodyElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLBodyElement;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLButtonElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLButtonElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _remixButton = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-button */ "../remix/src/components/remix-ui/remix-button/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLButtonElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLButtonElement, _HTMLElement);

  var _super = _createSuper(HTMLButtonElement);

  function HTMLButtonElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLButtonElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.BUTTON;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLButtonElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLButtonElement;
(0, _defineProperty2["default"])(HTMLButtonElement, "defaultProps", _remixButton["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLEditorElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLEditorElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixEditor = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-editor */ "../remix/src/components/remix-ui/remix-editor/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixTextAreaElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(RemixTextAreaElement, _HTMLElement);

  var _super = _createSuper(RemixTextAreaElement);

  function RemixTextAreaElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, RemixTextAreaElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.EDITOR;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  (0, _createClass2["default"])(RemixTextAreaElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);
  return RemixTextAreaElement;
}(_HTMLElement2["default"]);

exports["default"] = RemixTextAreaElement;
(0, _defineProperty2["default"])(RemixTextAreaElement, "defaultProps", _remixEditor["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLElement.js":
/*!********************************************!*\
  !*** ../remix/src/document/HTMLElement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "../remix/src/document/Element.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function resolveDefaultProps(defaultProps, unresolvedProps) {
  if (defaultProps) {
    var props = {};

    for (var propName in defaultProps) {
      var value = void 0;

      if (unresolvedProps[propName] === undefined) {
        value = defaultProps[propName];
      } else {
        value = unresolvedProps[propName];
      }

      if (!(value === null || value === undefined)) {
        props[propName] = value;
      }
    }

    return props;
  }

  return {};
}

var HTMLElement = /*#__PURE__*/function (_Element) {
  (0, _inherits2["default"])(HTMLElement, _Element);

  var _super = _createSuper(HTMLElement);

  function HTMLElement(tagName) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLElement);
    _this = _super.call(this);
    _this.tagName = tagName;
    _this.innerText = null;
    _this.style = {};
    return _this;
  }

  (0, _createClass2["default"])(HTMLElement, [{
    key: "getElementById",
    value: function getElementById(id) {
      if (this.uuid === id) {
        return this;
      }

      var node = this.child;

      while (node) {
        if (node.uuid === id) {
          return node;
        }

        if (node.child) {
          node = node.child;
        } else {
          while (node.sibling === null) {
            if (node["return"] === null) {
              return null;
            }

            node = node["return"];
          }

          node = node.sibling;
        }
      }
    }
  }, {
    key: "appendChild",
    value: function appendChild(child) {
      child.previous = this.lastChild;
      child["return"] = this;
      child.parentNode = this;

      if (this.child === null) {
        this.child = this.lastChild = child;
      } else {
        this.lastChild.sibling = child;
        this.lastChild = child;
      }
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var node = this.child;
      var prevNode = null;

      while (node) {
        if (child === node) {
          if (node === this.child) {
            this.child = node.sibling;
          } else {
            prevNode.sibling = node.sibling;
          }
        }

        prevNode = node;
        node = node.sibling;
      }
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, beforeChild) {
      if (this.child === beforeChild) {
        this.child = child;
      } else {
        beforeChild.previous.sibling = child;
      }

      child.sibling = beforeChild;
      beforeChild.previous = child;
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this[name] = value;
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this[name] = null;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }, {
    key: "toString",
    value: function toString() {
      return "[object HTML".concat(this.tagName, "Element]");
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var defaultProps = this.constructor.defaultProps;
      var element = resolveDefaultProps(defaultProps, this);

      if (this.sibling) {
        element.sibling = this.sibling.serialize();
      } else {
        element.sibling = this.sibling;
      }

      if (this.child) {
        element.child = this.child.serialize();
      }

      if (this.innerText) {
        element.innerText = this.innerText;
      }

      element.tagName = this.tagName;
      element.uuid = this.uuid;
      return element;
    }
  }, {
    key: "innerHTML",
    set: function set(html) {
      throw new Error('Sorry, innerHTML is not be supportted');
    }
  }]);
  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLImageElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLImageElement.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixImage = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-image */ "../remix/src/components/remix-ui/remix-image/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLImageElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLImageElement, _HTMLElement);

  var _super = _createSuper(HTMLImageElement);

  function HTMLImageElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLImageElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.IMAGE;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  (0, _createClass2["default"])(HTMLImageElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);
  return HTMLImageElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLImageElement;
(0, _defineProperty2["default"])(HTMLImageElement, "defaultProps", _remixImage["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLInputElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLInputElement.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixInput = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-input */ "../remix/src/components/remix-ui/remix-input/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixInputElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(RemixInputElement, _HTMLElement);

  var _super = _createSuper(RemixInputElement);

  function RemixInputElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, RemixInputElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.INPUT;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  (0, _createClass2["default"])(RemixInputElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);
  return RemixInputElement;
}(_HTMLElement2["default"]);

exports["default"] = RemixInputElement;
(0, _defineProperty2["default"])(RemixInputElement, "defaultProps", _remixInput["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLPickerElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLPickerElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-picker */ "../remix/src/components/remix-ui/remix-picker/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLPickerElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLPickerElement, _HTMLElement);

  var _super = _createSuper(HTMLPickerElement);

  function HTMLPickerElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLPickerElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.PICKER;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLPickerElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLPickerElement;
(0, _defineProperty2["default"])(HTMLPickerElement, "defaultProps", _remixPicker["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLSwiperElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLSwiperElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _remixSwiper = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-swiper */ "../remix/src/components/remix-ui/remix-swiper/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLSwiperElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLSwiperElement, _HTMLElement);

  var _super = _createSuper(HTMLSwiperElement);

  function HTMLSwiperElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLSwiperElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.SWIPER;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLSwiperElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLSwiperElement;
(0, _defineProperty2["default"])(HTMLSwiperElement, "defaultProps", _remixSwiper["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLSwiperItemElement.js":
/*!******************************************************!*\
  !*** ../remix/src/document/HTMLSwiperItemElement.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _remixSwiperItem = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-swiper-item */ "../remix/src/components/remix-ui/remix-swiper-item/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLSwiperItemElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLSwiperItemElement, _HTMLElement);

  var _super = _createSuper(HTMLSwiperItemElement);

  function HTMLSwiperItemElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLSwiperItemElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.SWIPER_ITEM;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLSwiperItemElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLSwiperItemElement;
(0, _defineProperty2["default"])(HTMLSwiperItemElement, "defaultProps", _remixSwiperItem["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLTextAreaElement.js":
/*!****************************************************!*\
  !*** ../remix/src/document/HTMLTextAreaElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixTextarea = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-textarea */ "../remix/src/components/remix-ui/remix-textarea/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixTextAreaElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(RemixTextAreaElement, _HTMLElement);

  var _super = _createSuper(RemixTextAreaElement);

  function RemixTextAreaElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, RemixTextAreaElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.TEXTAREA;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  (0, _createClass2["default"])(RemixTextAreaElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);
  return RemixTextAreaElement;
}(_HTMLElement2["default"]);

exports["default"] = RemixTextAreaElement;
(0, _defineProperty2["default"])(RemixTextAreaElement, "defaultProps", _remixTextarea["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLTextElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLTextElement.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixText = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-text */ "../remix/src/components/remix-ui/remix-text/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLTextElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLTextElement, _HTMLElement);

  var _super = _createSuper(HTMLTextElement);

  function HTMLTextElement(textContent) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLTextElement);
    _this = _super.call(this);
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.tagName = _HTMLTypes.TEXT;
    return _this;
  }

  return HTMLTextElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLTextElement;
(0, _defineProperty2["default"])(HTMLTextElement, "defaultProps", _remixText["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLTypes.js":
/*!******************************************!*\
  !*** ../remix/src/document/HTMLTypes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDITOR = exports.TEXTAREA = exports.VIDEO = exports.SWIPER = exports.SWIPER_ITEM = exports.PICKER = exports.PLAIN_TEXT = exports.TEXT = exports.BODY = exports.ROOT = exports.VIEW = exports.INPUT = exports.MAP = exports.BUTTON = exports.IMAGE = void 0;
var IMAGE = 'image';
exports.IMAGE = IMAGE;
var BUTTON = 'button';
exports.BUTTON = BUTTON;
var MAP = 'map';
exports.MAP = MAP;
var INPUT = 'input';
exports.INPUT = INPUT;
var VIEW = 'view';
exports.VIEW = VIEW;
var ROOT = 'root';
exports.ROOT = ROOT;
var BODY = 'body';
exports.BODY = BODY;
var TEXT = 'text';
exports.TEXT = TEXT;
var PLAIN_TEXT = '#text';
exports.PLAIN_TEXT = PLAIN_TEXT;
var PICKER = 'picker';
exports.PICKER = PICKER;
var SWIPER_ITEM = 'swiper-item';
exports.SWIPER_ITEM = SWIPER_ITEM;
var SWIPER = 'swiper';
exports.SWIPER = SWIPER;
var VIDEO = 'video';
exports.VIDEO = VIDEO;
var TEXTAREA = 'textarea';
exports.TEXTAREA = TEXTAREA;
var EDITOR = 'editor';
exports.EDITOR = EDITOR;

/***/ }),

/***/ "../remix/src/document/HTMLVideoElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLVideoElement.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _remixVideo = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-video */ "../remix/src/components/remix-ui/remix-video/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RemixVideoElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(RemixVideoElement, _HTMLElement);

  var _super = _createSuper(RemixVideoElement);

  function RemixVideoElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, RemixVideoElement);
    _this = _super.call(this);
    _this.tagName = _HTMLTypes.VIDEO;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  (0, _createClass2["default"])(RemixVideoElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);
  return RemixVideoElement;
}(_HTMLElement2["default"]);

exports["default"] = RemixVideoElement;
(0, _defineProperty2["default"])(RemixVideoElement, "defaultProps", _remixVideo["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/HTMLViewElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLViewElement.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _remixView = _interopRequireDefault(__webpack_require__(/*! ../components/remix-ui/remix-view */ "../remix/src/components/remix-ui/remix-view/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HTMLViewElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLViewElement, _HTMLElement);

  var _super = _createSuper(HTMLViewElement);

  function HTMLViewElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLViewElement);
    _this = _super.call(this);
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.tagName = _HTMLTypes.VIEW;
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLViewElement;
(0, _defineProperty2["default"])(HTMLViewElement, "defaultProps", _remixView["default"].defaultProps);
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/createContainer.js":
/*!************************************************!*\
  !*** ../remix/src/document/createContainer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createContainer;

function createContainer() {}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/createElement.js":
/*!**********************************************!*\
  !*** ../remix/src/document/createElement.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js"));

var _HTMLImageElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLImageElement */ "../remix/src/document/HTMLImageElement.js"));

var _HTMLButtonElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLButtonElement */ "../remix/src/document/HTMLButtonElement.js"));

var _HTMLViewElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLViewElement */ "../remix/src/document/HTMLViewElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js"));

var _HTMLPickerElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLPickerElement */ "../remix/src/document/HTMLPickerElement.js"));

var _HTMLSwiperItemElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLSwiperItemElement */ "../remix/src/document/HTMLSwiperItemElement.js"));

var _HTMLSwiperElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLSwiperElement */ "../remix/src/document/HTMLSwiperElement.js"));

var _HTMLVideoElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLVideoElement */ "../remix/src/document/HTMLVideoElement.js"));

var _HTMLInputElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLInputElement */ "../remix/src/document/HTMLInputElement.js"));

var _HTMLTextAreaElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextAreaElement */ "../remix/src/document/HTMLTextAreaElement.js"));

var _HTMLEditorElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLEditorElement */ "../remix/src/document/HTMLEditorElement.js"));

function createElement(tagName) {
  switch (tagName) {
    case _HTMLTypes.EDITOR:
      {
        return new _HTMLEditorElement["default"]();
      }

    case _HTMLTypes.TEXTAREA:
      {
        return new _HTMLTextAreaElement["default"]();
      }

    case _HTMLTypes.INPUT:
      {
        return new _HTMLInputElement["default"]();
      }

    case _HTMLTypes.IMAGE:
      {
        return new _HTMLImageElement["default"]();
      }

    case _HTMLTypes.BUTTON:
      {
        return new _HTMLButtonElement["default"]();
      }

    case _HTMLTypes.VIEW:
      {
        return new _HTMLViewElement["default"]();
      }

    case _HTMLTypes.TEXT:
      {
        return new _HTMLTextElement["default"]();
      }

    case _HTMLTypes.PICKER:
      {
        return new _HTMLPickerElement["default"]();
      }

    case _HTMLTypes.SWIPER_ITEM:
      {
        return new _HTMLSwiperItemElement["default"]();
      }

    case _HTMLTypes.SWIPER:
      {
        return new _HTMLSwiperElement["default"]();
      }

    case _HTMLTypes.VIDEO:
      {
        return new _HTMLVideoElement["default"]();
      }

    default:
      {
        return new _HTMLElement["default"](tagName);
      }
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/createTextNode.js":
/*!***********************************************!*\
  !*** ../remix/src/document/createTextNode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTextNode;

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");

function createTextNode(text) {
  return {
    nodeType: _HTMLNodeType.TEXT_NODE,
    tagName: _HTMLTypes.PLAIN_TEXT,
    text: text,
    serialize: function serialize() {
      var element = {
        tagName: this.tagName,
        text: this.text
      };

      if (!(0, _is.isNullOrUndefined)(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      return element;
    }
  };
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/document.js":
/*!*****************************************!*\
  !*** ../remix/src/document/document.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLBodyElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLBodyElement */ "../remix/src/document/HTMLBodyElement.js"));

var _createElement = _interopRequireDefault(__webpack_require__(/*! ./createElement */ "../remix/src/document/createElement.js"));

var _createTextNode = _interopRequireDefault(__webpack_require__(/*! ./createTextNode */ "../remix/src/document/createTextNode.js"));

var _createContainer = _interopRequireDefault(__webpack_require__(/*! ./createContainer */ "../remix/src/document/createContainer.js"));

var _globalElements = _interopRequireDefault(__webpack_require__(/*! ./globalElements */ "../remix/src/document/globalElements.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../config */ "../remix/config.js"));

var fakeDocument = {
  findElement: function findElement(uuid) {
    return _globalElements["default"][uuid];
  },
  getContainerElements: function getContainerElements(container) {
    return container.serialize();
  },
  body: new _HTMLBodyElement["default"](),
  getElementById: function getElementById(id) {
    return (0, _createContainer["default"])('container');
  },
  getElementsByTagName: function getElementsByTagName() {},
  querySelector: function querySelector() {},
  dispatchEvent: function dispatchEvent() {},
  createElement: _createElement["default"],
  createTextNode: _createTextNode["default"]
};
var _default = fakeDocument; // export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/globalElements.js":
/*!***********************************************!*\
  !*** ../remix/src/document/globalElements.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/document/index.js":
/*!**************************************!*\
  !*** ../remix/src/document/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "document", {
  enumerable: true,
  get: function get() {
    return _document["default"];
  }
});

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remix/src/document/document.js"));

/***/ }),

/***/ "../remix/src/hooks/index.js":
/*!***********************************!*\
  !*** ../remix/src/hooks/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRemixController = useRemixController;
Object.defineProperty(exports, "useComponent", {
  enumerable: true,
  get: function get() {
    return _useComponent.useComponent;
  }
});

var _useComponent = __webpack_require__(/*! ./useComponent */ "../remix/src/hooks/useComponent.js");

function useRemixController(Component) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ViewController = (0, _useComponent.useComponent)(Component);
  ViewController.config = config;
  ViewController.isViewController = true;
  return ViewController;
}

/***/ }),

/***/ "../remix/src/hooks/useComponent.js":
/*!******************************************!*\
  !*** ../remix/src/hooks/useComponent.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponent = useComponent;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _hoistNonReactStatics = _interopRequireDefault(__webpack_require__(/*! hoist-non-react-statics */ "../remix/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"));

var _ReactHook = _interopRequireWildcard(__webpack_require__(/*! ../ReactHook */ "../remix/src/ReactHook.js"));

var _shared = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useComponent(Component) {
  var proto = Component.prototype;

  if (proto.isReactComponent && typeof proto.render === 'function') {
    var Wrapper = function Wrapper(props) {
      var workInProgress = _ReactHook["default"].ReactCurrentHookFiber;

      if (workInProgress.stateNode) {
        var instance = (0, _ReactHook.useMemo)(function () {
          return new Component(props);
        }, []);

        var _useState = (0, _ReactHook.useState)(instance.state),
            _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
            state = _useState2[0];

        var oldProps = workInProgress.memoizedProps;
        instance.props = oldProps;
        instance.state = state;
        var oldState = workInProgress.memoizedState;
        var newState = instance.state = state;
        applyDerivedStateFromProps(workInProgress, Component, props);
        var shouldUpdate = checkShouldComponentUpdate(workInProgress, Component, oldProps, props, oldState, newState);

        if (shouldUpdate) {
          debugger;
          return instance.render();
        }
      } else {
        var _instance = (0, _ReactHook.useMemo)(function () {
          return new Component(props);
        }, []);

        var _useState3 = (0, _ReactHook.useState)(_instance.state),
            _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
            _state = _useState4[0],
            setState = _useState4[1];

        workInProgress.stateNode = _instance;
        workInProgress.memoizedState = _objectSpread({}, workInProgress.memoizedState, {}, _state);
        _instance.props = props;
        _instance.state = _state;
        _instance.setState = setState;
        applyDerivedStateFromProps(workInProgress, Component, props);
        return _instance.render();
      }
    };

    Wrapper.displayName = Component.name;
    return (0, _hoistNonReactStatics["default"])(Wrapper, Component);
  } else {
    throw new Error("Must provide react class component");
  }
}

function applyDerivedStateFromProps(workInProgress, Component, nextProps) {
  var getDerivedStateFromProps = Component.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === 'function') {
    var instance = workInProgress.stateNode;
    var memoizedState = workInProgress.memoizedState;
    var nextState = getDerivedStateFromProps(nextProps, memoizedState);
    instance.state = workInProgress.memoizedState = nextState === null || nextState === undefined ? memoizedState : _objectSpread({}, memoizedState, {
      partialState: partialState
    });
  }
}

function checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState) {
  var instance = workInProgress.stateNode;

  if (typeof instance.shouldComponentUpdate === 'function') {
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState);
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !(0, _shared.shallowEqual)(oldProps, newProps) || !(0, _shared.shallowEqual)(oldState, newState);
  }

  return true;
}

/***/ }),

/***/ "../remix/src/project/Program.js":
/*!***************************************!*\
  !*** ../remix/src/project/Program.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.getApplication = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var _renderer = _interopRequireDefault(__webpack_require__(/*! ../renderer */ "../remix/src/renderer/index.js"));

var _components = __webpack_require__(/*! ../components */ "../remix/src/components/index.js");

var _router = __webpack_require__(/*! ../router */ "../remix/src/router/index.js");

var _runtime = _interopRequireDefault(__webpack_require__(/*! ./runtime */ "../remix/src/project/runtime/index.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CurrentProgram = null;
var TabBarItem = _components.TabBar.TabBarItem;

var next = function next(node) {
  if (node.child) {
    return node = node.child;
  }

  while (node.sibling === null) {
    if (node["return"] === null) {
      return null;
    }

    node = node["return"];
  }

  return node = node.sibling;
};

var getApplication = function getApplication() {
  return CurrentProgram;
};

exports.getApplication = getApplication;

function _default(App, container) {
  var context = null;
  return CurrentProgram = {
    start: function start() {
      console.log(this.context);
      (0, _runtime["default"])(this.context, this.instance);
    },

    get currentFiber() {
      _renderer["default"].render(_react["default"].createElement(App), container);

      var rootContainer = container._reactRootContainer;
      var currentFiber = rootContainer.internalRoot.workInProgress;
      return currentFiber;
    },

    get context() {
      if (context) {
        return context;
      }

      context = {
        tabBar: {
          items: []
        },
        router: {
          routes: []
        },
        config: {}
      };
      var node = this.currentFiber;

      while (node) {
        var _node = node,
            elementType = _node.elementType;

        if (elementType) {
          if (elementType === _components.Application) {
            context.config = node.memoizedProps.config;
            this.instance = node.stateNode;
          } else if (elementType === _router.Route) {
            if (!node.memoizedProps.component.isViewController) {
              console.warn("<Route path='".concat(node.memoizedProps.path, "' /> \u8DEF\u7531\u7EC4\u4EF6\u8BF7\u4F7F\u7528 useRemixController \u5305\u88C5\uFF0C\u5426\u5219\u65E0\u6CD5\u8BFB\u53D6\u9875\u9762\u914D\u7F6E\u6587\u4EF6"));
            }

            context.router.routes.push({
              path: node.memoizedProps.path,
              component: node.memoizedProps.component,
              config: node.memoizedProps.component.config || {}
            });
          } else if (elementType === _components.TabBar) {
            context.tabBar = _objectSpread({}, node.memoizedProps, {}, context.tabBar);
          } else if (elementType === TabBarItem) {
            var _node$memoizedProps = node.memoizedProps,
                icon = _node$memoizedProps.icon,
                selectedIcon = _node$memoizedProps.selectedIcon,
                path = _node$memoizedProps.path;
            var text = node.memoizedProps.text || node.memoizedProps.children;
            context.tabBar.items.push({
              icon: icon,
              selectedIcon: selectedIcon,
              path: path,
              text: text
            });
          }
        }

        node = next(node);
      }

      return context;
    }

  };
}

/***/ }),

/***/ "../remix/src/project/View.js":
/*!************************************!*\
  !*** ../remix/src/project/View.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var ViewNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./runtime/Support/ViewNativeSupport */ "../remix/src/project/runtime/Support/ViewNativeSupport.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default(route) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var view = {
    id: _uuid["default"].v4(),
    route: route
  };

  if (typeof Page === 'function') {
    Page({
      data: {
        type: null,
        element: element
      },
      onLoad: function onLoad(query) {
        var _this = this;

        ViewNativeSupport.Subscriber.on("".concat(ViewNativeSupport.Data, ".").concat(view.id), function (id, element) {
          if (id === view.id) {
            _this.setData({
              type: 'SYNC',
              element: element
            });
          }
        });
        ViewNativeSupport.Publisher.Load(_objectSpread({}, view, {
          query: query
        }));
      },
      onShow: function onShow() {
        ViewNativeSupport.Publisher.Show(view);
      },
      onUnload: function onUnload() {
        ViewNativeSupport.Subscriber.off("".concat(ViewNativeSupport.Data, ".").concat(view.id));
      }
    });
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/index.js":
/*!*************************************!*\
  !*** ../remix/src/project/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Program: true,
  View: true,
  ViewNativeSupport: true,
  AppNativeSupport: true
};
Object.defineProperty(exports, "Program", {
  enumerable: true,
  get: function get() {
    return _Program["default"];
  }
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _View["default"];
  }
});
exports.AppNativeSupport = exports.ViewNativeSupport = void 0;

var _Program = _interopRequireWildcard(__webpack_require__(/*! ./Program */ "../remix/src/project/Program.js"));

Object.keys(_Program).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Program[key];
    }
  });
});

var _View = _interopRequireDefault(__webpack_require__(/*! ./View */ "../remix/src/project/View.js"));

var ViewNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./runtime/Support/ViewNativeSupport */ "../remix/src/project/runtime/Support/ViewNativeSupport.js"));

exports.ViewNativeSupport = ViewNativeSupport;

var AppNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./runtime/Support/AppNativeSupport */ "../remix/src/project/runtime/Support/AppNativeSupport.js"));

exports.AppNativeSupport = AppNativeSupport;

var _terminal = __webpack_require__(/*! ./runtime/terminal */ "../remix/src/project/runtime/terminal/index.js");

Object.keys(_terminal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _terminal[key];
    }
  });
});

/***/ }),

/***/ "../remix/src/project/notification/index.js":
/*!**************************************************!*\
  !*** ../remix/src/project/notification/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remix-cli/node_modules/events/events.js"));

var _types = __webpack_require__(/*! ./types */ "../remix/src/project/notification/types.js");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Transport = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(Transport, _EventEmitter);

  var _super = _createSuper(Transport);

  function Transport() {
    (0, _classCallCheck2["default"])(this, Transport);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Transport, [{
    key: "post",
    value: function post(type, e) {
      this.emit(type, e);
    }
  }, {
    key: "app",
    value: function app() {
      var _this = this;

      return {
        launch: function launch() {
          for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
            argv[_key] = arguments[_key];
          }

          _this.post(_types.APPLICATION.LAUNCH, argv);
        },
        show: function show() {
          for (var _len2 = arguments.length, argv = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            argv[_key2] = arguments[_key2];
          }

          _this.post(_types.APPLICATION.SHOW, argv);
        },
        hide: function hide() {
          for (var _len3 = arguments.length, argv = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            argv[_key3] = arguments[_key3];
          }

          this.post(_types.APPLICATION.HIDE, argv);
        },
        error: function error() {
          for (var _len4 = arguments.length, argv = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            argv[_key4] = arguments[_key4];
          }

          this.post(_types.APPLICATION.ERROR, argv);
        }
      };
    }
  }, {
    key: "view",
    value: function view() {
      return {
        load: function load() {
          for (var _len5 = arguments.length, argv = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            argv[_key5] = arguments[_key5];
          }

          this.post(_types.VIEW.LOAD, argv);
        }
      };
    }
  }]);
  return Transport;
}(_events["default"]);

var _default = new Transport();

exports["default"] = _default;

/***/ }),

/***/ "../remix/src/project/notification/types.js":
/*!**************************************************!*\
  !*** ../remix/src/project/notification/types.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW = exports.APPLICATION = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var Type = /*#__PURE__*/function () {
  function Type(value) {
    (0, _classCallCheck2["default"])(this, Type);
    this.value = value;
    this.uuid = _uuid["default"].v4();
  }

  (0, _createClass2["default"])(Type, [{
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "toValue",
    value: function toValue() {
      return this.uuid;
    }
  }]);
  return Type;
}();

var getNames = Object.getOwnPropertyNames;

var defineNotificationTypes = function defineNotificationTypes(types) {
  var names = getNames(types);
  var t = {};
  names.forEach(function (name) {
    t[name] = new Type(types[name]);
  });
  return t;
};

var APPLICATION = defineNotificationTypes({
  LAUNCH: 'application.launch',
  SHOW: 'application.show',
  HIDE: 'application.hide',
  ERROR: 'application.error'
});
exports.APPLICATION = APPLICATION;
var VIEW = defineNotificationTypes({
  LOAD: 'view.load'
});
exports.VIEW = VIEW;

/***/ }),

/***/ "../remix/src/project/runtime/Support/AppNativeSupport.js":
/*!****************************************************************!*\
  !*** ../remix/src/project/runtime/Support/AppNativeSupport.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = exports.Publisher = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var _tinyEmitter = _interopRequireDefault(__webpack_require__(/*! tiny-emitter */ "../remix/node_modules/tiny-emitter/index.js"));

var _App = _interopRequireWildcard(__webpack_require__(/*! ./types/App */ "../remix/src/project/runtime/Support/types/App.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Publisher = new ( /*#__PURE__*/function (_Emitter) {
  (0, _inherits2["default"])(_class, _Emitter);

  var _super = _createSuper(_class);

  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(_class, [{
    key: "Launch",
    value: function Launch(options) {
      Subscriber.emit(_App["default"], {
        type: _App.Launch,
        argv: [options]
      });
    }
  }]);
  return _class;
}(_tinyEmitter["default"]))();
exports.Publisher = Publisher;
var Subscriber = new ( /*#__PURE__*/function (_Emitter2) {
  (0, _inherits2["default"])(_class2, _Emitter2);

  var _super2 = _createSuper(_class2);

  function _class2() {
    var _this;

    (0, _classCallCheck2["default"])(this, _class2);
    _this = _super2.call(this);

    _this.on(_App["default"], function (_ref) {
      var _this2;

      var type = _ref.type,
          argv = _ref.argv,
          callbackId = _ref.callbackId;

      (_this2 = _this)[type].apply(_this2, (0, _toConsumableArray2["default"])(argv).concat([callbackId]));
    });

    return _this;
  }

  (0, _createClass2["default"])(_class2, [{
    key: "onLaunch",
    value: function onLaunch(options) {}
  }]);
  return _class2;
}(_tinyEmitter["default"]))();
exports.Subscriber = Subscriber;

/***/ }),

/***/ "../remix/src/project/runtime/Support/ViewNativeSupport.js":
/*!*****************************************************************!*\
  !*** ../remix/src/project/runtime/Support/ViewNativeSupport.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Load", {
  enumerable: true,
  get: function get() {
    return _View.Load;
  }
});
Object.defineProperty(exports, "Show", {
  enumerable: true,
  get: function get() {
    return _View.Show;
  }
});
Object.defineProperty(exports, "Ready", {
  enumerable: true,
  get: function get() {
    return _View.Ready;
  }
});
Object.defineProperty(exports, "Unload", {
  enumerable: true,
  get: function get() {
    return _View.Unload;
  }
});
Object.defineProperty(exports, "Hide", {
  enumerable: true,
  get: function get() {
    return _View.Hide;
  }
});
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function get() {
    return _View.Event;
  }
});
Object.defineProperty(exports, "Data", {
  enumerable: true,
  get: function get() {
    return _View.Data;
  }
});
exports.Subscriber = exports.Publisher = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var _tinyEmitter = _interopRequireDefault(__webpack_require__(/*! tiny-emitter */ "../remix/node_modules/tiny-emitter/index.js"));

var _View = _interopRequireWildcard(__webpack_require__(/*! ./types/View */ "../remix/src/project/runtime/Support/types/View.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Publisher = new ( /*#__PURE__*/function (_Emitter) {
  (0, _inherits2["default"])(_class, _Emitter);

  var _super = _createSuper(_class);

  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(_class, [{
    key: "Load",
    value: function Load(view, callback) {
      var callbackId = typeof callback === 'function' ? _uuid["default"].v4() : null;

      if (callbackId) {
        this.once(callbackId, callback);
      }

      Subscriber.emit(_View["default"], {
        type: _View.Load,
        argv: [view],
        callbackId: callbackId
      });
    }
  }, {
    key: "Show",
    value: function Show(view) {
      Subscriber.emit(_View["default"], {
        type: _View.Show,
        argv: [view]
      });
    }
  }, {
    key: "Data",
    value: function Data(id, data) {
      Subscriber.emit(_View["default"], {
        type: "".concat(_View.Data, ".").concat(id),
        argv: [id, data]
      });
    }
  }, {
    key: "Event",
    value: function Event() {
      for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
        argv[_key] = arguments[_key];
      }

      Subscriber.emit(_View["default"], {
        type: _View.Event,
        argv: argv
      });
    }
  }, {
    key: "Lifecycle",
    value: function Lifecycle(type, uuid) {// console.log(uuid);
    }
  }]);
  return _class;
}(_tinyEmitter["default"]))();
exports.Publisher = Publisher;
var Subscriber = new ( /*#__PURE__*/function (_Emitter2) {
  (0, _inherits2["default"])(_class2, _Emitter2);

  var _super2 = _createSuper(_class2);

  function _class2() {
    var _this;

    (0, _classCallCheck2["default"])(this, _class2);
    _this = _super2.call(this);

    _this.on(_View["default"], function (_ref) {
      var _this2;

      var type = _ref.type,
          argv = _ref.argv,
          callbackId = _ref.callbackId;

      if (callbackId) {
        argv.push(function () {
          for (var _len2 = arguments.length, argv = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            argv[_key2] = arguments[_key2];
          }

          Publisher.emit.apply(Publisher, [callbackId].concat(argv));
        });
      }

      (_this2 = _this).emit.apply(_this2, [type].concat((0, _toConsumableArray2["default"])(argv)));
    });

    return _this;
  }

  return _class2;
}(_tinyEmitter["default"]))();
exports.Subscriber = Subscriber;

/***/ }),

/***/ "../remix/src/project/runtime/Support/index.js":
/*!*****************************************************!*\
  !*** ../remix/src/project/runtime/Support/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AppNativeSupport = _interopRequireDefault(__webpack_require__(/*! ./AppNativeSupport */ "../remix/src/project/runtime/Support/AppNativeSupport.js"));

var _ViewNativeSupport = _interopRequireDefault(__webpack_require__(/*! ./ViewNativeSupport */ "../remix/src/project/runtime/Support/ViewNativeSupport.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../../../config */ "../remix/config.js"));

var isDevToolMode = _config["default"].mode === 'devtool';
var _default = {
  get App() {
    return _AppNativeSupport["default"];
  },

  get View() {
    return _ViewNativeSupport["default"];
  },

  get api() {
    if (!transports.api) {
      transports.api = isDevToolMode ? new APITransport() : new APITransportNative();
    }

    return transports.api;
  }

};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/runtime/Support/types/App.js":
/*!*********************************************************!*\
  !*** ../remix/src/project/runtime/Support/types/App.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Launch = exports["default"] = void 0;

var _default = String('App');

exports["default"] = _default;
var Launch = 'onLaunch';
exports.Launch = Launch;

/***/ }),

/***/ "../remix/src/project/runtime/Support/types/View.js":
/*!**********************************************************!*\
  !*** ../remix/src/project/runtime/Support/types/View.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports.Data = exports.Unload = exports.Ready = exports.Hide = exports.Show = exports.Load = exports["default"] = void 0;

var _default = String('View');

exports["default"] = _default;
var Load = 'onLoad';
exports.Load = Load;
var Show = 'onShow';
exports.Show = Show;
var Hide = 'onHide';
exports.Hide = Hide;
var Ready = 'onReady';
exports.Ready = Ready;
var Unload = 'onUnload';
exports.Unload = Unload;
var Data = 'onData';
exports.Data = Data;
var Event = 'onEvent';
exports.Event = Event;

/***/ }),

/***/ "../remix/src/project/runtime/ViewController.js":
/*!******************************************************!*\
  !*** ../remix/src/project/runtime/ViewController.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewControllersManager = ViewControllersManager;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _document = __webpack_require__(/*! ../../document */ "../remix/src/document/index.js");

var _react = _interopRequireDefault(__webpack_require__(/*! ../../react */ "../remix/src/react/index.js"));

var _renderer = _interopRequireDefault(__webpack_require__(/*! ../../renderer */ "../remix/src/renderer/index.js"));

var ViewNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./Support/ViewNativeSupport */ "../remix/src/project/runtime/Support/ViewNativeSupport.js"));

var _shared = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");

var _ReactEvent = __webpack_require__(/*! ../../ReactEvent */ "../remix/src/ReactEvent.js");

var views = _document.document.createElement('views');

_document.document.body.appendChild(views);

function ViewControllersManager(context, instance) {
  var viewControllers = [];
  var views = {};
  var viewController = null;
  context.router.routes.forEach(function (route) {
    views[route.path] = route;
  });
  ViewNativeSupport.Subscriber.on(ViewNativeSupport.Load, function (view) {
    var id = view.id,
        query = view.query,
        route = view.route;
    var controller = viewControllers[id];

    if (!controller) {
      var Class = views[route];

      if (view) {
        controller = new ViewController(id, route, query);
        controller.Class = Class.component;
        viewControllers[id] = controller;
      } else {
        throw new Error("\u672A\u53D1\u73B0\u8DEF\u7531\u4E3A ".concat(route, " ViewController"));
      }
    }

    controller.onLoad(query);

    if (controller.shouldUpdate(query)) {
      controller.query = query;
      controller.render();
    }
  });
  ViewNativeSupport.Subscriber.on(ViewNativeSupport.Show, function (_ref) {
    var id = _ref.id;
    viewController = viewControllers[id];
  });
  ViewNativeSupport.Subscriber.on(ViewNativeSupport.Event, function (type, uuid, parent, event, sync) {
    var target = event.target;
    var view = viewController.view.getElementById(target.id);
    (0, _ReactEvent.scheduleWork)({
      type: type,
      view: view,
      event: event
    });
  });
}

var ViewController = /*#__PURE__*/function () {
  function ViewController(id, route, query) {
    (0, _classCallCheck2["default"])(this, ViewController);
    this.id = id;
    this.route = route;
    this.query = query;
    this.view = _document.document.createElement('view-controller');
    this.view[_shared.INTERNAL_RELATIVE_KEY] = id;
    this.view.setAttribute('route', route);
    this.view.setAttribute('query', query);
    views.appendChild(this.view);
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "onLoad",
    value: function onLoad(query) {}
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(query) {
      return (0, _shared.shallowEqual)(query, this.query);
    }
  }, {
    key: "render",
    value: function render() {
      _renderer["default"].render(_react["default"].createElement(this.Class), this.view);

      return this.view.serialize();
    }
  }]);
  return ViewController;
}();

exports["default"] = ViewController;

/***/ }),

/***/ "../remix/src/project/runtime/client.js":
/*!**********************************************!*\
  !*** ../remix/src/project/runtime/client.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var AppNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./Support/AppNativeSupport */ "../remix/src/project/runtime/Support/AppNativeSupport.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../../config */ "../remix/config.js"));

function _default(context, instance) {
  var onLaunch = function onLaunch(options) {
    var props = instance.props;

    if (typeof props.onLaunch === 'function') {
      props.onLaunch(options);
    }
  };

  var runApplication = function runApplication() {
    if (typeof App === 'function') {
      wx.showTabBar();
      wx.hideLoading();
      App({
        onLaunch: function onLaunch(options) {
          AppNativeSupport.Publisher.Launch(options);
        },
        onError: function onError() {}
      });
    } else {
      throw new Error("\u8BF7\u8FD0\u884C\u5728\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u73AF\u5883");
    }
  };

  runApplication();
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/runtime/index.js":
/*!*********************************************!*\
  !*** ../remix/src/project/runtime/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../env */ "../remix/env.js"));

var _client = _interopRequireDefault(__webpack_require__(/*! ./client */ "../remix/src/project/runtime/client.js"));

var _ViewController = __webpack_require__(/*! ./ViewController */ "../remix/src/project/runtime/ViewController.js");

function _default(context, instance) {
  new _ViewController.ViewControllersManager(context, instance);
  (0, _client["default"])(context, instance);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/runtime/terminal/NativeRuntime.js":
/*!**************************************************************!*\
  !*** ../remix/src/project/runtime/terminal/NativeRuntime.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var _Support = _interopRequireWildcard(__webpack_require__(/*! ../Support */ "../remix/src/project/runtime/Support/index.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../../../config */ "../remix/config.js"));

var _NativeSocket = _interopRequireDefault(__webpack_require__(/*! ./NativeSocket */ "../remix/src/project/runtime/terminal/NativeSocket.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NativeRuntime = /*#__PURE__*/function () {
  function NativeRuntime() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, NativeRuntime);
    (0, _defineProperty2["default"])(this, "onShowTabBar", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.APIRequst('showTabBar', args);
    });
    (0, _defineProperty2["default"])(this, "onHideabBar", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this.APIRequst('hideTabBar', args);
    });
    (0, _defineProperty2["default"])(this, "onRequest", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this.APIRequst('request', args);
    });
    (0, _defineProperty2["default"])(this, "onNavigateTo", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.APIRequst('navigateTo', args);
    });
    (0, _defineProperty2["default"])(this, "onNavigateBack", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this.APIRequst('navigateBack', args);
    });
    (0, _defineProperty2["default"])(this, "onSetStorage", function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _this.APIRequst('setStorage', args);
    });
    (0, _defineProperty2["default"])(this, "onGetStorage", function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _this.APIRequst('getStorage', args);
    });
    (0, _defineProperty2["default"])(this, "onRemoveStorage", function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _this.APIRequst('removeStorage', args);
    });
    (0, _defineProperty2["default"])(this, "onClearStorage", function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return _this.APIRequst('clearStorage', args);
    });
    (0, _defineProperty2["default"])(this, "onGetStorageInfo", function () {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return _this.APIRequst('getStorageInfo', args);
    });
    (0, _defineProperty2["default"])(this, "onSetStorageSync", function () {
      var _wx;

      return (_wx = wx).setStorageSync.apply(_wx, arguments);
    });
    (0, _defineProperty2["default"])(this, "onGetStorageSync", function () {
      var _ref;

      var callback = (_ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref]);

      if (typeof callback === 'function') {
        var _wx2;

        callback((_wx2 = wx).getStorageSync.apply(_wx2, arguments));
      }
    });
    (0, _defineProperty2["default"])(this, "onRemoveStorageSync", function () {
      var _wx3;

      return (_wx3 = wx).removeStorageSync.apply(_wx3, arguments);
    });
    (0, _defineProperty2["default"])(this, "onClearStorageSync", function () {
      var _wx4;

      return (_wx4 = wx).clearStorageSync.apply(_wx4, arguments);
    });
    (0, _defineProperty2["default"])(this, "onGetStorageInfoSync", function () {
      var _ref2;

      var callback = (_ref2 = arguments.length - 1, _ref2 < 0 || arguments.length <= _ref2 ? undefined : arguments[_ref2]);

      if (typeof callback === 'function') {
        var _wx5;

        callback((_wx5 = wx).getStorageInfoSync.apply(_wx5, arguments));
      }
    });
    (0, _defineProperty2["default"])(this, "onLogin", function (options, callback) {
      wx.login(_objectSpread({}, options, {
        complete: function complete(res) {
          callback(res);
        }
      }));
    });
    (0, _defineProperty2["default"])(this, "onConnectSocket", function (id, options, callback) {
      return _config["default"].isInspectMode ? (0, _NativeSocket["default"])(_Support["default"].api, id, options, callback) : _this.APIRequst('connectSocket', options, callback);
    });
    debugger;

    _Support["default"].api.on(_Support.API.LOGIN, this.onLogin);

    _Support["default"].api.on(_Support.API.REQUEST, this.onRequest);

    _Support["default"].api.on(_Support.API.NAVIGATE_TO, this.onNavigateTo);

    _Support["default"].api.on(_Support.API.NAVIGATE_BACK, this.onNavigateBack);

    _Support["default"].api.on(_Support.API.CONNECT_SOCKET, this.onConnectSocket);

    _Support["default"].api.on(_Support.API.GET_STORAGE, this.onGetStorage);

    _Support["default"].api.on(_Support.API.SET_STORAGE, this.onSetStorage);

    _Support["default"].api.on(_Support.API.GET_STORAGE_INFO, this.onGetStorageInfo);

    _Support["default"].api.on(_Support.API.GET_STORAGE_INFO_SYNC, this.onGetStorageInfoSync);

    _Support["default"].api.on(_Support.API.GET_STORAGE_SYNC, this.onGetStorageSync);

    _Support["default"].api.on(_Support.API.SET_STORAGE_SYNC, this.onSetStorageSync);

    _Support["default"].api.on(_Support.API.REMOVE_STORAGE, this.onRemoveStorage);

    _Support["default"].api.on(_Support.API.CLEAaR_STORAGE, this.onClearStorage);

    _Support["default"].api.on(_Support.API.REMOVE_STORAGE_SYNC, this.onRemoveStorageSync);

    _Support["default"].api.on(_Support.API.CLEAaR_STORAGE_SYNC, this.onClearStorageSync);

    _Support["default"].api.on(_Support.API.SHOW_TABBAR, this.onShowTabBar);

    _Support["default"].api.on(_Support.API.HIDE_TABBAR, this.onHideabBar);
  }

  (0, _createClass2["default"])(NativeRuntime, [{
    key: "APIRequst",
    value: function APIRequst(api, args) {
      var _args = (0, _slicedToArray2["default"])(args, 2),
          options = _args[0],
          callback = _args[1];

      return wx[api](_objectSpread({}, options, {
        complete: function complete(res) {
          callback(res);
        }
      }));
    }
  }]);
  return NativeRuntime;
}();

exports["default"] = NativeRuntime;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/runtime/terminal/NativeSocket.js":
/*!*************************************************************!*\
  !*** ../remix/src/project/runtime/terminal/NativeSocket.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createNativeSocket;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js"));

var _Support = __webpack_require__(/*! ../Support */ "../remix/src/project/runtime/Support/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NativeSocket = /*#__PURE__*/function () {
  function NativeSocket(transport) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, NativeSocket);
    (0, _defineProperty2["default"])(this, "onMessage", function (id, message) {
      if (id === _this.id) {
        _this.socket.send(message);
      }
    });
    this.transport = transport;
  }

  (0, _createClass2["default"])(NativeSocket, [{
    key: "connect",
    value: function connect(id, options, callback) {
      var _this2 = this;

      this.id = id;
      var socket = wx.connectSocket(_objectSpread({}, options, {
        complete: function complete(res) {
          callback(res);
        }
      }));
      socket.onOpen(function () {
        _this2.transport.reply({
          type: _Support.API.SOCKET_OPEN,
          argv: [_this2.id]
        });
      });
      socket.onMessage(function (data) {
        debugger;

        _this2.transport.reply({
          type: _Support.API.SOCKET_MESSAGE,
          argv: [_this2.id, data]
        });
      });
      socket.onClose(function () {
        _this2.transport.off(_Support.API.SOCKET_MESSAGE);
      });
      this.socket = socket;
      this.transport.on(_Support.API.SOCKET_MESSAGE, this.onMessage);
    }
  }]);
  return NativeSocket;
}();

function createNativeSocket(transport, id, options, callback) {
  var socket = new NativeSocket(transport);
  return socket.connect(id, options, callback);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/project/runtime/terminal/index.js":
/*!******************************************************!*\
  !*** ../remix/src/project/runtime/terminal/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Support = _interopRequireDefault(__webpack_require__(/*! ../Support */ "../remix/src/project/runtime/Support/index.js"));

var _NativeRuntime2 = _interopRequireDefault(__webpack_require__(/*! ./NativeRuntime */ "../remix/src/project/runtime/terminal/NativeRuntime.js"));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../../../config */ "../remix/config.js"));

var _is = __webpack_require__(/*! ../../../shared/is */ "../remix/src/shared/is.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TerminalRuntime = /*#__PURE__*/function (_NativeRuntime) {
  (0, _inherits2["default"])(TerminalRuntime, _NativeRuntime);

  var _super = _createSuper(TerminalRuntime);

  function TerminalRuntime(context, instance) {
    var _this;

    (0, _classCallCheck2["default"])(this, TerminalRuntime);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onApplicationLaunch", function (options) {
      var props = _this.instance.props;

      if ((0, _is.isFunction)(props.onLaunch)) {
        props.onLaunch(options);
      }
    });
    _this.instance = instance;
    _this.context = context;
    _this.options = null;

    _Support["default"].app.onLaunch(_this.onApplicationLaunch);

    return _this;
  }

  (0, _createClass2["default"])(TerminalRuntime, [{
    key: "inspect",
    value: function inspect(callback) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _Support["default"].app.inspect(function () {
          resolve();
        });

        _Support["default"].app.on('reLaunch', function () {
          wx.reLaunch({
            url: "/".concat(_this2.options.path)
          });

          _Support["default"].app.on('reConnect', function () {
            wx.showTabBar();
            wx.hideLoading();

            _Support["default"].app.emit('launch', _this2.options);
          });

          wx.hideTabBar();
          wx.showLoading({
            title: "\u7B49\u5F85\u8FDE\u63A5..."
          });
        });
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this3 = this;

      var launchApplication = function launchApplication() {
        var ctrl = _this3;

        if (typeof App === 'function') {
          wx.showTabBar();
          wx.hideLoading();
          App({
            onLaunch: function onLaunch(options) {
              _Support["default"].app.launch(options);

              _Support["default"].app.emit('launch', options);

              ctrl.options = options;
              _config["default"].isApplicationLaunched = true;
              _config["default"].applicationLaunchedOptions = options;
            },
            onError: function onError(e) {
              _Support["default"].app.error(e);
            }
          });
        }
      };

      if (_config["default"].isInspectMode) {
        wx.hideTabBar();
        wx.showLoading({
          title: "\u7B49\u5F85\u8FDE\u63A5..."
        });
        this.inspect().then(function () {
          launchApplication();
        })["catch"]();
      } else {
        launchApplication();
      }
    }
  }]);
  return TerminalRuntime;
}(_NativeRuntime2["default"]);

;

function _default(context, instance) {
  var runtime = new TerminalRuntime(context, instance);
  var viewManager = new ViewManager(context);
  var viewEventManager = new ViewEventManager(context);
  runtime.run();
}

;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/Children.js":
/*!**************************************!*\
  !*** ../remix/src/react/Children.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.forEach = forEach;
exports.count = count;
exports.only = only;
exports.toArray = toArray;

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");

function map(children, iterate, context) {
  if ((0, _is.isNullOrUndefined)(children)) {
    return children;
  }

  children = toArray(children);

  if (context && context !== children) {
    iterate = iterate.bind(context);
  }

  return children.map(iterate);
}

function forEach(children, iterate, context) {
  if (!(0, _is.isNullOrUndefined)(children)) {
    children = toArray(children);
    var length = children.length;

    if (length > 0) {
      if (context && context !== children) {
        iterate = iterate.bind(context);
      }

      for (var i = 0; i < length; i++) {
        var child = (0, _is.isInvalid)(children[i]) ? null : children[i];
        iterate(child, i, children);
      }
    }
  }
}

function count(children) {
  children = toArray(children);
  return children.length;
}

function only(children) {
  children = toArray(children);

  if (children.length !== 1) {
    throw new Error('Children.only() expects only one child.');
  }

  return children[0];
}

function toArray(children) {
  if ((0, _is.isNullOrUndefined)(children)) {
    return _shared.EMPTY_ARRAY;
  }

  if ((0, _is.isArray)(children)) {
    return (0, _shared.flatten)(children);
  }

  return _shared.EMPTY_ARRAY.concat(children);
}

/***/ }),

/***/ "../remix/src/react/Component.js":
/*!***************************************!*\
  !*** ../remix/src/react/Component.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _shared = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");

var Component = /*#__PURE__*/function () {
  function Component(props, context, updater) {
    (0, _classCallCheck2["default"])(this, Component);
    this.props = props || {};
    this.context = context || _shared.EMPTY_OBJECT;
    this.refs = {};
    this.updater = updater;
    this.state = this.state || {};
  }

  (0, _createClass2["default"])(Component, [{
    key: "setState",
    value: function setState(state) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _shared.noop;
      this.updater.enqueueSetState(this, state, callback);
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate(callback) {
      this.updater.enqueueForceUpdate(this, callback);
    }
  }, {
    key: "render",
    value: function render() {
      throw new Error("React Component render must be implatate");
    }
  }]);
  return Component;
}();

exports["default"] = Component;
Component.prototype.isReactComponent = _shared.EMPTY_OBJECT;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/PropTypes.js":
/*!***************************************!*\
  !*** ../remix/src/react/PropTypes.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PropTypes = void 0;

var shim = function shim() {
  return shim;
};

shim.isRequired = shim;
var PropTypes = {
  array: shim,
  bool: shim,
  func: shim,
  number: shim,
  object: shim,
  string: shim,
  any: shim,
  arrayOf: shim,
  element: shim,
  instanceOf: shim,
  node: shim,
  objectOf: shim,
  oneOf: shim,
  oneOfType: shim,
  shape: shim,
  exact: shim,
  PropTypes: {},
  checkPropTypes: shim
};
exports.PropTypes = PropTypes;
PropTypes.PropTypes = PropTypes;
var _default = PropTypes;
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/react/PureComponent.js":
/*!*******************************************!*\
  !*** ../remix/src/react/PureComponent.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ./Component */ "../remix/src/react/Component.js"));

var _shared = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PureComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PureComponent, _Component);

  var _super = _createSuper(PureComponent);

  function PureComponent() {
    var _this;

    (0, _classCallCheck2["default"])(this, PureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isPureComponent", true);
    return _this;
  }

  (0, _createClass2["default"])(PureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shared.shallowEqual)(this.props, nextProps) || !(0, _shared.shallowEqual)(this.state, nextState);
    }
  }]);
  return PureComponent;
}(_Component2["default"]);

var _default = PureComponent;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/ReactElement.js":
/*!******************************************!*\
  !*** ../remix/src/react/ReactElement.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReactElement;

var _elementTypes = __webpack_require__(/*! ../shared/elementTypes */ "../remix/src/shared/elementTypes.js");

function ReactElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var owner = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var element = {
    $$typeof: _elementTypes.REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  return element;
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/cloneElement.js":
/*!******************************************!*\
  !*** ../remix/src/react/cloneElement.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cloneElement;

var _ReactElement = _interopRequireDefault(__webpack_require__(/*! ./ReactElement */ "../remix/src/react/ReactElement.js"));

function cloneElement(element, props) {
  return (0, _ReactElement["default"])(element.type, key, ref, self, source, owner, props);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/createElement.js":
/*!*******************************************!*\
  !*** ../remix/src/react/createElement.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _ReactElement = _interopRequireDefault(__webpack_require__(/*! ./ReactElement */ "../remix/src/react/ReactElement.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createElement(type, properties) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var length = children.length;

  var _ref = properties || {},
      key = _ref.key,
      ref = _ref.ref,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["key", "ref"]);

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];

      if ((0, _is.isArray)(props.children)) {
        if (props.children.length === 1) {
          props.children = props.children[0];
        }
      }
    } else {
      props.children = children;
    }
  }

  return (0, _ReactElement["default"])(type, _objectSpread({}, props), key, ref);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/react/index.js":
/*!***********************************!*\
  !*** ../remix/src/react/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Children: true,
  Component: true,
  PureComponent: true,
  createElement: true,
  cloneElement: true,
  PropTypes: true,
  render: true
};
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _Component["default"];
  }
});
Object.defineProperty(exports, "PureComponent", {
  enumerable: true,
  get: function get() {
    return _PureComponent["default"];
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _createElement["default"];
  }
});
Object.defineProperty(exports, "cloneElement", {
  enumerable: true,
  get: function get() {
    return _cloneElement["default"];
  }
});
Object.defineProperty(exports, "PropTypes", {
  enumerable: true,
  get: function get() {
    return _PropTypes["default"];
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _renderer["default"];
  }
});
exports.Children = exports["default"] = void 0;

var Children = _interopRequireWildcard(__webpack_require__(/*! ./Children */ "../remix/src/react/Children.js"));

exports.Children = Children;

var _Component = _interopRequireDefault(__webpack_require__(/*! ./Component */ "../remix/src/react/Component.js"));

var _PureComponent = _interopRequireDefault(__webpack_require__(/*! ./PureComponent */ "../remix/src/react/PureComponent.js"));

var _createElement = _interopRequireDefault(__webpack_require__(/*! ./createElement */ "../remix/src/react/createElement.js"));

var _cloneElement = _interopRequireDefault(__webpack_require__(/*! ./cloneElement */ "../remix/src/react/cloneElement.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ./PropTypes */ "../remix/src/react/PropTypes.js"));

var _renderer = _interopRequireDefault(__webpack_require__(/*! ../renderer */ "../remix/src/renderer/index.js"));

var _ReactHook = __webpack_require__(/*! ../ReactHook */ "../remix/src/ReactHook.js");

Object.keys(_ReactHook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReactHook[key];
    }
  });
});
var _default = {
  render: _renderer["default"],
  Children: Children,
  Component: _Component["default"],
  PureComponent: _PureComponent["default"],
  createElement: _createElement["default"],
  cloneElement: _cloneElement["default"],
  PropTypes: _PropTypes["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/renderer/config/DOMProperties.js":
/*!*****************************************************!*\
  !*** ../remix/src/renderer/config/DOMProperties.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDOMProperties = updateDOMProperties;
exports.setDOMProperties = setDOMProperties;
exports.setValueForStyles = setValueForStyles;
exports.setTextContent = setTextContent;
exports.setValueForProperty = setValueForProperty;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _shared = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var freeze = Object.freeze;

function updateDOMProperties(tag, element, pendingProps, memoizedProps) {
  memoizedProps = memoizedProps || {};

  for (var propName in _objectSpread({}, memoizedProps, {}, pendingProps)) {
    var prop = memoizedProps[propName];
    var nextProp = pendingProps[propName];
    var isEventProperty = propName[0] === 'o' && propName[1] === 'n';

    if (prop === nextProp) {} else if (propName === _shared.STYLE) {
      if (nextProp) {
        freeze(nextProp);
        setValueForStyles(element, nextProp);
      }
    } else if (propName === _shared.CHILDREN) {
      var canSetTextContent = tag !== 'textarea' || nextProp !== '';
      var typeofProp = (0, _typeof2["default"])(nextProp);

      if (canSetTextContent && prop !== nextProp) {
        if (typeofProp === 'string' || typeofProp === 'number') {
          setTextContent(element, nextProp);
        }
      }
    } else if (isEventProperty) {
      setValueForProperty(element, propName, propName);
    } else if (nextProp !== null) {
      setValueForProperty(element, propName, nextProp);
    }
  }
}

function setDOMProperties(tag, element, rootContainerElement, nextProps) {
  debugger;

  for (var propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      var nextProp = nextProps[propName];

      if (propName === _shared.STYLE) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _shared.CHILDREN) {
        var canSetTextContent = tag !== 'textarea' || nextProp !== '';
        var typeofProp = (0, _typeof2["default"])(nextProp);

        if (canSetTextContent) {
          if (typeofProp === 'string' || typeofProp === 'number') {
            setTextContent(element, nextProp);
          }
        }
      } else if (/^[oO][nN]/.test(propName)) {
        element.addEventListener(propName.replace(/[oO][nN]/, '').toLowerCase(), nextProp, false);
      } else if (nextProp !== null) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}

function setValueForStyles(element, styles) {
  var style = element.style;

  for (var styleName in styles) {
    if (styleName === _shared.STYLE_NAME_FLOAT) {
      styleName = 'cssFloat';
    }

    style[styleName] = styles[styleName];
  }
}

function setTextContent(element, content) {
  element.innerText = content;
}

function setValueForProperty(element, propName, value) {
  if (value === null) {
    element.removeAttribute(propName, value);
  } else {
    element.setAttribute(propName, value);
  }
}

function shouldIgnoreAttribute(name) {
  if (name.length > 2 && name.slice(0, 2).toLowerCase() === 'on') {
    return true;
  }

  return false;
}

/***/ }),

/***/ "../remix/src/renderer/config/appendChild.js":
/*!***************************************************!*\
  !*** ../remix/src/renderer/config/appendChild.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendChild;

function appendChild(instance, child) {
  instance.appendChild(child);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/renderer/config/appendChildToContainer.js":
/*!**************************************************************!*\
  !*** ../remix/src/renderer/config/appendChildToContainer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendChildToContainer;

var _HTMLNodeType = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

function appendChildToContainer(container, child) {
  var parentNode;

  if (container.nodeType === _HTMLNodeType.COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/renderer/config/createInstance.js":
/*!******************************************************!*\
  !*** ../remix/src/renderer/config/createInstance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createInstance;

var _shared = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");

var ownerDocument = null;

function createInstance(type, props, rootContainerInstance, workInProgress) {
  var children = props.children;
  var document = ownerDocument || (ownerDocument = rootContainerInstance.ownerDocument);
  var element = document.createElement(type);
  element[_shared.INTERNAL_INSTANCE_KEY] = workInProgress;
  element[_shared.INTERNAL_EVENT_HANDLERS_KEY] = props;
  return element;
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/renderer/config/insertBefore.js":
/*!****************************************************!*\
  !*** ../remix/src/renderer/config/insertBefore.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = insertBefore;

function insertBefore(instance, child, beforeChild) {
  instance.insertBefore(child, beforeChild);
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/renderer/index.js":
/*!**************************************!*\
  !*** ../remix/src/renderer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports["default"] = exports.ReactCurrentRoot = void 0;

var _Fiber = __webpack_require__(/*! ../Fiber */ "../remix/src/Fiber.js");

var _ReactScheduler = __webpack_require__(/*! ../ReactScheduler */ "../remix/src/ReactScheduler.js");

var ReactCurrentRoot = {
  current: null
};
exports.ReactCurrentRoot = ReactCurrentRoot;

function render(element, container, callback) {
  var _ref = container._reactRootContainer || (container._reactRootContainer = {
    internalRoot: (0, _Fiber.createRootFiber)(container)
  }),
      workInProgress = _ref.internalRoot.workInProgress;

  ReactCurrentRoot.current = container._reactRootContainer;
  workInProgress.update = {
    payload: {
      element: element
    },
    callback: callback
  };
  (0, _ReactScheduler.scheduleRootUpdate)(workInProgress);
}

var _default = {
  render: render
};
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/router/Route.js":
/*!************************************!*\
  !*** ../remix/src/router/Route.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js"));

var _hooks = __webpack_require__(/*! ../hooks */ "../remix/src/hooks/index.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Route = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Route, _Component);

  var _super = _createSuper(Route);

  function Route() {
    (0, _classCallCheck2["default"])(this, Route);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Route, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Route;
}(_Component2["default"]);

var _default = (0, _hooks.useComponent)(Route);

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/router/Router.js":
/*!*************************************!*\
  !*** ../remix/src/router/Router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remix/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js"));

var _Route = _interopRequireDefault(__webpack_require__(/*! ./Route */ "../remix/src/router/Route.js"));

var _hooks = __webpack_require__(/*! ../hooks */ "../remix/src/hooks/index.js");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Router = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Router, _Component);

  var _super = _createSuper(Router);

  function Router() {
    (0, _classCallCheck2["default"])(this, Router);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Router, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("router", null, this.props.children);
    }
  }]);
  return Router;
}(_Component2["default"]);

(0, _defineProperty2["default"])(Router, "Route", _Route["default"]);

var _default = (0, _hooks.useComponent)(Router);

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/router/index.js":
/*!************************************!*\
  !*** ../remix/src/router/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return _Router["default"];
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function get() {
    return _Route["default"];
  }
});
exports["default"] = void 0;

var _Router = _interopRequireDefault(__webpack_require__(/*! ./Router */ "../remix/src/router/Router.js"));

var _Route = _interopRequireDefault(__webpack_require__(/*! ./Route */ "../remix/src/router/Route.js"));

var _default = _Router["default"];
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/shared/HTMLNodeType.js":
/*!*******************************************!*\
  !*** ../remix/src/shared/HTMLNodeType.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOCUMENT_FRAGMENT_NODE = exports.DOCUMENT_NODE = exports.COMMENT_NODE = exports.TEXT_NODE = exports.ELEMENT_NODE = void 0;
var ELEMENT_NODE = 1;
exports.ELEMENT_NODE = ELEMENT_NODE;
var TEXT_NODE = 3;
exports.TEXT_NODE = TEXT_NODE;
var COMMENT_NODE = 8;
exports.COMMENT_NODE = COMMENT_NODE;
var DOCUMENT_NODE = 9;
exports.DOCUMENT_NODE = DOCUMENT_NODE;
var DOCUMENT_FRAGMENT_NODE = 11;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;

/***/ }),

/***/ "../remix/src/shared/effectTags.js":
/*!*****************************************!*\
  !*** ../remix/src/shared/effectTags.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INCOMPLETE = exports.PASSIVE = exports.SNAPSHOT = exports.REF = exports.DID_CAPTURE = exports.CALLBACK = exports.CONTENT_RESET = exports.DELETION = exports.PLACEMENT_AND_UPDATE = exports.UPDATE = exports.PLACEMENT = exports.PERFORMED_WORK = exports.NO_EFFECT = void 0;
var NO_EFFECT = 0;
exports.NO_EFFECT = NO_EFFECT;
var PERFORMED_WORK = 1;
exports.PERFORMED_WORK = PERFORMED_WORK;
var PLACEMENT = 2;
exports.PLACEMENT = PLACEMENT;
var UPDATE = 4;
exports.UPDATE = UPDATE;
var PLACEMENT_AND_UPDATE = 6;
exports.PLACEMENT_AND_UPDATE = PLACEMENT_AND_UPDATE;
var DELETION = 8;
exports.DELETION = DELETION;
var CONTENT_RESET = 16;
exports.CONTENT_RESET = CONTENT_RESET;
var CALLBACK = 32;
exports.CALLBACK = CALLBACK;
var DID_CAPTURE = 64;
exports.DID_CAPTURE = DID_CAPTURE;
var REF = 128;
exports.REF = REF;
var SNAPSHOT = 256;
exports.SNAPSHOT = SNAPSHOT;
var PASSIVE = 512;
exports.PASSIVE = PASSIVE;
var INCOMPLETE = 1024;
exports.INCOMPLETE = INCOMPLETE;

/***/ }),

/***/ "../remix/src/shared/elementTypes.js":
/*!*******************************************!*\
  !*** ../remix/src/shared/elementTypes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REACT_LAZY_TYPE = exports.REACT_MEMO_TYPE = exports.REACT_SUSPENSE_TYPE = exports.REACT_FORWARD_REF_TYPE = exports.REACT_CONCURRENT_MODE_TYPE = exports.REACT_ASYNC_MODE_TYPE = exports.REACT_CONTEXT_TYPE = exports.REACT_PROVIDER_TYPE = exports.REACT_PROFILER_TYPE = exports.REACT_STRICT_MODE_TYPE = exports.REACT_FRAGMENT_TYPE = exports.REACT_PORTAL_TYPE = exports.REACT_ELEMENT_TYPE = void 0;
var hasSymbol = typeof Symbol === 'function' && Symbol["for"];
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]('react.element') : 0xeac7;
exports.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol["for"]('react.portal') : 0xeaca;
exports.REACT_PORTAL_TYPE = REACT_PORTAL_TYPE;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol["for"]('react.fragment') : 0xeacb;
exports.REACT_FRAGMENT_TYPE = REACT_FRAGMENT_TYPE;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.strict_mode') : 0xeacc;
exports.REACT_STRICT_MODE_TYPE = REACT_STRICT_MODE_TYPE;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol["for"]('react.profiler') : 0xead2;
exports.REACT_PROFILER_TYPE = REACT_PROFILER_TYPE;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol["for"]('react.provider') : 0xeacd;
exports.REACT_PROVIDER_TYPE = REACT_PROVIDER_TYPE;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol["for"]('react.context') : 0xeace;
exports.REACT_CONTEXT_TYPE = REACT_CONTEXT_TYPE;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol["for"]('react.async_mode') : 0xeacf;
exports.REACT_ASYNC_MODE_TYPE = REACT_ASYNC_MODE_TYPE;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.concurrent_mode') : 0xeacf;
exports.REACT_CONCURRENT_MODE_TYPE = REACT_CONCURRENT_MODE_TYPE;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol["for"]('react.forward_ref') : 0xead0;
exports.REACT_FORWARD_REF_TYPE = REACT_FORWARD_REF_TYPE;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol["for"]('react.suspense') : 0xead1;
exports.REACT_SUSPENSE_TYPE = REACT_SUSPENSE_TYPE;
var REACT_MEMO_TYPE = hasSymbol ? Symbol["for"]('react.memo') : 0xead3;
exports.REACT_MEMO_TYPE = REACT_MEMO_TYPE;
var REACT_LAZY_TYPE = hasSymbol ? Symbol["for"]('react.lazy') : 0xead4;
exports.REACT_LAZY_TYPE = REACT_LAZY_TYPE;

/***/ }),

/***/ "../remix/src/shared/index.js":
/*!************************************!*\
  !*** ../remix/src/shared/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.shallowEqual = shallowEqual;
exports.resolveDefaultProps = resolveDefaultProps;
exports.extend = extend;
exports.clone = clone;
exports.flatten = flatten;
exports.is = exports.keys = exports.assign = exports.NO_WORK = exports.PENDING_WORK = exports.FORCE_UPDATE = exports.REPLACE_STATE = exports.UPDATE_STATE = exports.SCHEDULE_KEY = exports.SCHEDULE_FPS = exports.SCHEDULE_TIMEOUT = exports.UPDATE_FREQUENCY = exports.EXPIRE_TIME = exports.EMPTY_REFS = exports.EMPTY_CONTEXT = exports.EMPTY_ARRAY = exports.EMPTY_OBJECT = exports.UNMASKED_CHILD_CONTEXT = exports.MASKED_CHILD_CONTEXT = exports.MERGED_CHILD_CONTEXT = exports.REACT_INTERNAL_INSTANCE = exports.REACT_INTERNAL_FIBER = exports.INTERNAL_ROOTFIBER_KEY = exports.INTERNAL_RELATIVE_KEY = exports.INTERNAL_EVENT_HANDLERS_KEY = exports.INTERNAL_INSTANCE_KEY = exports.DANGEROUSLY_SET_INNER_HTML = exports.STYLE_NAME_FLOAT = exports.STYLE = exports.HTML = exports.CHILDREN = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ./is */ "../remix/src/shared/is.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var randomKey = Math.random().toString(36).slice(2);
var CHILDREN = 'children';
exports.CHILDREN = CHILDREN;
var HTML = '__html';
exports.HTML = HTML;
var STYLE = 'style';
exports.STYLE = STYLE;
var STYLE_NAME_FLOAT = 'float';
exports.STYLE_NAME_FLOAT = STYLE_NAME_FLOAT;
var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
exports.DANGEROUSLY_SET_INNER_HTML = DANGEROUSLY_SET_INNER_HTML;
var INTERNAL_INSTANCE_KEY = '__reactInternalInstance$' + randomKey;
exports.INTERNAL_INSTANCE_KEY = INTERNAL_INSTANCE_KEY;
var INTERNAL_EVENT_HANDLERS_KEY = '__reactEventHandlers$' + randomKey;
exports.INTERNAL_EVENT_HANDLERS_KEY = INTERNAL_EVENT_HANDLERS_KEY;
var INTERNAL_RELATIVE_KEY = '__reactInternalRelative$' + randomKey;
exports.INTERNAL_RELATIVE_KEY = INTERNAL_RELATIVE_KEY;
var INTERNAL_ROOTFIBER_KEY = '__reactInternalRootFiber$' + randomKey;
exports.INTERNAL_ROOTFIBER_KEY = INTERNAL_ROOTFIBER_KEY;
var REACT_INTERNAL_FIBER = '_reactInternalFiber';
exports.REACT_INTERNAL_FIBER = REACT_INTERNAL_FIBER;
var REACT_INTERNAL_INSTANCE = '_reactInternalInstance';
exports.REACT_INTERNAL_INSTANCE = REACT_INTERNAL_INSTANCE;
var MERGED_CHILD_CONTEXT = '__reactInternalMemoizedMergedChildContext';
exports.MERGED_CHILD_CONTEXT = MERGED_CHILD_CONTEXT;
var MASKED_CHILD_CONTEXT = '__reactInternalMemoizedMaskedChildContext';
exports.MASKED_CHILD_CONTEXT = MASKED_CHILD_CONTEXT;
var UNMASKED_CHILD_CONTEXT = '__reactInternalMemoizedUnmaskedChildContext';
exports.UNMASKED_CHILD_CONTEXT = UNMASKED_CHILD_CONTEXT;
var EMPTY_OBJECT = {};
exports.EMPTY_OBJECT = EMPTY_OBJECT;
var EMPTY_ARRAY = [];
exports.EMPTY_ARRAY = EMPTY_ARRAY;
var EMPTY_CONTEXT = {};
exports.EMPTY_CONTEXT = EMPTY_CONTEXT;
var EMPTY_REFS = {};
exports.EMPTY_REFS = EMPTY_REFS;
var EXPIRE_TIME = 0;
exports.EXPIRE_TIME = EXPIRE_TIME;
var UPDATE_FREQUENCY = 10;
exports.UPDATE_FREQUENCY = UPDATE_FREQUENCY;
var SCHEDULE_TIMEOUT = 3000;
exports.SCHEDULE_TIMEOUT = SCHEDULE_TIMEOUT;
var SCHEDULE_FPS = 60;
exports.SCHEDULE_FPS = SCHEDULE_FPS;
var SCHEDULE_KEY = 'due';
exports.SCHEDULE_KEY = SCHEDULE_KEY;
var UPDATE_STATE = 0;
exports.UPDATE_STATE = UPDATE_STATE;
var REPLACE_STATE = 1;
exports.REPLACE_STATE = REPLACE_STATE;
var FORCE_UPDATE = 2;
exports.FORCE_UPDATE = FORCE_UPDATE;
var PENDING_WORK = 1;
exports.PENDING_WORK = PENDING_WORK;
var NO_WORK = 2;
exports.NO_WORK = NO_WORK;

function noop() {}

var assign = Object.assign;
exports.assign = assign;
var keys = Object.keys;
exports.keys = keys;
var is = Object.is;
exports.is = is;

function shallowEqual(objectA, objectB) {
  if (objectA === null || objectB === null) {
    return false;
  }

  if (is(objectA, objectB)) {
    return true;
  }

  var keysA = objectA ? keys(objectA) : [];
  var keysB = objectB ? keys(objectB) : [];

  if (keysA.length !== keysB.length) {
    return false;
  }

  var length = keysA.length;

  for (var i = 0; i < length; i++) {
    var key = keysA[i];

    if (!objectB.hasOwnProperty(key) || !is(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
}

function resolveDefaultProps(Component, unresolvedProps) {
  if (Component) {
    if (Component.defaultProps) {
      var props = _objectSpread({}, unresolvedProps);

      var defaultProps = Component.defaultProps;

      for (var propName in defaultProps) {
        if ((0, _is.isUndefined)(props[propName])) {
          props[propName] = defaultProps[propName];
        }
      }

      return props;
    }
  }

  return unresolvedProps;
}

function extend(target, source) {
  if (source) {
    return assign(target, source);
  }

  return target;
}

function clone(target) {
  return extend({}, clone);
}

function flatten(array) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var value = array[i];

    if ((0, _is.isArray)(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

/***/ }),

/***/ "../remix/src/shared/is.js":
/*!*********************************!*\
  !*** ../remix/src/shared/is.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.isNumber = isNumber;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isInvalid = isInvalid;
exports.isComponentConstructor = isComponentConstructor;
exports.isLegacyContextConsumer = isLegacyContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isHostParent = isHostParent;
exports.is = exports.isArray = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js"));

var _workTags = __webpack_require__(/*! ./workTags */ "../remix/src/shared/workTags.js");

var isArray = Array.isArray;
exports.isArray = isArray;

function isNull(o) {
  return o === null;
}

function isUndefined(o) {
  return o === undefined;
}

function isFunction(o) {
  return typeof o === 'function';
}

function isString(o) {
  return typeof o === 'string';
}

function isObject(o) {
  return (0, _typeof2["default"])(o) === 'object' && !isNull(o);
}

function isNumber(o) {
  return typeof o === 'number';
}

function isNullOrUndefined(o) {
  return o === undefined || o === null;
}

function isInvalid(o) {
  return false;
}

function isComponentConstructor(Component) {
  var proto = Component.prototype;
  return !!(proto && proto.isReactComponent);
}

function isLegacyContextConsumer(Component) {
  var contextTypes = Component.contextTypes;
  return !isNullOrUndefined(contextTypes);
}

function isContextProvider(Component) {
  var childContextTypes = Component.childContextTypes;
  return !isNullOrUndefined(childContextTypes);
}

function isHostParent(fiber) {
  var tag = fiber.tag;
  return tag === _workTags.HOST_COMPONENT || tag === _workTags.HOST_ROOT || tag === _workTags.HOST_PORTAL;
}

var is = Object.is || function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
};

exports.is = is;

/***/ }),

/***/ "../remix/src/shared/nextTick.js":
/*!***************************************!*\
  !*** ../remix/src/shared/nextTick.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var nextTick = null;

if (typeof window !== 'undefined') {
  nextTick = wx.nextTick;
} else {
  if (typeof setImmediate === 'function') {
    nextTick = function nextTick(callback) {
      return setImmediate(callback);
    };
  } else {
    nextTick = function nextTick(callback) {
      return setTimeout(callback);
    };
  }
}

var _default = nextTick;
exports["default"] = _default;
module.exports = exports.default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remix-cli/node_modules/timers-browserify/main.js */ "../remix-cli/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../remix/src/shared/performance.js":
/*!******************************************!*\
  !*** ../remix/src/shared/performance.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _now = Date.now();

var _default = {
  now: function now() {
    return Date.now() - _now;
  }
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/shared/workTags.js":
/*!***************************************!*\
  !*** ../remix/src/shared/workTags.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTEXT_PROVIDER = exports.CONTEXT_CONSUMER = exports.FRAGMENT = exports.HOST_TEXT = exports.HOST_COMPONENT = exports.HOST_PORTAL = exports.HOST_ROOT = exports.INDETERMINATE_COMPONENT = exports.CLASS_COMPONENT = exports.FUNCTION_COMPONENT = void 0;
var FUNCTION_COMPONENT = 0;
exports.FUNCTION_COMPONENT = FUNCTION_COMPONENT;
var CLASS_COMPONENT = 1;
exports.CLASS_COMPONENT = CLASS_COMPONENT;
var INDETERMINATE_COMPONENT = 2;
exports.INDETERMINATE_COMPONENT = INDETERMINATE_COMPONENT;
var HOST_ROOT = 3;
exports.HOST_ROOT = HOST_ROOT;
var HOST_PORTAL = 4;
exports.HOST_PORTAL = HOST_PORTAL;
var HOST_COMPONENT = 5;
exports.HOST_COMPONENT = HOST_COMPONENT;
var HOST_TEXT = 6;
exports.HOST_TEXT = HOST_TEXT;
var FRAGMENT = 7;
exports.FRAGMENT = FRAGMENT;
var CONTEXT_CONSUMER = 9;
exports.CONTEXT_CONSUMER = CONTEXT_CONSUMER;
var CONTEXT_PROVIDER = 10;
exports.CONTEXT_PROVIDER = CONTEXT_PROVIDER;

/***/ })

}]);
//# sourceMappingURL=manifest.js.map