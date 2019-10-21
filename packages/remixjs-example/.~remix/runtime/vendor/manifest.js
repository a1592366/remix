/*** MARK_1571679053979 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["runtime/vendor/manifest"],{

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

/***/ "../remixjs-mesaage-protocol/dist/protocol.js":
/*!****************************************************!*\
  !*** ../remixjs-mesaage-protocol/dist/protocol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _interopRequireDefault2 = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault2(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/typeof.js"));

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
              return this.type;
            }
          }, {
            key: "valueOf",
            value: function valueOf() {
              return this.uuid;
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
          INSPECT: 'inspect',
          SHOW: 'show',
          HIDE: 'hide',
          ERROR: 'error'
        });
        exports.APPLICATION = APPLICATION;
        var VIEW = defineNotificationTypes('view', {
          LOAD: 'load'
        });
        exports.VIEW = VIEW;
        var API = defineNotificationTypes('api', {});
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

/***/ "../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!************************************************************************************************!*\
  !*** ../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
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

/***/ "../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/typeof.js":
/*!*********************************************************************************!*\
  !*** ../remixjs-mesaage-protocol/node_modules/@babel/runtime/helpers/typeof.js ***!
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

/***/ "../remixjs/components.js":
/*!********************************!*\
  !*** ../remixjs/components.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = __webpack_require__(/*! ./src/components */ "../remixjs/src/components/index.js");

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

/***/ }),

/***/ "../remixjs/document.js":
/*!******************************!*\
  !*** ../remixjs/document.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _document = __webpack_require__(/*! ./src/document */ "../remixjs/src/document/index.js");

Object.keys(_document).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _document[key];
    }
  });
});

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
exports["default"] = exports.inspectTerminalTypes = exports.inspectMessageTypes = exports.internalUIURL = exports.inspectWSURL = exports.isInspectMode = void 0;
var isInspectMode = true;
exports.isInspectMode = isInspectMode;
var inspectWSURL = "ws://192.168.2.11:10002";
exports.inspectWSURL = inspectWSURL;
var internalUIURL = "http://192.168.2.11:10002";
exports.internalUIURL = internalUIURL;
var inspectMessageTypes = {"REGISTER":0,"MESSAGE":1,"CLOSE":2};
exports.inspectMessageTypes = inspectMessageTypes;
var inspectTerminalTypes = {"VIEW":1,"LOGIC":2,"SERVICES":3};
exports.inspectTerminalTypes = inspectTerminalTypes;
var _default = {
  isInspectMode: isInspectMode,
  inspectWSURL: inspectWSURL,
  internalUIURL: internalUIURL,
  inspectMessageTypes: inspectMessageTypes,
  inspectTerminalTypes: inspectTerminalTypes
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/index.js":
/*!***************************!*\
  !*** ../remixjs/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! ./src/react */ "../remixjs/src/react/index.js"));

Object.keys(_react).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react[key];
    }
  });
});
var _default = _react["default"];
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!******************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \******************************************************************************/
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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!*************************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

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

/***/ "../remixjs/node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!***********************************************************************!*\
  !*** ../remixjs/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "../remixjs/node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "../remixjs/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "../remixjs/node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

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

/***/ "../remixjs/router.js":
/*!****************************!*\
  !*** ../remixjs/router.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = __webpack_require__(/*! ./src/router */ "../remixjs/src/router/index.js");

Object.keys(_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _router[key];
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

/***/ "../remixjs/src/components/View.js":
/*!*****************************************!*\
  !*** ../remixjs/src/components/View.js ***!
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

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty4 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! ../react */ "../remixjs/src/react/index.js"));

var _Component2 = _interopRequireDefault(__webpack_require__(/*! ../react/Component */ "../remixjs/src/react/Component.js"));

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ../react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _defineProperty2, _defineProperty3;

var View =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(View, _Component);

  function View() {
    (0, _classCallCheck2["default"])(this, View);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(View).apply(this, arguments));
  }

  (0, _createClass2["default"])(View, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("view", this.props.children, this.props.children);
    }
  }]);
  return View;
}(_Component2["default"]);

exports["default"] = View;
(0, _defineProperty4["default"])(View, "propTypes", (_defineProperty2 = {
  style: _PropTypes["default"].object,
  className: _PropTypes["default"].string,
  onPress: _PropTypes["default"].func,
  onLongPress: _PropTypes["default"].func,
  onClick: _PropTypes["default"].func,
  onTap: _PropTypes["default"].func
}, (0, _defineProperty4["default"])(_defineProperty2, "onPress", _PropTypes["default"].func), (0, _defineProperty4["default"])(_defineProperty2, "onTouchStart", _PropTypes["default"].func), (0, _defineProperty4["default"])(_defineProperty2, "onTouchMove", _PropTypes["default"].func), (0, _defineProperty4["default"])(_defineProperty2, "onTouchEnd", _PropTypes["default"].func), _defineProperty2));
(0, _defineProperty4["default"])(View, "defaultProps", (_defineProperty3 = {
  style: null,
  className: null,
  onPress: null,
  onLongPress: null,
  onClick: null
}, (0, _defineProperty4["default"])(_defineProperty3, "onPress", null), (0, _defineProperty4["default"])(_defineProperty3, "onTap", null), (0, _defineProperty4["default"])(_defineProperty3, "onTouchStart", null), (0, _defineProperty4["default"])(_defineProperty3, "onTouchMove", null), (0, _defineProperty4["default"])(_defineProperty3, "onTouchEnd", null), _defineProperty3));

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
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _View["default"];
  }
});
Object.defineProperty(exports, "TabBar", {
  enumerable: true,
  get: function get() {
    return _TabBar["default"];
  }
});

var _Application = _interopRequireDefault(__webpack_require__(/*! ./Application */ "../remixjs/src/components/Application.js"));

var _ViewController = _interopRequireDefault(__webpack_require__(/*! ./ViewController */ "../remixjs/src/components/ViewController.js"));

var _View = _interopRequireDefault(__webpack_require__(/*! ./View */ "../remixjs/src/components/View.js"));

var _TabBar = _interopRequireDefault(__webpack_require__(/*! ./TabBar */ "../remixjs/src/components/TabBar.js"));

/***/ }),

/***/ "../remixjs/src/context/createLegacyContext.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/context/createLegacyContext.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createLegacyContext;

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

var _processChildContext = _interopRequireDefault(__webpack_require__(/*! ./processChildContext */ "../remixjs/src/context/processChildContext.js"));

function createLegacyContext() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _shared.EMPTY_CONTEXT;
  var disableLegacyContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    disableLegacyContext: disableLegacyContext,
    previousContext: _shared.EMPTY_CONTEXT,
    stack: [],
    index: -1,
    cursor: {
      current: context
    },
    pop: function pop(cursor, currentFiber) {
      if (this.index > -1) {
        var _this$stack$this$inde = this.stack[this.index],
            fiber = _this$stack$this$inde.fiber,
            current = _this$stack$this$inde.current;
        cursor.current = current;
        this.stack[this.index] = null;
        this.index--;
      }
    },
    push: function push(cursor, value, fiber) {
      this.stack[++this.index] = {
        current: cursor.current,
        fiber: fiber
      };
      cursor.current = value;
    },
    pushProvider: function pushProvider(workInProgress) {
      if (this.disableLegacyContext) {
        return false;
      } else {
        var instance = workInProgress.stateNode;
        var memoizedMergedChildContext = instance ? instance[_shared.MERGED_CHILD_CONTEXT] : _shared.EMPTY_CONTEXT;
        this.previousContext = this.cursor.current;
        this.push(this.cursor, memoizedMergedChildContext, workInProgress);
      }
    },
    invalidateProvider: function invalidateProvider(workInProgress, Component, changed) {
      if (!context.disableLegacyContext) {
        var instance = workInProgress.stateNode;

        if (changed) {
          var mergedContext = (0, _processChildContext["default"])(workInProgress, Component, this.previousContext);
          instance[_shared.MERGED_CHILD_CONTEXT] = mergedContext;
          this.pop(this.cursor, workInProgress);
          this.push(this.cursor, mergedContext, workInProgress);
        }
      }
    }
  };
}

/***/ }),

/***/ "../remixjs/src/context/getMaskedContext.js":
/*!**************************************************!*\
  !*** ../remixjs/src/context/getMaskedContext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMaskedContext;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/context/index.js"));

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

function getMaskedContext(workInProgress, unmaskedContext) {
  if (_index["default"].disableLegacyContext) {
    return _shared.EMPTY_CONTEXT;
  }

  var type = workInProgress.type;
  var contextTypes = type.contextTypes;

  if (!contextTypes) {
    return _shared.EMPTY_CONTEXT;
  }

  var instance = workInProgress.stateNode;

  if (instance) {
    var mergedContext = instance[_shared.MERGED_CHILD_CONTEXT];

    if (instance[_shared.MERGED_CHILD_CONTEXT] === unmaskedContext) {
      return mergedContext;
    }
  }

  var ctx = {};

  for (var contextKey in contextTypes) {
    ctx[contextKey] = unmaskedContext[contextKey];
  }

  if (instance) {
    if (!_index["default"].disableLegacyContext) {
      instance[_shared.MERGED_CHILD_CONTEXT] = ctx;
    }
  }

  return ctx;
}

/***/ }),

/***/ "../remixjs/src/context/getUnmaskedContext.js":
/*!****************************************************!*\
  !*** ../remixjs/src/context/getUnmaskedContext.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getUnmaskedContext;

var _shared = __webpack_require__(/*! ../shared */ "../remixjs/src/shared/index.js");

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _index = _interopRequireWildcard(__webpack_require__(/*! ./index */ "../remixjs/src/context/index.js"));

function getUnmaskedContext(workInProgress, Component) {
  if (_index["default"].disableLegacyContext) {
    return _shared.EMPTY_CONTEXT;
  } else {
    if ((0, _is.isContextProvider)(Component)) {
      return _index["default"].previousContext;
    }

    return _index.contextCursor.current;
  }
}

/***/ }),

/***/ "../remixjs/src/context/index.js":
/*!***************************************!*\
  !*** ../remixjs/src/context/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextCursor = exports["default"] = void 0;

var _createLegacyContext = _interopRequireDefault(__webpack_require__(/*! ./createLegacyContext */ "../remixjs/src/context/createLegacyContext.js"));

var context = (0, _createLegacyContext["default"])();
var _default = context;
exports["default"] = _default;
var contextCursor = context.cursor;
exports.contextCursor = contextCursor;

/***/ }),

/***/ "../remixjs/src/context/processChildContext.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/context/processChildContext.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = processChildContext;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _context2 = _interopRequireDefault(__webpack_require__(/*! ../context */ "../remixjs/src/context/index.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function processChildContext(workInProgress, type, parentContext) {
  if (!_context2["default"].disableLegacyContext) {
    var instance = workInProgress.stateNode;
    var childContextTypes = type.childContextTypes;

    if (!(0, _is.isFunction)(instance.getChildContext)) {
      return parentContext;
    }

    var _context = instance.getChildContext();

    return _objectSpread({}, parentContext, {}, _context);
  } else {
    return parentContext;
  }
}

/***/ }),

/***/ "../remixjs/src/context/pushHostRootContext.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/context/pushHostRootContext.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _v = _interopRequireDefault(__webpack_require__(/*! uuid/v4 */ "../remixjs/node_modules/uuid/v4.js"));

var _document = _interopRequireDefault(__webpack_require__(/*! ./document */ "../remixjs/src/document/document.js"));

var Element =
/*#__PURE__*/
function () {
  function Element() {
    (0, _classCallCheck2["default"])(this, Element);
    (0, _defineProperty2["default"])(this, "uuid", (0, _v["default"])());
    (0, _defineProperty2["default"])(this, "tagName", null);
    (0, _defineProperty2["default"])(this, "nodeType", null);
    (0, _defineProperty2["default"])(this, "child", null);
    (0, _defineProperty2["default"])(this, "return", null);
    (0, _defineProperty2["default"])(this, "lastChild", null);
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "tagName", 'body');
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

var HTMLElement =
/*#__PURE__*/
function (_Element) {
  (0, _inherits2["default"])(HTMLElement, _Element);

  function HTMLElement(tagName) {
    var _this;

    (0, _classCallCheck2["default"])(this, HTMLElement);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLElement).call(this));
    _this.tagName = tagName;
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
    value: function removeChild() {}
  }, {
    key: "getAttribute",
    value: function getAttribute() {}
  }, {
    key: "setAttribute",
    value: function setAttribute() {}
  }, {
    key: "removeAttribute",
    value: function removeAttribute() {}
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
      var element = {
        uuid: this.uuid,
        nodeType: this.nodeType,
        tagName: this.tagName
      };

      if (!(0, _is.isNullOrUndefined)(this.child)) {
        element.child = this.child.serialize();
      }

      if (!(0, _is.isNullOrUndefined)(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      return element;
    }
  }]);
  return HTMLElement;
}(_Element2["default"]);

exports["default"] = HTMLElement;

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

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Element2 = _interopRequireDefault(__webpack_require__(/*! ./Element */ "../remixjs/src/document/Element.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var HTMLTextElement =
/*#__PURE__*/
function (_Element) {
  (0, _inherits2["default"])(HTMLTextElement, _Element);

  function HTMLTextElement() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, HTMLTextElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(HTMLTextElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "nodeType", _HTMLNodeType.TEXT_NODE);
    return _this;
  }

  return HTMLTextElement;
}(_Element2["default"]);

exports["default"] = HTMLTextElement;

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

var _HTMLElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLElement */ "../remixjs/src/document/HTMLElement.js"));

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

function createElement(tagName, properties) {
  var element = new _HTMLElement["default"](tagName);
  element.nodeType = _HTMLNodeType.ELEMENT_NODE;
  return element;
}

/***/ }),

/***/ "../remixjs/src/document/createTextNode.js":
/*!*************************************************!*\
  !*** ../remixjs/src/document/createTextNode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTextNode;

var _HTMLTextElement = _interopRequireDefault(__webpack_require__(/*! ./HTMLTextElement */ "../remixjs/src/document/HTMLTextElement.js"));

