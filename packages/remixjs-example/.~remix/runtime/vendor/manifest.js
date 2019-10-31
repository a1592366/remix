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
  return (0, _renderIntoContainer["default"])(element, container, callback);
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

var _scheduleWork = _interopRequireDefault(__webpack_require__(/*! ../scheduler/scheduleWork */ "../remixjs/src/scheduler/scheduleWork.js"));

function renderIntoContainer(element, container, callback) {
  var _ref = container._reactRootContainer || (container._reactRootContainer = {
    internalRoot: createFiberRoot(container)
  }),
      current = _ref.current;

  return (0, _scheduleWork["default"])(current, element, callback);
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

/***/ "../remixjs/src/scheduler/createUpdate.js":
/*!************************************************!*\
  !*** ../remixjs/src/scheduler/createUpdate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "../remixjs/src/scheduler/index.js":
/*!*****************************************!*\
  !*** ../remixjs/src/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var scheduler = {
  updateQueue: []
};
var _default = scheduler;
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/scheduler/scheduleWork.js":
/*!************************************************!*\
  !*** ../remixjs/src/scheduler/scheduleWork.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _createUpdate = _interopRequireDefault(__webpack_require__(/*! ./createUpdate */ "../remixjs/src/scheduler/createUpdate.js"));

var _enqueueUpdate = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './enqueueUpdate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/index.js"));

