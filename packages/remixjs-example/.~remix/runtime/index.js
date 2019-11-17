/*** MARK_1574002414124 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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

/***/ "../remixjs/prop-types.js":
/*!********************************!*\
  !*** ../remixjs/prop-types.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../remixjs/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _PropTypes = _interopRequireDefault(__webpack_require__(/*! ./src/react/PropTypes */ "../remixjs/src/react/PropTypes.js"));

var _default = _PropTypes["default"];
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

var _User = _interopRequireDefault(__webpack_require__(/*! ./pages/User */ "./src/pages/User/index.js"));

var _Explore = _interopRequireDefault(__webpack_require__(/*! ./pages/Explore */ "./src/pages/Explore/index.js"));

var _me = _interopRequireDefault(__webpack_require__(/*! ./static/images/me.png */ "./src/static/images/me.png"));

var _me_selected = _interopRequireDefault(__webpack_require__(/*! ./static/images/me_selected.png */ "./src/static/images/me_selected.png"));

var _explore = _interopRequireDefault(__webpack_require__(/*! ./static/images/explore.png */ "./src/static/images/explore.png"));

var _explore_selected = _interopRequireDefault(__webpack_require__(/*! ./static/images/explore_selected.png */ "./src/static/images/explore_selected.png"));

__webpack_require__(/*! ./index.css */ "./src/index.css");

var TabBarItem = _components.TabBar.TabBarItem;

var _default = function _default() {
  return _remixjs["default"].createElement(_components.Application, {
    config: {
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    },
    onLaunch: function onLaunch(options) {}
  }, _remixjs["default"].createElement(_router.Router, null, _remixjs["default"].createElement(_router.Route, {
    path: "pages/Explore/index",
    component: _Explore["default"]
  }), _remixjs["default"].createElement(_router.Route, {
    path: "pages/User/index",
    component: _User["default"]
  })), _remixjs["default"].createElement(_components.TabBar, {
    selectedColor: '#333333'
  }, _remixjs["default"].createElement(TabBarItem, {
    path: "pages/Explore/index",
    icon: _me["default"],
    selectedIcon: _me_selected["default"]
  }, "\u53D1\u73B0"), _remixjs["default"].createElement(TabBarItem, {
    path: "pages/User/index",
    icon: _explore["default"],
    selectedIcon: _explore_selected["default"]
  }, "\u6211")));
};

exports["default"] = _default;

/***/ }),

/***/ "./src/pages/Explore/components/Card/index.css":
/*!*****************************************************!*\
  !*** ./src/pages/Explore/components/Card/index.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Explore/components/Card/index.js":
/*!****************************************************!*\
  !*** ./src/pages/Explore/components/Card/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Card;

var _remixjs = _interopRequireWildcard(__webpack_require__(/*! remixjs */ "../remixjs/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

__webpack_require__(/*! ./index.css */ "./src/pages/Explore/components/Card/index.css");

function Card(props) {
  var cover = props.cover,
      name = props.name,
      tags = props.tags,
      like = props.like;
  return _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card"
  }, _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-cover"
  }, _remixjs["default"].createElement(_components.Image, {
    mode: "aspectFill",
    className: "index__movies-card-cover-image",
    src: cover
  })), _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-meta"
  }, _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-name"
  }, _remixjs["default"].createElement(_components.Text, {
    className: "index__movies-card-title-text"
  }, name), _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-share-icon"
  })), _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-author"
  }), _remixjs["default"].createElement(_components.View, {
    className: "index__movies-card-tags"
  }, tags.map(function (tag) {
    return "#".concat(tag);
  }).join(' '))));
}

/***/ }),

/***/ "./src/pages/Explore/components/Menus/index.css":
/*!******************************************************!*\
  !*** ./src/pages/Explore/components/Menus/index.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Explore/components/Menus/index.js":
/*!*****************************************************!*\
  !*** ./src/pages/Explore/components/Menus/index.js ***!
  \*****************************************************/
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

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../remixjs/prop-types.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _components = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");

__webpack_require__(/*! ./index.css */ "./src/pages/Explore/components/Menus/index.css");

var Item = function Item() {};

