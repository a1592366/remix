/*** MARK_1588950696778 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

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

/***/ "../remix/project.js":
/*!***************************!*\
  !*** ../remix/project.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ViewNativeSupport: true,
  AppNativeSupport: true
};
exports.AppNativeSupport = exports.ViewNativeSupport = void 0;

var ViewNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./src/RemixViewSupport */ "../remix/src/RemixViewSupport.js"));

exports.ViewNativeSupport = ViewNativeSupport;

var AppNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./src/RemixAppSupport */ "../remix/src/RemixAppSupport.js"));

exports.AppNativeSupport = AppNativeSupport;

var _RemixProject = __webpack_require__(/*! ./src/RemixProject */ "../remix/src/RemixProject.js");

Object.keys(_RemixProject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RemixProject[key];
    }
  });
});

/***/ }),

/***/ "../remix/src/Remix.js":
/*!*****************************!*\
  !*** ../remix/src/Remix.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Children: true,
  PropTypes: true,
  createElement: true,
  Fragment: true,
  Component: true,
  PureComponent: true
};
exports.createElement = createElement;
exports.Fragment = Fragment;
exports["default"] = exports.PureComponent = exports.Component = exports.PropTypes = exports.Children = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remix/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _RemixElement = __webpack_require__(/*! ./RemixElement */ "../remix/src/RemixElement.js");

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var _RemixHook = __webpack_require__(/*! ./RemixHook */ "../remix/src/RemixHook.js");

Object.keys(_RemixHook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RemixHook[key];
    }
  });
});

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var isArray = Array.isArray;

var shim = function shim() {
  return shim;
};

shim.isRequired = shim;
var Children = {
  forEach: function forEach(children, iterator, context) {
    if (children !== null || children !== undefined) {
      children = Children.toArray(children);
      var length = children.length;

      if (length > 0) {
        if (context && context !== children) {
          iterator = iterator.bind(context);
        }

        for (var i = 0; i < length; i++) {
          var child = children[i];
          iterator(child, i, children);
        }
      }
    }
  },
  map: function map(children, iterator, context) {
    children = Children.toArray(children);

    if (context && context !== children) {
      iterator = iterator.bind(context);
    }

    return children.map(iterator);
  },
  toArray: function toArray(children) {
    if (children === null || children === undefined) {
      return [];
    }

    if (isArray(children)) {
      return (0, _RemixShared.flatten)(children);
    }

    return [].concat(children);
  },
  count: function count(children) {
    return Children.toArray(children).length;
  },
  only: function only(children) {
    children = Children.toArray(children);
    return children[0];
  }
};
exports.Children = Children;
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

function createElement(type, config) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var length = children.length;

  var _ref = config || {},
      key = _ref.key,
      ref = _ref.ref,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["key", "ref"]);

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];

      if (isArray(props.children)) {
        if (props.children.length === 1) {
          props.children = props.children[0];
        }
      }
    } else {
      props.children = children;
    }
  }

  return (0, _RemixElement.RemixElement)(type, props, key);
}

function Fragment(props) {
  return Children.toArray(props.children);
}

var Component = function Component() {
  (0, _classCallCheck2["default"])(this, Component);
  (0, _defineProperty2["default"])(this, "isReactComponent", true);
};

exports.Component = Component;

var PureComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PureComponent, _Component);

  var _super = _createSuper(PureComponent);

  function PureComponent() {
    var _this;

    (0, _classCallCheck2["default"])(this, PureComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isPureComponent", true);
    return _this;
  }

  return PureComponent;
}(Component);

exports.PureComponent = PureComponent;
var _default = {
  Fragment: Fragment,
  Component: Component,
  PureComponent: PureComponent,
  createElement: createElement
};
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/RemixAppSupport.js":
/*!***************************************!*\
  !*** ../remix/src/RemixAppSupport.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = exports.Publisher = exports.ERROR = exports.LAUNCH = exports.APP = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _tinyEmitter = _interopRequireDefault(__webpack_require__(/*! tiny-emitter */ "../remix/node_modules/tiny-emitter/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var APP = 'App',
    LAUNCH = 'onLaunch',
    ERROR = 'onError';
exports.ERROR = ERROR;
exports.LAUNCH = LAUNCH;
exports.APP = APP;
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
      Subscriber.emit(APP, {
        type: LAUNCH,
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

    _this.on(APP, function (_ref) {
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

/***/ "../remix/src/RemixComponents.js":
/*!***************************************!*\
  !*** ../remix/src/RemixComponents.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = Application;
exports.Router = Router;
exports.Route = Route;
exports.TabBar = TabBar;
exports.TabBarItem = TabBarItem;

var _Remix = _interopRequireWildcard(__webpack_require__(/*! ./Remix */ "../remix/src/Remix.js"));

function Application(props) {
  var cloneApplicationChildren = function cloneApplicationChildren() {
    var children = [];

    _Remix.Children.forEach(props.children, function (child) {
      if (child !== null) {
        var type = child.type;

        if (type === Router || type === TabBar) {
          children.push(child);
        }
      }
    });

    return children;
  };

  return cloneApplicationChildren();
}

function Router(props) {
  return /*#__PURE__*/_Remix["default"].createElement("router", null, props.children);
}

function Route() {}

Router.Route = Route;

function TabBar(props) {
  return /*#__PURE__*/_Remix["default"].createElement("tabbar", null, props.children);
}

function TabBarItem() {}

TabBar.TabBarItem = TabBarItem;
TabBar.propTypes = {
  color: _Remix.PropTypes.string,
  selectedColor: _Remix.PropTypes.string,
  backgroundColor: _Remix.PropTypes.string,
  borderStyle: _Remix.PropTypes.oneOf(['black', 'white']),
  position: _Remix.PropTypes.oneOf(['bottom', 'top']),
  custom: _Remix.PropTypes.bool
};
TabBar.defaultProps = {
  position: 'bottom',
  bottom: false
};

/***/ }),

/***/ "../remix/src/RemixDOMUpdator.js":
/*!***************************************!*\
  !*** ../remix/src/RemixDOMUpdator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMUpdateQueue = DOMUpdateQueue;

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remix/node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var ViewNativeSupport = _interopRequireWildcard(__webpack_require__(/*! ./RemixViewSupport */ "../remix/src/RemixViewSupport.js"));

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var _RemixViewController = __webpack_require__(/*! ./RemixViewController */ "../remix/src/RemixViewController.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TEXT_TAGNAME = '#text';

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

function serialize(element) {
  var json = element.tagName === TEXT_TAGNAME ? {
    tagName: element.tagName,
    text: element.text
  } : _objectSpread({
    vid: element.vid,
    tagName: element.tagName,
    tag: element.tag
  }, resolveDefaultProps(element.defaultProps, element));

  if (element.sibling) {
    json.sibling = serialize(element.sibling);
  }

  if (element.child) {
    json.child = serialize(element.child);
  }

  if (element.innerText) {
    json.innerText = element.innerText;
  }

  return json;
}

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

function DOMUpdateQueue(finishedWork) {
  var stateNode = finishedWork.stateNode;

  if (stateNode) {
    if (stateNode.tagName === _RemixViewController.TAG_NAME) {
      var element = serialize(stateNode);
      flattern(element);
      console.log(element.child);
      ViewNativeSupport.Publisher.Data(stateNode[_RemixShared.INTERNAL_RELATIVE_KEY], element.child);
    }
  }
}

/***/ }),

/***/ "../remix/src/RemixDocument.js":
/*!*************************************!*\
  !*** ../remix/src/RemixDocument.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window = exports.document = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _RemixUI = _interopRequireDefault(__webpack_require__(/*! ./RemixUI */ "../remix/src/RemixUI/index.js"));

// ---- HTML ELEMENT ----
var vid = 0;
var HTMLBlockSupport = 'section ol ul li div p footer header h1 h2 h3 h4 h5 h6 nav section dt dd dl code hr'.split(' ');
var HTMLInlineSupport = 'strong em span i b br a img'.split(' ');
var HTMLAliasSupport = 'img'.split(' ');
var HTMLAttributeAliasMap = {
  onClick: 'onTap'
};

var HTMLElement = /*#__PURE__*/function () {
  function HTMLElement() {
    (0, _classCallCheck2["default"])(this, HTMLElement);
    (0, _defineProperty2["default"])(this, "vid", "rx.".concat(vid++));
    (0, _defineProperty2["default"])(this, "return", null);
    (0, _defineProperty2["default"])(this, "sibling", null);
    (0, _defineProperty2["default"])(this, "child", null);
  }

  (0, _createClass2["default"])(HTMLElement, [{
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

      if (HTMLAttributeAliasMap[name]) {
        this[HTMLAttributeAliasMap[name]] = HTMLAttributeAliasMap[name];
      }
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this[name] = null;
    }
  }, {
    key: "ownerDocument",
    value: function ownerDocument() {
      return document;
    }
  }, {
    key: "getElementById",
    value: function getElementById(id) {
      if (this.vid === id) {
        return this;
      }

      var node = this.child;

      while (node) {
        if (node.vid === id) {
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
  }]);
  return HTMLElement;
}();

var document = typeof document === 'undefined' ? {
  createElement: function createElement(tagName) {
    var element = new HTMLElement();
    element.tagName = tagName;
    element.tag = tagName;

    if (HTMLAliasSupport.includes(tagName)) {
      element.tagName = 'image';
      element.defaultProps = _RemixUI["default"]['image'];
    } else if (HTMLInlineSupport.includes(tagName)) {
      element.tagName = 'text';
      element.defaultProps = _RemixUI["default"]['text'];
    } else if (HTMLBlockSupport.includes(tagName)) {
      element.tagName = 'view';
      element.defaultProps = _RemixUI["default"]['view'];
    } else {
      element.defaultProps = _RemixUI["default"][tagName];
    }

    return element;
  },
  createTextNode: function createTextNode(text) {
    return {
      tagName: '#text',
      text: text
    };
  },
  body: new HTMLElement('body')
} : document;
exports.document = document;
var window = typeof window === 'undefined' ? {
  document: document
} : window;
exports.window = window;

/***/ }),

