import { transports } from 'remixjs/project';

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    child: Object,
    uuid: String,
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
    created () { transports.view.dispatch('created', this.data.uuid); },
    attached () { transports.view.dispatch('attached', this.data.uuid); },
    detached () { transports.view.dispatch('detached', this.data.uuid); },
    ready () { transports.view.dispatch('ready', this.data.uuid); },
    moved () { transports.view.dispatch('moved', this.data.uuid); },
    error (error) { transports.view.dispatch('detached', this.data.uuid, error); }
  },

  methods: {
    onTouchStart (e) { transports.view.dispatch('onTouchStart', e.target.id, e) },
    onTouchMove (e) { transports.view.dispatch('onTouchStart', e.target.id, e) },
    onTouchCancel (e) { transports.view.dispatch('onTouchStart', e.target.id, e) },
    onTouchEnd (e) { transports.view.dispatch('onTouchStart', e.target.id, e) },
    onTap (e) { transports.view.dispatch('onTap', e.target.id, e) },
    onLongPress (e) { transports.view.dispatch('onLongPress', e.target.id, e) },
    onLongTap (e) { transports.view.dispatch('onLongTap', e.target.id, e) },
    onTransitionEnd (e) { transports.view.dispatch('onTransitionEnd', e.target.id, e) },
    onAnimationStart (e) { transports.view.dispatch('onAnimationStart', e.target.id, e) },
    onAnimationIteration (e) { transports.view.dispatch('onAnimationIteration', e.target.id, e) },
    onAnimationEnd (e) { transports.view.dispatch('onAnimationEnd', e.target.id, e) },
    onTouchForceChange (e) { transports.view.dispatch('onTouchForceChange', e.target.id, e) },
  }
})
