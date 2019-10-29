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
		onInput: String,
		onFocus: String,
		onBlur: String,
		onConfirm: String,
		onKeyboardHeightChange: String,
		uuid: String,
		styles: String,
		className: String,
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
		onInput: null,
		onFocus: null,
		onBlur: null,
		onConfirm: null,
		onKeyboardHeightChange: null,
		uuid: null,
		styles: null,
		className: null,
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
    onTouchStart (e) { transports.view.dispatch('onTouchStart', this.data.uuid, e); },
		onTouchMove (e) { transports.view.dispatch('onTouchMove', this.data.uuid, e); },
		onTouchCancel (e) { transports.view.dispatch('onTouchCancel', this.data.uuid, e); },
		onTouchEnd (e) { transports.view.dispatch('onTouchEnd', this.data.uuid, e); },
		onTap (e) { transports.view.dispatch('onTap', this.data.uuid, e); },
		onLongPress (e) { transports.view.dispatch('onLongPress', this.data.uuid, e); },
		onLongTap (e) { transports.view.dispatch('onLongTap', this.data.uuid, e); },
		onTouchForceChange (e) { transports.view.dispatch('onTouchForceChange', this.data.uuid, e); },
		onTransitionEnd (e) { transports.view.dispatch('onTransitionEnd', this.data.uuid, e); },
		onAnimationStart (e) { transports.view.dispatch('onAnimationStart', this.data.uuid, e); },
		onAnimationIteration (e) { transports.view.dispatch('onAnimationIteration', this.data.uuid, e); },
		onAnimationEnd (e) { transports.view.dispatch('onAnimationEnd', this.data.uuid, e); },
		onInput (e) { transports.view.dispatch('onInput', this.data.uuid, e); },
		onFocus (e) { transports.view.dispatch('onFocus', this.data.uuid, e); },
		onBlur (e) { transports.view.dispatch('onBlur', this.data.uuid, e); },
		onConfirm (e) { transports.view.dispatch('onConfirm', this.data.uuid, e); },
		onKeyboardHeightChange (e) { transports.view.dispatch('onKeyboardHeightChange', this.data.uuid, e); }
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
