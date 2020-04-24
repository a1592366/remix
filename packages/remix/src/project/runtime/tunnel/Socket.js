import env from '../../../../env';

export default function (options) {
  const Socket = env.isDevToolRuntime ?
    class {
      constructor (url, protocols) {
        this.socket = new WebSocket(url, protocols);
      }

      onMessage = (onMessage) => {
        this.socket.onmessage = onMessage;
      }

      onOpen = (onOpen) => {
        this.socket.onopen = onOpen;
      }

      onClose = (onClose) => {
        this.socket.onclose = onClose;
      }

      onError = (onError) => {
        this.socket.onerror = onError;
      }

      send ({ data }) {
        this.socket.send(data);
      }
    } : function (url, protocols) {
      return wx.connectSocket({
        url, 
        protocols: [protocols]
      });
    }

  const { url, protocols } = options;

  return new Socket(url, protocols.join('+'));
}