import {
  NO_WORK,
  PENDING_WORK
} from './shared';

const UpdaterQueue = [];

export function enqueueUpdateQueue (fiber) {
  if (fiber.status === NO_WORK) {
    fiber.status = PENDING_WORK;
    UpdaterQueue.push(fiber);
  }
}

export function dequeueUpdateQueue () {
  return UpdaterQueue.shift();
}

