/*** MARK_1574767361007 WeChat globalWindow ***/ var window = Object.__globalWindow__ || (Object.__globalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"remix-ui/remix-view/index": 0
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
/******/ 	deferredModules.push(["./.~remix/remix-ui/remix-view/~index.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.~remix/remix-ui/remix-view/~index.js":
/*!***********************************************!*\
  !*** ./.~remix/remix-ui/remix-view/~index.js ***!
  \***********************************************/
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
    child: Object,
    innerText: String,
    uuid: String,
    parent: String,
    style: String,
    className: String,
    hoverClass: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: Number,
    hoverStayTime: Number
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
    child: null,
    innerText: null,
    uuid: null,
    parent: null,
    style: null,
    className: null,
    hoverClass: 'none',
    hoverStopPropagation: false,
    hoverStartTime: 50,
    hoverStayTime: 400
  },
  methods: {
    postMessage: function postMessage(data) {
      this.setData(data);
    },
    // others component event
    onGetUserInfo: function onGetUserInfo(e) {
      _project.transports.view.dispatch('onGetUserInfo', e.target.id, this.data.parent, e, this);
    },
    onContact: function onContact(e) {
      _project.transports.view.dispatch('onContact', e.target.id, this.data.parent, e, this);
    },
    onGetPhoneNumber: function onGetPhoneNumber(e) {
      _project.transports.view.dispatch('onGetPhoneNumber', e.target.id, this.data.parent, e, this);
    },
    onOpenSetting: function onOpenSetting(e) {
      _project.transports.view.dispatch('onOpenSetting', e.target.id, this.data.parent, e, this);
    },
    onLaunchApp: function onLaunchApp(e) {
      _project.transports.view.dispatch('onLaunchApp', e.target.id, this.data.parent, e, this);
    },
    onError: function onError(e) {
      _project.transports.view.dispatch('onError', e.target.id, this.data.parent, e, this);
    },
    onLoad: function onLoad(e) {
      _project.transports.view.dispatch('onLoad', e.target.id, this.data.parent, e, this);
    },
    onInput: function onInput(e) {
      _project.transports.view.dispatch('onInput', e.target.id, this.data.parent, e, this);
    },
    onFocus: function onFocus(e) {
      _project.transports.view.dispatch('onFocus', e.target.id, this.data.parent, e, this);
    },
    onBlur: function onBlur(e) {
      _project.transports.view.dispatch('onBlur', e.target.id, this.data.parent, e, this);
    },
    onConfirm: function onConfirm(e) {
      _project.transports.view.dispatch('onConfirm', e.target.id, this.data.parent, e, this);
    },
    onKeyboardHeightChange: function onKeyboardHeightChange(e) {
      _project.transports.view.dispatch('onKeyboardHeightChange', e.target.id, this.data.parent, e, this);
    },
    onMarkerTap: function onMarkerTap(e) {
      _project.transports.view.dispatch('onMarkerTap', e.target.id, this.data.parent, e, this);
    },
    onLabelTap: function onLabelTap(e) {
      _project.transports.view.dispatch('onLabelTap', e.target.id, this.data.parent, e, this);
    },
    onControlTap: function onControlTap(e) {
      _project.transports.view.dispatch('onControlTap', e.target.id, this.data.parent, e, this);
    },
    onCalloutTap: function onCalloutTap(e) {
      _project.transports.view.dispatch('onCalloutTap', e.target.id, this.data.parent, e, this);
    },
    onUpdated: function onUpdated(e) {
      _project.transports.view.dispatch('onUpdated', e.target.id, this.data.parent, e, this);
    },
    onRegionChange: function onRegionChange(e) {
      _project.transports.view.dispatch('onRegionChange', e.target.id, this.data.parent, e, this);
    },
    onCancel: function onCancel(e) {
      _project.transports.view.dispatch('onCancel', e.target.id, this.data.parent, e, this);
    },
    onColumnChange: function onColumnChange(e) {
      _project.transports.view.dispatch('onColumnChange', e.target.id, this.data.parent, e, this);
    },
    onScrollToUpper: function onScrollToUpper(e) {
      _project.transports.view.dispatch('onScrollToUpper', e.target.id, this.data.parent, e, this);
    },
    onScrollToLower: function onScrollToLower(e) {
      _project.transports.view.dispatch('onScrollToLower', e.target.id, this.data.parent, e, this);
    },
    onScroll: function onScroll(e) {
      _project.transports.view.dispatch('onScroll', e.target.id, this.data.parent, e, this);
    },
    onAnimationFinish: function onAnimationFinish(e) {
      _project.transports.view.dispatch('onAnimationFinish', e.target.id, this.data.parent, e, this);
    },
    onPlay: function onPlay(e) {
      _project.transports.view.dispatch('onPlay', e.target.id, this.data.parent, e, this);
    },
    onPause: function onPause(e) {
      _project.transports.view.dispatch('onPause', e.target.id, this.data.parent, e, this);
    },
    onEnded: function onEnded(e) {
      _project.transports.view.dispatch('onEnded', e.target.id, this.data.parent, e, this);
    },
    onTimeUpdate: function onTimeUpdate(e) {
      _project.transports.view.dispatch('onTimeUpdate', e.target.id, this.data.parent, e, this);
    },
    onFullScreenChange: function onFullScreenChange(e) {
      _project.transports.view.dispatch('onFullScreenChange', e.target.id, this.data.parent, e, this);
    },
    onWaiting: function onWaiting(e) {
      _project.transports.view.dispatch('onWaiting', e.target.id, this.data.parent, e, this);
    },
    onProgress: function onProgress(e) {
      _project.transports.view.dispatch('onProgress', e.target.id, this.data.parent, e, this);
    },
    onLoadedMetaData: function onLoadedMetaData(e) {
      _project.transports.view.dispatch('onTimeUpdate', e.target.id, this.data.parent, e, this);
    },
    onTouchStart: function onTouchStart(e) {
      _project.transports.view.dispatch('onTouchStart', this.data.uuid, this.data.parent, e);
    },
    onTouchMove: function onTouchMove(e) {
      _project.transports.view.dispatch('onTouchMove', this.data.uuid, this.data.parent, e);
    },
    onTouchCancel: function onTouchCancel(e) {
      _project.transports.view.dispatch('onTouchCancel', this.data.uuid, this.data.parent, e);
    },
    onTouchEnd: function onTouchEnd(e) {
      _project.transports.view.dispatch('onTouchEnd', this.data.uuid, this.data.parent, e);
    },
    onTap: function onTap(e) {
      _project.transports.view.dispatch('onTap', this.data.uuid, this.data.parent, e);
    },
    onLongPress: function onLongPress(e) {
      _project.transports.view.dispatch('onLongPress', this.data.uuid, this.data.parent, e);
    },
    onLongTap: function onLongTap(e) {
      _project.transports.view.dispatch('onLongTap', this.data.uuid, this.data.parent, e);
    },
    onTouchForceChange: function onTouchForceChange(e) {
      _project.transports.view.dispatch('onTouchForceChange', this.data.uuid, this.data.parent, e);
    },
    onTransitionEnd: function onTransitionEnd(e) {
      _project.transports.view.dispatch('onTransitionEnd', this.data.uuid, this.data.parent, e);
    },
    onAnimationStart: function onAnimationStart(e) {
      _project.transports.view.dispatch('onAnimationStart', this.data.uuid, this.data.parent, e);
    },
    onAnimationIteration: function onAnimationIteration(e) {
      _project.transports.view.dispatch('onAnimationIteration', this.data.uuid, this.data.parent, e);
    },
    onAnimationEnd: function onAnimationEnd(e) {
      _project.transports.view.dispatch('onAnimationEnd', this.data.uuid, this.data.parent, e);
    }
  },
  lifetimes: {
    created: function created() {
      _project.transports.view.callLifecycle('created', this.data.uuid, this.data.parent, this);
    },
    attached: function attached() {
      _project.transports.view.callLifecycle('attached', this.data.uuid, this.data.parent, this);
    },
    detached: function detached() {
      _project.transports.view.callLifecycle('detached', this.data.uuid, this.data.parent, this);
    },
    ready: function ready() {
      _project.transports.view.callLifecycle('ready', this.data.uuid, this.data.parent, this);
    },
    moved: function moved() {
      _project.transports.view.callLifecycle('moved', this.data.uuid, this.data.parent, this);
    },
    error: function error(_error) {
      _project.transports.view.callLifecycle('detached', this.data.uuid, this.data.parent, _error, this);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtaXgtdWkvcmVtaXgtdmlldy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi8ufnJlbWl4L3JlbWl4LXVpL3JlbWl4LXZpZXcvfmluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJyZW1peC11aS9yZW1peC12aWV3L2luZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi8ufnJlbWl4L3JlbWl4LXVpL3JlbWl4LXZpZXcvfmluZGV4LmpzXCIsXCJydW50aW1lL3ZlbmRvci9tYW5pZmVzdFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3Byb2plY3QgPSByZXF1aXJlKFwicmVtaXhqcy9wcm9qZWN0XCIpO1xuXG5Db21wb25lbnQoe1xuICBvcHRpb25zOiB7XG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWVcbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIG9uVG91Y2hTdGFydDogU3RyaW5nLFxuICAgIG9uVG91Y2hNb3ZlOiBTdHJpbmcsXG4gICAgb25Ub3VjaENhbmNlbDogU3RyaW5nLFxuICAgIG9uVG91Y2hFbmQ6IFN0cmluZyxcbiAgICBvblRhcDogU3RyaW5nLFxuICAgIG9uTG9uZ1ByZXNzOiBTdHJpbmcsXG4gICAgb25Mb25nVGFwOiBTdHJpbmcsXG4gICAgb25Ub3VjaEZvcmNlQ2hhbmdlOiBTdHJpbmcsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBTdHJpbmcsXG4gICAgb25BbmltYXRpb25TdGFydDogU3RyaW5nLFxuICAgIG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBTdHJpbmcsXG4gICAgb25BbmltYXRpb25FbmQ6IFN0cmluZyxcbiAgICBjaGlsZDogT2JqZWN0LFxuICAgIGlubmVyVGV4dDogU3RyaW5nLFxuICAgIHV1aWQ6IFN0cmluZyxcbiAgICBwYXJlbnQ6IFN0cmluZyxcbiAgICBzdHlsZTogU3RyaW5nLFxuICAgIGNsYXNzTmFtZTogU3RyaW5nLFxuICAgIGhvdmVyQ2xhc3M6IFN0cmluZyxcbiAgICBob3ZlclN0b3BQcm9wYWdhdGlvbjogQm9vbGVhbixcbiAgICBob3ZlclN0YXJ0VGltZTogTnVtYmVyLFxuICAgIGhvdmVyU3RheVRpbWU6IE51bWJlclxuICB9LFxuICBkYXRhOiB7XG4gICAgb25Ub3VjaFN0YXJ0OiBudWxsLFxuICAgIG9uVG91Y2hNb3ZlOiBudWxsLFxuICAgIG9uVG91Y2hDYW5jZWw6IG51bGwsXG4gICAgb25Ub3VjaEVuZDogbnVsbCxcbiAgICBvblRhcDogbnVsbCxcbiAgICBvbkxvbmdQcmVzczogbnVsbCxcbiAgICBvbkxvbmdUYXA6IG51bGwsXG4gICAgb25Ub3VjaEZvcmNlQ2hhbmdlOiBudWxsLFxuICAgIG9uVHJhbnNpdGlvbkVuZDogbnVsbCxcbiAgICBvbkFuaW1hdGlvblN0YXJ0OiBudWxsLFxuICAgIG9uQW5pbWF0aW9uSXRlcmF0aW9uOiBudWxsLFxuICAgIG9uQW5pbWF0aW9uRW5kOiBudWxsLFxuICAgIGNoaWxkOiBudWxsLFxuICAgIGlubmVyVGV4dDogbnVsbCxcbiAgICB1dWlkOiBudWxsLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICBzdHlsZTogbnVsbCxcbiAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgaG92ZXJDbGFzczogJ25vbmUnLFxuICAgIGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICBob3ZlclN0YXJ0VGltZTogNTAsXG4gICAgaG92ZXJTdGF5VGltZTogNDAwXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBwb3N0TWVzc2FnZTogZnVuY3Rpb24gcG9zdE1lc3NhZ2UoZGF0YSkge1xuICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xuICAgIH0sXG4gICAgLy8gb3RoZXJzIGNvbXBvbmVudCBldmVudFxuICAgIG9uR2V0VXNlckluZm86IGZ1bmN0aW9uIG9uR2V0VXNlckluZm8oZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkdldFVzZXJJbmZvJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25Db250YWN0OiBmdW5jdGlvbiBvbkNvbnRhY3QoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkNvbnRhY3QnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkdldFBob25lTnVtYmVyOiBmdW5jdGlvbiBvbkdldFBob25lTnVtYmVyKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25HZXRQaG9uZU51bWJlcicsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uT3BlblNldHRpbmc6IGZ1bmN0aW9uIG9uT3BlblNldHRpbmcoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbk9wZW5TZXR0aW5nJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25MYXVuY2hBcHA6IGZ1bmN0aW9uIG9uTGF1bmNoQXBwKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25MYXVuY2hBcHAnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkVycm9yOiBmdW5jdGlvbiBvbkVycm9yKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25FcnJvcicsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Mb2FkJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uSW5wdXQnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Gb2N1cycsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uQmx1cjogZnVuY3Rpb24gb25CbHVyKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25CbHVyJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25Db25maXJtOiBmdW5jdGlvbiBvbkNvbmZpcm0oZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkNvbmZpcm0nLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbktleWJvYXJkSGVpZ2h0Q2hhbmdlOiBmdW5jdGlvbiBvbktleWJvYXJkSGVpZ2h0Q2hhbmdlKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25LZXlib2FyZEhlaWdodENoYW5nZScsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uTWFya2VyVGFwOiBmdW5jdGlvbiBvbk1hcmtlclRhcChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uTWFya2VyVGFwJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25MYWJlbFRhcDogZnVuY3Rpb24gb25MYWJlbFRhcChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uTGFiZWxUYXAnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkNvbnRyb2xUYXA6IGZ1bmN0aW9uIG9uQ29udHJvbFRhcChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uQ29udHJvbFRhcCcsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uQ2FsbG91dFRhcDogZnVuY3Rpb24gb25DYWxsb3V0VGFwKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25DYWxsb3V0VGFwJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25VcGRhdGVkOiBmdW5jdGlvbiBvblVwZGF0ZWQoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblVwZGF0ZWQnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvblJlZ2lvbkNoYW5nZTogZnVuY3Rpb24gb25SZWdpb25DaGFuZ2UoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblJlZ2lvbkNoYW5nZScsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiBvbkNhbmNlbChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uQ2FuY2VsJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25Db2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIG9uQ29sdW1uQ2hhbmdlKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Db2x1bW5DaGFuZ2UnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvblNjcm9sbFRvVXBwZXI6IGZ1bmN0aW9uIG9uU2Nyb2xsVG9VcHBlcihlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uU2Nyb2xsVG9VcHBlcicsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uU2Nyb2xsVG9Mb3dlcjogZnVuY3Rpb24gb25TY3JvbGxUb0xvd2VyKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25TY3JvbGxUb0xvd2VyJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25TY3JvbGwnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkFuaW1hdGlvbkZpbmlzaDogZnVuY3Rpb24gb25BbmltYXRpb25GaW5pc2goZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvbkZpbmlzaCcsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uUGxheTogZnVuY3Rpb24gb25QbGF5KGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25QbGF5JywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25QYXVzZTogZnVuY3Rpb24gb25QYXVzZShlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uUGF1c2UnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbkVuZGVkOiBmdW5jdGlvbiBvbkVuZGVkKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25FbmRlZCcsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uVGltZVVwZGF0ZTogZnVuY3Rpb24gb25UaW1lVXBkYXRlKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25UaW1lVXBkYXRlJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25GdWxsU2NyZWVuQ2hhbmdlOiBmdW5jdGlvbiBvbkZ1bGxTY3JlZW5DaGFuZ2UoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkZ1bGxTY3JlZW5DaGFuZ2UnLCBlLnRhcmdldC5pZCwgdGhpcy5kYXRhLnBhcmVudCwgZSwgdGhpcyk7XG4gICAgfSxcbiAgICBvbldhaXRpbmc6IGZ1bmN0aW9uIG9uV2FpdGluZyhlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uV2FpdGluZycsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblByb2dyZXNzJywgZS50YXJnZXQuaWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUsIHRoaXMpO1xuICAgIH0sXG4gICAgb25Mb2FkZWRNZXRhRGF0YTogZnVuY3Rpb24gb25Mb2FkZWRNZXRhRGF0YShlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVGltZVVwZGF0ZScsIGUudGFyZ2V0LmlkLCB0aGlzLmRhdGEucGFyZW50LCBlLCB0aGlzKTtcbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaFN0YXJ0JywgdGhpcy5kYXRhLnV1aWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaE1vdmU6IGZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaE1vdmUnLCB0aGlzLmRhdGEudXVpZCwgdGhpcy5kYXRhLnBhcmVudCwgZSk7XG4gICAgfSxcbiAgICBvblRvdWNoQ2FuY2VsOiBmdW5jdGlvbiBvblRvdWNoQ2FuY2VsKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaENhbmNlbCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCBlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hFbmQ6IGZ1bmN0aW9uIG9uVG91Y2hFbmQoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRvdWNoRW5kJywgdGhpcy5kYXRhLnV1aWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUpO1xuICAgIH0sXG4gICAgb25UYXA6IGZ1bmN0aW9uIG9uVGFwKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25UYXAnLCB0aGlzLmRhdGEudXVpZCwgdGhpcy5kYXRhLnBhcmVudCwgZSk7XG4gICAgfSxcbiAgICBvbkxvbmdQcmVzczogZnVuY3Rpb24gb25Mb25nUHJlc3MoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkxvbmdQcmVzcycsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCBlKTtcbiAgICB9LFxuICAgIG9uTG9uZ1RhcDogZnVuY3Rpb24gb25Mb25nVGFwKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Mb25nVGFwJywgdGhpcy5kYXRhLnV1aWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEZvcmNlQ2hhbmdlOiBmdW5jdGlvbiBvblRvdWNoRm9yY2VDaGFuZ2UoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRvdWNoRm9yY2VDaGFuZ2UnLCB0aGlzLmRhdGEudXVpZCwgdGhpcy5kYXRhLnBhcmVudCwgZSk7XG4gICAgfSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVHJhbnNpdGlvbkVuZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCBlKTtcbiAgICB9LFxuICAgIG9uQW5pbWF0aW9uU3RhcnQ6IGZ1bmN0aW9uIG9uQW5pbWF0aW9uU3RhcnQoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvblN0YXJ0JywgdGhpcy5kYXRhLnV1aWQsIHRoaXMuZGF0YS5wYXJlbnQsIGUpO1xuICAgIH0sXG4gICAgb25BbmltYXRpb25JdGVyYXRpb246IGZ1bmN0aW9uIG9uQW5pbWF0aW9uSXRlcmF0aW9uKGUpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25BbmltYXRpb25JdGVyYXRpb24nLCB0aGlzLmRhdGEudXVpZCwgdGhpcy5kYXRhLnBhcmVudCwgZSk7XG4gICAgfSxcbiAgICBvbkFuaW1hdGlvbkVuZDogZnVuY3Rpb24gb25BbmltYXRpb25FbmQoZSkge1xuICAgICAgX3Byb2plY3QudHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvbkVuZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCBlKTtcbiAgICB9XG4gIH0sXG4gIGxpZmV0aW1lczoge1xuICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgICBfcHJvamVjdC50cmFuc3BvcnRzLnZpZXcuY2FsbExpZmVjeWNsZSgnY3JlYXRlZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCB0aGlzKTtcbiAgICB9LFxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiBhdHRhY2hlZCgpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdhdHRhY2hlZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCB0aGlzKTtcbiAgICB9LFxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiBkZXRhY2hlZCgpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdkZXRhY2hlZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCB0aGlzKTtcbiAgICB9LFxuICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdyZWFkeScsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCB0aGlzKTtcbiAgICB9LFxuICAgIG1vdmVkOiBmdW5jdGlvbiBtb3ZlZCgpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdtb3ZlZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCB0aGlzKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICAgIF9wcm9qZWN0LnRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdkZXRhY2hlZCcsIHRoaXMuZGF0YS51dWlkLCB0aGlzLmRhdGEucGFyZW50LCBfZXJyb3IsIHRoaXMpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=