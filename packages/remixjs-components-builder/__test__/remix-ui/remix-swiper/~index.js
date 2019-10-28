import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    onChange: String,
		onAnimationFinish: String,
		child: Object,
		innerText: String,
		uuid: String,
		styles: String,
		className: String,
		indicatorDots: Boolean,
		indicatorColor: String,
		indicatorActiveColor: String,
		autoplay: Boolean,
		current: Number,
		interval: Number,
		duration: Number,
		circular: Boolean,
		vertical: Boolean,
		previousMargin: String,
		nextMargin: String,
		displayMultipleItems: Number,
		skipHiddenItemLayou: Boolean,
		easingFunction: String,
		
  },

  data: {
    onChange: null,
		onAnimationFinish: null,
		child: null,
		innerText: null,
		uuid: null,
		styles: null,
		className: null,
		indicatorDots: false,
		indicatorColor: 'rgba(0, 0, 0, .3)',
		indicatorActiveColor: '#000000',
		autoplay: false,
		current: 0,
		interval: 5000,
		duration: 500,
		circular: false,
		vertical: false,
		previousMargin: '0px',
		nextMargin: '0px',
		displayMultipleItems: 1,
		skipHiddenItemLayou: false,
		easingFunction: 'default',
		
  },

  methods: {
    onChange (e) { transports.view.dispatch('onChange', this.data.uuid, e); },
		onAnimationFinish (e) { transports.view.dispatch('onAnimationFinish', this.data.uuid, e); }
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
