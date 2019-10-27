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
		onTransitionEnd: String,
		onAnimationStart: String,
		onAnimationIteration: String,
		onAnimationEnd: String,
		onTouchForceChange: String,
		child: Object,
		innerText: String,
		uuid: String,
		styles: String,
		className: String,
		hoverClass: String,
		hoverStopPropagation: Boolean,
		hoverStartTime: Number,
		hoverStayTime: Number,
		
  },

  data: {
    onTouchStart: null,
		onTouchMove: null,
		onTouchCancel: null,
		onTouchEnd: null,
		onTap: null,
		onLongPress: null,
		onLongTap: null,
		onTransitionEnd: null,
		onAnimationStart: null,
		onAnimationIteration: null,
		onAnimationEnd: null,
		onTouchForceChange: null,
		child: null,
		innerText: null,
		uuid: null,
		styles: null,
		className: null,
		hoverClass: 'none',
		hoverStopPropagation: false,
		hoverStartTime: 50,
		hoverStayTime: 400,
		
  },

  methods: {
    onTouchStart (e) { transports.view.dispatch('onTouchStart', this.data.uuid, e); },
		onTouchMove (e) { transports.view.dispatch('onTouchMove', this.data.uuid, e); },
		onTouchCancel (e) { transports.view.dispatch('onTouchCancel', this.data.uuid, e); },
		onTouchEnd (e) { transports.view.dispatch('onTouchEnd', this.data.uuid, e); },
		onTap (e) { transports.view.dispatch('onTap', this.data.uuid, e); },
		onLongPress (e) { transports.view.dispatch('onLongPress', this.data.uuid, e); },
		onLongTap (e) { transports.view.dispatch('onLongTap', this.data.uuid, e); },
		onTransitionEnd (e) { transports.view.dispatch('onTransitionEnd', this.data.uuid, e); },
		onAnimationStart (e) { transports.view.dispatch('onAnimationStart', this.data.uuid, e); },
		onAnimationIteration (e) { transports.view.dispatch('onAnimationIteration', this.data.uuid, e); },
		onAnimationEnd (e) { transports.view.dispatch('onAnimationEnd', this.data.uuid, e); },
		onTouchForceChange (e) { transports.view.dispatch('onTouchForceChange', this.data.uuid, e); }
  },

  lifetimes: {
    created () { transports.view.dispatch('created', this.data.uuid); },
    attached () { transports.view.dispatch('attached', this.data.uuid); },
    detached () { transports.view.dispatch('detached', this.data.uuid); },
    ready () { transports.view.dispatch('ready', this.data.uuid); },
    moved () { transports.view.dispatch('moved', this.data.uuid); },
    error (error) { transports.view.dispatch('detached', this.data.uuid, error); }
  },
});