/***/ "../remix/src/RemixElement.js":
/*!************************************!*\
  !*** ../remix/src/RemixElement.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemixElement = RemixElement;

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

function RemixElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var owner = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var element = {
    $$typeof: _RemixShared.REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  return element;
}

/***/ }),

/***/ "../remix/src/RemixEvent.js":
/*!**********************************!*\
  !*** ../remix/src/RemixEvent.js ***!
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

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var _RemixViewController = __webpack_require__(/*! ./RemixViewController */ "../remix/src/RemixViewController.js");

var HTMLBubbleEvents = ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'tap', 'longpress', 'longtap', 'touchforcechange', 'transitionend', 'animationstart', 'animationiteration', 'animationend'];
var HTMLDefaultBehaviorsTags = ['a'];
var HTMLAliasEventMap = {
  onTap: 'onClick'
};

var ViewEvent = /*#__PURE__*/function () {
  function ViewEvent(target, event, currentTarget) {
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
    this.bubbles = HTMLBubbleEvents.includes(this.type);
    this.cancelBubble = false;
    this.isPreventDefault = false;
    this.detail = detail;
    this.target = target;
    this.currentTarget = currentTarget || target;
  }

  (0, _createClass2["default"])(ViewEvent, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.cancelBubble = true;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.isPreventDefault = true;
    }
  }]);
  return ViewEvent;
}();

function dispatchEvent(view, type, event, target) {
  var props = view[_RemixShared.INTERNAL_EVENT_HANDLERS_KEY];
  var viewEvent = new ViewEvent(view, event, target);

  if (typeof props[type] === 'function') {
    props[type](event);
  } else {
    var alias = HTMLAliasEventMap[type];

    if (typeof props[alias] === 'function') {
      viewEvent.type = 'click';
      props[alias](viewEvent);
    }
  }

  if (HTMLDefaultBehaviorsTags.includes(view.tagName)) {
    if (!viewEvent.isPreventDefault) {
      if (props.href) {
        wx.navigator({
          url: props.href
        });
      }
    }
  }

  if (viewEvent.bubbles && !viewEvent.cancelBubble) {
    var parent = view["return"];

    if (parent && parent.tagName !== _RemixViewController.TAG_NAME) {
      dispatchEvent(parent, type, event, viewEvent.currentTarget);
    }
  }
}

function scheduleWork(_ref) {
  var type = _ref.type,
      event = _ref.event,
      view = _ref.view;
  return dispatchEvent(view, type, event);
}

/***/ }),

/***/ "../remix/src/RemixFiber.js":
/*!**********************************!*\
  !*** ../remix/src/RemixFiber.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFiber = createFiber;
exports.createWorkInProgress = createWorkInProgress;
exports.createFiberFromElement = createFiberFromElement;
exports.createFiberFromTypeAndProps = createFiberFromTypeAndProps;
exports.createFiberFromFragment = createFiberFromFragment;
exports.createFiberFromText = createFiberFromText;
exports.createFiberFromPortal = createFiberFromPortal;
exports.createFiberRoot = createFiberRoot;
exports.useFiber = useFiber;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

function createFiber(tag, pendingProps, key) {
  var _ref;

  return _ref = {
    tag: tag,
    // 
    key: key,
    pendingProps: pendingProps,
    memoizedProps: null,
    memoizedState: null,
    "return": null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: _RemixShared.NO_EFFECT,
    nextEffect: null,
    lastEffect: null,
    firstEffect: null,
    stateNode: null
  }, (0, _defineProperty2["default"])(_ref, "alternate", null), (0, _defineProperty2["default"])(_ref, "index", 0), (0, _defineProperty2["default"])(_ref, "updateQueue", null), (0, _defineProperty2["default"])(_ref, "workTag", _RemixShared.NO_WORK), (0, _defineProperty2["default"])(_ref, _RemixShared.INTERNAL_CHILDREN, null), _ref;
}

function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;

  if (workInProgress === null) {
    var tag = current.tag,
        key = current.key,
        type = current.type,
        elementType = current.elementType,
        stateNode = current.stateNode;
    workInProgress = createFiber(tag, pendingProps, key);
    workInProgress.elementType = elementType;
    workInProgress.type = type;
    workInProgress.stateNode = stateNode;
    workInProgress.workTag = _RemixShared.WORKING;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = _RemixShared.NO_EFFECT;
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  var child = current.child,
      memoizedProps = current.memoizedProps,
      memoizedState = current.memoizedState,
      updateQueue = current.updateQueue,
      sibling = current.sibling,
      index = current.index,
      ref = current.ref;
  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  workInProgress.updateQueue = updateQueue;
  return workInProgress;
}

function createFiberFromElement(element) {
  var owner = element._owner,
      key = element.key,
      type = element.type,
      pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  return fiber;
}

function createFiberFromTypeAndProps(type, key, pendingProps, owner) {
  var fiberTag = _RemixShared.FUNCTION_COMPONENT;
  var resolvedType = type;

  if (typeof type === 'function') {
    fiberTag = _RemixShared.FUNCTION_COMPONENT;
  } else if (type === 'object') {
    if (typeof type.render === 'function') {
      fiberTag = OBJECT_COMPONENT;
    } else {
      throw new Error("Unsupport component type");
    }
  } else if (typeof type === 'string') {
    fiberTag = _RemixShared.HOST_COMPONENT;
  }

  var fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  return fiber;
}

function createFiberFromFragment(elements) {
  return createFiber(_RemixShared.FRAGMENT, elements);
}

function createFiberFromText(content) {
  return createFiber(_RemixShared.HOST_TEXT, content);
}

function createFiberFromPortal() {}

function createFiberRoot(containerInfo) {
  var uninitializedFiber = createHostRootFiber();
  uninitializedFiber.stateNode = containerInfo;
  return {
    current: uninitializedFiber,
    containerInfo: containerInfo
  };
}

function useFiber(fiber, pendingProps) {
  var clone = createWorkInProgress(fiber, pendingProps);
  clone.index = 0;
  clone.sibling = null;
  return clone;
} // --- internal ----


function createHostRootFiber() {
  return createFiber(_RemixShared.HOST_ROOT, null, null);
}

/***/ }),

/***/ "../remix/src/RemixHook.js":
/*!*********************************!*\
  !*** ../remix/src/RemixHook.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReducer = useReducer;
exports.useMemo = useMemo;
exports.useCallback = useCallback;
exports.useState = useState;
exports.renderWithHooks = renderWithHooks;

var _RemixScheduler = __webpack_require__(/*! ./RemixScheduler */ "../remix/src/RemixScheduler.js");

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var is = Object.is;
var currentHook = null;
var nextCurrentHook = null;
var firstWorkInProgressHook = null;
var nextWorkInProgressHook = null;
var workInProgressHook = null;
var currentlyRenderingFiber = null;
var RemixHookDispatcher = {
  current: null
}; // ---- dispatcher ----

var HooksDispatcher = {
  useState: function useState(initialState) {
    var current = currentlyRenderingFiber.alternate;
    return current === null ? mountState(initialState) : updateState(initialState);
  },
  useMemo: function useMemo(callback, deps) {
    var current = currentlyRenderingFiber.alternate;
    return current === null ? mountMemo(callback, deps) : updateMemo(callback, deps);
  },
  useCallback: function useCallback(callback, deps) {
    var current = currentlyRenderingFiber.alternate;
    return current === null ? mountCallback(callback, deps) : updateCallback(callback, deps);
  }
};

function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
} // ---- hook callback ----


function mountCallback() {} // ---- hook memo ----


function mountMemo(callback, deps) {
  var hook = mountWorkInProgressHook();
  var value = callback();
  deps = deps === undefined ? null : deps;
  hook.memoizedState = [value, deps];
  return value;
}

