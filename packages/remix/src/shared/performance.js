const now = Date.now();

export default {
  now () {
    return Date.now() - now
  }
}