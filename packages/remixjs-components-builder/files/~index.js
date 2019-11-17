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
    postMessage (data) { this.setData(data) },
    <%- events %>
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
