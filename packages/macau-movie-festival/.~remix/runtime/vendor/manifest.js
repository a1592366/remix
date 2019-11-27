/*** MARK_1574351636693 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

/***/ "../remixjs-cli/node_modules/events/events.js":
/*!****************************************************!*\
  !*** ../remixjs-cli/node_modules/events/events.js ***!
  \****************************************************/
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

/***/ "../remixjs-cli/node_modules/webpack/buildin/amd-options.js":
/*!******************************************************************!*\
  !*** ../remixjs-cli/node_modules/webpack/buildin/amd-options.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../remixjs-cli/node_modules/webpack/buildin/global.js":
/*!*************************************************************!*\
  !*** ../remixjs-cli/node_modules/webpack/buildin/global.js ***!
  \*************************************************************/
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

/***/ "../remixjs-cli/node_modules/webpack/buildin/harmony-module.js":
/*!*********************************************************************!*\
  !*** ../remixjs-cli/node_modules/webpack/buildin/harmony-module.js ***!
  \*********************************************************************/
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
  if ((typeof exports === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(exports)) === 'object' && ( false ? undefined : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "../remixjs-cli/node_modules/webpack/buildin/amd-options.js")) define([], factory);else {
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

        var Type =
        /*#__PURE__*/
        function () {
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
          HIDE: 'hide',
          EVENT: 'event',
          LIFECYCLE: 'lifecycle'
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../remixjs-cli/node_modules/webpack/buildin/harmony-module.js */ "../remixjs-cli/node_modules/webpack/buildin/harmony-module.js")(module)))

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

/***/ }),

/***/ "../remixjs/env.js":
/*!*************************!*\
  !*** ../remixjs/env.js ***!
  \*************************/
/*! exports provided: isInspectMode, inspectWSURL, internalUIURL, inspectMessageTypes, inspectTerminalTypes, inspectTerminalUUID, inspectLogicUUID, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInspectMode", function() { return isInspectMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectWSURL", function() { return inspectWSURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internalUIURL", function() { return internalUIURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectMessageTypes", function() { return inspectMessageTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectTerminalTypes", function() { return inspectTerminalTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectTerminalUUID", function() { return inspectTerminalUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inspectLogicUUID", function() { return inspectLogicUUID; });
var isInspectMode = false;
var inspectWSURL = "ws://192.168.2.11:10002";
var internalUIURL = "http://192.168.2.11:10002";
var inspectMessageTypes = {"REGISTER":0,"MESSAGE":1,"CLOSE":2};
var inspectTerminalTypes = {"VIEW":1,"LOGIC":2,"SERVICES":3};
var inspectTerminalUUID = "0ff01541-e434-40a5-96e6-4844a10d2784";
var inspectLogicUUID = "e58c1f04-6d45-43e6-8539-46d3efd4f61a";
/* harmony default export */ __webpack_exports__["default"] = ({
  isInspectMode: isInspectMode,
  inspectWSURL: inspectWSURL,
  internalUIURL: internalUIURL,
  inspectMessageTypes: inspectMessageTypes,
  inspectTerminalTypes: inspectTerminalTypes,
  inspectTerminalUUID: inspectTerminalUUID,
  inspectLogicUUID: inspectLogicUUID
});

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!***************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \***************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!*******************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \*******************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js":
/*!*********************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/createClass.js ***!
  \*********************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/get.js":
/*!*************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/get.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase */ "../remixjs/node_modules/@babel/runtime/helpers/superPropBase.js");

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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js":
/*!******************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/inherits.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/setPrototypeOf.js");

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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!*************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!***************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!*********************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "../remixjs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!**************************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \**************************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!***********************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/readOnlyError.js":
/*!***********************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/readOnlyError.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

module.exports = _readOnlyError;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/superPropBase.js":
/*!***********************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!***************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../remixjs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../remixjs/node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../remixjs/node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js":
/*!****************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/typeof.js ***!
  \****************************************************************/
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

/***/ "../remixjs/node_modules/qs/lib/formats.js":
/*!*************************************************!*\
  !*** ../remixjs/node_modules/qs/lib/formats.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = __webpack_require__(/*! ./utils */ "../remixjs/node_modules/qs/lib/utils.js");

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

/***/ "../remixjs/node_modules/qs/lib/index.js":
/*!***********************************************!*\
  !*** ../remixjs/node_modules/qs/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "../remixjs/node_modules/qs/lib/stringify.js");

var parse = __webpack_require__(/*! ./parse */ "../remixjs/node_modules/qs/lib/parse.js");

var formats = __webpack_require__(/*! ./formats */ "../remixjs/node_modules/qs/lib/formats.js");

module.exports = {
  formats: formats,
  parse: parse,
  stringify: stringify
};

/***/ }),

/***/ "../remixjs/node_modules/qs/lib/parse.js":
/*!***********************************************!*\
  !*** ../remixjs/node_modules/qs/lib/parse.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../remixjs/node_modules/qs/lib/utils.js");

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

/***/ "../remixjs/node_modules/qs/lib/stringify.js":
/*!***************************************************!*\
  !*** ../remixjs/node_modules/qs/lib/stringify.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../remixjs/node_modules/qs/lib/utils.js");

var formats = __webpack_require__(/*! ./formats */ "../remixjs/node_modules/qs/lib/formats.js");

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

/***/ "../remixjs/node_modules/qs/lib/utils.js":
/*!***********************************************!*\
  !*** ../remixjs/node_modules/qs/lib/utils.js ***!
  \***********************************************/
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

/***/ "../remixjs/node_modules/requestidlecallback/index.js":
/*!************************************************************!*\
  !*** ../remixjs/node_modules/requestidlecallback/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function () {
  'use strict';

  var scheduleStart, throttleDelay, lazytimer, lazyraf;
  var root = typeof window != 'undefined' ? window : typeof global != undefined ? global : this || {};
  var requestAnimationFrame = root.cancelRequestAnimationFrame && root.requestAnimationFrame || setTimeout;
  var cancelRequestAnimationFrame = root.cancelRequestAnimationFrame || clearTimeout;
  var tasks = [];
  var runAttempts = 0;
  var isRunning = false;
  var remainingTime = 7;
  var minThrottle = 35;
  var throttle = 125;
  var index = 0;
  var taskStart = 0;
  var tasklength = 0;
  var IdleDeadline = {
    get didTimeout() {
      return false;
    },

    timeRemaining: function () {
      var timeRemaining = remainingTime - (Date.now() - taskStart);
      return timeRemaining < 0 ? 0 : timeRemaining;
    }
  };
  var setInactive = debounce(function () {
    remainingTime = 22;
    throttle = 66;
    minThrottle = 0;
  });

  function debounce(fn) {
    var id, timestamp;
    var wait = 99;

    var check = function () {
      var last = Date.now() - timestamp;

      if (last < wait) {
        id = setTimeout(check, wait - last);
      } else {
        id = null;
        fn();
      }
    };

    return function () {
      timestamp = Date.now();

      if (!id) {
        id = setTimeout(check, wait);
      }
    };
  }

  function abortRunning() {
    if (isRunning) {
      if (lazyraf) {
        cancelRequestAnimationFrame(lazyraf);
      }

      if (lazytimer) {
        clearTimeout(lazytimer);
      }

      isRunning = false;
    }
  }

  function onInputorMutation() {
    if (throttle != 125) {
      remainingTime = 7;
      throttle = 125;
      minThrottle = 35;

      if (isRunning) {
        abortRunning();
        scheduleLazy();
      }
    }

    setInactive();
  }

  function scheduleAfterRaf() {
    lazyraf = null;
    lazytimer = setTimeout(runTasks, 0);
  }

  function scheduleRaf() {
    lazytimer = null;
    requestAnimationFrame(scheduleAfterRaf);
  }

  function scheduleLazy() {
    if (isRunning) {
      return;
    }

    throttleDelay = throttle - (Date.now() - taskStart);
    scheduleStart = Date.now();
    isRunning = true;

    if (minThrottle && throttleDelay < minThrottle) {
      throttleDelay = minThrottle;
    }

    if (throttleDelay > 9) {
      lazytimer = setTimeout(scheduleRaf, throttleDelay);
    } else {
      throttleDelay = 0;
      scheduleRaf();
    }
  }

  function runTasks() {
    var task, i, len;
    var timeThreshold = remainingTime > 9 ? 9 : 1;
    taskStart = Date.now();
    isRunning = false;
    lazytimer = null;

    if (runAttempts > 2 || taskStart - throttleDelay - 50 < scheduleStart) {
      for (i = 0, len = tasks.length; i < len && IdleDeadline.timeRemaining() > timeThreshold; i++) {
        task = tasks.shift();
        tasklength++;

        if (task) {
          task(IdleDeadline);
        }
      }
    }

    if (tasks.length) {
      scheduleLazy();
    } else {
      runAttempts = 0;
    }
  }

  function requestIdleCallbackShim(task) {
    index++;
    tasks.push(task);
    scheduleLazy();
    return index;
  }

  function cancelIdleCallbackShim(id) {
    var index = id - 1 - tasklength;

    if (tasks[index]) {
      tasks[index] = null;
    }
  }

  if (!root.requestIdleCallback || !root.cancelIdleCallback) {
    root.requestIdleCallback = requestIdleCallbackShim;
    root.cancelIdleCallback = cancelIdleCallbackShim;

    if (root.document && document.addEventListener) {
      root.addEventListener('scroll', onInputorMutation, true);
      root.addEventListener('resize', onInputorMutation);
      document.addEventListener('focus', onInputorMutation, true);
      document.addEventListener('mouseover', onInputorMutation, true);
      ['click', 'keypress', 'touchstart', 'mousedown'].forEach(function (name) {
        document.addEventListener(name, onInputorMutation, {
          capture: true,
          passive: true
        });
      });

      if (root.MutationObserver) {
        new MutationObserver(onInputorMutation).observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
    }
  } else {
    try {
      root.requestIdleCallback(function () {}, {
        timeout: 0
      });
    } catch (e) {
      (function (rIC) {
        var timeRemainingProto, timeRemaining;

        root.requestIdleCallback = function (fn, timeout) {
          if (timeout && typeof timeout.timeout == 'number') {
            return rIC(fn, timeout.timeout);
          }

          return rIC(fn);
        };

        if (root.IdleCallbackDeadline && (timeRemainingProto = IdleCallbackDeadline.prototype)) {
          timeRemaining = Object.getOwnPropertyDescriptor(timeRemainingProto, 'timeRemaining');

          if (!timeRemaining || !timeRemaining.configurable || !timeRemaining.get) {
            return;
          }

          Object.defineProperty(timeRemainingProto, 'timeRemaining', {
            value: function () {
              return timeRemaining.get.call(this);
            },
            enumerable: true,
            configurable: true
          });
        }
      })(root.requestIdleCallback);
    }
  }

  return {
    request: requestIdleCallbackShim,
    cancel: cancelIdleCallbackShim
  };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../remixjs-cli/node_modules/webpack/buildin/global.js */ "../remixjs-cli/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../remixjs/node_modules/uuid/index.js":
/*!*********************************************!*\
  !*** ../remixjs/node_modules/uuid/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "../remixjs/node_modules/uuid/v1.js");

var v4 = __webpack_require__(/*! ./v4 */ "../remixjs/node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
module.exports = uuid;

/***/ }),

/***/ "../remixjs/node_modules/uuid/lib/bytesToUuid.js":
/*!*******************************************************!*\
  !*** ../remixjs/node_modules/uuid/lib/bytesToUuid.js ***!
  \*******************************************************/
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

/***/ "../remixjs/node_modules/uuid/lib/rng-browser.js":
/*!*******************************************************!*\
  !*** ../remixjs/node_modules/uuid/lib/rng-browser.js ***!
  \*******************************************************/
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

/***/ "../remixjs/node_modules/uuid/v1.js":
/*!******************************************!*\
  !*** ../remixjs/node_modules/uuid/v1.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../remixjs/node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../remixjs/node_modules/uuid/lib/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
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

/***/ "../remixjs/node_modules/uuid/v4.js":
/*!******************************************!*\
  !*** ../remixjs/node_modules/uuid/v4.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../remixjs/node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../remixjs/node_modules/uuid/lib/bytesToUuid.js");

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

/***/ "../remixjs/project.js":
/*!*****************************!*\
  !*** ../remixjs/project.js ***!
  \*****************************/
/*! exports provided: Program, View, getApplication, transports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/project */ "../remixjs/src/project/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["Program"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["View"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["getApplication"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _src_project__WEBPACK_IMPORTED_MODULE_0__["transports"]; });



/***/ }),

/***/ "../remixjs/src/components/Application.js":
/*!************************************************!*\
  !*** ../remixjs/src/components/Application.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Application; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_cloneElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../react/cloneElement */ "../remixjs/src/react/cloneElement.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js");
/* harmony import */ var _react_Children__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../react/Children */ "../remixjs/src/react/Children.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../router */ "../remixjs/src/router/index.js");
/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./TabBar */ "../remixjs/src/components/TabBar.js");













 // import { transports, APPLICATION } from '../project';




var Application =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Application, _Component);

  function Application() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Application);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Application)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onMessage", function (type, argv) {
      switch (type) {
        case APPLICATION.LAUNCH:
          {
            var onLaunch = _this.props.onLaunch;
            onLaunch.apply(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), argv);
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
      Object(_react_Children__WEBPACK_IMPORTED_MODULE_13__["forEach"])(this.props.children, function (child) {
        if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(child)) {
          var type = child.type;

          if (type === _router__WEBPACK_IMPORTED_MODULE_14__["Router"] || type === _TabBar__WEBPACK_IMPORTED_MODULE_15__["default"]) {
            children.push(child);
          }
        }
      });
      return children;
    }
  }, {
    key: "render",
    value: function render() {
      return _react__WEBPACK_IMPORTED_MODULE_9__["default"].createElement("view", null, this.cloneApplicationChildren());
    }
  }]);

  return Application;
}(_react_Component__WEBPACK_IMPORTED_MODULE_11__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Application, "propTypes", {
  onLaunch: _react_PropTypes__WEBPACK_IMPORTED_MODULE_12__["default"].func
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(Application, "defaultProps", {
  onLaunch: _shared__WEBPACK_IMPORTED_MODULE_8__["noop"]
});



/***/ }),

/***/ "../remixjs/src/components/TabBar.js":
/*!*******************************************!*\
  !*** ../remixjs/src/components/TabBar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabBar; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js");










var TabBarItem =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TabBarItem, _Component);

  function TabBarItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBarItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TabBarItem).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBarItem, [{
    key: "render",
    value: function render() {
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", null, this.props.children);
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

var TabBar =
/*#__PURE__*/
function (_Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TabBar, _Component2);

  function TabBar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabBar);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TabBar).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabBar, [{
    key: "render",
    value: function render() {
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", null, this.props.children);
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

/***/ "../remixjs/src/components/ViewController.js":
/*!***************************************************!*\
  !*** ../remixjs/src/components/ViewController.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_cloneElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../react/cloneElement */ "../remixjs/src/react/cloneElement.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js");
/* harmony import */ var _project_notification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../project/notification */ "../remixjs/src/project/notification/index.js");












var defineProperty = Object.defineProperty;

var ViewController =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ViewController, _Component);

  function ViewController(props, context) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewController);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ViewController).call(this, props, context));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewController, [{
    key: "render",
    value: function render() {
      throw new Error("Must be implatated");
    }
  }]);

  return ViewController;
}(_react_Component__WEBPACK_IMPORTED_MODULE_9__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(ViewController, "propTypes", {});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(ViewController, "defaultProps", {});



/***/ }),

/***/ "../remixjs/src/components/index.js":
/*!******************************************!*\
  !*** ../remixjs/src/components/index.js ***!
  \******************************************/
