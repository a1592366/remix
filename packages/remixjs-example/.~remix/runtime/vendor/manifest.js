/*** MARK_1572465006146 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

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

/***/ "../remixjs-cli/node_modules/webpack/buildin/module.js":
/*!*************************************************************!*\
  !*** ../remixjs-cli/node_modules/webpack/buildin/module.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

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
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "../remixjs-message-protocol/dist/protocol.js":
/*!****************************************************!*\
  !*** ../remixjs-message-protocol/dist/protocol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _interopRequireDefault2 = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs-message-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault2(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs-message-protocol/node_modules/@babel/runtime/helpers/typeof.js"));

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : (0, _typeof2["default"])(exports)) === 'object' && ( false ? undefined : (0, _typeof2["default"])(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var i, a; }
})(void 0, function () {
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

        if (mode & 4 && (0, _typeof2["default"])(value) === 'object' && value && value.__esModule) return value;
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
          EVENT: 'event'
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../remixjs-cli/node_modules/webpack/buildin/module.js */ "../remixjs-cli/node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../remixjs-message-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!************************************************************************************************!*\
  !*** ../remixjs-message-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.inspectLogicUUID = exports.inspectTerminalUUID = exports.inspectTerminalTypes = exports.inspectMessageTypes = exports.internalUIURL = exports.inspectWSURL = exports.isInspectMode = void 0;
var isInspectMode = false;
exports.isInspectMode = isInspectMode;
var inspectWSURL = "ws://192.168.2.11:10002";
exports.inspectWSURL = inspectWSURL;
var internalUIURL = "http://192.168.2.11:10002";
exports.internalUIURL = internalUIURL;
var inspectMessageTypes = {"REGISTER":0,"MESSAGE":1,"CLOSE":2};
exports.inspectMessageTypes = inspectMessageTypes;
var inspectTerminalTypes = {"VIEW":1,"LOGIC":2,"SERVICES":3};
exports.inspectTerminalTypes = inspectTerminalTypes;
var inspectTerminalUUID = "2a43eafb-c5b8-4a2b-96ae-2d11730b0d8a";
exports.inspectTerminalUUID = inspectTerminalUUID;
var inspectLogicUUID = "8537adc4-5b43-4334-bc20-cfa232cfbeef";
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!*******************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!********************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \********************************************************************************/
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _project = __webpack_require__(/*! ./src/project */ "../remixjs/src/project/index.js");

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

/***/ "../remixjs/src/components/Application.js":
/*!************************************************!*\
  !*** ../remixjs/src/components/Application.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _cloneElement = _interopRequireDefault(__webpack_require__(/*! ../react/cloneElement */ "../remixjs/src/react/cloneElement.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _Children = __webpack_require__(/*! ../react/Children */ "../remixjs/src/react/Children.js");

var _router = __webpack_require__(/*! ../router */ "../remixjs/src/router/index.js");

var _TabBar = _interopRequireDefault(__webpack_require__(/*! ./TabBar */ "../remixjs/src/components/TabBar.js"));

// import { transports, APPLICATION } from '../project';
var Application =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Application, _Component);

  function Application() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Application);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Application)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMessage", function (type, argv) {
      switch (type) {
        case APPLICATION.LAUNCH:
          {
            var onLaunch = _this.props.onLaunch;
            onLaunch.apply((0, _assertThisInitialized2["default"])(_this), argv);
            break;
          }
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(Application, [{
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
      (0, _Children.forEach)(this.props.children, function (child) {
        if (!(0, _is.isNullOrUndefined)(child)) {
          var type = child.type;

          if (type === _router.Router || type === _TabBar["default"]) {
            children.push(child);
          }
        }
      });
      return children;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", null, this.cloneApplicationChildren());
    }
  }]);
  return Application;
}(_Component2["default"]);

exports["default"] = Application;
(0, _defineProperty2["default"])(Application, "propTypes", {
  onLaunch: _PropTypes["default"].func
});
(0, _defineProperty2["default"])(Application, "defaultProps", {
  onLaunch: _shared.noop
});

/***/ }),

/***/ "../remixjs/src/components/TabBar.js":
/*!*******************************************!*\
  !*** ../remixjs/src/components/TabBar.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _Component3 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var TabBarItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(TabBarItem, _Component);

  function TabBarItem() {
    (0, _classCallCheck2["default"])(this, TabBarItem);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TabBarItem).apply(this, arguments));
  }

  (0, _createClass2["default"])(TabBarItem, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", null, this.props.children);
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

var TabBar =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2["default"])(TabBar, _Component2);

  function TabBar() {
    (0, _classCallCheck2["default"])(this, TabBar);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TabBar).apply(this, arguments));
  }

  (0, _createClass2["default"])(TabBar, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", null, this.props.children);
    }
  }]);
  return TabBar;
}(_Component3["default"]);

exports["default"] = TabBar;
(0, _defineProperty2["default"])(TabBar, "TabBarItem", TabBarItem);
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

/***/ }),

/***/ "../remixjs/src/components/ViewController.js":
/*!***************************************************!*\
  !*** ../remixjs/src/components/ViewController.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _cloneElement = _interopRequireDefault(__webpack_require__(/*! ../react/cloneElement */ "../remixjs/src/react/cloneElement.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _notification = _interopRequireWildcard(__webpack_require__(/*! ../project/notification */ "../remixjs/src/project/notification/index.js"));

var defineProperty = Object.defineProperty;

var ViewController =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ViewController, _Component);

  function ViewController(props, context) {
    (0, _classCallCheck2["default"])(this, ViewController);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ViewController).call(this, props, context));
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

/***/ }),

/***/ "../remixjs/src/components/index.js":
/*!******************************************!*\
  !*** ../remixjs/src/components/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
Object.defineProperty(exports, "Root", {
  enumerable: true,
  get: function get() {
    return _remixRoot["default"];
  }
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
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _remixImage["default"];
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _remixInput["default"];
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _remixMap["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _remixButton["default"];
  }
});
Object.defineProperty(exports, "Picker", {
  enumerable: true,
  get: function get() {
    return _remixPicker["default"];
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
Object.defineProperty(exports, "Video", {
  enumerable: true,
  get: function get() {
    return _remixVideo["default"];
  }
});

var _Application = _interopRequireDefault(__webpack_require__(/*! ./Application */ "../remixjs/src/components/Application.js"));

var _ViewController = _interopRequireDefault(__webpack_require__(/*! ./ViewController */ "../remixjs/src/components/ViewController.js"));

var _TabBar = _interopRequireDefault(__webpack_require__(/*! ./TabBar */ "../remixjs/src/components/TabBar.js"));

var _remixRoot = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-root */ "../remixjs/src/components/remix-element/remix-root/index.js"));

var _remixView = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-view */ "../remixjs/src/components/remix-element/remix-view/index.js"));

var _remixText = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-text */ "../remixjs/src/components/remix-element/remix-text/index.js"));

var _remixImage = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-image */ "../remixjs/src/components/remix-element/remix-image/index.js"));

var _remixInput = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-input */ "../remixjs/src/components/remix-element/remix-input/index.js"));

var _remixMap = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-map */ "../remixjs/src/components/remix-element/remix-map/index.js"));

var _remixButton = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-button */ "../remixjs/src/components/remix-element/remix-button/index.js"));

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-picker */ "../remixjs/src/components/remix-element/remix-picker/index.js"));

var _remixScrollView = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-scroll-view */ "../remixjs/src/components/remix-element/remix-scroll-view/index.js"));

var _remixSwiper = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-swiper */ "../remixjs/src/components/remix-element/remix-swiper/index.js"));

var _remixSwiperItem = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-swiper-item */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js"));

var _remixVideo = _interopRequireDefault(__webpack_require__(/*! ./remix-element/remix-video */ "../remixjs/src/components/remix-element/remix-video/index.js"));

/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-button/index.js":
/*!*********************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-button/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixButton, _React$Component);

  function RemixButton() {
    (0, _classCallCheck2["default"])(this, RemixButton);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixButton).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixButton, [{
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
      return _react["default"].createElement("button", {
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
}(_react["default"].Component);

exports["default"] = RemixButton;
(0, _defineProperty2["default"])(RemixButton, "propTypes", {
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
  onError: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  size: _PropTypes["default"].string,
  type: _PropTypes["default"].string,
  plain: _PropTypes["default"].bool,
  disabled: _PropTypes["default"].bool,
  loading: _PropTypes["default"].bool,
  formType: _PropTypes["default"].string,
  openType: _PropTypes["default"].string,
  hoverClass: _PropTypes["default"].string,
  hoverStopPropagation: _PropTypes["default"].bool,
  hoverStartTime: _PropTypes["default"].number,
  hoverStayTime: _PropTypes["default"].number,
  lang: _PropTypes["default"].string,
  sessionFrom: _PropTypes["default"].string,
  sendMessageTitle: _PropTypes["default"].string,
  sendMessagePath: _PropTypes["default"].string,
  sendMessageImg: _PropTypes["default"].string,
  appParameter: _PropTypes["default"].string,
  showMessageCard: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixButton, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixImage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixImage, _React$Component);

  function RemixImage() {
    (0, _classCallCheck2["default"])(this, RemixImage);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixImage).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixImage, [{
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
      return _react["default"].createElement("image", {
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
}(_react["default"].Component);

exports["default"] = RemixImage;
(0, _defineProperty2["default"])(RemixImage, "propTypes", {
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
  onError: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  src: _PropTypes["default"].string,
  mode: _PropTypes["default"].string,
  webp: _PropTypes["default"].bool,
  lazyLoad: _PropTypes["default"].bool,
  showMenuByLongpress: _PropTypes["default"].bool
});
(0, _defineProperty2["default"])(RemixImage, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixInput =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixInput, _React$Component);

  function RemixInput() {
    (0, _classCallCheck2["default"])(this, RemixInput);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixInput).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixInput, [{
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
      return _react["default"].createElement("input", {
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
}(_react["default"].Component);

exports["default"] = RemixInput;
(0, _defineProperty2["default"])(RemixInput, "propTypes", {
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
  onKeyboardHeightChange: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  value: _PropTypes["default"].string,
  type: _PropTypes["default"].string,
  password: _PropTypes["default"].bool,
  placeholder: _PropTypes["default"].string,
  placeholderStyle: _PropTypes["default"].string,
  placeholderClass: _PropTypes["default"].string,
  disabled: _PropTypes["default"].bool,
  maxlength: _PropTypes["default"].number,
  cursorSpacing: _PropTypes["default"].number,
  autoFocus: _PropTypes["default"].bool,
  focus: _PropTypes["default"].bool,
  confirmType: _PropTypes["default"].string,
  confirmHold: _PropTypes["default"].bool,
  cursor: _PropTypes["default"].number,
  selectionStart: _PropTypes["default"].number,
  selectionEnd: _PropTypes["default"].number,
  adjustPosition: _PropTypes["default"].bool,
  holdKeyboard: _PropTypes["default"].bool
});
(0, _defineProperty2["default"])(RemixInput, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixMap =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixMap, _React$Component);

  function RemixMap() {
    (0, _classCallCheck2["default"])(this, RemixMap);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixMap).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixMap, [{
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
      return _react["default"].createElement("map", {
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
}(_react["default"].Component);

exports["default"] = RemixMap;
(0, _defineProperty2["default"])(RemixMap, "propTypes", {
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
  onPoiTap: _PropTypes["default"].string,
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
  showLocation: _PropTypes["default"].bool,
  polygons: _PropTypes["default"].array,
  subkey: _PropTypes["default"].string,
  layerStyle: _PropTypes["default"].number,
  rotate: _PropTypes["default"].number,
  skew: _PropTypes["default"].number,
  enable3D: _PropTypes["default"].bool,
  showCompass: _PropTypes["default"].bool,
  showScale: _PropTypes["default"].bool,
  enableOverlooking: _PropTypes["default"].bool,
  enableZoom: _PropTypes["default"].bool,
  enableScroll: _PropTypes["default"].bool,
  enableRotate: _PropTypes["default"].bool,
  enableSatellite: _PropTypes["default"].bool,
  enableTraffic: _PropTypes["default"].bool,
  setting: _PropTypes["default"].object
});
(0, _defineProperty2["default"])(RemixMap, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixPicker, _React$Component);

  function RemixPicker() {
    (0, _classCallCheck2["default"])(this, RemixPicker);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixPicker).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixPicker, [{
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
      return _react["default"].createElement("picker", {
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
}(_react["default"].Component);

exports["default"] = RemixPicker;
(0, _defineProperty2["default"])(RemixPicker, "propTypes", {
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
  onColumnChange: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  mode: _PropTypes["default"].string,
  disabled: _PropTypes["default"].bool,
  range: _PropTypes["default"].object,
  rangeKey: _PropTypes["default"].string,
  value: _PropTypes["default"].number,
  start: _PropTypes["default"].string,
  end: _PropTypes["default"].string,
  fields: _PropTypes["default"].string,
  customItem: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixPicker, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixRoot =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixRoot, _React$Component);

  function RemixRoot() {
    (0, _classCallCheck2["default"])(this, RemixRoot);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixRoot).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixRoot, [{
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
      return _react["default"].createElement("root", {
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
}(_react["default"].Component);

exports["default"] = RemixRoot;
(0, _defineProperty2["default"])(RemixRoot, "propTypes", {
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
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixRoot, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixScrollView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixScrollView, _React$Component);

  function RemixScrollView() {
    (0, _classCallCheck2["default"])(this, RemixScrollView);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixScrollView).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixScrollView, [{
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
      return _react["default"].createElement("scroll-view", {
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
}(_react["default"].Component);

exports["default"] = RemixScrollView;
(0, _defineProperty2["default"])(RemixScrollView, "propTypes", {
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
  onScroll: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  scrollX: _PropTypes["default"].bool,
  scrollY: _PropTypes["default"].bool,
  upperThreshold: _PropTypes["default"].number,
  lowerThreshold: _PropTypes["default"].number,
  scrollTop: _PropTypes["default"].number,
  scrollLeft: _PropTypes["default"].number,
  scrollIntoView: _PropTypes["default"].string,
  scrollWithAnimation: _PropTypes["default"].bool,
  enableBackToTop: _PropTypes["default"].bool,
  enableFlex: _PropTypes["default"].bool,
  scrollAnchoring: _PropTypes["default"].bool
});
(0, _defineProperty2["default"])(RemixScrollView, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixSwiperItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixSwiperItem, _React$Component);

  function RemixSwiperItem() {
    (0, _classCallCheck2["default"])(this, RemixSwiperItem);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixSwiperItem).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixSwiperItem, [{
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
      return _react["default"].createElement("swiper-item", {
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
}(_react["default"].Component);

exports["default"] = RemixSwiperItem;
(0, _defineProperty2["default"])(RemixSwiperItem, "propTypes", {
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
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  itemId: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixSwiperItem, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../remix-swiper-item/index */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js"));

var RemixSwiper =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixSwiper, _React$Component);

  function RemixSwiper() {
    (0, _classCallCheck2["default"])(this, RemixSwiper);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixSwiper).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixSwiper, [{
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
      return _react["default"].createElement("swiper", {
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
}(_react["default"].Component);

exports["default"] = RemixSwiper;
(0, _defineProperty2["default"])(RemixSwiper, "SwiperItem", _index["default"]);
(0, _defineProperty2["default"])(RemixSwiper, "propTypes", {
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
  onAnimationFinish: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  indicatorDots: _PropTypes["default"].bool,
  indicatorColor: _PropTypes["default"].string,
  indicatorActiveColor: _PropTypes["default"].string,
  autoplay: _PropTypes["default"].bool,
  current: _PropTypes["default"].number,
  interval: _PropTypes["default"].number,
  duration: _PropTypes["default"].number,
  circular: _PropTypes["default"].bool,
  vertical: _PropTypes["default"].bool,
  previousMargin: _PropTypes["default"].string,
  nextMargin: _PropTypes["default"].string,
  displayMultipleItems: _PropTypes["default"].number,
  skipHiddenItemLayou: _PropTypes["default"].bool,
  easingFunction: _PropTypes["default"].string
});
(0, _defineProperty2["default"])(RemixSwiper, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixText =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixText, _React$Component);

  function RemixText() {
    (0, _classCallCheck2["default"])(this, RemixText);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixText).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          selectable = _this$props.selectable,
          space = _this$props.space,
          decode = _this$props.decode;
      return _react["default"].createElement("text", {
        style: style,
        className: className,
        selectable: selectable,
        space: space,
        decode: decode
      }, this.props.children);
    }
  }]);
  return RemixText;
}(_react["default"].Component);

exports["default"] = RemixText;
(0, _defineProperty2["default"])(RemixText, "propTypes", {
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  selectable: _PropTypes["default"].bool,
  space: _PropTypes["default"].bool,
  decode: _PropTypes["default"].bool
});
(0, _defineProperty2["default"])(RemixText, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty4 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _defineProperty2, _defineProperty3;

var RemixVideo =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixVideo, _React$Component);

  function RemixVideo() {
    (0, _classCallCheck2["default"])(this, RemixVideo);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixVideo).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixVideo, [{
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
      return _react["default"].createElement("video", (_React$createElement = {
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
      }, (0, _defineProperty4["default"])(_React$createElement, "showPlayButton", showPlayButton), (0, _defineProperty4["default"])(_React$createElement, "showCenterPlayButton", showCenterPlayButton), (0, _defineProperty4["default"])(_React$createElement, "enableProgressGesture", enableProgressGesture), (0, _defineProperty4["default"])(_React$createElement, "objectFit", objectFit), (0, _defineProperty4["default"])(_React$createElement, "poster", poster), (0, _defineProperty4["default"])(_React$createElement, "showMuteButton", showMuteButton), (0, _defineProperty4["default"])(_React$createElement, "title", title), (0, _defineProperty4["default"])(_React$createElement, "playButtonPosition", playButtonPosition), (0, _defineProperty4["default"])(_React$createElement, "enablePlayGesture", enablePlayGesture), (0, _defineProperty4["default"])(_React$createElement, "autoPauseIfNavigate", autoPauseIfNavigate), (0, _defineProperty4["default"])(_React$createElement, "autoPauseIfOpenNative", autoPauseIfOpenNative), (0, _defineProperty4["default"])(_React$createElement, "vslideGesture", vslideGesture), (0, _defineProperty4["default"])(_React$createElement, "vslideGestureInFullscreen", vslideGestureInFullscreen), (0, _defineProperty4["default"])(_React$createElement, "adUnitId", adUnitId), _React$createElement));
    }
  }]);
  return RemixVideo;
}(_react["default"].Component);

exports["default"] = RemixVideo;
(0, _defineProperty4["default"])(RemixVideo, "propTypes", (_defineProperty2 = {
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
  onLoadedMetaData: _PropTypes["default"].string,
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  src: _PropTypes["default"].string,
  duration: _PropTypes["default"].number,
  controls: _PropTypes["default"].bool,
  danmuList: _PropTypes["default"].array,
  showPlayButton: _PropTypes["default"].bool,
  enableDanmu: _PropTypes["default"].bool,
  autoplay: _PropTypes["default"].bool,
  loop: _PropTypes["default"].bool,
  muted: _PropTypes["default"].bool,
  initialTime: _PropTypes["default"].number,
  pageGesture: _PropTypes["default"].bool,
  direction: _PropTypes["default"].number,
  showProgress: _PropTypes["default"].bool,
  showFullscreenButton: _PropTypes["default"].bool
}, (0, _defineProperty4["default"])(_defineProperty2, "showPlayButton", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "showCenterPlayButton", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "enableProgressGesture", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "objectFit", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "poster", _PropTypes["default"].string), (0, _defineProperty4["default"])(_defineProperty2, "showMuteButton", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "title", _PropTypes["default"].string), (0, _defineProperty4["default"])(_defineProperty2, "playButtonPosition", _PropTypes["default"].string), (0, _defineProperty4["default"])(_defineProperty2, "enablePlayGesture", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "autoPauseIfNavigate", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "autoPauseIfOpenNative", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "vslideGesture", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "vslideGestureInFullscreen", _PropTypes["default"].bool), (0, _defineProperty4["default"])(_defineProperty2, "adUnitId", _PropTypes["default"].string), _defineProperty2));
(0, _defineProperty4["default"])(RemixVideo, "defaultProps", (_defineProperty3 = {
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
}, (0, _defineProperty4["default"])(_defineProperty3, "showPlayButton", true), (0, _defineProperty4["default"])(_defineProperty3, "showCenterPlayButton", true), (0, _defineProperty4["default"])(_defineProperty3, "enableProgressGesture", true), (0, _defineProperty4["default"])(_defineProperty3, "objectFit", 0), (0, _defineProperty4["default"])(_defineProperty3, "poster", null), (0, _defineProperty4["default"])(_defineProperty3, "showMuteButton", false), (0, _defineProperty4["default"])(_defineProperty3, "title", null), (0, _defineProperty4["default"])(_defineProperty3, "playButtonPosition", 'bottom'), (0, _defineProperty4["default"])(_defineProperty3, "enablePlayGesture", false), (0, _defineProperty4["default"])(_defineProperty3, "autoPauseIfNavigate", true), (0, _defineProperty4["default"])(_defineProperty3, "autoPauseIfOpenNative", true), (0, _defineProperty4["default"])(_defineProperty3, "vslideGesture", true), (0, _defineProperty4["default"])(_defineProperty3, "vslideGestureInFullscreen", true), (0, _defineProperty4["default"])(_defineProperty3, "adUnitId", null), _defineProperty3));

/***/ }),

/***/ "../remixjs/src/components/remix-element/remix-view/index.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/components/remix-element/remix-view/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../../../react */ "../remixjs/src/react/index.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../../../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var RemixView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(RemixView, _React$Component);

  function RemixView() {
    (0, _classCallCheck2["default"])(this, RemixView);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixView).apply(this, arguments));
  }

  (0, _createClass2["default"])(RemixView, [{
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
      return _react["default"].createElement("view", {
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
}(_react["default"].Component);

exports["default"] = RemixView;
(0, _defineProperty2["default"])(RemixView, "propTypes", {
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
  style: _PropTypes["default"].string,
  className: _PropTypes["default"].string,
  hoverClass: _PropTypes["default"].string,
  hoverStopPropagation: _PropTypes["default"].bool,
  hoverStartTime: _PropTypes["default"].number,
  hoverStayTime: _PropTypes["default"].number
});
(0, _defineProperty2["default"])(RemixView, "defaultProps", {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _v = _interopRequireDefault(__webpack_require__(/*! uuid/v4 */ "../remixjs/node_modules/uuid/v4.js"));

var _globalElements = _interopRequireDefault(__webpack_require__(/*! ./globalElements */ "../remixjs/src/document/globalElements.js"));

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remixjs/src/document/document.js"));

var Element =
/*#__PURE__*/
function () {
  function Element() {
    (0, _classCallCheck2["default"])(this, Element);
    this.uuid = (0, _v["default"])();
    this.tagName = null;
    this.nodeType = null;
    this.child = null;
    this["return"] = null;
    this.lastChild = null;
    _globalElements["default"][this.uuid] = this;
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

/***/ }),

/***/ "../remixjs/src/document/HTMLBodyElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLBodyElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remixjs/src/document/document.js"));

var HTMLBodyElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLBodyElement, _HTMLElement);

  function HTMLBodyElement() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, HTMLBodyElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(HTMLBodyElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
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

/***/ }),

/***/ "../remixjs/src/document/HTMLButtonElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLButtonElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _remixButton = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-button */ "../remixjs/src/components/remix-element/remix-button/index.js"));

var HTMLButtonElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLButtonElement, _HTMLElement);

  function HTMLButtonElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLButtonElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLButtonElement).call(this));
    _this.tagName = _HTMLTypes.BUTTON;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLButtonElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLButtonElement;
(0, _defineProperty2["default"])(HTMLButtonElement, "defaultProps", _remixButton["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLElement.js":
/*!**********************************************!*\
  !*** ../remixjs/src/document/HTMLElement.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "../remixjs/src/document/Element.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

function resolveDefaultProps(defaultProps, unresolvedProps) {
  if (defaultProps) {
    var props = {};

    for (var propName in defaultProps) {
      if ((0, _is.isUndefined)(unresolvedProps[propName])) {
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
  (0, _inherits2["default"])(HTMLElement, _Element);

  function HTMLElement(tagName) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLElement).call(this));
    _this.tagName = tagName;
    _this.style = new _StyleSheet["default"]();
    return _this;
  }

  (0, _createClass2["default"])(HTMLElement, [{
    key: "appendChild",
    value: function appendChild(child) {
      if ((0, _is.isNullOrUndefined)(this.child)) {
        this.child = this.lastChild = child;
      } else {
        this.lastChild.slibing = child;
        this.lastChild = child;
      }

      child["return"] = this;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {}
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

      if (!(0, _is.isNullOrUndefined)(this.child)) {
        element.child = this.child.serialize();
      }

      if (!(0, _is.isNullOrUndefined)(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      if (!(0, _is.isNullOrUndefined)(this.innerText)) {
        element.innerText = this.innerText;
      }

      element.tagName = this.tagName;
      element.uuid = this.uuid;
      element.nodeType = this.nodeType;
      return element;
    }
  }, {
    key: "innerHTML",
    set: function set(innerHTML) {
      throw new Error('Sorry, innerHTML is not be supportted');
    }
  }]);
  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;

/***/ }),

/***/ "../remixjs/src/document/HTMLImageElement.js":
/*!***************************************************!*\
  !*** ../remixjs/src/document/HTMLImageElement.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _remixImage = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-image */ "../remixjs/src/components/remix-element/remix-image/index.js"));

var HTMLImageElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLImageElement, _HTMLElement);

  function HTMLImageElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLImageElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLImageElement).call(this));
    _this.tagName = _HTMLTypes.IMAGE;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.style = new _StyleSheet["default"]();
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

/***/ }),

/***/ "../remixjs/src/document/HTMLPickerElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLPickerElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _remixPicker = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-picker */ "../remixjs/src/components/remix-element/remix-picker/index.js"));

var HTMLPickerElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLPickerElement, _HTMLElement);

  function HTMLPickerElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLPickerElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLPickerElement).call(this));
    _this.tagName = _HTMLTypes.PICKER;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLPickerElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLPickerElement;
(0, _defineProperty2["default"])(HTMLPickerElement, "defaultProps", _remixPicker["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLRootElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLRootElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _remixRoot = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-root */ "../remixjs/src/components/remix-element/remix-root/index.js"));

var HTMLViewElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLViewElement, _HTMLElement);

  function HTMLViewElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLViewElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLViewElement).call(this));
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.tagName = _HTMLTypes.ROOT;
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLViewElement;
(0, _defineProperty2["default"])(HTMLViewElement, "defaultProps", _remixRoot["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLSwiperElement.js":
/*!****************************************************!*\
  !*** ../remixjs/src/document/HTMLSwiperElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _remixSwiper = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-swiper */ "../remixjs/src/components/remix-element/remix-swiper/index.js"));

var HTMLSwiperElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLSwiperElement, _HTMLElement);

  function HTMLSwiperElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLSwiperElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLSwiperElement).call(this));
    _this.tagName = _HTMLTypes.SWIPER;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLSwiperElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLSwiperElement;
(0, _defineProperty2["default"])(HTMLSwiperElement, "defaultProps", _remixSwiper["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLSwiperItemElement.js":
/*!********************************************************!*\
  !*** ../remixjs/src/document/HTMLSwiperItemElement.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _remixSwiperItem = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-swiper-item */ "../remixjs/src/components/remix-element/remix-swiper-item/index.js"));

var HTMLSwiperItemElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLSwiperItemElement, _HTMLElement);

  function HTMLSwiperItemElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLSwiperItemElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLSwiperItemElement).call(this));
    _this.tagName = _HTMLTypes.SWIPER_ITEM;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    return _this;
  }

  return HTMLSwiperItemElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLSwiperItemElement;
(0, _defineProperty2["default"])(HTMLSwiperItemElement, "defaultProps", _remixSwiperItem["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLTextElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLTextElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _remixText = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-text */ "../remixjs/src/components/remix-element/remix-text/index.js"));

var HTMLTextElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLTextElement, _HTMLElement);

  function HTMLTextElement(textContent) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLTextElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLTextElement).call(this));
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.tagName = _HTMLTypes.TEXT;
    return _this;
  }

  return HTMLTextElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLTextElement;
(0, _defineProperty2["default"])(HTMLTextElement, "defaultProps", _remixText["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/HTMLTypes.js":
/*!********************************************!*\
  !*** ../remixjs/src/document/HTMLTypes.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO = exports.SWIPER = exports.SWIPER_ITEM = exports.PICKER = exports.PLAIN_TEXT = exports.TEXT = exports.BODY = exports.ROOT = exports.VIEW = exports.INPUT = exports.MAP = exports.BUTTON = exports.IMAGE = void 0;
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

/***/ }),

/***/ "../remixjs/src/document/HTMLVideoElement.js":
/*!***************************************************!*\
  !*** ../remixjs/src/document/HTMLVideoElement.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _StyleSheet = _interopRequireDefault(__webpack_require__(/*! ./StyleSheet */ "../remixjs/src/document/StyleSheet.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _remixVideo = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-video */ "../remixjs/src/components/remix-element/remix-video/index.js"));

var RemixVideoElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(RemixVideoElement, _HTMLElement);

  function RemixVideoElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, RemixVideoElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RemixVideoElement).call(this));
    _this.tagName = _HTMLTypes.VIDEO;
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.style = new _StyleSheet["default"]();
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

/***/ }),

/***/ "../remixjs/src/document/HTMLViewElement.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/HTMLViewElement.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLElement2 = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _remixView = _interopRequireDefault(__webpack_require__(/*! ../components/remix-element/remix-view */ "../remixjs/src/components/remix-element/remix-view/index.js"));

var HTMLViewElement =
/*#__PURE__*/
function (_HTMLElement) {
  (0, _inherits2["default"])(HTMLViewElement, _HTMLElement);

  function HTMLViewElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLViewElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLViewElement).call(this));
    _this.nodeType = _HTMLNodeType.ELEMENT_NODE;
    _this.tagName = _HTMLTypes.VIEW;
    return _this;
  }

  return HTMLViewElement;
}(_HTMLElement2["default"]);

exports["default"] = HTMLViewElement;
(0, _defineProperty2["default"])(HTMLViewElement, "defaultProps", _remixView["default"].defaultProps);

/***/ }),

/***/ "../remixjs/src/document/StyleSheet.js":
/*!*********************************************!*\
  !*** ../remixjs/src/document/StyleSheet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

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
  function StyleSheet() {
    (0, _classCallCheck2["default"])(this, StyleSheet);
    this.string = '';
    this.sheet = {};
    this.isChanged = false;
  }

  (0, _createClass2["default"])(StyleSheet, [{
    key: "toString",
    value: function toString() {
      var _this = this;

      if (this.isChanged) {
        var names = getOwnPropertyNames(this.sheet);
        this.string = names.map(function (name) {
          var value = _this.sheet[name];
          return value.join(':');
        }).join(';');
        this.isChanged = false;
      }

      return this.string;
    }
  }]);
  return StyleSheet;
}();

function _default() {
  var style = new StyleSheet();
  return new Proxy(style, {
    get: function get(target, key) {
      return target[key];
    },
    set: function set(target, key, value) {
      if (properties[key]) {
        var data = style.sheet[key];

        if (data) {
          if (data[1] !== value) {
            data[1] = value;
          }

          style.isChanged = true;
        } else {
          style.sheet[key] = [properties[key], value];
          style.isChanged = true;
        }
      } else {
        style[key] = value;
      }

      return true;
    }
  });
}

/***/ }),

/***/ "../remixjs/src/document/createContainer.js":
/*!**************************************************!*\
  !*** ../remixjs/src/document/createContainer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createContainer;

function createContainer() {}

/***/ }),

/***/ "../remixjs/src/document/createElement.js":
/*!************************************************!*\
  !*** ../remixjs/src/document/createElement.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLImageElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLImageElement */ "../remixjs/src/document/HTMLImageElement.js"));

var _HTMLButtonElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLButtonElement */ "../remixjs/src/document/HTMLButtonElement.js"));

var _HTMLViewElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLViewElement */ "../remixjs/src/document/HTMLViewElement.js"));

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

var _HTMLPickerElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLPickerElement */ "../remixjs/src/document/HTMLPickerElement.js"));

var _HTMLSwiperItemElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLSwiperItemElement */ "../remixjs/src/document/HTMLSwiperItemElement.js"));

var _HTMLSwiperElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLSwiperElement */ "../remixjs/src/document/HTMLSwiperElement.js"));

var _HTMLRootElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLRootElement */ "../remixjs/src/document/HTMLRootElement.js"));

var _HTMLVideoElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLVideoElement */ "../remixjs/src/document/HTMLVideoElement.js"));

function createElement(tagName) {
  var element;

  switch (tagName) {
    case _HTMLTypes.ROOT:
      {
        return new _HTMLRootElement["default"]();
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

/***/ }),

/***/ "../remixjs/src/document/createTextNode.js":
/*!*************************************************!*\
  !*** ../remixjs/src/document/createTextNode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTextNode;

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _HTMLTypes = __webpack_require__(/*! ./HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

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

/***/ }),

/***/ "../remixjs/src/document/document.js":
/*!*******************************************!*\
  !*** ../remixjs/src/document/document.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HTMLBodyElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLBodyElement */ "../remixjs/src/document/HTMLBodyElement.js"));

var _createElement = _interopRequireDefault(__webpack_require__(/*! ./createElement */ "../remixjs/src/document/createElement.js"));

var _createTextNode = _interopRequireDefault(__webpack_require__(/*! ./createTextNode */ "../remixjs/src/document/createTextNode.js"));

var _createContainer = _interopRequireDefault(__webpack_require__(/*! ./createContainer */ "../remixjs/src/document/createContainer.js"));

var _globalElements = _interopRequireDefault(__webpack_require__(/*! ./globalElements */ "../remixjs/src/document/globalElements.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../env */ "../remixjs/env.js"));

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
  addEventListener: function addEventListener(type, callback, capture) {
    debugger;
  },
  removeEventListener: function removeEventListener() {
    debugger;
  },
  dispatchEvent: function dispatchEvent() {},
  createElement: _createElement["default"],
  createTextNode: _createTextNode["default"]
};
var _default = fakeDocument; // export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;

exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/document/globalElements.js":
/*!*************************************************!*\
  !*** ../remixjs/src/document/globalElements.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/document/index.js":
/*!****************************************!*\
  !*** ../remixjs/src/document/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "document", {
  enumerable: true,
  get: function get() {
    return _document["default"];
  }
});

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remixjs/src/document/document.js"));

/***/ }),

/***/ "../remixjs/src/project/Program.js":
/*!*****************************************!*\
  !*** ../remixjs/src/project/Program.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getApplication = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _react = __webpack_require__(/*! ../react */ "../remixjs/src/react/index.js");

var _renderer = __webpack_require__(/*! ../renderer */ "../remixjs/src/renderer/index.js");

var _components = __webpack_require__(/*! ../components */ "../remixjs/src/components/index.js");

var _router = __webpack_require__(/*! ../router */ "../remixjs/src/router/index.js");

var _terminal = _interopRequireDefault(__webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal/index.js"));

var _logic = _interopRequireDefault(__webpack_require__(/*! ./runtime/logic */ "../remixjs/src/project/runtime/logic/index.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../env */ "../remixjs/env.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TabBarItem = _components.TabBar.TabBarItem;

var getApplication = function getApplication() {
  return Program.context;
};

exports.getApplication = getApplication;

var Program =
/*#__PURE__*/
function () {
  function Program(App, container) {
    (0, _classCallCheck2["default"])(this, Program);
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
        (0, _renderer.render)((0, _react.createElement)(App), container);
        var rootContainer = container._reactRootContainer;
        var currentFiber = rootContainer._internalRoot.current;
        var node = currentFiber;

        while (true) {
          switch (node.elementType) {
            case _components.Application:
              {
                context.config = node.memoizedProps.config;
                this.instance = node.stateNode;
                break;
              }

            case _router.Route:
              {
                context.router.routes.push({
                  path: node.memoizedProps.path,
                  component: node.memoizedProps.component
                });
                break;
              }

            case _components.TabBar:
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

          if (!(0, _is.isNullOrUndefined)(node.child)) {
            node = node.child;
            continue;
          }

          while ((0, _is.isNullOrUndefined)(node.sibling)) {
            if ((0, _is.isNullOrUndefined)(node["return"])) {
              return context;
            }

            node = node["return"];
          }

          node = node.sibling;
        }
      }
    });
  }

  (0, _createClass2["default"])(Program, [{
    key: "start",
    value: function start() {
      if (_env["default"].isDevToolRuntime) {
        (0, _logic["default"])(this.context, this.instance);
      } else {
        (0, _terminal["default"])(this.context, this.instance);
      }
    }
  }]);
  return Program;
}();

exports["default"] = Program;

/***/ }),

/***/ "../remixjs/src/project/View.js":
/*!**************************************!*\
  !*** ../remixjs/src/project/View.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _transports = _interopRequireDefault(__webpack_require__(/*! ./runtime/transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../env */ "../remixjs/env.js"));

