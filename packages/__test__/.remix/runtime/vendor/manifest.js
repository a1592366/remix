/*** MARK_1587871641742 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

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

/***/ "../remix-cli/node_modules/webpack/buildin/amd-options.js":
/*!****************************************************************!*\
  !*** ../remix-cli/node_modules/webpack/buildin/amd-options.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

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

/***/ "../remix-cli/node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************************************!*\
  !*** ../remix-cli/node_modules/webpack/buildin/harmony-module.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "../remix/env.js":
/*!***********************!*\
  !*** ../remix/env.js ***!
  \***********************/
/*! exports provided: isInspectMode, inspectWSURL, internalUIURL, inspectMessageTypes, inspectTerminalTypes, inspectTerminalUUID, inspectLogicUUID, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInspectMode", function() { return isInspectMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectWSURL", function() { return inspectWSURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internalUIURL", function() { return internalUIURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectMessageTypes", function() { return inspectMessageTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectTerminalTypes", function() { return inspectTerminalTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectTerminalUUID", function() { return inspectTerminalUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectLogicUUID", function() { return inspectLogicUUID; });
var isInspectMode = process.env.IS_INSPECT_MODE;
var inspectWSURL = process.env.INSPECT_WS_URL;
var internalUIURL = process.env.INSPECT_UI_URL;
var inspectMessageTypes = process.env.INSEPCT_MESSAGE_TYPES;
var inspectTerminalTypes = process.env.INSPECT_TERMINAL_TYPES;
var inspectTerminalUUID = process.env.INSPECT_TERMINAL_UUID;
var inspectLogicUUID = process.env.INSPECT_LOGIC_UUID;
console.log(process.env);
debugger;
/* harmony default export */ __webpack_exports__["default"] = ({
  isInspectMode: isInspectMode,
  inspectWSURL: inspectWSURL,
  internalUIURL: internalUIURL,
  inspectMessageTypes: inspectMessageTypes,
  inspectTerminalTypes: inspectTerminalTypes,
  inspectTerminalUUID: inspectTerminalUUID,
  inspectLogicUUID: inspectLogicUUID
});
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

/***/ "../remix/node_modules/@babel/runtime/helpers/get.js":
/*!***********************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/get.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase */ "../remix/node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

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

/***/ "../remix/node_modules/@babel/runtime/helpers/superPropBase.js":
/*!*********************************************************************!*\
  !*** ../remix/node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

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

/***/ "../remix/node_modules/qs/lib/formats.js":
/*!***********************************************!*\
  !*** ../remix/node_modules/qs/lib/formats.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = __webpack_require__(/*! ./utils */ "../remix/node_modules/qs/lib/utils.js");

var Format = {
  RFC1738: 'RFC1738',
  RFC3986: 'RFC3986'
};
module.exports = util.assign({
  'default': Format.RFC3986,
  formatters: {
    RFC1738: function (value) {
      return replace.call(value, percentTwenties, '+');
    },
    RFC3986: function (value) {
      return String(value);
    }
  }
}, Format);

/***/ }),

/***/ "../remix/node_modules/qs/lib/index.js":
/*!*********************************************!*\
  !*** ../remix/node_modules/qs/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "../remix/node_modules/qs/lib/stringify.js");

var parse = __webpack_require__(/*! ./parse */ "../remix/node_modules/qs/lib/parse.js");

var formats = __webpack_require__(/*! ./formats */ "../remix/node_modules/qs/lib/formats.js");

module.exports = {
  formats: formats,
  parse: parse,
  stringify: stringify
};

/***/ }),

/***/ "../remix/node_modules/qs/lib/parse.js":
/*!*********************************************!*\
  !*** ../remix/node_modules/qs/lib/parse.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../remix/node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var defaults = {
  allowDots: false,
  allowPrototypes: false,
  arrayLimit: 20,
  charset: 'utf-8',
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: '&',
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1000,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};

var interpretNumericEntities = function (str) {
  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
}; // This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.


var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

  var i;
  var charset = options.charset;

  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf('utf8=') === 0) {
        if (parts[i] === charsetSentinel) {
          charset = 'utf-8';
        } else if (parts[i] === isoSentinel) {
          charset = 'iso-8859-1';
        }

        skipIndex = i;
        i = parts.length; // The eslint settings do not allow break;
      }
    }
  }

  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }

    var part = parts[i];
    var bracketEqualsPos = part.indexOf(']=');
    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
    var key, val;

    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, 'key');
      val = options.strictNullHandling ? null : '';
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
      val = options.decoder(part.slice(pos + 1), defaults.decoder, charset, 'value');
    }

    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
      val = interpretNumericEntities(val);
    }

    if (val && options.comma && val.indexOf(',') > -1) {
      val = val.split(',');
    }

    if (has.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
};

var parseObject = function (chain, val, options) {
  var leaf = val;

  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];

    if (root === '[]' && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? Object.create(null) : {};
      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);

      if (!options.parseArrays && cleanRoot === '') {
        obj = {
          0: leaf
        };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }

    leaf = obj;
  }

  return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
  if (!givenKey) {
    return;
  } // Transform dot notation to bracket notation


  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

  var brackets = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g; // Get the parent

  var segment = options.depth > 0 && brackets.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

  var keys = [];

  if (parent) {
    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(parent);
  } // Loop through children appending to the array until we hit depth


  var i = 0;

  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;

    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(segment[1]);
  } // If there's a remainder, just add whatever is left


  if (segment) {
    keys.push('[' + key.slice(segment.index) + ']');
  }

  return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
    throw new TypeError('Decoder has to be a function.');
  }

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

module.exports = function (str, opts) {
  var options = normalizeParseOptions(opts);

  if (str === '' || str === null || typeof str === 'undefined') {
    return options.plainObjects ? Object.create(null) : {};
  }

  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
  var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

  var keys = Object.keys(tempObj);

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options);
    obj = utils.merge(obj, newObj, options);
  }

  return utils.compact(obj);
};

/***/ }),

/***/ "../remix/node_modules/qs/lib/stringify.js":
/*!*************************************************!*\
  !*** ../remix/node_modules/qs/lib/stringify.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../remix/node_modules/qs/lib/utils.js");

var formats = __webpack_require__(/*! ./formats */ "../remix/node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + '[]';
  },
  comma: 'comma',
  indices: function indices(prefix, key) {
    return prefix + '[' + key + ']';
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray = Array.isArray;
var push = Array.prototype.push;

var pushToArray = function (arr, valueOrArray) {
  push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;
var defaultFormat = formats['default'];
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  charset: 'utf-8',
  charsetSentinel: false,
  delimiter: '&',
  encode: true,
  encoder: utils.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol' || typeof v === 'bigint';
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
  var obj = object;

  if (typeof filter === 'function') {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
    obj = obj.join(',');
  }

  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
    }

    obj = '';
  }

  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
    }

    return [formatter(prefix) + '=' + formatter(String(obj))];
  }

  var values = [];

  if (typeof obj === 'undefined') {
    return values;
  }

  var objKeys;

  if (isArray(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];

    if (skipNulls && obj[key] === null) {
      continue;
    }

    if (isArray(obj)) {
      pushToArray(values, stringify(obj[key], typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
    } else {
      pushToArray(values, stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
    }
  }

  return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
    throw new TypeError('Encoder has to be a function.');
  }

  var charset = opts.charset || defaults.charset;

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var format = formats['default'];

  if (typeof opts.format !== 'undefined') {
    if (!has.call(formats.formatters, opts.format)) {
      throw new TypeError('Unknown format option provided.');
    }

    format = opts.format;
  }

  var formatter = formats.formatters[format];
  var filter = defaults.filter;

  if (typeof opts.filter === 'function' || isArray(opts.filter)) {
    filter = opts.filter;
  }

  return {
    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter: filter,
    formatter: formatter,
    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
    sort: typeof opts.sort === 'function' ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

module.exports = function (object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;

  if (typeof options.filter === 'function') {
    filter = options.filter;
    obj = filter('', obj);
  } else if (isArray(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  var keys = [];

  if (typeof obj !== 'object' || obj === null) {
    return '';
  }

  var arrayFormat;

  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && 'indices' in opts) {
    arrayFormat = opts.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = 'indices';
  }

  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (options.sort) {
    objKeys.sort(options.sort);
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];

    if (options.skipNulls && obj[key] === null) {
      continue;
    }

    pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
  }

  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? '?' : '';

  if (options.charsetSentinel) {
    if (options.charset === 'iso-8859-1') {
      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      // encodeURIComponent('✓')
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
};

/***/ }),

/***/ "../remix/node_modules/qs/lib/utils.js":
/*!*********************************************!*\
  !*** ../remix/node_modules/qs/lib/utils.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = function () {
  var array = [];

  for (var i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
}();

var compactQueue = function compactQueue(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];

    if (isArray(obj)) {
      var compacted = [];

      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== 'undefined') {
          compacted.push(obj[j]);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }
};

var arrayToObject = function arrayToObject(source, options) {
  var obj = options && options.plainObjects ? Object.create(null) : {};

  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== 'undefined') {
      obj[i] = source[i];
    }
  }

  return obj;
};

var merge = function merge(target, source, options) {
  if (!source) {
    return target;
  }

  if (typeof source !== 'object') {
    if (isArray(target)) {
      target.push(source);
    } else if (target && typeof target === 'object') {
      if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }

    return target;
  }

  if (!target || typeof target !== 'object') {
    return [target].concat(source);
  }

  var mergeTarget = target;

  if (isArray(target) && !isArray(source)) {
    mergeTarget = arrayToObject(target, options);
  }

  if (isArray(target) && isArray(source)) {
    source.forEach(function (item, i) {
      if (has.call(target, i)) {
        var targetItem = target[i];

        if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce(function (acc, key) {
    var value = source[key];

    if (has.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }

    return acc;
  }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function (acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};

var decode = function (str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, ' ');

  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  } // utf-8


  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};

var encode = function encode(str, defaultEncoder, charset) {
  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  // It has been adapted here for stricter adherence to RFC 3986
  if (str.length === 0) {
    return str;
  }

  var string = str;

  if (typeof str === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }

  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
    });
  }

  var out = '';

  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);

    if (c === 0x2D // -
    || c === 0x2E // .
    || c === 0x5F // _
    || c === 0x7E // ~
    || c >= 0x30 && c <= 0x39 // 0-9
    || c >= 0x41 && c <= 0x5A // a-z
    || c >= 0x61 && c <= 0x7A // A-Z
    ) {
        out += string.charAt(i);
        continue;
      }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    i += 1;
    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
  }

  return out;
};

var compact = function compact(value) {
  var queue = [{
    obj: {
      o: value
    },
    prop: 'o'
  }];
  var refs = [];

  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);

    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];

      if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
        queue.push({
          obj: obj,
          prop: key
        });
        refs.push(val);
      }
    }
  }

  compactQueue(queue);
  return value;
};

var isRegExp = function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
  return [].concat(a, b);
};

module.exports = {
  arrayToObject: arrayToObject,
  assign: assign,
  combine: combine,
  compact: compact,
  decode: decode,
  encode: encode,
  isBuffer: isBuffer,
  isRegExp: isRegExp,
  merge: merge
};

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
/*! exports provided: Program, View, getApplication, transports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/project */ "../remix/src/project/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["Program"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["View"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["getApplication"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["transports"]; });



/***/ }),

/***/ "../remix/src/Fiber.js":
/*!*****************************!*\
  !*** ../remix/src/Fiber.js ***!
  \*****************************/
/*! exports provided: cloneFiber, createFiber, createFiberFromText, createFiberFromElement, createFiberFromFragment, createRootFiber, createWorkInProgress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneFiber", function() { return cloneFiber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiber", function() { return createFiber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromText", function() { return createFiberFromText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromElement", function() { return createFiberFromElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromFragment", function() { return createFiberFromFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRootFiber", function() { return createRootFiber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWorkInProgress", function() { return createWorkInProgress; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");




function createFiberNode(tag, pendingProps, key) {
  return {
    tag: tag,
    pendingProps: pendingProps,
    key: key,
    effectTag: _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["NO_EFFECT"],
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
    status: _shared__WEBPACK_IMPORTED_MODULE_2__["NO_WORK"]
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
  created.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["NO_EFFECT"];
  return created;
}
function createFiber(tag, pendingProps, key) {
  return createFiberNode(tag, pendingProps, key);
}
function createFiberFromText(content) {
  var fiber = createFiber(HOST_TEXT, content, null);
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
function createFiberFromFragment(elements, key) {
  var fiber = createFiber(Fragment, elements);
  return fiber;
}

function createFiberFromTypeAndProps(type, // React$ElementType
key, pendingProps, owner) {
  var fiber;
  var fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FUNCTION_COMPONENT"];
  ;
  var resolvedType = type;

  if (typeof type === 'function') {
    var prototype = type.prototype;

    if (prototype && prototype.isReactComponent) {
      fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["CLASS_COMPONENT"];
    }
  } else if (typeof type === 'string') {
    fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"];
  }

  fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  return fiber;
}

function createRootFiber(container) {
  var uninitializedFiber = createFiberNode(_shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_ROOT"], null, null);
  var root = {
    containerInfo: container,
    workInProgress: uninitializedFiber
  };
  uninitializedFiber.stateNode = root;
  return root;
}
function createWorkInProgress() {}

/***/ }),

/***/ "../remix/src/ReactCommit.js":
/*!***********************************!*\
  !*** ../remix/src/ReactCommit.js ***!
  \***********************************/
/*! exports provided: push, commitAllWork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "push", function() { return push; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commitAllWork", function() { return commitAllWork; });
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");
/* harmony import */ var _renderer_config_DOMProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderer/config/DOMProperties */ "../remix/src/renderer/config/DOMProperties.js");
/* harmony import */ var _renderer_config_appendChildToContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderer/config/appendChildToContainer */ "../remix/src/renderer/config/appendChildToContainer.js");
/* harmony import */ var _renderer_config_appendChild__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderer/config/appendChild */ "../remix/src/renderer/config/appendChild.js");






var ReactCommitQueue = [];
function push(workInProgress) {
  if (workInProgress.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["NO_EFFECT"]) {// nothing to do
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

    if (tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"] || tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"]) {
      if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"]) {
        commitPlacement(workInProgress);
        workInProgress.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"];
      } else if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["UPDATE"]) {
        commitUpdate(workInProgress);
        workInProgress.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["UPDATE"];
      } else if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["DELETION"]) {
        commitDeletion(workInProgress);
        workInProgress.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["DELETION"];
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
  instance[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = null;
  Object(_renderer_config_DOMProperties__WEBPACK_IMPORTED_MODULE_3__["updateDOMProperties"])(type, instance, {}, memoizedProps);
  instance.parentNode.removeChild(instance);
}

function commitUpdate(workInProgress) {
  var stateNode = workInProgress.stateNode,
      type = workInProgress.type,
      pendingProps = workInProgress.pendingProps,
      memoizedProps = workInProgress.memoizedProps;
  var instance = stateNode;
  instance[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = pendingProps;
  Object(_renderer_config_DOMProperties__WEBPACK_IMPORTED_MODULE_3__["updateDOMProperties"])(type, instance, pendingProps, memoizedProps);
}

function commitPlacement(workInProgress) {
  var parentFiber = getHostParentFiber(workInProgress);
  var tag = parentFiber.tag,
      stateNode = parentFiber.stateNode;
  var parent;
  var isContainer;

  if (tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"]) {
    parent = stateNode;
    isContainer = false;
  } else if (tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"]) {
    parent = stateNode.containerInfo;
    isContainer = true;
  } else {}

  var before = getHostSibling(workInProgress);
  var node = workInProgress;

  while (true) {
    var isHost = node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"];

    if (isHost) {
      var _stateNode = isHost ? node.stateNode : node.stateNode.instance;

      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, _stateNode, before);
        } else {
          insertBefore(parent, _stateNode, before);
        }
      } else {
        if (isContainer) {
          Object(_renderer_config_appendChildToContainer__WEBPACK_IMPORTED_MODULE_4__["default"])(parent, _stateNode);
        } else {
          Object(_renderer_config_appendChild__WEBPACK_IMPORTED_MODULE_5__["default"])(parent, _stateNode);
        }
      }
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]) {} else if (node.child !== null) {
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
  return fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"] || fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"];
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

    while (node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] && node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"]) {
      if (node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"]) {
        continue siblings;
      }

      if (node.child === null || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"]) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = node.child;
      }
    }

    if (!(node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_0__["PLACEMENT"])) {
      return node.stateNode;
    }
  }
}

function getPublicInstance(instance) {
  return instance;
}

function getHostParentFiber(fiber) {
  var parent = fiber["return"];

  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }

    parent = parent["return"];
  }
}

/***/ }),

/***/ "../remix/src/ReactHook.js":
/*!*********************************!*\
  !*** ../remix/src/ReactHook.js ***!
  \*********************************/
/*! exports provided: resetReactCurrentHookCursor, useMemo, useCallback, useEffect, useContext, createContext, useState, useReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetReactCurrentHookCursor", function() { return resetReactCurrentHookCursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return useMemo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return useCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return useEffect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return useContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return createContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return useState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return useReducer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../remix/node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ReactScheduler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ReactScheduler */ "../remix/src/ReactScheduler.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

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
    _DEFAULTEFFECTLAYOU2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_DEFAULTEFFECTLAYOU, 3),
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
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(Hooks, _Array);

  var _super = _createSuper(Hooks);

  function Hooks(type) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Hooks);

    _this = _super.call(this);
    _this.type = type;
    return _this;
  }

  return Hooks;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Array));

function resetReactCurrentHookCursor() {
  ReactHook.ReactCurrentHookCursor = 0;
}
function useMemo(callback, dependens) {
  var _ReactHook$ReactCurre = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(ReactHook.ReactCurrentHooks, 1),
      hook = _ReactHook$ReactCurre[0];

  if (isChanged(hook[1], deps)) {
    hook[1] = deps;
    return hook[0] = cb();
  }

  return hook[0];
}
function useCallback(callback, dependens) {
  return useMemo(function () {
    return callback;
  }, dependoens);
}
function useEffect(callback, dependons) {
  return;
}
function useContext(context, selector) {
  var _ReactHook$ReactCurre2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(ReactHook.ReactCurrentHooks, 2),
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
  var _ReactHook$ReactCurre3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(ReactHook.ReactCurrentHooks, 2),
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
      Object(_ReactScheduler__WEBPACK_IMPORTED_MODULE_6__["scheduleUpdate"])(fiber);
    }
  };

  if (hooks.length) {
    return [hooks[0], setter];
  }

  return [hooks[0] = initialState, setter];
}
/* harmony default export */ __webpack_exports__["default"] = (ReactHook);

/***/ }),

/***/ "../remix/src/ReactReconciler.js":
/*!***************************************!*\
  !*** ../remix/src/ReactReconciler.js ***!
  \***************************************/
/*! exports provided: updateHostComponent, updateFunctionComponent, updateHostRoot, updateClassComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHostComponent", function() { return updateHostComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFunctionComponent", function() { return updateFunctionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHostRoot", function() { return updateHostRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateClassComponent", function() { return updateClassComponent; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _Fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Fiber */ "../remix/src/Fiber.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderer */ "../remix/src/renderer/index.js");
/* harmony import */ var _renderer_config_DOMProperties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderer/config/DOMProperties */ "../remix/src/renderer/config/DOMProperties.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");
/* harmony import */ var _ReactCommit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ReactCommit */ "../remix/src/ReactCommit.js");
/* harmony import */ var _ReactHook__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ReactHook */ "../remix/src/ReactHook.js");
/* harmony import */ var _renderer_config_createInstance__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./renderer/config/createInstance */ "../remix/src/renderer/config/createInstance.js");
/* harmony import */ var _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./classComponentUpdater */ "../remix/src/classComponentUpdater.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