/*! exports provided: Application, ViewController, TabBar, Root, View, Text, Image, Button, Map, Input, Picker, Swiper, SwiperItem, ScrollView, Video */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application */ "../remixjs/src/components/Application.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _Application__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewController */ "../remixjs/src/components/ViewController.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewController", function() { return _ViewController__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabBar */ "../remixjs/src/components/TabBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _TabBar__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _remix_element_remix_root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./remix-element/remix-root */ "../remixjs/src/components/remix-element/remix-root/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _remix_element_remix_root__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _remix_element_remix_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./remix-element/remix-view */ "../remixjs/src/components/remix-element/remix-view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _remix_element_remix_view__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _remix_element_remix_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remix-element/remix-text */ "../remixjs/src/components/remix-element/remix-text/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _remix_element_remix_text__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _remix_element_remix_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./remix-element/remix-image */ "../remixjs/src/components/remix-element/remix-image/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _remix_element_remix_image__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _remix_element_remix_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remix-element/remix-input */ "../remixjs/src/components/remix-element/remix-input/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _remix_element_remix_input__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _remix_element_remix_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./remix-element/remix-map */ "../remixjs/src/components/remix-element/remix-map/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _remix_element_remix_map__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _remix_element_remix_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./remix-element/remix-button */ "../remixjs/src/components/remix-element/remix-button/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _remix_element_remix_button__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./remix-element/remix-picker */ "../remixjs/src/components/remix-element/remix-picker/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return _remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _remix_element_remix_scroll_view__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./remix-element/remix-scroll-view */ "../remixjs/src/components/remix-element/remix-scroll-view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollView", function() { return _remix_element_remix_scroll_view__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./remix-element/remix-swiper */ "../remixjs/src/components/remix-element/remix-swiper/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Swiper", function() { return _remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./remix-element/remix-swiper-item */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwiperItem", function() { return _remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _remix_element_remix_video__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./remix-element/remix-video */ "../remixjs/src/components/remix-element/remix-video/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return _remix_element_remix_video__WEBPACK_IMPORTED_MODULE_14__["default"]; });


















/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-button/index.js":
/*!*********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-button/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixButton; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixButton =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixButton, _React$Component);

  function RemixButton() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixButton);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixButton).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("button", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixButton, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onGetUserInfo: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onContact: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onGetPhoneNumber: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onOpenSetting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLaunchApp: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  size: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  type: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  plain: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  loading: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  formType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  openType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  hoverClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  hoverStopPropagation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  hoverStartTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  hoverStayTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  lang: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  sessionFrom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  sendMessageTitle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  sendMessagePath: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  sendMessageImg: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  appParameter: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  showMessageCard: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
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

/***/ "../remixjs/src/components/remix-element/remix-image/index.js":
/*!********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-image/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixImage; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixImage =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixImage, _React$Component);

  function RemixImage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixImage);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixImage).apply(this, arguments));
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
          style = _this$props.style,
          className = _this$props.className,
          src = _this$props.src,
          mode = _this$props.mode,
          webp = _this$props.webp,
          lazyLoad = _this$props.lazyLoad,
          showMenuByLongpress = _this$props.showMenuByLongpress;
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("image", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixImage, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLoad: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  src: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  mode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  webp: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  lazyLoad: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  showMenuByLongpress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
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
  style: null,
  className: null,
  src: null,
  mode: 'scaleToFill',
  webp: false,
  lazyLoad: false,
  showMenuByLongpress: false
});



/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-input/index.js":
/*!********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-input/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixInput; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixInput =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixInput, _React$Component);

  function RemixInput() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixInput);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixInput).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("input", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixInput, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onInput: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onFocus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onBlur: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onConfirm: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onKeyboardHeightChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  value: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  type: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  password: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  placeholder: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  placeholderStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  placeholderClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  maxlength: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  cursorSpacing: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  autoFocus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  focus: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  confirmType: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  confirmHold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  cursor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  selectionStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  selectionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  adjustPosition: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  holdKeyboard: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
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

/***/ "../remixjs/src/components/remix-element/remix-map/index.js":
/*!******************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-map/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixMap; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixMap =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixMap, _React$Component);

  function RemixMap() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixMap);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixMap).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("map", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixMap, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onMarkerTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLabelTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onControlTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onCalloutTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onUpdated: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onRegionChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onPoiTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  longitude: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  latitude: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  scale: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  markers: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  covers: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  polyline: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  circles: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  controls: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  includePoints: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  showLocation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  polygons: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  subkey: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  layerStyle: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  rotate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  skew: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  enable3D: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  showCompass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  showScale: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableOverlooking: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableZoom: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableScroll: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableRotate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableSatellite: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableTraffic: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  setting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].object
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

/***/ "../remixjs/src/components/remix-element/remix-picker/index.js":
/*!*********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-picker/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixPicker; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixPicker =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixPicker, _React$Component);

  function RemixPicker() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixPicker);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixPicker).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("picker", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixPicker, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onColumnChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  mode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  disabled: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  range: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].object,
  rangeKey: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  value: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  start: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  end: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  fields: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  customItem: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
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

/***/ "../remixjs/src/components/remix-element/remix-root/index.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-root/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixRoot; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixRoot =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixRoot, _React$Component);

  function RemixRoot() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixRoot);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixRoot).apply(this, arguments));
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
          style = _this$props.style,
          className = _this$props.className;
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("root", {
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
        style: style,
        className: className
      }, this.props.children);
    }
  }]);

  return RemixRoot;
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixRoot, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
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
  style: null,
  className: null
});



/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-scroll-view/index.js":
/*!**************************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-scroll-view/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixScrollView; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixScrollView =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixScrollView, _React$Component);

  function RemixScrollView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixScrollView);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixScrollView).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("scroll-view", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixScrollView, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onScrollToUpper: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onScrollToLower: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onScroll: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  scrollX: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  scrollY: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  upperThreshold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  lowerThreshold: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  scrollTop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  scrollLeft: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  scrollIntoView: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  scrollWithAnimation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableBackToTop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableFlex: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  scrollAnchoring: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
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

/***/ "../remixjs/src/components/remix-element/remix-swiper-item/index.js":
/*!**************************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-swiper-item/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixSwiperItem; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixSwiperItem =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixSwiperItem, _React$Component);

  function RemixSwiperItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixSwiperItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixSwiperItem).apply(this, arguments));
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
          style = _this$props.style,
          className = _this$props.className,
          itemId = _this$props.itemId;
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("swiper-item", {
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
        style: style,
        className: className,
        itemId: itemId
      }, this.props.children);
    }
  }]);

  return RemixSwiperItem;
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiperItem, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  itemId: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
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
  style: null,
  className: null,
  itemId: null
});



/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-swiper/index.js":
/*!*********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-swiper/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixSwiper; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");
/* harmony import */ var _remix_swiper_item_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../remix-swiper-item/index */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js");










var RemixSwiper =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixSwiper, _React$Component);

  function RemixSwiper() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixSwiper);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixSwiper).apply(this, arguments));
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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("swiper", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiper, "SwiperItem", _remix_swiper_item_index__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixSwiper, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationFinish: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  indicatorDots: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  indicatorColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  indicatorActiveColor: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  autoplay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  current: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  interval: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  duration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  circular: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  vertical: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  previousMargin: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  nextMargin: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  displayMultipleItems: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  skipHiddenItemLayou: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  easingFunction: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string
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

/***/ "../remixjs/src/components/remix-element/remix-text/index.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-text/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixText; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixText =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixText, _React$Component);

  function RemixText() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixText);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixText).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RemixText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          selectable = _this$props.selectable,
          space = _this$props.space,
          decode = _this$props.decode;
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("text", {
        style: style,
        className: className,
        selectable: selectable,
        space: space,
        decode: decode
      }, this.props.children);
    }
  }]);

  return RemixText;
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixText, "propTypes", {
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  selectable: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  space: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  decode: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixText, "defaultProps", {
  style: null,
  className: null,
  selectable: false,
  space: false,
  decode: false
});



/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-video/index.js":
/*!********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-video/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixVideo; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");







var _defineProperty2, _defineProperty3;




var RemixVideo =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixVideo, _React$Component);

  function RemixVideo() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixVideo);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixVideo).apply(this, arguments));
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
      var _React$createElement;

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
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("video", (_React$createElement = {
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
        style: style,
        className: className,
        src: src,
        duration: duration,
        controls: controls,
        danmuList: danmuList,
        showPlayButton: showPlayButton,
        enableDanmu: enableDanmu,
        autoplay: autoplay,
        loop: loop,
        muted: muted,
        initialTime: initialTime,
        pageGesture: pageGesture,
        direction: direction,
        showProgress: showProgress,
        showFullscreenButton: showFullscreenButton
      }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "showPlayButton", showPlayButton), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "showCenterPlayButton", showCenterPlayButton), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "enableProgressGesture", enableProgressGesture), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "objectFit", objectFit), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "poster", poster), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "showMuteButton", showMuteButton), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "title", title), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "playButtonPosition", playButtonPosition), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "enablePlayGesture", enablePlayGesture), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "autoPauseIfNavigate", autoPauseIfNavigate), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "autoPauseIfOpenNative", autoPauseIfOpenNative), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "vslideGesture", vslideGesture), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "vslideGestureInFullscreen", vslideGestureInFullscreen), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_React$createElement, "adUnitId", adUnitId), _React$createElement));
    }
  }]);

  return RemixVideo;
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixVideo, "propTypes", (_defineProperty2 = {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onPlay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onPause: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onEnded: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTimeUpdate: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onFullScreenChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onWaiting: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onError: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onProgress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLoadedMetaData: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  src: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  duration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  controls: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  danmuList: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].array,
  showPlayButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  enableDanmu: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  autoplay: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  loop: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  muted: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  initialTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  pageGesture: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  direction: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  showProgress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  showFullscreenButton: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool
}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "showPlayButton", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "showCenterPlayButton", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "enableProgressGesture", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "objectFit", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "poster", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "showMuteButton", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "title", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "playButtonPosition", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "enablePlayGesture", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "autoPauseIfNavigate", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "autoPauseIfOpenNative", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "vslideGesture", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "vslideGestureInFullscreen", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty2, "adUnitId", _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string), _defineProperty2));

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixVideo, "defaultProps", (_defineProperty3 = {
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
  style: null,
  className: null,
  src: null,
  duration: null,
  controls: true,
  danmuList: null,
  showPlayButton: false,
  enableDanmu: false,
  autoplay: false,
  loop: false,
  muted: false,
  initialTime: 0,
  pageGesture: false,
  direction: null,
  showProgress: true,
  showFullscreenButton: true
}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "showPlayButton", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "showCenterPlayButton", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "enableProgressGesture", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "objectFit", 0), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "poster", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "showMuteButton", false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "title", null), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "playButtonPosition", 'bottom'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "enablePlayGesture", false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "autoPauseIfNavigate", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "autoPauseIfOpenNative", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "vslideGesture", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "vslideGestureInFullscreen", true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_defineProperty3, "adUnitId", null), _defineProperty3));



/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-view/index.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-view/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixView; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js");









var RemixView =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixView, _React$Component);

  function RemixView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixView);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixView).apply(this, arguments));
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
          style = _this$props.style,
          className = _this$props.className,
          hoverClass = _this$props.hoverClass,
          hoverStopPropagation = _this$props.hoverStopPropagation,
          hoverStartTime = _this$props.hoverStartTime,
          hoverStayTime = _this$props.hoverStayTime;
      return _react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("view", {
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
}(_react__WEBPACK_IMPORTED_MODULE_6__["default"].Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(RemixView, "propTypes", {
  onTouchStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchMove: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchCancel: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongPress: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onLongTap: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTouchForceChange: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onTransitionEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationStart: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationIteration: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  onAnimationEnd: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  style: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  className: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  hoverClass: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].string,
  hoverStopPropagation: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].bool,
  hoverStartTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number,
  hoverStayTime: _react_PropTypes__WEBPACK_IMPORTED_MODULE_7__["default"].number
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
  style: null,
  className: null,
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 50,
  hoverStayTime: 400
});



/***/ }),

/***/ "../remixjs/src/document/Element.js":
/*!******************************************!*\
  !*** ../remixjs/src/document/Element.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid/v4 */ "../remixjs/node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _globalElements__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./globalElements */ "../remixjs/src/document/globalElements.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./document */ "../remixjs/src/document/document.js");
/* harmony import */ var _Updater__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Updater */ "../remixjs/src/document/Updater.js");











var Element =
/*#__PURE__*/
function (_Updater) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Element, _Updater);

  function Element() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Element);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Element).call(this));
    _this.uuid = uuid_v4__WEBPACK_IMPORTED_MODULE_6___default()();
    _this.tagName = null;
    _this.nodeType = null;
    _this.child = null;
    _this["return"] = null;
    _this.lastChild = null;
    _globalElements__WEBPACK_IMPORTED_MODULE_7__["default"][_this.uuid] = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this);
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

/***/ "../remixjs/src/document/HTMLBodyElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLBodyElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLBodyElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./document */ "../remixjs/src/document/document.js");












var HTMLBodyElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HTMLBodyElement, _HTMLElement);

  function HTMLBodyElement() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLBodyElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HTMLBodyElement)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "tagName", _HTMLTypes__WEBPACK_IMPORTED_MODULE_9__["BODY"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "nodeType", _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_8__["ELEMENT_NODE"]);

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

/***/ "../remixjs/src/document/HTMLButtonElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLButtonElement.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLButtonElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _components_remix_element_remix_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-button */ "../remixjs/src/components/remix-element/remix-button/index.js");













var HTMLButtonElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLButtonElement, _HTMLElement);

  function HTMLButtonElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLButtonElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLButtonElement).call(this));
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["BUTTON"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLButtonElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLButtonElement, "defaultProps", _components_remix_element_remix_button__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLElement.js":
/*!**********************************************!*\
  !*** ../remixjs/src/document/HTMLElement.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Element */ "../remixjs/src/document/Element.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");










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

var HTMLElement =
/*#__PURE__*/
function (_Element) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HTMLElement, _Element);

  function HTMLElement(tagName) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HTMLElement).call(this));
    _this.tagName = tagName;
    _this.style = new _StyleSheet__WEBPACK_IMPORTED_MODULE_8__["default"](_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
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

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_6__["isNullOrUndefined"])(this.child)) {
        element.child = this.child.serialize();
      }

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_6__["isNullOrUndefined"])(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_6__["isNullOrUndefined"])(this.innerText)) {
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
}(_Element__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "../remixjs/src/document/HTMLImageElement.js":
/*!***************************************************!*\
  !*** ../remixjs/src/document/HTMLImageElement.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLImageElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-image */ "../remixjs/src/components/remix-element/remix-image/index.js");













var HTMLImageElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HTMLImageElement, _HTMLElement);

  function HTMLImageElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLImageElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HTMLImageElement).call(this));
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

/***/ "../remixjs/src/document/HTMLPickerElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLPickerElement.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLPickerElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _components_remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-picker */ "../remixjs/src/components/remix-element/remix-picker/index.js");













var HTMLPickerElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLPickerElement, _HTMLElement);

  function HTMLPickerElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLPickerElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLPickerElement).call(this));
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["PICKER"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_10__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLPickerElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLPickerElement, "defaultProps", _components_remix_element_remix_picker__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLRootElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLRootElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLViewElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _components_remix_element_remix_root__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/remix-element/remix-root */ "../remixjs/src/components/remix-element/remix-root/index.js");











var HTMLViewElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLViewElement, _HTMLElement);

  function HTMLViewElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLViewElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLViewElement).call(this));
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["ROOT"];
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLViewElement, "defaultProps", _components_remix_element_remix_root__WEBPACK_IMPORTED_MODULE_9__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLSwiperElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLSwiperElement.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLSwiperElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _components_remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-swiper */ "../remixjs/src/components/remix-element/remix-swiper/index.js");













var HTMLSwiperElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLSwiperElement, _HTMLElement);

  function HTMLSwiperElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLSwiperElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLSwiperElement).call(this));
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["SWIPER"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLSwiperElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLSwiperElement, "defaultProps", _components_remix_element_remix_swiper__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLSwiperItemElement.js":
/*!********************************************************!*\
  !*** ../remixjs/src/document/HTMLSwiperItemElement.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLSwiperItemElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _components_remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-swiper-item */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js");













var HTMLSwiperItemElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLSwiperItemElement, _HTMLElement);

  function HTMLSwiperItemElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLSwiperItemElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLSwiperItemElement).call(this));
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_6__["SWIPER_ITEM"];
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_7__["ELEMENT_NODE"];
    return _this;
  }

  return HTMLSwiperItemElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLSwiperItemElement, "defaultProps", _components_remix_element_remix_swiper_item__WEBPACK_IMPORTED_MODULE_11__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLTextElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLTextElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLTextElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/remix-element/remix-text */ "../remixjs/src/components/remix-element/remix-text/index.js");










var HTMLTextElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLTextElement, _HTMLElement);

  function HTMLTextElement(textContent) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLTextElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLTextElement).call(this));
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["TEXT"];
    return _this;
  }

  return HTMLTextElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_5__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLTextElement, "defaultProps", _components_remix_element_remix_text__WEBPACK_IMPORTED_MODULE_8__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/HTMLTypes.js":
