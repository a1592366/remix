import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    child: Object,
		innerText: String,
		uuid: String,
		style: String,
		className: String,
		selectable: Boolean,
		space: Boolean,
		decode: Boolean,
		
  },

  data: {
    child: null,
		innerText: null,
		uuid: null,
		style: null,
		className: null,
		selectable: false,
		space: false,
		decode: false,
		
  },

  methods: {
    
  },

  lifetimes: {
    created () { transports.view.callLifecycle('created', this.data.uuid); },
    attached () { transports.view.callLifecycle('attached', this.data.uuid); },
    detached () { transports.view.callLifecycle('detached', this.data.uuid); },
    ready () { transports.view.callLifecycle('ready', this.data.uuid); },
    moved () { transports.view.callLifecycle('moved', this.data.uuid); },
    error (error) { transports.view.callLifecycle('detached', this.data.uuid, error); }
  },
});