function createTextNode(text) {}

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

var _default = typeof document === 'undefined' ? {
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
  createElement: _createElement["default"],
  createTextNode: _createTextNode["default"]
} : document;

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

/***/ "../remixjs/src/event/ensureListeningTo.js":
/*!*************************************************!*\
  !*** ../remixjs/src/event/ensureListeningTo.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureListeningTo;

var _HTMLNodeType = __webpack_require__(/*! ../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _listenTo = _interopRequireDefault(__webpack_require__(/*! ./listenTo */ "../remixjs/src/event/listenTo.js"));

function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === _HTMLNodeType.DOCUMENT_NODE || rootContainerElement.nodeType === _HTMLNodeType.DOCUMENT_FRAGMENT_NODE;
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  (0, _listenTo["default"])(registrationName, doc);
}

/***/ }),

/***/ "../remixjs/src/event/listenTo.js":
/*!****************************************!*\
  !*** ../remixjs/src/event/listenTo.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = listenTo;

function listenTo() {}

/***/ }),

/***/ "../remixjs/src/event/registrationNameModules.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/event/registrationNameModules.js ***!
  \*******************************************************/
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

var _terminal = _interopRequireDefault(__webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal.js"));

var _devtool = _interopRequireDefault(__webpack_require__(/*! ./runtime/devtool */ "../remixjs/src/project/runtime/devtool.js"));

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
      if (_env["default"].isDevToolRunTime) {
        (0, _devtool["default"])(this.context);
      } else {
        (0, _terminal["default"])(this.context);
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

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _transports = _interopRequireDefault(__webpack_require__(/*! ./runtime/transports */ "../remixjs/src/project/runtime/transports/index.js"));

var ViewController =
/*#__PURE__*/
function () {
  function ViewController(route) {
    (0, _classCallCheck2["default"])(this, ViewController);
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
            var v = this;

            _transports["default"].view.load({
              id: ctrl.id,
              route: ctrl.route
            }, query, function (element) {
              v.setData({
                element: element
              });
            });
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

var _terminal = __webpack_require__(/*! ./runtime/terminal */ "../remixjs/src/project/runtime/terminal.js");

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

/***/ "../remixjs/src/project/runtime/Socket.js":
/*!************************************************!*\
  !*** ../remixjs/src/project/runtime/Socket.js ***!
  \************************************************/
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

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../env */ "../remixjs/env.js"));

function _default(options) {
  var _temp;

  var Socket = _env["default"].isDevToolRunTime ? (_temp =
  /*#__PURE__*/
  function () {
    function _temp(_ref) {
      var _this = this;

      var url = _ref.url,
          protocol = _ref.protocol;
      (0, _classCallCheck2["default"])(this, _temp);
      (0, _defineProperty2["default"])(this, "onMessage", function (onMessage) {
        _this.socket.onmessage = onMessage;
      });
      (0, _defineProperty2["default"])(this, "onOpen", function (onOpen) {
        _this.socket.onopen = onOpen;
      });
      (0, _defineProperty2["default"])(this, "onClose", function (onClose) {
        _this.socket.onopen = onClose;
      });
      (0, _defineProperty2["default"])(this, "onError", function (onError) {
        _this.socket.onopen = onError;
      });
      this.socket = new WebSocket(url, protocol);
    }

    (0, _createClass2["default"])(_temp, [{
      key: "send",
      value: function send(_ref2) {
        var data = _ref2.data;
        this.socket.send(JSON.stringify(data));
      }
    }]);
    return _temp;
  }(), _temp) : function (_ref3) {
    var url = _ref3.url,
        protocol = _ref3.protocol;
    return wx.connectSocket({
      url: url,
      protocol: protocol
    });
  };
  return new Socket(options);
}

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
    this.container = _document.document.createElement('view');

    _document.document.body.appendChild(this.container);
  }

  (0, _createClass2["default"])(ViewController, [{
    key: "onLoad",
    value: function onLoad(query, callback) {
      var _this$route = this.route,
          component = _this$route.component,
          r = _this$route.render;
      var rendered = (0, _renderer["default"])((0, _react.createElement)(component || r), this.container);
      callback(this.container.serialize());
    }
  }, {
    key: "onReady",
    value: function onReady() {}
  }]);
  return ViewController;
}();

exports["default"] = ViewController;

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

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

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
    (0, _defineProperty2["default"])(this, "onMessage", function (type, argv) {
      switch (type) {
        case _transports.VIEW.LOAD:
          {
            _this.onLoad.apply(_this, (0, _toConsumableArray2["default"])(argv));
          }
      }
    });
    (0, _defineProperty2["default"])(this, "onLoad", function (_ref, query, callback) {
      var route = _ref.route,
          id = _ref.id;
      var viewController = _this.viewControllers[id];

      if (viewController) {
        viewController.onLoad();
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

    _transports["default"].view.on(this.onMessage);
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

/***/ "../remixjs/src/project/runtime/devtool.js":
/*!*************************************************!*\
  !*** ../remixjs/src/project/runtime/devtool.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ "../remixjs/node_modules/qs/lib/index.js"));

var _transports = _interopRequireWildcard(__webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _ViewManager = _interopRequireDefault(__webpack_require__(/*! ./ViewManager */ "../remixjs/src/project/runtime/ViewManager.js"));

var _Socket = _interopRequireDefault(__webpack_require__(/*! ./Socket */ "../remixjs/src/project/runtime/Socket.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../env */ "../remixjs/env.js"));

var DevTool =
/*#__PURE__*/
function () {
  function DevTool(context) {
    (0, _classCallCheck2["default"])(this, DevTool);
    this.id = _uuid["default"].v4();
    this.context = context;
    this.viewManager = new _ViewManager["default"](context);
    this.socket = new _Socket["default"]({
      url: _env["default"].inspectWSURL
    });
  }

  (0, _createClass2["default"])(DevTool, [{
    key: "run",
    value: function run() {
      var _this = this;

      this.socket.onOpen(function () {
        var search = location.search.slice(1);

        var query = _qs["default"].parse(search);

        _this.socket.send({
          data: {
            id: _this.id,
            type: _env["default"].inspectMessageTypes.MESSAGE,
            terminal: _env["default"].inspectTerminalTypes.LOGIC,
            post: {
              type: String(_transports.APPLICATION),
              body: {
                type: _transports.APPLICATION.INSPECT,
                argv: [query.id]
              }
            }
          }
        });
      });
    }
  }]);
  return DevTool;
}();

function _default(context) {
  var devTool = new DevTool(context);
  devTool.run();
}

/***/ }),

/***/ "../remixjs/src/project/runtime/terminal.js":
/*!**************************************************!*\
  !*** ../remixjs/src/project/runtime/terminal.js ***!
  \**************************************************/
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

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _transports = _interopRequireDefault(__webpack_require__(/*! ./transports */ "../remixjs/src/project/runtime/transports/index.js"));

var _ViewManager = _interopRequireDefault(__webpack_require__(/*! ./ViewManager */ "../remixjs/src/project/runtime/ViewManager.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../env */ "../remixjs/env.js"));

var _types = __webpack_require__(/*! ./transports/types */ "../remixjs/src/project/runtime/transports/types.js");

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

var Runtime =
/*#__PURE__*/
function () {
  function Runtime(context) {
    (0, _classCallCheck2["default"])(this, Runtime);
    this.context = context;
    this.id = _uuid["default"].v4();
  }

  (0, _createClass2["default"])(Runtime, [{
    key: "inspect",
    value: function inspect(callback) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        debugger;

        _transports["default"].app.inspect(_this.id, function () {
          resolve();
        });
      });
    }
  }, {
    key: "run",
    value: function run() {
      var launchApplication = function launchApplication() {
        if (typeof App === 'function') {
          App({
            onLaunch: function onLaunch(options) {
              _transports["default"].app.launch(options);
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
  return Runtime;
}();

;

function _default(context) {
  var runtime = new Runtime(context);
  var viewManager = new _ViewManager["default"](context);
  runtime.run();
}

;

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

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../remixjs/node_modules/@babel/runtime/helpers/toConsumableArray.js"));

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMessage", function (_ref) {
      var argv = _ref.argv,
          callbackId = _ref.callbackId;

      if (callbackId) {
        var _this2;

        (_this2 = _this).emit.apply(_this2, [callbackId].concat((0, _toConsumableArray2["default"])(argv)));
      }
    });
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
    key: "inspect",
    value: function inspect(id, callback) {
      this.post(_types.APPLICATION.INSPECT, [id], callback);
    }
  }, {
    key: "launch",
    value: function launch(options) {
      this.emit(_types.APPLICATION.LAUNCH, [options]);
    }
  }, {
    key: "show",
    value: function show() {
      this.emit(_types.APPLICATION.SHOW, []);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.emit(_types.APPLICATION.HIDE, []);
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.emit(_types.APPLICATION.ERROR, [_error]);
    }
  }]);
  return ApplicationTransport;
}(_tunnel["default"]);

exports["default"] = ApplicationTransport;

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

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get4 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _tunnel = _interopRequireDefault(__webpack_require__(/*! ../tunnel */ "../remixjs/src/project/runtime/tunnel/index.js"));

var _types = __webpack_require__(/*! ./types */ "../remixjs/src/project/runtime/transports/types.js");

var ViewControllerEngine =
/*#__PURE__*/
function (_Tunnel) {
  (0, _inherits2["default"])(ViewControllerEngine, _Tunnel);

  function ViewControllerEngine() {
    (0, _classCallCheck2["default"])(this, ViewControllerEngine);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ViewControllerEngine).apply(this, arguments));
  }

  (0, _createClass2["default"])(ViewControllerEngine, [{
    key: "load",
    value: function load() {
      for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
        argv[_key] = arguments[_key];
      }

      this.emit(_types.VIEW.LOAD, argv);
    }
  }, {
    key: "on",
    value: function on() {
      var _get2;

      for (var _len2 = arguments.length, argv = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        argv[_key2] = arguments[_key2];
      }

      (_get2 = (0, _get4["default"])((0, _getPrototypeOf2["default"])(ViewControllerEngine.prototype), "on", this)).call.apply(_get2, [this, _types.VIEW].concat(argv));
    }
  }, {
    key: "off",
    value: function off() {
      var _get3;

      for (var _len3 = arguments.length, argv = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        argv[_key3] = arguments[_key3];
      }

      (_get3 = (0, _get4["default"])((0, _getPrototypeOf2["default"])(ViewControllerEngine.prototype), "off", this)).call.apply(_get3, [this, _types.VIEW].concat(argv));
    }
  }]);
  return ViewControllerEngine;
}(_tunnel["default"]);

exports["default"] = ViewControllerEngine;

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
var transports = {};
var _default = {
  get app() {
    if (transports.app) {
      return transports.app;
    }

    return transports.app = new _ApplicationTransport["default"]();
  },

  get view() {
    if (transports.view) {
      return transports.view;
    }

    return transports.view = new _ViewControllerTransport["default"]();
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

var _remixjsMesaageProtocol = __webpack_require__(/*! remixjs-mesaage-protocol */ "../remixjs-mesaage-protocol/dist/protocol.js");

Object.keys(_remixjsMesaageProtocol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _remixjsMesaageProtocol[key];
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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "../remixjs/node_modules/@babel/runtime/helpers/get.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _default =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(_default, _EventEmitter);

  function _default() {
    (0, _classCallCheck2["default"])(this, _default);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(_default).apply(this, arguments));
  }

  (0, _createClass2["default"])(_default, [{
    key: "emit",
    value: function emit(type, argv) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(_default.prototype), "emit", this).call(this, type, type, argv);
    }
  }]);
  return _default;
}(_events["default"]);

exports["default"] = _default;
;

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

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "../remixjs/node_modules/@babel/runtime/helpers/createClass.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../remixjs/node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../remixjs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../remixjs/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../remixjs/node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "../remixjs/node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "../remixjs-cli/node_modules/events/events.js"));

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "../remixjs/node_modules/uuid/index.js"));

var _Socket = _interopRequireDefault(__webpack_require__(/*! ../Socket */ "../remixjs/src/project/runtime/Socket.js"));

