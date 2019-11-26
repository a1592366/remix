import { transports } from 'remixjs/project';


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
		
  },

  methods: {
    postMessage (data) { this.setData(data) },
    
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
