let nextTick = null;
const randomKey = Math.random().toString(36).slice(2);
const isArray = Array.isArray;
const { is, keys, hasOwnProperty } = Object;

// --- common method / object ----
export const performance = typeof performance === 'undefined' ?
  {
    origin: Date.now(),
    now () {
      return Date.now() - this.origin;
    }
  } : performance;

export function shallowEqual (
  objectA, 
  objectB
) {
  if (objectA === null || objectB === null) {
    return false;
  }

  if (is(objectA, objectB)) {
    return true;
  }

  const keysA = objectA ? keys(objectA) : [];
  const keysB = objectB ? keys(objectB) : [];

  if (keysA.length !== keysB.length) {
    return false;
  }

  const length = keysA.length;

  for (let i = 0; i < length; i++) {
    const key = keysA[i];

    if (
      !hasOwnProperty.call(objectB, key) || 
      !is(objectA[key], objectB[key])
    ) {
      return false;
    }
  }

  return true;
}

export function resolveDefaultProps (
  defaultProps,
  unresolvedProps
) {
  if (defaultProps) {
    const props = { ... unresolvedProps };

    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }

    return props;
  }
  
  return unresolvedProps;
}

export function flatten (array, result = []) {
  const { length } = array;

  for (let i = 0; i < length; i++) {
    const value = array[i];

    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

// ---- window ---
if (typeof window !== 'undefined') {
  nextTick = wx.nextTick;
} else {
  if (typeof setImmediate === 'function') {
    nextTick = (callback) => setImmediate(callback);
  } else {
    nextTick = (callback) => setTimeout(callback);
  }
}
  
  
export {
  nextTick
}

  // ---- internal property ----
export const [
  INTERNAL_INSTANCE_KEY, 
  INTERNAL_EVENT_HANDLERS_KEY,
  INTERNAL_RELATIVE_KEY,
  INTERNAL_ROOT_FIBER_KEY,
  INTERNAL_FIBER_KEY
] = [
  `__reactInternalInstance$${randomKey}`,
  `__reactEventHandlers${randomKey}`,
  `__reactInternalRelative$${randomKey}`,
  `__reactInternalRootFiber$${randomKey}`,
  `__reactInternalFiberKey`
]

// ---- workTag ---
export const [
  FUNCTION_COMPONENT,
  CLASS_COMPONENT,
  INDETERMINATE_COMPONENT,
  HOST_ROOT,
  HOST_PORTAL,
  HOST_COMPONENT,
  HOST_TEXT,
  FRAGMENT,
  OBJECT_COMPONENT,
] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];

// ---- effectTag ---
export const [
  SIDE_EFFECT,
  NO_EFFECT,
  PERFORMED,
  PLACEMENT,
  UPDATE,
  PLACEMENT_AND_UPDATE,
  DELETION,
  CONTENT_RESET,
  CALLBACK,
  ERROR,
  REF,
  SNAPSHOT,
  PASSIVE,
  INCOMPLETE,
] = [
  0,
  0,
  1,
  2,
  4,
  6,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024
];

// ---- html node types ----
export const [
  IMAGE,
  BUTTON,
  MAP,
  INPUT,
  VIEW,
  ROOT,
  BODY,
  TEXT,
  PLAIN_TEXT,
  PICKER,
  SWIPER_ITEM,
  SWIPER,
  VIDEO,
  TEXTAREA,
  EDITOR,
] = [
  'image',
  'button',
  'map',
  'input',
  'view',
  'root',
  'body',
  'text',
  '#text',
  'picker',
  'swiper-item',
  'swiper',
  'video',
  'textarea',
  'editor',
];

export const [
  UPDATE_STATE
] = [
  'UPDATE_STATE'
];


export const [
  ASYNC,
  SYNC
] = [
  'ASYNC',
  'SYNC'
];

export const [
  REACT_ELEMENT_TYPE,
  REACT_PORTAL_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
] = [
  'react.element',
  'react.portal',
  'react.fragment',
  'react.suspense',
  'react.memo',
  'react.lazy',
];


export const [
  STYLE,
  CHILDREN,
  FLOAT,
] = [
  'style',
  'children',
  'float'
]