function updateMemo(callback, deps) {
  var hook = updateWorkInProgressHook();
  var prevState = hook.memoizedState;
  deps === undefined ? null : deps;

  if (prevState !== null) {
    if (deps !== null) {
      var prevDeps = prevState[1];

      if ((0, _RemixShared.shallowEqual)(deps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  var value = callback();
  hook.memoizedState = [value, deps];
  return value;
} // ---- hook state ----


function mountState(initialState) {
  var hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = {
    last: null,
    dispatch: null
  };
  queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  hook.queue = queue;
  return [hook.memoizedState, queue.dispatch];
}

function updateState(initialState) {
  return updateReducer(basicStateReducer, initialState);
}

function updateReducer(reducer) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;
  var last = queue.last;
  var baseState = hook.baseState;
  var first = last !== null ? last.next : null;

  if (first !== null) {
    var newState = baseState;
    var update = first;

    do {
      var _update = update,
          action = _update.action;
      newState = reducer(newState, action);
      update = update.next;
    } while (update !== null && update !== first);

    if (!is(newState, hook.memoizedState)) {
      (0, _RemixScheduler.markWorkInProgressReceivedUpdate)();
    }

    hook.queue.last = null;
    hook.memoizedState = newState;
    hook.baseState = newState;
  }

  queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, queue.dispatch];
}

function updateWorkInProgressHook() {
  if (nextWorkInProgressHook !== null) {
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
    nextCurrentHook = currentHook !== null ? currentHook.next : null;
  } else {
    currentHook = nextCurrentHook;
    var hook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,
      next: null
    };

    if (workInProgressHook === null) {
      workInProgressHook = firstWorkInProgressHook = hook;
    } else {
      workInProgressHook = workInProgressHook.next = hook;
    }

    nextCurrentHook = currentHook.next;
  }

  return workInProgressHook;
}

function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    next: null
  };

  if (workInProgressHook === null) {
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook;
}

function dispatchAction(fiber, queue, action) {
  var update = {
    next: null,
    action: action
  };

  if (queue.last === null) {
    // 不存在 update，直接引用自身    
    update.next = update;
  } else {
    // 总是插在第一个 update 
    var last = queue.last;
    var first = last.next;

    if (first !== null) {
      // 在最新的update对象后面插入新的update对象
      update.next = first;
    }

    last.next = update;
  }

  queue.last = update;
  (0, _RemixScheduler.scheduleWork)(fiber);
}

function resolveDispatcher() {
  return RemixHookDispatcher.current;
} // ---- exports ----


function useReducer() {}

function useMemo(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(callback, deps);
}

function useCallback() {}

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function renderWithHooks(current, workInProgress, Component, nextProps) {
  RemixHookDispatcher.current = HooksDispatcher;
  currentlyRenderingFiber = workInProgress; // 非首次渲染，从 workInProgress memoizedState 取 hook

  nextCurrentHook = current !== null ? workInProgress.memoizedState : null;
  nextWorkInProgressHook = firstWorkInProgressHook;
  var children = Component(nextProps);
  var renderedWork = currentlyRenderingFiber;
  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.effectTag |= _RemixShared.SIDE_EFFECT; // 每次执行函数组件渲染，都需要重置全局变量

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;
  return children;
}

/***/ }),

/***/ "../remix/src/RemixHostConfig.js":
/*!***************************************!*\
  !*** ../remix/src/RemixHostConfig.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextInstance = createTextInstance;
exports.updateTextInstance = updateTextInstance;
exports.updateInstance = updateInstance;
exports.createInstance = createInstance;
exports.insertBefore = insertBefore;
exports.appendChild = appendChild;
exports.createElement = createElement;
exports.appendChildToContainer = appendChildToContainer;
exports.appendInitialChild = appendInitialChild;
exports.appendAllChildren = appendAllChildren;
exports.updateDOMProperties = updateDOMProperties;
exports.setDOMProperties = setDOMProperties;
exports.insertInContainerBefore = insertInContainerBefore;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js"));

var _RemixDocument = __webpack_require__(/*! ./RemixDocument */ "../remix/src/RemixDocument.js");

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var freeze = Object.freeze;
var hasOwnProperty = Object.hasOwnProperty;

function setValueForProperty(element, propName, value) {
  if (value === null) {
    element.removeAttribute(propName, value);
  } else {
    element.setAttribute(propName, value);
  }
}

function setTextContent(element, content) {
  element.innerText = content;
}

function setValueForStyles(element, styles) {
  var style = element.style;

  for (var styleName in styles) {
    if (styleName === _RemixShared.FLOAT) {
      styleName = 'cssFloat';
    }

    style[styleName] = styles[styleName];
  }
} // ---- export ----


function createTextInstance(text) {
  return _RemixDocument.document.createTextNode(text);
}

function updateTextInstance(instance, text) {
  instance.text = text;
}

function updateInstance(element, props, workInProgress) {
  element[_RemixShared.INTERNAL_INSTANCE_KEY] = workInProgress;
  element[_RemixShared.INTERNAL_EVENT_HANDLERS_KEY] = props;
}

function createInstance(type, props, workInProgress) {
  var element = _RemixDocument.document.createElement(type);

  element[_RemixShared.INTERNAL_INSTANCE_KEY] = workInProgress;
  element[_RemixShared.INTERNAL_EVENT_HANDLERS_KEY] = props;
  return element;
}

function insertBefore(instance, child, beforeChild) {
  instance.insertBefore(child, beforeChild);
}

function appendChild(instance, child) {
  instance.appendChild(child);
}

function createElement(type, props) {
  var element;

  if (typeof props.is === 'string') {
    element = _RemixDocument.document.createElemeent(type, {
      is: props.is
    });
  } else {
    element = _RemixDocument.document.createElemeent(type);
  }

  return element;
}

function appendChildToContainer(parentNode, child) {
  parentNode.appendChild(child);
}

function appendInitialChild(instance, child) {
  instance.appendChild(child);
}

function appendAllChildren(instance, workInProgress) {
  var node = workInProgress.child;

  while (node !== null) {
    if (node.tag === _RemixShared.HOST_COMPONENT || node.tag === _RemixShared.HOST_TEXT) {
      appendInitialChild(instance, node.stateNode);
    } else if (node.child !== null) {
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

function updateDOMProperties(tag, element, pendingProps, memoizedProps) {
  setDOMProperties(tag, element);
}

function setDOMProperties(tag, element, nextProps) {
  for (var propName in nextProps) {
    if (hasOwnProperty.call(nextProps, propName)) {
      var nextProp = nextProps[propName];

      if (propName === _RemixShared.STYLE) {
        if (nextProp) {
          freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _RemixShared.CHILDREN) {
        var canSetTextContent = tag !== 'textarea' || nextProp !== '';
        var typeofProp = (0, _typeof2["default"])(nextProp);

        if (canSetTextContent) {
          if (typeofProp === 'string' || typeofProp === 'number') {
            setTextContent(element, nextProp);
          }
        }
      } else if (propName.startsWith('on')) {
        setValueForProperty(element, propName, propName);
      } else if (nextProp !== null) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}

function insertInContainerBefore(parentNode, child, beforeChild) {
  parentNode.insertBefore(child, beforeChild);
}

/***/ }),

/***/ "../remix/src/RemixMaxHeap.js":
/*!************************************!*\
  !*** ../remix/src/RemixMaxHeap.js ***!
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

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remix/node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../remix/node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// leftIndex = parentIndex * 2 + 1
// rightIndex = parentIndex * 2 + 2;
// parentIndex = (rightIndex - 2) / 2;
// parentIndex = (leftIndex - 1) / 2
var RemixMaxHeap = /*#__PURE__*/function (_Array) {
  (0, _inherits2["default"])(RemixMaxHeap, _Array);

  var _super = _createSuper(RemixMaxHeap);

  function RemixMaxHeap() {
    (0, _classCallCheck2["default"])(this, RemixMaxHeap);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RemixMaxHeap, [{
    key: "siftUp",
    value: function siftUp() {
      var childIndex = this.length - 1;
      var parentIndex = childIndex >>> 1;

      while (true) {
        var child = this[childIndex];
        var parent = this[parentIndex];
        console.log('childIndex', childIndex, child);
        console.log('parentIndex', parentIndex, parent);

        if (childIndex === 0) {
          break;
        } // 如果 child > parent,  则交换


        if (this.gt(child, parent)) {
          this[childIndex] = parent;
          this[parentIndex] = child;
          childIndex = parentIndex;
          parentIndex = childIndex >>> 1;
        } else {
          break;
        }
      }
    }
  }, {
    key: "siftDown",
    value: function siftDown() {
      // 取最后一个元素，放到顶部
      var length = this.length; // 预处理，不处理 length = 1 ; length = 0 情况

      if (length == 2) {
        if (this.gt(this[1], this[0])) {
          var first = this[0];
          this[0] = this[1];
          this[1] = first;
        }
      } else if (length > 2) {
        var _first = (0, _get2["default"])((0, _getPrototypeOf2["default"])(RemixMaxHeap.prototype), "pop", this).call(this);

        this.unshift(_first);
        var parentIndex = 0;

        while (true) {
          var leftIndex = 2 * parentIndex + 1;
          var childIndex = leftIndex;
          var parent = this[parentIndex]; // 比较左右节点

          if (leftIndex + 1 < length) {
            if (!this.gt(this[leftIndex], this[leftIndex + 1])) {
              childIndex += 1;
            }
          } // 比较上下节点


          if (this.gt(this[childIndex], this[parentIndex])) {
            this[parentIndex] = this[childIndex];
            this[childIndex] = parent;
            parentIndex = childIndex;

            if (parentIndex === length - 1) {
              break;
            }
          } else {
            break;
          }
        }
      }
    }
  }, {
    key: "peek",
    value: function peek() {
      return this[0];
    }
  }, {
    key: "push",
    value: function push(node) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(RemixMaxHeap.prototype), "push", this).call(this, node);

      if (this.length > 1) {
        this.siftUp();
      }

      console.log(this);
    }
  }, {
    key: "pop",
    value: function pop() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(RemixMaxHeap.prototype), "shift", this).call(this);
      this.siftDown();
    }
  }, {
    key: "gt",
    value: function gt(child, parent) {
      throw new Error("Mustimplement this method");
    }
  }]);
  return RemixMaxHeap;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Array)); // const heap = new RemixMaxHeap();
