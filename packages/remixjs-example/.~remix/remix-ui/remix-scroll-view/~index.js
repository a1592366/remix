import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    onScrollToUpper: String,
		onScrollToLower: String,
		onScroll: String,
		child: Object,
		innerText: String,
		uuid: String,
		styles: String,
		className: String,
		scrollX: Boolean,
		scrollY: Boolean,
		upperThreshold: Number,
		lowerThreshold: Number,
		scrollTop: Number,
		scrollLeft: Number,
		scrollIntoView: String,
		scrollWithAnimation: Boolean,
		enableBackToTop: Boolean,
		enableFlex: Boolean,
		scrollAnchoring: Boolean,
		
  },

  data: {
    onScrollToUpper: null,
		onScrollToLower: null,
		onScroll: null,
		child: null,
		innerText: null,
		uuid: null,
		styles: null,
		className: null,
		scrollX: false,
		scrollY: false,
		upperThreshold: 50,
		lowerThreshold: 50,
		scrollTop: null,
		scrollLeft: null,
		scrollIntoView: null,
		scrollWithAnimation: false,
		enableBackToTop: false,
		enableFlex: false,
		scrollAnchoring: false,
		
  },

  methods: {
    onScrollToUpper (e) { transports.view.dispatch('onScrollToUpper', this.data.uuid, e); },
		onScrollToLower (e) { transports.view.dispatch('onScrollToLower', this.data.uuid, e); },
		onScroll (e) { transports.view.dispatch('onScroll', this.data.uuid, e); }
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
