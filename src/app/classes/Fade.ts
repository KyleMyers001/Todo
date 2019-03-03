class Fade {
  duration: number;
  element: HTMLElement;
  framesPerSecond: number;
  frames: number;
  opacity: number;
  constructor(element: HTMLElement, duration: number, initialOpacity: number) {
    this.duration = duration;
    this.element = element;
    this.framesPerSecond = 60;
    this.frames = Math.floor(this.duration / this.framesPerSecond);
    this.opacity = initialOpacity;
    this.update();
  }
  
  getOpacityOfElement(): number {
    return Number(window.getComputedStyle(this.element, null).getPropertyValue('opacity'));
  }

  fadeIn(callback: Function): void {
    this.opacity = this.getOpacityOfElement();
    this.animate(this.opacity, 1, callback);
  }

  fadeOut(callback: Function): void {
    this.opacity = this.getOpacityOfElement();
    this.animate(this.opacity, 0, callback);
  }

  renderFrame(increment: number, frames: number, callback: Function): void {
    this.opacity += increment;
    this.update();
    frames = frames - 1;
    if (frames > 0) {
      requestAnimationFrame(this.renderFrame.bind(this, increment, frames, callback));
    } else if (callback !== null) {
      callback();
    }
  }

  animate (from: number, to: number, callback: Function): void {
    const increment = (to - from) / this.frames;
    requestAnimationFrame(this.renderFrame.bind(this, increment, this.frames, callback));
  }

  update(): void {
    this.element.style.opacity = this.opacity.toString();
  }
}

export default Fade;