function updateHostComponent(workInProgress) {
  var nextProps = workInProgress.pendingProps;
  var children = nextProps.children;

  var typeofChildren = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(children);

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
    instance = workInProgress.stateNode = Object(_renderer_config_createInstance__WEBPACK_IMPORTED_MODULE_10__["default"])(type, _nextProps, rootContainerInstance, workInProgress);
    Object(_renderer_config_DOMProperties__WEBPACK_IMPORTED_MODULE_6__["updateDOMProperties"])(type, instance, _nextProps, memoizedProps);
  } else {
    var _nextProps2 = workInProgress.pendingProps;
    var _memoizedProps = workInProgress.memoizedProps;

    if (Object(_shared__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(_memoizedProps, _nextProps2)) {
      Object(_Fiber__WEBPACK_IMPORTED_MODULE_4__["cloneFiber"])(workInProgress);
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

  if (instance && workInProgress.status === _shared__WEBPACK_IMPORTED_MODULE_7__["NO_WORK"] && Object(_shared__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(memoizedProps, pendingProps)) {
    return cloneChildren(workInProgress);
  }

  if (workInProgress["return"] && workInProgress["return"].context) {
    workInProgress.context = workInProgress["return"].context;
  }

  _ReactHook__WEBPACK_IMPORTED_MODULE_9__["default"].ReactCurrentHookFiber = workInProgress;
  Object(_ReactHook__WEBPACK_IMPORTED_MODULE_9__["resetReactCurrentHookCursor"])();
  var children = workInProgress.type(workInProgress.pendingProps, workInProgress.context);

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isString"])(children)) {
    children = createText(children);
  }

  workInProgress.stateNode = workInProgress;
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
function updateClassComponent(workInProgress) {
  var nextProps = workInProgress.pendingProps;
  var Component = workInProgress.type;
  var instance = workInProgress.stateNode;
  var shouldUpdate = false;
  _ReactHook__WEBPACK_IMPORTED_MODULE_9__["default"].ReactCurrentHookFiber = workInProgress;
  Object(_ReactHook__WEBPACK_IMPORTED_MODULE_9__["resetReactCurrentHookCursor"])();

  if (instance === null) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PLACEMENT"]; // constructe 

    var _instance = new Component(nextProps);

    workInProgress.memoizedState = _instance.state !== null && _instance.state !== undefined ? _instance.state : null;
    _instance.updater = _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__["default"];
    workInProgress.stateNode = _instance;
    _instance._reactInternalFiber = workInProgress;
    _instance.props = nextProps;
    _instance.state = workInProgress.memoizedState;
    _instance.refs = _shared__WEBPACK_IMPORTED_MODULE_7__["EMPTY_REFS"];
    processUpdate(workInProgress, _instance);
    applyDerivedStateFromProps(workInProgress, Component, nextProps);

    if (typeof _instance.componentDidMount === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["UPDATE"];
    }

    shouldUpdate = true;
  } else {
    shouldUpdate = updateClassInstance(workInProgress, Component, nextProps);
  }

  return finishClassComponent(workInProgress, Component, shouldUpdate);
}

function updateClassInstance(workInProgress, Component, nextProps) {
  var instance = workInProgress.stateNode;
  var oldProps = workInProgress.memoizedProps;
  instance.props = oldProps;
  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  processUpdate(workInProgress, instance);
  newState = workInProgress.memoizedState;
  applyDerivedStateFromProps(workInProgress, Component, nextProps);
  var shouldUpdate = checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, newState);

  if (shouldUpdate) {
    if (typeof instance.componentDidUpdate === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["UPDATE"];
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      workInProgress.effectTag |= SNAPSHOT;
    }
  } else {
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["UPDATE"];
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= SNAPSHOT;
      }
    }

    workInProgress.memoizedProps = nextProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = nextProps;
  instance.state = newState;
  instance._reactInternalFiber = workInProgress;
  return shouldUpdate;
}

function finishClassComponent(workInProgress, Component, shouldUpdate) {
  var ref = workInProgress.ref;

  if (ref !== null) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["REF"];
  }

  if (!shouldUpdate) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  var instance = workInProgress.stateNode;
  var nextChildren = instance.render();
  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PERFORMED_WORK"]; // if (current !== null) {
  //   workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  // } else {
  //   reconcileChildren(current, workInProgress, nextChildren);
  // }

  reconcileChildren(workInProgress, nextChildren);
  workInProgress.memoizedState = instance.state;
  return workInProgress.child;
}

function applyDerivedStateFromProps(workInProgress, Component, nextProps) {
  var getDerivedStateFromProps = Component.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === 'function') {
    var memoizedState = workInProgress.memoizedState;
    var nextState = getDerivedStateFromProps(nextProps, memoizedState);
    instance.state = workInProgress.memoizedState = nextState === null || nextState === undefined ? memoizedState : _objectSpread({}, memoizedState, {
      partialState: partialState
    });
  }
}

function processUpdate(workInProgress, instance) {
  var resultState = null;
  var update = workInProgress.update;

  if (update !== null) {
    var payload = update.payload;

    if (typeof payload === 'function') {
      resultState = payload.call(instance, prevState, nextProps);
    } else {}

    resultState = payload;
    workInProgress.memoizedState = resultState;
    instance.state = workInProgress.memoizedState;
  }
}

function checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState) {
  var instance = workInProgress.stateNode;

  if (typeof instance.shouldComponentUpdate === 'function') {
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState);
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !Object(_shared__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(oldProps, newProps) || !Object(_shared__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(oldState, newState);
  }

  return true;
}

function createPendingReactElements(children) {
  var pendingKeys = {};
  children.forEach(function (child, index) {
    if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isArray"])(child)) {
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
    var created = createFiberFromText('' + newChild);
    created["return"] = returnFiber;
    return created;
  } // 如果是对象


  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(newChild) === 'object' && newChild !== null) {
    // TODO 根据 $$typeof 构建 fiber
    if (newChild.$$typeof) {
      var _created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_4__["createFiberFromElement"])(newChild);

      _created["return"] = returnFiber;
      return _created;
    }
  } // 如果是数组


  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isArray"])(newChild)) {
    var _created2 = Object(_Fiber__WEBPACK_IMPORTED_MODULE_4__["createFiberFromElement"])(newChild, null);

    _created2["return"] = returnFiber;
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
        fiber.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["DELETION"];
        Object(_ReactCommit__WEBPACK_IMPORTED_MODULE_8__["push"])(fiber);
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
        newFiber.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["UPDATE"];
        newFiber.memoizedProps = alternate.memoizedProps;
        newFiber.memoizedReactFibers = alternate.memoizedReactFibers;
        newFiber.memoizedReactElements = alternate.memoizedReactElements;
        newFiber.stateNode = alternate.stateNode; // debugger;
        // if (shouldPlace(newChild)) {
        //   newChild.effectTag |= PLACEMENT;
        // }
      } else {
        newFiber = createChild(workInProgress, _newChild);
        newFiber.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["PLACEMENT"];
      }

      Object(_ReactCommit__WEBPACK_IMPORTED_MODULE_8__["push"])(newFiber);
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
    var newChild = Object(_Fiber__WEBPACK_IMPORTED_MODULE_4__["cloneFiber"])(child);
    newChild["return"] = fiber;
    newChild.sibling = null;
    fiber.child = newChild;
  }
}

function getRootHostContainer() {
  var root = _renderer__WEBPACK_IMPORTED_MODULE_5__["ReactCurrentRoot"].current.internalRoot;
  return root.containerInfo;
}

/***/ }),

/***/ "../remix/src/ReactScheduler.js":
/*!**************************************!*\
  !*** ../remix/src/ReactScheduler.js ***!
  \**************************************/
/*! exports provided: scheduleUpdate, scheduleRootUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleUpdate", function() { return scheduleUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleRootUpdate", function() { return scheduleRootUpdate; });
/* harmony import */ var _shared_performance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/performance */ "../remix/src/shared/performance.js");
/* harmony import */ var _shared_nextTick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/nextTick */ "../remix/src/shared/nextTick.js");
/* harmony import */ var _ReactCommit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactCommit */ "../remix/src/ReactCommit.js");
/* harmony import */ var _ReactUpdater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReactUpdater */ "../remix/src/ReactUpdater.js");
/* harmony import */ var _ReactReconciler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReactReconciler */ "../remix/src/ReactReconciler.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");








var isRendering = false;
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
    var _index = leaf - 1 >>> 2;

    var parent = ReactCurrentSchedulerHeap[_index]; // 与父节点比较

    if (parent[_shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_KEY"]] - node[_shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_KEY"]] >= 0) {
      // 交换位置
      ReactCurrentSchedulerHeap[_index] = node;
      ReactCurrentSchedulerHeap[leaf] = parent;
      leaf = _index;
    }
  }
}

function siftdown(node, first) {
  var length = heap.length;

  while (true) {
    var l = first * 2 + 1;
    var left = ReactCurrentSchedulerHeap[l];

    if (l > length) {
      break;
    } // 右边叶子索引 = 父节点索引 * 2 + 2 = 左边索引 + 1


    r = l + 1;
    right = ReactCurrentSchedulerHeap[r]; // 选左右叶子索引

    var c = r < length && right.due - left.due < 0 ? r : l;
    var child = ReactCurrentSchedulerHeap[c]; // 不用交换

    if (child[_shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_KEY"]] - node[_shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_KEY"]] < 0) {
      break;
    } // 交换节点


    ReactCurrentSchedulerHeap[c] = node;
    ReactCurrentSchedulerHeap[index] = child;
    index = c;
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
    now = _shared_performance__WEBPACK_IMPORTED_MODULE_0__["default"].now();
  }
}

function flushWork() {
  ReactCurrentScheduler = flush;

  var next = function next() {
    if (ReactCurrentScheduler) {
      var now = _shared_performance__WEBPACK_IMPORTED_MODULE_0__["default"].now();
      scheduleDeadline = now + 1000 / _shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_FPS"];
      ReactCurrentScheduler(now);
      peek() ? flushWork() : ReactCurrentScheduler = null;
    }
  };

  isRendering ? next() : Object(_shared_nextTick__WEBPACK_IMPORTED_MODULE_1__["default"])(next);
}

function scheduleWork() {
  var begin = _shared_performance__WEBPACK_IMPORTED_MODULE_0__["default"].now();
  var due = begin + _shared__WEBPACK_IMPORTED_MODULE_5__["SCHEDULE_TIMEOUT"];
  var work = {
    schedule: workLoop,
    begin: begin,
    due: due
  };
  push(work);
  flushWork();
}

function shouldYeild() {
  return isRendering ? false : _shared_performance__WEBPACK_IMPORTED_MODULE_0__["default"].now() >= scheduleDeadline;
}

function workLoop(isExpired) {
  if (!workInProgress) {
    workInProgress = Object(_ReactUpdater__WEBPACK_IMPORTED_MODULE_3__["dequeueUpdateQueue"])();
  }

  while (workInProgress && (!shouldYeild() || !isExpired)) {
    workInProgress = performUnitOfWork(workInProgress);
  }

  if (pendingCommitWorkInProgress) {
    Object(_ReactCommit__WEBPACK_IMPORTED_MODULE_2__["commitAllWork"])();
    pendingCommitWorkInProgress = null;
  }
}

function performUnitOfWork(workInProgress) {
  beginWork(workInProgress);
  workInProgress.status = _shared__WEBPACK_IMPORTED_MODULE_5__["NO_WORK"];

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
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_6__["HOST_ROOT"]:
      {
        return Object(_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__["updateHostRoot"])(workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_6__["FUNCTION_COMPONENT"]:
      {
        return Object(_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__["updateFunctionComponent"])(workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_6__["CLASS_COMPONENT"]:
      {
        return Object(_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__["updateClassComponent"])(workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_6__["HOST_COMPONENT"]:
      {
        return Object(_ReactReconciler__WEBPACK_IMPORTED_MODULE_4__["updateHostComponent"])(workInProgress);
      }
  }
}

function scheduleUpdate(fiber) {
  Object(_ReactUpdater__WEBPACK_IMPORTED_MODULE_3__["enqueueUpdateQueue"])(fiber);
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
/*! exports provided: enqueueUpdateQueue, dequeueUpdateQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueUpdateQueue", function() { return enqueueUpdateQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dequeueUpdateQueue", function() { return dequeueUpdateQueue; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");

var UpdaterQueue = [];
function enqueueUpdateQueue(fiber) {
  if (fiber.status === _shared__WEBPACK_IMPORTED_MODULE_0__["NO_WORK"]) {
    fiber.status = _shared__WEBPACK_IMPORTED_MODULE_0__["PENDING_WORK"];
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
/*! exports provided: MOUNTING, MOUNTED, UNMOUNTED, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTING", function() { return MOUNTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTED", function() { return MOUNTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNMOUNTED", function() { return UNMOUNTED; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ "../remix/src/shared/index.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/effectTags */ "../remix/src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/workTags */ "../remix/src/shared/workTags.js");
/* harmony import */ var _ReactScheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReactScheduler */ "../remix/src/ReactScheduler.js");




var MOUNTING = 1,
    MOUNTED = 2,
    UNMOUNTED = 3;

/* harmony default export */ __webpack_exports__["default"] = ({
  isMounted: function isMounted(component) {
    var fiber = component._reactInternalFiber;

    if (fiber) {
      var node = fiber;

      if (!fiber.alternate) {
        if ((node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"]) !== NoEffect) {
          return MOUNTING;
        }

        while (node["return"]) {
          node = node["return"];

          if ((node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"]) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node["return"]) {
          node = node["return"];
        }
      }

      if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_ROOT"]) {
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
      tag: _shared__WEBPACK_IMPORTED_MODULE_0__["UPDATE_STATE"]
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.update = update;
    Object(_ReactScheduler__WEBPACK_IMPORTED_MODULE_3__["scheduleUpdate"])(fiber);
  },
  enqueueReplaceState: function enqueueReplaceState(inst, payload, callback) {
    var fiber = inst._reactInternalFiber;
    var update = {
      payload: payload,
      tag: _shared__WEBPACK_IMPORTED_MODULE_0__["REPLACE_STATE"]
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.update = update;
    Object(_ReactScheduler__WEBPACK_IMPORTED_MODULE_3__["scheduleUpdate"])(fiber);
  },
  enqueueForceUpdate: function enqueueForceUpdate(inst, callback) {
    var fiber = inst._reactInternalFiber;
    var update = {
      payload: payload,
      tag: _shared__WEBPACK_IMPORTED_MODULE_0__["FORCE_UPDATE"]
    };

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    Object(_ReactScheduler__WEBPACK_IMPORTED_MODULE_3__["scheduleUpdate"])(fiber);
  }
});

/***/ }),

/***/ "../remix/src/components/Application.js":
/*!**********************************************!*\
  !*** ../remix/src/components/Application.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Application; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../react/createElement */ "../remix/src/react/createElement.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../react/PropTypes */ "../remix/src/react/PropTypes.js");
/* harmony import */ var _react_Children__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../react/Children */ "../remix/src/react/Children.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../router */ "../remix/src/router/index.js");
/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./TabBar */ "../remix/src/components/TabBar.js");








function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





 // import { transports, APPLICATION } from '../project';




var Application = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Application, _Component);

  var _super = _createSuper(Application);

  function Application() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Application);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onMessage", function (type, argv) {
      switch (type) {
        case APPLICATION.LAUNCH:
          {
            var onLaunch = _this.props.onLaunch;
            onLaunch.apply(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), argv);
            break;
          }
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Application, [{
    key: "componentWillMount",
    value: function componentWillMount() {// transports.app.on(this.onMessage);
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {// transports.app.off(this.onMessage);
    }
  }, {
    key: "cloneApplicationChildren",
    value: function cloneApplicationChildren() {
      var children = [];
      _react_Children__WEBPACK_IMPORTED_MODULE_11__["forEach"](this.props.children, function (child) {
        if (child !== null) {
          var type = child.type;

          if (type === _router__WEBPACK_IMPORTED_MODULE_12__["Router"] || type === _TabBar__WEBPACK_IMPORTED_MODULE_13__["default"]) {
            children.push(child);
          }
        }
      });
      return children;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_7__["default"].createElement("view", null, this.cloneApplicationChildren());
    }
  }]);

  return Application;
}(_react_Component__WEBPACK_IMPORTED_MODULE_9__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Application, "propTypes", {
  onLaunch: _react_PropTypes__WEBPACK_IMPORTED_MODULE_10__["default"].func
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Application, "defaultProps", {
  onLaunch: function onLaunch() {}
});



/***/ }),

/***/ "../remix/src/components/TabBar.js":
/*!*****************************************!*\
  !*** ../remix/src/components/TabBar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabBar; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var TabBarItem = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(TabBarItem, _Component);

  var _super = _createSuper(TabBarItem);

  function TabBarItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBarItem);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBarItem, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return TabBarItem;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBarItem, "propTypes", {
  path: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  icon: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  selectedIcon: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  children: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

var TabBar = /*#__PURE__*/function (_Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(TabBar, _Component2);

  var _super2 = _createSuper(TabBar);

  function TabBar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBar);

    return _super2.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBar, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return TabBar;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "TabBarItem", TabBarItem);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "propTypes", {
  color: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  selectedColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  backgroundColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  borderStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].oneOf(['black', 'white']),
  position: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].oneOf(['bottom', 'top']),
  custom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(TabBar, "defaultProps", {
  position: 'bottom',
  bottom: false
});



/***/ }),

/***/ "../remix/src/components/ViewController.js":
/*!*************************************************!*\
  !*** ../remix/src/components/ViewController.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../react/PropTypes */ "../remix/src/react/PropTypes.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../react/createElement */ "../remix/src/react/createElement.js");
/* harmony import */ var _project_notification__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../project/notification */ "../remix/src/project/notification/index.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var defineProperty = Object.defineProperty;

var ViewController = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(ViewController, _Component);

  var _super = _createSuper(ViewController);

  function ViewController(props, context) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewController);

    return _super.call(this, props, context);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewController, [{
    key: "render",
    value: function render() {
      throw new Error("Must be implatated");
    }
  }]);

  return ViewController;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(ViewController, "propTypes", {});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(ViewController, "defaultProps", {});



/***/ }),

/***/ "../remix/src/components/index.js":
/*!****************************************!*\
  !*** ../remix/src/components/index.js ***!
  \****************************************/
