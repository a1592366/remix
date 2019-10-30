/*** MARK_1572465006146 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
      debugger;

      if (key !== _this.state.activedKey) {
        _this.setState({
          activedKey: key
        }, function () {
          debugger;
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

      var left = (activedIndex + 1) * (100 / (children.length * 2)) + '%';
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
      })), _remixjs["default"].createElement(_Menus["default"].Item, {
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
      }), _remixjs["default"].createElement(_components.Button, {
        className: "button",
        plain: true,
        onTouchStart: function onTouchStart() {}
      }, _remixjs["default"].createElement(_components.Image, {
        src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg"
      }), "T API OCT"), _remixjs["default"].createElement(_components.View, {
        className: "oh"
      }, "TouchMe!!!!"), _remixjs["default"].createElement(_components.Picker, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3JlbWl4anMvY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vcmVtaXhqcy9wcm9wLXR5cGVzLmpzIiwid2VicGFjazovLy8uLi9yZW1peGpzL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi8ufnJlbWl4L3J1bnRpbWUvYm9vdC5qcyIsIndlYnBhY2s6Ly8vLi8ufnJlbWl4L3J1bnRpbWUvY2xpZW50LnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9FeHBsb3JlL2NvbXBvbmVudHMvQ2FyZC9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvY29tcG9uZW50cy9DYXJkL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9FeHBsb3JlL2NvbXBvbmVudHMvTWVudXMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9FeHBsb3JlL2NvbXBvbmVudHMvTWVudXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL0V4cGxvcmUvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9FeHBsb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9Vc2VyL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvVXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGljL2ltYWdlcy9leHBsb3JlLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGljL2ltYWdlcy9leHBsb3JlX3NlbGVjdGVkLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGljL2ltYWdlcy9tZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRpYy9pbWFnZXMvbWVfc2VsZWN0ZWQucG5nIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiZW52IiwiaXNUZXJtaW5hbFJ1bnRpbWUiLCJwcm9ncmFtIiwiUHJvZ3JhbSIsIkFwcGxpY2F0aW9uIiwiZG9jdW1lbnQiLCJib2R5Iiwic3RhcnQiLCJUYWJCYXJJdGVtIiwiVGFiQmFyIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25TdHlsZSIsIm9wdGlvbnMiLCJFeHBsb3JlIiwiVXNlciIsIm1lIiwibWVTZWxlY3RlZCIsImV4cGxvcmUiLCJleHBsb3JlU2VsZWN0ZWQiLCJDYXJkIiwicHJvcHMiLCJjb3ZlciIsIm5hbWUiLCJ0YWdzIiwibGlrZSIsIm1hcCIsInRhZyIsImpvaW4iLCJJdGVtIiwiTWVudXMiLCJhY3RpdmVkS2V5IiwiY3VycmVudCIsImtleSIsIm9uQ2hhbmdlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImNoaWxkcmVuIiwiYWN0aXZlZEluZGV4IiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGQiLCJpbmRleCIsInR5cGUiLCJpc0FjdGl2ZWQiLCJjbGFzc2VzIiwicHVzaCIsImUiLCJvbk1lbnVJdGVtQ2xpY2siLCJsZWZ0IiwibGVuZ3RoIiwiaGVhZGVyUmVuZGVyIiwiY29udGVudFJlbmRlciIsIkNvbXBvbmVudCIsIkluZGV4IiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIlZpZXdDb250cm9sbGVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtR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QVksRUFBRSx3QkFBTSxDQUFFO0FBQXZELFNBQ0Usa0NBQUMsaUJBQUQ7QUFBTyxXQUFHLEVBQUM7QUFBWCxRQURGLGNBRkYsRUFTRSxrQ0FBQyxnQkFBRDtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsdUJBVEYsRUFVRSxrQ0FBQyxrQkFBRDtBQUFRLFlBQUksRUFBQztBQUFiLGNBVkYsRUFjRSxrQ0FBQyxrQkFBRDtBQUFRLGdCQUFRLEVBQUUsSUFBbEI7QUFBd0IsZ0JBQVEsRUFBRSxJQUFsQztBQUF3QyxxQkFBYTtBQUFyRCxTQUNFLGtDQUFDLGtCQUFELENBQVEsVUFBUixRQUNFLGtDQUFDLGlCQUFEO0FBQU8sV0FBRyxFQUFDO0FBQVgsUUFERixDQURGLEVBSUUsa0NBQUMsa0JBQUQsQ0FBUSxVQUFSLFFBQ0Usa0NBQUMsaUJBQUQ7QUFBTyxXQUFHLEVBQUM7QUFBWCxRQURGLENBSkYsQ0FkRixDQURGLENBREY7QUEyQkQ7OztFQW5DZ0NDLDBCOzs7Ozs7Ozs7Ozs7O0FDUm5DLGlCQUFpQixxQkFBdUIsbUM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsNEM7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsOEI7Ozs7Ozs7Ozs7O0FDQXhDLGlCQUFpQixxQkFBdUIsdUMiLCJmaWxlIjoicnVudGltZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJydW50aW1lL2luZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi8ufnJlbWl4L3J1bnRpbWUvY2xpZW50LnJ1bnRpbWUuanNcIixcInJ1bnRpbWUvdmVuZG9yL21hbmlmZXN0XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvY29tcG9uZW50cyc7IiwiZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9jdW1lbnQnOyIsImltcG9ydCBSZWFjdCBmcm9tICcuL3NyYy9yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0O1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvcmVhY3QnOyIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAnLi9zcmMvcmVhY3QvUHJvcFR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgUHJvcFR5cGVzOyIsImV4cG9ydCAqIGZyb20gJy4vc3JjL3JvdXRlcic7IiwiaW1wb3J0IHsgUHJvZ3JhbSB9IGZyb20gJ3JlbWl4anMvcHJvamVjdCc7XG5pbXBvcnQgeyBkb2N1bWVudCB9IGZyb20gJ3JlbWl4anMvZG9jdW1lbnQnO1xuaW1wb3J0IGVudiBmcm9tICdyZW1peGpzL2Vudic7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi4vLi4vc3JjJztcblxuZW52LmlzVGVybWluYWxSdW50aW1lID0gdHJ1ZTtcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBQcm9ncmFtKEFwcGxpY2F0aW9uLCBkb2N1bWVudC5ib2R5KTtcblxuZXhwb3J0IHsgcHJvZ3JhbSB9XG5leHBvcnQgZGVmYXVsdCBwcm9ncmFtO1xuIiwiaW1wb3J0IHByb2dyYW0gZnJvbSAnLi9ib290JztcblxucHJvZ3JhbS5zdGFydCgpOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gIGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuICBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGNhY2hlO1xuICB9O1xuXG4gIHJldHVybiBjYWNoZTtcbn1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7XG4gIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7XG5cbiAgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuICB9XG5cbiAgdmFyIG5ld09iaiA9IHt9O1xuXG4gIGlmIChvYmogIT0gbnVsbCkge1xuICAgIHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsO1xuXG4gICAgICAgIGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqO1xuXG4gIGlmIChjYWNoZSkge1xuICAgIGNhY2hlLnNldChvYmosIG5ld09iaik7XG4gIH1cblxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mMihvYmopO1xufVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE3IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG5cbi8qIGdsb2JhbCBkZWZpbmUgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoIWFyZykgY29udGludWU7XG4gICAgICB2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cbiAgICAgIGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICBjbGFzc2VzLnB1c2goYXJnKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXG4gICAgICAgIGlmIChpbm5lcikge1xuICAgICAgICAgIGNsYXNzZXMucHVzaChpbm5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZykge1xuICAgICAgICAgIGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG4gICAgZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWVzO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgfVxufSkoKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICdyZW1peGpzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSB9IGZyb20gJ3JlbWl4anMvcm91dGVyJztcbmltcG9ydCB7IFRhYkJhciB9IGZyb20gJ3JlbWl4anMvY29tcG9uZW50cyc7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4vcGFnZXMvVXNlcic7XG5pbXBvcnQgRXhwbG9yZSBmcm9tICcuL3BhZ2VzL0V4cGxvcmUnO1xuXG5pbXBvcnQgbWUgZnJvbSAnLi9zdGF0aWMvaW1hZ2VzL21lLnBuZyc7XG5pbXBvcnQgbWVTZWxlY3RlZCBmcm9tICcuL3N0YXRpYy9pbWFnZXMvbWVfc2VsZWN0ZWQucG5nJztcbmltcG9ydCBleHBsb3JlIGZyb20gJy4vc3RhdGljL2ltYWdlcy9leHBsb3JlLnBuZyc7XG5pbXBvcnQgZXhwbG9yZVNlbGVjdGVkIGZyb20gJy4vc3RhdGljL2ltYWdlcy9leHBsb3JlX3NlbGVjdGVkLnBuZyc7XG5cbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuXG5jb25zdCB7IFRhYkJhckl0ZW0gfSA9IFRhYkJhcjtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuXG4gIHJldHVybiA8QXBwbGljYXRpb25cbiAgICBjb25maWc9e3tcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIG5hdmlnYXRpb25TdHlsZTogJ2N1c3RvbSdcbiAgICB9fVxuXG4gICAgb25MYXVuY2g9eyhvcHRpb25zKSA9PiB7XG4gICAgfX1cbiAgPlxuICAgIDxSb3V0ZXI+XG4gICAgICA8Um91dGUgcGF0aD1cInBhZ2VzL0V4cGxvcmUvaW5kZXhcIiBjb21wb25lbnQ9e0V4cGxvcmV9IC8+XG4gICAgICA8Um91dGUgcGF0aD1cInBhZ2VzL1VzZXIvaW5kZXhcIiBjb21wb25lbnQ9e1VzZXJ9IC8+XG4gICAgPC9Sb3V0ZXI+XG5cbiAgICA8VGFiQmFyXG4gICAgICBzZWxlY3RlZENvbG9yPXsnIzMzMzMzMyd9XG4gICAgPlxuICAgICAgPFRhYkJhckl0ZW0gXG4gICAgICAgIHBhdGg9XCJwYWdlcy9FeHBsb3JlL2luZGV4XCJcbiAgICAgICAgaWNvbj17bWV9XG4gICAgICAgIHNlbGVjdGVkSWNvbj17bWVTZWxlY3RlZH1cbiAgICAgID5cbiAgICAgICAg5Y+R546wXG4gICAgICA8L1RhYkJhckl0ZW0+XG4gICAgICA8VGFiQmFySXRlbSBcbiAgICAgICAgcGF0aD1cInBhZ2VzL1VzZXIvaW5kZXhcIlxuICAgICAgICBpY29uPXtleHBsb3JlfVxuICAgICAgICBzZWxlY3RlZEljb249e2V4cGxvcmVTZWxlY3RlZH1cbiAgICAgID5cbiAgICAgICAg5oiRXG4gICAgICA8L1RhYkJhckl0ZW0+XG4gICAgPC9UYWJCYXI+XG4gIDwvQXBwbGljYXRpb24+XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFZpZXcsIEltYWdlLCBUZXh0IH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcblxuaW1wb3J0ICcuL2luZGV4LmNzcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FyZCAocHJvcHMpIHtcbiAgY29uc3QgeyBjb3ZlciwgbmFtZSwgdGFncywgbGlrZSB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8VmlldyBjbGFzc05hbWU9XCJpbmRleF9fbW92aWVzLWNhcmRcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19tb3ZpZXMtY2FyZC1jb3ZlclwiPlxuICAgICAgICA8SW1hZ2UgbW9kZT1cImFzcGVjdEZpbGxcIiBjbGFzc05hbWU9XCJpbmRleF9fbW92aWVzLWNhcmQtY292ZXItaW1hZ2VcIiBzcmM9e2NvdmVyfSAvPlxuICAgICAgPC9WaWV3PlxuXG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJpbmRleF9fbW92aWVzLWNhcmQtbWV0YVwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJpbmRleF9fbW92aWVzLWNhcmQtbmFtZVwiPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImluZGV4X19tb3ZpZXMtY2FyZC10aXRsZS10ZXh0XCI+e25hbWV9PC9UZXh0PlxuICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19tb3ZpZXMtY2FyZC1zaGFyZS1pY29uXCI+XG5cbiAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgIDwvVmlldz5cbiAgICAgICAgXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19tb3ZpZXMtY2FyZC1hdXRob3JcIj48L1ZpZXc+XG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19tb3ZpZXMtY2FyZC10YWdzXCI+e3RhZ3MubWFwKHRhZyA9PiBgIyR7dGFnfWApLmpvaW4oJyAnKX08L1ZpZXc+XG4gICAgICA8L1ZpZXc+XG4gICAgPC9WaWV3PlxuICApO1xufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBWaWV3LCBUZXh0IH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcblxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbmNvbnN0IEl0ZW0gPSBmdW5jdGlvbiAoKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51cyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBJdGVtID0gSXRlbTtcblxuICBzdGF0ZSA9IHtcbiAgICBhY3RpdmVkS2V5OiB0aGlzLnByb3BzLmN1cnJlbnRcbiAgfVxuXG4gIG9uTWVudUl0ZW1DbGljayA9IChrZXkpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgZGVidWdnZXI7XG5cbiAgICBpZiAoa2V5ICE9PSB0aGlzLnN0YXRlLmFjdGl2ZWRLZXkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBhY3RpdmVkS2V5OiBrZXlcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIG9uQ2hhbmdlKGtleSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhlYWRlclJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhY3RpdmVkS2V5IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgbGV0IGFjdGl2ZWRJbmRleCA9IDA7XG4gICAgXG4gICAgQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE1lbnVzLkl0ZW0pIHtcbiAgICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBjaGlsZDtcbiAgICAgICAgICBjb25zdCBrZXkgPSBwcm9wcy5rZXkgfHwgY2hpbGQua2V5O1xuICAgICAgICAgIGNvbnN0IGlzQWN0aXZlZCA9IGtleSA9PT0gYWN0aXZlZEtleTtcblxuICAgICAgICAgIGlmIChpc0FjdGl2ZWQpIHtcbiAgICAgICAgICAgIGFjdGl2ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc25hbWVzKHtcbiAgICAgICAgICAgICdpbmRleF9fbWVudS1pdGVtLXRhYic6IHRydWUsXG4gICAgICAgICAgICAnaW5kZXhfX21lbnUtaXRlbS10YWJfYWN0aXZlJzogaXNBY3RpdmVkXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtjbGFzc2VzfSBrZXk9e2tleX0gb25UYXA9eyhlKSA9PiB0aGlzLm9uTWVudUl0ZW1DbGljayhrZXksIGUpfT5cbiAgICAgICAgICAgICAgPFRleHQ+e3Byb3BzLm5hbWV9PC9UZXh0PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgY29uc3QgbGVmdCA9IChhY3RpdmVkSW5kZXggKyAxKSAqICgxMDAgLyAoY2hpbGRyZW4ubGVuZ3RoICogMikpICsgJyUnO1xuICBcbiAgICByZXR1cm4gKFxuICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaW5kZXhfX21lbnVzLXRhYnNcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaW5kZXhfX21lbnVzLXRhYnMtaW5uZXJcIj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvVmlldz5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaW5kZXhfX21lbnVzLXRhYnMtbGluZVwiIGtleT1cImxpbmVcIiBzdHlsZT17eyBsZWZ0IH19PjwvVmlldz5cbiAgICAgIDwvVmlldz5cbiAgICApXG4gIH1cblxuICBjb250ZW50UmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFjdGl2ZWRLZXkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcbiAgICBcbiAgICBDaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSBNZW51cy5JdGVtKSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gY2hpbGQ7XG4gICAgICAgICAgY29uc3Qga2V5ID0gcHJvcHMua2V5IHx8IGNoaWxkLmtleTtcbiAgICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NuYW1lcyh7XG4gICAgICAgICAgICAnaW5kZXhfX21lbnUtaXRlbS1jb250ZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdpbmRleF9fbWVudS1pdGVtLWNvbnRlbnRfYWN0aXZlJzoga2V5ID09PSBhY3RpdmVkS2V5XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtjbGFzc2VzfSBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIFxuICAgIHJldHVybiA8VmlldyBjbGFzc05hbWU9XCJpbmRleF9fbWVudXMtY29udGVudFwiPntjaGlsZHJlbn08L1ZpZXc+XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJpbmRleF9fbWVudXNcIj5cbiAgICAgICAge3RoaXMuaGVhZGVyUmVuZGVyKCl9XG4gICAgICAgIHt0aGlzLmNvbnRlbnRSZW5kZXIoKX1cbiAgICAgIDwvVmlldz5cbiAgICApO1xuICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNjcm9sbFZpZXcsIFZpZXcsIEltYWdlLCBUZXh0LCBCdXR0b24sIE1hcCwgUGlja2VyLCBTd2lwZXIsIFZpZGVvIH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcblxuaW1wb3J0IE1lbnVzIGZyb20gJy4vY29tcG9uZW50cy9NZW51cyc7XG5pbXBvcnQgQ2FyZCBmcm9tICcuL2NvbXBvbmVudHMvQ2FyZCc7XG5cbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIFZpZXdDb250cm9sbGVyIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoQnXG4gIH1cbiAgXG4gIHN0YXRlID0ge1xuICAgIGN1cnJlbnQ6ICdtb3ZpZXMnXG4gIH1cblxuXG4gIG9uQ2hhbmdlID0gKGtleSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3VycmVudDoga2V5XG4gICAgfSlcbiAgfVxuXG4gIGhlYWRlclJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19oZWFkZXJcIj5cbiAgICAgICAgPFZpZGVvIFxuICAgICAgICAgIGxvb3BcbiAgICAgICAgICBhdXRvcGxheVxuICAgICAgICAgIG9iamVjdEZpdFxuICAgICAgICAgIGNvbnRyb2xzPXtmYWxzZX1cbiAgICAgICAgICBzaG93UGxheUJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgc2hvd0NlbnRlclBsYXlCdXR0b249e2ZhbHNlfVxuICAgICAgICAgIHNob3dQcm9ncmVzcz17ZmFsc2V9XG4gICAgICAgICAgc2hvd011dGVCdXR0b249e2ZhbHNlfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImluZGV4X192aWRlb1wiIFxuICAgICAgICAgIHNyYz1cImh0dHA6Ly9mLnZpZGVvLndlaWJvY2RuLmNvbS8wMDFOcHp0eGx4MDd5N0VqU2VVZzAxMDQxMjAwZzNYZTBFMDEwLm1wND9sYWJlbD1tcDRfaGQmdGVtcGxhdGU9ODUyeDQ4MC4yNS4wJnRyYW5zX2Zpbmdlcj02MmIzMGEzZjA2MWIxNjJlNDIxMDA4OTU1YzczZjUzNiZFeHBpcmVzPTE1NzI0NTg3NDgmc3NpZz1LR0JWeEFWclMwJktJRD11bmlzdG9yZSx2aWRlb1wiIC8+XG4gICAgICA8L1ZpZXc+XG4gICAgKTtcbiAgfVxuXG5cbiAgY29udGVudFJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjdXJyZW50IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19jb250ZW50XCI+XG4gICAgICAgIDxNZW51cyBjdXJyZW50PXtjdXJyZW50fSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0+XG4gICAgICAgICAgPE1lbnVzLkl0ZW0gbmFtZT1cIuW9seeJh1wiIGtleT1cIm1vdmllc1wiPlxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaW5kZXhfX21vdmllc1wiPlxuICAgICAgICAgICAgICA8Q2FyZCBcbiAgICAgICAgICAgICAgICBuYW1lPVwi5bCR5bm055qE5L2gXCJcbiAgICAgICAgICAgICAgICBjb3Zlcj17J2h0dHBzOi8vcDEubWVpdHVhbi5uZXQvbW92aWUvN2I0MzdlM2EwZDA4ZDEwZTM3NGRkYzM0ZjcxYjg4ZmUzMzc5MTMyLmpwZyd9IFxuICAgICAgICAgICAgICAgIHRhZ3M9e1sn54ix5oOFJywgJ+mdkuaYpScsICfliafmg4UnXX0gXG4gICAgICAgICAgICAgICAgbGlrZT17YDEw5LiHYH1cbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICA8Q2FyZCBcbiAgICAgICAgICAgICAgICBuYW1lPVwi57uI57uT6ICF77ya6buR5pqX5ZG96L+QXCJcbiAgICAgICAgICAgICAgICBjb3Zlcj17J2h0dHA6Ly9wMS5tZWl0dWFuLm5ldC9tb3ZpZS9iOTMyZjdmNjc4YTNlMjg3NjNiM2IyODFiM2UxMjBlZjEzNjIyNTA5LmpwZyd9IFxuICAgICAgICAgICAgICAgIHRhZ3M9e1sn5Yqo5L2cJywgJ+enkeW5uycsICflhpLpmaknXX0gXG4gICAgICAgICAgICAgICAgbGlrZT17YDUw5LiHYH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICA8L01lbnVzLkl0ZW0+XG5cbiAgICAgICAgICA8TWVudXMuSXRlbSBuYW1lPVwi6KGM56iLXCIga2V5PVwic2NoZWR1bGVcIj5cbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19zY2hlZHVsZVwiPjwvVmlldz5cbiAgICAgICAgICA8L01lbnVzLkl0ZW0+XG5cbiAgICAgICAgICA8TWVudXMuSXRlbSBuYW1lPVwi5YWz5LqOXCIga2V5PVwiYWJvdXRcIj5cbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4X19hYm91dFwiPjwvVmlldz5cbiAgICAgICAgICA8L01lbnVzLkl0ZW0+XG4gICAgICAgIDwvTWVudXM+XG4gICAgICA8L1ZpZXc+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImluZGV4XCI+XG4gICAgICAgIHt0aGlzLmhlYWRlclJlbmRlcigpfVxuICAgICAgICB7dGhpcy5jb250ZW50UmVuZGVyKCl9XG4gICAgICA8L1ZpZXc+XG4gICAgKTtcbiAgfVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTY3JvbGxWaWV3LCBWaWV3LCBJbWFnZSwgVGV4dCwgQnV0dG9uLCBNYXAsIFBpY2tlciwgU3dpcGVyIH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSAncmVtaXhqcy9jb21wb25lbnRzJztcbmltcG9ydCB7IHRyYW5zcG9ydHMgfSBmcm9tICdyZW1peGpzL3Byb2plY3QnO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAncmVtaXhqcy1tZXNzYWdlLXByb3RvY29sJztcblxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgVmlld0NvbnRyb2xsZXIge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahCdcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7fVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTY3JvbGxWaWV3PlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ0ZXN0XCI+XG4gICAgICAgICAgPEltYWdlIHNyYz1cImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MjEyNDIyNjEwMiZkaT04ODMxODViMmNiNDhhODNjNTM2ZTdmNTUwOTEzZWJhMCZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZiLXNzbC5kdWl0YW5nLmNvbSUyRnVwbG9hZHMlMkZpdGVtJTJGMjAxODAxJTJGMTklMkYyMDE4MDExOTA3MjU1NF9mcG9wZS5qcGdcIiAvPlxuICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgcGxhaW4gb25Ub3VjaFN0YXJ0PXsoKSA9PiB7fX0+XG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPVwiaHR0cHM6Ly90aW1nc2EuYmFpZHUuY29tL3RpbWc/aW1hZ2UmcXVhbGl0eT04MCZzaXplPWI5OTk5XzEwMDAwJnNlYz0xNTcyMTI0MjI2MTAyJmRpPTg4MzE4NWIyY2I0OGE4M2M1MzZlN2Y1NTA5MTNlYmEwJmltZ3R5cGU9MCZzcmM9aHR0cCUzQSUyRiUyRmItc3NsLmR1aXRhbmcuY29tJTJGdXBsb2FkcyUyRml0ZW0lMkYyMDE4MDElMkYxOSUyRjIwMTgwMTE5MDcyNTU0X2Zwb3BlLmpwZ1wiIC8+XG4gICAgICAgICAgICBUXG4gICAgICAgICAgICBBUElcbiAgICAgICAgICAgIE9DVFxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwib2hcIiA+VG91Y2hNZSEhISE8L1ZpZXc+XG4gICAgICAgICAgPFBpY2tlciBtb2RlPVwiZGF0ZVwiPlxuICAgICAgICAgICAgT0hcbiAgICAgICAgICA8L1BpY2tlcj5cbiAgICAgICAgICBcbiAgICAgICAgICA8U3dpcGVyIGR1cmF0aW9uPXsxMDAwfSBpbnRlcnZhbD17MTAwMH0gaW5kaWNhdG9yRG90cz5cbiAgICAgICAgICAgIDxTd2lwZXIuU3dpcGVySXRlbT5cbiAgICAgICAgICAgICAgPEltYWdlIHNyYz1cImh0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTU3MjEyNDIyNjEwMiZkaT04ODMxODViMmNiNDhhODNjNTM2ZTdmNTUwOTEzZWJhMCZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZiLXNzbC5kdWl0YW5nLmNvbSUyRnVwbG9hZHMlMkZpdGVtJTJGMjAxODAxJTJGMTklMkYyMDE4MDExOTA3MjU1NF9mcG9wZS5qcGdcIiAvPiAgICBcbiAgICAgICAgICAgIDwvU3dpcGVyLlN3aXBlckl0ZW0+XG4gICAgICAgICAgICA8U3dpcGVyLlN3aXBlckl0ZW0+XG4gICAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1NzIxMjQyMjYxMDImZGk9ODgzMTg1YjJjYjQ4YTgzYzUzNmU3ZjU1MDkxM2ViYTAmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGYi1zc2wuZHVpdGFuZy5jb20lMkZ1cGxvYWRzJTJGaXRlbSUyRjIwMTgwMSUyRjE5JTJGMjAxODAxMTkwNzI1NTRfZnBvcGUuanBnXCIgLz4gICAgXG4gICAgICAgICAgICA8L1N3aXBlci5Td2lwZXJJdGVtPlxuICAgICAgICAgIDwvU3dpcGVyPlxuICAgICAgICA8L1ZpZXc+XG4gICAgICA8L1Njcm9sbFZpZXc+XG4gICAgKTtcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNyYy9zdGF0aWMvaW1hZ2VzL2V4cGxvcmUucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic3JjL3N0YXRpYy9pbWFnZXMvZXhwbG9yZV9zZWxlY3RlZC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvc3RhdGljL2ltYWdlcy9tZS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzcmMvc3RhdGljL2ltYWdlcy9tZV9zZWxlY3RlZC5wbmdcIjsiXSwic291cmNlUm9vdCI6IiJ9