var _env = _interopRequireDefault(__webpack_require__(/*! ../../../../env */ "../remixjs/env.js"));

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MessageEmitter =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(MessageEmitter, _EventEmitter);

  function MessageEmitter() {
    var _this;

    (0, _classCallCheck2["default"])(this, MessageEmitter);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MessageEmitter).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "post", function (data) {
      if (_this.connected) {
        _this.socket.send({
          data: JSON.stringify({
            id: _this.id,
            type: _env["default"].inspectMessageTypes.MESSAGE,
            terminal: _env["default"].inspectTerminalTypes.VIEW,
            post: _objectSpread({}, data)
          })
        });
      } else {
        _this.queue.push(data);
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

      _this.post({
        type: _env["default"].inspectMessageTypes.REGISTER
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClose", function () {
      _this.connected = false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMessage", function (data) {
      _this.emit('message', data);
    });
    _this.id = _uuid["default"].v4();
    _this.connected = false;
    _this.queue = [];
    _this.socket = new _Socket["default"]({
      url: _env["default"].inspectWSURL,
      protocol: _this.id
    });

    _this.socket.onMessage(function (_ref2) {
      var data = _ref2.data;

      try {
        var json = JSON.parse(data);

        _this.onMessage(json);
      } catch (err) {}
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
    _this2.id = _uuid["default"].v4();
    _this2.emitter = SocketTunnel.emitter || (SocketTunnel.emitter = new MessageEmitter());

    _this2.emitter.on('message', _this2.onMessage);

    return _this2;
  }

  (0, _createClass2["default"])(SocketTunnel, [{
    key: "onMessage",
    value: function onMessage(_ref3) {
      var data = _ref3.data;
      var post = data.post;
      var type = post.type,
          body = post.body;
      this.emit(type, body);
    }
  }, {
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

var Tunnel =  true ? _SocketTunnel["default"] : undefined;
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

/***/ "../remixjs/src/reconciler/ChildrenReconciler.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/reconciler/ChildrenReconciler.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChildrenReconciler;

var _readOnlyError2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "../remixjs/node_modules/@babel/runtime/helpers/readOnlyError.js"));

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _elementTypes = __webpack_require__(/*! ../shared/elementTypes */ "../remixjs/src/shared/elementTypes.js");

var _workTags = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _FiberNode = __webpack_require__(/*! ./FiberNode */ "../remixjs/src/reconciler/FiberNode.js");

function ChildrenReconciler(shouldTrackSideEffects) {
  function reconcileSingleTextElement(returnFiber, currentFirstChild, textContent) {
    if (!(0, _is.isNullOrUndefined)(currentFirstChild) && currentFirstChild.tag === _workTags.HOST_TEXT) {
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent);
      existing["return"] = returnFiber;
      return existing;
    }

    deleteRemainingChildren(returnFiber, currentFirstChild);
    var fiber = (0, _FiberNode.createFiberFromText)(textContent);
    fiber["return"] = returnFiber;
    return fiber;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, newChild) {
    var key = newChild.key,
        type = newChild.type;
    var child = currentFirstChild;

    while (!(0, _is.isNullOrUndefined)(child)) {
      if (child.key === key) {
        if (child.tag === _workTags.FRAGMENT ? element.type === _elementTypes.REACT_FRAGMENT_TYPE : child.elementType === newChild.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, newChild.type === _elementTypes.REACT_FRAGMENT_TYPE ? newChild.props.children : newChild.props);
          existing.ref = coerceRef(returnFiber, child, newChild);
          existing["return"] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    if (type === _elementTypes.REACT_FRAGMENT_TYPE) {
      var fiber = (0, _FiberNode.createFiberFromFragment)(newChild.props.children, element.key);
      fiber["return"] = returnFiber;
      return fiber;
    } else {
      var _fiber = (0, _FiberNode.createFiberFromElement)(newChild);

      _fiber["return"] = returnFiber;
      return _fiber;
    }
  }

  function placeSingleChild(fiber) {
    if (shouldTrackSideEffects && (0, _is.isNullOrUndefined)(fiber.alternate)) {
      fiber.effectTag |= _effectTags.PLACEMENT;
    }

    return fiber;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (shouldTrackSideEffects) {
      var _childToDelete = currentFirstChild;

      while (!(0, _is.isNullOrUndefined)(_childToDelete)) {
        deleteChild(returnFiber, _childToDelete);
        _childToDelete = _childToDelete.sibling;
      }

      return null;
    }
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    var existingChildren = new Map();
    var existingChild = currentFirstChild;

    while (!(0, _is.isNullOrUndefined)(existingChild)) {
      if ((0, _is.isNullOrUndefined)(existingChild.key)) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }

      existingChild = ((0, _readOnlyError2["default"])("existingChild"), existingChild.sibling);
    }

    return existingChildren;
  }

  function coerceRef(returnFiber, current, element) {
    var mixedRef = element.ref;

    if (!(0, _is.isNullOrUndefined)(mixedRef) && !(0, _is.isFunction)(mixedRef) && !isObject(mixedRef)) {
      if (element._owner) {
        var owner = element._owner;
        var instance;

        if (owner) {
          var ownerFiber = owner;
          instance = ownerFiber.stateNode;
        }

        var stringRef = String(mixedRef);

        if (!(0, _is.isNullOrUndefined)(current) && !(0, _is.isNullOrUndefined)(current.ref) && (0, _is.isFunction)(current.ref) && current.ref._stringRef === stringRef) {
          return current.ref;
        }

        var ref = function ref(value) {
          var refs = inst.refs;

          if (refs === EMPTY_REFS) {
            refs = inst.refs = {};
          }

          if ((0, _is.isNullOrUndefined)(value)) {
            delete refs[stringRef];
          } else {
            refs[stringRef] = value;
          }
        };

        ref._stringRef = stringRef;
        return ref;
      } else {// error
      }
    }

    return mixedRef;
  }

  function useFiber(fiber, pendingProps) {
    var clone = (0, _FiberNode.createWorkInProgress)(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function deleteChild(returnFiber, child) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;

      if ((0, _is.isNullOrUndefined)(last)) {
        last.nextEffect = child;
        returnFiber.lastEffect = child;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }

      child.nextEffect = null;
      child.effectTag = _effectTags.DELETION;
    }
  }

  function createChild(returnFiber, newChild) {
    if ((0, _is.isString)(newChild) || (0, _is.isNumber)(newChild)) {
      var created = (0, _FiberNode.createFiberFromText)(String(newChild));
      created["return"] = returnFiber;
      return created;
    }

    if (!(0, _is.isNullOrUndefined)(newChild)) {
      switch (newChild.$$typeof) {
        case _elementTypes.REACT_ELEMENT_TYPE:
          {
            var _created = (0, _FiberNode.createFiberFromElement)(newChild);

            _created.ref = coerceRef(returnFiber, null, newChild);
            _created["return"] = returnFiber;
            return _created;
          }

        case _elementTypes.REACT_PORTAL_TYPE:
          {
            var _created2 = createFiberFromPortal(newChild);

            _created2["return"] = returnFiber;
            return _created2;
          }
      }

      if ((0, _is.isArray)(newChild) || getIteratorFn(newChild)) {
        var _created3 = (0, _FiberNode.createFiberFromFragment)(newChild, key);

        _created3["return"] = returnFiber;
        return _created3;
      }
    }

    return null;
  }

  function placeChild(newFiber, lastPlacedIndex, index) {
    newFiber.index = index;

    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }

    var current = newFiber.alternate;

    if (!(0, _is.isNullOrUndefined)(current)) {
      var oldIndex = current.index;

      if (oldIndex < lastPlacedIndex) {
        newFiber.effectTag = _effectTags.PLACEMENT;
        return lastPlacedIndex;
      } else {
        return oldIndex;
      }
    } else {
      newFiber.effectTag = _effectTags.PLACEMENT;
      return lastPlacedIndex;
    }
  }

  function updateFromMap(existingChildren, returnFiber, index, newChild) {
    if ((0, _is.isString)(newChild) || (0, _is.isNumber)(newChild)) {
      var matchedFiber = existingChildren.get(index) || null;
      return updateTextNode(returnFiber, matchedFiber, String(newChild));
    }

    if (!(0, _is.isNullOrUndefined)(newChild)) {
      switch (newChild.$$typeof) {
        case _elementTypes.REACT_ELEMENT_TYPE:
          {
            var _key = (0, _is.isNullOrUndefined)(newChild.key) ? index : newChild.key;

            var _matchedFiber = existingChildren.get(_key) || null;

            if (newChild.type === _elementTypes.REACT_FRAGMENT_TYPE) {
              return updateFragment(returnFiber, _matchedFiber, newChild.props.children, newChild.key);
            } else {
              return updateElement(returnFiber, _matchedFiber, newChild);
            }
          }

        case _elementTypes.REACT_PORTAL_TYPE:
          {
            var _key2 = (0, _is.isNullOrUndefined)(newChild.key) ? index : newChild.key;

            var _matchedFiber2 = existingChildren.get(_key2) || null;

            return updatePortal(returnFiber, _matchedFiber2, newChild);
          }
      }

      if ((0, _is.isArray)(newChild)) {
        var _matchedFiber3 = existingChildren.get(index) || null;

        return updateFragment(returnFiber, _matchedFiber3, newChild, null);
      }
    }

    return null;
  }

  function updateTextNode(returnFiber, current, textContent) {
    if ((0, _is.isNullOrUndefined)(current) || current.tag !== _workTags.HOST_TEXT) {
      var created = (0, _FiberNode.createFiberFromText)(textContent);
      created["return"] = returnFiber;
      return created;
    } else {
      var existing = useFiber(current, textContent);
      existing["return"] = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment) {
    if ((0, _is.isNullOrUndefined)(current) || current.tag !== _workTags.FRAGMENT) {
      var created = (0, _FiberNode.createFiberFromFragment)(fragment, key);
      created["return"] = returnFiber;
      return created;
    } else {
      var existing = useFiber(current, fragment);
      existing["return"] = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element) {
    if (!(0, _is.isNullOrUndefined)(current) && current.elementType === element.type) {
      var existing = useFiber(current, element.props);
      existing.ref = coerceRef(returnFiber, current, element);
      existing["return"] = returnFiber;
      return existing;
    } else {
      var created = (0, _FiberNode.createFiberFromElement)(element);
      created.ref = coerceRef(returnFiber, current, element);
      created["return"] = returnFiber;
      return created;
    }
  }

  function updatePortal(returnFiber, current, portal) {
    if ((0, _is.isNullOrUndefined)(current) || current.tag !== _workTags.HOST_PORTAL || current.stateNode.containerInfo !== portal.containerInfo) {
      var created = createFiberFromPortal(portal);
      created["return"] = returnFiber;
      return created;
    } else {
      var existing = useFiber(current$$1, portal.children || [], expirationTime);
      existing["return"] = returnFiber;
      return existing;
    }
  }

  function updateSlot(returnFiber, oldFiber, newChild) {
    var key = (0, _is.isNullOrUndefined)(oldFiber) ? null : oldFiber.key;

    if ((0, _is.isString)(newChild) || (0, _is.isNumber)(newChild)) {
      if (!(0, _is.isNullOrUndefined)(key)) {
        return null;
      }

      return updateTextNode(returnFiber, oldFiber, String(newChild));
    }

    if (!(0, _is.isNullOrUndefined)(newChild)) {
      switch (newChild.$$typeof) {
        case _elementTypes.REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              if (newChild.type === _elementTypes.REACT_FRAGMENT_TYPE) {
                return updateFragment(returnFiber, oldFiber, newChild.props.children, key);
              }

              return updateElement(returnFiber, oldFiber, newChild);
            } else {
              return null;
            }
          }

        case _elementTypes.REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }
      }
    }

    return null;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var nextOldFiber = null;
    var lastPlacedIndex = 0;
    var index = 0;
    var length = newChildren.length;

    for (; !(0, _is.isNullOrUndefined)(oldFiber) && index < length; index++) {
      if (oldFiber.index > index) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }

      var child = newChildren[i];
      var newFiber = updateSlot(returnFiber, oldFiber, child);

      if ((0, _is.isNullOrUndefined)(newFiber)) {
        if ((0, _is.isNullOrUndefined)(oldFiber)) {
          oldFiber = nextOldFiber;
        }

        break;
      }

      if (shouldTrackSideEffects) {
        if (oldFiber && (0, _is.isNullOrUndefined)(newFiber.alternate)) {
          deleteChild(returnFiber, oldFiber);
        }
      }

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, index);

      if ((0, _is.isNullOrUndefined)(previousNewFiber)) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (index === newChildren.length) {
      deleteRemainingChildren(returnFiber, oldFiber);
    }

    if ((0, _is.isNullOrUndefined)(oldFiber)) {
      for (; index < length; index++) {
        var _newFiber = createChild(returnFiber, newChildren[index]);

        if ((0, _is.isNullOrUndefined)(_newFiber)) {
          continue;
        }

        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, index);

        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }

        previousNewFiber = _newFiber;
      }

      return resultingFirstChild;
    }

    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    for (; index < length; index++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, index, newChildren[index]);

      if (!(0, _is.isNullOrUndefined)(_newFiber2)) {
        if (shouldTrackSideEffects) {
          if (!(0, _is.isNullOrUndefined)(_newFiber2.alternate)) {
            existingChildren["delete"]((0, _is.isNullOrUndefined)(_newFiber2.key) ? index : _newFiber2.key);
          }
        }

        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, index);

        if ((0, _is.isNullOrUndefined)(previousNewFiber)) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }

        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  return function reconcileChildren(returnFiber, currentFirstChild, newChild) {
    if (!(0, _is.isNullOrUndefined)(newChild)) {
      if (newChild.$$typeof) {
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild));
      }
    }

    if ((0, _is.isString)(newChild) || (0, _is.isNumber)(newChild)) {
      return placeSingleChild(reconcileSingleTextElement(returnFiber, currentFirstChild, String(newChild)));
    }

    if ((0, _is.isArray)(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}

/***/ }),

/***/ "../remixjs/src/reconciler/FiberNode.js":
/*!**********************************************!*\
  !*** ../remixjs/src/reconciler/FiberNode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorkInProgress = createWorkInProgress;
exports.createFiberRoot = createFiberRoot;
exports.createFiberFromText = createFiberFromText;
exports.createFiberFromElement = createFiberFromElement;
exports.createFiberFromTypeAndProps = createFiberFromTypeAndProps;
exports.createFiber = createFiber;
exports.createFiberFromFragment = createFiberFromFragment;
exports.createFiberNode = createFiberNode;

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _workTags = __webpack_require__(/*! ../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;

  if ((0, _is.isNullOrUndefined)(workInProgress)) {
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
    workInProgress.effectTag = _effectTags.NO_EFFECT;
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  var child = current.child,
      memoizedProps = current.memoizedProps,
      memoizedState = current.memoizedState,
      updateQueue = current.updateQueue,
      sibling = current.sibling,
      status = current.status,
      index = current.index,
      ref = current.ref,
      contextDependencies = current.contextDependencies;
  workInProgress.status = status;
  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.updateQueue = updateQueue;
  workInProgress.contextDependencies = contextDependencies;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  return workInProgress;
}

function createFiberRoot(container) {
  var uninitializedFiber = createFiber(_workTags.HOST_ROOT, null, null);
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
  var fiber = createFiber(_workTags.HOST_TEXT, content, null);
  return fiber;
}

function createFiberFromElement(element) {
  var owner = null;
  owner = element._owner;
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  return fiber;
}

function createFiberFromTypeAndProps(type, key, pendingProps, owner) {
  var tag = _workTags.INDETERMINATE_COMPONENT; // let resolvedType = type;

  if ((0, _is.isFunction)(type)) {
    if ((0, _is.isComponentConstructor)(type)) {
      tag = _workTags.CLASS_COMPONENT; // resolvedType = 
    }
  } else if ((0, _is.isString)(type)) {
    tag = _workTags.HOST_COMPONENT;
  } else {}

  var fiber = createFiber(tag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = type;
  return fiber;
}

function createFiber(tag, pendingProps, key) {
  return new createFiberNode(tag, pendingProps, key);
}

function createFiberFromFragment(elements, key) {
  var fiber = createFiber(_workTags.FRAGMENT, elements, key);
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
    pendingProps: pendingProps,
    memoizedProps: null,
    memoizedState: null,
    effectTag: _effectTags.NO_EFFECT,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,
    alternate: null
  };
}

/***/ }),

