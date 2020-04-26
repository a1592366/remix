import env from '../../../../env';

function Socket (options) {
  if (env.mode === 'devtool') {
    const { url, protocols } = options;
    return {
      socket: new WebSocket(url, protocols),
      onMessage (onMessage) {
        this.socket.onmessage = onMessage
      },
      onError (onError) {
        this.socket.onerror = onError;
      }
    };
  } else {
    return wx.connectSocket(options);
  }
}

export default function (options) {
  return new Socket(options);
}