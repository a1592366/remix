/*** MARK_1587871641742 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
/******/ 	deferredModules.push(["./.remix/runtime/client.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../remix/components.js":
/*!******************************!*\
  !*** ../remix/components.js ***!
  \******************************/
/*! exports provided: Application, ViewController, TabBar, Root, View, Text, Image, Button, Map, Input, Picker, Swiper, SwiperItem, ScrollView, Video */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/components */ "../remix/src/components/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Application"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewController", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["ViewController"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["TabBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Root"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["View"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Text"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Image"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Button"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Map"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Input"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Picker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Swiper", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Swiper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwiperItem", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["SwiperItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollView", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["ScrollView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return _src_components__WEBPACK_IMPORTED_MODULE_0__["Video"]; });



/***/ }),

/***/ "../remix/document.js":
/*!****************************!*\
  !*** ../remix/document.js ***!
  \****************************/
/*! exports provided: document */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/document */ "../remix/src/document/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "document", function() { return _src_document__WEBPACK_IMPORTED_MODULE_0__["document"]; });



/***/ }),

/***/ "../remix/index.js":
/*!*************************!*\
  !*** ../remix/index.js ***!
  \*************************/
/*! exports provided: default, resetReactCurrentHookCursor, useMemo, useCallback, useEffect, useContext, createContext, useState, useReducer, Children, Component, PureComponent, createElement, cloneElement, PropTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/react */ "../remix/src/react/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetReactCurrentHookCursor", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["resetReactCurrentHookCursor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useMemo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["createContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["useReducer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["createElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return _src_react__WEBPACK_IMPORTED_MODULE_0__["PropTypes"]; });


/* harmony default export */ __webpack_exports__["default"] = (_src_react__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../remix/router.js":
/*!**************************!*\
  !*** ../remix/router.js ***!
  \**************************/
/*! exports provided: Router, Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/router */ "../remix/src/router/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _src_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _src_router__WEBPACK_IMPORTED_MODULE_0__["Route"]; });



/***/ }),

/***/ "./.remix/runtime/boot.js":
/*!********************************!*\
  !*** ./.remix/runtime/boot.js ***!
  \********************************/
/*! exports provided: program, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "program", function() { return program; });
/* harmony import */ var _remix_core_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @remix/core/project */ "../remix/project.js");
/* harmony import */ var _remix_core_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix/core/document */ "../remix/document.js");
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src */ "./src/index.js");



var container = _remix_core_document__WEBPACK_IMPORTED_MODULE_1__["document"].createElement('div');
_remix_core_document__WEBPACK_IMPORTED_MODULE_1__["document"].body.appendChild(container);
var program = new _remix_core_project__WEBPACK_IMPORTED_MODULE_0__["Program"](_src__WEBPACK_IMPORTED_MODULE_2__["default"], container);

/* harmony default export */ __webpack_exports__["default"] = (program);

/***/ }),

/***/ "./.remix/runtime/client.js":
/*!**********************************!*\
  !*** ./.remix/runtime/client.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot */ "./.remix/runtime/boot.js");

debugger;
_boot__WEBPACK_IMPORTED_MODULE_0__["default"].start();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _remix_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @remix/core */ "../remix/index.js");
/* harmony import */ var _remix_core_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix/core/components */ "../remix/components.js");
/* harmony import */ var _remix_core_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @remix/core/router */ "../remix/router.js");
/* harmony import */ var _pages_Index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Index */ "./src/pages/Index/index.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_components__WEBPACK_IMPORTED_MODULE_1__["Application"], null, /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_router__WEBPACK_IMPORTED_MODULE_2__["Router"], null, /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Index/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Explore/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "pages/Home/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  })), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_components__WEBPACK_IMPORTED_MODULE_1__["TabBar"], null, /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_components__WEBPACK_IMPORTED_MODULE_1__["TabBar"].TabBarItem, {
    icon: "",
    path: "pages/Index/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, "\u6D4B\u8BD5"), /*#__PURE__*/_remix_core__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_remix_core_components__WEBPACK_IMPORTED_MODULE_1__["TabBar"].TabBarItem, {
    icon: "",
    path: "pages/Index/index",
    component: _pages_Index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, "\u6D4B\u8BD5")));
});

/***/ }),

/***/ "./src/pages/Index/index.js":
/*!**********************************!*\
  !*** ./src/pages/Index/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _remix_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @remix/core */ "../remix/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  debugger;
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map