/*!********************************************!*\
  !*** ../remixjs/src/document/HTMLTypes.js ***!
  \********************************************/
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

/***/ "../remixjs/src/document/HTMLVideoElement.js":
/*!***************************************************!*\
  !*** ../remixjs/src/document/HTMLVideoElement.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemixVideoElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _StyleSheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _components_remix_element_remix_video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/remix-element/remix-video */ "../remixjs/src/components/remix-element/remix-video/index.js");













var RemixVideoElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RemixVideoElement, _HTMLElement);

  function RemixVideoElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RemixVideoElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RemixVideoElement).call(this));
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

/***/ "../remixjs/src/document/HTMLViewElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLViewElement.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTMLViewElement; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _components_remix_element_remix_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/remix-element/remix-view */ "../remixjs/src/components/remix-element/remix-view/index.js");











var HTMLViewElement =
/*#__PURE__*/
function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(HTMLViewElement, _HTMLElement);

  function HTMLViewElement() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTMLViewElement);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(HTMLViewElement).call(this));
    _this.nodeType = _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_6__["ELEMENT_NODE"];
    _this.tagName = _HTMLTypes__WEBPACK_IMPORTED_MODULE_7__["VIEW"];
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HTMLViewElement, "defaultProps", _components_remix_element_remix_view__WEBPACK_IMPORTED_MODULE_9__["default"].defaultProps);



/***/ }),

/***/ "../remixjs/src/document/StyleSheet.js":
/*!*********************************************!*\
  !*** ../remixjs/src/document/StyleSheet.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
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

var StyleSheet =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/document/Updater.js":
/*!******************************************!*\
  !*** ../remixjs/src/document/Updater.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Updater; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
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

/***/ "../remixjs/src/document/createContainer.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/createContainer.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createContainer; });
function createContainer() {}

/***/ }),

/***/ "../remixjs/src/document/createElement.js":
/*!************************************************!*\
  !*** ../remixjs/src/document/createElement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js");
/* harmony import */ var _HTMLImageElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HTMLImageElement */ "../remixjs/src/document/HTMLImageElement.js");
/* harmony import */ var _HTMLButtonElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HTMLButtonElement */ "../remixjs/src/document/HTMLButtonElement.js");
/* harmony import */ var _HTMLViewElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HTMLViewElement */ "../remixjs/src/document/HTMLViewElement.js");
/* harmony import */ var _HTMLTextElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js");
/* harmony import */ var _HTMLPickerElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLPickerElement */ "../remixjs/src/document/HTMLPickerElement.js");
/* harmony import */ var _HTMLSwiperItemElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTMLSwiperItemElement */ "../remixjs/src/document/HTMLSwiperItemElement.js");
/* harmony import */ var _HTMLSwiperElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HTMLSwiperElement */ "../remixjs/src/document/HTMLSwiperElement.js");
/* harmony import */ var _HTMLRootElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HTMLRootElement */ "../remixjs/src/document/HTMLRootElement.js");
/* harmony import */ var _HTMLVideoElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HTMLVideoElement */ "../remixjs/src/document/HTMLVideoElement.js");












function createElement(tagName) {
  var element;

  switch (tagName) {
    case _HTMLTypes__WEBPACK_IMPORTED_MODULE_0__["ROOT"]:
      {
        return new _HTMLRootElement__WEBPACK_IMPORTED_MODULE_10__["default"]();
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

/***/ "../remixjs/src/document/createTextNode.js":
/*!*************************************************!*\
  !*** ../remixjs/src/document/createTextNode.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTextNode; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _HTMLTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");



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

/***/ "../remixjs/src/document/document.js":
/*!*******************************************!*\
  !*** ../remixjs/src/document/document.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLBodyElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLBodyElement */ "../remixjs/src/document/HTMLBodyElement.js");
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ "../remixjs/src/document/createElement.js");
/* harmony import */ var _createTextNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTextNode */ "../remixjs/src/document/createTextNode.js");
/* harmony import */ var _createContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createContainer */ "../remixjs/src/document/createContainer.js");
/* harmony import */ var _globalElements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./globalElements */ "../remixjs/src/document/globalElements.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../env */ "../remixjs/env.js");






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
  addEventListener: function addEventListener(type, callback, capture) {
    debugger;
  },
  removeEventListener: function removeEventListener() {
    debugger;
  },
  dispatchEvent: function dispatchEvent() {},
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_1__["default"],
  createTextNode: _createTextNode__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (fakeDocument); // export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;

/***/ }),

/***/ "../remixjs/src/document/globalElements.js":
/*!*************************************************!*\
  !*** ../remixjs/src/document/globalElements.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "../remixjs/src/document/index.js":
/*!****************************************!*\
  !*** ../remixjs/src/document/index.js ***!
  \****************************************/
/*! exports provided: document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "../remixjs/src/document/document.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "document", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "../remixjs/src/event/ensureListeningTo.js":
/*!*************************************************!*\
  !*** ../remixjs/src/event/ensureListeningTo.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ensureListeningTo; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");
/* harmony import */ var _listenTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listenTo */ "../remixjs/src/event/listenTo.js");


function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_NODE"] || rootContainerElement.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT_FRAGMENT_NODE"];
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  Object(_listenTo__WEBPACK_IMPORTED_MODULE_1__["default"])(registrationName, doc);
}

/***/ }),

/***/ "../remixjs/src/event/listenTo.js":
/*!****************************************!*\
  !*** ../remixjs/src/event/listenTo.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listenTo; });
function listenTo() {}

/***/ }),

/***/ "../remixjs/src/event/registrationNameModules.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/event/registrationNameModules.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "../remixjs/src/project/Program.js":
/*!*****************************************!*\
  !*** ../remixjs/src/project/Program.js ***!
  \*****************************************/
/*! exports provided: getApplication, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return getApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Program; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../renderer */ "../remixjs/src/renderer/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components */ "../remixjs/src/components/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../router */ "../remixjs/src/router/index.js");
/* harmony import */ var _runtime_terminal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal/index.js");
/* harmony import */ var _runtime_logic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./runtime/logic */ "../remixjs/src/project/runtime/logic/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../env */ "../remixjs/env.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









var TabBarItem = _components__WEBPACK_IMPORTED_MODULE_6__["TabBar"].TabBarItem;
var getApplication = function getApplication() {
  return Program.context;
};

var Program =
/*#__PURE__*/
function () {
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_5__["render"])(Object(_react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(App), container);
        var rootContainer = container._reactRootContainer;
        var currentFiber = rootContainer._internalRoot.current;
        var node = currentFiber;

        while (true) {
          switch (node.elementType) {
            case _components__WEBPACK_IMPORTED_MODULE_6__["Application"]:
              {
                context.config = node.memoizedProps.config;
                this.instance = node.stateNode;
                break;
              }

            case _router__WEBPACK_IMPORTED_MODULE_7__["Route"]:
              {
                context.router.routes.push({
                  path: node.memoizedProps.path,
                  component: node.memoizedProps.component
                });
                break;
              }

            case _components__WEBPACK_IMPORTED_MODULE_6__["TabBar"]:
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

          if (!Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.child)) {
            node = node.child;
            continue;
          }

          while (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node.sibling)) {
            if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(node["return"])) {
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
      if (_env__WEBPACK_IMPORTED_MODULE_10__["default"].isDevToolRuntime) {
        Object(_runtime_logic__WEBPACK_IMPORTED_MODULE_9__["default"])(this.context, this.instance);
      } else {
        Object(_runtime_terminal__WEBPACK_IMPORTED_MODULE_8__["default"])(this.context, this.instance);
      }
    }
  }]);

  return Program;
}();



/***/ }),

/***/ "../remixjs/src/project/View.js":
/*!**************************************!*\
  !*** ../remixjs/src/project/View.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _runtime_transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runtime/transports */ "../remixjs/src/project/runtime/transports/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../env */ "../remixjs/env.js");








var ViewController =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/index.js":
/*!***************************************!*\
  !*** ../remixjs/src/project/index.js ***!
  \***************************************/
/*! exports provided: Program, View, getApplication, transports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Program */ "../remixjs/src/project/Program.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _Program__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "../remixjs/src/project/View.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _View__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _runtime_terminal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _runtime_terminal__WEBPACK_IMPORTED_MODULE_2__["transports"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getApplication", function() { return _Program__WEBPACK_IMPORTED_MODULE_0__["getApplication"]; });







/***/ }),

/***/ "../remixjs/src/project/notification/index.js":
/*!****************************************************!*\
  !*** ../remixjs/src/project/notification/index.js ***!
  \****************************************************/
/*! exports provided: APPLICATION, VIEW, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/notification/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "APPLICATION", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["APPLICATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VIEW", function() { return _types__WEBPACK_IMPORTED_MODULE_6__["VIEW"]; });









var Transport =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Transport, _EventEmitter);

  function Transport() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Transport);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Transport).apply(this, arguments));
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

/***/ "../remixjs/src/project/notification/types.js":
/*!****************************************************!*\
  !*** ../remixjs/src/project/notification/types.js ***!
  \****************************************************/
/*! exports provided: APPLICATION, VIEW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPLICATION", function() { return APPLICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW", function() { return VIEW; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);




var Type =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/runtime/ViewController.js":
/*!********************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewController.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react */ "../remixjs/src/react/index.js");






var ViewController =
/*#__PURE__*/
function () {
  function ViewController(id, route) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewController);

    this.id = id;
    this.route = route;
    this.container = _document__WEBPACK_IMPORTED_MODULE_3__["document"].createElement('root');
    _document__WEBPACK_IMPORTED_MODULE_3__["document"].body.appendChild(this.container);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ViewController, [{
    key: "onLoad",
    value: function onLoad(query, callback) {
      var _this$route = this.route,
          component = _this$route.component,
          r = _this$route.render;
      var rendered = Object(_renderer__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(component || r), this.container);
      var elements = _document__WEBPACK_IMPORTED_MODULE_3__["document"].getContainerElements(this.container);
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

/***/ "../remixjs/src/project/runtime/ViewEventManger.js":
/*!*********************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewEventManger.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewEventManager; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewController */ "../remixjs/src/project/runtime/ViewController.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/createElement */ "../remixjs/src/react/createElement.js");
/* harmony import */ var _document_HTMLTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../document/HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");











var bubbleEvent = ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'tap', 'longpress', 'longtap', 'touchforcechange', 'transitionend', 'animationstart', 'animationiteration', 'animationend'];

var EventObject =
/*#__PURE__*/
function () {
  function EventObject(event) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventObject);

    this.__original_event__ = event;
    var type = event.type,
        touches = event.touches,
        timeStamp = event.timeStamp,
        changedTouches = event.changedTouches;
    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = bubbleEvent.includes(this.type);
    this.cancelBubble = false;
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

var ViewEventManager =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/runtime/ViewManager.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewManager.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewManager; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewController */ "../remixjs/src/project/runtime/ViewController.js");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _react_createElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../react/createElement */ "../remixjs/src/react/createElement.js");
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js");









var lifecycleTypes = {
  ATTACHED: 'attached',
  DETACHED: 'detached'
};

var ViewManager =
/*#__PURE__*/
function () {
  function ViewManager(context) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewManager);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onLifecycle", function (type, id, parentId, view) {
      switch (type) {
        case lifecycleTypes.ATTACHED:
          {
            _this.views[id] = view;
            var element = _document__WEBPACK_IMPORTED_MODULE_5__["document"].findElement(id);

            if (element) {
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

/***/ "../remixjs/src/project/runtime/logic/index.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/project/runtime/logic/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qs */ "../remixjs/node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js");
/* harmony import */ var _ViewManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ViewManager */ "../remixjs/src/project/runtime/ViewManager.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");










var LogicRuntime =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/runtime/terminal/NativeRuntime.js":
/*!****************************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal/NativeRuntime.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NativeRuntime; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");
/* harmony import */ var _NativeSocket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NativeSocket */ "../remixjs/src/project/runtime/terminal/NativeSocket.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var NativeRuntime =
/*#__PURE__*/
function () {
  function NativeRuntime() {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NativeRuntime);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onRequest", function (options, callback) {
      return _this.createCommonAPIRequst('request', options, callback);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onNavigateTo", function (options, callback) {
      return _this.createCommonAPIRequst('navigateTo', options, callback);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onNavigateBack", function (options, callback) {
      return _this.createCommonAPIRequst('navigateBack', options, callback);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onConnectSocket", function (id, options, callback) {
      return _env__WEBPACK_IMPORTED_MODULE_5__["default"].isInspectMode ? Object(_NativeSocket__WEBPACK_IMPORTED_MODULE_6__["default"])(_transports__WEBPACK_IMPORTED_MODULE_4__["default"].api, id, options, callback) : _this.createCommonAPIRequst('connectSocket', options, callback);
    });

    _transports__WEBPACK_IMPORTED_MODULE_4__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].REQUEST, this.onRequest);
    _transports__WEBPACK_IMPORTED_MODULE_4__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].NAVIGATE_TO, this.onNavigateTo);
    _transports__WEBPACK_IMPORTED_MODULE_4__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].NAVIGATE_BACK, this.onNavigateBack);
    _transports__WEBPACK_IMPORTED_MODULE_4__["default"].api.on(_transports__WEBPACK_IMPORTED_MODULE_4__["API"].CONNECT_SOCKET, this.onConnectSocket);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(NativeRuntime, [{
    key: "createCommonAPIRequst",
    value: function createCommonAPIRequst(api, options, callback) {
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

/***/ "../remixjs/src/project/runtime/terminal/NativeSocket.js":
/*!***************************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal/NativeSocket.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createNativeSocket; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var NativeSocket =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/runtime/terminal/index.js":
/*!********************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal/index.js ***!
  \********************************************************/
/*! exports provided: transports, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _transports__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transports", function() { return _transports__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _ViewManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ViewManager */ "../remixjs/src/project/runtime/ViewManager.js");
/* harmony import */ var _ViewEventManger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ViewEventManger */ "../remixjs/src/project/runtime/ViewEventManger.js");
/* harmony import */ var _NativeRuntime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NativeRuntime */ "../remixjs/src/project/runtime/terminal/NativeRuntime.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");
/* harmony import */ var remixjs_message_protocol__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");
/* empty/unused harmony star reexport */











var TerminalRuntime =
/*#__PURE__*/
function (_NativeRuntime) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TerminalRuntime, _NativeRuntime);

  function TerminalRuntime(context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TerminalRuntime);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TerminalRuntime).call(this));
    _this.context = context;
    _this.options = null;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TerminalRuntime, [{
    key: "inspect",
    value: function inspect(callback) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.inspect(function () {
          resolve();
        });
        _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.on('reLaunch', function () {
          wx.reLaunch({
            url: "/".concat(_this2.options.path)
          });
          _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.on('reConnect', function () {
            wx.showTabBar();
            wx.hideLoading();
            _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.emit('launch', _this2.options);
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
              _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.launch(options);
              _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.emit('launch', options);
              ctrl.options = options;
              _env__WEBPACK_IMPORTED_MODULE_10__["default"].isApplicationLaunched = true;
              _env__WEBPACK_IMPORTED_MODULE_10__["default"].applicationLaunchedOptions = options;
            },
            onError: function onError(e) {
              _transports__WEBPACK_IMPORTED_MODULE_6__["default"].app.error(e);
            }
          });
        }
      };

      if (_env__WEBPACK_IMPORTED_MODULE_10__["default"].isInspectMode) {
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
}(_NativeRuntime__WEBPACK_IMPORTED_MODULE_9__["default"]);

;


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var runtime = new TerminalRuntime(context);
  var viewManager = new _ViewManager__WEBPACK_IMPORTED_MODULE_7__["default"](context);
  var viewEventManager = new _ViewEventManger__WEBPACK_IMPORTED_MODULE_8__["default"](context);
  runtime.run();
});
;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/APITransport.js":
/*!*****************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/APITransport.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APITransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _Classes_LogicSocket__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Classes/LogicSocket */ "../remixjs/src/project/runtime/transports/Classes/LogicSocket.js");














var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(APITransport, _Tunnel);

  function APITransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, APITransport);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      var callbackId = Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(callback) ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

          if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(options.complete)) {
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
      return new _Classes_LogicSocket__WEBPACK_IMPORTED_MODULE_12__["default"](this, options);
    }
  }]);

  return APITransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remixjs/src/project/runtime/transports/APITransportNative.js":
