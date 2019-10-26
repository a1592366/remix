import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    uuid: String,
		style: String,
		className: String,
		onInput: String,
		onFocus: String,
		onBlur: String,
		onConfirm: String,
		onKeyboardHeightChange: String,
		value: String,
		type: String,
		password: Boolean,
		placeholder: String,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		maxlength: Number,
		cursorSpacing: Number,
		autoFocus: Boolean,
		focus: Boolean,
		confirmType: String,
		confirmHold: Boolean,
		cursor: Number,
		selectionStart: Number,
		selectionEnd: Number,
		adjustPosition: Boolean,
		holdKeyboard: Boolean,
		
  },

  data: {
    uuid: null,
		style: null,
		className: null,
		onInput: null,
		onFocus: null,
		onBlur: null,
		onConfirm: null,
		onKeyboardHeightChange: null,
		value: null,
		type: 'text',
		password: false,
		placeholder: null,
		placeholderStyle: null,
		placeholderClass: 'input-placeholder',
		disabled: false,
		maxlength: 140,
		cursorSpacing: 0,
		autoFocus: false,
		focus: false,
		confirmType: 'done',
		confirmHold: false,
		cursor: 0,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
		
  },

  methods: {
    onInput (e) { transports.view.dispatch('onInput', this.data.uuid, e); },
		onFocus (e) { transports.view.dispatch('onFocus', this.data.uuid, e); },
		onBlur (e) { transports.view.dispatch('onBlur', this.data.uuid, e); },
		onConfirm (e) { transports.view.dispatch('onConfirm', this.data.uuid, e); },
		onKeyboardHeightChange (e) { transports.view.dispatch('onKeyboardHeightChange', this.data.uuid, e); }
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