/***/ "../remixjs/src/reconciler/cloneChildFibers.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/reconciler/cloneChildFibers.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cloneChildFibers;

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _FiberNode = __webpack_require__(/*! ./FiberNode */ "../remixjs/src/reconciler/FiberNode.js");

function cloneChildFibers(current, workInProgress) {
  if (!(0, _is.isNullOrUndefined)(workInProgress.child)) {
    var child = workInProgress.child;
    var newChild = (0, _FiberNode.createWorkInProgress)(child, child.pendingProps);
    workInProgress.child = newChild;
    newChild["return"] = workInProgress;

    while (!(0, _is.isNullOrUndefined)(child.sibling)) {
      child = child.sibling;
      newChild = (0, _FiberNode.createWorkInProgress)(child, child.pendingProps);
      newChild["return"] = workInProgress;
    }

    newChild.sibling = null;
  }
}

/***/ }),

/***/ "../remixjs/src/reconciler/createContainer.js":
/*!****************************************************!*\
  !*** ../remixjs/src/reconciler/createContainer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createContainer;

var _FiberNode = __webpack_require__(/*! ./FiberNode */ "../remixjs/src/reconciler/FiberNode.js");

function createContainer(container) {
  return (0, _FiberNode.createFiberRoot)(container);
}

/***/ }),

/***/ "../remixjs/src/reconciler/mountChildFibers.js":
/*!*****************************************************!*\
  !*** ../remixjs/src/reconciler/mountChildFibers.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ChildrenReconciler = _interopRequireDefault(__webpack_require__(/*! ./ChildrenReconciler */ "../remixjs/src/reconciler/ChildrenReconciler.js"));

var _default = (0, _ChildrenReconciler["default"])(false);

exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/reconciler/reconcileChildFibers.js":
/*!*********************************************************!*\
  !*** ../remixjs/src/reconciler/reconcileChildFibers.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ChildrenReconciler = _interopRequireDefault(__webpack_require__(/*! ./ChildrenReconciler */ "../remixjs/src/reconciler/ChildrenReconciler.js"));

var _default = (0, _ChildrenReconciler["default"])(true);

exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/reconciler/reconcileChildren.js":
/*!******************************************************!*\
  !*** ../remixjs/src/reconciler/reconcileChildren.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reconcileChildren;

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _mountChildFibers = _interopRequireDefault(__webpack_require__(/*! ./mountChildFibers */ "../remixjs/src/reconciler/mountChildFibers.js"));

var _reconcileChildFibers = _interopRequireDefault(__webpack_require__(/*! ./reconcileChildFibers */ "../remixjs/src/reconciler/reconcileChildFibers.js"));

function reconcileChildren(current, workInProgress, nextChild) {
  if ((0, _is.isNullOrUndefined)(current)) {
    workInProgress.child = (0, _mountChildFibers["default"])(workInProgress, (0, _is.isNullOrUndefined)(current) ? null : current.child, nextChild);
  } else {
    workInProgress.child = (0, _reconcileChildFibers["default"])(workInProgress, (0, _is.isNullOrUndefined)(current) ? null : current.child, nextChild);
  }
}

/***/ }),

/***/ "../remixjs/src/reconciler/updateContainer.js":
/*!****************************************************!*\
  !*** ../remixjs/src/reconciler/updateContainer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateContainer;

var _scheduleRootUpdate = _interopRequireDefault(__webpack_require__(/*! ../scheduler/scheduleRootUpdate */ "../remixjs/src/scheduler/scheduleRootUpdate.js"));

function updateContainer(element, root, callback) {
  var current = root.current;
  return (0, _scheduleRootUpdate["default"])(current, element, callback);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/appendAllChildren.js":
/*!***********************************************************!*\
  !*** ../remixjs/src/renderer/config/appendAllChildren.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendAllChildren;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _appendInitialChild = _interopRequireDefault(__webpack_require__(/*! ./appendInitialChild */ "../remixjs/src/renderer/config/appendInitialChild.js"));

function appendAllChildren(instance, workInProgress) {
  var node = workInProgress.child;

  while (!(0, _is.isNullOrUndefined)(node)) {
    if (node.tag === _workTags.HOST_COMPONENT || node.tag === _workTags.HOST_TEXT) {
      (0, _appendInitialChild["default"])(instance, node.stateNode);
    } else if (node.tag === _workTags.FundamentalComponent) {
      (0, _appendInitialChild["default"])(instance, node.stateNode.instance);
    } else if (node.tag === _workTags.HOST_PORTAL) {// If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (!(0, _is.isNullOrUndefined)(node.child)) {
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

/***/ "../remixjs/src/renderer/config/appendChildToContainer.js":
/*!****************************************************************!*\
  !*** ../remixjs/src/renderer/config/appendChildToContainer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendChildToContainer;

var _HTMLNodeType = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

function appendChildToContainer(container, child) {
  var parentNode;

  if (container.nodeType === _HTMLNodeType.COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }

  var reactRootContainer = container._reactRootContainer;

  if ((0, _is.isNullOrUndefined)(reactRootContainer) && (0, _is.isNullOrUndefined)(parentNode.onclick)) {// trapClickOnNonInteractiveElement(parentNode);
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/appendInitialChild.js":
/*!************************************************************!*\
  !*** ../remixjs/src/renderer/config/appendInitialChild.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendInitialChild;

function appendInitialChild(parent, child) {
  parent.appendChild(child);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/createElement.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/renderer/config/createElement.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElement;

var _HTMLNodeType = __webpack_require__(/*! ../../shared/HTMLNodeType */ "../remixjs/src/shared/HTMLNodeType.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === _HTMLNodeType.DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
}

function createElement(type, props, rootContainerElement) {
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var element;

  if ((0, _is.isString)(props.is)) {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createInstance;

var _createElement = _interopRequireDefault(__webpack_require__(/*! ./createElement */ "../remixjs/src/renderer/config/createElement.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

function createInstance(type, props, rootContainerInstance, context, workInProgress) {
  var children = props.children;
  var document = rootContainerInstance.ownerDocument;
  var element = document.createElement(type, props, rootContainerInstance);
  element[_shared.INTERNAL_INSTANCE_KEY] = workInProgress;
  element[_shared.INTERNAL_EVENT_HANDLERS_KEY] = props;
  return element;
}

/***/ }),

/***/ "../remixjs/src/renderer/config/properties.js":
/*!****************************************************!*\
  !*** ../remixjs/src/renderer/config/properties.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperty = getProperty;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../remixjs/node_modules/@babel/runtime/helpers/slicedToArray.js"));

var properties = {};
[['className', 'class']].forEach(function (_ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      propertyName = _ref2[0],
      attributeName = _ref2[1];

  properties[propertyName] = createProperty(propertyName, null, attributeName);
});

function createProperty(propertyName, type, attributeName) {
  return {
    type: type,
    propertyName: propertyName,
    attributeName: attributeName
  };
}

function getProperty(name) {
  return properties[name];
}

/***/ }),

/***/ "../remixjs/src/renderer/config/setDOMProperties.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/renderer/config/setDOMProperties.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setInitialDOMProperties;
exports.setInnerHTML = setInnerHTML;
exports.setValueForStyles = setValueForStyles;
exports.setTextContent = setTextContent;
exports.setValueForProperty = setValueForProperty;

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _ensureListeningTo = _interopRequireDefault(__webpack_require__(/*! ../../event/ensureListeningTo */ "../remixjs/src/event/ensureListeningTo.js"));

var _registrationNameModules = _interopRequireDefault(__webpack_require__(/*! ../../event/registrationNameModules */ "../remixjs/src/event/registrationNameModules.js"));

var _properties = __webpack_require__(/*! ./properties */ "../remixjs/src/renderer/config/properties.js");

function setInitialDOMProperties(tag, element, rootContainerElement, nextProps) {
  for (var propName in nextProps) {
    if (nextProps.hasOwnProperty(propName)) {
      var nextProp = nextProps[propName];

      if (propName === _shared.STYLE) {
        if (nextProp) {
          Object.freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === _shared.DANGEROUSLY_SET_INNER_HTML) {
        var nextHtml = nextProp ? nextProp[_shared.HTML] : undefined;

        if (!(0, _is.isNullOrUndefined)(nextHtml)) {
          setInnerHTML(element, nextHtml);
        }
      } else if (propName === _shared.CHILDREN) {
        if ((0, _is.isString)(nextProp)) {
          var canSetTextContent = tag !== 'textarea' || nextProp !== '';

          if (canSetTextContent) {
            setTextContent(element, nextProp);
          }
        } else if ((0, _is.isNumber)(nextProp)) {
          setTextContent(element, String(nextProp));
        }
      } else if (_registrationNameModules["default"].hasOwnProperty(propName)) {
        if ((0, _is.isNullOrUndefined)(nextProp)) {
          (0, _ensureListeningTo["default"])(rootContainerElement, propName);
        }
      } else if (!(0, _is.isNullOrUndefined)(nextProp)) {
        setValueForProperty(element, propName, nextProp);
      }
    }
  }
}

function setInnerHTML() {}

function setValueForStyles(element, nextProp) {
  var style = element.style;

  for (var styleName in styles) {
    if (styles.hasOwnProperty(styleName)) {
      var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);

      if (styleName === _shared.STYLE_NAME_FLOAT) {
        styleName = 'cssFloat';
      }
    }

    style[styleName] = styleValue;
  }
}

function setTextContent(element, content) {
  element.innerText = content;
}

function setValueForProperty(element, propName, nextProp) {
  var property = (0, _properties.getProperty)(propName);

  if (property) {
    element.setAttribute(property.attributeName, nextProp);
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/setInitialProperties.js":
/*!**************************************************************!*\
  !*** ../remixjs/src/renderer/config/setInitialProperties.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setInitialProperties;

var _setDOMProperties = _interopRequireDefault(__webpack_require__(/*! ./setDOMProperties */ "../remixjs/src/renderer/config/setDOMProperties.js"));

function setInitialProperties(element, tag, nextProps, rootContainerInstance) {
  var props;

  switch (tag) {
    default:
      props = nextProps;
  }

  (0, _setDOMProperties["default"])(tag, element, rootContainerInstance, props);
}

/***/ }),

/***/ "../remixjs/src/renderer/config/updateDOMProperties.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/renderer/config/updateDOMProperties.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateDOMProperties;

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _setDOMProperties = __webpack_require__(/*! ./setDOMProperties */ "../remixjs/src/renderer/config/setDOMProperties.js");

function updateDOMProperties(element, updateQueue) {
  for (var i = 0; i < updateQueue.length; i += 2) {
    var propKey = updateQueue[i];
    var propValue = updateQueue[i + 1];

    if (propKey === _shared.STYLE) {
      (0, _setDOMProperties.setValueForStyles)(element, propValue);
    } else if (propKey === _shared.DANGEROUSLY_SET_INNER_HTML) {
      (0, _setDOMProperties.setInnerHTML)(element, propValue);
    } else if (propKey === _shared.CHILDREN) {
      (0, _setDOMProperties.setTextContent)(element, propValue);
    } else {
      (0, _setDOMProperties.setValueForProperty)(element, propKey, propValue, isCustomComponentTag);
    }
  }
}

/***/ }),

/***/ "../remixjs/src/renderer/config/updateProperties.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/renderer/config/updateProperties.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateProperties;

var _updateDOMProperties = _interopRequireDefault(__webpack_require__(/*! ./updateDOMProperties */ "../remixjs/src/renderer/config/updateDOMProperties.js"));