/*!***********************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/APITransportNative.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APITransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");













var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(APITransport, _Tunnel);

  function APITransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, APITransport);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(APITransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

          if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(options.complete)) {
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
      return this.createCommonPromise(_types__WEBPACK_IMPORTED_MODULE_10__["API"].CONNECT_SOCKET, options, function () {});
    }
  }]);

  return APITransport;
}(_tunnel__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "../remixjs/src/project/runtime/transports/ApplicationTransport.js":
/*!*************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ApplicationTransport.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationTransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");













var ApplicationTransport =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ApplicationTransport, _Tunnel);

  function ApplicationTransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationTransport);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      var callbackId = Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(callback) ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

/***/ "../remixjs/src/project/runtime/transports/ApplicationTransportNative.js":
/*!*******************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ApplicationTransportNative.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationTransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");













var ApplicationTransport =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ApplicationTransport, _Tunnel);

  function ApplicationTransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationTransport);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ApplicationTransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationTransport, [{
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

/***/ "../remixjs/src/project/runtime/transports/Classes/LogicSocket.js":
/*!************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/Classes/LogicSocket.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createLogicSocket; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types */ "../remixjs/src/project/runtime/transports/types.js");











var LogicSocket =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(LogicSocket, _EventEmitter);

  function LogicSocket(transport) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LogicSocket);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(LogicSocket).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSocketOpen", function (id) {
      if (_this.id === id) {
        _this.emit('open');
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSocketMessage", function (id, data) {
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

/***/ "../remixjs/src/project/runtime/transports/ViewControllerTransport.js":
/*!****************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ViewControllerTransport.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewControllerTransport; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");













var ViewControllerTransport =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ViewControllerTransport, _Tunnel);

  function ViewControllerTransport() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewControllerTransport);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransport).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      var callbackId = Object(_shared_is__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(callback) ? uuid__WEBPACK_IMPORTED_MODULE_8___default.a.v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransport.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

/***/ "../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js":
/*!**********************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewControllerTransportNative; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tunnel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../document */ "../remixjs/src/document/index.js");














var ViewControllerTransportNative =
/*#__PURE__*/
function (_Tunnel) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ViewControllerTransportNative, _Tunnel);

  function ViewControllerTransportNative() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ViewControllerTransportNative);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransportNative).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "post", function (type, argv, callback) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ViewControllerTransportNative.prototype), "post", _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)).call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), {
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

/***/ "../remixjs/src/project/runtime/transports/index.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ApplicationTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApplicationTransport */ "../remixjs/src/project/runtime/transports/ApplicationTransport.js");
/* harmony import */ var _ViewControllerTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewControllerTransport */ "../remixjs/src/project/runtime/transports/ViewControllerTransport.js");
/* harmony import */ var _APITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APITransport */ "../remixjs/src/project/runtime/transports/APITransport.js");
/* harmony import */ var _ApplicationTransportNative__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApplicationTransportNative */ "../remixjs/src/project/runtime/transports/ApplicationTransportNative.js");
/* harmony import */ var _ViewControllerTransportNative__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewControllerTransportNative */ "../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js");
/* harmony import */ var _APITransportNative__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./APITransportNative */ "../remixjs/src/project/runtime/transports/APITransportNative.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");
/* empty/unused harmony star reexport */






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

/***/ "../remixjs/src/project/runtime/transports/types.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/types.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var remixjs_message_protocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/NativeTunnel.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/NativeTunnel.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");












var _default =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(_default, _EventEmitter);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onMessage", function (_ref) {
      var type = _ref.type,
          argv = _ref.argv,
          callback = _ref.callback;

      if (type) {
        var _this2;

        if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(callback)) {
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

/***/ "../remixjs/src/project/runtime/tunnel/Socket.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/Socket.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");




/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var _temp;

  var Socket = _env__WEBPACK_IMPORTED_MODULE_3__["default"].isDevToolRuntime ? (_temp =
  /*#__PURE__*/
  function () {
    function _temp(url, protocols) {
      var _this = this;

      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, _temp);

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onMessage", function (onMessage) {
        _this.socket.onmessage = onMessage;
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onOpen", function (onOpen) {
        _this.socket.onopen = onOpen;
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onClose", function (onClose) {
        _this.socket.onclose = onClose;
      });

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "onError", function (onError) {
        _this.socket.onerror = onError;
      });

      this.socket = new WebSocket(url, protocols);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(_temp, [{
      key: "send",
      value: function send(_ref) {
        var data = _ref.data;
        this.socket.send(data);
      }
    }]);

    return _temp;
  }(), _temp) : function (url, protocols) {
    return wx.connectSocket({
      url: url,
      protocols: [protocols]
    });
  };
  var url = options.url,
      protocols = options.protocols;
  return new Socket(url, protocols.join('+'));
});

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/SocketTunnel.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/SocketTunnel.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SocketTunnel; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var remixjs_message_protocol__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");
/* harmony import */ var _Socket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Socket */ "../remixjs/src/project/runtime/tunnel/Socket.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../env */ "../remixjs/env.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");















var MessageEmitter =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(MessageEmitter, _EventEmitter);

  function MessageEmitter() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MessageEmitter);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(MessageEmitter).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "post", function (post) {
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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onError", function (_ref) {
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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onOpen", function () {
      _this.connected = true;

      if (_this.queue.length > 0) {
        var message;

        while (message = _this.queue.shift()) {
          _this.post(message);
        }

        _this.queue = [];
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onClose", function () {
      _this.connected = false;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onMessage", function (data) {
      _this.emit('message', data);
    });

    var isDevToolRuntime = _env__WEBPACK_IMPORTED_MODULE_12__["default"].isDevToolRuntime;
    _this.id = isDevToolRuntime ? _env__WEBPACK_IMPORTED_MODULE_12__["default"].inspectLogicUUID : _env__WEBPACK_IMPORTED_MODULE_12__["default"].inspectTerminalUUID;
    _this.connected = false;
    _this.queue = [];
    _this.socket = new _Socket__WEBPACK_IMPORTED_MODULE_11__["default"]({
      url: _env__WEBPACK_IMPORTED_MODULE_12__["default"].inspectWSURL,
      protocols: [_this.id, _env__WEBPACK_IMPORTED_MODULE_12__["default"].inspectTerminalTypes[_env__WEBPACK_IMPORTED_MODULE_12__["default"].isDevToolRuntime ? 'LOGIC' : 'VIEW']]
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

var SocketTunnel =
/*#__PURE__*/
function (_EventEmitter2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(SocketTunnel, _EventEmitter2);

  function SocketTunnel() {
    var _this2;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, SocketTunnel);

    _this2 = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(SocketTunnel).call(this));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this2), "onMessage", function (_ref3) {
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

        var t = new remixjs_message_protocol__WEBPACK_IMPORTED_MODULE_10__["Type"](type.type, type.value);

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

/***/ "../remixjs/src/project/runtime/tunnel/index.js":
/*!******************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NativeTunnel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NativeTunnel */ "../remixjs/src/project/runtime/tunnel/NativeTunnel.js");
/* harmony import */ var _SocketTunnel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SocketTunnel */ "../remixjs/src/project/runtime/tunnel/SocketTunnel.js");


var Tunnel =  false ? undefined : _NativeTunnel__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Tunnel);

/***/ }),

/***/ "../remixjs/src/react/Children.js":
/*!****************************************!*\
  !*** ../remixjs/src/react/Children.js ***!
  \****************************************/
/*! exports provided: map, forEach, count, only, toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "only", function() { return only; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");


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

/***/ "../remixjs/src/react/Component.js":
/*!*****************************************!*\
  !*** ../remixjs/src/react/Component.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");





var Component =
/*#__PURE__*/
function () {
  function Component(props, context, updater) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Component);

    if (!this.state) {
      this.state = {};
    }

    this.props = props || {};
    this.context = context || _shared__WEBPACK_IMPORTED_MODULE_3__["EMPTY_OBJECT"];
    this.refs = {};
    this.updater = updater;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Component, [{
    key: "setState",
    value: function setState(state) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _shared__WEBPACK_IMPORTED_MODULE_3__["noop"];
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


Component.prototype.isReactComponent = _shared__WEBPACK_IMPORTED_MODULE_3__["EMPTY_OBJECT"];

/***/ }),

/***/ "../remixjs/src/react/PropTypes.js":
/*!*****************************************!*\
  !*** ../remixjs/src/react/PropTypes.js ***!
  \*****************************************/
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

/***/ "../remixjs/src/react/PureComponent.js":
/*!*********************************************!*\
  !*** ../remixjs/src/react/PureComponent.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component */ "../remixjs/src/react/Component.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");










var PureComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PureComponent, _Component);

  function PureComponent() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PureComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "isPureComponent", true);

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

/***/ "../remixjs/src/react/ReactCurrentOwner.js":
/*!*************************************************!*\
  !*** ../remixjs/src/react/ReactCurrentOwner.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  current: null,
  currentDispatcher: null
});

/***/ }),

/***/ "../remixjs/src/react/ReactCurrentRoot.js":
/*!************************************************!*\
  !*** ../remixjs/src/react/ReactCurrentRoot.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  current: null
});

/***/ }),

/***/ "../remixjs/src/react/ReactElement.js":
/*!********************************************!*\
  !*** ../remixjs/src/react/ReactElement.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactElement; });
/* harmony import */ var _shared_elementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/elementTypes */ "../remixjs/src/shared/elementTypes.js");

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

/***/ "../remixjs/src/react/cloneElement.js":
/*!********************************************!*\
  !*** ../remixjs/src/react/cloneElement.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cloneElement; });
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactElement */ "../remixjs/src/react/ReactElement.js");

function cloneElement(element, props) {
  return Object(_ReactElement__WEBPACK_IMPORTED_MODULE_0__["default"])(element.type, key, ref, self, source, owner, props);
}

/***/ }),

/***/ "../remixjs/src/react/createElement.js":
/*!*********************************************!*\
  !*** ../remixjs/src/react/createElement.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../remixjs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactElement */ "../remixjs/src/react/ReactElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




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

/***/ "../remixjs/src/react/index.js":
/*!*************************************!*\
  !*** ../remixjs/src/react/index.js ***!
  \*************************************/
/*! exports provided: Children, Component, PureComponent, createElement, cloneElement, useState, PropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Children__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Children */ "../remixjs/src/react/Children.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _Children__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component */ "../remixjs/src/react/Component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _Component__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _PureComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PureComponent */ "../remixjs/src/react/PureComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createElement */ "../remixjs/src/react/createElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _createElement__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _cloneElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cloneElement */ "../remixjs/src/react/cloneElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _useState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useState */ "../remixjs/src/react/useState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _useState__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _PropTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PropTypes */ "../remixjs/src/react/PropTypes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _PropTypes__WEBPACK_IMPORTED_MODULE_6__["default"]; });









/* harmony default export */ __webpack_exports__["default"] = ({
  Children: _Children__WEBPACK_IMPORTED_MODULE_0__,
  Component: _Component__WEBPACK_IMPORTED_MODULE_1__["default"],
  PureComponent: _PureComponent__WEBPACK_IMPORTED_MODULE_2__["default"],
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_3__["default"],
  cloneElement: _cloneElement__WEBPACK_IMPORTED_MODULE_4__["default"],
  useState: _useState__WEBPACK_IMPORTED_MODULE_5__["default"],
  PropTypes: _PropTypes__WEBPACK_IMPORTED_MODULE_6__["default"]
});

/***/ }),

/***/ "../remixjs/src/react/useState.js":
/*!****************************************!*\
  !*** ../remixjs/src/react/useState.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useState; });
/* harmony import */ var _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactCurrentOwner */ "../remixjs/src/react/ReactCurrentOwner.js");

function useState(state) {
  _ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_0__["default"];
  debugger;
  return [state, function setState() {}];
}

/***/ }),

/***/ "../remixjs/src/reconciler/ChildrenReconciler.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/reconciler/ChildrenReconciler.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChildrenReconciler; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared_elementTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/elementTypes */ "../remixjs/src/shared/elementTypes.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _Fiber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Fiber */ "../remixjs/src/reconciler/Fiber.js");







function deleteChild(returnFiber, childToDelete, shouldTrackSideEffects) {
  if (shouldTrackSideEffects) {
    var lastEffect = returnFiber.lastEffect; // 根据 lastEffect 判断是否存在 effect，否则新增

    if (last !== null) {
      lastEffect.next = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }

    childToDelete.next = null;
    childToDelete.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["DELETION"];
  }
}

function deleteRemainingChildren(returnFiber, currentFirstChild, shouldTrackSideEffects) {
  if (shouldTrackSideEffects) {
    var childToDelete = currentFirstChild; // 批量处理需要标记删除的 children

    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }

    return null;
  }

  return null;
}

function placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects) {
  newFiber.index = newIndex;

  if (!shouldTrackSideEffects) {
    return lastPlacedIndex;
  }

  var current = newFiber.alternate; // 不是第一次渲染情况

  if (current !== null) {
    var oldIndex = current.index; // 判断元素位置，如果大于

    if (oldIndex < lastPlacedIndex) {
      // 则是移动元素操作
      newFiber.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    // 第一次渲染则是插入操作
    newFiber.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
    return lastPlacedIndex;
  }
}

function placeSingleChild(newFiber, shouldTrackSideEffects) {
  if (shouldTrackSideEffects && newFiber.alternate === null) {
    newFiber.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
  }

  return newFiber;
}

function useFiber(fiber, props) {
  var clone = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createWorkInProgress"])(fiber, props);
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

function createChild(returnFiber, newChild) {
  // 判断是否是纯文本
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromText"])('' + newChild);
    created["return"] = returnFiber;
    return created;
  } // 如果是对象


  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(newChild) === 'object' && newChild !== null) {
    // TODO 根据 $$typeof 构建 fiber
    if (newChild.$$typeof) {
      var _created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromElement"])(newChild);

      _created["return"] = returnFiber;
      return _created;
    }
  } // 如果是数组


  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_4__["isArray"])(newChild)) {
    var _created2 = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromElement"])(newChild, null);

    _created2["return"] = returnFiber;
    return _created2;
  }

  return null;
}

function updateTextNode(returnFiber, current, textContent) {
  // 不是首次渲染, 则创建 fiber，否则使用 useFiber 克隆
  if (current !== null && current.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"]) {
    var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromText"])(textContent);
    created["return"] = returnFiber;
    return created;
  } else {
    var existing = useFiber(current, textContent);
    existing["return"] = returnFiber;
    return existing;
  }
}

function updateElement(returnFiber, current, element) {
  if (current !== null && current.elementType === element.type) {
    var existing = useFiber(current, element.props);
    existing["return"] = returnFiber;
    return existing;
  } else {
    var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromElement"])(element);
    created["return"] = returnFiber;
    return created;
  }
}

function updateFragment(returnFiber, current, fragment) {
  if (current === null || current.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["FRAGMENT"]) {
    var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromFragment"])(fragment, null);
    created["return"] = returnFiber;
    return created;
  } else {
    // Update
    var existing = useFiber(current, fragment);
    existing["return"] = returnFiber;
    return existing;
  }
}

function updateSlot(returnFiber, oldFiber, newChild) {
  var key = oldFiber !== null ? oldFiber.key : null;

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    if (key !== null) {
      return null;
    }

    return updateTextNode(returnFiber, oldFiber, '' + newChild);
  } else if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(newChild) === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case _shared_elementTypes__WEBPACK_IMPORTED_MODULE_3__["REACT_ELEMENT_TYPE"]:
        {
          if (newChild.key === key) {
            return updateElement(returnFiber, oldFiber, newChild);
          } else {
            return null;
          }
        }
    }
  } else if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_4__["isArray"])(newChild)) {
    if (key !== null) {
      return null;
    }

    return updateFragment(returnFiber, oldFiber, newChild);
  }

  return null;
}

function mapRemainingChildren(returnFiber, currentFirstChild) {
  var existingChildren = new Map();
  var existingChild = currentFirstChild;

  while (existingChild !== null) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }

    existingChild = existingChild.sibling;
  }

  return existingChildren;
}

