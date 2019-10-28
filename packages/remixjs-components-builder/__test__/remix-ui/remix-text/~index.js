import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    child: Object,
		innerText: String,
		uuid: String,
		styles: String,
		className: String,
		selectable: Boolean,
		space: Boolean,
		decode: Boolean,
		
  },

  data: {
    child: null,
		innerText: null,
		uuid: null,
		styles: null,
		className: null,
		selectable: false,
		space: false,
		decode: false,
		
  },

  methods: {
    
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
