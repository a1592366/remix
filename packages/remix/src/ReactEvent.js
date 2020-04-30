import nextTick from './shared/nextTick';
import performance from './shared/performance';
import { SCHEDULE_FPS, INTERNAL_EVENT_HANDLERS_KEY } from './shared';


let ReactCurrentScheduler;
const ReactCurrentSchedulerHeap = [];

const [
  IMMEDIATE,
  FIRST,
  DEFAULT
] = [
  0,
  parseInt(1000 / SCHEDULE_FPS),
  parseInt(2000 / SCHEDULE_FPS)
];

const bubbleEvents = [
  'touchstart',
  'touchmove',
  'touchcancel',
  'touchend',
  'tap',
  'longpress',
  'longtap',
  'touchforcechange',
  'transitionend',
  'animationstart',
  'animationiteration',
  'animationend',
  'input'
];

const priority = {
  touchstart: IMMEDIATE,
  touchmove: IMMEDIATE,
  touchcancel: IMMEDIATE,
  touchend: IMMEDIATE,
  tap: IMMEDIATE,
  longpress: IMMEDIATE,
  longtap: IMMEDIATE,
  touchforcechange: IMMEDIATE,
  transitionend: IMMEDIATE,
  animationstart: IMMEDIATE,
  animationiteration: IMMEDIATE,
  animationend: IMMEDIATE,
  scroll: IMMEDIATE,
  onInput: IMMEDIATE,
  focus: FIRST,
  blur: FIRST,
  confirm: FIRST,
  timeupdate: FIRST,
  defaults: DEFAULT
}


class ViewEvent {
  constructor (event) {
    this.nativeEvent = event;
    const { type, detail, touches, timeStamp, changedTouches } = event;

    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = bubbleEvents.includes(this.type);
    this.cancelBubble = false;
    this.detail = detail;
  }

  stopPropagation () {
    this.cancelBubble = true;
  }

  preventDefault () {}
}

function push (node) {
  ReactCurrentSchedulerHeap.push(node);

  if (ReactCurrentSchedulerHeap.length > 1) {
    siftup(node, ReactCurrentSchedulerHeap.length);
  }
}

function siftup (node , leaf) {
  while (leaf > 0) {
    // 父节点 索引 
    const index = (leaf - 1) >>> 2;
    const parent = ReactCurrentSchedulerHeap[index];
    // 与父节点比较

    if (parent.level < node.level) {
      ReactCurrentSchedulerHeap[index] = node;
      ReactCurrentSchedulerHeap[leaf] = parent;
      leaf = index;
    } else if (parent.level === node.level) {
      if (parent.begin > node.level) {
        ReactCurrentSchedulerHeap[index] = node;
        ReactCurrentSchedulerHeap[leaf] = parent;
        leaf = index;
      }
    }
  }
}

function siftdown (node, first) {
  const length = ReactCurrentSchedulerHeap.length;
  
  while (true) {
    const l = first * 2 + 1;
    const left = ReactCurrentSchedulerHeap[l];
    
    if (l > length) {
      break;
    }

    // 右边叶子索引 = 父节点索引 * 2 + 2 = 左边索引 + 1
    const r = l + 1;
    const right = ReactCurrentSchedulerHeap[r];

    // 选左右叶子索引
    const c = r < length && (right.level - left.level) < 0 ? r : l;
    const child = ReactCurrentSchedulerHeap[c];

    // 不用交换
    if (child) {
      if (
        (child.level < node.level) < 0 ||
        (child.begin > node.begin)
      ) {
        break;
      }
    }

    // 交换节点
    ReactCurrentSchedulerHeap[c] = node;
    ReactCurrentSchedulerHeap[first] = child;
    first = c;
  }
}

function pop () {
  const first = ReactCurrentSchedulerHeap[0];

  if (first) {
    const last = ReactCurrentSchedulerHeap.pop();

    if (last === first) {
      return first;
    }

    ReactCurrentSchedulerHeap[0] = last;
    siftdown(last, 0);

    return first;
  } else {
    return null;
  }
}

function peek () {
  return ReactCurrentSchedulerHeap[0] || null;
}

function flush () {
  let next = peek();

  while (next) {

    const schedule = next.schedule;
    schedule.schedule = null;

    schedule();
    pop();

    next = peek();
  }
}

function flushWork () {
  ReactCurrentScheduler = flush;

  const next = () => {
    if (ReactCurrentScheduler) {  
      ReactCurrentScheduler();

      peek() ?
        flushWork() : 
        ReactCurrentScheduler = null;
    }
  }

  nextTick(next);
}

function dispatchEvent (view, type, event) {
  const props = view[INTERNAL_EVENT_HANDLERS_KEY];

  if (typeof props[type] === 'function') {
    props[type](new ViewEvent(event));
  }
}

export function scheduleWork ({ type, event, view }) {
  return dispatchEvent(view, type, event);

  const level = priority[type] || priority.defaults;
  if (level === IMMEDIATE) {
    dispatchEvent(view, type, event);
  } else {
    const work = { 
      schedule: () => dispatchEvent(view, type, event), 
      begin: performance.now(), 
      level 
    }

    push(work);
    flushWork();
  }
}