/*! exports provided: Application, ViewController, TabBar, Root, View, Text, Image, Button, Map, Input, Picker, Swiper, SwiperItem, ScrollView, Video */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application */ "../remix/src/components/Application.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _Application__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewController */ "../remix/src/components/ViewController.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewController", function() { return _ViewController__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabBar */ "../remix/src/components/TabBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _TabBar__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _remix_element_remix_root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./remix-element/remix-root */ "../remix/src/components/remix-element/remix-root/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _remix_element_remix_root__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _remix_element_remix_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./remix-element/remix-view */ "../remix/src/components/remix-element/remix-view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _remix_element_remix_view__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _remix_element_remix_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remix-element/remix-text */ "../remix/src/components/remix-element/remix-text/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _remix_element_remix_text__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _remix_element_remix_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./remix-element/remix-image */ "../remix/src/components/remix-element/remix-image/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _remix_element_remix_image__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _remix_element_remix_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remix-element/remix-input */ "../remix/src/components/remix-element/remix-input/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _remix_element_remix_input__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _remix_element_remix_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./remix-element/remix-map */ "../remix/src/components/remix-element/remix-map/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _remix_element_remix_map__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _remix_element_remix_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./remix-element/remix-button */ "../remix/src/components/remix-element/remix-button/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _remix_element_remix_button__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./remix-element/remix-picker */ "../remix/src/components/remix-element/remix-picker/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return _remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _remix_element_remix_scroll_view__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./remix-element/remix-scroll-view */ "../remix/src/components/remix-element/remix-scroll-view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollView", function() { return _remix_element_remix_scroll_view__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./remix-element/remix-swiper */ "../remix/src/components/remix-element/remix-swiper/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Swiper", function() { return _remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./remix-element/remix-swiper-item */ "../remix/src/components/remix-element/remix-swiper-item/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwiperItem", function() { return _remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _remix_element_remix_video__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./remix-element/remix-video */ "../remix/src/components/remix-element/remix-video/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return _remix_element_remix_video__WEBPACK_IMPORTED_MODULE_14__["default"]; });


















/***/ }),

/***/ "../remix/src/components/remix-element/remix-button/index.js":
/*!*******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-button/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixButton; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixButton = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixButton, _Component);

  var _super = _createSuper(RemixButton);

  function RemixButton() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixButton);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixButton, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onGetUserInfo",
    value: function onGetUserInfo(e) {
      var onGetUserInfo = this.props.onGetUserInfo;

      if (typeof onGetUserInfo === 'function') {
        onGetUserInfo(e);
      }
    }
  }, {
    key: "onContact",
    value: function onContact(e) {
      var onContact = this.props.onContact;

      if (typeof onContact === 'function') {
        onContact(e);
      }
    }
  }, {
    key: "onGetPhoneNumber",
    value: function onGetPhoneNumber(e) {
      var onGetPhoneNumber = this.props.onGetPhoneNumber;

      if (typeof onGetPhoneNumber === 'function') {
        onGetPhoneNumber(e);
      }
    }
  }, {
    key: "onOpenSetting",
    value: function onOpenSetting(e) {
      var onOpenSetting = this.props.onOpenSetting;

      if (typeof onOpenSetting === 'function') {
        onOpenSetting(e);
      }
    }
  }, {
    key: "onLaunchApp",
    value: function onLaunchApp(e) {
      var onLaunchApp = this.props.onLaunchApp;

      if (typeof onLaunchApp === 'function') {
        onLaunchApp(e);
      }
    }
  }, {
    key: "onError",
    value: function onError(e) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onError = _this$props.onError,
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
          showMessageCard = _this$props.showMessageCard;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("button", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onGetUserInfo: onGetUserInfo ? 'onGetUserInfo' : '',
        onContact: onContact ? 'onContact' : '',
        onGetPhoneNumber: onGetPhoneNumber ? 'onGetPhoneNumber' : '',
        onOpenSetting: onOpenSetting ? 'onOpenSetting' : '',
        onLaunchApp: onLaunchApp ? 'onLaunchApp' : '',
        onError: onError ? 'onError' : '',
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixButton, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onGetUserInfo: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onContact: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onGetPhoneNumber: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onOpenSetting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLaunchApp: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  size: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  type: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  plain: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  loading: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  formType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  openType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  hoverClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  hoverStopPropagation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  hoverStartTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  hoverStayTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  lang: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  sessionFrom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  sendMessageTitle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  sendMessagePath: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  sendMessageImg: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  appParameter: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  showMessageCard: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixButton, "defaultProps", {
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
  onError: null,
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
  showMessageCard: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-image/index.js":
/*!******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-image/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixImage; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixImage = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixImage, _Component);

  var _super = _createSuper(RemixImage);

  function RemixImage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixImage);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixImage, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad(e) {
      var onLoad = this.props.onLoad;

      if (typeof onLoad === 'function') {
        onLoad(e);
      }
    }
  }, {
    key: "onError",
    value: function onError(e) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onError = _this$props.onError,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          src = _this$props.src,
          mode = _this$props.mode,
          webp = _this$props.webp,
          lazyLoad = _this$props.lazyLoad,
          showMenuByLongpress = _this$props.showMenuByLongpress;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("image", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onLoad: onLoad ? 'onLoad' : '',
        onError: onError ? 'onError' : '',
        parent: parent,
        style: style,
        className: className,
        src: src,
        mode: mode,
        webp: webp,
        lazyLoad: lazyLoad,
        showMenuByLongpress: showMenuByLongpress
      });
    }
  }]);

  return RemixImage;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixImage, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLoad: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  src: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  mode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  webp: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  lazyLoad: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showMenuByLongpress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixImage, "defaultProps", {
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
  onError: null,
  parent: null,
  style: null,
  className: null,
  src: null,
  mode: 'scaleToFill',
  webp: false,
  lazyLoad: false,
  showMenuByLongpress: false
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-input/index.js":
/*!******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-input/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixInput; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixInput = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixInput, _Component);

  var _super = _createSuper(RemixInput);

  function RemixInput() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixInput);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixInput, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      var onInput = this.props.onInput;

      if (typeof onInput === 'function') {
        onInput(e);
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      var onFocus = this.props.onFocus;

      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var onBlur = this.props.onBlur;

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    }
  }, {
    key: "onConfirm",
    value: function onConfirm(e) {
      var onConfirm = this.props.onConfirm;

      if (typeof onConfirm === 'function') {
        onConfirm(e);
      }
    }
  }, {
    key: "onKeyboardHeightChange",
    value: function onKeyboardHeightChange(e) {
      var onKeyboardHeightChange = this.props.onKeyboardHeightChange;

      if (typeof onKeyboardHeightChange === 'function') {
        onKeyboardHeightChange(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onKeyboardHeightChange = _this$props.onKeyboardHeightChange,
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
          holdKeyboard = _this$props.holdKeyboard;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("input", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onInput: onInput ? 'onInput' : '',
        onFocus: onFocus ? 'onFocus' : '',
        onBlur: onBlur ? 'onBlur' : '',
        onConfirm: onConfirm ? 'onConfirm' : '',
        onKeyboardHeightChange: onKeyboardHeightChange ? 'onKeyboardHeightChange' : '',
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
      });
    }
  }]);

  return RemixInput;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixInput, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onInput: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onFocus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onBlur: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onConfirm: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onKeyboardHeightChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  value: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  type: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  password: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  placeholder: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  placeholderStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  placeholderClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  maxlength: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  cursorSpacing: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  autoFocus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  focus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  confirmType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  confirmHold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  cursor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  selectionStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  selectionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  adjustPosition: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  holdKeyboard: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixInput, "defaultProps", {
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
  onKeyboardHeightChange: null,
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
  holdKeyboard: false
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-map/index.js":
/*!****************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-map/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixMap; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixMap = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixMap, _Component);

  var _super = _createSuper(RemixMap);

  function RemixMap() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixMap);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixMap, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onMarkerTap",
    value: function onMarkerTap(e) {
      var onMarkerTap = this.props.onMarkerTap;

      if (typeof onMarkerTap === 'function') {
        onMarkerTap(e);
      }
    }
  }, {
    key: "onLabelTap",
    value: function onLabelTap(e) {
      var onLabelTap = this.props.onLabelTap;

      if (typeof onLabelTap === 'function') {
        onLabelTap(e);
      }
    }
  }, {
    key: "onControlTap",
    value: function onControlTap(e) {
      var onControlTap = this.props.onControlTap;

      if (typeof onControlTap === 'function') {
        onControlTap(e);
      }
    }
  }, {
    key: "onCalloutTap",
    value: function onCalloutTap(e) {
      var onCalloutTap = this.props.onCalloutTap;

      if (typeof onCalloutTap === 'function') {
        onCalloutTap(e);
      }
    }
  }, {
    key: "onUpdated",
    value: function onUpdated(e) {
      var onUpdated = this.props.onUpdated;

      if (typeof onUpdated === 'function') {
        onUpdated(e);
      }
    }
  }, {
    key: "onRegionChange",
    value: function onRegionChange(e) {
      var onRegionChange = this.props.onRegionChange;

      if (typeof onRegionChange === 'function') {
        onRegionChange(e);
      }
    }
  }, {
    key: "onPoiTap",
    value: function onPoiTap(e) {
      var onPoiTap = this.props.onPoiTap;

      if (typeof onPoiTap === 'function') {
        onPoiTap(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onPoiTap = _this$props.onPoiTap,
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
          setting = _this$props.setting;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("map", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onMarkerTap: onMarkerTap ? 'onMarkerTap' : '',
        onLabelTap: onLabelTap ? 'onLabelTap' : '',
        onControlTap: onControlTap ? 'onControlTap' : '',
        onCalloutTap: onCalloutTap ? 'onCalloutTap' : '',
        onUpdated: onUpdated ? 'onUpdated' : '',
        onRegionChange: onRegionChange ? 'onRegionChange' : '',
        onPoiTap: onPoiTap ? 'onPoiTap' : '',
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
      });
    }
  }]);

  return RemixMap;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixMap, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onMarkerTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLabelTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onControlTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onCalloutTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onUpdated: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onRegionChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onPoiTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  longitude: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  latitude: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  scale: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  markers: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  covers: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  polyline: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  circles: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  controls: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  includePoints: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  showLocation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  polygons: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  subkey: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  layerStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  rotate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  skew: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  enable3D: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showCompass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showScale: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableOverlooking: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableZoom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableScroll: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableRotate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableSatellite: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableTraffic: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  setting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].object
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixMap, "defaultProps", {
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
  onPoiTap: null,
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
  setting: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-picker/index.js":
/*!*******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-picker/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixPicker; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixPicker = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixPicker, _Component);

  var _super = _createSuper(RemixPicker);

  function RemixPicker() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixPicker);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixPicker, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onCancel",
    value: function onCancel(e) {
      var onCancel = this.props.onCancel;

      if (typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, {
    key: "onError",
    value: function onError(e) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(e);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var onChange = this.props.onChange;

      if (typeof onChange === 'function') {
        onChange(e);
      }
    }
  }, {
    key: "onColumnChange",
    value: function onColumnChange(e) {
      var onColumnChange = this.props.onColumnChange;

      if (typeof onColumnChange === 'function') {
        onColumnChange(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onColumnChange = _this$props.onColumnChange,
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
          customItem = _this$props.customItem;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("picker", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onCancel: onCancel ? 'onCancel' : '',
        onError: onError ? 'onError' : '',
        onChange: onChange ? 'onChange' : '',
        onColumnChange: onColumnChange ? 'onColumnChange' : '',
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixPicker, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onColumnChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  mode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  range: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].object,
  rangeKey: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  value: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  start: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  end: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  fields: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  customItem: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixPicker, "defaultProps", {
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
  onColumnChange: null,
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
  customItem: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-root/index.js":
/*!*****************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-root/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixRoot; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixRoot = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixRoot, _Component);

  var _super = _createSuper(RemixRoot);

  function RemixRoot() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixRoot);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixRoot, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("root", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        parent: parent,
        style: style,
        className: className
      }, this.props.children);
    }
  }]);

  return RemixRoot;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixRoot, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixRoot, "defaultProps", {
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
  parent: null,
  style: null,
  className: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-scroll-view/index.js":
/*!************************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-scroll-view/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixScrollView; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixScrollView = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixScrollView, _Component);

  var _super = _createSuper(RemixScrollView);

  function RemixScrollView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixScrollView);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixScrollView, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onScrollToUpper",
    value: function onScrollToUpper(e) {
      var onScrollToUpper = this.props.onScrollToUpper;

      if (typeof onScrollToUpper === 'function') {
        onScrollToUpper(e);
      }
    }
  }, {
    key: "onScrollToLower",
    value: function onScrollToLower(e) {
      var onScrollToLower = this.props.onScrollToLower;

      if (typeof onScrollToLower === 'function') {
        onScrollToLower(e);
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll(e) {
      var onScroll = this.props.onScroll;

      if (typeof onScroll === 'function') {
        onScroll(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onScroll = _this$props.onScroll,
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
          scrollAnchoring = _this$props.scrollAnchoring;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("scroll-view", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onScrollToUpper: onScrollToUpper ? 'onScrollToUpper' : '',
        onScrollToLower: onScrollToLower ? 'onScrollToLower' : '',
        onScroll: onScroll ? 'onScroll' : '',
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixScrollView, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onScrollToUpper: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onScrollToLower: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onScroll: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  scrollX: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  scrollY: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  upperThreshold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  lowerThreshold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  scrollTop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  scrollLeft: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  scrollIntoView: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  scrollWithAnimation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableBackToTop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableFlex: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  scrollAnchoring: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixScrollView, "defaultProps", {
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
  onScroll: null,
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
  scrollAnchoring: false
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-swiper-item/index.js":
/*!************************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-swiper-item/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixSwiperItem; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixSwiperItem = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixSwiperItem, _Component);

  var _super = _createSuper(RemixSwiperItem);

  function RemixSwiperItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixSwiperItem);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixSwiperItem, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          itemId = _this$props.itemId;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("swiper-item", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        parent: parent,
        style: style,
        className: className,
        itemId: itemId
      }, this.props.children);
    }
  }]);

  return RemixSwiperItem;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiperItem, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  itemId: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiperItem, "defaultProps", {
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
  parent: null,
  style: null,
  className: null,
  itemId: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-swiper/index.js":
/*!*******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-swiper/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixSwiper; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");
/* harmony import */ var _remix_swiper_item_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../remix-swiper-item/index */ "../remix/src/components/remix-element/remix-swiper-item/index.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var RemixSwiper = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixSwiper, _Component);

  var _super = _createSuper(RemixSwiper);

  function RemixSwiper() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixSwiper);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixSwiper, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var onChange = this.props.onChange;

      if (typeof onChange === 'function') {
        onChange(e);
      }
    }
  }, {
    key: "onAnimationFinish",
    value: function onAnimationFinish(e) {
      var onAnimationFinish = this.props.onAnimationFinish;

      if (typeof onAnimationFinish === 'function') {
        onAnimationFinish(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onAnimationFinish = _this$props.onAnimationFinish,
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
          easingFunction = _this$props.easingFunction;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("swiper", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onChange: onChange ? 'onChange' : '',
        onAnimationFinish: onAnimationFinish ? 'onAnimationFinish' : '',
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiper, "SwiperItem", _remix_swiper_item_index__WEBPACK_IMPORTED_MODULE_9__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiper, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationFinish: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  indicatorDots: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  indicatorColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  indicatorActiveColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  autoplay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  current: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  interval: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  duration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  circular: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  vertical: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  previousMargin: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  nextMargin: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  displayMultipleItems: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  skipHiddenItemLayou: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  easingFunction: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiper, "defaultProps", {
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
  onAnimationFinish: null,
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
  easingFunction: 'default'
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-text/index.js":
/*!*****************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-text/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixText; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixText = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixText, _Component);

  var _super = _createSuper(RemixText);

  function RemixText() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixText);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          selectable = _this$props.selectable,
          space = _this$props.space,
          decode = _this$props.decode;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("text", {
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixText, "propTypes", {
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  selectable: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  space: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  decode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixText, "defaultProps", {
  parent: null,
  style: null,
  className: null,
  selectable: false,
  space: false,
  decode: false
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-video/index.js":
/*!******************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-video/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixVideo; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixVideo = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixVideo, _Component);

  var _super = _createSuper(RemixVideo);

  function RemixVideo() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixVideo);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixVideo, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "onPlay",
    value: function onPlay(e) {
      var onPlay = this.props.onPlay;

      if (typeof onPlay === 'function') {
        onPlay(e);
      }
    }
  }, {
    key: "onPause",
    value: function onPause(e) {
      var onPause = this.props.onPause;

      if (typeof onPause === 'function') {
        onPause(e);
      }
    }
  }, {
    key: "onEnded",
    value: function onEnded(e) {
      var onEnded = this.props.onEnded;

      if (typeof onEnded === 'function') {
        onEnded(e);
      }
    }
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate(e) {
      var onTimeUpdate = this.props.onTimeUpdate;

      if (typeof onTimeUpdate === 'function') {
        onTimeUpdate(e);
      }
    }
  }, {
    key: "onFullScreenChange",
    value: function onFullScreenChange(e) {
      var onFullScreenChange = this.props.onFullScreenChange;

      if (typeof onFullScreenChange === 'function') {
        onFullScreenChange(e);
      }
    }
  }, {
    key: "onWaiting",
    value: function onWaiting(e) {
      var onWaiting = this.props.onWaiting;

      if (typeof onWaiting === 'function') {
        onWaiting(e);
      }
    }
  }, {
    key: "onError",
    value: function onError(e) {
      var onError = this.props.onError;

      if (typeof onError === 'function') {
        onError(e);
      }
    }
  }, {
    key: "onProgress",
    value: function onProgress(e) {
      var onProgress = this.props.onProgress;

      if (typeof onProgress === 'function') {
        onProgress(e);
      }
    }
  }, {
    key: "onLoadedMetaData",
    value: function onLoadedMetaData(e) {
      var onLoadedMetaData = this.props.onLoadedMetaData;

      if (typeof onLoadedMetaData === 'function') {
        onLoadedMetaData(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          onLoadedMetaData = _this$props.onLoadedMetaData,
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
          adUnitId = _this$props.adUnitId;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("video", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
        onPlay: onPlay ? 'onPlay' : '',
        onPause: onPause ? 'onPause' : '',
        onEnded: onEnded ? 'onEnded' : '',
        onTimeUpdate: onTimeUpdate ? 'onTimeUpdate' : '',
        onFullScreenChange: onFullScreenChange ? 'onFullScreenChange' : '',
        onWaiting: onWaiting ? 'onWaiting' : '',
        onError: onError ? 'onError' : '',
        onProgress: onProgress ? 'onProgress' : '',
        onLoadedMetaData: onLoadedMetaData ? 'onLoadedMetaData' : '',
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
      });
    }
  }]);

  return RemixVideo;
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixVideo, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onPlay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onPause: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onEnded: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTimeUpdate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onFullScreenChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onWaiting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onProgress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLoadedMetaData: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  src: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  duration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  controls: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  danmuList: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].array,
  danmuButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableDanmu: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  autoplay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  loop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  muted: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  initialTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  pageGesture: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  direction: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  showProgress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showFullscreenButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showPlayButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  showCenterPlayButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  enableProgressGesture: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  objectFit: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  poster: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  showMuteButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  title: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  playButtonPosition: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  enablePlayGesture: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  autoPauseIfNavigate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  autoPauseIfOpenNative: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  vslideGesture: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  vslideGestureInFullscreen: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  adUnitId: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixVideo, "defaultProps", {
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
  onLoadedMetaData: null,
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
  adUnitId: null
});



/***/ }),

/***/ "../remix/src/components/remix-element/remix-view/index.js":
/*!*****************************************************************!*\
  !*** ../remix/src/components/remix-element/remix-view/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixView; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/Component */ "../remix/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remix/src/react/PropTypes.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var RemixView = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixView, _Component);

  var _super = _createSuper(RemixView);

  function RemixView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixView);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixView, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var onTouchStart = this.props.onTouchStart;

      if (typeof onTouchStart === 'function') {
        onTouchStart(e);
      }
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var onTouchMove = this.props.onTouchMove;

      if (typeof onTouchMove === 'function') {
        onTouchMove(e);
      }
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      var onTouchCancel = this.props.onTouchCancel;

      if (typeof onTouchCancel === 'function') {
        onTouchCancel(e);
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var onTouchEnd = this.props.onTouchEnd;

      if (typeof onTouchEnd === 'function') {
        onTouchEnd(e);
      }
    }
  }, {
    key: "onTap",
    value: function onTap(e) {
      var onTap = this.props.onTap;

      if (typeof onTap === 'function') {
        onTap(e);
      }
    }
  }, {
    key: "onLongPress",
    value: function onLongPress(e) {
      var onLongPress = this.props.onLongPress;

      if (typeof onLongPress === 'function') {
        onLongPress(e);
      }
    }
  }, {
    key: "onLongTap",
    value: function onLongTap(e) {
      var onLongTap = this.props.onLongTap;

      if (typeof onLongTap === 'function') {
        onLongTap(e);
      }
    }
  }, {
    key: "onTouchForceChange",
    value: function onTouchForceChange(e) {
      var onTouchForceChange = this.props.onTouchForceChange;

      if (typeof onTouchForceChange === 'function') {
        onTouchForceChange(e);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      var onTransitionEnd = this.props.onTransitionEnd;

      if (typeof onTransitionEnd === 'function') {
        onTransitionEnd(e);
      }
    }
  }, {
    key: "onAnimationStart",
    value: function onAnimationStart(e) {
      var onAnimationStart = this.props.onAnimationStart;

      if (typeof onAnimationStart === 'function') {
        onAnimationStart(e);
      }
    }
  }, {
    key: "onAnimationIteration",
    value: function onAnimationIteration(e) {
      var onAnimationIteration = this.props.onAnimationIteration;

      if (typeof onAnimationIteration === 'function') {
        onAnimationIteration(e);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(e) {
      var onAnimationEnd = this.props.onAnimationEnd;

      if (typeof onAnimationEnd === 'function') {
        onAnimationEnd(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
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
          parent = _this$props.parent,
          style = _this$props.style,
          className = _this$props.className,
          hoverClass = _this$props.hoverClass,
          hoverStopPropagation = _this$props.hoverStopPropagation,
          hoverStartTime = _this$props.hoverStartTime,
          hoverStayTime = _this$props.hoverStayTime;
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", {
        onTouchStart: onTouchStart ? 'onTouchStart' : '',
        onTouchMove: onTouchMove ? 'onTouchMove' : '',
        onTouchCancel: onTouchCancel ? 'onTouchCancel' : '',
        onTouchEnd: onTouchEnd ? 'onTouchEnd' : '',
        onTap: onTap ? 'onTap' : '',
        onLongPress: onLongPress ? 'onLongPress' : '',
        onLongTap: onLongTap ? 'onLongTap' : '',
        onTouchForceChange: onTouchForceChange ? 'onTouchForceChange' : '',
        onTransitionEnd: onTransitionEnd ? 'onTransitionEnd' : '',
        onAnimationStart: onAnimationStart ? 'onAnimationStart' : '',
        onAnimationIteration: onAnimationIteration ? 'onAnimationIteration' : '',
        onAnimationEnd: onAnimationEnd ? 'onAnimationEnd' : '',
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
}(_react_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixView, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  parent: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  hoverClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].string,
  hoverStopPropagation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].bool,
  hoverStartTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number,
  hoverStayTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__["default"].number
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixView, "defaultProps", {
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
  parent: null,
  style: null,
  className: null,
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 50,
  hoverStayTime: 400
});



/***/ }),

/***/ "../remix/src/document/Element.js":
/*!****************************************!*\
  !*** ../remix/src/document/Element.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid/v4 */ "../remix/node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _globalElements__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./globalElements */ "../remix/src/document/globalElements.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./document */ "../remix/src/document/document.js");
/* harmony import */ var _Updater__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Updater */ "../remix/src/document/Updater.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var Element = /*#__PURE__*/function (_Updater) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Element, _Updater);

  var _super = _createSuper(Element);

  function Element() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Element);

    _this = _super.call(this);
    _this.uuid = uuid_v4__WEBPACK_IMPORTED_MODULE_6___default()();
    _this.tagName = null;
    _this.nodeType = null;
    _this.child = null;
    _this["return"] = null;
    _this.lastChild = null;
    _globalElements__WEBPACK_IMPORTED_MODULE_7__["default"][_this.uuid] = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Element, [{
    key: "ownerDocument",
    get: function get() {
      return _document__WEBPACK_IMPORTED_MODULE_8__["default"];
    }
  }]);

  return Element;
}(_Updater__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/document/HTMLBodyElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLBodyElement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLBodyElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./document */ "../remix/src/document/document.js");