function updateProperties(instance, updateQueue, tag, props, nextProps) {
  (0, _updateDOMProperties["default"])(instance, updateQueue);
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
var _default = {
  isRootRendering: false
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/scheduler/scheduleRootUpdate.js":
/*!******************************************************!*\
  !*** ../remixjs/src/scheduler/scheduleRootUpdate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = scheduleRootUpdate;

var _is = __webpack_require__(/*! ../shared/is */ "../remixjs/src/shared/is.js");

var _scheduleWork = _interopRequireDefault(__webpack_require__(/*! ./worker/scheduleWork */ "../remixjs/src/scheduler/worker/scheduleWork.js"));

var _enqueueUpdate = _interopRequireDefault(__webpack_require__(/*! ./updater/enqueueUpdate */ "../remixjs/src/scheduler/updater/enqueueUpdate.js"));

var _createUpdate = _interopRequireDefault(__webpack_require__(/*! ./updater/createUpdate */ "../remixjs/src/scheduler/updater/createUpdate.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/index.js"));

function scheduleRootUpdate(current, element, callback) {
  var update = (0, _createUpdate["default"])();
  update.payload = {
    element: element
  };

  if ((0, _is.isFunction)(callback)) {
    update.callback = callback;
  }

  _index["default"].isRootRendering = true;
  (0, _enqueueUpdate["default"])(current, update);
  (0, _scheduleWork["default"])(current, element);
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/appendUpdateToQueue.js":
/*!***************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/appendUpdateToQueue.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendUpdateToQueue;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

function appendUpdateToQueue(queue, update) {
  if ((0, _is.isNullOrUndefined)(queue.lastUpdate)) {
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/classComponentUpdater.js":
/*!*****************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/classComponentUpdater.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _updateTags = __webpack_require__(/*! ../../shared/updateTags */ "../remixjs/src/shared/updateTags.js");

var _scheduleWork = _interopRequireDefault(__webpack_require__(/*! ../worker/scheduleWork */ "../remixjs/src/scheduler/worker/scheduleWork.js"));

var _createUpdate = _interopRequireDefault(__webpack_require__(/*! ./createUpdate */ "../remixjs/src/scheduler/updater/createUpdate.js"));

var _enqueueUpdate = _interopRequireDefault(__webpack_require__(/*! ./enqueueUpdate */ "../remixjs/src/scheduler/updater/enqueueUpdate.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var classComponentUpdater = {
  isMounted: function isMounted(Component) {
    return instance._reactInternalFiber ? true : false;
  },
  enqueueSetState: function enqueueSetState(instance, payload, callback) {
    var fiber = instance._reactInternalFiber;
    var update = (0, _createUpdate["default"])();
    update.payload = payload;

    if ((0, _is.isFunction)(callback)) {
      update.callback = callback;
    }

    fiber.status = _shared.WORKING;
    (0, _enqueueUpdate["default"])(fiber, update);
    (0, _scheduleWork["default"])(fiber);
  },
  enqueueReplaceState: function enqueueReplaceState(instance, payload, callback) {
    var fiber = instance[_shared.REACT_INTERNAL_FIBER];
    var update = (0, _createUpdate["default"])();
    update.tag = _updateTags.REPLACE_STATE;
    update.payload = payload;

    if ((0, _is.isFunction)(callback)) {
      update.callback = callback;
    }

    fiber.status = _shared.WORKING;
    (0, _enqueueUpdate["default"])(fiber, update);
    (0, _scheduleWork["default"])(fiber);
  },
  enqueueForceUpdate: function enqueueForceUpdate(instance, callback) {
    var fiber = instance[_shared.REACT_INTERNAL_FIBER];
    var update = (0, _createUpdate["default"])();
    update.tag = _updateTags.FORCE_UPDATE;
    fiber.status = _shared.WORKING;

    if ((0, _is.isFunction)(callback)) {
      update.callback = callback;
    }

    (0, _enqueueUpdate["default"])(fiber, update);
    (0, _scheduleWork["default"])(fiber);
  }
};
var _default = classComponentUpdater;
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/scheduler/updater/cloneUpdateQueue.js":
/*!************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/cloneUpdateQueue.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cloneUpdateQueue;

function cloneUpdateQueue(queue) {
  return {
    baseState: queue.baseState,
    firstUpdate: queue.firstUpdate,
    lastUpdate: queue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/createUpdate.js":
/*!********************************************************!*\
  !*** ../remixjs/src/scheduler/updater/createUpdate.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createUpdate;

var _updateTags = __webpack_require__(/*! ../../shared/updateTags */ "../remixjs/src/shared/updateTags.js");

function createUpdate() {
  return {
    tag: _updateTags.UPDATE_STATE,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/createUpdateQueue.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/createUpdateQueue.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createUpdateQueue;

function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/enqueueUpdate.js":
/*!*********************************************************!*\
  !*** ../remixjs/src/scheduler/updater/enqueueUpdate.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = enqueueUpdate;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _createUpdateQueue = _interopRequireDefault(__webpack_require__(/*! ./createUpdateQueue */ "../remixjs/src/scheduler/updater/createUpdateQueue.js"));

var _appendUpdateToQueue = _interopRequireDefault(__webpack_require__(/*! ./appendUpdateToQueue */ "../remixjs/src/scheduler/updater/appendUpdateToQueue.js"));

function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  var firstQueue;
  var secondQueue;

  if ((0, _is.isNullOrUndefined)(alternate)) {
    firstQueue = fiber.updateQueue;
    secondQueue = null;

    if ((0, _is.isNullOrUndefined)(firstQueue)) {
      firstQueue = (0, _createUpdateQueue["default"])(fiber.memoizedState);
      fiber.updateQueue = firstQueue;
    }
  } else {
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;
  }

  if ((0, _is.isNullOrUndefined)(secondQueue) || firstQueue === secondQueue) {
    (0, _appendUpdateToQueue["default"])(firstQueue, update);
  } else {
    if ((0, _is.isNullOrUndefined)(firstQueue.lastUpdate) || (0, _is.isNullOrUndefined)(secondQueue.lastUpdate)) {
      (0, _appendUpdateToQueue["default"])(firstQueue, update);
      (0, _appendUpdateToQueue["default"])(secondQueue, update);
    } else {
      (0, _appendUpdateToQueue["default"])(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/index.js":
/*!*************************************************!*\
  !*** ../remixjs/src/scheduler/updater/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  isForceUpdate: false
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/scheduler/updater/mountIndeterminateComponent.js":
/*!***********************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/mountIndeterminateComponent.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mountIndeterminateComponent;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _reconcileChildren = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/reconcileChildren */ "../remixjs/src/reconciler/reconcileChildren.js"));

function mountIndeterminateComponent(current, workInProgress, Component) {
  if (!(0, _is.isNullOrUndefined)(current)) {
    current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= _effectTags.PLACEMENT;
  }

  var nextProps = workInProgress.pendingProps;
  var context; // if (!disableLegacyContext) {
  //   var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
  //   context = getMaskedContext(workInProgress, unmaskedContext);
  // }
  // prepareToReadContext(workInProgress, renderExpirationTime);

  workInProgress.effectTag |= _effectTags.PERFORMED_WORK;
  workInProgress.tag = _workTags.FUNCTION_COMPONENT; // const children = Component(nextProps, context);
  // reconcileChildren(null, workInProgress, null);

  return workInProgress;
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/processUpdateQueue.js":
/*!**************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/processUpdateQueue.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = processUpdateQueue;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _cloneUpdateQueue = _interopRequireDefault(__webpack_require__(/*! ./cloneUpdateQueue */ "../remixjs/src/scheduler/updater/cloneUpdateQueue.js"));

var _updateTags = __webpack_require__(/*! ../../shared/updateTags */ "../remixjs/src/shared/updateTags.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function processUpdateQueue(workInProgress, queue, props, instance) {
  // copy queue
  if (!(0, _is.isNullOrUndefined)(workInProgress.alternate)) {
    if (queue === workInProgress.alternate.updateQueue) {
      queue = workInProgress.updateQueue = (0, _cloneUpdateQueue["default"])(queue);
    }
  }

  var update = queue.firstUpdate;
  var state = queue.baseState;

  while (!(0, _is.isNullOrUndefined)(update)) {
    state = getStateFromUpdate(workInProgress, queue, update, state, props, instance);
    var callback = update.callback;

    if ((0, _is.isFunction)(callback)) {
      workInProgress.effectTag |= _effectTags.CALLBACK;
      update.nextEffet = null;

      if ((0, _is.isNullOrUndefined)(queue.lastEffect)) {
        queue.firstEffect = queue.lastEffect = update;
      } else {
        queue.lastEffect.nextEffect = update;
        queue.lastEffect = update;
      }
    }

    update = update.next;
  }

  queue.firstUpdate = null;
  queue.lastUpdate = null;
  queue.baseState = state;
  workInProgress.memoizedState = state;
}

function getStateFromUpdate(workInProgress, queue, update, state, nextProps, instance) {
  var tag = update.tag;

  switch (tag) {
    case _updateTags.UPDATE_STATE:
      {
        var payload = update.payload;
        var partialState;

        if ((0, _is.isFunction)(payload)) {
          partialState = payload.call(instance, state, nextProps);
        } else {
          partialState = payload;
        }

        if ((0, _is.isNullOrUndefined)(partialState)) {
          return state;
        }

        return _objectSpread({}, state, {}, partialState);
      }
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateClassComponent.js":
/*!****************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateClassComponent.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateClassComponent;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _classComponentUpdater = _interopRequireDefault(__webpack_require__(/*! ./classComponentUpdater */ "../remixjs/src/scheduler/updater/classComponentUpdater.js"));

var _processUpdateQueue = _interopRequireDefault(__webpack_require__(/*! ./processUpdateQueue */ "../remixjs/src/scheduler/updater/processUpdateQueue.js"));

var _reconcileChildren = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/reconcileChildren */ "../remixjs/src/reconciler/reconcileChildren.js"));

var _ReactCurrentOwner = _interopRequireDefault(__webpack_require__(/*! ../../react/ReactCurrentOwner */ "../remixjs/src/react/ReactCurrentOwner.js"));

var _context = _interopRequireDefault(__webpack_require__(/*! ../../context */ "../remixjs/src/context/index.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/updater/index.js"));

var _getUnmaskedContext = _interopRequireDefault(__webpack_require__(/*! ../../context/getUnmaskedContext */ "../remixjs/src/context/getUnmaskedContext.js"));

var _getMaskedContext = _interopRequireDefault(__webpack_require__(/*! ../../context/getMaskedContext */ "../remixjs/src/context/getMaskedContext.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function constructClassInstance(workInProgress, Component, props) {
  var ctx = _shared.EMPTY_CONTEXT;

  if (!_context["default"].disableLegacyContext) {
    var unmaskedContext = (0, _getUnmaskedContext["default"])(workInProgress, Component, true);

    if ((0, _is.isLegacyContextConsumer)(Component)) {
      ctx = (0, _getMaskedContext["default"])(workInProgress, unmaskedContext);
    } else {
      ctx = _shared.EMPTY_CONTEXT;
    }
  }

  var instance = new Component(props, ctx);

  if ((0, _is.isNullOrUndefined)(instance.state)) {
    workInProgress.memoizedState = null;
  } else {
    workInProgress.memoizedState = instance.state;
  }

  instance.updater = _classComponentUpdater["default"];
  workInProgress.stateNode = instance;
  instance[_shared.REACT_INTERNAL_FIBER] = workInProgress;
  return instance;
}

function mountClassInstance(workInProgress, Component, props) {
  var instance = workInProgress.stateNode;
  var hasContext = false;
  instance.props = props;
  instance.state = workInProgress.memoizedState;
  instance.refs = _shared.EMPTY_OBJECT; // context

  var updateQueue = workInProgress.updateQueue;

  if (!(0, _is.isNullOrUndefined)(updateQueue)) {
    (0, _processUpdateQueue["default"])(workInProgress, updateQueue, props, instance);
    instance.state = workInProgress.memoizedState;
  }

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var isDerivedStateFunction = (0, _is.isFunction)(getDerivedStateFromProps);

  if (isDerivedStateFunction) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    instance.state = workInProgress.memoizedState;
  }

  var getSnapshotBeforeUpdate = instance.getSnapshotBeforeUpdate,
      UNSAFE_componentWillMount = instance.UNSAFE_componentWillMount,
      componentWillMount = instance.componentWillMount,
      componentDidMount = instance.componentDidMount;

  if (!isDerivedStateFunction && !(0, _is.isFunction)(getSnapshotBeforeUpdate) && ((0, _is.isFunction)(UNSAFE_componentWillMount) || (0, _is.isFunction)(componentWillMount))) {
    callComponentWillMount(workInProgress, instance);
    updateQueue = workInProgress.updateQueue;

    if (!(0, _is.isNullOrUndefined)(updateQueue)) {
      (0, _processUpdateQueue["default"])(workInProgress, updateQueue, props, instance);
      instance.state = workInProgress.memoizedState;
    }
  }

  if ((0, _is.isFunction)(componentDidMount)) {
    workInProgress.effectTag |= _effectTags.UPDATE;
  }
}

