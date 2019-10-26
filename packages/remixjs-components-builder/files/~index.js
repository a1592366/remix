import { transports } from 'remixjs/project';


Component({
  options: { addGlobalClass: true },

  properties: {
    <%= properties %>
  },

  data: {
    <%- data %>
  },

  methods: {
    <%- events %>
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