function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var HTMLBodyElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLBodyElement, _HTMLElement);

  var _super = _createSuper(HTMLBodyElement);

  function HTMLBodyElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLBodyElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "tagName", _HTMLTypes__WEBPACK_IMPORTED_MODULE_9__["BODY"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "nodeType", _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__["ELEMENT_NODE"]);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HTMLBodyElement, [{
    key: "ownerDocument",
    get: function get() {
      return _document__WEBPACK_IMPORTED_MODULE_10__["default"];
    }
  }]);

  return HTMLBodyElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "../remix/src/document/HTMLButtonElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLButtonElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLButtonElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _components_remix_element_remix_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-button */ "../remix/src/components/remix-element/remix-button/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var HTMLButtonElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLButtonElement, _HTMLElement);

  var _super = _createSuper(HTMLButtonElement);

  function HTMLButtonElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLButtonElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["BUTTON"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLButtonElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLButtonElement, "defaultProps", _components_remix_element_remix_button__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLElement.js":
/*!********************************************!*\
  !*** ../remix/src/document/HTMLElement.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Element */ "../remix/src/document/Element.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




function resolveDefaultProps(defaultProps, unresolvedProps) {
  if (defaultProps) {
    var props = {};

    for (var propName in defaultProps) {
      if (unresolvedProps[propName] === undefined) {
        props[propName] = defaultProps[propName];
      } else {
        props[propName] = unresolvedProps[propName];
      }
    }

    return props;
  }

  return {};
}

var HTMLElement = /*#__PURE__*/function (_Element) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLElement, _Element);

  var _super = _createSuper(HTMLElement);

  function HTMLElement(tagName) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLElement);

    _this = _super.call(this);
    _this.tagName = tagName;
    _this.style = new _StyleSheet__WEBPACK_IMPORTED_MODULE_7__["default"](_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HTMLElement, [{
    key: "appendChild",
    value: function appendChild(child) {
      if (this.child === null) {
        this.child = this.lastChild = child;
      } else {
        this.lastChild.slibing = child;
        this.lastChild = child;
      }

      child.parent = this.uuid;
      child["return"] = this;
      this.onChildChange();
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var node = this.child;
      var prevNode = null;

      while (node) {
        if (child === node) {
          if (node === this.child) {
            this.child = node.slibing;
          } else {
            prevNode.slibing = node.slibing;
          }
        }

        prevNode = node;
        node = node.slibing;
      }

      this.onChildChange();
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, beforeChild) {
      child["return"] = this;
      child.slibing = beforeChild;
      child.parent = this.uuid;

      if (beforeChild === this.child) {
        this.child = child;
      }

      this.onChildChange();
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.proxy[name] = value;
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
    key: "dispatchEvent",
    value: function dispatchEvent(type, id, e) {
      console.log();
    }
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
      element.style = String(element.style);

      if (this.child) {
        element.child = this.child.serialize();
      }

      if (this.slibing) {
        element.slibing = this.slibing.serialize();
      }

      if (this.innerText) {
        element.innerText = this.innerText;
      }

      element.tagName = this.tagName;
      element.uuid = this.uuid;
      element.nodeType = this.nodeType;
      element.parent = this.parent;
      return element;
    }
  }, {
    key: "innerHTML",
    set: function set(innerHTML) {
      throw new Error('Sorry, innerHTML is not be supportted');
    }
  }]);

  return HTMLElement;
}(_Element__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "../remix/src/document/HTMLImageElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLImageElement.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLImageElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-image */ "../remix/src/components/remix-element/remix-image/index.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var HTMLImageElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(HTMLImageElement, _HTMLElement);

  var _super = _createSuper(HTMLImageElement);

  function HTMLImageElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLImageElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__["IMAGE"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__["ELEMENT_NODE"];
    _this.style = new _StyleSheet__WEBPACK_IMPORTED_MODULE_8__["default"]();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HTMLImageElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);

  return HTMLImageElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(HTMLImageElement, "defaultProps", _components_remix_element_remix_image__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLInputElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLInputElement.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixInputElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-input */ "../remix/src/components/remix-element/remix-input/index.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var RemixInputElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixInputElement, _HTMLElement);

  var _super = _createSuper(RemixInputElement);

  function RemixInputElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixInputElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__["INPUT"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__["ELEMENT_NODE"];
    _this.style = new _StyleSheet__WEBPACK_IMPORTED_MODULE_8__["default"]();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixInputElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);

  return RemixInputElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixInputElement, "defaultProps", _components_remix_element_remix_input__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLPickerElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLPickerElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLPickerElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _components_remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-picker */ "../remix/src/components/remix-element/remix-picker/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var HTMLPickerElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLPickerElement, _HTMLElement);

  var _super = _createSuper(HTMLPickerElement);

  function HTMLPickerElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLPickerElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["PICKER"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLPickerElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLPickerElement, "defaultProps", _components_remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLRootElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLRootElement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLViewElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _components_remix_element_remix_root__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/remix-element/remix-root */ "../remix/src/components/remix-element/remix-root/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var HTMLViewElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLViewElement, _HTMLElement);

  var _super = _createSuper(HTMLViewElement);

  function HTMLViewElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLViewElement);

    _this = _super.call(this);
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["ROOT"];
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLViewElement, "defaultProps", _components_remix_element_remix_root__WEBPACK_IMPORTED_MODULE_9__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLSwiperElement.js":
/*!**************************************************!*\
  !*** ../remix/src/document/HTMLSwiperElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLSwiperElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _components_remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-swiper */ "../remix/src/components/remix-element/remix-swiper/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var HTMLSwiperElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLSwiperElement, _HTMLElement);

  var _super = _createSuper(HTMLSwiperElement);

  function HTMLSwiperElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLSwiperElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["SWIPER"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLSwiperElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLSwiperElement, "defaultProps", _components_remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLSwiperItemElement.js":
/*!******************************************************!*\
  !*** ../remix/src/document/HTMLSwiperItemElement.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLSwiperItemElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _components_remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-swiper-item */ "../remix/src/components/remix-element/remix-swiper-item/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var HTMLSwiperItemElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLSwiperItemElement, _HTMLElement);

  var _super = _createSuper(HTMLSwiperItemElement);

  function HTMLSwiperItemElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLSwiperItemElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["SWIPER_ITEM"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLSwiperItemElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLSwiperItemElement, "defaultProps", _components_remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLTextElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLTextElement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLTextElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/remix-element/remix-text */ "../remix/src/components/remix-element/remix-text/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var HTMLTextElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLTextElement, _HTMLElement);

  var _super = _createSuper(HTMLTextElement);

  function HTMLTextElement(textContent) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLTextElement);

    _this = _super.call(this);
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["TEXT"];
    return _this;
  }

  return HTMLTextElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_5__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLTextElement, "defaultProps", _components_remix_element_remix_text__WEBPACK_IMPORTED_MODULE_8__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLTypes.js":
/*!******************************************!*\
  !*** ../remix/src/document/HTMLTypes.js ***!
  \******************************************/
/*! exports provided: IMAGE, BUTTON, MAP, INPUT, VIEW, ROOT, BODY, TEXT, PLAIN_TEXT, PICKER, SWIPER_ITEM, SWIPER, VIDEO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMAGE", function() { return IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUTTON", function() { return BUTTON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAP", function() { return MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INPUT", function() { return INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW", function() { return VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROOT", function() { return ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BODY", function() { return BODY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT", function() { return TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAIN_TEXT", function() { return PLAIN_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PICKER", function() { return PICKER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWIPER_ITEM", function() { return SWIPER_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWIPER", function() { return SWIPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO", function() { return VIDEO; });
var IMAGE = 'image';
var BUTTON = 'button';
var MAP = 'map';
var INPUT = 'input';
var VIEW = 'view';
var ROOT = 'root';
var BODY = 'body';
var TEXT = 'text';
var PLAIN_TEXT = '#text';
var PICKER = 'picker';
var SWIPER_ITEM = 'swiper-item';
var SWIPER = 'swiper';
var VIDEO = 'video';

/***/ }),

/***/ "../remix/src/document/HTMLVideoElement.js":
/*!*************************************************!*\
  !*** ../remix/src/document/HTMLVideoElement.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixVideoElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remix/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-video */ "../remix/src/components/remix-element/remix-video/index.js");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var RemixVideoElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RemixVideoElement, _HTMLElement);

  var _super = _createSuper(RemixVideoElement);

  function RemixVideoElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixVideoElement);

    _this = _super.call(this);
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__["VIDEO"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__["ELEMENT_NODE"];
    _this.style = new _StyleSheet__WEBPACK_IMPORTED_MODULE_8__["default"]();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixVideoElement, [{
    key: "appendChild",
    value: function appendChild(child) {}
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
  }]);

  return RemixVideoElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixVideoElement, "defaultProps", _components_remix_element_remix_video__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/HTMLViewElement.js":
/*!************************************************!*\
  !*** ../remix/src/document/HTMLViewElement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLViewElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _components_remix_element_remix_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/remix-element/remix-view */ "../remix/src/components/remix-element/remix-view/index.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var HTMLViewElement = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTMLViewElement, _HTMLElement);

  var _super = _createSuper(HTMLViewElement);

  function HTMLViewElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLViewElement);

    _this = _super.call(this);
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["VIEW"];
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLViewElement, "defaultProps", _components_remix_element_remix_view__WEBPACK_IMPORTED_MODULE_9__["default"].defaultProps);



/***/ }),

/***/ "../remix/src/document/StyleSheet.js":
/*!*******************************************!*\
  !*** ../remix/src/document/StyleSheet.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);


var getOwnPropertyNames = Object.getOwnPropertyNames;
var properties = {
  alignContent: 'align-content',
  alignItems: 'align-items',
  alignSelf: 'align-self',
  all: 'all',
  animation: 'animation',
  animationDelay: 'animation-delay',
  animationDirection: 'animation-direction',
  animationDuration: 'animation-duration',
  animationFillMode: 'animation-fill-mode',
  animationIterationCount: 'animation-iteration-count',
  animationName: 'animation-name',
  animationPlayState: 'animation-play-state',
  animationTimingFunction: 'animation-timing-function',
  appearance: 'appearance',
  backfaceVisibility: 'backface-visibility',
  background: 'background',
  backgroundAttachment: 'background-attachment',
  backgroundBlendMode: 'background-blend-mode',
  backgroundClip: 'background-clip',
  backgroundColor: 'background-color',
  backgroundImage: 'background-image',
  backgroundOrigin: 'background-origin',
  backgroundPosition: 'background-position',
  backgroundRepeat: 'background-repeat',
  backgroundSize: 'background-size',
  border: 'border',
  borderBottom: 'border-bottom',
  borderBottomColor: 'border-bottom-color',
  borderBottomLeftRadius: 'border-bottom-left-radius',
  borderBottomRightRadius: 'border-bottom-right-radius',
  borderBottomStyle: 'border-bottom-style',
  borderBottomWidth: 'border-bottom-width',
  borderCollapse: 'border-collapse',
  borderColor: 'border-color',
  borderImage: 'border-image',
  borderImageOutset: 'border-image-outset',
  borderImageRepeat: 'border-image-repeat',
  borderImageSlice: 'border-image-slice',
  borderImageSource: 'border-image-source',
  borderImageWidth: 'border-image-width',
  borderLeft: 'border-left',
  borderLeftColor: 'border-left-color',
  borderLeftStyle: 'border-left-style',
  borderLeftWidth: 'border-left-width',
  borderRadius: 'border-radius',
  borderRight: 'border-right',
  borderRightColor: 'border-right-color',
  borderRightStyle: 'border-right-style',
  borderRightWidth: 'border-right-width',
  borderSpacing: 'border-spacing',
  borderStyle: 'border-style',
  borderTop: 'border-top',
  borderTopColor: 'border-top-color',
  borderTopLeftRadius: 'border-top-left-radius',
  borderTopRightRadius: 'border-top-right-radius',
  borderTopStyle: 'border-top-style',
  borderTopWidth: 'border-top-width',
  borderWidth: 'border-width',
  bottom: 'bottom',
  boxAlign: 'box-align',
  boxDirection: 'box-direction',
  boxFlex: 'box-flex',
  boxFlexGroup: 'box-flex-group',
  boxLines: 'box-lines',
  boxOrdinalGroup: 'box-ordinal-group',
  boxOrient: 'box-orient',
  boxPack: 'box-pack',
  boxShadow: 'box-shadow',
  boxSizing: 'box-sizing',
  captionSide: 'caption-side',
  clear: 'clear',
  clip: 'clip',
  color: 'color',
  columnCount: 'column-count',
  columnFill: 'column-fill',
  columnGap: 'column-gap',
  columnRule: 'column-rule',
  columnRuleColor: 'column-rule-color',
  columnRuleStyle: 'column-rule-style',
  columnRuleWidth: 'column-rule-width',
  columnSpan: 'column-span',
  columnWidth: 'column-width',
  columns: 'columns',
  content: 'content',
  counterIncrement: 'counter-increment',
  counterReset: 'counter-reset',
  cursor: 'cursor',
  direction: 'direction',
  display: 'display',
  emptyCells: 'empty-cells',
  filter: 'filter',
  flex: 'flex',
  flexBasis: 'flex-basis',
  flexDirection: 'flex-direction',
  flexFlow: 'flex-flow',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexWrap: 'flex-wrap',
  "float": 'float',
  font: 'font',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  gridColumns: 'grid-columns',
  gridRows: 'grid-rows',
  hangingPunctuation: 'hanging-punctuation',
  height: 'height',
  icon: 'icon',
  justifyContent: 'justify-content',
  left: 'left',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
  listStyle: 'list-style',
  listStyleImage: 'list-style-image',
  listStylePosition: 'list-style-position',
  listStyleType: 'list-style-type',
  margin: 'margin',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
  marginRight: 'margin-right',
  marginTop: 'margin-top',
  maxHeight: 'max-height',
  maxWidth: 'max-width',
  minHeight: 'min-height',
  minWidth: 'min-width',
  navDown: 'nav-down',
  navIndex: 'nav-index',
  navLeft: 'nav-left',
  navRight: 'nav-right',
  navUp: 'nav-up',
  opacity: 'opacity',
  order: 'order',
  outline: 'outline',
  outlineColor: 'outline-color',
  outlineOffset: 'outline-offset',
  outlineStyle: 'outline-style',
  outlineWidth: 'outline-width',
  overflow: 'overflow',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  padding: 'padding',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  paddingRight: 'padding-right',
  paddingTop: 'padding-top',
  pageBreakAfter: 'page-break-after',
  pageBreakBefore: 'page-break-before',
  pageBreakInside: 'page-break-inside',
  perspective: 'perspective',
  perspectiveOrigin: 'perspective-origin',
  position: 'position',
  punctuationTrim: 'punctuation-trim',
  quotes: 'quotes',
  resize: 'resize',
  right: 'right',
  rotation: 'rotation',
  tabSize: 'tab-size',
  tableLayout: 'table-layout',
  target: 'target',
  targetName: 'target-name',
  targetNew: 'target-new',
  targetPosition: 'target-position',
  textAlign: 'text-align',
  textAlignLast: 'text-align-last',
  textDecoration: 'text-decoration',
  textDecorationColor: 'text-decoration-color',
  textDecorationLine: 'text-decoration-line',
  textDecorationStyle: 'text-decoration-style',
  textIndent: 'text-indent',
  textJustify: 'text-justify',
  textOutline: 'text-outline',
  textOverflow: 'text-overflow',
  textShadow: 'text-shadow',
  textTransform: 'text-transform',
  textWrap: 'text-wrap',
  top: 'top',
  transform: 'transform',
  transformOrigin: 'transform-origin',
  transformStyle: 'transform-style',
  transition: 'transition',
  transitionDelay: 'transition-delay',
  transitionDuration: 'transition-duration',
  transitionProperty: 'transition-property',
  transitionTimingFunction: 'transition-timing-function',
  unicodeBidi: 'unicode-bidi',
  verticalAlign: 'vertical-align',
  visibility: 'visibility',
  whiteSpace: 'white-space',
  width: 'width',
  wordBreak: 'word-break',
  wordSpacing: 'word-spacing',
  wordWrap: 'word-wrap',
  zIndex: 'z-index',
  writingMode: 'writing-mode'
};

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(host) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, StyleSheet);

    this.sheet = {};
    this.isChanged = false;
    this.host = host;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(StyleSheet, [{
    key: "update",
    value: function update(propName, key, value) {
      var sheet = this.sheet;
      var data = sheet[key] || (sheet[key] = [properties[key], value]);

      if (data[1] !== value) {
        data[1] = value;
        this.host.binding();
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      var names = getOwnPropertyNames(this.sheet);
      return names.map(function (name) {
        var value = _this.sheet[name];
        return value.join(':');
      }).join(';');
    }
  }]);

  return StyleSheet;
}();

/* harmony default export */ __webpack_exports__["default"] = (function (host) {
  var style = new StyleSheet(host);
  return new Proxy(style, {
    get: function get(target, key) {
      return target[key];
    },
    set: function set(target, key, value) {
      if (properties[key]) {
        style.update(properties[key], key, value);
      }

      return true;
    }
  });
});

