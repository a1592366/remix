
const { Type, APPLICATION, COMMON } = require('remixjs-mesaage-protocol');
const env = require('../../env');

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


function applicationMessage (id, body, terminal, socket) {
  const { type } = body;
  const t = new Type(type.type, type.value);

  switch (t) {
    case APPLICATION.INSPECT: {
      terminal === env.INSPECT_TERMINAL_TYPES.VIEW ?
        inspectMessageHandler.waitingForInspecting(id, body, socket) :
        inspectMessageHandler.beginInspecting(id, body, socket);
      break;
    }

    case APPLICATION.LAUNCH: {
      const terminal = inspectMessageHandler.applicationLaunch(id, body, socket);
      break;
    }
  }
} 

applicationMessage.clear = function (id) {
  inspectMessageHandler.clear(id);
}

applicationMessage.inspectMessageHandler = inspectMessageHandler;

module.exports = applicationMessage;