function updateClassInstance(current, workInProgress, Component, nextProps) {
  var instance = workInProgress.stateNode;
  var props = workInProgress.memoizedProps;
  instance.props = workInProgress.type === workInProgress.elementType ? props : (0, _shared.resolveDefaultProps)(workInProgress.type, props);
  var context = instance.context;
  var contextTypes = Component.contextTypes;
  var nextContext = _shared.EMPTY_CONTEXT;

  if (!(0, _is.isNullOrUndefined)(contextTypes)) {
    nextContext = {};
  } else if (false) {}

  var getDerivedStateFromProps = Component.getDerivedStateFromProps;
  var hasNewLifecycles = (0, _is.isFunction)(getDerivedStateFromProps) || (0, _is.isFunction)(instance.getSnapshotBeforeUpdate);

  if (!hasNewLifecycles) {
    callComponentWillReceiveProps(instance, nextProps, nextContext);
  }

  var state = workInProgress.memoizedState;
  var updateQueue = workInProgress.updateQueue;
  var newState = instance.state = state;

  if (!(0, _is.isNullOrUndefined)(updateQueue)) {
    (0, _processUpdateQueue["default"])(workInProgress, updateQueue, nextProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (props === nextProps && state === newState) {
    if ((0, _is.isFunction)(instance.componentDidUpdate)) {
      if (props !== current.memoizedProps || state !== current.memoizedState) {
        workInProgress.effectTag |= Update;
      }
    }

    if ((0, _is.isFunction)(instance.getSnapshotBeforeUpdate)) {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Snapshot;
      }
    }

    return false;
  }

  if ((0, _is.isFunction)(getDerivedStateFromProps)) {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = _index["default"].isForceUpdate || callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext);

  if (shouldUpdate) {
    var componentWillMount = instance.UNSAFE_componentWillMount || instance.componentWillMount;

    if (!hasNewLifecycles && (0, _is.isFunction)(componentWillMount)) {
      componentWillMount.call(instance);
    }

    if ((0, _is.isFunction)(instance.componentDidMount)) {
      workInProgress.effectTag |= _effectTags.UPDATE;
    }
  } else {
    if ((0, _is.isFunction)(instance.componentDidMount)) {
      workInProgress.effectTag |= _effectTags.UPDATE;
    }

    workInProgress.memoizedProps = nextProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = nextProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext) {
  var instance = workInProgress.stateNode;
  var didCaptureError = workInProgress.effectTag & _effectTags.DID_CAPTURE === _effectTags.NO_EFFECT;
  _ReactCurrentOwner["default"].current = workInProgress;
  workInProgress.effectTag |= _effectTags.PERFORMED_WORK;
  var nextChildren;

  if (didCaptureError && !(0, _is.isFunction)(Component.getDerivedStateFromError)) {} else {
    nextChildren = instance.render();
  }

  workInProgress.effectTag |= _effectTags.PERFORMED_WORK;

  if (!(0, _is.isNull)(current) && didCaptureError) {// 
  } else {
    (0, _reconcileChildren["default"])(current, workInProgress, nextChildren);
  }

  workInProgress.memoizedState = instance.state;

  if (hasContext) {
    _context["default"].invalidateProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function callShouldComponentUpdate(workInProgress, Component, props, nextProps, state, newState, nextContext) {
  var instance = workInProgress.stateNode;

  if ((0, _is.isFunction)(instance.shouldComponentUpdate)) {
    var shouldUpdate = instance.shouldComponentUpdate(nextProps, newState, nextContext);
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !(0, _shared.shallowEqual)(props, nextProps) || !(0, _shared.shallowEqual)(state, newState);
  }

  return true;
}

function callComponentWillReceiveProps(instance, nextProps, nextContext) {
  var componentWillReceiveProps = instance.UNSAFE_componentWillReceiveProps || instance.componentWillReceiveProps;

  if ((0, _is.isFunction)(componentWillReceiveProps)) {
    var state = instance.state;
    componentWillReceiveProps.call(instance, instance.pendingProps, nextContext);

    if (instance.state !== state) {
      _classComponentUpdater["default"].enqueueReplaceState(instance, instance.state, null);
    }
  }
}

function callComponentWillMount(workInProgress, instance) {
  var state = instance.state;
  var componentWillMount = instance.UNSAFE_componentWillMount || instance.componentWillMount;

  if ((0, _is.isFunction)(instance.componentWillMount)) {
    componentWillMount.call(instance);
  }

  if (state !== instance.state) {
    _classComponentUpdater["default"].enqueueReplaceState(instance, instance.state, null);
  }
}

function applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props) {
  var state = workInProgress.memoizedState;
  var partialState = getDerivedStateFromProps(props, state);
  workInProgress.memoizedState = (0, _is.isNullOrUndefined)(partialState) ? state : _objectSpread({}, state, {
    partialState: partialState
  });
  var updateQueue = workInProgress.updateQueue;

  if (!(0, _is.isNull)(updateQueue) && workInProgress.isNoWork) {
    updateQueue.baseState = workInProgress.memoizedState;
  }
}

function updateClassComponent(current, workInProgress) {
  var Component = workInProgress.type;
  var unresolvedProps = workInProgress.pendingProps;
  var resolvedProps = workInProgress.elementType === Component ? unresolvedProps : (0, _shared.resolveDefaultProps)(Component, unresolvedProps);
  var instance = workInProgress.stateNode;
  var hasContext = false;
  var shouldUpdate;

  if ((0, _is.isContextProvider)(Component)) {
    hasContext = true;

    _context["default"].pushProvider(workInProgress);
  }

  if ((0, _is.isNullOrUndefined)(instance)) {
    if (!(0, _is.isNullOrUndefined)(current)) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= _effectTags.PLACEMENT;
    }

    constructClassInstance(workInProgress, Component, resolvedProps);
    mountClassInstance(workInProgress, Component, resolvedProps);
    shouldUpdate = true;
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, resolvedProps);
  }

  return finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext);
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateFunctionComponent.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateFunctionComponent.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateFunctionComponent;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _cloneChildFibers = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/cloneChildFibers */ "../remixjs/src/reconciler/cloneChildFibers.js"));

var _reconcileChildren = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/reconcileChildren */ "../remixjs/src/reconciler/reconcileChildren.js"));

function updateFunctionComponent(current, workInProgress) {
  var Component = workInProgress.type;
  var unresolvedProps = workInProgress.pendingProps;
  var nextProps = (0, _shared.resolveDefaultProps)(Component, unresolvedProps);
  var context;

  if (!(0, _is.isNullOrUndefined)(current)) {
    var props = current.memorizedProps;

    if ((0, _shared.shallowEqual)(props, nextProps) && current.ref === workInProgress.ref) {
      (0, _cloneChildFibers["default"])(current, workInProgress);
      return workInProgress.child;
    }
  }

  var children = callFunctionComponent(Component, nextProps, context);
  workInProgress.effectTag |= _effectTags.PERFORMED_WORK;
  (0, _reconcileChildren["default"])(current, workInProgress, children);
  return workInProgress.child;
}

function callFunctionComponent(Component, nextProps, context) {
  return Component(nextProps, context);
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateHostComponent.js":
/*!***************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateHostComponent.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateHostComponent;

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _reconcileChildren = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/reconcileChildren */ "../remixjs/src/reconciler/reconcileChildren.js"));

function updateHostComponent(current, workInProgress) {
  // pushHostContext(workInProgress);
  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var props = !(0, _is.isNullOrUndefined)(current) ? current.memoizedProps : null;
  var nextChildren = nextProps.children;
  var isDirectTextChild = (0, _shared.shouldSetTextContent)(type, nextProps);

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (!(0, _is.isNullOrUndefined)(props) && (0, _shared.shouldSetTextContent)(type, props)) {
    workInProgress.effectTag |= _effectTags.CONTENT_RESET;
  }

  var ref = workInProgress.ref;

  if (!(0, _is.isNullOrUndefined)(current) && !(0, _is.isNullOrUndefined)(ref) || !(0, _is.isNullOrUndefined)(current) && current.ref !== ref) {
    workInProgress.effectTag |= _effectTags.REF;
  }

  (0, _reconcileChildren["default"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateHostInstance.js":
/*!**************************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateHostInstance.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateHostInstance;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../remixjs/node_modules/@babel/runtime/helpers/defineProperty.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _elementTags = __webpack_require__(/*! ../../shared/elementTags */ "../remixjs/src/shared/elementTags.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _registrationNameModules = _interopRequireDefault(__webpack_require__(/*! ../../event/registrationNameModules */ "../remixjs/src/event/registrationNameModules.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function updateHostInstance(current, workInProgress, type, nextProps, rootContainerInstance) {
  var props = current.memoizedProps;

  if (props !== nextProps) {
    var instance = workInProgress.stateNode;
    var updatePayload = prepareUpdate(instance, type, props, nextProps, rootContainerInstance, null);
    workInProgress.updateQueue = updatePayload;
    workInProgress.effectTag |= _effectTags.UPDATE;
  }
}

function prepareUpdate(element, type, props, nextProps, rootContainerInstance, hostContext) {
  return diffProperties(element, type, props, nextProps, rootContainerInstance);
}

function getInputHostProps(elements, props) {
  var node = elements;
  var checked = props.checked;
  return _objectSpread({}, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: (0, _is.isNullOrUndefined)(checked) ? checked : node._wrapperState.initialChecked
  });
}

function getTextAreaHostProps(elements, props) {
  var node = elements;
  return _objectSpread({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: String(node._wrapperState.initialValue)
  });
}

function diffProperties(elements, tag, lastRawProps, nextRawProps, rootContainerInstance) {
  var updatePayload = null;
  var lastProps;
  var nextProps;

  switch (tag) {
    case _elementTags.INPUT:
      lastProps = getInputHostProps(elements, lastRawProps);
      nextProps = getInputHostProps(elements, nextRawProps);
      updatePayload = [];
      break;

    case _elementTags.TEXTAREA:
      lastProps = getTextAreaHostProps(elements, lastRawProps);
      nextProps = getTextAreaHostProps(elements, nextRawProps);
      updatePayload = [];
      break;

    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps; // if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
      //   // TODO: This cast may not be sound for SVG, MathML or custom elements.
      //   trapClickOnNonInteractiveElement(domElement);
      // }

      break;
  }

  var propKey;
  var styleName;
  var styleUpdates = null;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || (0, _is.isNullOrUndefined)(lastProps[propKey])) {
      continue;
    }

    if (propKey === _shared.STYLE) {
      var lastStyle = lastProps[propKey];

      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }

          styleUpdates[styleName] = '';
        }
      }
    } else if (_registrationNameModules["default"].hasOwnProperty(propKey)) {
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }

  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = !(0, _is.isNullOrUndefined)(lastProps) ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (0, _is.isNullOrUndefined)(nextProp) && (0, _is.isNullOrUndefined)(lastProp)) {
      continue;
    }

    if (propKey === _shared.STYLE) {
      if (nextProp) {
        Object.freeze(nextProp);
      }

      if (lastProp) {
        for (styleName in lastProp) {
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
            if (!styleUpdates) {
              styleUpdates = {};
            }

            styleUpdates[styleName] = '';
          }
        }

        for (styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            if (!styleUpdates) {
              styleUpdates = {};
            }

            styleUpdates[styleName] = nextProp[styleName];
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
    } else if (propKey === _shared.DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      var lastHtml = lastProp ? lastProp[HTML] : undefined;

      if (!(0, _is.isNullOrUndefined)(nextHtml)) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
        }
      }
    } else if (propKey === _shared.CHILDREN) {
      if (lastProp !== nextProp && ((0, _is.isString)(nextProp) || (0, _is.isNumber)(nextProp))) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else if (_registrationNameModules["default"].hasOwnProperty(propKey)) {
      if (!(0, _is.isNullOrUndefined)(nextProp)) {
        ensureListeningTo(rootContainerInstance, propKey);
      }

      if (!updatePayload && lastProp !== nextProp) {
        updatePayload = [];
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }

  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(_shared.STYLE, styleUpdates);
  }

  return updatePayload;
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateHostRoot.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateHostRoot.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateHostRoot;

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _pushHostRootContext = _interopRequireDefault(__webpack_require__(/*! ../../context/pushHostRootContext */ "../remixjs/src/context/pushHostRootContext.js"));

var _reconcileChildren = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/reconcileChildren */ "../remixjs/src/reconciler/reconcileChildren.js"));

var _processUpdateQueue = _interopRequireDefault(__webpack_require__(/*! ./processUpdateQueue */ "../remixjs/src/scheduler/updater/processUpdateQueue.js"));

var _cloneChildFibers = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/cloneChildFibers */ "../remixjs/src/reconciler/cloneChildFibers.js"));

function updateHostRoot(current, workInProgress) {
  // pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;
  var pendingProps = workInProgress.pendingProps;
  var memoizedState = workInProgress.memoizedState;
  var children = !(0, _is.isNullOrUndefined)(memoizedState) ? memoizedState.element : null;
  (0, _processUpdateQueue["default"])(workInProgress, updateQueue, pendingProps, null);
  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  (0, _reconcileChildren["default"])(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function bailoutOnAlreadyFinishedWork(current, workInProgress) {
  if (!(0, _is.isNullOrUndefined)(current)) {
    workInProgress.firstContextDependency = current.firstContextDependency;
  }

  (0, _cloneChildFibers["default"])(current, workInProgress);
  return workInProgress.child;
}

/***/ }),

/***/ "../remixjs/src/scheduler/updater/updateHostText.js":
/*!**********************************************************!*\
  !*** ../remixjs/src/scheduler/updater/updateHostText.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateHostText;

function updateHostText(current, workInProgress) {
  var nextProps = workInProgress.pendingProps;
  workInProgress.memoizedProps = nextProps;
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/beginWork.js":
/*!****************************************************!*\
  !*** ../remixjs/src/scheduler/worker/beginWork.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = beginWork;

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _cloneChildFibers = _interopRequireDefault(__webpack_require__(/*! ../../reconciler/cloneChildFibers */ "../remixjs/src/reconciler/cloneChildFibers.js"));

var _updateClassComponent = _interopRequireDefault(__webpack_require__(/*! ../updater/updateClassComponent */ "../remixjs/src/scheduler/updater/updateClassComponent.js"));

var _updateFunctionComponent = _interopRequireDefault(__webpack_require__(/*! ../updater/updateFunctionComponent */ "../remixjs/src/scheduler/updater/updateFunctionComponent.js"));

var _mountIndeterminateComponent = _interopRequireDefault(__webpack_require__(/*! ../updater/mountIndeterminateComponent */ "../remixjs/src/scheduler/updater/mountIndeterminateComponent.js"));

var _updateHostComponent = _interopRequireDefault(__webpack_require__(/*! ../updater/updateHostComponent */ "../remixjs/src/scheduler/updater/updateHostComponent.js"));

var _updateHostRoot = _interopRequireDefault(__webpack_require__(/*! ../updater/updateHostRoot */ "../remixjs/src/scheduler/updater/updateHostRoot.js"));

var _updateHostText = _interopRequireDefault(__webpack_require__(/*! ../updater/updateHostText */ "../remixjs/src/scheduler/updater/updateHostText.js"));

function beginWork(current, workInProgress) {
  var tag = workInProgress.tag;

  if (!(0, _is.isNullOrUndefined)(current)) {
    var props = workInProgress.memoizedProps;
    var nextProps = workInProgress.pendingProps;

    if (props === nextProps && workInProgress.type === current.type) {
      if (workInProgress.status === _shared.NO_WORK) {
        (0, _cloneChildFibers["default"])(current, workInProgress);
        return workInProgress.child;
      }
    }
  }

  workInProgress.status = _shared.NO_WORK;

  switch (tag) {
    case _workTags.INDETERMINATE_COMPONENT:
      {
        return (0, _mountIndeterminateComponent["default"])(current, workInProgress, workInProgress.type);
      }

    case _workTags.HOST_ROOT:
      {
        return (0, _updateHostRoot["default"])(current, workInProgress);
      }

    case _workTags.CLASS_COMPONENT:
      {
        return (0, _updateClassComponent["default"])(current, workInProgress);
      }

    case _workTags.HOST_COMPONENT:
      {
        return (0, _updateHostComponent["default"])(current, workInProgress);
      }

    case _workTags.FUNCTION_COMPONENT:
      {
        return (0, _updateFunctionComponent["default"])(current, workInProgress);
      }

    case _workTags.HOST_TEXT:
      {
        return (0, _updateHostText["default"])(current, workInProgress);
      }
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitAllHostEffects.js":
/*!**********************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitAllHostEffects.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitAllHostEffects;

var _effectTags = __webpack_require__(/*! ../../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _commitPlacement = _interopRequireDefault(__webpack_require__(/*! ./commitPlacement */ "../remixjs/src/scheduler/worker/commit/commitPlacement.js"));