/***/ }),

/***/ "../remix/src/document/Updater.js":
/*!****************************************!*\
  !*** ../remix/src/document/Updater.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Updater; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);


var STYLE = 'style',
    CHILD = 'child';

var Updater = function Updater() {
  var _this = this;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Updater);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "setter", function (target, propName, value) {
    if (_this[propName] !== value) {
      _this[propName] = value;

      if (propName === STYLE) {
        _this.onStyleChange(propName, value);
      } else if (propName === CHILD) {
        _this.onChildChange(propName, value);
      } else {
        _this.onDefaultChange(propName, value);
      }
    }

    return true;
  });

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "onDefaultChange", function (propName, value) {
    if (_this.binding) {
      _this.binding();
    }
  });

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "onChildChange", function (propName, value) {
    console.log(_this.binding);

    if (_this.binding) {
      _this.binding();
    }
  });

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "onStyleChange", function (propName, value) {
    if (_this.binding) {
      _this.binding();
    }
  });

  this.proxy = new Proxy(this, {
    set: this.setter
  });
};



/***/ }),

/***/ "../remix/src/document/createContainer.js":
/*!************************************************!*\
  !*** ../remix/src/document/createContainer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createContainer; });
function createContainer() {}

/***/ }),

/***/ "../remix/src/document/createElement.js":
/*!**********************************************!*\
  !*** ../remix/src/document/createElement.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLElement */ "../remix/src/document/HTMLElement.js");
/* harmony import */ var _HTMLImageElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HTMLImageElement */ "../remix/src/document/HTMLImageElement.js");
/* harmony import */ var _HTMLButtonElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HTMLButtonElement */ "../remix/src/document/HTMLButtonElement.js");
/* harmony import */ var _HTMLViewElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HTMLViewElement */ "../remix/src/document/HTMLViewElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTextElement */ "../remix/src/document/HTMLTextElement.js");
/* harmony import */ var _HTMLPickerElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLPickerElement */ "../remix/src/document/HTMLPickerElement.js");
/* harmony import */ var _HTMLSwiperItemElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLSwiperItemElement */ "../remix/src/document/HTMLSwiperItemElement.js");
/* harmony import */ var _HTMLSwiperElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLSwiperElement */ "../remix/src/document/HTMLSwiperElement.js");
/* harmony import */ var _HTMLRootElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLRootElement */ "../remix/src/document/HTMLRootElement.js");
/* harmony import */ var _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HTMLVideoElement */ "../remix/src/document/HTMLVideoElement.js");
/* harmony import */ var _HTMLInputElement__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./HTMLInputElement */ "../remix/src/document/HTMLInputElement.js");













function createElement(tagName) {
  var element;

  switch (tagName) {
    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["ROOT"]:
      {
        return new _HTMLRootElement__WEBPACK_IMPORTED_MODULE_10__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["INPUT"]:
      {
        return new _HTMLInputElement__WEBPACK_IMPORTED_MODULE_12__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["IMAGE"]:
      {
        return new _HTMLImageElement__WEBPACK_IMPORTED_MODULE_3__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["BUTTON"]:
      {
        return new _HTMLButtonElement__WEBPACK_IMPORTED_MODULE_4__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["VIEW"]:
      {
        return new _HTMLViewElement__WEBPACK_IMPORTED_MODULE_5__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["TEXT"]:
      {
        return new _HTMLTextElement__WEBPACK_IMPORTED_MODULE_6__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["PICKER"]:
      {
        return new _HTMLPickerElement__WEBPACK_IMPORTED_MODULE_7__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["SWIPER_ITEM"]:
      {
        return new _HTMLSwiperItemElement__WEBPACK_IMPORTED_MODULE_8__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["SWIPER"]:
      {
        return new _HTMLSwiperElement__WEBPACK_IMPORTED_MODULE_9__["default"]();
      }

    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["VIDEO"]:
      {
        return new _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_11__["default"]();
      }

    default:
      {
        return new _HTMLElement__WEBPACK_IMPORTED_MODULE_2__["default"](tagName);
      }
  }
}

/***/ }),

/***/ "../remix/src/document/createTextNode.js":
/*!***********************************************!*\
  !*** ../remix/src/document/createTextNode.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTextNode; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLTypes */ "../remix/src/document/HTMLTypes.js");



function createTextNode(text) {
  return {
    nodeType: _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__["TEXT_NODE"],
    tagName: _HTMLTypes__WEBPACK_IMPORTED_MODULE_2__["PLAIN_TEXT"],
    text: text,
    serialize: function serialize() {
      var element = {
        tagName: this.tagName,
        text: this.text
      };

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      return element;
    }
  };
}

/***/ }),

/***/ "../remix/src/document/document.js":
/*!*****************************************!*\
  !*** ../remix/src/document/document.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLBodyElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLBodyElement */ "../remix/src/document/HTMLBodyElement.js");
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ "../remix/src/document/createElement.js");
/* harmony import */ var _createTextNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTextNode */ "../remix/src/document/createTextNode.js");
/* harmony import */ var _createContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createContainer */ "../remix/src/document/createContainer.js");
/* harmony import */ var _globalElements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./globalElements */ "../remix/src/document/globalElements.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../env */ "../remix/env.js");






var fakeDocument = {
  findElement: function findElement(uuid) {
    return _globalElements__WEBPACK_IMPORTED_MODULE_4__["default"][uuid];
  },
  getContainerElements: function getContainerElements(container) {
    return container.serialize();
  },
  body: new _HTMLBodyElement__WEBPACK_IMPORTED_MODULE_0__["default"](),
  getElementById: function getElementById(id) {
    return Object(_createContainer__WEBPACK_IMPORTED_MODULE_3__["default"])('container');
  },
  getElementsByTagName: function getElementsByTagName() {},
  querySelector: function querySelector() {},
  dispatchEvent: function dispatchEvent() {},
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_1__["default"],
  createTextNode: _createTextNode__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (fakeDocument); // export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;

/***/ }),

/***/ "../remix/src/document/globalElements.js":
/*!***********************************************!*\
  !*** ../remix/src/document/globalElements.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "../remix/src/document/index.js":
/*!**************************************!*\
  !*** ../remix/src/document/index.js ***!
  \**************************************/
/*! exports provided: document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "../remix/src/document/document.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "document", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "../remix/src/project/Program.js":
/*!***************************************!*\
  !*** ../remix/src/project/Program.js ***!
  \***************************************/
/*! exports provided: getApplication, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return getApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Program; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer */ "../remix/src/renderer/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components */ "../remix/src/components/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../router */ "../remix/src/router/index.js");
/* harmony import */ var _runtime_terminal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./runtime/terminal */ "../remix/src/project/runtime/terminal/index.js");
/* harmony import */ var _runtime_logic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./runtime/logic */ "../remix/src/project/runtime/logic/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../env */ "../remix/env.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var TabBarItem = _components__WEBPACK_IMPORTED_MODULE_5__["TabBar"].TabBarItem;
var getApplication = function getApplication() {
  return Program.context;
};

var Program = /*#__PURE__*/function () {
  function Program(App, container) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Program);

    Program.context = this;
    Object.defineProperty(this, 'context', {
      get: function get() {
        if (this.__context__) {
          return this.__context__;
        }

        var context = this.__context__ = {
          tabBar: {
            items: []
          },
          router: {
            routes: []
          },
          config: {}
        };
        _renderer__WEBPACK_IMPORTED_MODULE_4__["default"].render(_react__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(App), container);
        var rootContainer = container._reactRootContainer;
        var currentFiber = rootContainer.internalRoot.workInProgress;
        var node = currentFiber;

        while (true) {
          switch (node.elementType) {
            case _components__WEBPACK_IMPORTED_MODULE_5__["Application"]:
              {
                context.config = node.memoizedProps.config;
                this.instance = node.stateNode;
                break;
              }

            case _router__WEBPACK_IMPORTED_MODULE_6__["Route"]:
              {
                context.router.routes.push({
                  path: node.memoizedProps.path,
                  component: node.memoizedProps.component
                });
                break;
              }

            case _components__WEBPACK_IMPORTED_MODULE_5__["TabBar"]:
              {
                context.tabBar = _objectSpread({}, node.memoizedProps, {}, context.tabBar);
                break;
              }

            case TabBarItem:
              {
                context.tabBar.items.push({
                  icon: node.memoizedProps.icon,
                  selectedIcon: node.memoizedProps.selectedIcon,
                  path: node.memoizedProps.path,
                  text: node.memoizedProps.children
                });
                break;
              }
          }

          if (node.child) {
            node = node.child;
            continue;
          }

          while (!node.sibling) {
            if (node["return"]) {
              return context;
            }

            node = node["return"];
          }

          node = node.sibling;
        }
      }
    });
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Program, [{
    key: "start",
    value: function start() {
      if (_env__WEBPACK_IMPORTED_MODULE_9__["default"].isDevToolRuntime) {
        devtool(this.context, this.instance);
      } else {
        Object(_runtime_terminal__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context, this.instance);
      }
    }
  }]);

  return Program;
}();



/***/ }),

/***/ "../remix/src/project/View.js":
/*!************************************!*\
  !*** ../remix/src/project/View.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _runtime_transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runtime/transports */ "../remix/src/project/runtime/transports/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../env */ "../remix/env.js");








var ViewController = /*#__PURE__*/function () {
  function ViewController(route) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewController);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onLoad", function (instance, query) {
      _this.instance = instance;
      _this.query = query;
      console.log("[View] onLoad(".concat(_this.route, ")"));

      if (_env__WEBPACK_IMPORTED_MODULE_6__["default"].isApplicationLaunched) {
        _this.onLaunch(_env__WEBPACK_IMPORTED_MODULE_6__["default"].applicationLaunchedOptions);
      } else {
        _runtime_transports__WEBPACK_IMPORTED_MODULE_5__["default"].app.on('launch', _this.onLaunch);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onLaunch", function (_ref) {
      var path = _ref.path;
      _runtime_transports__WEBPACK_IMPORTED_MODULE_5__["default"].view.load({
        id: _this.id,
        query: _this.query,
        route: _this.route
      }, function (element) {
        _this.instance.setData({
          element: element
        });
      });
    });

    this.route = route;
    this.id = uuid__WEBPACK_IMPORTED_MODULE_3___default.a.v4();
    this.init();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewController, [{
    key: "init",
    value: function init() {
      var ctrl = this;

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(Page)) {
        Page({
          data: {
            element: null
          },
          onLoad: function onLoad(query) {
            ctrl.onLoad(this, query);
          },
          onShow: function onShow() {},
          onHide: function onHide() {},
          onUnload: function onUnload() {},
          onPullDownRefresh: function onPullDownRefresh() {},
          onShareAppMessage: function onShareAppMessage(options) {
            return _runtime_transports__WEBPACK_IMPORTED_MODULE_5__["default"].view.shareMessage(options);
          }
        });
      }
    }
  }]);

  return ViewController;
}();



/***/ }),

/***/ "../remix/src/project/index.js":
/*!*************************************!*\
  !*** ../remix/src/project/index.js ***!
  \*************************************/
/*! exports provided: Program, View, getApplication, transports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Program */ "../remix/src/project/Program.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _Program__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "../remix/src/project/View.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _View__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _runtime_terminal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime/terminal */ "../remix/src/project/runtime/terminal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _runtime_terminal__WEBPACK_IMPORTED_MODULE_2__["transports"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return _Program__WEBPACK_IMPORTED_MODULE_0__["getApplication"]; });







/***/ }),

/***/ "../remix/src/project/notification/index.js":
/*!**************************************************!*\
  !*** ../remix/src/project/notification/index.js ***!
  \**************************************************/
/*! exports provided: APPLICATION, VIEW, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! events */ "../remix-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "../remix/src/project/notification/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "APPLICATION", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VIEW", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["VIEW"]; });







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var Transport = /*#__PURE__*/function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Transport, _EventEmitter);

  var _super = _createSuper(Transport);

  function Transport() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Transport);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Transport, [{
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

          _this.post(_types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"].LAUNCH, argv);
        },
        show: function show() {
          for (var _len2 = arguments.length, argv = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            argv[_key2] = arguments[_key2];
          }

          _this.post(_types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"].SHOW, argv);
        },
        hide: function hide() {
          for (var _len3 = arguments.length, argv = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            argv[_key3] = arguments[_key3];
          }

          this.post(_types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"].HIDE, argv);
        },
        error: function error() {
          for (var _len4 = arguments.length, argv = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            argv[_key4] = arguments[_key4];
          }

          this.post(_types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"].ERROR, argv);
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

          this.post(_types__WEBPACK_IMPORTED_MODULE_6__["VIEW"].LOAD, argv);
        }
      };
    }
  }]);

  return Transport;
}(events__WEBPACK_IMPORTED_MODULE_5___default.a);


/* harmony default export */ __webpack_exports__["default"] = (new Transport());

/***/ }),

/***/ "../remix/src/project/notification/types.js":
/*!**************************************************!*\
  !*** ../remix/src/project/notification/types.js ***!
  \**************************************************/
/*! exports provided: APPLICATION, VIEW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPLICATION", function() { return APPLICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW", function() { return VIEW; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);




var Type = /*#__PURE__*/function () {
  function Type(value) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Type);

    this.value = value;
    this.uuid = uuid__WEBPACK_IMPORTED_MODULE_2___default.a.v4();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Type, [{
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
var VIEW = defineNotificationTypes({
  LOAD: 'view.load'
});

/***/ }),

/***/ "../remix/src/project/runtime/ViewController.js":
/*!******************************************************!*\
  !*** ../remix/src/project/runtime/ViewController.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../document */ "../remix/src/document/index.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react */ "../remix/src/react/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components */ "../remix/src/components/index.js");






var ViewController = /*#__PURE__*/function () {
  function ViewController(id, route) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewController);

    this.id = id;
    this.route = route;
    this.container = _document__WEBPACK_IMPORTED_MODULE_2__["document"].createElement('root');
    _document__WEBPACK_IMPORTED_MODULE_2__["document"].body.appendChild(this.container);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewController, [{
    key: "onLoad",
    value: function onLoad(query, callback) {
      var _this$route = this.route,
          component = _this$route.component,
          r = _this$route.render; // const rendered = render(
      //   createElement(() => 
      //     <View className="root">{createElement(component || r)}</View>
      //   ),
      //   this.container
      // );

      var rendered = Object(_react__WEBPACK_IMPORTED_MODULE_3__["render"])(Object(_react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(component || r), this.container);
      var elements = _document__WEBPACK_IMPORTED_MODULE_2__["document"].getContainerElements(this.container);
      console.log(elements); // elements.onTouchStart = 'onTouchStart';

      elements.onTap = 'onTap';
      callback(elements);
    }
  }, {
    key: "onReady",
    value: function onReady() {}
  }]);

  return ViewController;
}();



/***/ }),

/***/ "../remix/src/project/runtime/ViewEventManger.js":
/*!*******************************************************!*\
  !*** ../remix/src/project/runtime/ViewEventManger.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewEventManager; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewController */ "../remix/src/project/runtime/ViewController.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react */ "../remix/src/react/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../document */ "../remix/src/document/index.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/createElement */ "../remix/src/react/createElement.js");
/* harmony import */ var _document_HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../document/HTMLTypes */ "../remix/src/document/HTMLTypes.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports */ "../remix/src/project/runtime/transports/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");











var bubbleEvent = ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'tap', 'longpress', 'longtap', 'touchforcechange', 'transitionend', 'animationstart', 'animationiteration', 'animationend'];

var EventObject = /*#__PURE__*/function () {
  function EventObject(event) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventObject);

    this.__original_event__ = event;
    var type = event.type,
        detail = event.detail,
        touches = event.touches,
        timeStamp = event.timeStamp,
        changedTouches = event.changedTouches;
    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = bubbleEvent.includes(this.type);
    this.cancelBubble = false;
    this.detail = detail;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventObject, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.cancelBubble = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {}
  }]);

  return EventObject;
}();

var ViewEventManager = /*#__PURE__*/function () {
  function ViewEventManager(context) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ViewEventManager);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "onDispatch", function (type, uuid, parentId, e) {
      var timeStamp = e.timeStamp,
          target = e.target;
      var id = e.target.id;
      var element = _document__WEBPACK_IMPORTED_MODULE_5__["document"].findElement(id);

      if (_this.events[timeStamp]) {
        if (element.tagName === _document_HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["ROOT"]) {
          delete _this.events[timeStamp];
        }
      } else {
        if (element.tagName !== _document_HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["ROOT"]) {
          var event = _this.events[timeStamp] = new EventObject(e);
          var _id = e.currentTarget.id;
          event.target = element;
          event.currentTarget = _document__WEBPACK_IMPORTED_MODULE_5__["document"].findElement(_id);
          var node = element;

          if (event.bubbles) {
            while (node && node.tagName !== _document_HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["ROOT"]) {
              event.target = node;

              _this.callElementMethod(node, type, event);

              if (event.cancelBubble) {
                break;
              }

              node = node["return"];
            }
          } else {
            _this.callElementMethod(node, type, event);
          }
        }
      }
    });

    this.context = context;
    this.events = {};
    _transports__WEBPACK_IMPORTED_MODULE_8__["default"].view.onDispatch(this.onDispatch);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ViewEventManager, [{
    key: "callElementMethod",
    value: function callElementMethod(element, type, event) {
      var fiber = element[_shared__WEBPACK_IMPORTED_MODULE_10__["INTERNAL_INSTANCE_KEY"]];

      if (fiber["return"]) {
        var stateNode = fiber["return"].stateNode;

        if (stateNode.isReactComponent) {
          if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(stateNode[type])) {
            stateNode[type](event);
          }
        }
      }
    }
  }]);

  return ViewEventManager;
}();



/***/ }),

/***/ "../remix/src/project/runtime/ViewManager.js":
/*!***************************************************!*\
  !*** ../remix/src/project/runtime/ViewManager.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewManager; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewController */ "../remix/src/project/runtime/ViewController.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react */ "../remix/src/react/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../document */ "../remix/src/document/index.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../react/createElement */ "../remix/src/react/createElement.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports */ "../remix/src/project/runtime/transports/index.js");









var lifecycleTypes = {
  ATTACHED: 'attached',
  DETACHED: 'detached'
};

var ViewManager = /*#__PURE__*/function () {
  function ViewManager(context) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewManager);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onLifecycle", function (type, id, parentId, view) {
      switch (type) {
        case lifecycleTypes.ATTACHED:
          {
            _this.views[id] = view;
            var element = _document__WEBPACK_IMPORTED_MODULE_5__["document"].findElement(id);
            console.log(element.className, id);

            if (element) {
              // console.log(element, id);
              element.binding = function () {
                var uuid = element["return"].uuid;
                var child = element["return"].serialize();
                var view = _this.views[uuid];

                if (view) {
                  view.postMessage(child);
                }
              };
            }

            break;
          }

        case lifecycleTypes.DETACHED:
          {
            _this.views[id] = null;

            var _element = _document__WEBPACK_IMPORTED_MODULE_5__["document"].findElement(id);

            if (_element) {
              _element.binding = null;
            }

            break;
          }
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onReady", function () {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onLoad", function (_ref, callback) {
      var id = _ref.id,
          route = _ref.route,
          query = _ref.query;
      var viewController = _this.viewControllers[id];

      if (viewController) {
        viewController.onLoad(query, callback);
      } else {
        var r = _this.routes[route];

        if (r) {
          _this.viewControllers[id] = viewController = new _ViewController__WEBPACK_IMPORTED_MODULE_3__["default"](id, r);
          viewController.onLoad(query, callback);
        } else {
          logger.red("Can not find route!");
        }
      }
    });

    this.context = context;
    this.viewControllers = {};
    this.views = {};
    _transports__WEBPACK_IMPORTED_MODULE_8__["default"].view.onLoad(this.onLoad);
    _transports__WEBPACK_IMPORTED_MODULE_8__["default"].view.onReady(this.onReady);
    _transports__WEBPACK_IMPORTED_MODULE_8__["default"].view.onLifecycle(this.onLifecycle);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewManager, [{
    key: "routes",
    get: function get() {
      if (this.__routes__) {
        return this.__routes__;
      }

      var routes = this.__routes__ = {};
      var router = this.context.router;
      router.routes.forEach(function (r) {
        routes[r.path] = r;
      });
      return routes;
    }
  }]);

  return ViewManager;
}();