// heap.gt = function (child, parent) {
//   return child > parent;
// }
// heap.push(1);
// heap.push(4);
// heap.push(3);
// heap.push(5);
// console.log(heap);
// heap.pop();
// console.log(heap);


var _default = RemixMaxHeap;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixProject.js":
/*!************************************!*\
  !*** ../remix/src/RemixProject.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = Program;
exports.View = View;
exports.RemixApplication = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Remix = _interopRequireDefault(__webpack_require__(/*! ./Remix */ "../remix/src/Remix.js"));

var _RemixRenderer = _interopRequireDefault(__webpack_require__(/*! ./RemixRenderer */ "../remix/src/RemixRenderer.js"));

var _RemixRuntime = _interopRequireDefault(__webpack_require__(/*! ./RemixRuntime */ "../remix/src/RemixRuntime.js"));

var Support = _interopRequireWildcard(__webpack_require__(/*! ./RemixViewSupport */ "../remix/src/RemixViewSupport.js"));

var _RemixComponents = __webpack_require__(/*! ./RemixComponents */ "../remix/src/RemixComponents.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var viewId = 0;
var TabBarItem = _RemixComponents.TabBar.TabBarItem;
var Subscriber = Support.Subscriber,
    Publisher = Support.Publisher;

function nextFiber(node) {
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
}

var RemixApplication = {
  current: null
};
exports.RemixApplication = RemixApplication;

function Program(App, container) {
  var context = null;
  return RemixApplication.current = {
    start: function start() {
      (0, _RemixRuntime["default"])(this.context, this.instance);
    },

    get currentFiber() {
      (0, _RemixRenderer["default"])(_Remix["default"].createElement(App), container);
      var currentFiber = container.__internalRoot.current;
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
          if (elementType === _RemixComponents.Application) {
            context.config = node.memoizedProps.config;
            this.instance = node.stateNode;
          } else if (elementType === _RemixComponents.Route) {
            if (!node.memoizedProps.component.__remix__) {
              console.warn("<Route path='".concat(node.memoizedProps.path, "' /> \u8DEF\u7531\u7EC4\u4EF6\u8BF7\u4F7F\u7528 useController \u5305\u88C5\uFF0C\u5426\u5219\u65E0\u6CD5\u8BFB\u53D6\u9875\u9762\u914D\u7F6E\u6587\u4EF6"));
            }

            context.router.routes.push({
              path: node.memoizedProps.path,
              component: node.memoizedProps.component,
              config: node.memoizedProps.component.config || {}
            });
          } else if (elementType === _RemixComponents.TabBar) {
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

        node = nextFiber(node);
      }

      return context;
    }

  };
}

function View(route) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var view = {
    id: "rc.".concat(viewId++),
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

        Subscriber.on("".concat(Support.DATA, ".").concat(view.id), function (id, element) {
          if (id === view.id) {
            _this.setData({
              type: 'SYNC',
              element: element
            });
          }
        });
        Publisher.Load(_objectSpread({}, view, {
          query: query
        }));
      },
      onShow: function onShow() {
        Publisher.Show(view);
      },
      onUnload: function onUnload() {
        Subscriber.off("".concat(Support.DATA, ".").concat(view.id));
      }
    });
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}

/***/ }),

/***/ "../remix/src/RemixRenderer.js":
/*!*************************************!*\
  !*** ../remix/src/RemixRenderer.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports["default"] = void 0;

var _RemixFiber = __webpack_require__(/*! ./RemixFiber */ "../remix/src/RemixFiber.js");

var _RemixScheduler = __webpack_require__(/*! ./RemixScheduler */ "../remix/src/RemixScheduler.js");

// ---- export ----
function render(element, container, callback) {
  var root = container.__internalRoot || (container.__internalRoot = (0, _RemixFiber.createFiberRoot)(container));
  (0, _RemixScheduler.updateContainer)(element, root, callback);
}

var _default = render;
exports["default"] = _default;

/***/ }),

/***/ "../remix/src/RemixRuntime.js":
/*!************************************!*\
  !*** ../remix/src/RemixRuntime.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _RemixViewController = __webpack_require__(/*! ./RemixViewController */ "../remix/src/RemixViewController.js");

var Support = _interopRequireWildcard(__webpack_require__(/*! ./RemixAppSupport */ "../remix/src/RemixAppSupport.js"));

var Publisher = Support.Publisher;

function _default(context, instance) {
  new _RemixViewController.ViewControllersManager(context, instance);
  runApplication(context, instance);
}

function runApplication(context, instance) {
  if (typeof App === 'function') {
    wx.showTabBar();
    wx.hideLoading();
    App({
      onLaunch: function onLaunch(options) {
        Publisher.Launch(options);
      },
      onError: function onError() {}
    });
  } else {
    throw new Error("\u8BF7\u8FD0\u884C\u5728\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u73AF\u5883");
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixScheduler.js":
/*!**************************************!*\
  !*** ../remix/src/RemixScheduler.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleWork = scheduleWork;
exports.updateContainer = updateContainer;
exports.markWorkInProgressReceivedUpdate = markWorkInProgressReceivedUpdate;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remix/node_modules/@babel/runtime/helpers/typeof.js"));

var _RemixMaxHeap = _interopRequireDefault(__webpack_require__(/*! ./RemixMaxHeap */ "../remix/src/RemixMaxHeap.js"));

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var _RemixHook = __webpack_require__(/*! ./RemixHook */ "../remix/src/RemixHook.js");

var _RemixFiber = __webpack_require__(/*! ./RemixFiber */ "../remix/src/RemixFiber.js");

var _RemixViewController = __webpack_require__(/*! ./RemixViewController */ "../remix/src/RemixViewController.js");

var _RemixDOMUpdator = __webpack_require__(/*! ./RemixDOMUpdator */ "../remix/src/RemixDOMUpdator.js");

var _RemixHostConfig = __webpack_require__(/*! ./RemixHostConfig */ "../remix/src/RemixHostConfig.js");

// 全局函数
var RemixRootFiber = {
  current: null
};
var RemixHeap = new _RemixMaxHeap["default"]();
var RmeixDeadline = 0;
var nextUnitOfWork = null;
var firstEffect = null;
var nextEffect = null;
var didReceiveUpdate = false;
var isRendering = false;
var isCommiting = false;
var isWorking = false;
var isArray = Array.isArray;

RemixHeap.gt = function (child, parent) {
  if (child === _RemixViewController.RemixViewController.current) {
    return true;
  } else if (parent === _RemixViewController.RemixViewController.current) {
    return false;
  }

  return child.expiration > child.expiration;
}; // ---- typeOf ----


function typeOf(object) {
  var type = (0, _typeof2["default"])(object);

  if (isArray(object)) {
    type = 'array';
  } else if (type === 'object') {
    type = object === null ? 'null' : type;
  }

  return type;
} // --- Priority  ----


function createPriorityRootNode(root) {
  root.expiration = _RemixShared.performance.now() + 30;
  return root;
} // ---- update ----


function createUpdate() {
  return {
    tag: _RemixShared.UPDATE_STATE,
    expirationTime: null,
    next: null,
    payload: null
  };
}

function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null
  };
}

function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate; // 如果备胎不存在，首次渲染

  if (alternate === null) {
    // 尚未初始化 updateQueue
    if (fiber.updateQueue === null) {
      fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  }

  var updateQueue = fiber.updateQueue;

  if (updateQueue.lastUpdate === null) {
    updateQueue.firstUpdate = updateQueue.lastUpdate = update;
  } else {
    firstUpdate = updateQueue.firstUpdate;
    updateUpdate.firstUpdate = update;
    update.next = firstUpdate;
  }
} // ---- schedule ----


