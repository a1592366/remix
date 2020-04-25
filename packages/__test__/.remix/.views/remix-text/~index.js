import { transports } from '@remix/core/project';


Component({
  options: { addGlobalClass: true },

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
    postMessage (data) { this.setData(data) },
    // others component event
    onGetUserInfo(e) { transports.view.dispatch('onGetUserInfo', e.target.id, this.data.parent, e, this) },
    onContact(e) { transports.view.dispatch('onContact', e.target.id, this.data.parent, e, this) },
    onGetPhoneNumber(e) { transports.view.dispatch('onGetPhoneNumber', e.target.id, this.data.parent, e, this) },
    onOpenSetting(e) { transports.view.dispatch('onOpenSetting', e.target.id, this.data.parent, e, this) },
    onLaunchApp(e) { transports.view.dispatch('onLaunchApp', e.target.id, this.data.parent, e, this) },
    onError(e) { transports.view.dispatch('onError', e.target.id, this.data.parent, e, this) },
    onLoad(e) { transports.view.dispatch('onLoad', e.target.id, this.data.parent, e, this) },
    onInput(e) { transports.view.dispatch('onInput', e.target.id, this.data.parent, e, this) },
    onFocus(e) { transports.view.dispatch('onFocus', e.target.id, this.data.parent, e, this) },
    onBlur(e) { transports.view.dispatch('onBlur', e.target.id, this.data.parent, e, this) },
    onConfirm(e) { transports.view.dispatch('onConfirm', e.target.id, this.data.parent, e, this) },
    onKeyboardHeightChange(e) { transports.view.dispatch('onKeyboardHeightChange', e.target.id, this.data.parent, e, this) },
    onMarkerTap(e) { transports.view.dispatch('onMarkerTap', e.target.id, this.data.parent, e, this) },
    onLabelTap(e) { transports.view.dispatch('onLabelTap', e.target.id, this.data.parent, e, this) },
    onControlTap(e) { transports.view.dispatch('onControlTap', e.target.id, this.data.parent, e, this) },
    onCalloutTap(e) { transports.view.dispatch('onCalloutTap', e.target.id, this.data.parent, e, this) },
    onUpdated(e) { transports.view.dispatch('onUpdated', e.target.id, this.data.parent, e, this) },
    onRegionChange(e) { transports.view.dispatch('onRegionChange', e.target.id, this.data.parent, e, this) },
    onCancel(e) { transports.view.dispatch('onCancel', e.target.id, this.data.parent, e, this) },
    onColumnChange(e) { transports.view.dispatch('onColumnChange', e.target.id, this.data.parent, e, this) },
    onScrollToUpper(e) { transports.view.dispatch('onScrollToUpper', e.target.id, this.data.parent, e, this) },
    onScrollToLower(e) { transports.view.dispatch('onScrollToLower', e.target.id, this.data.parent, e, this) },
    onScroll(e) { transports.view.dispatch('onScroll', e.target.id, this.data.parent, e, this) },
    onAnimationFinish(e) { transports.view.dispatch('onAnimationFinish', e.target.id, this.data.parent, e, this) },
    onPlay(e) { transports.view.dispatch('onPlay', e.target.id, this.data.parent, e, this) },
    onPause(e) { transports.view.dispatch('onPause', e.target.id, this.data.parent, e, this) },
    onEnded(e) { transports.view.dispatch('onEnded', e.target.id, this.data.parent, e, this) },
    onTimeUpdate(e) { transports.view.dispatch('onTimeUpdate', e.target.id, this.data.parent, e, this) },
    onFullScreenChange(e) { transports.view.dispatch('onFullScreenChange', e.target.id, this.data.parent, e, this) },
    onWaiting(e) { transports.view.dispatch('onWaiting', e.target.id, this.data.parent, e, this) },
    onProgress(e) { transports.view.dispatch('onProgress', e.target.id, this.data.parent, e, this) },
    onLoadedMetaData(e) { transports.view.dispatch('onTimeUpdate', e.target.id, this.data.parent, e, this) },
    onTouchStart (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTouchStart', uuid, parent, e); },onTouchMove (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTouchMove', uuid, parent, e); },onTouchCancel (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTouchCancel', uuid, parent, e); },onTouchEnd (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTouchEnd', uuid, parent, e); },onTap (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTap', uuid, parent, e); },onLongPress (e) { const { uuid, parent } = this.data; transport.view.dispatch('onLongPress', uuid, parent, e); },onLongTap (e) { const { uuid, parent } = this.data; transport.view.dispatch('onLongTap', uuid, parent, e); },onTouchForceChange (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTouchForceChange', uuid, parent, e); },onTransitionEnd (e) { const { uuid, parent } = this.data; transport.view.dispatch('onTransitionEnd', uuid, parent, e); },onAnimationStart (e) { const { uuid, parent } = this.data; transport.view.dispatch('onAnimationStart', uuid, parent, e); },onAnimationIteration (e) { const { uuid, parent } = this.data; transport.view.dispatch('onAnimationIteration', uuid, parent, e); },onAnimationEnd (e) { const { uuid, parent } = this.data; transport.view.dispatch('onAnimationEnd', uuid, parent, e); }
  },

  lifetimes: {
    created () { transports.view.callLifecycle('created', this.data.uuid, this.data.parent, this); },
    attached () { transports.view.callLifecycle('attached', this.data.uuid, this.data.parent, this); },
    detached () { transports.view.callLifecycle('detached', this.data.uuid, this.data.parent, this); },
    ready () { transports.view.callLifecycle('ready', this.data.uuid, this.data.parent, this); },
    moved () { transports.view.callLifecycle('moved', this.data.uuid, this.data.parent, this); },
    error (error) { transports.view.callLifecycle('detached', this.data.uuid, this.data.parent, error, this); }
  },
});