/***/ }),

/***/ "../remix/src/project/runtime/logic/index.js":
/*!***************************************************!*\
  !*** ../remix/src/project/runtime/logic/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qs */ "../remix/node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transports */ "../remix/src/project/runtime/transports/index.js");
/* harmony import */ var _ViewManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ViewManager */ "../remix/src/project/runtime/ViewManager.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../env */ "../remix/env.js");










var LogicRuntime = /*#__PURE__*/function () {
  function LogicRuntime(context, instance) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LogicRuntime);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onApplicationDisconnected", function () {
      top.postMessage({
        code: 'DISCONNECTED'
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onApplicationLaunch", function (options) {
      var props = _this.instance.props;

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(props.onLaunch)) {
        props.onLaunch(options);
      }
    });

    this.id = uuid__WEBPACK_IMPORTED_MODULE_3___default.a.v4();
    this.context = context;
    this.instance = instance;
    this.viewManager = new _ViewManager__WEBPACK_IMPORTED_MODULE_6__["default"](context);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].app.onLaunch(this.onApplicationLaunch);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].app.onDisconnect(this.onApplicationDisconnected);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LogicRuntime, [{
    key: "run",
    value: function run() {
      var search = location.search.slice(1);
      var query = qs__WEBPACK_IMPORTED_MODULE_4___default.a.parse(search);
      _transports__WEBPACK_IMPORTED_MODULE_5__["default"].app.connect(query.id, function (code) {
        if (code === 'NO_EXIST') {}
      });
    }
  }]);

  return LogicRuntime;
}();

/* harmony default export */ __webpack_exports__["default"] = (function (context, instance) {
  var logic = new LogicRuntime(context, instance);
  logic.run();
});

/***/ }),

/***/ "../remix/src/project/runtime/terminal/NativeRuntime.js":
/*!**************************************************************!*\
  !*** ../remix/src/project/runtime/terminal/NativeRuntime.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NativeRuntime; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remix/node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transports */ "../remix/src/project/runtime/transports/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../env */ "../remix/env.js");
/* harmony import */ var _NativeSocket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NativeSocket */ "../remix/src/project/runtime/terminal/NativeSocket.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var NativeRuntime = /*#__PURE__*/function () {
  function NativeRuntime() {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, NativeRuntime);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onShowTabBar", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.APIRequst('showTabBar', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onHideabBar", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this.APIRequst('hideTabBar', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onRequest", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _this.APIRequst('request', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onNavigateTo", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.APIRequst('navigateTo', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onNavigateBack", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _this.APIRequst('navigateBack', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onSetStorage", function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _this.APIRequst('setStorage', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onGetStorage", function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _this.APIRequst('getStorage', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onRemoveStorage", function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _this.APIRequst('removeStorage', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onClearStorage", function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return _this.APIRequst('clearStorage', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onGetStorageInfo", function () {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return _this.APIRequst('getStorageInfo', args);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onSetStorageSync", function () {
      var _wx;

      return (_wx = wx).setStorageSync.apply(_wx, arguments);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onGetStorageSync", function () {
      var _ref;

      var callback = (_ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref]);

      if (typeof callback === 'function') {
        var _wx2;

        callback((_wx2 = wx).getStorageSync.apply(_wx2, arguments));
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onRemoveStorageSync", function () {
      var _wx3;

      return (_wx3 = wx).removeStorageSync.apply(_wx3, arguments);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onClearStorageSync", function () {
      var _wx4;

      return (_wx4 = wx).clearStorageSync.apply(_wx4, arguments);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onGetStorageInfoSync", function () {
      var _ref2;

      var callback = (_ref2 = arguments.length - 1, _ref2 < 0 || arguments.length <= _ref2 ? undefined : arguments[_ref2]);

      if (typeof callback === 'function') {
        var _wx5;

        callback((_wx5 = wx).getStorageInfoSync.apply(_wx5, arguments));
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onLogin", function (options, callback) {
      wx.login(_objectSpread({}, options, {
        complete: function complete(res) {
          callback(res);
        }
      }));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "onConnectSocket", function (id, options, callback) {
      return _env__WEBPACK_IMPORTED_MODULE_6__["default"].isInspectMode ? Object(_NativeSocket__WEBPACK_IMPORTED_MODULE_7__["default"])(_transports__WEBPACK_IMPORTED_MODULE_5__["default"].api, id, options, callback) : _this.APIRequst('connectSocket', options, callback);
    });

    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].LOGIN, this.onLogin);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].REQUEST, this.onRequest);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].NAVIGATE_TO, this.onNavigateTo);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].NAVIGATE_BACK, this.onNavigateBack);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].CONNECT_SOCKET, this.onConnectSocket);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].GET_STORAGE, this.onGetStorage);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].SET_STORAGE, this.onSetStorage);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].GET_STORAGE_INFO, this.onGetStorageInfo);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].GET_STORAGE_INFO_SYNC, this.onGetStorageInfoSync);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].GET_STORAGE_SYNC, this.onGetStorageSync);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].SET_STORAGE_SYNC, this.onSetStorageSync);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].REMOVE_STORAGE, this.onRemoveStorage);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].CLEAaR_STORAGE, this.onClearStorage);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].REMOVE_STORAGE_SYNC, this.onRemoveStorageSync);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].CLEAaR_STORAGE_SYNC, this.onClearStorageSync);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].SHOW_TABBAR, this.onShowTabBar);
    _transports__WEBPACK_IMPORTED_MODULE_5__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_5__["API"].HIDE_TABBAR, this.onHideabBar);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(NativeRuntime, [{
    key: "APIRequst",
    value: function APIRequst(api, args) {
      var _args = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(args, 2),
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



/***/ }),

/***/ "../remix/src/project/runtime/terminal/NativeSocket.js":
/*!*************************************************************!*\
  !*** ../remix/src/project/runtime/terminal/NativeSocket.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createNativeSocket; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transports */ "../remix/src/project/runtime/transports/index.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var NativeSocket = /*#__PURE__*/function () {
  function NativeSocket(transport) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NativeSocket);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onMessage", function (id, message) {
      if (id === _this.id) {
        _this.socket.send(message);
      }
    });

    this.transport = transport;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(NativeSocket, [{
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
          type: _transports__WEBPACK_IMPORTED_MODULE_4__["API"].SOCKET_OPEN,
          argv: [_this2.id]
        });
      });
      socket.onMessage(function (data) {
        debugger;

        _this2.transport.reply({
          type: _transports__WEBPACK_IMPORTED_MODULE_4__["API"].SOCKET_MESSAGE,
          argv: [_this2.id, data]
        });
      });
      socket.onClose(function () {
        _this2.transport.off(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].SOCKET_MESSAGE);
      });
      this.socket = socket;
      this.transport.on(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].SOCKET_MESSAGE, this.onMessage);
    }
  }]);

  return NativeSocket;
}();

function createNativeSocket(transport, id, options, callback) {
  var socket = new NativeSocket(transport);
  return socket.connect(id, options, callback);
}

/***/ }),

/***/ "../remix/src/project/runtime/terminal/index.js":
/*!******************************************************!*\
  !*** ../remix/src/project/runtime/terminal/index.js ***!
  \******************************************************/
/*! exports provided: transports, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../transports */ "../remix/src/project/runtime/transports/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _transports__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _ViewManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ViewManager */ "../remix/src/project/runtime/ViewManager.js");
/* harmony import */ var _ViewEventManger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ViewEventManger */ "../remix/src/project/runtime/ViewEventManger.js");
/* harmony import */ var _NativeRuntime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NativeRuntime */ "../remix/src/project/runtime/terminal/NativeRuntime.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../env */ "../remix/env.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var remixjs_message_protocol__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");
/* empty/unused harmony star reexport */







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var TerminalRuntime = /*#__PURE__*/function (_NativeRuntime) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(TerminalRuntime, _NativeRuntime);

  var _super = _createSuper(TerminalRuntime);

  function TerminalRuntime(context, instance) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TerminalRuntime);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onApplicationLaunch", function (options) {
      var props = _this.instance.props;

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_13__["isFunction"])(props.onLaunch)) {
        props.onLaunch(options);
      }
    });

    _this.instance = instance;
    _this.context = context;
    _this.options = null;
    _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.onLaunch(_this.onApplicationLaunch);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TerminalRuntime, [{
    key: "inspect",
    value: function inspect(callback) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.inspect(function () {
          resolve();
        });
        _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.on('reLaunch', function () {
          wx.reLaunch({
            url: "/".concat(_this2.options.path)
          });
          _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.on('reConnect', function () {
            wx.showTabBar();
            wx.hideLoading();
            _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.emit('launch', _this2.options);
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
              _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.launch(options);
              _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.emit('launch', options);
              ctrl.options = options;
              _env__WEBPACK_IMPORTED_MODULE_12__["default"].isApplicationLaunched = true;
              _env__WEBPACK_IMPORTED_MODULE_12__["default"].applicationLaunchedOptions = options;
            },
            onError: function onError(e) {
              _transports__WEBPACK_IMPORTED_MODULE_8__["default"].app.error(e);
            }
          });
        }
      };

      if (_env__WEBPACK_IMPORTED_MODULE_12__["default"].isInspectMode) {
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
}(_NativeRuntime__WEBPACK_IMPORTED_MODULE_11__["default"]);

;


/* harmony default export */ __webpack_exports__["default"] = (function (context, instance) {
  var runtime = new TerminalRuntime(context, instance);
  var viewManager = new _ViewManager__WEBPACK_IMPORTED_MODULE_9__["default"](context);
  var viewEventManager = new _ViewEventManger__WEBPACK_IMPORTED_MODULE_10__["default"](context);
  runtime.run();
});
;

/***/ }),

/***/ "../remix/src/project/runtime/transports/APITransport.js":
/*!***************************************************************!*\
  !*** ../remix/src/project/runtime/transports/APITransport.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APITransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Classes_LogicSocket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Classes/LogicSocket */ "../remix/src/project/runtime/transports/Classes/LogicSocket.js");









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(APITransport, _Tunnel);

  var _super = _createSuper(APITransport);

  function APITransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, APITransport);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      var callbackId = typeof callback === 'function' ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["API"]),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types__WEBPACK_IMPORTED_MODULE_10__["API"], _this.onMessage);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(APITransport, [{
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["API"]),
        body: body
      });
    }
  }, {
    key: "createCommonPromise",
    value: function createCommonPromise(api, options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.post(api, [options], function (data) {
          if (isSuccess(data)) {
            resolve(data);
          } else {
            reject(data);
          }

          if (isFunction(options.complete)) {
            options.complete(data);
          }
        });
      });
    }
  }, {
    key: "request",
    value: function request(options) {
      return this.createCommonPromise(_types__WEBPACK_IMPORTED_MODULE_10__["API"].REQUEST, options);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(options) {
      return this.createCommonPromise(_types__WEBPACK_IMPORTED_MODULE_10__["API"].NAVIGATE_TO, options);
    }
  }, {
    key: "navigateBack",
    value: function navigateBack(options) {
      return this.createCommonPromise(_types__WEBPACK_IMPORTED_MODULE_10__["API"].NAVIGATE_BACK, options);
    }
  }, {
    key: "connectSocket",
    value: function connectSocket(options) {
      return new _Classes_LogicSocket__WEBPACK_IMPORTED_MODULE_11__["default"](this, options);
    }
  }]);

  return APITransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/APITransportNative.js":
/*!*********************************************************************!*\
  !*** ../remix/src/project/runtime/transports/APITransportNative.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APITransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remix/src/shared/is.js");









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(APITransport, _Tunnel);

  var _super = _createSuper(APITransport);

  function APITransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, APITransport);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["API"]),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(APITransport, [{
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["API"]),
        body: body
      });
    }
  }, {
    key: "promisify",
    value: function promisify(api, options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.post(api, [options], function (data) {
          if (isSuccess(data)) {
            resolve(data);
          } else {
            reject(data);
          }

          if (options && Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(options.complete)) {
            options.complete(data);
          }
        });
      });
    }
  }, {
    key: "login",
    value: function login(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].LOGIN, options);
    }
  }, {
    key: "request",
    value: function request(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].REQUEST, options);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].NAVIGATE_TO, options);
    }
  }, {
    key: "navigateBack",
    value: function navigateBack(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].NAVIGATE_BACK, options);
    }
  }, {
    key: "connectSocket",
    value: function connectSocket(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].CONNECT_SOCKET, options, function () {});
    } // store

  }, {
    key: "getStorage",
    value: function getStorage(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].GET_STORAGE, options);
    }
  }, {
    key: "setStorage",
    value: function setStorage(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].SET_STORAGE, options);
    }
  }, {
    key: "clearStorage",
    value: function clearStorage(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].CLEAR_STORAGE, options);
    }
  }, {
    key: "removeStore",
    value: function removeStore(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].REMOVE_STORAGE, options);
    }
  }, {
    key: "getStorageInfo",
    value: function getStorageInfo(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].GET_STORAGE_INFO, options);
    }
  }, {
    key: "setStorageSync",
    value: function setStorageSync(key, value) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["API"].SET_STORAGE_SYNC, [key, value]);
    }
  }, {
    key: "clearStorageSync",
    value: function clearStorageSync(key) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["API"].CLEAR_STORAGE_SYNC, [key]);
    }
  }, {
    key: "removeStorageSync",
    value: function removeStorageSync(key) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["API"].REMOVE_STORAGE_SYNC, [key]);
    }
  }, {
    key: "getStorageInfoSync",
    value: function getStorageInfoSync() {
      var returnValue = null;
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["API"].GET_STORAGE_INFO_SYNC, [], function (value) {
        returnValue = value;
      });
      return returnValue;
    }
  }, {
    key: "getStorageSync",
    value: function getStorageSync(key) {
      var returnValue = null;
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["API"].GET_STORAGE_SYNC, [key], function (value) {
        returnValue = value;
      });
      return returnValue;
    }
  }, {
    key: "showTabBar",
    value: function showTabBar(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].SHOW_TABBAR, options);
    }
  }, {
    key: "hideTabBar",
    value: function hideTabBar(options) {
      return this.promisify(_types__WEBPACK_IMPORTED_MODULE_10__["API"].HIDE_TABBAR, options);
    }
  }]);

  return APITransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/ApplicationTransport.js":
/*!***********************************************************************!*\
  !*** ../remix/src/project/runtime/transports/ApplicationTransport.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationTransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var ApplicationTransport = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ApplicationTransport, _Tunnel);

  var _super = _createSuper(ApplicationTransport);

  function ApplicationTransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationTransport);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      var callbackId = typeof callback === 'function' ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"]),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"], _this.onMessage);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationTransport, [{
    key: "onDisconnect",
    value: function onDisconnect(callback) {
      this.on('disconnect', callback);
    }
  }, {
    key: "onLaunch",
    value: function onLaunch(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].LAUNCH, callback);
    }
  }, {
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"]),
        body: body
      });
    }
  }, {
    key: "connect",
    value: function connect(id, callback) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].CONNECT, [id], callback);
    }
  }, {
    key: "inspect",
    value: function inspect(callback) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].INSPECT, [], callback);
    }
  }, {
    key: "launch",
    value: function launch(options) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].LAUNCH, [options]);
    }
  }, {
    key: "show",
    value: function show() {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].SHOW, []);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].HIDE, []);
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].ERROR, [_error]);
    }
  }]);

  return ApplicationTransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/ApplicationTransportNative.js":
/*!*****************************************************************************!*\
  !*** ../remix/src/project/runtime/transports/ApplicationTransportNative.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationTransportNative; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var ApplicationTransportNative = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ApplicationTransportNative, _Tunnel);

  var _super = _createSuper(ApplicationTransportNative);

  function ApplicationTransportNative() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationTransportNative);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransportNative.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"]),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationTransportNative, [{
    key: "onLaunch",
    value: function onLaunch(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].LAUNCH, callback);
    }
  }, {
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransportNative.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"]),
        body: body
      });
    }
  }, {
    key: "launch",
    value: function launch(options) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].LAUNCH, [options]);
    }
  }, {
    key: "show",
    value: function show() {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].SHOW, []);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].HIDE, []);
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["APPLICATION"].ERROR, [_error]);
    }
  }]);

  return ApplicationTransportNative;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/Classes/LogicSocket.js":
/*!**********************************************************************!*\
  !*** ../remix/src/project/runtime/transports/Classes/LogicSocket.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createLogicSocket; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remix-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_9__);








function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var LogicSocket = /*#__PURE__*/function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(LogicSocket, _EventEmitter);

  var _super = _createSuper(LogicSocket);

  function LogicSocket(transport) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LogicSocket);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onSocketOpen", function (id) {
      if (_this.id === id) {
        _this.emit('open');
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onSocketMessage", function (id, data) {
      if (id === _this.id) {
        _this.emit('message', data);
      }
    });

    _this.id = uuid__WEBPACK_IMPORTED_MODULE_7___default.a.v4();
    _this.transport = transport;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LogicSocket, [{
    key: "connect",
    value: function connect(options) {
      this.transport.post(_types__WEBPACK_IMPORTED_MODULE_9__["API"].CONNECT_SOCKET, [this.id, options], function () {});
      this.transport.on(_types__WEBPACK_IMPORTED_MODULE_9__["API"].SOCKET_OPEN, this.onSocketOpen);
      this.transport.on(_types__WEBPACK_IMPORTED_MODULE_9__["API"].SOCKET_MESSAGE, this.onSocketMessage);
    }
  }, {
    key: "onOpen",
    value: function onOpen(_onOpen) {
      this.on('open', _onOpen);
    }
  }, {
    key: "onMessage",
    value: function onMessage(_onMessage) {
      this.on('message', _onMessage);
    }
  }, {
    key: "send",
    value: function send(data) {
      this.transport.reply({
        type: _types__WEBPACK_IMPORTED_MODULE_9__["API"].SOCKET_MESSAGE,
        argv: [this.id, data]
      });
    }
  }]);

  return LogicSocket;
}(events__WEBPACK_IMPORTED_MODULE_8___default.a);

function createLogicSocket(transport, options) {
  var socket = new LogicSocket(transport);
  socket.connect(options);
  return socket;
}

/***/ }),

