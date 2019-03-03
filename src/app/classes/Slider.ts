class Slider {
  container: HTMLElement;
  duration: number;
  element: HTMLElement;
  endX: number;
  hasSlided: boolean;
  isAnimationEnabled: boolean;
  framesPerSecond: number;
  frames: number;
  startX: number;
  x: number;
  constructor(container: HTMLElement, duration: number, element: HTMLElement) {
    this.container = container;
    this.duration = duration;
    this.element = element;
    this.framesPerSecond = 60;
    this.frames = Math.floor(this.duration / this.framesPerSecond);
    this.isAnimationEnabled = true;
    this.x = 0;
    this.calculateStartAndEndX();
    this.bindEvents();
  }

  calculateStartAndEndX(): void {
    this.startX = -this.container.clientWidth;
    this.endX = 0;
  }

  bindEvents(): void {
    window.addEventListener('resize', this.handleWindowResizing.bind(this));
  }

  handleWindowResizing(): void {
    this.calculateStartAndEndX();
    this.disableAnimation();
    if(this.hasSlided) {
      this.x = this.endX;
      this.update();
    } else {
      this.x = this.startX;
      this.update();
    }
  }

  disableAnimation(): void {
    this.isAnimationEnabled = false;
  }

  enableAnimation(): void {
    this.isAnimationEnabled = true;
  }

  slideIn(callback: Function): void {
    this.x = this.startX;
    this.hasSlided = true;
    this.enableAnimation();
    this.animate(this.x, this.endX, callback);
  }

  slideOut(callback: Function): void {
    this.hasSlided = false;
    this.enableAnimation();
    this.animate(this.x, this.startX, callback);
  }

  completeCallback(callback: Function): void {
    if(callback !== null) {
      callback();
    }
  }

  renderFrame(increment: number, frames: number, callback: Function): void {
    if(!this.isAnimationEnabled) {
      this.completeCallback(callback);
      return;
    }
    this.x += increment;
    this.update();
    frames = frames - 1;
    if (frames > 0) {
      requestAnimationFrame(this.renderFrame.bind(this, increment, frames, callback));
    } else {
      this.completeCallback(callback);
    }
  }

  animate (from: number, to: number, callback: Function): void {
    const increment = (to - from) / this.frames;
    requestAnimationFrame(this.renderFrame.bind(this, increment, this.frames, callback));
  }

  update(): void {
    this.element.style.transform = `translateX(${this.x}px)`
  }
}

export default Slider;