function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, shouldTrackSideEffects) {
  var resultingFirstChild = null;
  var previousnewFiber = null;
  var oldFiber = currentFirstChild; // null

  var lastPlacedIndex = 0;
  var newIdx = 0;
  var nextOldFiber = null;

  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }

    var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);

    if (newFiber === null) {
      // TODO: This breaks on empty slots like null children. That's
      // unfortunate because it triggers the slow path all the time. We need
      // a better way to communicate whether this was a miss or null,
      // boolean, undefined, etc.
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }

      break;
    }

    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects);

    if (previousnewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousnewFiber.sibling = newFiber;
    }

    previousnewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  if (newIdx === newChildren.length) {
    // We've reached the end of the new children. We can delete the rest.
    deleteRemainingChildren(returnFiber, oldFiber);
    return resultingFirstChild;
  }

  if (oldFiber === null) {
    // If we don't have any more existing children we can choose a fast path
    // since the rest will all be insertions.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber = createChild(returnFiber, newChildren[newIdx]); // if newFiber === null continue


      if (!_newFiber) {
        continue;
      }

      lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx); // we will set relation ship here

      if (previousnewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = _newFiber;
      } else {
        previousnewFiber.sibling = _newFiber;
      }

      previousnewFiber = _newFiber;
    }

    return resultingFirstChild;
  } // Add all children to a key map for quick lookups.


  var existingChildren = mapRemainingChildren(returnFiber, oldFiber); // Keep scanning and use the map to restore deleted items as moves.

  return resultingFirstChild;
}

function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent) {
  // 如果纯文本
  if (currentFirstChild !== null && currentFirstChild.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"]) {
    deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
    var existing = useFiber(currentFirstChild, textContent);
    existing["return"] = returnFiber;
    return existing;
  }

  deleteRemainingChildren(returnFiber, currentFirstChild);
  var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromText"])(textContent);
  created["return"] = returnFiber;
  return created;
}

function reconcileSingleElement(returnFiber, currentFirstChild, element) {
  var key = element.key;
  var child = currentFirstChild;

  while (child !== null) {
    if (child.key === key) {
      if (child.type === element.type) {
        // if we had a child we use exactly it
        deleteRemainingChildren(returnFiber, child.sibling);
        var existing = useFiber(child, element.props);
        existing["return"] = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
        break;
      }
    }

    child = child.sibling;
  }

  var created = Object(_Fiber__WEBPACK_IMPORTED_MODULE_5__["createFiberFromElement"])(element);
  created["return"] = returnFiber;
  return created;
}

function ChildrenReconciler(shouldTrackSideEffects) {
  return function reconcileChildren(returnFiber, currentFirstChild, newChild) {
    var isObject = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(newChild) === 'object' && newChild !== null; // 如果是 react element

    if (isObject) {
      if (newChild.$$typeof) {
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild), shouldTrackSideEffects);
      } // 如果是文本

    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild), shouldTrackSideEffects); // 如果是数组
    } else if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_4__["isArray"])(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild, shouldTrackSideEffects);
  };
}

/***/ }),

/***/ "../remixjs/src/reconciler/Fiber.js":
/*!******************************************!*\
  !*** ../remixjs/src/reconciler/Fiber.js ***!
  \******************************************/
/*! exports provided: createWorkInProgress, createFiberRoot, createFiberFromText, createFiberFromElement, createFiberFromFragment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWorkInProgress", function() { return createWorkInProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberRoot", function() { return createFiberRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromText", function() { return createFiberFromText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromElement", function() { return createFiberFromElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiberFromFragment", function() { return createFiberFromFragment; });
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");



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
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["NO_EFFECT"];
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  var child = current.child,
      memoizedProps = current.memoizedProps,
      memoizedState = current.memoizedState,
      updateQueue = current.updateQueue,
      statusTag = current.statusTag,
      sibling = current.sibling,
      index = current.index,
      ref = current.ref;
  workInProgress.statusTag = statusTag;
  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  workInProgress.updateQueue = updateQueue;
  return workInProgress;
}
function createFiberRoot(container) {
  var uninitializedFiber = createFiber(_shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"], null, null);
  var root = {
    containerInfo: container,
    current: uninitializedFiber,
    didError: false,
    finishedWork: null
  };
  uninitializedFiber.stateNode = root;
  return root;
}
function createFiberFromText(content) {
  var fiber = createFiber(_shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_TEXT"], content, null);
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
  var fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["INDETERMINATE_COMPONENT"];
  var resolvedType = type;

  if (typeof type === 'function') {
    var prototype = type.prototype;

    if (prototype && prototype.isReactComponent) {
      fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["CLASS_COMPONENT"];
    }
  } else if (typeof type === 'string') {
    fiberTag = _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_COMPONENT"];
  }

  fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  return fiber;
}

function createFiberNode(tag, pendingProps, key) {
  return {
    tag: tag,
    key: key,
    type: null,
    elementType: null,
    stateNode: null,
    "return": null,
    child: null,
    sibling: null,
    index: 0,
    ref: null,
    pendingProps: pendingProps || null,
    memoizedProps: null,
    memoizedState: null,
    updateQueue: null,
    effectTag: _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["NO_EFFECT"],
    firstEffect: null,
    lastEffect: null,
    nextEffect: null,
    alternate: null
  };
}

function createFiber(tag, pendingProps, key) {
  return createFiberNode(tag, pendingProps, key);
}

/***/ }),

/***/ "../remixjs/src/reconciler/index.js":
/*!******************************************!*\
  !*** ../remixjs/src/reconciler/index.js ***!
  \******************************************/
/*! exports provided: reconcileChildFibers, mountChildFibers, cloneChildFibers, reconcileChildren */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reconcileChildFibers", function() { return reconcileChildFibers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountChildFibers", function() { return mountChildFibers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneChildFibers", function() { return cloneChildFibers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reconcileChildren", function() { return reconcileChildren; });
/* harmony import */ var _Fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fiber */ "../remixjs/src/reconciler/Fiber.js");
/* harmony import */ var _ChildrenReconciler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChildrenReconciler */ "../remixjs/src/reconciler/ChildrenReconciler.js");


var reconcileChildFibers = new _ChildrenReconciler__WEBPACK_IMPORTED_MODULE_1__["default"](true);
var mountChildFibers = new _ChildrenReconciler__WEBPACK_IMPORTED_MODULE_1__["default"](false);
function cloneChildFibers(current, workInProgress) {
  if (workInProgress.child) {
    // 首选先之间对 child workInProgress 创新新的对象，然后在对 slibing 创建
    // 为 workInProgress 创建新的child workInProgress
    var child = workInProgress.child;
    var newChild = Object(_Fiber__WEBPACK_IMPORTED_MODULE_0__["createWorkInProgress"])(child, child.pendingProps); // 设置 workInProgress 之间关系

    workInProgress.child = newChild;
    newChild["return"] = workInProgress;

    while (child.sibling !== null) {
      child = child.sibling;
      newChild = newChild.sibling = Object(_Fiber__WEBPACK_IMPORTED_MODULE_0__["createWorkInProgress"])(child, child.pendingProps);
      newChild["return"] = workInProgress;
    }

    newChild.sibling = null;
  }
}
function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/appendAllChildren.js":
/*!***********************************************************!*\
  !*** ../remixjs/src/renderer/config/appendAllChildren.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendAllChildren; });
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _appendInitialChild__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appendInitialChild */ "../remixjs/src/renderer/config/appendInitialChild.js");


function appendAllChildren(instance, workInProgress) {
  var node = workInProgress.child;

  while (node !== null) {
    if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_COMPONENT"] || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_TEXT"]) {
      Object(_appendInitialChild__WEBPACK_IMPORTED_MODULE_1__["default"])(instance, node.stateNode);
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["FundamentalComponent"]) {
      Object(_appendInitialChild__WEBPACK_IMPORTED_MODULE_1__["default"])(instance, node.stateNode.instance);
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_0__["HOST_PORTAL"]) {// If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
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

/***/ }),

/***/ "../remixjs/src/renderer/config/appendChild.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/renderer/config/appendChild.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendChild; });
function appendChild(instance, child) {
  instance.appendChild(child);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/appendChildToContainer.js":
/*!****************************************************************!*\
  !*** ../remixjs/src/renderer/config/appendChildToContainer.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendChildToContainer; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

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

/***/ "../remixjs/src/renderer/config/appendInitialChild.js":
/*!************************************************************!*\
  !*** ../remixjs/src/renderer/config/appendInitialChild.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendInitialChild; });
function appendInitialChild(parent, child) {
  parent.appendChild(child);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/createElement.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/renderer/config/createElement.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");


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

/***/ "../remixjs/src/renderer/config/createInstance.js":
/*!********************************************************!*\
  !*** ../remixjs/src/renderer/config/createInstance.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createInstance; });
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "../remixjs/src/renderer/config/createElement.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");



function createInstance(type, props, rootContainerInstance, workInProgress) {
  var children = props.children;
  var document = rootContainerInstance.ownerDocument;
  var element = document.createElement(type);
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_INSTANCE_KEY"]] = workInProgress;
  element[_shared__WEBPACK_IMPORTED_MODULE_2__["INTERNAL_EVENT_HANDLERS_KEY"]] = props;
  return element;
}

/***/ }),

/***/ "../remixjs/src/renderer/config/diffProperties.js":
/*!********************************************************!*\
  !*** ../remixjs/src/renderer/config/diffProperties.js ***!
  \********************************************************/
/*! exports provided: STYLE, CHILDREN, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STYLE", function() { return STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILDREN", function() { return CHILDREN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return diffProperties; });
var STYLE = 'style',
    CHILDREN = 'children';

function diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
  var updatePayload = null;
  var styleUpdates = null;
  var lastProps = lastRawProps;
  var nextProps = nextRawProps;
  var propKey; // 删去 props 更新

  for (propKey in lastProps) {
    if (!(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] === null)) {
      if (propKey === STYLE) {
        var lastStyle = lastProps[propKey];

        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            if (!styleUpdates) {
              styleUpdates = {};
            }

            styleUpdates[styleName] = '';
          }
        }
      } else {
        // 设置 prop 为 null
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }
  } // 增加 props 更新


  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps !== null ? lastProps[propKey] : undefined;

    if (!(!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp === null && lastProp === null)) {
      if (propKey === STYLE) {
        if (lastProp) {
          for (var _styleName in lastProp) {
            if (lastProp.hasOwnProperty(_styleName) && (!nextProp || !nextProp.hasOwnProperty(_styleName))) {
              if (!styleUpdates) {
                styleUpdates = {};
              }

              styleUpdates[_styleName] = '';
            }
          }

          for (var _styleName2 in nextProp) {
            if (nextProp.hasOwnProperty(_styleName2) && lastProp[_styleName2] !== nextProp[_styleName2]) {
              if (!styleUpdates) {
                styleUpdates = {};
              }

              styleUpdates[_styleName2] = nextProp[_styleName2];
            }
          }
        } else {
          if (!styleUpdates) {
            if (!updatePayload) {
              updatePayload = [];
            }

            updatePayload.push(propKey, styleUpdates);
          }

          styleUpdates = nextProp;
        }
      } else if (propKey === CHILDREN) {
        // 文本
        if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
        }
      } else if ( // onClick onTap 情况
      propKey.length > 2 && (propKey[0] === 'o' || propKey[0] === 'O') && (propKey[1] === 'n' || propKey[1] === 'N')) {
        // todo 监听到root节点上
        // ensureListeningTo(domElement, propKey, nextProp);
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      } else {
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
  }

  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }

  return updatePayload;
}

/***/ }),

/***/ "../remixjs/src/renderer/config/index.js":
/*!***********************************************!*\
  !*** ../remixjs/src/renderer/config/index.js ***!
  \***********************************************/
/*! exports provided: appendAllChildren, createInstance, diffProperties, insertInContainerBefore, insertBefore, appendChild, appendChildToContainer, setInitialProperties, setContextText, resetTextContext, updateProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diffProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diffProperties */ "../remixjs/src/renderer/config/diffProperties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "diffProperties", function() { return _diffProperties__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _createInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createInstance */ "../remixjs/src/renderer/config/createInstance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createInstance", function() { return _createInstance__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _appendAllChildren__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appendAllChildren */ "../remixjs/src/renderer/config/appendAllChildren.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendAllChildren", function() { return _appendAllChildren__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _setInitialProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setInitialProperties */ "../remixjs/src/renderer/config/setInitialProperties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInitialProperties", function() { return _setInitialProperties__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _setTextContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setTextContent */ "../remixjs/src/renderer/config/setTextContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setContextText", function() { return _setTextContent__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _resetTextContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resetTextContent */ "../remixjs/src/renderer/config/resetTextContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetTextContext", function() { return _resetTextContent__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _insertInContainerBefore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./insertInContainerBefore */ "../remixjs/src/renderer/config/insertInContainerBefore.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insertInContainerBefore", function() { return _insertInContainerBefore__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _insertBefore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./insertBefore */ "../remixjs/src/renderer/config/insertBefore.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insertBefore", function() { return _insertBefore__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _appendChildToContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./appendChildToContainer */ "../remixjs/src/renderer/config/appendChildToContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendChildToContainer", function() { return _appendChildToContainer__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _appendChild__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./appendChild */ "../remixjs/src/renderer/config/appendChild.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendChild", function() { return _appendChild__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _updateProperties__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./updateProperties */ "../remixjs/src/renderer/config/updateProperties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateProperties", function() { return _updateProperties__WEBPACK_IMPORTED_MODULE_10__["default"]; });














/***/ }),

/***/ "../remixjs/src/renderer/config/insertBefore.js":
/*!******************************************************!*\
  !*** ../remixjs/src/renderer/config/insertBefore.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return insertBefore; });
function insertBefore(instance, child, beforeChild) {
  instance.insertBefore(child, beforeChild);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/insertInContainerBefore.js":
/*!*****************************************************************!*\
  !*** ../remixjs/src/renderer/config/insertInContainerBefore.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return insertInContainerBefore; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

function insertInContainerBefore(container, child, beforeChild) {
  if (container.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["COMMENT_NODE"]) {
    var parent = container.parentNode || container["return"];
    parent.insertBefore(child, beforeChild);
  } else {
    container.insertBefore(child, beforeChild);
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/resetTextContent.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/renderer/config/resetTextContent.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resetTextContent; });
/* harmony import */ var _setTextContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setTextContent */ "../remixjs/src/renderer/config/setTextContent.js");

function resetTextContent(element) {
  setContextText(element, '');
}

/***/ }),

/***/ "../remixjs/src/renderer/config/setDOMProperties.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/renderer/config/setDOMProperties.js ***!
  \**********************************************************/
/*! exports provided: default, setInnerHTML, setValueForStyles, setTextContent, setValueForProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setInitialDOMProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInnerHTML", function() { return setInnerHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForStyles", function() { return setValueForStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTextContent", function() { return setTextContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValueForProperty", function() { return setValueForProperty; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _shared_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");
/* harmony import */ var _event_ensureListeningTo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../event/ensureListeningTo */ "../remixjs/src/event/ensureListeningTo.js");
/* harmony import */ var _event_registrationNameModules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event/registrationNameModules */ "../remixjs/src/event/registrationNameModules.js");




function setInitialDOMProperties(tag, element, rootContainerElement, nextProps) {
  for (var propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      var nextProp = nextProps[propName];

      if (propName === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE"]) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _shared__WEBPACK_IMPORTED_MODULE_0__["CHILDREN"]) {
        if (typeof nextProp === 'string') {
          var canSetTextContent = tag !== 'textarea' || nextProp !== '';

          if (canSetTextContent) {
            setTextContent(element, nextProp);
          }
        } else if (typeof nextProp === 'number') {
          setTextContent(element, String(nextProp));
        }
      } else if (nextProp !== null) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}
function setInnerHTML() {}
function setValueForStyles(element, styles) {
  var style = element.style;

  for (var styleName in styles) {
    if (styleName === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE_NAME_FLOAT"]) {
      styleName = 'cssFloat';
    }

    style[styleName] = styles[styleName];
  }
}
function setTextContent(element, content) {
  element.innerText = content;
}
function setValueForProperty(element, propName, value) {
  if (Object(_shared_is__WEBPACK_IMPORTED_MODULE_1__["isNull"])(value)) {
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

/***/ "../remixjs/src/renderer/config/setInitialProperties.js":
/*!**************************************************************!*\
  !*** ../remixjs/src/renderer/config/setInitialProperties.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setInitialProperties; });
/* harmony import */ var _setDOMProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setDOMProperties */ "../remixjs/src/renderer/config/setDOMProperties.js");

function setInitialProperties(element, tag, nextProps, rootContainerInstance) {
  var props;

  switch (tag) {
    default:
      props = nextProps;
  }

  Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(tag, element, rootContainerInstance, props);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/setTextContent.js":
/*!********************************************************!*\
  !*** ../remixjs/src/renderer/config/setTextContent.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setTextContent; });
/* harmony import */ var _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === _shared_HTMLNodeType__WEBPACK_IMPORTED_MODULE_0__["TEXT_NODE"]) {
      firstChild.nodeValue = text;
      return;
    }
  }

  node.textContent = text;
}
;

/***/ }),

