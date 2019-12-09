/*** MARK_1574871083395 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = window.installedModules || (window.installedModules = {});
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"runtime/index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./.~remix/runtime/client.runtime.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./.~remix/runtime/boot.js":
/*!*********************************!*\
  !*** ./.~remix/runtime/boot.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.program = void 0;

var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

var _document = __webpack_require__(/*! remixjs/document */ "../remixjs/document.js");

var _env = _interopRequireDefault(__webpack_require__(/*! remixjs/env */ "../remixjs/env.js"));

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

_env["default"].isTerminalRuntime = true;
var program = new _project.Program(_src["default"], _document.document.body);
exports.program = program;
var _default = program;
exports["default"] = _default;

/***/ }),

/***/ "./.~remix/runtime/client.runtime.js":
/*!*******************************************!*\
  !*** ./.~remix/runtime/client.runtime.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _boot = _interopRequireDefault(__webpack_require__(/*! ./boot */ "./.~remix/runtime/boot.js"));

_boot["default"].start();

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

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

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

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

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

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
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

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");

var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
module.exports = uuid;

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
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

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
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

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js"); // **`v1()` - Generate time-based UUID**
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

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");

var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

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

/***/ "./src/common/graphql.js":
/*!*******************************!*\
  !*** ./src/common/graphql.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = graphql;
exports.defaultHeaders = exports.getAuthorizationToken = exports.authorizationToken = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

var _uuid = _interopRequireDefault(__webpack_require__(/*! uuid */ "./node_modules/uuid/index.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var assign = Object.assign;
var endport = "http://api.muwu.info/graphql";
var authorizationKey = "_authorization_token_";

var getLocalAuthorizationToken = function getLocalAuthorizationToken() {
  var string = _project.transports.api.getStorageSync(authorizationKey);

  if (string) {
    var data = JSON.parse(string);

    if (data.expiredAt > Date.now()) {
      exports.authorizationToken = authorizationToken = data;
      defaultHeaders.Authorization = "".concat(data.type, " ").concat(data.token);
    } else {
      _project.transports.api.removeStorageSync(authorizationKey);
    }
  }
};

var authorizationToken = null;
exports.authorizationToken = authorizationToken;

var getAuthorizationToken = function getAuthorizationToken() {
  return new Promise(function (resolve, reject) {
    getLocalAuthorizationToken();

    if (authorizationToken) {
      return resolve();
    }

    _project.transports.api.login().then(function (_ref) {
      var code = _ref.code;
      graphql("\n        query signIn($code: String!) {\n          signIn(code: $code) {\n            token\n            type\n            expiresIn\n          }\n        }\n      ")({
        code: code
      }).then(function (res) {
        var signIn = res.data.signIn;
        exports.authorizationToken = authorizationToken = signIn;
        defaultHeaders.Authorization = "".concat(signIn.type, " ").concat(signIn.token);

        _project.transports.api.setStorageSync(authorizationKey, JSON.stringify(_objectSpread({}, signIn, {
          expiredAt: Date.now() + signIn.expiresIn * 1000
        })));

        resolve();
      })["catch"](function (err) {
        reject(err);
      });
    })["catch"](function (err) {});
  });
};

exports.getAuthorizationToken = getAuthorizationToken;
var isReAuthorizatting = false;
var requestQueue = [];

var handleErrors = function handleErrors(errors, task, reject) {
  var isStop = errors.some(function (error) {
    var extensions = error.extensions;

    if (extensions.code === 'INVALID_TOKEN' || extensions.code === 'EXPIRED_TOKEN') {
      requestQueue.push(task);

      if (isReAuthorizatting) {} else {
        isReAuthorizatting = true;

        _project.transports.api.removeStorageSync(authorizationKey);

        defaultHeaders.Authorization = null;
        exports.authorizationToken = authorizationToken = null;
        getAuthorizationToken().then(function () {
          var q;

          while (q = requestQueue.shift()) {
            debugger;
            q();
          }

          isReAuthorizatting = false;
        })["catch"](function (err) {
          requestQueue = [];
          isReAuthorizatting = false;
        });
      }

      return true;
    }
  });

  if (!isStop) {
    reject(errors);
  }
};

var defaultHeaders = {};
exports.defaultHeaders = defaultHeaders;

function graphql(ql) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (variables) {
    return new Promise(function (resolve, reject) {
      var task = function task() {
        _project.transports.api.request(_objectSpread({
          method: 'POST',
          dataType: 'json'
        }, options, {
          url: endport,
          header: _objectSpread({}, defaultHeaders, {}, options.headers, {
            'x-trace-id': _uuid["default"].v4()
          }),
          data: {
            query: ql,
            variables: variables
          }
        })).then(function (res) {
          var data = res.data;

          if (data.errors) {
            handleErrors(data.errors, task, reject);
          } else {
            resolve(data);
          }
        })["catch"](function (err) {
          reject(err);
        });
      };

      task();
    });
  };
}

/***/ }),

/***/ "./src/components/Button/index.css":
/*!*****************************************!*\
  !*** ./src/components/Button/index.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Button/index.js":
/*!****************************************!*\
  !*** ./src/components/Button/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _remixjs = _interopRequireWildcard(__webpack_require__(/*! remixjs */ "../remixjs/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

var _classnames2 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

__webpack_require__(/*! ./index.css */ "./src/components/Button/index.css");

var _default = function _default(_ref) {
  var className = _ref.className,
      transparent = _ref.transparent,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["className", "transparent"]);
  var classes = (0, _classnames2["default"])((0, _defineProperty2["default"])({
    'component__button': true,
    'component__button_transparent': transparent
  }, className, !!className));
  return _remixjs["default"].createElement(_components.Button, (0, _extends2["default"])({}, rest, {
    hoverClass: "none",
    plain: true
  }), _remixjs["default"].createElement(_components.View, {
    className: classes
  }, rest.children));
};

exports["default"] = _default;

/***/ }),

/***/ "./src/components/Input/index.css":
/*!****************************************!*\
  !*** ./src/components/Input/index.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Input/index.js":
/*!***************************************!*\
  !*** ./src/components/Input/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _remixjs = _interopRequireWildcard(__webpack_require__(/*! remixjs */ "../remixjs/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

var _classnames2 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

__webpack_require__(/*! ./index.css */ "./src/components/Input/index.css");

var _default = function _default(_ref) {
  var className = _ref.className,
      value = _ref.value,
      label = _ref.label,
      onChange = _ref.onChange,
      afterAddon = _ref.afterAddon,
      placeholder = _ref.placeholder,
      disabled = _ref.disabled;
  var classes = (0, _classnames2["default"])((0, _defineProperty2["default"])({
    'component__text-input': true,
    'component__text-input_disabled': disabled
  }, className, !!className));
  return _remixjs["default"].createElement(_components.View, {
    className: classes
  }, _remixjs["default"].createElement(_components.View, {
    className: "component__text-input-area"
  }, _remixjs["default"].createElement(_components.Input, {
    disabled: disabled,
    placeholder: placeholder,
    className: "component__text-input-input",
    value: value,
    onInput: onChange
  })), afterAddon);
};

exports["default"] = _default;

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

var _User = _interopRequireDefault(__webpack_require__(/*! ./pages/User */ "./src/pages/User/index.js"));