/***/ "../remix/src/project/runtime/transports/ViewControllerTransport.js":
/*!**************************************************************************!*\
  !*** ../remix/src/project/runtime/transports/ViewControllerTransport.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewControllerTransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var ViewControllerTransport = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ViewControllerTransport, _Tunnel);

  var _super = _createSuper(ViewControllerTransport);

  function ViewControllerTransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewControllerTransport);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      var callbackId = typeof callback === 'function' ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"]),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"], _this.onMessage);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewControllerTransport, [{
    key: "dispatch",
    value: function dispatch(type, id, parentId, e) {
      if (id) {
        this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].EVENT, [type, id, parentId, e]);
      }
    }
  }, {
    key: "callLifecycle",
    value: function callLifecycle(type, id, parentId, view) {
      if (id) {
        this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LIFECYCLE, [type, id, parentId, {
          __wxExparserNodeId__: view.__wxExparserNodeId__,
          __wxWebviewId__: view.__wxWebviewId__,
          data: view.data
        }]);
      }
    }
  }, {
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransport.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"]),
        body: body
      });
    }
  }, {
    key: "load",
    value: function load(data, callback) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LOAD, [data], callback);
    }
  }, {
    key: "onLoad",
    value: function onLoad(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LOAD, callback);
    }
  }, {
    key: "onReady",
    value: function onReady(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].READY, callback);
    }
  }, {
    key: "onDispatch",
    value: function onDispatch(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].EVENT, callback);
    }
  }, {
    key: "onLifecycle",
    value: function onLifecycle(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LIFECYCLE, callback);
    }
  }]);

  return ViewControllerTransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/ViewControllerTransportNative.js":
/*!********************************************************************************!*\
  !*** ../remix/src/project/runtime/transports/ViewControllerTransportNative.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewControllerTransportNative; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remix/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../document */ "../remix/src/document/index.js");









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var ViewControllerTransportNative = /*#__PURE__*/function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ViewControllerTransportNative, _Tunnel);

  var _super = _createSuper(ViewControllerTransportNative);

  function ViewControllerTransportNative() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewControllerTransportNative);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransportNative.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"]),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewControllerTransportNative, [{
    key: "dispatch",
    value: function dispatch(type, id, parentId, e) {
      if (id) {
        this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].EVENT, [type, id, parentId, e]);
      }
    }
  }, {
    key: "callLifecycle",
    value: function callLifecycle(type, id, parentId, view) {
      if (id) {
        this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LIFECYCLE, [type, id, parentId, view]);
      }
    }
  }, {
    key: "reply",
    value: function reply(body) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransportNative.prototype), "post", this).call(this, {
        type: String(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"]),
        body: body
      });
    }
  }, {
    key: "load",
    value: function load(data, callback) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LOAD, [data], callback);
    }
  }, {
    key: "shareMessage",
    value: function shareMessage(options) {
      this.post(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LOAD, [options]);
    }
  }, {
    key: "onShareMessage",
    value: function onShareMessage(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].SHARE_MESSAGE, callback);
    }
  }, {
    key: "onLoad",
    value: function onLoad(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LOAD, callback);
    }
  }, {
    key: "onReady",
    value: function onReady(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].READY, callback);
    }
  }, {
    key: "onDispatch",
    value: function onDispatch(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].EVENT, callback);
    }
  }, {
    key: "onLifecycle",
    value: function onLifecycle(callback) {
      this.on(_types__WEBPACK_IMPORTED_MODULE_10__["VIEW"].LIFECYCLE, callback);
    }
  }]);

  return ViewControllerTransportNative;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remix/src/project/runtime/transports/index.js":
/*!********************************************************!*\
  !*** ../remix/src/project/runtime/transports/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ApplicationTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApplicationTransport */ "../remix/src/project/runtime/transports/ApplicationTransport.js");
/* harmony import */ var _ViewControllerTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewControllerTransport */ "../remix/src/project/runtime/transports/ViewControllerTransport.js");
/* harmony import */ var _APITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APITransport */ "../remix/src/project/runtime/transports/APITransport.js");
/* harmony import */ var _ApplicationTransportNative__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApplicationTransportNative */ "../remix/src/project/runtime/transports/ApplicationTransportNative.js");
/* harmony import */ var _ViewControllerTransportNative__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewControllerTransportNative */ "../remix/src/project/runtime/transports/ViewControllerTransportNative.js");
/* harmony import */ var _APITransportNative__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./APITransportNative */ "../remix/src/project/runtime/transports/APITransportNative.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../env */ "../remix/env.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types */ "../remix/src/project/runtime/transports/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_7__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_7__[key]; }) }(__WEBPACK_IMPORT_KEY__));







var isInspectMode = _env__WEBPACK_IMPORTED_MODULE_6__["default"].isInspectMode;
var transports = {};

var createApplicationTransport = function createApplicationTransport() {
  return transports.app = transports.app || (!isInspectMode ? new _ApplicationTransportNative__WEBPACK_IMPORTED_MODULE_3__["default"]() : new _ApplicationTransport__WEBPACK_IMPORTED_MODULE_0__["default"]());
};

var createViewControllerTransport = function createViewControllerTransport() {
  return transports.view = transports.view || (!isInspectMode ? new _ViewControllerTransportNative__WEBPACK_IMPORTED_MODULE_4__["default"]() : new _ViewControllerTransport__WEBPACK_IMPORTED_MODULE_1__["default"]());
};

var createAPITransport = function createAPITransport() {
  return transports.api = transports.api || (!isInspectMode ? new _APITransportNative__WEBPACK_IMPORTED_MODULE_5__["default"]() : new _APITransport__WEBPACK_IMPORTED_MODULE_2__["default"]());
};


/* harmony default export */ __webpack_exports__["default"] = ({
  get app() {
    if (transports.app) {
      return transports.app;
    }

    transports.view = createViewControllerTransport();
    return transports.app = createApplicationTransport();
  },

  get view() {
    if (transports.view) {
      return transports.view;
    }

    transports.app = createApplicationTransport();
    return transports.view = createViewControllerTransport();
  },

  get api() {
    if (transports.api) {
      return transports.api;
    }

    return transports.api = createAPITransport();
  }

});

/***/ }),

/***/ "../remix/src/project/runtime/transports/types.js":
/*!********************************************************!*\
  !*** ../remix/src/project/runtime/transports/types.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../remix/src/project/runtime/tunnel/NativeTunnel.js":
/*!***********************************************************!*\
  !*** ../remix/src/project/runtime/tunnel/NativeTunnel.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remix-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_9__);









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var _default = /*#__PURE__*/function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(_default, _EventEmitter);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onMessage", function (_ref) {
      var type = _ref.type,
          argv = _ref.argv,
          callback = _ref.callback;

      if (type) {
        var _this2;

        if (typeof callback === 'function') {
          argv.push(callback);
        }

        (_this2 = _this).emit.apply(_this2, [type].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(argv)));
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(_default, [{
    key: "post",
    value: function post(_post) {
      var type = _post.type,
          body = _post.body;
      this.onMessage(body);
    }
  }]);

  return _default;
}(events__WEBPACK_IMPORTED_MODULE_8___default.a);


;

/***/ }),

/***/ "../remix/src/project/runtime/tunnel/Socket.js":
/*!*****************************************************!*\
  !*** ../remix/src/project/runtime/tunnel/Socket.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/aniwei/Desktop/remix/packages/remix/src/project/runtime/tunnel/Socket.js'");

/***/ }),

/***/ "../remix/src/project/runtime/tunnel/SocketTunnel.js":
/*!***********************************************************!*\
  !*** ../remix/src/project/runtime/tunnel/SocketTunnel.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SocketTunnel; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remix-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "../remix/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Socket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Socket */ "../remix/src/project/runtime/tunnel/Socket.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../env */ "../remix/env.js");









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var MessageEmitter = /*#__PURE__*/function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(MessageEmitter, _EventEmitter);

  var _super = _createSuper(MessageEmitter);

  function MessageEmitter() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MessageEmitter);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (post) {
      if (_this.connected) {
        _this.socket.send({
          data: JSON.stringify({
            post: post
          })
        });
      } else {
        _this.queue.push(post);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onError", function (_ref) {
      var errMsg = _ref.errMsg;

      if (errMsg === 'url not in domain list') {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请去掉域名校验，否则无法调试真机',
          showCancel: false
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onOpen", function () {
      _this.connected = true;

      if (_this.queue.length > 0) {
        var message;

        while (message = _this.queue.shift()) {
          _this.post(message);
        }

        _this.queue = [];
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onClose", function () {
      _this.connected = false;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onMessage", function (data) {
      _this.emit('message', data);
    });

    var isDevToolRuntime = _env__WEBPACK_IMPORTED_MODULE_11__["default"].isDevToolRuntime;
    _this.id = isDevToolRuntime ? _env__WEBPACK_IMPORTED_MODULE_11__["default"].inspectLogicUUID : _env__WEBPACK_IMPORTED_MODULE_11__["default"].inspectTerminalUUID;
    _this.connected = false;
    _this.queue = [];
    _this.socket = new _Socket__WEBPACK_IMPORTED_MODULE_10__["default"]({
      url: _env__WEBPACK_IMPORTED_MODULE_11__["default"].inspectWSURL,
      protocols: [_this.id, _env__WEBPACK_IMPORTED_MODULE_11__["default"].inspectTerminalTypes[_env__WEBPACK_IMPORTED_MODULE_11__["default"].isDevToolRuntime ? 'LOGIC' : 'VIEW']]
    });

    _this.socket.onMessage(function (_ref2) {
      var data = _ref2.data;

      try {
        var json = JSON.parse(data);

        _this.onMessage(json);
      } catch (err) {
        console.log(err);
      }
    });

    _this.socket.onOpen(_this.onOpen);

    _this.socket.onClose(_this.onClose);

    _this.socket.onError(_this.onError);

    return _this;
  }

  return MessageEmitter;
}(events__WEBPACK_IMPORTED_MODULE_8___default.a);

var SocketTunnel = /*#__PURE__*/function (_EventEmitter2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(SocketTunnel, _EventEmitter2);

  var _super2 = _createSuper(SocketTunnel);

  function SocketTunnel() {
    var _this2;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, SocketTunnel);

    _this2 = _super2.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this2), "onMessage", function (_ref3) {
      var type = _ref3.type,
          argv = _ref3.argv,
          callbackId = _ref3.callbackId;

      if (callbackId) {
        if (_this2.eventNames().includes(callbackId)) {
          var _this3;

          return (_this3 = _this2).emit.apply(_this3, [callbackId].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(argv)));
        }
      }

      if (type) {
        var _this4;

        var t = new Type(type.type, type.value);

        if (callbackId) {
          argv.push(function () {
            for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
              argv[_key] = arguments[_key];
            }

            _this2.reply({
              argv: argv,
              type: type,
              callbackId: callbackId
            });
          });
        }

        (_this4 = _this2).emit.apply(_this4, [t].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(argv)));
      }
    });

    _this2.id = uuid__WEBPACK_IMPORTED_MODULE_9___default.a.v4();
    _this2.emitter = SocketTunnel.emitter || (SocketTunnel.emitter = new MessageEmitter());

    _this2.emitter.on('message', function (_ref4) {
      var post = _ref4.post;
      var type = post.type,
          body = post.body;

      _this2.emit(type, body);
    });

    return _this2;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SocketTunnel, [{
    key: "post",
    value: function post(data) {
      this.emitter.post(data);
    }
  }]);

  return SocketTunnel;
}(events__WEBPACK_IMPORTED_MODULE_8___default.a);



/***/ }),

/***/ "../remix/src/project/runtime/tunnel/index.js":
/*!****************************************************!*\
  !*** ../remix/src/project/runtime/tunnel/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _NativeTunnel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NativeTunnel */ "../remix/src/project/runtime/tunnel/NativeTunnel.js");
/* harmony import */ var _SocketTunnel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SocketTunnel */ "../remix/src/project/runtime/tunnel/SocketTunnel.js");


var Tunnel = process.env.IS_INSPECT_MODE ? _SocketTunnel__WEBPACK_IMPORTED_MODULE_1__["default"] : _NativeTunnel__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Tunnel);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../remix-cli/node_modules/process/browser.js */ "../remix-cli/node_modules/process/browser.js")))

/***/ }),

/***/ "../remix/src/react/Children.js":
/*!**************************************!*\
  !*** ../remix/src/react/Children.js ***!
  \**************************************/
/*! exports provided: map, forEach, count, only, toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "only", function() { return only; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");


function map(children, iterate, context) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    return children;
  }

  children = toArray(children);

  if (context && context !== children) {
    iterate = iterate.bind(context);
  }

  return children.map(iterate);
}
function forEach(children, iterate, context) {
  if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    children = toArray(children);
    var length = children.length;

    if (length > 0) {
      if (context && context !== children) {
        iterate = iterate.bind(context);
      }

      for (var i = 0; i < length; i++) {
        var child = Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isInvalid"])(children[i]) ? null : children[i];
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
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isNullOrUndefined"])(children)) {
    return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ARRAY"];
  }

  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_0__["isArray"])(children)) {
    return Object(_shared__WEBPACK_IMPORTED_MODULE_1__["flatten"])(children);
  }

  return _shared__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ARRAY"].concat(children);
}

/***/ }),

/***/ "../remix/src/react/Component.js":
/*!***************************************!*\
  !*** ../remix/src/react/Component.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");




var Component = /*#__PURE__*/function () {
  function Component(props, context, updater) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Component);

    this.props = props || {};
    this.context = context || _shared__WEBPACK_IMPORTED_MODULE_2__["EMPTY_OBJECT"];
    this.refs = {};
    this.updater = updater;
    this.state = this.state || {};
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Component, [{
    key: "setState",
    value: function setState(state) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _shared__WEBPACK_IMPORTED_MODULE_2__["noop"];
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


Component.prototype.isReactComponent = _shared__WEBPACK_IMPORTED_MODULE_2__["EMPTY_OBJECT"];

/***/ }),

/***/ "../remix/src/react/PropTypes.js":
/*!***************************************!*\
  !*** ../remix/src/react/PropTypes.js ***!
  \***************************************/
/*! exports provided: PropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return PropTypes; });
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
PropTypes.PropTypes = PropTypes;

/* harmony default export */ __webpack_exports__["default"] = (PropTypes);

/***/ }),

/***/ "../remix/src/react/PureComponent.js":
/*!*******************************************!*\
  !*** ../remix/src/react/PureComponent.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "../remix/src/react/Component.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");








function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var PureComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(PureComponent, _Component);

  var _super = _createSuper(PureComponent);

  function PureComponent() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "isPureComponent", true);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !Object(_shared__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"])(this.props, nextProps) || !Object(_shared__WEBPACK_IMPORTED_MODULE_8__["shallowEqual"])(this.state, nextState);
    }
  }]);

  return PureComponent;
}(_Component__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PureComponent);

/***/ }),

/***/ "../remix/src/react/ReactElement.js":
/*!******************************************!*\
  !*** ../remix/src/react/ReactElement.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactElement; });
/* harmony import */ var _shared_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/elementTypes */ "../remix/src/shared/elementTypes.js");

function ReactElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var owner = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var element = {
    $$typeof: _shared_elementTypes__WEBPACK_IMPORTED_MODULE_0__["REACT_ELEMENT_TYPE"],
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  return element;
}

/***/ }),

/***/ "../remix/src/react/cloneElement.js":
/*!******************************************!*\
  !*** ../remix/src/react/cloneElement.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cloneElement; });
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ "../remix/src/react/ReactElement.js");

function cloneElement(element, props) {
  return Object(_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"])(element.type, key, ref, self, source, owner, props);
}

/***/ }),

/***/ "../remix/src/react/createElement.js":
/*!*******************************************!*\
  !*** ../remix/src/react/createElement.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactElement */ "../remix/src/react/ReactElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "../remix/src/shared/index.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




function createElement(type, properties) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var length = children.length;

  var _ref = properties || {},
      key = _ref.key,
      ref = _ref.ref,
      props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["key", "ref"]);

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];

      if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isArray"])(props.children)) {
        if (props.children.length === 1) {
          props.children = props.children[0];
        }
      }
    } else {
      props.children = children;
    }
  }

  return Object(_ReactElement__WEBPACK_IMPORTED_MODULE_2__["default"])(type, _objectSpread({}, props), key, ref);
}

/***/ }),

/***/ "../remix/src/react/index.js":
/*!***********************************!*\
  !*** ../remix/src/react/index.js ***!
  \***********************************/
/*! exports provided: resetReactCurrentHookCursor, useMemo, useCallback, useEffect, useContext, createContext, useState, useReducer, Children, Component, PureComponent, createElement, cloneElement, PropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Children */ "../remix/src/react/Children.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _Children__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "../remix/src/react/Component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _Component__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _PureComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PureComponent */ "../remix/src/react/PureComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createElement */ "../remix/src/react/createElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _createElement__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _cloneElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cloneElement */ "../remix/src/react/cloneElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _PropTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PropTypes */ "../remix/src/react/PropTypes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _PropTypes__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _ReactHook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ReactHook */ "../remix/src/ReactHook.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetReactCurrentHookCursor", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["resetReactCurrentHookCursor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useMemo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["createContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return _ReactHook__WEBPACK_IMPORTED_MODULE_6__["useReducer"]; });









/* harmony default export */ __webpack_exports__["default"] = ({
  Children: _Children__WEBPACK_IMPORTED_MODULE_0__,
  Component: _Component__WEBPACK_IMPORTED_MODULE_1__["default"],
  PureComponent: _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_3__["default"],
  cloneElement: _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"],
  PropTypes: _PropTypes__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "../remix/src/renderer/config/DOMProperties.js":
/*!*****************************************************!*\
  !*** ../remix/src/renderer/config/DOMProperties.js ***!
  \*****************************************************/
/*! exports provided: updateDOMProperties, setDOMProperties, setValueForStyles, setTextContent, setValueForProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDOMProperties", function() { return updateDOMProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDOMProperties", function() { return setDOMProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForStyles", function() { return setValueForStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTextContent", function() { return setTextContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForProperty", function() { return setValueForProperty; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var freeze = Object.freeze;
function updateDOMProperties(tag, element, pendingProps, memoizedProps) {
  memoizedProps = memoizedProps || {};

  for (var propName in _objectSpread({}, memoizedProps, {}, pendingProps)) {
    var prop = memoizedProps[propName];
    var nextProp = pendingProps[propName];
    var isEventProperty = propName[0] === 'o' && propName[1] === 'n';

    if (prop === nextProp) {} else if (propName === _shared__WEBPACK_IMPORTED_MODULE_2__["STYLE"]) {
      if (nextProp) {
        freeze(nextProp);
        setValueForStyles(element, nextProp);
      }
    } else if (propName === _shared__WEBPACK_IMPORTED_MODULE_2__["CHILDREN"]) {
      var canSetTextContent = tag !== 'textarea' || nextProp !== '';

      var typeofProp = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(nextProp);

      if (canSetTextContent && prop !== nextProp) {
        if (typeofProp === 'string' || typeofProp === 'number') {
          setTextContent(element, nextProp);
        }
      }
    } else if (isEventProperty) {
      propName = propName.slice(2).toLowerCase();

      if (typeof prop === 'function') {
        element.removeEventListener(propName, prop, false);
      }

      if (typeof nextProp === 'function') {
        element.addEventListener(propName, nextProp, false);
      }
    } else if (nextProp !== null) {
      setValueForProperty(element, propName, nextProp);
    }
  }
}
function setDOMProperties(tag, element, rootContainerElement, nextProps) {
  for (var propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      var nextProp = nextProps[propName];

      if (propName === _shared__WEBPACK_IMPORTED_MODULE_2__["STYLE"]) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _shared__WEBPACK_IMPORTED_MODULE_2__["CHILDREN"]) {
        var canSetTextContent = tag !== 'textarea' || nextProp !== '';

        var typeofProp = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(nextProp);

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
    if (styleName === _shared__WEBPACK_IMPORTED_MODULE_2__["STYLE_NAME_FLOAT"]) {
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendChild; });
function appendChild(instance, child) {
  instance.appendChild(child);
}

/***/ }),

/***/ "../remix/src/renderer/config/appendChildToContainer.js":
/*!**************************************************************!*\
  !*** ../remix/src/renderer/config/appendChildToContainer.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendChildToContainer; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");

function appendChildToContainer(container, child) {
  var parentNode;

  if (container.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["COMMENT_NODE"]) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }

  var reactRootContainer = container._reactRootContainer;

  if (reactRootContainer === null && parentNode.onclick === null) {// trapClickOnNonInteractiveElement(parentNode);
  }
}

/***/ }),

/***/ "../remix/src/renderer/config/createElement.js":
/*!*****************************************************!*\
  !*** ../remix/src/renderer/config/createElement.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remix/src/shared/HTMLNodeType.js");


function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_NODE"] ? rootContainerElement : rootContainerElement.ownerDocument;
}

function createElement(type, props, rootContainerElement) {
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var element;

  if (typeof props.is === 'string') {
    element = ownerDocument.createElemeent(type, {
      is: props.is
    });
  } else {
    element = ownerDocument.createElemeent(type);
  }

  return element;
}

/***/ }),

/***/ "../remix/src/renderer/config/createInstance.js":
/*!******************************************************!*\
  !*** ../remix/src/renderer/config/createInstance.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createInstance; });
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "../remix/src/renderer/config/createElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "../remix/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "../remix/src/shared/index.js");



var ownerDocument = null;
function createInstance(type, props, rootContainerInstance, workInProgress) {
  var children = props.children;
  var document = ownerDocument || (ownerDocument = rootContainerInstance.ownerDocument);
  var element = document.createElement(type);
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_INSTANCE_KEY"]] = workInProgress;
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = props;
  return element;
}

/***/ }),

