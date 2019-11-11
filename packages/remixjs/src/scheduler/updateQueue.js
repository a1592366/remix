import { UPDATE_STATE, REPLACE_STATE, FORCE_UPDATE } from '../shared/updateTags';
import { CALLBACK } from '../shared/effectTags';

let hasForceUpdate = false;

export function resetHasForceUpdateBeforeProcessing () {
  hasForceUpdate = false;
}

export function checkHasForceUpdateAfterProcessing () {
	return hasForceUpdate;
}

// 创建 update 
export function createUpdate() {
	return {
		tag: UPDATE_STATE,
		payload: null,
		callback: null,
		next: null,
		nextEffect: null,
	};
}

export function processUpdateQueue(
	workInProgress,
	queue,
	props,
	instance
) {
	hasForceUpdate = false;
	
	// 克隆新的 updateQueue
	queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);
	
	// 这里state 还是原本的 state
	let newBaseState = queue.baseState;
	let newFirstUpdate = null;

	let update = queue.firstUpdate;
	let resultState = newBaseState;

	while (update !== null) {
		resultState = getStateFromUpdate(
			workInProgress,
			queue,
			update,
			resultState,
			props,
			instance,
		);
		
		const callback = update.callback;

		if (callback !== null) {
			workInProgress.effectTag |= CALLBACK;

			// 暂时不知道update nextEffect 这个设置干嘛用
			update.nextEffect = null;

			if (queue.lastEffect === null) {
				// 没有 lastEffect 情况
				queue.firstEffect = queue.lastEffect = update;
			} else {
				queue.lastEffect.nextEffect = update;
				queue.lastEffect = update;
			}
		}

		// 处理下一个 update
		update = update.next;
	}
	
	// 处理完 updateQueue update 链表，设置l astUpdate 为 null
	queue.firstUpdate = null;
	queue.lastUpdate = null;

	queue.baseState = newBaseState; // 原本 state

	// 保存最近计算得出的 state
	workInProgress.memoizedState = resultState;
}

export function enqueueUpdate(fiber, update) {
	const alternate = fiber.alternate;
	
	let firstQueue;
	let secondQueue;
	if (alternate === null) {
		// 首次渲染情况，判断有没有updateQueue，没有则新建updateQueue。
		firstQueue = fiber.updateQueue;
		secondQueue = null;
		if (firstQueue === null) {
			fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
			firstQueue = fiber.updateQueue;
		}
	} else {
		
		firstQueue = fiber.updateQueue;
		secondQueue = alternate.updateQueue;
		// commit work的时候 将fiber上的updateQueue置为null
		if (firstQueue === null) {
			if (secondQueue === null) {
				firstQueue = fiber.updateQueue = createUpdateQueue(
					fiber.memoizedState,
				);
				secondQueue = alternate.updateQueue = createUpdateQueue(
					alternate.memoizedState,
				);
			} else {
				// 在什么情况下 q2 存在 q1不存在？ 当更新未被合并到current？
				firstQueue = fiber.updateQueue = cloneUpdateQueue(secondQueue);
			}
		} else {
			if (secondQueue === null) {
				secondQueue = alternate.updateQueue = cloneUpdateQueue(firstQueue);
			} else {
				// current，alternate 都存在 updateQueue
			}
		}
	}

	// 创建完更新队列之后 向队列中添加update
	if (secondQueue === null || firstQueue === secondQueue) {
		appendUpdateToQueue(firstQueue, update);
	} else {
		// 有两条更新队列，我们需要把更新添加到这两条上， 我们不希望将相同的更新被添加多次
		if (firstQueue.lastUpdate === null || secondQueue.lastUpdate === null) {
			appendUpdateToQueue(firstQueue, update);
			appendUpdateToQueue(secondQueue, update);
		} else {
			// 两个链表都不为空 因为结构的共享所以他们最后的更新时相同的 所以引用只需要改一次 在手动将另一条的lastUpdate设置为update
			appendUpdateToQueue(firstQueue, update);
			secondQueue.lastUpdate = update;
		}
	}
}

function getStateFromUpdate(
	workInProgress,
	queue,
	update,
	prevState, // resultState
	nextProps, // props
	instance,
) {
	switch (update.tag) {
		case REPLACE_STATE: {
			const payload = update.payload;
			// 处理 this.setState((state, props) => {}) 情况
			if (typeof payload === 'function') {
				return payload.call(instance, prevState, nextProps);
			}
			
			// REPLACE_STATE 直接返回
			return payload;
		}
		
		case UPDATE_STATE: {
			const payload = update.payload;
			let partialState;

			// 处理 this.setState((state, props) => {}) 情况
			if (typeof payload === 'function') {
				partialState = payload.call(instance, prevState, nextProps);
			} else {
				partialState = payload;
			}

			// 没有任何更新
			if (partialState === null || partialState === undefined) {
				return prevState;
			}

			// 合并 state
			return {
				...prevState, 
				...partialState
			}
		}

		case FORCE_UPDATE: {
			hasForceUpdate = true;
			return prevState;
		}
	}

	return prevState;
}

// 创建updateQueue 单向链表
function createUpdateQueue(baseState) {
	return {
		baseState,
		firstUpdate: null,
		lastUpdate: null,
		firstEffect: null,
		lastEffect: null,
	};
}


function appendUpdateToQueue(queue, update) {
	const lastUpdate = queue.lastUpdate;
	// 如果lastUpdate 不存在，那么说明还没有update对象
	// 反之在原有的最后的update对象设置next，并将lastUpdate更新
	if (lastUpdate === null) {
		queue.firstUpdate = queue.lastUpdate = update;
	} else {
		queue.lastUpdate.next = update;
		queue.lastUpdate = update;
	}
}

function cloneUpdateQueue(queue) {
	 return {
		baseState: queue.baseState,
		firstUpdate: queue.firstUpdate,
		lastUpdate: queue.lastUpdate,

		firstEffect: null,
		lastEffect: null,
	};
}

function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
	const current = workInProgress.alternate;

	// 判断workInProgress updateQueue 是否是同一个updateQueue对象，是则克隆
	if (current !== null) {
		if (queue === current.updateQueue) {
			queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
		}
	}

	return queue;
}
