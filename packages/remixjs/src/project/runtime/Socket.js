import env from '../../../env';

export default function (options) {
  const Socket = env.isDevToolRunTime ?
    class {
      constructor ({ url, protocol }) {
        this.socket = new WebSocket(url, protocol);
      }

      onMessage = (onMessage) => {
        this.socket.onmessage = onMessage;
      }

      onOpen = (onOpen) => {
        this.socket.onopen = onOpen;
      }

      onClose = (onClose) => {
        this.socket.onopen = onClose;
      }

      onError = (onError) => {
        this.socket.onopen = onError;
      }

      send ({ data }) {
        this.socket.send(JSON.stringify(data));
      }
    } : function ({ url, protocol }) {
      return wx.connectSocket({
        url, 
        protocol
      });
    }

  return new Socket(options);
}