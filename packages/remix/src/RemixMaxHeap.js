// leftIndex = parentIndex * 2 + 1
// rightIndex = parentIndex * 2 + 2;
// parentIndex = (rightIndex - 2) / 2;
// parentIndex = (leftIndex - 1) / 2
class RemixMaxHeap extends Array {
  siftUp () {
    let childIndex = this.length - 1;
    let parentIndex = childIndex >>> 1;

    while (true) {
      let child = this[childIndex];
      let parent = this[parentIndex];

      console.log('childIndex', childIndex, child);
      console.log('parentIndex', parentIndex, parent);

      if (childIndex === 0) {
        break;
      }

      // 如果 child > parent,  则交换
      if (this.gt(child, parent)) {
        this[childIndex] = parent;
        this[parentIndex] = child;

        childIndex = parentIndex;
        parentIndex = childIndex >>> 1;
      } else {
        break;
      }
    }
  }
  siftDown () {
    // 取最后一个元素，放到顶部
    const length = this.length;
    // 预处理，不处理 length = 1 ; length = 0 情况
    if (length == 2) {
      if (this.gt(this[1], this[0])) {
        const first = this[0];
        this[0] = this[1];
        this[1] = first;
      }
    } else if (length > 2) {
      const first = super.pop();
      this.unshift(first);

      let parentIndex = 0;
      

      while (true) {
        let leftIndex = 2 * parentIndex + 1;
        let childIndex = leftIndex;
        let parent = this[parentIndex];

        // 比较左右节点
        if (leftIndex + 1 < length) {
          if (!this.gt(this[leftIndex], this[leftIndex + 1])) {
            childIndex += 1;
          }
        }
        // 比较上下节点
        if (this.gt(this[childIndex], this[parentIndex])) {
          this[parentIndex] = this[childIndex];
          this[childIndex] = parent;

          parentIndex = childIndex;

          if (parentIndex === length - 1) {
            break;
          }
        } else {
          break;
        }
      }
    }
    
  }

  peek () {
    return this[0];
  }

  push (node) {
    super.push(node);

    if (this.length > 1) {
      this.siftUp();
    }

    console.log(this);
  }

  pop () {
    super.shift();
    this.siftDown();
  }

  gt (child, parent) {
    throw new Error(`Mustimplement this method`);
  }
}

// const heap = new RemixMaxHeap();

// heap.gt = function (child, parent) {
//   return child > parent;
// }

// heap.push(1);
// heap.push(4);
// heap.push(3);
// heap.push(5);

// console.log(heap);
// heap.pop();
// console.log(heap);

export default RemixMaxHeap;