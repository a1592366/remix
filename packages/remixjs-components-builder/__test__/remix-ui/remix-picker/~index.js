import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    onCancel: String,
		onError: String,
		onChange: String,
		onColumnChange: String,
		child: Object,
		innerText: String,
		uuid: String,
		styles: String,
		className: String,
		mode: String,
		disabled: Boolean,
		range: Object,
		rangeKey: String,
		value: Number,
		start: String,
		end: String,
		fields: String,
		customItem: String,
		
  },

  data: {
    onCancel: null,
		onError: null,
		onChange: null,
		onColumnChange: null,
		child: null,
		innerText: null,
		uuid: null,
		styles: null,
		className: null,
		mode: 'selector',
		disabled: false,
		range: [],
		rangeKey: null,
		value: 0,
		start: null,
		end: null,
		fields: 'day',
		customItem: null,
		
  },

  methods: {
    onCancel (e) { transports.view.dispatch('onCancel', this.data.uuid, e); },
		onError (e) { transports.view.dispatch('onError', this.data.uuid, e); },
		onChange (e) { transports.view.dispatch('onChange', this.data.uuid, e); },
		onColumnChange (e) { transports.view.dispatch('onColumnChange', this.data.uuid, e); }
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
