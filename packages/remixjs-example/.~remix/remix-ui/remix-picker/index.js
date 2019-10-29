/*** MARK_1572374539082 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"remix-ui/remix-picker/index": 0
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
/******/ 	deferredModules.push(["./.~remix/remix-ui/remix-picker/~index.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.~remix/remix-ui/remix-picker/~index.js":
/*!*************************************************!*\
  !*** ./.~remix/remix-ui/remix-picker/~index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _project = __webpack_require__(/*! remixjs/project */ "../remixjs/project.js");

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    onTouchStart: String,
    onTouchMove: String,
    onTouchCancel: String,
    onTouchEnd: String,
    onTap: String,
    onLongPress: String,
    onLongTap: String,
    onTouchForceChange: String,
    onTransitionEnd: String,
    onAnimationStart: String,
    onAnimationIteration: String,
    onAnimationEnd: String,
    onCancel: String,
    onError: String,
    onChange: String,
    onColumnChange: String,
    child: Object,
    innerText: String,
    uuid: String,
    styles: String,
    className: String,
    mode: String,
    disabled: Boolean,
    range: Object,
    rangeKey: String,
    value: Number,
    start: String,
    end: String,
    fields: String,
    customItem: String
  },
  data: {
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
    child: null,
    innerText: null,
    uuid: null,
    styles: null,
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
  },
  methods: {
    onTouchStart: function onTouchStart(e) {
      _project.transports.view.dispatch('onTouchStart', this.data.uuid, e);
    },
    onTouchMove: function onTouchMove(e) {
      _project.transports.view.dispatch('onTouchMove', this.data.uuid, e);
    },
    onTouchCancel: function onTouchCancel(e) {
      _project.transports.view.dispatch('onTouchCancel', this.data.uuid, e);
    },
    onTouchEnd: function onTouchEnd(e) {
      _project.transports.view.dispatch('onTouchEnd', this.data.uuid, e);
    },
    onTap: function onTap(e) {
      _project.transports.view.dispatch('onTap', this.data.uuid, e);
    },
    onLongPress: function onLongPress(e) {
      _project.transports.view.dispatch('onLongPress', this.data.uuid, e);
    },
    onLongTap: function onLongTap(e) {
      _project.transports.view.dispatch('onLongTap', this.data.uuid, e);
    },
    onTouchForceChange: function onTouchForceChange(e) {
      _project.transports.view.dispatch('onTouchForceChange', this.data.uuid, e);
    },
    onTransitionEnd: function onTransitionEnd(e) {
      _project.transports.view.dispatch('onTransitionEnd', this.data.uuid, e);
    },
    onAnimationStart: function onAnimationStart(e) {
      _project.transports.view.dispatch('onAnimationStart', this.data.uuid, e);
    },
    onAnimationIteration: function onAnimationIteration(e) {
      _project.transports.view.dispatch('onAnimationIteration', this.data.uuid, e);
    },
    onAnimationEnd: function onAnimationEnd(e) {
      _project.transports.view.dispatch('onAnimationEnd', this.data.uuid, e);
    },
    onCancel: function onCancel(e) {
      _project.transports.view.dispatch('onCancel', this.data.uuid, e);
    },
    onError: function onError(e) {
      _project.transports.view.dispatch('onError', this.data.uuid, e);
    },
    onChange: function onChange(e) {
      _project.transports.view.dispatch('onChange', this.data.uuid, e);
    },
    onColumnChange: function onColumnChange(e) {
      _project.transports.view.dispatch('onColumnChange', this.data.uuid, e);
    }
  },
  lifetimes: {
    created: function created() {
      _project.transports.view.callLifecycle('created', this.data.uuid);
    },
    attached: function attached() {
      _project.transports.view.callLifecycle('attached', this.data.uuid);
    },
    detached: function detached() {
      _project.transports.view.callLifecycle('detached', this.data.uuid);
    },
    ready: function ready() {
      _project.transports.view.callLifecycle('ready', this.data.uuid);
    },
    moved: function moved() {
      _project.transports.view.callLifecycle('moved', this.data.uuid);
    },
    error: function error(_error) {
      _project.transports.view.callLifecycle('detached', this.data.uuid, _error);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map