var _Explore = _interopRequireDefault(__webpack_require__(/*! ./pages/Explore */ "./src/pages/Explore/index.js"));

var _SignIn = _interopRequireDefault(__webpack_require__(/*! ./pages/User/SignIn */ "./src/pages/User/SignIn/index.js"));

__webpack_require__(/*! ./index.css */ "./src/index.css");

var TabBarItem = _components.TabBar.TabBarItem;

var _default = function _default() {
  var onLaunch = function onLaunch() {// transports.api.hideTabBar({
    //   animation: true
    // });
  };

  return _remixjs["default"].createElement(_components.Application, {
    config: {
      navigationBarBackgroundColor: '#000000',
      backgroundColor: '#000000',
      navigationStyle: 'custom'
    },
    onLaunch: onLaunch
  }, _remixjs["default"].createElement(_router.Router, null, _remixjs["default"].createElement(_router.Route, {
    path: "pages/User/SignIn/index",
    component: _SignIn["default"]
  }), _remixjs["default"].createElement(_router.Route, {
    path: "pages/Explore/index",
    component: _Explore["default"]
  }), _remixjs["default"].createElement(_router.Route, {
    path: "pages/User/index",
    component: _User["default"]
  })), _remixjs["default"].createElement(_components.TabBar, {
    color: "#5d4e36",
    selectedColor: "#bb976c",
    backgroundColor: "#000000",
    borderStyle: "white"
  }, _remixjs["default"].createElement(TabBarItem, {
    path: "pages/User/SignIn/index"
  }, "\u65E5\u7A0B"), _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Explore/index"
  }, "\u5A92\u4F53\u53D1\u5E03"), _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Explore/index"
  }, "\u5A92\u4F53\u8D44\u6599"), _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Explore/index"
  }, "\u5173\u4E8E")));
};

exports["default"] = _default;

/***/ }),

/***/ "./src/pages/Explore/index.css":
/*!*************************************!*\
  !*** ./src/pages/Explore/index.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Explore/index.js":
/*!************************************!*\
  !*** ./src/pages/Explore/index.js ***!
  \************************************/
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

var _graphql = _interopRequireDefault(__webpack_require__(/*! ../../common/graphql */ "./src/common/graphql.js"));

__webpack_require__(/*! ./index.css */ "./src/pages/Explore/index.css");

var setUser = (0, _graphql["default"])("\n  mutation setUser($user: InputOfUser!) {\n    setUser(user: $user) {\n      nickname\n      avatar\n    }\n  }\n");

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      current: 'movies'
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (key) {
      _this.setState({
        current: key
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onGetUserInfo", function (res) {
      var detail = res.detail;
      var encrypted = detail.encryptedData,
          raw = detail.rawData,
          userinfo = detail.userInfo,
          signature = detail.signature,
          errMsg = detail.errMsg,
          iv = detail.iv;

      if (errMsg === 'getUserInfo:ok') {
        setUser({
          user: {
            iv: iv,
            raw: raw,
            encrypted: encrypted,
            signature: signature
          }
        }).then(function (res) {})["catch"](function (err) {});
      } else {}
    });
    return _this;
  }

  (0, _createClass2["default"])(Index, [{
    key: "contentRender",
    value: function contentRender() {
      var current = this.state.current;
      return _remixjs["default"].createElement(_components.View, {
        className: "index__content"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _remixjs["default"].createElement(_components.View, {
        className: "index"
      }, this.contentRender());
    }
  }]);
  return Index;
}(_components.ViewController);

exports["default"] = Index;

/***/ }),

/***/ "./src/pages/User/SignIn/index.css":
/*!*****************************************!*\
  !*** ./src/pages/User/SignIn/index.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/User/SignIn/index.js":
/*!****************************************!*\
  !*** ./src/pages/User/SignIn/index.js ***!
  \****************************************/
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

var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _Button = _interopRequireDefault(__webpack_require__(/*! ../../../components/Button */ "./src/components/Button/index.js"));

var _Input = _interopRequireDefault(__webpack_require__(/*! ../../../components/Input */ "./src/components/Input/index.js"));

var _graphql = _interopRequireWildcard(__webpack_require__(/*! ../../../common/graphql */ "./src/common/graphql.js"));

__webpack_require__(/*! ./index.css */ "./src/pages/User/SignIn/index.css");

var setUser = (0, _graphql["default"])("\n  mutation setUser($user: InputOfUser!) {\n    setUser(user: $user) {\n      nickname\n      avatar\n    }\n  }\n");
var getUser = (0, _graphql["default"])("\n  query getUser {\n    getUser {\n      avatar\n      nickname\n      authorized\n    }\n  }\n");

var Loading = function Loading() {
  return _remixjs["default"].createElement(_components.View, {
    className: "sign-in__loading"
  }, "\u6570\u636E\u52A0\u8F7D\u4E2D...");
};

var Authorize = function Authorize(_ref) {
  var onAuthorize = _ref.onAuthorize;
  return _remixjs["default"].createElement(_Button["default"], {
    className: "sign-in_button",
    openType: "getUserInfo",
    onGetUserInfo: onAuthorize
  }, "\u5FAE\u4FE1\u6388\u6743");
};

var SignIn = function SignIn(_ref2) {
  var onAgree = _ref2.onAgree,
      agreed = _ref2.agreed,
      onPhoneNumberChange = _ref2.onPhoneNumberChange,
      onPhoneCodeChange = _ref2.onPhoneCodeChange,
      phoneNumber = _ref2.phoneNumber,
      code = _ref2.code;
  var classes = (0, _classnames["default"])({
    'sign-in__protocol-checkbox': true,
    'sign-in__protocol-checkbox_checked': agreed
  });
  return _remixjs["default"].createElement(_components.View, {
    className: "sign-in__form"
  }, _remixjs["default"].createElement(_components.View, {
    className: "sign-in__row"
  }, _remixjs["default"].createElement(_Input["default"], {
    value: phoneNumber,
    placeholder: "\u624B\u673A\u53F7",
    onChange: onPhoneNumberChange
  })), _remixjs["default"].createElement(_components.View, {
    className: "sign-in__row"
  }, _remixjs["default"].createElement(_Input["default"], {
    value: code,
    placeholder: "\u9A8C\u8BC1\u7801",
    onChange: onPhoneCodeChange
  })), _remixjs["default"].createElement(_components.View, {
    className: "sign-in__row"
  }, _remixjs["default"].createElement(_Button["default"], null, "\u767B\u5F55")), _remixjs["default"].createElement(_components.View, {
    className: "sign-in__protocol"
  }, _remixjs["default"].createElement(_components.View, {
    className: classes,
    onTap: onAgree
  }), _remixjs["default"].createElement(_components.View, {
    className: "sign-in__protocol-text"
  }), _remixjs["default"].createElement(_components.View, {
    className: "sign-in__protocol-link"
  })));
};

