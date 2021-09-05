class Fade {
  duration: number;
  element: HTMLElement;
  isFading: boolean;
  opacity: number;
  startTime: number;
  constructor(element: HTMLElement, duration: number) {
    this.duration = duration;
    this.element = element;
  }

  getOpacityOfElement(): number {
    return Number(window.getComputedStyle(this.element, null).getPropertyValue('opacity'));
  }

  fadeIn(callback: Function): void {
    this.isFading = false;
    this.animate(callback);
  }

  fadeOut(callback: Function): void {
    this.isFading = true;
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
    if (this.isFading) {
      this.opacity = 1 - timeFraction;
    } else {
      this.opacity = timeFraction;
    }
    this.element.style.opacity = this.opacity.toString();
  }

  completeCallback(callback: Function): void {
    if (callback !== null) {
      callback();
    }
  }
}

export default Fade;