function scheduleRootUpdate(current, element, callback) {
  var update = createUpdate();
  update.payload = {
    element: element
  };

  if (typeof callback === 'function') {
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  scheduleWork(current, _RemixShared.SYNC);
} // 获取优先级


function findTheHighestPriorityRoot(root) {
  if (typeof root.expiration === 'undefined') {
    root = createPriorityRootNode(root);
  }

  RemixHeap.push(root);
  return RemixHeap.peek();
}

function scheduleWork(current, sync) {
  var fiber = current;
  current.workTag = _RemixShared.WORKING;

  while (fiber) {
    if (fiber.tag === _RemixShared.HOST_ROOT) {
      break;
    }

    fiber = fiber["return"];
  }

  var internalRoot = fiber.stateNode.__internalRoot;
  var root = findTheHighestPriorityRoot(internalRoot);
  requestWork(root, sync);
}

function flushWork() {} // ---- update --- 
// --- begin work ----


function requestWork(root, sync) {
  if (!isCommiting) {
    if (nextUnitOfWork === null) {
      nextUnitOfWork = (0, _RemixFiber.createWorkInProgress)(root.current, null);
      performWork(root, sync);

      if (nextUnitOfWork !== null) {
        flushWork();
      } else {
        if (RemixHeap.length > 0) {
          RemixHeap.pop();

          var _root = RemixHeap.peek();

          if (_root) {
            requestWork(_root);
          }
        }
      }
    }
  }
}

function performWork(root, sync) {
  workLoop(sync);

  if (nextUnitOfWork === null) {
    var current = root.current;
    root.finishedWork = current.alternate;
    commitRoot(root);
  }
}

function workLoop(sync) {
  workLoop: while (nextUnitOfWork !== null && // 已经完成循环
  !shouldYield(sync) // 没有空余时间处理
  ) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork(workInProgress) {
  var current = workInProgress.alternate;
  var next = beginWork(current, workInProgress);
  workInProgress.memoizedProps = workInProgress.pendingProps;

  if (next === null) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}

function beginWork(current, workInProgress) {
  if (current !== null && workInProgress.workTag !== _RemixShared.WORKING) {
    var props = current.memoizedProps;
    var pendingProps = workInProgress.pendingProps;

    if (workInProgress.type !== current.type || props !== pendingProps) {
      didReceiveUpdate = true;
    } else {
      didReceiveUpdate = false;
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
  }

  workInProgress.workTag = _RemixShared.NO_WORK;

  switch (workInProgress.tag) {
    case _RemixShared.HOST_ROOT:
      {
        var Component = workInProgress.type;
        return updateHostRoot(current, workInProgress, Component);
      }

    case _RemixShared.FUNCTION_COMPONENT:
      {
        var _Component = workInProgress.type;
        var unresolvedProps = workInProgress.pendingProps;
        var resolvedProps = workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
        return updateFunctionComponent(current, workInProgress, _Component, resolvedProps);
      }

    case _RemixShared.HOST_COMPONENT:
      {
        return updateHostComponent(current, workInProgress);
      }

    case _RemixShared.HOST_TEXT:
      {
        return null;
      }

    case _RemixShared.FRAGMENT:
      {
        return updateFragment(current, workInProgress);
      }
  }
} // ---- complete work ----


function completeUnitOfWork(workInProgress) {
  while (true) {
    var _workInProgress = workInProgress,
        current = _workInProgress.alternate,
        returnFiber = _workInProgress["return"],
        siblingFiber = _workInProgress.sibling,
        effectTag = _workInProgress.effectTag;
    completeWork(current, workInProgress); // if (effectTag > PERFORMED) {
    //   if (firstEffect === null) {
    //     firstEffect = nextEffect = workInProgress;
    //   } else {
    //     workInProgress.nextEffect = firstEffect;
    //     firstEffect = workInProgress;
    //   }
    // }

    if (returnFiber !== null) {
      siblingFiber = workInProgress.sibling;

      if (siblingFiber !== null) {
        return siblingFiber;
      }

      workInProgress = returnFiber;
    } else {
      return null;
    }
  }
}

function completeWork(current, workInProgress) {
  var pendingProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case _RemixShared.HOST_ROOT:
      {
        var instance = workInProgress.stateNode;
      }

    case _RemixShared.HOST_COMPONENT:
      {
        var type = workInProgress.type;
        var _instance = workInProgress.stateNode;

        if (current !== null && _instance !== null) {
          var props = current.memoizedProps;

          if (props !== pendingProps) {
            var _instance2 = workInProgress.stateNode;
            (0, _RemixHostConfig.updateInstance)(_instance2, pendingProps, workInProgress);
            (0, _RemixHostConfig.setDOMProperties)(type, _instance2, pendingProps);
          }
        } else {
          var _instance3 = (0, _RemixHostConfig.createInstance)(type, pendingProps, workInProgress);

          (0, _RemixHostConfig.setDOMProperties)(type, _instance3, pendingProps);
          workInProgress.stateNode = _instance3;
        }

        break;
      }

    case _RemixShared.HOST_TEXT:
      {
        var _instance4 = workInProgress.stateNode;

        if (current !== null && _instance4 !== null) {
          (0, _RemixHostConfig.updateTextInstance)(_instance4, pendingProps);
        } else {
          var _instance5 = (0, _RemixHostConfig.createTextInstance)(pendingProps);

          workInProgress.stateNode = _instance5;
        }
      }
  }

  return null;
} // ---- update ----
// ---- updateFragment ----


function updateFragment(current, workInProgress) {
  var children = workInProgress.pendingProps;
  reconcileChildren(current, workInProgress, workInProgress.child, children);
  return workInProgress.child;
} // ---- updateHostComponent ----


function updateHostComponent(current, workInProgress) {
  var pendingProps = workInProgress.pendingProps;
  var children = pendingProps.children;

  if (typeof children === 'string' || typeof children === 'number') {
    children = null;
  }

  reconcileChildren(current, workInProgress, workInProgress.child, children);
  return workInProgress.child;
} // ----> updateFunctionComponent


function updateFunctionComponent(current, workInProgress, Component, nextProps) {
  var children = (0, _RemixHook.renderWithHooks)(current, workInProgress, Component, nextProps);

  if (current !== null && !didReceiveUpdate) {
    return bailoutHooks(current, workInProgress);
  } else {
    workInProgress.effectTag |= _RemixShared.PERFORMED;
    reconcileChildren(current, workInProgress, workInProgress.child, children);
  }

  return workInProgress.child;
}

function bailoutHooks(current, workInProgress) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= ~(_RemixShared.PASSIVE | _RemixShared.UPDATE);
  return workInProgress.child;
} // ---- updateHostROot ----


function updateHostRoot(current, workInProgress) {
  var updateQueue = workInProgress.updateQueue;
  var memoizedState = workInProgress.memoizedState;
  var children = memoizedState !== null ? memoizedState.element : null;

  if (updateQueue.lastUpdate !== null) {
    var update = updateQueue.firstUpdate;
    var baseState = update.payload;

    if (typeof update.callback === 'function') {
      workInProgress.effectTag |= _RemixShared.CALLBACK;
      update.nextEffect = null;

      if (updatQueue.lastEffect === null) {
        updatQueue.firstEffect = updatQueue.lastEffect = update;
      } else {
        updatQueue.lastEffect.nextEffect = update;
        updatQueue.lastEffect = update;
      }
    }

    update.next = null;
    updateQueue.firstUpdate = null;
    updateQueue.lastUpdate = null;
    updateQueue.baseState = baseState;
    workInProgress.memoizedState = baseState;
  }

  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  reconcileChildren(current, workInProgress, workInProgress.child, nextChildren);
  return workInProgress.child;
} // ---- reconicle ----


function reconcileChildren(current, workInProgress, currentFiber, children) {
  var shouldTrackSideEffects = current !== null;
  var returnFiber = workInProgress;
  var type = typeOf(children);

  switch (type) {
    case 'object':
      {
        var $$typeof = children.$$typeof;

        if ($$typeof === _RemixShared.REACT_ELEMENT_TYPE) {
          var childFiber = placeSingleChild(reconcileSingleElement(returnFiber, currentFiber, children, shouldTrackSideEffects));
          childFiber["return"] = returnFiber;
          returnFiber.child = childFiber;
          return childFiber;
        } else {
          debugger;
        }
      }

    case 'number':
    case 'string':
      {
        var _childFiber = (0, _RemixFiber.createFiberFromText)(children);

        _childFiber["return"] = returnFiber;
        returnFiber.child = _childFiber;
        return placeSingleChild(_childFiber, shouldTrackSideEffects);
      }

    case 'array':
      {
        var _childFiber2 = reconcileChildrenArray(returnFiber, currentFiber, children, shouldTrackSideEffects);

        _childFiber2["return"] = returnFiber;
        returnFiber.child = _childFiber2;
        return _childFiber2;
      }

    default:
      return null;
  }
}

function bailoutOnAlreadyFinishedWork(current, workInProgress) {
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}

function cloneChildFibers(current, workInProgress) {
  if (workInProgress.child === null) {
    return null;
  }

  var child = workInProgress.child;
  var newChild = (0, _RemixFiber.createWorkInProgress)(child, child.pendingProps);
  workInProgress.child = newChild;
  newChild["return"] = workInProgress;

  while (child.sibling !== null) {
    child = child.sibling;
    newChild = newChild.sibling = (0, _RemixFiber.createWorkInProgress)(child, child.pendingProps);
    newChild["return"] = workInProgress;
  }

  newChild.sibling = null;
}

function reconcileSinglePortal() {}

function reconcileChildrenArray(returnFiber, currentFiber, children, shouldTrackSideEffects) {
  var prevFiber = null;
  var childIndex = 0;
  var length = children.length;

  if (shouldTrackSideEffects) {
    diff: do {
      var element = children[childIndex];
      var type = typeOf(element);
      var childFiber = null;
      var _currentFiber = currentFiber,
          memoizedProps = _currentFiber.memoizedProps,
          tag = _currentFiber.tag;

      if (currentFiber.index === childIndex) {
        switch (type) {
          case 'array':
            {
              if (memoizedProps.length !== element.length) {
                break diff;
              }

              childFiber = (0, _RemixFiber.useFiber)(currentFiber, element);
              break;
            }

          case 'object':
            {
              var $$typeof = element.$$typeof;

              if ($$typeof === _RemixShared.REACT_ELEMENT_TYPE) {
                if (currentFiber.key !== element.key || currentFiber.elementType !== element.type) {
                  break diff;
                }

                childFiber = (0, _RemixFiber.useFiber)(currentFiber, element.props);
              } else {}

              break;
            }

          case 'string':
          case 'number':
            {
              if (tag !== _RemixShared.HOST_TEXT) {
                break diff;
              }

              childFiber = (0, _RemixFiber.useFiber)(currentFiber, element);
              break;
            }

          default:
            break;
        }
      } else {
        break;
      }

      currentFiber = currentFiber.sibling;
      childIndex++;

      if (childFiber !== null) {
        childFiber.index = childIndex;
        childFiber["return"] = returnFiber;
        childFiber.effectTag |= _RemixShared.PLACEMENT;
        prevFiber !== null ? prevFiber.sibling = childFiber : returnFiber.child = childFiber;
        prevFiber = childFiber;
      }
    } while (childIndex < length && currentFiber !== null);

    if (currentFiber.sibling !== null) {
      deleteRemainingChildren(returnFiber, currentFiber, shouldTrackSideEffects);
    }
  }

  do {
    var _element = children[childIndex];

    var _type = typeOf(_element);

    var _childFiber3 = null;

    switch (_type) {
      case 'array':
        {
          _childFiber3 = (0, _RemixFiber.createFiberFromFragment)(_element);
          break;
        }

      case 'object':
        {
          var _$$typeof = _element.$$typeof;
          _childFiber3 = _$$typeof === _RemixShared.REACT_ELEMENT_TYPE ? (0, _RemixFiber.createFiberFromElement)(_element) : (0, _RemixFiber.createFiberFromFragment)(_element);
          break;
        }

      case 'number':
      case 'string':
        {
          _childFiber3 = (0, _RemixFiber.createFiberFromText)('' + _element);
          break;
        }
    }

    if (_childFiber3 !== null) {
      _childFiber3.index = childIndex;
      _childFiber3["return"] = returnFiber;
      _childFiber3.effectTag |= _RemixShared.PLACEMENT;
      prevFiber !== null ? prevFiber.sibling = _childFiber3 : returnFiber.child = _childFiber3;
      placeSingleChild(_childFiber3, shouldTrackSideEffects);
      prevFiber = _childFiber3;
    }

    childIndex++;
  } while (childIndex < length); // returnFiber[INTERNAL_CHILDREN] = children;


  return returnFiber.child;
}

function placeSingleChild(fiber, shouldTrackSideEffects) {
  if (!shouldTrackSideEffects && fiber.alternate === null) {
    fiber.effectTag |= _RemixShared.PLACEMENT;
    nextEffect = nextEffect === null ? fiber : nextEffect.nextEffect = fiber;
  }

  return fiber;
}

function reconcileSingleElement(returnFiber, currentFiber, element, shouldTrackSideEffects) {
  var key = element.key;
  var elementType = element.type;
  var child = currentFiber;

  while (child !== null) {
    if (child.key === key) {
      if (child.tag === _RemixShared.FRAGMENT) {
        if (element.type === _RemixShared.REACT_FRAGMENT_TYPE) {
          deleteRemainingChildren(returnFiber, child.sibling);

          var _fiber = (0, _RemixFiber.useFiber)(child, element.props.children);

          _fiber["return"] = returnFiber;
          return _fiber;
        }
      } else {
        if (child.elementType === element.type) {
          var _fiber2 = (0, _RemixFiber.useFiber)(child, element.props);

          _fiber2["return"] = returnFiber;
          return _fiber2;
        }
      }

      deleteRemainingChildren(returnFiber, child, shouldTrackSideEffects);
      break;
    } else {
      deleteChild(child, shouldTrackSideEffects);
    }

    child = child.sibling;
  }

  var newFiber;

  if (elementType === _RemixShared.REACT_FRAGMENT_TYPE) {} else {
    newFiber = (0, _RemixFiber.createFiberFromElement)(element);
    newFiber["return"] = returnFiber;
  }

  return newFiber;
}

function deleteRemainingChildren(returnFiber, currentFiber, shouldTrackSideEffects) {
  var child = currentFiber;

  while (child) {
    deleteChild(returnFiber, child, shouldTrackSideEffects);
    child = child.sibling;
  }
}

function deleteChild(child, shouldTrackSideEffects) {
  if (shouldTrackSideEffects) {
    child.effectTag = _RemixShared.DELETION;
    nextEffect = nextEffect === null ? fiber : nextEffect.nextEffect = fiber;
  }
}

function createChild(returnFiber, child) {
  var type = typeOf(child);

  switch (type) {
    case 'string':
    case 'number':
      {
        var _fiber3 = (0, _RemixFiber.createFiberFromText)('' + child);

        _fiber3["return"] = returnFiber;
        return _fiber3;
      }

    case 'object':
      {
        switch (child.$$typeof) {
          case _RemixShared.REACT_ELEMENT_TYPE:
            {
              var _fiber4 = (0, _RemixFiber.createFiberFromElement)(child);

              _fiber4["return"] = returnFiber;
              return _fiber4;
            }

          case REACT_PORTAL_TYPE:
            {
              var _fiber5 = createFiberFromPortal(child);

              _fiber5["return"] = returnFiber;
              return _fiber5;
            }
        }
      }

    case 'array':
      {
        var _fiber6 = (0, _RemixFiber.createFiberFromFragment)(child, key);

        _fiber6["return"] = returnFiber;
        return _fiber6;
      }
  }

  return null;
} // ---- commit work ----


function commitRoot(root) {
  var finishedWork = root.finishedWork;
  finishedWork.nextEffect = firstEffect;
  firstEffect = finishedWork;
  isCommiting = true;

  if (firstEffect !== null) {
    nextEffect = firstEffect;

    do {
      commitMutationEffects();
      nextEffect = nextEffect.nextEffect;
    } while (nextEffect !== null);
  }

  firstEffect = null;
  nextEffect = null;
  root.current = root.finishedWork;
  root.finishedWork = null;
  isCommiting = false;
  (0, _RemixDOMUpdator.DOMUpdateQueue)(finishedWork);
}

function commitMutationEffects() {
  var effectTag = nextEffect.effectTag;
  debugger;

  if (effectTag & _RemixShared.CONTENT_RESET) {}

  if (effectTag & _RemixShared.REF) {}

  switch (effectTag & (_RemixShared.PLACEMENT | _RemixShared.UPDATE | _RemixShared.DELETION)) {
    case _RemixShared.PLACEMENT:
      {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~_RemixShared.PLACEMENT;
        break;
      }

    case _RemixShared.PLACEMENT_AND_UPDATE:
      {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~_RemixShared.PLACEMENT;
        commitUpdate(nextEffect);
        nextEffect.effectTag &= ~_RemixShared.UPDATE;
        break;
      }

    case _RemixShared.UPDATE:
      {
        commitUpdate(nextEffect);
        nextEffect.effectTag &= ~_RemixShared.UPDATE;
        break;
      }

    case _RemixShared.DELETION:
      {
        debugger;
        commitDeletion(nextEffect);
      }
  }
}

function commitDeletion(fiber) {
  fiber["return"] = null;
  fiber.child = null;
  fiber.memoizedState = null;
  fiber.updateQueue = null;
  var alternate = fiber.alternate;

  if (alternate !== null) {
    alternate["return"] = null;
    alternate.child = null;
    alternate.memoizedState = null;
    alternate.updateQueue = null;
  }
}

function commitPlacement(fiber) {
  var parentFiber = fiber["return"];

  while (parentFiber !== null) {
    if (isHostParentFiber(parentFiber)) {
      break;
    }

    parentFiber = parentFiber["return"];
  }

  if (parentFiber === null) {
    debugger;
  }

  var tag = parentFiber.tag;
  var isContainer = false;
  var parentNode = parentFiber.stateNode;

  if (tag === _RemixShared.HOST_COMPONENT) {
    isContainer = false;
  } else if (tag === _RemixShared.HOST_ROOT || tag === _RemixShared.HOST_PORTAL) {
    isContainer = true;
  }

  var before = getHostSibling(fiber);
  var fiberTag = fiber.tag,
      stateNode = fiber.stateNode;
  var isHost = fiberTag === _RemixShared.HOST_COMPONENT || fiberTag === _RemixShared.HOST_TEXT;

  if (isHost) {
    if (before) {
      if (isContainer) {
        (0, _RemixHostConfig.insertInContainerBefore)(parentNode, stateNode, before);
      } else {
        (0, _RemixHostConfig.insertBefore)(parentNode, stateNode, before);
      }
    } else {
      if (isContainer) {
        (0, _RemixHostConfig.appendChildToContainer)(parentNode, stateNode);
      } else {
        (0, _RemixHostConfig.appendChild)(parentNode, stateNode);
      }
    }
  }
}

function isHostParentFiber(_ref) {
  var tag = _ref.tag;
  return tag === _RemixShared.HOST_COMPONENT || tag === _RemixShared.HOST_ROOT || tag === _RemixShared.HOST_PORTAL;
}

function getHostSibling(fiber) {
  var node = fiber;

  siblings: while (true) {
    while (node.sibling === null) {
      if (node["return"] === null || isHostParentFiber(node["return"])) {
        return null;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;

    while (node.tag !== _RemixShared.HOST_COMPONENT && node.tag !== _RemixShared.HOST_TEXT) {
      if (node.effectTag & _RemixShared.PLACEMENT) {
        continue siblings;
      }

      if (node.child === null || node.tag === _RemixShared.HOST_PORTAL) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = node.child;
      }
    }

    if (!(node.effectTag & _RemixShared.PLACEMENT)) {
      return node.stateNode;
    }
  }
}

function commitUpdate() {
  debugger;
} // --- shared ----


function shouldYield(sync) {
  if (sync === _RemixShared.SYNC) {
    return false;
  }
} // --- export ---


function updateContainer(element, container, callback) {
  var current = container.current;
  return scheduleRootUpdate(current, element, callback);
}

function markWorkInProgressReceivedUpdate() {
  didReceiveUpdate = true;
}

/***/ }),