/***/ "../remixjs/src/renderer/config/updateDOMProperties.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/renderer/config/updateDOMProperties.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateDOMProperties; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _setDOMProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setDOMProperties */ "../remixjs/src/renderer/config/setDOMProperties.js");


function updateDOMProperties(element, updateQueue) {
  for (var i = 0; i < updateQueue.length; i += 2) {
    var propKey = updateQueue[i];
    var propValue = updateQueue[i + 1];

    if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["STYLE"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setValueForStyles"])(element, propValue);
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["DANGEROUSLY_SET_INNER_HTML"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setInnerHTML"])(element, propValue);
    } else if (propKey === _shared__WEBPACK_IMPORTED_MODULE_0__["CHILDREN"]) {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setTextContent"])(element, propValue);
    } else {
      Object(_setDOMProperties__WEBPACK_IMPORTED_MODULE_1__["setValueForProperty"])(element, propKey, propValue);
    }
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/updateProperties.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/renderer/config/updateProperties.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateProperties; });
/* harmony import */ var _updateDOMProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateDOMProperties */ "../remixjs/src/renderer/config/updateDOMProperties.js");

function updateProperties(instance, updateQueue, tag, props, nextProps) {
  Object(_updateDOMProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, updateQueue);
}

/***/ }),

/***/ "../remixjs/src/renderer/index.js":
/*!****************************************!*\
  !*** ../remixjs/src/renderer/index.js ***!
  \****************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _renderIntoContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderIntoContainer */ "../remixjs/src/renderer/renderIntoContainer.js");

function render(element, container, callback) {
  return Object(_renderIntoContainer__WEBPACK_IMPORTED_MODULE_0__["default"])(element, container, callback);
}
/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ }),

/***/ "../remixjs/src/renderer/renderIntoContainer.js":
/*!******************************************************!*\
  !*** ../remixjs/src/renderer/renderIntoContainer.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return renderIntoContainer; });
/* harmony import */ var _reconciler_Fiber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciler/Fiber */ "../remixjs/src/reconciler/Fiber.js");
/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler */ "../remixjs/src/scheduler/index.js");
/* harmony import */ var _react_ReactCurrentRoot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/ReactCurrentRoot */ "../remixjs/src/react/ReactCurrentRoot.js");



function renderIntoContainer(element, container, callback) {
  var _ref = container._reactRootContainer || (container._reactRootContainer = {
    _internalRoot: Object(_reconciler_Fiber__WEBPACK_IMPORTED_MODULE_0__["createFiberRoot"])(container)
  }),
      _internalRoot = _ref._internalRoot;

  _react_ReactCurrentRoot__WEBPACK_IMPORTED_MODULE_2__["default"].current = container._reactRootContainer;
  var root = _internalRoot;
  return Object(_scheduler__WEBPACK_IMPORTED_MODULE_1__["scheduleRootUpdate"])(root, element, callback);
}

/***/ }),

/***/ "../remixjs/src/router/Route.js":
/*!**************************************!*\
  !*** ../remixjs/src/router/Route.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Route; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js");








var Route =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Route, _Component);

  function Route() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Route);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Route).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Route, [{
    key: "render",
    value: function render() {
      return _react__WEBPACK_IMPORTED_MODULE_5__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return Route;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "../remixjs/src/router/Router.js":
/*!***************************************!*\
  !*** ../remixjs/src/router/Router.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js");








var Router =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Router, _Component);

  function Router() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Router);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Router).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Router, [{
    key: "render",
    value: function render() {
      return _react__WEBPACK_IMPORTED_MODULE_5__["default"].createElement("view", null, this.props.children);
    }
  }]);

  return Router;
}(_react_Component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "../remixjs/src/router/index.js":
/*!**************************************!*\
  !*** ../remixjs/src/router/index.js ***!
  \**************************************/
/*! exports provided: Router, Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "../remixjs/src/router/Router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _Router__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Route */ "../remixjs/src/router/Route.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _Route__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "../remixjs/src/scheduler/classComponentUpdater.js":
/*!*********************************************************!*\
  !*** ../remixjs/src/scheduler/classComponentUpdater.js ***!
  \*********************************************************/
/*! exports provided: MOUNTING, MOUNTED, UNMOUNTED, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTING", function() { return MOUNTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTED", function() { return MOUNTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNMOUNTED", function() { return UNMOUNTED; });
/* harmony import */ var _shared_updateTags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/updateTags */ "../remixjs/src/shared/updateTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _updateQueue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateQueue */ "../remixjs/src/scheduler/updateQueue.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "../remixjs/src/scheduler/index.js");
/* harmony import */ var _shared_statusTags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/statusTags */ "../remixjs/src/shared/statusTags.js");
/* harmony import */ var _shared_renderTags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/renderTags */ "../remixjs/src/shared/renderTags.js");







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
    var update = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["createUpdate"])();
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.statusTag = _shared_statusTags__WEBPACK_IMPORTED_MODULE_5__["WORKING"];
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["enqueueUpdate"])(fiber, update);
    Object(_index__WEBPACK_IMPORTED_MODULE_4__["scheduleWork"])(fiber);
  },
  enqueueReplaceState: function enqueueReplaceState(inst, payload, callback) {
    var fiber = inst._reactInternalFiber;
    var update = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["createUpdate"])();
    update.tag = _shared_updateTags__WEBPACK_IMPORTED_MODULE_0__["REPLACE_STATE"];
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    } // if (revertPassiveEffectsChange) {
    //   flushPassiveEffects();
    // }


    fiber.statusTag = _shared_statusTags__WEBPACK_IMPORTED_MODULE_5__["WORKING"];
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["enqueueUpdate"])(fiber, update);
    Object(_index__WEBPACK_IMPORTED_MODULE_4__["scheduleWork"])(fiber, _shared_renderTags__WEBPACK_IMPORTED_MODULE_6__["SYNC"]);
  },
  enqueueForceUpdate: function enqueueForceUpdate(inst, callback) {
    var fiber = inst._reactInternalFiber;
    var update = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["createUpdate"])();
    update.tag = _shared_updateTags__WEBPACK_IMPORTED_MODULE_0__["FORCE_UPDATE"];

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    fiber.statusTag = _shared_statusTags__WEBPACK_IMPORTED_MODULE_5__["WORKING"];
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_3__["enqueueUpdate"])(fiber, update);
    Object(_index__WEBPACK_IMPORTED_MODULE_4__["scheduleWork"])(fiber);
  }
});

/***/ }),

/***/ "../remixjs/src/scheduler/commitWork.js":
/*!**********************************************!*\
  !*** ../remixjs/src/scheduler/commitWork.js ***!
  \**********************************************/
/*! exports provided: isWorking, isCommiting, commitRoot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWorking", function() { return isWorking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommiting", function() { return isCommiting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commitRoot", function() { return commitRoot; });
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "../remixjs/node_modules/@babel/runtime/helpers/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _renderer_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer/config */ "../remixjs/src/renderer/config/index.js");





var nextEffect;
var isWorking = false;
var isCommiting = false;
function commitRoot(root) {
  isWorking = true;
  isCommiting = true;
  var finishedWork = root.finishedWork;

  if (finishedWork) {
    root.finishedWork = null;
    var firstEffect; // 如果有有 effect

    if (finishedWork.effectTag > _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PERFORMED_WORK"]) {
      // 如果有 effect
      if (finishedWork.lastEffect !== null) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      firstEffect = finishedWork.firstEffect;
    } // 这里执行三大循环


    if (firstEffect !== null) {
      // commitBeforeMutationEffects
      nextEffect = firstEffect;

      do {
        nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = firstEffect;

      do {
        commitMutationEffects(root, finishedWork); // nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      root.current = finishedWork;
      nextEffect = firstEffect;

      do {
        commitLayoutEffects(root); // nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = firstEffect;

      while (nextEffect !== null) {
        var nextNextEffect = nextEffect.nextEffect;
        nextEffect.nextEffect = null;
        nextEffect = nextNextEffect;
      }

      isCommiting = false;
      isWorking = false;
    }
  }
}

function commitMutationEffects(root, finishedWork) {
  while (nextEffect !== null) {
    var effectTag = nextEffect.effectTag;

    if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["CONTENT_RESET"]) {}

    if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["REF"]) {} // 插入 | 更新 | 删除


    var primaryEffectTag = effectTag & (_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["DELETION"]);

    switch (primaryEffectTag) {
      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"]:
        {
          commitPlacement(nextEffect); // 重置 effectTag

          nextEffect.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"];
          break;
        }

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT_AND_UPDATE"]:
        {
          // PLACEMENT
          commitPlacement(nextEffect);
          nextEffect.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"]; // UPDATE

          var current = nextEffect.alternate;
          commitWork(current, nextEffect);
          break;
        }
        ;

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"]:
        {
          var _current = nextEffect.alternate;
          commitWork(_current, nextEffect);
          break;
        }

      case _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["DELETION"]:
        {
          commitDeletion(nextEffect);
          break;
        }

      default:
        break;
    }

    nextEffect = nextEffect.nextEffect;
  }
}

function commitLayoutEffects(root) {
  while (nextEffect !== null) {
    var effectTag = nextEffect.effectTag; // UPDATE | CALLBACK 
    // thi.setState({}, () => {})
    // render(<App />, container, () => {})
    // componentDidUpdate

    if (effectTag & (_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"] | _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["CALLBACK"])) {
      var current = nextEffect.alternate;
      commitLifeCycles(root, current, nextEffect);
    } // <div ref={() => {}}></div>


    if (effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["REF"]) {
      commitAttachRef(nextEffect);
    } // if (effectTag & PASSIVE) {
    //   rootWithPendingPassiveEffects = finishedRoot;
    // }


    nextEffect = nextEffect.nextEffect;
  }
}

function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["CLASS_COMPONENT"]:
      {
        var instance = finishedWork.stateNode; // 首次渲染

        if (current === null) {
          if (typeof instance.componentDidMount === 'function') {
            instance.componentDidMount();
          }
        } else {
          var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : Object(_shared__WEBPACK_IMPORTED_MODULE_3__["resolveDefaultProps"])(finishedWork.type, current.memoizedProps);
          var prevState = current.memoizedState;

          if (typeof instance.componentDidUpdate === 'function') {
            instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
          }
        }

        var updateQueue = finishedWork.updateQueue;

        if (updateQueue !== null) {
          commitUpdateQueue(finishedWork, updateQueue, instance);
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_ROOT"]:
      {
        var _updateQueue = finishedWork.updateQueue;

        if (_updateQueue !== null) {
          var _instance = null;

          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
                _instance = getPublicInstance(finishedWork.child.stateNode);
                break;

              case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["CLASS_COMPONENT"]:
                _instance = finishedWork.child.stateNode;
                break;
            }
          }

          commitUpdateQueue(finishedWork, _updateQueue, _instance);
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
      {
        var _instance2 = finishedWork.stateNode;

        if (current === null && finishedWork.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE"]) {
          var type = finishedWork.type;
          var props = finishedWork.memoizedProps;
          commitMount(_instance2, type, props, finishedWork);
        }

        break;
      }

    default:
      {
        throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in Remixjs. Please file an issue.");
      }
  }
}

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  // 这里的 effect 是 updateQueue effectList，在 processUpdate 产生的副作用
  commitUpdateEffects(finishedQueue.firstEffect, instance); // 重置 updateQueue effect list

  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
}

function commitUpdateEffects(effect, instance) {
  // 处理updateQueue effect
  while (effect !== null) {
    var callback = effect.callback; // setState , render 回调函数

    if (typeof callback === 'function') {
      effect.callback = null;
      callback.call(instance);
    }

    effect = effect.nextEffect;
  }
}

function commitPlacement(finishedWork) {
  var parentFiber = getHostParentFiber(finishedWork);
  var tag = parentFiber.tag,
      stateNode = parentFiber.stateNode;
  var parent;
  var isContainer;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
      {
        parent = stateNode;
        isContainer = false;
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_ROOT"]:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_PORTAL"]:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    default:
      console.log('Invalid host parent');
  }

  if (parentFiber.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["CONTENT_RESET"]) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["CONTENT_RESET"];
  }

  var before = getHostSibling(finishedWork);
  var node = finishedWork;

  while (true) {
    var isHost = node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"] || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"];

    if (isHost) {
      var _stateNode = isHost ? node.stateNode : node.stateNode.instance;

      if (before) {
        if (isContainer) {
          Object(_renderer_config__WEBPACK_IMPORTED_MODULE_4__["insertInContainerBefore"])(parent, _stateNode, before);
        } else {
          Object(_renderer_config__WEBPACK_IMPORTED_MODULE_4__["insertBefore"])(parent, _stateNode, before);
        }
      } else {
        if (isContainer) {
          Object(_renderer_config__WEBPACK_IMPORTED_MODULE_4__["appendChildToContainer"])(parent, _stateNode);
        } else {
          Object(_renderer_config__WEBPACK_IMPORTED_MODULE_4__["appendChild"])(parent, _stateNode);
        }
      }
    } else if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_PORTAL"]) {} else if (node.child !== null) {
      node.child["return"] = node;
      node = node.child;
      continue;
    }

    if (node === finishedWork) {
      return;
    }

    while (node.sibling === null) {
      if (node["return"] === null || node["return"] === finishedWork) {
        return;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;
  }
}

function commitUpdate(instance, updateQueue, type, props, nextProps, finishedWork) {
  instance[_shared__WEBPACK_IMPORTED_MODULE_3__["INTERNAL_EVENT_HANDLERS_KEY"]] = nextProps;
  Object(_renderer_config__WEBPACK_IMPORTED_MODULE_4__["updateProperties"])(instance, updateQueue, type, props, nextProps);
}

function commitMount(domElement, type, newProps, internalInstanceHandle) {
  // 处理焦点问题
  if (shouldAutoFocusHostComponent(type, newProps)) {
    domElement.focus();
  }
} // 处理ref


function commitAttachRef(finishedWork) {
  var ref = finishedWork.ref;

  if (ref !== null) {
    var instance = finishedWork.stateNode;
    var instanceToUse;

    switch (finishedWork.tag) {
      case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
        instanceToUse = getPublicInstance(instance);
        break;

      default:
        instanceToUse = instance;
    }

    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}

function commitWork(current, finishedWork) {
  var tag = finishedWork.tag;

  switch (tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["FUNCTION_COMPONENT"]:
      {
        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
      {
        var instance = finishedWork.stateNode;

        if (instance !== null) {
          var nextProps = finishedWork.memoizedProps;
          var props = current !== null ? current.memoizedProps : nextProps;
          var type = finishedWork.type;
          var updateQueue = finishedWork.updateQueue;
          finishedWork.updateQueue = null;

          if (updateQueue !== null) {
            commitUpdate(instance, updateQueue, type, props, finishedWork, finishedWork);
          }
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"]:
      {
        var _instance3 = finishedWork.stateNode;
        var nextText = finishedWork.memoizedProps;
        var text = current === null ? current$$1.memoizedProps : nextText;
        commitTextUpdate(_instance3, text, nextText);
        return;
      }
  }
}

function commitTextUpdate(textInstance, oldText, newText) {
  textInstance.nodeValue = newText;
}

function isHostParent(fiber) {
  return fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"] || fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_ROOT"] || fiber.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_PORTAL"];
}

function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case 'input':
    case 'textarea':
      return !!props.autoFocus;
  }

  return false;
}

function getHostSibling(fiber) {
  var node = fiber;

  siblings: while (true) {
    while (node.sibling === null) {
      if (node["return"] === null || isHostParent(node["return"])) {
        return null;
      }

      node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node["return"]);
    }

    node.sibling["return"] = node["return"];
    node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node.sibling);

    while (node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"] && node.tag !== _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"]) {
      if (node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"]) {
        continue siblings;
      }

      if (node.child === null || node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_PORTAL"]) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("node"), node.child);
      }
    }

    if (!(node.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_1__["PLACEMENT"])) {
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

/***/ "../remixjs/src/scheduler/completeWork.js":
/*!************************************************!*\
  !*** ../remixjs/src/scheduler/completeWork.js ***!
  \************************************************/
/*! exports provided: completeUnitOfWork, completeRoot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "completeUnitOfWork", function() { return completeUnitOfWork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "completeRoot", function() { return completeRoot; });
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! requestidlecallback */ "../remixjs/node_modules/requestidlecallback/index.js");
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(requestidlecallback__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _reconciler_Fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reconciler/Fiber */ "../remixjs/src/reconciler/Fiber.js");
/* harmony import */ var _reconciler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reconciler */ "../remixjs/src/reconciler/index.js");
/* harmony import */ var _commitWork__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commitWork */ "../remixjs/src/scheduler/commitWork.js");
/* harmony import */ var _renderer_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../renderer/config */ "../remixjs/src/renderer/config/index.js");
/* harmony import */ var _updateQueue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updateQueue */ "../remixjs/src/scheduler/updateQueue.js");
/* harmony import */ var _react_ReactCurrentRoot__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../react/ReactCurrentRoot */ "../remixjs/src/react/ReactCurrentRoot.js");