var ViewController =
/*#__PURE__*/
function () {
  function ViewController(route) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ViewController);
    (0, _defineProperty2["default"])(this, "onLoad", function (instance, query) {
      _this.instance = instance;
      _this.query = query;
      console.log("[View] onLoad(".concat(_this.route, ")"));

      if (_env["default"].isApplicationLaunched) {
        _this.onLaunch(_env["default"].applicationLaunchedOptions);
      } else {
        _transports["default"].app.on('launch', _this.onLaunch);
      }
    });
    (0, _defineProperty2["default"])(this, "onLaunch", function (_ref) {
      var path = _ref.path;

      _transports["default"].view.load({
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
    this.id = _uuid["default"].v4();
    this.init();
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "init",
    value: function init() {
      var ctrl = this;

      if ((0, _is.isFunction)(Page)) {
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
            return _transports["default"].view.shareMessage(options);
          }
        });
      }
    }
  }]);
  return ViewController;
}();

exports["default"] = ViewController;

/***/ }),

/***/ "../remixjs/src/project/index.js":
/*!***************************************!*\
  !*** ../remixjs/src/project/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Program: true,
  View: true
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

var _Program = _interopRequireWildcard(__webpack_require__(/*! ./Program */ "../remixjs/src/project/Program.js"));

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

var _View = _interopRequireDefault(__webpack_require__(/*! ./View */ "../remixjs/src/project/View.js"));

var _terminal = __webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal/index.js");

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

/***/ "../remixjs/src/project/notification/index.js":
/*!****************************************************!*\
  !*** ../remixjs/src/project/notification/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/notification/types.js");

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

var Transport =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(Transport, _EventEmitter);

  function Transport() {
    (0, _classCallCheck2["default"])(this, Transport);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Transport).apply(this, arguments));
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

/***/ "../remixjs/src/project/notification/types.js":
/*!****************************************************!*\
  !*** ../remixjs/src/project/notification/types.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW = exports.APPLICATION = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var Type =
/*#__PURE__*/
function () {
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

/***/ "../remixjs/src/project/runtime/ViewController.js":
/*!********************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewController.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _renderer = _interopRequireDefault(__webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js"));

var _document = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");

var _react = __webpack_require__(/*! ../../react */ "../remixjs/src/react/index.js");

var ViewController =
/*#__PURE__*/
function () {
  function ViewController(id, route) {
    (0, _classCallCheck2["default"])(this, ViewController);
    this.id = id;
    this.route = route;
    this.container = _document.document.createElement('root');

    _document.document.body.appendChild(this.container);
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "onLoad",
    value: function onLoad(query, callback) {
      var _this$route = this.route,
          component = _this$route.component,
          r = _this$route.render;
      var rendered = (0, _renderer["default"])((0, _react.createElement)(component || r), this.container);

      var elements = _document.document.getContainerElements(this.container);

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

exports["default"] = ViewController;

/***/ }),

/***/ "../remixjs/src/project/runtime/ViewEventManger.js":
/*!*********************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewEventManger.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _ViewController = _interopRequireDefault(__webpack_require__(/*! ./ViewController */ "../remixjs/src/project/runtime/ViewController.js"));

var _renderer = __webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js");

var _document = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");

var _createElement = _interopRequireDefault(__webpack_require__(/*! ../../react/createElement */ "../remixjs/src/react/createElement.js"));

var _HTMLTypes = __webpack_require__(/*! ../../document/HTMLTypes */ "../remixjs/src/document/HTMLTypes.js");

var _transports = _interopRequireWildcard(__webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var bubbleEvent = ['touchstart', 'touchmove', 'touchcancel', 'touchend', 'tap', 'longpress', 'longtap', 'touchforcechange', 'transitionend', 'animationstart', 'animationiteration', 'animationend'];

var EventObject =
/*#__PURE__*/
function () {
  function EventObject(event) {
    (0, _classCallCheck2["default"])(this, EventObject);
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

  (0, _createClass2["default"])(EventObject, [{
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

    (0, _classCallCheck2["default"])(this, ViewEventManager);
    (0, _defineProperty2["default"])(this, "onDispatch", function (type, uuid, e) {
      var timeStamp = e.timeStamp,
          target = e.target;
      var id = e.target.id;

      var element = _document.document.findElement(id);

      if (_this.events[timeStamp]) {
        if (element.tagName === _HTMLTypes.ROOT) {
          delete _this.events[timeStamp];
        }
      } else {
        if (element.tagName !== _HTMLTypes.ROOT) {
          var event = _this.events[timeStamp] = new EventObject(e);
          var _id = e.currentTarget.id;
          event.target = element;
          event.currentTarget = _document.document.findElement(_id);
          var node = element;

          if (event.bubbles) {
            while (node && node.tagName !== _HTMLTypes.ROOT) {
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

    _transports["default"].view.onDispatch(this.onDispatch);
  }

  (0, _createClass2["default"])(ViewEventManager, [{
    key: "callElementMethod",
    value: function callElementMethod(element, type, event) {
      var fiber = element[_shared.INTERNAL_INSTANCE_KEY];

      if (fiber["return"]) {
        var stateNode = fiber["return"].stateNode;

        if (stateNode.isReactComponent) {
          if ((0, _is.isFunction)(stateNode[type])) {
            stateNode[type](event);
          }
        }
      }
    }
  }]);
  return ViewEventManager;
}();

exports["default"] = ViewEventManager;

/***/ }),

/***/ "../remixjs/src/project/runtime/ViewManager.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/project/runtime/ViewManager.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _ViewController = _interopRequireDefault(__webpack_require__(/*! ./ViewController */ "../remixjs/src/project/runtime/ViewController.js"));

var _renderer = __webpack_require__(/*! ../../renderer */ "../remixjs/src/renderer/index.js");

var _document = __webpack_require__(/*! ../../document */ "../remixjs/src/document/index.js");

var _createElement = _interopRequireDefault(__webpack_require__(/*! ../../react/createElement */ "../remixjs/src/react/createElement.js"));

var _transports = _interopRequireWildcard(__webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js"));

var ViewManager =
/*#__PURE__*/
function () {
  function ViewManager(context) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ViewManager);
    (0, _defineProperty2["default"])(this, "onReady", function () {});
    (0, _defineProperty2["default"])(this, "onLoad", function (_ref, callback) {
      var id = _ref.id,
          route = _ref.route,
          query = _ref.query;
      var viewController = _this.viewControllers[id];

      if (viewController) {
        viewController.onLoad(query, callback);
      } else {
        var r = _this.routes[route];

        if (r) {
          _this.viewControllers[id] = viewController = new _ViewController["default"](id, r);
          viewController.onLoad(query, callback);
        } else {
          logger.red("Can not find route!");
        }
      }
    });
    this.context = context;
    this.viewControllers = {};

    _transports["default"].view.onLoad(this.onLoad);

    _transports["default"].view.onReady(this.onReady);
  }

  (0, _createClass2["default"])(ViewManager, [{
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

exports["default"] = ViewManager;

/***/ }),

/***/ "../remixjs/src/project/runtime/logic/index.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/project/runtime/logic/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ "../remixjs/node_modules/qs/lib/index.js"));

var _transports = _interopRequireDefault(__webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _ViewManager = _interopRequireDefault(__webpack_require__(/*! ../ViewManager */ "../remixjs/src/project/runtime/ViewManager.js"));

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var LogicRuntime =
/*#__PURE__*/
function () {
  function LogicRuntime(context, instance) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, LogicRuntime);
    (0, _defineProperty2["default"])(this, "onApplicationDisconnected", function () {
      top.postMessage({
        code: 'DISCONNECTED'
      });
    });
    (0, _defineProperty2["default"])(this, "onApplicationLaunch", function (options) {
      var props = _this.instance.props;

      if ((0, _is.isFunction)(props.onLaunch)) {
        props.onLaunch(options);
      }
    });
    this.id = _uuid["default"].v4();
    this.context = context;
    this.instance = instance;
    this.viewManager = new _ViewManager["default"](context);

    _transports["default"].app.onLaunch(this.onApplicationLaunch);

    _transports["default"].app.onDisconnect(this.onApplicationDisconnected);
  }

  (0, _createClass2["default"])(LogicRuntime, [{
    key: "run",
    value: function run() {
      var search = location.search.slice(1);

      var query = _qs["default"].parse(search);

      _transports["default"].app.connect(query.id, function (code) {
        if (code === 'NO_EXIST') {}
      });
    }
  }]);
  return LogicRuntime;
}();

function _default(context, instance) {
  var logic = new LogicRuntime(context, instance);
  logic.run();
}

/***/ }),

/***/ "../remixjs/src/project/runtime/terminal/NativeRuntime.js":
/*!****************************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal/NativeRuntime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _transports = _interopRequireWildcard(__webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var _NativeSocket = _interopRequireDefault(__webpack_require__(/*! ./NativeSocket */ "../remixjs/src/project/runtime/terminal/NativeSocket.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NativeRuntime =
/*#__PURE__*/
function () {
  function NativeRuntime() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, NativeRuntime);
    (0, _defineProperty2["default"])(this, "onRequest", function (options, callback) {
      return _this.createCommonAPIRequst('request', options, callback);
    });
    (0, _defineProperty2["default"])(this, "onNavigateTo", function (options, callback) {
      return _this.createCommonAPIRequst('navigateTo', options, callback);
    });
    (0, _defineProperty2["default"])(this, "onNavigateBack", function (options, callback) {
      return _this.createCommonAPIRequst('navigateBack', options, callback);
    });
    (0, _defineProperty2["default"])(this, "onConnectSocket", function (id, options, callback) {
      return _env["default"].isInspectMode ? (0, _NativeSocket["default"])(_transports["default"].api, id, options, callback) : _this.createCommonAPIRequst('connectSocket', options, callback);
    });

    _transports["default"].api.on(_transports.API.REQUEST, this.onRequest);

    _transports["default"].api.on(_transports.API.NAVIGATE_TO, this.onNavigateTo);

    _transports["default"].api.on(_transports.API.NAVIGATE_BACK, this.onNavigateBack);

    _transports["default"].api.on(_transports.API.CONNECT_SOCKET, this.onConnectSocket);
  }

  (0, _createClass2["default"])(NativeRuntime, [{
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

exports["default"] = NativeRuntime;

/***/ }),

/***/ "../remixjs/src/project/runtime/terminal/NativeSocket.js":
/*!***************************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal/NativeSocket.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createNativeSocket;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _transports = __webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NativeSocket =
/*#__PURE__*/
function () {
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
          type: _transports.API.SOCKET_OPEN,
          argv: [_this2.id]
        });
      });
      socket.onMessage(function (data) {
        debugger;

        _this2.transport.reply({
          type: _transports.API.SOCKET_MESSAGE,
          argv: [_this2.id, data]
        });
      });
      socket.onClose(function () {
        _this2.transport.off(_transports.API.SOCKET_MESSAGE);
      });
      this.socket = socket;
      this.transport.on(_transports.API.SOCKET_MESSAGE, this.onMessage);
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  transports: true
};
exports["default"] = _default;
Object.defineProperty(exports, "transports", {
  enumerable: true,
  get: function get() {
    return _transports["default"];
  }
});

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _transports = _interopRequireDefault(__webpack_require__(/*! ../transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _ViewManager = _interopRequireDefault(__webpack_require__(/*! ../ViewManager */ "../remixjs/src/project/runtime/ViewManager.js"));

var _ViewEventManger = _interopRequireDefault(__webpack_require__(/*! ../ViewEventManger */ "../remixjs/src/project/runtime/ViewEventManger.js"));

var _NativeRuntime2 = _interopRequireDefault(__webpack_require__(/*! ./NativeRuntime */ "../remixjs/src/project/runtime/terminal/NativeRuntime.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var _remixjsMessageProtocol = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");

Object.keys(_remixjsMessageProtocol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _remixjsMessageProtocol[key];
    }
  });
});

var TerminalRuntime =
/*#__PURE__*/
function (_NativeRuntime) {
  (0, _inherits2["default"])(TerminalRuntime, _NativeRuntime);

  function TerminalRuntime(context) {
    var _this;

    (0, _classCallCheck2["default"])(this, TerminalRuntime);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TerminalRuntime).call(this));
    _this.context = context;
    _this.options = null;
    return _this;
  }

  (0, _createClass2["default"])(TerminalRuntime, [{
    key: "inspect",
    value: function inspect(callback) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _transports["default"].app.inspect(function () {
          resolve();
        });

        _transports["default"].app.on('reLaunch', function () {
          wx.reLaunch({
            url: "/".concat(_this2.options.path)
          });

          _transports["default"].app.on('reConnect', function () {
            wx.showTabBar();
            wx.hideLoading();

            _transports["default"].app.emit('launch', _this2.options);
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
              _transports["default"].app.launch(options);

              _transports["default"].app.emit('launch', options);

              ctrl.options = options;
              _env["default"].isApplicationLaunched = true;
              _env["default"].applicationLaunchedOptions = options;
            },
            onError: function onError(e) {
              _transports["default"].app.error(e);
            }
          });
        }
      };

      if (_env["default"].isInspectMode) {
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

function _default(context) {
  var runtime = new TerminalRuntime(context);
  var viewManager = new _ViewManager["default"](context);
  var viewEventManager = new _ViewEventManger["default"](context);
  runtime.run();
}

;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/APITransport.js":
/*!*****************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/APITransport.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _LogicSocket = _interopRequireDefault(__webpack_require__(/*! ./Classes/LogicSocket */ "../remixjs/src/project/runtime/transports/Classes/LogicSocket.js"));

var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(APITransport, _Tunnel);

  function APITransport() {
    var _this;

    (0, _classCallCheck2["default"])(this, APITransport);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(APITransport).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      var callbackId = (0, _is.isFunction)(callback) ? _uuid["default"].v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(APITransport.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.API),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types.API, _this.onMessage);

    return _this;
  }

  (0, _createClass2["default"])(APITransport, [{
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(APITransport.prototype), "post", this).call(this, {
        type: String(_types.API),
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

          if ((0, _is.isFunction)(options.complete)) {
            options.complete(data);
          }
        });
      });
    }
  }, {
    key: "request",
    value: function request(options) {
      return this.createCommonPromise(_types.API.REQUEST, options);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(options) {
      return this.createCommonPromise(_types.API.NAVIGATE_TO, options);
    }
  }, {
    key: "navigateBack",
    value: function navigateBack(options) {
      return this.createCommonPromise(_types.API.NAVIGATE_BACK, options);
    }
  }, {
    key: "connectSocket",
    value: function connectSocket(options) {
      return new _LogicSocket["default"](this, options);
    }
  }]);
  return APITransport;
}(_tunnel["default"]);

exports["default"] = APITransport;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/APITransportNative.js":
/*!***********************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/APITransportNative.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var isSuccess = function isSuccess(data) {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
};

var APITransport =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(APITransport, _Tunnel);

  function APITransport() {
    var _this;

    (0, _classCallCheck2["default"])(this, APITransport);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(APITransport).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(APITransport.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.API),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(APITransport, [{
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(APITransport.prototype), "post", this).call(this, {
        type: String(_types.API),
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

          if ((0, _is.isFunction)(options.complete)) {
            options.complete(data);
          }
        });
      });
    }
  }, {
    key: "request",
    value: function request(options) {
      return this.createCommonPromise(_types.API.REQUEST, options);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(options) {
      return this.createCommonPromise(_types.API.NAVIGATE_TO, options);
    }
  }, {
    key: "navigateBack",
    value: function navigateBack(options) {
      return this.createCommonPromise(_types.API.NAVIGATE_BACK, options);
    }
  }, {
    key: "connectSocket",
    value: function connectSocket(options) {
      return this.createCommonPromise(_types.API.CONNECT_SOCKET, options, function () {});
    }
  }]);
  return APITransport;
}(_tunnel["default"]);

exports["default"] = APITransport;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/ApplicationTransport.js":
/*!*************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ApplicationTransport.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var ApplicationTransport =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(ApplicationTransport, _Tunnel);

  function ApplicationTransport() {
    var _this;

    (0, _classCallCheck2["default"])(this, ApplicationTransport);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ApplicationTransport).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      var callbackId = (0, _is.isFunction)(callback) ? _uuid["default"].v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ApplicationTransport.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.APPLICATION),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types.APPLICATION, _this.onMessage);

    return _this;
  }

  (0, _createClass2["default"])(ApplicationTransport, [{
    key: "onDisconnect",
    value: function onDisconnect(callback) {
      this.on('disconnect', callback);
    }
  }, {
    key: "onLaunch",
    value: function onLaunch(callback) {
      this.on(_types.APPLICATION.LAUNCH, callback);
    }
  }, {
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ApplicationTransport.prototype), "post", this).call(this, {
        type: String(_types.APPLICATION),
        body: body
      });
    }
  }, {
    key: "connect",
    value: function connect(id, callback) {
      this.post(_types.APPLICATION.CONNECT, [id], callback);
    }
  }, {
    key: "inspect",
    value: function inspect(callback) {
      this.post(_types.APPLICATION.INSPECT, [], callback);
    }
  }, {
    key: "launch",
    value: function launch(options) {
      this.post(_types.APPLICATION.LAUNCH, [options]);
    }
  }, {
    key: "show",
    value: function show() {
      this.post(_types.APPLICATION.SHOW, []);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.post(_types.APPLICATION.HIDE, []);
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.post(_types.APPLICATION.ERROR, [_error]);
    }
  }]);
  return ApplicationTransport;
}(_tunnel["default"]);

exports["default"] = ApplicationTransport;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/ApplicationTransportNative.js":
/*!*******************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ApplicationTransportNative.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var ApplicationTransport =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(ApplicationTransport, _Tunnel);

  function ApplicationTransport() {
    var _this;

    (0, _classCallCheck2["default"])(this, ApplicationTransport);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ApplicationTransport).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ApplicationTransport.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.APPLICATION),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(ApplicationTransport, [{
    key: "onLaunch",
    value: function onLaunch(callback) {
      this.on(_types.APPLICATION.LAUNCH, callback);
    }
  }, {
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ApplicationTransport.prototype), "post", this).call(this, {
        type: String(_types.APPLICATION),
        body: body
      });
    }
  }, {
    key: "launch",
    value: function launch(options) {
      this.post(_types.APPLICATION.LAUNCH, [options]);
    }
  }, {
    key: "show",
    value: function show() {
      this.post(_types.APPLICATION.SHOW, []);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.post(_types.APPLICATION.HIDE, []);
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.post(_types.APPLICATION.ERROR, [_error]);
    }
  }]);
  return ApplicationTransport;
}(_tunnel["default"]);

exports["default"] = ApplicationTransport;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/Classes/LogicSocket.js":
/*!************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/Classes/LogicSocket.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createLogicSocket;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _types = __webpack_require__(/*! ../types */ "../remixjs/src/project/runtime/transports/types.js");

var LogicSocket =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(LogicSocket, _EventEmitter);

  function LogicSocket(transport) {
    var _this;

    (0, _classCallCheck2["default"])(this, LogicSocket);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LogicSocket).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSocketOpen", function (id) {
      if (_this.id === id) {
        _this.emit('open');
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSocketMessage", function (id, data) {
      if (id === _this.id) {
        _this.emit('message', data);
      }
    });
    _this.id = _uuid["default"].v4();
    _this.transport = transport;
    return _this;
  }

  (0, _createClass2["default"])(LogicSocket, [{
    key: "connect",
    value: function connect(options) {
      this.transport.post(_types.API.CONNECT_SOCKET, [this.id, options], function () {});
      this.transport.on(_types.API.SOCKET_OPEN, this.onSocketOpen);
      this.transport.on(_types.API.SOCKET_MESSAGE, this.onSocketMessage);
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
        type: _types.API.SOCKET_MESSAGE,
        argv: [this.id, data]
      });
    }
  }]);
  return LogicSocket;
}(_events["default"]);

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var ViewControllerTransport =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(ViewControllerTransport, _Tunnel);

  function ViewControllerTransport() {
    var _this;

    (0, _classCallCheck2["default"])(this, ViewControllerTransport);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ViewControllerTransport).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      var callbackId = (0, _is.isFunction)(callback) ? _uuid["default"].v4() : null;

      if (callbackId) {
        _this.once(callbackId, callback);
      }

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ViewControllerTransport.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.VIEW),
        body: {
          type: type,
          argv: argv,
          callbackId: callbackId
        }
      });
    });

    _this.on(_types.VIEW, _this.onMessage);

    return _this;
  }

  (0, _createClass2["default"])(ViewControllerTransport, [{
    key: "dispatch",
    value: function dispatch() {
      debugger;
    }
  }, {
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ViewControllerTransport.prototype), "post", this).call(this, {
        type: String(_types.VIEW),
        body: body
      });
    }
  }, {
    key: "load",
    value: function load(data, callback) {
      this.post(_types.VIEW.LOAD, [data], callback);
    }
  }, {
    key: "onLoad",
    value: function onLoad(callback) {
      this.on(_types.VIEW.LOAD, callback);
    }
  }, {
    key: "onReady",
    value: function onReady(callback) {
      this.on(_types.VIEW.READY, callback);
    }
  }]);
  return ViewControllerTransport;
}(_tunnel["default"]);

exports["default"] = ViewControllerTransport;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js":
/*!**********************************************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _document = __webpack_require__(/*! ../../../document */ "../remixjs/src/document/index.js");

var ViewControllerTransportNative =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(ViewControllerTransportNative, _Tunnel);

  function ViewControllerTransportNative() {
    var _this;

    (0, _classCallCheck2["default"])(this, ViewControllerTransportNative);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ViewControllerTransportNative).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (type, argv, callback) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ViewControllerTransportNative.prototype), "post", (0, _assertThisInitialized2["default"])(_this)).call((0, _assertThisInitialized2["default"])(_this), {
        type: String(_types.VIEW),
        body: {
          type: type,
          argv: argv,
          callback: callback
        }
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(ViewControllerTransportNative, [{
    key: "dispatch",
    value: function dispatch(type, id, e) {
      console.log(type, e);

      if (id) {
        this.post(_types.VIEW.EVENT, [type, id, e]);
      }
    }
  }, {
    key: "callLifecycle",
    value: function callLifecycle(type, id) {
      if (id) {
        this.post(_types.VIEW.LIFECYCLE, [type, id]);
      }
    }
  }, {
    key: "reply",
    value: function reply(body) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ViewControllerTransportNative.prototype), "post", this).call(this, {
        type: String(_types.VIEW),
        body: body
      });
    }
  }, {
    key: "load",
    value: function load(data, callback) {
      this.post(_types.VIEW.LOAD, [data], callback);
    }
  }, {
    key: "shareMessage",
    value: function shareMessage(options) {
      this.post(_types.VIEW.LOAD, [options]);
    }
  }, {
    key: "onShareMessage",
    value: function onShareMessage(callback) {
      this.on(_types.VIEW.SHARE_MESSAGE, callback);
    }
  }, {
    key: "onLoad",
    value: function onLoad(callback) {
      this.on(_types.VIEW.LOAD, callback);
    }
  }, {
    key: "onReady",
    value: function onReady(callback) {
      this.on(_types.VIEW.READY, callback);
    }
  }, {
    key: "onDispatch",
    value: function onDispatch(callback) {
      this.on(_types.VIEW.EVENT, callback);
    }
  }]);
  return ViewControllerTransportNative;
}(_tunnel["default"]);

exports["default"] = ViewControllerTransportNative;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/index.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _ApplicationTransport = _interopRequireDefault(__webpack_require__(/*! ./ApplicationTransport */ "../remixjs/src/project/runtime/transports/ApplicationTransport.js"));

var _ViewControllerTransport = _interopRequireDefault(__webpack_require__(/*! ./ViewControllerTransport */ "../remixjs/src/project/runtime/transports/ViewControllerTransport.js"));

var _APITransport = _interopRequireDefault(__webpack_require__(/*! ./APITransport */ "../remixjs/src/project/runtime/transports/APITransport.js"));

var _ApplicationTransportNative = _interopRequireDefault(__webpack_require__(/*! ./ApplicationTransportNative */ "../remixjs/src/project/runtime/transports/ApplicationTransportNative.js"));

var _ViewControllerTransportNative = _interopRequireDefault(__webpack_require__(/*! ./ViewControllerTransportNative */ "../remixjs/src/project/runtime/transports/ViewControllerTransportNative.js"));

var _APITransportNative = _interopRequireDefault(__webpack_require__(/*! ./APITransportNative */ "../remixjs/src/project/runtime/transports/APITransportNative.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

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
var isInspectMode = _env["default"].isInspectMode;
var transports = {};

var createApplicationTransport = function createApplicationTransport() {
  return transports.app = transports.app || (!isInspectMode ? new _ApplicationTransportNative["default"]() : new _ApplicationTransport["default"]());
};

var createViewControllerTransport = function createViewControllerTransport() {
  return transports.view = transports.view || (!isInspectMode ? new _ViewControllerTransportNative["default"]() : new _ViewControllerTransport["default"]());
};

var createAPITransport = function createAPITransport() {
  return transports.api = transports.api || (!isInspectMode ? new _APITransportNative["default"]() : new _APITransport["default"]());
};

var _default = {
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

};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/project/runtime/transports/types.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/project/runtime/transports/types.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _remixjsMessageProtocol = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");

Object.keys(_remixjsMessageProtocol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _remixjsMessageProtocol[key];
    }
  });
});

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/NativeTunnel.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/NativeTunnel.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _default =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(_default, _EventEmitter);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMessage", function (_ref) {
      var type = _ref.type,
          argv = _ref.argv,
          callback = _ref.callback;

      if (type) {
        var _this2;

        if ((0, _is.isFunction)(callback)) {
          argv.push(callback);
        }

        (_this2 = _this).emit.apply(_this2, [type].concat((0, _toConsumableArray2["default"])(argv)));
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "post",
    value: function post(_post) {
      var type = _post.type,
          body = _post.body;
      this.onMessage(body);
    }
  }]);
  return _default;
}(_events["default"]);

exports["default"] = _default;
;

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/Socket.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/Socket.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

function _default(options) {
  var _temp;

  var Socket = _env["default"].isDevToolRuntime ? (_temp =
  /*#__PURE__*/
  function () {
    function _temp(url, protocols) {
      var _this = this;

      (0, _classCallCheck2["default"])(this, _temp);
      (0, _defineProperty2["default"])(this, "onMessage", function (onMessage) {
        _this.socket.onmessage = onMessage;
      });
      (0, _defineProperty2["default"])(this, "onOpen", function (onOpen) {
        _this.socket.onopen = onOpen;
      });
      (0, _defineProperty2["default"])(this, "onClose", function (onClose) {
        _this.socket.onclose = onClose;
      });
      (0, _defineProperty2["default"])(this, "onError", function (onError) {
        _this.socket.onerror = onError;
      });
      this.socket = new WebSocket(url, protocols);
    }

    (0, _createClass2["default"])(_temp, [{
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
}

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/SocketTunnel.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/SocketTunnel.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _remixjsMessageProtocol = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");

var _Socket = _interopRequireDefault(__webpack_require__(/*! ./Socket */ "../remixjs/src/project/runtime/tunnel/Socket.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var MessageEmitter =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(MessageEmitter, _EventEmitter);

  function MessageEmitter() {
    var _this;

    (0, _classCallCheck2["default"])(this, MessageEmitter);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MessageEmitter).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (post) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onError", function (_ref) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onOpen", function () {
      _this.connected = true;

      if (_this.queue.length > 0) {
        var message;

        while (message = _this.queue.shift()) {
          _this.post(message);
        }

        _this.queue = [];
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClose", function () {
      _this.connected = false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMessage", function (data) {
      _this.emit('message', data);
    });
    var isDevToolRuntime = _env["default"].isDevToolRuntime;
    _this.id = isDevToolRuntime ? _env["default"].inspectLogicUUID : _env["default"].inspectTerminalUUID;
    _this.connected = false;
    _this.queue = [];
    _this.socket = new _Socket["default"]({
      url: _env["default"].inspectWSURL,
      protocols: [_this.id, _env["default"].inspectTerminalTypes[_env["default"].isDevToolRuntime ? 'LOGIC' : 'VIEW']]
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
}(_events["default"]);

var SocketTunnel =
/*#__PURE__*/
function (_EventEmitter2) {
  (0, _inherits2["default"])(SocketTunnel, _EventEmitter2);

  function SocketTunnel() {
    var _this2;

    (0, _classCallCheck2["default"])(this, SocketTunnel);
    _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SocketTunnel).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "onMessage", function (_ref3) {
      var type = _ref3.type,
          argv = _ref3.argv,
          callbackId = _ref3.callbackId;

      if (callbackId) {
        if (_this2.eventNames().includes(callbackId)) {
          var _this3;

          return (_this3 = _this2).emit.apply(_this3, [callbackId].concat((0, _toConsumableArray2["default"])(argv)));
        }
      }

      if (type) {
        var _this4;

        var t = new _remixjsMessageProtocol.Type(type.type, type.value);

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

        (_this4 = _this2).emit.apply(_this4, [t].concat((0, _toConsumableArray2["default"])(argv)));
      }
    });
    _this2.id = _uuid["default"].v4();
    _this2.emitter = SocketTunnel.emitter || (SocketTunnel.emitter = new MessageEmitter());

    _this2.emitter.on('message', function (_ref4) {
      var post = _ref4.post;
      var type = post.type,
          body = post.body;

      _this2.emit(type, body);
    });

    return _this2;
  }

  (0, _createClass2["default"])(SocketTunnel, [{
    key: "post",
    value: function post(data) {
      this.emitter.post(data);
    }
  }]);
  return SocketTunnel;
}(_events["default"]);

exports["default"] = SocketTunnel;

/***/ }),

/***/ "../remixjs/src/project/runtime/tunnel/index.js":
/*!******************************************************!*\
  !*** ../remixjs/src/project/runtime/tunnel/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _NativeTunnel = _interopRequireDefault(__webpack_require__(/*! ./NativeTunnel */ "../remixjs/src/project/runtime/tunnel/NativeTunnel.js"));

var _SocketTunnel = _interopRequireDefault(__webpack_require__(/*! ./SocketTunnel */ "../remixjs/src/project/runtime/tunnel/SocketTunnel.js"));

var Tunnel =  false ? undefined : _NativeTunnel["default"];
var _default = Tunnel;
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/react/Children.js":
/*!****************************************!*\
  !*** ../remixjs/src/react/Children.js ***!
  \****************************************/
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

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

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

/***/ "../remixjs/src/react/Component.js":
/*!*****************************************!*\
  !*** ../remixjs/src/react/Component.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

var Component =
/*#__PURE__*/
function () {
  function Component(props, context, updater) {
    (0, _classCallCheck2["default"])(this, Component);

    if (!this.state) {
      this.state = {};
    }

    this.props = props || {};
    this.context = context || _shared.EMPTY_OBJECT;
    this.refs = {};
    this.updater = updater;
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

/***/ }),

/***/ "../remixjs/src/react/PropTypes.js":
/*!*****************************************!*\
  !*** ../remixjs/src/react/PropTypes.js ***!
  \*****************************************/
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

/***/ "../remixjs/src/react/PureComponent.js":
/*!*********************************************!*\
  !*** ../remixjs/src/react/PureComponent.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ./Component */ "../remixjs/src/react/Component.js"));

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

var PureComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(PureComponent, _Component);

  function PureComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, PureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(PureComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
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

/***/ }),

/***/ "../remixjs/src/react/ReactCurrentOwner.js":
/*!*************************************************!*\
  !*** ../remixjs/src/react/ReactCurrentOwner.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  current: null,
  currentDispatcher: null
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/react/ReactCurrentRootInstance.js":
/*!********************************************************!*\
  !*** ../remixjs/src/react/ReactCurrentRootInstance.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  current: null
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/react/ReactElement.js":
/*!********************************************!*\
  !*** ../remixjs/src/react/ReactElement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReactElement;

var _elementTypes = __webpack_require__(/*! ../shared/elementTypes */ "../remixjs/src/shared/elementTypes.js");

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

/***/ }),

/***/ "../remixjs/src/react/cloneElement.js":
/*!********************************************!*\
  !*** ../remixjs/src/react/cloneElement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cloneElement;

var _ReactElement = _interopRequireDefault(__webpack_require__(/*! ./ReactElement */ "../remixjs/src/react/ReactElement.js"));

function cloneElement(element, props) {
  return (0, _ReactElement["default"])(element.type, key, ref, self, source, owner, props);
}

/***/ }),

/***/ "../remixjs/src/react/createElement.js":
/*!*********************************************!*\
  !*** ../remixjs/src/react/createElement.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _ReactElement = _interopRequireDefault(__webpack_require__(/*! ./ReactElement */ "../remixjs/src/react/ReactElement.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var length = children.length;

  if ((0, _is.isFunction)(type)) {
    props = (0, _shared.resolveDefaultProps)(type, props);
  }

  props = props || {};

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

  return (0, _ReactElement["default"])(type, _objectSpread({}, props));
}

/***/ }),

/***/ "../remixjs/src/react/index.js":
/*!*************************************!*\
  !*** ../remixjs/src/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return _useState["default"];
  }
});
Object.defineProperty(exports, "PropTypes", {
  enumerable: true,
  get: function get() {
    return _PropTypes["default"];
  }
});
exports.Children = exports["default"] = void 0;

var Children = _interopRequireWildcard(__webpack_require__(/*! ./Children */ "../remixjs/src/react/Children.js"));

exports.Children = Children;

var _Component = _interopRequireDefault(__webpack_require__(/*! ./Component */ "../remixjs/src/react/Component.js"));

var _PureComponent = _interopRequireDefault(__webpack_require__(/*! ./PureComponent */ "../remixjs/src/react/PureComponent.js"));

var _createElement = _interopRequireDefault(__webpack_require__(/*! ./createElement */ "../remixjs/src/react/createElement.js"));

var _cloneElement = _interopRequireDefault(__webpack_require__(/*! ./cloneElement */ "../remixjs/src/react/cloneElement.js"));

var _useState = _interopRequireDefault(__webpack_require__(/*! ./useState */ "../remixjs/src/react/useState.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ./PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _default = {
  Children: Children,
  Component: _Component["default"],
  PureComponent: _PureComponent["default"],
  createElement: _createElement["default"],
  cloneElement: _cloneElement["default"],
  useState: _useState["default"],
  PropTypes: _PropTypes["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/react/useState.js":
/*!****************************************!*\
  !*** ../remixjs/src/react/useState.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useState;

var _ReactCurrentOwner = _interopRequireDefault(__webpack_require__(/*! ./ReactCurrentOwner */ "../remixjs/src/react/ReactCurrentOwner.js"));

function useState(state) {
  _ReactCurrentOwner["default"];
  debugger;
  return [state, function setState() {}];
}

/***/ }),

/***/ "../remixjs/src/reconciler/createContainer.js":
/*!****************************************************!*\
  !*** ../remixjs/src/reconciler/createContainer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/aniwei/Desktop/remixjs/packages/remixjs/src/reconciler/createContainer.js'");

/***/ }),

/***/ "../remixjs/src/reconciler/updateContainer.js":
/*!****************************************************!*\
  !*** ../remixjs/src/reconciler/updateContainer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/aniwei/Desktop/remixjs/packages/remixjs/src/reconciler/updateContainer.js'");

/***/ }),

/***/ "../remixjs/src/renderer/index.js":
/*!****************************************!*\
  !*** ../remixjs/src/renderer/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports["default"] = void 0;

var _renderIntoContainer = _interopRequireDefault(__webpack_require__(/*! ./renderIntoContainer */ "../remixjs/src/renderer/renderIntoContainer.js"));

function render(element, container, callback) {
  return (0, _renderIntoContainer["default"])(null, element, container, callback);
}

var _default = render;
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/renderer/renderIntoContainer.js":
/*!******************************************************!*\
  !*** ../remixjs/src/renderer/renderIntoContainer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderIntoContainer;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _createContainer = _interopRequireDefault(__webpack_require__(/*! ../reconciler/createContainer */ "../remixjs/src/reconciler/createContainer.js"));

var _updateContainer = _interopRequireDefault(__webpack_require__(/*! ../reconciler/updateContainer */ "../remixjs/src/reconciler/updateContainer.js"));

var _ReactCurrentRootInstance = _interopRequireDefault(__webpack_require__(/*! ../react/ReactCurrentRootInstance */ "../remixjs/src/react/ReactCurrentRootInstance.js"));

var ReactRoot =
/*#__PURE__*/
function () {
  function ReactRoot(container) {
    (0, _classCallCheck2["default"])(this, ReactRoot);
    this._internalRoot = (0, _createContainer["default"])(container);
  }

  (0, _createClass2["default"])(ReactRoot, [{
    key: "render",
    value: function render(element, callback) {
      (0, _updateContainer["default"])(element, this._internalRoot, callback);
    }
  }]);
  return ReactRoot;
}();

function renderIntoContainer(parentComponent, element, container, callback) {
  var root = container._reactRootContainer || (container._reactRootContainer = new ReactRoot(container));
  _ReactCurrentRootInstance["default"].current = container;
  return root.render(element, callback);
}

/***/ }),

