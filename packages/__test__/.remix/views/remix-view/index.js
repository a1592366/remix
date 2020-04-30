/*** MARK_1588231179898 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ /******/ (function(modules) { // webpackBootstrap
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
/******/ 		"views/remix-view/index": 0
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
/******/ 	deferredModules.push(["./.remix/views/remix-view/~index.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.remix/views/remix-view/~index.js":
/*!*******************************************!*\
  !*** ./.remix/views/remix-view/~index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _project = __webpack_require__(/*! @remix/core/project */ "../remix/project.js");

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    child: Object,
    innerText: String,
    uuid: String,
    parent: String,
    style: String,
    className: String,
    hoverClass: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: Number,
    hoverStayTime: Number,
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
    onAnimationEnd: String
  },
  data: {
    child: null,
    innerText: null,
    uuid: null,
    parent: null,
    style: null,
    className: null,
    hoverClass: 'none',
    hoverStopPropagation: false,
    hoverStartTime: 50,
    hoverStayTime: 400,
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
    onAnimationEnd: null
  },
  methods: {
    update: function update(data) {
      this.setData(data);
    },
    // others component event
    onGetUserInfo: function onGetUserInfo(e) {
      _project.ViewNativeSupport.Publisher.Event('onGetUserInfo', e.target.id, this.data.parent, e, this);
    },
    onContact: function onContact(e) {
      _project.ViewNativeSupport.Publisher.Event('onContact', e.target.id, this.data.parent, e, this);
    },
    onGetPhoneNumber: function onGetPhoneNumber(e) {
      _project.ViewNativeSupport.Publisher.Event('onGetPhoneNumber', e.target.id, this.data.parent, e, this);
    },
    onOpenSetting: function onOpenSetting(e) {
      _project.ViewNativeSupport.Publisher.Event('onOpenSetting', e.target.id, this.data.parent, e, this);
    },
    onLaunchApp: function onLaunchApp(e) {
      _project.ViewNativeSupport.Publisher.Event('onLaunchApp', e.target.id, this.data.parent, e, this);
    },
    onError: function onError(e) {
      _project.ViewNativeSupport.Publisher.Event('onError', e.target.id, this.data.parent, e, this);
    },
    onLoad: function onLoad(e) {
      _project.ViewNativeSupport.Publisher.Event('onLoad', e.target.id, this.data.parent, e, this);
    },
    onInput: function onInput(e) {
      _project.ViewNativeSupport.Publisher.Event('onInput', e.target.id, this.data.parent, e, this);
    },
    onFocus: function onFocus(e) {
      _project.ViewNativeSupport.Publisher.Event('onFocus', e.target.id, this.data.parent, e, this);
    },
    onBlur: function onBlur(e) {
      _project.ViewNativeSupport.Publisher.Event('onBlur', e.target.id, this.data.parent, e, this);
    },
    onConfirm: function onConfirm(e) {
      _project.ViewNativeSupport.Publisher.Event('onConfirm', e.target.id, this.data.parent, e, this);
    },
    onKeyboardHeightChange: function onKeyboardHeightChange(e) {
      _project.ViewNativeSupport.Publisher.Event('onKeyboardHeightChange', e.target.id, this.data.parent, e, this);
    },
    onMarkerTap: function onMarkerTap(e) {
      _project.ViewNativeSupport.Publisher.Event('onMarkerTap', e.target.id, this.data.parent, e, this);
    },
    onLabelTap: function onLabelTap(e) {
      _project.ViewNativeSupport.Publisher.Event('onLabelTap', e.target.id, this.data.parent, e, this);
    },
    onControlTap: function onControlTap(e) {
      _project.ViewNativeSupport.Publisher.Event('onControlTap', e.target.id, this.data.parent, e, this);
    },
    onCalloutTap: function onCalloutTap(e) {
      _project.ViewNativeSupport.Publisher.Event('onCalloutTap', e.target.id, this.data.parent, e, this);
    },
    onUpdated: function onUpdated(e) {
      _project.ViewNativeSupport.Publisher.Event('onUpdated', e.target.id, this.data.parent, e, this);
    },
    onRegionChange: function onRegionChange(e) {
      _project.ViewNativeSupport.Publisher.Event('onRegionChange', e.target.id, this.data.parent, e, this);
    },
    onCancel: function onCancel(e) {
      _project.ViewNativeSupport.Publisher.Event('onCancel', e.target.id, this.data.parent, e, this);
    },
    onColumnChange: function onColumnChange(e) {
      _project.ViewNativeSupport.Publisher.Event('onColumnChange', e.target.id, this.data.parent, e, this);
    },
    onScrollToUpper: function onScrollToUpper(e) {
      _project.ViewNativeSupport.Publisher.Event('onScrollToUpper', e.target.id, this.data.parent, e, this);
    },
    onScrollToLower: function onScrollToLower(e) {
      _project.ViewNativeSupport.Publisher.Event('onScrollToLower', e.target.id, this.data.parent, e, this);
    },
    onScroll: function onScroll(e) {
      _project.ViewNativeSupport.Publisher.Event('onScroll', e.target.id, this.data.parent, e, this);
    },
    onAnimationFinish: function onAnimationFinish(e) {
      _project.ViewNativeSupport.Publisher.Event('onAnimationFinish', e.target.id, this.data.parent, e, this);
    },
    onPlay: function onPlay(e) {
      _project.ViewNativeSupport.Publisher.Event('onPlay', e.target.id, this.data.parent, e, this);
    },
    onPause: function onPause(e) {
      _project.ViewNativeSupport.Publisher.Event('onPause', e.target.id, this.data.parent, e, this);
    },
    onEnded: function onEnded(e) {
      _project.ViewNativeSupport.Publisher.Event('onEnded', e.target.id, this.data.parent, e, this);
    },
    onTimeUpdate: function onTimeUpdate(e) {
      _project.ViewNativeSupport.Publisher.Event('onTimeUpdate', e.target.id, this.data.parent, e, this);
    },
    onFullScreenChange: function onFullScreenChange(e) {
      _project.ViewNativeSupport.Publisher.Event('onFullScreenChange', e.target.id, this.data.parent, e, this);
    },
    onWaiting: function onWaiting(e) {
      _project.ViewNativeSupport.Publisher.Event('onWaiting', e.target.id, this.data.parent, e, this);
    },
    onProgress: function onProgress(e) {
      _project.ViewNativeSupport.Publisher.Event('onProgress', e.target.id, this.data.parent, e, this);
    },
    onLoadedMetaData: function onLoadedMetaData(e) {
      _project.ViewNativeSupport.Publisher.Event('onTimeUpdate', e.target.id, this.data.parent, e, this);
    },
    onTouchStart: function onTouchStart(e) {
      var _this$data = this.data,
          uuid = _this$data.uuid,
          parent = _this$data.parent;

      _project.ViewNativeSupport.Publisher.Event('onTouchStart', uuid, parent, e);
    },
    onTouchMove: function onTouchMove(e) {
      var _this$data2 = this.data,
          uuid = _this$data2.uuid,
          parent = _this$data2.parent;

      _project.ViewNativeSupport.Publisher.Event('onTouchMove', uuid, parent, e);
    },
    onTouchCancel: function onTouchCancel(e) {
      var _this$data3 = this.data,
          uuid = _this$data3.uuid,
          parent = _this$data3.parent;

      _project.ViewNativeSupport.Publisher.Event('onTouchCancel', uuid, parent, e);
    },
    onTouchEnd: function onTouchEnd(e) {
      var _this$data4 = this.data,
          uuid = _this$data4.uuid,
          parent = _this$data4.parent;

      _project.ViewNativeSupport.Publisher.Event('onTouchEnd', uuid, parent, e);
    },
    onTap: function onTap(e) {
      var _this$data5 = this.data,
          uuid = _this$data5.uuid,
          parent = _this$data5.parent;

      _project.ViewNativeSupport.Publisher.Event('onTap', uuid, parent, e);
    },
    onLongPress: function onLongPress(e) {
      var _this$data6 = this.data,
          uuid = _this$data6.uuid,
          parent = _this$data6.parent;

      _project.ViewNativeSupport.Publisher.Event('onLongPress', uuid, parent, e);
    },
    onLongTap: function onLongTap(e) {
      var _this$data7 = this.data,
          uuid = _this$data7.uuid,
          parent = _this$data7.parent;

      _project.ViewNativeSupport.Publisher.Event('onLongTap', uuid, parent, e);
    },
    onTouchForceChange: function onTouchForceChange(e) {
      var _this$data8 = this.data,
          uuid = _this$data8.uuid,
          parent = _this$data8.parent;

      _project.ViewNativeSupport.Publisher.Event('onTouchForceChange', uuid, parent, e);
    },
    onTransitionEnd: function onTransitionEnd(e) {
      var _this$data9 = this.data,
          uuid = _this$data9.uuid,
          parent = _this$data9.parent;

      _project.ViewNativeSupport.Publisher.Event('onTransitionEnd', uuid, parent, e);
    },
    onAnimationStart: function onAnimationStart(e) {
      var _this$data10 = this.data,
          uuid = _this$data10.uuid,
          parent = _this$data10.parent;

      _project.ViewNativeSupport.Publisher.Event('onAnimationStart', uuid, parent, e);
    },
    onAnimationIteration: function onAnimationIteration(e) {
      var _this$data11 = this.data,
          uuid = _this$data11.uuid,
          parent = _this$data11.parent;

      _project.ViewNativeSupport.Publisher.Event('onAnimationIteration', uuid, parent, e);
    },
    onAnimationEnd: function onAnimationEnd(e) {
      var _this$data12 = this.data,
          uuid = _this$data12.uuid,
          parent = _this$data12.parent;

      _project.ViewNativeSupport.Publisher.Event('onAnimationEnd', uuid, parent, e);
    }
  },
  lifetimes: {
    created: function created() {
      _project.ViewNativeSupport.Publisher.Lifecycle('created', this.data.uuid, this.data.parent, this);
    },
    attached: function attached() {
      _project.ViewNativeSupport.Publisher.Lifecycle('attached', this.data.uuid, this.data.parent, this);
    },
    detached: function detached() {
      _project.ViewNativeSupport.Publisher.Lifecycle('detached', this.data.uuid, this.data.parent, this);
    },
    ready: function ready() {
      _project.ViewNativeSupport.Publisher.Lifecycle('ready', this.data.uuid, this.data.parent, this);
    },
    moved: function moved() {
      _project.ViewNativeSupport.Publisher.Lifecycle('moved', this.data.uuid, this.data.parent, this);
    },
    error: function error(_error) {
      _project.ViewNativeSupport.Publisher.Lifecycle('detached', this.data.uuid, this.data.parent, _error, this);
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map