function completeUnitOfWork(unitOfWork) {
  var workInProgress = unitOfWork; // 收集 effect

  while (workInProgress) {
    var current = workInProgress.alternate;
    var returnFiber = workInProgress["return"];

    if ((workInProgress.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["INCOMPLETE"]) === _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["NO_EFFECT"]) {
      var next = completeWork(current, workInProgress); // 如果没有了 next

      if (next !== null) {
        return next;
      } // 如果存在 returnfiber 且 父fiber 没有 副作用


      if (returnFiber !== null && (returnFiber.effectTag & _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["INCOMPLETE"]) === _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["NO_EFFECT"]) {
        // 设置 firstEffect 给 父fiber
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        } // 如果当前 workInProgress lastEffect 存在


        if (workInProgress.lastEffect !== null) {
          // 将父fiber effect 与 workInProgress 链接起来
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          } // 设置父fiber lastEffect


          returnFiber.lastEffect = workInProgress.lastEffect;
        } // 如果 workInProgress 存在副作用，则根据 父fiber的 lastEffect来链接


        var effectTag = workInProgress.effectTag;

        if (effectTag > _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["PERFORMED_WORK"]) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }

          returnFiber.lastEffect = workInProgress;
        }
      }
    } else {
      debugger;
      console.log(123);
    }

    var sibling = workInProgress.sibling; // 处理 sibling 

    if (sibling !== null) {
      return sibling;
    }

    workInProgress = returnFiber;
  }

  return null;
}

function getRootHostContainer() {
  var root = _react_ReactCurrentRoot__WEBPACK_IMPORTED_MODULE_9__["default"].current._internalRoot;
  return root.containerInfo;
}

function completeWork(current, workInProgress) {
  var newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_ROOT"]:
      {
        // const fiberRoot = WIP.instanceNode;
        if (current === null || current.child === null) {
          workInProgress.effectTag &= ~_shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["PLACEMENT"];
        } // updateHostContainer(WIP);


        return null;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_COMPONENT"]:
      {
        var rootContainerInstance = getRootHostContainer();
        var type = workInProgress.type;

        if (current !== null && workInProgress.stateNode !== null) {
          updateHostComponent(current, workInProgress, type, newProps, rootContainerInstance);
        } else {
          if (newProps) {
            var instance = Object(_renderer_config__WEBPACK_IMPORTED_MODULE_7__["createInstance"])(type, newProps, rootContainerInstance, workInProgress);
            Object(_renderer_config__WEBPACK_IMPORTED_MODULE_7__["appendAllChildren"])(instance, workInProgress);
            Object(_renderer_config__WEBPACK_IMPORTED_MODULE_7__["setInitialProperties"])(instance, type, newProps, rootContainerInstance);
            workInProgress.stateNode = instance;
          }
        }

        break;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["HOST_TEXT"]:
      {
        var newText = newProps; // that means it rendered

        if (current !== null && WIP.instanceNode !== null) {
          var oldText = current.prevProps;
          updateHostText(current, WIP, oldText, newText);
        } else {
          if (typeof newText !== 'string') {
            return null;
          }

          var _rootContainerInstance = getRootHostContainer();

          WIP.instanceNode = createTextInstance(newText, _rootContainerInstance, WIP);
        }

        return null;
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_2__["FRAGMENT"]:
      {
        return null;
      }

    default:
      return null;
  }

  return null;
}

function updateHostComponent(current, workInProgress, type, newProps, rootContainerInstance) {
  var oldProps = current.memoizedProps; // 如果 props 无变化

  if (oldProps === newProps) {
    return;
  }

  var instance = workInProgress.stateNode; // diff properties

  var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance);
  workInProgress.updateQueue = updatePayload;

  if (updatePayload) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__["UPDATE"];
  }
}

function completeRoot(root, finishedWork) {
  Object(_commitWork__WEBPACK_IMPORTED_MODULE_6__["commitRoot"])(root, finishedWork);
}

function prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance) {
  return Object(_renderer_config__WEBPACK_IMPORTED_MODULE_7__["diffProperties"])(instance, type, oldProps, newProps, rootContainerInstance);
}

/***/ }),

/***/ "../remixjs/src/scheduler/index.js":
/*!*****************************************!*\
  !*** ../remixjs/src/scheduler/index.js ***!
  \*****************************************/
/*! exports provided: scheduleRootUpdate, scheduleWork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleRootUpdate", function() { return scheduleRootUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleWork", function() { return scheduleWork; });
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! requestidlecallback */ "../remixjs/node_modules/requestidlecallback/index.js");
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(requestidlecallback__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _reconciler_Fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reconciler/Fiber */ "../remixjs/src/reconciler/Fiber.js");
/* harmony import */ var _reconciler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reconciler */ "../remixjs/src/reconciler/index.js");
/* harmony import */ var _performWork__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./performWork */ "../remixjs/src/scheduler/performWork.js");
/* harmony import */ var _updateQueue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./updateQueue */ "../remixjs/src/scheduler/updateQueue.js");
/* harmony import */ var _shared_renderTags__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/renderTags */ "../remixjs/src/shared/renderTags.js");











var nextUnitOfWork = null;
var workInProgress = null;
function scheduleRootUpdate(root, element, callback) {
  var update = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_7__["createUpdate"])();
  update.payload = {
    element: element
  };

  if (typeof callback === 'function') {
    update.callback = callback;
  }

  var current = root.current;
  current.statusTag = _shared__WEBPACK_IMPORTED_MODULE_2__["WORKING"];
  Object(_updateQueue__WEBPACK_IMPORTED_MODULE_7__["enqueueUpdate"])(current, update);
  scheduleWork(current, _shared_renderTags__WEBPACK_IMPORTED_MODULE_8__["SYNC"]);
}
function scheduleWork(current, isSync) {
  var root = scheduleToRoot(current);

  if (isSync) {
    Object(_performWork__WEBPACK_IMPORTED_MODULE_6__["requestWork"])(root, isSync);
  } else {
    Object(_performWork__WEBPACK_IMPORTED_MODULE_6__["requestWork"])(root);
  }
}

function scheduleToRoot(fiber) {
  var node = fiber;

  while (node) {
    if (node.tag === _shared_workTags__WEBPACK_IMPORTED_MODULE_1__["HOST_ROOT"]) {
      break;
    }

    node = node["return"];
  }

  return node.stateNode;
}

/***/ }),

/***/ "../remixjs/src/scheduler/performWork.js":
/*!***********************************************!*\
  !*** ../remixjs/src/scheduler/performWork.js ***!
  \***********************************************/
/*! exports provided: requestWork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestWork", function() { return requestWork; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! requestidlecallback */ "../remixjs/node_modules/requestidlecallback/index.js");
/* harmony import */ var requestidlecallback__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(requestidlecallback__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_workTags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");
/* harmony import */ var _shared_statusTags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/statusTags */ "../remixjs/src/shared/statusTags.js");
/* harmony import */ var _reconciler_Fiber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reconciler/Fiber */ "../remixjs/src/reconciler/Fiber.js");
/* harmony import */ var _completeWork__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./completeWork */ "../remixjs/src/scheduler/completeWork.js");
/* harmony import */ var _reconciler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../reconciler */ "../remixjs/src/reconciler/index.js");
/* harmony import */ var _updateQueue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./updateQueue */ "../remixjs/src/scheduler/updateQueue.js");
/* harmony import */ var _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./classComponentUpdater */ "../remixjs/src/scheduler/classComponentUpdater.js");
/* harmony import */ var _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../react/ReactCurrentOwner */ "../remixjs/src/react/ReactCurrentOwner.js");
/* harmony import */ var _shared_renderTags__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shared/renderTags */ "../remixjs/src/shared/renderTags.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }














var nextUnitOfWork = null;
var workInProgress = null;
var disableLegacyContext = true;
var currentlyRenderingFiber = null;
var currentHook = null;
var nextCurrentHook = null;
var firstWorkInProgressHook = null;
var workInProgressHook = null;
var nextWorkInProgressHook = null;
var componentUpdateQueue = null;
var sideEffectTag = 0;
var ReactCurrentDispatcher = {
  current: null
};
var ContextOnlyDispatcher = null;
function requestWork(root, isSync) {
  if (isSync) {
    performWorkSync(root);
  } else {
    Object(requestidlecallback__WEBPACK_IMPORTED_MODULE_2__["request"])(function (deadline) {
      return performWork(deadline, root);
    });
  }
}

function performWorkSync(root) {
  workLoopSync(root);

  if (nextUnitOfWork) {
    requestWork(root, _shared_renderTags__WEBPACK_IMPORTED_MODULE_13__["SYNC"]);
  }

  if (nextUnitOfWork === null) {
    var finishedWork = root.current.alternate; // workInProgress

    root.finishedWork = finishedWork;

    if (finishedWork) {
      Object(_completeWork__WEBPACK_IMPORTED_MODULE_8__["completeRoot"])(root, finishedWork);
    }
  }
}

function performWork(deadline, root) {
  workLoop(deadline, root);

  if (nextUnitOfWork) {
    requestWork(root);
  }

  if (nextUnitOfWork === null) {
    var finishedWork = root.current.alternate; // workInProgress

    root.finishedWork = finishedWork;

    if (finishedWork) {
      Object(_completeWork__WEBPACK_IMPORTED_MODULE_8__["completeRoot"])(root, finishedWork);
    }
  }
}

function workLoopSync(root) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = Object(_reconciler_Fiber__WEBPACK_IMPORTED_MODULE_7__["createWorkInProgress"])(root.current, null);
  } // 如果还有工作，有空档时间


  while (nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function workLoop(deadline, root) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = Object(_reconciler_Fiber__WEBPACK_IMPORTED_MODULE_7__["createWorkInProgress"])(root.current, null);
  } // 如果还有工作，有空档时间


  while (nextUnitOfWork !== null && deadline.timeRemaining() > _shared__WEBPACK_IMPORTED_MODULE_4__["EXPIRE_TIME"]) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork(nextUnitOfWork) {
  var current = nextUnitOfWork.alternate;
  var next = beginWork(current, nextUnitOfWork);
  nextUnitOfWork.memoizedProps = nextUnitOfWork.pendingProps;

  if (next === null) {
    next = Object(_completeWork__WEBPACK_IMPORTED_MODULE_8__["completeUnitOfWork"])(nextUnitOfWork);
  }

  return next;
}

function beginWork(current, workInProgress) {
  // 如果不是第一次渲染
  if (current !== null) {
    // 当前 props
    var props = current.memoizedProps; // 即将更新 props

    var nextProps = workInProgress.pendingProps; // 如果 props 是同一个引用，则无须再次调用构造，直接更新子元素即可

    if (props === nextProps) {
      if (workInProgress.statusTag === _shared_statusTags__WEBPACK_IMPORTED_MODULE_6__["NO_WORK"]) {
        Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["cloneChildFibers"])(current, workInProgress);
        return workInProgress.child;
      }
    }
  }

  workInProgress.statusTag = _shared_statusTags__WEBPACK_IMPORTED_MODULE_6__["NO_WORK"];

  switch (workInProgress.tag) {
    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["INDETERMINATE_COMPONENT"]:
      {
        return mountIndeterminateComponent(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["HOST_ROOT"]:
      {
        return updateHostRoot(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["HOST_COMPONENT"]:
      {
        return updateHostComponent(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["HOST_TEXT"]:
      {
        return updateHostText(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["CLASS_COMPONENT"]:
      {
        return updateClassComponent(current, workInProgress);
      }

    case _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["FUNCTION_COMPONENT"]:
      {
        return updateFunctionComponent(current, workInProgress);
      }
  }
}

function updateHostComponent(current, workInProgress) {
  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var prevProps = current !== null ? current.memoizedProps : null;
  var isDirectTextChild = typeof nextProps.children === 'string' || typeof nextProps.children === 'number';
  var nextChildren = nextProps.children;

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (prevProps !== null && (typeof prevProps.children === 'string' || typeof prevProps.children === 'number')) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["CONTENT_RESET"];
  } // mark ref


  var ref = workInProgress.ref;

  if (current === null && ref !== null || current !== null && current.ref !== ref) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["REF"];
  }

  Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildren"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateFunctionComponent(current, workInProgress, status) {
  var Component = workInProgress.type;
  var unresolvedProps = workInProgress.pendingProps;
  var nextProps = Object(_shared__WEBPACK_IMPORTED_MODULE_4__["resolveDefaultProps"])(Component, unresolvedProps); // 更新状态

  if (current !== null) {
    var oldProps = current.memoizedProps;

    if (Object(_shared__WEBPACK_IMPORTED_MODULE_4__["shallowEqual"])(oldProps, nextProps) && current.ref === workInProgress.ref) {
      Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["cloneChildFibers"])(current, workInProgress);
      return workInProgress.child;
    }
  } // prepareWithState(current, WIP);


  var nextChildren = Component(nextProps); // nextChildren = finishedWith(Component, nextProps, nextChildren);

  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["PERFORMED"];
  Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildren"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateClassComponent(current, workInProgress) {
  // todo
  // prepareToReadContext(workInProgress, renderExpirationTime);
  var unresolvedProps = workInProgress.pendingProps;
  var Component = workInProgress.type;
  var nextProps = workInProgress.elementType === Component ? unresolvedProps : Object(_shared__WEBPACK_IMPORTED_MODULE_4__["resolveDefaultProps"])(Component, unresolvedProps);
  var instance = workInProgress.stateNode;
  var shouldUpdate = false;
  var hasContext = false;

  if (instance === null) {
    // 更新 classComponent 
    if (current !== null) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["PLACEMENT"];
    }

    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps);
    shouldUpdate = true;
  } else if (current === null) {
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps);
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps);
  }

  return finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext);
}

function constructClassInstance(workInProgress, Component, props) {
  var isLegacyContextConsumer = false;
  var unmaskedContext = _shared__WEBPACK_IMPORTED_MODULE_4__["EMPTY_CONTEXT"];
  var context = _shared__WEBPACK_IMPORTED_MODULE_4__["EMPTY_CONTEXT"];
  var contextType = Component.contextType;

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(contextType) === 'object' && contextType !== null) {
    context = readContext(contextType);
  } else if (!disableLegacyContext) {
    unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    var contextTypes = Component.contextTypes;
    isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject;
  }

  var instance = new Component(props, context);
  var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null; // 设置 Component updater

  instance.updater = _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__["default"];
  workInProgress.stateNode = instance;
  instance._reactInternalFiber = workInProgress;

  if (isLegacyContextConsumer) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return instance;
}

function mountClassInstance(workInProgress, Component, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = _shared__WEBPACK_IMPORTED_MODULE_4__["EMPTY_REFS"];
  var contextType = Component.contextType;

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(contextType) === 'object' && contextType !== null) {
    instance.context = readContext(contextType);
  } else if (disableLegacyContext) {
    instance.context = _shared__WEBPACK_IMPORTED_MODULE_4__["EMPTY_CONTEXT"];
  } else {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }

  var updateQueue = workInProgress.updateQueue;

  if (updateQueue !== null) {
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["processUpdateQueue"])(workInProgress, updateQueue, newProps, instance);
    instance.state = workInProgress.memoizedState;
  } // 新生命周期 API


  var getDerivedStateFromProps = Component.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    instance.state = workInProgress.memoizedState;
  } // 调用旧的 API， 先判断：如果有新 API，则不执行旧API，否则执行


  if (typeof Component.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
    callComponentWillMount(workInProgress, instance); // 上面有可能会变更 updateQueue，所有还需要再次执行 processUpdateQueue，处理更新

    updateQueue = workInProgress.updateQueue;

    if (updateQueue !== null) {
      Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["processUpdateQueue"])(workInProgress, updateQueue, newProps, instance);
      instance.state = workInProgress.memoizedState;
    }
  }

  if (typeof instance.componentDidMount === 'function') {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
  }
}