var _commitWork = _interopRequireDefault(__webpack_require__(/*! ./commitWork */ "../remixjs/src/scheduler/worker/commit/commitWork.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/worker/index.js"));

function commitAllHostEffects() {
  while (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
    var effectTag = _index["default"].nextEffect.effectTag;
    var primaryEffectTag = effectTag & (_effectTags.PLACEMENT | _effectTags.UPDATE | _effectTags.DELETION);

    switch (primaryEffectTag) {
      case _effectTags.PLACEMENT:
        {
          (0, _commitPlacement["default"])(_index["default"].nextEffect);
          _index["default"].nextEffect.effectTag &= ~_effectTags.PLACEMENT;
          break;
        }

      case _effectTags.PLACEMENT_AND_UPDATE:
        {
          (0, _commitPlacement["default"])(_index["default"].nextEffect);
          _index["default"].nextEffect.effectTag &= ~_effectTags.PLACEMENT;
          var current = _index["default"].nextEffect.alternate;
          (0, _commitWork["default"])(current, _index["default"].nextEffect);
          break;
        }

      case _effectTags.UPDATE:
        {
          var _current = _index["default"].nextEffect.alternate;
          (0, _commitWork["default"])(_current, _index["default"].nextEffect);
          break;
        }

      case _effectTags.DELETION:
        {
          commitDeletion(_index["default"].nextEffect);
          break;
        }
    }

    _index["default"].nextEffect = _index["default"].nextEffect.nextEffect;
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitAllLifeCycles.js":
/*!*********************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitAllLifeCycles.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitAllLifeCycles;

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _effectTags = __webpack_require__(/*! ../../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _commitLifeCycles = _interopRequireDefault(__webpack_require__(/*! ./commitLifeCycles */ "../remixjs/src/scheduler/worker/commit/commitLifeCycles.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/worker/index.js"));

function commitAllLifeCycles(root) {
  while (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
    var effectTag = _index["default"].nextEffect.effectTag;

    if (effectTag & (_effectTags.UPDATE | _effectTags.CALLBACK)) {
      var current = _index["default"].nextEffect.alternate;
      (0, _commitLifeCycles["default"])(root, current, _index["default"].nextEffect);
    }

    if (effectTag & _effectTags.REF) {}

    _index["default"].nextEffect = _index["default"].nextEffect.nextEffect;
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitLifeCycles.js":
/*!******************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitLifeCycles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitLifeCycles;

var _workTags = __webpack_require__(/*! ../../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ../../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../../shared */ "../remixjs/src/shared/index.js");

var _commitUpdateQueue = _interopRequireDefault(__webpack_require__(/*! ./commitUpdateQueue */ "../remixjs/src/scheduler/worker/commit/commitUpdateQueue.js"));

function commitLifeCycles(root, current, finishedWork) {
  var tag = finishedWork.tag;

  switch (tag) {
    case _workTags.FUNCTION_COMPONENT:
      {
        break;
      }

    case _workTags.CLASS_COMPONENT:
      {
        var instance = finishedWork.stateNode;

        if (finishedWork.effectTag & _effectTags.UPDATE) {
          if ((0, _is.isNullOrUndefined)(current)) {
            instance.componentDidMount();
          } else {
            var props = finishedWork.elementType === finishedWork.type ? current.memoizedProps : (0, _shared.resolveDefaultProps)(finishedWork.type, current.memoizedProps);
            var state = current.memoizedState;

            if ((0, _is.isFunction)(instance.componentDidUpdate)) {
              instance.componentDidUpdate(props, state, instance.__reactInternalSnapshotBeforeUpdate);
            }
          }
        }

        var updateQueue = finishedWork.updateQueue;

        if (!(0, _is.isNullOrUndefined)(updateQueue)) {
          (0, _commitUpdateQueue["default"])(finishedWork, updateQueue, instance);
        }

        break;
      }

    case _workTags.HOST_ROOT:
      {
        var _updateQueue = finishedWork.updateQueue;

        if (!(0, _is.isNullOrUndefined)(_updateQueue)) {
          var _instance;

          if (!(0, _is.isNullOrUndefined)(finishedWork.child)) {
            _instance = finishedWork.child.stateNode;
          }

          (0, _commitUpdateQueue["default"])(finishedWork, _updateQueue, _instance);
        }

        break;
      }

    case _workTags.HOST_COMPONENT:
      {}
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitPlacement.js":
/*!*****************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitPlacement.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitPlacement;

var _readOnlyError2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "../remixjs/node_modules/@babel/runtime/helpers/readOnlyError.js"));

var _workTags = __webpack_require__(/*! ../../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ../../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _appendChildToContainer = _interopRequireDefault(__webpack_require__(/*! ../../../renderer/config/appendChildToContainer */ "../remixjs/src/renderer/config/appendChildToContainer.js"));

function getHostParentFiber(fiber) {
  var returnFiber = fiber["return"];

  while (!(0, _is.isNullOrUndefined)(returnFiber)) {
    if ((0, _is.isHostParent)(returnFiber)) {
      return returnFiber;
    }

    returnFiber = returnFiber["return"];
  }
}

function getHostSibling(fiber) {
  var node = fiber;

  siblings: while (true) {
    while ((0, _is.isNullOrUndefined)(node.sibling)) {
      if ((0, _is.isNullOrUndefined)(node["return"]) === null || (0, _is.isHostParent)(node["return"])) {
        return null;
      }

      node = ((0, _readOnlyError2["default"])("node"), node["return"]);
    }

    node.sibling["return"] = node["return"];
    node = ((0, _readOnlyError2["default"])("node"), node.sibling);

    while (node.tag !== _workTags.HOST_COMPONENT && node.tag !== _workTags.HOST_TEXT) {
      if (node.effectTag & _effectTags.PLACEMENT) {
        continue siblings;
      }

      if ((0, _is.isNullOrUndefined)(node.child) || node.tag === _workTags.HOST_PORTAL) {
        continue siblings;
      } else {
        node.child["return"] = node;
        node = ((0, _readOnlyError2["default"])("node"), node.child);
      }
    }

    if (!(node.effectTag & _effectTags.PLACEMENT)) {
      return node.stateNode;
    }
  }
}

function commitPlacement(finishedWork) {
  var parentFiber = getHostParentFiber(finishedWork);
  var tag = parentFiber.tag,
      stateNode = parentFiber.stateNode;
  var parent;
  var isContainer;

  switch (tag) {
    case _workTags.HOST_COMPONENT:
      {
        parent = stateNode;
        isContainer = false;
        break;
      }

    case _workTags.HOST_ROOT:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    case _workTags.HOST_PORTAL:
      {
        parent = stateNode.containerInfo;
        isContainer = true;
        break;
      }

    default:
      console.log('Invalid host parent');
  }

  if (parentFiber.effectTag & _effectTags.CONTENT_RESET) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~_effectTags.CONTENT_RESET;
  }

  var before = getHostSibling(finishedWork);
  var node = finishedWork;

  while (true) {
    var isHost = node.tag === _workTags.HOST_COMPONENT || node.tag === _workTags.HOST_TEXT;

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
          (0, _appendChildToContainer["default"])(parent, _stateNode);
        } else {
          appendChild(parent, _stateNode);
        }
      }
    } else if (node.tag === _workTags.HOST_PORTAL) {} else if (!(0, _is.isNullOrUndefined)(node.child)) {
      node.child["return"] = node;
      node = node.child;
      continue;
    }

    if (node === finishedWork) {
      return;
    }

    while ((0, _is.isNullOrUndefined)(node.sibling)) {
      if ((0, _is.isNullOrUndefined)(node["return"]) || node["return"] === finishedWork) {
        return;
      }

      node = node["return"];
    }

    node.sibling["return"] = node["return"];
    node = node.sibling;
  }
}

function safelyDetachRef(current) {
  var ref = current.ref;

  if (ref.current !== null) {} else {
    ref.current = null;
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitRoot.js":
/*!************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitRoot.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitRoot;

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _effectTags = __webpack_require__(/*! ../../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _ReactCurrentOwner = _interopRequireDefault(__webpack_require__(/*! ../../../react/ReactCurrentOwner */ "../remixjs/src/react/ReactCurrentOwner.js"));

var _commitAllHostEffects = _interopRequireDefault(__webpack_require__(/*! ./commitAllHostEffects */ "../remixjs/src/scheduler/worker/commit/commitAllHostEffects.js"));

var _commitAllLifeCycles = _interopRequireDefault(__webpack_require__(/*! ./commitAllLifeCycles */ "../remixjs/src/scheduler/worker/commit/commitAllLifeCycles.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/worker/index.js"));

function commitRoot(root, finishedWork) {
  _index["default"].isCommitting = true;
  _index["default"].isWorking = true;

  if (!(0, _is.isNullOrUndefined)(finishedWork)) {
    root.finishedWork = null;
  }

  var firstEffect;

  if (finishedWork.effectTag > _effectTags.PERFORMED_WORK) {
    if (!(0, _is.isNullOrUndefined)(finishedWork.lastEffect)) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    firstEffect = finishedWork.firstEffect;
  }

  if (!(0, _is.isNullOrUndefined)(firstEffect)) {
    _ReactCurrentOwner["default"].current = null;
  }

  _index["default"].nextEffect = firstEffect;

  while (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
    (0, _commitAllHostEffects["default"])();

    if (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
      _index["default"].nextEffect = nextEffect.nextEffect;
    }
  }

  root.current = finishedWork;
  _index["default"].nextEffect = firstEffect;

  while (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
    (0, _commitAllLifeCycles["default"])(root);

    if (!(0, _is.isNullOrUndefined)(_index["default"].nextEffect)) {
      _index["default"].nextEffect = nextEffect.nextEffect;
    }
  }

  if (!(0, _is.isNullOrUndefined)(firstEffect)) {}

  _index["default"].isCommitting = false;
  _index["default"].isWorking = false;
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitUpdateQueue.js":
/*!*******************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitUpdateQueue.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitUpdateQueue;

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
}

function commitUpdateEffects(effect, instance) {
  while (!(0, _is.isNullOrUndefined)(effect)) {
    var callback = effect.callback;

    if ((0, _is.isFunction)(callback)) {
      effect.callback = null;
      callback.call(instance);
    }

    effect = effect.nextEffect;
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/commit/commitWork.js":
/*!************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/commit/commitWork.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commitWork;

var _workTags = __webpack_require__(/*! ../../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _is = __webpack_require__(/*! ../../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../../shared */ "../remixjs/src/shared/index.js");

var _updateProperties = _interopRequireDefault(__webpack_require__(/*! ../../../renderer/config/updateProperties */ "../remixjs/src/renderer/config/updateProperties.js"));

function commitWork(current, finishedWork) {
  var tag = finishedWork.tag;

  switch (tag) {
    case _workTags.FUNCTION_COMPONENT:
      {
        break;
      }

    case _workTags.HOST_COMPONENT:
      {
        var instance = finishedWork.stateNode;

        if (!(0, _is.isNullOrUndefined)(instance)) {
          var nextProps = finishedWork.memoizedProps;
          var props = !(0, _is.isNullOrUndefined)(current) ? current.memoizedProps : nextProps;
          var type = finishedWork.type;
          var updateQueue = finishedWork.updateQueue;
          finishedWork.updateQueue = null;

          if (!(0, _is.isNullOrUndefined)(updateQueue)) {
            commitUpdate(instance, updateQueue, type, props, finishedWork, finishedWork);
          }
        }

        break;
      }

    case _workTags.HOST_TEXT:
      {
        var _instance = finishedWork.stateNode;
        var nextText = finishedWork.memoizedProps;
        var text = (0, _is.isNullOrUndefined)(current) ? current$$1.memoizedProps : nextText;
        commitTextUpdate(_instance, text, nextText);
        return;
      }
  }
}

