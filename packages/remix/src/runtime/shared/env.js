const env = process.env.NODE_ENV;
const mode = env.BRIDGE_MODE;
const ws = env.WS_URL;
const protocol = env.WS_PROTOCOL;

const isMiniProgram = typeof wx === 'object' && wx.getSystemInfo;

const types = {
  DEBUGGER: 'socket',
  REMOTE: 'socket',
  NATIVE: 'native',

  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export {
  types,
  mode,
  env,
  ws,
  protocol,
  isMiniProgram
}