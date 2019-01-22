class AutoSaveItem {
  element: HTMLElement;
  function: Function;
  timeout: any
  constructor(element: HTMLElement, func: Function, timeout: any) {
    this.element = element;
    this.function = func;
    this.timeout = timeout;
  }
}

export default AutoSaveItem;