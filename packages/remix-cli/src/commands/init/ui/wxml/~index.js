import { ViewNativeSupport } from '@remix/core/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    <%= properties %>
  },

  data: {
    <%- data %>
  },

  methods: {
    sync (data) { this.setData(data) },
    // others component event
    onGetUserInfo(e) { ViewNativeSupport.Publisher.Event('onGetUserInfo', e.target.id, this.data.parent, e, this) },
    onContact(e) { ViewNativeSupport.Publisher.Event('onContact', e.target.id, this.data.parent, e, this) },
    onGetPhoneNumber(e) { ViewNativeSupport.Publisher.Event('onGetPhoneNumber', e.target.id, this.data.parent, e, this) },
    onOpenSetting(e) { ViewNativeSupport.Publisher.Event('onOpenSetting', e.target.id, this.data.parent, e, this) },
    onLaunchApp(e) { ViewNativeSupport.Publisher.Event('onLaunchApp', e.target.id, this.data.parent, e, this) },
    onError(e) { ViewNativeSupport.Publisher.Event('onError', e.target.id, this.data.parent, e, this) },
    onLoad(e) { ViewNativeSupport.Publisher.Event('onLoad', e.target.id, this.data.parent, e, this) },
    onInput(e) { ViewNativeSupport.Publisher.Event('onInput', e.target.id, this.data.parent, e, this) },
    onFocus(e) { ViewNativeSupport.Publisher.Event('onFocus', e.target.id, this.data.parent, e, this) },
    onBlur(e) { ViewNativeSupport.Publisher.Event('onBlur', e.target.id, this.data.parent, e, this) },
    onConfirm(e) { ViewNativeSupport.Publisher.Event('onConfirm', e.target.id, this.data.parent, e, this) },
    onKeyboardHeightChange(e) { ViewNativeSupport.Publisher.Event('onKeyboardHeightChange', e.target.id, this.data.parent, e, this) },
    onMarkerTap(e) { ViewNativeSupport.Publisher.Event('onMarkerTap', e.target.id, this.data.parent, e, this) },
    onLabelTap(e) { ViewNativeSupport.Publisher.Event('onLabelTap', e.target.id, this.data.parent, e, this) },
    onControlTap(e) { ViewNativeSupport.Publisher.Event('onControlTap', e.target.id, this.data.parent, e, this) },
    onCalloutTap(e) { ViewNativeSupport.Publisher.Event('onCalloutTap', e.target.id, this.data.parent, e, this) },
    onUpdated(e) { ViewNativeSupport.Publisher.Event('onUpdated', e.target.id, this.data.parent, e, this) },
    onRegionChange(e) { ViewNativeSupport.Publisher.Event('onRegionChange', e.target.id, this.data.parent, e, this) },
    onCancel(e) { ViewNativeSupport.Publisher.Event('onCancel', e.target.id, this.data.parent, e, this) },
    onColumnChange(e) { ViewNativeSupport.Publisher.Event('onColumnChange', e.target.id, this.data.parent, e, this) },
    onScrollToUpper(e) { ViewNativeSupport.Publisher.Event('onScrollToUpper', e.target.id, this.data.parent, e, this) },
    onScrollToLower(e) { ViewNativeSupport.Publisher.Event('onScrollToLower', e.target.id, this.data.parent, e, this) },
    onScroll(e) { ViewNativeSupport.Publisher.Event('onScroll', e.target.id, this.data.parent, e, this) },
    onAnimationFinish(e) { ViewNativeSupport.Publisher.Event('onAnimationFinish', e.target.id, this.data.parent, e, this) },
    onPlay(e) { ViewNativeSupport.Publisher.Event('onPlay', e.target.id, this.data.parent, e, this) },
    onPause(e) { ViewNativeSupport.Publisher.Event('onPause', e.target.id, this.data.parent, e, this) },
    onEnded(e) { ViewNativeSupport.Publisher.Event('onEnded', e.target.id, this.data.parent, e, this) },
    onTimeUpdate(e) { ViewNativeSupport.Publisher.Event('onTimeUpdate', e.target.id, this.data.parent, e, this) },
    onFullScreenChange(e) { ViewNativeSupport.Publisher.Event('onFullScreenChange', e.target.id, this.data.parent, e, this) },
    onWaiting(e) { ViewNativeSupport.Publisher.Event('onWaiting', e.target.id, this.data.parent, e, this) },
    onProgress(e) { ViewNativeSupport.Publisher.Event('onProgress', e.target.id, this.data.parent, e, this) },
    onLoadedMetaData(e) { ViewNativeSupport.Publisher.Event('onTimeUpdate', e.target.id, this.data.parent, e, this) },
    <%- methods %>
  },

  lifetimes: {
    created () { ViewNativeSupport.Publisher.Lifecycle('created', this.data.uuid, this.data.parent, this); },
    attached () { ViewNativeSupport.Publisher.Lifecycle('attached', this.data.uuid, this.data.parent, this); },
    detached () { ViewNativeSupport.Publisher.Lifecycle('detached', this.data.uuid, this.data.parent, this); },
    ready () { ViewNativeSupport.Publisher.Lifecycle('ready', this.data.uuid, this.data.parent, this); },
    moved () { ViewNativeSupport.Publisher.Lifecycle('moved', this.data.uuid, this.data.parent, this); },
    error (error) { ViewNativeSupport.Publisher.Lifecycle('detached', this.data.uuid, this.data.parent, error, this); }
  },
});