/***/ "../remix/src/RemixShared.js":
/*!***********************************!*\
  !*** ../remix/src/RemixShared.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEqual = shallowEqual;
exports.resolveDefaultProps = resolveDefaultProps;
exports.flatten = flatten;
exports.NO_WORK = exports.WORKING = exports.FLOAT = exports.CHILDREN = exports.STYLE = exports.REACT_LAZY_TYPE = exports.REACT_MEMO_TYPE = exports.REACT_SUSPENSE_TYPE = exports.REACT_FRAGMENT_TYPE = exports.REACT_PORTAL_TYPE = exports.REACT_ELEMENT_TYPE = exports.SYNC = exports.ASYNC = exports.UPDATE_STATE = exports.EDITOR = exports.TEXTAREA = exports.VIDEO = exports.SWIPER = exports.SWIPER_ITEM = exports.PICKER = exports.PLAIN_TEXT = exports.TEXT = exports.BODY = exports.ROOT = exports.VIEW = exports.INPUT = exports.MAP = exports.BUTTON = exports.IMAGE = exports.INCOMPLETE = exports.PASSIVE = exports.SNAPSHOT = exports.REF = exports.ERROR = exports.CALLBACK = exports.CONTENT_RESET = exports.DELETION = exports.PLACEMENT_AND_UPDATE = exports.UPDATE = exports.PLACEMENT = exports.PERFORMED = exports.NO_EFFECT = exports.SIDE_EFFECT = exports.OBJECT_COMPONENT = exports.FRAGMENT = exports.HOST_TEXT = exports.HOST_COMPONENT = exports.HOST_PORTAL = exports.HOST_ROOT = exports.INDETERMINATE_COMPONENT = exports.CLASS_COMPONENT = exports.FUNCTION_COMPONENT = exports.INTERNAL_CHILDREN = exports.INTERNAL_ROOT_FIBER_KEY = exports.INTERNAL_RELATIVE_KEY = exports.INTERNAL_EVENT_HANDLERS_KEY = exports.INTERNAL_INSTANCE_KEY = exports.nextTick = exports.performance = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remix/node_modules/@babel/runtime/helpers/defineProperty.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var nextTick = null;
exports.nextTick = nextTick;
var randomKey = Math.random().toString(36).slice(2);
var isArray = Array.isArray;
var is = Object.is,
    keys = Object.keys,
    hasOwnProperty = Object.hasOwnProperty; // --- common method / object ----

var performance = typeof performance === 'undefined' ? {
  origin: Date.now(),
  now: function now() {
    return Date.now() - this.origin;
  }
} : performance;
exports.performance = performance;

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

    if (!hasOwnProperty.call(objectB, key) || !is(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
}

function resolveDefaultProps(defaultProps, unresolvedProps) {
  if (defaultProps) {
    var props = _objectSpread({}, unresolvedProps);

    for (var propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }

    return props;
  }

  return unresolvedProps;
}

function flatten(array) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var value = array[i];

    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
} // ---- window ---


if (typeof window !== 'undefined') {
  exports.nextTick = nextTick = wx.nextTick;
} else {
  if (typeof setImmediate === 'function') {
    exports.nextTick = nextTick = function nextTick(callback) {
      return setImmediate(callback);
    };
  } else {
    exports.nextTick = nextTick = function nextTick(callback) {
      return setTimeout(callback);
    };
  }
}

// ---- internal property ----
var INTERNAL_INSTANCE_KEY = "__reactInternalInstance$".concat(randomKey),
    INTERNAL_EVENT_HANDLERS_KEY = "__reactEventHandlers".concat(randomKey),
    INTERNAL_RELATIVE_KEY = "__reactInternalRelative$".concat(randomKey),
    INTERNAL_ROOT_FIBER_KEY = "__reactInternalRootFiber$".concat(randomKey),
    INTERNAL_CHILDREN = "__children"; // ---- workTag ---

exports.INTERNAL_CHILDREN = INTERNAL_CHILDREN;
exports.INTERNAL_ROOT_FIBER_KEY = INTERNAL_ROOT_FIBER_KEY;
exports.INTERNAL_RELATIVE_KEY = INTERNAL_RELATIVE_KEY;
exports.INTERNAL_EVENT_HANDLERS_KEY = INTERNAL_EVENT_HANDLERS_KEY;
exports.INTERNAL_INSTANCE_KEY = INTERNAL_INSTANCE_KEY;
var FUNCTION_COMPONENT = 0,
    CLASS_COMPONENT = 1,
    INDETERMINATE_COMPONENT = 2,
    HOST_ROOT = 3,
    HOST_PORTAL = 4,
    HOST_COMPONENT = 5,
    HOST_TEXT = 6,
    FRAGMENT = 7,
    OBJECT_COMPONENT = 8; // ---- effectTag ---

exports.OBJECT_COMPONENT = OBJECT_COMPONENT;
exports.FRAGMENT = FRAGMENT;
exports.HOST_TEXT = HOST_TEXT;
exports.HOST_COMPONENT = HOST_COMPONENT;
exports.HOST_PORTAL = HOST_PORTAL;
exports.HOST_ROOT = HOST_ROOT;
exports.INDETERMINATE_COMPONENT = INDETERMINATE_COMPONENT;
exports.CLASS_COMPONENT = CLASS_COMPONENT;
exports.FUNCTION_COMPONENT = FUNCTION_COMPONENT;
var SIDE_EFFECT = 0,
    NO_EFFECT = 0,
    PERFORMED = 1,
    PLACEMENT = 2,
    UPDATE = 4,
    PLACEMENT_AND_UPDATE = 6,
    DELETION = 8,
    CONTENT_RESET = 16,
    CALLBACK = 32,
    ERROR = 64,
    REF = 128,
    SNAPSHOT = 256,
    PASSIVE = 512,
    INCOMPLETE = 1024; // ---- html node types ----

exports.INCOMPLETE = INCOMPLETE;
exports.PASSIVE = PASSIVE;
exports.SNAPSHOT = SNAPSHOT;
exports.REF = REF;
exports.ERROR = ERROR;
exports.CALLBACK = CALLBACK;
exports.CONTENT_RESET = CONTENT_RESET;
exports.DELETION = DELETION;
exports.PLACEMENT_AND_UPDATE = PLACEMENT_AND_UPDATE;
exports.UPDATE = UPDATE;
exports.PLACEMENT = PLACEMENT;
exports.PERFORMED = PERFORMED;
exports.NO_EFFECT = NO_EFFECT;
exports.SIDE_EFFECT = SIDE_EFFECT;
var IMAGE = 'image',
    BUTTON = 'button',
    MAP = 'map',
    INPUT = 'input',
    VIEW = 'view',
    ROOT = 'root',
    BODY = 'body',
    TEXT = 'text',
    PLAIN_TEXT = '#text',
    PICKER = 'picker',
    SWIPER_ITEM = 'swiper-item',
    SWIPER = 'swiper',
    VIDEO = 'video',
    TEXTAREA = 'textarea',
    EDITOR = 'editor';
exports.EDITOR = EDITOR;
exports.TEXTAREA = TEXTAREA;
exports.VIDEO = VIDEO;
exports.SWIPER = SWIPER;
exports.SWIPER_ITEM = SWIPER_ITEM;
exports.PICKER = PICKER;
exports.PLAIN_TEXT = PLAIN_TEXT;
exports.TEXT = TEXT;
exports.BODY = BODY;
exports.ROOT = ROOT;
exports.VIEW = VIEW;
exports.INPUT = INPUT;
exports.MAP = MAP;
exports.BUTTON = BUTTON;
exports.IMAGE = IMAGE;
var UPDATE_STATE = 'UPDATE_STATE';
exports.UPDATE_STATE = UPDATE_STATE;
var ASYNC = 'ASYNC',
    SYNC = 'SYNC';
exports.SYNC = SYNC;
exports.ASYNC = ASYNC;
var REACT_ELEMENT_TYPE = 'react.element',
    REACT_PORTAL_TYPE = 'react.portal',
    REACT_FRAGMENT_TYPE = 'react.fragment',
    REACT_SUSPENSE_TYPE = 'react.suspense',
    REACT_MEMO_TYPE = 'react.memo',
    REACT_LAZY_TYPE = 'react.lazy';
exports.REACT_LAZY_TYPE = REACT_LAZY_TYPE;
exports.REACT_MEMO_TYPE = REACT_MEMO_TYPE;
exports.REACT_SUSPENSE_TYPE = REACT_SUSPENSE_TYPE;
exports.REACT_FRAGMENT_TYPE = REACT_FRAGMENT_TYPE;
exports.REACT_PORTAL_TYPE = REACT_PORTAL_TYPE;
exports.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;
var STYLE = 'style',
    CHILDREN = 'children',
    FLOAT = 'float';
exports.FLOAT = FLOAT;
exports.CHILDREN = CHILDREN;
exports.STYLE = STYLE;
var WORKING = 1,
    NO_WORK = 2;
exports.NO_WORK = NO_WORK;
exports.WORKING = WORKING;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../remix-cli/node_modules/timers-browserify/main.js */ "../remix-cli/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../remix/src/RemixUI/index.js":
/*!*************************************!*\
  !*** ../remix/src/RemixUI/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _remixView = _interopRequireDefault(__webpack_require__(/*! ./remix-view */ "../remix/src/RemixUI/remix-view/index.js"));