function updateClassInstance(current, workInProgress, Component, newProps) {
  var instance = workInProgress.stateNode;
  var oldProps = workInProgress.memoizedProps;
  instance.props = workInProgress.type === workInProgress.elementType ? oldProps : Object(_shared__WEBPACK_IMPORTED_MODULE_4__["resolveDefaultProps"])(workInProgress.type, oldProps);
  var oldContext = instance.context;
  var contextType = Component.contextType;
  var nextContext = _shared__WEBPACK_IMPORTED_MODULE_4__["EMPTY_CONTEXT"];

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(contextType) === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';
  Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["resetHasForceUpdateBeforeProcessing"])();
  var oldState = workInProgress.memoizedState;
  var updateQueue = workInProgress.updateQueue;
  var newState = instance.state = oldState;

  if (updateQueue !== null) {
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["processUpdateQueue"])(workInProgress, updateQueue, newProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["checkHasForceUpdateAfterProcessing"])()) {
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["SNAPSHOT"];
      }
    }

    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["checkHasForceUpdateAfterProcessing"])() || checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
      if (typeof instance.componentWillUpdate === 'function') {
        instance.componentWillUpdate(newProps, newState, nextContext);
      }

      if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
        instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
      }
    }

    if (typeof instance.componentDidUpdate === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["SNAPSHOT"];
    }
  } else {
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["SNAPSHOT"];
      }
    }

    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  instance._reactInternalFiber = workInProgress;
  return shouldUpdate;
}

function resumeMountClassInstance(workInProgress, Component, newProps) {
  var instance = workInProgress.stateNode;
  var oldProps = workInProgress.memoizedProps;
  instance.props = oldProps;
  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = emptyContextObject;

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(contextType) === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    nextContext = getMaskedContext(workInProgress, nextLegacyUnmaskedContext);
  }

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';
  var componentWillReceiveProps = instance.UNSAFE_componentWillReceiveProps || instance.componentWillReceiveProps;

  if (!hasNewLifecycles && typeof componentWillReceiveProps === 'function') {
    if (oldProps !== newProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["resetHasForceUpdateBeforeProcessing"])();
  var oldState = workInProgress.memoizedState;
  var updateQueue = workInProgress.updateQueue;
  var newState = instance.state = oldState;

  if (updateQueue !== null) {
    Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["processUpdateQueue"])(workInProgress, updateQueue, newProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["checkHasForceUpdateAfterProcessing"])()) {
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
    }

    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["checkHasForceUpdateAfterProcessing"])() || checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    var componentWillMount = instance.componentWillMount || instance.UNSAFE_componentWillMount;

    if (!hasNewLifecycles && typeof componentWillMount === 'function') {
      componentWillMount.call(instance);
    }

    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
    }
  } else {
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["UPDATE"];
    }

    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext) {
  var ref = workInProgress.ref;

  if (current === null && ref !== null || current !== null && current.ref !== ref) {
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["REF"];
  }

  if (!shouldUpdate) {
    if (hasContext) {
      invalidateContextProvider(workInProgress, Component, false);
    }

    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  var instance = workInProgress.stateNode;
  _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_12__["default"].current = workInProgress;
  var nextChildren = instance.render();
  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["PERFORMED_WORK"];

  if (current !== null) {
    workInProgress.child = Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildFibers"])(workInProgress, current.child, nextChildren);
  } else {
    Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildren"])(current, workInProgress, nextChildren);
  }

  workInProgress.memoizedState = instance.state;

  if (hasContext) {
    invalidateContextProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  var oldState = instance.state;
  var componentWillReceiveProps = instance.componentWillReceiveProps || instance.UNSAFE_componentWillReceiveProps;

  if (typeof componentWillReceiveProps === 'function') {
    componentWillReceiveProps.call(instance, newProps, nextContext);
  }

  if (instance.state !== oldState) {
    _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__["default"].enqueueReplaceState(instance, instance.state, null);
  }
}

function callComponentWillMount(workInProgress, instance) {
  var oldState = instance.state;
  var componentWillMount = instance.componentWillMount || instance.UNSAFE_componentWillMount;

  if (typeof componentWillMount === 'function') {
    componentWillMount.call(instance);
  } // 如果state对象变了，则更新updateQueue


  if (oldState !== instance.state) {
    _classComponentUpdater__WEBPACK_IMPORTED_MODULE_11__["default"].enqueueReplaceState(instance, instance.state, null);
  }
}

function applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps) {
  var prevState = workInProgress.memoizedState;
  var partialState = getDerivedStateFromProps(nextProps, prevState); // 合并 state

  var memoizedState = partialState === null || partialState === undefined ? prevState : _objectSpread({}, prevState, {
    partialState: partialState
  });
  workInProgress.memoizedState = memoizedState; // 更新 updateQueue state

  var updateQueue = workInProgress.updateQueue;

  if (updateQueue !== null) {
    updateQueue.baseState = memoizedState;
  }
}

function checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext) {
  var instance = workInProgress.stateNode;

  if (typeof instance.shouldComponentUpdate === 'function') {
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !Object(_shared__WEBPACK_IMPORTED_MODULE_4__["shallowEqual"])(oldProps, newProps) || !Object(_shared__WEBPACK_IMPORTED_MODULE_4__["shallowEqual"])(oldState, newState);
  }

  return true;
}

function resetHooks() {
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  currentlyRenderingFiber = null;
  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;
  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  didScheduleRenderPhaseUpdate = false;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}

function renderWithHooks(current, workInProgress, Component, props, refOrContext) {
  currentlyRenderingFiber = workInProgress;
  nextCurrentHook = current !== null ? current.memoizedState : null;
  var children = Component(props, refOrContext);
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  var renderedWork = currentlyRenderingFiber;
  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.updateQueue = componentUpdateQueue;
  renderedWork.effectTag |= sideEffectTag;
  renderedWork.statusTag = _shared_statusTags__WEBPACK_IMPORTED_MODULE_6__["WORKING"];
  var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
  currentlyRenderingFiber = null;
  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  return children;
}

function isContextProvider(type) {
  if (disableLegacyContext) {
    return false;
  } else {
    var childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
  }
}

function mountIndeterminateComponent(current, workInProgress) {
  var Component = workInProgress.type;

  if (current !== null) {
    current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["PLACEMENT"];
  }

  var props = workInProgress.pendingProps;
  var context;

  if (!disableLegacyContext) {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
    context = getMaskedContext(workInProgress, unmaskedContext);
  } // prepareToReadContext(workInProgress);


  var value;
  _react_ReactCurrentOwner__WEBPACK_IMPORTED_MODULE_12__["default"].current = workInProgress;
  value = renderWithHooks(null, workInProgress, Component, props, context);
  workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_5__["PERFORMED_WORK"];

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value) === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
    workInProgress.tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["CLASS_COMPONENT"];
    resetHooks();
    var hasContext = false;

    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;
    var getDerivedStateFromProps = Component.getDerivedStateFromProps;

    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    }

    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props);
    return finishClassComponent(null, workInProgress, Component, true, false);
  } else {
    workInProgress.tag = _shared_workTags__WEBPACK_IMPORTED_MODULE_3__["FUNCTION_COMPONENT"];
    Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildren"])(null, workInProgress, value);
    return workInProgress.child;
  }
}

function updateHostRoot(current, workInProgress) {
  // todo
  // pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;
  var pendingProps = workInProgress.pendingProps;
  var memoizedState = workInProgress.memoizedState;
  var children = memoizedState !== null ? memoizedState.element : null;
  Object(_updateQueue__WEBPACK_IMPORTED_MODULE_10__["processUpdateQueue"])(workInProgress, updateQueue, pendingProps, null);
  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  Object(_reconciler__WEBPACK_IMPORTED_MODULE_9__["reconcileChildren"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

/***/ }),

/***/ "../remixjs/src/scheduler/updateQueue.js":
/*!***********************************************!*\
  !*** ../remixjs/src/scheduler/updateQueue.js ***!
  \***********************************************/
/*! exports provided: resetHasForceUpdateBeforeProcessing, checkHasForceUpdateAfterProcessing, createUpdate, processUpdateQueue, enqueueUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetHasForceUpdateBeforeProcessing", function() { return resetHasForceUpdateBeforeProcessing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkHasForceUpdateAfterProcessing", function() { return checkHasForceUpdateAfterProcessing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUpdate", function() { return createUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processUpdateQueue", function() { return processUpdateQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueUpdate", function() { return enqueueUpdate; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/updateTags */ "../remixjs/src/shared/updateTags.js");
/* harmony import */ var _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var hasForceUpdate = false;
function resetHasForceUpdateBeforeProcessing() {
  hasForceUpdate = false;
}
function checkHasForceUpdateAfterProcessing() {
  return hasForceUpdate;
} // 创建 update 

function createUpdate() {
  return {
    tag: _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE_STATE"],
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}
function processUpdateQueue(workInProgress, queue, props, instance) {
  hasForceUpdate = false; // 克隆新的 updateQueue

  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue); // 这里state 还是原本的 state

  var newBaseState = queue.baseState;
  var newFirstUpdate = null;
  var update = queue.firstUpdate;
  var resultState = newBaseState;

  while (update !== null) {
    resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
    var callback = update.callback;

    if (callback !== null) {
      workInProgress.effectTag |= _shared_effectTags__WEBPACK_IMPORTED_MODULE_2__["CALLBACK"]; // 暂时不知道update nextEffect 这个设置干嘛用

      update.nextEffect = null;

      if (queue.lastEffect === null) {
        // 没有 lastEffect 情况
        queue.firstEffect = queue.lastEffect = update;
      } else {
        queue.lastEffect.nextEffect = update;
        queue.lastEffect = update;
      }
    } // 处理下一个 update


    update = update.next;
  } // 处理完 updateQueue update 链表，设置l astUpdate 为 null


  queue.firstUpdate = null;
  queue.lastUpdate = null;
  queue.baseState = newBaseState; // 原本 state
  // 保存最近计算得出的 state

  workInProgress.memoizedState = resultState;
}
function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  var firstQueue;
  var secondQueue;

  if (alternate === null) {
    // 首次渲染情况，判断有没有updateQueue，没有则新建updateQueue。
    firstQueue = fiber.updateQueue;
    secondQueue = null;

    if (firstQueue === null) {
      fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
      firstQueue = fiber.updateQueue;
    }
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue; // commit work的时候 将fiber上的updateQueue置为null

    if (firstQueue === null) {
      if (secondQueue === null) {
        firstQueue = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        secondQueue = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
      } else {
        // 在什么情况下 q2 存在 q1不存在？ 当更新未被合并到current？
        firstQueue = fiber.updateQueue = cloneUpdateQueue(secondQueue);
      }
    } else {
      if (secondQueue === null) {
        secondQueue = alternate.updateQueue = cloneUpdateQueue(firstQueue);
      } else {// current，alternate 都存在 updateQueue
      }
    }
  } // 创建完更新队列之后 向队列中添加update


  if (secondQueue === null || firstQueue === secondQueue) {
    appendUpdateToQueue(firstQueue, update);
  } else {
    // 有两条更新队列，我们需要把更新添加到这两条上， 我们不希望将相同的更新被添加多次
    if (firstQueue.lastUpdate === null || secondQueue.lastUpdate === null) {
      appendUpdateToQueue(firstQueue, update);
      appendUpdateToQueue(secondQueue, update);
    } else {
      // 两个链表都不为空 因为结构的共享所以他们最后的更新时相同的 所以引用只需要改一次 在手动将另一条的lastUpdate设置为update
      appendUpdateToQueue(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}

function getStateFromUpdate(workInProgress, queue, update, prevState, // resultState
nextProps, // props
instance) {
  switch (update.tag) {
    case _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["REPLACE_STATE"]:
      {
        var payload = update.payload; // 处理 this.setState((state, props) => {}) 情况

        if (typeof payload === 'function') {
          return payload.call(instance, prevState, nextProps);
        } // REPLACE_STATE 直接返回


        return payload;
      }

    case _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["UPDATE_STATE"]:
      {
        var _payload = update.payload;
        var partialState; // 处理 this.setState((state, props) => {}) 情况

        if (typeof _payload === 'function') {
          partialState = _payload.call(instance, prevState, nextProps);
        } else {
          partialState = _payload;
        } // 没有任何更新


        if (partialState === null || partialState === undefined) {
          return prevState;
        } // 合并 state


        return _objectSpread({}, prevState, {}, partialState);
      }

    case _shared_updateTags__WEBPACK_IMPORTED_MODULE_1__["FORCE_UPDATE"]:
      {
        hasForceUpdate = true;
        return prevState;
      }
  }

  return prevState;
} // 创建updateQueue 单向链表


function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstEffect: null,
    lastEffect: null
  };
}

function appendUpdateToQueue(queue, update) {
  var lastUpdate = queue.lastUpdate; // 如果lastUpdate 不存在，那么说明还没有update对象
  // 反之在原有的最后的update对象设置next，并将lastUpdate更新

  if (lastUpdate === null) {
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

function cloneUpdateQueue(queue) {
  return {
    baseState: queue.baseState,
    firstUpdate: queue.firstUpdate,
    lastUpdate: queue.lastUpdate,
    firstEffect: null,
    lastEffect: null
  };
}

function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate; // 判断workInProgress updateQueue 是否是同一个updateQueue对象，是则克隆

  if (current !== null) {
    if (queue === current.updateQueue) {
      queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
    }
  }

  return queue;
}

/***/ }),

/***/ "../remixjs/src/shared/HTMLNodeType.js":
/*!*********************************************!*\
  !*** ../remixjs/src/shared/HTMLNodeType.js ***!
  \*********************************************/
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

/***/ "../remixjs/src/shared/effectTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/effectTags.js ***!
  \*******************************************/
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

/***/ "../remixjs/src/shared/elementTypes.js":
/*!*********************************************!*\
  !*** ../remixjs/src/shared/elementTypes.js ***!
  \*********************************************/
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

/***/ "../remixjs/src/shared/index.js":
/*!**************************************!*\
  !*** ../remixjs/src/shared/index.js ***!
  \**************************************/
/*! exports provided: CHILDREN, HTML, STYLE, STYLE_NAME_FLOAT, DANGEROUSLY_SET_INNER_HTML, INTERNAL_INSTANCE_KEY, INTERNAL_EVENT_HANDLERS_KEY, REACT_INTERNAL_FIBER, REACT_INTERNAL_INSTANCE, MERGED_CHILD_CONTEXT, MASKED_CHILD_CONTEXT, UNMASKED_CHILD_CONTEXT, EMPTY_OBJECT, EMPTY_ARRAY, EMPTY_CONTEXT, EMPTY_REFS, EXPIRE_TIME, UPDATE_FREQUENCY, noop, assign, keys, is, shouldSetTextContent, shallowEqual, resolveDefaultProps, extend, clone, flatten */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldSetTextContent", function() { return shouldSetTextContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDefaultProps", function() { return resolveDefaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "../remixjs/src/shared/is.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


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
function noop() {}
var assign = Object.assign;
var keys = Object.keys;
var is = Object.is;
function shouldSetTextContent(type, props) {
  // todo
  return Object(_is__WEBPACK_IMPORTED_MODULE_1__["isString"])(props.children) || false;
}
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

  var length = objectA.length;

  for (var i = 0; i < length; i++) {
    var key = keysA[i];

    if (!objectA.hasOwnProperty(key) || !is(objectA[key], objectB[key])) {
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

/***/ "../remixjs/src/shared/is.js":
/*!***********************************!*\
  !*** ../remixjs/src/shared/is.js ***!
  \***********************************/
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
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _workTags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workTags */ "../remixjs/src/shared/workTags.js");


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

/***/ "../remixjs/src/shared/renderTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/renderTags.js ***!
  \*******************************************/
/*! exports provided: ASYNC, SYNC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASYNC", function() { return ASYNC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC", function() { return SYNC; });
var ASYNC = 1,
    SYNC = 2;


/***/ }),

/***/ "../remixjs/src/shared/statusTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/statusTags.js ***!
  \*******************************************/
/*! exports provided: NO_WORK, WORKING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_WORK", function() { return NO_WORK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKING", function() { return WORKING; });
var NO_WORK = 1,
    WORKING = 2;


/***/ }),

/***/ "../remixjs/src/shared/updateTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/updateTags.js ***!
  \*******************************************/
/*! exports provided: UPDATE_STATE, REPLACE_STATE, FORCE_UPDATE, CAPTURE_UPDATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STATE", function() { return UPDATE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPLACE_STATE", function() { return REPLACE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORCE_UPDATE", function() { return FORCE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_UPDATE", function() { return CAPTURE_UPDATE; });
var UPDATE_STATE = 0;
var REPLACE_STATE = 1;
var FORCE_UPDATE = 2;
var CAPTURE_UPDATE = 4;

/***/ }),

/***/ "../remixjs/src/shared/workTags.js":
/*!*****************************************!*\
  !*** ../remixjs/src/shared/workTags.js ***!
  \*****************************************/
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

/***/ })

}]);