/***/ "../remix/src/renderer/index.js":
/*!**************************************!*\
  !*** ../remix/src/renderer/index.js ***!
  \**************************************/
/*! exports provided: ReactCurrentRoot, render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactCurrentRoot", function() { return ReactCurrentRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _Fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Fiber */ "../remix/src/Fiber.js");
/* harmony import */ var _ReactScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactScheduler */ "../remix/src/ReactScheduler.js");


var ReactCurrentRoot = {
  current: null
};

function render(element, container, callback) {
  var _ref = container._reactRootContainer || (container._reactRootContainer = {
    internalRoot: Object(_Fiber__WEBPACK_IMPORTED_MODULE_0__["createRootFiber"])(container)
  }),
      workInProgress = _ref.internalRoot.workInProgress;

  ReactCurrentRoot.current = container._reactRootContainer;
  workInProgress.update = {
    payload: {
      element: element
    },
    callback: callback
  };
  Object(_ReactScheduler__WEBPACK_IMPORTED_MODULE_1__["scheduleRootUpdate"])(workInProgress);
}


/* harmony default export */ __webpack_exports__["default"] = ({
  render: render
});

/***/ }),

/***/ "../remix/src/router/Route.js":
/*!************************************!*\
  !*** ../remix/src/router/Route.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Route; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var Route = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Route, _Component);

  var _super = _createSuper(Route);

  function Route() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Route);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Route, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_5__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return Route;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "../remix/src/router/Router.js":
/*!*************************************!*\
  !*** ../remix/src/router/Router.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "../remix/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "../remix/src/react/Component.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var Router = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Router, _Component);

  var _super = _createSuper(Router);

  function Router() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Router);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Router, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_5__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return Router;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "../remix/src/router/index.js":
/*!************************************!*\
  !*** ../remix/src/router/index.js ***!
  \************************************/
/*! exports provided: Router, Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "../remix/src/router/Router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _Router__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Route */ "../remix/src/router/Route.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _Route__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "../remix/src/shared/HTMLNodeType.js":
/*!*******************************************!*\
  !*** ../remix/src/shared/HTMLNodeType.js ***!
  \*******************************************/
/*! exports provided: ELEMENT_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_NODE", function() { return ELEMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_NODE", function() { return TEXT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_NODE", function() { return COMMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_NODE", function() { return DOCUMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_FRAGMENT_NODE", function() { return DOCUMENT_FRAGMENT_NODE; });
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

/***/ }),

/***/ "../remix/src/shared/effectTags.js":
/*!*****************************************!*\
  !*** ../remix/src/shared/effectTags.js ***!
  \*****************************************/
/*! exports provided: NO_EFFECT, PERFORMED_WORK, PLACEMENT, UPDATE, PLACEMENT_AND_UPDATE, DELETION, CONTENT_RESET, CALLBACK, DID_CAPTURE, REF, SNAPSHOT, PASSIVE, INCOMPLETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_EFFECT", function() { return NO_EFFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERFORMED_WORK", function() { return PERFORMED_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLACEMENT", function() { return PLACEMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE", function() { return UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLACEMENT_AND_UPDATE", function() { return PLACEMENT_AND_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETION", function() { return DELETION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_RESET", function() { return CONTENT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CALLBACK", function() { return CALLBACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DID_CAPTURE", function() { return DID_CAPTURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REF", function() { return REF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNAPSHOT", function() { return SNAPSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASSIVE", function() { return PASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCOMPLETE", function() { return INCOMPLETE; });
var NO_EFFECT = 0;
var PERFORMED_WORK = 1;
var PLACEMENT = 2;
var UPDATE = 4;
var PLACEMENT_AND_UPDATE = 6;
var DELETION = 8;
var CONTENT_RESET = 16;
var CALLBACK = 32;
var DID_CAPTURE = 64;
var REF = 128;
var SNAPSHOT = 256;
var PASSIVE = 512;
var INCOMPLETE = 1024;

/***/ }),

/***/ "../remix/src/shared/elementTypes.js":
/*!*******************************************!*\
  !*** ../remix/src/shared/elementTypes.js ***!
  \*******************************************/
/*! exports provided: REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE, REACT_ASYNC_MODE_TYPE, REACT_CONCURRENT_MODE_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_ELEMENT_TYPE", function() { return REACT_ELEMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PORTAL_TYPE", function() { return REACT_PORTAL_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_FRAGMENT_TYPE", function() { return REACT_FRAGMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_STRICT_MODE_TYPE", function() { return REACT_STRICT_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PROFILER_TYPE", function() { return REACT_PROFILER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_PROVIDER_TYPE", function() { return REACT_PROVIDER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_CONTEXT_TYPE", function() { return REACT_CONTEXT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_ASYNC_MODE_TYPE", function() { return REACT_ASYNC_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_CONCURRENT_MODE_TYPE", function() { return REACT_CONCURRENT_MODE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_FORWARD_REF_TYPE", function() { return REACT_FORWARD_REF_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_SUSPENSE_TYPE", function() { return REACT_SUSPENSE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_MEMO_TYPE", function() { return REACT_MEMO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_LAZY_TYPE", function() { return REACT_LAZY_TYPE; });
var hasSymbol = typeof Symbol === 'function' && Symbol["for"];
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol["for"]('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol["for"]('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol["for"]('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol["for"]('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol["for"]('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol["for"]('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol["for"]('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol["for"]('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol["for"]('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol["for"]('react.lazy') : 0xead4;

/***/ }),

/***/ "../remix/src/shared/index.js":
/*!************************************!*\
  !*** ../remix/src/shared/index.js ***!
  \************************************/
/*! exports provided: CHILDREN, HTML, STYLE, STYLE_NAME_FLOAT, DANGEROUSLY_SET_INNER_HTML, INTERNAL_INSTANCE_KEY, INTERNAL_EVENT_HANDLERS_KEY, REACT_INTERNAL_FIBER, REACT_INTERNAL_INSTANCE, MERGED_CHILD_CONTEXT, MASKED_CHILD_CONTEXT, UNMASKED_CHILD_CONTEXT, EMPTY_OBJECT, EMPTY_ARRAY, EMPTY_CONTEXT, EMPTY_REFS, EXPIRE_TIME, UPDATE_FREQUENCY, SCHEDULE_TIMEOUT, SCHEDULE_FPS, SCHEDULE_KEY, UPDATE_STATE, REPLACE_STATE, FORCE_UPDATE, PENDING_WORK, NO_WORK, noop, assign, keys, is, shallowEqual, resolveDefaultProps, extend, clone, flatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILDREN", function() { return CHILDREN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTML", function() { return HTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE", function() { return STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE_NAME_FLOAT", function() { return STYLE_NAME_FLOAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DANGEROUSLY_SET_INNER_HTML", function() { return DANGEROUSLY_SET_INNER_HTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_INSTANCE_KEY", function() { return INTERNAL_INSTANCE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_EVENT_HANDLERS_KEY", function() { return INTERNAL_EVENT_HANDLERS_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_INTERNAL_FIBER", function() { return REACT_INTERNAL_FIBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REACT_INTERNAL_INSTANCE", function() { return REACT_INTERNAL_INSTANCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERGED_CHILD_CONTEXT", function() { return MERGED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASKED_CHILD_CONTEXT", function() { return MASKED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNMASKED_CHILD_CONTEXT", function() { return UNMASKED_CHILD_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_OBJECT", function() { return EMPTY_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_ARRAY", function() { return EMPTY_ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_CONTEXT", function() { return EMPTY_CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_REFS", function() { return EMPTY_REFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPIRE_TIME", function() { return EXPIRE_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_FREQUENCY", function() { return UPDATE_FREQUENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEDULE_TIMEOUT", function() { return SCHEDULE_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEDULE_FPS", function() { return SCHEDULE_FPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEDULE_KEY", function() { return SCHEDULE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STATE", function() { return UPDATE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE_STATE", function() { return REPLACE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORCE_UPDATE", function() { return FORCE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PENDING_WORK", function() { return PENDING_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_WORK", function() { return NO_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDefaultProps", function() { return resolveDefaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "../remix/src/shared/is.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var randomKey = Math.random().toString(36).slice(2);
var CHILDREN = 'children';
var HTML = '__html';
var STYLE = 'style';
var STYLE_NAME_FLOAT = 'float';
var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var INTERNAL_INSTANCE_KEY = '__reactInternalInstance$' + randomKey;
var INTERNAL_EVENT_HANDLERS_KEY = '__reactEventHandlers$' + randomKey;
var REACT_INTERNAL_FIBER = '_reactInternalFiber';
var REACT_INTERNAL_INSTANCE = '_reactInternalInstance';
var MERGED_CHILD_CONTEXT = '__reactInternalMemoizedMergedChildContext';
var MASKED_CHILD_CONTEXT = '__reactInternalMemoizedMaskedChildContext';
var UNMASKED_CHILD_CONTEXT = '__reactInternalMemoizedUnmaskedChildContext';
var EMPTY_OBJECT = {};
var EMPTY_ARRAY = [];
var EMPTY_CONTEXT = {};
var EMPTY_REFS = {};
var EXPIRE_TIME = 0;
var UPDATE_FREQUENCY = 10;
var SCHEDULE_TIMEOUT = 3000;
var SCHEDULE_FPS = 60;
var SCHEDULE_KEY = 'due';
var UPDATE_STATE = 0;
var REPLACE_STATE = 1;
var FORCE_UPDATE = 2;
var PENDING_WORK = 1;
var NO_WORK = 2;
function noop() {}
var assign = Object.assign;
var keys = Object.keys;
var is = Object.is;
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
        if (Object(_is__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(props[propName])) {
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

    if (Object(_is__WEBPACK_IMPORTED_MODULE_1__["isArray"])(value)) {
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
/*! exports provided: isArray, isNull, isUndefined, isFunction, isString, isObject, isNumber, isNullOrUndefined, isInvalid, isComponentConstructor, isLegacyContextConsumer, isContextProvider, isHostParent, is */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrUndefined", function() { return isNullOrUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInvalid", function() { return isInvalid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComponentConstructor", function() { return isComponentConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLegacyContextConsumer", function() { return isLegacyContextConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContextProvider", function() { return isContextProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHostParent", function() { return isHostParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workTags */ "../remix/src/shared/workTags.js");


var isArray = Array.isArray;
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
  return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(o) === 'object' && !isNull(o);
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
  return tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"] || tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"] || tag === _workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_PORTAL"];
}
var is = Object.is || function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
};

/***/ }),

/***/ "../remix/src/shared/nextTick.js":
/*!***************************************!*\
  !*** ../remix/src/shared/nextTick.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {var nextTick = null;

if (typeof window !== 'undefined') {} else {
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

/* harmony default export */ __webpack_exports__["default"] = (nextTick);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remix-cli/node_modules/timers-browserify/main.js */ "../remix-cli/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../remix/src/shared/performance.js":
/*!******************************************!*\
  !*** ../remix/src/shared/performance.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _now = Date.now();

/* harmony default export */ __webpack_exports__["default"] = (typeof window === 'undefined' ? {
  now: function now() {
    return Date.now() - _now;
  }
} : window.performance);

/***/ }),

/***/ "../remix/src/shared/workTags.js":
/*!***************************************!*\
  !*** ../remix/src/shared/workTags.js ***!
  \***************************************/
/*! exports provided: FUNCTION_COMPONENT, CLASS_COMPONENT, INDETERMINATE_COMPONENT, HOST_ROOT, HOST_PORTAL, HOST_COMPONENT, HOST_TEXT, FRAGMENT, CONTEXT_CONSUMER, CONTEXT_PROVIDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNCTION_COMPONENT", function() { return FUNCTION_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_COMPONENT", function() { return CLASS_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDETERMINATE_COMPONENT", function() { return INDETERMINATE_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_ROOT", function() { return HOST_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_PORTAL", function() { return HOST_PORTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_COMPONENT", function() { return HOST_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_TEXT", function() { return HOST_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FRAGMENT", function() { return FRAGMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CONSUMER", function() { return CONTEXT_CONSUMER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_PROVIDER", function() { return CONTEXT_PROVIDER; });
var FUNCTION_COMPONENT = 0;
var CLASS_COMPONENT = 1;
var INDETERMINATE_COMPONENT = 2;
var HOST_ROOT = 3;
var HOST_PORTAL = 4;
var HOST_COMPONENT = 5;
var HOST_TEXT = 6;
var FRAGMENT = 7;
var CONTEXT_CONSUMER = 9;
var CONTEXT_PROVIDER = 10;

/***/ }),

/***/ "../remixjs-message-protocol/dist/protocol.js":
/*!****************************************************!*\
  !*** ../remixjs-message-protocol/dist/protocol.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs-message-protocol/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(exports)) === 'object' && ( false ? undefined : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "../remix-cli/node_modules/webpack/buildin/amd-options.js")) define([], factory);else {
    var a = factory();

    for (var i in a) {
      ((typeof exports === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(exports)) === 'object' ? exports : root)[i] = a[i];
    }
  }
})(undefined, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = window.installedModules || (window.installedModules = {});
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "/dist/";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = "./index.js");
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./index.js":
      /*!******************!*\
        !*** ./index.js ***!
        \******************/

      /*! no static exports found */

      /***/
      function indexJs(module, exports, __webpack_require__) {
        "use strict";

        var _interopRequireDefault = __webpack_require__(
        /*! @babel/runtime/helpers/interopRequireDefault */
        "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.COMMON = exports.API = exports.VIEW = exports.APPLICATION = exports.Type = void 0;

        var _classCallCheck2 = _interopRequireDefault(__webpack_require__(
        /*! @babel/runtime/helpers/classCallCheck */
        "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

        var _createClass2 = _interopRequireDefault(__webpack_require__(
        /*! @babel/runtime/helpers/createClass */
        "./node_modules/@babel/runtime/helpers/createClass.js"));

        var _defineProperty2 = _interopRequireDefault(__webpack_require__(
        /*! @babel/runtime/helpers/defineProperty */
        "./node_modules/@babel/runtime/helpers/defineProperty.js"));

        var _uuid = _interopRequireDefault(__webpack_require__(
        /*! uuid */
        "./node_modules/uuid/index.js"));

        var Type = /*#__PURE__*/function () {
          function Type(type, value) {
            (0, _classCallCheck2["default"])(this, Type);

            if (Type.types[value]) {
              return Type.types[value];
            }

            Type.types[value] = this;
            this.type = type;
            this.value = value;
            this.uuid = _uuid["default"].v4();
          }

          (0, _createClass2["default"])(Type, [{
            key: "toString",
            value: function toString() {
              return this.value;
            }
          }]);
          return Type;
        }();

        exports.Type = Type;
        (0, _defineProperty2["default"])(Type, "types", {});
        var getNames = Object.getOwnPropertyNames;

        var defineNotificationTypes = function defineNotificationTypes(prefix, types) {
          var names = getNames(types);
          var t = {
            toString: function toString() {
              return prefix;
            }
          };
          names.forEach(function (name) {
            t[name] = new Type(prefix, "".concat(prefix, ".").concat(types[name]));
          });
          return t;
        };

        var APPLICATION = defineNotificationTypes('application', {
          LAUNCH: 'launch',
          CONNECT: 'connect',
          INSPECT: 'inspect',
          SHOW: 'show',
          HIDE: 'hide',
          ERROR: 'error'
        });
        exports.APPLICATION = APPLICATION;
        var VIEW = defineNotificationTypes('view', {
          LOAD: 'load',
          READY: 'ready',
          SHOW: 'show',
          HIDE: 'hide'
        });
        exports.VIEW = VIEW;
        var API = defineNotificationTypes('api', {
          REQUEST: 'request',
          NAVIGATE_TO: 'navigateTo',
          NAVIGATE_BACK: 'navigateBack',
          CONNECT_SOCKET: 'connectSocket',
          SOCKET_OPEN: 'socketOpen',
          SOCKET_MESSAGE: 'socketMessage'
        });
        exports.API = API;
        var COMMON = defineNotificationTypes('common', {
          CALLBACK: 'callback'
        });
        exports.COMMON = COMMON;
        /***/
      },

      /***/
      "./node_modules/@babel/runtime/helpers/classCallCheck.js":
      /*!***************************************************************!*\
        !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
        \***************************************************************/

      /*! no static exports found */

      /***/
      function node_modulesBabelRuntimeHelpersClassCallCheckJs(module, exports) {
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        module.exports = _classCallCheck;
        /***/
      },

      /***/
      "./node_modules/@babel/runtime/helpers/createClass.js":
      /*!************************************************************!*\
        !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
        \************************************************************/

      /*! no static exports found */

      /***/
      function node_modulesBabelRuntimeHelpersCreateClassJs(module, exports) {
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
        /***/
      },

      /***/
      "./node_modules/@babel/runtime/helpers/defineProperty.js":
      /*!***************************************************************!*\
        !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
        \***************************************************************/

      /*! no static exports found */

      /***/
      function node_modulesBabelRuntimeHelpersDefinePropertyJs(module, exports) {
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
        /***/
      },

      /***/
      "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
      /*!**********************************************************************!*\
        !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
        \**********************************************************************/

      /*! no static exports found */

      /***/
      function node_modulesBabelRuntimeHelpersInteropRequireDefaultJs(module, exports) {
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            "default": obj
          };
        }

        module.exports = _interopRequireDefault;
        /***/
      },

      /***/
      "./node_modules/uuid/index.js":
      /*!************************************!*\
        !*** ./node_modules/uuid/index.js ***!
        \************************************/

      /*! no static exports found */

      /***/
      function node_modulesUuidIndexJs(module, exports, __webpack_require__) {
        var v1 = __webpack_require__(
        /*! ./v1 */
        "./node_modules/uuid/v1.js");

        var v4 = __webpack_require__(
        /*! ./v4 */
        "./node_modules/uuid/v4.js");

        var uuid = v4;
        uuid.v1 = v1;
        uuid.v4 = v4;
        module.exports = uuid;
        /***/
      },

      /***/
      "./node_modules/uuid/lib/bytesToUuid.js":
      /*!**********************************************!*\
        !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
        \**********************************************/

      /*! no static exports found */

      /***/
      function node_modulesUuidLibBytesToUuidJs(module, exports) {
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
        /***/
      },

      /***/
      "./node_modules/uuid/lib/rng-browser.js":
      /*!**********************************************!*\
        !*** ./node_modules/uuid/lib/rng-browser.js ***!
        \**********************************************/

      /*! no static exports found */

      /***/
      function node_modulesUuidLibRngBrowserJs(module, exports) {
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
        /***/

      },

      /***/
      "./node_modules/uuid/v1.js":
      /*!*********************************!*\
        !*** ./node_modules/uuid/v1.js ***!
        \*********************************/

      /*! no static exports found */

      /***/
      function node_modulesUuidV1Js(module, exports, __webpack_require__) {
        var rng = __webpack_require__(
        /*! ./lib/rng */
        "./node_modules/uuid/lib/rng-browser.js");

        var bytesToUuid = __webpack_require__(
        /*! ./lib/bytesToUuid */
        "./node_modules/uuid/lib/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
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
        /***/
      },

      /***/
      "./node_modules/uuid/v4.js":
      /*!*********************************!*\
        !*** ./node_modules/uuid/v4.js ***!
        \*********************************/

      /*! no static exports found */

      /***/
      function node_modulesUuidV4Js(module, exports, __webpack_require__) {
        var rng = __webpack_require__(
        /*! ./lib/rng */
        "./node_modules/uuid/lib/rng-browser.js");

        var bytesToUuid = __webpack_require__(
        /*! ./lib/bytesToUuid */
        "./node_modules/uuid/lib/bytesToUuid.js");

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
        /***/
      }
      /******/

    })
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../remix-cli/node_modules/webpack/buildin/harmony-module.js */ "../remix-cli/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../remixjs-message-protocol/node_modules/@babel/runtime/helpers/typeof.js":
/*!*********************************************************************************!*\
  !*** ../remixjs-message-protocol/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*********************************************************************************/
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

/***/ })

}]);
//# sourceMappingURL=manifest.js.map