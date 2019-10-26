import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    uuid: String,
		style: String,
		className: String,
		onLoad: String,
		onError: String,
		src: String,
		mode: String,
		webp: Boolean,
		lazyLoad: Boolean,
		showMenuByLongpress: Boolean,
		
  },

  data: {
    uuid: null,
		style: null,
		className: null,
		onLoad: null,
		onError: null,
		src: null,
		mode: 'scaleToFill',
		webp: false,
		lazyLoad: false,
		showMenuByLongpress: false,
		
  },

  methods: {
    onLoad (e) { transports.view.dispatch('onLoad', this.data.uuid, e); },
		onError (e) { transports.view.dispatch('onError', this.data.uuid, e); }
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
