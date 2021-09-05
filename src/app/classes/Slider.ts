class Slider {
  container: HTMLElement;
  duration: number;
  element: HTMLElement;
  hasSlided: boolean;
  startTime: number;
  x: number;
  width: number;
  constructor(container: HTMLElement, duration: number, element: HTMLElement) {
    this.container = container;
    this.duration = duration;
    this.element = element;
    this.width = this.container.clientWidth;
    this.bindEvents();
  }

  bindEvents(): void {
    window.addEventListener('resize', this.handleWindowResizing.bind(this));
  }

  handleWindowResizing(): void {
    this.width = this.container.clientWidth;
    this.update();
  }

  slideIn(callback: Function): void {
    this.hasSlided = true;
    this.animate(callback);
  }

  slideOut(callback: Function): void {
    this.hasSlided = false;
    this.animate(callback);
  }

  animate(callback: Function): void {
    this.startTime = window.performance.now();
    requestAnimationFrame(this.renderFrame.bind(this, callback));
  }

  renderFrame(callback: Function): void {
    const timeFraction = this.getTimeFraction();
    this.update(timeFraction);
    if (timeFraction < 1) {
      requestAnimationFrame(this.renderFrame.bind(this, callback));
    } else {
      this.completeCallback(callback);
    }
  }

  getTimeFraction(): number {
    const time = window.performance.now();
    let timeFraction = (time - this.startTime) / this.duration;
    if (timeFraction > 1) timeFraction = 1;
    return timeFraction;
  }

  update(timeFraction:number = 1): void {
    const moved = this.width * timeFraction;
    if (this.hasSlided) {
      this.x = moved - this.width;
    } else {
      this.x = -moved;
    }
    this.element.style.transform = `translateX(${this.x}px)`;
  }

  completeCallback(callback: Function): void {
    if (callback !== null) {
      callback();
    }
  }
}

export default Slider;