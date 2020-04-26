import performance from './shared/performance';
import nextTick from './shared/nextTick';
import { commitAllWork } from './ReactCommit';
import { enqueueUpdateQueue, dequeueUpdateQueue } from './ReactUpdater';
import { updateHostRoot, updateFunctionComponent, updateHostComponent, updateClassComponent } from './ReactReconciler';
import { SCHEDULE_TIMEOUT, SCHEDULE_FPS, SCHEDULE_KEY } from './shared';
import { HOST_ROOT, FUNCTION_COMPONENT, CLASS_COMPONENT, HOST_COMPONENT } from './shared/workTags';
import { NO_WORK } from './shared';

let isRendering = false;
let ReactCurrentScheduler;
let scheduleDeadline = 0;

let workInProgress = null;
let pendingCommitWorkInProgress = null;
const ReactCurrentSchedulerHeap = [];

function push (node) {
  ReactCurrentSchedulerHeap.push(node);
  siftup(node, ReactCurrentSchedulerHeap.length);
}

function siftup (node , leaf) {
  while (leaf > 0) {
    // 父节点 索引 
    const index = (leaf - 1) >>> 2;
    const parent = ReactCurrentSchedulerHeap[index];

    // 与父节点比较
    if ((parent[SCHEDULE_KEY] - node[SCHEDULE_KEY]) >= 0) {
      // 交换位置
      ReactCurrentSchedulerHeap[index] = node;
      ReactCurrentSchedulerHeap[leaf] = parent;
      leaf = index;
    }
  }
}

function siftdown (node, first) {
  const length = heap.length;
  
  while (true) {
    const l = first * 2 + 1;
    const left = ReactCurrentSchedulerHeap[l];
    
    if (l > length) {
      break;
    }

    // 右边叶子索引 = 父节点索引 * 2 + 2 = 左边索引 + 1
    r = l + 1;
    right = ReactCurrentSchedulerHeap[r];

    // 选左右叶子索引
    const c = r < length && (right.due - left.due) < 0 ? r : l;
    const child = ReactCurrentSchedulerHeap[c];

    // 不用交换
    if ((child[SCHEDULE_KEY] - node[SCHEDULE_KEY]) < 0) {
      break;
    }

    // 交换节点
    ReactCurrentSchedulerHeap[c] = node;
    ReactCurrentSchedulerHeap[index] = child;
    index = c;
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

function flush (now) {
  let nextUnitOfWork = peek();

  while (nextUnitOfWork) {
    const isExpired = isRendering ? 
      false : nextUnitOfWork.due > now;

    if (isExpired && shouldYeild()) {
      break;
    }

    const schedule = nextUnitOfWork.schedule;
    schedule.schedule = null;

    schedule(isExpired);

    isExpired && workInProgress ?
      nextUnitOfWork.schedule = workLoop : pop()

    nextUnitOfWork = peek();
    now = performance.now();
  }
}

function flushWork () {
  ReactCurrentScheduler = flush;

  const next = () => {
    if (ReactCurrentScheduler) {
      const now = performance.now();
      scheduleDeadline = now + 1000 / SCHEDULE_FPS;
  
      ReactCurrentScheduler(now);

      peek() ?
        flushWork() : 
        ReactCurrentScheduler = null;
    }
  }

  isRendering ? 
    next() : nextTick(next);
}

function scheduleWork () {
  const begin = performance.now();
  const due = begin + SCHEDULE_TIMEOUT;

  const work = { schedule: workLoop, begin, due }

  push(work);
  flushWork();
}
  
function shouldYeild () {
  return isRendering ? false : performance.now() >= scheduleDeadline;
}

function workLoop (isExpired) {
  if (!workInProgress) {
    workInProgress = dequeueUpdateQueue();
  }

  while (workInProgress && (!shouldYeild() || !isExpired)) {
    workInProgress = performUnitOfWork(workInProgress);
  }

  if (pendingCommitWorkInProgress) {
    commitAllWork();
    pendingCommitWorkInProgress = null;
  }
}

function performUnitOfWork (workInProgress) {
  beginWork(workInProgress);

  workInProgress.status = NO_WORK;

  if (workInProgress.child) {
    return workInProgress.child;
  }

  let node = workInProgress;

  while (node) {
    completeWork(node);

    if (node.sibling) {
      return node.sibling;
    }

    node = node.return;
  }
}

function completeWork (workInProgress) {
  if (!workInProgress.return) {
    pendingCommitWorkInProgress = workInProgress;
  }
}


function beginWork (workInProgress) {
  const { tag } = workInProgress;

  switch (tag) {
    case HOST_ROOT: {
      return updateHostRoot(workInProgress);
    }

    case FUNCTION_COMPONENT: {
      return updateFunctionComponent(workInProgress);
    }

    case CLASS_COMPONENT: {
      return updateClassComponent(workInProgress);
    }

    case HOST_COMPONENT: {
      return updateHostComponent(workInProgress);
    }
  }
}

export function scheduleUpdate (fiber) {
  enqueueUpdateQueue(fiber);
  
  scheduleWork();
}

export function scheduleRootUpdate (fiber) {
  isRendering = true;

  scheduleUpdate(fiber);
}