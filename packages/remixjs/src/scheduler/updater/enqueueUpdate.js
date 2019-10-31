import { isNullOrUndefined } from '../../shared/is';
import createUpdateQueue from './createUpdateQueue';
import appendUpdateToQueue from './appendUpdateToQueue';

export default function enqueueUpdate (
  fiber, 
  update
) {
  const alternate = fiber.alternate;

  let firstQueue;
  let secondQueue;

  // 判断是否第一次渲染
  if (isNullOrUndefined(alternate)) {
    firstQueue = fiber.updateQueue;
    secondQueue = null;

    // 如果没有updateQueue，即创建 updateQueue
    if (isNullOrUndefined(firstQueue)) {
      firstQueue = createUpdateQueue(fiber.memoizedState);
      fiber.updateQueue = firstQueue;
    }
  } else {
    // 不是第一次渲染，分别读取 fiber 的 updateQueue
    firstQueue = fiber.updateQueue;
    secondQueue = alternate.updateQueue;
  }

  if (
    // 如果 alternate updateQueue 为 null / 两者是用一个 updateQueue
    isNullOrUndefined(secondQueue) || 
    firstQueue === secondQueue
  ) {
    appendUpdateToQueue(firstQueue, update);
  } else {
    if (
      
      isNullOrUndefined(firstQueue.lastUpdate) || 
      isNullOrUndefined(secondQueue.lastUpdate)
    ) {
      appendUpdateToQueue(firstQueue, update);
      appendUpdateToQueue(secondQueue, update);
    } else {
      appendUpdateToQueue(firstQueue, update);
      secondQueue.lastUpdate = update;
    }
  }
}