function scheduleWork(current, element, callback) {
  var update = (0, _createUpdate["default"])();
  update.payload = {
    element: element
  };

  if ((0, _is.isFunction)(callback)) {
    update.callback = callback;
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1jbGkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMtY2xpL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzLW1lc3NhZ2UtcHJvdG9jb2wvZGlzdC9wcm90b2NvbC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1tZXNzYWdlLXByb3RvY29sL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy1tZXNzYWdlLXByb3RvY29sL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9lbnYuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3FzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL0FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL1RhYkJhci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9WaWV3Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LWJ1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LWltYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtaW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1waWNrZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1yb290L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtc2Nyb2xsLXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1zd2lwZXItaXRlbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXN3aXBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXRleHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC12aWRlby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvY29tcG9uZW50cy9yZW1peC1lbGVtZW50L3JlbWl4LXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxCb2R5RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTEJ1dHRvbkVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MSW1hZ2VFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MUGlja2VyRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFJvb3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MU3dpcGVyRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFN3aXBlckl0ZW1FbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9IVE1MVGV4dEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L0hUTUxUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFZpZGVvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvSFRNTFZpZXdFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9TdHlsZVNoZWV0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9jcmVhdGVDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2NyZWF0ZVRleHROb2RlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9kb2N1bWVudC9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvZG9jdW1lbnQvZ2xvYmFsRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL2RvY3VtZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L1Byb2dyYW0uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvVmlldy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ub3RpZmljYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3Qvbm90aWZpY2F0aW9uL3R5cGVzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvVmlld0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS9WaWV3RXZlbnRNYW5nZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS9WaWV3TWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL2xvZ2ljL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdGVybWluYWwvTmF0aXZlUnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3Rlcm1pbmFsL05hdGl2ZVNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3Rlcm1pbmFsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9BUElUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL0FQSVRyYW5zcG9ydE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3RyYW5zcG9ydHMvQXBwbGljYXRpb25UcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL0FwcGxpY2F0aW9uVHJhbnNwb3J0TmF0aXZlLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9DbGFzc2VzL0xvZ2ljU29ja2V0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy9WaWV3Q29udHJvbGxlclRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3RyYW5zcG9ydHMvVmlld0NvbnRyb2xsZXJUcmFuc3BvcnROYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHJhbnNwb3J0cy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3R1bm5lbC9OYXRpdmVUdW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3Byb2plY3QvcnVudGltZS90dW5uZWwvU29ja2V0LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9wcm9qZWN0L3J1bnRpbWUvdHVubmVsL1NvY2tldFR1bm5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcHJvamVjdC9ydW50aW1lL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9QdXJlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9SZWFjdEN1cnJlbnRPd25lci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVhY3QvUmVhY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC9jbG9uZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlYWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9yZWFjdC91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcmVuZGVyZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JlbmRlcmVyL3JlbmRlckludG9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3JvdXRlci9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcm91dGVyL1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvcm91dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9zY2hlZHVsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NjaGVkdWxlci9zY2hlZHVsZVdvcmsuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9IVE1MTm9kZVR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9lbGVtZW50VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvc3JjL3NoYXJlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9zcmMvc2hhcmVkL2lzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3NyYy9zaGFyZWQvd29ya1RhZ3MuanMiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiQ09NTU9OIiwiQVBJIiwiVklFVyIsIkFQUExJQ0FUSU9OIiwiVHlwZSIsIl9jbGFzc0NhbGxDaGVjazIiLCJfY3JlYXRlQ2xhc3MyIiwiX2RlZmluZVByb3BlcnR5MiIsIl91dWlkIiwidHlwZSIsInR5cGVzIiwidXVpZCIsInY0IiwidG9TdHJpbmciLCJnZXROYW1lcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJkZWZpbmVOb3RpZmljYXRpb25UeXBlcyIsInByZWZpeCIsIm5hbWVzIiwiZm9yRWFjaCIsImNvbmNhdCIsIkxBVU5DSCIsIkNPTk5FQ1QiLCJJTlNQRUNUIiwiU0hPVyIsIkhJREUiLCJFUlJPUiIsIkxPQUQiLCJSRUFEWSIsIkVWRU5UIiwiUkVRVUVTVCIsIk5BVklHQVRFX1RPIiwiTkFWSUdBVEVfQkFDSyIsIkNPTk5FQ1RfU09DS0VUIiwiU09DS0VUX09QRU4iLCJTT0NLRVRfTUVTU0FHRSIsIkNBTExCQUNLIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJ2MSIsImJ5dGVUb0hleCIsInN1YnN0ciIsImJ5dGVzVG9VdWlkIiwiYnVmIiwib2Zmc2V0IiwiYnRoIiwiam9pbiIsImdldFJhbmRvbVZhbHVlcyIsImNyeXB0byIsIm1zQ3J5cHRvIiwid2luZG93Iiwicm5kczgiLCJVaW50OEFycmF5Iiwid2hhdHdnUk5HIiwicm5kcyIsIkFycmF5IiwibWF0aFJORyIsIk1hdGgiLCJyYW5kb20iLCJybmciLCJfbm9kZUlkIiwiX2Nsb2Nrc2VxIiwiX2xhc3RNU2VjcyIsIl9sYXN0TlNlY3MiLCJvcHRpb25zIiwiYiIsIm5vZGUiLCJjbG9ja3NlcSIsInVuZGVmaW5lZCIsInNlZWRCeXRlcyIsIm1zZWNzIiwiRGF0ZSIsImdldFRpbWUiLCJuc2VjcyIsImR0IiwiRXJyb3IiLCJ0bCIsInRtaCIsImlpIiwiaXNJbnNwZWN0TW9kZSIsInByb2Nlc3MiLCJpbnNwZWN0V1NVUkwiLCJpbnRlcm5hbFVJVVJMIiwiaW5zcGVjdE1lc3NhZ2VUeXBlcyIsImluc3BlY3RUZXJtaW5hbFR5cGVzIiwiaW5zcGVjdFRlcm1pbmFsVVVJRCIsImluc3BlY3RMb2dpY1VVSUQiLCJBcHBsaWNhdGlvbiIsImFyZ3YiLCJvbkxhdW5jaCIsImFwcGx5IiwiY2hpbGRyZW4iLCJjaGlsZCIsIlJvdXRlciIsIlRhYkJhciIsInB1c2giLCJjbG9uZUFwcGxpY2F0aW9uQ2hpbGRyZW4iLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwibm9vcCIsIlRhYkJhckl0ZW0iLCJwYXRoIiwic3RyaW5nIiwiaWNvbiIsInNlbGVjdGVkSWNvbiIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwib25lT2YiLCJwb3NpdGlvbiIsImN1c3RvbSIsImJvb2wiLCJib3R0b20iLCJWaWV3Q29udHJvbGxlciIsImNvbnRleHQiLCJSZW1peEJ1dHRvbiIsImUiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hDYW5jZWwiLCJvblRvdWNoRW5kIiwib25UYXAiLCJvbkxvbmdQcmVzcyIsIm9uTG9uZ1RhcCIsIm9uVG91Y2hGb3JjZUNoYW5nZSIsIm9uVHJhbnNpdGlvbkVuZCIsIm9uQW5pbWF0aW9uU3RhcnQiLCJvbkFuaW1hdGlvbkl0ZXJhdGlvbiIsIm9uQW5pbWF0aW9uRW5kIiwib25HZXRVc2VySW5mbyIsIm9uQ29udGFjdCIsIm9uR2V0UGhvbmVOdW1iZXIiLCJvbk9wZW5TZXR0aW5nIiwib25MYXVuY2hBcHAiLCJvbkVycm9yIiwic3R5bGUiLCJjbGFzc05hbWUiLCJzaXplIiwicGxhaW4iLCJkaXNhYmxlZCIsImxvYWRpbmciLCJmb3JtVHlwZSIsIm9wZW5UeXBlIiwiaG92ZXJDbGFzcyIsImhvdmVyU3RvcFByb3BhZ2F0aW9uIiwiaG92ZXJTdGFydFRpbWUiLCJob3ZlclN0YXlUaW1lIiwibGFuZyIsInNlc3Npb25Gcm9tIiwic2VuZE1lc3NhZ2VUaXRsZSIsInNlbmRNZXNzYWdlUGF0aCIsInNlbmRNZXNzYWdlSW1nIiwiYXBwUGFyYW1ldGVyIiwic2hvd01lc3NhZ2VDYXJkIiwiUmVhY3QiLCJudW1iZXIiLCJSZW1peEltYWdlIiwib25Mb2FkIiwic3JjIiwid2VicCIsImxhenlMb2FkIiwic2hvd01lbnVCeUxvbmdwcmVzcyIsIlJlbWl4SW5wdXQiLCJvbklucHV0Iiwib25Gb2N1cyIsIm9uQmx1ciIsIm9uQ29uZmlybSIsIm9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UiLCJwYXNzd29yZCIsInBsYWNlaG9sZGVyIiwicGxhY2Vob2xkZXJTdHlsZSIsInBsYWNlaG9sZGVyQ2xhc3MiLCJtYXhsZW5ndGgiLCJjdXJzb3JTcGFjaW5nIiwiYXV0b0ZvY3VzIiwiZm9jdXMiLCJjb25maXJtVHlwZSIsImNvbmZpcm1Ib2xkIiwiY3Vyc29yIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJhZGp1c3RQb3NpdGlvbiIsImhvbGRLZXlib2FyZCIsIlJlbWl4TWFwIiwib25NYXJrZXJUYXAiLCJvbkxhYmVsVGFwIiwib25Db250cm9sVGFwIiwib25DYWxsb3V0VGFwIiwib25VcGRhdGVkIiwib25SZWdpb25DaGFuZ2UiLCJvblBvaVRhcCIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwic2NhbGUiLCJtYXJrZXJzIiwiY292ZXJzIiwicG9seWxpbmUiLCJjaXJjbGVzIiwiY29udHJvbHMiLCJpbmNsdWRlUG9pbnRzIiwic2hvd0xvY2F0aW9uIiwicG9seWdvbnMiLCJzdWJrZXkiLCJsYXllclN0eWxlIiwicm90YXRlIiwic2tldyIsImVuYWJsZTNEIiwic2hvd0NvbXBhc3MiLCJzaG93U2NhbGUiLCJlbmFibGVPdmVybG9va2luZyIsImVuYWJsZVpvb20iLCJlbmFibGVTY3JvbGwiLCJlbmFibGVSb3RhdGUiLCJlbmFibGVTYXRlbGxpdGUiLCJlbmFibGVUcmFmZmljIiwic2V0dGluZyIsImFycmF5IiwiUmVtaXhQaWNrZXIiLCJvbkNhbmNlbCIsIm9uQ2hhbmdlIiwib25Db2x1bW5DaGFuZ2UiLCJyYW5nZSIsInJhbmdlS2V5Iiwic3RhcnQiLCJlbmQiLCJmaWVsZHMiLCJjdXN0b21JdGVtIiwiUmVtaXhSb290IiwiUmVtaXhTY3JvbGxWaWV3Iiwib25TY3JvbGxUb1VwcGVyIiwib25TY3JvbGxUb0xvd2VyIiwib25TY3JvbGwiLCJzY3JvbGxYIiwic2Nyb2xsWSIsInVwcGVyVGhyZXNob2xkIiwibG93ZXJUaHJlc2hvbGQiLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsSW50b1ZpZXciLCJzY3JvbGxXaXRoQW5pbWF0aW9uIiwiZW5hYmxlQmFja1RvVG9wIiwiZW5hYmxlRmxleCIsInNjcm9sbEFuY2hvcmluZyIsIlJlbWl4U3dpcGVySXRlbSIsIml0ZW1JZCIsIlJlbWl4U3dpcGVyIiwib25BbmltYXRpb25GaW5pc2giLCJpbmRpY2F0b3JEb3RzIiwiaW5kaWNhdG9yQ29sb3IiLCJpbmRpY2F0b3JBY3RpdmVDb2xvciIsImF1dG9wbGF5IiwiY3VycmVudCIsImludGVydmFsIiwiZHVyYXRpb24iLCJjaXJjdWxhciIsInZlcnRpY2FsIiwicHJldmlvdXNNYXJnaW4iLCJuZXh0TWFyZ2luIiwiZGlzcGxheU11bHRpcGxlSXRlbXMiLCJza2lwSGlkZGVuSXRlbUxheW91IiwiZWFzaW5nRnVuY3Rpb24iLCJTd2lwZXJJdGVtIiwiUmVtaXhUZXh0Iiwic2VsZWN0YWJsZSIsInNwYWNlIiwiZGVjb2RlIiwiUmVtaXhWaWRlbyIsIm9uUGxheSIsIm9uUGF1c2UiLCJvbkVuZGVkIiwib25UaW1lVXBkYXRlIiwib25GdWxsU2NyZWVuQ2hhbmdlIiwib25XYWl0aW5nIiwib25Qcm9ncmVzcyIsIm9uTG9hZGVkTWV0YURhdGEiLCJkYW5tdUxpc3QiLCJkYW5tdUJ1dHRvbiIsImVuYWJsZURhbm11IiwibG9vcCIsIm11dGVkIiwiaW5pdGlhbFRpbWUiLCJwYWdlR2VzdHVyZSIsImRpcmVjdGlvbiIsInNob3dQcm9ncmVzcyIsInNob3dGdWxsc2NyZWVuQnV0dG9uIiwic2hvd1BsYXlCdXR0b24iLCJzaG93Q2VudGVyUGxheUJ1dHRvbiIsImVuYWJsZVByb2dyZXNzR2VzdHVyZSIsIm9iamVjdEZpdCIsInBvc3RlciIsInNob3dNdXRlQnV0dG9uIiwidGl0bGUiLCJwbGF5QnV0dG9uUG9zaXRpb24iLCJlbmFibGVQbGF5R2VzdHVyZSIsImF1dG9QYXVzZUlmTmF2aWdhdGUiLCJhdXRvUGF1c2VJZk9wZW5OYXRpdmUiLCJ2c2xpZGVHZXN0dXJlIiwidnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbiIsImFkVW5pdElkIiwiUmVtaXhWaWV3IiwiRWxlbWVudCIsInRhZ05hbWUiLCJub2RlVHlwZSIsImxhc3RDaGlsZCIsImdsb2JhbEVsZW1lbnRzIiwiZG9jdW1lbnQiLCJIVE1MQm9keUVsZW1lbnQiLCJCT0RZIiwiRUxFTUVOVF9OT0RFIiwiSFRNTEVsZW1lbnQiLCJIVE1MQnV0dG9uRWxlbWVudCIsIkJVVFRPTiIsImRlZmF1bHRQcm9wcyIsInJlc29sdmVEZWZhdWx0UHJvcHMiLCJ1bnJlc29sdmVkUHJvcHMiLCJwcm9wTmFtZSIsIlN0eWxlU2hlZXQiLCJzbGliaW5nIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiU3RyaW5nIiwic2VyaWFsaXplIiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiSFRNTEltYWdlRWxlbWVudCIsIklNQUdFIiwiSFRNTFBpY2tlckVsZW1lbnQiLCJQSUNLRVIiLCJIVE1MVmlld0VsZW1lbnQiLCJST09UIiwiSFRNTFN3aXBlckVsZW1lbnQiLCJTV0lQRVIiLCJIVE1MU3dpcGVySXRlbUVsZW1lbnQiLCJTV0lQRVJfSVRFTSIsIkhUTUxUZXh0RWxlbWVudCIsInRleHRDb250ZW50IiwiVEVYVCIsIk1BUCIsIklOUFVUIiwiUExBSU5fVEVYVCIsIlZJREVPIiwiUmVtaXhWaWRlb0VsZW1lbnQiLCJwcm9wZXJ0aWVzIiwiYWxpZ25Db250ZW50IiwiYWxpZ25JdGVtcyIsImFsaWduU2VsZiIsImFsbCIsImFuaW1hdGlvbiIsImFuaW1hdGlvbkRlbGF5IiwiYW5pbWF0aW9uRGlyZWN0aW9uIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJhbmltYXRpb25GaWxsTW9kZSIsImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50IiwiYW5pbWF0aW9uTmFtZSIsImFuaW1hdGlvblBsYXlTdGF0ZSIsImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uIiwiYXBwZWFyYW5jZSIsImJhY2tmYWNlVmlzaWJpbGl0eSIsImJhY2tncm91bmQiLCJiYWNrZ3JvdW5kQXR0YWNobWVudCIsImJhY2tncm91bmRCbGVuZE1vZGUiLCJiYWNrZ3JvdW5kQ2xpcCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRPcmlnaW4iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFNpemUiLCJib3JkZXIiLCJib3JkZXJCb3R0b20iLCJib3JkZXJCb3R0b21Db2xvciIsImJvcmRlckJvdHRvbUxlZnRSYWRpdXMiLCJib3JkZXJCb3R0b21SaWdodFJhZGl1cyIsImJvcmRlckJvdHRvbVN0eWxlIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJib3JkZXJDb2xsYXBzZSIsImJvcmRlckNvbG9yIiwiYm9yZGVySW1hZ2UiLCJib3JkZXJJbWFnZU91dHNldCIsImJvcmRlckltYWdlUmVwZWF0IiwiYm9yZGVySW1hZ2VTbGljZSIsImJvcmRlckltYWdlU291cmNlIiwiYm9yZGVySW1hZ2VXaWR0aCIsImJvcmRlckxlZnQiLCJib3JkZXJMZWZ0Q29sb3IiLCJib3JkZXJMZWZ0U3R5bGUiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJSaWdodCIsImJvcmRlclJpZ2h0Q29sb3IiLCJib3JkZXJSaWdodFN0eWxlIiwiYm9yZGVyUmlnaHRXaWR0aCIsImJvcmRlclNwYWNpbmciLCJib3JkZXJUb3AiLCJib3JkZXJUb3BDb2xvciIsImJvcmRlclRvcExlZnRSYWRpdXMiLCJib3JkZXJUb3BSaWdodFJhZGl1cyIsImJvcmRlclRvcFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJXaWR0aCIsImJveEFsaWduIiwiYm94RGlyZWN0aW9uIiwiYm94RmxleCIsImJveEZsZXhHcm91cCIsImJveExpbmVzIiwiYm94T3JkaW5hbEdyb3VwIiwiYm94T3JpZW50IiwiYm94UGFjayIsImJveFNoYWRvdyIsImJveFNpemluZyIsImNhcHRpb25TaWRlIiwiY2xlYXIiLCJjbGlwIiwiY29sdW1uQ291bnQiLCJjb2x1bW5GaWxsIiwiY29sdW1uR2FwIiwiY29sdW1uUnVsZSIsImNvbHVtblJ1bGVDb2xvciIsImNvbHVtblJ1bGVTdHlsZSIsImNvbHVtblJ1bGVXaWR0aCIsImNvbHVtblNwYW4iLCJjb2x1bW5XaWR0aCIsImNvbHVtbnMiLCJjb250ZW50IiwiY291bnRlckluY3JlbWVudCIsImNvdW50ZXJSZXNldCIsImRpc3BsYXkiLCJlbXB0eUNlbGxzIiwiZmlsdGVyIiwiZmxleCIsImZsZXhCYXNpcyIsImZsZXhEaXJlY3Rpb24iLCJmbGV4RmxvdyIsImZsZXhHcm93IiwiZmxleFNocmluayIsImZsZXhXcmFwIiwiZm9udCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRTaXplQWRqdXN0IiwiZm9udFN0cmV0Y2giLCJmb250U3R5bGUiLCJmb250VmFyaWFudCIsImZvbnRXZWlnaHQiLCJncmlkQ29sdW1ucyIsImdyaWRSb3dzIiwiaGFuZ2luZ1B1bmN0dWF0aW9uIiwiaGVpZ2h0IiwianVzdGlmeUNvbnRlbnQiLCJsZWZ0IiwibGV0dGVyU3BhY2luZyIsImxpbmVIZWlnaHQiLCJsaXN0U3R5bGUiLCJsaXN0U3R5bGVJbWFnZSIsImxpc3RTdHlsZVBvc2l0aW9uIiwibGlzdFN0eWxlVHlwZSIsIm1hcmdpbiIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsIm1hcmdpblRvcCIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwibWluSGVpZ2h0IiwibWluV2lkdGgiLCJuYXZEb3duIiwibmF2SW5kZXgiLCJuYXZMZWZ0IiwibmF2UmlnaHQiLCJuYXZVcCIsIm9wYWNpdHkiLCJvcmRlciIsIm91dGxpbmUiLCJvdXRsaW5lQ29sb3IiLCJvdXRsaW5lT2Zmc2V0Iiwib3V0bGluZVN0eWxlIiwib3V0bGluZVdpZHRoIiwib3ZlcmZsb3ciLCJvdmVyZmxvd1giLCJvdmVyZmxvd1kiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ1RvcCIsInBhZ2VCcmVha0FmdGVyIiwicGFnZUJyZWFrQmVmb3JlIiwicGFnZUJyZWFrSW5zaWRlIiwicGVyc3BlY3RpdmUiLCJwZXJzcGVjdGl2ZU9yaWdpbiIsInB1bmN0dWF0aW9uVHJpbSIsInF1b3RlcyIsInJlc2l6ZSIsInJpZ2h0Iiwicm90YXRpb24iLCJ0YWJTaXplIiwidGFibGVMYXlvdXQiLCJ0YXJnZXROYW1lIiwidGFyZ2V0TmV3IiwidGFyZ2V0UG9zaXRpb24iLCJ0ZXh0QWxpZ24iLCJ0ZXh0QWxpZ25MYXN0IiwidGV4dERlY29yYXRpb24iLCJ0ZXh0RGVjb3JhdGlvbkNvbG9yIiwidGV4dERlY29yYXRpb25MaW5lIiwidGV4dERlY29yYXRpb25TdHlsZSIsInRleHRJbmRlbnQiLCJ0ZXh0SnVzdGlmeSIsInRleHRPdXRsaW5lIiwidGV4dE92ZXJmbG93IiwidGV4dFNoYWRvdyIsInRleHRUcmFuc2Zvcm0iLCJ0ZXh0V3JhcCIsInRvcCIsInRyYW5zZm9ybSIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zZm9ybVN0eWxlIiwidHJhbnNpdGlvbiIsInRyYW5zaXRpb25EZWxheSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiIsInVuaWNvZGVCaWRpIiwidmVydGljYWxBbGlnbiIsInZpc2liaWxpdHkiLCJ3aGl0ZVNwYWNlIiwid2lkdGgiLCJ3b3JkQnJlYWsiLCJ3b3JkU3BhY2luZyIsIndvcmRXcmFwIiwiekluZGV4Iiwid3JpdGluZ01vZGUiLCJzaGVldCIsImlzQ2hhbmdlZCIsIm1hcCIsIlByb3h5Iiwic2V0IiwiZGF0YSIsImNyZWF0ZUNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJIVE1MUm9vdEVsZW1lbnQiLCJIVE1MVmlkZW9FbGVtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJ0ZXh0IiwiVEVYVF9OT0RFIiwiZmFrZURvY3VtZW50IiwiZmluZEVsZW1lbnQiLCJnZXRDb250YWluZXJFbGVtZW50cyIsImNvbnRhaW5lciIsImJvZHkiLCJnZXRFbGVtZW50QnlJZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYWxsYmFjayIsImNhcHR1cmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsImdldEFwcGxpY2F0aW9uIiwiUHJvZ3JhbSIsIkFwcCIsIl9fY29udGV4dF9fIiwidGFiQmFyIiwiaXRlbXMiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJjb25maWciLCJyb290Q29udGFpbmVyIiwiX3JlYWN0Um9vdENvbnRhaW5lciIsImN1cnJlbnRGaWJlciIsIl9pbnRlcm5hbFJvb3QiLCJlbGVtZW50VHlwZSIsIm1lbW9pemVkUHJvcHMiLCJzdGF0ZU5vZGUiLCJSb3V0ZSIsImNvbXBvbmVudCIsInNpYmxpbmciLCJlbnYiLCJpc0RldlRvb2xSdW50aW1lIiwicm91dGUiLCJxdWVyeSIsImlzQXBwbGljYXRpb25MYXVuY2hlZCIsImFwcGxpY2F0aW9uTGF1bmNoZWRPcHRpb25zIiwidHJhbnNwb3J0cyIsImFwcCIsIm9uIiwidmlldyIsImxvYWQiLCJzZXREYXRhIiwiaW5pdCIsImN0cmwiLCJQYWdlIiwib25TaG93Iiwib25IaWRlIiwib25VbmxvYWQiLCJvblB1bGxEb3duUmVmcmVzaCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwic2hhcmVNZXNzYWdlIiwiVHJhbnNwb3J0IiwiZW1pdCIsImxhdW5jaCIsInBvc3QiLCJzaG93IiwiaGlkZSIsImVycm9yIiwiRXZlbnRFbWl0dGVyIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJyZW5kZXJlZCIsImVsZW1lbnRzIiwiYnViYmxlRXZlbnQiLCJFdmVudE9iamVjdCIsImV2ZW50IiwiX19vcmlnaW5hbF9ldmVudF9fIiwidG91Y2hlcyIsInRpbWVTdGFtcCIsImNoYW5nZWRUb3VjaGVzIiwiYnViYmxlcyIsImluY2x1ZGVzIiwiY2FuY2VsQnViYmxlIiwiVmlld0V2ZW50TWFuYWdlciIsImV2ZW50cyIsImN1cnJlbnRUYXJnZXQiLCJjYWxsRWxlbWVudE1ldGhvZCIsIm9uRGlzcGF0Y2giLCJmaWJlciIsIklOVEVSTkFMX0lOU1RBTkNFX0tFWSIsImlzUmVhY3RDb21wb25lbnQiLCJWaWV3TWFuYWdlciIsInZpZXdDb250cm9sbGVyIiwidmlld0NvbnRyb2xsZXJzIiwibG9nZ2VyIiwicmVkIiwib25SZWFkeSIsIl9fcm91dGVzX18iLCJMb2dpY1J1bnRpbWUiLCJwb3N0TWVzc2FnZSIsImNvZGUiLCJ2aWV3TWFuYWdlciIsIm9uQXBwbGljYXRpb25MYXVuY2giLCJvbkRpc2Nvbm5lY3QiLCJvbkFwcGxpY2F0aW9uRGlzY29ubmVjdGVkIiwic2VhcmNoIiwibG9jYXRpb24iLCJzbGljZSIsInFzIiwicGFyc2UiLCJjb25uZWN0IiwibG9naWMiLCJydW4iLCJOYXRpdmVSdW50aW1lIiwiY3JlYXRlQ29tbW9uQVBJUmVxdXN0IiwiYXBpIiwib25SZXF1ZXN0Iiwib25OYXZpZ2F0ZVRvIiwib25OYXZpZ2F0ZUJhY2siLCJvbkNvbm5lY3RTb2NrZXQiLCJ3eCIsImNvbXBsZXRlIiwicmVzIiwiTmF0aXZlU29ja2V0IiwidHJhbnNwb3J0IiwibWVzc2FnZSIsInNvY2tldCIsInNlbmQiLCJjb25uZWN0U29ja2V0Iiwib25PcGVuIiwicmVwbHkiLCJvbk1lc3NhZ2UiLCJvbkNsb3NlIiwib2ZmIiwiY3JlYXRlTmF0aXZlU29ja2V0IiwiVGVybWluYWxSdW50aW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnNwZWN0IiwicmVMYXVuY2giLCJ1cmwiLCJzaG93VGFiQmFyIiwiaGlkZUxvYWRpbmciLCJoaWRlVGFiQmFyIiwic2hvd0xvYWRpbmciLCJsYXVuY2hBcHBsaWNhdGlvbiIsInRoZW4iLCJydW50aW1lIiwidmlld0V2ZW50TWFuYWdlciIsImlzU3VjY2VzcyIsInRlc3QiLCJlcnJNc2ciLCJBUElUcmFuc3BvcnQiLCJjYWxsYmFja0lkIiwib25jZSIsImNyZWF0ZUNvbW1vblByb21pc2UiLCJjcmVhdGVMb2dpY1NvY2tldCIsIlR1bm5lbCIsIkFwcGxpY2F0aW9uVHJhbnNwb3J0IiwiTG9naWNTb2NrZXQiLCJvblNvY2tldE9wZW4iLCJvblNvY2tldE1lc3NhZ2UiLCJWaWV3Q29udHJvbGxlclRyYW5zcG9ydCIsIlZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlIiwiTElGRUNZQ0xFIiwiU0hBUkVfTUVTU0FHRSIsImNyZWF0ZUFwcGxpY2F0aW9uVHJhbnNwb3J0IiwiQXBwbGljYXRpb25UcmFuc3BvcnROYXRpdmUiLCJjcmVhdGVWaWV3Q29udHJvbGxlclRyYW5zcG9ydCIsImNyZWF0ZUFQSVRyYW5zcG9ydCIsIkFQSVRyYW5zcG9ydE5hdGl2ZSIsIlNvY2tldCIsInByb3RvY29scyIsIm9ubWVzc2FnZSIsIm9ub3BlbiIsIm9uY2xvc2UiLCJvbmVycm9yIiwiV2ViU29ja2V0IiwiTWVzc2FnZUVtaXR0ZXIiLCJjb25uZWN0ZWQiLCJKU09OIiwic3RyaW5naWZ5IiwicXVldWUiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwic2hpZnQiLCJqc29uIiwiZXJyIiwiU29ja2V0VHVubmVsIiwiZXZlbnROYW1lcyIsImVtaXR0ZXIiLCJOYXRpdmVUdW5uZWwiLCJpdGVyYXRlIiwidG9BcnJheSIsImNvdW50Iiwib25seSIsIkVNUFRZX0FSUkFZIiwidXBkYXRlciIsInN0YXRlIiwiRU1QVFlfT0JKRUNUIiwicmVmcyIsImVucXVldWVTZXRTdGF0ZSIsImVucXVldWVGb3JjZVVwZGF0ZSIsInNoaW0iLCJpc1JlcXVpcmVkIiwiYW55IiwiYXJyYXlPZiIsImluc3RhbmNlT2YiLCJvYmplY3RPZiIsIm9uZU9mVHlwZSIsInNoYXBlIiwiZXhhY3QiLCJjaGVja1Byb3BUeXBlcyIsIlB1cmVDb21wb25lbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJjdXJyZW50RGlzcGF0Y2hlciIsIlJlYWN0RWxlbWVudCIsInJlZiIsIm93bmVyIiwiJCR0eXBlb2YiLCJSRUFDVF9FTEVNRU5UX1RZUEUiLCJfb3duZXIiLCJjbG9uZUVsZW1lbnQiLCJzZWxmIiwic291cmNlIiwiQ2hpbGRyZW4iLCJ1c2VTdGF0ZSIsIlJlYWN0Q3VycmVudE93bmVyIiwic2V0U3RhdGUiLCJyZW5kZXJJbnRvQ29udGFpbmVyIiwiaW50ZXJuYWxSb290IiwiY3JlYXRlRmliZXJSb290Iiwic2NoZWR1bGVyIiwidXBkYXRlUXVldWUiLCJzY2hlZHVsZVdvcmsiLCJ1cGRhdGUiLCJwYXlsb2FkIiwiQ09NTUVOVF9OT0RFIiwiRE9DVU1FTlRfTk9ERSIsIkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUiLCJoYXNTeW1ib2wiLCJSRUFDVF9QT1JUQUxfVFlQRSIsIlJFQUNUX0ZSQUdNRU5UX1RZUEUiLCJSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIiwiUkVBQ1RfUFJPRklMRVJfVFlQRSIsIlJFQUNUX1BST1ZJREVSX1RZUEUiLCJSRUFDVF9DT05URVhUX1RZUEUiLCJSRUFDVF9BU1lOQ19NT0RFX1RZUEUiLCJSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSIsIlJFQUNUX0ZPUldBUkRfUkVGX1RZUEUiLCJSRUFDVF9TVVNQRU5TRV9UWVBFIiwiUkVBQ1RfTUVNT19UWVBFIiwiUkVBQ1RfTEFaWV9UWVBFIiwicmFuZG9tS2V5IiwiQ0hJTERSRU4iLCJIVE1MIiwiU1RZTEUiLCJTVFlMRV9OQU1FX0ZMT0FUIiwiREFOR0VST1VTTFlfU0VUX0lOTkVSX0hUTUwiLCJJTlRFUk5BTF9FVkVOVF9IQU5ETEVSU19LRVkiLCJSRUFDVF9JTlRFUk5BTF9GSUJFUiIsIlJFQUNUX0lOVEVSTkFMX0lOU1RBTkNFIiwiTUVSR0VEX0NISUxEX0NPTlRFWFQiLCJNQVNLRURfQ0hJTERfQ09OVEVYVCIsIlVOTUFTS0VEX0NISUxEX0NPTlRFWFQiLCJFTVBUWV9DT05URVhUIiwiRU1QVFlfUkVGUyIsIkVYUElSRV9USU1FIiwiTk9fV09SSyIsIldPUktJTkciLCJhc3NpZ24iLCJrZXlzIiwic2hvdWxkU2V0VGV4dENvbnRlbnQiLCJzaGFsbG93RXF1YWwiLCJvYmplY3RBIiwib2JqZWN0QiIsImlzIiwia2V5c0EiLCJrZXlzQiIsImV4dGVuZCIsImNsb25lIiwiZmxhdHRlbiIsInJlc3VsdCIsImlzQXJyYXkiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImlzRnVuY3Rpb24iLCJpc1N0cmluZyIsImlzT2JqZWN0IiwiaXNOdW1iZXIiLCJpc051bGxPclVuZGVmaW5lZCIsImlzSW52YWxpZCIsImlzQ29tcG9uZW50Q29uc3RydWN0b3IiLCJwcm90byIsImlzTGVnYWN5Q29udGV4dENvbnN1bWVyIiwiY29udGV4dFR5cGVzIiwiaXNDb250ZXh0UHJvdmlkZXIiLCJjaGlsZENvbnRleHRUeXBlcyIsImlzSG9zdFBhcmVudCIsInRhZyIsIkhPU1RfQ09NUE9ORU5UIiwiSE9TVF9ST09UIiwiSE9TVF9QT1JUQUwiLCJ4IiwieSIsIkZVTkNUSU9OX0NPTVBPTkVOVCIsIkNMQVNTX0NPTVBPTkVOVCIsIklOREVURVJNSU5BVEVfQ09NUE9ORU5UIiwiSE9TVF9URVhUIiwiRlJBR01FTlQiLCJDT05URVhUX0NPTlNVTUVSIiwiQ09OVEVYVF9QUk9WSURFUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFD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QUNBLElBQU1DLGVBQWUsR0FBRyxDQUF4Qjs7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyxDQUFoQzs7QUFDQSxJQUFNTixTQUFTLEdBQUcsQ0FBbEI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLENBQXBCOztBQUNBLElBQU1GLGNBQWMsR0FBRyxDQUF2Qjs7QUFDQSxJQUFNUSxTQUFTLEdBQUcsQ0FBbEI7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHLENBQWpCOztBQUVBLElBQU1DLGdCQUFnQixHQUFHLENBQXpCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLEVBQXpCIiwiZmlsZSI6InJ1bnRpbWUvdmVuZG9yL21hbmlmZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGw7XG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJyA/IFIuYXBwbHkgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG59O1xudmFyIFJlZmxlY3RPd25LZXlzO1xuXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzO1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyOyAvLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcblxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDsgLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cblxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59OyAvLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuXG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcblxuICB2YXIgZG9FcnJvciA9IHR5cGUgPT09ICdlcnJvcic7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkgZG9FcnJvciA9IGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQ7ZWxzZSBpZiAoIWRvRXJyb3IpIHJldHVybiBmYWxzZTsgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApIGVyID0gYXJnc1swXTtcblxuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9IC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcblxuXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7IC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcblxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTsgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcblxuXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcblxuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7IC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgKyAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgKyAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbn07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICB2YXIgYXJncyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcblxuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHtcbiAgICBmaXJlZDogZmFsc2UsXG4gICAgd3JhcEZuOiB1bmRlZmluZWQsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgdHlwZTogdHlwZSxcbiAgICBsaXN0ZW5lcjogbGlzdGVuZXJcbiAgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9IGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTsgLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cblxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xuICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtlbHNlIHtcbiAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcG9zaXRpb24gPSAtMTtcblxuICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKSByZXR1cm4gdGhpcztcbiAgICBpZiAocG9zaXRpb24gPT09IDApIGxpc3Quc2hpZnQoKTtlbHNlIHtcbiAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgfVxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcbiAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzOyAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG5cbiAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7ZWxzZSBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuXG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgdmFyIGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcbiAgcmV0dXJuIHVud3JhcCA/IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIChlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuXG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKSBjb3B5W2ldID0gYXJyW2ldO1xuXG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKSBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcblxuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgaWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG4gICAgbW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgbW9kdWxlLnBhdGhzID0gW107IC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXG4gICAgaWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZS5sO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbW9kdWxlLmk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG4gIH1cblxuICByZXR1cm4gbW9kdWxlO1xufTsiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4vKioqKioqLyBcdFx0cmV0dXJuIG5zO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovICh7XG5cbi8qKiovIFwiLi9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIEBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0ICovIFwiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanNcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNPTU1PTiA9IGV4cG9ydHMuQVBJID0gZXhwb3J0cy5WSUVXID0gZXhwb3J0cy5BUFBMSUNBVElPTiA9IGV4cG9ydHMuVHlwZSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oLyohIEBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2sgKi8gXCIuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oLyohIEBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MgKi8gXCIuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oLyohIEBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkgKi8gXCIuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXCIpKTtcblxudmFyIF91dWlkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB1dWlkICovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qc1wiKSk7XG5cbnZhciBUeXBlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVHlwZSh0eXBlLCB2YWx1ZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syW1wiZGVmYXVsdFwiXSkodGhpcywgVHlwZSk7XG5cbiAgICBpZiAoVHlwZS50eXBlc1t2YWx1ZV0pIHtcbiAgICAgIHJldHVybiBUeXBlLnR5cGVzW3ZhbHVlXTtcbiAgICB9XG5cbiAgICBUeXBlLnR5cGVzW3ZhbHVlXSA9IHRoaXM7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51dWlkID0gX3V1aWRbXCJkZWZhdWx0XCJdLnY0KCk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFR5cGUsIFt7XG4gICAga2V5OiBcInRvU3RyaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUeXBlO1xufSgpO1xuXG5leHBvcnRzLlR5cGUgPSBUeXBlO1xuKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKShUeXBlLCBcInR5cGVzXCIsIHt9KTtcbnZhciBnZXROYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuXG52YXIgZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMgPSBmdW5jdGlvbiBkZWZpbmVOb3RpZmljYXRpb25UeXBlcyhwcmVmaXgsIHR5cGVzKSB7XG4gIHZhciBuYW1lcyA9IGdldE5hbWVzKHR5cGVzKTtcbiAgdmFyIHQgPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG4gIH07XG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0W25hbWVdID0gbmV3IFR5cGUocHJlZml4LCBcIlwiLmNvbmNhdChwcmVmaXgsIFwiLlwiKS5jb25jYXQodHlwZXNbbmFtZV0pKTtcbiAgfSk7XG4gIHJldHVybiB0O1xufTtcblxudmFyIEFQUExJQ0FUSU9OID0gZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMoJ2FwcGxpY2F0aW9uJywge1xuICBMQVVOQ0g6ICdsYXVuY2gnLFxuICBDT05ORUNUOiAnY29ubmVjdCcsXG4gIElOU1BFQ1Q6ICdpbnNwZWN0JyxcbiAgU0hPVzogJ3Nob3cnLFxuICBISURFOiAnaGlkZScsXG4gIEVSUk9SOiAnZXJyb3InXG59KTtcbmV4cG9ydHMuQVBQTElDQVRJT04gPSBBUFBMSUNBVElPTjtcbnZhciBWSUVXID0gZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMoJ3ZpZXcnLCB7XG4gIExPQUQ6ICdsb2FkJyxcbiAgUkVBRFk6ICdyZWFkeScsXG4gIFNIT1c6ICdzaG93JyxcbiAgSElERTogJ2hpZGUnLFxuICBFVkVOVDogJ2V2ZW50J1xufSk7XG5leHBvcnRzLlZJRVcgPSBWSUVXO1xudmFyIEFQSSA9IGRlZmluZU5vdGlmaWNhdGlvblR5cGVzKCdhcGknLCB7XG4gIFJFUVVFU1Q6ICdyZXF1ZXN0JyxcbiAgTkFWSUdBVEVfVE86ICduYXZpZ2F0ZVRvJyxcbiAgTkFWSUdBVEVfQkFDSzogJ25hdmlnYXRlQmFjaycsXG4gIENPTk5FQ1RfU09DS0VUOiAnY29ubmVjdFNvY2tldCcsXG4gIFNPQ0tFVF9PUEVOOiAnc29ja2V0T3BlbicsXG4gIFNPQ0tFVF9NRVNTQUdFOiAnc29ja2V0TWVzc2FnZSdcbn0pO1xuZXhwb3J0cy5BUEkgPSBBUEk7XG52YXIgQ09NTU9OID0gZGVmaW5lTm90aWZpY2F0aW9uVHlwZXMoJ2NvbW1vbicsIHtcbiAgQ0FMTEJBQ0s6ICdjYWxsYmFjaydcbn0pO1xuZXhwb3J0cy5DT01NT04gPSBDT01NT047XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzcztcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHYxID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi92MSAqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanNcIik7XG52YXIgdjQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3Y0ICovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qc1wiKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBybmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2xpYi9ybmcgKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qc1wiKTtcbnZhciBieXRlc1RvVXVpZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbGliL2J5dGVzVG9VdWlkICovIFwiLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanNcIik7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHJuZyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vbGliL3JuZyAqLyBcIi4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzXCIpO1xudmFyIGJ5dGVzVG9VdWlkID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9saWIvYnl0ZXNUb1V1aWQgKi8gXCIuL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qc1wiKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvdG9jb2wuanMubWFwIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbn1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZXhwb3J0IGNvbnN0IGlzSW5zcGVjdE1vZGUgPSBwcm9jZXNzLmVudi5JU19JTlNQRUNUX01PREU7XG5leHBvcnQgY29uc3QgaW5zcGVjdFdTVVJMID0gcHJvY2Vzcy5lbnYuSU5TUEVDVF9XU19VUkw7XG5leHBvcnQgY29uc3QgaW50ZXJuYWxVSVVSTCA9IHByb2Nlc3MuZW52LklOU1BFQ1RfVUlfVVJMO1xuZXhwb3J0IGNvbnN0IGluc3BlY3RNZXNzYWdlVHlwZXMgPSBwcm9jZXNzLmVudi5JTlNFUENUX01FU1NBR0VfVFlQRVM7XG5leHBvcnQgY29uc3QgaW5zcGVjdFRlcm1pbmFsVHlwZXMgPSBwcm9jZXNzLmVudi5JTlNQRUNUX1RFUk1JTkFMX1RZUEVTO1xuZXhwb3J0IGNvbnN0IGluc3BlY3RUZXJtaW5hbFVVSUQgPSBwcm9jZXNzLmVudi5JTlNQRUNUX1RFUk1JTkFMX1VVSUQ7XG5leHBvcnQgY29uc3QgaW5zcGVjdExvZ2ljVVVJRCA9IHByb2Nlc3MuZW52LklOU1BFQ1RfTE9HSUNfVVVJRDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0luc3BlY3RNb2RlLFxuICBpbnNwZWN0V1NVUkwsXG4gIGludGVybmFsVUlVUkwsXG4gIGluc3BlY3RNZXNzYWdlVHlwZXMsXG4gIGluc3BlY3RUZXJtaW5hbFR5cGVzLFxuICBpbnNwZWN0VGVybWluYWxVVUlELFxuICBpbnNwZWN0TG9naWNVVUlEXG59IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBzdXBlclByb3BCYXNlID0gcmVxdWlyZShcIi4vc3VwZXJQcm9wQmFzZVwiKTtcblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBSZWZsZWN0LmdldDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IHN1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXQ7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO1xuXG4gIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIHZhciBuZXdPYmogPSB7fTtcblxuICBpZiAob2JqICE9IG51bGwpIHtcbiAgICB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDtcblxuICAgICAgICBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcblxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZS5zZXQob2JqLCBuZXdPYmopO1xuICB9XG5cbiAgcmV0dXJuIG5ld09iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZDsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zdXBlclByb3BCYXNlOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbn1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgRm9ybWF0ID0ge1xuICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbm1vZHVsZS5leHBvcnRzID0gdXRpbC5hc3NpZ24oe1xuICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICBmb3JtYXR0ZXJzOiB7XG4gICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgfSxcbiAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgfVxufSwgRm9ybWF0KTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG5cbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmb3JtYXRzOiBmb3JtYXRzLFxuICBwYXJzZTogcGFyc2UsXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgYXJyYXlMaW1pdDogMjAsXG4gIGNoYXJzZXQ6ICd1dGYtOCcsXG4gIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gIGNvbW1hOiBmYWxzZSxcbiAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICBkZWxpbWl0ZXI6ICcmJyxcbiAgZGVwdGg6IDUsXG4gIGlnbm9yZVF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gIHBhcnNlQXJyYXlzOiB0cnVlLFxuICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAoJDAsIG51bWJlclN0cikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgfSk7XG59OyAvLyBUaGlzIGlzIHdoYXQgYnJvd3NlcnMgd2lsbCBzdWJtaXQgd2hlbiB0aGUg4pyTIGNoYXJhY3RlciBvY2N1cnMgaW4gYW5cbi8vIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCBib2R5IGFuZCB0aGUgZW5jb2Rpbmcgb2YgdGhlIHBhZ2UgY29udGFpbmluZ1xuLy8gdGhlIGZvcm0gaXMgaXNvLTg4NTktMSwgb3Igd2hlbiB0aGUgc3VibWl0dGVkIGZvcm0gaGFzIGFuIGFjY2VwdC1jaGFyc2V0XG4vLyBhdHRyaWJ1dGUgb2YgaXNvLTg4NTktMS4gUHJlc3VtYWJseSBhbHNvIHdpdGggb3RoZXIgY2hhcnNldHMgdGhhdCBkbyBub3QgY29udGFpblxuLy8gdGhlIOKckyBjaGFyYWN0ZXIsIHN1Y2ggYXMgdXMtYXNjaWkuXG5cblxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7Jylcbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG5cbiAgdmFyIGk7XG4gIHZhciBjaGFyc2V0ID0gb3B0aW9ucy5jaGFyc2V0O1xuXG4gIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgaWYgKHBhcnRzW2ldID09PSBjaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXSA9PT0gaXNvU2VudGluZWwpIHtcbiAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICB9XG5cbiAgICAgICAgc2tpcEluZGV4ID0gaTtcbiAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuICAgIHZhciBrZXksIHZhbDtcblxuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKDAsIHBvcyksIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICB9XG5cbiAgICBpZiAodmFsICYmIG9wdGlvbnMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzICYmIGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgdmFsID0gaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzKHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbCAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgdmFsID0gdmFsLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgZm9yICh2YXIgaSA9IGNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgdmFyIG9iajtcbiAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgaWYgKHJvb3QgPT09ICdbXScgJiYgb3B0aW9ucy5wYXJzZUFycmF5cykge1xuICAgICAgb2JqID0gW10uY29uY2F0KGxlYWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuXG4gICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgMDogbGVhZlxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICghaXNOYU4oaW5kZXgpICYmIHJvb3QgIT09IGNsZWFuUm9vdCAmJiBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3QgJiYgaW5kZXggPj0gMCAmJiBvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdCkge1xuICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgb2JqW2luZGV4XSA9IGxlYWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGVhZiA9IG9iajtcbiAgfVxuXG4gIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgaWYgKCFnaXZlbktleSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cblxuXG4gIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTsgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nOyAvLyBHZXQgdGhlIHBhcmVudFxuXG4gIHZhciBzZWdtZW50ID0gb3B0aW9ucy5kZXB0aCA+IDAgJiYgYnJhY2tldHMuZXhlYyhrZXkpO1xuICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTsgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICB2YXIga2V5cyA9IFtdO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5cyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGtleXMucHVzaChwYXJlbnQpO1xuICB9IC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG5cbiAgdmFyIGkgPSAwO1xuXG4gIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICBpICs9IDE7XG5cbiAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICB9IC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuXG4gIGlmIChzZWdtZW50KSB7XG4gICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICBpZiAoIW9wdHMpIHtcbiAgICByZXR1cm4gZGVmYXVsdHM7XG4gIH1cblxuICBpZiAob3B0cy5kZWNvZGVyICE9PSBudWxsICYmIG9wdHMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciBjaGFyc2V0ID0gdHlwZW9mIG9wdHMuY2hhcnNldCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5jaGFyc2V0IDogb3B0cy5jaGFyc2V0O1xuICByZXR1cm4ge1xuICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgYWxsb3dQcm90b3R5cGVzOiB0eXBlb2Ygb3B0cy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzLFxuICAgIGFycmF5TGltaXQ6IHR5cGVvZiBvcHRzLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0cy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdCxcbiAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICBjb21tYTogdHlwZW9mIG9wdHMuY29tbWEgPT09ICdib29sZWFuJyA/IG9wdHMuY29tbWEgOiBkZWZhdWx0cy5jb21tYSxcbiAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0cy5kZWxpbWl0ZXIpID8gb3B0cy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uLCBuby1leHRyYS1wYXJlbnNcbiAgICBkZXB0aDogdHlwZW9mIG9wdHMuZGVwdGggPT09ICdudW1iZXInIHx8IG9wdHMuZGVwdGggPT09IGZhbHNlID8gK29wdHMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aCxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IHR5cGVvZiBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgOiBkZWZhdWx0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMsXG4gICAgcGFyYW1ldGVyTGltaXQ6IHR5cGVvZiBvcHRzLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdCxcbiAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgcGxhaW5PYmplY3RzOiB0eXBlb2Ygb3B0cy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdHMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgfVxuXG4gIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307IC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgfSxcbiAgY29tbWE6ICdjb21tYScsXG4gIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICB9LFxuICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICByZXR1cm4gcHJlZml4O1xuICB9XG59O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcblxudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcbnZhciBkZWZhdWx0Rm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xudmFyIGRlZmF1bHRzID0ge1xuICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gIGFsbG93RG90czogZmFsc2UsXG4gIGNoYXJzZXQ6ICd1dGYtOCcsXG4gIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gIGRlbGltaXRlcjogJyYnLFxuICBlbmNvZGU6IHRydWUsXG4gIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZGVmYXVsdEZvcm1hdF0sXG4gIC8vIGRlcHJlY2F0ZWRcbiAgaW5kaWNlczogZmFsc2UsXG4gIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICB9LFxuICBza2lwTnVsbHM6IGZhbHNlLFxuICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaXNOb25OdWxsaXNoUHJpbWl0aXZlID0gZnVuY3Rpb24gaXNOb25OdWxsaXNoUHJpbWl0aXZlKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHYgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgdiA9PT0gJ3N5bWJvbCcgfHwgdHlwZW9mIHYgPT09ICdiaWdpbnQnO1xufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvYmplY3QsIHByZWZpeCwgZ2VuZXJhdGVBcnJheVByZWZpeCwgc3RyaWN0TnVsbEhhbmRsaW5nLCBza2lwTnVsbHMsIGVuY29kZXIsIGZpbHRlciwgc29ydCwgYWxsb3dEb3RzLCBzZXJpYWxpemVEYXRlLCBmb3JtYXR0ZXIsIGVuY29kZVZhbHVlc09ubHksIGNoYXJzZXQpIHtcbiAgdmFyIG9iaiA9IG9iamVjdDtcblxuICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgIG9iaiA9IG9iai5qb2luKCcsJyk7XG4gIH1cblxuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ2tleScpIDogcHJlZml4O1xuICAgIH1cblxuICAgIG9iaiA9ICcnO1xuICB9XG5cbiAgaWYgKGlzTm9uTnVsbGlzaFByaW1pdGl2ZShvYmopIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICd2YWx1ZScpKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICB9XG5cbiAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICB2YXIgb2JqS2V5cztcblxuICBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShvYmpba2V5XSwgdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSA6IHByZWZpeCwgZ2VuZXJhdGVBcnJheVByZWZpeCwgc3RyaWN0TnVsbEhhbmRsaW5nLCBza2lwTnVsbHMsIGVuY29kZXIsIGZpbHRlciwgc29ydCwgYWxsb3dEb3RzLCBzZXJpYWxpemVEYXRlLCBmb3JtYXR0ZXIsIGVuY29kZVZhbHVlc09ubHksIGNoYXJzZXQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkob2JqW2tleV0sIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLCBnZW5lcmF0ZUFycmF5UHJlZml4LCBzdHJpY3ROdWxsSGFuZGxpbmcsIHNraXBOdWxscywgZW5jb2RlciwgZmlsdGVyLCBzb3J0LCBhbGxvd0RvdHMsIHNlcmlhbGl6ZURhdGUsIGZvcm1hdHRlciwgZW5jb2RlVmFsdWVzT25seSwgY2hhcnNldCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICBpZiAoIW9wdHMpIHtcbiAgICByZXR1cm4gZGVmYXVsdHM7XG4gIH1cblxuICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIG9wdHMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcblxuICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG5cbiAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gIH1cblxuICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG5cbiAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGZpbHRlcjogZmlsdGVyLFxuICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgIHNlcmlhbGl6ZURhdGU6IHR5cGVvZiBvcHRzLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlLFxuICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICB2YXIgb2JqID0gb2JqZWN0O1xuICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cyk7XG4gIHZhciBvYmpLZXlzO1xuICB2YXIgZmlsdGVyO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICBvYmpLZXlzID0gZmlsdGVyO1xuICB9XG5cbiAgdmFyIGtleXMgPSBbXTtcblxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgdmFyIGFycmF5Rm9ybWF0O1xuXG4gIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICB9IGVsc2Uge1xuICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICB9XG5cbiAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gIGlmICghb2JqS2V5cykge1xuICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShvYmpba2V5XSwga2V5LCBnZW5lcmF0ZUFycmF5UHJlZml4LCBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZywgb3B0aW9ucy5za2lwTnVsbHMsIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCwgb3B0aW9ucy5maWx0ZXIsIG9wdGlvbnMuc29ydCwgb3B0aW9ucy5hbGxvd0RvdHMsIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSwgb3B0aW9ucy5mb3JtYXR0ZXIsIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSwgb3B0aW9ucy5jaGFyc2V0KSk7XG4gIH1cblxuICB2YXIgam9pbmVkID0ga2V5cy5qb2luKG9wdGlvbnMuZGVsaW1pdGVyKTtcbiAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcbiAgICAgIHByZWZpeCArPSAndXRmOD0lRTIlOUMlOTMmJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn0oKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgaWYgKCFzb3VyY2UpIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgfVxuXG4gIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcblxuICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuXG4gICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG4gIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gIH0gLy8gdXRmLThcblxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCkge1xuICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmFyIHN0cmluZyA9IHN0cjtcblxuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICBzdHJpbmcgPSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3RyKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9IFN0cmluZyhzdHIpO1xuICB9XG5cbiAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBvdXQgPSAnJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoYyA9PT0gMHgyRCAvLyAtXG4gICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgfHwgYyA+PSAweDMwICYmIGMgPD0gMHgzOSAvLyAwLTlcbiAgICB8fCBjID49IDB4NDEgJiYgYyA8PSAweDVBIC8vIGEtelxuICAgIHx8IGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EgLy8gQS1aXG4gICAgKSB7XG4gICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IGMgPj4gNl0gKyBoZXhUYWJsZVsweDgwIHwgYyAmIDB4M0ZdKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IGMgPj4gMTJdICsgaGV4VGFibGVbMHg4MCB8IGMgPj4gNiAmIDB4M0ZdICsgaGV4VGFibGVbMHg4MCB8IGMgJiAweDNGXSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpICs9IDE7XG4gICAgYyA9IDB4MTAwMDAgKyAoKGMgJiAweDNGRikgPDwgMTAgfCBzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKTtcbiAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IGMgPj4gMThdICsgaGV4VGFibGVbMHg4MCB8IGMgPj4gMTIgJiAweDNGXSArIGhleFRhYmxlWzB4ODAgfCBjID4+IDYgJiAweDNGXSArIGhleFRhYmxlWzB4ODAgfCBjICYgMHgzRl07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gIHZhciBxdWV1ZSA9IFt7XG4gICAgb2JqOiB7XG4gICAgICBvOiB2YWx1ZVxuICAgIH0sXG4gICAgcHJvcDogJ28nXG4gIH1dO1xuICB2YXIgcmVmcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICAgIG9iajogb2JqLFxuICAgICAgICAgIHByb3A6IGtleVxuICAgICAgICB9KTtcbiAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gIGFzc2lnbjogYXNzaWduLFxuICBjb21iaW5lOiBjb21iaW5lLFxuICBjb21wYWN0OiBjb21wYWN0LFxuICBkZWNvZGU6IGRlY29kZSxcbiAgZW5jb2RlOiBlbmNvZGUsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICBtZXJnZTogbWVyZ2Vcbn07IiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xuXG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7IiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDsgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcblxuICByZXR1cm4gW2J0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJywgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJywgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXV0uam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufSIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcblxudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTsgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG5cbnZhciBfbm9kZUlkO1xuXG52YXIgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTsgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG5cbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgdmFyIGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIHZhciB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7IiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xuXG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDsiLCJleHBvcnQgKiBmcm9tICcuL3NyYy9wcm9qZWN0JzsiLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCBSZWFjdCBmcm9tICcuLi9yZWFjdCc7XG5pbXBvcnQgY2xvbmVFbGVtZW50IGZyb20gJy4uL3JlYWN0L2Nsb25lRWxlbWVudCc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL3JlYWN0L0NvbXBvbmVudCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAnLi4vcmVhY3QvQ2hpbGRyZW4nO1xuLy8gaW1wb3J0IHsgdHJhbnNwb3J0cywgQVBQTElDQVRJT04gfSBmcm9tICcuLi9wcm9qZWN0JztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQgVGFiQmFyIGZyb20gJy4vVGFiQmFyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uTGF1bmNoOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25MYXVuY2g6IG5vb3BcbiAgfTtcblxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgIC8vIHRyYW5zcG9ydHMuYXBwLm9uKHRoaXMub25NZXNzYWdlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbk1vdW50ICgpIHtcbiAgICAvLyB0cmFuc3BvcnRzLmFwcC5vZmYodGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgb25NZXNzYWdlID0gKHR5cGUsIGFyZ3YpID0+IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgQVBQTElDQVRJT04uTEFVTkNIOiB7XG4gICAgICAgIGNvbnN0IHsgb25MYXVuY2ggfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgb25MYXVuY2guYXBwbHkodGhpcywgYXJndik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG5cbiAgICB9XG4gIH1cbiAgXG4gIGNsb25lQXBwbGljYXRpb25DaGlsZHJlbiAoKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcbiAgICBcbiAgICBmb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChjaGlsZCkpIHtcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBjaGlsZDtcbiAgICAgICAgaWYgKHR5cGUgPT09IFJvdXRlciB8fCB0eXBlID09PSBUYWJCYXIpIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHZpZXc+e3RoaXMuY2xvbmVBcHBsaWNhdGlvbkNoaWxkcmVuKCl9PC92aWV3PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vcmVhY3QnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9yZWFjdC9Db21wb25lbnQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5jbGFzcyBUYWJCYXJJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2VsZWN0ZWRJY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiA8dmlldz57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3ZpZXc+XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIFRhYkJhckl0ZW0gPSBUYWJCYXJJdGVtO1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlbGVjdGVkQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYmFja2dyb3VuZENvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGJvcmRlclN0eWxlOiBQcm9wVHlwZXMub25lT2YoWydibGFjaycsICd3aGl0ZSddKSxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnYm90dG9tJywgJ3RvcCddKSxcbiAgICBjdXN0b206IFByb3BUeXBlcy5ib29sXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICBib3R0b206IGZhbHNlXG4gIH1cbiAgXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIDx2aWV3Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvdmlldz5cbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCBSZWFjdCBmcm9tICcuLi9yZWFjdCc7XG5pbXBvcnQgY2xvbmVFbGVtZW50IGZyb20gJy4uL3JlYWN0L2Nsb25lRWxlbWVudCc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL3JlYWN0L0NvbXBvbmVudCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5pbXBvcnQgbm90aWZpY2F0aW9uLCB7IEFQUExJQ0FUSU9OLCBWSUVXIH0gZnJvbSAnLi4vcHJvamVjdC9ub3RpZmljYXRpb24nO1xuXG5jb25zdCB7IGRlZmluZVByb3BlcnR5IH0gPSBPYmplY3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb250cm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHt9O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge307XG5cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE11c3QgYmUgaW1wbGF0YXRlZGApO1xuICB9XG59IiwiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vQXBwbGljYXRpb24nO1xuaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4vVmlld0NvbnRyb2xsZXInXG5pbXBvcnQgVGFiQmFyIGZyb20gJy4vVGFiQmFyJztcblxuaW1wb3J0IFJvb3QgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXJvb3QnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXZpZXcnO1xuaW1wb3J0IFRleHQgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXRleHQnO1xuaW1wb3J0IEltYWdlIGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC1pbWFnZSc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LWlucHV0JztcbmltcG9ydCBNYXAgZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LW1hcCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC1idXR0b24nO1xuaW1wb3J0IFBpY2tlciBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtcGlja2VyJztcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC1zY3JvbGwtdmlldyc7XG5pbXBvcnQgU3dpcGVyIGZyb20gJy4vcmVtaXgtZWxlbWVudC9yZW1peC1zd2lwZXInO1xuaW1wb3J0IFN3aXBlckl0ZW0gZnJvbSAnLi9yZW1peC1lbGVtZW50L3JlbWl4LXN3aXBlci1pdGVtJztcbmltcG9ydCBWaWRlbyBmcm9tICcuL3JlbWl4LWVsZW1lbnQvcmVtaXgtdmlkZW8nO1xuXG5leHBvcnQge1xuICBBcHBsaWNhdGlvbixcbiAgVmlld0NvbnRyb2xsZXIsXG4gIFRhYkJhcixcbiAgUm9vdCxcbiAgVmlldyxcbiAgVGV4dCxcbiAgSW1hZ2UsXG4gIEJ1dHRvbixcbiAgTWFwLFxuICBJbnB1dCxcbiAgUGlja2VyLFxuICBTd2lwZXIsXG4gIFN3aXBlckl0ZW0sXG4gIFNjcm9sbFZpZXcsXG4gIFZpZGVvXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkdldFVzZXJJbmZvOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ29udGFjdDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkdldFBob25lTnVtYmVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uT3BlblNldHRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25MYXVuY2hBcHA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25FcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHBsYWluOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Zm9ybVR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b3BlblR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aG92ZXJDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRob3ZlclN0b3BQcm9wYWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0aG92ZXJTdGFydFRpbWU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0aG92ZXJTdGF5VGltZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRsYW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlc3Npb25Gcm9tOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlbmRNZXNzYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2VuZE1lc3NhZ2VQYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlbmRNZXNzYWdlSW1nOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGFwcFBhcmFtZXRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzaG93TWVzc2FnZUNhcmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25HZXRVc2VySW5mbzogbnVsbCxcblx0XHRvbkNvbnRhY3Q6IG51bGwsXG5cdFx0b25HZXRQaG9uZU51bWJlcjogbnVsbCxcblx0XHRvbk9wZW5TZXR0aW5nOiBudWxsLFxuXHRcdG9uTGF1bmNoQXBwOiBudWxsLFxuXHRcdG9uRXJyb3I6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdHNpemU6ICdkZWZhdWx0Jyxcblx0XHR0eXBlOiAnZGVmYXVsdCcsXG5cdFx0cGxhaW46IGZhbHNlLFxuXHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRsb2FkaW5nOiBmYWxzZSxcblx0XHRmb3JtVHlwZTogbnVsbCxcblx0XHRvcGVuVHlwZTogbnVsbCxcblx0XHRob3ZlckNsYXNzOiAnYnV0dG9uLWhvdmVyJyxcblx0XHRob3ZlclN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG5cdFx0aG92ZXJTdGFydFRpbWU6IDIwLFxuXHRcdGhvdmVyU3RheVRpbWU6IDcwLFxuXHRcdGxhbmc6ICdlbicsXG5cdFx0c2Vzc2lvbkZyb206IG51bGwsXG5cdFx0c2VuZE1lc3NhZ2VUaXRsZTogbnVsbCxcblx0XHRzZW5kTWVzc2FnZVBhdGg6IG51bGwsXG5cdFx0c2VuZE1lc3NhZ2VJbWc6IG51bGwsXG5cdFx0YXBwUGFyYW1ldGVyOiBudWxsLFxuXHRcdHNob3dNZXNzYWdlQ2FyZDogbnVsbCxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25HZXRVc2VySW5mbyAoZSkgeyBcblx0XHRjb25zdCB7IG9uR2V0VXNlckluZm8gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkdldFVzZXJJbmZvID09PSAnZnVuY3Rpb24nKSB7IG9uR2V0VXNlckluZm8oZSk7IH0gXG5cdH1cblxuXHRvbkNvbnRhY3QgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkNvbnRhY3QgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkNvbnRhY3QgPT09ICdmdW5jdGlvbicpIHsgb25Db250YWN0KGUpOyB9IFxuXHR9XG5cblx0b25HZXRQaG9uZU51bWJlciAoZSkgeyBcblx0XHRjb25zdCB7IG9uR2V0UGhvbmVOdW1iZXIgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkdldFBob25lTnVtYmVyID09PSAnZnVuY3Rpb24nKSB7IG9uR2V0UGhvbmVOdW1iZXIoZSk7IH0gXG5cdH1cblxuXHRvbk9wZW5TZXR0aW5nIChlKSB7IFxuXHRcdGNvbnN0IHsgb25PcGVuU2V0dGluZyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uT3BlblNldHRpbmcgPT09ICdmdW5jdGlvbicpIHsgb25PcGVuU2V0dGluZyhlKTsgfSBcblx0fVxuXG5cdG9uTGF1bmNoQXBwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25MYXVuY2hBcHAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxhdW5jaEFwcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxhdW5jaEFwcChlKTsgfSBcblx0fVxuXG5cdG9uRXJyb3IgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkVycm9yIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25FcnJvciA9PT0gJ2Z1bmN0aW9uJykgeyBvbkVycm9yKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBvbkdldFVzZXJJbmZvLCBvbkNvbnRhY3QsIG9uR2V0UGhvbmVOdW1iZXIsIG9uT3BlblNldHRpbmcsIG9uTGF1bmNoQXBwLCBvbkVycm9yLCBzdHlsZSwgY2xhc3NOYW1lLCBzaXplLCB0eXBlLCBwbGFpbiwgZGlzYWJsZWQsIGxvYWRpbmcsIGZvcm1UeXBlLCBvcGVuVHlwZSwgaG92ZXJDbGFzcywgaG92ZXJTdG9wUHJvcGFnYXRpb24sIGhvdmVyU3RhcnRUaW1lLCBob3ZlclN0YXlUaW1lLCBsYW5nLCBzZXNzaW9uRnJvbSwgc2VuZE1lc3NhZ2VUaXRsZSwgc2VuZE1lc3NhZ2VQYXRoLCBzZW5kTWVzc2FnZUltZywgYXBwUGFyYW1ldGVyLCBzaG93TWVzc2FnZUNhcmQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPGJ1dHRvbiBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvbkdldFVzZXJJbmZvPXtvbkdldFVzZXJJbmZvID8gJ29uR2V0VXNlckluZm8nIDogJyd9IG9uQ29udGFjdD17b25Db250YWN0ID8gJ29uQ29udGFjdCcgOiAnJ30gb25HZXRQaG9uZU51bWJlcj17b25HZXRQaG9uZU51bWJlciA/ICdvbkdldFBob25lTnVtYmVyJyA6ICcnfSBvbk9wZW5TZXR0aW5nPXtvbk9wZW5TZXR0aW5nID8gJ29uT3BlblNldHRpbmcnIDogJyd9IG9uTGF1bmNoQXBwPXtvbkxhdW5jaEFwcCA/ICdvbkxhdW5jaEFwcCcgOiAnJ30gb25FcnJvcj17b25FcnJvciA/ICdvbkVycm9yJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzaXplPXtzaXplfSB0eXBlPXt0eXBlfSBwbGFpbj17cGxhaW59IGRpc2FibGVkPXtkaXNhYmxlZH0gbG9hZGluZz17bG9hZGluZ30gZm9ybVR5cGU9e2Zvcm1UeXBlfSBvcGVuVHlwZT17b3BlblR5cGV9IGhvdmVyQ2xhc3M9e2hvdmVyQ2xhc3N9IGhvdmVyU3RvcFByb3BhZ2F0aW9uPXtob3ZlclN0b3BQcm9wYWdhdGlvbn0gaG92ZXJTdGFydFRpbWU9e2hvdmVyU3RhcnRUaW1lfSBob3ZlclN0YXlUaW1lPXtob3ZlclN0YXlUaW1lfSBsYW5nPXtsYW5nfSBzZXNzaW9uRnJvbT17c2Vzc2lvbkZyb219IHNlbmRNZXNzYWdlVGl0bGU9e3NlbmRNZXNzYWdlVGl0bGV9IHNlbmRNZXNzYWdlUGF0aD17c2VuZE1lc3NhZ2VQYXRofSBzZW5kTWVzc2FnZUltZz17c2VuZE1lc3NhZ2VJbWd9IGFwcFBhcmFtZXRlcj17YXBwUGFyYW1ldGVyfSBzaG93TWVzc2FnZUNhcmQ9e3Nob3dNZXNzYWdlQ2FyZH0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9idXR0b24+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peEltYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9hZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzcmM6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bW9kZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR3ZWJwOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRsYXp5TG9hZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2hvd01lbnVCeUxvbmdwcmVzczogUHJvcFR5cGVzLmJvb2wsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25Mb2FkOiBudWxsLFxuXHRcdG9uRXJyb3I6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdHNyYzogbnVsbCxcblx0XHRtb2RlOiAnc2NhbGVUb0ZpbGwnLFxuXHRcdHdlYnA6IGZhbHNlLFxuXHRcdGxhenlMb2FkOiBmYWxzZSxcblx0XHRzaG93TWVudUJ5TG9uZ3ByZXNzOiBmYWxzZSxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25Mb2FkIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb2FkIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb2FkID09PSAnZnVuY3Rpb24nKSB7IG9uTG9hZChlKTsgfSBcblx0fVxuXG5cdG9uRXJyb3IgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkVycm9yIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25FcnJvciA9PT0gJ2Z1bmN0aW9uJykgeyBvbkVycm9yKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBvbkxvYWQsIG9uRXJyb3IsIHN0eWxlLCBjbGFzc05hbWUsIHNyYywgbW9kZSwgd2VicCwgbGF6eUxvYWQsIHNob3dNZW51QnlMb25ncHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPGltYWdlIG9uVG91Y2hTdGFydD17b25Ub3VjaFN0YXJ0ID8gJ29uVG91Y2hTdGFydCcgOiAnJ30gb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlID8gJ29uVG91Y2hNb3ZlJyA6ICcnfSBvblRvdWNoQ2FuY2VsPXtvblRvdWNoQ2FuY2VsID8gJ29uVG91Y2hDYW5jZWwnIDogJyd9IG9uVG91Y2hFbmQ9e29uVG91Y2hFbmQgPyAnb25Ub3VjaEVuZCcgOiAnJ30gb25UYXA9e29uVGFwID8gJ29uVGFwJyA6ICcnfSBvbkxvbmdQcmVzcz17b25Mb25nUHJlc3MgPyAnb25Mb25nUHJlc3MnIDogJyd9IG9uTG9uZ1RhcD17b25Mb25nVGFwID8gJ29uTG9uZ1RhcCcgOiAnJ30gb25Ub3VjaEZvcmNlQ2hhbmdlPXtvblRvdWNoRm9yY2VDaGFuZ2UgPyAnb25Ub3VjaEZvcmNlQ2hhbmdlJyA6ICcnfSBvblRyYW5zaXRpb25FbmQ9e29uVHJhbnNpdGlvbkVuZCA/ICdvblRyYW5zaXRpb25FbmQnIDogJyd9IG9uQW5pbWF0aW9uU3RhcnQ9e29uQW5pbWF0aW9uU3RhcnQgPyAnb25BbmltYXRpb25TdGFydCcgOiAnJ30gb25BbmltYXRpb25JdGVyYXRpb249e29uQW5pbWF0aW9uSXRlcmF0aW9uID8gJ29uQW5pbWF0aW9uSXRlcmF0aW9uJyA6ICcnfSBvbkFuaW1hdGlvbkVuZD17b25BbmltYXRpb25FbmQgPyAnb25BbmltYXRpb25FbmQnIDogJyd9IG9uTG9hZD17b25Mb2FkID8gJ29uTG9hZCcgOiAnJ30gb25FcnJvcj17b25FcnJvciA/ICdvbkVycm9yJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzcmM9e3NyY30gbW9kZT17bW9kZX0gd2VicD17d2VicH0gbGF6eUxvYWQ9e2xhenlMb2FkfSBzaG93TWVudUJ5TG9uZ3ByZXNzPXtzaG93TWVudUJ5TG9uZ3ByZXNzfT48L2ltYWdlPjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbklucHV0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uRm9jdXM6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25CbHVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ29uZmlybTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbktleWJvYXJkSGVpZ2h0Q2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHBhc3N3b3JkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRwbGFjZWhvbGRlclN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHBsYWNlaG9sZGVyQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1heGxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRjdXJzb3JTcGFjaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Zm9jdXM6IFByb3BUeXBlcy5ib29sLFxuXHRcdGNvbmZpcm1UeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNvbmZpcm1Ib2xkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2VsZWN0aW9uU3RhcnQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2VsZWN0aW9uRW5kOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGFkanVzdFBvc2l0aW9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRob2xkS2V5Ym9hcmQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuXHRcdG9uVG91Y2hNb3ZlOiBudWxsLFxuXHRcdG9uVG91Y2hDYW5jZWw6IG51bGwsXG5cdFx0b25Ub3VjaEVuZDogbnVsbCxcblx0XHRvblRhcDogbnVsbCxcblx0XHRvbkxvbmdQcmVzczogbnVsbCxcblx0XHRvbkxvbmdUYXA6IG51bGwsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuXHRcdG9uSW5wdXQ6IG51bGwsXG5cdFx0b25Gb2N1czogbnVsbCxcblx0XHRvbkJsdXI6IG51bGwsXG5cdFx0b25Db25maXJtOiBudWxsLFxuXHRcdG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2U6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdHZhbHVlOiBudWxsLFxuXHRcdHR5cGU6ICd0ZXh0Jyxcblx0XHRwYXNzd29yZDogZmFsc2UsXG5cdFx0cGxhY2Vob2xkZXI6IG51bGwsXG5cdFx0cGxhY2Vob2xkZXJTdHlsZTogbnVsbCxcblx0XHRwbGFjZWhvbGRlckNsYXNzOiAnaW5wdXQtcGxhY2Vob2xkZXInLFxuXHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRtYXhsZW5ndGg6IDE0MCxcblx0XHRjdXJzb3JTcGFjaW5nOiAwLFxuXHRcdGF1dG9Gb2N1czogZmFsc2UsXG5cdFx0Zm9jdXM6IGZhbHNlLFxuXHRcdGNvbmZpcm1UeXBlOiAnZG9uZScsXG5cdFx0Y29uZmlybUhvbGQ6IGZhbHNlLFxuXHRcdGN1cnNvcjogMCxcblx0XHRzZWxlY3Rpb25TdGFydDogLTEsXG5cdFx0c2VsZWN0aW9uRW5kOiAtMSxcblx0XHRhZGp1c3RQb3NpdGlvbjogdHJ1ZSxcblx0XHRob2xkS2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbklucHV0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25JbnB1dCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHsgb25JbnB1dChlKTsgfSBcblx0fVxuXG5cdG9uRm9jdXMgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkZvY3VzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkZvY3VzKGUpOyB9IFxuXHR9XG5cblx0b25CbHVyIChlKSB7IFxuXHRcdGNvbnN0IHsgb25CbHVyIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25CbHVyID09PSAnZnVuY3Rpb24nKSB7IG9uQmx1cihlKTsgfSBcblx0fVxuXG5cdG9uQ29uZmlybSAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ29uZmlybSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ29uZmlybSA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNvbmZpcm0oZSk7IH0gXG5cdH1cblxuXHRvbktleWJvYXJkSGVpZ2h0Q2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25LZXlib2FyZEhlaWdodENoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25LZXlib2FyZEhlaWdodENoYW5nZShlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgb25JbnB1dCwgb25Gb2N1cywgb25CbHVyLCBvbkNvbmZpcm0sIG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UsIHN0eWxlLCBjbGFzc05hbWUsIHZhbHVlLCB0eXBlLCBwYXNzd29yZCwgcGxhY2Vob2xkZXIsIHBsYWNlaG9sZGVyU3R5bGUsIHBsYWNlaG9sZGVyQ2xhc3MsIGRpc2FibGVkLCBtYXhsZW5ndGgsIGN1cnNvclNwYWNpbmcsIGF1dG9Gb2N1cywgZm9jdXMsIGNvbmZpcm1UeXBlLCBjb25maXJtSG9sZCwgY3Vyc29yLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBhZGp1c3RQb3NpdGlvbiwgaG9sZEtleWJvYXJkIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxpbnB1dCBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvbklucHV0PXtvbklucHV0ID8gJ29uSW5wdXQnIDogJyd9IG9uRm9jdXM9e29uRm9jdXMgPyAnb25Gb2N1cycgOiAnJ30gb25CbHVyPXtvbkJsdXIgPyAnb25CbHVyJyA6ICcnfSBvbkNvbmZpcm09e29uQ29uZmlybSA/ICdvbkNvbmZpcm0nIDogJyd9IG9uS2V5Ym9hcmRIZWlnaHRDaGFuZ2U9e29uS2V5Ym9hcmRIZWlnaHRDaGFuZ2UgPyAnb25LZXlib2FyZEhlaWdodENoYW5nZScgOiAnJ30gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gdmFsdWU9e3ZhbHVlfSB0eXBlPXt0eXBlfSBwYXNzd29yZD17cGFzc3dvcmR9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gcGxhY2Vob2xkZXJTdHlsZT17cGxhY2Vob2xkZXJTdHlsZX0gcGxhY2Vob2xkZXJDbGFzcz17cGxhY2Vob2xkZXJDbGFzc30gZGlzYWJsZWQ9e2Rpc2FibGVkfSBtYXhsZW5ndGg9e21heGxlbmd0aH0gY3Vyc29yU3BhY2luZz17Y3Vyc29yU3BhY2luZ30gYXV0b0ZvY3VzPXthdXRvRm9jdXN9IGZvY3VzPXtmb2N1c30gY29uZmlybVR5cGU9e2NvbmZpcm1UeXBlfSBjb25maXJtSG9sZD17Y29uZmlybUhvbGR9IGN1cnNvcj17Y3Vyc29yfSBzZWxlY3Rpb25TdGFydD17c2VsZWN0aW9uU3RhcnR9IHNlbGVjdGlvbkVuZD17c2VsZWN0aW9uRW5kfSBhZGp1c3RQb3NpdGlvbj17YWRqdXN0UG9zaXRpb259IGhvbGRLZXlib2FyZD17aG9sZEtleWJvYXJkfT48L2lucHV0PjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhNYXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaENhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1ByZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25NYXJrZXJUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25MYWJlbFRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkNvbnRyb2xUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25DYWxsb3V0VGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVXBkYXRlZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblJlZ2lvbkNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblBvaVRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bG9uZ2l0dWRlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNjYWxlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG1hcmtlcnM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRjb3ZlcnM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRwb2x5bGluZTogUHJvcFR5cGVzLmFycmF5LFxuXHRcdGNpcmNsZXM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRjb250cm9sczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdGluY2x1ZGVQb2ludHM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRzaG93TG9jYXRpb246IFByb3BUeXBlcy5ib29sLFxuXHRcdHBvbHlnb25zOiBQcm9wVHlwZXMuYXJyYXksXG5cdFx0c3Via2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGxheWVyU3R5bGU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0cm90YXRlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNrZXc6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0ZW5hYmxlM0Q6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNob3dDb21wYXNzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzaG93U2NhbGU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZU92ZXJsb29raW5nOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVab29tOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVTY3JvbGw6IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZVJvdGF0ZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlU2F0ZWxsaXRlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVUcmFmZmljOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzZXR0aW5nOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuXHRcdG9uVG91Y2hNb3ZlOiBudWxsLFxuXHRcdG9uVG91Y2hDYW5jZWw6IG51bGwsXG5cdFx0b25Ub3VjaEVuZDogbnVsbCxcblx0XHRvblRhcDogbnVsbCxcblx0XHRvbkxvbmdQcmVzczogbnVsbCxcblx0XHRvbkxvbmdUYXA6IG51bGwsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuXHRcdG9uTWFya2VyVGFwOiBudWxsLFxuXHRcdG9uTGFiZWxUYXA6IG51bGwsXG5cdFx0b25Db250cm9sVGFwOiBudWxsLFxuXHRcdG9uQ2FsbG91dFRhcDogbnVsbCxcblx0XHRvblVwZGF0ZWQ6IG51bGwsXG5cdFx0b25SZWdpb25DaGFuZ2U6IG51bGwsXG5cdFx0b25Qb2lUYXA6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdGxvbmdpdHVkZTogbnVsbCxcblx0XHRsYXRpdHVkZTogbnVsbCxcblx0XHRzY2FsZTogMTYsXG5cdFx0bWFya2VyczogbnVsbCxcblx0XHRjb3ZlcnM6IG51bGwsXG5cdFx0cG9seWxpbmU6IG51bGwsXG5cdFx0Y2lyY2xlczogbnVsbCxcblx0XHRjb250cm9sczogbnVsbCxcblx0XHRpbmNsdWRlUG9pbnRzOiBudWxsLFxuXHRcdHNob3dMb2NhdGlvbjogZmFsc2UsXG5cdFx0cG9seWdvbnM6IG51bGwsXG5cdFx0c3Via2V5OiBudWxsLFxuXHRcdGxheWVyU3R5bGU6IDEsXG5cdFx0cm90YXRlOiAwLFxuXHRcdHNrZXc6IDAsXG5cdFx0ZW5hYmxlM0Q6IGZhbHNlLFxuXHRcdHNob3dDb21wYXNzOiBmYWxzZSxcblx0XHRzaG93U2NhbGU6IGZhbHNlLFxuXHRcdGVuYWJsZU92ZXJsb29raW5nOiBmYWxzZSxcblx0XHRlbmFibGVab29tOiBmYWxzZSxcblx0XHRlbmFibGVTY3JvbGw6IGZhbHNlLFxuXHRcdGVuYWJsZVJvdGF0ZTogZmFsc2UsXG5cdFx0ZW5hYmxlU2F0ZWxsaXRlOiBmYWxzZSxcblx0XHRlbmFibGVUcmFmZmljOiBmYWxzZSxcblx0XHRzZXR0aW5nOiBudWxsLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbk1hcmtlclRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTWFya2VyVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25NYXJrZXJUYXAgPT09ICdmdW5jdGlvbicpIHsgb25NYXJrZXJUYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxhYmVsVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25MYWJlbFRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTGFiZWxUYXAgPT09ICdmdW5jdGlvbicpIHsgb25MYWJlbFRhcChlKTsgfSBcblx0fVxuXG5cdG9uQ29udHJvbFRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ29udHJvbFRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ29udHJvbFRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNvbnRyb2xUYXAoZSk7IH0gXG5cdH1cblxuXHRvbkNhbGxvdXRUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkNhbGxvdXRUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkNhbGxvdXRUYXAgPT09ICdmdW5jdGlvbicpIHsgb25DYWxsb3V0VGFwKGUpOyB9IFxuXHR9XG5cblx0b25VcGRhdGVkIChlKSB7IFxuXHRcdGNvbnN0IHsgb25VcGRhdGVkIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25VcGRhdGVkID09PSAnZnVuY3Rpb24nKSB7IG9uVXBkYXRlZChlKTsgfSBcblx0fVxuXG5cdG9uUmVnaW9uQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25SZWdpb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblJlZ2lvbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblJlZ2lvbkNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uUG9pVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Qb2lUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblBvaVRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblBvaVRhcChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgb25NYXJrZXJUYXAsIG9uTGFiZWxUYXAsIG9uQ29udHJvbFRhcCwgb25DYWxsb3V0VGFwLCBvblVwZGF0ZWQsIG9uUmVnaW9uQ2hhbmdlLCBvblBvaVRhcCwgc3R5bGUsIGNsYXNzTmFtZSwgbG9uZ2l0dWRlLCBsYXRpdHVkZSwgc2NhbGUsIG1hcmtlcnMsIGNvdmVycywgcG9seWxpbmUsIGNpcmNsZXMsIGNvbnRyb2xzLCBpbmNsdWRlUG9pbnRzLCBzaG93TG9jYXRpb24sIHBvbHlnb25zLCBzdWJrZXksIGxheWVyU3R5bGUsIHJvdGF0ZSwgc2tldywgZW5hYmxlM0QsIHNob3dDb21wYXNzLCBzaG93U2NhbGUsIGVuYWJsZU92ZXJsb29raW5nLCBlbmFibGVab29tLCBlbmFibGVTY3JvbGwsIGVuYWJsZVJvdGF0ZSwgZW5hYmxlU2F0ZWxsaXRlLCBlbmFibGVUcmFmZmljLCBzZXR0aW5nIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxtYXAgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gb25NYXJrZXJUYXA9e29uTWFya2VyVGFwID8gJ29uTWFya2VyVGFwJyA6ICcnfSBvbkxhYmVsVGFwPXtvbkxhYmVsVGFwID8gJ29uTGFiZWxUYXAnIDogJyd9IG9uQ29udHJvbFRhcD17b25Db250cm9sVGFwID8gJ29uQ29udHJvbFRhcCcgOiAnJ30gb25DYWxsb3V0VGFwPXtvbkNhbGxvdXRUYXAgPyAnb25DYWxsb3V0VGFwJyA6ICcnfSBvblVwZGF0ZWQ9e29uVXBkYXRlZCA/ICdvblVwZGF0ZWQnIDogJyd9IG9uUmVnaW9uQ2hhbmdlPXtvblJlZ2lvbkNoYW5nZSA/ICdvblJlZ2lvbkNoYW5nZScgOiAnJ30gb25Qb2lUYXA9e29uUG9pVGFwID8gJ29uUG9pVGFwJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBsb25naXR1ZGU9e2xvbmdpdHVkZX0gbGF0aXR1ZGU9e2xhdGl0dWRlfSBzY2FsZT17c2NhbGV9IG1hcmtlcnM9e21hcmtlcnN9IGNvdmVycz17Y292ZXJzfSBwb2x5bGluZT17cG9seWxpbmV9IGNpcmNsZXM9e2NpcmNsZXN9IGNvbnRyb2xzPXtjb250cm9sc30gaW5jbHVkZVBvaW50cz17aW5jbHVkZVBvaW50c30gc2hvd0xvY2F0aW9uPXtzaG93TG9jYXRpb259IHBvbHlnb25zPXtwb2x5Z29uc30gc3Via2V5PXtzdWJrZXl9IGxheWVyU3R5bGU9e2xheWVyU3R5bGV9IHJvdGF0ZT17cm90YXRlfSBza2V3PXtza2V3fSBlbmFibGUzRD17ZW5hYmxlM0R9IHNob3dDb21wYXNzPXtzaG93Q29tcGFzc30gc2hvd1NjYWxlPXtzaG93U2NhbGV9IGVuYWJsZU92ZXJsb29raW5nPXtlbmFibGVPdmVybG9va2luZ30gZW5hYmxlWm9vbT17ZW5hYmxlWm9vbX0gZW5hYmxlU2Nyb2xsPXtlbmFibGVTY3JvbGx9IGVuYWJsZVJvdGF0ZT17ZW5hYmxlUm90YXRlfSBlbmFibGVTYXRlbGxpdGU9e2VuYWJsZVNhdGVsbGl0ZX0gZW5hYmxlVHJhZmZpYz17ZW5hYmxlVHJhZmZpY30gc2V0dGluZz17c2V0dGluZ30+PC9tYXA+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peFBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkNhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ29sdW1uQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb2RlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRyYW5nZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRyYW5nZUtleTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRlbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0ZmllbGRzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGN1c3RvbUl0ZW06IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25DYW5jZWw6IG51bGwsXG5cdFx0b25FcnJvcjogbnVsbCxcblx0XHRvbkNoYW5nZTogbnVsbCxcblx0XHRvbkNvbHVtbkNoYW5nZTogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0bW9kZTogJ3NlbGVjdG9yJyxcblx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0cmFuZ2U6IFtdLFxuXHRcdHJhbmdlS2V5OiBudWxsLFxuXHRcdHZhbHVlOiAwLFxuXHRcdHN0YXJ0OiBudWxsLFxuXHRcdGVuZDogbnVsbCxcblx0XHRmaWVsZHM6ICdkYXknLFxuXHRcdGN1c3RvbUl0ZW06IG51bGwsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25DYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkNhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkNhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uRXJyb3IgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkVycm9yIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25FcnJvciA9PT0gJ2Z1bmN0aW9uJykgeyBvbkVycm9yKGUpOyB9IFxuXHR9XG5cblx0b25DaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25Db2x1bW5DaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkNvbHVtbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQ29sdW1uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uQ29sdW1uQ2hhbmdlKGUpOyB9IFxuXHR9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IG9uVG91Y2hTdGFydCwgb25Ub3VjaE1vdmUsIG9uVG91Y2hDYW5jZWwsIG9uVG91Y2hFbmQsIG9uVGFwLCBvbkxvbmdQcmVzcywgb25Mb25nVGFwLCBvblRvdWNoRm9yY2VDaGFuZ2UsIG9uVHJhbnNpdGlvbkVuZCwgb25BbmltYXRpb25TdGFydCwgb25BbmltYXRpb25JdGVyYXRpb24sIG9uQW5pbWF0aW9uRW5kLCBvbkNhbmNlbCwgb25FcnJvciwgb25DaGFuZ2UsIG9uQ29sdW1uQ2hhbmdlLCBzdHlsZSwgY2xhc3NOYW1lLCBtb2RlLCBkaXNhYmxlZCwgcmFuZ2UsIHJhbmdlS2V5LCB2YWx1ZSwgc3RhcnQsIGVuZCwgZmllbGRzLCBjdXN0b21JdGVtIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxwaWNrZXIgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gb25DYW5jZWw9e29uQ2FuY2VsID8gJ29uQ2FuY2VsJyA6ICcnfSBvbkVycm9yPXtvbkVycm9yID8gJ29uRXJyb3InIDogJyd9IG9uQ2hhbmdlPXtvbkNoYW5nZSA/ICdvbkNoYW5nZScgOiAnJ30gb25Db2x1bW5DaGFuZ2U9e29uQ29sdW1uQ2hhbmdlID8gJ29uQ29sdW1uQ2hhbmdlJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBtb2RlPXttb2RlfSBkaXNhYmxlZD17ZGlzYWJsZWR9IHJhbmdlPXtyYW5nZX0gcmFuZ2VLZXk9e3JhbmdlS2V5fSB2YWx1ZT17dmFsdWV9IHN0YXJ0PXtzdGFydH0gZW5kPXtlbmR9IGZpZWxkcz17ZmllbGRzfSBjdXN0b21JdGVtPXtjdXN0b21JdGVtfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3BpY2tlcj47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4Um9vdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIHN0eWxlLCBjbGFzc05hbWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPHJvb3Qgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9yb290PjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICcuLi8uLi8uLi9yZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4uLy4uLy4uL3JlYWN0L1Byb3BUeXBlcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtaXhTY3JvbGxWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uU2Nyb2xsVG9VcHBlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblNjcm9sbFRvTG93ZXI6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25TY3JvbGw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNjcm9sbFg6IFByb3BUeXBlcy5ib29sLFxuXHRcdHNjcm9sbFk6IFByb3BUeXBlcy5ib29sLFxuXHRcdHVwcGVyVGhyZXNob2xkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGxvd2VyVGhyZXNob2xkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNjcm9sbFRvcDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRzY3JvbGxMZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHNjcm9sbEludG9WaWV3OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNjcm9sbFdpdGhBbmltYXRpb246IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZUJhY2tUb1RvcDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZW5hYmxlRmxleDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2Nyb2xsQW5jaG9yaW5nOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRvblNjcm9sbFRvVXBwZXI6IG51bGwsXG5cdFx0b25TY3JvbGxUb0xvd2VyOiBudWxsLFxuXHRcdG9uU2Nyb2xsOiBudWxsLFxuXHRcdHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRzY3JvbGxYOiBmYWxzZSxcblx0XHRzY3JvbGxZOiBmYWxzZSxcblx0XHR1cHBlclRocmVzaG9sZDogNTAsXG5cdFx0bG93ZXJUaHJlc2hvbGQ6IDUwLFxuXHRcdHNjcm9sbFRvcDogbnVsbCxcblx0XHRzY3JvbGxMZWZ0OiBudWxsLFxuXHRcdHNjcm9sbEludG9WaWV3OiBudWxsLFxuXHRcdHNjcm9sbFdpdGhBbmltYXRpb246IGZhbHNlLFxuXHRcdGVuYWJsZUJhY2tUb1RvcDogZmFsc2UsXG5cdFx0ZW5hYmxlRmxleDogZmFsc2UsXG5cdFx0c2Nyb2xsQW5jaG9yaW5nOiBmYWxzZSxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25TY3JvbGxUb1VwcGVyIChlKSB7IFxuXHRcdGNvbnN0IHsgb25TY3JvbGxUb1VwcGVyIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25TY3JvbGxUb1VwcGVyID09PSAnZnVuY3Rpb24nKSB7IG9uU2Nyb2xsVG9VcHBlcihlKTsgfSBcblx0fVxuXG5cdG9uU2Nyb2xsVG9Mb3dlciAoZSkgeyBcblx0XHRjb25zdCB7IG9uU2Nyb2xsVG9Mb3dlciB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uU2Nyb2xsVG9Mb3dlciA9PT0gJ2Z1bmN0aW9uJykgeyBvblNjcm9sbFRvTG93ZXIoZSk7IH0gXG5cdH1cblxuXHRvblNjcm9sbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uU2Nyb2xsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25TY3JvbGwgPT09ICdmdW5jdGlvbicpIHsgb25TY3JvbGwoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uU2Nyb2xsVG9VcHBlciwgb25TY3JvbGxUb0xvd2VyLCBvblNjcm9sbCwgc3R5bGUsIGNsYXNzTmFtZSwgc2Nyb2xsWCwgc2Nyb2xsWSwgdXBwZXJUaHJlc2hvbGQsIGxvd2VyVGhyZXNob2xkLCBzY3JvbGxUb3AsIHNjcm9sbExlZnQsIHNjcm9sbEludG9WaWV3LCBzY3JvbGxXaXRoQW5pbWF0aW9uLCBlbmFibGVCYWNrVG9Ub3AsIGVuYWJsZUZsZXgsIHNjcm9sbEFuY2hvcmluZyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8c2Nyb2xsLXZpZXcgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gb25TY3JvbGxUb1VwcGVyPXtvblNjcm9sbFRvVXBwZXIgPyAnb25TY3JvbGxUb1VwcGVyJyA6ICcnfSBvblNjcm9sbFRvTG93ZXI9e29uU2Nyb2xsVG9Mb3dlciA/ICdvblNjcm9sbFRvTG93ZXInIDogJyd9IG9uU2Nyb2xsPXtvblNjcm9sbCA/ICdvblNjcm9sbCcgOiAnJ30gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc2Nyb2xsWD17c2Nyb2xsWH0gc2Nyb2xsWT17c2Nyb2xsWX0gdXBwZXJUaHJlc2hvbGQ9e3VwcGVyVGhyZXNob2xkfSBsb3dlclRocmVzaG9sZD17bG93ZXJUaHJlc2hvbGR9IHNjcm9sbFRvcD17c2Nyb2xsVG9wfSBzY3JvbGxMZWZ0PXtzY3JvbGxMZWZ0fSBzY3JvbGxJbnRvVmlldz17c2Nyb2xsSW50b1ZpZXd9IHNjcm9sbFdpdGhBbmltYXRpb249e3Njcm9sbFdpdGhBbmltYXRpb259IGVuYWJsZUJhY2tUb1RvcD17ZW5hYmxlQmFja1RvVG9wfSBlbmFibGVGbGV4PXtlbmFibGVGbGV4fSBzY3JvbGxBbmNob3Jpbmc9e3Njcm9sbEFuY2hvcmluZ30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9zY3JvbGwtdmlldz47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4U3dpcGVySXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aXRlbUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuXHRcdG9uVG91Y2hNb3ZlOiBudWxsLFxuXHRcdG9uVG91Y2hDYW5jZWw6IG51bGwsXG5cdFx0b25Ub3VjaEVuZDogbnVsbCxcblx0XHRvblRhcDogbnVsbCxcblx0XHRvbkxvbmdQcmVzczogbnVsbCxcblx0XHRvbkxvbmdUYXA6IG51bGwsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuXHRcdHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRpdGVtSWQ6IG51bGwsXG5cdFx0XG4gIH07XG5cbiAgb25Ub3VjaFN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaFN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hTdGFydChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaE1vdmUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoTW92ZShlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hDYW5jZWwgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoQ2FuY2VsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaENhbmNlbCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoQ2FuY2VsKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hFbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hFbmQoZSk7IH0gXG5cdH1cblxuXHRvblRhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UYXAgPT09ICdmdW5jdGlvbicpIHsgb25UYXAoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdQcmVzcyAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1ByZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nUHJlc3MgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nUHJlc3MoZSk7IH0gXG5cdH1cblxuXHRvbkxvbmdUYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdUYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdUYXAgPT09ICdmdW5jdGlvbicpIHsgb25Mb25nVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaEZvcmNlQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEZvcmNlQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEZvcmNlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hGb3JjZUNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVHJhbnNpdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVHJhbnNpdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRyYW5zaXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0IChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25TdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25TdGFydChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25JdGVyYXRpb24gfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkl0ZXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbihlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25BbmltYXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvbkVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvbkVuZChlKTsgfSBcblx0fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBvblRvdWNoU3RhcnQsIG9uVG91Y2hNb3ZlLCBvblRvdWNoQ2FuY2VsLCBvblRvdWNoRW5kLCBvblRhcCwgb25Mb25nUHJlc3MsIG9uTG9uZ1RhcCwgb25Ub3VjaEZvcmNlQ2hhbmdlLCBvblRyYW5zaXRpb25FbmQsIG9uQW5pbWF0aW9uU3RhcnQsIG9uQW5pbWF0aW9uSXRlcmF0aW9uLCBvbkFuaW1hdGlvbkVuZCwgc3R5bGUsIGNsYXNzTmFtZSwgaXRlbUlkIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxzd2lwZXItaXRlbSBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBpdGVtSWQ9e2l0ZW1JZH0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9zd2lwZXItaXRlbT47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuaW1wb3J0IFN3aXBlckl0ZW0gZnJvbSAnLi4vcmVtaXgtc3dpcGVyLWl0ZW0vaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peFN3aXBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBTd2lwZXJJdGVtID0gU3dpcGVySXRlbTsgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRmluaXNoOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpbmRpY2F0b3JEb3RzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRpbmRpY2F0b3JDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpbmRpY2F0b3JBY3RpdmVDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRhdXRvcGxheTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y3VycmVudDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRpbnRlcnZhbDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRjaXJjdWxhcjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0dmVydGljYWw6IFByb3BUeXBlcy5ib29sLFxuXHRcdHByZXZpb3VzTWFyZ2luOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG5leHRNYXJnaW46IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0ZGlzcGxheU11bHRpcGxlSXRlbXM6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2tpcEhpZGRlbkl0ZW1MYXlvdTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZWFzaW5nRnVuY3Rpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25DaGFuZ2U6IG51bGwsXG5cdFx0b25BbmltYXRpb25GaW5pc2g6IG51bGwsXG5cdFx0c3R5bGU6IG51bGwsXG5cdFx0Y2xhc3NOYW1lOiBudWxsLFxuXHRcdGluZGljYXRvckRvdHM6IGZhbHNlLFxuXHRcdGluZGljYXRvckNvbG9yOiAncmdiYSgwLCAwLCAwLCAuMyknLFxuXHRcdGluZGljYXRvckFjdGl2ZUNvbG9yOiAnIzAwMDAwMCcsXG5cdFx0YXV0b3BsYXk6IGZhbHNlLFxuXHRcdGN1cnJlbnQ6IDAsXG5cdFx0aW50ZXJ2YWw6IDUwMDAsXG5cdFx0ZHVyYXRpb246IDUwMCxcblx0XHRjaXJjdWxhcjogZmFsc2UsXG5cdFx0dmVydGljYWw6IGZhbHNlLFxuXHRcdHByZXZpb3VzTWFyZ2luOiAnMHB4Jyxcblx0XHRuZXh0TWFyZ2luOiAnMHB4Jyxcblx0XHRkaXNwbGF5TXVsdGlwbGVJdGVtczogMSxcblx0XHRza2lwSGlkZGVuSXRlbUxheW91OiBmYWxzZSxcblx0XHRlYXNpbmdGdW5jdGlvbjogJ2RlZmF1bHQnLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuXHRvbkNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25DaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkZpbmlzaCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRmluaXNoIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25GaW5pc2ggPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25GaW5pc2goZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uQ2hhbmdlLCBvbkFuaW1hdGlvbkZpbmlzaCwgc3R5bGUsIGNsYXNzTmFtZSwgaW5kaWNhdG9yRG90cywgaW5kaWNhdG9yQ29sb3IsIGluZGljYXRvckFjdGl2ZUNvbG9yLCBhdXRvcGxheSwgY3VycmVudCwgaW50ZXJ2YWwsIGR1cmF0aW9uLCBjaXJjdWxhciwgdmVydGljYWwsIHByZXZpb3VzTWFyZ2luLCBuZXh0TWFyZ2luLCBkaXNwbGF5TXVsdGlwbGVJdGVtcywgc2tpcEhpZGRlbkl0ZW1MYXlvdSwgZWFzaW5nRnVuY3Rpb24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gPHN3aXBlciBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBvbkNoYW5nZT17b25DaGFuZ2UgPyAnb25DaGFuZ2UnIDogJyd9IG9uQW5pbWF0aW9uRmluaXNoPXtvbkFuaW1hdGlvbkZpbmlzaCA/ICdvbkFuaW1hdGlvbkZpbmlzaCcgOiAnJ30gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaW5kaWNhdG9yRG90cz17aW5kaWNhdG9yRG90c30gaW5kaWNhdG9yQ29sb3I9e2luZGljYXRvckNvbG9yfSBpbmRpY2F0b3JBY3RpdmVDb2xvcj17aW5kaWNhdG9yQWN0aXZlQ29sb3J9IGF1dG9wbGF5PXthdXRvcGxheX0gY3VycmVudD17Y3VycmVudH0gaW50ZXJ2YWw9e2ludGVydmFsfSBkdXJhdGlvbj17ZHVyYXRpb259IGNpcmN1bGFyPXtjaXJjdWxhcn0gdmVydGljYWw9e3ZlcnRpY2FsfSBwcmV2aW91c01hcmdpbj17cHJldmlvdXNNYXJnaW59IG5leHRNYXJnaW49e25leHRNYXJnaW59IGRpc3BsYXlNdWx0aXBsZUl0ZW1zPXtkaXNwbGF5TXVsdGlwbGVJdGVtc30gc2tpcEhpZGRlbkl0ZW1MYXlvdT17c2tpcEhpZGRlbkl0ZW1MYXlvdX0gZWFzaW5nRnVuY3Rpb249e2Vhc2luZ0Z1bmN0aW9ufT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3N3aXBlcj47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4VGV4dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHN0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzcGFjZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZGVjb2RlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHN0eWxlOiBudWxsLFxuXHRcdGNsYXNzTmFtZTogbnVsbCxcblx0XHRzZWxlY3RhYmxlOiBmYWxzZSxcblx0XHRzcGFjZTogZmFsc2UsXG5cdFx0ZGVjb2RlOiBmYWxzZSxcblx0XHRcbiAgfTtcblxuICBcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3R5bGUsIGNsYXNzTmFtZSwgc2VsZWN0YWJsZSwgc3BhY2UsIGRlY29kZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8dGV4dCBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzZWxlY3RhYmxlPXtzZWxlY3RhYmxlfSBzcGFjZT17c3BhY2V9IGRlY29kZT17ZGVjb2RlfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3RleHQ+O1xuICB9XG59XG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJy4uLy4uLy4uL3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi4vLi4vLi4vcmVhY3QvUHJvcFR5cGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1peFZpZGVvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hNb3ZlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRhcDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Ub3VjaEZvcmNlQ2hhbmdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUGxheTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblBhdXNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uRW5kZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UaW1lVXBkYXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uRnVsbFNjcmVlbkNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbldhaXRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25FcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblByb2dyZXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uTG9hZGVkTWV0YURhdGE6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNyYzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRjb250cm9sczogUHJvcFR5cGVzLmJvb2wsXG5cdFx0ZGFubXVMaXN0OiBQcm9wVHlwZXMuYXJyYXksXG5cdFx0c2hvd1BsYXlCdXR0b246IFByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZURhbm11OiBQcm9wVHlwZXMuYm9vbCxcblx0XHRhdXRvcGxheTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bG9vcDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bXV0ZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdGluaXRpYWxUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHBhZ2VHZXN0dXJlOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRkaXJlY3Rpb246IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0c2hvd1Byb2dyZXNzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRzaG93RnVsbHNjcmVlbkJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0c2hvd1BsYXlCdXR0b246IFByb3BUeXBlcy5ib29sLFxuXHRcdHNob3dDZW50ZXJQbGF5QnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRlbmFibGVQcm9ncmVzc0dlc3R1cmU6IFByb3BUeXBlcy5ib29sLFxuXHRcdG9iamVjdEZpdDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0cG9zdGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNob3dNdXRlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRwbGF5QnV0dG9uUG9zaXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0ZW5hYmxlUGxheUdlc3R1cmU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGF1dG9QYXVzZUlmTmF2aWdhdGU6IFByb3BUeXBlcy5ib29sLFxuXHRcdGF1dG9QYXVzZUlmT3Blbk5hdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0dnNsaWRlR2VzdHVyZTogUHJvcFR5cGVzLmJvb2wsXG5cdFx0dnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0YWRVbml0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0b25QbGF5OiBudWxsLFxuXHRcdG9uUGF1c2U6IG51bGwsXG5cdFx0b25FbmRlZDogbnVsbCxcblx0XHRvblRpbWVVcGRhdGU6IG51bGwsXG5cdFx0b25GdWxsU2NyZWVuQ2hhbmdlOiBudWxsLFxuXHRcdG9uV2FpdGluZzogbnVsbCxcblx0XHRvbkVycm9yOiBudWxsLFxuXHRcdG9uUHJvZ3Jlc3M6IG51bGwsXG5cdFx0b25Mb2FkZWRNZXRhRGF0YTogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0c3JjOiBudWxsLFxuXHRcdGR1cmF0aW9uOiBudWxsLFxuXHRcdGNvbnRyb2xzOiB0cnVlLFxuXHRcdGRhbm11TGlzdDogbnVsbCxcblx0XHRzaG93UGxheUJ1dHRvbjogZmFsc2UsXG5cdFx0ZW5hYmxlRGFubXU6IGZhbHNlLFxuXHRcdGF1dG9wbGF5OiBmYWxzZSxcblx0XHRsb29wOiBmYWxzZSxcblx0XHRtdXRlZDogZmFsc2UsXG5cdFx0aW5pdGlhbFRpbWU6IDAsXG5cdFx0cGFnZUdlc3R1cmU6IGZhbHNlLFxuXHRcdGRpcmVjdGlvbjogbnVsbCxcblx0XHRzaG93UHJvZ3Jlc3M6IHRydWUsXG5cdFx0c2hvd0Z1bGxzY3JlZW5CdXR0b246IHRydWUsXG5cdFx0c2hvd1BsYXlCdXR0b246IHRydWUsXG5cdFx0c2hvd0NlbnRlclBsYXlCdXR0b246IHRydWUsXG5cdFx0ZW5hYmxlUHJvZ3Jlc3NHZXN0dXJlOiB0cnVlLFxuXHRcdG9iamVjdEZpdDogMCxcblx0XHRwb3N0ZXI6IG51bGwsXG5cdFx0c2hvd011dGVCdXR0b246IGZhbHNlLFxuXHRcdHRpdGxlOiBudWxsLFxuXHRcdHBsYXlCdXR0b25Qb3NpdGlvbjogJ2JvdHRvbScsXG5cdFx0ZW5hYmxlUGxheUdlc3R1cmU6IGZhbHNlLFxuXHRcdGF1dG9QYXVzZUlmTmF2aWdhdGU6IHRydWUsXG5cdFx0YXV0b1BhdXNlSWZPcGVuTmF0aXZlOiB0cnVlLFxuXHRcdHZzbGlkZUdlc3R1cmU6IHRydWUsXG5cdFx0dnNsaWRlR2VzdHVyZUluRnVsbHNjcmVlbjogdHJ1ZSxcblx0XHRhZFVuaXRJZDogbnVsbCxcblx0XHRcbiAgfTtcblxuICBvblRvdWNoU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoU3RhcnQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaFN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaE1vdmUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoTW92ZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hNb3ZlID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hNb3ZlKGUpOyB9IFxuXHR9XG5cblx0b25Ub3VjaENhbmNlbCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hDYW5jZWwgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoQ2FuY2VsID09PSAnZnVuY3Rpb24nKSB7IG9uVG91Y2hDYW5jZWwoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaEVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hFbmQgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEVuZChlKTsgfSBcblx0fVxuXG5cdG9uVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UYXAgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRhcChlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1ByZXNzIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nUHJlc3MgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvbmdQcmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdQcmVzcyhlKTsgfSBcblx0fVxuXG5cdG9uTG9uZ1RhcCAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9uZ1RhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1RhcCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkxvbmdUYXAoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRm9yY2VDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRvdWNoRm9yY2VDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaEZvcmNlQ2hhbmdlKGUpOyB9IFxuXHR9XG5cblx0b25UcmFuc2l0aW9uRW5kIChlKSB7IFxuXHRcdGNvbnN0IHsgb25UcmFuc2l0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uVHJhbnNpdGlvbkVuZChlKTsgfSBcblx0fVxuXG5cdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvblN0YXJ0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25TdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvbkFuaW1hdGlvblN0YXJ0KGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkl0ZXJhdGlvbiB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uSXRlcmF0aW9uID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkFuaW1hdGlvbkVuZCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uQW5pbWF0aW9uRW5kID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25QbGF5IChlKSB7IFxuXHRcdGNvbnN0IHsgb25QbGF5IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25QbGF5ID09PSAnZnVuY3Rpb24nKSB7IG9uUGxheShlKTsgfSBcblx0fVxuXG5cdG9uUGF1c2UgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblBhdXNlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25QYXVzZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblBhdXNlKGUpOyB9IFxuXHR9XG5cblx0b25FbmRlZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uRW5kZWQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkVuZGVkID09PSAnZnVuY3Rpb24nKSB7IG9uRW5kZWQoZSk7IH0gXG5cdH1cblxuXHRvblRpbWVVcGRhdGUgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRpbWVVcGRhdGUgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRpbWVVcGRhdGUgPT09ICdmdW5jdGlvbicpIHsgb25UaW1lVXBkYXRlKGUpOyB9IFxuXHR9XG5cblx0b25GdWxsU2NyZWVuQ2hhbmdlIChlKSB7IFxuXHRcdGNvbnN0IHsgb25GdWxsU2NyZWVuQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25GdWxsU2NyZWVuQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7IG9uRnVsbFNjcmVlbkNoYW5nZShlKTsgfSBcblx0fVxuXG5cdG9uV2FpdGluZyAoZSkgeyBcblx0XHRjb25zdCB7IG9uV2FpdGluZyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uV2FpdGluZyA9PT0gJ2Z1bmN0aW9uJykgeyBvbldhaXRpbmcoZSk7IH0gXG5cdH1cblxuXHRvbkVycm9yIChlKSB7IFxuXHRcdGNvbnN0IHsgb25FcnJvciB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uRXJyb3IgPT09ICdmdW5jdGlvbicpIHsgb25FcnJvcihlKTsgfSBcblx0fVxuXG5cdG9uUHJvZ3Jlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblByb2dyZXNzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Qcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykgeyBvblByb2dyZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb2FkZWRNZXRhRGF0YSAoZSkgeyBcblx0XHRjb25zdCB7IG9uTG9hZGVkTWV0YURhdGEgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkxvYWRlZE1ldGFEYXRhID09PSAnZnVuY3Rpb24nKSB7IG9uTG9hZGVkTWV0YURhdGEoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIG9uUGxheSwgb25QYXVzZSwgb25FbmRlZCwgb25UaW1lVXBkYXRlLCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIG9uV2FpdGluZywgb25FcnJvciwgb25Qcm9ncmVzcywgb25Mb2FkZWRNZXRhRGF0YSwgc3R5bGUsIGNsYXNzTmFtZSwgc3JjLCBkdXJhdGlvbiwgY29udHJvbHMsIGRhbm11TGlzdCwgZGFubXVCdXR0b24sIGVuYWJsZURhbm11LCBhdXRvcGxheSwgbG9vcCwgbXV0ZWQsIGluaXRpYWxUaW1lLCBwYWdlR2VzdHVyZSwgZGlyZWN0aW9uLCBzaG93UHJvZ3Jlc3MsIHNob3dGdWxsc2NyZWVuQnV0dG9uLCBzaG93UGxheUJ1dHRvbiwgc2hvd0NlbnRlclBsYXlCdXR0b24sIGVuYWJsZVByb2dyZXNzR2VzdHVyZSwgb2JqZWN0Rml0LCBwb3N0ZXIsIHNob3dNdXRlQnV0dG9uLCB0aXRsZSwgcGxheUJ1dHRvblBvc2l0aW9uLCBlbmFibGVQbGF5R2VzdHVyZSwgYXV0b1BhdXNlSWZOYXZpZ2F0ZSwgYXV0b1BhdXNlSWZPcGVuTmF0aXZlLCB2c2xpZGVHZXN0dXJlLCB2c2xpZGVHZXN0dXJlSW5GdWxsc2NyZWVuLCBhZFVuaXRJZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8dmlkZW8gb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnQgPyAnb25Ub3VjaFN0YXJ0JyA6ICcnfSBvblRvdWNoTW92ZT17b25Ub3VjaE1vdmUgPyAnb25Ub3VjaE1vdmUnIDogJyd9IG9uVG91Y2hDYW5jZWw9e29uVG91Y2hDYW5jZWwgPyAnb25Ub3VjaENhbmNlbCcgOiAnJ30gb25Ub3VjaEVuZD17b25Ub3VjaEVuZCA/ICdvblRvdWNoRW5kJyA6ICcnfSBvblRhcD17b25UYXAgPyAnb25UYXAnIDogJyd9IG9uTG9uZ1ByZXNzPXtvbkxvbmdQcmVzcyA/ICdvbkxvbmdQcmVzcycgOiAnJ30gb25Mb25nVGFwPXtvbkxvbmdUYXAgPyAnb25Mb25nVGFwJyA6ICcnfSBvblRvdWNoRm9yY2VDaGFuZ2U9e29uVG91Y2hGb3JjZUNoYW5nZSA/ICdvblRvdWNoRm9yY2VDaGFuZ2UnIDogJyd9IG9uVHJhbnNpdGlvbkVuZD17b25UcmFuc2l0aW9uRW5kID8gJ29uVHJhbnNpdGlvbkVuZCcgOiAnJ30gb25BbmltYXRpb25TdGFydD17b25BbmltYXRpb25TdGFydCA/ICdvbkFuaW1hdGlvblN0YXJ0JyA6ICcnfSBvbkFuaW1hdGlvbkl0ZXJhdGlvbj17b25BbmltYXRpb25JdGVyYXRpb24gPyAnb25BbmltYXRpb25JdGVyYXRpb24nIDogJyd9IG9uQW5pbWF0aW9uRW5kPXtvbkFuaW1hdGlvbkVuZCA/ICdvbkFuaW1hdGlvbkVuZCcgOiAnJ30gb25QbGF5PXtvblBsYXkgPyAnb25QbGF5JyA6ICcnfSBvblBhdXNlPXtvblBhdXNlID8gJ29uUGF1c2UnIDogJyd9IG9uRW5kZWQ9e29uRW5kZWQgPyAnb25FbmRlZCcgOiAnJ30gb25UaW1lVXBkYXRlPXtvblRpbWVVcGRhdGUgPyAnb25UaW1lVXBkYXRlJyA6ICcnfSBvbkZ1bGxTY3JlZW5DaGFuZ2U9e29uRnVsbFNjcmVlbkNoYW5nZSA/ICdvbkZ1bGxTY3JlZW5DaGFuZ2UnIDogJyd9IG9uV2FpdGluZz17b25XYWl0aW5nID8gJ29uV2FpdGluZycgOiAnJ30gb25FcnJvcj17b25FcnJvciA/ICdvbkVycm9yJyA6ICcnfSBvblByb2dyZXNzPXtvblByb2dyZXNzID8gJ29uUHJvZ3Jlc3MnIDogJyd9IG9uTG9hZGVkTWV0YURhdGE9e29uTG9hZGVkTWV0YURhdGEgPyAnb25Mb2FkZWRNZXRhRGF0YScgOiAnJ30gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3JjPXtzcmN9IGR1cmF0aW9uPXtkdXJhdGlvbn0gY29udHJvbHM9e2NvbnRyb2xzfSBkYW5tdUxpc3Q9e2Rhbm11TGlzdH0gc2hvd1BsYXlCdXR0b249e3Nob3dQbGF5QnV0dG9ufSBlbmFibGVEYW5tdT17ZW5hYmxlRGFubXV9IGF1dG9wbGF5PXthdXRvcGxheX0gbG9vcD17bG9vcH0gbXV0ZWQ9e211dGVkfSBpbml0aWFsVGltZT17aW5pdGlhbFRpbWV9IHBhZ2VHZXN0dXJlPXtwYWdlR2VzdHVyZX0gZGlyZWN0aW9uPXtkaXJlY3Rpb259IHNob3dQcm9ncmVzcz17c2hvd1Byb2dyZXNzfSBzaG93RnVsbHNjcmVlbkJ1dHRvbj17c2hvd0Z1bGxzY3JlZW5CdXR0b259IHNob3dQbGF5QnV0dG9uPXtzaG93UGxheUJ1dHRvbn0gc2hvd0NlbnRlclBsYXlCdXR0b249e3Nob3dDZW50ZXJQbGF5QnV0dG9ufSBlbmFibGVQcm9ncmVzc0dlc3R1cmU9e2VuYWJsZVByb2dyZXNzR2VzdHVyZX0gb2JqZWN0Rml0PXtvYmplY3RGaXR9IHBvc3Rlcj17cG9zdGVyfSBzaG93TXV0ZUJ1dHRvbj17c2hvd011dGVCdXR0b259IHRpdGxlPXt0aXRsZX0gcGxheUJ1dHRvblBvc2l0aW9uPXtwbGF5QnV0dG9uUG9zaXRpb259IGVuYWJsZVBsYXlHZXN0dXJlPXtlbmFibGVQbGF5R2VzdHVyZX0gYXV0b1BhdXNlSWZOYXZpZ2F0ZT17YXV0b1BhdXNlSWZOYXZpZ2F0ZX0gYXV0b1BhdXNlSWZPcGVuTmF0aXZlPXthdXRvUGF1c2VJZk9wZW5OYXRpdmV9IHZzbGlkZUdlc3R1cmU9e3ZzbGlkZUdlc3R1cmV9IHZzbGlkZUdlc3R1cmVJbkZ1bGxzY3JlZW49e3ZzbGlkZUdlc3R1cmVJbkZ1bGxzY3JlZW59IGFkVW5pdElkPXthZFVuaXRJZH0+PC92aWRlbz47XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vLi4vLi4vcmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuLi8uLi8uLi9yZWFjdC9Qcm9wVHlwZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uVG91Y2hTdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hFbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25UYXA6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25Mb25nVGFwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25BbmltYXRpb25TdGFydDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzdHlsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aG92ZXJDbGFzczogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRob3ZlclN0b3BQcm9wYWdhdGlvbjogUHJvcFR5cGVzLmJvb2wsXG5cdFx0aG92ZXJTdGFydFRpbWU6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0aG92ZXJTdGF5VGltZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0aG92ZXJDbGFzczogJ25vbmUnLFxuXHRcdGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcblx0XHRob3ZlclN0YXJ0VGltZTogNTAsXG5cdFx0aG92ZXJTdGF5VGltZTogNDAwLFxuXHRcdFxuICB9O1xuXG4gIG9uVG91Y2hTdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hTdGFydCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hTdGFydCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hNb3ZlIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaE1vdmUgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaE1vdmUoZSk7IH0gXG5cdH1cblxuXHRvblRvdWNoQ2FuY2VsIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Ub3VjaENhbmNlbCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hDYW5jZWwgPT09ICdmdW5jdGlvbicpIHsgb25Ub3VjaENhbmNlbChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRvdWNoRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRW5kKGUpOyB9IFxuXHR9XG5cblx0b25UYXAgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRhcCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uVGFwKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nUHJlc3MgKGUpIHsgXG5cdFx0Y29uc3QgeyBvbkxvbmdQcmVzcyB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uTG9uZ1ByZXNzID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1ByZXNzKGUpOyB9IFxuXHR9XG5cblx0b25Mb25nVGFwIChlKSB7IFxuXHRcdGNvbnN0IHsgb25Mb25nVGFwIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25Mb25nVGFwID09PSAnZnVuY3Rpb24nKSB7IG9uTG9uZ1RhcChlKTsgfSBcblx0fVxuXG5cdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyBcblx0XHRjb25zdCB7IG9uVG91Y2hGb3JjZUNoYW5nZSB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodHlwZW9mIG9uVG91Y2hGb3JjZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykgeyBvblRvdWNoRm9yY2VDaGFuZ2UoZSk7IH0gXG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQgKGUpIHsgXG5cdFx0Y29uc3QgeyBvblRyYW5zaXRpb25FbmQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25UcmFuc2l0aW9uRW5kKGUpOyB9IFxuXHR9XG5cblx0b25BbmltYXRpb25TdGFydCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uU3RhcnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0aWYgKHR5cGVvZiBvbkFuaW1hdGlvblN0YXJ0ID09PSAnZnVuY3Rpb24nKSB7IG9uQW5pbWF0aW9uU3RhcnQoZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkl0ZXJhdGlvbiAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uSXRlcmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25JdGVyYXRpb24gPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25JdGVyYXRpb24oZSk7IH0gXG5cdH1cblxuXHRvbkFuaW1hdGlvbkVuZCAoZSkgeyBcblx0XHRjb25zdCB7IG9uQW5pbWF0aW9uRW5kIH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0eXBlb2Ygb25BbmltYXRpb25FbmQgPT09ICdmdW5jdGlvbicpIHsgb25BbmltYXRpb25FbmQoZSk7IH0gXG5cdH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBvblRvdWNoTW92ZSwgb25Ub3VjaENhbmNlbCwgb25Ub3VjaEVuZCwgb25UYXAsIG9uTG9uZ1ByZXNzLCBvbkxvbmdUYXAsIG9uVG91Y2hGb3JjZUNoYW5nZSwgb25UcmFuc2l0aW9uRW5kLCBvbkFuaW1hdGlvblN0YXJ0LCBvbkFuaW1hdGlvbkl0ZXJhdGlvbiwgb25BbmltYXRpb25FbmQsIHN0eWxlLCBjbGFzc05hbWUsIGhvdmVyQ2xhc3MsIGhvdmVyU3RvcFByb3BhZ2F0aW9uLCBob3ZlclN0YXJ0VGltZSwgaG92ZXJTdGF5VGltZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiA8dmlldyBvblRvdWNoU3RhcnQ9e29uVG91Y2hTdGFydCA/ICdvblRvdWNoU3RhcnQnIDogJyd9IG9uVG91Y2hNb3ZlPXtvblRvdWNoTW92ZSA/ICdvblRvdWNoTW92ZScgOiAnJ30gb25Ub3VjaENhbmNlbD17b25Ub3VjaENhbmNlbCA/ICdvblRvdWNoQ2FuY2VsJyA6ICcnfSBvblRvdWNoRW5kPXtvblRvdWNoRW5kID8gJ29uVG91Y2hFbmQnIDogJyd9IG9uVGFwPXtvblRhcCA/ICdvblRhcCcgOiAnJ30gb25Mb25nUHJlc3M9e29uTG9uZ1ByZXNzID8gJ29uTG9uZ1ByZXNzJyA6ICcnfSBvbkxvbmdUYXA9e29uTG9uZ1RhcCA/ICdvbkxvbmdUYXAnIDogJyd9IG9uVG91Y2hGb3JjZUNoYW5nZT17b25Ub3VjaEZvcmNlQ2hhbmdlID8gJ29uVG91Y2hGb3JjZUNoYW5nZScgOiAnJ30gb25UcmFuc2l0aW9uRW5kPXtvblRyYW5zaXRpb25FbmQgPyAnb25UcmFuc2l0aW9uRW5kJyA6ICcnfSBvbkFuaW1hdGlvblN0YXJ0PXtvbkFuaW1hdGlvblN0YXJ0ID8gJ29uQW5pbWF0aW9uU3RhcnQnIDogJyd9IG9uQW5pbWF0aW9uSXRlcmF0aW9uPXtvbkFuaW1hdGlvbkl0ZXJhdGlvbiA/ICdvbkFuaW1hdGlvbkl0ZXJhdGlvbicgOiAnJ30gb25BbmltYXRpb25FbmQ9e29uQW5pbWF0aW9uRW5kID8gJ29uQW5pbWF0aW9uRW5kJyA6ICcnfSBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBob3ZlckNsYXNzPXtob3ZlckNsYXNzfSBob3ZlclN0b3BQcm9wYWdhdGlvbj17aG92ZXJTdG9wUHJvcGFnYXRpb259IGhvdmVyU3RhcnRUaW1lPXtob3ZlclN0YXJ0VGltZX0gaG92ZXJTdGF5VGltZT17aG92ZXJTdGF5VGltZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC92aWV3PjtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQvdjQnO1xuaW1wb3J0IGdsb2JhbEVsZW1lbnRzIGZyb20gJy4vZ2xvYmFsRWxlbWVudHMnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudXVpZCA9IHV1aWQoKTtcbiAgICB0aGlzLnRhZ05hbWUgPSBudWxsO1xuICAgIHRoaXMubm9kZVR5cGUgPSBudWxsO1xuICAgIHRoaXMuY2hpbGQgPSBudWxsO1xuICAgIHRoaXMucmV0dXJuID0gbnVsbDtcbiAgICB0aGlzLmxhc3RDaGlsZCA9IG51bGw7XG5cbiAgICBnbG9iYWxFbGVtZW50c1t0aGlzLnV1aWRdID0gdGhpcztcbiAgfVxuXG4gIGdldCBvd25lckRvY3VtZW50ICgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn0iLCJpbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCB7IEJPRFkgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxCb2R5RWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgdGFnTmFtZSA9IEJPRFk7XG4gIG5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuXG4gIGdldCBvd25lckRvY3VtZW50ICgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBCVVRUT04gfSBmcm9tICcuL0hUTUxUeXBlcyc7IFxuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IEhUTUxUZXh0RWxlbWVudCBmcm9tICcuL0hUTUxUZXh0RWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5cbmltcG9ydCBSZW1peEJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtYnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTEJ1dHRvbkVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peEJ1dHRvbi5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRhZ05hbWUgPSBCVVRUT047XG4gICAgdGhpcy5ub2RlVHlwZSA9IEVMRU1FTlRfTk9ERTtcbiAgfVxufSIsImltcG9ydCB7IGlzVW5kZWZpbmVkLCBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQnO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi9TdHlsZVNoZWV0JztcblxuZnVuY3Rpb24gcmVzb2x2ZURlZmF1bHRQcm9wcyAoXG4gIGRlZmF1bHRQcm9wcyxcbiAgdW5yZXNvbHZlZFByb3BzXG4pIHtcbiAgaWYgKGRlZmF1bHRQcm9wcykge1xuICAgIGNvbnN0IHByb3BzID0ge307XG4gICAgXG4gICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAoaXNVbmRlZmluZWQodW5yZXNvbHZlZFByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IHVucmVzb2x2ZWRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG4gIFxuICByZXR1cm4ge307XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yICh0YWdOYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG4gICAgdGhpcy5zdHlsZSA9IG5ldyBTdHlsZVNoZWV0KCk7XG4gIH1cblxuICBzZXQgaW5uZXJIVE1MIChpbm5lckhUTUwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbm5lckhUTUwgaXMgbm90IGJlIHN1cHBvcnR0ZWQnKTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkIChjaGlsZCkge1xuICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLmNoaWxkKSkge1xuICAgICAgdGhpcy5jaGlsZCA9IHRoaXMubGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFzdENoaWxkLnNsaWJpbmcgPSBjaGlsZDtcbiAgICAgIHRoaXMubGFzdENoaWxkID0gY2hpbGQ7XG4gICAgfSAgICBcblxuICAgIGNoaWxkLnJldHVybiA9IHRoaXM7XG4gIH1cblxuICByZW1vdmVDaGlsZCAoY2hpbGQpIHtcblxuICB9XG5cbiAgZ2V0QXR0cmlidXRlIChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXNbbmFtZV07XG4gIH1cbiAgc2V0QXR0cmlidXRlIChuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXNbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZSAobmFtZSkge1xuICAgIHRoaXNbbmFtZV0gPSBudWxsO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lciAoKSB7fVxuICByZW1vdmVFdmVudExpc3RlbmVyICgpIHt9XG4gIGRpc3BhdGNoRXZlbnQgKHR5cGUsIGlkLCBlKSB7XG4gICAgY29uc29sZS5sb2coKVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiBgW29iamVjdCBIVE1MJHt0aGlzLnRhZ05hbWV9RWxlbWVudF1gO1xuICB9XG5cbiAgc2VyaWFsaXplICgpIHtcbiAgICBjb25zdCBkZWZhdWx0UHJvcHMgPSB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcztcbiAgICBjb25zdCBlbGVtZW50ID0gcmVzb2x2ZURlZmF1bHRQcm9wcyhkZWZhdWx0UHJvcHMsIHRoaXMpO1xuXG4gICAgZWxlbWVudC5zdHlsZSA9IFN0cmluZyhlbGVtZW50LnN0eWxlKTtcblxuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5jaGlsZCkpIHtcbiAgICAgIGVsZW1lbnQuY2hpbGQgPSB0aGlzLmNoaWxkLnNlcmlhbGl6ZSgpO1xuICAgIH1cblxuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5zbGliaW5nKSkge1xuICAgICAgZWxlbWVudC5zbGliaW5nID0gdGhpcy5zbGliaW5nLnNlcmlhbGl6ZSgpO1xuICAgIH1cblxuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5pbm5lclRleHQpKSB7XG4gICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGVsZW1lbnQudGFnTmFtZSA9IHRoaXMudGFnTmFtZTtcbiAgICBlbGVtZW50LnV1aWQgPSB0aGlzLnV1aWQ7XG4gICAgZWxlbWVudC5ub2RlVHlwZSA9IHRoaXMubm9kZVR5cGU7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gJy4vU3R5bGVTaGVldCc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCB7IElNQUdFIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuXG5pbXBvcnQgUmVtaXhJbWFnZSBmcm9tICcuLi9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtaW1hZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MSW1hZ2VFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gUmVtaXhJbWFnZS5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRhZ05hbWUgPSBJTUFHRTtcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICAgIHRoaXMuc3R5bGUgPSBuZXcgU3R5bGVTaGVldCgpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQgKGNoaWxkKSB7fVxuICByZW1vdmVDaGlsZCAoY2hpbGQpIHt9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgUElDS0VSIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IEhUTUxUZXh0RWxlbWVudCBmcm9tICcuL0hUTUxUZXh0RWxlbWVudCc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuL1N0eWxlU2hlZXQnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5cbmltcG9ydCBSZW1peFBpY2tlciBmcm9tICcuLi9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtcGlja2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTFBpY2tlckVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peFBpY2tlci5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRhZ05hbWUgPSBQSUNLRVI7XG4gICAgdGhpcy5ub2RlVHlwZSA9IEVMRU1FTlRfTk9ERTtcbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IHsgUk9PVCB9IGZyb20gJy4vSFRNTFR5cGVzJztcbmltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcblxuaW1wb3J0IFJlbWl4Um9vdCBmcm9tICcuLi9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtcm9vdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxWaWV3RWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4Um9vdC5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICAgIHRoaXMudGFnTmFtZSA9IFJPT1Q7XG4gIH1cbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBTV0lQRVIgfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcbmltcG9ydCBIVE1MVGV4dEVsZW1lbnQgZnJvbSAnLi9IVE1MVGV4dEVsZW1lbnQnO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi9TdHlsZVNoZWV0JztcblxuaW1wb3J0IFJlbWl4U3dpcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC1zd2lwZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MU3dpcGVyRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFJlbWl4U3dpcGVyLmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGFnTmFtZSA9IFNXSVBFUjtcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICB9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgU1dJUEVSX0lURU0gfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5pbXBvcnQgeyBFTEVNRU5UX05PREUgfSBmcm9tICcuLi9zaGFyZWQvSFRNTE5vZGVUeXBlJztcbmltcG9ydCBIVE1MRWxlbWVudCBmcm9tICcuL0hUTUxFbGVtZW50JztcbmltcG9ydCBIVE1MVGV4dEVsZW1lbnQgZnJvbSAnLi9IVE1MVGV4dEVsZW1lbnQnO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi9TdHlsZVNoZWV0JztcblxuaW1wb3J0IFJlbWl4U3dpcGVySXRlbSBmcm9tICcuLi9jb21wb25lbnRzL3JlbWl4LWVsZW1lbnQvcmVtaXgtc3dpcGVyLWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MU3dpcGVySXRlbUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peFN3aXBlckl0ZW0uZGVmYXVsdFByb3BzO1xuICBcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRhZ05hbWUgPSBTV0lQRVJfSVRFTTtcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICB9XG59IiwiaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgeyBURVhUIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuXG5pbXBvcnQgUmVtaXhUZXh0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC10ZXh0JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MVGV4dEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBSZW1peFRleHQuZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yICh0ZXh0Q29udGVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICAgIHRoaXMudGFnTmFtZSA9IFRFWFQ7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgSU1BR0UgPSAnaW1hZ2UnO1xuZXhwb3J0IGNvbnN0IEJVVFRPTiA9ICdidXR0b24nO1xuZXhwb3J0IGNvbnN0IE1BUCA9ICdtYXAnO1xuZXhwb3J0IGNvbnN0IElOUFVUID0gJ2lucHV0JztcbmV4cG9ydCBjb25zdCBWSUVXID0gJ3ZpZXcnO1xuZXhwb3J0IGNvbnN0IFJPT1QgPSAncm9vdCc7XG5leHBvcnQgY29uc3QgQk9EWSA9ICdib2R5JztcbmV4cG9ydCBjb25zdCBURVhUID0gJ3RleHQnO1xuZXhwb3J0IGNvbnN0IFBMQUlOX1RFWFQgPSAnI3RleHQnO1xuZXhwb3J0IGNvbnN0IFBJQ0tFUiA9ICdwaWNrZXInO1xuZXhwb3J0IGNvbnN0IFNXSVBFUl9JVEVNID0gJ3N3aXBlci1pdGVtJztcbmV4cG9ydCBjb25zdCBTV0lQRVIgPSAnc3dpcGVyJztcbmV4cG9ydCBjb25zdCBWSURFTyA9ICd2aWRlbyc7IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi9TdHlsZVNoZWV0JztcbmltcG9ydCB7IEVMRU1FTlRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IHsgVklERU8gfSBmcm9tICcuL0hUTUxUeXBlcyc7XG5cbmltcG9ydCBSZW1peFZpZGVvIGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC12aWRlbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbWl4VmlkZW9FbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gUmVtaXhWaWRlby5kZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRhZ05hbWUgPSBWSURFTztcbiAgICB0aGlzLm5vZGVUeXBlID0gRUxFTUVOVF9OT0RFO1xuICAgIHRoaXMuc3R5bGUgPSBuZXcgU3R5bGVTaGVldCgpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQgKGNoaWxkKSB7fVxuICByZW1vdmVDaGlsZCAoY2hpbGQpIHt9XG59IiwiaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgeyBWSUVXIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuaW1wb3J0IEhUTUxFbGVtZW50IGZyb20gJy4vSFRNTEVsZW1lbnQnO1xuXG5pbXBvcnQgUmVtaXhWaWV3IGZyb20gJy4uL2NvbXBvbmVudHMvcmVtaXgtZWxlbWVudC9yZW1peC12aWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTFZpZXdFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gUmVtaXhWaWV3LmRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubm9kZVR5cGUgPSBFTEVNRU5UX05PREU7XG4gICAgdGhpcy50YWdOYW1lID0gVklFVztcbiAgfVxufSIsImNvbnN0IHsgZ2V0T3duUHJvcGVydHlOYW1lcyB9ID0gT2JqZWN0O1xuXG5jb25zdCBwcm9wZXJ0aWVzID0ge1xuICBhbGlnbkNvbnRlbnQ6ICdhbGlnbi1jb250ZW50JyxcbiAgYWxpZ25JdGVtczogJ2FsaWduLWl0ZW1zJyxcbiAgYWxpZ25TZWxmOiAnYWxpZ24tc2VsZicsXG4gIGFsbDogJ2FsbCcsXG4gIGFuaW1hdGlvbjogJ2FuaW1hdGlvbicsXG4gIGFuaW1hdGlvbkRlbGF5OiAnYW5pbWF0aW9uLWRlbGF5JyxcbiAgYW5pbWF0aW9uRGlyZWN0aW9uOiAnYW5pbWF0aW9uLWRpcmVjdGlvbicsXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiAnYW5pbWF0aW9uLWR1cmF0aW9uJyxcbiAgYW5pbWF0aW9uRmlsbE1vZGU6ICdhbmltYXRpb24tZmlsbC1tb2RlJyxcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdhbmltYXRpb24taXRlcmF0aW9uLWNvdW50JyxcbiAgYW5pbWF0aW9uTmFtZTogJ2FuaW1hdGlvbi1uYW1lJyxcbiAgYW5pbWF0aW9uUGxheVN0YXRlOiAnYW5pbWF0aW9uLXBsYXktc3RhdGUnLFxuICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb24nLFxuICBhcHBlYXJhbmNlOiAnYXBwZWFyYW5jZScsXG4gIGJhY2tmYWNlVmlzaWJpbGl0eTogJ2JhY2tmYWNlLXZpc2liaWxpdHknLFxuICBiYWNrZ3JvdW5kOiAnYmFja2dyb3VuZCcsXG4gIGJhY2tncm91bmRBdHRhY2htZW50OiAnYmFja2dyb3VuZC1hdHRhY2htZW50JyxcbiAgYmFja2dyb3VuZEJsZW5kTW9kZTogJ2JhY2tncm91bmQtYmxlbmQtbW9kZScsXG4gIGJhY2tncm91bmRDbGlwOiAnYmFja2dyb3VuZC1jbGlwJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gIGJhY2tncm91bmRJbWFnZTogJ2JhY2tncm91bmQtaW1hZ2UnLFxuICBiYWNrZ3JvdW5kT3JpZ2luOiAnYmFja2dyb3VuZC1vcmlnaW4nLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246ICdiYWNrZ3JvdW5kLXBvc2l0aW9uJyxcbiAgYmFja2dyb3VuZFJlcGVhdDogJ2JhY2tncm91bmQtcmVwZWF0JyxcbiAgYmFja2dyb3VuZFNpemU6ICdiYWNrZ3JvdW5kLXNpemUnLFxuICBib3JkZXI6ICdib3JkZXInLFxuICBib3JkZXJCb3R0b206ICdib3JkZXItYm90dG9tJyxcbiAgYm9yZGVyQm90dG9tQ29sb3I6ICdib3JkZXItYm90dG9tLWNvbG9yJyxcbiAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnLFxuICBib3JkZXJCb3R0b21SaWdodFJhZGl1czogJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJyxcbiAgYm9yZGVyQm90dG9tU3R5bGU6ICdib3JkZXItYm90dG9tLXN0eWxlJyxcbiAgYm9yZGVyQm90dG9tV2lkdGg6ICdib3JkZXItYm90dG9tLXdpZHRoJyxcbiAgYm9yZGVyQ29sbGFwc2U6ICdib3JkZXItY29sbGFwc2UnLFxuICBib3JkZXJDb2xvcjogJ2JvcmRlci1jb2xvcicsXG4gIGJvcmRlckltYWdlOiAnYm9yZGVyLWltYWdlJyxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6ICdib3JkZXItaW1hZ2Utb3V0c2V0JyxcbiAgYm9yZGVySW1hZ2VSZXBlYXQ6ICdib3JkZXItaW1hZ2UtcmVwZWF0JyxcbiAgYm9yZGVySW1hZ2VTbGljZTogJ2JvcmRlci1pbWFnZS1zbGljZScsXG4gIGJvcmRlckltYWdlU291cmNlOiAnYm9yZGVyLWltYWdlLXNvdXJjZScsXG4gIGJvcmRlckltYWdlV2lkdGg6ICdib3JkZXItaW1hZ2Utd2lkdGgnLFxuICBib3JkZXJMZWZ0OiAnYm9yZGVyLWxlZnQnLFxuICBib3JkZXJMZWZ0Q29sb3I6ICdib3JkZXItbGVmdC1jb2xvcicsXG4gIGJvcmRlckxlZnRTdHlsZTogJ2JvcmRlci1sZWZ0LXN0eWxlJyxcbiAgYm9yZGVyTGVmdFdpZHRoOiAnYm9yZGVyLWxlZnQtd2lkdGgnLFxuICBib3JkZXJSYWRpdXM6ICdib3JkZXItcmFkaXVzJyxcbiAgYm9yZGVyUmlnaHQ6ICdib3JkZXItcmlnaHQnLFxuICBib3JkZXJSaWdodENvbG9yOiAnYm9yZGVyLXJpZ2h0LWNvbG9yJyxcbiAgYm9yZGVyUmlnaHRTdHlsZTogJ2JvcmRlci1yaWdodC1zdHlsZScsXG4gIGJvcmRlclJpZ2h0V2lkdGg6ICdib3JkZXItcmlnaHQtd2lkdGgnLFxuICBib3JkZXJTcGFjaW5nOiAnYm9yZGVyLXNwYWNpbmcnLFxuICBib3JkZXJTdHlsZTogJ2JvcmRlci1zdHlsZScsXG4gIGJvcmRlclRvcDogJ2JvcmRlci10b3AnLFxuICBib3JkZXJUb3BDb2xvcjogJ2JvcmRlci10b3AtY29sb3InLFxuICBib3JkZXJUb3BMZWZ0UmFkaXVzOiAnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycsXG4gIGJvcmRlclRvcFJpZ2h0UmFkaXVzOiAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnLFxuICBib3JkZXJUb3BTdHlsZTogJ2JvcmRlci10b3Atc3R5bGUnLFxuICBib3JkZXJUb3BXaWR0aDogJ2JvcmRlci10b3Atd2lkdGgnLFxuICBib3JkZXJXaWR0aDogJ2JvcmRlci13aWR0aCcsXG4gIGJvdHRvbTogJ2JvdHRvbScsXG4gIGJveEFsaWduOiAnYm94LWFsaWduJyxcbiAgYm94RGlyZWN0aW9uOiAnYm94LWRpcmVjdGlvbicsXG4gIGJveEZsZXg6ICdib3gtZmxleCcsXG4gIGJveEZsZXhHcm91cDogJ2JveC1mbGV4LWdyb3VwJyxcbiAgYm94TGluZXM6ICdib3gtbGluZXMnLFxuICBib3hPcmRpbmFsR3JvdXA6ICdib3gtb3JkaW5hbC1ncm91cCcsXG4gIGJveE9yaWVudDogJ2JveC1vcmllbnQnLFxuICBib3hQYWNrOiAnYm94LXBhY2snLFxuICBib3hTaGFkb3c6ICdib3gtc2hhZG93JyxcbiAgYm94U2l6aW5nOiAnYm94LXNpemluZycsXG4gIGNhcHRpb25TaWRlOiAnY2FwdGlvbi1zaWRlJyxcbiAgY2xlYXI6ICdjbGVhcicsXG4gIGNsaXA6ICdjbGlwJyxcbiAgY29sb3I6ICdjb2xvcicsXG4gIGNvbHVtbkNvdW50OiAnY29sdW1uLWNvdW50JyxcbiAgY29sdW1uRmlsbDogJ2NvbHVtbi1maWxsJyxcbiAgY29sdW1uR2FwOiAnY29sdW1uLWdhcCcsXG4gIGNvbHVtblJ1bGU6ICdjb2x1bW4tcnVsZScsXG4gIGNvbHVtblJ1bGVDb2xvcjogJ2NvbHVtbi1ydWxlLWNvbG9yJyxcbiAgY29sdW1uUnVsZVN0eWxlOiAnY29sdW1uLXJ1bGUtc3R5bGUnLFxuICBjb2x1bW5SdWxlV2lkdGg6ICdjb2x1bW4tcnVsZS13aWR0aCcsXG4gIGNvbHVtblNwYW46ICdjb2x1bW4tc3BhbicsXG4gIGNvbHVtbldpZHRoOiAnY29sdW1uLXdpZHRoJyxcbiAgY29sdW1uczogJ2NvbHVtbnMnLFxuICBjb250ZW50OiAnY29udGVudCcsXG4gIGNvdW50ZXJJbmNyZW1lbnQ6ICdjb3VudGVyLWluY3JlbWVudCcsXG4gIGNvdW50ZXJSZXNldDogJ2NvdW50ZXItcmVzZXQnLFxuICBjdXJzb3I6ICdjdXJzb3InLFxuICBkaXJlY3Rpb246ICdkaXJlY3Rpb24nLFxuICBkaXNwbGF5OiAnZGlzcGxheScsXG4gIGVtcHR5Q2VsbHM6ICdlbXB0eS1jZWxscycsXG4gIGZpbHRlcjogJ2ZpbHRlcicsXG4gIGZsZXg6ICdmbGV4JyxcbiAgZmxleEJhc2lzOiAnZmxleC1iYXNpcycsXG4gIGZsZXhEaXJlY3Rpb246ICdmbGV4LWRpcmVjdGlvbicsXG4gIGZsZXhGbG93OiAnZmxleC1mbG93JyxcbiAgZmxleEdyb3c6ICdmbGV4LWdyb3cnLFxuICBmbGV4U2hyaW5rOiAnZmxleC1zaHJpbmsnLFxuICBmbGV4V3JhcDogJ2ZsZXgtd3JhcCcsXG4gIGZsb2F0OiAnZmxvYXQnLFxuICBmb250OiAnZm9udCcsXG4gIGZvbnRGYW1pbHk6ICdmb250LWZhbWlseScsXG4gIGZvbnRTaXplOiAnZm9udC1zaXplJyxcbiAgZm9udFNpemVBZGp1c3Q6ICdmb250LXNpemUtYWRqdXN0JyxcbiAgZm9udFN0cmV0Y2g6ICdmb250LXN0cmV0Y2gnLFxuICBmb250U3R5bGU6ICdmb250LXN0eWxlJyxcbiAgZm9udFZhcmlhbnQ6ICdmb250LXZhcmlhbnQnLFxuICBmb250V2VpZ2h0OiAnZm9udC13ZWlnaHQnLFxuICBncmlkQ29sdW1uczogJ2dyaWQtY29sdW1ucycsXG4gIGdyaWRSb3dzOiAnZ3JpZC1yb3dzJyxcbiAgaGFuZ2luZ1B1bmN0dWF0aW9uOiAnaGFuZ2luZy1wdW5jdHVhdGlvbicsXG4gIGhlaWdodDogJ2hlaWdodCcsXG4gIGljb246ICdpY29uJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdqdXN0aWZ5LWNvbnRlbnQnLFxuICBsZWZ0OiAnbGVmdCcsXG4gIGxldHRlclNwYWNpbmc6ICdsZXR0ZXItc3BhY2luZycsXG4gIGxpbmVIZWlnaHQ6ICdsaW5lLWhlaWdodCcsXG4gIGxpc3RTdHlsZTogJ2xpc3Qtc3R5bGUnLFxuICBsaXN0U3R5bGVJbWFnZTogJ2xpc3Qtc3R5bGUtaW1hZ2UnLFxuICBsaXN0U3R5bGVQb3NpdGlvbjogJ2xpc3Qtc3R5bGUtcG9zaXRpb24nLFxuICBsaXN0U3R5bGVUeXBlOiAnbGlzdC1zdHlsZS10eXBlJyxcbiAgbWFyZ2luOiAnbWFyZ2luJyxcbiAgbWFyZ2luQm90dG9tOiAnbWFyZ2luLWJvdHRvbScsXG4gIG1hcmdpbkxlZnQ6ICdtYXJnaW4tbGVmdCcsXG4gIG1hcmdpblJpZ2h0OiAnbWFyZ2luLXJpZ2h0JyxcbiAgbWFyZ2luVG9wOiAnbWFyZ2luLXRvcCcsXG4gIG1heEhlaWdodDogJ21heC1oZWlnaHQnLFxuICBtYXhXaWR0aDogJ21heC13aWR0aCcsXG4gIG1pbkhlaWdodDogJ21pbi1oZWlnaHQnLFxuICBtaW5XaWR0aDogJ21pbi13aWR0aCcsXG4gIG5hdkRvd246ICduYXYtZG93bicsXG4gIG5hdkluZGV4OiAnbmF2LWluZGV4JyxcbiAgbmF2TGVmdDogJ25hdi1sZWZ0JyxcbiAgbmF2UmlnaHQ6ICduYXYtcmlnaHQnLFxuICBuYXZVcDogJ25hdi11cCcsXG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgb3JkZXI6ICdvcmRlcicsXG4gIG91dGxpbmU6ICdvdXRsaW5lJyxcbiAgb3V0bGluZUNvbG9yOiAnb3V0bGluZS1jb2xvcicsXG4gIG91dGxpbmVPZmZzZXQ6ICdvdXRsaW5lLW9mZnNldCcsXG4gIG91dGxpbmVTdHlsZTogJ291dGxpbmUtc3R5bGUnLFxuICBvdXRsaW5lV2lkdGg6ICdvdXRsaW5lLXdpZHRoJyxcbiAgb3ZlcmZsb3c6ICdvdmVyZmxvdycsXG4gIG92ZXJmbG93WDogJ292ZXJmbG93LXgnLFxuICBvdmVyZmxvd1k6ICdvdmVyZmxvdy15JyxcbiAgcGFkZGluZzogJ3BhZGRpbmcnLFxuICBwYWRkaW5nQm90dG9tOiAncGFkZGluZy1ib3R0b20nLFxuICBwYWRkaW5nTGVmdDogJ3BhZGRpbmctbGVmdCcsXG4gIHBhZGRpbmdSaWdodDogJ3BhZGRpbmctcmlnaHQnLFxuICBwYWRkaW5nVG9wOiAncGFkZGluZy10b3AnLFxuICBwYWdlQnJlYWtBZnRlcjogJ3BhZ2UtYnJlYWstYWZ0ZXInLFxuICBwYWdlQnJlYWtCZWZvcmU6ICdwYWdlLWJyZWFrLWJlZm9yZScsXG4gIHBhZ2VCcmVha0luc2lkZTogJ3BhZ2UtYnJlYWstaW5zaWRlJyxcbiAgcGVyc3BlY3RpdmU6ICdwZXJzcGVjdGl2ZScsXG4gIHBlcnNwZWN0aXZlT3JpZ2luOiAncGVyc3BlY3RpdmUtb3JpZ2luJyxcbiAgcG9zaXRpb246ICdwb3NpdGlvbicsXG4gIHB1bmN0dWF0aW9uVHJpbTogJ3B1bmN0dWF0aW9uLXRyaW0nLFxuICBxdW90ZXM6ICdxdW90ZXMnLFxuICByZXNpemU6ICdyZXNpemUnLFxuICByaWdodDogJ3JpZ2h0JyxcbiAgcm90YXRpb246ICdyb3RhdGlvbicsXG4gIHRhYlNpemU6ICd0YWItc2l6ZScsXG4gIHRhYmxlTGF5b3V0OiAndGFibGUtbGF5b3V0JyxcbiAgdGFyZ2V0OiAndGFyZ2V0JyxcbiAgdGFyZ2V0TmFtZTogJ3RhcmdldC1uYW1lJyxcbiAgdGFyZ2V0TmV3OiAndGFyZ2V0LW5ldycsXG4gIHRhcmdldFBvc2l0aW9uOiAndGFyZ2V0LXBvc2l0aW9uJyxcbiAgdGV4dEFsaWduOiAndGV4dC1hbGlnbicsXG4gIHRleHRBbGlnbkxhc3Q6ICd0ZXh0LWFsaWduLWxhc3QnLFxuICB0ZXh0RGVjb3JhdGlvbjogJ3RleHQtZGVjb3JhdGlvbicsXG4gIHRleHREZWNvcmF0aW9uQ29sb3I6ICd0ZXh0LWRlY29yYXRpb24tY29sb3InLFxuICB0ZXh0RGVjb3JhdGlvbkxpbmU6ICd0ZXh0LWRlY29yYXRpb24tbGluZScsXG4gIHRleHREZWNvcmF0aW9uU3R5bGU6ICd0ZXh0LWRlY29yYXRpb24tc3R5bGUnLFxuICB0ZXh0SW5kZW50OiAndGV4dC1pbmRlbnQnLFxuICB0ZXh0SnVzdGlmeTogJ3RleHQtanVzdGlmeScsXG4gIHRleHRPdXRsaW5lOiAndGV4dC1vdXRsaW5lJyxcbiAgdGV4dE92ZXJmbG93OiAndGV4dC1vdmVyZmxvdycsXG4gIHRleHRTaGFkb3c6ICd0ZXh0LXNoYWRvdycsXG4gIHRleHRUcmFuc2Zvcm06ICd0ZXh0LXRyYW5zZm9ybScsXG4gIHRleHRXcmFwOiAndGV4dC13cmFwJyxcbiAgdG9wOiAndG9wJyxcbiAgdHJhbnNmb3JtOiAndHJhbnNmb3JtJyxcbiAgdHJhbnNmb3JtT3JpZ2luOiAndHJhbnNmb3JtLW9yaWdpbicsXG4gIHRyYW5zZm9ybVN0eWxlOiAndHJhbnNmb3JtLXN0eWxlJyxcbiAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb24nLFxuICB0cmFuc2l0aW9uRGVsYXk6ICd0cmFuc2l0aW9uLWRlbGF5JyxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiAndHJhbnNpdGlvbi1kdXJhdGlvbicsXG4gIHRyYW5zaXRpb25Qcm9wZXJ0eTogJ3RyYW5zaXRpb24tcHJvcGVydHknLFxuICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246ICd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbicsXG4gIHVuaWNvZGVCaWRpOiAndW5pY29kZS1iaWRpJyxcbiAgdmVydGljYWxBbGlnbjogJ3ZlcnRpY2FsLWFsaWduJyxcbiAgdmlzaWJpbGl0eTogJ3Zpc2liaWxpdHknLFxuICB3aGl0ZVNwYWNlOiAnd2hpdGUtc3BhY2UnLFxuICB3aWR0aDogJ3dpZHRoJyxcbiAgd29yZEJyZWFrOiAnd29yZC1icmVhaycsXG4gIHdvcmRTcGFjaW5nOiAnd29yZC1zcGFjaW5nJyxcbiAgd29yZFdyYXA6ICd3b3JkLXdyYXAnLFxuICB6SW5kZXg6ICd6LWluZGV4JyxcbiAgd3JpdGluZ01vZGU6ICd3cml0aW5nLW1vZGUnLFxufTtcblxuXG5jbGFzcyBTdHlsZVNoZWV0IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc3RyaW5nID0gJyc7XG4gICAgdGhpcy5zaGVldCA9IHt9O1xuICAgIHRoaXMuaXNDaGFuZ2VkID0gZmFsc2U7XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgaWYgKHRoaXMuaXNDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBuYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXModGhpcy5zaGVldCk7XG4gICAgICB0aGlzLnN0cmluZyA9IG5hbWVzLm1hcChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnNoZWV0W25hbWVdO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZS5qb2luKCc6JylcbiAgICAgIH0pLmpvaW4oJzsnKTtcblxuICAgICAgdGhpcy5pc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBzdHlsZSA9IG5ldyBTdHlsZVNoZWV0KCk7XG5cbiAgcmV0dXJuIG5ldyBQcm94eShzdHlsZSwge1xuICAgIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgICB9LFxuICAgIFxuICAgIHNldCAodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICBpZiAocHJvcGVydGllc1trZXldKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzdHlsZS5zaGVldFtrZXldO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGlmIChkYXRhWzFdICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgZGF0YVsxXSA9IHZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN0eWxlLmlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUuc2hlZXRba2V5XSA9IFtcbiAgICAgICAgICAgIHByb3BlcnRpZXNba2V5XSwgdmFsdWUgXG4gICAgICAgICAgXTtcbiAgICAgICAgICBcbiAgICAgICAgICBzdHlsZS5pc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVtrZXldID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSlcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIgKCkge30iLCJpbXBvcnQgeyBJTUFHRSwgSU5QVVQsIE1BUCwgQlVUVE9OLCBWSUVXLCBURVhULCBQSUNLRVIsIFNXSVBFUl9JVEVNLCBTV0lQRVIsIFJPT1QsIFZJREVPIH0gZnJvbSAnLi9IVE1MVHlwZXMnO1xuaW1wb3J0IHsgRUxFTUVOVF9OT0RFIH0gZnJvbSAnLi4vc2hhcmVkL0hUTUxOb2RlVHlwZSc7XG5pbXBvcnQgSFRNTEVsZW1lbnQgZnJvbSAnLi9IVE1MRWxlbWVudCc7XG5pbXBvcnQgSFRNTEltYWdlRWxlbWVudCBmcm9tICcuL0hUTUxJbWFnZUVsZW1lbnQnO1xuaW1wb3J0IEhUTUxCdXR0b25FbGVtZW50IGZyb20gJy4vSFRNTEJ1dHRvbkVsZW1lbnQnO1xuaW1wb3J0IEhUTUxWaWV3RWxlbWVudCBmcm9tICcuL0hUTUxWaWV3RWxlbWVudCc7XG5pbXBvcnQgSFRNTFRleHRFbGVtZW50IGZyb20gJy4vSFRNTFRleHRFbGVtZW50JztcbmltcG9ydCBIVE1MUGlja2VyRWxlbWVudCBmcm9tICcuL0hUTUxQaWNrZXJFbGVtZW50JztcbmltcG9ydCBIVE1MU3dpcGVySXRlbUVsZW1lbnQgZnJvbSAnLi9IVE1MU3dpcGVySXRlbUVsZW1lbnQnO1xuaW1wb3J0IEhUTUxTd2lwZXJFbGVtZW50IGZyb20gJy4vSFRNTFN3aXBlckVsZW1lbnQnO1xuaW1wb3J0IEhUTUxSb290RWxlbWVudCBmcm9tICcuL0hUTUxSb290RWxlbWVudCc7XG5pbXBvcnQgSFRNTFZpZGVvRWxlbWVudCBmcm9tICcuL0hUTUxWaWRlb0VsZW1lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50ICh0YWdOYW1lKSB7XG4gIGxldCBlbGVtZW50O1xuXG4gIHN3aXRjaCAodGFnTmFtZSkge1xuICAgIGNhc2UgUk9PVDoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MUm9vdEVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIElNQUdFOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIEJVVFRPTjoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MQnV0dG9uRWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgVklFVzoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MVmlld0VsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIFRFWFQ6IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTFRleHRFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgY2FzZSBQSUNLRVI6IHtcbiAgICAgIHJldHVybiBuZXcgSFRNTFBpY2tlckVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBjYXNlIFNXSVBFUl9JVEVNOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxTd2lwZXJJdGVtRWxlbWVudCgpO1xuICAgIH1cblxuICAgIGNhc2UgU1dJUEVSOiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxTd2lwZXJFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgY2FzZSBWSURFTzoge1xuICAgICAgcmV0dXJuIG5ldyBIVE1MVmlkZW9FbGVtZW50KCk7XG4gICAgfVxuICBcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gbmV3IEhUTUxFbGVtZW50KHRhZ05hbWUpO1xuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IFRFWFRfTk9ERSB9IGZyb20gJy4uL3NoYXJlZC9IVE1MTm9kZVR5cGUnO1xuaW1wb3J0IHsgUExBSU5fVEVYVCB9IGZyb20gJy4vSFRNTFR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcbiAgcmV0dXJuIHtcbiAgICBub2RlVHlwZTogVEVYVF9OT0RFLFxuICAgIHRhZ05hbWU6IFBMQUlOX1RFWFQsXG4gICAgdGV4dCxcbiAgICBzZXJpYWxpemUgKCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9ICB7XG4gICAgICAgIHRhZ05hbWU6IHRoaXMudGFnTmFtZSxcbiAgICAgICAgdGV4dDogdGhpcy50ZXh0LFxuICAgICAgfTtcblxuICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLnNsaWJpbmcpKSB7XG4gICAgICAgIGVsZW1lbnQuc2xpYmluZyA9IHRoaXMuc2xpYmluZy5zZXJpYWxpemUoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IEhUTUxCb2R5RWxlbWVudCBmcm9tICcuL0hUTUxCb2R5RWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL2NyZWF0ZUVsZW1lbnQnO1xuaW1wb3J0IGNyZWF0ZVRleHROb2RlIGZyb20gJy4vY3JlYXRlVGV4dE5vZGUnO1xuaW1wb3J0IGNyZWF0ZUNvbnRhaW5lciBmcm9tICcuL2NyZWF0ZUNvbnRhaW5lcic7XG5pbXBvcnQgZ2xvYmFsRWxlbWVudHMgZnJvbSAnLi9nbG9iYWxFbGVtZW50cyc7XG5pbXBvcnQgZW52IGZyb20gJy4uLy4uL2Vudic7XG5cblxuY29uc3QgZmFrZURvY3VtZW50ID0ge1xuICBmaW5kRWxlbWVudCAodXVpZCkge1xuICAgIHJldHVybiBnbG9iYWxFbGVtZW50c1t1dWlkXTtcbiAgfSxcbiAgZ2V0Q29udGFpbmVyRWxlbWVudHMgKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBjb250YWluZXIuc2VyaWFsaXplKCk7XG4gIH0sXG4gIGJvZHk6IG5ldyBIVE1MQm9keUVsZW1lbnQoKSxcbiAgZ2V0RWxlbWVudEJ5SWQgKGlkKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRhaW5lcignY29udGFpbmVyJyk7XG4gIH0sXG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lICgpIHt9LCAgXG4gIHF1ZXJ5U2VsZWN0b3IgKCkge30sXG4gIGFkZEV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG4gICAgZGVidWdnZXI7XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKCkge1xuICAgIGRlYnVnZ2VyO1xuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQgKCkge30sXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVRleHROb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZha2VEb2N1bWVudDtcblxuLy8gZXhwb3J0IGRlZmF1bHQgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyA/IFxuLy8gICB2aXJ0dWFsRG9jdW1lbnQgOiBcbi8vICAgZW52LmlzRGV2VG9vbFJ1bnRpbWUgPyBmYWtlRG9jdW1lbnQgOiBkb2N1bWVudDsiLCJleHBvcnQgZGVmYXVsdCB7fSIsImltcG9ydCBkb2N1bWVudCBmcm9tICcuL2RvY3VtZW50JztcblxuZXhwb3J0IHtcbiAgZG9jdW1lbnRcbn0iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vcmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi4vcmVuZGVyZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb24sIFRhYkJhciB9IGZyb20gJy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHRlcm1pbmFsIGZyb20gJy4vcnVudGltZS90ZXJtaW5hbCc7XG5pbXBvcnQgbG9naWMgZnJvbSAnLi9ydW50aW1lL2xvZ2ljJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vLi4vZW52JztcblxuY29uc3QgeyBUYWJCYXJJdGVtIH0gPSBUYWJCYXI7XG5cbmV4cG9ydCBjb25zdCBnZXRBcHBsaWNhdGlvbiA9ICgpID0+IHtcbiAgcmV0dXJuIFByb2dyYW0uY29udGV4dDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3JhbSB7XG4gIGNvbnN0cnVjdG9yIChBcHAsIGNvbnRhaW5lcikge1xuICAgIFByb2dyYW0uY29udGV4dCA9IHRoaXM7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHQnLCB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICBpZiAodGhpcy5fX2NvbnRleHRfXykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fY29udGV4dF9fO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX19jb250ZXh0X18gPSB7XG4gICAgICAgICAgdGFiQmFyOiB7XG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvdXRlcjoge1xuICAgICAgICAgICAgcm91dGVzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlnOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIHJlbmRlcihjcmVhdGVFbGVtZW50KEFwcCksIGNvbnRhaW5lcik7XG4gICAgXG4gICAgICAgIGNvbnN0IHJvb3RDb250YWluZXIgPSBjb250YWluZXIuX3JlYWN0Um9vdENvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgY3VycmVudEZpYmVyID0gcm9vdENvbnRhaW5lci5faW50ZXJuYWxSb290LmN1cnJlbnQ7XG5cbiAgICAgICAgbGV0IG5vZGUgPSBjdXJyZW50RmliZXI7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBzd2l0Y2ggKG5vZGUuZWxlbWVudFR5cGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSBBcHBsaWNhdGlvbjoge1xuICAgICAgICAgICAgICBjb250ZXh0LmNvbmZpZyA9IG5vZGUubWVtb2l6ZWRQcm9wcy5jb25maWc7XG4gICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBub2RlLnN0YXRlTm9kZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY2FzZSBSb3V0ZToge1xuICAgICAgICAgICAgICBjb250ZXh0LnJvdXRlci5yb3V0ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgcGF0aDogbm9kZS5tZW1vaXplZFByb3BzLnBhdGgsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBub2RlLm1lbW9pemVkUHJvcHMuY29tcG9uZW50IFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY2FzZSBUYWJCYXI6IHtcbiAgICAgICAgICAgICAgY29udGV4dC50YWJCYXIgPSB7XG4gICAgICAgICAgICAgICAgLi4ubm9kZS5tZW1vaXplZFByb3BzLFxuICAgICAgICAgICAgICAgIC4uLmNvbnRleHQudGFiQmFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY2FzZSBUYWJCYXJJdGVtOiB7XG4gICAgICAgICAgICAgIGNvbnRleHQudGFiQmFyLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGljb246IG5vZGUubWVtb2l6ZWRQcm9wcy5pY29uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvbjogbm9kZS5tZW1vaXplZFByb3BzLnNlbGVjdGVkSWNvbixcbiAgICAgICAgICAgICAgICBwYXRoOiBub2RlLm1lbW9pemVkUHJvcHMucGF0aCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBub2RlLm1lbW9pemVkUHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQobm9kZS5jaGlsZCkpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmNoaWxkO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgd2hpbGUgKGlzTnVsbE9yVW5kZWZpbmVkKG5vZGUuc2libGluZykpIHtcbiAgICAgICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChub2RlLnJldHVybikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJldHVybjtcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICBub2RlID0gbm9kZS5zaWJsaW5nO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgaWYgKGVudi5pc0RldlRvb2xSdW50aW1lKSB7XG4gICAgICBsb2dpYyh0aGlzLmNvbnRleHQsIHRoaXMuaW5zdGFuY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXJtaW5hbCh0aGlzLmNvbnRleHQsIHRoaXMuaW5zdGFuY2UpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB0cmFuc3BvcnRzIGZyb20gJy4vcnVudGltZS90cmFuc3BvcnRzJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vLi4vZW52JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAocm91dGUpIHtcbiAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgdGhpcy5pZCA9IHV1aWQudjQoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgY29uc3QgY3RybCA9IHRoaXM7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihQYWdlKSkge1xuICAgICAgUGFnZSh7XG4gICAgICAgIGRhdGE6IHsgZWxlbWVudDogbnVsbCB9LFxuICAgICAgICBvbkxvYWQgKHF1ZXJ5KSB7IGN0cmwub25Mb2FkKHRoaXMsIHF1ZXJ5KSB9LFxuICAgICAgICBvblNob3cgKCkge30sXG4gICAgICAgIG9uSGlkZSAoKSB7fSxcbiAgICAgICAgb25VbmxvYWQgKCkge30sXG4gICAgICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHt9LFxuICAgICAgICBvblNoYXJlQXBwTWVzc2FnZSAob3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiB0cmFuc3BvcnRzLnZpZXcuc2hhcmVNZXNzYWdlKG9wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvbkxvYWQgPSAoaW5zdGFuY2UsIHF1ZXJ5KSA9PiB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcblxuICAgIGNvbnNvbGUubG9nKGBbVmlld10gb25Mb2FkKCR7dGhpcy5yb3V0ZX0pYCk7XG5cbiAgICBpZiAoZW52LmlzQXBwbGljYXRpb25MYXVuY2hlZCkge1xuICAgICAgdGhpcy5vbkxhdW5jaChlbnYuYXBwbGljYXRpb25MYXVuY2hlZE9wdGlvbnMpO1xuICAgIH0gIGVsc2Uge1xuICAgICAgdHJhbnNwb3J0cy5hcHAub24oJ2xhdW5jaCcsIHRoaXMub25MYXVuY2gpO1xuICAgIH1cbiAgfVxuXG4gIG9uTGF1bmNoID0gKHsgcGF0aCB9KSA9PiB7XG4gICAgdHJhbnNwb3J0cy52aWV3LmxvYWQoe1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBxdWVyeTogdGhpcy5xdWVyeSxcbiAgICAgIHJvdXRlOiB0aGlzLnJvdXRlXG4gICAgfSwgKGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuaW5zdGFuY2Uuc2V0RGF0YSh7IGVsZW1lbnQgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuIiwiXG5pbXBvcnQgUHJvZ3JhbSBmcm9tICcuL1Byb2dyYW0nO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3JztcblxuXG5cbmV4cG9ydCB7XG4gIFByb2dyYW0sXG4gIFZpZXdcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9ydW50aW1lL3Rlcm1pbmFsJztcbmV4cG9ydCAqIGZyb20gJy4vUHJvZ3JhbSc7IiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgQVBQTElDQVRJT04sIFZJRVcgfSBmcm9tICcuL3R5cGVzJztcblxuXG5jbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwb3N0ICh0eXBlLCBlKSB7XG4gICAgdGhpcy5lbWl0KHR5cGUsIGUpO1xuICB9XG5cbiAgYXBwICgpIHsgICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdW5jaDogKC4uLmFyZ3YpID0+IHtcbiAgICAgICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkxBVU5DSCwgYXJndik7XG4gICAgICB9LFxuXG4gICAgICBzaG93OiAoLi4uYXJndikgPT4ge1xuICAgICAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uU0hPVywgYXJndik7XG4gICAgICB9LFxuXG4gICAgICBoaWRlICguLi5hcmd2KSB7XG4gICAgICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5ISURFLCBhcmd2KTtcbiAgICAgIH0sXG5cbiAgICAgIGVycm9yICguLi5hcmd2KSB7XG4gICAgICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5FUlJPUiwgYXJndik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmlldyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvYWQgKC4uLmFyZ3YpIHtcbiAgICAgICAgdGhpcy5wb3N0KFZJRVcuTE9BRCwgYXJndik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxufVxuXG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbmV4cG9ydCBkZWZhdWx0IG5ldyBUcmFuc3BvcnQoKTsiLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuY2xhc3MgVHlwZSB7XG4gIGNvbnN0cnVjdG9yICh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnV1aWQgPSB1dWlkLnY0KCk7XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxuICB0b1ZhbHVlICgpIHtcbiAgICByZXR1cm4gdGhpcy51dWlkO1xuICB9XG59XG5cbmNvbnN0IHsgZ2V0T3duUHJvcGVydHlOYW1lczogZ2V0TmFtZXMgfSA9IE9iamVjdDtcbmNvbnN0IGRlZmluZU5vdGlmaWNhdGlvblR5cGVzID0gKHR5cGVzKSA9PiB7XG4gIGNvbnN0IG5hbWVzID0gZ2V0TmFtZXModHlwZXMpO1xuICBjb25zdCB0ID0ge307XG4gIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgdFtuYW1lXSA9IG5ldyBUeXBlKHR5cGVzW25hbWVdKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTiA9IGRlZmluZU5vdGlmaWNhdGlvblR5cGVzKHtcbiAgTEFVTkNIOiAnYXBwbGljYXRpb24ubGF1bmNoJyxcbiAgU0hPVzogJ2FwcGxpY2F0aW9uLnNob3cnLFxuICBISURFOiAnYXBwbGljYXRpb24uaGlkZScsXG4gIEVSUk9SOiAnYXBwbGljYXRpb24uZXJyb3InXG59KTtcblxuZXhwb3J0IGNvbnN0IFZJRVcgPSBkZWZpbmVOb3RpZmljYXRpb25UeXBlcyh7XG4gIExPQUQ6ICd2aWV3LmxvYWQnLFxufSk7IiwiaW1wb3J0IHJlbmRlciBmcm9tICcuLi8uLi9yZW5kZXJlcic7XG5pbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJy4uLy4uL2RvY3VtZW50JztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi8uLi9yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKGlkLCByb3V0ZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyb290Jyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uTG9hZCAocXVlcnksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgeyBjb21wb25lbnQsIHJlbmRlcjogciB9ID0gdGhpcy5yb3V0ZTtcblxuICAgIGNvbnN0IHJlbmRlcmVkID0gcmVuZGVyKFxuICAgICAgY3JlYXRlRWxlbWVudChcbiAgICAgICAgY29tcG9uZW50IHx8IHJcbiAgICAgICksXG4gICAgICB0aGlzLmNvbnRhaW5lclxuICAgICk7XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LmdldENvbnRhaW5lckVsZW1lbnRzKHRoaXMuY29udGFpbmVyKTtcbiAgICBjb25zb2xlLmxvZyhlbGVtZW50cyk7XG5cbiAgICAvLyBlbGVtZW50cy5vblRvdWNoU3RhcnQgPSAnb25Ub3VjaFN0YXJ0JztcbiAgICBlbGVtZW50cy5vblRhcCA9ICdvblRhcCc7XG5cblxuICAgIGNhbGxiYWNrKGVsZW1lbnRzKTtcbiAgfVxuXG4gIG9uUmVhZHkgKCkge1xuXG4gIH1cblxuIFxufSIsImltcG9ydCBWaWV3Q29udHJvbGxlciBmcm9tICcuL1ZpZXdDb250cm9sbGVyJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4uLy4uL3JlbmRlcmVyJztcbmltcG9ydCB7IGRvY3VtZW50IH0gZnJvbSAnLi4vLi4vZG9jdW1lbnQnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vcmVhY3QvY3JlYXRlRWxlbWVudCc7XG5pbXBvcnQgeyBST09UIH0gZnJvbSAnLi4vLi4vZG9jdW1lbnQvSFRNTFR5cGVzJztcbmltcG9ydCB0cmFuc3BvcnRzLCB7IFZJRVcgfSBmcm9tICcuL3RyYW5zcG9ydHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBJTlRFUk5BTF9JTlNUQU5DRV9LRVkgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG5jb25zdCBidWJibGVFdmVudCA9IFtcbiAgJ3RvdWNoc3RhcnQnLFxuICAndG91Y2htb3ZlJyxcbiAgJ3RvdWNoY2FuY2VsJyxcbiAgJ3RvdWNoZW5kJyxcbiAgJ3RhcCcsXG4gICdsb25ncHJlc3MnLFxuICAnbG9uZ3RhcCcsXG4gICd0b3VjaGZvcmNlY2hhbmdlJyxcbiAgJ3RyYW5zaXRpb25lbmQnLFxuICAnYW5pbWF0aW9uc3RhcnQnLFxuICAnYW5pbWF0aW9uaXRlcmF0aW9uJyxcbiAgJ2FuaW1hdGlvbmVuZCcsXG5dO1xuXG5jbGFzcyBFdmVudE9iamVjdCB7XG4gIGNvbnN0cnVjdG9yIChldmVudCkge1xuICAgIHRoaXMuX19vcmlnaW5hbF9ldmVudF9fID0gZXZlbnQ7XG5cbiAgICBjb25zdCB7IHR5cGUsIHRvdWNoZXMsIHRpbWVTdGFtcCwgY2hhbmdlZFRvdWNoZXMgfSA9IGV2ZW50O1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnRvdWNoZXMgPSB0b3VjaGVzO1xuICAgIHRoaXMudGltZVN0YW1wID0gdGltZVN0YW1wO1xuICAgIHRoaXMuY2hhbmdlZFRvdWNoZXMgPSBjaGFuZ2VkVG91Y2hlcztcbiAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVFdmVudC5pbmNsdWRlcyh0aGlzLnR5cGUpO1xuICAgIHRoaXMuY2FuY2VsQnViYmxlID0gZmFsc2U7XG4gIH1cblxuICBzdG9wUHJvcGFnYXRpb24gKCkge1xuICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIHByZXZlbnREZWZhdWx0ICgpIHt9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0V2ZW50TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yIChjb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIFxuICAgIHRyYW5zcG9ydHMudmlldy5vbkRpc3BhdGNoKHRoaXMub25EaXNwYXRjaCk7XG4gIH1cblxuICBjYWxsRWxlbWVudE1ldGhvZCAoZWxlbWVudCwgdHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCBmaWJlciA9IGVsZW1lbnRbSU5URVJOQUxfSU5TVEFOQ0VfS0VZXVxuXG4gICAgaWYgKGZpYmVyLnJldHVybikge1xuICAgICAgY29uc3QgeyBzdGF0ZU5vZGUgfSA9IGZpYmVyLnJldHVybjtcblxuICAgICAgaWYgKHN0YXRlTm9kZS5pc1JlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHN0YXRlTm9kZVt0eXBlXSkpIHtcbiAgICAgICAgICBzdGF0ZU5vZGVbdHlwZV0oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25EaXNwYXRjaCA9ICh0eXBlLCB1dWlkLCBlKSA9PiB7XG4gICAgY29uc3QgeyB0aW1lU3RhbXAsIHRhcmdldCB9ID0gZTtcbiAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmlkO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5maW5kRWxlbWVudChpZCk7XG5cbiAgICBpZiAodGhpcy5ldmVudHNbdGltZVN0YW1wXSkgeyAgICAgIFxuICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gUk9PVCkge1xuICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbdGltZVN0YW1wXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSAhPT0gUk9PVCkge1xuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuZXZlbnRzW3RpbWVTdGFtcF0gPSBuZXcgRXZlbnRPYmplY3QoZSk7XG4gICAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkO1xuICBcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gZWxlbWVudDtcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IGRvY3VtZW50LmZpbmRFbGVtZW50KGlkKTtcbiAgXG4gICAgICAgIGxldCBub2RlID0gZWxlbWVudDtcbiAgXG4gICAgICAgIGlmIChldmVudC5idWJibGVzKSB7XG4gICAgICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZS50YWdOYW1lICE9PSBST09UKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQgPSBub2RlO1xuICAgICAgICAgICAgdGhpcy5jYWxsRWxlbWVudE1ldGhvZChub2RlLCB0eXBlLCBldmVudCk7XG4gIFxuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FsbEVsZW1lbnRNZXRob2Qobm9kZSwgdHlwZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4vVmlld0NvbnRyb2xsZXInO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnLi4vLi4vcmVuZGVyZXInO1xuaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tICcuLi8uLi9kb2N1bWVudCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi9yZWFjdC9jcmVhdGVFbGVtZW50JztcbmltcG9ydCB0cmFuc3BvcnRzLCB7IFZJRVcgfSBmcm9tICcuL3RyYW5zcG9ydHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yIChjb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnZpZXdDb250cm9sbGVycyA9IHt9O1xuXG4gICAgdHJhbnNwb3J0cy52aWV3Lm9uTG9hZCh0aGlzLm9uTG9hZCk7XG4gICAgdHJhbnNwb3J0cy52aWV3Lm9uUmVhZHkodGhpcy5vblJlYWR5KTtcbiAgfVxuXG4gIGdldCByb3V0ZXMgKCkge1xuICAgIGlmICh0aGlzLl9fcm91dGVzX18pIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcm91dGVzX187XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVzID0gdGhpcy5fX3JvdXRlc19fID0ge307XG4gICAgY29uc3Qgcm91dGVyID0gdGhpcy5jb250ZXh0LnJvdXRlcjtcblxuICAgIHJvdXRlci5yb3V0ZXMuZm9yRWFjaChyID0+IHtcbiAgICAgIHJvdXRlc1tyLnBhdGhdID0gcjtcbiAgICB9KTtcblxuICAgIHJldHVybiByb3V0ZXM7XG4gIH1cblxuICBvblJlYWR5ID0gKCkgPT4ge1xuXG4gIH1cblxuICBvbkxvYWQgPSAoeyBpZCwgcm91dGUsIHF1ZXJ5IH0sIGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IHZpZXdDb250cm9sbGVyID0gdGhpcy52aWV3Q29udHJvbGxlcnNbaWRdO1xuICAgIFxuICAgIGlmICh2aWV3Q29udHJvbGxlcikge1xuICAgICAgdmlld0NvbnRyb2xsZXIub25Mb2FkKHF1ZXJ5LCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHIgPSB0aGlzLnJvdXRlc1tyb3V0ZV07XG4gIFxuICAgICAgaWYgKHIpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlcnNbaWRdID0gdmlld0NvbnRyb2xsZXIgPSBuZXcgVmlld0NvbnRyb2xsZXIoaWQsIHIpXG5cbiAgICAgICAgdmlld0NvbnRyb2xsZXIub25Mb2FkKHF1ZXJ5LCBjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIucmVkKGBDYW4gbm90IGZpbmQgcm91dGUhYCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbn0iLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgdHJhbnNwb3J0cyBmcm9tICcuLi90cmFuc3BvcnRzJztcbmltcG9ydCBWaWV3TWFuYWdlciBmcm9tICcuLi9WaWV3TWFuYWdlcic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2lzJztcblxuaW1wb3J0IGVudiBmcm9tICcuLi8uLi8uLi8uLi9lbnYnO1xuXG5cbmNsYXNzIExvZ2ljUnVudGltZSB7XG4gIGNvbnN0cnVjdG9yIChjb250ZXh0LCBpbnN0YW5jZSkge1xuICAgIHRoaXMuaWQgPSB1dWlkLnY0KCk7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgdGhpcy52aWV3TWFuYWdlciA9IG5ldyBWaWV3TWFuYWdlcihjb250ZXh0KTtcblxuICAgIHRyYW5zcG9ydHMuYXBwLm9uTGF1bmNoKHRoaXMub25BcHBsaWNhdGlvbkxhdW5jaCk7XG4gICAgdHJhbnNwb3J0cy5hcHAub25EaXNjb25uZWN0KHRoaXMub25BcHBsaWNhdGlvbkRpc2Nvbm5lY3RlZCk7XG4gIH1cblxuICBvbkFwcGxpY2F0aW9uRGlzY29ubmVjdGVkID0gKCkgPT4ge1xuICAgIHRvcC5wb3N0TWVzc2FnZSh7XG4gICAgICBjb2RlOiAnRElTQ09OTkVDVEVEJ1xuICAgIH0pXG4gIH1cbiAgXG4gIG9uQXBwbGljYXRpb25MYXVuY2ggPSAob3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IHRoaXMuaW5zdGFuY2U7XG4gICAgXG4gICAgaWYgKGlzRnVuY3Rpb24ocHJvcHMub25MYXVuY2gpKSB7XG4gICAgICBwcm9wcy5vbkxhdW5jaChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBydW4gKCkge1xuICAgIGNvbnN0IHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKTtcbiAgICBjb25zdCBxdWVyeSA9IHFzLnBhcnNlKHNlYXJjaCk7XG5cbiAgICB0cmFuc3BvcnRzLmFwcC5jb25uZWN0KHF1ZXJ5LmlkLCAoY29kZSkgPT4ge1xuICAgICAgaWYgKGNvZGUgPT09ICdOT19FWElTVCcpIHtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0gIFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGV4dCwgaW5zdGFuY2UpIHtcbiAgY29uc3QgbG9naWMgPSBuZXcgTG9naWNSdW50aW1lKGNvbnRleHQsIGluc3RhbmNlKTtcblxuXG4gIGxvZ2ljLnJ1bigpO1xufSAgXG5cbiIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHRyYW5zcG9ydHMsIHsgQVBJIH0gZnJvbSAnLi4vdHJhbnNwb3J0cyc7XG5pbXBvcnQgZW52IGZyb20gJy4uLy4uLy4uLy4uL2Vudic7XG5pbXBvcnQgY3JlYXRlTmF0aXZlU29ja2V0IGZyb20gJy4vTmF0aXZlU29ja2V0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF0aXZlUnVudGltZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0cmFuc3BvcnRzLmFwaS5vbihBUEkuUkVRVUVTVCwgdGhpcy5vblJlcXVlc3QpO1xuICAgIHRyYW5zcG9ydHMuYXBpLm9uKEFQSS5OQVZJR0FURV9UTywgdGhpcy5vbk5hdmlnYXRlVG8pO1xuICAgIHRyYW5zcG9ydHMuYXBpLm9uKEFQSS5OQVZJR0FURV9CQUNLLCB0aGlzLm9uTmF2aWdhdGVCYWNrKTtcbiAgICB0cmFuc3BvcnRzLmFwaS5vbihBUEkuQ09OTkVDVF9TT0NLRVQsIHRoaXMub25Db25uZWN0U29ja2V0KTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1vbkFQSVJlcXVzdCAoYXBpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB3eFthcGldKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBjb21wbGV0ZSAocmVzKSB7IGNhbGxiYWNrKHJlcykgfVxuICAgIH0pXG4gIH1cblxuICBvblJlcXVlc3QgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25BUElSZXF1c3QoJ3JlcXVlc3QnLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbk5hdmlnYXRlVG8gPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25BUElSZXF1c3QoJ25hdmlnYXRlVG8nLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbk5hdmlnYXRlQmFjayA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1vbkFQSVJlcXVzdCgnbmF2aWdhdGVCYWNrJywgb3B0aW9ucywgY2FsbGJhY2spO1xuICB9XG5cbiAgb25Db25uZWN0U29ja2V0ID0gKGlkLCBvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAgIHJldHVybiBlbnYuaXNJbnNwZWN0TW9kZSA/IFxuICAgICAgY3JlYXRlTmF0aXZlU29ja2V0KHRyYW5zcG9ydHMuYXBpLCBpZCwgb3B0aW9ucywgY2FsbGJhY2spIDogXG4gICAgICB0aGlzLmNyZWF0ZUNvbW1vbkFQSVJlcXVzdCgnY29ubmVjdFNvY2tldCcsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vdHJhbnNwb3J0cyc7XG5cbmNsYXNzIE5hdGl2ZVNvY2tldCB7XG4gIGNvbnN0cnVjdG9yICh0cmFuc3BvcnQpIHtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgfVxuXG4gIGNvbm5lY3QgKGlkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICBjb25zdCBzb2NrZXQgPSB3eC5jb25uZWN0U29ja2V0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5yZXBseSh7XG4gICAgICAgIHR5cGU6IEFQSS5TT0NLRVRfT1BFTixcbiAgICAgICAgYXJndjogW3RoaXMuaWRdXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uTWVzc2FnZSgoZGF0YSkgPT4ge1xuICAgICAgZGVidWdnZXI7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5yZXBseSh7XG4gICAgICAgIHR5cGU6IEFQSS5TT0NLRVRfTUVTU0FHRSxcbiAgICAgICAgYXJndjogW3RoaXMuaWQsIGRhdGFdLFxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNwb3J0Lm9mZihBUEkuU09DS0VUX01FU1NBR0UpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXRcblxuICAgIHRoaXMudHJhbnNwb3J0Lm9uKEFQSS5TT0NLRVRfTUVTU0FHRSwgdGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgb25NZXNzYWdlID0gKGlkLCBtZXNzYWdlKSA9PiB7XG4gICAgaWYgKGlkID09PSB0aGlzLmlkKSB7XG4gICAgICB0aGlzLnNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVOYXRpdmVTb2NrZXQgKHRyYW5zcG9ydCwgaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHNvY2tldCA9IG5ldyBOYXRpdmVTb2NrZXQodHJhbnNwb3J0KTtcblxuICByZXR1cm4gc29ja2V0LmNvbm5lY3QoaWQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbn0iLCJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB0cmFuc3BvcnRzIGZyb20gJy4uL3RyYW5zcG9ydHMnO1xuaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gJy4uL1ZpZXdNYW5hZ2VyJztcbmltcG9ydCBWaWV3RXZlbnRNYW5hZ2VyIGZyb20gJy4uL1ZpZXdFdmVudE1hbmdlcic7XG5pbXBvcnQgTmF0aXZlUnVudGltZSBmcm9tICcuL05hdGl2ZVJ1bnRpbWUnO1xuaW1wb3J0IGVudiBmcm9tICcuLi8uLi8uLi8uLi9lbnYnO1xuXG5cbmNsYXNzIFRlcm1pbmFsUnVudGltZSBleHRlbmRzIE5hdGl2ZVJ1bnRpbWUge1xuICBjb25zdHJ1Y3RvciAoY29udGV4dCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMub3B0aW9ucyA9IG51bGw7XG4gIH1cblxuICBpbnNwZWN0IChjYWxsYmFjaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cmFuc3BvcnRzLmFwcC5pbnNwZWN0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRyYW5zcG9ydHMuYXBwLm9uKCdyZUxhdW5jaCcsICgpID0+IHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogYC8ke3RoaXMub3B0aW9ucy5wYXRofWBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJhbnNwb3J0cy5hcHAub24oJ3JlQ29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICB3eC5zaG93VGFiQmFyKCk7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB0cmFuc3BvcnRzLmFwcC5lbWl0KCdsYXVuY2gnLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHd4LmhpZGVUYWJCYXIoKTtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiBg562J5b6F6L+e5o6lLi4uYFxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBydW4gKCkge1xuICAgIGNvbnN0IGxhdW5jaEFwcGxpY2F0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgY3RybCA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgQXBwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHd4LnNob3dUYWJCYXIoKTtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICBBcHAoe1xuICAgICAgICAgIG9uTGF1bmNoIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRzLmFwcC5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgICAgICB0cmFuc3BvcnRzLmFwcC5lbWl0KCdsYXVuY2gnLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgY3RybC5vcHRpb25zID0gb3B0aW9uc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnYuaXNBcHBsaWNhdGlvbkxhdW5jaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVudi5hcHBsaWNhdGlvbkxhdW5jaGVkT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcbiAgICAgICAgICBvbkVycm9yIChlKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRzLmFwcC5lcnJvcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbnYuaXNJbnNwZWN0TW9kZSkge1xuXG4gICAgICB3eC5oaWRlVGFiQmFyKCk7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiBg562J5b6F6L+e5o6lLi4uYFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaW5zcGVjdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBsYXVuY2hBcHBsaWNhdGlvbigpO1xuICAgICAgfSkuY2F0Y2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF1bmNoQXBwbGljYXRpb24oKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIHRyYW5zcG9ydHNcbn1cbmV4cG9ydCAqIGZyb20gJ3JlbWl4anMtbWVzc2FnZS1wcm90b2NvbCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGV4dCkge1xuICBjb25zdCBydW50aW1lID0gIG5ldyBUZXJtaW5hbFJ1bnRpbWUoY29udGV4dCk7XG4gIGNvbnN0IHZpZXdNYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKGNvbnRleHQpO1xuICBjb25zdCB2aWV3RXZlbnRNYW5hZ2VyID0gbmV3IFZpZXdFdmVudE1hbmFnZXIoY29udGV4dCk7XG5cbiAgcnVudGltZS5ydW4oKTtcbn07IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuaW1wb3J0IGNyZWF0ZUxvZ2ljU29ja2V0IGZyb20gJy4vQ2xhc3Nlcy9Mb2dpY1NvY2tldCc7XG5cbmNvbnN0IGlzU3VjY2VzcyA9IChkYXRhKSA9PiB7XG4gIGlmICgvKFxcdykrXFw6b2svZy50ZXN0KGRhdGEuZXJyTXNnKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSVRyYW5zcG9ydCBleHRlbmRzIFR1bm5lbCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vbihBUEksIHRoaXMub25NZXNzYWdlKTtcbiAgfVxuXG4gIHBvc3QgPSAodHlwZSwgYXJndiwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBjYWxsYmFja0lkID0gaXNGdW5jdGlvbihjYWxsYmFjaykgPyB1dWlkLnY0KCkgOiBudWxsXG5cbiAgICBpZiAoY2FsbGJhY2tJZCkge1xuICAgICAgdGhpcy5vbmNlKGNhbGxiYWNrSWQsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhBUEkpLFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlLFxuICAgICAgICBhcmd2LFxuICAgICAgICBjYWxsYmFja0lkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQSSksXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUNvbW1vblByb21pc2UgKGFwaSwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnBvc3QoYXBpLCBbb3B0aW9uc10sIChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChpc1N1Y2Nlc3MoZGF0YSkpIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY29tcGxldGUpKSB7XG4gICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHJlcXVlc3QgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5SRVFVRVNULCBvcHRpb25zKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG8gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5OQVZJR0FURV9UTywgb3B0aW9ucyk7XG4gIH1cblxuICBuYXZpZ2F0ZUJhY2sgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb21tb25Qcm9taXNlKEFQSS5OQVZJR0FURV9CQUNLLCBvcHRpb25zKTtcbiAgfVxuXG4gIGNvbm5lY3RTb2NrZXQgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IGNyZWF0ZUxvZ2ljU29ja2V0KHRoaXMsIG9wdGlvbnMpO1xuICB9XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5jb25zdCBpc1N1Y2Nlc3MgPSAoZGF0YSkgPT4ge1xuICBpZiAoLyhcXHcpK1xcOm9rL2cudGVzdChkYXRhLmVyck1zZykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElUcmFuc3BvcnQgZXh0ZW5kcyBUdW5uZWwge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHBvc3QgPSAodHlwZSwgYXJndiwgY2FsbGJhY2spID0+IHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhBUEkpLFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlLFxuICAgICAgICBhcmd2LFxuICAgICAgICBjYWxsYmFja1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVwbHkgKGJvZHkpIHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhBUEkpLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVDb21tb25Qcm9taXNlIChhcGksIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5wb3N0KGFwaSwgW29wdGlvbnNdLCAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoaXNTdWNjZXNzKGRhdGEpKSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNvbXBsZXRlKSkge1xuICAgICAgICAgIG9wdGlvbnMuY29tcGxldGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICByZXF1ZXN0IChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbW9uUHJvbWlzZShBUEkuUkVRVUVTVCwgb3B0aW9ucyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbW9uUHJvbWlzZShBUEkuTkFWSUdBVEVfVE8sIG9wdGlvbnMpO1xuICB9XG5cbiAgbmF2aWdhdGVCYWNrIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbW9uUHJvbWlzZShBUEkuTkFWSUdBVEVfQkFDSywgb3B0aW9ucyk7XG4gIH1cblxuICBjb25uZWN0U29ja2V0IChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbW9uUHJvbWlzZShBUEkuQ09OTkVDVF9TT0NLRVQsIG9wdGlvbnMsICgpID0+IHt9KTtcbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IFR1bm5lbCBmcm9tICcuLi90dW5uZWwnO1xuaW1wb3J0IHsgQVBQTElDQVRJT04gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvblRyYW5zcG9ydCBleHRlbmRzIFR1bm5lbCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5vbihBUFBMSUNBVElPTiwgdGhpcy5vbk1lc3NhZ2UpO1xuICB9XG5cbiAgb25EaXNjb25uZWN0IChjYWxsYmFjaykge1xuICAgIHRoaXMub24oJ2Rpc2Nvbm5lY3QnLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkxhdW5jaCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKEFQUExJQ0FUSU9OLkxBVU5DSCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcG9zdCA9ICh0eXBlLCBhcmd2LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSA/IHV1aWQudjQoKSA6IG51bGxcblxuICAgIGlmIChjYWxsYmFja0lkKSB7XG4gICAgICB0aGlzLm9uY2UoY2FsbGJhY2tJZCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQUExJQ0FUSU9OKSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXJndixcbiAgICAgICAgY2FsbGJhY2tJZFxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVwbHkgKGJvZHkpIHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhBUFBMSUNBVElPTiksXG4gICAgICBib2R5XG4gICAgfSlcbiAgfVxuXG4gIGNvbm5lY3QgKGlkLCBjYWxsYmFjaykge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5DT05ORUNULCBbaWRdLCBjYWxsYmFjayk7XG4gIH1cblxuICBpbnNwZWN0IChjYWxsYmFjaykge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5JTlNQRUNULCBbXSwgY2FsbGJhY2spO1xuICB9XG5cbiAgbGF1bmNoIChvcHRpb25zKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkxBVU5DSCwgW29wdGlvbnNdKTtcbiAgfVxuXG4gIHNob3cgKCkge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5TSE9XLCBbXSk7XG4gIH1cblxuICBoaWRlICgpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uSElERSwgW10pO1xuICB9XG5cbiAgZXJyb3IgKGVycm9yKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkVSUk9SLCBbZXJyb3JdKTtcbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IFR1bm5lbCBmcm9tICcuLi90dW5uZWwnO1xuaW1wb3J0IHsgQVBQTElDQVRJT04gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvblRyYW5zcG9ydCBleHRlbmRzIFR1bm5lbCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgb25MYXVuY2ggKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihBUFBMSUNBVElPTi5MQVVOQ0gsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHBvc3QgPSAodHlwZSwgYXJndiwgY2FsbGJhY2spID0+IHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhBUFBMSUNBVElPTiksXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFyZ3YsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKEFQUExJQ0FUSU9OKSxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgbGF1bmNoIChvcHRpb25zKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkxBVU5DSCwgW29wdGlvbnNdKTtcbiAgfVxuXG4gIHNob3cgKCkge1xuICAgIHRoaXMucG9zdChBUFBMSUNBVElPTi5TSE9XLCBbXSk7XG4gIH1cblxuICBoaWRlICgpIHtcbiAgICB0aGlzLnBvc3QoQVBQTElDQVRJT04uSElERSwgW10pO1xuICB9XG5cbiAgZXJyb3IgKGVycm9yKSB7XG4gICAgdGhpcy5wb3N0KEFQUExJQ0FUSU9OLkVSUk9SLCBbZXJyb3JdKTtcbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jbGFzcyBMb2dpY1NvY2tldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yICh0cmFuc3BvcnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pZCA9IHV1aWQudjQoKTtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgfVxuIFxuICBjb25uZWN0IChvcHRpb25zKSB7XG4gICAgdGhpcy50cmFuc3BvcnQucG9zdChcbiAgICAgIEFQSS5DT05ORUNUX1NPQ0tFVCwgXG4gICAgICBbdGhpcy5pZCwgb3B0aW9uc10sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnRyYW5zcG9ydC5vbihBUEkuU09DS0VUX09QRU4sIHRoaXMub25Tb2NrZXRPcGVuKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5vbihBUEkuU09DS0VUX01FU1NBR0UsIHRoaXMub25Tb2NrZXRNZXNzYWdlKTtcbiAgfVxuXG4gIG9uU29ja2V0T3BlbiA9IChpZCkgPT4ge1xuICAgIGlmICh0aGlzLmlkID09PSBpZCkge1xuICAgICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gICAgfVxuICB9XG5cbiAgb25Tb2NrZXRNZXNzYWdlID0gKGlkLCBkYXRhKSA9PiB7XG4gICAgaWYgKGlkID09PSB0aGlzLmlkKSB7XG4gICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICBvbk9wZW4gKG9uT3Blbikge1xuICAgIHRoaXMub24oJ29wZW4nLCBvbk9wZW4pO1xuICB9XG5cbiAgb25NZXNzYWdlIChvbk1lc3NhZ2UpIHtcbiAgICB0aGlzLm9uKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgfVxuXG4gIHNlbmQgKGRhdGEpIHtcbiAgICB0aGlzLnRyYW5zcG9ydC5yZXBseSh7XG4gICAgICB0eXBlOiBBUEkuU09DS0VUX01FU1NBR0UsXG4gICAgICBhcmd2OiBbdGhpcy5pZCwgZGF0YV1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVMb2dpY1NvY2tldCAodHJhbnNwb3J0LCBvcHRpb25zKSB7XG4gIGNvbnN0IHNvY2tldCA9IG5ldyBMb2dpY1NvY2tldCh0cmFuc3BvcnQpO1xuXG4gIHNvY2tldC5jb25uZWN0KG9wdGlvbnMpO1xuXG4gIHJldHVybiBzb2NrZXQ7XG59IiwiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgVHVubmVsIGZyb20gJy4uL3R1bm5lbCc7XG5pbXBvcnQgeyBWSUVXIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2lzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbnRyb2xsZXJUcmFuc3BvcnQgIGV4dGVuZHMgVHVubmVsIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9uKFZJRVcsIHRoaXMub25NZXNzYWdlKTtcbiAgfVxuXG4gIGRpc3BhdGNoICgpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgfVxuXG4gIHBvc3QgPSAodHlwZSwgYXJndiwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBjYWxsYmFja0lkID0gaXNGdW5jdGlvbihjYWxsYmFjaykgPyB1dWlkLnY0KCkgOiBudWxsXG5cbiAgICBpZiAoY2FsbGJhY2tJZCkge1xuICAgICAgdGhpcy5vbmNlKGNhbGxiYWNrSWQsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhWSUVXKSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXJndixcbiAgICAgICAgY2FsbGJhY2tJZFxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVwbHkgKGJvZHkpIHtcbiAgICBzdXBlci5wb3N0KHtcbiAgICAgIHR5cGU6IFN0cmluZyhWSUVXKSxcbiAgICAgIGJvZHlcbiAgICB9KVxuICB9XG5cbiAgbG9hZCAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnBvc3QoVklFVy5MT0FELCBbZGF0YV0sIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uTG9hZCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKFZJRVcuTE9BRCwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25SZWFkeSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKFZJRVcuUkVBRFksIGNhbGxiYWNrKTtcbiAgfVxufSIsImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IFR1bm5lbCBmcm9tICcuLi90dW5uZWwnO1xuaW1wb3J0IHsgVklFVyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJy4uLy4uLy4uL2RvY3VtZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlclRyYW5zcG9ydE5hdGl2ZSAgZXh0ZW5kcyBUdW5uZWwge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGRpc3BhdGNoICh0eXBlLCBpZCwgZSkge1xuICAgIGNvbnNvbGUubG9nKHR5cGUsIGUpXG5cbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMucG9zdChWSUVXLkVWRU5ULCBbdHlwZSwgaWQsIGVdKTtcbiAgICB9XG4gIH1cblxuICBjYWxsTGlmZWN5Y2xlICh0eXBlLCBpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5wb3N0KFZJRVcuTElGRUNZQ0xFLCBbdHlwZSwgaWRdKTtcbiAgICB9XG4gIH1cblxuICBwb3N0ID0gKHR5cGUsIGFyZ3YsIGNhbGxiYWNrKSA9PiB7XG4gICAgc3VwZXIucG9zdCh7XG4gICAgICB0eXBlOiBTdHJpbmcoVklFVyksXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGFyZ3YsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXBseSAoYm9keSkge1xuICAgIHN1cGVyLnBvc3Qoe1xuICAgICAgdHlwZTogU3RyaW5nKFZJRVcpLFxuICAgICAgYm9keVxuICAgIH0pXG4gIH1cblxuICBsb2FkIChkYXRhLCBjYWxsYmFjaykge1xuICAgIHRoaXMucG9zdChWSUVXLkxPQUQsIFtkYXRhXSwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2hhcmVNZXNzYWdlIChvcHRpb25zKSB7XG4gICAgdGhpcy5wb3N0KFZJRVcuTE9BRCwgW29wdGlvbnNdKTtcbiAgfVxuXG4gIG9uU2hhcmVNZXNzYWdlIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oVklFVy5TSEFSRV9NRVNTQUdFLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkxvYWQgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihWSUVXLkxPQUQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uUmVhZHkgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihWSUVXLlJFQURZLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkRpc3BhdGNoIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oVklFVy5FVkVOVCwgY2FsbGJhY2spO1xuICB9XG5cbn0iLCJpbXBvcnQgQXBwbGljYXRpb25UcmFuc3BvcnQgZnJvbSAnLi9BcHBsaWNhdGlvblRyYW5zcG9ydCc7XG5pbXBvcnQgVmlld0NvbnRyb2xsZXJUcmFuc3BvcnQgZnJvbSAnLi9WaWV3Q29udHJvbGxlclRyYW5zcG9ydCc7XG5pbXBvcnQgQVBJVHJhbnNwb3J0IGZyb20gJy4vQVBJVHJhbnNwb3J0JztcbmltcG9ydCBBcHBsaWNhdGlvblRyYW5zcG9ydE5hdGl2ZSBmcm9tICcuL0FwcGxpY2F0aW9uVHJhbnNwb3J0TmF0aXZlJztcbmltcG9ydCBWaWV3Q29udHJvbGxlclRyYW5zcG9ydE5hdGl2ZSBmcm9tICcuL1ZpZXdDb250cm9sbGVyVHJhbnNwb3J0TmF0aXZlJztcbmltcG9ydCBBUElUcmFuc3BvcnROYXRpdmUgZnJvbSAnLi9BUElUcmFuc3BvcnROYXRpdmUnO1xuaW1wb3J0IGVudiBmcm9tICcuLi8uLi8uLi8uLi9lbnYnO1xuXG5cbmNvbnN0IHsgaXNJbnNwZWN0TW9kZSB9ID0gZW52O1xuY29uc3QgdHJhbnNwb3J0cyA9IHt9O1xuXG5jb25zdCBjcmVhdGVBcHBsaWNhdGlvblRyYW5zcG9ydCA9ICgpID0+IHtcbiAgcmV0dXJuIHRyYW5zcG9ydHMuYXBwID0gdHJhbnNwb3J0cy5hcHAgfHwgXG4gICAgKCFpc0luc3BlY3RNb2RlID8gbmV3IEFwcGxpY2F0aW9uVHJhbnNwb3J0TmF0aXZlKCkgOiBuZXcgQXBwbGljYXRpb25UcmFuc3BvcnQoKSk7XG59XG5cbmNvbnN0IGNyZWF0ZVZpZXdDb250cm9sbGVyVHJhbnNwb3J0ID0gKCkgPT4ge1xuICByZXR1cm4gdHJhbnNwb3J0cy52aWV3ID0gdHJhbnNwb3J0cy52aWV3IHx8IFxuICAgICghaXNJbnNwZWN0TW9kZSA/IG5ldyBWaWV3Q29udHJvbGxlclRyYW5zcG9ydE5hdGl2ZSgpIDogbmV3IFZpZXdDb250cm9sbGVyVHJhbnNwb3J0KCkpO1xufVxuXG5jb25zdCBjcmVhdGVBUElUcmFuc3BvcnQgPSAoKSA9PiB7XG4gIHJldHVybiB0cmFuc3BvcnRzLmFwaSA9IHRyYW5zcG9ydHMuYXBpIHx8IFxuICAgICghaXNJbnNwZWN0TW9kZSA/IG5ldyBBUElUcmFuc3BvcnROYXRpdmUoKSA6IG5ldyBBUElUcmFuc3BvcnQoKSk7XG59XG5cblxuXG5cbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGRlZmF1bHQge1xuICBnZXQgYXBwICgpIHtcbiAgICBpZiAodHJhbnNwb3J0cy5hcHApIHtcbiAgICAgIHJldHVybiB0cmFuc3BvcnRzLmFwcDtcbiAgICB9XG5cbiAgICB0cmFuc3BvcnRzLnZpZXcgPSBjcmVhdGVWaWV3Q29udHJvbGxlclRyYW5zcG9ydCgpO1xuXG4gICAgcmV0dXJuIHRyYW5zcG9ydHMuYXBwID0gY3JlYXRlQXBwbGljYXRpb25UcmFuc3BvcnQoKVxuICB9LFxuXG4gIGdldCB2aWV3ICgpIHtcbiAgICBpZiAodHJhbnNwb3J0cy52aWV3KSB7XG4gICAgICByZXR1cm4gdHJhbnNwb3J0cy52aWV3O1xuICAgIH1cblxuICAgIHRyYW5zcG9ydHMuYXBwID0gY3JlYXRlQXBwbGljYXRpb25UcmFuc3BvcnQoKTtcblxuICAgIHJldHVybiB0cmFuc3BvcnRzLnZpZXcgPSBjcmVhdGVWaWV3Q29udHJvbGxlclRyYW5zcG9ydCgpXG4gIH0sXG5cbiAgZ2V0IGFwaSAoKSB7XG4gICAgaWYgKHRyYW5zcG9ydHMuYXBpKSB7XG4gICAgICByZXR1cm4gdHJhbnNwb3J0cy5hcGk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zcG9ydHMuYXBpID0gY3JlYXRlQVBJVHJhbnNwb3J0KClcbiAgfVxufSIsImV4cG9ydCAqIGZyb20gJ3JlbWl4anMtbWVzc2FnZS1wcm90b2NvbCc7IiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2lzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIG9uTWVzc2FnZSA9ICh7IHR5cGUsIGFyZ3YsIGNhbGxiYWNrIH0pID0+IHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIGFyZ3YucHVzaChjYWxsYmFjayk7XG4gICAgICB9XG4gIFxuICAgICAgdGhpcy5lbWl0KHR5cGUsIC4uLmFyZ3YpO1xuICAgIH1cbiAgfVxuXG4gIHBvc3QgKHBvc3QpIHtcbiAgICBjb25zdCB7IHR5cGUsIGJvZHkgfSA9IHBvc3Q7XG4gICAgdGhpcy5vbk1lc3NhZ2UoYm9keSk7XG4gIH1cbn07IiwiaW1wb3J0IGVudiBmcm9tICcuLi8uLi8uLi8uLi9lbnYnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9ucykge1xuICBjb25zdCBTb2NrZXQgPSBlbnYuaXNEZXZUb29sUnVudGltZSA/XG4gICAgY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IgKHVybCwgcHJvdG9jb2xzKSB7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwsIHByb3RvY29scyk7XG4gICAgICB9XG5cbiAgICAgIG9uTWVzc2FnZSA9IChvbk1lc3NhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gb25NZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICBvbk9wZW4gPSAob25PcGVuKSA9PiB7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9IG9uT3BlbjtcbiAgICAgIH1cblxuICAgICAgb25DbG9zZSA9IChvbkNsb3NlKSA9PiB7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSBvbkNsb3NlO1xuICAgICAgfVxuXG4gICAgICBvbkVycm9yID0gKG9uRXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXQub25lcnJvciA9IG9uRXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHNlbmQgKHsgZGF0YSB9KSB7XG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICB9XG4gICAgfSA6IGZ1bmN0aW9uICh1cmwsIHByb3RvY29scykge1xuICAgICAgcmV0dXJuIHd4LmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICB1cmwsIFxuICAgICAgICBwcm90b2NvbHM6IFtwcm90b2NvbHNdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgY29uc3QgeyB1cmwsIHByb3RvY29scyB9ID0gb3B0aW9ucztcblxuICByZXR1cm4gbmV3IFNvY2tldCh1cmwsIHByb3RvY29scy5qb2luKCcrJykpO1xufSIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gJ3JlbWl4anMtbWVzc2FnZS1wcm90b2NvbCc7XG5pbXBvcnQgU29ja2V0IGZyb20gJy4vU29ja2V0JztcbmltcG9ydCBlbnYgZnJvbSAnLi4vLi4vLi4vLi4vZW52JztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaXMnO1xuXG5cbmNsYXNzIE1lc3NhZ2VFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCB7IGlzRGV2VG9vbFJ1bnRpbWUgfSA9IGVudjtcblxuICAgIHRoaXMuaWQgPSBpc0RldlRvb2xSdW50aW1lID8gZW52Lmluc3BlY3RMb2dpY1VVSUQgOiBlbnYuaW5zcGVjdFRlcm1pbmFsVVVJRDtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMucXVldWUgPSBbXTtcblxuICAgIHRoaXMuc29ja2V0ID0gbmV3IFNvY2tldCh7XG4gICAgICB1cmw6IGVudi5pbnNwZWN0V1NVUkwsXG4gICAgICBwcm90b2NvbHM6IFtcbiAgICAgICAgdGhpcy5pZCwgXG4gICAgICAgIGVudi5pbnNwZWN0VGVybWluYWxUeXBlc1tlbnYuaXNEZXZUb29sUnVudGltZSA/ICdMT0dJQycgOiAnVklFVyddXG4gICAgICBdXG4gICAgfSk7XG5cbiAgICB0aGlzLnNvY2tldC5vbk1lc3NhZ2UoKHsgZGF0YSB9KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UoanNvbik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQub25PcGVuKHRoaXMub25PcGVuKTtcbiAgICB0aGlzLnNvY2tldC5vbkNsb3NlKHRoaXMub25DbG9zZSk7XG4gICAgdGhpcy5zb2NrZXQub25FcnJvcih0aGlzLm9uRXJyb3IpO1xuICB9XG5cbiAgcG9zdCA9IChwb3N0KSA9PiB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICB0aGlzLnNvY2tldC5zZW5kKHtcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHBvc3RcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChwb3N0KTtcbiAgICB9XG4gIH1cblxuICBvbkVycm9yID0gKHsgZXJyTXNnIH0pID0+IHtcbiAgICBpZiAoZXJyTXNnID09PSAndXJsIG5vdCBpbiBkb21haW4gbGlzdCcpIHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogJ+ivt+WOu+aOieWfn+WQjeagoemqjO+8jOWQpuWImeaXoOazleiwg+ivleecn+acuicsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICB9KSBcbiAgICB9XG4gIH1cblxuICBvbk9wZW4gPSAoKSA9PiB7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICB3aGlsZSAobWVzc2FnZSA9IHRoaXMucXVldWUuc2hpZnQoKSkge1xuICAgICAgICB0aGlzLnBvc3QobWVzc2FnZSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIG9uTWVzc2FnZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRUdW5uZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaWQgPSB1dWlkLnY0KCk7XG4gICAgdGhpcy5lbWl0dGVyID0gU29ja2V0VHVubmVsLmVtaXR0ZXIgfHwgKFNvY2tldFR1bm5lbC5lbWl0dGVyID0gbmV3IE1lc3NhZ2VFbWl0dGVyKCkpO1xuXG4gICAgdGhpcy5lbWl0dGVyLm9uKCdtZXNzYWdlJywgKHsgcG9zdCB9KSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUsIGJvZHkgfSA9IHBvc3Q7XG4gICAgICB0aGlzLmVtaXQodHlwZSwgYm9keSk7XG4gICAgfSk7XG4gIH1cblxuICBvbk1lc3NhZ2UgPSAoeyB0eXBlLCBhcmd2LCBjYWxsYmFja0lkIH0pID0+IHtcbiAgICBpZiAoY2FsbGJhY2tJZCkge1xuICAgICAgaWYgKHRoaXMuZXZlbnROYW1lcygpLmluY2x1ZGVzKGNhbGxiYWNrSWQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXQoY2FsbGJhY2tJZCwgLi4uYXJndik7XG4gICAgICB9XG4gICAgfSBcblxuICAgIGlmICh0eXBlKSB7XG4gICAgICBjb25zdCB0ID0gbmV3IFR5cGUodHlwZS50eXBlLCB0eXBlLnZhbHVlKTtcbiAgXG4gICAgICBpZiAoY2FsbGJhY2tJZCkge1xuICAgICAgICBhcmd2LnB1c2goKC4uLmFyZ3YpID0+IHtcbiAgICAgICAgICB0aGlzLnJlcGx5KHtcbiAgICAgICAgICAgIGFyZ3YsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgY2FsbGJhY2tJZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfVxuICBcbiAgICAgIHRoaXMuZW1pdCh0LCAuLi5hcmd2KTtcbiAgICB9XG4gIH1cblxuICBwb3N0IChkYXRhKSB7XG4gICAgdGhpcy5lbWl0dGVyLnBvc3QoZGF0YSk7XG4gIH1cbn0iLCJpbXBvcnQgTmF0aXZlVHVubmVsIGZyb20gJy4vTmF0aXZlVHVubmVsJztcbmltcG9ydCBTb2NrZXRUdW5uZWwgZnJvbSAnLi9Tb2NrZXRUdW5uZWwnO1xuXG5jb25zdCBUdW5uZWwgPSBwcm9jZXNzLmVudi5JU19JTlNQRUNUX01PREUgPyBTb2NrZXRUdW5uZWwgOiBOYXRpdmVUdW5uZWw7XG5cbmV4cG9ydCBkZWZhdWx0IFR1bm5lbDtcblxuIiwiaW1wb3J0IHsgaXNBcnJheSwgaXNOdWxsT3JVbmRlZmluZWQsIGlzSW52YWxpZCB9IGZyb20gJy4uL3NoYXJlZC9pcyc7XG5pbXBvcnQgeyBFTVBUWV9BUlJBWSwgZmxhdHRlbiB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXAgKFxuICBjaGlsZHJlbiwgXG4gIGl0ZXJhdGUsIFxuICBjb250ZXh0XG4pIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGNoaWxkcmVuKSkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIGNoaWxkcmVuID0gdG9BcnJheShjaGlsZHJlbik7XG4gIGlmIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGNoaWxkcmVuKSB7XG4gICAgaXRlcmF0ZSA9IGl0ZXJhdGUuYmluZChjb250ZXh0KTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlbi5tYXAoaXRlcmF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoIChcbiAgY2hpbGRyZW4sIFxuICBpdGVyYXRlLCBcbiAgY29udGV4dFxuKSB7XG4gIGlmICghaXNOdWxsT3JVbmRlZmluZWQoY2hpbGRyZW4pKSB7XG4gICAgY2hpbGRyZW4gPSB0b0FycmF5KGNoaWxkcmVuKTtcbiAgICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY2hpbGRyZW4pIHtcbiAgICAgICAgaXRlcmF0ZSA9IGl0ZXJhdGUuYmluZChjb250ZXh0KTtcbiAgICAgIH1cbiAgXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gaXNJbnZhbGlkKGNoaWxkcmVuW2ldKSA/IG51bGwgOiBjaGlsZHJlbltpXTtcbiAgXG4gICAgICAgIGl0ZXJhdGUoY2hpbGQsIGksIGNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50IChcbiAgY2hpbGRyZW5cbikge1xuICBjaGlsZHJlbiA9IHRvQXJyYXkoY2hpbGRyZW4pO1xuICByZXR1cm4gY2hpbGRyZW4ubGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25seSAoXG4gIGNoaWxkcmVuXG4pIHtcbiAgY2hpbGRyZW4gPSB0b0FycmF5KGNoaWxkcmVuKTtcblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDaGlsZHJlbi5vbmx5KCkgZXhwZWN0cyBvbmx5IG9uZSBjaGlsZC4nKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlblswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkgKFxuICBjaGlsZHJlblxuKSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChjaGlsZHJlbikpIHtcbiAgICByZXR1cm4gRU1QVFlfQVJSQVk7XG4gIH1cblxuICBpZiAoaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICByZXR1cm4gZmxhdHRlbihjaGlsZHJlbik7XG4gIH1cblxuICByZXR1cm4gRU1QVFlfQVJSQVkuY29uY2F0KGNoaWxkcmVuKTtcbn1cbiIsImltcG9ydCB7XG4gIGlzRnVuY3Rpb24sIFxufSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuaW1wb3J0IHsgICBcbiAgZXh0ZW5kLCBcbiAgY2xvbmUsIFxuICBub29wLFxuICBFTVBUWV9PQkpFQ1QgXG59IGZyb20gJy4uL3NoYXJlZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge307XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCBFTVBUWV9PQkpFQ1Q7XG4gICAgdGhpcy5yZWZzID0ge307XG4gICAgdGhpcy51cGRhdGVyID0gdXBkYXRlcjtcbiAgfVxuXG4gIHNldFN0YXRlIChzdGF0ZSwgY2FsbGJhY2sgPSBub29wKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBzdGF0ZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgZm9yY2VVcGRhdGUgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaylcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZWFjdCBDb21wb25lbnQgcmVuZGVyIG11c3QgYmUgaW1wbGF0YXRlYCk7XG4gIH1cbn1cblxuXG5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSBFTVBUWV9PQkpFQ1Q7IiwiY29uc3Qgc2hpbSA9ICgpID0+IHNoaW07XG5cbnNoaW0uaXNSZXF1aXJlZCA9IHNoaW07XG5cbmNvbnN0IFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IHNoaW0sXG4gIGJvb2w6IHNoaW0sXG4gIGZ1bmM6IHNoaW0sXG4gIG51bWJlcjogc2hpbSxcbiAgb2JqZWN0OiBzaGltLFxuICBzdHJpbmc6IHNoaW0sXG4gIGFueTogc2hpbSxcbiAgYXJyYXlPZjogc2hpbSxcbiAgZWxlbWVudDogc2hpbSxcbiAgaW5zdGFuY2VPZjogc2hpbSxcbiAgbm9kZTogc2hpbSxcbiAgb2JqZWN0T2Y6IHNoaW0sXG4gIG9uZU9mOiBzaGltLFxuICBvbmVPZlR5cGU6IHNoaW0sXG4gIHNoYXBlOiBzaGltLFxuICBleGFjdDogc2hpbSxcbiAgUHJvcFR5cGVzOiB7fSxcbiAgY2hlY2tQcm9wVHlwZXM6IHNoaW1cbn07XG5Qcm9wVHlwZXMuUHJvcFR5cGVzID0gUHJvcFR5cGVzO1xuXG5leHBvcnQgeyBQcm9wVHlwZXMgfTtcbmV4cG9ydCBkZWZhdWx0IFByb3BUeXBlczsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCB7IHNoYWxsb3dFcXVhbCB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmNsYXNzIFB1cmVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBpc1B1cmVDb21wb25lbnQgPSB0cnVlO1xuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFzaGFsbG93RXF1YWwodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdXJlQ29tcG9uZW50O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBjdXJyZW50OiBudWxsLFxuICBjdXJyZW50RGlzcGF0Y2hlcjogbnVsbFxufSIsImltcG9ydCB7IFJFQUNUX0VMRU1FTlRfVFlQRSB9IGZyb20gJy4uL3NoYXJlZC9lbGVtZW50VHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZWFjdEVsZW1lbnQgKFxuICB0eXBlLCBcbiAgcHJvcHMgPSB7fSwgXG4gIGtleSA9IG51bGwsXG4gIHJlZiA9IG51bGwsXG4gIG93bmVyID0gbnVsbFxuKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICB0eXBlLFxuICAgIGtleSxcbiAgICByZWYsXG4gICAgcHJvcHMsXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG4iLCJpbXBvcnQgUmVhY3RFbGVtZW50IGZyb20gJy4vUmVhY3RFbGVtZW50JztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZUVsZW1lbnQgKGVsZW1lbnQsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoXG4gICAgZWxlbWVudC50eXBlLCBcbiAgICBrZXksIFxuICAgIHJlZiwgXG4gICAgc2VsZiwgXG4gICAgc291cmNlLCBcbiAgICBvd25lciwgXG4gICAgcHJvcHNcbiAgKTtcbn0iLCJpbXBvcnQgUmVhY3RFbGVtZW50IGZyb20gJy4vUmVhY3RFbGVtZW50JztcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzVW5kZWZpbmVkLCBpc0FycmF5IH0gZnJvbSAnLi4vc2hhcmVkL2lzJztcbmltcG9ydCB7IHJlc29sdmVEZWZhdWx0UHJvcHMgfSBmcm9tICcuLi9zaGFyZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcbiAgdHlwZSwgXG4gIHByb3BzID0ge30sIFxuICAuLi5jaGlsZHJlblxuKSB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBjaGlsZHJlbjtcblxuICBpZiAoaXNGdW5jdGlvbih0eXBlKSkge1xuICAgIHByb3BzID0gcmVzb2x2ZURlZmF1bHRQcm9wcyh0eXBlLCBwcm9wcyk7XG4gIH0gXG5cbiAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcblxuICBpZiAobGVuZ3RoID4gMCkge1xuICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW5bMF07XG5cbiAgICAgIGlmIChpc0FycmF5KHByb3BzLmNoaWxkcmVuKSkge1xuICAgICAgICBpZiAocHJvcHMuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlblswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cbiAgfSBcblxuICByZXR1cm4gUmVhY3RFbGVtZW50KFxuICAgIHR5cGUsIFxuICAgIHsgLi4ucHJvcHMgfVxuICApO1xufSIsImltcG9ydCAqIGFzIENoaWxkcmVuIGZyb20gJy4vQ2hpbGRyZW4nO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tICcuL1B1cmVDb21wb25lbnQnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9jcmVhdGVFbGVtZW50JztcbmltcG9ydCBjbG9uZUVsZW1lbnQgZnJvbSAnLi9jbG9uZUVsZW1lbnQnO1xuXG5pbXBvcnQgdXNlU3RhdGUgZnJvbSAnLi91c2VTdGF0ZSc7XG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi9Qcm9wVHlwZXMnO1xuXG5leHBvcnQge1xuICBDaGlsZHJlbixcbiAgQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50LFxuICBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQsXG4gIFxuICB1c2VTdGF0ZSxcblxuICBQcm9wVHlwZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBDaGlsZHJlbixcbiAgQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50LFxuICBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQsXG4gIFxuICB1c2VTdGF0ZSxcblxuICBQcm9wVHlwZXNcbn0iLCJpbXBvcnQgUmVhY3RDdXJyZW50T3duZXIgZnJvbSAnLi9SZWFjdEN1cnJlbnRPd25lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVN0YXRlIChzdGF0ZSkge1xuICBSZWFjdEN1cnJlbnRPd25lcjtcbiAgZGVidWdnZXI7XG5cbiAgcmV0dXJuIFtcbiAgICBzdGF0ZSxcbiAgICBmdW5jdGlvbiBzZXRTdGF0ZSAoKSB7XG5cbiAgICB9XG4gIF1cbn0iLCJpbXBvcnQgcmVuZGVySW50b0NvbnRhaW5lciBmcm9tICcuL3JlbmRlckludG9Db250YWluZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gIHJldHVybiByZW5kZXJJbnRvQ29udGFpbmVyKFxuICAgIGVsZW1lbnQsXG4gICAgY29udGFpbmVyLFxuICAgIGNhbGxiYWNrXG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjsiLCJpbXBvcnQgc2NoZWR1bGVXb3JrIGZyb20gJy4uL3NjaGVkdWxlci9zY2hlZHVsZVdvcmsnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJJbnRvQ29udGFpbmVyIChcbiAgZWxlbWVudCxcbiAgY29udGFpbmVyLFxuICBjYWxsYmFja1xuKSB7XG5cbiAgY29uc3QgeyBjdXJyZW50IH0gPSBjb250YWluZXIuX3JlYWN0Um9vdENvbnRhaW5lciB8fCAoXG4gICAgY29udGFpbmVyLl9yZWFjdFJvb3RDb250YWluZXIgPSB7XG4gICAgICBpbnRlcm5hbFJvb3Q6IGNyZWF0ZUZpYmVyUm9vdChjb250YWluZXIpXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBzY2hlZHVsZVdvcmsoY3VycmVudCwgZWxlbWVudCwgY2FsbGJhY2spO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICcuLi9yZWFjdCc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL3JlYWN0L0NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHZpZXc+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC92aWV3PlxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAnLi4vcmVhY3QnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9yZWFjdC9Db21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dmlldz5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L3ZpZXc+XG4gICAgKTtcbiAgfVxufSIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4vUm91dGUnO1xuXG5leHBvcnQge1xuICBSb3V0ZXIsXG4gIFJvdXRlXG59IiwiY29uc3Qgc2NoZWR1bGVyID0ge1xuICB1cGRhdGVRdWV1ZTogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2NoZWR1bGVyOyIsImltcG9ydCBjcmVhdGVVcGRhdGUgZnJvbSAnLi9jcmVhdGVVcGRhdGUnO1xuaW1wb3J0IGVucXVldWVVcGRhdGUgZnJvbSAnLi9lbnF1ZXVlVXBkYXRlJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi9zaGFyZWQvaXMnO1xuXG5pbXBvcnQgc2NoZWR1bGUgZnJvbSAnLi9pbmRleCc7XG5cbmZ1bmN0aW9uIHNjaGVkdWxlV29yayAoY3VycmVudCwgZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgY29uc3QgdXBkYXRlID0gY3JlYXRlVXBkYXRlKCk7XG5cbiAgdXBkYXRlLnBheWxvYWQgPSB7XG4gICAgZWxlbWVudFxuICB9XG5cbiAgaWYgKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgdXBkYXRlLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIH1cblxufSIsImV4cG9ydCBjb25zdCBFTEVNRU5UX05PREUgPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFRfTk9ERSA9IDM7XG5leHBvcnQgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9OT0RFID0gOTtcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XG4iLCJjb25zdCBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5leHBvcnQgY29uc3QgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbmV4cG9ydCBjb25zdCBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbmV4cG9ydCBjb25zdCBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbmV4cG9ydCBjb25zdCBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbmV4cG9ydCBjb25zdCBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbmV4cG9ydCBjb25zdCBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7XG5leHBvcnQgY29uc3QgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xuZXhwb3J0IGNvbnN0IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG5leHBvcnQgY29uc3QgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJyk6IDB4ZWFkMDtcbmV4cG9ydCBjb25zdCBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbmV4cG9ydCBjb25zdCBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG5leHBvcnQgY29uc3QgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0XG4iLCJpbXBvcnQgeyBpc1N0cmluZywgaXNVbmRlZmluZWQsIGlzQXJyYXkgfSBmcm9tICcuL2lzJztcblxuY29uc3QgcmFuZG9tS2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XG5cbmV4cG9ydCBjb25zdCBDSElMRFJFTiA9ICdjaGlsZHJlbic7XG5leHBvcnQgY29uc3QgSFRNTCA9ICdfX2h0bWwnO1xuZXhwb3J0IGNvbnN0IFNUWUxFID0gJ3N0eWxlJztcbmV4cG9ydCBjb25zdCBTVFlMRV9OQU1FX0ZMT0FUID0gJ2Zsb2F0JztcbmV4cG9ydCBjb25zdCBEQU5HRVJPVVNMWV9TRVRfSU5ORVJfSFRNTCA9ICdkYW5nZXJvdXNseVNldElubmVySFRNTCc7XG5leHBvcnQgY29uc3QgSU5URVJOQUxfSU5TVEFOQ0VfS0VZID0gJ19fcmVhY3RJbnRlcm5hbEluc3RhbmNlJCcgKyByYW5kb21LZXk7XG5leHBvcnQgY29uc3QgSU5URVJOQUxfRVZFTlRfSEFORExFUlNfS0VZID0gJ19fcmVhY3RFdmVudEhhbmRsZXJzJCcgKyByYW5kb21LZXk7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9JTlRFUk5BTF9GSUJFUiA9ICdfcmVhY3RJbnRlcm5hbEZpYmVyJztcbmV4cG9ydCBjb25zdCBSRUFDVF9JTlRFUk5BTF9JTlNUQU5DRSA9ICdfcmVhY3RJbnRlcm5hbEluc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IE1FUkdFRF9DSElMRF9DT05URVhUID0gJ19fcmVhY3RJbnRlcm5hbE1lbW9pemVkTWVyZ2VkQ2hpbGRDb250ZXh0JztcbmV4cG9ydCBjb25zdCBNQVNLRURfQ0hJTERfQ09OVEVYVCA9ICdfX3JlYWN0SW50ZXJuYWxNZW1vaXplZE1hc2tlZENoaWxkQ29udGV4dCc7XG5leHBvcnQgY29uc3QgVU5NQVNLRURfQ0hJTERfQ09OVEVYVCA9ICdfX3JlYWN0SW50ZXJuYWxNZW1vaXplZFVubWFza2VkQ2hpbGRDb250ZXh0JztcblxuZXhwb3J0IGNvbnN0IEVNUFRZX09CSkVDVCA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX0FSUkFZID0gW107XG5leHBvcnQgY29uc3QgRU1QVFlfQ09OVEVYVCA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX1JFRlMgPSB7fTtcbmV4cG9ydCBjb25zdCBFWFBJUkVfVElNRSA9IDE7XG5cblxuZXhwb3J0IGNvbnN0IE5PX1dPUksgPSAwO1xuZXhwb3J0IGNvbnN0IFdPUktJTkcgPSAxO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCAoKSB7fVxuZXhwb3J0IGNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5leHBvcnQgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkU2V0VGV4dENvbnRlbnQgKHR5cGUsIHByb3BzKSB7XG4gIC8vIHRvZG9cbiAgcmV0dXJuIGlzU3RyaW5nKHByb3BzLmNoaWxkcmVuKSB8fCBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbCAoXG4gIG9iamVjdEEsIFxuICBvYmplY3RCXG4pIHtcbiAgaWYgKG9iamVjdEEgPT09IG51bGwgfHwgb2JqZWN0QiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpcyhvYmplY3RBLCBvYmplY3RCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3Qga2V5c0EgPSBvYmplY3RBID8ga2V5cyhvYmplY3RBKSA6IFtdO1xuICBjb25zdCBrZXlzQiA9IG9iamVjdEIgPyBrZXlzKG9iamVjdEIpIDogW107XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gb2JqZWN0QS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGtleXNBW2ldO1xuXG4gICAgaWYgKFxuICAgICAgIW9iamVjdEEuaGFzT3duUHJvcGVydHkoa2V5KSB8fCBcbiAgICAgICFpcyhvYmplY3RBW2tleV0sIG9iamVjdEJba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEZWZhdWx0UHJvcHMgKFxuICBDb21wb25lbnQsXG4gIHVucmVzb2x2ZWRQcm9wc1xuKSB7XG4gIGlmIChDb21wb25lbnQpIHtcbiAgICBpZiAoQ29tcG9uZW50LmRlZmF1bHRQcm9wcykge1xuICAgICAgY29uc3QgcHJvcHMgPSB7IC4uLiB1bnJlc29sdmVkUHJvcHMgfTtcbiAgICAgIGNvbnN0IGRlZmF1bHRQcm9wcyA9IENvbXBvbmVudC5kZWZhdWx0UHJvcHM7XG5cbiAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHVucmVzb2x2ZWRQcm9wcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAoXG4gIHRhcmdldCwgXG4gIHNvdXJjZSxcbikge1xuICBpZiAoc291cmNlKSB7XG4gICAgcmV0dXJuIGFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKHRhcmdldCkge1xuICByZXR1cm4gZXh0ZW5kKHt9LCBjbG9uZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuIChhcnJheSwgcmVzdWx0ID0gW10pIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IGFycmF5O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmbGF0dGVuKHZhbHVlLCByZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0IHsgSE9TVF9DT01QT05FTlQsIEhPU1RfUE9SVEFMLCBIT1NUX1JPT1QgfSBmcm9tICcuL3dvcmtUYWdzJztcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsIChvKSB7XG4gIHJldHVybiBvID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQgKG8pIHtcbiAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24gKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcgKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0IChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgIWlzTnVsbChvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyIChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCAobykge1xuICByZXR1cm4gbyA9PT0gdW5kZWZpbmVkIHx8IG8gPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ludmFsaWQgKG8pIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnRDb25zdHJ1Y3RvciAoQ29tcG9uZW50KSB7XG4gIGNvbnN0IHByb3RvID0gQ29tcG9uZW50LnByb3RvdHlwZTtcblxuICByZXR1cm4gISEocHJvdG8gJiYgcHJvdG8uaXNSZWFjdENvbXBvbmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xlZ2FjeUNvbnRleHRDb25zdW1lciAoQ29tcG9uZW50KSB7XG4gIGNvbnN0IGNvbnRleHRUeXBlcyA9IENvbXBvbmVudC5jb250ZXh0VHlwZXM7XG5cbiAgcmV0dXJuICFpc051bGxPclVuZGVmaW5lZChjb250ZXh0VHlwZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIgKENvbXBvbmVudCkge1xuICBjb25zdCB7IGNoaWxkQ29udGV4dFR5cGVzIH0gPSBDb21wb25lbnQ7XG4gIFxuICByZXR1cm4gIWlzTnVsbE9yVW5kZWZpbmVkKGNoaWxkQ29udGV4dFR5cGVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSG9zdFBhcmVudCAoZmliZXIpIHtcbiAgY29uc3QgeyB0YWcgfSA9IGZpYmVyO1xuXG4gIHJldHVybiAoXG4gICAgdGFnID09PSBIT1NUX0NPTVBPTkVOVCB8fFxuICAgIHRhZyA9PT0gSE9TVF9ST09UIHx8XG4gICAgdGFnID09PSBIT1NUX1BPUlRBTFxuICApO1xufVxuXG5leHBvcnQgY29uc3QgaXMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH1cblxuICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xufSIsIlxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OX0NPTVBPTkVOVCA9IDA7XG5leHBvcnQgY29uc3QgQ0xBU1NfQ09NUE9ORU5UID0gMTtcbmV4cG9ydCBjb25zdCBJTkRFVEVSTUlOQVRFX0NPTVBPTkVOVCA9IDI7XG5leHBvcnQgY29uc3QgSE9TVF9ST09UID0gMztcbmV4cG9ydCBjb25zdCBIT1NUX1BPUlRBTCA9IDQ7XG5leHBvcnQgY29uc3QgSE9TVF9DT01QT05FTlQgPSA1O1xuZXhwb3J0IGNvbnN0IEhPU1RfVEVYVCA9IDY7XG5leHBvcnQgY29uc3QgRlJBR01FTlQgPSA3O1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9DT05TVU1FUiA9IDk7XG5leHBvcnQgY29uc3QgQ09OVEVYVF9QUk9WSURFUiA9IDEwO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==