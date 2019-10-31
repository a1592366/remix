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
/******/ 		"remix-ui/remix-root/index": 0
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
/******/ 	deferredModules.push(["./.~remix/remix-ui/remix-root/~index.js","runtime/vendor/manifest"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.~remix/remix-ui/remix-root/~index.js":
/*!***********************************************!*\
  !*** ./.~remix/remix-ui/remix-root/~index.js ***!
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
    uuid: String
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
    uuid: null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLn5yZW1peC9yZW1peC11aS9yZW1peC1yb290L35pbmRleC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJvcHRpb25zIiwiYWRkR2xvYmFsQ2xhc3MiLCJwcm9wZXJ0aWVzIiwib25Ub3VjaFN0YXJ0IiwiU3RyaW5nIiwib25Ub3VjaE1vdmUiLCJvblRvdWNoQ2FuY2VsIiwib25Ub3VjaEVuZCIsIm9uVGFwIiwib25Mb25nUHJlc3MiLCJvbkxvbmdUYXAiLCJvblRvdWNoRm9yY2VDaGFuZ2UiLCJvblRyYW5zaXRpb25FbmQiLCJvbkFuaW1hdGlvblN0YXJ0Iiwib25BbmltYXRpb25JdGVyYXRpb24iLCJvbkFuaW1hdGlvbkVuZCIsImNoaWxkIiwiT2JqZWN0IiwidXVpZCIsImRhdGEiLCJtZXRob2RzIiwiZSIsInRyYW5zcG9ydHMiLCJ2aWV3IiwiZGlzcGF0Y2giLCJsaWZldGltZXMiLCJjcmVhdGVkIiwiY2FsbExpZmVjeWNsZSIsImF0dGFjaGVkIiwiZGV0YWNoZWQiLCJyZWFkeSIsIm1vdmVkIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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aEIsQ0FBeUIsZ0JBQXpCLEVBQTJDLEtBQUtMLElBQUwsQ0FBVUQsSUFBckQsRUFBMkRHLENBQTNEO0FBQWdFO0FBWjVFLEdBdkNEO0FBc0RSSSxXQUFTLEVBQUU7QUFDVEMsV0FEUyxxQkFDRTtBQUFFSiwwQkFBV0MsSUFBWCxDQUFnQkksYUFBaEIsQ0FBOEIsU0FBOUIsRUFBeUMsS0FBS1IsSUFBTCxDQUFVRCxJQUFuRDtBQUEyRCxLQUQvRDtBQUVUVSxZQUZTLHNCQUVHO0FBQUVOLDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixVQUE5QixFQUEwQyxLQUFLUixJQUFMLENBQVVELElBQXBEO0FBQTRELEtBRmpFO0FBR1RXLFlBSFMsc0JBR0c7QUFBRVAsMEJBQVdDLElBQVgsQ0FBZ0JJLGFBQWhCLENBQThCLFVBQTlCLEVBQTBDLEtBQUtSLElBQUwsQ0FBVUQsSUFBcEQ7QUFBNEQsS0FIakU7QUFJVFksU0FKUyxtQkFJQTtBQUFFUiwwQkFBV0MsSUFBWCxDQUFnQkksYUFBaEIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBS1IsSUFBTCxDQUFVRCxJQUFqRDtBQUF5RCxLQUozRDtBQUtUYSxTQUxTLG1CQUtBO0FBQUVULDBCQUFXQyxJQUFYLENBQWdCSSxhQUFoQixDQUE4QixPQUE5QixFQUF1QyxLQUFLUixJQUFMLENBQVVELElBQWpEO0FBQXlELEtBTDNEO0FBTVRjLFNBTlMsaUJBTUZBLE1BTkUsRUFNSztBQUFFViwwQkFBV0MsSUFBWCxDQUFnQkksYUFBaEIsQ0FBOEIsVUFBOUIsRUFBMEMsS0FBS1IsSUFBTCxDQUFVRCxJQUFwRCxFQUEwRGMsTUFBMUQ7QUFBbUU7QUFOMUU7QUF0REgsQ0FBRCxDQUFULEMiLCJmaWxlIjoicmVtaXgtdWkvcmVtaXgtcm9vdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJyZW1peC11aS9yZW1peC1yb290L2luZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi8ufnJlbWl4L3JlbWl4LXVpL3JlbWl4LXJvb3QvfmluZGV4LmpzXCIsXCJydW50aW1lL3ZlbmRvci9tYW5pZmVzdFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCB7IHRyYW5zcG9ydHMgfSBmcm9tICdyZW1peGpzL3Byb2plY3QnO1xuXG5cbkNvbXBvbmVudCh7XG4gIG9wdGlvbnM6IHsgYWRkR2xvYmFsQ2xhc3M6IHRydWUgfSxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgb25Ub3VjaFN0YXJ0OiBTdHJpbmcsXG5cdFx0b25Ub3VjaE1vdmU6IFN0cmluZyxcblx0XHRvblRvdWNoQ2FuY2VsOiBTdHJpbmcsXG5cdFx0b25Ub3VjaEVuZDogU3RyaW5nLFxuXHRcdG9uVGFwOiBTdHJpbmcsXG5cdFx0b25Mb25nUHJlc3M6IFN0cmluZyxcblx0XHRvbkxvbmdUYXA6IFN0cmluZyxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IFN0cmluZyxcblx0XHRvblRyYW5zaXRpb25FbmQ6IFN0cmluZyxcblx0XHRvbkFuaW1hdGlvblN0YXJ0OiBTdHJpbmcsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IFN0cmluZyxcblx0XHRvbkFuaW1hdGlvbkVuZDogU3RyaW5nLFxuXHRcdGNoaWxkOiBPYmplY3QsXG5cdFx0dXVpZDogU3RyaW5nLFxuXHRcdFxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBvblRvdWNoU3RhcnQ6IG51bGwsXG5cdFx0b25Ub3VjaE1vdmU6IG51bGwsXG5cdFx0b25Ub3VjaENhbmNlbDogbnVsbCxcblx0XHRvblRvdWNoRW5kOiBudWxsLFxuXHRcdG9uVGFwOiBudWxsLFxuXHRcdG9uTG9uZ1ByZXNzOiBudWxsLFxuXHRcdG9uTG9uZ1RhcDogbnVsbCxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2U6IG51bGwsXG5cdFx0b25UcmFuc2l0aW9uRW5kOiBudWxsLFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG5cdFx0b25BbmltYXRpb25JdGVyYXRpb246IG51bGwsXG5cdFx0b25BbmltYXRpb25FbmQ6IG51bGwsXG5cdFx0Y2hpbGQ6IG51bGwsXG5cdFx0dXVpZDogbnVsbCxcblx0XHRcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25Ub3VjaFN0YXJ0IChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaFN0YXJ0JywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uVG91Y2hNb3ZlIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25Ub3VjaE1vdmUnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25Ub3VjaENhbmNlbCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVG91Y2hDYW5jZWwnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25Ub3VjaEVuZCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uVG91Y2hFbmQnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25UYXAgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRhcCcsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvbkxvbmdQcmVzcyAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uTG9uZ1ByZXNzJywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uTG9uZ1RhcCAoZSkgeyB0cmFuc3BvcnRzLnZpZXcuZGlzcGF0Y2goJ29uTG9uZ1RhcCcsIHRoaXMuZGF0YS51dWlkLCBlKTsgfSxcblx0XHRvblRvdWNoRm9yY2VDaGFuZ2UgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvblRvdWNoRm9yY2VDaGFuZ2UnLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25UcmFuc2l0aW9uRW5kIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25UcmFuc2l0aW9uRW5kJywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uQW5pbWF0aW9uU3RhcnQgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvblN0YXJ0JywgdGhpcy5kYXRhLnV1aWQsIGUpOyB9LFxuXHRcdG9uQW5pbWF0aW9uSXRlcmF0aW9uIChlKSB7IHRyYW5zcG9ydHMudmlldy5kaXNwYXRjaCgnb25BbmltYXRpb25JdGVyYXRpb24nLCB0aGlzLmRhdGEudXVpZCwgZSk7IH0sXG5cdFx0b25BbmltYXRpb25FbmQgKGUpIHsgdHJhbnNwb3J0cy52aWV3LmRpc3BhdGNoKCdvbkFuaW1hdGlvbkVuZCcsIHRoaXMuZGF0YS51dWlkLCBlKTsgfVxuICB9LFxuXG4gIGxpZmV0aW1lczoge1xuICAgIGNyZWF0ZWQgKCkgeyB0cmFuc3BvcnRzLnZpZXcuY2FsbExpZmVjeWNsZSgnY3JlYXRlZCcsIHRoaXMuZGF0YS51dWlkKTsgfSxcbiAgICBhdHRhY2hlZCAoKSB7IHRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdhdHRhY2hlZCcsIHRoaXMuZGF0YS51dWlkKTsgfSxcbiAgICBkZXRhY2hlZCAoKSB7IHRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdkZXRhY2hlZCcsIHRoaXMuZGF0YS51dWlkKTsgfSxcbiAgICByZWFkeSAoKSB7IHRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdyZWFkeScsIHRoaXMuZGF0YS51dWlkKTsgfSxcbiAgICBtb3ZlZCAoKSB7IHRyYW5zcG9ydHMudmlldy5jYWxsTGlmZWN5Y2xlKCdtb3ZlZCcsIHRoaXMuZGF0YS51dWlkKTsgfSxcbiAgICBlcnJvciAoZXJyb3IpIHsgdHJhbnNwb3J0cy52aWV3LmNhbGxMaWZlY3ljbGUoJ2RldGFjaGVkJywgdGhpcy5kYXRhLnV1aWQsIGVycm9yKTsgfVxuICB9LFxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9