function commitUpdate(instance, updateQueue, type, props, nextProps, finishedWork) {
  instance[_shared.INTERNAL_EVENT_HANDLERS_KEY] = nextProps;
  (0, _updateProperties["default"])(instance, updateQueue, type, props, nextProps);
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/completeRoot.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/completeRoot.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = completeRoot;

var _commitRoot = _interopRequireDefault(__webpack_require__(/*! ./commit/commitRoot */ "../remixjs/src/scheduler/worker/commit/commitRoot.js"));

function completeRoot(root, finishedWork) {
  if (root.finishedWork) {
    root.finishedWork = null;
    (0, _commitRoot["default"])(root, finishedWork);
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/completeUnitOfWork.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/completeUnitOfWork.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = completeUnitOfWork;

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _completeWork = _interopRequireDefault(__webpack_require__(/*! ./completeWork */ "../remixjs/src/scheduler/worker/completeWork.js"));

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

function completeUnitOfWork(workInProgress) {
  do {
    var current = workInProgress.alternate;
    var returnFiber = workInProgress["return"];
    var siblingFiber = workInProgress.sibling;

    if ((workInProgress.effectTag & _effectTags.INCOMPLETE) === _effectTags.NO_EFFECT) {
      var next = (0, _completeWork["default"])(current, workInProgress);

      if (!(0, _is.isNullOrUndefined)(next)) {
        return next;
      }

      if (!(0, _is.isNullOrUndefined)(returnFiber) && (returnFiber.effectTag & _effectTags.INCOMPLETE) === _effectTags.NO_EFFECT) {
        if ((0, _is.isNullOrUndefined)(returnFiber.firstEffect)) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }

        if (!(0, _is.isNullOrUndefined)(workInProgress.lastEffect)) {
          if (!(0, _is.isNullOrUndefined)(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }

          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        if (workInProgress.effectTag > _effectTags.PERFORMED_WORK) {
          if (!(0, _is.isNullOrUndefined)(returnFiber.lastEffect)) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }

          returnFiber.lastEffect = workInProgress;
        }
      }
    } else {
      var _next = unwindWork(workInProgress);

      if (!(0, _is.isNullOrUndefined)(_next)) {
        _next.effectTag &= HostEffectMask;
        return _next;
      }

      if (!(0, _is.isNullOrUndefined)(returnFiber)) {
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= _effectTags.INCOMPLETE;
      }
    }

    if (!(0, _is.isNullOrUndefined)(siblingFiber)) {
      return siblingFiber;
    }

    workInProgress = returnFiber;
  } while (!(0, _is.isNullOrUndefined)(workInProgress)); // root complete 

}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/completeWork.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/completeWork.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = completeWork;

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _effectTags = __webpack_require__(/*! ../../shared/effectTags */ "../remixjs/src/shared/effectTags.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _updateHostInstance = _interopRequireDefault(__webpack_require__(/*! ../updater/updateHostInstance */ "../remixjs/src/scheduler/updater/updateHostInstance.js"));

var _createInstance = _interopRequireDefault(__webpack_require__(/*! ../../renderer/config/createInstance */ "../remixjs/src/renderer/config/createInstance.js"));

var _ReactCurrentRootInstance = _interopRequireDefault(__webpack_require__(/*! ../../react/ReactCurrentRootInstance */ "../remixjs/src/react/ReactCurrentRootInstance.js"));

var _setInitialProperties = _interopRequireDefault(__webpack_require__(/*! ../../renderer/config/setInitialProperties */ "../remixjs/src/renderer/config/setInitialProperties.js"));

var _appendAllChildren = _interopRequireDefault(__webpack_require__(/*! ../../renderer/config/appendAllChildren */ "../remixjs/src/renderer/config/appendAllChildren.js"));

function completeWork(current, workInProgress) {
  var nextProps = workInProgress.pendingProps;
  var tag = workInProgress.tag;

  switch (tag) {
    case _workTags.CLASS_COMPONENT:
      {
        var Component = workInProgress.type;

        if ((0, _is.isContextProvider)(Component)) {// popContext();
        }

        break;
      }

    case _workTags.FUNCTION_COMPONENT:
      {
        break;
      }
      ;

    case _workTags.HOST_ROOT:
      {
        var root = workInProgress.stateNode;

        if (root.pendingContext) {
          root.context = root.pendingContext;
          root.pendingContext = null;
        }

        if ((0, _is.isNullOrUndefined)(current) || (0, _is.isNullOrUndefined)(current.child)) {
          workInProgress.effectTag &= ~_effectTags.PLACEMENT;
        } // updateHostContainer()


        break;
      }

    case _workTags.HOST_COMPONENT:
      {
        var type = workInProgress.type;
        var _nextProps = workInProgress.pendingProps;
        var rootContainerInstance = getRootHostContainer();

        if (!(0, _is.isNullOrUndefined)(current) && !(0, _is.isNullOrUndefined)(workInProgress.stateNode)) {
          (0, _updateHostInstance["default"])(current, workInProgress, type, _nextProps);
        } else {
          var instance = (0, _createInstance["default"])(type, _nextProps, rootContainerInstance, null, workInProgress);
          workInProgress.stateNode = instance;
          (0, _appendAllChildren["default"])(instance, workInProgress);
          (0, _setInitialProperties["default"])(instance, type, _nextProps, rootContainerInstance);
        }

        break;
      }

    case _is.isContextProvider:
      {
        break;
      }
  }
}

function getRootHostContainer() {
  var rootInstance = _ReactCurrentRootInstance["default"].current;
  return rootInstance;
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/index.js":
/*!************************************************!*\
  !*** ../remixjs/src/scheduler/worker/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  nextUnitOfWork: null,
  nextEffect: null,
  isWorking: false,
  isCommitting: false
};
exports["default"] = _default;

/***/ }),

/***/ "../remixjs/src/scheduler/worker/performUnitOfWork.js":
/*!************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/performUnitOfWork.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = performUnitOfWork;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _completeUnitOfWork = _interopRequireDefault(__webpack_require__(/*! ./completeUnitOfWork */ "../remixjs/src/scheduler/worker/completeUnitOfWork.js"));

var _beginWork = _interopRequireDefault(__webpack_require__(/*! ./beginWork */ "../remixjs/src/scheduler/worker/beginWork.js"));

function performUnitOfWork(workInProgress) {
  var current = workInProgress.alternate;
  var next = (0, _beginWork["default"])(current, workInProgress);
  workInProgress.memoizedProps = workInProgress.pendingProps;

  if ((0, _is.isNullOrUndefined)(next)) {
    next = (0, _completeUnitOfWork["default"])(workInProgress);
  }

  return next;
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/performWork.js":
/*!******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/performWork.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = performWork;

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _workLoop = _interopRequireDefault(__webpack_require__(/*! ./workLoop */ "../remixjs/src/scheduler/worker/workLoop.js"));

var _workLoopSync = _interopRequireDefault(__webpack_require__(/*! ./workLoopSync */ "../remixjs/src/scheduler/worker/workLoopSync.js"));

var _completeRoot = _interopRequireDefault(__webpack_require__(/*! ./completeRoot */ "../remixjs/src/scheduler/worker/completeRoot.js"));

var _requestWork = _interopRequireDefault(__webpack_require__(/*! ./requestWork */ "../remixjs/src/scheduler/worker/requestWork.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/worker/index.js"));

function performWork(deadline, fiber, sync) {
  _index2["default"].isWorking = true;

  if (sync) {
    (0, _workLoopSync["default"])(fiber);
    _index["default"].isRootRendering = false;
  } else {
    (0, _workLoop["default"])(deadline, fiber);

    if (_index2["default"].nextUnitOfWork) {
      (0, _requestWork["default"])(_index2["default"].nextUnitOfWork);
    }
  }

  if ((0, _is.isNullOrUndefined)(_index2["default"].nextUnitOfWork)) {
    var root = _index2["default"].root;
    root.finishedWork = root.current.alternate;
    (0, _completeRoot["default"])(root, root.finishedWork);
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/requestWork.js":
/*!******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/requestWork.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = requestWork;

var _requestidlecallback = _interopRequireDefault(__webpack_require__(/*! requestidlecallback */ "../remixjs/node_modules/requestidlecallback/index.js"));

var _performWork = _interopRequireDefault(__webpack_require__(/*! ./performWork */ "../remixjs/src/scheduler/worker/performWork.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/index.js"));

function requestWork(fiber) {
  if (_index["default"].isRootRendering) {
    (0, _performWork["default"])(null, fiber, true);
  } else {
    _requestidlecallback["default"].request(function (deadline) {
      (0, _performWork["default"])(deadline, fiber);
    });
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/resetWork.js":
/*!****************************************************!*\
  !*** ../remixjs/src/scheduler/worker/resetWork.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = resetWork;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/worker/index.js"));

function resetWork(root) {
  _index["default"].nextUnitOfWork = null; // worker.nextEffect = null;

  _index["default"].root = root;
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/scheduleWork.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/scheduleWork.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = scheduleWork;

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

var _scheduleWorkToRoot = _interopRequireDefault(__webpack_require__(/*! ./scheduleWorkToRoot */ "../remixjs/src/scheduler/worker/scheduleWorkToRoot.js"));

var _requestWork = _interopRequireDefault(__webpack_require__(/*! ./requestWork */ "../remixjs/src/scheduler/worker/requestWork.js"));

var _resetWork = _interopRequireDefault(__webpack_require__(/*! ./resetWork */ "../remixjs/src/scheduler/worker/resetWork.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/worker/index.js"));

var _index2 = _interopRequireDefault(__webpack_require__(/*! ../index */ "../remixjs/src/scheduler/index.js"));

function scheduleWork(fiber) {
  var root = (0, _scheduleWorkToRoot["default"])(fiber);
  (0, _resetWork["default"])(root);

  if (!_index["default"].isWorking || _index["default"].isCommitting) {
    _index["default"].isWorking = true;
    (0, _requestWork["default"])(root.current);
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/scheduleWorkToRoot.js":
/*!*************************************************************!*\
  !*** ../remixjs/src/scheduler/worker/scheduleWorkToRoot.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = scheduleWorkToRoot;

var _workTags = __webpack_require__(/*! ../../shared/workTags */ "../remixjs/src/shared/workTags.js");

function scheduleWorkToRoot(fiber) {
  while (fiber) {
    if (fiber.tag === _workTags.HOST_ROOT) {
      return fiber.stateNode;
    }

    fiber = fiber["return"];
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/workLoop.js":
/*!***************************************************!*\
  !*** ../remixjs/src/scheduler/worker/workLoop.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = workLoop;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/worker/index.js"));

var _performUnitOfWork = _interopRequireDefault(__webpack_require__(/*! ./performUnitOfWork */ "../remixjs/src/scheduler/worker/performUnitOfWork.js"));

var _FiberNode = __webpack_require__(/*! ../../reconciler/FiberNode */ "../remixjs/src/reconciler/FiberNode.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

function workLoop(deadline, fiber) {
  if (!_index["default"].nextUnitOfWork) {
    _index["default"].nextUnitOfWork = (0, _FiberNode.createWorkInProgress)(fiber, null);
  }

  while (!(0, _is.isNullOrUndefined)(_index["default"].nextUnitOfWork) && deadline.timeRemaining() > _shared.EXPIRE_TIME) {
    _index["default"].nextUnitOfWork = (0, _performUnitOfWork["default"])(_index["default"].nextUnitOfWork);
  }
}

/***/ }),

/***/ "../remixjs/src/scheduler/worker/workLoopSync.js":
/*!*******************************************************!*\
  !*** ../remixjs/src/scheduler/worker/workLoopSync.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = workLoopSync;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "../remixjs/src/scheduler/worker/index.js"));

var _performUnitOfWork = _interopRequireDefault(__webpack_require__(/*! ./performUnitOfWork */ "../remixjs/src/scheduler/worker/performUnitOfWork.js"));

var _FiberNode = __webpack_require__(/*! ../../reconciler/FiberNode */ "../remixjs/src/reconciler/FiberNode.js");

var _is = __webpack_require__(/*! ../../shared/is */ "../remixjs/src/shared/is.js");

var _shared = __webpack_require__(/*! ../../shared */ "../remixjs/src/shared/index.js");

function workLoopSync(fiber) {
  if (!_index["default"].nextUnitOfWork) {
    _index["default"].nextUnitOfWork = (0, _FiberNode.createWorkInProgress)(fiber, null);
  }

  while (!(0, _is.isNullOrUndefined)(_index["default"].nextUnitOfWork)) {
    _index["default"].nextUnitOfWork = (0, _performUnitOfWork["default"])(_index["default"].nextUnitOfWork);
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

/***/ "../remixjs/src/shared/effectTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/effectTags.js ***!
  \*******************************************/
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

/***/ "../remixjs/src/shared/elementTags.js":
/*!********************************************!*\
  !*** ../remixjs/src/shared/elementTags.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEXTAREA = exports.INPUT = void 0;
var INPUT = 'input';
exports.INPUT = INPUT;
var TEXTAREA = 'textarea';
exports.TEXTAREA = TEXTAREA;

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

/***/ "../remixjs/src/shared/updateTags.js":
/*!*******************************************!*\
  !*** ../remixjs/src/shared/updateTags.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CAPTURE_UPDATE = exports.FORCE_UPDATE = exports.REPLACE_STATE = exports.UPDATE_STATE = void 0;
var UPDATE_STATE = 0;
exports.UPDATE_STATE = UPDATE_STATE;
var REPLACE_STATE = 1;
exports.REPLACE_STATE = REPLACE_STATE;
var FORCE_UPDATE = 2;
exports.FORCE_UPDATE = FORCE_UPDATE;
var CAPTURE_UPDATE = 4;
exports.CAPTURE_UPDATE = CAPTURE_UPDATE;

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

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

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _remixjs = _interopRequireDefault(__webpack_require__(/*! remixjs */ "../remixjs/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

var _router = __webpack_require__(/*! remixjs/router */ "../remixjs/router.js");

var _Index = _interopRequireDefault(__webpack_require__(/*! ./pages/Index */ "./src/pages/Index/index.js"));

var _me = _interopRequireDefault(__webpack_require__(/*! ./static/images/me.png */ "./src/static/images/me.png"));

var _me_selected = _interopRequireDefault(__webpack_require__(/*! ./static/images/me_selected.png */ "./src/static/images/me_selected.png"));

var _explore = _interopRequireDefault(__webpack_require__(/*! ./static/images/explore.png */ "./src/static/images/explore.png"));

var _explore_selected = _interopRequireDefault(__webpack_require__(/*! ./static/images/explore_selected.png */ "./src/static/images/explore_selected.png"));

var TabBarItem = _components.TabBar.TabBarItem;

var _default = function _default() {
  return _remixjs["default"].createElement(_components.Application, {
    config: {
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    },
    onLaunch: function onLaunch() {}
  }, _remixjs["default"].createElement(_router.Router, null, _remixjs["default"].createElement(_router.Route, {
    path: "pages/Index/index",
    component: _Index["default"]
  }), _remixjs["default"].createElement(_router.Route, {
    path: "pages/Explore/index",
    component: _Index["default"]
  }), _remixjs["default"].createElement(_router.Route, {
    path: "pages/Home/index",
    component: _Index["default"]
  })), _remixjs["default"].createElement(_components.TabBar, {
    selectedColor: '#333333'
  }, _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Explore/index",
    icon: _me["default"],
    selectedIcon: _me_selected["default"]
  }, "\u53D1\u73B0"), _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Index/index",
    icon: _explore["default"],
    selectedIcon: _explore_selected["default"]
  }, "\u6211")));
};

exports["default"] = _default;

/***/ }),

/***/ "./src/pages/Index/index.js":
/*!**********************************!*\
  !*** ./src/pages/Index/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _remixjs = _interopRequireWildcard(__webpack_require__(/*! remixjs */ "../remixjs/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

__webpack_require__(/*! ./index.css */ "./src/pages/Index/index.css");

var Index =
/*#__PURE__*/
function (_ViewController) {
  (0, _inherits2["default"])(Index, _ViewController);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "config", {
      navigationBarTitleText: '我的'
    });
    return _this;
  }

  (0, _createClass2["default"])(Index, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {
      return _remixjs["default"].createElement(_components.View, null);
    }
  }]);
  return Index;
}(_components.ViewController);

exports["default"] = Index;

/***/ })

}]);
//# sourceMappingURL=manifest.js.map