let nextTick = null;

if (typeof window !== 'undefined') {
  nextTick = wx.nextTick;
} else {
  if (typeof setImmediate === 'function') {
    nextTick = (callback) => setImmediate(callback);
  } else {
    nextTick = (callback) => setTimeout(callback);
  }
}


export default nextTick;