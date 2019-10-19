/*** MARK_1571515574777 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
/*! exports provided: Application, ViewController, TabBar, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/components */ "../remixjs/src/components/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Application"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewController", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["ViewController"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["TabBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["View"]; });



/***/ }),

/***/ "../remixjs/document.js":
/*!******************************!*\
  !*** ../remixjs/document.js ***!
  \******************************/
/*! exports provided: document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/document */ "../remixjs/src/document/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "document", function() { return _src_document__WEBPACK_IMPORTED_MODULE_0__["document"]; });



/***/ }),

/***/ "../remixjs/index.js":
/*!***************************!*\
  !*** ../remixjs/index.js ***!
  \***************************/
/*! exports provided: default, Children, Component, PureComponent, createElement, cloneElement, useState, PropTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/react */ "../remixjs/src/react/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["createElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PropTypes"]; });


/* harmony default export */ __webpack_exports__["default"] = (_src_react__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../remixjs/router.js":
/*!****************************!*\
  !*** ../remixjs/router.js ***!
  \****************************/
/*! exports provided: Router, Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/router */ "../remixjs/src/router/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _src_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _src_router__WEBPACK_IMPORTED_MODULE_0__["Route"]; });



/***/ }),

/***/ "./.~remix/runtime/boot.js":
/*!*********************************!*\
  !*** ./.~remix/runtime/boot.js ***!
  \*********************************/
/*! exports provided: program, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "program", function() { return program; });
/* harmony import */ var remixjs_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");
/* harmony import */ var remixjs_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! remixjs/document */ "../remixjs/document.js");
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src */ "./src/index.js");



var container = remixjs_document__WEBPACK_IMPORTED_MODULE_1__["document"].createElement('div');
remixjs_document__WEBPACK_IMPORTED_MODULE_1__["document"].body.appendChild(container);
var program = new remixjs_project__WEBPACK_IMPORTED_MODULE_0__["Program"](_src__WEBPACK_IMPORTED_MODULE_2__["default"], container);

/* harmony default export */ __webpack_exports__["default"] = (program);

/***/ }),

/***/ "./.~remix/runtime/client.runtime.js":
/*!*******************************************!*\
  !*** ./.~remix/runtime/client.runtime.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot */ "./.~remix/runtime/boot.js");

_boot__WEBPACK_IMPORTED_MODULE_0__["default"].start();

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var remixjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remixjs */ "../remixjs/index.js");
/* harmony import */ var remixjs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");
/* harmony import */ var remixjs_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! remixjs/router */ "../remixjs/router.js");
/* harmony import */ var _pages_Index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Index */ "./src/pages/Index/index.js");
/* harmony import */ var _static_images_me_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static/images/me.png */ "./src/static/images/me.png");
/* harmony import */ var _static_images_me_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_static_images_me_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_images_me_selected_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./static/images/me_selected.png */ "./src/static/images/me_selected.png");
/* harmony import */ var _static_images_me_selected_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_static_images_me_selected_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_images_explore_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./static/images/explore.png */ "./src/static/images/explore.png");
/* harmony import */ var _static_images_explore_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_static_images_explore_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_images_explore_selected_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./static/images/explore_selected.png */ "./src/static/images/explore_selected.png");
/* harmony import */ var _static_images_explore_selected_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_static_images_explore_selected_png__WEBPACK_IMPORTED_MODULE_7__);









var TabBarItem = remixjs_components__WEBPACK_IMPORTED_MODULE_1__["TabBar"].TabBarItem;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_components__WEBPACK_IMPORTED_MODULE_1__["Application"], {
    config: {
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    },
    onLaunch: function onLaunch() {}
  }, remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_router__WEBPACK_IMPORTED_MODULE_2__["Router"], null, remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Index/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Explore/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Home/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  })), remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(remixjs_components__WEBPACK_IMPORTED_MODULE_1__["TabBar"], {
    selectedColor: '#333333'
  }, remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TabBarItem, {
    path: "pages/Explore/index",
    icon: _static_images_me_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    selectedIcon: _static_images_me_selected_png__WEBPACK_IMPORTED_MODULE_5___default.a
  }, "\u53D1\u73B0"), remixjs__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TabBarItem, {
    path: "pages/Index/index",
    icon: _static_images_explore_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    selectedIcon: _static_images_explore_selected_png__WEBPACK_IMPORTED_MODULE_7___default.a
  }, "\u6211")));
});

/***/ }),

/***/ "./src/pages/Index/index.css":
/*!***********************************!*\
  !*** ./src/pages/Index/index.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Index/index.js":
/*!**********************************!*\
  !*** ./src/pages/Index/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var remixjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! remixjs */ "../remixjs/index.js");
/* harmony import */ var remixjs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! remixjs/components */ "../remixjs/components.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index.css */ "./src/pages/Index/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_9__);












var Index =
/*#__PURE__*/
function (_ViewController) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Index, _ViewController);

  function Index() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Index)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "config", {
      navigationBarTitleText: '我的'
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Index, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {
      return remixjs__WEBPACK_IMPORTED_MODULE_7__["default"].createElement(remixjs_components__WEBPACK_IMPORTED_MODULE_8__["View"], null);
    }
  }]);

  return Index;
}(remixjs_components__WEBPACK_IMPORTED_MODULE_8__["ViewController"]);



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
//# sourceMappingURL=index.js.map