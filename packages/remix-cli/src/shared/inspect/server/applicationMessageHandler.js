const { Type, APPLICATION, COMMON } = require('remixjs-message-protocol');
const env = require('../../env');
const createInpsecting, { connect, getInspect } = require('./inspecting');

const { getOwnPropertyNames: getNames } = Object;

const inspectMessageHandler = {
  terminals: {},

  clear (id) {
    const keys = getNames(this.terminals);

    keys.forEach(key => {
      const terminal = this.terminals[key];
      
      if (terminal.id === id) {
        delete this.terminals[key];
      }
    });
  },

  waitingForInspecting (id, body, socket) {
    const { argv, callbackId } = body;
    const key = argv[0];
    
    this.terminals[key] = {
      status: 'waiting',
      callbackId,
      socket,
      id
    };
  },

  beginInspecting (id, body, socket) {
    const { argv, callbackId } = body;
    const key = argv[0];
    
    const terminal = this.terminals[key];

    if (terminal) {
      terminal.socket.post({
        type: String(APPLICATION),
        body: {
          type: APPLICATION.INSPECT,
          argv: [],
          callbackId: terminal.callbackId
        }
      });

      terminal.status = 'inspecting';
      terminal.logic = socket;
    }

    socket.post({
      type: String(APPLICATION),
      body: {
        type: APPLICATION.INSPECT,
        argv: [!!terminal],
        callbackId
      }
    })
  },

  applicationLaunch (id, body, socket) {
    const { argv } = body;
    const key = argv.shift();

    const terminal = this.terminals[key];

    if (terminal) {
      terminal.logic.post({
        type: String(APPLICATION),
        body: {
          ...body
        }
      });
    }
  }
}

const applicationMessageHandler = {
  onMessage (id, body, terminal, socket) {
    const { type } = body;
    const t = new Type(type.type, type.value);

    switch (t) {
      case APPLICATION.INSPECT: {
        createInpsecting(id, body, socket);
        break;
      }

      case APPLICATION.CONNECT: {
        connect(id, body, socket);
        break;
      }

      default: {
        getInspect(socket);
        break;
      }
    }
  }
};

module.exports = applicationMessageHandler;