const level = {
  APPLICATION: 'application',
  PAGE: 'page',
  COMPONENT: 'component',
  COMMON: 'common',
  API: 'api',
  REQUEST: 'request',
  BATCH: 'batch',
  DEVTOOLS: 'devtools',
  SELECTOR: 'selector'
}

const types = {
  LIFECYCLE: 'liefcycle',
  CALLBACK: 'callback',
  EVENT: 'event',

  REQUEST_START: 'requestStart',
  REQUEST_END: 'requestEnd',
  REQUEST_ABORT: 'requestAbort',

  RESPONSE_BUFFER: 'arraybuffer',

  COMPONENT_UPDATED: 'componentUpdated',

  SELECTOR_IN: 'selectorIn',
  SELECTOR_DEFAULT: 'selectorDefault',
  SELECTOR_CONTEXT: 'selectorContext'
}

const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  READY: 'ready',
  DESTROY: 'destroy'
}

export default {
  level,
  types,
  status
}