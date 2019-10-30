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
    style: null,
    className: null,
    hoverClass: 'none',
    hoverStopPropagation: false,
    hoverStartTime: 50,
    hoverStayTime: 400
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLn5yZW1peC9yZW1peC11aS9yZW1peC12aWV3L35pbmRleC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJvcHRpb25zIiwiYWRkR2xvYmFsQ2xhc3MiLCJwcm9wZXJ0aWVzIiwib25Ub3VjaFN0YXJ0IiwiU3RyaW5nIiwib25Ub3VjaE1vdmUiLCJvblRvdWNoQ2FuY2VsIiwib25Ub3VjaEVuZCIsIm9uVGFwIiwib25Mb25nUHJlc3MiLCJvbkxvbmdUYXAiLCJvblRvdWNoRm9yY2VDaGFuZ2UiLCJvblRyYW5zaXRpb25FbmQiLCJvbkFuaW1hdGlvblN0YXJ0Iiwib25BbmltYXRpb25JdGVyYXRpb24iLCJvbkFuaW1hdGlvbkVuZCIsImNoaWxkIiwiT2JqZWN0IiwiaW5uZXJUZXh0IiwidXVpZCIsInN0eWxlIiwiY2xhc3NOYW1lIiwiaG92ZXJDbGFzcyIsImhvdmVyU3RvcFByb3BhZ2F0aW9uIiwiQm9vbGVhbiIsImhvdmVyU3RhcnRUaW1lIiwiTnVtYmVyIiwiaG92ZXJTdGF5VGltZSIsImRhdGEiLCJtZXRob2RzIiwiZSIsInRyYW5zcG9ydHMiLCJ2aWV3IiwiZGlzcGF0Y2giLCJsaWZldGltZXMiLCJjcmVhdGVkIiwiY2FsbExpZmVjeWNsZSIsImF0dGFjaGVkIiwiZGV0YWNoZWQiLCJyZWFkeSIsIm1vdmVkIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7O0FBR0FBLFNBQVMsQ0FBQztBQUNSQyxTQUFPLEVBQUU7QUFBRUMsa0JBQWMsRUFBRTtBQUFsQixHQUREO0FBR1JDLFlBQVUsRUFBRTtBQUNWQyxnQkFBWSxFQUFFQyxNQURKO0FBRVpDLGVBQVcsRUFBRUQsTUFGRDtBQUdaRSxpQkFBYSxFQUFFRixNQUhIO0FBSVpHLGNBQVUsRUFBRUgsTUFKQTtBQUtaSSxTQUFLLEVBQUVKLE1BTEs7QUFNWkssZUFBVyxFQUFFTCxNQU5EO0FBT1pNLGFBQVMsRUFBRU4sTUFQQztBQVFaTyxzQkFBa0IsRUFBRVAsTUFSUjtBQVNaUSxtQkFBZSxFQUFFUixNQVRMO0FBVVpTLG9CQUFnQixFQUFFVCxNQVZOO0FBV1pVLHdCQUFvQixFQUFFVixNQVhWO0FBWVpXLGtCQUFjLEVBQUVYLE1BWko7QUFhWlksU0FBSyxFQUFFQyxNQWJLO0FBY1pDLGFBQVMsRUFBRWQsTUFkQztBQWVaZSxRQUFJLEVBQUVmLE1BZk07QUFnQlpnQixTQUFLLEVBQUVoQixNQWhCSztBQWlCWmlCLGFBQVMsRUFBRWpCLE1BakJDO0FBa0Jaa0IsY0FBVSxFQUFFbEIsTUFsQkE7QUFtQlptQix3QkFBb0IsRUFBRUMsT0FuQlY7QUFvQlpDLGtCQUFjLEVBQUVDLE1BcEJKO0FBcUJaQyxpQkFBYSxFQUFFRDtBQXJCSCxHQUhKO0FBNEJSRSxNQUFJLEVBQUU7QUFDSnpCLGdCQUFZLEVBQUUsSUFEVjtBQUVORSxlQUFXLEVBQUUsSUFGUDtBQUdOQyxpQkFBYSxFQUFFLElBSFQ7QUFJTkMsY0FBVSxFQUFFLElBSk47QUFLTkMsU0FBSyxFQUFFLElBTEQ7QUFNTkMsZUFBVyxFQUFFLElBTlA7QUFPTkMsYUFBUyxFQUFFLElBUEw7QUFRTkMsc0JBQWtCLEVBQUUsSUFSZDtBQVNOQyxtQkFBZSxFQUFFLElBVFg7QUFVTkMsb0JBQWdCLEVBQUUsSUFWWjtBQVdOQyx3QkFBb0IsRUFBRSxJQVhoQjtBQVlOQyxrQkFBYyxFQUFFLElBWlY7QUFhTkMsU0FBSyxFQUFFLElBYkQ7QUFjTkUsYUFBUyxFQUFFLElBZEw7QUFlTkMsUUFBSSxFQUFFLElBZkE7QUFnQk5DLFNBQUssRUFBRSxJQWhCRDtBQWlCTkMsYUFBUyxFQUFFLElBakJMO0FBa0JOQyxjQUFVLEVBQUUsTUFsQk47QUFtQk5DLHdCQUFvQixFQUFFLEtBbkJoQjtBQW9CTkUsa0JBQWMsRUFBRSxFQXBCVjtBQXFCTkUsaUJBQWEsRUFBRTtBQXJCVCxHQTVCRTtBQXFEUkUsU0FBTyxFQUFFO0FBQ1AxQixnQkFETyx3QkFDTzJCLENBRFAsRUFDVTtBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsY0FBekIsRUFBeUMsS0FBS0wsSUFBTCxDQUFVVCxJQUFuRCxFQUF5RFcsQ0FBekQ7QUFBOEQsS0FEMUU7QUFFVHpCLGVBRlMsdUJBRUl5QixDQUZKLEVBRU87QUFBRUMsMEJBQVdDLElBQVgsQ0FBZ0JDLFFBQWhCLENBQXlCLGFBQXpCLEVBQXdDLEtBQUtMLElBQUwsQ0FBVVQsSUFBbEQsRUFBd0RXLENBQXhEO0FBQTZELEtBRnRFO0FBR1R4QixpQkFIUyx5QkFHTXdCLENBSE4sRUFHUztBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsZUFBekIsRUFBMEMsS0FBS0wsSUFBTCxDQUFVVCxJQUFwRCxFQUEwRFcsQ0FBMUQ7QUFBK0QsS0FIMUU7QUFJVHZCLGNBSlMsc0JBSUd1QixDQUpILEVBSU07QUFBRUMsMEJBQVdDLElBQVgsQ0FBZ0JDLFFBQWhCLENBQXlCLFlBQXpCLEVBQXVDLEtBQUtMLElBQUwsQ0FBVVQsSUFBakQsRUFBdURXLENBQXZEO0FBQTRELEtBSnBFO0FBS1R0QixTQUxTLGlCQUtGc0IsQ0FMRSxFQUtDO0FBQUVDLDBCQUFXQyxJQUFYLENBQWdCQyxRQUFoQixDQUF5QixPQUF6QixFQUFrQyxLQUFLTCxJQUFMLENBQVVULElBQTVDLEVBQWtEVyxDQUFsRDtBQUF1RCxLQUwxRDtBQU1UckIsZUFOUyx1QkFNSXFCLENBTkosRUFNTztBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsYUFBekIsRUFBd0MsS0FBS0wsSUFBTCxDQUFVVCxJQUFsRCxFQUF3RFcsQ0FBeEQ7QUFBNkQsS0FOdEU7QUFPVHBCLGFBUFMscUJBT0VvQixDQVBGLEVBT0s7QUFBRUMsMEJBQVdDLElBQVgsQ0FBZ0JDLFFBQWhCLENBQXlCLFdBQXpCLEVBQXNDLEtBQUtMLElBQUwsQ0FBVVQsSUFBaEQsRUFBc0RXLENBQXREO0FBQTJELEtBUGxFO0FBUVRuQixzQkFSUyw4QkFRV21CLENBUlgsRUFRYztBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsb0JBQXpCLEVBQStDLEtBQUtMLElBQUwsQ0FBVVQsSUFBekQsRUFBK0RXLENBQS9EO0FBQW9FLEtBUnBGO0FBU1RsQixtQkFUUywyQkFTUWtCLENBVFIsRUFTVztBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsaUJBQXpCLEVBQTRDLEtBQUtMLElBQUwsQ0FBVVQsSUFBdEQsRUFBNERXLENBQTVEO0FBQWlFLEtBVDlFO0FBVVRqQixvQkFWUyw0QkFVU2lCLENBVlQsRUFVWTtBQUFFQywwQkFBV0MsSUFBWCxDQUFnQkMsUUFBaEIsQ0FBeUIsa0JBQXpCLEVBQTZDLEtBQUtMLElBQUwsQ0FBVVQsSUFBdkQsRUFBNkRXLENBQTdEO0FBQWtFLEtBVmhGO0FBV1RoQix3QkFYUyxnQ0FXYWdCLENBWGIsRUFXZ0I7QUFBRUMsMEJBQVdDLElBQVgsQ0FBZ0JDLFFBQWhCLENBQXlCLHNCQUF6QixFQUFpRCxLQUFLTCxJQUFMLENBQVVULElBQTNELEVBQWlFVyxDQUFqRTtBQUFzRSxLQVh4RjtBQVlUZixrQkFaUywwQkFZT2UsQ0FaUCxFQVlVO0FBQUVDLDBCQUFXQyxJQUFYLENBQWdCQyxRQUFoQixDQUF5QixnQkFBekIsRUFBMkMsS0FBS0wsSUFBTCxDQUFVVCxJQUFyRCxFQUEyRFcsQ0FBM0Q7QUFBZ0U7QUFaNUUsR0FyREQ7QUFvRVJJLFdBQVMsRUFBRTtBQUNUQyxXQURTLHFCQUNFO0FBQUVKLDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixTQUE5QixFQUF5QyxLQUFLUixJQUFMLENBQVVULElBQW5EO0FBQTJELEtBRC9EO0FBRVRrQixZQUZTLHNCQUVHO0FBQUVOLDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixVQUE5QixFQUEwQyxLQUFLUixJQUFMLENBQVVULElBQXBEO0FBQTRELEtBRmpFO0FBR1RtQixZQUhTLHNCQUdHO0FBQUVQLDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixVQUE5QixFQUEwQyxLQUFLUixJQUFMLENBQVVULElBQXBEO0FBQTRELEtBSGpFO0FBSVRvQixTQUpTLG1CQUlBO0FBQUVSLDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixPQUE5QixFQUF1QyxLQUFLUixJQUFMLENBQVVULElBQWpEO0FBQXlELEtBSjNEO0FBS1RxQixTQUxTLG1CQUtBO0FBQUVULDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixPQUE5QixFQUF1QyxLQUFLUixJQUFMLENBQVVULElBQWpEO0FBQXlELEtBTDNEO0FBTVRzQixTQU5TLGlCQU1GQSxNQU5FLEVBTUs7QUFBRVYsMEJBQVdDLElBQVgsQ0FBZ0JJLGFBQWhCLENBQThCLFVBQTlCLEVBQTBDLEtBQUtSLElBQUwsQ0FBVVQsSUFBcEQsRUFBMERzQixNQUExRDtBQUFtRTtBQU4xRTtBQXBFSCxDQUFELENBQVQsQyIsImZpbGUiOiJyZW1peC11aS9yZW1peC12aWV3L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInJlbWl4LXVpL3JlbWl4LXZpZXcvaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuLy5+cmVtaXgvcmVtaXgtdWkvcmVtaXgtdmlldy9+aW5kZXguanNcIixcInJ1bnRpbWUvdmVuZG9yL21hbmlmZXN0XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gJ3JlbWl4anMvcHJvamVjdCc7XG5cblxuQ29tcG9uZW50KHtcbiAgb3B0aW9uczogeyBhZGRHbG9iYWxDbGFzczogdHJ1ZSB9LFxuXG4gIHByb3BlcnRpZXM6IHtcbiAgICBvblRvdWNoU3RhcnQ6IFN0cmluZyxcblx0XHRvblRvdWNoTW92ZTogU3RyaW5nLFxuXHRcdG9uVG91Y2hDYW5jZWw6IFN0cmluZyxcblx0XHRvblRvdWNoRW5kOiBTdHJpbmcsXG5cdFx0b25UYXA6IFN0cmluZyxcblx0XHRvbkxvbmdQcmVzczogU3RyaW5nLFxuXHRcdG9uTG9uZ1RhcDogU3RyaW5nLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogU3RyaW5nLFxuXHRcdG9uVHJhbnNpdGlvbkVuZDogU3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IFN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogU3RyaW5nLFxuXHRcdG9uQW5pbWF0aW9uRW5kOiBTdHJpbmcsXG5cdFx0Y2hpbGQ6IE9iamVjdCxcblx0XHRpbm5lclRleHQ6IFN0cmluZyxcblx0XHR1dWlkOiBTdHJpbmcsXG5cdFx0c3R5bGU6IFN0cmluZyxcblx0XHRjbGFzc05hbWU6IFN0cmluZyxcblx0XHRob3ZlckNsYXNzOiBTdHJpbmcsXG5cdFx0aG92ZXJTdG9wUHJvcGFnYXRpb246IEJvb2xlYW4sXG5cdFx0aG92ZXJTdGFydFRpbWU6IE51bWJlcixcblx0XHRob3ZlclN0YXlUaW1lOiBOdW1iZXIsXG5cdFx0XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIG9uVG91Y2hTdGFydDogbnVsbCxcblx0XHRvblRvdWNoTW92ZTogbnVsbCxcblx0XHRvblRvdWNoQ2FuY2VsOiBudWxsLFxuXHRcdG9uVG91Y2hFbmQ6IG51bGwsXG5cdFx0b25UYXA6IG51bGwsXG5cdFx0b25Mb25nUHJlc3M6IG51bGwsXG5cdFx0b25Mb25nVGFwOiBudWxsLFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZTogbnVsbCxcblx0XHRvblRyYW5zaXRpb25FbmQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25TdGFydDogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcblx0XHRvbkFuaW1hdGlvbkVuZDogbnVsbCxcblx0XHRjaGlsZDogbnVsbCxcblx0XHRpbm5lclRleHQ6IG51bGwsXG5cdFx0dXVpZDogbnVsbCxcblx0XHRzdHlsZTogbnVsbCxcblx0XHRjbGFzc05hbWU6IG51bGwsXG5cdFx0aG92ZXJDbGFzczogJ25vbmUnLFxuXHRcdGhvdmVyU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcblx0XHRob3ZlclN0YXJ0VGltZTogNTAsXG5cdFx0aG92ZXJTdGF5VGltZTogNDAwLFxuXHRcdFxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvblRvdWNoU3RhcnQgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRvdWNoU3RhcnQnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25Ub3VjaE1vdmUgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRvdWNoTW92ZScsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvblRvdWNoQ2FuY2VsIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaENhbmNlbCcsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvblRvdWNoRW5kIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaEVuZCcsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvblRhcCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVGFwJywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uTG9uZ1ByZXNzIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Mb25nUHJlc3MnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25Mb25nVGFwIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Mb25nVGFwJywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uVG91Y2hGb3JjZUNoYW5nZSAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVG91Y2hGb3JjZUNoYW5nZScsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvblRyYW5zaXRpb25FbmQgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRyYW5zaXRpb25FbmQnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25BbmltYXRpb25TdGFydCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uQW5pbWF0aW9uU3RhcnQnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb24gKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvbkl0ZXJhdGlvbicsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvbkFuaW1hdGlvbkVuZCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uQW5pbWF0aW9uRW5kJywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9XG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgY3JlYXRlZCAoKSB7IHRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdjcmVhdGVkJywgdGhpcy5kYXRhLnV1aWQpOyB9LFxuICAgIGF0dGFjaGVkICgpIHsgdHJhbnNwb3J0cy52aWV3LmNhbGxMaWZlY3ljbGUoJ2F0dGFjaGVkJywgdGhpcy5kYXRhLnV1aWQpOyB9LFxuICAgIGRldGFjaGVkICgpIHsgdHJhbnNwb3J0cy52aWV3LmNhbGxMaWZlY3ljbGUoJ2RldGFjaGVkJywgdGhpcy5kYXRhLnV1aWQpOyB9LFxuICAgIHJlYWR5ICgpIHsgdHJhbnNwb3J0cy52aWV3LmNhbGxMaWZlY3ljbGUoJ3JlYWR5JywgdGhpcy5kYXRhLnV1aWQpOyB9LFxuICAgIG1vdmVkICgpIHsgdHJhbnNwb3J0cy52aWV3LmNhbGxMaWZlY3ljbGUoJ21vdmVkJywgdGhpcy5kYXRhLnV1aWQpOyB9LFxuICAgIGVycm9yIChlcnJvcikgeyB0cmFuc3BvcnRzLnZpZXcuY2FsbExpZmVjeWNsZSgnZGV0YWNoZWQnLCB0aGlzLmRhdGEudXVpZCwgZXJyb3IpOyB9XG4gIH0sXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=