var Menus =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Menus, _Component);

  function Menus() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Menus);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Menus)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      activedKey: _this.props.current
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMenuItemClick", function (key) {
      var onChange = _this.props.onChange;

      if (key !== _this.state.activedKey) {
        _this.setState({
          activedKey: key
        }, function () {
          onChange(key);
        });
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(Menus, [{
    key: "headerRender",
    value: function headerRender() {
      var _this2 = this;

      var activedKey = this.state.activedKey;
      var children = [];
      var activedIndex = 0;

      _remixjs.Children.forEach(this.props.children, function (child, index) {
        if (child) {
          if (child.type === Menus.Item) {
            var props = child.props;
            var key = props.key || child.key;
            var isActived = key === activedKey;

            if (isActived) {
              activedIndex = index;
            }

            var classes = (0, _classnames["default"])({
              'index__menu-item-tab': true,
              'index__menu-item-tab_active': isActived
            });
            children.push(_remixjs["default"].createElement(_components.View, {
              className: classes,
              key: key,
              onTap: function onTap(e) {
                return _this2.onMenuItemClick(key, e);
              }
            }, _remixjs["default"].createElement(_components.Text, null, props.name)));
          }
        }
      });

      var left = (activedIndex * 2 + 1) * (100 / (children.length * 2)) + '%';
      return _remixjs["default"].createElement(_components.View, {
        className: "index__menus-tabs"
      }, _remixjs["default"].createElement(_components.View, {
        className: "index__menus-tabs-inner"
      }, children), _remixjs["default"].createElement(_components.View, {
        className: "index__menus-tabs-line",
        key: "line",
        style: {
          left: left
        }
      }));
    }
  }, {
    key: "contentRender",
    value: function contentRender() {
      var activedKey = this.state.activedKey;
      var children = [];

      _remixjs.Children.forEach(this.props.children, function (child) {
        if (child) {
          if (child.type === Menus.Item) {
            var props = child.props;
            var key = props.key || child.key;
            var classes = (0, _classnames["default"])({
              'index__menu-item-content': true,
              'index__menu-item-content_active': key === activedKey
            });
            children.push(_remixjs["default"].createElement(_components.View, {
              className: classes,
              key: key
            }, props.children));
          }
        }
      });

      return _remixjs["default"].createElement(_components.View, {
        className: "index__menus-content"
      }, children);
    }
  }, {
    key: "render",
    value: function render() {
      return _remixjs["default"].createElement(_components.View, {
        className: "index__menus"
      }, this.headerRender(), this.contentRender());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      if (nextProps.current !== state.activedKey) {
        return {
          activedKey: nextProps.current
        };
      }

      return null;
    }
  }]);
  return Menus;
}(_remixjs.Component);

exports["default"] = Menus;
(0, _defineProperty2["default"])(Menus, "Item", Item);

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

var _Menus = _interopRequireDefault(__webpack_require__(/*! ./components/Menus */ "./src/pages/Explore/components/Menus/index.js"));

var _Card = _interopRequireDefault(__webpack_require__(/*! ./components/Card */ "./src/pages/Explore/components/Card/index.js"));

__webpack_require__(/*! ./index.css */ "./src/pages/Explore/index.css");

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
    return _this;
  }

  (0, _createClass2["default"])(Index, [{
    key: "headerRender",
    value: function headerRender() {
      return _remixjs["default"].createElement(_components.View, {
        className: "index__header"
      }, _remixjs["default"].createElement(_components.Video, {
        loop: true,
        autoplay: true,
        objectFit: true,
        controls: false,
        showPlayButton: false,
        showCenterPlayButton: false,
        showProgress: false,
        showMuteButton: false,
        className: "index__video",
        src: "http://f.video.weibocdn.com/001Npztxlx07y7EjSeUg01041200g3Xe0E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=62b30a3f061b162e421008955c73f536&Expires=1572458748&ssig=KGBVxAVrS0&KID=unistore,video"
      }));
    }
  }, {
    key: "contentRender",
    value: function contentRender() {
      var current = this.state.current;
      return _remixjs["default"].createElement(_components.View, {
        className: "index__content"
      }, _remixjs["default"].createElement(_Menus["default"], {
        current: current,
        onChange: this.onChange
      }, _remixjs["default"].createElement(_Menus["default"].Item, {
        name: "\u5F71\u7247",
        key: "movies"
      }, _remixjs["default"].createElement(_components.View, {
        className: "index__movies"
      }, _remixjs["default"].createElement(_Card["default"], {
        name: "\u5C11\u5E74\u7684\u4F60",
        cover: 'https://p1.meituan.net/movie/7b437e3a0d08d10e374ddc34f71b88fe3379132.jpg',
        tags: ['爱情', '青春', '剧情'],
        like: "10\u4E07"
      }), _remixjs["default"].createElement(_Card["default"], {
        name: "\u7EC8\u7ED3\u8005\uFF1A\u9ED1\u6697\u547D\u8FD0",
        cover: 'http://p1.meituan.net/movie/b932f7f678a3e28763b3b281b3e120ef13622509.jpg',
        tags: ['动作', '科幻', '冒险'],
        like: "50\u4E07"
      }))), _remixjs["default"].createElement(_Menus["default"].Item, {
        name: "\u884C\u7A0B",
        key: "schedule"
      }, _remixjs["default"].createElement(_components.View, {
        className: "index__schedule"
      }, _remixjs["default"].createElement(_components.ScrollView, null, _remixjs["default"].createElement(_components.View, {
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
      }))))))), _remixjs["default"].createElement(_Menus["default"].Item, {
        name: "\u5173\u4E8E",
        key: "about"
      }, _remixjs["default"].createElement(_components.View, {
        className: "index__about"
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      return _remixjs["default"].createElement(_components.View, {
        className: "index"
      }, this.headerRender(), this.contentRender());
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

/***/ }),

/***/ "./src/static/images/explore.png":
/*!***************************************!*\
  !*** ./src/static/images/explore.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/static/images/explore.png";

/***/ }),

/***/ "./src/static/images/explore_selected.png":
/*!************************************************!*\
  !*** ./src/static/images/explore_selected.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/static/images/explore_selected.png";

/***/ }),