var Tips = function Tips(_ref3) {
  var isDataLoaded = _ref3.isDataLoaded;
  var classes = (0, _classnames["default"])({
    'sign-in__tips': true,
    'sign-in__tips_visible': isDataLoaded
  });
  return _remixjs["default"].createElement(_components.View, {
    className: classes
  }, _remixjs["default"].createElement(_components.View, null, "TIP\uFF1A\u9996\u6B21\u767B\u5F55\u8BF7\u6CE8\u518C\u5B98\u65B9\u8BA4\u8BC1\uFF0C"), _remixjs["default"].createElement(_components.View, null, "\u4EE5\u5F00\u542F\u5C0F\u7A0B\u5E8F\u670D\u52A1\u5168\u529F\u80FD"));
};

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      phoneNumber: null,
      code: null,
      agreed: false,
      user: {
        authorized: false
      },
      isDataLoaded: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getUserInfomation", function () {
      getUser().then(function (res) {
        var getUser = res.data.getUser;

        _this.setState({
          user: getUser,
          isDataLoaded: true
        });
      })["catch"](function (err) {// debugger;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (key) {
      _this.setState({
        current: key
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAuthorize", function (res) {
      var detail = res.detail;
      var encrypted = detail.encryptedData,
          raw = detail.rawData,
          userinfo = detail.userInfo,
          signature = detail.signature,
          errMsg = detail.errMsg,
          iv = detail.iv;

      if (errMsg === 'getUserInfo:ok') {
        setUser({
          user: {
            iv: iv,
            raw: raw,
            encrypted: encrypted,
            signature: signature
          }
        }).then(function (res) {})["catch"](function (err) {});
      } else {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPhoneCodeChange", function (e) {
      var detail = e.detail;

      _this.setState({
        code: detail.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPhoneNumberChange", function (e) {
      var detail = e.detail;

      _this.setState({
        phoneNumber: detail.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "contentRender", function () {
      var _this$state = _this.state,
          user = _this$state.user,
          phoneNumber = _this$state.phoneNumber,
          code = _this$state.code,
          agreed = _this$state.agreed;
      return _remixjs["default"].createElement(_components.View, {
        className: "sign-in__content"
      }, !user.authorized ? _remixjs["default"].createElement(SignIn, {
        phoneNumber: phoneNumber,
        code: code,
        onPhoneCodeChange: _this.onPhoneCodeChange,
        onPhoneNumberChange: _this.onPhoneNumberChange,
        onAgree: _this.onAgree,
        agreed: agreed
      }) : _remixjs["default"].createElement(Authorize, {
        onAuthorize: _this.onAuthorize
      }));
    });
    return _this;
  }

  (0, _createClass2["default"])(Index, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      (0, _graphql.getAuthorizationToken)().then(function () {
        _this2.getUserInfomation();
      })["catch"](function (err) {});
    }
  }, {
    key: "render",
    value: function render() {
      var isDataLoaded = this.state.isDataLoaded;
      return _remixjs["default"].createElement(_components.View, {
        className: "sign-in"
      }, _remixjs["default"].createElement(_components.View, {
        className: "sign-in__header"
      }), _remixjs["default"].createElement(_components.View, {
        className: "sign-in__body"
      }, !isDataLoaded ? this.contentRender() : _remixjs["default"].createElement(Loading, null), _remixjs["default"].createElement(Tips, {
        isDataLoaded: isDataLoaded
      })));
    }
  }]);
  return Index;
}(_components.ViewController);

exports["default"] = Index;

/***/ }),

/***/ "./src/pages/User/index.css":
/*!**********************************!*\
  !*** ./src/pages/User/index.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/User/index.js":
/*!*********************************!*\
  !*** ./src/pages/User/index.js ***!
  \*********************************/
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

var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

var _remixjsMessageProtocol = __webpack_require__(/*! remixjs-message-protocol */ "../remixjs-message-protocol/dist/protocol.js");

__webpack_require__(/*! ./index.css */ "./src/pages/User/index.css");

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
      return _remixjs["default"].createElement(_components.ScrollView, null, _remixjs["default"].createElement(_components.View, {
        className: "test"
      }, _remixjs["default"].createElement(_components.Image, {
        src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg"
      }), _remixjs["default"].createElement(_components.Picker, {
        mode: "date"
      }, "OH"), _remixjs["default"].createElement(_components.Swiper, {
        duration: 1000,
        interval: 1000,
        indicatorDots: true
      }, _remixjs["default"].createElement(_components.Swiper.SwiperItem, null, _remixjs["default"].createElement(_components.Image, {
        src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg"
      })), _remixjs["default"].createElement(_components.Swiper.SwiperItem, null, _remixjs["default"].createElement(_components.Image, {
        src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg"
      })))));
    }
  }]);
  return Index;
}(_components.ViewController);

