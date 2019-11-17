import { transports } from 'remixjs/project';

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    child: Object,
    uuid: String,
    parent: String,
    className: String,
    style: String,
    onTouchStart: String,
    onTouchMove: String,
    onTouchCancel: String,
    onTouchEnd: String,
    onTap: String,
    onLongPress: String,
    onLongTap: String,
    onTransitionEnd: String,
    onAnimationStart: String,
    onAnimationIteration: String,
    onAnimationEnd: String,
    onTouchForceChange: String,
  },

  data: {
    child: null,
    uuid: null,
    className: null,
    style: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchCancel: null,
    onTouchEnd: null,
    onTap: null,
    onLongPress: null,
    onLongTap: null,
    onTransitionEnd: null,
    onAnimationStart: null,
    onAnimationIteration: null,
    onAnimationEnd: null,
    onTouchForceChange: null,
  },

  lifetimes: {
    created () { transports.view.dispatch('created', this.data.uuid, this.data.parent, this); },
    attached () { transports.view.dispatch('attached', this.data.uuid, this.data.parent, this); },
    detached () { transports.view.dispatch('detached', this.data.uuid, this.data.parent, this); },
    ready () { transports.view.dispatch('ready', this.data.uuid, this.data.parent, this); },
    moved () { transports.view.dispatch('moved', this.data.uuid, this.data.parent, this); },
    error (error) { transports.view.dispatch('detached', this.data.uuid, this.data.parent, error, this); }
  },

  methods: {
    postMessage (data) { this.setData(data) },
    onTouchStart (e) { transports.view.dispatch('onTouchStart', e.target.id, this.data.parent, e, this) },
    onTouchMove (e) { transports.view.dispatch('onTouchStart', e.target.id, this.data.parent, e, this) },
    onTouchCancel (e) { transports.view.dispatch('onTouchStart', e.target.id, this.data.parent, e, this) },
    onTouchEnd (e) { transports.view.dispatch('onTouchStart', e.target.id, this.data.parent, e, this) },
    onTap (e) { transports.view.dispatch('onTap', e.target.id, this.data.parent, e, this) },
    onLongPress (e) { transports.view.dispatch('onLongPress', e.target.id, this.data.parent, e, this) },
    onLongTap (e) { transports.view.dispatch('onLongTap', e.target.id, e, this) },
    onTransitionEnd (e) { transports.view.dispatch('onTransitionEnd', e.target.id, this.data.parent, e, this) },
    onAnimationStart (e) { transports.view.dispatch('onAnimationStart', e.target.id, this.data.parent, e, this) },
    onAnimationIteration (e) { transports.view.dispatch('onAnimationIteration', e.target.id, this.data.parent, e, this) },
    onAnimationEnd (e) { transports.view.dispatch('onAnimationEnd', e.target.id, this.data.parent, e, this) },
    onTouchForceChange (e) { transports.view.dispatch('onTouchForceChange', e.target.id, this.data.parent, e, this) },
  }
})
