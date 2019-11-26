import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

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
		uuid: String,
		
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
		uuid: null,
		
  },

  methods: {
    postMessage (data) { this.setData(data) },
    onTouchStart (e) { transports.view.dispatch('onTouchStart', this.data.uuid, this.data.parent, e); },
		onTouchMove (e) { transports.view.dispatch('onTouchMove', this.data.uuid, this.data.parent, e); },
		onTouchCancel (e) { transports.view.dispatch('onTouchCancel', this.data.uuid, this.data.parent, e); },
		onTouchEnd (e) { transports.view.dispatch('onTouchEnd', this.data.uuid, this.data.parent, e); },
		onTap (e) { transports.view.dispatch('onTap', this.data.uuid, this.data.parent, e); },
		onLongPress (e) { transports.view.dispatch('onLongPress', this.data.uuid, this.data.parent, e); },
		onLongTap (e) { transports.view.dispatch('onLongTap', this.data.uuid, this.data.parent, e); },
		onTouchForceChange (e) { transports.view.dispatch('onTouchForceChange', this.data.uuid, this.data.parent, e); },
		onTransitionEnd (e) { transports.view.dispatch('onTransitionEnd', this.data.uuid, this.data.parent, e); },
		onAnimationStart (e) { transports.view.dispatch('onAnimationStart', this.data.uuid, this.data.parent, e); },
		onAnimationIteration (e) { transports.view.dispatch('onAnimationIteration', this.data.uuid, this.data.parent, e); },
		onAnimationEnd (e) { transports.view.dispatch('onAnimationEnd', this.data.uuid, this.data.parent, e); }
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
