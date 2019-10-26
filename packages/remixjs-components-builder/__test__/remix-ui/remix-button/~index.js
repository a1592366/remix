import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    child: Object,
		uuid: String,
		style: String,
		className: String,
		onGetUserInfo: String,
		onContact: String,
		onGetPhoneNumber: String,
		onOpenSetting: String,
		onLaunchApp: String,
		onError: String,
		size: String,
		type: String,
		plain: Boolean,
		disabled: Boolean,
		loading: Boolean,
		formType: String,
		openType: String,
		hoverClass: String,
		hoverStopPropagation: Boolean,
		hoverStartTime: Number,
		hoverStayTime: Number,
		lang: String,
		sessionFrom: String,
		sendMessageTitle: String,
		sendMessagePath: String,
		sendMessageImg: String,
		appParameter: String,
		showMessageCard: String,
		
  },

  data: {
    child: null,
		uuid: null,
		style: null,
		className: null,
		onGetUserInfo: null,
		onContact: null,
		onGetPhoneNumber: null,
		onOpenSetting: null,
		onLaunchApp: null,
		onError: null,
		size: 'default',
		type: 'default',
		plain: false,
		disabled: false,
		loading: false,
		formType: null,
		openType: null,
		hoverClass: 'button-hover',
		hoverStopPropagation: false,
		hoverStartTime: 20,
		hoverStayTime: 70,
		lang: 'en',
		sessionFrom: null,
		sendMessageTitle: null,
		sendMessagePath: null,
		sendMessageImg: null,
		appParameter: null,
		showMessageCard: null,
		
  },

  methods: {
    onGetUserInfo (e) { transports.view.dispatch('onGetUserInfo', this.data.uuid, e); },
		onContact (e) { transports.view.dispatch('onContact', this.data.uuid, e); },
		onGetPhoneNumber (e) { transports.view.dispatch('onGetPhoneNumber', this.data.uuid, e); },
		onOpenSetting (e) { transports.view.dispatch('onOpenSetting', this.data.uuid, e); },
		onLaunchApp (e) { transports.view.dispatch('onLaunchApp', this.data.uuid, e); },
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