/***/ "../remixjs/src/router/Route.js":
/*!**************************************!*\
  !*** ../remixjs/src/router/Route.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var Route =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Route, _Component);

  function Route() {
    (0, _classCallCheck2["default"])(this, Route);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Route).apply(this, arguments));
  }

  (0, _createClass2["default"])(Route, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", null, this.props.children);
    }
  }]);
  return Route;
}(_Component2["default"]);

exports["default"] = Route;

/***/ }),

/***/ "../remixjs/src/router/Router.js":
/*!***************************************!*\
  !*** ../remixjs/src/router/Router.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var Router =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Router, _Component);

  function Router() {
    (0, _classCallCheck2["default"])(this, Router);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Router).apply(this, arguments));
  }

  (0, _createClass2["default"])(Router, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", null, this.props.children);
    }
  }]);
  return Router;
}(_Component2["default"]);

exports["default"] = Router;

/***/ }),

/***/ "../remixjs/src/router/index.js":
/*!**************************************!*\
  !*** ../remixjs/src/router/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

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

var _Router = _interopRequireDefault(__webpack_require__(/*! ./Router */ "../remixjs/src/router/Router.js"));

var _Route = _interopRequireDefault(__webpack_require__(/*! ./Route */ "../remixjs/src/router/Route.js"));

/***/ }),

/***/ "../remixjs/src/shared/HTMLNodeType.js":
/*!*********************************************!*\
  !*** ../remixjs/src/shared/HTMLNodeType.js ***!
  \*********************************************/
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

/***/ "../remixjs/src/shared/elementTypes.js":
/*!*********************************************!*\
  !*** ../remixjs/src/shared/elementTypes.js ***!
  \*********************************************/
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

/***/ "../remixjs/src/shared/index.js":
/*!**************************************!*\
  !*** ../remixjs/src/shared/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.shouldSetTextContent = shouldSetTextContent;
exports.shallowEqual = shallowEqual;
exports.resolveDefaultProps = resolveDefaultProps;
exports.extend = extend;
exports.clone = clone;
exports.flatten = flatten;
exports.keys = exports.assign = exports.WORKING = exports.NO_WORK = exports.EXPIRE_TIME = exports.EMPTY_REFS = exports.EMPTY_CONTEXT = exports.EMPTY_ARRAY = exports.EMPTY_OBJECT = exports.UNMASKED_CHILD_CONTEXT = exports.MASKED_CHILD_CONTEXT = exports.MERGED_CHILD_CONTEXT = exports.REACT_INTERNAL_INSTANCE = exports.REACT_INTERNAL_FIBER = exports.INTERNAL_EVENT_HANDLERS_KEY = exports.INTERNAL_INSTANCE_KEY = exports.DANGEROUSLY_SET_INNER_HTML = exports.STYLE_NAME_FLOAT = exports.STYLE = exports.HTML = exports.CHILDREN = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ./is */ "../remixjs/src/shared/is.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var EXPIRE_TIME = 1;
exports.EXPIRE_TIME = EXPIRE_TIME;
var NO_WORK = 0;
exports.NO_WORK = NO_WORK;
var WORKING = 1;
exports.WORKING = WORKING;

function noop() {}

var assign = Object.assign;
exports.assign = assign;
var keys = Object.keys;
exports.keys = keys;

function shouldSetTextContent(type, props) {
  // todo
  return (0, _is.isString)(props.children) || false;
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

/***/ "../remixjs/src/shared/is.js":
/*!***********************************!*\
  !*** ../remixjs/src/shared/is.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

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

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs/node_modules/@babel/runtime/helpers/typeof.js"));

var _workTags = __webpack_require__(/*! ./workTags */ "../remixjs/src/shared/workTags.js");

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