exports["default"] = Index;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL2RvY3VtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi8ufnJlbWl4L3J1bnRpbWUvYm9vdC5qcyIsIndlYnBhY2s6Ly8vLi8ufnJlbWl4L3J1bnRpbWUvY2xpZW50LnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vZ3JhcGhxbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9CdXR0b24vaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0J1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnB1dC9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9FeHBsb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9Vc2VyL1NpZ25Jbi9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL1VzZXIvU2lnbkluL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9Vc2VyL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvVXNlci9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicnVudGltZS9pbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vLn5yZW1peC9ydW50aW1lL2NsaWVudC5ydW50aW1lLmpzXCIsXCJydW50aW1lL3ZlbmRvci9tYW5pZmVzdFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwiLi9zcmMvY29tcG9uZW50c1wiKTtcblxuT2JqZWN0LmtleXMoX2NvbXBvbmVudHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9jb21wb25lbnRzW2tleV07XG4gICAgfVxuICB9KTtcbn0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2RvY3VtZW50ID0gcmVxdWlyZShcIi4vc3JjL2RvY3VtZW50XCIpO1xuXG5PYmplY3Qua2V5cyhfZG9jdW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9kb2N1bWVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBfZXhwb3J0TmFtZXMgPSB7fTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vc3JjL3JlYWN0XCIpKTtcblxuT2JqZWN0LmtleXMoX3JlYWN0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9leHBvcnROYW1lcywga2V5KSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfcmVhY3Rba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG52YXIgX2RlZmF1bHQgPSBfcmVhY3RbXCJkZWZhdWx0XCJdO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yb3V0ZXIgPSByZXF1aXJlKFwiLi9zcmMvcm91dGVyXCIpO1xuXG5PYmplY3Qua2V5cyhfcm91dGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfcm91dGVyW2tleV07XG4gICAgfVxuICB9KTtcbn0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXhwb3J0cy5wcm9ncmFtID0gdm9pZCAwO1xuXG52YXIgX3Byb2plY3QgPSByZXF1aXJlKFwicmVtaXhqcy9wcm9qZWN0XCIpO1xuXG52YXIgX2RvY3VtZW50ID0gcmVxdWlyZShcInJlbWl4anMvZG9jdW1lbnRcIik7XG5cbnZhciBfZW52ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVtaXhqcy9lbnZcIikpO1xuXG52YXIgX3NyYyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3NyY1wiKSk7XG5cbl9lbnZbXCJkZWZhdWx0XCJdLmlzVGVybWluYWxSdW50aW1lID0gdHJ1ZTtcbnZhciBwcm9ncmFtID0gbmV3IF9wcm9qZWN0LlByb2dyYW0oX3NyY1tcImRlZmF1bHRcIl0sIF9kb2N1bWVudC5kb2N1bWVudC5ib2R5KTtcbmV4cG9ydHMucHJvZ3JhbSA9IHByb2dyYW07XG52YXIgX2RlZmF1bHQgPSBwcm9ncmFtO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbnZhciBfYm9vdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vYm9vdFwiKSk7XG5cbl9ib290W1wiZGVmYXVsdFwiXS5zdGFydCgpOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO1xuXG4gIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIHZhciBuZXdPYmogPSB7fTtcblxuICBpZiAob2JqICE9IG51bGwpIHtcbiAgICB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDtcblxuICAgICAgICBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcblxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZS5zZXQob2JqLCBuZXdPYmopO1xuICB9XG5cbiAgcmV0dXJuIG5ld09iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZDsiLCJ2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSA9IHJlcXVpcmUoXCIuL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgdmFyIGtleSwgaTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXM7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG59XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuLyogZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuICAgIHZhciBjbGFzc2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmICghYXJnKSBjb250aW51ZTtcbiAgICAgIHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuICAgICAgaWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChhcmcpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuICAgICAgICB2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cbiAgICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKGlubmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG4gICAgICAgICAgaWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgY2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcbiAgICBkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZXM7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICB9XG59KSgpOyIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcblxudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xubW9kdWxlLmV4cG9ydHMgPSB1dWlkOyIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7IC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG5cbiAgcmV0dXJuIFtidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJywgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLCBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1dLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn0iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG5cbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7IC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuXG52YXIgX25vZGVJZDtcblxudmFyIF9jbG9ja3NlcTsgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG5cblxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwOyAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7IC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuXG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTsgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuXG4gIHZhciBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7IC8vIGB0aW1lX21pZGBcblxuICB2YXIgdG1oID0gbXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmOyAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjsgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG5cbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwOyAvLyBgY2xvY2tfc2VxX2xvd2BcblxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7IC8vIGBub2RlYFxuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxOyIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcblxudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBncmFwaHFsO1xuZXhwb3J0cy5kZWZhdWx0SGVhZGVycyA9IGV4cG9ydHMuZ2V0QXV0aG9yaXphdGlvblRva2VuID0gZXhwb3J0cy5hdXRob3JpemF0aW9uVG9rZW4gPSB2b2lkIDA7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbnZhciBfcHJvamVjdCA9IHJlcXVpcmUoXCJyZW1peGpzL3Byb2plY3RcIik7XG5cbnZhciBfdXVpZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInV1aWRcIikpO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoc291cmNlLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG52YXIgZW5kcG9ydCA9IFwiaHR0cDovL2FwaS5tdXd1LmluZm8vZ3JhcGhxbFwiO1xudmFyIGF1dGhvcml6YXRpb25LZXkgPSBcIl9hdXRob3JpemF0aW9uX3Rva2VuX1wiO1xuXG52YXIgZ2V0TG9jYWxBdXRob3JpemF0aW9uVG9rZW4gPSBmdW5jdGlvbiBnZXRMb2NhbEF1dGhvcml6YXRpb25Ub2tlbigpIHtcbiAgdmFyIHN0cmluZyA9IF9wcm9qZWN0LnRyYW5zcG9ydHMuYXBpLmdldFN0b3JhZ2VTeW5jKGF1dGhvcml6YXRpb25LZXkpO1xuXG4gIGlmIChzdHJpbmcpIHtcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcblxuICAgIGlmIChkYXRhLmV4cGlyZWRBdCA+IERhdGUubm93KCkpIHtcbiAgICAgIGV4cG9ydHMuYXV0aG9yaXphdGlvblRva2VuID0gYXV0aG9yaXphdGlvblRva2VuID0gZGF0YTtcbiAgICAgIGRlZmF1bHRIZWFkZXJzLkF1dGhvcml6YXRpb24gPSBcIlwiLmNvbmNhdChkYXRhLnR5cGUsIFwiIFwiKS5jb25jYXQoZGF0YS50b2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMuYXBpLnJlbW92ZVN0b3JhZ2VTeW5jKGF1dGhvcml6YXRpb25LZXkpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGF1dGhvcml6YXRpb25Ub2tlbiA9IG51bGw7XG5leHBvcnRzLmF1dGhvcml6YXRpb25Ub2tlbiA9IGF1dGhvcml6YXRpb25Ub2tlbjtcblxudmFyIGdldEF1dGhvcml6YXRpb25Ub2tlbiA9IGZ1bmN0aW9uIGdldEF1dGhvcml6YXRpb25Ub2tlbigpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBnZXRMb2NhbEF1dGhvcml6YXRpb25Ub2tlbigpO1xuXG4gICAgaWYgKGF1dGhvcml6YXRpb25Ub2tlbikge1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBfcHJvamVjdC50cmFuc3BvcnRzLmFwaS5sb2dpbigpLnRoZW4oZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBjb2RlID0gX3JlZi5jb2RlO1xuICAgICAgZ3JhcGhxbChcIlxcbiAgICAgICAgcXVlcnkgc2lnbkluKCRjb2RlOiBTdHJpbmchKSB7XFxuICAgICAgICAgIHNpZ25Jbihjb2RlOiAkY29kZSkge1xcbiAgICAgICAgICAgIHRva2VuXFxuICAgICAgICAgICAgdHlwZVxcbiAgICAgICAgICAgIGV4cGlyZXNJblxcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgXCIpKHtcbiAgICAgICAgY29kZTogY29kZVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciBzaWduSW4gPSByZXMuZGF0YS5zaWduSW47XG4gICAgICAgIGV4cG9ydHMuYXV0aG9yaXphdGlvblRva2VuID0gYXV0aG9yaXphdGlvblRva2VuID0gc2lnbkluO1xuICAgICAgICBkZWZhdWx0SGVhZGVycy5BdXRob3JpemF0aW9uID0gXCJcIi5jb25jYXQoc2lnbkluLnR5cGUsIFwiIFwiKS5jb25jYXQoc2lnbkluLnRva2VuKTtcblxuICAgICAgICBfcHJvamVjdC50cmFuc3BvcnRzLmFwaS5zZXRTdG9yYWdlU3luYyhhdXRob3JpemF0aW9uS2V5LCBKU09OLnN0cmluZ2lmeShfb2JqZWN0U3ByZWFkKHt9LCBzaWduSW4sIHtcbiAgICAgICAgICBleHBpcmVkQXQ6IERhdGUubm93KCkgKyBzaWduSW4uZXhwaXJlc0luICogMTAwMFxuICAgICAgICB9KSkpO1xuXG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge30pO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZ2V0QXV0aG9yaXphdGlvblRva2VuID0gZ2V0QXV0aG9yaXphdGlvblRva2VuO1xudmFyIGlzUmVBdXRob3JpemF0dGluZyA9IGZhbHNlO1xudmFyIHJlcXVlc3RRdWV1ZSA9IFtdO1xuXG52YXIgaGFuZGxlRXJyb3JzID0gZnVuY3Rpb24gaGFuZGxlRXJyb3JzKGVycm9ycywgdGFzaywgcmVqZWN0KSB7XG4gIHZhciBpc1N0b3AgPSBlcnJvcnMuc29tZShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICB2YXIgZXh0ZW5zaW9ucyA9IGVycm9yLmV4dGVuc2lvbnM7XG5cbiAgICBpZiAoZXh0ZW5zaW9ucy5jb2RlID09PSAnSU5WQUxJRF9UT0tFTicgfHwgZXh0ZW5zaW9ucy5jb2RlID09PSAnRVhQSVJFRF9UT0tFTicpIHtcbiAgICAgIHJlcXVlc3RRdWV1ZS5wdXNoKHRhc2spO1xuXG4gICAgICBpZiAoaXNSZUF1dGhvcml6YXR0aW5nKSB7fSBlbHNlIHtcbiAgICAgICAgaXNSZUF1dGhvcml6YXR0aW5nID0gdHJ1ZTtcblxuICAgICAgICBfcHJvamVjdC50cmFuc3BvcnRzLmFwaS5yZW1vdmVTdG9yYWdlU3luYyhhdXRob3JpemF0aW9uS2V5KTtcblxuICAgICAgICBkZWZhdWx0SGVhZGVycy5BdXRob3JpemF0aW9uID0gbnVsbDtcbiAgICAgICAgZXhwb3J0cy5hdXRob3JpemF0aW9uVG9rZW4gPSBhdXRob3JpemF0aW9uVG9rZW4gPSBudWxsO1xuICAgICAgICBnZXRBdXRob3JpemF0aW9uVG9rZW4oKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcTtcblxuICAgICAgICAgIHdoaWxlIChxID0gcmVxdWVzdFF1ZXVlLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgcSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzUmVBdXRob3JpemF0dGluZyA9IGZhbHNlO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICByZXF1ZXN0UXVldWUgPSBbXTtcbiAgICAgICAgICBpc1JlQXV0aG9yaXphdHRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFpc1N0b3ApIHtcbiAgICByZWplY3QoZXJyb3JzKTtcbiAgfVxufTtcblxudmFyIGRlZmF1bHRIZWFkZXJzID0ge307XG5leHBvcnRzLmRlZmF1bHRIZWFkZXJzID0gZGVmYXVsdEhlYWRlcnM7XG5cbmZ1bmN0aW9uIGdyYXBocWwocWwpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKHZhcmlhYmxlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgdGFzayA9IGZ1bmN0aW9uIHRhc2soKSB7XG4gICAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMuYXBpLnJlcXVlc3QoX29iamVjdFNwcmVhZCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICB9LCBvcHRpb25zLCB7XG4gICAgICAgICAgdXJsOiBlbmRwb3J0LFxuICAgICAgICAgIGhlYWRlcjogX29iamVjdFNwcmVhZCh7fSwgZGVmYXVsdEhlYWRlcnMsIHt9LCBvcHRpb25zLmhlYWRlcnMsIHtcbiAgICAgICAgICAgICd4LXRyYWNlLWlkJzogX3V1aWRbXCJkZWZhdWx0XCJdLnY0KClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBxdWVyeTogcWwsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XG5cbiAgICAgICAgICBpZiAoZGF0YS5lcnJvcnMpIHtcbiAgICAgICAgICAgIGhhbmRsZUVycm9ycyhkYXRhLmVycm9ycywgdGFzaywgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRhc2soKTtcbiAgICB9KTtcbiAgfTtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9leHRlbmRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKSk7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbnZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiKSk7XG5cbnZhciBfcmVtaXhqcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZW1peGpzXCIpKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZShcInJlbWl4anMvY29tcG9uZW50c1wiKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNsYXNzbmFtZXNcIikpO1xuXG5yZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIF9kZWZhdWx0KF9yZWYpIHtcbiAgdmFyIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgdHJhbnNwYXJlbnQgPSBfcmVmLnRyYW5zcGFyZW50LFxuICAgICAgcmVzdCA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMyW1wiZGVmYXVsdFwiXSkoX3JlZiwgW1wiY2xhc3NOYW1lXCIsIFwidHJhbnNwYXJlbnRcIl0pO1xuICB2YXIgY2xhc3NlcyA9ICgwLCBfY2xhc3NuYW1lczJbXCJkZWZhdWx0XCJdKSgoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHtcbiAgICAnY29tcG9uZW50X19idXR0b24nOiB0cnVlLFxuICAgICdjb21wb25lbnRfX2J1dHRvbl90cmFuc3BhcmVudCc6IHRyYW5zcGFyZW50XG4gIH0sIGNsYXNzTmFtZSwgISFjbGFzc05hbWUpKTtcbiAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkJ1dHRvbiwgKDAsIF9leHRlbmRzMltcImRlZmF1bHRcIl0pKHt9LCByZXN0LCB7XG4gICAgaG92ZXJDbGFzczogXCJub25lXCIsXG4gICAgcGxhaW46IHRydWVcbiAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzZXNcbiAgfSwgcmVzdC5jaGlsZHJlbikpO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9yZW1peGpzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlbWl4anNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiY2xhc3NuYW1lc1wiKSk7XG5cbnJlcXVpcmUoXCIuL2luZGV4LmNzc1wiKTtcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gX2RlZmF1bHQoX3JlZikge1xuICB2YXIgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICBsYWJlbCA9IF9yZWYubGFiZWwsXG4gICAgICBvbkNoYW5nZSA9IF9yZWYub25DaGFuZ2UsXG4gICAgICBhZnRlckFkZG9uID0gX3JlZi5hZnRlckFkZG9uLFxuICAgICAgcGxhY2Vob2xkZXIgPSBfcmVmLnBsYWNlaG9sZGVyLFxuICAgICAgZGlzYWJsZWQgPSBfcmVmLmRpc2FibGVkO1xuICB2YXIgY2xhc3NlcyA9ICgwLCBfY2xhc3NuYW1lczJbXCJkZWZhdWx0XCJdKSgoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHtcbiAgICAnY29tcG9uZW50X190ZXh0LWlucHV0JzogdHJ1ZSxcbiAgICAnY29tcG9uZW50X190ZXh0LWlucHV0X2Rpc2FibGVkJzogZGlzYWJsZWRcbiAgfSwgY2xhc3NOYW1lLCAhIWNsYXNzTmFtZSkpO1xuICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgIGNsYXNzTmFtZTogY2xhc3Nlc1xuICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgY2xhc3NOYW1lOiBcImNvbXBvbmVudF9fdGV4dC1pbnB1dC1hcmVhXCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuSW5wdXQsIHtcbiAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLFxuICAgIGNsYXNzTmFtZTogXCJjb21wb25lbnRfX3RleHQtaW5wdXQtaW5wdXRcIixcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgb25JbnB1dDogb25DaGFuZ2VcbiAgfSkpLCBhZnRlckFkZG9uKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfcmVtaXhqcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlbWl4anNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG52YXIgX3JvdXRlciA9IHJlcXVpcmUoXCJyZW1peGpzL3JvdXRlclwiKTtcblxudmFyIF9wcm9qZWN0ID0gcmVxdWlyZShcInJlbWl4anMvcHJvamVjdFwiKTtcblxudmFyIF9Vc2VyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYWdlcy9Vc2VyXCIpKTtcblxudmFyIF9FeHBsb3JlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYWdlcy9FeHBsb3JlXCIpKTtcblxudmFyIF9TaWduSW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhZ2VzL1VzZXIvU2lnbkluXCIpKTtcblxucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuXG52YXIgVGFiQmFySXRlbSA9IF9jb21wb25lbnRzLlRhYkJhci5UYWJCYXJJdGVtO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdCgpIHtcbiAgdmFyIG9uTGF1bmNoID0gZnVuY3Rpb24gb25MYXVuY2goKSB7Ly8gdHJhbnNwb3J0cy5hcGkuaGlkZVRhYkJhcih7XG4gICAgLy8gICBhbmltYXRpb246IHRydWVcbiAgICAvLyB9KTtcbiAgfTtcblxuICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuQXBwbGljYXRpb24sIHtcbiAgICBjb25maWc6IHtcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgbmF2aWdhdGlvblN0eWxlOiAnY3VzdG9tJ1xuICAgIH0sXG4gICAgb25MYXVuY2g6IG9uTGF1bmNoXG4gIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9yb3V0ZXIuUm91dGVyLCBudWxsLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfcm91dGVyLlJvdXRlLCB7XG4gICAgcGF0aDogXCJwYWdlcy9Vc2VyL1NpZ25Jbi9pbmRleFwiLFxuICAgIGNvbXBvbmVudDogX1NpZ25JbltcImRlZmF1bHRcIl1cbiAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9yb3V0ZXIuUm91dGUsIHtcbiAgICBwYXRoOiBcInBhZ2VzL0V4cGxvcmUvaW5kZXhcIixcbiAgICBjb21wb25lbnQ6IF9FeHBsb3JlW1wiZGVmYXVsdFwiXVxuICB9KSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX3JvdXRlci5Sb3V0ZSwge1xuICAgIHBhdGg6IFwicGFnZXMvVXNlci9pbmRleFwiLFxuICAgIGNvbXBvbmVudDogX1VzZXJbXCJkZWZhdWx0XCJdXG4gIH0pKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVGFiQmFyLCB7XG4gICAgY29sb3I6IFwiIzVkNGUzNlwiLFxuICAgIHNlbGVjdGVkQ29sb3I6IFwiI2JiOTc2Y1wiLFxuICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgYm9yZGVyU3R5bGU6IFwid2hpdGVcIlxuICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChUYWJCYXJJdGVtLCB7XG4gICAgcGF0aDogXCJwYWdlcy9Vc2VyL1NpZ25Jbi9pbmRleFwiXG4gIH0sIFwiXFx1NjVFNVxcdTdBMEJcIiksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFRhYkJhckl0ZW0sIHtcbiAgICBwYXRoOiBcInBhZ2VzL0V4cGxvcmUvaW5kZXhcIlxuICB9LCBcIlxcdTVBOTJcXHU0RjUzXFx1NTNEMVxcdTVFMDNcIiksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFRhYkJhckl0ZW0sIHtcbiAgICBwYXRoOiBcInBhZ2VzL0V4cGxvcmUvaW5kZXhcIlxuICB9LCBcIlxcdTVBOTJcXHU0RjUzXFx1OEQ0NFxcdTY1OTlcIiksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFRhYkJhckl0ZW0sIHtcbiAgICBwYXRoOiBcInBhZ2VzL0V4cGxvcmUvaW5kZXhcIlxuICB9LCBcIlxcdTUxNzNcXHU0RThFXCIpKSk7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX3JlbWl4anMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVtaXhqc1wiKSk7XG5cbnZhciBfY29tcG9uZW50cyA9IHJlcXVpcmUoXCJyZW1peGpzL2NvbXBvbmVudHNcIik7XG5cbnZhciBfZ3JhcGhxbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL2NvbW1vbi9ncmFwaHFsXCIpKTtcblxucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuXG52YXIgc2V0VXNlciA9ICgwLCBfZ3JhcGhxbFtcImRlZmF1bHRcIl0pKFwiXFxuICBtdXRhdGlvbiBzZXRVc2VyKCR1c2VyOiBJbnB1dE9mVXNlciEpIHtcXG4gICAgc2V0VXNlcih1c2VyOiAkdXNlcikge1xcbiAgICAgIG5pY2tuYW1lXFxuICAgICAgYXZhdGFyXFxuICAgIH1cXG4gIH1cXG5cIik7XG5cbnZhciBJbmRleCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1ZpZXdDb250cm9sbGVyKSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoSW5kZXgsIF9WaWV3Q29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gSW5kZXgoKSB7XG4gICAgdmFyIF9nZXRQcm90b3R5cGVPZjI7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEluZGV4KTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoX2dldFByb3RvdHlwZU9mMiA9ICgwLCBfZ2V0UHJvdG90eXBlT2YzW1wiZGVmYXVsdFwiXSkoSW5kZXgpKS5jYWxsLmFwcGx5KF9nZXRQcm90b3R5cGVPZjIsIFt0aGlzXS5jb25jYXQoYXJncykpKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJjb25maWdcIiwge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcbiAgICB9KTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJzdGF0ZVwiLCB7XG4gICAgICBjdXJyZW50OiAnbW92aWVzJ1xuICAgIH0pO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyW1wiZGVmYXVsdFwiXSkoX3RoaXMpLCBcIm9uQ2hhbmdlXCIsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudDoga2V5XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJvbkdldFVzZXJJbmZvXCIsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHZhciBkZXRhaWwgPSByZXMuZGV0YWlsO1xuICAgICAgdmFyIGVuY3J5cHRlZCA9IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgIHJhdyA9IGRldGFpbC5yYXdEYXRhLFxuICAgICAgICAgIHVzZXJpbmZvID0gZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgICAgIHNpZ25hdHVyZSA9IGRldGFpbC5zaWduYXR1cmUsXG4gICAgICAgICAgZXJyTXNnID0gZGV0YWlsLmVyck1zZyxcbiAgICAgICAgICBpdiA9IGRldGFpbC5pdjtcblxuICAgICAgaWYgKGVyck1zZyA9PT0gJ2dldFVzZXJJbmZvOm9rJykge1xuICAgICAgICBzZXRVc2VyKHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBpdjogaXYsXG4gICAgICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgICAgIGVuY3J5cHRlZDogZW5jcnlwdGVkLFxuICAgICAgICAgICAgc2lnbmF0dXJlOiBzaWduYXR1cmVcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge30pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge30pO1xuICAgICAgfSBlbHNlIHt9XG4gICAgfSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShJbmRleCwgW3tcbiAgICBrZXk6IFwiY29udGVudFJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb250ZW50UmVuZGVyKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnN0YXRlLmN1cnJlbnQ7XG4gICAgICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhfX2NvbnRlbnRcIlxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhcIlxuICAgICAgfSwgdGhpcy5jb250ZW50UmVuZGVyKCkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW5kZXg7XG59KF9jb21wb25lbnRzLlZpZXdDb250cm9sbGVyKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbmRleDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9yZW1peGpzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlbWl4anNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG52YXIgX3Byb2plY3QgPSByZXF1aXJlKFwicmVtaXhqcy9wcm9qZWN0XCIpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpKTtcblxudmFyIF9CdXR0b24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi8uLi9jb21wb25lbnRzL0J1dHRvblwiKSk7XG5cbnZhciBfSW5wdXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi8uLi9jb21wb25lbnRzL0lucHV0XCIpKTtcblxudmFyIF9ncmFwaHFsID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9ncmFwaHFsXCIpKTtcblxucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuXG52YXIgc2V0VXNlciA9ICgwLCBfZ3JhcGhxbFtcImRlZmF1bHRcIl0pKFwiXFxuICBtdXRhdGlvbiBzZXRVc2VyKCR1c2VyOiBJbnB1dE9mVXNlciEpIHtcXG4gICAgc2V0VXNlcih1c2VyOiAkdXNlcikge1xcbiAgICAgIG5pY2tuYW1lXFxuICAgICAgYXZhdGFyXFxuICAgIH1cXG4gIH1cXG5cIik7XG52YXIgZ2V0VXNlciA9ICgwLCBfZ3JhcGhxbFtcImRlZmF1bHRcIl0pKFwiXFxuICBxdWVyeSBnZXRVc2VyIHtcXG4gICAgZ2V0VXNlciB7XFxuICAgICAgYXZhdGFyXFxuICAgICAgbmlja25hbWVcXG4gICAgICBhdXRob3JpemVkXFxuICAgIH1cXG4gIH1cXG5cIik7XG5cbnZhciBMb2FkaW5nID0gZnVuY3Rpb24gTG9hZGluZygpIHtcbiAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fbG9hZGluZ1wiXG4gIH0sIFwiXFx1NjU3MFxcdTYzNkVcXHU1MkEwXFx1OEY3RFxcdTRFMkQuLi5cIik7XG59O1xuXG52YXIgQXV0aG9yaXplID0gZnVuY3Rpb24gQXV0aG9yaXplKF9yZWYpIHtcbiAgdmFyIG9uQXV0aG9yaXplID0gX3JlZi5vbkF1dGhvcml6ZTtcbiAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9CdXR0b25bXCJkZWZhdWx0XCJdLCB7XG4gICAgY2xhc3NOYW1lOiBcInNpZ24taW5fYnV0dG9uXCIsXG4gICAgb3BlblR5cGU6IFwiZ2V0VXNlckluZm9cIixcbiAgICBvbkdldFVzZXJJbmZvOiBvbkF1dGhvcml6ZVxuICB9LCBcIlxcdTVGQUVcXHU0RkUxXFx1NjM4OFxcdTY3NDNcIik7XG59O1xuXG52YXIgU2lnbkluID0gZnVuY3Rpb24gU2lnbkluKF9yZWYyKSB7XG4gIHZhciBvbkFncmVlID0gX3JlZjIub25BZ3JlZSxcbiAgICAgIGFncmVlZCA9IF9yZWYyLmFncmVlZCxcbiAgICAgIG9uUGhvbmVOdW1iZXJDaGFuZ2UgPSBfcmVmMi5vblBob25lTnVtYmVyQ2hhbmdlLFxuICAgICAgb25QaG9uZUNvZGVDaGFuZ2UgPSBfcmVmMi5vblBob25lQ29kZUNoYW5nZSxcbiAgICAgIHBob25lTnVtYmVyID0gX3JlZjIucGhvbmVOdW1iZXIsXG4gICAgICBjb2RlID0gX3JlZjIuY29kZTtcbiAgdmFyIGNsYXNzZXMgPSAoMCwgX2NsYXNzbmFtZXNbXCJkZWZhdWx0XCJdKSh7XG4gICAgJ3NpZ24taW5fX3Byb3RvY29sLWNoZWNrYm94JzogdHJ1ZSxcbiAgICAnc2lnbi1pbl9fcHJvdG9jb2wtY2hlY2tib3hfY2hlY2tlZCc6IGFncmVlZFxuICB9KTtcbiAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fZm9ybVwiXG4gIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fcm93XCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0lucHV0W1wiZGVmYXVsdFwiXSwge1xuICAgIHZhbHVlOiBwaG9uZU51bWJlcixcbiAgICBwbGFjZWhvbGRlcjogXCJcXHU2MjRCXFx1NjczQVxcdTUzRjdcIixcbiAgICBvbkNoYW5nZTogb25QaG9uZU51bWJlckNoYW5nZVxuICB9KSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fcm93XCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0lucHV0W1wiZGVmYXVsdFwiXSwge1xuICAgIHZhbHVlOiBjb2RlLFxuICAgIHBsYWNlaG9sZGVyOiBcIlxcdTlBOENcXHU4QkMxXFx1NzgwMVwiLFxuICAgIG9uQ2hhbmdlOiBvblBob25lQ29kZUNoYW5nZVxuICB9KSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fcm93XCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0J1dHRvbltcImRlZmF1bHRcIl0sIG51bGwsIFwiXFx1NzY3QlxcdTVGNTVcIikpLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgY2xhc3NOYW1lOiBcInNpZ24taW5fX3Byb3RvY29sXCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgIGNsYXNzTmFtZTogY2xhc3NlcyxcbiAgICBvblRhcDogb25BZ3JlZVxuICB9KSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgIGNsYXNzTmFtZTogXCJzaWduLWluX19wcm90b2NvbC10ZXh0XCJcbiAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fcHJvdG9jb2wtbGlua1wiXG4gIH0pKSk7XG59O1xuXG52YXIgVGlwcyA9IGZ1bmN0aW9uIFRpcHMoX3JlZjMpIHtcbiAgdmFyIGlzRGF0YUxvYWRlZCA9IF9yZWYzLmlzRGF0YUxvYWRlZDtcbiAgdmFyIGNsYXNzZXMgPSAoMCwgX2NsYXNzbmFtZXNbXCJkZWZhdWx0XCJdKSh7XG4gICAgJ3NpZ24taW5fX3RpcHMnOiB0cnVlLFxuICAgICdzaWduLWluX190aXBzX3Zpc2libGUnOiBpc0RhdGFMb2FkZWRcbiAgfSk7XG4gIHJldHVybiBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgY2xhc3NOYW1lOiBjbGFzc2VzXG4gIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIG51bGwsIFwiVElQXFx1RkYxQVxcdTk5OTZcXHU2QjIxXFx1NzY3QlxcdTVGNTVcXHU4QkY3XFx1NkNFOFxcdTUxOENcXHU1Qjk4XFx1NjVCOVxcdThCQTRcXHU4QkMxXFx1RkYwQ1wiKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywgbnVsbCwgXCJcXHU0RUU1XFx1NUYwMFxcdTU0MkZcXHU1QzBGXFx1N0EwQlxcdTVFOEZcXHU2NzBEXFx1NTJBMVxcdTUxNjhcXHU1MjlGXFx1ODBGRFwiKSk7XG59O1xuXG52YXIgSW5kZXggPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9WaWV3Q29udHJvbGxlcikge1xuICAoMCwgX2luaGVyaXRzMltcImRlZmF1bHRcIl0pKEluZGV4LCBfVmlld0NvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIEluZGV4KCkge1xuICAgIHZhciBfZ2V0UHJvdG90eXBlT2YyO1xuXG4gICAgdmFyIF90aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBJbmRleCk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yW1wiZGVmYXVsdFwiXSkodGhpcywgKF9nZXRQcm90b3R5cGVPZjIgPSAoMCwgX2dldFByb3RvdHlwZU9mM1tcImRlZmF1bHRcIl0pKEluZGV4KSkuY2FsbC5hcHBseShfZ2V0UHJvdG90eXBlT2YyLCBbdGhpc10uY29uY2F0KGFyZ3MpKSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwiY29uZmlnXCIsIHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnXG4gICAgfSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwic3RhdGVcIiwge1xuICAgICAgcGhvbmVOdW1iZXI6IG51bGwsXG4gICAgICBjb2RlOiBudWxsLFxuICAgICAgYWdyZWVkOiBmYWxzZSxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgYXV0aG9yaXplZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBpc0RhdGFMb2FkZWQ6IGZhbHNlXG4gICAgfSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwiZ2V0VXNlckluZm9tYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgZ2V0VXNlcigpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgZ2V0VXNlciA9IHJlcy5kYXRhLmdldFVzZXI7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXI6IGdldFVzZXIsXG4gICAgICAgICAgaXNEYXRhTG9hZGVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7Ly8gZGVidWdnZXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJvbkNoYW5nZVwiLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnQ6IGtleVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwib25BdXRob3JpemVcIiwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgdmFyIGRldGFpbCA9IHJlcy5kZXRhaWw7XG4gICAgICB2YXIgZW5jcnlwdGVkID0gZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgcmF3ID0gZGV0YWlsLnJhd0RhdGEsXG4gICAgICAgICAgdXNlcmluZm8gPSBkZXRhaWwudXNlckluZm8sXG4gICAgICAgICAgc2lnbmF0dXJlID0gZGV0YWlsLnNpZ25hdHVyZSxcbiAgICAgICAgICBlcnJNc2cgPSBkZXRhaWwuZXJyTXNnLFxuICAgICAgICAgIGl2ID0gZGV0YWlsLml2O1xuXG4gICAgICBpZiAoZXJyTXNnID09PSAnZ2V0VXNlckluZm86b2snKSB7XG4gICAgICAgIHNldFVzZXIoe1xuICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgIGl2OiBpdixcbiAgICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgICAgZW5jcnlwdGVkOiBlbmNyeXB0ZWQsXG4gICAgICAgICAgICBzaWduYXR1cmU6IHNpZ25hdHVyZVxuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7fSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7fSk7XG4gICAgICB9IGVsc2Uge31cbiAgICB9KTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJvblBob25lQ29kZUNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGRldGFpbCA9IGUuZGV0YWlsO1xuXG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvZGU6IGRldGFpbC52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwib25QaG9uZU51bWJlckNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGRldGFpbCA9IGUuZGV0YWlsO1xuXG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBob25lTnVtYmVyOiBkZXRhaWwudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyW1wiZGVmYXVsdFwiXSkoX3RoaXMpLCBcImNvbnRlbnRSZW5kZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzJHN0YXRlID0gX3RoaXMuc3RhdGUsXG4gICAgICAgICAgdXNlciA9IF90aGlzJHN0YXRlLnVzZXIsXG4gICAgICAgICAgcGhvbmVOdW1iZXIgPSBfdGhpcyRzdGF0ZS5waG9uZU51bWJlcixcbiAgICAgICAgICBjb2RlID0gX3RoaXMkc3RhdGUuY29kZSxcbiAgICAgICAgICBhZ3JlZWQgPSBfdGhpcyRzdGF0ZS5hZ3JlZWQ7XG4gICAgICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9fY29udGVudFwiXG4gICAgICB9LCAhdXNlci5hdXRob3JpemVkID8gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoU2lnbkluLCB7XG4gICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgb25QaG9uZUNvZGVDaGFuZ2U6IF90aGlzLm9uUGhvbmVDb2RlQ2hhbmdlLFxuICAgICAgICBvblBob25lTnVtYmVyQ2hhbmdlOiBfdGhpcy5vblBob25lTnVtYmVyQ2hhbmdlLFxuICAgICAgICBvbkFncmVlOiBfdGhpcy5vbkFncmVlLFxuICAgICAgICBhZ3JlZWQ6IGFncmVlZFxuICAgICAgfSkgOiBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChBdXRob3JpemUsIHtcbiAgICAgICAgb25BdXRob3JpemU6IF90aGlzLm9uQXV0aG9yaXplXG4gICAgICB9KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShJbmRleCwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAoMCwgX2dyYXBocWwuZ2V0QXV0aG9yaXphdGlvblRva2VuKSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuZ2V0VXNlckluZm9tYXRpb24oKTtcbiAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge30pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGlzRGF0YUxvYWRlZCA9IHRoaXMuc3RhdGUuaXNEYXRhTG9hZGVkO1xuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcInNpZ24taW5cIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwic2lnbi1pbl9faGVhZGVyXCJcbiAgICAgIH0pLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJzaWduLWluX19ib2R5XCJcbiAgICAgIH0sICFpc0RhdGFMb2FkZWQgPyB0aGlzLmNvbnRlbnRSZW5kZXIoKSA6IF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KExvYWRpbmcsIG51bGwpLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChUaXBzLCB7XG4gICAgICAgIGlzRGF0YUxvYWRlZDogaXNEYXRhTG9hZGVkXG4gICAgICB9KSkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW5kZXg7XG59KF9jb21wb25lbnRzLlZpZXdDb250cm9sbGVyKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBJbmRleDsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9yZW1peGpzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlbWl4anNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG52YXIgX3Byb2plY3QgPSByZXF1aXJlKFwicmVtaXhqcy9wcm9qZWN0XCIpO1xuXG52YXIgX3JlbWl4anNNZXNzYWdlUHJvdG9jb2wgPSByZXF1aXJlKFwicmVtaXhqcy1tZXNzYWdlLXByb3RvY29sXCIpO1xuXG5yZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbnZhciBJbmRleCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1ZpZXdDb250cm9sbGVyKSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoSW5kZXgsIF9WaWV3Q29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gSW5kZXgoKSB7XG4gICAgdmFyIF9nZXRQcm90b3R5cGVPZjI7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEluZGV4KTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoX2dldFByb3RvdHlwZU9mMiA9ICgwLCBfZ2V0UHJvdG90eXBlT2YzW1wiZGVmYXVsdFwiXSkoSW5kZXgpKS5jYWxsLmFwcGx5KF9nZXRQcm90b3R5cGVPZjIsIFt0aGlzXS5jb25jYXQoYXJncykpKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJjb25maWdcIiwge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEluZGV4LCBbe1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge31cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlNjcm9sbFZpZXcsIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcInRlc3RcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuSW1hZ2UsIHtcbiAgICAgICAgc3JjOiBcImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MjEyNDIyNjEwMiZkaT04ODMxODViMmNiNDhhODNjNTM2ZTdmNTUwOTEzZWJhMCZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZiLXNzbC5kdWl0YW5nLmNvbSUyRnVwbG9hZHMlMkZpdGVtJTJGMjAxODAxJTJGMTklMkYyMDE4MDExOTA3MjU1NF9mcG9wZS5qcGdcIlxuICAgICAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlBpY2tlciwge1xuICAgICAgICBtb2RlOiBcImRhdGVcIlxuICAgICAgfSwgXCJPSFwiKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLCB7XG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbnRlcnZhbDogMTAwMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZVxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLlN3aXBlckl0ZW0sIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkltYWdlLCB7XG4gICAgICAgIHNyYzogXCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCJcbiAgICAgIH0pKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLlN3aXBlckl0ZW0sIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkltYWdlLCB7XG4gICAgICAgIHNyYzogXCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCJcbiAgICAgIH0pKSkpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEluZGV4O1xufShfY29tcG9uZW50cy5WaWV3Q29udHJvbGxlcik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSW5kZXg7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBLFdBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNySkE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6Q0E7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakVBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6R0E7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdPQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==