/***/ "./src/static/images/me.png":
/*!**********************************!*\
  !*** ./src/static/images/me.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/static/images/me.png";

/***/ }),

/***/ "./src/static/images/me_selected.png":
/*!*******************************************!*\
  !*** ./src/static/images/me_selected.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/static/images/me_selected.png";

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9jb21wb25lbnRzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL2RvY3VtZW50LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3Byb3AtdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvcm91dGVyLmpzIiwid2VicGFjazovLy8uLy5+cmVtaXgvcnVudGltZS9ib290LmpzIiwid2VicGFjazovLy8uLy5+cmVtaXgvcnVudGltZS9jbGllbnQucnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvY29tcG9uZW50cy9DYXJkL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvRXhwbG9yZS9jb21wb25lbnRzL0NhcmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvY29tcG9uZW50cy9NZW51cy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvY29tcG9uZW50cy9NZW51cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvRXhwbG9yZS9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL1VzZXIvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9Vc2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdGF0aWMvaW1hZ2VzL2V4cGxvcmUucG5nIiwid2VicGFjazovLy8uL3NyYy9zdGF0aWMvaW1hZ2VzL2V4cGxvcmVfc2VsZWN0ZWQucG5nIiwid2VicGFjazovLy8uL3NyYy9zdGF0aWMvaW1hZ2VzL21lLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGljL2ltYWdlcy9tZV9zZWxlY3RlZC5wbmciXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInJ1bnRpbWUvaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuLy5+cmVtaXgvcnVudGltZS9jbGllbnQucnVudGltZS5qc1wiLFwicnVudGltZS92ZW5kb3IvbWFuaWZlc3RcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZShcIi4vc3JjL2NvbXBvbmVudHNcIik7XG5cbk9iamVjdC5rZXlzKF9jb21wb25lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfY29tcG9uZW50c1trZXldO1xuICAgIH1cbiAgfSk7XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9kb2N1bWVudCA9IHJlcXVpcmUoXCIuL3NyYy9kb2N1bWVudFwiKTtcblxuT2JqZWN0LmtleXMoX2RvY3VtZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfZG9jdW1lbnRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgX2V4cG9ydE5hbWVzID0ge307XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL3NyYy9yZWFjdFwiKSk7XG5cbk9iamVjdC5rZXlzKF9yZWFjdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfZXhwb3J0TmFtZXMsIGtleSkpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xudmFyIF9kZWZhdWx0ID0gX3JlYWN0W1wiZGVmYXVsdFwiXTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfUHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zcmMvcmVhY3QvUHJvcFR5cGVzXCIpKTtcblxudmFyIF9kZWZhdWx0ID0gX1Byb3BUeXBlc1tcImRlZmF1bHRcIl07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JvdXRlciA9IHJlcXVpcmUoXCIuL3NyYy9yb3V0ZXJcIik7XG5cbk9iamVjdC5rZXlzKF9yb3V0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9yb3V0ZXJba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBleHBvcnRzLnByb2dyYW0gPSB2b2lkIDA7XG5cbnZhciBfcHJvamVjdCA9IHJlcXVpcmUoXCJyZW1peGpzL3Byb2plY3RcIik7XG5cbnZhciBfZG9jdW1lbnQgPSByZXF1aXJlKFwicmVtaXhqcy9kb2N1bWVudFwiKTtcblxudmFyIF9lbnYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZW1peGpzL2VudlwiKSk7XG5cbnZhciBfc3JjID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vc3JjXCIpKTtcblxuX2VudltcImRlZmF1bHRcIl0uaXNUZXJtaW5hbFJ1bnRpbWUgPSB0cnVlO1xudmFyIHByb2dyYW0gPSBuZXcgX3Byb2plY3QuUHJvZ3JhbShfc3JjW1wiZGVmYXVsdFwiXSwgX2RvY3VtZW50LmRvY3VtZW50LmJvZHkpO1xuZXhwb3J0cy5wcm9ncmFtID0gcHJvZ3JhbTtcbnZhciBfZGVmYXVsdCA9IHByb2dyYW07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxudmFyIF9ib290ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ib290XCIpKTtcblxuX2Jvb3RbXCJkZWZhdWx0XCJdLnN0YXJ0KCk7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG4gIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH07XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKTtcblxuICBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KG9iaik7XG4gIH1cblxuICB2YXIgbmV3T2JqID0ge307XG5cbiAgaWYgKG9iaiAhPSBudWxsKSB7XG4gICAgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7XG5cbiAgICAgICAgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7XG5cbiAgaWYgKGNhY2hlKSB7XG4gICAgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTtcbiAgfVxuXG4gIHJldHVybiBuZXdPYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG59XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuLyogZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuICAgIHZhciBjbGFzc2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmICghYXJnKSBjb250aW51ZTtcbiAgICAgIHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuICAgICAgaWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChhcmcpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuICAgICAgICB2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cbiAgICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKGlubmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG4gICAgICAgICAgaWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgY2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcbiAgICBkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZXM7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICB9XG59KSgpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX3JlbWl4anMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZW1peGpzXCIpKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZShcInJlbWl4anMvY29tcG9uZW50c1wiKTtcblxudmFyIF9yb3V0ZXIgPSByZXF1aXJlKFwicmVtaXhqcy9yb3V0ZXJcIik7XG5cbnZhciBfVXNlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFnZXMvVXNlclwiKSk7XG5cbnZhciBfRXhwbG9yZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFnZXMvRXhwbG9yZVwiKSk7XG5cbnZhciBfbWUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0YXRpYy9pbWFnZXMvbWUucG5nXCIpKTtcblxudmFyIF9tZV9zZWxlY3RlZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RhdGljL2ltYWdlcy9tZV9zZWxlY3RlZC5wbmdcIikpO1xuXG52YXIgX2V4cGxvcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0YXRpYy9pbWFnZXMvZXhwbG9yZS5wbmdcIikpO1xuXG52YXIgX2V4cGxvcmVfc2VsZWN0ZWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0YXRpYy9pbWFnZXMvZXhwbG9yZV9zZWxlY3RlZC5wbmdcIikpO1xuXG5yZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbnZhciBUYWJCYXJJdGVtID0gX2NvbXBvbmVudHMuVGFiQmFyLlRhYkJhckl0ZW07XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIF9kZWZhdWx0KCkge1xuICByZXR1cm4gX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuQXBwbGljYXRpb24sIHtcbiAgICBjb25maWc6IHtcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIG5hdmlnYXRpb25TdHlsZTogJ2N1c3RvbSdcbiAgICB9LFxuICAgIG9uTGF1bmNoOiBmdW5jdGlvbiBvbkxhdW5jaChvcHRpb25zKSB7fVxuICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfcm91dGVyLlJvdXRlciwgbnVsbCwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX3JvdXRlci5Sb3V0ZSwge1xuICAgIHBhdGg6IFwicGFnZXMvRXhwbG9yZS9pbmRleFwiLFxuICAgIGNvbXBvbmVudDogX0V4cGxvcmVbXCJkZWZhdWx0XCJdXG4gIH0pLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfcm91dGVyLlJvdXRlLCB7XG4gICAgcGF0aDogXCJwYWdlcy9Vc2VyL2luZGV4XCIsXG4gICAgY29tcG9uZW50OiBfVXNlcltcImRlZmF1bHRcIl1cbiAgfSkpLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5UYWJCYXIsIHtcbiAgICBzZWxlY3RlZENvbG9yOiAnIzMzMzMzMydcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoVGFiQmFySXRlbSwge1xuICAgIHBhdGg6IFwicGFnZXMvRXhwbG9yZS9pbmRleFwiLFxuICAgIGljb246IF9tZVtcImRlZmF1bHRcIl0sXG4gICAgc2VsZWN0ZWRJY29uOiBfbWVfc2VsZWN0ZWRbXCJkZWZhdWx0XCJdXG4gIH0sIFwiXFx1NTNEMVxcdTczQjBcIiksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFRhYkJhckl0ZW0sIHtcbiAgICBwYXRoOiBcInBhZ2VzL1VzZXIvaW5kZXhcIixcbiAgICBpY29uOiBfZXhwbG9yZVtcImRlZmF1bHRcIl0sXG4gICAgc2VsZWN0ZWRJY29uOiBfZXhwbG9yZV9zZWxlY3RlZFtcImRlZmF1bHRcIl1cbiAgfSwgXCJcXHU2MjExXCIpKSk7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDYXJkO1xuXG52YXIgX3JlbWl4anMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVtaXhqc1wiKSk7XG5cbnZhciBfY29tcG9uZW50cyA9IHJlcXVpcmUoXCJyZW1peGpzL2NvbXBvbmVudHNcIik7XG5cbnJlcXVpcmUoXCIuL2luZGV4LmNzc1wiKTtcblxuZnVuY3Rpb24gQ2FyZChwcm9wcykge1xuICB2YXIgY292ZXIgPSBwcm9wcy5jb3ZlcixcbiAgICAgIG5hbWUgPSBwcm9wcy5uYW1lLFxuICAgICAgdGFncyA9IHByb3BzLnRhZ3MsXG4gICAgICBsaWtlID0gcHJvcHMubGlrZTtcbiAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5kZXhfX21vdmllcy1jYXJkXCJcbiAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgIGNsYXNzTmFtZTogXCJpbmRleF9fbW92aWVzLWNhcmQtY292ZXJcIlxuICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5JbWFnZSwge1xuICAgIG1vZGU6IFwiYXNwZWN0RmlsbFwiLFxuICAgIGNsYXNzTmFtZTogXCJpbmRleF9fbW92aWVzLWNhcmQtY292ZXItaW1hZ2VcIixcbiAgICBzcmM6IGNvdmVyXG4gIH0pKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgIGNsYXNzTmFtZTogXCJpbmRleF9fbW92aWVzLWNhcmQtbWV0YVwiXG4gIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5kZXhfX21vdmllcy1jYXJkLW5hbWVcIlxuICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5UZXh0LCB7XG4gICAgY2xhc3NOYW1lOiBcImluZGV4X19tb3ZpZXMtY2FyZC10aXRsZS10ZXh0XCJcbiAgfSwgbmFtZSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5kZXhfX21vdmllcy1jYXJkLXNoYXJlLWljb25cIlxuICB9KSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICBjbGFzc05hbWU6IFwiaW5kZXhfX21vdmllcy1jYXJkLWF1dGhvclwiXG4gIH0pLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgY2xhc3NOYW1lOiBcImluZGV4X19tb3ZpZXMtY2FyZC10YWdzXCJcbiAgfSwgdGFncy5tYXAoZnVuY3Rpb24gKHRhZykge1xuICAgIHJldHVybiBcIiNcIi5jb25jYXQodGFnKTtcbiAgfSkuam9pbignICcpKSkpO1xufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIikpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX3JlbWl4anMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVtaXhqc1wiKSk7XG5cbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNsYXNzbmFtZXNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG5yZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbnZhciBJdGVtID0gZnVuY3Rpb24gSXRlbSgpIHt9O1xuXG52YXIgTWVudXMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czJbXCJkZWZhdWx0XCJdKShNZW51cywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTWVudXMoKSB7XG4gICAgdmFyIF9nZXRQcm90b3R5cGVPZjI7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIE1lbnVzKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoX2dldFByb3RvdHlwZU9mMiA9ICgwLCBfZ2V0UHJvdG90eXBlT2YzW1wiZGVmYXVsdFwiXSkoTWVudXMpKS5jYWxsLmFwcGx5KF9nZXRQcm90b3R5cGVPZjIsIFt0aGlzXS5jb25jYXQoYXJncykpKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJzdGF0ZVwiLCB7XG4gICAgICBhY3RpdmVkS2V5OiBfdGhpcy5wcm9wcy5jdXJyZW50XG4gICAgfSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBvbkNoYW5nZSA9IF90aGlzLnByb3BzLm9uQ2hhbmdlO1xuXG4gICAgICBpZiAoa2V5ICE9PSBfdGhpcy5zdGF0ZS5hY3RpdmVkS2V5KSB7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBhY3RpdmVkS2V5OiBrZXlcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9uQ2hhbmdlKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyW1wiZGVmYXVsdFwiXSkoTWVudXMsIFt7XG4gICAga2V5OiBcImhlYWRlclJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoZWFkZXJSZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGFjdGl2ZWRLZXkgPSB0aGlzLnN0YXRlLmFjdGl2ZWRLZXk7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgIHZhciBhY3RpdmVkSW5kZXggPSAwO1xuXG4gICAgICBfcmVtaXhqcy5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE1lbnVzLkl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IGNoaWxkLnByb3BzO1xuICAgICAgICAgICAgdmFyIGtleSA9IHByb3BzLmtleSB8fCBjaGlsZC5rZXk7XG4gICAgICAgICAgICB2YXIgaXNBY3RpdmVkID0ga2V5ID09PSBhY3RpdmVkS2V5O1xuXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmVkKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9ICgwLCBfY2xhc3NuYW1lc1tcImRlZmF1bHRcIl0pKHtcbiAgICAgICAgICAgICAgJ2luZGV4X19tZW51LWl0ZW0tdGFiJzogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2luZGV4X19tZW51LWl0ZW0tdGFiX2FjdGl2ZSc6IGlzQWN0aXZlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLFxuICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgb25UYXA6IGZ1bmN0aW9uIG9uVGFwKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLm9uTWVudUl0ZW1DbGljayhrZXksIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5UZXh0LCBudWxsLCBwcm9wcy5uYW1lKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBsZWZ0ID0gKGFjdGl2ZWRJbmRleCAqIDIgKyAxKSAqICgxMDAgLyAoY2hpbGRyZW4ubGVuZ3RoICogMikpICsgJyUnO1xuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4X19tZW51cy10YWJzXCJcbiAgICAgIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4X19tZW51cy10YWJzLWlubmVyXCJcbiAgICAgIH0sIGNoaWxkcmVuKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhfX21lbnVzLXRhYnMtbGluZVwiLFxuICAgICAgICBrZXk6IFwibGluZVwiLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250ZW50UmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRlbnRSZW5kZXIoKSB7XG4gICAgICB2YXIgYWN0aXZlZEtleSA9IHRoaXMuc3RhdGUuYWN0aXZlZEtleTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBfcmVtaXhqcy5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTWVudXMuSXRlbSkge1xuICAgICAgICAgICAgdmFyIHByb3BzID0gY2hpbGQucHJvcHM7XG4gICAgICAgICAgICB2YXIga2V5ID0gcHJvcHMua2V5IHx8IGNoaWxkLmtleTtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gKDAsIF9jbGFzc25hbWVzW1wiZGVmYXVsdFwiXSkoe1xuICAgICAgICAgICAgICAnaW5kZXhfX21lbnUtaXRlbS1jb250ZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2luZGV4X19tZW51LWl0ZW0tY29udGVudF9hY3RpdmUnOiBrZXkgPT09IGFjdGl2ZWRLZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NlcyxcbiAgICAgICAgICAgICAga2V5OiBrZXlcbiAgICAgICAgICAgIH0sIHByb3BzLmNoaWxkcmVuKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4X19tZW51cy1jb250ZW50XCJcbiAgICAgIH0sIGNoaWxkcmVuKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJpbmRleF9fbWVudXNcIlxuICAgICAgfSwgdGhpcy5oZWFkZXJSZW5kZXIoKSwgdGhpcy5jb250ZW50UmVuZGVyKCkpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBzdGF0ZSkge1xuICAgICAgaWYgKG5leHRQcm9wcy5jdXJyZW50ICE9PSBzdGF0ZS5hY3RpdmVkS2V5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWN0aXZlZEtleTogbmV4dFByb3BzLmN1cnJlbnRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNZW51cztcbn0oX3JlbWl4anMuQ29tcG9uZW50KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBNZW51cztcbigwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkoTWVudXMsIFwiSXRlbVwiLCBJdGVtKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVyblwiKSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZlwiKSk7XG5cbnZhciBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9yZW1peGpzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlbWl4anNcIikpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKFwicmVtaXhqcy9jb21wb25lbnRzXCIpO1xuXG52YXIgX01lbnVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jb21wb25lbnRzL01lbnVzXCIpKTtcblxudmFyIF9DYXJkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jb21wb25lbnRzL0NhcmRcIikpO1xuXG5yZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbnZhciBJbmRleCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1ZpZXdDb250cm9sbGVyKSB7XG4gICgwLCBfaW5oZXJpdHMyW1wiZGVmYXVsdFwiXSkoSW5kZXgsIF9WaWV3Q29udHJvbGxlcik7XG5cbiAgZnVuY3Rpb24gSW5kZXgoKSB7XG4gICAgdmFyIF9nZXRQcm90b3R5cGVPZjI7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMltcImRlZmF1bHRcIl0pKHRoaXMsIEluZGV4KTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjJbXCJkZWZhdWx0XCJdKSh0aGlzLCAoX2dldFByb3RvdHlwZU9mMiA9ICgwLCBfZ2V0UHJvdG90eXBlT2YzW1wiZGVmYXVsdFwiXSkoSW5kZXgpKS5jYWxsLmFwcGx5KF9nZXRQcm90b3R5cGVPZjIsIFt0aGlzXS5jb25jYXQoYXJncykpKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJjb25maWdcIiwge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcbiAgICB9KTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMltcImRlZmF1bHRcIl0pKF90aGlzKSwgXCJzdGF0ZVwiLCB7XG4gICAgICBjdXJyZW50OiAnbW92aWVzJ1xuICAgIH0pO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyW1wiZGVmYXVsdFwiXSkoX3RoaXMpLCBcIm9uQ2hhbmdlXCIsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudDoga2V5XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKEluZGV4LCBbe1xuICAgIGtleTogXCJoZWFkZXJSZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGVhZGVyUmVuZGVyKCkge1xuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4X19oZWFkZXJcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlkZW8sIHtcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIG9iamVjdEZpdDogdHJ1ZSxcbiAgICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgICBzaG93UGxheUJ1dHRvbjogZmFsc2UsXG4gICAgICAgIHNob3dDZW50ZXJQbGF5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd1Byb2dyZXNzOiBmYWxzZSxcbiAgICAgICAgc2hvd011dGVCdXR0b246IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhfX3ZpZGVvXCIsXG4gICAgICAgIHNyYzogXCJodHRwOi8vZi52aWRlby53ZWlib2Nkbi5jb20vMDAxTnB6dHhseDA3eTdFalNlVWcwMTA0MTIwMGczWGUwRTAxMC5tcDQ/bGFiZWw9bXA0X2hkJnRlbXBsYXRlPTg1Mng0ODAuMjUuMCZ0cmFuc19maW5nZXI9NjJiMzBhM2YwNjFiMTYyZTQyMTAwODk1NWM3M2Y1MzYmRXhwaXJlcz0xNTcyNDU4NzQ4JnNzaWc9S0dCVnhBVnJTMCZLSUQ9dW5pc3RvcmUsdmlkZW9cIlxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb250ZW50UmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRlbnRSZW5kZXIoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXMuc3RhdGUuY3VycmVudDtcbiAgICAgIHJldHVybiBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJpbmRleF9fY29udGVudFwiXG4gICAgICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVudXNbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlXG4gICAgICB9LCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVudXNbXCJkZWZhdWx0XCJdLkl0ZW0sIHtcbiAgICAgICAgbmFtZTogXCJcXHU1RjcxXFx1NzI0N1wiLFxuICAgICAgICBrZXk6IFwibW92aWVzXCJcbiAgICAgIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4X19tb3ZpZXNcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0NhcmRbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgIG5hbWU6IFwiXFx1NUMxMVxcdTVFNzRcXHU3Njg0XFx1NEY2MFwiLFxuICAgICAgICBjb3ZlcjogJ2h0dHBzOi8vcDEubWVpdHVhbi5uZXQvbW92aWUvN2I0MzdlM2EwZDA4ZDEwZTM3NGRkYzM0ZjcxYjg4ZmUzMzc5MTMyLmpwZycsXG4gICAgICAgIHRhZ3M6IFsn54ix5oOFJywgJ+mdkuaYpScsICfliafmg4UnXSxcbiAgICAgICAgbGlrZTogXCIxMFxcdTRFMDdcIlxuICAgICAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9DYXJkW1wiZGVmYXVsdFwiXSwge1xuICAgICAgICBuYW1lOiBcIlxcdTdFQzhcXHU3RUQzXFx1ODAwNVxcdUZGMUFcXHU5RUQxXFx1NjY5N1xcdTU0N0RcXHU4RkQwXCIsXG4gICAgICAgIGNvdmVyOiAnaHR0cDovL3AxLm1laXR1YW4ubmV0L21vdmllL2I5MzJmN2Y2NzhhM2UyODc2M2IzYjI4MWIzZTEyMGVmMTM2MjI1MDkuanBnJyxcbiAgICAgICAgdGFnczogWyfliqjkvZwnLCAn56eR5bm7JywgJ+WGkumZqSddLFxuICAgICAgICBsaWtlOiBcIjUwXFx1NEUwN1wiXG4gICAgICB9KSkpLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVudXNbXCJkZWZhdWx0XCJdLkl0ZW0sIHtcbiAgICAgICAgbmFtZTogXCJcXHU4ODRDXFx1N0EwQlwiLFxuICAgICAgICBrZXk6IFwic2NoZWR1bGVcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhfX3NjaGVkdWxlXCJcbiAgICAgIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlNjcm9sbFZpZXcsIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcInRlc3RcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuSW1hZ2UsIHtcbiAgICAgICAgc3JjOiBcImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MjEyNDIyNjEwMiZkaT04ODMxODViMmNiNDhhODNjNTM2ZTdmNTUwOTEzZWJhMCZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZiLXNzbC5kdWl0YW5nLmNvbSUyRnVwbG9hZHMlMkZpdGVtJTJGMjAxODAxJTJGMTklMkYyMDE4MDExOTA3MjU1NF9mcG9wZS5qcGdcIlxuICAgICAgfSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlBpY2tlciwge1xuICAgICAgICBtb2RlOiBcImRhdGVcIlxuICAgICAgfSwgXCJPSFwiKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLCB7XG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICBpbnRlcnZhbDogMTAwMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZVxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLlN3aXBlckl0ZW0sIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkltYWdlLCB7XG4gICAgICAgIHNyYzogXCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCJcbiAgICAgIH0pKSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuU3dpcGVyLlN3aXBlckl0ZW0sIG51bGwsIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkltYWdlLCB7XG4gICAgICAgIHNyYzogXCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCJcbiAgICAgIH0pKSkpKSkpLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfTWVudXNbXCJkZWZhdWx0XCJdLkl0ZW0sIHtcbiAgICAgICAgbmFtZTogXCJcXHU1MTczXFx1NEU4RVwiLFxuICAgICAgICBrZXk6IFwiYWJvdXRcIlxuICAgICAgfSwgX3JlbWl4anNbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX2NvbXBvbmVudHMuVmlldywge1xuICAgICAgICBjbGFzc05hbWU6IFwiaW5kZXhfX2Fib3V0XCJcbiAgICAgIH0pKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlZpZXcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImluZGV4XCJcbiAgICAgIH0sIHRoaXMuaGVhZGVyUmVuZGVyKCksIHRoaXMuY29udGVudFJlbmRlcigpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEluZGV4O1xufShfY29tcG9uZW50cy5WaWV3Q29udHJvbGxlcik7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSW5kZXg7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIikpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2ZcIikpO1xuXG52YXIgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKSk7XG5cbnZhciBfaW5oZXJpdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKSk7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbnZhciBfcmVtaXhqcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZW1peGpzXCIpKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZShcInJlbWl4anMvY29tcG9uZW50c1wiKTtcblxudmFyIF9wcm9qZWN0ID0gcmVxdWlyZShcInJlbWl4anMvcHJvamVjdFwiKTtcblxudmFyIF9yZW1peGpzTWVzc2FnZVByb3RvY29sID0gcmVxdWlyZShcInJlbWl4anMtbWVzc2FnZS1wcm90b2NvbFwiKTtcblxucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuXG52YXIgSW5kZXggPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9WaWV3Q29udHJvbGxlcikge1xuICAoMCwgX2luaGVyaXRzMltcImRlZmF1bHRcIl0pKEluZGV4LCBfVmlld0NvbnRyb2xsZXIpO1xuXG4gIGZ1bmN0aW9uIEluZGV4KCkge1xuICAgIHZhciBfZ2V0UHJvdG90eXBlT2YyO1xuXG4gICAgdmFyIF90aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBJbmRleCk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yW1wiZGVmYXVsdFwiXSkodGhpcywgKF9nZXRQcm90b3R5cGVPZjIgPSAoMCwgX2dldFByb3RvdHlwZU9mM1tcImRlZmF1bHRcIl0pKEluZGV4KSkuY2FsbC5hcHBseShfZ2V0UHJvdG90eXBlT2YyLCBbdGhpc10uY29uY2F0KGFyZ3MpKSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDJbXCJkZWZhdWx0XCJdKShfdGhpcyksIFwiY29uZmlnXCIsIHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnXG4gICAgfSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczJbXCJkZWZhdWx0XCJdKShJbmRleCwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHt9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5TY3JvbGxWaWV3LCBudWxsLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5WaWV3LCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ0ZXN0XCJcbiAgICAgIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLkltYWdlLCB7XG4gICAgICAgIHNyYzogXCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCJcbiAgICAgIH0pLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5QaWNrZXIsIHtcbiAgICAgICAgbW9kZTogXCJkYXRlXCJcbiAgICAgIH0sIFwiT0hcIiksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlN3aXBlciwge1xuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgaW50ZXJ2YWw6IDEwMDAsXG4gICAgICAgIGluZGljYXRvckRvdHM6IHRydWVcbiAgICAgIH0sIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlN3aXBlci5Td2lwZXJJdGVtLCBudWxsLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5JbWFnZSwge1xuICAgICAgICBzcmM6IFwiaHR0cHM6Ly90aW1nc2EuYmFpZHUuY29tL3RpbWc/aW1hZ2UmcXVhbGl0eT04MCZzaXplPWI5OTk5XzEwMDAwJnNlYz0xNTcyMTI0MjI2MTAyJmRpPTg4MzE4NWIyY2I0OGE4M2M1MzZlN2Y1NTA5MTNlYmEwJmltZ3R5cGU9MCZzcmM9aHR0cCUzQSUyRiUyRmItc3NsLmR1aXRhbmcuY29tJTJGdXBsb2FkcyUyRml0ZW0lMkYyMDE4MDElMkYxOSUyRjIwMTgwMTE5MDcyNTU0X2Zwb3BlLmpwZ1wiXG4gICAgICB9KSksIF9yZW1peGpzW1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9jb21wb25lbnRzLlN3aXBlci5Td2lwZXJJdGVtLCBudWxsLCBfcmVtaXhqc1tcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfY29tcG9uZW50cy5JbWFnZSwge1xuICAgICAgICBzcmM6IFwiaHR0cHM6Ly90aW1nc2EuYmFpZHUuY29tL3RpbWc/aW1hZ2UmcXVhbGl0eT04MCZzaXplPWI5OTk5XzEwMDAwJnNlYz0xNTcyMTI0MjI2MTAyJmRpPTg4MzE4NWIyY2I0OGE4M2M1MzZlN2Y1NTA5MTNlYmEwJmltZ3R5cGU9MCZzcmM9aHR0cCUzQSUyRiUyRmItc3NsLmR1aXRhbmcuY29tJTJGdXBsb2FkcyUyRml0ZW0lMkYyMDE4MDElMkYxOSUyRjIwMTgwMTE5MDcyNTU0X2Zwb3BlLmpwZ1wiXG4gICAgICB9KSkpKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBJbmRleDtcbn0oX2NvbXBvbmVudHMuVmlld0NvbnRyb2xsZXIpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEluZGV4OyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9zdGF0aWMvaW1hZ2VzL2V4cGxvcmUucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL3N0YXRpYy9pbWFnZXMvZXhwbG9yZV9zZWxlY3RlZC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvc3RhdGljL2ltYWdlcy9tZS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvc3RhdGljL2ltYWdlcy9tZV9zZWxlY3RlZC5wbmdcIjsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQSxXQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkRBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6REE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0NBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pLQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqSkE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BGQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9