import AutoSaveItem from './AutoSaveItem';

class AutoSave {
  timeoutDuration: number;
  queue: AutoSaveItem[];
  constructor(timeoutDuration: number) {
    this.queue = new Array();
    this.timeoutDuration = timeoutDuration;
    window.addEventListener('beforeunload', this.executeAllItemsInQueue.bind(this));
  }
  
  executeAllItemsInQueue(): void {
    for(let item of this.queue) {
      item.function();
    }
  }

  isItemInQueue(element: HTMLElement): boolean {
    let inQueue = false;
    for(let item of this.queue) {
      if(item.element === element) {
        inQueue = true;
      }
    }
    return inQueue;
  }

  addItemToQueue(element: HTMLElement, callback: Function):void {
    if(!this.isItemInQueue(element)) {
      const timeout = setTimeout(() => {
        this.removeQueuedItem(element);
        callback();
      }, this.timeoutDuration);

      const autoSaveItem = new AutoSaveItem(element, callback, timeout);
      this.queue.push(autoSaveItem);
    } else {
      this.resetQueuedItem(element);
    }
  }

  removeQueuedItem(element): void {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].element === element) {
        this.queue.splice(i, 1);
        return;
      }
    }
  }

  resetQueuedItem(element: HTMLElement) {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].element === element) {
        const timeout = this.queue[i];
        clearTimeout(timeout.timeout);
        this.queue.splice(i, 1);
        this.addItemToQueue(timeout.element, timeout.function);
        return;
      }
    }
  }
}

export default AutoSave;