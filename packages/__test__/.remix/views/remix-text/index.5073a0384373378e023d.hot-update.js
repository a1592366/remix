/*** MARK_1588228997064 WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ webpackHotUpdate("views/remix-text/index",{

/***/ "./.remix/views/remix-text/~index.js":
/*!*******************************************!*\
  !*** ./.remix/views/remix-text/~index.js ***!
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
    selectable: Boolean,
    space: Boolean,
    decode: Boolean,
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
    selectable: false,
    space: false,
    decode: false,
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

})
//# sourceMappingURL=index.5073a0384373378e023d.hot-update.js.map