var _remixText = _interopRequireDefault(__webpack_require__(/*! ./remix-text */ "../remix/src/RemixUI/remix-text/index.js"));

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ./remix-picker */ "../remix/src/RemixUI/remix-picker/index.js"));

var _remixVideo = _interopRequireDefault(__webpack_require__(/*! ./remix-video */ "../remix/src/RemixUI/remix-video/index.js"));

var _remixScrollView = _interopRequireDefault(__webpack_require__(/*! ./remix-scroll-view */ "../remix/src/RemixUI/remix-scroll-view/index.js"));

var _remixSwiper = _interopRequireDefault(__webpack_require__(/*! ./remix-swiper */ "../remix/src/RemixUI/remix-swiper/index.js"));

var _remixSwiperItem = _interopRequireDefault(__webpack_require__(/*! ./remix-swiper-item */ "../remix/src/RemixUI/remix-swiper-item/index.js"));

var _remixMap = _interopRequireDefault(__webpack_require__(/*! ./remix-map */ "../remix/src/RemixUI/remix-map/index.js"));

var _remixImage = _interopRequireDefault(__webpack_require__(/*! ./remix-image */ "../remix/src/RemixUI/remix-image/index.js"));

var _remixButton = _interopRequireDefault(__webpack_require__(/*! ./remix-button */ "../remix/src/RemixUI/remix-button/index.js"));