/***/ "../remixjs/src/shared/workTags.js":
/*!*****************************************!*\
  !*** ../remixjs/src/shared/workTags.js ***!
  \*****************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1jbGkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMtY2xpL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzLW1lc3NhZ2UtcHJvdG9jb2wvZGlzdC9wcm90b2NvbC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1tZXNzYWdlLXByb3RvY29sL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1tZXNzYWdlLXByb3RvY29sL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9lbnYuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3FzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL0FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL1RhYkJhci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9WaWV3Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LWJ1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LWltYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtaW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1waWNrZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1yb290L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtc2Nyb2xsLXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1zd2lwZXItaXRlbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXN3aXBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXRleHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC12aWRlby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxCb2R5RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTEJ1dHRvbkVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MSW1hZ2VFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MUGlja2VyRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFJvb3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MU3dpcGVyRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFN3aXBlckl0ZW1FbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MVGV4dEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFZpZGVvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFZpZXdFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9TdHlsZVNoZWV0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9jcmVhdGVDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2NyZWF0ZVRleHROb2RlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvZ2xvYmFsRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L1Byb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvVmlldy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ub3RpZmljYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3Qvbm90aWZpY2F0aW9uL3R5cGVzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvVmlld0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS9WaWV3RXZlbnRNYW5nZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS9WaWV3TWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL2xvZ2ljL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdGVybWluYWwvTmF0aXZlUnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3Rlcm1pbmFsL05hdGl2ZVNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3Rlcm1pbmFsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9BUElUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL0FQSVRyYW5zcG9ydE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3RyYW5zcG9ydHMvQXBwbGljYXRpb25UcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL0FwcGxpY2F0aW9uVHJhbnNwb3J0TmF0aXZlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9DbGFzc2VzL0xvZ2ljU29ja2V0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9WaWV3Q29udHJvbGxlclRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3RyYW5zcG9ydHMvVmlld0NvbnRyb2xsZXJUcmFuc3BvcnROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3R1bm5lbC9OYXRpdmVUdW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90dW5uZWwvU29ja2V0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHVubmVsL1NvY2tldFR1bm5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9QdXJlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9SZWFjdEN1cnJlbnRPd25lci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvUmVhY3RDdXJyZW50Um9vdEluc3RhbmNlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9SZWFjdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L2Nsb25lRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZW5kZXJlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVuZGVyZXIvcmVuZGVySW50b0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcm91dGVyL1JvdXRlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yb3V0ZXIvUm91dGVyLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yb3V0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9IVE1MTm9kZVR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9lbGVtZW50VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvc2hhcmVkL2lzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9zaGFyZWQvd29ya1RhZ3MuanMiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiQ09NTU9OIiwiQVBJIiwiVklFVyIsIkFQUExJQ0FUSU9OIiwiVHlwZSIsIl9jbGFzc0NhbGxDaGVjazIiLCJfY3JlYXRlQ2xhc3MyIiwiX2RlZmluZVByb3BlcnR5MiIsIl91dWlkIiwidHlwZSIsInR5cGVzIiwidXVpZCIsInY0IiwidG9TdHJpbmciLCJnZXROYW1lcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJkZWZpbmVOb3RpZmljYXRpb25UeXBlcyIsInByZWZpeCIsIm5hbWVzIiwiZm9yRWFjaCIsImNvbmNhdCIsIkxBVU5DSCIsIkNPTk5FQ1QiLCJJTlNQRUNUIiwiU0hPVyIsIkhJREUiLCJFUlJPUiIsIkxPQUQiLCJSRUFEWSIsIkVWRU5UIiwiUkVRVUVTVCIsIk5BVklHQVRFX1RPIiwiTkFWSUdBVEVfQkFDSyIsIkNPTk5FQ1RfU09DS0VUIiwiU09DS0VUX09QRU4iLCJTT0NLRVRfTUVTU0FHRSIsIkNBTExCQUNLIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJ2MSIsImJ5dGVUb0hleCIsInN1YnN0ciIsImJ5dGVzVG9VdWlkIiwiYnVmIiwib2Zmc2V0IiwiYnRoIiwiam9pbiIsImdldFJhbmRvbVZhbHVlcyIsImNyeXB0byIsIm1zQ3J5cHRvIiwid2luZG93Iiwicm5kczgiLCJVaW50OEFycmF5Iiwid2hhdHdnUk5HIiwicm5kcyIsIkFycmF5IiwibWF0aFJORyIsIk1hdGgiLCJyYW5kb20iLCJybmciLCJfbm9kZUlkIiwiX2Nsb2Nrc2VxIiwiX2xhc3RNU2VjcyIsIl9sYXN0TlNlY3MiLCJvcHRpb25zIiwiYiIsIm5vZGUiLCJjbG9ja3NlcSIsInVuZGVmaW5lZCIsInNlZWRCeXRlcyIsIm1zZWNzIiwiRGF0ZSIsImdldFRpbWUiLCJuc2VjcyIsImR0IiwiRXJyb3IiLCJ0bCIsInRtaCIsImlpIiwiaXNJbnNwZWN0TW9kZSIsInByb2Nlc3MiLCJpbnNwZWN0V1NVUkwiLCJpbnRlcm5hbFVJVVJMIiwiaW5zcGVjdE1lc3NhZ2VUeXBlcyIsImluc3BlY3RUZXJtaW5hbFR5cGVzIiwiaW5zcGVjdFRlcm1pbmFsVVVJRCIsImluc3BlY3RMb2dpY1VVSUQiLCJBcHBsaWNhdGlvbiIsImFyZ3YiLCJvbkxhdW5jaCIsImFwcGx5IiwiY2hpbGRyZW4iLCJjaGlsZCIsIlJvdXRlciIsIlRhYkJhciIsInB1c2giLCJjbG9uZUFwcGxpY2F0aW9uQ2hpbGRyZW4iLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwibm9vcCIsIlRhYkJhckl0ZW0iLCJwYXRoIiwic3RyaW5nIiwiaWNvbiIsInNlbGVjdGVkSWNvbiIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwib25lT2YiLCJwb3NpdGlvbiIsImN1c3RvbSIsImJvb2wiLCJib3R0b20iLCJWaWV3Q29udHJvbGxlciIsImNvbnRleHQiLCJSZW1peEJ1dHRvbiIsImUiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hDYW5jZWwiLCJvblRvdWNoRW5kIiwib25UYXAiLCJvbkxvbmdQcmVzcyIsIm9uTG9uZ1RhcCIsIm9uVG91Y2hGb3JjZUNoYW5nZSIsIm9uVHJhbnNpdGlvbkVuZCIsIm9uQW5pbWF0aW9uU3RhcnQiLCJvbkFuaW1hdGlvbkl0ZXJhdGlvbiIsIm9uQW5pbWF0aW9uRW5kIiwib25HZXRVc2VySW5mbyIsIm9uQ29udGFjdCIsIm9uR2V0UGhvbmVOdW1iZXIiLCJvbk9wZW5TZXR0aW5nIiwib25MYXVuY2hBcHAiLCJvbkVycm9yIiwic3R5bGUiLCJjbGFzc05hbWUiLCJzaXplIiwicGxhaW4iLCJkaXNhYmxlZCIsImxvYWRpbmciLCJmb3JtVHlwZSIsIm9wZW5UeXBlIiwiaG92ZXJDbGFzcyIsImhvdmVyU3RvcFByb3BhZ2F0aW9uIiwiaG92ZXJTdGFydFRpbWUiLCJob3ZlclN0YXlUaW1lIiwibGFuZyIsInNlc3Npb25Gcm9tIiwic2VuZE1lc3NhZ2VUaXRsZSIsInNlbmRNZXNzYWdlUGF0aCIsInNlbmRNZXNzYWdlSW1nIiwiYXBwUGFyYW1ldGVyIiwic2hvd01lc3NhZ2VDYXJkIiwiUmVhY3QiLCJudW1iZXIiLCJSZW1peEltYWdlIiwib25Mb2FkIiwic3JjIiwid2VicCIsImxhenlMb2FkIiwic2hvd01lbnVCeUxvbmdwcmVzcyIsIlJlbWl4SW5wdXQiLCJvbklucHV0Iiwib25Gb2N1cyIsIm9uQmx1ciIsIm9uQ29uZmlybSIsIm9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UiLCJwYXNzd29yZCIsInBsYWNlaG9sZGVyIiwicGxhY2Vob2xkZXJTdHlsZSIsInBsYWNlaG9sZGVyQ2xhc3MiLCJtYXhsZW5ndGgiLCJjdXJzb3JTcGFjaW5nIiwiYXV0b0ZvY3VzIiwiZm9jdXMiLCJjb25maXJtVHlwZSIsImNvbmZpcm1Ib2xkIiwiY3Vyc29yIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJhZGp1c3RQb3NpdGlvbiIsImhvbGRLZXlib2FyZCIsIlJlbWl4TWFwIiwib25NYXJrZXJUYXAiLCJvbkxhYmVsVGFwIiwib25Db250cm9sVGFwIiwib25DYWxsb3V0VGFwIiwib25VcGRhdGVkIiwib25SZWdpb25DaGFuZ2UiLCJvblBvaVRhcCIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwic2NhbGUiLCJtYXJrZXJzIiwiY292ZXJzIiwicG9seWxpbmUiLCJjaXJjbGVzIiwiY29udHJvbHMiLCJpbmNsdWRlUG9pbnRzIiwic2hvd0xvY2F0aW9uIiwicG9seWdvbnMiLCJzdWJrZXkiLCJsYXllclN0eWxlIiwicm90YXRlIiwic2tldyIsImVuYWJsZTNEIiwic2hvd0NvbXBhc3MiLCJzaG93U2NhbGUiLCJlbmFibGVPdmVybG9va2luZyIsImVuYWJsZVpvb20iLCJlbmFibGVTY3JvbGwiLCJlbmFibGVSb3RhdGUiLCJlbmFibGVTYXRlbGxpdGUiLCJlbmFibGVUcmFmZmljIiwic2V0dGluZyIsImFycmF5IiwiUmVtaXhQaWNrZXIiLCJvbkNhbmNlbCIsIm9uQ2hhbmdlIiwib25Db2x1bW5DaGFuZ2UiLCJyYW5nZSIsInJhbmdlS2V5Iiwic3RhcnQiLCJlbmQiLCJmaWVsZHMiLCJjdXN0b21JdGVtIiwiUmVtaXhSb290IiwiUmVtaXhTY3JvbGxWaWV3Iiwib25TY3JvbGxUb1VwcGVyIiwib25TY3JvbGxUb0xvd2VyIiwib25TY3JvbGwiLCJzY3JvbGxYIiwic2Nyb2xsWSIsInVwcGVyVGhyZXNob2xkIiwibG93ZXJUaHJlc2hvbGQiLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsSW50b1ZpZXciLCJzY3JvbGxXaXRoQW5pbWF0aW9uIiwiZW5hYmxlQmFja1RvVG9wIiwiZW5hYmxlRmxleCIsInNjcm9sbEFuY2hvcmluZyIsIlJlbWl4U3dpcGVySXRlbSIsIml0ZW1JZCIsIlJlbWl4U3dpcGVyIiwib25BbmltYXRpb25GaW5pc2giLCJpbmRpY2F0b3JEb3RzIiwiaW5kaWNhdG9yQ29sb3IiLCJpbmRpY2F0b3JBY3RpdmVDb2xvciIsImF1dG9wbGF5IiwiY3VycmVudCIsImludGVydmFsIiwiZHVyYXRpb24iLCJjaXJjdWxhciIsInZlcnRpY2FsIiwicHJldmlvdXNNYXJnaW4iLCJuZXh0TWFyZ2luIiwiZGlzcGxheU11bHRpcGxlSXRlbXMiLCJza2lwSGlkZGVuSXRlbUxheW91IiwiZWFzaW5nRnVuY3Rpb24iLCJTd2lwZXJJdGVtIiwiUmVtaXhUZXh0Iiwic2VsZWN0YWJsZSIsInNwYWNlIiwiZGVjb2RlIiwiUmVtaXhWaWRlbyIsIm9uUGxheSIsIm9uUGF1c2UiLCJvbkVuZGVkIiwib25UaW1lVXBkYXRlIiwib25GdWxsU2NyZWVuQ2hhbmdlIiwib25XYWl0aW5nIiwib25Qcm9ncmVzcyIsIm9uTG9hZGVkTWV0YURhdGEiLCJkYW5tdUxpc3QiLCJkYW5tdUJ1dHRvbiIsImVuYWJsZURhbm11IiwibG9vcCIsIm11dGVkIiwiaW5pdGlhbFRpbWUiLCJwYWdlR2VzdHVyZSIsImRpcmVjdGlvbiIsInNob3dQcm9ncmVzcyIsInNob3dGdWxsc2NyZWVuQnV0dG9uIiwic2hvd1BsYXlCdXR0b24iLCJzaG93Q2VudGVyUGxheUJ1dHRvbiIsImVuYWJsZVByb2dyZXNzR2VzdHVyZSIsIm9iamVjdEZpdCIsInBvc3RlciIsInNob3dNdXRlQnV0dG9uIiwidGl0bGUiLCJwbGF5QnV0dG9uUG9zaXRpb24iLCJlbmFibGVQbGF5R2VzdHVyZSIsImF1dG9QYXVzZUlmTmF2aWdhdGUiLCJhdXRvUGF1c2VJZk9wZW5OYXRpdmUiLCJ2c2xpZGVHZXN0dXJlIiwidnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbiIsImFkVW5pdElkIiwiUmVtaXhWaWV3IiwiRWxlbWVudCIsInRhZ05hbWUiLCJub2RlVHlwZSIsImxhc3RDaGlsZCIsImdsb2JhbEVsZW1lbnRzIiwiZG9jdW1lbnQiLCJIVE1MQm9keUVsZW1lbnQiLCJCT0RZIiwiRUxFTUVOVF9OT0RFIiwiSFRNTEVsZW1lbnQiLCJIVE1MQnV0dG9uRWxlbWVudCIsIkJVVFRPTiIsImRlZmF1bHRQcm9wcyIsInJlc29sdmVEZWZhdWx0UHJvcHMiLCJ1bnJlc29sdmVkUHJvcHMiLCJwcm9wTmFtZSIsIlN0eWxlU2hlZXQiLCJzbGliaW5nIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiU3RyaW5nIiwic2VyaWFsaXplIiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiSFRNTEltYWdlRWxlbWVudCIsIklNQUdFIiwiSFRNTFBpY2tlckVsZW1lbnQiLCJQSUNLRVIiLCJIVE1MVmlld0VsZW1lbnQiLCJST09UIiwiSFRNTFN3aXBlckVsZW1lbnQiLCJTV0lQRVIiLCJIVE1MU3dpcGVySXRlbUVsZW1lbnQiLCJTV0lQRVJfSVRFTSIsIkhUTUxUZXh0RWxlbWVudCIsInRleHRDb250ZW50IiwiVEVYVCIsIk1BUCIsIklOUFVUIiwiUExBSU5fVEVYVCIsIlZJREVPIiwiUmVtaXhWaWRlb0VsZW1lbnQiLCJwcm9wZXJ0aWVzIiwiYWxpZ25Db250ZW50IiwiYWxpZ25JdGVtcyIsImFsaWduU2VsZiIsImFsbCIsImFuaW1hdGlvbiIsImFuaW1hdGlvbkRlbGF5IiwiYW5pbWF0aW9uRGlyZWN0aW9uIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJhbmltYXRpb25GaWxsTW9kZSIsImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50IiwiYW5pbWF0aW9uTmFtZSIsImFuaW1hdGlvblBsYXlTdGF0ZSIsImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uIiwiYXBwZWFyYW5jZSIsImJhY2tmYWNlVmlzaWJpbGl0eSIsImJhY2tncm91bmQiLCJiYWNrZ3JvdW5kQXR0YWNobWVudCIsImJhY2tncm91bmRCbGVuZE1vZGUiLCJiYWNrZ3JvdW5kQ2xpcCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRPcmlnaW4iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFNpemUiLCJib3JkZXIiLCJib3JkZXJCb3R0b20iLCJib3JkZXJCb3R0b21Db2xvciIsImJvcmRlckJvdHRvbUxlZnRSYWRpdXMiLCJib3JkZXJCb3R0b21SaWdodFJhZGl1cyIsImJvcmRlckJvdHRvbVN0eWxlIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJib3JkZXJDb2xsYXBzZSIsImJvcmRlckNvbG9yIiwiYm9yZGVySW1hZ2UiLCJib3JkZXJJbWFnZU91dHNldCIsImJvcmRlckltYWdlUmVwZWF0IiwiYm9yZGVySW1hZ2VTbGljZSIsImJvcmRlckltYWdlU291cmNlIiwiYm9yZGVySW1hZ2VXaWR0aCIsImJvcmRlckxlZnQiLCJib3JkZXJMZWZ0Q29sb3IiLCJib3JkZXJMZWZ0U3R5bGUiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJSaWdodCIsImJvcmRlclJpZ2h0Q29sb3IiLCJib3JkZXJSaWdodFN0eWxlIiwiYm9yZGVyUmlnaHRXaWR0aCIsImJvcmRlclNwYWNpbmciLCJib3JkZXJUb3AiLCJib3JkZXJUb3BDb2xvciIsImJvcmRlclRvcExlZnRSYWRpdXMiLCJib3JkZXJUb3BSaWdodFJhZGl1cyIsImJvcmRlclRvcFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJXaWR0aCIsImJveEFsaWduIiwiYm94RGlyZWN0aW9uIiwiYm94RmxleCIsImJveEZsZXhHcm91cCIsImJveExpbmVzIiwiYm94T3JkaW5hbEdyb3VwIiwiYm94T3JpZW50IiwiYm94UGFjayIsImJveFNoYWRvdyIsImJveFNpemluZyIsImNhcHRpb25TaWRlIiwiY2xlYXIiLCJjbGlwIiwiY29sdW1uQ291bnQiLCJjb2x1bW5GaWxsIiwiY29sdW1uR2FwIiwiY29sdW1uUnVsZSIsImNvbHVtblJ1bGVDb2xvciIsImNvbHVtblJ1bGVTdHlsZSIsImNvbHVtblJ1bGVXaWR0aCIsImNvbHVtblNwYW4iLCJjb2x1bW5XaWR0aCIsImNvbHVtbnMiLCJjb250ZW50IiwiY291bnRlckluY3JlbWVudCIsImNvdW50ZXJSZXNldCIsImRpc3BsYXkiLCJlbXB0eUNlbGxzIiwiZmlsdGVyIiwiZmxleCIsImZsZXhCYXNpcyIsImZsZXhEaXJlY3Rpb24iLCJmbGV4RmxvdyIsImZsZXhHcm93IiwiZmxleFNocmluayIsImZsZXhXcmFwIiwiZm9udCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRTaXplQWRqdXN0IiwiZm9udFN0cmV0Y2giLCJmb250U3R5bGUiLCJmb250VmFyaWFudCIsImZvbnRXZWlnaHQiLCJncmlkQ29sdW1ucyIsImdyaWRSb3dzIiwiaGFuZ2luZ1B1bmN0dWF0aW9uIiwiaGVpZ2h0IiwianVzdGlmeUNvbnRlbnQiLCJsZWZ0IiwibGV0dGVyU3BhY2luZyIsImxpbmVIZWlnaHQiLCJsaXN0U3R5bGUiLCJsaXN0U3R5bGVJbWFnZSIsImxpc3RTdHlsZVBvc2l0aW9uIiwibGlzdFN0eWxlVHlwZSIsIm1hcmdpbiIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsIm1hcmdpblRvcCIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwibWluSGVpZ2h0IiwibWluV2lkdGgiLCJuYXZEb3duIiwibmF2SW5kZXgiLCJuYXZMZWZ0IiwibmF2UmlnaHQiLCJuYXZVcCIsIm9wYWNpdHkiLCJvcmRlciIsIm91dGxpbmUiLCJvdXRsaW5lQ29sb3IiLCJvdXRsaW5lT2Zmc2V0Iiwib3V0bGluZVN0eWxlIiwib3V0bGluZVdpZHRoIiwib3ZlcmZsb3ciLCJvdmVyZmxvd1giLCJvdmVyZmxvd1kiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ1RvcCIsInBhZ2VCcmVha0FmdGVyIiwicGFnZUJyZWFrQmVmb3JlIiwicGFnZUJyZWFrSW5zaWRlIiwicGVyc3BlY3RpdmUiLCJwZXJzcGVjdGl2ZU9yaWdpbiIsInB1bmN0dWF0aW9uVHJpbSIsInF1b3RlcyIsInJlc2l6ZSIsInJpZ2h0Iiwicm90YXRpb24iLCJ0YWJTaXplIiwidGFibGVMYXlvdXQiLCJ0YXJnZXROYW1lIiwidGFyZ2V0TmV3IiwidGFyZ2V0UG9zaXRpb24iLCJ0ZXh0QWxpZ24iLCJ0ZXh0QWxpZ25MYXN0IiwidGV4dERlY29yYXRpb24iLCJ0ZXh0RGVjb3JhdGlvbkNvbG9yIiwidGV4dERlY29yYXRpb25MaW5lIiwidGV4dERlY29yYXRpb25TdHlsZSIsInRleHRJbmRlbnQiLCJ0ZXh0SnVzdGlmeSIsInRleHRPdXRsaW5lIiwidGV4dE92ZXJmbG93IiwidGV4dFNoYWRvdyIsInRleHRUcmFuc2Zvcm0iLCJ0ZXh0V3JhcCIsInRvcCIsInRyYW5zZm9ybSIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zZm9ybVN0eWxlIiwidHJhbnNpdGlvbiIsInRyYW5zaXRpb25EZWxheSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiIsInVuaWNvZGVCaWRpIiwidmVydGljYWxBbGlnbiIsInZpc2liaWxpdHkiLCJ3aGl0ZVNwYWNlIiwid2lkdGgiLCJ3b3JkQnJlYWsiLCJ3b3JkU3BhY2luZyIsIndvcmRXcmFwIiwiekluZGV4Iiwid3JpdGluZ01vZGUiLCJzaGVldCIsImlzQ2hhbmdlZCIsIm1hcCIsIlByb3h5Iiwic2V0IiwiZGF0YSIsImNyZWF0ZUNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJIVE1MUm9vdEVsZW1lbnQiLCJIVE1MVmlkZW9FbGVtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJ0ZXh0IiwiVEVYVF9OT0RFIiwiZmFrZURvY3VtZW50IiwiZmluZEVsZW1lbnQiLCJnZXRDb250YWluZXJFbGVtZW50cyIsImNvbnRhaW5lciIsImJvZHkiLCJnZXRFbGVtZW50QnlJZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYWxsYmFjayIsImNhcHR1cmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsImdldEFwcGxpY2F0aW9uIiwiUHJvZ3JhbSIsIkFwcCIsIl9fY29udGV4dF9fIiwidGFiQmFyIiwiaXRlbXMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJjb25maWciLCJyb290Q29udGFpbmVyIiwiX3JlYWN0Um9vdENvbnRhaW5lciIsImN1cnJlbnRGaWJlciIsIl9pbnRlcm5hbFJvb3QiLCJlbGVtZW50VHlwZSIsIm1lbW9pemVkUHJvcHMiLCJzdGF0ZU5vZGUiLCJSb3V0ZSIsImNvbXBvbmVudCIsInNpYmxpbmciLCJlbnYiLCJpc0RldlRvb2xSdW50aW1lIiwicm91dGUiLCJxdWVyeSIsImlzQXBwbGljYXRpb25MYXVuY2hlZCIsImFwcGxpY2F0aW9uTGF1bmNoZWRPcHRpb25zIiwidHJhbnNwb3J0cyIsImFwcCIsIm9uIiwidmlldyIsImxvYWQiLCJzZXREYXRhIiwiaW5pdCIsImN0cmwiLCJQYWdlIiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiLCJvblB1bGxEb3duUmVmcmVzaCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwic2hhcmVNZXNzYWdlIiwiVHJhbnNwb3J0IiwiZW1pdCIsImxhdW5jaCIsInBvc3QiLCJzaG93IiwiaGlkZSIsImVycm9yIiwiRXZlbnRFbWl0dGVyIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJyZW5kZXJlZCIsImVsZW1lbnRzIiwiYnViYmxlRXZlbnQiLCJFdmVudE9iamVjdCIsImV2ZW50IiwiX19vcmlnaW5hbF9ldmVudF9fIiwidG91Y2hlcyIsInRpbWVTdGFtcCIsImNoYW5nZWRUb3VjaGVzIiwiYnViYmxlcyIsImluY2x1ZGVzIiwiY2FuY2VsQnViYmxlIiwiVmlld0V2ZW50TWFuYWdlciIsImV2ZW50cyIsImN1cnJlbnRUYXJnZXQiLCJjYWxsRWxlbWVudE1ldGhvZCIsIm9uRGlzcGF0Y2giLCJmaWJlciIsIklOVEVSTkFMX0lOU1RBTkNFX0tFWSIsImlzUmVhY3RDb21wb25lbnQiLCJWaWV3TWFuYWdlciIsInZpZXdDb250cm9sbGVyIiwidmlld0NvbnRyb2xsZXJzIiwibG9nZ2VyIiwicmVkIiwib25SZWFkeSIsIl9fcm91dGVzX18iLCJMb2dpY1J1bnRpbWUiLCJwb3N0TWVzc2FnZSIsImNvZGUiLCJ2aWV3TWFuYWdlciIsIm9uQXBwbGljYXRpb25MYXVuY2giLCJvbkRpc2Nvbm5lY3QiLCJvbkFwcGxpY2F0aW9uRGlzY29ubmVjdGVkIiwic2VhcmNoIiwibG9jYXRpb24iLCJzbGljZSIsInFzIiwicGFyc2UiLCJjb25uZWN0IiwibG9naWMiLCJydW4iLCJOYXRpdmVSdW50aW1lIiwiY3JlYXRlQ29tbW9uQVBJUmVxdXN0IiwiYXBpIiwib25SZXF1ZXN0Iiwib25OYXZpZ2F0ZVRvIiwib25OYXZpZ2F0ZUJhY2siLCJvbkNvbm5lY3RTb2NrZXQiLCJ3eCIsImNvbXBsZXRlIiwicmVzIiwiTmF0aXZlU29ja2V0IiwidHJhbnNwb3J0IiwibWVzc2FnZSIsInNvY2tldCIsInNlbmQiLCJjb25uZWN0U29ja2V0Iiwib25PcGVuIiwicmVwbHkiLCJvbk1lc3NhZ2UiLCJvbkNsb3NlIiwib2ZmIiwiY3JlYXRlTmF0aXZlU29ja2V0IiwiVGVybWluYWxSdW50aW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnNwZWN0IiwicmVMYXVuY2giLCJ1cmwiLCJzaG93VGFiQmFyIiwiaGlkZUxvYWRpbmciLCJoaWRlVGFiQmFyIiwic2hvd0xvYWRpbmciLCJsYXVuY2hBcHBsaWNhdGlvbiIsInRoZW4iLCJydW50aW1lIiwidmlld0V2ZW50TWFuYWdlciIsImlzU3VjY2VzcyIsInRlc3QiLCJlcnJNc2ciLCJBUElUcmFuc3BvcnQiLCJjYWxsYmFja0lkIiwib25jZSIsImNyZWF0ZUNvbW1vblByb21pc2UiLCJjcmVhdGVMb2dpY1NvY2tldCIsIlR1bm5lbCIsIkFwcGxpY2F0aW9uVHJhbnNwb3J0IiwiTG9naWNTb2NrZXQiLCJvblNvY2tldE9wZW4iLCJvblNvY2tldE1lc3NhZ2UiLCJWaWV3Q29udHJvbGxlclRyYW5zcG9ydCIsIlZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlIiwiTElGRUNZQ0xFIiwiU0hBUkVfTUVTU0FHRSIsImNyZWF0ZUFwcGxpY2F0aW9uVHJhbnNwb3J0IiwiQXBwbGljYXRpb25UcmFuc3BvcnROYXRpdmUiLCJjcmVhdGVWaWV3Q29udHJvbGxlclRyYW5zcG9ydCIsImNyZWF0ZUFQSVRyYW5zcG9ydCIsIkFQSVRyYW5zcG9ydE5hdGl2ZSIsIlNvY2tldCIsInByb3RvY29scyIsIm9ubWVzc2FnZSIsIm9ub3BlbiIsIm9uY2xvc2UiLCJvbmVycm9yIiwiV2ViU29ja2V0IiwiTWVzc2FnZUVtaXR0ZXIiLCJjb25uZWN0ZWQiLCJKU09OIiwic3RyaW5naWZ5IiwicXVldWUiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwic2hpZnQiLCJqc29uIiwiZXJyIiwiU29ja2V0VHVubmVsIiwiZXZlbnROYW1lcyIsImVtaXR0ZXIiLCJOYXRpdmVUdW5uZWwiLCJpdGVyYXRlIiwidG9BcnJheSIsImNvdW50Iiwib25seSIsIkVNUFRZX0FSUkFZIiwidXBkYXRlciIsInN0YXRlIiwiRU1QVFlfT0JKRUNUIiwicmVmcyIsImVucXVldWVTZXRTdGF0ZSIsImVucXVldWVGb3JjZVVwZGF0ZSIsInNoaW0iLCJpc1JlcXVpcmVkIiwiYW55IiwiYXJyYXlPZiIsImluc3RhbmNlT2YiLCJvYmplY3RPZiIsIm9uZU9mVHlwZSIsInNoYXBlIiwiZXhhY3QiLCJjaGVja1Byb3BUeXBlcyIsIlB1cmVDb21wb25lbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJjdXJyZW50RGlzcGF0Y2hlciIsIlJlYWN0RWxlbWVudCIsInJlZiIsIm93bmVyIiwiJCR0eXBlb2YiLCJSRUFDVF9FTEVNRU5UX1RZUEUiLCJfb3duZXIiLCJjbG9uZUVsZW1lbnQiLCJzZWxmIiwic291cmNlIiwiQ2hpbGRyZW4iLCJ1c2VTdGF0ZSIsIlJlYWN0Q3VycmVudE93bmVyIiwic2V0U3RhdGUiLCJSZWFjdFJvb3QiLCJyZW5kZXJJbnRvQ29udGFpbmVyIiwicGFyZW50Q29tcG9uZW50IiwiUmVhY3RDdXJyZW50Um9vdEluc3RhbmNlIiwiQ09NTUVOVF9OT0RFIiwiRE9DVU1FTlRfTk9ERSIsIkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUiLCJoYXNTeW1ib2wiLCJSRUFDVF9QT1JUQUxfVFlQRSIsIlJFQUNUX0ZSQUdNRU5UX1RZUEUiLCJSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIiwiUkVBQ1RfUFJPRklMRVJfVFlQRSIsIlJFQUNUX1BST1ZJREVSX1RZUEUiLCJSRUFDVF9DT05URVhUX1RZUEUiLCJSRUFDVF9BU1lOQ19NT0RFX1RZUEUiLCJSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSIsIlJFQUNUX0ZPUldBUkRfUkVGX1RZUEUiLCJSRUFDVF9TVVNQRU5TRV9UWVBFIiwiUkVBQ1RfTUVNT19UWVBFIiwiUkVBQ1RfTEFaWV9UWVBFIiwicmFuZG9tS2V5IiwiQ0hJTERSRU4iLCJIVE1MIiwiU1RZTEUiLCJTVFlMRV9OQU1FX0ZMT0FUIiwiREFOR0VST1VTTFlfU0VUX0lOTkVSX0hUTUwiLCJJTlRFUk5BTF9FVkVOVF9IQU5ETEVSU19LRVkiLCJSRUFDVF9JTlRFUk5BTF9GSUJFUiIsIlJFQUNUX0lOVEVSTkFMX0lOU1RBTkNFIiwiTUVSR0VEX0NISUxEX0NPTlRFWFQiLCJNQVNLRURfQ0hJTERfQ09OVEVYVCIsIlVOTUFTS0VEX0NISUxEX0NPTlRFWFQiLCJFTVBUWV9DT05URVhUIiwiRU1QVFlfUkVGUyIsIkVYUElSRV9USU1FIiwiTk9fV09SSyIsIldPUktJTkciLCJhc3NpZ24iLCJrZXlzIiwic2hvdWxkU2V0VGV4dENvbnRlbnQiLCJzaGFsbG93RXF1YWwiLCJvYmplY3RBIiwib2JqZWN0QiIsImlzIiwia2V5c0EiLCJrZXlzQiIsImV4dGVuZCIsImNsb25lIiwiZmxhdHRlbiIsInJlc3VsdCIsImlzQXJyYXkiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImlzRnVuY3Rpb24iLCJpc1N0cmluZyIsImlzT2JqZWN0IiwiaXNOdW1iZXIiLCJpc051bGxPclVuZGVmaW5lZCIsImlzSW52YWxpZCIsImlzQ29tcG9uZW50Q29uc3RydWN0b3IiLCJwcm90byIsImlzTGVnYWN5Q29udGV4dENvbnN1bWVyIiwiY29udGV4dFR5cGVzIiwiaXNDb250ZXh0UHJvdmlkZXIiLCJjaGlsZENvbnRleHRUeXBlcyIsImlzSG9zdFBhcmVudCIsInRhZyIsIkhPU1RfQ09NUE9ORU5UIiwiSE9TVF9ST09UIiwiSE9TVF9QT1JUQUwiLCJ4IiwieSIsIkZVTkNUSU9OX0NPTVBPTkVOVCIsIkNMQVNTX0NPTVBPTkVOVCIsIklOREVURVJNSU5BVEVfQ09NUE9ORU5UIiwiSE9TVF9URVhUIiwiRlJBR01FTlQiLCJDT05URVhUX0NPTlNVTUVSIiwiQ09OVEVYVF9QUk9WSURFUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBLElBQU1RLFNBQVMsR0FBRyxDQUFsQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUcsQ0FBakI7O0FBRUEsSUFBTUMsZ0JBQWdCLEdBQUcsQ0FBekI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsRUFBekIiLCJmaWxlIjoicnVudGltZS92ZW5kb3IvbWFuaWZlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbDtcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nID8gUi5hcHBseSA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbn07XG52YXIgUmVmbGVjdE93bktleXM7XG5cbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXM7XG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7IC8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkOyAvLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuXG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHwgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07IC8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuXG4gIHZhciBkb0Vycm9yID0gdHlwZSA9PT0gJ2Vycm9yJztcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSBkb0Vycm9yID0gZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZDtlbHNlIGlmICghZG9FcnJvcikgcmV0dXJuIGZhbHNlOyAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkgZXIgPSBhcmdzWzBdO1xuXG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH0gLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuXG5cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTsgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuXG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdOyAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfSAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuXG5cbiAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuXG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTsgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICsgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID0gZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xufTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuXG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIFJlZmxlY3RBcHBseSh0aGlzLmxpc3RlbmVyLCB0aGlzLnRhcmdldCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0ge1xuICAgIGZpcmVkOiBmYWxzZSxcbiAgICB3cmFwRm46IHVuZGVmaW5lZCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGxpc3RlbmVyOiBsaXN0ZW5lclxuICB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID0gZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59OyAvLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuXG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XG4gIGxpc3QgPSBldmVudHNbdHlwZV07XG4gIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO2Vsc2Uge1xuICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApIHJldHVybiB0aGlzO1xuICAgIGlmIChwb3NpdGlvbiA9PT0gMCkgbGlzdC5zaGlmdCgpO2Vsc2Uge1xuICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICB9XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZCkgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7IC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcblxuICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtlbHNlIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG5cblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICB2YXIga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW107XG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW107XG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuICByZXR1cm4gdW53cmFwID8gdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5cbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIGNvcHlbaV0gPSBhcnJbaV07XG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuXG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICBpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcbiAgICBtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24gKCkge307XG5cbiAgICBtb2R1bGUucGF0aHMgPSBbXTsgLy8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cbiAgICBpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbW9kdWxlLmw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGUuaTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcbiAgfVxuXG4gIHJldHVybiBtb2R1bGU7XG59OyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLyoqKioqKi8gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbi8qKioqKiovIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gbnM7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKHtcblxuLyoqKi8gXCIuL2luZGV4LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQgKi8gXCIuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qc1wiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ09NTU9OID0gZXhwb3J0cy5BUEkgPSBleHBvcnRzLlZJRVcgPSBleHBvcnRzLkFQUExJQ0FUSU9OID0gZXhwb3J0cy5UeXBlID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjayAqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcyAqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eSAqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcIikpO1xuXG52YXIgX3V1aWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oLyohIHV1aWQgKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzXCIpKTtcblxudmFyIFR5cGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUeXBlKHR5cGUsIHZhbHVlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBUeXBlKTtcblxuICAgIGlmIChUeXBlLnR5cGVzW3ZhbHVlXSkge1xuICAgICAgcmV0dXJuIFR5cGUudHlwZXNbdmFsdWVdO1xuICAgIH1cblxuICAgIFR5cGUudHlwZXNbdmFsdWVdID0gdGhpcztcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnV1aWQgPSBfdXVpZFtcImRlZmF1bHRcIl0udjQoKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoVHlwZSwgW3tcbiAgICBrZXk6IFwidG9TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFR5cGU7XG59KCk7XG5cbmV4cG9ydHMuVHlwZSA9IFR5cGU7XG4oMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKFR5cGUsIFwidHlwZXNcIiwge30pO1xudmFyIGdldE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG5cbnZhciBkZWZpbmVOb3RpZmljYXRpb25UeXBlcyA9IGZ1bmN0aW9uIGRlZmluZU5vdGlmaWNhdGlvblR5cGVzKHByZWZpeCwgdHlwZXMpIHtcbiAgdmFyIG5hbWVzID0gZ2V0TmFtZXModHlwZXMpO1xuICB2YXIgdCA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbiAgfTtcbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHRbbmFtZV0gPSBuZXcgVHlwZShwcmVmaXgsIFwiXCIuY29uY2F0KHByZWZpeCwgXCIuXCIpLmNvbmNhdCh0eXBlc1tuYW1lXSkpO1xuICB9KTtcbiAgcmV0dXJuIHQ7XG59O1xuXG52YXIgQVBQTElDQVRJT04gPSBkZWZpbmVOb3RpZmljYXRpb25UeXBlcygnYXBwbGljYXRpb24nLCB7XG4gIExBVU5DSDogJ2xhdW5jaCcsXG4gIENPTk5FQ1Q6ICdjb25uZWN0JyxcbiAgSU5TUEVDVDogJ2luc3BlY3QnLFxuICBTSE9XOiAnc2hvdycsXG4gIEhJREU6ICdoaWRlJyxcbiAgRVJST1I6ICdlcnJvcidcbn0pO1xuZXhwb3J0cy5BUFBMSUNBVElPTiA9IEFQUExJQ0FUSU9OO1xudmFyIFZJRVcgPSBkZWZpbmVOb3RpZmljYXRpb25UeXBlcygndmlldycsIHtcbiAgTE9BRDogJ2xvYWQnLFxuICBSRUFEWTogJ3JlYWR5JyxcbiAgU0hPVzogJ3Nob3cnLFxuICBISURFOiAnaGlkZScsXG4gIEVWRU5UOiAnZXZlbnQnXG59KTtcbmV4cG9ydHMuVklFVyA9IFZJRVc7XG52YXIgQVBJID0gZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMoJ2FwaScsIHtcbiAgUkVRVUVTVDogJ3JlcXVlc3QnLFxuICBOQVZJR0FURV9UTzogJ25hdmlnYXRlVG8nLFxuICBOQVZJR0FURV9CQUNLOiAnbmF2aWdhdGVCYWNrJyxcbiAgQ09OTkVDVF9TT0NLRVQ6ICdjb25uZWN0U29ja2V0JyxcbiAgU09DS0VUX09QRU46ICdzb2NrZXRPcGVuJyxcbiAgU09DS0VUX01FU1NBR0U6ICdzb2NrZXRNZXNzYWdlJ1xufSk7XG5leHBvcnRzLkFQSSA9IEFQSTtcbnZhciBDT01NT04gPSBkZWZpbmVOb3RpZmljYXRpb25UeXBlcygnY29tbW9uJywge1xuICBDQUxMQkFDSzogJ2NhbGxiYWNrJ1xufSk7XG5leHBvcnRzLkNPTU1PTiA9IENPTU1PTjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjaztcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdjEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3YxICovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qc1wiKTtcbnZhciB2NCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vdjQgKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzXCIpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW2J0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1dKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHJuZyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbGliL3JuZyAqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzXCIpO1xudmFyIGJ5dGVzVG9VdWlkID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9saWIvYnl0ZXNUb1V1aWQgKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qc1wiKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcm5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9saWIvcm5nICovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanNcIik7XG52YXIgYnl0ZXNUb1V1aWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2xpYi9ieXRlc1RvVXVpZCAqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzXCIpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm90b2NvbC5qcy5tYXAiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mMihvYmopO1xufVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJleHBvcnQgY29uc3QgaXNJbnNwZWN0TW9kZSA9IHByb2Nlc3MuZW52LklTX0lOU1BFQ1RfTU9ERTtcbmV4cG9ydCBjb25zdCBpbnNwZWN0V1NVUkwgPSBwcm9jZXNzLmVudi5JTlNQRUNUX1dTX1VSTDtcbmV4cG9ydCBjb25zdCBpbnRlcm5hbFVJVVJMID0gcHJvY2Vzcy5lbnYuSU5TUEVDVF9VSV9VUkw7XG5leHBvcnQgY29uc3QgaW5zcGVjdE1lc3NhZ2VUeXBlcyA9IHByb2Nlc3MuZW52LklOU0VQQ1RfTUVTU0FHRV9UWVBFUztcbmV4cG9ydCBjb25zdCBpbnNwZWN0VGVybWluYWxUeXBlcyA9IHByb2Nlc3MuZW52LklOU1BFQ1RfVEVSTUlOQUxfVFlQRVM7XG5leHBvcnQgY29uc3QgaW5zcGVjdFRlcm1pbmFsVVVJRCA9IHByb2Nlc3MuZW52LklOU1BFQ1RfVEVSTUlOQUxfVVVJRDtcbmV4cG9ydCBjb25zdCBpbnNwZWN0TG9naWNVVUlEID0gcHJvY2Vzcy5lbnYuSU5TUEVDVF9MT0dJQ19VVUlEO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzSW5zcGVjdE1vZGUsXG4gIGluc3BlY3RXU1VSTCxcbiAgaW50ZXJuYWxVSVVSTCxcbiAgaW5zcGVjdE1lc3NhZ2VUeXBlcyxcbiAgaW5zcGVjdFRlcm1pbmFsVHlwZXMsXG4gIGluc3BlY3RUZXJtaW5hbFVVSUQsXG4gIGluc3BlY3RMb2dpY1VVSURcbn0iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwidmFyIHN1cGVyUHJvcEJhc2UgPSByZXF1aXJlKFwiLi9zdXBlclByb3BCYXNlXCIpO1xuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldDsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuICBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGNhY2hlO1xuICB9O1xuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7XG4gIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7XG5cbiAgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuICB9XG5cbiAgdmFyIG5ld09iaiA9IHt9O1xuXG4gIGlmIChvYmogIT0gbnVsbCkge1xuICAgIHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsO1xuXG4gICAgICAgIGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqO1xuXG4gIGlmIChjYWNoZSkge1xuICAgIGNhY2hlLnNldChvYmosIG5ld09iaik7XG4gIH1cblxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2dldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3N1cGVyUHJvcEJhc2U7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mMihvYmopO1xufVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBGb3JtYXQgPSB7XG4gIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xubW9kdWxlLmV4cG9ydHMgPSB1dGlsLmFzc2lnbih7XG4gICdkZWZhdWx0JzogRm9ybWF0LlJGQzM5ODYsXG4gIGZvcm1hdHRlcnM6IHtcbiAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICB9LFxuICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG59LCBGb3JtYXQpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG5cbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcblxudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZvcm1hdHM6IGZvcm1hdHMsXG4gIHBhcnNlOiBwYXJzZSxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGRlZmF1bHRzID0ge1xuICBhbGxvd0RvdHM6IGZhbHNlLFxuICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICBhcnJheUxpbWl0OiAyMCxcbiAgY2hhcnNldDogJ3V0Zi04JyxcbiAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgY29tbWE6IGZhbHNlLFxuICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gIGRlbGltaXRlcjogJyYnLFxuICBkZXB0aDogNSxcbiAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IGZhbHNlLFxuICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgcGFyc2VBcnJheXM6IHRydWUsXG4gIHBsYWluT2JqZWN0czogZmFsc2UsXG4gIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICB9KTtcbn07IC8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSDinJMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUg4pyTIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cblxuXG52YXIgaXNvU2VudGluZWwgPSAndXRmOD0lMjYlMjMxMDAwMyUzQic7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKVxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG5cbnZhciBjaGFyc2V0U2VudGluZWwgPSAndXRmOD0lRTIlOUMlOTMnOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gIHZhciBza2lwSW5kZXggPSAtMTsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUgdXRmOCBzZW50aW5lbCB3YXMgZm91bmRcblxuICB2YXIgaTtcbiAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG5cbiAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgIH1cblxuICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICBpID0gcGFydHMubGVuZ3RoOyAvLyBUaGUgZXNsaW50IHNldHRpbmdzIGRvIG5vdCBhbGxvdyBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaSA9PT0gc2tpcEluZGV4KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG4gICAgdmFyIGtleSwgdmFsO1xuXG4gICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICB2YWwgPSBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA/IG51bGwgOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgdmFsID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UocG9zICsgMSksIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICd2YWx1ZScpO1xuICAgIH1cblxuICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICB9XG5cbiAgICBpZiAodmFsICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICB2YWwgPSB2YWwuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucykge1xuICB2YXIgbGVhZiA9IHZhbDtcblxuICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICB2YXIgb2JqO1xuICAgIHZhciByb290ID0gY2hhaW5baV07XG5cbiAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG5cbiAgICAgIGlmICghb3B0aW9ucy5wYXJzZUFycmF5cyAmJiBjbGVhblJvb3QgPT09ICcnKSB7XG4gICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAwOiBsZWFmXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKCFpc05hTihpbmRleCkgJiYgcm9vdCAhPT0gY2xlYW5Sb290ICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdCAmJiBpbmRleCA+PSAwICYmIG9wdGlvbnMucGFyc2VBcnJheXMgJiYgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KSB7XG4gICAgICAgIG9iaiA9IFtdO1xuICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZWFmID0gb2JqO1xuICB9XG5cbiAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucykge1xuICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuXG5cbiAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5OyAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7IC8vIEdldCB0aGUgcGFyZW50XG5cbiAgdmFyIHNlZ21lbnQgPSBvcHRpb25zLmRlcHRoID4gMCAmJiBicmFja2V0cy5leGVjKGtleSk7XG4gIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5OyAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gIHZhciBrZXlzID0gW107XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAga2V5cy5wdXNoKHBhcmVudCk7XG4gIH0gLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cblxuICB2YXIgaSA9IDA7XG5cbiAgd2hpbGUgKG9wdGlvbnMuZGVwdGggPiAwICYmIChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgIGkgKz0gMTtcblxuICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gIH0gLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG5cbiAgaWYgKHNlZ21lbnQpIHtcbiAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxudmFyIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKSB7XG4gIGlmICghb3B0cykge1xuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfVxuXG4gIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIGNoYXJzZXQgPSB0eXBlb2Ygb3B0cy5jaGFyc2V0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmNoYXJzZXQgOiBvcHRzLmNoYXJzZXQ7XG4gIHJldHVybiB7XG4gICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IHR5cGVvZiBvcHRzLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXMsXG4gICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgIGRlY29kZXI6IHR5cGVvZiBvcHRzLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyLFxuICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRzLmRlbGltaXRlcikgPyBvcHRzLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcixcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgIGRlcHRoOiB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgfHwgb3B0cy5kZXB0aCA9PT0gZmFsc2UgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBvcHRzLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogdHlwZW9mIG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID09PSAnYm9vbGVhbicgPyBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA6IGRlZmF1bHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyxcbiAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgIHBhcnNlQXJyYXlzOiBvcHRzLnBhcnNlQXJyYXlzICE9PSBmYWxzZSxcbiAgICBwbGFpbk9iamVjdHM6IHR5cGVvZiBvcHRzLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHMsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cyk7XG5cbiAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICB9XG5cbiAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTsgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkge1xuICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICB9LFxuICBjb21tYTogJ2NvbW1hJyxcbiAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkge1xuICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gIH0sXG4gIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkge1xuICAgIHJldHVybiBwcmVmaXg7XG4gIH1cbn07XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuXG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xudmFyIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkZFF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgY2hhcnNldDogJ3V0Zi04JyxcbiAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgZGVsaW1pdGVyOiAnJicsXG4gIGVuY29kZTogdHJ1ZSxcbiAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tkZWZhdWx0Rm9ybWF0XSxcbiAgLy8gZGVwcmVjYXRlZFxuICBpbmRpY2VzOiBmYWxzZSxcbiAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7XG4gICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gIH0sXG4gIHNraXBOdWxsczogZmFsc2UsXG4gIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpc05vbk51bGxpc2hQcmltaXRpdmUgPSBmdW5jdGlvbiBpc05vbk51bGxpc2hQcmltaXRpdmUodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2ID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiB2ID09PSAnc3ltYm9sJyB8fCB0eXBlb2YgdiA9PT0gJ2JpZ2ludCc7XG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG9iamVjdCwgcHJlZml4LCBnZW5lcmF0ZUFycmF5UHJlZml4LCBzdHJpY3ROdWxsSGFuZGxpbmcsIHNraXBOdWxscywgZW5jb2RlciwgZmlsdGVyLCBzb3J0LCBhbGxvd0RvdHMsIHNlcmlhbGl6ZURhdGUsIGZvcm1hdHRlciwgZW5jb2RlVmFsdWVzT25seSwgY2hhcnNldCkge1xuICB2YXIgb2JqID0gb2JqZWN0O1xuXG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgb2JqID0gb2JqLmpvaW4oJywnKTtcbiAgfVxuXG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JykgOiBwcmVmaXg7XG4gICAgfVxuXG4gICAgb2JqID0gJyc7XG4gIH1cblxuICBpZiAoaXNOb25OdWxsaXNoUHJpbWl0aXZlKG9iaikgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ3ZhbHVlJykpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gIH1cblxuICB2YXIgdmFsdWVzID0gW107XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHZhciBvYmpLZXlzO1xuXG4gIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICBvYmpLZXlzID0gZmlsdGVyO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KG9ialtrZXldLCB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LCBnZW5lcmF0ZUFycmF5UHJlZml4LCBzdHJpY3ROdWxsSGFuZGxpbmcsIHNraXBOdWxscywgZW5jb2RlciwgZmlsdGVyLCBzb3J0LCBhbGxvd0RvdHMsIHNlcmlhbGl6ZURhdGUsIGZvcm1hdHRlciwgZW5jb2RlVmFsdWVzT25seSwgY2hhcnNldCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShvYmpba2V5XSwgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksIGdlbmVyYXRlQXJyYXlQcmVmaXgsIHN0cmljdE51bGxIYW5kbGluZywgc2tpcE51bGxzLCBlbmNvZGVyLCBmaWx0ZXIsIHNvcnQsIGFsbG93RG90cywgc2VyaWFsaXplRGF0ZSwgZm9ybWF0dGVyLCBlbmNvZGVWYWx1ZXNPbmx5LCBjaGFyc2V0KSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gIGlmICghb3B0cykge1xuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfVxuXG4gIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuXG4gIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcblxuICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgfVxuXG4gIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcblxuICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgY2hhcnNldDogY2hhcnNldCxcbiAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXIsXG4gICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgIHNvcnQ6IHR5cGVvZiBvcHRzLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNvcnQgOiBudWxsLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gIHZhciBvYmogPSBvYmplY3Q7XG4gIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcbiAgdmFyIG9iaktleXM7XG4gIHZhciBmaWx0ZXI7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gIH1cblxuICB2YXIga2V5cyA9IFtdO1xuXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YXIgYXJyYXlGb3JtYXQ7XG5cbiAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICBhcnJheUZvcm1hdCA9IG9wdHMuYXJyYXlGb3JtYXQ7XG4gIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gIH0gZWxzZSB7XG4gICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gIH1cblxuICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgaWYgKCFvYmpLZXlzKSB7XG4gICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIH1cblxuICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgIGlmIChvcHRpb25zLnNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcHVzaFRvQXJyYXkoa2V5cywgc3RyaW5naWZ5KG9ialtrZXldLCBrZXksIGdlbmVyYXRlQXJyYXlQcmVmaXgsIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLCBvcHRpb25zLnNraXBOdWxscywgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLCBvcHRpb25zLmZpbHRlciwgb3B0aW9ucy5zb3J0LCBvcHRpb25zLmFsbG93RG90cywgb3B0aW9ucy5zZXJpYWxpemVEYXRlLCBvcHRpb25zLmZvcm1hdHRlciwgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LCBvcHRpb25zLmNoYXJzZXQpKTtcbiAgfVxuXG4gIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgIGlmIChvcHRpb25zLmNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpLCB0aGUgXCJudW1lcmljIGVudGl0eVwiIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlY2ttYXJrXG4gICAgICBwcmVmaXggKz0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0ImJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufSgpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICBpZiAoIXNvdXJjZSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICB9XG5cbiAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuXG4gIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG5cbiAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG5cbiAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgfSAvLyB1dGYtOFxuXG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0KSB7XG4gIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2YXIgc3RyaW5nID0gc3RyO1xuXG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3ltYm9sJykge1xuICAgIHN0cmluZyA9IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdHIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gU3RyaW5nKHN0cik7XG4gIH1cblxuICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIG91dCA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChjID09PSAweDJEIC8vIC1cbiAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICB8fCBjID49IDB4MzAgJiYgYyA8PSAweDM5IC8vIDAtOVxuICAgIHx8IGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEgLy8gYS16XG4gICAgfHwgYyA+PSAweDYxICYmIGMgPD0gMHg3QSAvLyBBLVpcbiAgICApIHtcbiAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgYyA+PiA2XSArIGhleFRhYmxlWzB4ODAgfCBjICYgMHgzRl0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgYyA+PiAxMl0gKyBoZXhUYWJsZVsweDgwIHwgYyA+PiA2ICYgMHgzRl0gKyBoZXhUYWJsZVsweDgwIHwgYyAmIDB4M0ZdKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGkgKz0gMTtcbiAgICBjID0gMHgxMDAwMCArICgoYyAmIDB4M0ZGKSA8PCAxMCB8IHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpO1xuICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgYyA+PiAxOF0gKyBoZXhUYWJsZVsweDgwIHwgYyA+PiAxMiAmIDB4M0ZdICsgaGV4VGFibGVbMHg4MCB8IGMgPj4gNiAmIDB4M0ZdICsgaGV4VGFibGVbMHg4MCB8IGMgJiAweDNGXTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgdmFyIHF1ZXVlID0gW3tcbiAgICBvYmo6IHtcbiAgICAgIG86IHZhbHVlXG4gICAgfSxcbiAgICBwcm9wOiAnbydcbiAgfV07XG4gIHZhciByZWZzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgICAgb2JqOiBvYmosXG4gICAgICAgICAgcHJvcDoga2V5XG4gICAgICAgIH0pO1xuICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wYWN0UXVldWUocXVldWUpO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgYXNzaWduOiBhc3NpZ24sXG4gIGNvbWJpbmU6IGNvbWJpbmUsXG4gIGNvbXBhY3Q6IGNvbXBhY3QsXG4gIGRlY29kZTogZGVjb2RlLFxuICBlbmNvZGU6IGVuY29kZSxcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gIG1lcmdlOiBtZXJnZVxufTsiLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG5cbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcbm1vZHVsZS5leHBvcnRzID0gdXVpZDsiLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4OyAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuXG4gIHJldHVybiBbYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJywgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59IiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xuXG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpOyAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cblxudmFyIF9ub2RlSWQ7XG5cbnZhciBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG5cbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW3NlZWRCeXRlc1swXSB8IDB4MDEsIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXTtcbiAgICB9XG5cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH0gLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG5cblxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICB2YXIgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwOyAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG5cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfSAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG5cblxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfSAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG5cblxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTsgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG5cbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7IC8vIGB0aW1lX2xvd2BcblxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmOyAvLyBgdGltZV9taWRgXG5cbiAgdmFyIHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTsiLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG5cbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0OyIsImV4cG9ydCAqIGZyb20gJy4vc3JjL3Byb2plY3QnOyIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJy4uL3JlYWN0JztcbmltcG9ydCBjbG9uZUVsZW1lbnQgZnJvbSAnLi4vcmVhY3QvY2xvbmVFbGVtZW50JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vcmVhY3QvQ29tcG9uZW50JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vcmVhY3QvUHJvcFR5cGVzJztcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tICcuLi9yZWFjdC9DaGlsZHJlbic7XG4vLyBpbXBvcnQgeyB0cmFuc3BvcnRzLCBBUFBMSUNBVElPTiB9IGZyb20gJy4uL3Byb2plY3QnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCBUYWJCYXIgZnJvbSAnLi9UYWJCYXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25MYXVuY2g6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkxhdW5jaDogbm9vcFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgLy8gdHJhbnNwb3J0cy5hcHAub24odGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVuTW91bnQgKCkge1xuICAgIC8vIHRyYW5zcG9ydHMuYXBwLm9mZih0aGlzLm9uTWVzc2FnZSk7XG4gIH1cblxuICBvbk1lc3NhZ2UgPSAodHlwZSwgYXJndikgPT4ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBBUFBMSUNBVElPTi5MQVVOQ0g6IHtcbiAgICAgICAgY29uc3QgeyBvbkxhdW5jaCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBvbkxhdW5jaC5hcHBseSh0aGlzLCBhcmd2KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cblxuICAgIH1cbiAgfVxuICBcbiAgY2xvbmVBcHBsaWNhdGlvbkNoaWxkcmVuICgpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuICAgIFxuICAgIGZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGNoaWxkKSkge1xuICAgICAgICBjb25zdCB7IHR5cGUgfSA9IGNoaWxkO1xuICAgICAgICBpZiAodHlwZSA9PT0gUm91dGVyIHx8IHR5cGUgPT09IFRhYkJhcikge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dmlldz57dGhpcy5jbG9uZUFwcGxpY2F0aW9uQ2hpbGRyZW4oKX08L3ZpZXc+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSZWFjdCBmcm9tICcuLi9yZWFjdCc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL3JlYWN0L0NvbXBvbmVudCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cbmNsYXNzIFRhYkJhckl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RlZEljb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmdcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIDx2aWV3Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvdmlldz5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgVGFiQmFySXRlbSA9IFRhYkJhckl0ZW07XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWRDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYm9yZGVyU3R5bGU6IFByb3BUeXBlcy5vbmVPZihbJ2JsYWNrJywgJ3doaXRlJ10pLFxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydib3R0b20nLCAndG9wJ10pLFxuICAgIGN1c3RvbTogUHJvcFR5cGVzLmJvb2xcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgIGJvdHRvbTogZmFsc2VcbiAgfVxuICBcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gPHZpZXc+e3RoaXMucHJvcHMuY2hpbGRyZW59PC92aWV3PlxuICB9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJy4uL3JlYWN0JztcbmltcG9ydCBjbG9uZUVsZW1lbnQgZnJvbSAnLi4vcmVhY3QvY2xvbmVFbGVtZW50JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vcmVhY3QvQ29tcG9uZW50JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vcmVhY3QvUHJvcFR5cGVzJztcbmltcG9ydCBub3RpZmljYXRpb24sIHsgQVBQTElDQVRJT04sIFZJRVcgfSBmcm9tICcuLi9wcm9qZWN0L25vdGlmaWNhdGlvbic7XG5cbmNvbnN0IHsgZGVmaW5lUHJvcGVydHkgfSA9IE9iamVjdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbnRyb2xsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge307XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7fTtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNvbnRleHQpIHtcbiAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTXVzdCBiZSBpbXBsYXRhdGVkYCk7XG4gIH1cbn0iLCJpbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgVmlld0NvbnRyb2xsZXIgZnJvbSAnLi9WaWV3Q29udHJvbGxlcidcbmltcG9ydCBUYWJCYXIgZnJvbSAnLi9UYWJCYXInO1xuXG5pbXBvcnQgUm9vdCBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtcm9vdCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtdmlldyc7XG5pbXBvcnQgVGV4dCBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtdGV4dCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LWltYWdlJztcbmltcG9ydCBJbnB1dCBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtaW5wdXQnO1xuaW1wb3J0IE1hcCBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtbWFwJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LWJ1dHRvbic7XG5pbXBvcnQgUGlja2VyIGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC1waWNrZXInO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXNjcm9sbC12aWV3JztcbmltcG9ydCBTd2lwZXIgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXN3aXBlcic7XG5pbXBvcnQgU3dpcGVySXRlbSBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtc3dpcGVyLWl0ZW0nO1xuaW1wb3J0IFZpZGVvIGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC12aWRlbyc7XG5cbmV4cG9ydCB7XG4gIEFwcGxpY2F0aW9uLFxuICBWaWV3Q29udHJvbGxlcixcbiAgVGFiQmFyLFxuICBSb290LFxuICBWaWV3LFxuICBUZXh0LFxuICBJbWFnZSxcbiAgQnV0dG9uLFxuICBNYXAsXG4gIElucHV0LFxuICBQaWNrZXIsXG4gIFN3aXBlcixcbiAgU3dpcGVySXRlbSxcbiAgU2Nyb2xsVmlldyxcbiAgVmlkZW9cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4QnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uR2V0VXNlckluZm86IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Db250YWN0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uR2V0UGhvbmVOdW1iZXI6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25PcGVuU2V0dGluZzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxhdW5jaEFwcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0cGxhaW46IFByb3BUeXBlcy5ib29sLFxuXHRcdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRmb3JtVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcGVuVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRob3ZlckNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRob3ZlclN0YXJ0VGltZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRob3ZlclN0YXlUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGxhbmc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2Vzc2lvbkZyb206IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2VuZE1lc3NhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZW5kTWVzc2FnZVBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2VuZE1lc3NhZ2VJbWc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0YXBwUGFyYW1ldGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNob3dNZXNzYWdlQ2FyZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvbkdldFVzZXJJbmZvOiBudWxsLFxuXHRcdG9uQ29udGFjdDogbnVsbCxcblx0XHRvbkdldFBob25lTnVtYmVyOiBudWxsLFxuXHRcdG9uT3BlblNldHRpbmc6IG51bGwsXG5cdFx0b25MYXVuY2hBcHA6IG51bGwsXG5cdFx0b25FcnJvcjogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0c2l6ZTogJ2RlZmF1bHQnLFxuXHRcdHR5cGU6ICdkZWZhdWx0Jyxcblx0XHRwbGFpbjogZmFsc2UsXG5cdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdGxvYWRpbmc6IGZhbHNlLFxuXHRcdGZvcm1UeXBlOiBudWxsLFxuXHRcdG9wZW5UeXBlOiBudWxsLFxuXHRcdGhvdmVyQ2xhc3M6ICdidXR0b24taG92ZXInLFxuXHRcdGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcblx0XHRob3ZlclN0YXJ0VGltZTogMjAsXG5cdFx0aG92ZXJTdGF5VGltZTogNzAsXG5cdFx0bGFuZzogJ2VuJyxcblx0XHRzZXNzaW9uRnJvbTogbnVsbCxcblx0XHRzZW5kTWVzc2FnZVRpdGxlOiBudWxsLFxuXHRcdHNlbmRNZXNzYWdlUGF0aDogbnVsbCxcblx0XHRzZW5kTWVzc2FnZUltZzogbnVsbCxcblx0XHRhcHBQYXJhbWV0ZXI6IG51bGwsXG5cdFx0c2hvd01lc3NhZ2VDYXJkOiBudWxsLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkdldFVzZXJJbmZvIChlKSB7IFxuXHRcdGNvbnN0IHsgb25HZXRVc2VySW5mbyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uR2V0VXNlckluZm8gPT09ICdmdW5jdGlvbicpIHsgb25HZXRVc2VySW5mbyhlKTsgfSBcblx0fVxuXG5cdG9uQ29udGFjdCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ29udGFjdCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ29udGFjdCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNvbnRhY3QoZSk7IH0gXG5cdH1cblxuXHRvbkdldFBob25lTnVtYmVyIChlKSB7IFxuXHRcdGNvbnN0IHsgb25HZXRQaG9uZU51bWJlciB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uR2V0UGhvbmVOdW1iZXIgPT09ICdmdW5jdGlvbicpIHsgb25HZXRQaG9uZU51bWJlcihlKTsgfSBcblx0fVxuXG5cdG9uT3BlblNldHRpbmcgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbk9wZW5TZXR0aW5nIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25PcGVuU2V0dGluZyA9PT0gJ2Z1bmN0aW9uJykgeyBvbk9wZW5TZXR0aW5nKGUpOyB9IFxuXHR9XG5cblx0b25MYXVuY2hBcHAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxhdW5jaEFwcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTGF1bmNoQXBwID09PSAnZnVuY3Rpb24nKSB7IG9uTGF1bmNoQXBwKGUpOyB9IFxuXHR9XG5cblx0b25FcnJvciAoZSkgeyBcblx0XHRjb25zdCB7IG9uRXJyb3IgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkVycm9yID09PSAnZnVuY3Rpb24nKSB7IG9uRXJyb3IoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uR2V0VXNlckluZm8sIG9uQ29udGFjdCwgb25HZXRQaG9uZU51bWJlciwgb25PcGVuU2V0dGluZywgb25MYXVuY2hBcHAsIG9uRXJyb3IsIHN0eWxlLCBjbGFzc05hbWUsIHNpemUsIHR5cGUsIHBsYWluLCBkaXNhYmxlZCwgbG9hZGluZywgZm9ybVR5cGUsIG9wZW5UeXBlLCBob3ZlckNsYXNzLCBob3ZlclN0b3BQcm9wYWdhdGlvbiwgaG92ZXJTdGFydFRpbWUsIGhvdmVyU3RheVRpbWUsIGxhbmcsIHNlc3Npb25Gcm9tLCBzZW5kTWVzc2FnZVRpdGxlLCBzZW5kTWVzc2FnZVBhdGgsIHNlbmRNZXNzYWdlSW1nLCBhcHBQYXJhbWV0ZXIsIHNob3dNZXNzYWdlQ2FyZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8YnV0dG9uIG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IG9uR2V0VXNlckluZm89e29uR2V0VXNlckluZm8gPyAnb25HZXRVc2VySW5mbycgOiAnJ30gb25Db250YWN0PXtvbkNvbnRhY3QgPyAnb25Db250YWN0JyA6ICcnfSBvbkdldFBob25lTnVtYmVyPXtvbkdldFBob25lTnVtYmVyID8gJ29uR2V0UGhvbmVOdW1iZXInIDogJyd9IG9uT3BlblNldHRpbmc9e29uT3BlblNldHRpbmcgPyAnb25PcGVuU2V0dGluZycgOiAnJ30gb25MYXVuY2hBcHA9e29uTGF1bmNoQXBwID8gJ29uTGF1bmNoQXBwJyA6ICcnfSBvbkVycm9yPXtvbkVycm9yID8gJ29uRXJyb3InIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHNpemU9e3NpemV9IHR5cGU9e3R5cGV9IHBsYWluPXtwbGFpbn0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBsb2FkaW5nPXtsb2FkaW5nfSBmb3JtVHlwZT17Zm9ybVR5cGV9IG9wZW5UeXBlPXtvcGVuVHlwZX0gaG92ZXJDbGFzcz17aG92ZXJDbGFzc30gaG92ZXJTdG9wUHJvcGFnYXRpb249e2hvdmVyU3RvcFByb3BhZ2F0aW9ufSBob3ZlclN0YXJ0VGltZT17aG92ZXJTdGFydFRpbWV9IGhvdmVyU3RheVRpbWU9e2hvdmVyU3RheVRpbWV9IGxhbmc9e2xhbmd9IHNlc3Npb25Gcm9tPXtzZXNzaW9uRnJvbX0gc2VuZE1lc3NhZ2VUaXRsZT17c2VuZE1lc3NhZ2VUaXRsZX0gc2VuZE1lc3NhZ2VQYXRoPXtzZW5kTWVzc2FnZVBhdGh9IHNlbmRNZXNzYWdlSW1nPXtzZW5kTWVzc2FnZUltZ30gYXBwUGFyYW1ldGVyPXthcHBQYXJhbWV0ZXJ9IHNob3dNZXNzYWdlQ2FyZD17c2hvd01lc3NhZ2VDYXJkfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2J1dHRvbj47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4SW1hZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaENhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1ByZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb2FkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uRXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNyYzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb2RlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHdlYnA6IFByb3BUeXBlcy5ib29sLFxuXHRcdGxhenlMb2FkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzaG93TWVudUJ5TG9uZ3ByZXNzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvbkxvYWQ6IG51bGwsXG5cdFx0b25FcnJvcjogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0c3JjOiBudWxsLFxuXHRcdG1vZGU6ICdzY2FsZVRvRmlsbCcsXG5cdFx0d2VicDogZmFsc2UsXG5cdFx0bGF6eUxvYWQ6IGZhbHNlLFxuXHRcdHNob3dNZW51QnlMb25ncHJlc3M6IGZhbHNlLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkxvYWQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvYWQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvYWQgPT09ICdmdW5jdGlvbicpIHsgb25Mb2FkKGUpOyB9IFxuXHR9XG5cblx0b25FcnJvciAoZSkgeyBcblx0XHRjb25zdCB7IG9uRXJyb3IgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkVycm9yID09PSAnZnVuY3Rpb24nKSB7IG9uRXJyb3IoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uTG9hZCwgb25FcnJvciwgc3R5bGUsIGNsYXNzTmFtZSwgc3JjLCBtb2RlLCB3ZWJwLCBsYXp5TG9hZCwgc2hvd01lbnVCeUxvbmdwcmVzcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8aW1hZ2Ugb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gb25Mb2FkPXtvbkxvYWQgPyAnb25Mb2FkJyA6ICcnfSBvbkVycm9yPXtvbkVycm9yID8gJ29uRXJyb3InIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHNyYz17c3JjfSBtb2RlPXttb2RlfSB3ZWJwPXt3ZWJwfSBsYXp5TG9hZD17bGF6eUxvYWR9IHNob3dNZW51QnlMb25ncHJlc3M9e3Nob3dNZW51QnlMb25ncHJlc3N9PjwvaW1hZ2U+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uSW5wdXQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Gb2N1czogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkJsdXI6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Db25maXJtOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0cGFzc3dvcmQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHBsYWNlaG9sZGVyU3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0cGxhY2Vob2xkZXJDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bWF4bGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGN1cnNvclNwYWNpbmc6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0YXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRmb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y29uZmlybVR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y29uZmlybUhvbGQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzZWxlY3Rpb25TdGFydDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzZWxlY3Rpb25FbmQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0YWRqdXN0UG9zaXRpb246IFByb3BUeXBlcy5ib29sLFxuXHRcdGhvbGRLZXlib2FyZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25JbnB1dDogbnVsbCxcblx0XHRvbkZvY3VzOiBudWxsLFxuXHRcdG9uQmx1cjogbnVsbCxcblx0XHRvbkNvbmZpcm06IG51bGwsXG5cdFx0b25LZXlib2FyZEhlaWdodENoYW5nZTogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0dmFsdWU6IG51bGwsXG5cdFx0dHlwZTogJ3RleHQnLFxuXHRcdHBhc3N3b3JkOiBmYWxzZSxcblx0XHRwbGFjZWhvbGRlcjogbnVsbCxcblx0XHRwbGFjZWhvbGRlclN0eWxlOiBudWxsLFxuXHRcdHBsYWNlaG9sZGVyQ2xhc3M6ICdpbnB1dC1wbGFjZWhvbGRlcicsXG5cdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdG1heGxlbmd0aDogMTQwLFxuXHRcdGN1cnNvclNwYWNpbmc6IDAsXG5cdFx0YXV0b0ZvY3VzOiBmYWxzZSxcblx0XHRmb2N1czogZmFsc2UsXG5cdFx0Y29uZmlybVR5cGU6ICdkb25lJyxcblx0XHRjb25maXJtSG9sZDogZmFsc2UsXG5cdFx0Y3Vyc29yOiAwLFxuXHRcdHNlbGVjdGlvblN0YXJ0OiAtMSxcblx0XHRzZWxlY3Rpb25FbmQ6IC0xLFxuXHRcdGFkanVzdFBvc2l0aW9uOiB0cnVlLFxuXHRcdGhvbGRLZXlib2FyZDogZmFsc2UsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uSW5wdXQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbklucHV0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykgeyBvbklucHV0KGUpOyB9IFxuXHR9XG5cblx0b25Gb2N1cyAoZSkgeyBcblx0XHRjb25zdCB7IG9uRm9jdXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7IG9uRm9jdXMoZSk7IH0gXG5cdH1cblxuXHRvbkJsdXIgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkJsdXIgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkJsdXIgPT09ICdmdW5jdGlvbicpIHsgb25CbHVyKGUpOyB9IFxuXHR9XG5cblx0b25Db25maXJtIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Db25maXJtIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Db25maXJtID09PSAnZnVuY3Rpb24nKSB7IG9uQ29uZmlybShlKTsgfSBcblx0fVxuXG5cdG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbktleWJvYXJkSGVpZ2h0Q2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25LZXlib2FyZEhlaWdodENoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvbktleWJvYXJkSGVpZ2h0Q2hhbmdlKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBvbklucHV0LCBvbkZvY3VzLCBvbkJsdXIsIG9uQ29uZmlybSwgb25LZXlib2FyZEhlaWdodENoYW5nZSwgc3R5bGUsIGNsYXNzTmFtZSwgdmFsdWUsIHR5cGUsIHBhc3N3b3JkLCBwbGFjZWhvbGRlciwgcGxhY2Vob2xkZXJTdHlsZSwgcGxhY2Vob2xkZXJDbGFzcywgZGlzYWJsZWQsIG1heGxlbmd0aCwgY3Vyc29yU3BhY2luZywgYXV0b0ZvY3VzLCBmb2N1cywgY29uZmlybVR5cGUsIGNvbmZpcm1Ib2xkLCBjdXJzb3IsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIGFkanVzdFBvc2l0aW9uLCBob2xkS2V5Ym9hcmQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPGlucHV0IG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IG9uSW5wdXQ9e29uSW5wdXQgPyAnb25JbnB1dCcgOiAnJ30gb25Gb2N1cz17b25Gb2N1cyA/ICdvbkZvY3VzJyA6ICcnfSBvbkJsdXI9e29uQmx1ciA/ICdvbkJsdXInIDogJyd9IG9uQ29uZmlybT17b25Db25maXJtID8gJ29uQ29uZmlybScgOiAnJ30gb25LZXlib2FyZEhlaWdodENoYW5nZT17b25LZXlib2FyZEhlaWdodENoYW5nZSA/ICdvbktleWJvYXJkSGVpZ2h0Q2hhbmdlJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB2YWx1ZT17dmFsdWV9IHR5cGU9e3R5cGV9IHBhc3N3b3JkPXtwYXNzd29yZH0gcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSBwbGFjZWhvbGRlclN0eWxlPXtwbGFjZWhvbGRlclN0eWxlfSBwbGFjZWhvbGRlckNsYXNzPXtwbGFjZWhvbGRlckNsYXNzfSBkaXNhYmxlZD17ZGlzYWJsZWR9IG1heGxlbmd0aD17bWF4bGVuZ3RofSBjdXJzb3JTcGFjaW5nPXtjdXJzb3JTcGFjaW5nfSBhdXRvRm9jdXM9e2F1dG9Gb2N1c30gZm9jdXM9e2ZvY3VzfSBjb25maXJtVHlwZT17Y29uZmlybVR5cGV9IGNvbmZpcm1Ib2xkPXtjb25maXJtSG9sZH0gY3Vyc29yPXtjdXJzb3J9IHNlbGVjdGlvblN0YXJ0PXtzZWxlY3Rpb25TdGFydH0gc2VsZWN0aW9uRW5kPXtzZWxlY3Rpb25FbmR9IGFkanVzdFBvc2l0aW9uPXthZGp1c3RQb3NpdGlvbn0gaG9sZEtleWJvYXJkPXtob2xkS2V5Ym9hcmR9PjwvaW5wdXQ+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peE1hcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbk1hcmtlclRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxhYmVsVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ29udHJvbFRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkNhbGxvdXRUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25VcGRhdGVkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUmVnaW9uQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUG9pVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsb25naXR1ZGU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0bGF0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2NhbGU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0bWFya2VyczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdGNvdmVyczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdHBvbHlsaW5lOiBQcm9wVHlwZXMuYXJyYXksXG5cdFx0Y2lyY2xlczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdGNvbnRyb2xzOiBQcm9wVHlwZXMuYXJyYXksXG5cdFx0aW5jbHVkZVBvaW50czogUHJvcFR5cGVzLmFycmF5LFxuXHRcdHNob3dMb2NhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0cG9seWdvbnM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRzdWJrZXk6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGF5ZXJTdHlsZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRyb3RhdGU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2tldzogUHJvcFR5cGVzLm51bWJlcixcblx0XHRlbmFibGUzRDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2hvd0NvbXBhc3M6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNob3dTY2FsZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlT3Zlcmxvb2tpbmc6IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZVpvb206IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZVNjcm9sbDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlUm90YXRlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVTYXRlbGxpdGU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZVRyYWZmaWM6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNldHRpbmc6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25NYXJrZXJUYXA6IG51bGwsXG5cdFx0b25MYWJlbFRhcDogbnVsbCxcblx0XHRvbkNvbnRyb2xUYXA6IG51bGwsXG5cdFx0b25DYWxsb3V0VGFwOiBudWxsLFxuXHRcdG9uVXBkYXRlZDogbnVsbCxcblx0XHRvblJlZ2lvbkNoYW5nZTogbnVsbCxcblx0XHRvblBvaVRhcDogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0bG9uZ2l0dWRlOiBudWxsLFxuXHRcdGxhdGl0dWRlOiBudWxsLFxuXHRcdHNjYWxlOiAxNixcblx0XHRtYXJrZXJzOiBudWxsLFxuXHRcdGNvdmVyczogbnVsbCxcblx0XHRwb2x5bGluZTogbnVsbCxcblx0XHRjaXJjbGVzOiBudWxsLFxuXHRcdGNvbnRyb2xzOiBudWxsLFxuXHRcdGluY2x1ZGVQb2ludHM6IG51bGwsXG5cdFx0c2hvd0xvY2F0aW9uOiBmYWxzZSxcblx0XHRwb2x5Z29uczogbnVsbCxcblx0XHRzdWJrZXk6IG51bGwsXG5cdFx0bGF5ZXJTdHlsZTogMSxcblx0XHRyb3RhdGU6IDAsXG5cdFx0c2tldzogMCxcblx0XHRlbmFibGUzRDogZmFsc2UsXG5cdFx0c2hvd0NvbXBhc3M6IGZhbHNlLFxuXHRcdHNob3dTY2FsZTogZmFsc2UsXG5cdFx0ZW5hYmxlT3Zlcmxvb2tpbmc6IGZhbHNlLFxuXHRcdGVuYWJsZVpvb206IGZhbHNlLFxuXHRcdGVuYWJsZVNjcm9sbDogZmFsc2UsXG5cdFx0ZW5hYmxlUm90YXRlOiBmYWxzZSxcblx0XHRlbmFibGVTYXRlbGxpdGU6IGZhbHNlLFxuXHRcdGVuYWJsZVRyYWZmaWM6IGZhbHNlLFxuXHRcdHNldHRpbmc6IG51bGwsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uTWFya2VyVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25NYXJrZXJUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbk1hcmtlclRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbk1hcmtlclRhcChlKTsgfSBcblx0fVxuXG5cdG9uTGFiZWxUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxhYmVsVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25MYWJlbFRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxhYmVsVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Db250cm9sVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Db250cm9sVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Db250cm9sVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uQ29udHJvbFRhcChlKTsgfSBcblx0fVxuXG5cdG9uQ2FsbG91dFRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ2FsbG91dFRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ2FsbG91dFRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNhbGxvdXRUYXAoZSk7IH0gXG5cdH1cblxuXHRvblVwZGF0ZWQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblVwZGF0ZWQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblVwZGF0ZWQgPT09ICdmdW5jdGlvbicpIHsgb25VcGRhdGVkKGUpOyB9IFxuXHR9XG5cblx0b25SZWdpb25DaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblJlZ2lvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uUmVnaW9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uUmVnaW9uQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25Qb2lUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblBvaVRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uUG9pVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uUG9pVGFwKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBvbk1hcmtlclRhcCwgb25MYWJlbFRhcCwgb25Db250cm9sVGFwLCBvbkNhbGxvdXRUYXAsIG9uVXBkYXRlZCwgb25SZWdpb25DaGFuZ2UsIG9uUG9pVGFwLCBzdHlsZSwgY2xhc3NOYW1lLCBsb25naXR1ZGUsIGxhdGl0dWRlLCBzY2FsZSwgbWFya2VycywgY292ZXJzLCBwb2x5bGluZSwgY2lyY2xlcywgY29udHJvbHMsIGluY2x1ZGVQb2ludHMsIHNob3dMb2NhdGlvbiwgcG9seWdvbnMsIHN1YmtleSwgbGF5ZXJTdHlsZSwgcm90YXRlLCBza2V3LCBlbmFibGUzRCwgc2hvd0NvbXBhc3MsIHNob3dTY2FsZSwgZW5hYmxlT3Zlcmxvb2tpbmcsIGVuYWJsZVpvb20sIGVuYWJsZVNjcm9sbCwgZW5hYmxlUm90YXRlLCBlbmFibGVTYXRlbGxpdGUsIGVuYWJsZVRyYWZmaWMsIHNldHRpbmcgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPG1hcCBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvbk1hcmtlclRhcD17b25NYXJrZXJUYXAgPyAnb25NYXJrZXJUYXAnIDogJyd9IG9uTGFiZWxUYXA9e29uTGFiZWxUYXAgPyAnb25MYWJlbFRhcCcgOiAnJ30gb25Db250cm9sVGFwPXtvbkNvbnRyb2xUYXAgPyAnb25Db250cm9sVGFwJyA6ICcnfSBvbkNhbGxvdXRUYXA9e29uQ2FsbG91dFRhcCA/ICdvbkNhbGxvdXRUYXAnIDogJyd9IG9uVXBkYXRlZD17b25VcGRhdGVkID8gJ29uVXBkYXRlZCcgOiAnJ30gb25SZWdpb25DaGFuZ2U9e29uUmVnaW9uQ2hhbmdlID8gJ29uUmVnaW9uQ2hhbmdlJyA6ICcnfSBvblBvaVRhcD17b25Qb2lUYXAgPyAnb25Qb2lUYXAnIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGxvbmdpdHVkZT17bG9uZ2l0dWRlfSBsYXRpdHVkZT17bGF0aXR1ZGV9IHNjYWxlPXtzY2FsZX0gbWFya2Vycz17bWFya2Vyc30gY292ZXJzPXtjb3ZlcnN9IHBvbHlsaW5lPXtwb2x5bGluZX0gY2lyY2xlcz17Y2lyY2xlc30gY29udHJvbHM9e2NvbnRyb2xzfSBpbmNsdWRlUG9pbnRzPXtpbmNsdWRlUG9pbnRzfSBzaG93TG9jYXRpb249e3Nob3dMb2NhdGlvbn0gcG9seWdvbnM9e3BvbHlnb25zfSBzdWJrZXk9e3N1YmtleX0gbGF5ZXJTdHlsZT17bGF5ZXJTdHlsZX0gcm90YXRlPXtyb3RhdGV9IHNrZXc9e3NrZXd9IGVuYWJsZTNEPXtlbmFibGUzRH0gc2hvd0NvbXBhc3M9e3Nob3dDb21wYXNzfSBzaG93U2NhbGU9e3Nob3dTY2FsZX0gZW5hYmxlT3Zlcmxvb2tpbmc9e2VuYWJsZU92ZXJsb29raW5nfSBlbmFibGVab29tPXtlbmFibGVab29tfSBlbmFibGVTY3JvbGw9e2VuYWJsZVNjcm9sbH0gZW5hYmxlUm90YXRlPXtlbmFibGVSb3RhdGV9IGVuYWJsZVNhdGVsbGl0ZT17ZW5hYmxlU2F0ZWxsaXRlfSBlbmFibGVUcmFmZmljPXtlbmFibGVUcmFmZmljfSBzZXR0aW5nPXtzZXR0aW5nfT48L21hcD47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4UGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uRXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25DaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Db2x1bW5DaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG1vZGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdHJhbmdlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHJhbmdlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRmaWVsZHM6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y3VzdG9tSXRlbTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvbkNhbmNlbDogbnVsbCxcblx0XHRvbkVycm9yOiBudWxsLFxuXHRcdG9uQ2hhbmdlOiBudWxsLFxuXHRcdG9uQ29sdW1uQ2hhbmdlOiBudWxsLFxuXHRcdHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRtb2RlOiAnc2VsZWN0b3InLFxuXHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRyYW5nZTogW10sXG5cdFx0cmFuZ2VLZXk6IG51bGwsXG5cdFx0dmFsdWU6IDAsXG5cdFx0c3RhcnQ6IG51bGwsXG5cdFx0ZW5kOiBudWxsLFxuXHRcdGZpZWxkczogJ2RheScsXG5cdFx0Y3VzdG9tSXRlbTogbnVsbCxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25DYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkNhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25FcnJvciAoZSkgeyBcblx0XHRjb25zdCB7IG9uRXJyb3IgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkVycm9yID09PSAnZnVuY3Rpb24nKSB7IG9uRXJyb3IoZSk7IH0gXG5cdH1cblxuXHRvbkNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25DaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvbkNvbHVtbkNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ29sdW1uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Db2x1bW5DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Db2x1bW5DaGFuZ2UoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uQ2FuY2VsLCBvbkVycm9yLCBvbkNoYW5nZSwgb25Db2x1bW5DaGFuZ2UsIHN0eWxlLCBjbGFzc05hbWUsIG1vZGUsIGRpc2FibGVkLCByYW5nZSwgcmFuZ2VLZXksIHZhbHVlLCBzdGFydCwgZW5kLCBmaWVsZHMsIGN1c3RvbUl0ZW0gfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPHBpY2tlciBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvbkNhbmNlbD17b25DYW5jZWwgPyAnb25DYW5jZWwnIDogJyd9IG9uRXJyb3I9e29uRXJyb3IgPyAnb25FcnJvcicgOiAnJ30gb25DaGFuZ2U9e29uQ2hhbmdlID8gJ29uQ2hhbmdlJyA6ICcnfSBvbkNvbHVtbkNoYW5nZT17b25Db2x1bW5DaGFuZ2UgPyAnb25Db2x1bW5DaGFuZ2UnIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IG1vZGU9e21vZGV9IGRpc2FibGVkPXtkaXNhYmxlZH0gcmFuZ2U9e3JhbmdlfSByYW5nZUtleT17cmFuZ2VLZXl9IHZhbHVlPXt2YWx1ZX0gc3RhcnQ9e3N0YXJ0fSBlbmQ9e2VuZH0gZmllbGRzPXtmaWVsZHN9IGN1c3RvbUl0ZW09e2N1c3RvbUl0ZW19Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcGlja2VyPjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhSb290IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgc3R5bGUsIGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8cm9vdCBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3Jvb3Q+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peFNjcm9sbFZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaENhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1ByZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25TY3JvbGxUb1VwcGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uU2Nyb2xsVG9Mb3dlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblNjcm9sbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2Nyb2xsWDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2Nyb2xsWTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0dXBwZXJUaHJlc2hvbGQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0bG93ZXJUaHJlc2hvbGQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2Nyb2xsVG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNjcm9sbExlZnQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2Nyb2xsSW50b1ZpZXc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2Nyb2xsV2l0aEFuaW1hdGlvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlQmFja1RvVG9wOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVGbGV4OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzY3JvbGxBbmNob3Jpbmc6IFByb3BUeXBlcy5ib29sLFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuXHRcdG9uVG91Y2hNb3ZlOiBudWxsLFxuXHRcdG9uVG91Y2hDYW5jZWw6IG51bGwsXG5cdFx0b25Ub3VjaEVuZDogbnVsbCxcblx0XHRvblRhcDogbnVsbCxcblx0XHRvbkxvbmdQcmVzczogbnVsbCxcblx0XHRvbkxvbmdUYXA6IG51bGwsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuXHRcdG9uU2Nyb2xsVG9VcHBlcjogbnVsbCxcblx0XHRvblNjcm9sbFRvTG93ZXI6IG51bGwsXG5cdFx0b25TY3JvbGw6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdHNjcm9sbFg6IGZhbHNlLFxuXHRcdHNjcm9sbFk6IGZhbHNlLFxuXHRcdHVwcGVyVGhyZXNob2xkOiA1MCxcblx0XHRsb3dlclRocmVzaG9sZDogNTAsXG5cdFx0c2Nyb2xsVG9wOiBudWxsLFxuXHRcdHNjcm9sbExlZnQ6IG51bGwsXG5cdFx0c2Nyb2xsSW50b1ZpZXc6IG51bGwsXG5cdFx0c2Nyb2xsV2l0aEFuaW1hdGlvbjogZmFsc2UsXG5cdFx0ZW5hYmxlQmFja1RvVG9wOiBmYWxzZSxcblx0XHRlbmFibGVGbGV4OiBmYWxzZSxcblx0XHRzY3JvbGxBbmNob3Jpbmc6IGZhbHNlLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvblNjcm9sbFRvVXBwZXIgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblNjcm9sbFRvVXBwZXIgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblNjcm9sbFRvVXBwZXIgPT09ICdmdW5jdGlvbicpIHsgb25TY3JvbGxUb1VwcGVyKGUpOyB9IFxuXHR9XG5cblx0b25TY3JvbGxUb0xvd2VyIChlKSB7IFxuXHRcdGNvbnN0IHsgb25TY3JvbGxUb0xvd2VyIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25TY3JvbGxUb0xvd2VyID09PSAnZnVuY3Rpb24nKSB7IG9uU2Nyb2xsVG9Mb3dlcihlKTsgfSBcblx0fVxuXG5cdG9uU2Nyb2xsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25TY3JvbGwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblNjcm9sbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblNjcm9sbChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgb25TY3JvbGxUb1VwcGVyLCBvblNjcm9sbFRvTG93ZXIsIG9uU2Nyb2xsLCBzdHlsZSwgY2xhc3NOYW1lLCBzY3JvbGxYLCBzY3JvbGxZLCB1cHBlclRocmVzaG9sZCwgbG93ZXJUaHJlc2hvbGQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgc2Nyb2xsSW50b1ZpZXcsIHNjcm9sbFdpdGhBbmltYXRpb24sIGVuYWJsZUJhY2tUb1RvcCwgZW5hYmxlRmxleCwgc2Nyb2xsQW5jaG9yaW5nIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxzY3JvbGwtdmlldyBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvblNjcm9sbFRvVXBwZXI9e29uU2Nyb2xsVG9VcHBlciA/ICdvblNjcm9sbFRvVXBwZXInIDogJyd9IG9uU2Nyb2xsVG9Mb3dlcj17b25TY3JvbGxUb0xvd2VyID8gJ29uU2Nyb2xsVG9Mb3dlcicgOiAnJ30gb25TY3JvbGw9e29uU2Nyb2xsID8gJ29uU2Nyb2xsJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzY3JvbGxYPXtzY3JvbGxYfSBzY3JvbGxZPXtzY3JvbGxZfSB1cHBlclRocmVzaG9sZD17dXBwZXJUaHJlc2hvbGR9IGxvd2VyVGhyZXNob2xkPXtsb3dlclRocmVzaG9sZH0gc2Nyb2xsVG9wPXtzY3JvbGxUb3B9IHNjcm9sbExlZnQ9e3Njcm9sbExlZnR9IHNjcm9sbEludG9WaWV3PXtzY3JvbGxJbnRvVmlld30gc2Nyb2xsV2l0aEFuaW1hdGlvbj17c2Nyb2xsV2l0aEFuaW1hdGlvbn0gZW5hYmxlQmFja1RvVG9wPXtlbmFibGVCYWNrVG9Ub3B9IGVuYWJsZUZsZXg9e2VuYWJsZUZsZXh9IHNjcm9sbEFuY2hvcmluZz17c2Nyb2xsQW5jaG9yaW5nfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3Njcm9sbC12aWV3PjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhTd2lwZXJJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpdGVtSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdGl0ZW1JZDogbnVsbCxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBzdHlsZSwgY2xhc3NOYW1lLCBpdGVtSWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPHN3aXBlci1pdGVtIG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGl0ZW1JZD17aXRlbUlkfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3N3aXBlci1pdGVtPjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5pbXBvcnQgU3dpcGVySXRlbSBmcm9tICcuLi9yZW1peC1zd2lwZXItaXRlbS9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4U3dpcGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIFN3aXBlckl0ZW0gPSBTd2lwZXJJdGVtOyBcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaENhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1ByZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25DaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25GaW5pc2g6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGluZGljYXRvckRvdHM6IFByb3BUeXBlcy5ib29sLFxuXHRcdGluZGljYXRvckNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGluZGljYXRvckFjdGl2ZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGF1dG9wbGF5OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRjdXJyZW50OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGludGVydmFsOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGNpcmN1bGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0XHR2ZXJ0aWNhbDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0cHJldmlvdXNNYXJnaW46IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bmV4dE1hcmdpbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRkaXNwbGF5TXVsdGlwbGVJdGVtczogUHJvcFR5cGVzLm51bWJlcixcblx0XHRza2lwSGlkZGVuSXRlbUxheW91OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlYXNpbmdGdW5jdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvbkNoYW5nZTogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkZpbmlzaDogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0aW5kaWNhdG9yRG90czogZmFsc2UsXG5cdFx0aW5kaWNhdG9yQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC4zKScsXG5cdFx0aW5kaWNhdG9yQWN0aXZlQ29sb3I6ICcjMDAwMDAwJyxcblx0XHRhdXRvcGxheTogZmFsc2UsXG5cdFx0Y3VycmVudDogMCxcblx0XHRpbnRlcnZhbDogNTAwMCxcblx0XHRkdXJhdGlvbjogNTAwLFxuXHRcdGNpcmN1bGFyOiBmYWxzZSxcblx0XHR2ZXJ0aWNhbDogZmFsc2UsXG5cdFx0cHJldmlvdXNNYXJnaW46ICcwcHgnLFxuXHRcdG5leHRNYXJnaW46ICcwcHgnLFxuXHRcdGRpc3BsYXlNdWx0aXBsZUl0ZW1zOiAxLFxuXHRcdHNraXBIaWRkZW5JdGVtTGF5b3U6IGZhbHNlLFxuXHRcdGVhc2luZ0Z1bmN0aW9uOiAnZGVmYXVsdCcsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRmluaXNoIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25GaW5pc2ggfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkZpbmlzaCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkZpbmlzaChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgb25DaGFuZ2UsIG9uQW5pbWF0aW9uRmluaXNoLCBzdHlsZSwgY2xhc3NOYW1lLCBpbmRpY2F0b3JEb3RzLCBpbmRpY2F0b3JDb2xvciwgaW5kaWNhdG9yQWN0aXZlQ29sb3IsIGF1dG9wbGF5LCBjdXJyZW50LCBpbnRlcnZhbCwgZHVyYXRpb24sIGNpcmN1bGFyLCB2ZXJ0aWNhbCwgcHJldmlvdXNNYXJnaW4sIG5leHRNYXJnaW4sIGRpc3BsYXlNdWx0aXBsZUl0ZW1zLCBza2lwSGlkZGVuSXRlbUxheW91LCBlYXNpbmdGdW5jdGlvbiB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8c3dpcGVyIG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IG9uQ2hhbmdlPXtvbkNoYW5nZSA/ICdvbkNoYW5nZScgOiAnJ30gb25BbmltYXRpb25GaW5pc2g9e29uQW5pbWF0aW9uRmluaXNoID8gJ29uQW5pbWF0aW9uRmluaXNoJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBpbmRpY2F0b3JEb3RzPXtpbmRpY2F0b3JEb3RzfSBpbmRpY2F0b3JDb2xvcj17aW5kaWNhdG9yQ29sb3J9IGluZGljYXRvckFjdGl2ZUNvbG9yPXtpbmRpY2F0b3JBY3RpdmVDb2xvcn0gYXV0b3BsYXk9e2F1dG9wbGF5fSBjdXJyZW50PXtjdXJyZW50fSBpbnRlcnZhbD17aW50ZXJ2YWx9IGR1cmF0aW9uPXtkdXJhdGlvbn0gY2lyY3VsYXI9e2NpcmN1bGFyfSB2ZXJ0aWNhbD17dmVydGljYWx9IHByZXZpb3VzTWFyZ2luPXtwcmV2aW91c01hcmdpbn0gbmV4dE1hcmdpbj17bmV4dE1hcmdpbn0gZGlzcGxheU11bHRpcGxlSXRlbXM9e2Rpc3BsYXlNdWx0aXBsZUl0ZW1zfSBza2lwSGlkZGVuSXRlbUxheW91PXtza2lwSGlkZGVuSXRlbUxheW91fSBlYXNpbmdGdW5jdGlvbj17ZWFzaW5nRnVuY3Rpb259Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvc3dpcGVyPjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhUZXh0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNwYWNlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRkZWNvZGU6IFByb3BUeXBlcy5ib29sLFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdHNlbGVjdGFibGU6IGZhbHNlLFxuXHRcdHNwYWNlOiBmYWxzZSxcblx0XHRkZWNvZGU6IGZhbHNlLFxuXHRcdFxuICB9O1xuXG4gIFxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdHlsZSwgY2xhc3NOYW1lLCBzZWxlY3RhYmxlLCBzcGFjZSwgZGVjb2RlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDx0ZXh0IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHNlbGVjdGFibGU9e3NlbGVjdGFibGV9IHNwYWNlPXtzcGFjZX0gZGVjb2RlPXtkZWNvZGV9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvdGV4dD47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4VmlkZW8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaENhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1ByZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25QbGF5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUGF1c2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25FbmRlZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRpbWVVcGRhdGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25GdWxsU2NyZWVuQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uV2FpdGluZzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUHJvZ3Jlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb2FkZWRNZXRhRGF0YTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3JjOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGNvbnRyb2xzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRkYW5tdUxpc3Q6IFByb3BUeXBlcy5hcnJheSxcblx0XHRzaG93UGxheUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlRGFubXU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGF1dG9wbGF5OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRsb29wOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtdXRlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0aW5pdGlhbFRpbWU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0cGFnZUdlc3R1cmU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGRpcmVjdGlvbjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzaG93UHJvZ3Jlc3M6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNob3dGdWxsc2NyZWVuQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzaG93UGxheUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2hvd0NlbnRlclBsYXlCdXR0b246IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZVByb2dyZXNzR2VzdHVyZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0b2JqZWN0Rml0OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRwb3N0ZXI6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2hvd011dGVCdXR0b246IFByb3BUeXBlcy5ib29sLFxuXHRcdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHBsYXlCdXR0b25Qb3NpdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRlbmFibGVQbGF5R2VzdHVyZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0YXV0b1BhdXNlSWZOYXZpZ2F0ZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0YXV0b1BhdXNlSWZPcGVuTmF0aXZlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHR2c2xpZGVHZXN0dXJlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHR2c2xpZGVHZXN0dXJlSW5GdWxsc2NyZWVuOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRhZFVuaXRJZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvblBsYXk6IG51bGwsXG5cdFx0b25QYXVzZTogbnVsbCxcblx0XHRvbkVuZGVkOiBudWxsLFxuXHRcdG9uVGltZVVwZGF0ZTogbnVsbCxcblx0XHRvbkZ1bGxTY3JlZW5DaGFuZ2U6IG51bGwsXG5cdFx0b25XYWl0aW5nOiBudWxsLFxuXHRcdG9uRXJyb3I6IG51bGwsXG5cdFx0b25Qcm9ncmVzczogbnVsbCxcblx0XHRvbkxvYWRlZE1ldGFEYXRhOiBudWxsLFxuXHRcdHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRzcmM6IG51bGwsXG5cdFx0ZHVyYXRpb246IG51bGwsXG5cdFx0Y29udHJvbHM6IHRydWUsXG5cdFx0ZGFubXVMaXN0OiBudWxsLFxuXHRcdHNob3dQbGF5QnV0dG9uOiBmYWxzZSxcblx0XHRlbmFibGVEYW5tdTogZmFsc2UsXG5cdFx0YXV0b3BsYXk6IGZhbHNlLFxuXHRcdGxvb3A6IGZhbHNlLFxuXHRcdG11dGVkOiBmYWxzZSxcblx0XHRpbml0aWFsVGltZTogMCxcblx0XHRwYWdlR2VzdHVyZTogZmFsc2UsXG5cdFx0ZGlyZWN0aW9uOiBudWxsLFxuXHRcdHNob3dQcm9ncmVzczogdHJ1ZSxcblx0XHRzaG93RnVsbHNjcmVlbkJ1dHRvbjogdHJ1ZSxcblx0XHRzaG93UGxheUJ1dHRvbjogdHJ1ZSxcblx0XHRzaG93Q2VudGVyUGxheUJ1dHRvbjogdHJ1ZSxcblx0XHRlbmFibGVQcm9ncmVzc0dlc3R1cmU6IHRydWUsXG5cdFx0b2JqZWN0Rml0OiAwLFxuXHRcdHBvc3RlcjogbnVsbCxcblx0XHRzaG93TXV0ZUJ1dHRvbjogZmFsc2UsXG5cdFx0dGl0bGU6IG51bGwsXG5cdFx0cGxheUJ1dHRvblBvc2l0aW9uOiAnYm90dG9tJyxcblx0XHRlbmFibGVQbGF5R2VzdHVyZTogZmFsc2UsXG5cdFx0YXV0b1BhdXNlSWZOYXZpZ2F0ZTogdHJ1ZSxcblx0XHRhdXRvUGF1c2VJZk9wZW5OYXRpdmU6IHRydWUsXG5cdFx0dnNsaWRlR2VzdHVyZTogdHJ1ZSxcblx0XHR2c2xpZGVHZXN0dXJlSW5GdWxsc2NyZWVuOiB0cnVlLFxuXHRcdGFkVW5pdElkOiBudWxsLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvblBsYXkgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblBsYXkgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblBsYXkgPT09ICdmdW5jdGlvbicpIHsgb25QbGF5KGUpOyB9IFxuXHR9XG5cblx0b25QYXVzZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uUGF1c2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblBhdXNlID09PSAnZnVuY3Rpb24nKSB7IG9uUGF1c2UoZSk7IH0gXG5cdH1cblxuXHRvbkVuZGVkIChlKSB7IFxuXHRcdGNvbnN0IHsgb25FbmRlZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uRW5kZWQgPT09ICdmdW5jdGlvbicpIHsgb25FbmRlZChlKTsgfSBcblx0fVxuXG5cdG9uVGltZVVwZGF0ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGltZVVwZGF0ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGltZVVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRpbWVVcGRhdGUoZSk7IH0gXG5cdH1cblxuXHRvbkZ1bGxTY3JlZW5DaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkZ1bGxTY3JlZW5DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkZ1bGxTY3JlZW5DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25GdWxsU2NyZWVuQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25XYWl0aW5nIChlKSB7IFxuXHRcdGNvbnN0IHsgb25XYWl0aW5nIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25XYWl0aW5nID09PSAnZnVuY3Rpb24nKSB7IG9uV2FpdGluZyhlKTsgfSBcblx0fVxuXG5cdG9uRXJyb3IgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkVycm9yIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25FcnJvciA9PT0gJ2Z1bmN0aW9uJykgeyBvbkVycm9yKGUpOyB9IFxuXHR9XG5cblx0b25Qcm9ncmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uUHJvZ3Jlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uUHJvZ3Jlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvYWRlZE1ldGFEYXRhIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb2FkZWRNZXRhRGF0YSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9hZGVkTWV0YURhdGEgPT09ICdmdW5jdGlvbicpIHsgb25Mb2FkZWRNZXRhRGF0YShlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgb25QbGF5LCBvblBhdXNlLCBvbkVuZGVkLCBvblRpbWVVcGRhdGUsIG9uRnVsbFNjcmVlbkNoYW5nZSwgb25XYWl0aW5nLCBvbkVycm9yLCBvblByb2dyZXNzLCBvbkxvYWRlZE1ldGFEYXRhLCBzdHlsZSwgY2xhc3NOYW1lLCBzcmMsIGR1cmF0aW9uLCBjb250cm9scywgZGFubXVMaXN0LCBkYW5tdUJ1dHRvbiwgZW5hYmxlRGFubXUsIGF1dG9wbGF5LCBsb29wLCBtdXRlZCwgaW5pdGlhbFRpbWUsIHBhZ2VHZXN0dXJlLCBkaXJlY3Rpb24sIHNob3dQcm9ncmVzcywgc2hvd0Z1bGxzY3JlZW5CdXR0b24sIHNob3dQbGF5QnV0dG9uLCBzaG93Q2VudGVyUGxheUJ1dHRvbiwgZW5hYmxlUHJvZ3Jlc3NHZXN0dXJlLCBvYmplY3RGaXQsIHBvc3Rlciwgc2hvd011dGVCdXR0b24sIHRpdGxlLCBwbGF5QnV0dG9uUG9zaXRpb24sIGVuYWJsZVBsYXlHZXN0dXJlLCBhdXRvUGF1c2VJZk5hdmlnYXRlLCBhdXRvUGF1c2VJZk9wZW5OYXRpdmUsIHZzbGlkZUdlc3R1cmUsIHZzbGlkZUdlc3R1cmVJbkZ1bGxzY3JlZW4sIGFkVW5pdElkIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDx2aWRlbyBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvblBsYXk9e29uUGxheSA/ICdvblBsYXknIDogJyd9IG9uUGF1c2U9e29uUGF1c2UgPyAnb25QYXVzZScgOiAnJ30gb25FbmRlZD17b25FbmRlZCA/ICdvbkVuZGVkJyA6ICcnfSBvblRpbWVVcGRhdGU9e29uVGltZVVwZGF0ZSA/ICdvblRpbWVVcGRhdGUnIDogJyd9IG9uRnVsbFNjcmVlbkNoYW5nZT17b25GdWxsU2NyZWVuQ2hhbmdlID8gJ29uRnVsbFNjcmVlbkNoYW5nZScgOiAnJ30gb25XYWl0aW5nPXtvbldhaXRpbmcgPyAnb25XYWl0aW5nJyA6ICcnfSBvbkVycm9yPXtvbkVycm9yID8gJ29uRXJyb3InIDogJyd9IG9uUHJvZ3Jlc3M9e29uUHJvZ3Jlc3MgPyAnb25Qcm9ncmVzcycgOiAnJ30gb25Mb2FkZWRNZXRhRGF0YT17b25Mb2FkZWRNZXRhRGF0YSA/ICdvbkxvYWRlZE1ldGFEYXRhJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzcmM9e3NyY30gZHVyYXRpb249e2R1cmF0aW9ufSBjb250cm9scz17Y29udHJvbHN9IGRhbm11TGlzdD17ZGFubXVMaXN0fSBzaG93UGxheUJ1dHRvbj17c2hvd1BsYXlCdXR0b259IGVuYWJsZURhbm11PXtlbmFibGVEYW5tdX0gYXV0b3BsYXk9e2F1dG9wbGF5fSBsb29wPXtsb29wfSBtdXRlZD17bXV0ZWR9IGluaXRpYWxUaW1lPXtpbml0aWFsVGltZX0gcGFnZUdlc3R1cmU9e3BhZ2VHZXN0dXJlfSBkaXJlY3Rpb249e2RpcmVjdGlvbn0gc2hvd1Byb2dyZXNzPXtzaG93UHJvZ3Jlc3N9IHNob3dGdWxsc2NyZWVuQnV0dG9uPXtzaG93RnVsbHNjcmVlbkJ1dHRvbn0gc2hvd1BsYXlCdXR0b249e3Nob3dQbGF5QnV0dG9ufSBzaG93Q2VudGVyUGxheUJ1dHRvbj17c2hvd0NlbnRlclBsYXlCdXR0b259IGVuYWJsZVByb2dyZXNzR2VzdHVyZT17ZW5hYmxlUHJvZ3Jlc3NHZXN0dXJlfSBvYmplY3RGaXQ9e29iamVjdEZpdH0gcG9zdGVyPXtwb3N0ZXJ9IHNob3dNdXRlQnV0dG9uPXtzaG93TXV0ZUJ1dHRvbn0gdGl0bGU9e3RpdGxlfSBwbGF5QnV0dG9uUG9zaXRpb249e3BsYXlCdXR0b25Qb3NpdGlvbn0gZW5hYmxlUGxheUdlc3R1cmU9e2VuYWJsZVBsYXlHZXN0dXJlfSBhdXRvUGF1c2VJZk5hdmlnYXRlPXthdXRvUGF1c2VJZk5hdmlnYXRlfSBhdXRvUGF1c2VJZk9wZW5OYXRpdmU9e2F1dG9QYXVzZUlmT3Blbk5hdGl2ZX0gdnNsaWRlR2VzdHVyZT17dnNsaWRlR2VzdHVyZX0gdnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbj17dnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbn0gYWRVbml0SWQ9e2FkVW5pdElkfT48L3ZpZGVvPjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRob3ZlckNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRob3ZlclN0YXJ0VGltZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRob3ZlclN0YXlUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuXHRcdG9uVG91Y2hNb3ZlOiBudWxsLFxuXHRcdG9uVG91Y2hDYW5jZWw6IG51bGwsXG5cdFx0b25Ub3VjaEVuZDogbnVsbCxcblx0XHRvblRhcDogbnVsbCxcblx0XHRvbkxvbmdQcmVzczogbnVsbCxcblx0XHRvbkxvbmdUYXA6IG51bGwsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuXHRcdHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRob3ZlckNsYXNzOiAnbm9uZScsXG5cdFx0aG92ZXJTdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuXHRcdGhvdmVyU3RhcnRUaW1lOiA1MCxcblx0XHRob3ZlclN0YXlUaW1lOiA0MDAsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgc3R5bGUsIGNsYXNzTmFtZSwgaG92ZXJDbGFzcywgaG92ZXJTdG9wUHJvcGFnYXRpb24sIGhvdmVyU3RhcnRUaW1lLCBob3ZlclN0YXlUaW1lIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDx2aWV3IG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGhvdmVyQ2xhc3M9e2hvdmVyQ2xhc3N9IGhvdmVyU3RvcFByb3BhZ2F0aW9uPXtob3ZlclN0b3BQcm9wYWdhdGlvbn0gaG92ZXJTdGFydFRpbWU9e2hvdmVyU3RhcnRUaW1lfSBob3ZlclN0YXlUaW1lPXtob3ZlclN0YXlUaW1lfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3ZpZXc+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZC92NCc7XG5pbXBvcnQgZ2xvYmFsRWxlbWVudHMgZnJvbSAnLi9nbG9iYWxFbGVtZW50cyc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCc7XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZCgpO1xuICAgIHRoaXMudGFnTmFtZSA9IG51bGw7XG4gICAgdGhpcy5ub2RlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5jaGlsZCA9IG51bGw7XG4gICAgdGhpcy5yZXR1cm4gPSBudWxsO1xuICAgIHRoaXMubGFzdENoaWxkID0gbnVsbDtcblxuICAgIGdsb2JhbEVsZW1lbnRzW3RoaXMudXVpZF0gPSB0aGlzO1xuICB9XG5cbiAgZ2V0IG93bmVyRG9jdW1lbnQgKCkge1xuICAgIHJldHVybiBkb2N1bWVudDtcbiAgfVxufSIsImltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IHsgQk9EWSB9IGZyb20gJy4vSFRNTFR5cGVzJztcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuL2RvY3VtZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTEJvZHlFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICB0YWdOYW1lID0gQk9EWTtcbiAgbm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG5cbiAgZ2V0IG93bmVyRG9jdW1lbnQgKCkge1xuICAgIHJldHVybiBkb2N1bWVudDtcbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IEJVVFRPTiB9IGZyb20gJy4vSFRNTFR5cGVzJzsgXG5pbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgSFRNTFRleHRFbGVtZW50IGZyb20gJy4vSFRNTFRleHRFbGVtZW50JztcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gJy4vU3R5bGVTaGVldCc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcblxuaW1wb3J0IFJlbWl4QnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1idXR0b24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MQnV0dG9uRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4QnV0dG9uLmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IEJVVFRPTjtcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICB9XG59IiwiaW1wb3J0IHsgaXNVbmRlZmluZWQsIGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vRWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuXG5mdW5jdGlvbiByZXNvbHZlRGVmYXVsdFByb3BzIChcbiAgZGVmYXVsdFByb3BzLFxuICB1bnJlc29sdmVkUHJvcHNcbikge1xuICBpZiAoZGVmYXVsdFByb3BzKSB7XG4gICAgY29uc3QgcHJvcHMgPSB7fTtcbiAgICBcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChpc1VuZGVmaW5lZCh1bnJlc29sdmVkUHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gdW5yZXNvbHZlZFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cbiAgXG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKHRhZ05hbWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZTtcbiAgICB0aGlzLnN0eWxlID0gbmV3IFN0eWxlU2hlZXQoKTtcbiAgfVxuXG4gIHNldCBpbm5lckhUTUwgKGlubmVySFRNTCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGlubmVySFRNTCBpcyBub3QgYmUgc3VwcG9ydHRlZCcpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQgKGNoaWxkKSB7XG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuY2hpbGQpKSB7XG4gICAgICB0aGlzLmNoaWxkID0gdGhpcy5sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sYXN0Q2hpbGQuc2xpYmluZyA9IGNoaWxkO1xuICAgICAgdGhpcy5sYXN0Q2hpbGQgPSBjaGlsZDtcbiAgICB9ICAgIFxuXG4gICAgY2hpbGQucmV0dXJuID0gdGhpcztcbiAgfVxuXG4gIHJlbW92ZUNoaWxkIChjaGlsZCkge1xuXG4gIH1cblxuICBnZXRBdHRyaWJ1dGUgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpc1tuYW1lXTtcbiAgfVxuICBzZXRBdHRyaWJ1dGUgKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpc1tuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlIChuYW1lKSB7XG4gICAgdGhpc1tuYW1lXSA9IG51bGw7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyICgpIHt9XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKCkge31cbiAgZGlzcGF0Y2hFdmVudCAodHlwZSwgaWQsIGUpIHtcbiAgICBjb25zb2xlLmxvZygpXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGBbb2JqZWN0IEhUTUwke3RoaXMudGFnTmFtZX1FbGVtZW50XWA7XG4gIH1cblxuICBzZXJpYWxpemUgKCkge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdFByb3BzO1xuICAgIGNvbnN0IGVsZW1lbnQgPSByZXNvbHZlRGVmYXVsdFByb3BzKGRlZmF1bHRQcm9wcywgdGhpcyk7XG5cbiAgICBlbGVtZW50LnN0eWxlID0gU3RyaW5nKGVsZW1lbnQuc3R5bGUpO1xuXG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLmNoaWxkKSkge1xuICAgICAgZWxlbWVudC5jaGlsZCA9IHRoaXMuY2hpbGQuc2VyaWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLnNsaWJpbmcpKSB7XG4gICAgICBlbGVtZW50LnNsaWJpbmcgPSB0aGlzLnNsaWJpbmcuc2VyaWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLmlubmVyVGV4dCkpIHtcbiAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgZWxlbWVudC50YWdOYW1lID0gdGhpcy50YWdOYW1lO1xuICAgIGVsZW1lbnQudXVpZCA9IHRoaXMudXVpZDtcbiAgICBlbGVtZW50Lm5vZGVUeXBlID0gdGhpcy5ub2RlVHlwZTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi9TdHlsZVNoZWV0JztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IHsgSU1BR0UgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5cbmltcG9ydCBSZW1peEltYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1pbWFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxJbWFnZUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peEltYWdlLmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IElNQUdFO1xuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZVNoZWV0KCk7XG4gIH1cblxuICBhcHBlbmRDaGlsZCAoY2hpbGQpIHt9XG4gIHJlbW92ZUNoaWxkIChjaGlsZCkge31cbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBQSUNLRVIgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgSFRNTFRleHRFbGVtZW50IGZyb20gJy4vSFRNTFRleHRFbGVtZW50JztcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gJy4vU3R5bGVTaGVldCc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcblxuaW1wb3J0IFJlbWl4UGlja2VyIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1waWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MUGlja2VyRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4UGlja2VyLmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IFBJQ0tFUjtcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICB9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgeyBST09UIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuXG5pbXBvcnQgUmVtaXhSb290IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1yb290JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTFZpZXdFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gUmVtaXhSb290LmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gICAgdGhpcy50YWdOYW1lID0gUk9PVDtcbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IFNXSVBFUiB9IGZyb20gJy4vSFRNTFR5cGVzJztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IEhUTUxUZXh0RWxlbWVudCBmcm9tICcuL0hUTUxUZXh0RWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuXG5pbXBvcnQgUmVtaXhTd2lwZXIgZnJvbSAnLi4vY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXN3aXBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxTd2lwZXJFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gUmVtaXhTd2lwZXIuZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50YWdOYW1lID0gU1dJUEVSO1xuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gIH1cbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBTV0lQRVJfSVRFTSB9IGZyb20gJy4vSFRNTFR5cGVzJztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IEhUTUxUZXh0RWxlbWVudCBmcm9tICcuL0hUTUxUZXh0RWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuXG5pbXBvcnQgUmVtaXhTd2lwZXJJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1zd2lwZXItaXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxTd2lwZXJJdGVtRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4U3dpcGVySXRlbS5kZWZhdWx0UHJvcHM7XG4gIFxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IFNXSVBFUl9JVEVNO1xuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gIH1cbn0iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCB7IFRFWFQgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5cbmltcG9ydCBSZW1peFRleHQgZnJvbSAnLi4vY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXRleHQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxUZXh0RWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4VGV4dC5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKHRleHRDb250ZW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gICAgdGhpcy50YWdOYW1lID0gVEVYVDtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBJTUFHRSA9ICdpbWFnZSc7XG5leHBvcnQgY29uc3QgQlVUVE9OID0gJ2J1dHRvbic7XG5leHBvcnQgY29uc3QgTUFQID0gJ21hcCc7XG5leHBvcnQgY29uc3QgSU5QVVQgPSAnaW5wdXQnO1xuZXhwb3J0IGNvbnN0IFZJRVcgPSAndmlldyc7XG5leHBvcnQgY29uc3QgUk9PVCA9ICdyb290JztcbmV4cG9ydCBjb25zdCBCT0RZID0gJ2JvZHknO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSAndGV4dCc7XG5leHBvcnQgY29uc3QgUExBSU5fVEVYVCA9ICcjdGV4dCc7XG5leHBvcnQgY29uc3QgUElDS0VSID0gJ3BpY2tlcic7XG5leHBvcnQgY29uc3QgU1dJUEVSX0lURU0gPSAnc3dpcGVyLWl0ZW0nO1xuZXhwb3J0IGNvbnN0IFNXSVBFUiA9ICdzd2lwZXInO1xuZXhwb3J0IGNvbnN0IFZJREVPID0gJ3ZpZGVvJzsiLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgeyBWSURFTyB9IGZyb20gJy4vSFRNTFR5cGVzJztcblxuaW1wb3J0IFJlbWl4VmlkZW8gZnJvbSAnLi4vY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXZpZGVvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhWaWRlb0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peFZpZGVvLmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IFZJREVPO1xuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZVNoZWV0KCk7XG4gIH1cblxuICBhcHBlbmRDaGlsZCAoY2hpbGQpIHt9XG4gIHJlbW92ZUNoaWxkIChjaGlsZCkge31cbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCB7IFZJRVcgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5cbmltcG9ydCBSZW1peFZpZXcgZnJvbSAnLi4vY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MVmlld0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peFZpZXcuZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ub2RlVHlwZSA9IEVMRU1FTlRfTk9ERTtcbiAgICB0aGlzLnRhZ05hbWUgPSBWSUVXO1xuICB9XG59IiwiY29uc3QgeyBnZXRPd25Qcm9wZXJ0eU5hbWVzIH0gPSBPYmplY3Q7XG5cbmNvbnN0IHByb3BlcnRpZXMgPSB7XG4gIGFsaWduQ29udGVudDogJ2FsaWduLWNvbnRlbnQnLFxuICBhbGlnbkl0ZW1zOiAnYWxpZ24taXRlbXMnLFxuICBhbGlnblNlbGY6ICdhbGlnbi1zZWxmJyxcbiAgYWxsOiAnYWxsJyxcbiAgYW5pbWF0aW9uOiAnYW5pbWF0aW9uJyxcbiAgYW5pbWF0aW9uRGVsYXk6ICdhbmltYXRpb24tZGVsYXknLFxuICBhbmltYXRpb25EaXJlY3Rpb246ICdhbmltYXRpb24tZGlyZWN0aW9uJyxcbiAgYW5pbWF0aW9uRHVyYXRpb246ICdhbmltYXRpb24tZHVyYXRpb24nLFxuICBhbmltYXRpb25GaWxsTW9kZTogJ2FuaW1hdGlvbi1maWxsLW1vZGUnLFxuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogJ2FuaW1hdGlvbi1pdGVyYXRpb24tY291bnQnLFxuICBhbmltYXRpb25OYW1lOiAnYW5pbWF0aW9uLW5hbWUnLFxuICBhbmltYXRpb25QbGF5U3RhdGU6ICdhbmltYXRpb24tcGxheS1zdGF0ZScsXG4gIGFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbicsXG4gIGFwcGVhcmFuY2U6ICdhcHBlYXJhbmNlJyxcbiAgYmFja2ZhY2VWaXNpYmlsaXR5OiAnYmFja2ZhY2UtdmlzaWJpbGl0eScsXG4gIGJhY2tncm91bmQ6ICdiYWNrZ3JvdW5kJyxcbiAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6ICdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnLFxuICBiYWNrZ3JvdW5kQmxlbmRNb2RlOiAnYmFja2dyb3VuZC1ibGVuZC1tb2RlJyxcbiAgYmFja2dyb3VuZENsaXA6ICdiYWNrZ3JvdW5kLWNsaXAnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgYmFja2dyb3VuZEltYWdlOiAnYmFja2dyb3VuZC1pbWFnZScsXG4gIGJhY2tncm91bmRPcmlnaW46ICdiYWNrZ3JvdW5kLW9yaWdpbicsXG4gIGJhY2tncm91bmRQb3NpdGlvbjogJ2JhY2tncm91bmQtcG9zaXRpb24nLFxuICBiYWNrZ3JvdW5kUmVwZWF0OiAnYmFja2dyb3VuZC1yZXBlYXQnLFxuICBiYWNrZ3JvdW5kU2l6ZTogJ2JhY2tncm91bmQtc2l6ZScsXG4gIGJvcmRlcjogJ2JvcmRlcicsXG4gIGJvcmRlckJvdHRvbTogJ2JvcmRlci1ib3R0b20nLFxuICBib3JkZXJCb3R0b21Db2xvcjogJ2JvcmRlci1ib3R0b20tY29sb3InLFxuICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAnYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cycsXG4gIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMnLFxuICBib3JkZXJCb3R0b21TdHlsZTogJ2JvcmRlci1ib3R0b20tc3R5bGUnLFxuICBib3JkZXJCb3R0b21XaWR0aDogJ2JvcmRlci1ib3R0b20td2lkdGgnLFxuICBib3JkZXJDb2xsYXBzZTogJ2JvcmRlci1jb2xsYXBzZScsXG4gIGJvcmRlckNvbG9yOiAnYm9yZGVyLWNvbG9yJyxcbiAgYm9yZGVySW1hZ2U6ICdib3JkZXItaW1hZ2UnLFxuICBib3JkZXJJbWFnZU91dHNldDogJ2JvcmRlci1pbWFnZS1vdXRzZXQnLFxuICBib3JkZXJJbWFnZVJlcGVhdDogJ2JvcmRlci1pbWFnZS1yZXBlYXQnLFxuICBib3JkZXJJbWFnZVNsaWNlOiAnYm9yZGVyLWltYWdlLXNsaWNlJyxcbiAgYm9yZGVySW1hZ2VTb3VyY2U6ICdib3JkZXItaW1hZ2Utc291cmNlJyxcbiAgYm9yZGVySW1hZ2VXaWR0aDogJ2JvcmRlci1pbWFnZS13aWR0aCcsXG4gIGJvcmRlckxlZnQ6ICdib3JkZXItbGVmdCcsXG4gIGJvcmRlckxlZnRDb2xvcjogJ2JvcmRlci1sZWZ0LWNvbG9yJyxcbiAgYm9yZGVyTGVmdFN0eWxlOiAnYm9yZGVyLWxlZnQtc3R5bGUnLFxuICBib3JkZXJMZWZ0V2lkdGg6ICdib3JkZXItbGVmdC13aWR0aCcsXG4gIGJvcmRlclJhZGl1czogJ2JvcmRlci1yYWRpdXMnLFxuICBib3JkZXJSaWdodDogJ2JvcmRlci1yaWdodCcsXG4gIGJvcmRlclJpZ2h0Q29sb3I6ICdib3JkZXItcmlnaHQtY29sb3InLFxuICBib3JkZXJSaWdodFN0eWxlOiAnYm9yZGVyLXJpZ2h0LXN0eWxlJyxcbiAgYm9yZGVyUmlnaHRXaWR0aDogJ2JvcmRlci1yaWdodC13aWR0aCcsXG4gIGJvcmRlclNwYWNpbmc6ICdib3JkZXItc3BhY2luZycsXG4gIGJvcmRlclN0eWxlOiAnYm9yZGVyLXN0eWxlJyxcbiAgYm9yZGVyVG9wOiAnYm9yZGVyLXRvcCcsXG4gIGJvcmRlclRvcENvbG9yOiAnYm9yZGVyLXRvcC1jb2xvcicsXG4gIGJvcmRlclRvcExlZnRSYWRpdXM6ICdib3JkZXItdG9wLWxlZnQtcmFkaXVzJyxcbiAgYm9yZGVyVG9wUmlnaHRSYWRpdXM6ICdib3JkZXItdG9wLXJpZ2h0LXJhZGl1cycsXG4gIGJvcmRlclRvcFN0eWxlOiAnYm9yZGVyLXRvcC1zdHlsZScsXG4gIGJvcmRlclRvcFdpZHRoOiAnYm9yZGVyLXRvcC13aWR0aCcsXG4gIGJvcmRlcldpZHRoOiAnYm9yZGVyLXdpZHRoJyxcbiAgYm90dG9tOiAnYm90dG9tJyxcbiAgYm94QWxpZ246ICdib3gtYWxpZ24nLFxuICBib3hEaXJlY3Rpb246ICdib3gtZGlyZWN0aW9uJyxcbiAgYm94RmxleDogJ2JveC1mbGV4JyxcbiAgYm94RmxleEdyb3VwOiAnYm94LWZsZXgtZ3JvdXAnLFxuICBib3hMaW5lczogJ2JveC1saW5lcycsXG4gIGJveE9yZGluYWxHcm91cDogJ2JveC1vcmRpbmFsLWdyb3VwJyxcbiAgYm94T3JpZW50OiAnYm94LW9yaWVudCcsXG4gIGJveFBhY2s6ICdib3gtcGFjaycsXG4gIGJveFNoYWRvdzogJ2JveC1zaGFkb3cnLFxuICBib3hTaXppbmc6ICdib3gtc2l6aW5nJyxcbiAgY2FwdGlvblNpZGU6ICdjYXB0aW9uLXNpZGUnLFxuICBjbGVhcjogJ2NsZWFyJyxcbiAgY2xpcDogJ2NsaXAnLFxuICBjb2xvcjogJ2NvbG9yJyxcbiAgY29sdW1uQ291bnQ6ICdjb2x1bW4tY291bnQnLFxuICBjb2x1bW5GaWxsOiAnY29sdW1uLWZpbGwnLFxuICBjb2x1bW5HYXA6ICdjb2x1bW4tZ2FwJyxcbiAgY29sdW1uUnVsZTogJ2NvbHVtbi1ydWxlJyxcbiAgY29sdW1uUnVsZUNvbG9yOiAnY29sdW1uLXJ1bGUtY29sb3InLFxuICBjb2x1bW5SdWxlU3R5bGU6ICdjb2x1bW4tcnVsZS1zdHlsZScsXG4gIGNvbHVtblJ1bGVXaWR0aDogJ2NvbHVtbi1ydWxlLXdpZHRoJyxcbiAgY29sdW1uU3BhbjogJ2NvbHVtbi1zcGFuJyxcbiAgY29sdW1uV2lkdGg6ICdjb2x1bW4td2lkdGgnLFxuICBjb2x1bW5zOiAnY29sdW1ucycsXG4gIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgY291bnRlckluY3JlbWVudDogJ2NvdW50ZXItaW5jcmVtZW50JyxcbiAgY291bnRlclJlc2V0OiAnY291bnRlci1yZXNldCcsXG4gIGN1cnNvcjogJ2N1cnNvcicsXG4gIGRpcmVjdGlvbjogJ2RpcmVjdGlvbicsXG4gIGRpc3BsYXk6ICdkaXNwbGF5JyxcbiAgZW1wdHlDZWxsczogJ2VtcHR5LWNlbGxzJyxcbiAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgZmxleDogJ2ZsZXgnLFxuICBmbGV4QmFzaXM6ICdmbGV4LWJhc2lzJyxcbiAgZmxleERpcmVjdGlvbjogJ2ZsZXgtZGlyZWN0aW9uJyxcbiAgZmxleEZsb3c6ICdmbGV4LWZsb3cnLFxuICBmbGV4R3JvdzogJ2ZsZXgtZ3JvdycsXG4gIGZsZXhTaHJpbms6ICdmbGV4LXNocmluaycsXG4gIGZsZXhXcmFwOiAnZmxleC13cmFwJyxcbiAgZmxvYXQ6ICdmbG9hdCcsXG4gIGZvbnQ6ICdmb250JyxcbiAgZm9udEZhbWlseTogJ2ZvbnQtZmFtaWx5JyxcbiAgZm9udFNpemU6ICdmb250LXNpemUnLFxuICBmb250U2l6ZUFkanVzdDogJ2ZvbnQtc2l6ZS1hZGp1c3QnLFxuICBmb250U3RyZXRjaDogJ2ZvbnQtc3RyZXRjaCcsXG4gIGZvbnRTdHlsZTogJ2ZvbnQtc3R5bGUnLFxuICBmb250VmFyaWFudDogJ2ZvbnQtdmFyaWFudCcsXG4gIGZvbnRXZWlnaHQ6ICdmb250LXdlaWdodCcsXG4gIGdyaWRDb2x1bW5zOiAnZ3JpZC1jb2x1bW5zJyxcbiAgZ3JpZFJvd3M6ICdncmlkLXJvd3MnLFxuICBoYW5naW5nUHVuY3R1YXRpb246ICdoYW5naW5nLXB1bmN0dWF0aW9uJyxcbiAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgaWNvbjogJ2ljb24nLFxuICBqdXN0aWZ5Q29udGVudDogJ2p1c3RpZnktY29udGVudCcsXG4gIGxlZnQ6ICdsZWZ0JyxcbiAgbGV0dGVyU3BhY2luZzogJ2xldHRlci1zcGFjaW5nJyxcbiAgbGluZUhlaWdodDogJ2xpbmUtaGVpZ2h0JyxcbiAgbGlzdFN0eWxlOiAnbGlzdC1zdHlsZScsXG4gIGxpc3RTdHlsZUltYWdlOiAnbGlzdC1zdHlsZS1pbWFnZScsXG4gIGxpc3RTdHlsZVBvc2l0aW9uOiAnbGlzdC1zdHlsZS1wb3NpdGlvbicsXG4gIGxpc3RTdHlsZVR5cGU6ICdsaXN0LXN0eWxlLXR5cGUnLFxuICBtYXJnaW46ICdtYXJnaW4nLFxuICBtYXJnaW5Cb3R0b206ICdtYXJnaW4tYm90dG9tJyxcbiAgbWFyZ2luTGVmdDogJ21hcmdpbi1sZWZ0JyxcbiAgbWFyZ2luUmlnaHQ6ICdtYXJnaW4tcmlnaHQnLFxuICBtYXJnaW5Ub3A6ICdtYXJnaW4tdG9wJyxcbiAgbWF4SGVpZ2h0OiAnbWF4LWhlaWdodCcsXG4gIG1heFdpZHRoOiAnbWF4LXdpZHRoJyxcbiAgbWluSGVpZ2h0OiAnbWluLWhlaWdodCcsXG4gIG1pbldpZHRoOiAnbWluLXdpZHRoJyxcbiAgbmF2RG93bjogJ25hdi1kb3duJyxcbiAgbmF2SW5kZXg6ICduYXYtaW5kZXgnLFxuICBuYXZMZWZ0OiAnbmF2LWxlZnQnLFxuICBuYXZSaWdodDogJ25hdi1yaWdodCcsXG4gIG5hdlVwOiAnbmF2LXVwJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvcmRlcjogJ29yZGVyJyxcbiAgb3V0bGluZTogJ291dGxpbmUnLFxuICBvdXRsaW5lQ29sb3I6ICdvdXRsaW5lLWNvbG9yJyxcbiAgb3V0bGluZU9mZnNldDogJ291dGxpbmUtb2Zmc2V0JyxcbiAgb3V0bGluZVN0eWxlOiAnb3V0bGluZS1zdHlsZScsXG4gIG91dGxpbmVXaWR0aDogJ291dGxpbmUtd2lkdGgnLFxuICBvdmVyZmxvdzogJ292ZXJmbG93JyxcbiAgb3ZlcmZsb3dYOiAnb3ZlcmZsb3cteCcsXG4gIG92ZXJmbG93WTogJ292ZXJmbG93LXknLFxuICBwYWRkaW5nOiAncGFkZGluZycsXG4gIHBhZGRpbmdCb3R0b206ICdwYWRkaW5nLWJvdHRvbScsXG4gIHBhZGRpbmdMZWZ0OiAncGFkZGluZy1sZWZ0JyxcbiAgcGFkZGluZ1JpZ2h0OiAncGFkZGluZy1yaWdodCcsXG4gIHBhZGRpbmdUb3A6ICdwYWRkaW5nLXRvcCcsXG4gIHBhZ2VCcmVha0FmdGVyOiAncGFnZS1icmVhay1hZnRlcicsXG4gIHBhZ2VCcmVha0JlZm9yZTogJ3BhZ2UtYnJlYWstYmVmb3JlJyxcbiAgcGFnZUJyZWFrSW5zaWRlOiAncGFnZS1icmVhay1pbnNpZGUnLFxuICBwZXJzcGVjdGl2ZTogJ3BlcnNwZWN0aXZlJyxcbiAgcGVyc3BlY3RpdmVPcmlnaW46ICdwZXJzcGVjdGl2ZS1vcmlnaW4nLFxuICBwb3NpdGlvbjogJ3Bvc2l0aW9uJyxcbiAgcHVuY3R1YXRpb25UcmltOiAncHVuY3R1YXRpb24tdHJpbScsXG4gIHF1b3RlczogJ3F1b3RlcycsXG4gIHJlc2l6ZTogJ3Jlc2l6ZScsXG4gIHJpZ2h0OiAncmlnaHQnLFxuICByb3RhdGlvbjogJ3JvdGF0aW9uJyxcbiAgdGFiU2l6ZTogJ3RhYi1zaXplJyxcbiAgdGFibGVMYXlvdXQ6ICd0YWJsZS1sYXlvdXQnLFxuICB0YXJnZXQ6ICd0YXJnZXQnLFxuICB0YXJnZXROYW1lOiAndGFyZ2V0LW5hbWUnLFxuICB0YXJnZXROZXc6ICd0YXJnZXQtbmV3JyxcbiAgdGFyZ2V0UG9zaXRpb246ICd0YXJnZXQtcG9zaXRpb24nLFxuICB0ZXh0QWxpZ246ICd0ZXh0LWFsaWduJyxcbiAgdGV4dEFsaWduTGFzdDogJ3RleHQtYWxpZ24tbGFzdCcsXG4gIHRleHREZWNvcmF0aW9uOiAndGV4dC1kZWNvcmF0aW9uJyxcbiAgdGV4dERlY29yYXRpb25Db2xvcjogJ3RleHQtZGVjb3JhdGlvbi1jb2xvcicsXG4gIHRleHREZWNvcmF0aW9uTGluZTogJ3RleHQtZGVjb3JhdGlvbi1saW5lJyxcbiAgdGV4dERlY29yYXRpb25TdHlsZTogJ3RleHQtZGVjb3JhdGlvbi1zdHlsZScsXG4gIHRleHRJbmRlbnQ6ICd0ZXh0LWluZGVudCcsXG4gIHRleHRKdXN0aWZ5OiAndGV4dC1qdXN0aWZ5JyxcbiAgdGV4dE91dGxpbmU6ICd0ZXh0LW91dGxpbmUnLFxuICB0ZXh0T3ZlcmZsb3c6ICd0ZXh0LW92ZXJmbG93JyxcbiAgdGV4dFNoYWRvdzogJ3RleHQtc2hhZG93JyxcbiAgdGV4dFRyYW5zZm9ybTogJ3RleHQtdHJhbnNmb3JtJyxcbiAgdGV4dFdyYXA6ICd0ZXh0LXdyYXAnLFxuICB0b3A6ICd0b3AnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2Zvcm0nLFxuICB0cmFuc2Zvcm1PcmlnaW46ICd0cmFuc2Zvcm0tb3JpZ2luJyxcbiAgdHJhbnNmb3JtU3R5bGU6ICd0cmFuc2Zvcm0tc3R5bGUnLFxuICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbicsXG4gIHRyYW5zaXRpb25EZWxheTogJ3RyYW5zaXRpb24tZGVsYXknLFxuICB0cmFuc2l0aW9uRHVyYXRpb246ICd0cmFuc2l0aW9uLWR1cmF0aW9uJyxcbiAgdHJhbnNpdGlvblByb3BlcnR5OiAndHJhbnNpdGlvbi1wcm9wZXJ0eScsXG4gIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJyxcbiAgdW5pY29kZUJpZGk6ICd1bmljb2RlLWJpZGknLFxuICB2ZXJ0aWNhbEFsaWduOiAndmVydGljYWwtYWxpZ24nLFxuICB2aXNpYmlsaXR5OiAndmlzaWJpbGl0eScsXG4gIHdoaXRlU3BhY2U6ICd3aGl0ZS1zcGFjZScsXG4gIHdpZHRoOiAnd2lkdGgnLFxuICB3b3JkQnJlYWs6ICd3b3JkLWJyZWFrJyxcbiAgd29yZFNwYWNpbmc6ICd3b3JkLXNwYWNpbmcnLFxuICB3b3JkV3JhcDogJ3dvcmQtd3JhcCcsXG4gIHpJbmRleDogJ3otaW5kZXgnLFxuICB3cml0aW5nTW9kZTogJ3dyaXRpbmctbW9kZScsXG59O1xuXG5cbmNsYXNzIFN0eWxlU2hlZXQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zdHJpbmcgPSAnJztcbiAgICB0aGlzLnNoZWV0ID0ge307XG4gICAgdGhpcy5pc0NoYW5nZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICBpZiAodGhpcy5pc0NoYW5nZWQpIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnNoZWV0KTtcbiAgICAgIHRoaXMuc3RyaW5nID0gbmFtZXMubWFwKG5hbWUgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc2hlZXRbbmFtZV07XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLmpvaW4oJzonKVxuICAgICAgfSkuam9pbignOycpO1xuXG4gICAgICB0aGlzLmlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHN0eWxlID0gbmV3IFN0eWxlU2hlZXQoKTtcblxuICByZXR1cm4gbmV3IFByb3h5KHN0eWxlLCB7XG4gICAgZ2V0ICh0YXJnZXQsIGtleSkge1xuICAgICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICAgIH0sXG4gICAgXG4gICAgc2V0ICh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9wZXJ0aWVzW2tleV0pIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHN0eWxlLnNoZWV0W2tleV07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgaWYgKGRhdGFbMV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBkYXRhWzFdID0gdmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3R5bGUuaXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZS5zaGVldFtrZXldID0gW1xuICAgICAgICAgICAgcHJvcGVydGllc1trZXldLCB2YWx1ZSBcbiAgICAgICAgICBdO1xuICAgICAgICAgIFxuICAgICAgICAgIHN0eWxlLmlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoKSB7fSIsImltcG9ydCB7IElNQUdFLCBJTlBVVCwgTUFQLCBCVVRUT04sIFZJRVcsIFRFWFQsIFBJQ0tFUiwgU1dJUEVSX0lURU0sIFNXSVBFUiwgUk9PVCwgVklERU8gfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcbmltcG9ydCBIVE1MSW1hZ2VFbGVtZW50IGZyb20gJy4vSFRNTEltYWdlRWxlbWVudCc7XG5pbXBvcnQgSFRNTEJ1dHRvbkVsZW1lbnQgZnJvbSAnLi9IVE1MQnV0dG9uRWxlbWVudCc7XG5pbXBvcnQgSFRNTFZpZXdFbGVtZW50IGZyb20gJy4vSFRNTFZpZXdFbGVtZW50JztcbmltcG9ydCBIVE1MVGV4dEVsZW1lbnQgZnJvbSAnLi9IVE1MVGV4dEVsZW1lbnQnO1xuaW1wb3J0IEhUTUxQaWNrZXJFbGVtZW50IGZyb20gJy4vSFRNTFBpY2tlckVsZW1lbnQnO1xuaW1wb3J0IEhUTUxTd2lwZXJJdGVtRWxlbWVudCBmcm9tICcuL0hUTUxTd2lwZXJJdGVtRWxlbWVudCc7XG5pbXBvcnQgSFRNTFN3aXBlckVsZW1lbnQgZnJvbSAnLi9IVE1MU3dpcGVyRWxlbWVudCc7XG5pbXBvcnQgSFRNTFJvb3RFbGVtZW50IGZyb20gJy4vSFRNTFJvb3RFbGVtZW50JztcbmltcG9ydCBIVE1MVmlkZW9FbGVtZW50IGZyb20gJy4vSFRNTFZpZGVvRWxlbWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKHRhZ05hbWUpIHtcbiAgbGV0IGVsZW1lbnQ7XG5cbiAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgY2FzZSBST09UOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxSb290RWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgSU1BR0U6IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTEltYWdlRWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgQlVUVE9OOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxCdXR0b25FbGVtZW50KCk7XG4gICAgfVxuXG4gICAgY2FzZSBWSUVXOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxWaWV3RWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgVEVYVDoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MVGV4dEVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIFBJQ0tFUjoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MUGlja2VyRWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgU1dJUEVSX0lURU06IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTFN3aXBlckl0ZW1FbGVtZW50KCk7XG4gICAgfVxuXG4gICAgY2FzZSBTV0lQRVI6IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTFN3aXBlckVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIFZJREVPOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxWaWRlb0VsZW1lbnQoKTtcbiAgICB9XG4gIFxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTEVsZW1lbnQodGFnTmFtZSk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgVEVYVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgeyBQTEFJTl9URVhUIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSAodGV4dCkge1xuICByZXR1cm4ge1xuICAgIG5vZGVUeXBlOiBURVhUX05PREUsXG4gICAgdGFnTmFtZTogUExBSU5fVEVYVCxcbiAgICB0ZXh0LFxuICAgIHNlcmlhbGl6ZSAoKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gIHtcbiAgICAgICAgdGFnTmFtZTogdGhpcy50YWdOYW1lLFxuICAgICAgICB0ZXh0OiB0aGlzLnRleHQsXG4gICAgICB9O1xuXG4gICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuc2xpYmluZykpIHtcbiAgICAgICAgZWxlbWVudC5zbGliaW5nID0gdGhpcy5zbGliaW5nLnNlcmlhbGl6ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgSFRNTEJvZHlFbGVtZW50IGZyb20gJy4vSFRNTEJvZHlFbGVtZW50JztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4vY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlVGV4dE5vZGUgZnJvbSAnLi9jcmVhdGVUZXh0Tm9kZSc7XG5pbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gJy4vY3JlYXRlQ29udGFpbmVyJztcbmltcG9ydCBnbG9iYWxFbGVtZW50cyBmcm9tICcuL2dsb2JhbEVsZW1lbnRzJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vLi4vZW52JztcblxuXG5jb25zdCBmYWtlRG9jdW1lbnQgPSB7XG4gIGZpbmRFbGVtZW50ICh1dWlkKSB7XG4gICAgcmV0dXJuIGdsb2JhbEVsZW1lbnRzW3V1aWRdO1xuICB9LFxuICBnZXRDb250YWluZXJFbGVtZW50cyAoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5zZXJpYWxpemUoKTtcbiAgfSxcbiAgYm9keTogbmV3IEhUTUxCb2R5RWxlbWVudCgpLFxuICBnZXRFbGVtZW50QnlJZCAoaWQpIHtcbiAgICByZXR1cm4gY3JlYXRlQ29udGFpbmVyKCdjb250YWluZXInKTtcbiAgfSxcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUgKCkge30sICBcbiAgcXVlcnlTZWxlY3RvciAoKSB7fSxcbiAgYWRkRXZlbnRMaXN0ZW5lciAodHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoKSB7XG4gICAgZGVidWdnZXI7XG4gIH0sXG5cbiAgZGlzcGF0Y2hFdmVudCAoKSB7fSxcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlVGV4dE5vZGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmFrZURvY3VtZW50O1xuXG4vLyBleHBvcnQgZGVmYXVsdCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gXG4vLyAgIHZpcnR1YWxEb2N1bWVudCA6IFxuLy8gICBlbnYuaXNEZXZUb29sUnVudGltZSA/IGZha2VEb2N1bWVudCA6IGRvY3VtZW50OyIsImV4cG9ydCBkZWZhdWx0IHt9IiwiaW1wb3J0IGRvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnO1xuXG5leHBvcnQge1xuICBkb2N1bWVudFxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9yZWFjdCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICcuLi9yZW5kZXJlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbiwgVGFiQmFyIH0gZnJvbSAnLi4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQgdGVybWluYWwgZnJvbSAnLi9ydW50aW1lL3Rlcm1pbmFsJztcbmltcG9ydCBsb2dpYyBmcm9tICcuL3J1bnRpbWUvbG9naWMnO1xuaW1wb3J0IGVudiBmcm9tICcuLi8uLi9lbnYnO1xuXG5jb25zdCB7IFRhYkJhckl0ZW0gfSA9IFRhYkJhcjtcblxuZXhwb3J0IGNvbnN0IGdldEFwcGxpY2F0aW9uID0gKCkgPT4ge1xuICByZXR1cm4gUHJvZ3JhbS5jb250ZXh0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmFtIHtcbiAgY29uc3RydWN0b3IgKEFwcCwgY29udGFpbmVyKSB7XG4gICAgUHJvZ3JhbS5jb250ZXh0ID0gdGhpcztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dCcsIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9fY29udGV4dF9fKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19jb250ZXh0X187XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fX2NvbnRleHRfXyA9IHtcbiAgICAgICAgICB0YWJCYXI6IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm91dGVyOiB7XG4gICAgICAgICAgICByb3V0ZXM6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWc6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQoQXBwKSwgY29udGFpbmVyKTtcbiAgICBcbiAgICAgICAgY29uc3Qgcm9vdENvbnRhaW5lciA9IGNvbnRhaW5lci5fcmVhY3RSb290Q29udGFpbmVyO1xuICAgICAgICBjb25zdCBjdXJyZW50RmliZXIgPSByb290Q29udGFpbmVyLl9pbnRlcm5hbFJvb3QuY3VycmVudDtcblxuICAgICAgICBsZXQgbm9kZSA9IGN1cnJlbnRGaWJlcjtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIHN3aXRjaCAobm9kZS5lbGVtZW50VHlwZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIEFwcGxpY2F0aW9uOiB7XG4gICAgICAgICAgICAgIGNvbnRleHQuY29uZmlnID0gbm9kZS5tZW1vaXplZFByb3BzLmNvbmZpZztcbiAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5vZGUuc3RhdGVOb2RlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjYXNlIFJvdXRlOiB7XG4gICAgICAgICAgICAgIGNvbnRleHQucm91dGVyLnJvdXRlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBub2RlLm1lbW9pemVkUHJvcHMucGF0aCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IG5vZGUubWVtb2l6ZWRQcm9wcy5jb21wb25lbnQgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjYXNlIFRhYkJhcjoge1xuICAgICAgICAgICAgICBjb250ZXh0LnRhYkJhciA9IHtcbiAgICAgICAgICAgICAgICAuLi5ub2RlLm1lbW9pemVkUHJvcHMsXG4gICAgICAgICAgICAgICAgLi4uY29udGV4dC50YWJCYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjYXNlIFRhYkJhckl0ZW06IHtcbiAgICAgICAgICAgICAgY29udGV4dC50YWJCYXIuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWNvbjogbm9kZS5tZW1vaXplZFByb3BzLmljb24sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uOiBub2RlLm1lbW9pemVkUHJvcHMuc2VsZWN0ZWRJY29uLFxuICAgICAgICAgICAgICAgIHBhdGg6IG5vZGUubWVtb2l6ZWRQcm9wcy5wYXRoLFxuICAgICAgICAgICAgICAgIHRleHQ6IG5vZGUubWVtb2l6ZWRQcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChub2RlLmNoaWxkKSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICB3aGlsZSAoaXNOdWxsT3JVbmRlZmluZWQobm9kZS5zaWJsaW5nKSkge1xuICAgICAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKG5vZGUucmV0dXJuKSkge1xuICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgIG5vZGUgPSBub2RlLnNpYmxpbmc7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICBpZiAoZW52LmlzRGV2VG9vbFJ1bnRpbWUpIHtcbiAgICAgIGxvZ2ljKHRoaXMuY29udGV4dCwgdGhpcy5pbnN0YW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlcm1pbmFsKHRoaXMuY29udGV4dCwgdGhpcy5pbnN0YW5jZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHRyYW5zcG9ydHMgZnJvbSAnLi9ydW50aW1lL3RyYW5zcG9ydHMnO1xuaW1wb3J0IGVudiBmcm9tICcuLi8uLi9lbnYnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChyb3V0ZSkge1xuICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICB0aGlzLmlkID0gdXVpZC52NCgpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICBjb25zdCBjdHJsID0gdGhpcztcblxuICAgIGlmIChpc0Z1bmN0aW9uKFBhZ2UpKSB7XG4gICAgICBQYWdlKHtcbiAgICAgICAgZGF0YTogeyBlbGVtZW50OiBudWxsIH0sXG4gICAgICAgIG9uTG9hZCAocXVlcnkpIHsgY3RybC5vbkxvYWQodGhpcywgcXVlcnkpIH0sXG4gICAgICAgIG9uU2hvdyAoKSB7fSxcbiAgICAgICAgb25IaWRlICgpIHt9LFxuICAgICAgICBvblVubG9hZCAoKSB7fSxcbiAgICAgICAgb25QdWxsRG93blJlZnJlc2ggKCkge30sXG4gICAgICAgIG9uU2hhcmVBcHBNZXNzYWdlIChvcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zcG9ydHMudmlldy5zaGFyZU1lc3NhZ2Uob3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG9uTG9hZCA9IChpbnN0YW5jZSwgcXVlcnkpID0+IHtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuXG4gICAgY29uc29sZS5sb2coYFtWaWV3XSBvbkxvYWQoJHt0aGlzLnJvdXRlfSlgKTtcblxuICAgIGlmIChlbnYuaXNBcHBsaWNhdGlvbkxhdW5jaGVkKSB7XG4gICAgICB0aGlzLm9uTGF1bmNoKGVudi5hcHBsaWNhdGlvbkxhdW5jaGVkT3B0aW9ucyk7XG4gICAgfSAgZWxzZSB7XG4gICAgICB0cmFuc3BvcnRzLmFwcC5vbignbGF1bmNoJywgdGhpcy5vbkxhdW5jaCk7XG4gICAgfVxuICB9XG5cbiAgb25MYXVuY2ggPSAoeyBwYXRoIH0pID0+IHtcbiAgICB0cmFuc3BvcnRzLnZpZXcubG9hZCh7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxuICAgICAgcm91dGU6IHRoaXMucm91dGVcbiAgICB9LCAoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5pbnN0YW5jZS5zZXREYXRhKHsgZWxlbWVudCB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4iLCJcbmltcG9ydCBQcm9ncmFtIGZyb20gJy4vUHJvZ3JhbSc7XG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnO1xuXG5cblxuZXhwb3J0IHtcbiAgUHJvZ3JhbSxcbiAgVmlld1xufVxuXG5leHBvcnQgKiBmcm9tICcuL3J1bnRpbWUvdGVybWluYWwnO1xuZXhwb3J0ICogZnJvbSAnLi9Qcm9ncmFtJzsiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBBUFBMSUNBVElPTiwgVklFVyB9IGZyb20gJy4vdHlwZXMnO1xuXG5cbmNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHBvc3QgKHR5cGUsIGUpIHtcbiAgICB0aGlzLmVtaXQodHlwZSwgZSk7XG4gIH1cblxuICBhcHAgKCkgeyAgICBcbiAgICByZXR1cm4ge1xuICAgICAgbGF1bmNoOiAoLi4uYXJndikgPT4ge1xuICAgICAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uTEFVTkNILCBhcmd2KTtcbiAgICAgIH0sXG5cbiAgICAgIHNob3c6ICguLi5hcmd2KSA9PiB7XG4gICAgICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5TSE9XLCBhcmd2KTtcbiAgICAgIH0sXG5cbiAgICAgIGhpZGUgKC4uLmFyZ3YpIHtcbiAgICAgICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkhJREUsIGFyZ3YpO1xuICAgICAgfSxcblxuICAgICAgZXJyb3IgKC4uLmFyZ3YpIHtcbiAgICAgICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkVSUk9SLCBhcmd2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2aWV3ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9hZCAoLi4uYXJndikge1xuICAgICAgICB0aGlzLnBvc3QoVklFVy5MT0FELCBhcmd2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG59XG5cbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGRlZmF1bHQgbmV3IFRyYW5zcG9ydCgpOyIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG5jbGFzcyBUeXBlIHtcbiAgY29uc3RydWN0b3IgKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXVpZCA9IHV1aWQudjQoKTtcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB0aGlzLnV1aWQ7XG4gIH1cbn1cblxuY29uc3QgeyBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXROYW1lcyB9ID0gT2JqZWN0O1xuY29uc3QgZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMgPSAodHlwZXMpID0+IHtcbiAgY29uc3QgbmFtZXMgPSBnZXROYW1lcyh0eXBlcyk7XG4gIGNvbnN0IHQgPSB7fTtcbiAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICB0W25hbWVdID0gbmV3IFR5cGUodHlwZXNbbmFtZV0pO1xuICB9KTtcblxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGNvbnN0IEFQUExJQ0FUSU9OID0gZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMoe1xuICBMQVVOQ0g6ICdhcHBsaWNhdGlvbi5sYXVuY2gnLFxuICBTSE9XOiAnYXBwbGljYXRpb24uc2hvdycsXG4gIEhJREU6ICdhcHBsaWNhdGlvbi5oaWRlJyxcbiAgRVJST1I6ICdhcHBsaWNhdGlvbi5lcnJvcidcbn0pO1xuXG5leHBvcnQgY29uc3QgVklFVyA9IGRlZmluZU5vdGlmaWNhdGlvblR5cGVzKHtcbiAgTE9BRDogJ3ZpZXcubG9hZCcsXG59KTsiLCJpbXBvcnQgcmVuZGVyIGZyb20gJy4uLy4uL3JlbmRlcmVyJztcbmltcG9ydCB7IGRvY3VtZW50IH0gZnJvbSAnLi4vLi4vZG9jdW1lbnQnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uLy4uL3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAoaWQsIHJvdXRlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Jvb3QnKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Mb2FkIChxdWVyeSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB7IGNvbXBvbmVudCwgcmVuZGVyOiByIH0gPSB0aGlzLnJvdXRlO1xuXG4gICAgY29uc3QgcmVuZGVyZWQgPSByZW5kZXIoXG4gICAgICBjcmVhdGVFbGVtZW50KFxuICAgICAgICBjb21wb25lbnQgfHwgclxuICAgICAgKSxcbiAgICAgIHRoaXMuY29udGFpbmVyXG4gICAgKTtcblxuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0Q29udGFpbmVyRWxlbWVudHModGhpcy5jb250YWluZXIpO1xuICAgIGNvbnNvbGUubG9nKGVsZW1lbnRzKTtcblxuICAgIC8vIGVsZW1lbnRzLm9uVG91Y2hTdGFydCA9ICdvblRvdWNoU3RhcnQnO1xuICAgIGVsZW1lbnRzLm9uVGFwID0gJ29uVGFwJztcblxuXG4gICAgY2FsbGJhY2soZWxlbWVudHMpO1xuICB9XG5cbiAgb25SZWFkeSAoKSB7XG5cbiAgfVxuXG4gXG59IiwiaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4vVmlld0NvbnRyb2xsZXInO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi4vLi4vcmVuZGVyZXInO1xuaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tICcuLi8uLi9kb2N1bWVudCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9yZWFjdC9jcmVhdGVFbGVtZW50JztcbmltcG9ydCB7IFJPT1QgfSBmcm9tICcuLi8uLi9kb2N1bWVudC9IVE1MVHlwZXMnO1xuaW1wb3J0IHRyYW5zcG9ydHMsIHsgVklFVyB9IGZyb20gJy4vdHJhbnNwb3J0cyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IElOVEVSTkFMX0lOU1RBTkNFX0tFWSB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5cbmNvbnN0IGJ1YmJsZUV2ZW50ID0gW1xuICAndG91Y2hzdGFydCcsXG4gICd0b3VjaG1vdmUnLFxuICAndG91Y2hjYW5jZWwnLFxuICAndG91Y2hlbmQnLFxuICAndGFwJyxcbiAgJ2xvbmdwcmVzcycsXG4gICdsb25ndGFwJyxcbiAgJ3RvdWNoZm9yY2VjaGFuZ2UnLFxuICAndHJhbnNpdGlvbmVuZCcsXG4gICdhbmltYXRpb25zdGFydCcsXG4gICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAnYW5pbWF0aW9uZW5kJyxcbl07XG5cbmNsYXNzIEV2ZW50T2JqZWN0IHtcbiAgY29uc3RydWN0b3IgKGV2ZW50KSB7XG4gICAgdGhpcy5fX29yaWdpbmFsX2V2ZW50X18gPSBldmVudDtcblxuICAgIGNvbnN0IHsgdHlwZSwgdG91Y2hlcywgdGltZVN0YW1wLCBjaGFuZ2VkVG91Y2hlcyB9ID0gZXZlbnQ7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudG91Y2hlcyA9IHRvdWNoZXM7XG4gICAgdGhpcy50aW1lU3RhbXAgPSB0aW1lU3RhbXA7XG4gICAgdGhpcy5jaGFuZ2VkVG91Y2hlcyA9IGNoYW5nZWRUb3VjaGVzO1xuICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZUV2ZW50LmluY2x1ZGVzKHRoaXMudHlwZSk7XG4gICAgdGhpcy5jYW5jZWxCdWJibGUgPSBmYWxzZTtcbiAgfVxuXG4gIHN0b3BQcm9wYWdhdGlvbiAoKSB7XG4gICAgdGhpcy5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICB9XG5cbiAgcHJldmVudERlZmF1bHQgKCkge31cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3RXZlbnRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgXG4gICAgdHJhbnNwb3J0cy52aWV3Lm9uRGlzcGF0Y2godGhpcy5vbkRpc3BhdGNoKTtcbiAgfVxuXG4gIGNhbGxFbGVtZW50TWV0aG9kIChlbGVtZW50LCB0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IGZpYmVyID0gZWxlbWVudFtJTlRFUk5BTF9JTlNUQU5DRV9LRVldXG5cbiAgICBpZiAoZmliZXIucmV0dXJuKSB7XG4gICAgICBjb25zdCB7IHN0YXRlTm9kZSB9ID0gZmliZXIucmV0dXJuO1xuXG4gICAgICBpZiAoc3RhdGVOb2RlLmlzUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oc3RhdGVOb2RlW3R5cGVdKSkge1xuICAgICAgICAgIHN0YXRlTm9kZVt0eXBlXShldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkRpc3BhdGNoID0gKHR5cGUsIHV1aWQsIGUpID0+IHtcbiAgICBjb25zdCB7IHRpbWVTdGFtcCwgdGFyZ2V0IH0gPSBlO1xuICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmZpbmRFbGVtZW50KGlkKTtcblxuICAgIGlmICh0aGlzLmV2ZW50c1t0aW1lU3RhbXBdKSB7ICAgICAgXG4gICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBST09UKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1t0aW1lU3RhbXBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZWxlbWVudC50YWdOYW1lICE9PSBST09UKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbdGltZVN0YW1wXSA9IG5ldyBFdmVudE9iamVjdChlKTtcbiAgICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XG4gIFxuICAgICAgICBldmVudC50YXJnZXQgPSBlbGVtZW50O1xuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gZG9jdW1lbnQuZmluZEVsZW1lbnQoaWQpO1xuICBcbiAgICAgICAgbGV0IG5vZGUgPSBlbGVtZW50O1xuICBcbiAgICAgICAgaWYgKGV2ZW50LmJ1YmJsZXMpIHtcbiAgICAgICAgICB3aGlsZSAobm9kZSAmJiBub2RlLnRhZ05hbWUgIT09IFJPT1QpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IG5vZGU7XG4gICAgICAgICAgICB0aGlzLmNhbGxFbGVtZW50TWV0aG9kKG5vZGUsIHR5cGUsIGV2ZW50KTtcbiAgXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsQnViYmxlKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYWxsRWxlbWVudE1ldGhvZChub2RlLCB0eXBlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgVmlld0NvbnRyb2xsZXIgZnJvbSAnLi9WaWV3Q29udHJvbGxlcic7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICcuLi8uLi9yZW5kZXJlcic7XG5pbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJy4uLy4uL2RvY3VtZW50JztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL3JlYWN0L2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IHRyYW5zcG9ydHMsIHsgVklFVyB9IGZyb20gJy4vdHJhbnNwb3J0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMudmlld0NvbnRyb2xsZXJzID0ge307XG5cbiAgICB0cmFuc3BvcnRzLnZpZXcub25Mb2FkKHRoaXMub25Mb2FkKTtcbiAgICB0cmFuc3BvcnRzLnZpZXcub25SZWFkeSh0aGlzLm9uUmVhZHkpO1xuICB9XG5cbiAgZ2V0IHJvdXRlcyAoKSB7XG4gICAgaWYgKHRoaXMuX19yb3V0ZXNfXykge1xuICAgICAgcmV0dXJuIHRoaXMuX19yb3V0ZXNfXztcbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZXMgPSB0aGlzLl9fcm91dGVzX18gPSB7fTtcbiAgICBjb25zdCByb3V0ZXIgPSB0aGlzLmNvbnRleHQucm91dGVyO1xuXG4gICAgcm91dGVyLnJvdXRlcy5mb3JFYWNoKHIgPT4ge1xuICAgICAgcm91dGVzW3IucGF0aF0gPSByO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJvdXRlcztcbiAgfVxuXG4gIG9uUmVhZHkgPSAoKSA9PiB7XG5cbiAgfVxuXG4gIG9uTG9hZCA9ICh7IGlkLCByb3V0ZSwgcXVlcnkgfSwgY2FsbGJhY2spID0+IHtcbiAgICBsZXQgdmlld0NvbnRyb2xsZXIgPSB0aGlzLnZpZXdDb250cm9sbGVyc1tpZF07XG4gICAgXG4gICAgaWYgKHZpZXdDb250cm9sbGVyKSB7XG4gICAgICB2aWV3Q29udHJvbGxlci5vbkxvYWQocXVlcnksIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgciA9IHRoaXMucm91dGVzW3JvdXRlXTtcbiAgXG4gICAgICBpZiAocikge1xuICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyc1tpZF0gPSB2aWV3Q29udHJvbGxlciA9IG5ldyBWaWV3Q29udHJvbGxlcihpZCwgcilcblxuICAgICAgICB2aWV3Q29udHJvbGxlci5vbkxvYWQocXVlcnksIGNhbGxiYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5yZWQoYENhbiBub3QgZmluZCByb3V0ZSFgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcbmltcG9ydCB0cmFuc3BvcnRzIGZyb20gJy4uL3RyYW5zcG9ydHMnO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gJy4uL1ZpZXdNYW5hZ2VyJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5pbXBvcnQgZW52IGZyb20gJy4uLy4uLy4uLy4uL2Vudic7XG5cblxuY2xhc3MgTG9naWNSdW50aW1lIHtcbiAgY29uc3RydWN0b3IgKGNvbnRleHQsIGluc3RhbmNlKSB7XG4gICAgdGhpcy5pZCA9IHV1aWQudjQoKTtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB0aGlzLnZpZXdNYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKGNvbnRleHQpO1xuXG4gICAgdHJhbnNwb3J0cy5hcHAub25MYXVuY2godGhpcy5vbkFwcGxpY2F0aW9uTGF1bmNoKTtcbiAgICB0cmFuc3BvcnRzLmFwcC5vbkRpc2Nvbm5lY3QodGhpcy5vbkFwcGxpY2F0aW9uRGlzY29ubmVjdGVkKTtcbiAgfVxuXG4gIG9uQXBwbGljYXRpb25EaXNjb25uZWN0ZWQgPSAoKSA9PiB7XG4gICAgdG9wLnBvc3RNZXNzYWdlKHtcbiAgICAgIGNvZGU6ICdESVNDT05ORUNURUQnXG4gICAgfSlcbiAgfVxuICBcbiAgb25BcHBsaWNhdGlvbkxhdW5jaCA9IChvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpcy5pbnN0YW5jZTtcbiAgICBcbiAgICBpZiAoaXNGdW5jdGlvbihwcm9wcy5vbkxhdW5jaCkpIHtcbiAgICAgIHByb3BzLm9uTGF1bmNoKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgY29uc3Qgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xuICAgIGNvbnN0IHF1ZXJ5ID0gcXMucGFyc2Uoc2VhcmNoKTtcblxuICAgIHRyYW5zcG9ydHMuYXBwLmNvbm5lY3QocXVlcnkuaWQsIChjb2RlKSA9PiB7XG4gICAgICBpZiAoY29kZSA9PT0gJ05PX0VYSVNUJykge1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSAgXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250ZXh0LCBpbnN0YW5jZSkge1xuICBjb25zdCBsb2dpYyA9IG5ldyBMb2dpY1J1bnRpbWUoY29udGV4dCwgaW5zdGFuY2UpO1xuXG5cbiAgbG9naWMucnVuKCk7XG59ICBcblxuIiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgdHJhbnNwb3J0cywgeyBBUEkgfSBmcm9tICcuLi90cmFuc3BvcnRzJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vLi4vLi4vLi4vZW52JztcbmltcG9ydCBjcmVhdGVOYXRpdmVTb2NrZXQgZnJvbSAnLi9OYXRpdmVTb2NrZXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVSdW50aW1lIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRyYW5zcG9ydHMuYXBpLm9uKEFQSS5SRVFVRVNULCB0aGlzLm9uUmVxdWVzdCk7XG4gICAgdHJhbnNwb3J0cy5hcGkub24oQVBJLk5BVklHQVRFX1RPLCB0aGlzLm9uTmF2aWdhdGVUbyk7XG4gICAgdHJhbnNwb3J0cy5hcGkub24oQVBJLk5BVklHQVRFX0JBQ0ssIHRoaXMub25OYXZpZ2F0ZUJhY2spO1xuICAgIHRyYW5zcG9ydHMuYXBpLm9uKEFQSS5DT05ORUNUX1NPQ0tFVCwgdGhpcy5vbkNvbm5lY3RTb2NrZXQpO1xuICB9XG5cbiAgY3JlYXRlQ29tbW9uQVBJUmVxdXN0IChhcGksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHd4W2FwaV0oe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGNvbXBsZXRlIChyZXMpIHsgY2FsbGJhY2socmVzKSB9XG4gICAgfSlcbiAgfVxuXG4gIG9uUmVxdWVzdCA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vbkFQSVJlcXVzdCgncmVxdWVzdCcsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uTmF2aWdhdGVUbyA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vbkFQSVJlcXVzdCgnbmF2aWdhdGVUbycsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uTmF2aWdhdGVCYWNrID0gKG9wdGlvbnMsIGNhbGxiYWNrKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbW9uQVBJUmVxdXN0KCduYXZpZ2F0ZUJhY2snLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkNvbm5lY3RTb2NrZXQgPSAoaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSA9PiB7XG4gICAgcmV0dXJuIGVudi5pc0luc3BlY3RNb2RlID8gXG4gICAgICBjcmVhdGVOYXRpdmVTb2NrZXQodHJhbnNwb3J0cy5hcGksIGlkLCBvcHRpb25zLCBjYWxsYmFjaykgOiBcbiAgICAgIHRoaXMuY3JlYXRlQ29tbW9uQVBJUmVxdXN0KCdjb25uZWN0U29ja2V0Jywgb3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi90cmFuc3BvcnRzJztcblxuY2xhc3MgTmF0aXZlU29ja2V0IHtcbiAgY29uc3RydWN0b3IgKHRyYW5zcG9ydCkge1xuICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICB9XG5cbiAgY29ubmVjdCAoaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIGNvbnN0IHNvY2tldCA9IHd4LmNvbm5lY3RTb2NrZXQoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGNvbXBsZXRlOiAocmVzKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25PcGVuKCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNwb3J0LnJlcGx5KHtcbiAgICAgICAgdHlwZTogQVBJLlNPQ0tFVF9PUEVOLFxuICAgICAgICBhcmd2OiBbdGhpcy5pZF1cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25NZXNzYWdlKChkYXRhKSA9PiB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICAgIHRoaXMudHJhbnNwb3J0LnJlcGx5KHtcbiAgICAgICAgdHlwZTogQVBJLlNPQ0tFVF9NRVNTQUdFLFxuICAgICAgICBhcmd2OiBbdGhpcy5pZCwgZGF0YV0sXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc3BvcnQub2ZmKEFQSS5TT0NLRVRfTUVTU0FHRSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuXG4gICAgdGhpcy50cmFuc3BvcnQub24oQVBJLlNPQ0tFVF9NRVNTQUdFLCB0aGlzLm9uTWVzc2FnZSk7XG4gIH1cblxuICBvbk1lc3NhZ2UgPSAoaWQsIG1lc3NhZ2UpID0+IHtcbiAgICBpZiAoaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5hdGl2ZVNvY2tldCAodHJhbnNwb3J0LCBpZCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgY29uc3Qgc29ja2V0ID0gbmV3IE5hdGl2ZVNvY2tldCh0cmFuc3BvcnQpO1xuXG4gIHJldHVybiBzb2NrZXQuY29ubmVjdChpZCwgb3B0aW9ucywgY2FsbGJhY2spO1xufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHRyYW5zcG9ydHMgZnJvbSAnLi4vdHJhbnNwb3J0cyc7XG5pbXBvcnQgVmlld01hbmFnZXIgZnJvbSAnLi4vVmlld01hbmFnZXInO1xuaW1wb3J0IFZpZXdFdmVudE1hbmFnZXIgZnJvbSAnLi4vVmlld0V2ZW50TWFuZ2VyJztcbmltcG9ydCBOYXRpdmVSdW50aW1lIGZyb20gJy4vTmF0aXZlUnVudGltZSc7XG5pbXBvcnQgZW52IGZyb20gJy4uLy4uLy4uLy4uL2Vudic7XG5cblxuY2xhc3MgVGVybWluYWxSdW50aW1lIGV4dGVuZHMgTmF0aXZlUnVudGltZSB7XG4gIGNvbnN0cnVjdG9yIChjb250ZXh0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5vcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIGluc3BlY3QgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyYW5zcG9ydHMuYXBwLmluc3BlY3QoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcblxuICAgICAgdHJhbnNwb3J0cy5hcHAub24oJ3JlTGF1bmNoJywgKCkgPT4ge1xuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiBgLyR7dGhpcy5vcHRpb25zLnBhdGh9YFxuICAgICAgICB9KTtcblxuICAgICAgICB0cmFuc3BvcnRzLmFwcC5vbigncmVDb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgIHd4LnNob3dUYWJCYXIoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHRyYW5zcG9ydHMuYXBwLmVtaXQoJ2xhdW5jaCcsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgd3guaGlkZVRhYkJhcigpO1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6IGDnrYnlvoXov57mjqUuLi5gXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgY29uc3QgbGF1bmNoQXBwbGljYXRpb24gPSAoKSA9PiB7XG4gICAgICBjb25zdCBjdHJsID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBBcHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd3guc2hvd1RhYkJhcigpO1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuXG4gICAgICAgIEFwcCh7XG4gICAgICAgICAgb25MYXVuY2ggKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHMuYXBwLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydHMuYXBwLmVtaXQoJ2xhdW5jaCcsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBjdHJsLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudi5pc0FwcGxpY2F0aW9uTGF1bmNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgZW52LmFwcGxpY2F0aW9uTGF1bmNoZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAgIG9uRXJyb3IgKGUpIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHMuYXBwLmVycm9yKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVudi5pc0luc3BlY3RNb2RlKSB7XG5cbiAgICAgIHd4LmhpZGVUYWJCYXIoKTtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6IGDnrYnlvoXov57mjqUuLi5gXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pbnNwZWN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgIGxhdW5jaEFwcGxpY2F0aW9uKCk7XG4gICAgICB9KS5jYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXVuY2hBcHBsaWNhdGlvbigpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgdHJhbnNwb3J0c1xufVxuZXhwb3J0ICogZnJvbSAncmVtaXhqcy1tZXNzYWdlLXByb3RvY29sJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIGNvbnN0IHJ1bnRpbWUgPSAgbmV3IFRlcm1pbmFsUnVudGltZShjb250ZXh0KTtcbiAgY29uc3Qgdmlld01hbmFnZXIgPSBuZXcgVmlld01hbmFnZXIoY29udGV4dCk7XG4gIGNvbnN0IHZpZXdFdmVudE1hbmFnZXIgPSBuZXcgVmlld0V2ZW50TWFuYWdlcihjb250ZXh0KTtcblxuICBydW50aW1lLnJ1bigpO1xufTsiLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBUdW5uZWwgZnJvbSAnLi4vdHVubmVsJztcbmltcG9ydCB7IEFQSSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgY3JlYXRlTG9naWNTb2NrZXQgZnJvbSAnLi9DbGFzc2VzL0xvZ2ljU29ja2V0JztcblxuY29uc3QgaXNTdWNjZXNzID0gKGRhdGEpID0+IHtcbiAgaWYgKC8oXFx3KStcXDpvay9nLnRlc3QoZGF0YS5lcnJNc2cpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJVHJhbnNwb3J0IGV4dGVuZHMgVHVubmVsIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9uKEFQSSwgdGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgcG9zdCA9ICh0eXBlLCBhcmd2LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSA/IHV1aWQudjQoKSA6IG51bGxcblxuICAgIGlmIChjYWxsYmFja0lkKSB7XG4gICAgICB0aGlzLm9uY2UoY2FsbGJhY2tJZCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQSSksXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFyZ3YsXG4gICAgICAgIGNhbGxiYWNrSWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlcGx5IChib2R5KSB7XG4gICAgc3VwZXIucG9zdCh7XG4gICAgICB0eXBlOiBTdHJpbmcoQVBJKSxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlQ29tbW9uUHJvbWlzZSAoYXBpLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucG9zdChhcGksIFtvcHRpb25zXSwgKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGlzU3VjY2VzcyhkYXRhKSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jb21wbGV0ZSkpIHtcbiAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICB9XG5cbiAgcmVxdWVzdCAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vblByb21pc2UoQVBJLlJFUVVFU1QsIG9wdGlvbnMpO1xuICB9XG5cbiAgbmF2aWdhdGVUbyAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vblByb21pc2UoQVBJLk5BVklHQVRFX1RPLCBvcHRpb25zKTtcbiAgfVxuXG4gIG5hdmlnYXRlQmFjayAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vblByb21pc2UoQVBJLk5BVklHQVRFX0JBQ0ssIG9wdGlvbnMpO1xuICB9XG5cbiAgY29ubmVjdFNvY2tldCAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgY3JlYXRlTG9naWNTb2NrZXQodGhpcywgb3B0aW9ucyk7XG4gIH1cbn0iLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBUdW5uZWwgZnJvbSAnLi4vdHVubmVsJztcbmltcG9ydCB7IEFQSSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5cbmNvbnN0IGlzU3VjY2VzcyA9IChkYXRhKSA9PiB7XG4gIGlmICgvKFxcdykrXFw6b2svZy50ZXN0KGRhdGEuZXJyTXNnKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSVRyYW5zcG9ydCBleHRlbmRzIFR1bm5lbCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcG9zdCA9ICh0eXBlLCBhcmd2LCBjYWxsYmFjaykgPT4ge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQSSksXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFyZ3YsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQSSksXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUNvbW1vblByb21pc2UgKGFwaSwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnBvc3QoYXBpLCBbb3B0aW9uc10sIChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChpc1N1Y2Nlc3MoZGF0YSkpIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY29tcGxldGUpKSB7XG4gICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHJlcXVlc3QgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5SRVFVRVNULCBvcHRpb25zKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG8gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5OQVZJR0FURV9UTywgb3B0aW9ucyk7XG4gIH1cblxuICBuYXZpZ2F0ZUJhY2sgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5OQVZJR0FURV9CQUNLLCBvcHRpb25zKTtcbiAgfVxuXG4gIGNvbm5lY3RTb2NrZXQgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5DT05ORUNUX1NPQ0tFVCwgb3B0aW9ucywgKCkgPT4ge30pO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBBUFBMSUNBVElPTiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uVHJhbnNwb3J0IGV4dGVuZHMgVHVubmVsIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9uKEFQUExJQ0FUSU9OLCB0aGlzLm9uTWVzc2FnZSk7XG4gIH1cblxuICBvbkRpc2Nvbm5lY3QgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbignZGlzY29ubmVjdCcsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uTGF1bmNoIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oQVBQTElDQVRJT04uTEFVTkNILCBjYWxsYmFjayk7XG4gIH1cblxuICBwb3N0ID0gKHR5cGUsIGFyZ3YsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2tJZCA9IGlzRnVuY3Rpb24oY2FsbGJhY2spID8gdXVpZC52NCgpIDogbnVsbFxuXG4gICAgaWYgKGNhbGxiYWNrSWQpIHtcbiAgICAgIHRoaXMub25jZShjYWxsYmFja0lkLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgc3VwZXIucG9zdCh7XG4gICAgICB0eXBlOiBTdHJpbmcoQVBQTElDQVRJT04pLFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlLFxuICAgICAgICBhcmd2LFxuICAgICAgICBjYWxsYmFja0lkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQUExJQ0FUSU9OKSxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgY29ubmVjdCAoaWQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkNPTk5FQ1QsIFtpZF0sIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGluc3BlY3QgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLklOU1BFQ1QsIFtdLCBjYWxsYmFjayk7XG4gIH1cblxuICBsYXVuY2ggKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uTEFVTkNILCBbb3B0aW9uc10pO1xuICB9XG5cbiAgc2hvdyAoKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLlNIT1csIFtdKTtcbiAgfVxuXG4gIGhpZGUgKCkge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5ISURFLCBbXSk7XG4gIH1cblxuICBlcnJvciAoZXJyb3IpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uRVJST1IsIFtlcnJvcl0pO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBBUFBMSUNBVElPTiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uVHJhbnNwb3J0IGV4dGVuZHMgVHVubmVsIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBvbkxhdW5jaCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKEFQUExJQ0FUSU9OLkxBVU5DSCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcG9zdCA9ICh0eXBlLCBhcmd2LCBjYWxsYmFjaykgPT4ge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQUExJQ0FUSU9OKSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXJndixcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlcGx5IChib2R5KSB7XG4gICAgc3VwZXIucG9zdCh7XG4gICAgICB0eXBlOiBTdHJpbmcoQVBQTElDQVRJT04pLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBsYXVuY2ggKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uTEFVTkNILCBbb3B0aW9uc10pO1xuICB9XG5cbiAgc2hvdyAoKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLlNIT1csIFtdKTtcbiAgfVxuXG4gIGhpZGUgKCkge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5ISURFLCBbXSk7XG4gIH1cblxuICBlcnJvciAoZXJyb3IpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uRVJST1IsIFtlcnJvcl0pO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi90eXBlcyc7XG5cbmNsYXNzIExvZ2ljU29ja2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKHRyYW5zcG9ydCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmlkID0gdXVpZC52NCgpO1xuICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICB9XG4gXG4gIGNvbm5lY3QgKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRyYW5zcG9ydC5wb3N0KFxuICAgICAgQVBJLkNPTk5FQ1RfU09DS0VULCBcbiAgICAgIFt0aGlzLmlkLCBvcHRpb25zXSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMudHJhbnNwb3J0Lm9uKEFQSS5TT0NLRVRfT1BFTiwgdGhpcy5vblNvY2tldE9wZW4pO1xuICAgIHRoaXMudHJhbnNwb3J0Lm9uKEFQSS5TT0NLRVRfTUVTU0FHRSwgdGhpcy5vblNvY2tldE1lc3NhZ2UpO1xuICB9XG5cbiAgb25Tb2NrZXRPcGVuID0gKGlkKSA9PiB7XG4gICAgaWYgKHRoaXMuaWQgPT09IGlkKSB7XG4gICAgICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgICB9XG4gIH1cblxuICBvblNvY2tldE1lc3NhZ2UgPSAoaWQsIGRhdGEpID0+IHtcbiAgICBpZiAoaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG9uT3BlbiAob25PcGVuKSB7XG4gICAgdGhpcy5vbignb3BlbicsIG9uT3Blbik7XG4gIH1cblxuICBvbk1lc3NhZ2UgKG9uTWVzc2FnZSkge1xuICAgIHRoaXMub24oJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICB9XG5cbiAgc2VuZCAoZGF0YSkge1xuICAgIHRoaXMudHJhbnNwb3J0LnJlcGx5KHtcbiAgICAgIHR5cGU6IEFQSS5TT0NLRVRfTUVTU0FHRSxcbiAgICAgIGFyZ3Y6IFt0aGlzLmlkLCBkYXRhXVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2ljU29ja2V0ICh0cmFuc3BvcnQsIG9wdGlvbnMpIHtcbiAgY29uc3Qgc29ja2V0ID0gbmV3IExvZ2ljU29ja2V0KHRyYW5zcG9ydCk7XG5cbiAgc29ja2V0LmNvbm5lY3Qob3B0aW9ucyk7XG5cbiAgcmV0dXJuIHNvY2tldDtcbn0iLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBUdW5uZWwgZnJvbSAnLi4vdHVubmVsJztcbmltcG9ydCB7IFZJRVcgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlclRyYW5zcG9ydCAgZXh0ZW5kcyBUdW5uZWwge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMub24oVklFVywgdGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgZGlzcGF0Y2ggKCkge1xuICAgIGRlYnVnZ2VyO1xuICB9XG5cbiAgcG9zdCA9ICh0eXBlLCBhcmd2LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSA/IHV1aWQudjQoKSA6IG51bGxcblxuICAgIGlmIChjYWxsYmFja0lkKSB7XG4gICAgICB0aGlzLm9uY2UoY2FsbGJhY2tJZCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKFZJRVcpLFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlLFxuICAgICAgICBhcmd2LFxuICAgICAgICBjYWxsYmFja0lkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKFZJRVcpLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBsb2FkIChkYXRhLCBjYWxsYmFjaykge1xuICAgIHRoaXMucG9zdChWSUVXLkxPQUQsIFtkYXRhXSwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25Mb2FkIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oVklFVy5MT0FELCBjYWxsYmFjayk7XG4gIH1cblxuICBvblJlYWR5IChjYWxsYmFjaykge1xuICAgIHRoaXMub24oVklFVy5SRUFEWSwgY2FsbGJhY2spO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBWSUVXIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IGRvY3VtZW50IH0gZnJvbSAnLi4vLi4vLi4vZG9jdW1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlICBleHRlbmRzIFR1bm5lbCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGlzcGF0Y2ggKHR5cGUsIGlkLCBlKSB7XG4gICAgY29uc29sZS5sb2codHlwZSwgZSlcblxuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5wb3N0KFZJRVcuRVZFTlQsIFt0eXBlLCBpZCwgZV0pO1xuICAgIH1cbiAgfVxuXG4gIGNhbGxMaWZlY3ljbGUgKHR5cGUsIGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLnBvc3QoVklFVy5MSUZFQ1lDTEUsIFt0eXBlLCBpZF0pO1xuICAgIH1cbiAgfVxuXG4gIHBvc3QgPSAodHlwZSwgYXJndiwgY2FsbGJhY2spID0+IHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhWSUVXKSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXJndixcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlcGx5IChib2R5KSB7XG4gICAgc3VwZXIucG9zdCh7XG4gICAgICB0eXBlOiBTdHJpbmcoVklFVyksXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGxvYWQgKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wb3N0KFZJRVcuTE9BRCwgW2RhdGFdLCBjYWxsYmFjayk7XG4gIH1cblxuICBzaGFyZU1lc3NhZ2UgKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBvc3QoVklFVy5MT0FELCBbb3B0aW9uc10pO1xuICB9XG5cbiAgb25TaGFyZU1lc3NhZ2UgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihWSUVXLlNIQVJFX01FU1NBR0UsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uTG9hZCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKFZJRVcuTE9BRCwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25SZWFkeSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKFZJRVcuUkVBRFksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uRGlzcGF0Y2ggKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihWSUVXLkVWRU5ULCBjYWxsYmFjayk7XG4gIH1cblxufSIsImltcG9ydCBBcHBsaWNhdGlvblRyYW5zcG9ydCBmcm9tICcuL0FwcGxpY2F0aW9uVHJhbnNwb3J0JztcbmltcG9ydCBWaWV3Q29udHJvbGxlclRyYW5zcG9ydCBmcm9tICcuL1ZpZXdDb250cm9sbGVyVHJhbnNwb3J0JztcbmltcG9ydCBBUElUcmFuc3BvcnQgZnJvbSAnLi9BUElUcmFuc3BvcnQnO1xuaW1wb3J0IEFwcGxpY2F0aW9uVHJhbnNwb3J0TmF0aXZlIGZyb20gJy4vQXBwbGljYXRpb25UcmFuc3BvcnROYXRpdmUnO1xuaW1wb3J0IFZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlIGZyb20gJy4vVmlld0NvbnRyb2xsZXJUcmFuc3BvcnROYXRpdmUnO1xuaW1wb3J0IEFQSVRyYW5zcG9ydE5hdGl2ZSBmcm9tICcuL0FQSVRyYW5zcG9ydE5hdGl2ZSc7XG5pbXBvcnQgZW52IGZyb20gJy4uLy4uLy4uLy4uL2Vudic7XG5cblxuY29uc3QgeyBpc0luc3BlY3RNb2RlIH0gPSBlbnY7XG5jb25zdCB0cmFuc3BvcnRzID0ge307XG5cbmNvbnN0IGNyZWF0ZUFwcGxpY2F0aW9uVHJhbnNwb3J0ID0gKCkgPT4ge1xuICByZXR1cm4gdHJhbnNwb3J0cy5hcHAgPSB0cmFuc3BvcnRzLmFwcCB8fCBcbiAgICAoIWlzSW5zcGVjdE1vZGUgPyBuZXcgQXBwbGljYXRpb25UcmFuc3BvcnROYXRpdmUoKSA6IG5ldyBBcHBsaWNhdGlvblRyYW5zcG9ydCgpKTtcbn1cblxuY29uc3QgY3JlYXRlVmlld0NvbnRyb2xsZXJUcmFuc3BvcnQgPSAoKSA9PiB7XG4gIHJldHVybiB0cmFuc3BvcnRzLnZpZXcgPSB0cmFuc3BvcnRzLnZpZXcgfHwgXG4gICAgKCFpc0luc3BlY3RNb2RlID8gbmV3IFZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlKCkgOiBuZXcgVmlld0NvbnRyb2xsZXJUcmFuc3BvcnQoKSk7XG59XG5cbmNvbnN0IGNyZWF0ZUFQSVRyYW5zcG9ydCA9ICgpID0+IHtcbiAgcmV0dXJuIHRyYW5zcG9ydHMuYXBpID0gdHJhbnNwb3J0cy5hcGkgfHwgXG4gICAgKCFpc0luc3BlY3RNb2RlID8gbmV3IEFQSVRyYW5zcG9ydE5hdGl2ZSgpIDogbmV3IEFQSVRyYW5zcG9ydCgpKTtcbn1cblxuXG5cblxuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldCBhcHAgKCkge1xuICAgIGlmICh0cmFuc3BvcnRzLmFwcCkge1xuICAgICAgcmV0dXJuIHRyYW5zcG9ydHMuYXBwO1xuICAgIH1cblxuICAgIHRyYW5zcG9ydHMudmlldyA9IGNyZWF0ZVZpZXdDb250cm9sbGVyVHJhbnNwb3J0KCk7XG5cbiAgICByZXR1cm4gdHJhbnNwb3J0cy5hcHAgPSBjcmVhdGVBcHBsaWNhdGlvblRyYW5zcG9ydCgpXG4gIH0sXG5cbiAgZ2V0IHZpZXcgKCkge1xuICAgIGlmICh0cmFuc3BvcnRzLnZpZXcpIHtcbiAgICAgIHJldHVybiB0cmFuc3BvcnRzLnZpZXc7XG4gICAgfVxuXG4gICAgdHJhbnNwb3J0cy5hcHAgPSBjcmVhdGVBcHBsaWNhdGlvblRyYW5zcG9ydCgpO1xuXG4gICAgcmV0dXJuIHRyYW5zcG9ydHMudmlldyA9IGNyZWF0ZVZpZXdDb250cm9sbGVyVHJhbnNwb3J0KClcbiAgfSxcblxuICBnZXQgYXBpICgpIHtcbiAgICBpZiAodHJhbnNwb3J0cy5hcGkpIHtcbiAgICAgIHJldHVybiB0cmFuc3BvcnRzLmFwaTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNwb3J0cy5hcGkgPSBjcmVhdGVBUElUcmFuc3BvcnQoKVxuICB9XG59IiwiZXhwb3J0ICogZnJvbSAncmVtaXhqcy1tZXNzYWdlLXByb3RvY29sJzsiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgb25NZXNzYWdlID0gKHsgdHlwZSwgYXJndiwgY2FsbGJhY2sgfSkgPT4ge1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgYXJndi5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgXG4gICAgICB0aGlzLmVtaXQodHlwZSwgLi4uYXJndik7XG4gICAgfVxuICB9XG5cbiAgcG9zdCAocG9zdCkge1xuICAgIGNvbnN0IHsgdHlwZSwgYm9keSB9ID0gcG9zdDtcbiAgICB0aGlzLm9uTWVzc2FnZShib2R5KTtcbiAgfVxufTsiLCJpbXBvcnQgZW52IGZyb20gJy4uLy4uLy4uLy4uL2Vudic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGNvbnN0IFNvY2tldCA9IGVudi5pc0RldlRvb2xSdW50aW1lID9cbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvciAodXJsLCBwcm90b2NvbHMpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCwgcHJvdG9jb2xzKTtcbiAgICAgIH1cblxuICAgICAgb25NZXNzYWdlID0gKG9uTWVzc2FnZSkgPT4ge1xuICAgICAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSBvbk1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIG9uT3BlbiA9IChvbk9wZW4pID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXQub25vcGVuID0gb25PcGVuO1xuICAgICAgfVxuXG4gICAgICBvbkNsb3NlID0gKG9uQ2xvc2UpID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9IG9uQ2xvc2U7XG4gICAgICB9XG5cbiAgICAgIG9uRXJyb3IgPSAob25FcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNvY2tldC5vbmVycm9yID0gb25FcnJvcjtcbiAgICAgIH1cblxuICAgICAgc2VuZCAoeyBkYXRhIH0pIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgIH1cbiAgICB9IDogZnVuY3Rpb24gKHVybCwgcHJvdG9jb2xzKSB7XG4gICAgICByZXR1cm4gd3guY29ubmVjdFNvY2tldCh7XG4gICAgICAgIHVybCwgXG4gICAgICAgIHByb3RvY29sczogW3Byb3RvY29sc11cbiAgICAgIH0pO1xuICAgIH1cblxuICBjb25zdCB7IHVybCwgcHJvdG9jb2xzIH0gPSBvcHRpb25zO1xuXG4gIHJldHVybiBuZXcgU29ja2V0KHVybCwgcHJvdG9jb2xzLmpvaW4oJysnKSk7XG59IiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAncmVtaXhqcy1tZXNzYWdlLXByb3RvY29sJztcbmltcG9ydCBTb2NrZXQgZnJvbSAnLi9Tb2NrZXQnO1xuaW1wb3J0IGVudiBmcm9tICcuLi8uLi8uLi8uLi9lbnYnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5cblxuY2xhc3MgTWVzc2FnZUVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGNvbnN0IHsgaXNEZXZUb29sUnVudGltZSB9ID0gZW52O1xuXG4gICAgdGhpcy5pZCA9IGlzRGV2VG9vbFJ1bnRpbWUgPyBlbnYuaW5zcGVjdExvZ2ljVVVJRCA6IGVudi5pbnNwZWN0VGVybWluYWxVVUlEO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgU29ja2V0KHtcbiAgICAgIHVybDogZW52Lmluc3BlY3RXU1VSTCxcbiAgICAgIHByb3RvY29sczogW1xuICAgICAgICB0aGlzLmlkLCBcbiAgICAgICAgZW52Lmluc3BlY3RUZXJtaW5hbFR5cGVzW2Vudi5pc0RldlRvb2xSdW50aW1lID8gJ0xPR0lDJyA6ICdWSUVXJ11cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMuc29ja2V0Lm9uTWVzc2FnZSgoeyBkYXRhIH0pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZShqc29uKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvY2tldC5vbk9wZW4odGhpcy5vbk9wZW4pO1xuICAgIHRoaXMuc29ja2V0Lm9uQ2xvc2UodGhpcy5vbkNsb3NlKTtcbiAgICB0aGlzLnNvY2tldC5vbkVycm9yKHRoaXMub25FcnJvcik7XG4gIH1cblxuICBwb3N0ID0gKHBvc3QpID0+IHtcbiAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuc29ja2V0LnNlbmQoe1xuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcG9zdFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKHBvc3QpO1xuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IgPSAoeyBlcnJNc2cgfSkgPT4ge1xuICAgIGlmIChlcnJNc2cgPT09ICd1cmwgbm90IGluIGRvbWFpbiBsaXN0Jykge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKTtcblxuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICBjb250ZW50OiAn6K+35Y675o6J5Z+f5ZCN5qCh6aqM77yM5ZCm5YiZ5peg5rOV6LCD6K+V55yf5py6JyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgIH0pIFxuICAgIH1cbiAgfVxuXG4gIG9uT3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgbWVzc2FnZTtcbiAgICAgIHdoaWxlIChtZXNzYWdlID0gdGhpcy5xdWV1ZS5zaGlmdCgpKSB7XG4gICAgICAgIHRoaXMucG9zdChtZXNzYWdlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgfVxuICB9XG5cbiAgb25DbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB9XG5cbiAgb25NZXNzYWdlID0gKGRhdGEpID0+IHtcbiAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldFR1bm5lbCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pZCA9IHV1aWQudjQoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBTb2NrZXRUdW5uZWwuZW1pdHRlciB8fCAoU29ja2V0VHVubmVsLmVtaXR0ZXIgPSBuZXcgTWVzc2FnZUVtaXR0ZXIoKSk7XG5cbiAgICB0aGlzLmVtaXR0ZXIub24oJ21lc3NhZ2UnLCAoeyBwb3N0IH0pID0+IHtcbiAgICAgIGNvbnN0IHsgdHlwZSwgYm9keSB9ID0gcG9zdDtcbiAgICAgIHRoaXMuZW1pdCh0eXBlLCBib2R5KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uTWVzc2FnZSA9ICh7IHR5cGUsIGFyZ3YsIGNhbGxiYWNrSWQgfSkgPT4ge1xuICAgIGlmIChjYWxsYmFja0lkKSB7XG4gICAgICBpZiAodGhpcy5ldmVudE5hbWVzKCkuaW5jbHVkZXMoY2FsbGJhY2tJZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChjYWxsYmFja0lkLCAuLi5hcmd2KTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGNvbnN0IHQgPSBuZXcgVHlwZSh0eXBlLnR5cGUsIHR5cGUudmFsdWUpO1xuICBcbiAgICAgIGlmIChjYWxsYmFja0lkKSB7XG4gICAgICAgIGFyZ3YucHVzaCgoLi4uYXJndikgPT4ge1xuICAgICAgICAgIHRoaXMucmVwbHkoe1xuICAgICAgICAgICAgYXJndixcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBjYWxsYmFja0lkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gIFxuICAgICAgdGhpcy5lbWl0KHQsIC4uLmFyZ3YpO1xuICAgIH1cbiAgfVxuXG4gIHBvc3QgKGRhdGEpIHtcbiAgICB0aGlzLmVtaXR0ZXIucG9zdChkYXRhKTtcbiAgfVxufSIsImltcG9ydCBOYXRpdmVUdW5uZWwgZnJvbSAnLi9OYXRpdmVUdW5uZWwnO1xuaW1wb3J0IFNvY2tldFR1bm5lbCBmcm9tICcuL1NvY2tldFR1bm5lbCc7XG5cbmNvbnN0IFR1bm5lbCA9IHByb2Nlc3MuZW52LklTX0lOU1BFQ1RfTU9ERSA/IFNvY2tldFR1bm5lbCA6IE5hdGl2ZVR1bm5lbDtcblxuZXhwb3J0IGRlZmF1bHQgVHVubmVsO1xuXG4iLCJpbXBvcnQgeyBpc0FycmF5LCBpc051bGxPclVuZGVmaW5lZCwgaXNJbnZhbGlkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IEVNUFRZX0FSUkFZLCBmbGF0dGVuIH0gZnJvbSAnLi4vc2hhcmVkJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcCAoXG4gIGNoaWxkcmVuLCBcbiAgaXRlcmF0ZSwgXG4gIGNvbnRleHRcbikge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoY2hpbGRyZW4pKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgY2hpbGRyZW4gPSB0b0FycmF5KGNoaWxkcmVuKTtcbiAgaWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY2hpbGRyZW4pIHtcbiAgICBpdGVyYXRlID0gaXRlcmF0ZS5iaW5kKGNvbnRleHQpO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkcmVuLm1hcChpdGVyYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2ggKFxuICBjaGlsZHJlbiwgXG4gIGl0ZXJhdGUsIFxuICBjb250ZXh0XG4pIHtcbiAgaWYgKCFpc051bGxPclVuZGVmaW5lZChjaGlsZHJlbikpIHtcbiAgICBjaGlsZHJlbiA9IHRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBjaGlsZHJlbikge1xuICAgICAgICBpdGVyYXRlID0gaXRlcmF0ZS5iaW5kKGNvbnRleHQpO1xuICAgICAgfVxuICBcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBpc0ludmFsaWQoY2hpbGRyZW5baV0pID8gbnVsbCA6IGNoaWxkcmVuW2ldO1xuICBcbiAgICAgICAgaXRlcmF0ZShjaGlsZCwgaSwgY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY291bnQgKFxuICBjaGlsZHJlblxuKSB7XG4gIGNoaWxkcmVuID0gdG9BcnJheShjaGlsZHJlbik7XG4gIHJldHVybiBjaGlsZHJlbi5sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbmx5IChcbiAgY2hpbGRyZW5cbikge1xuICBjaGlsZHJlbiA9IHRvQXJyYXkoY2hpbGRyZW4pO1xuXG4gIGlmIChjaGlsZHJlbi5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoaWxkcmVuLm9ubHkoKSBleHBlY3RzIG9ubHkgb25lIGNoaWxkLicpO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkcmVuWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheSAoXG4gIGNoaWxkcmVuXG4pIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGNoaWxkcmVuKSkge1xuICAgIHJldHVybiBFTVBUWV9BUlJBWTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIHJldHVybiBmbGF0dGVuKGNoaWxkcmVuKTtcbiAgfVxuXG4gIHJldHVybiBFTVBUWV9BUlJBWS5jb25jYXQoY2hpbGRyZW4pO1xufVxuIiwiaW1wb3J0IHtcbiAgaXNGdW5jdGlvbiwgXG59IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyAgIFxuICBleHRlbmQsIFxuICBjbG9uZSwgXG4gIG5vb3AsXG4gIEVNUFRZX09CSkVDVCBcbn0gZnJvbSAnLi4vc2hhcmVkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgfVxuICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0IHx8IEVNUFRZX09CSkVDVDtcbiAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyO1xuICB9XG5cbiAgc2V0U3RhdGUgKHN0YXRlLCBjYWxsYmFjayA9IG5vb3ApIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHN0YXRlLCBjYWxsYmFjayk7XG4gIH1cblxuICBmb3JjZVVwZGF0ZSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsIGNhbGxiYWNrKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFJlYWN0IENvbXBvbmVudCByZW5kZXIgbXVzdCBiZSBpbXBsYXRhdGVgKTtcbiAgfVxufVxuXG5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IEVNUFRZX09CSkVDVDsiLCJjb25zdCBzaGltID0gKCkgPT4gc2hpbTtcblxuc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcblxuY29uc3QgUHJvcFR5cGVzID0ge1xuICBhcnJheTogc2hpbSxcbiAgYm9vbDogc2hpbSxcbiAgZnVuYzogc2hpbSxcbiAgbnVtYmVyOiBzaGltLFxuICBvYmplY3Q6IHNoaW0sXG4gIHN0cmluZzogc2hpbSxcbiAgYW55OiBzaGltLFxuICBhcnJheU9mOiBzaGltLFxuICBlbGVtZW50OiBzaGltLFxuICBpbnN0YW5jZU9mOiBzaGltLFxuICBub2RlOiBzaGltLFxuICBvYmplY3RPZjogc2hpbSxcbiAgb25lT2Y6IHNoaW0sXG4gIG9uZU9mVHlwZTogc2hpbSxcbiAgc2hhcGU6IHNoaW0sXG4gIGV4YWN0OiBzaGltLFxuICBQcm9wVHlwZXM6IHt9LFxuICBjaGVja1Byb3BUeXBlczogc2hpbVxufTtcblByb3BUeXBlcy5Qcm9wVHlwZXMgPSBQcm9wVHlwZXM7XG5cbmV4cG9ydCB7IFByb3BUeXBlcyB9O1xuZXhwb3J0IGRlZmF1bHQgUHJvcFR5cGVzOyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQnO1xuaW1wb3J0IHsgc2hhbGxvd0VxdWFsIH0gZnJvbSAnLi4vc2hhcmVkJztcblxuY2xhc3MgUHVyZUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGlzUHVyZUNvbXBvbmVudCA9IHRydWU7XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgIXNoYWxsb3dFcXVhbCh0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1cmVDb21wb25lbnQ7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGN1cnJlbnQ6IG51bGwsXG4gIGN1cnJlbnREaXNwYXRjaGVyOiBudWxsXG59IiwiZXhwb3J0IGRlZmF1bHQge1xuICBjdXJyZW50OiBudWxsXG59IiwiaW1wb3J0IHsgUkVBQ1RfRUxFTUVOVF9UWVBFIH0gZnJvbSAnLi4vc2hhcmVkL2VsZW1lbnRUeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlYWN0RWxlbWVudCAoXG4gIHR5cGUsIFxuICBwcm9wcyA9IHt9LCBcbiAga2V5ID0gbnVsbCxcbiAgcmVmID0gbnVsbCxcbiAgb3duZXIgPSBudWxsXG4pIHtcbiAgY29uc3QgZWxlbWVudCA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgIHR5cGUsXG4gICAga2V5LFxuICAgIHJlZixcbiAgICBwcm9wcyxcbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbiIsImltcG9ydCBSZWFjdEVsZW1lbnQgZnJvbSAnLi9SZWFjdEVsZW1lbnQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lRWxlbWVudCAoZWxlbWVudCwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChcbiAgICBlbGVtZW50LnR5cGUsIFxuICAgIGtleSwgXG4gICAgcmVmLCBcbiAgICBzZWxmLCBcbiAgICBzb3VyY2UsIFxuICAgIG93bmVyLCBcbiAgICBwcm9wc1xuICApO1xufSIsImltcG9ydCBSZWFjdEVsZW1lbnQgZnJvbSAnLi9SZWFjdEVsZW1lbnQnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNVbmRlZmluZWQsIGlzQXJyYXkgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgcmVzb2x2ZURlZmF1bHRQcm9wcyB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKFxuICB0eXBlLCBcbiAgcHJvcHMgPSB7fSwgXG4gIC4uLmNoaWxkcmVuXG4pIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IGNoaWxkcmVuO1xuXG4gIGlmIChpc0Z1bmN0aW9uKHR5cGUpKSB7XG4gICAgcHJvcHMgPSByZXNvbHZlRGVmYXVsdFByb3BzKHR5cGUsIHByb3BzKTtcbiAgfSBcblxuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuXG4gIGlmIChsZW5ndGggPiAwKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlblswXTtcblxuICAgICAgaWYgKGlzQXJyYXkocHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICAgIGlmIChwcm9wcy5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuWzBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuICB9IFxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoXG4gICAgdHlwZSwgXG4gICAgeyAuLi5wcm9wcyB9XG4gICk7XG59IiwiaW1wb3J0ICogYXMgQ2hpbGRyZW4gZnJvbSAnLi9DaGlsZHJlbic7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCBQdXJlQ29tcG9uZW50IGZyb20gJy4vUHVyZUNvbXBvbmVudCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGNsb25lRWxlbWVudCBmcm9tICcuL2Nsb25lRWxlbWVudCc7XG5cbmltcG9ydCB1c2VTdGF0ZSBmcm9tICcuL3VzZVN0YXRlJztcblxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuL1Byb3BUeXBlcyc7XG5cbmV4cG9ydCB7XG4gIENoaWxkcmVuLFxuICBDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudCxcbiAgXG4gIHVzZVN0YXRlLFxuXG4gIFByb3BUeXBlc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIENoaWxkcmVuLFxuICBDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudCxcbiAgXG4gIHVzZVN0YXRlLFxuXG4gIFByb3BUeXBlc1xufSIsImltcG9ydCBSZWFjdEN1cnJlbnRPd25lciBmcm9tICcuL1JlYWN0Q3VycmVudE93bmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlU3RhdGUgKHN0YXRlKSB7XG4gIFJlYWN0Q3VycmVudE93bmVyO1xuICBkZWJ1Z2dlcjtcblxuICByZXR1cm4gW1xuICAgIHN0YXRlLFxuICAgIGZ1bmN0aW9uIHNldFN0YXRlICgpIHtcblxuICAgIH1cbiAgXVxufSIsImltcG9ydCByZW5kZXJJbnRvQ29udGFpbmVyIGZyb20gJy4vcmVuZGVySW50b0NvbnRhaW5lcic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIgKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHJlbmRlckludG9Db250YWluZXIoXG4gICAgbnVsbCxcbiAgICBlbGVtZW50LFxuICAgIGNvbnRhaW5lcixcbiAgICBjYWxsYmFja1xuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXIiLCJpbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gJy4uL3JlY29uY2lsZXIvY3JlYXRlQ29udGFpbmVyJztcbmltcG9ydCB1cGRhdGVDb250YWluZXIgZnJvbSAnLi4vcmVjb25jaWxlci91cGRhdGVDb250YWluZXInO1xuXG5pbXBvcnQgUmVhY3RDdXJyZW50Um9vdEluc3RhbmNlIGZyb20gJy4uL3JlYWN0L1JlYWN0Q3VycmVudFJvb3RJbnN0YW5jZSc7XG5cbmNsYXNzIFJlYWN0Um9vdCB7XG4gIGNvbnN0cnVjdG9yIChjb250YWluZXIpIHtcbiAgICB0aGlzLl9pbnRlcm5hbFJvb3QgPSBjcmVhdGVDb250YWluZXIoY29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbmRlciAoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB1cGRhdGVDb250YWluZXIoZWxlbWVudCwgdGhpcy5faW50ZXJuYWxSb290LCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVySW50b0NvbnRhaW5lciAoXG4gIHBhcmVudENvbXBvbmVudCwgXG4gIGVsZW1lbnQsXG4gIGNvbnRhaW5lcixcbiAgY2FsbGJhY2tcbikge1xuICBjb25zdCByb290ID0gY29udGFpbmVyLl9yZWFjdFJvb3RDb250YWluZXIgfHwgKFxuICAgIGNvbnRhaW5lci5fcmVhY3RSb290Q29udGFpbmVyID0gbmV3IFJlYWN0Um9vdChjb250YWluZXIpXG4gICk7XG5cbiAgUmVhY3RDdXJyZW50Um9vdEluc3RhbmNlLmN1cnJlbnQgPSBjb250YWluZXI7XG5cbiAgcmV0dXJuIHJvb3QucmVuZGVyKGVsZW1lbnQsIGNhbGxiYWNrKTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vcmVhY3QnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9yZWFjdC9Db21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx2aWV3PlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvdmlldz5cbiAgICApO1xuICB9XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uL3JlYWN0JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vcmVhY3QvQ29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHZpZXc+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC92aWV3PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUm91dGVyIGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBSb3V0ZSBmcm9tICcuL1JvdXRlJztcblxuZXhwb3J0IHtcbiAgUm91dGVyLFxuICBSb3V0ZVxufSIsImV4cG9ydCBjb25zdCBFTEVNRU5UX05PREUgPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFRfTk9ERSA9IDM7XG5leHBvcnQgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9OT0RFID0gOTtcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XG4iLCJjb25zdCBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5leHBvcnQgY29uc3QgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbmV4cG9ydCBjb25zdCBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbmV4cG9ydCBjb25zdCBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbmV4cG9ydCBjb25zdCBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbmV4cG9ydCBjb25zdCBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbmV4cG9ydCBjb25zdCBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7XG5leHBvcnQgY29uc3QgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xuZXhwb3J0IGNvbnN0IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG5leHBvcnQgY29uc3QgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJyk6IDB4ZWFkMDtcbmV4cG9ydCBjb25zdCBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbmV4cG9ydCBjb25zdCBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG5leHBvcnQgY29uc3QgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0XG4iLCJpbXBvcnQgeyBpc1N0cmluZywgaXNVbmRlZmluZWQsIGlzQXJyYXkgfSBmcm9tICcuL2lzJztcblxuY29uc3QgcmFuZG9tS2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XG5cbmV4cG9ydCBjb25zdCBDSElMRFJFTiA9ICdjaGlsZHJlbic7XG5leHBvcnQgY29uc3QgSFRNTCA9ICdfX2h0bWwnO1xuZXhwb3J0IGNvbnN0IFNUWUxFID0gJ3N0eWxlJztcbmV4cG9ydCBjb25zdCBTVFlMRV9OQU1FX0ZMT0FUID0gJ2Zsb2F0JztcbmV4cG9ydCBjb25zdCBEQU5HRVJPVVNMWV9TRVRfSU5ORVJfSFRNTCA9ICdkYW5nZXJvdXNseVNldElubmVySFRNTCc7XG5leHBvcnQgY29uc3QgSU5URVJOQUxfSU5TVEFOQ0VfS0VZID0gJ19fcmVhY3RJbnRlcm5hbEluc3RhbmNlJCcgKyByYW5kb21LZXk7XG5leHBvcnQgY29uc3QgSU5URVJOQUxfRVZFTlRfSEFORExFUlNfS0VZID0gJ19fcmVhY3RFdmVudEhhbmRsZXJzJCcgKyByYW5kb21LZXk7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9JTlRFUk5BTF9GSUJFUiA9ICdfcmVhY3RJbnRlcm5hbEZpYmVyJztcbmV4cG9ydCBjb25zdCBSRUFDVF9JTlRFUk5BTF9JTlNUQU5DRSA9ICdfcmVhY3RJbnRlcm5hbEluc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IE1FUkdFRF9DSElMRF9DT05URVhUID0gJ19fcmVhY3RJbnRlcm5hbE1lbW9pemVkTWVyZ2VkQ2hpbGRDb250ZXh0JztcbmV4cG9ydCBjb25zdCBNQVNLRURfQ0hJTERfQ09OVEVYVCA9ICdfX3JlYWN0SW50ZXJuYWxNZW1vaXplZE1hc2tlZENoaWxkQ29udGV4dCc7XG5leHBvcnQgY29uc3QgVU5NQVNLRURfQ0hJTERfQ09OVEVYVCA9ICdfX3JlYWN0SW50ZXJuYWxNZW1vaXplZFVubWFza2VkQ2hpbGRDb250ZXh0JztcblxuZXhwb3J0IGNvbnN0IEVNUFRZX09CSkVDVCA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX0FSUkFZID0gW107XG5leHBvcnQgY29uc3QgRU1QVFlfQ09OVEVYVCA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX1JFRlMgPSB7fTtcbmV4cG9ydCBjb25zdCBFWFBJUkVfVElNRSA9IDE7XG5cblxuZXhwb3J0IGNvbnN0IE5PX1dPUksgPSAwO1xuZXhwb3J0IGNvbnN0IFdPUktJTkcgPSAxO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCAoKSB7fVxuZXhwb3J0IGNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5leHBvcnQgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkU2V0VGV4dENvbnRlbnQgKHR5cGUsIHByb3BzKSB7XG4gIC8vIHRvZG9cbiAgcmV0dXJuIGlzU3RyaW5nKHByb3BzLmNoaWxkcmVuKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbCAoXG4gIG9iamVjdEEsIFxuICBvYmplY3RCXG4pIHtcbiAgaWYgKG9iamVjdEEgPT09IG51bGwgfHwgb2JqZWN0QiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpcyhvYmplY3RBLCBvYmplY3RCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3Qga2V5c0EgPSBvYmplY3RBID8ga2V5cyhvYmplY3RBKSA6IFtdO1xuICBjb25zdCBrZXlzQiA9IG9iamVjdEIgPyBrZXlzKG9iamVjdEIpIDogW107XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gb2JqZWN0QS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGtleXNBW2ldO1xuXG4gICAgaWYgKFxuICAgICAgIW9iamVjdEEuaGFzT3duUHJvcGVydHkoa2V5KSB8fCBcbiAgICAgICFpcyhvYmplY3RBW2tleV0sIG9iamVjdEJba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEZWZhdWx0UHJvcHMgKFxuICBDb21wb25lbnQsXG4gIHVucmVzb2x2ZWRQcm9wc1xuKSB7XG4gIGlmIChDb21wb25lbnQpIHtcbiAgICBpZiAoQ29tcG9uZW50LmRlZmF1bHRQcm9wcykge1xuICAgICAgY29uc3QgcHJvcHMgPSB7IC4uLiB1bnJlc29sdmVkUHJvcHMgfTtcbiAgICAgIGNvbnN0IGRlZmF1bHRQcm9wcyA9IENvbXBvbmVudC5kZWZhdWx0UHJvcHM7XG5cbiAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHVucmVzb2x2ZWRQcm9wcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAoXG4gIHRhcmdldCwgXG4gIHNvdXJjZSxcbikge1xuICBpZiAoc291cmNlKSB7XG4gICAgcmV0dXJuIGFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKHRhcmdldCkge1xuICByZXR1cm4gZXh0ZW5kKHt9LCBjbG9uZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuIChhcnJheSwgcmVzdWx0ID0gW10pIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IGFycmF5O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmbGF0dGVuKHZhbHVlLCByZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgSE9TVF9DT01QT05FTlQsIEhPU1RfUE9SVEFMLCBIT1NUX1JPT1QgfSBmcm9tICcuL3dvcmtUYWdzJztcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsIChvKSB7XG4gIHJldHVybiBvID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQgKG8pIHtcbiAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24gKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcgKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0IChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgIWlzTnVsbChvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyIChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCAobykge1xuICByZXR1cm4gbyA9PT0gdW5kZWZpbmVkIHx8IG8gPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ludmFsaWQgKG8pIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnRDb25zdHJ1Y3RvciAoQ29tcG9uZW50KSB7XG4gIGNvbnN0IHByb3RvID0gQ29tcG9uZW50LnByb3RvdHlwZTtcblxuICByZXR1cm4gISEocHJvdG8gJiYgcHJvdG8uaXNSZWFjdENvbXBvbmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xlZ2FjeUNvbnRleHRDb25zdW1lciAoQ29tcG9uZW50KSB7XG4gIGNvbnN0IGNvbnRleHRUeXBlcyA9IENvbXBvbmVudC5jb250ZXh0VHlwZXM7XG5cbiAgcmV0dXJuICFpc051bGxPclVuZGVmaW5lZChjb250ZXh0VHlwZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIgKENvbXBvbmVudCkge1xuICBjb25zdCB7IGNoaWxkQ29udGV4dFR5cGVzIH0gPSBDb21wb25lbnQ7XG4gIFxuICByZXR1cm4gIWlzTnVsbE9yVW5kZWZpbmVkKGNoaWxkQ29udGV4dFR5cGVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSG9zdFBhcmVudCAoZmliZXIpIHtcbiAgY29uc3QgeyB0YWcgfSA9IGZpYmVyO1xuXG4gIHJldHVybiAoXG4gICAgdGFnID09PSBIT1NUX0NPTVBPTkVOVCB8fFxuICAgIHRhZyA9PT0gSE9TVF9ST09UIHx8XG4gICAgdGFnID09PSBIT1NUX1BPUlRBTFxuICApO1xufVxuXG5leHBvcnQgY29uc3QgaXMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH1cblxuICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xufSIsIlxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OX0NPTVBPTkVOVCA9IDA7XG5leHBvcnQgY29uc3QgQ0xBU1NfQ09NUE9ORU5UID0gMTtcbmV4cG9ydCBjb25zdCBJTkRFVEVSTUlOQVRFX0NPTVBPTkVOVCA9IDI7XG5leHBvcnQgY29uc3QgSE9TVF9ST09UID0gMztcbmV4cG9ydCBjb25zdCBIT1NUX1BPUlRBTCA9IDQ7XG5leHBvcnQgY29uc3QgSE9TVF9DT01QT05FTlQgPSA1O1xuZXhwb3J0IGNvbnN0IEhPU1RfVEVYVCA9IDY7XG5leHBvcnQgY29uc3QgRlJBR01FTlQgPSA3O1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9DT05TVU1FUiA9IDk7XG5leHBvcnQgY29uc3QgQ09OVEVYVF9QUk9WSURFUiA9IDEwO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==