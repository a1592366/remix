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
    created () { transports.view.callLifecycle('created', this.data.uuid); },
    attached () { transports.view.callLifecycle('attached', this.data.uuid); },
    detached () { transports.view.callLifecycle('detached', this.data.uuid); },
    ready () { transports.view.callLifecycle('ready', this.data.uuid); },
    moved () { transports.view.callLifecycle('moved', this.data.uuid); },
    error (error) { transports.view.callLifecycle('detached', this.data.uuid, error); }
  },
});