var _remixInput = _interopRequireDefault(__webpack_require__(/*! ./remix-input */ "../remix/src/RemixUI/remix-input/index.js"));

var _remixTextarea = _interopRequireDefault(__webpack_require__(/*! ./remix-textarea */ "../remix/src/RemixUI/remix-textarea/index.js"));

var _remixEditor = _interopRequireDefault(__webpack_require__(/*! ./remix-editor */ "../remix/src/RemixUI/remix-editor/index.js"));

var _remixSlider = _interopRequireDefault(__webpack_require__(/*! ./remix-slider */ "../remix/src/RemixUI/remix-slider/index.js"));

var _remixAudio = _interopRequireDefault(__webpack_require__(/*! ./remix-audio */ "../remix/src/RemixUI/remix-audio/index.js"));

var _remixCanvas = _interopRequireDefault(__webpack_require__(/*! ./remix-canvas */ "../remix/src/RemixUI/remix-canvas/index.js"));

var _default = {
  'view': _remixView["default"],
  'text': _remixText["default"],
  'picker': _remixPicker["default"],
  'video': _remixVideo["default"],
  'scroll-view': _remixScrollView["default"],
  'swiper': _remixSwiper["default"],
  'swiper-item': _remixSwiperItem["default"],
  'map': _remixMap["default"],
  'image': _remixImage["default"],
  'button': _remixButton["default"],
  'input': _remixInput["default"],
  'textarea': _remixTextarea["default"],
  'editor': _remixEditor["default"],
  'slider': _remixSlider["default"],
  'audio': _remixAudio["default"],
  'canvas': _remixCanvas["default"]
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-audio/index.js":
/*!*************************************************!*\
  !*** ../remix/src/RemixUI/remix-audio/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-button/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-button/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-canvas/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-canvas/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-editor/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-editor/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-image/index.js":
/*!*************************************************!*\
  !*** ../remix/src/RemixUI/remix-image/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-input/index.js":
/*!*************************************************!*\
  !*** ../remix/src/RemixUI/remix-input/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-map/index.js":
/*!***********************************************!*\
  !*** ../remix/src/RemixUI/remix-map/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-picker/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-picker/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-scroll-view/index.js":
/*!*******************************************************!*\
  !*** ../remix/src/RemixUI/remix-scroll-view/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-slider/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-slider/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-swiper-item/index.js":
/*!*******************************************************!*\
  !*** ../remix/src/RemixUI/remix-swiper-item/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-swiper/index.js":
/*!**************************************************!*\
  !*** ../remix/src/RemixUI/remix-swiper/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-text/index.js":
/*!************************************************!*\
  !*** ../remix/src/RemixUI/remix-text/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-textarea/index.js":
/*!****************************************************!*\
  !*** ../remix/src/RemixUI/remix-textarea/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-video/index.js":
/*!*************************************************!*\
  !*** ../remix/src/RemixUI/remix-video/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixUI/remix-view/index.js":
/*!************************************************!*\
  !*** ../remix/src/RemixUI/remix-view/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  child: null,
  silbing: null,
  innerText: null,
  vid: null,
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
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "../remix/src/RemixViewController.js":
/*!*******************************************!*\
  !*** ../remix/src/RemixViewController.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remix/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewControllersManager = ViewControllersManager;
exports.TAG_NAME = exports.RemixViewController = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _Remix = _interopRequireDefault(__webpack_require__(/*! ./Remix */ "../remix/src/Remix.js"));

var _RemixRenderer = _interopRequireDefault(__webpack_require__(/*! ./RemixRenderer */ "../remix/src/RemixRenderer.js"));

var Support = _interopRequireWildcard(__webpack_require__(/*! ./RemixViewSupport */ "../remix/src/RemixViewSupport.js"));

var _RemixShared = __webpack_require__(/*! ./RemixShared */ "../remix/src/RemixShared.js");

var _RemixDocument = __webpack_require__(/*! ./RemixDocument */ "../remix/src/RemixDocument.js");

var _RemixEvent = __webpack_require__(/*! ./RemixEvent */ "../remix/src/RemixEvent.js");

var Subscriber = Support.Subscriber;
var RemixViewController = new Map();
exports.RemixViewController = RemixViewController;
var TAG_NAME = 'ViewController';
exports.TAG_NAME = TAG_NAME;

function ViewControllersManager(context, instance) {
  var window = _RemixDocument.document.createElement('Window');

  var views = {};

  _RemixDocument.document.body.appendChild(window);

  context.router.routes.forEach(function (route) {
    views[route.path] = route;
  });
  Subscriber.on(Support.LOAD, function (view) {
    var id = view.id,
        query = view.query,
        route = view.route;
    var controller = window.getElementById(id);

    if (!controller) {
      var Class = views[route];

      if (view) {
        controller = new ViewController(id, route, query);
        controller.Class = Class.component;
        window.appendChild(controller.view);
        RemixViewController.set(id, controller);
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
  Subscriber.on(Support.SHOW, function (_ref) {
    var id = _ref.id;
    RemixViewController.current = RemixViewController.get(id);
  });
  Subscriber.on(Support.EVENT, function (type, event) {
    var target = event.target;
    var controller = RemixViewController.current;
    var view = controller.view.getElementById(target.id);
    (0, _RemixEvent.scheduleWork)({
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
    this.view = _RemixDocument.document.createElement(TAG_NAME);
    this.view[_RemixShared.INTERNAL_RELATIVE_KEY] = id;
    this.view.setAttribute('route', route);
    this.view.setAttribute('query', query);
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "onLoad",
    value: function onLoad(query) {}
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(query) {
      return (0, _RemixShared.shallowEqual)(query, this.query);
    }
  }, {
    key: "render",
    value: function render() {
      (0, _RemixRenderer["default"])(_Remix["default"].createElement(this.Class), this.view);
    }
  }]);
  return ViewController;
}();

/***/ }),

/***/ "../remix/src/RemixViewSupport.js":
/*!****************************************!*\
  !*** ../remix/src/RemixViewSupport.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remix/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = exports.Publisher = exports.DATA = exports.EVENT = exports.UNLOAD = exports.HIDE = exports.SHOW = exports.READY = exports.LOAD = exports.VIEW = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remix/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remix/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remix/node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remix/node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remix/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remix/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _tinyEmitter = _interopRequireDefault(__webpack_require__(/*! tiny-emitter */ "../remix/node_modules/tiny-emitter/index.js"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var VIEW = 'view',
    LOAD = 'onLoad',
    READY = 'onReady',
    SHOW = 'onShow',
    HIDE = 'onHide',
    UNLOAD = 'onUnload',
    EVENT = 'onEvent',
    DATA = 'onData';
exports.DATA = DATA;
exports.EVENT = EVENT;
exports.UNLOAD = UNLOAD;
exports.HIDE = HIDE;
exports.SHOW = SHOW;
exports.READY = READY;
exports.LOAD = LOAD;
exports.VIEW = VIEW;
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
      var callbackId = typeof callback === 'function' ? uuid.v4() : null;

      if (callbackId) {
        this.once(callbackId, callback);
      }

      Subscriber.emit(VIEW, {
        type: LOAD,
        argv: [view],
        callbackId: callbackId
      });
    }
  }, {
    key: "Show",
    value: function Show(view) {
      Subscriber.emit(VIEW, {
        type: SHOW,
        argv: [view]
      });
    }
  }, {
    key: "Data",
    value: function Data(id, data) {
      Subscriber.emit(VIEW, {
        type: "".concat(DATA, ".").concat(id),
        argv: [id, data]
      });
    }
  }, {
    key: "Event",
    value: function Event() {
      for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
        argv[_key] = arguments[_key];
      }

      Subscriber.emit(VIEW, {
        type: EVENT,
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

    _this.on(VIEW, function (_ref) {
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

/***/ })

}]);
//# sourceMappingURL=manifest.js.map