class SiteConfiguration {
  apiURL: string;
  constructor() {
    if(!this.isDev()) {
      this.apiURL = 'https://kylemyersapi.net/todo';
    } else {
      this.apiURL = 'http://localhost:5000/todo';
    }
  }


  isDev() {
    var url = window.location.href;
    return url.includes('localhost');
  }

  static elementIsHidden(element): boolean {
    const isDisplayNone = window.getComputedStyle(element, null).getPropertyValue('display') === 'none';
    return isDisplayNone;
  }

  static isDesktop(): boolean {
    const desktopVerifier = <HTMLElement>document.querySelector('#desktopVerifier');
    const isDesktopDisplay = this.elementIsHidden(desktopVerifier);
    return isDesktopDisplay;
  }

  static isMobile(): boolean {
    const mobileVerifier = <HTMLElement>document.querySelector('#mobileVerifier');
    const isMobileDisplay = this.elementIsHidden(mobileVerifier);
    return isMobileDisplay;
  }

  static isTabletPortrait(): boolean {
    const tabletPortraitVerifier = <HTMLElement>document.querySelector('#tabletPortraitVerifier');
    const isTabletPortraitDisplay = this.elementIsHidden(tabletPortraitVerifier);
    return isTabletPortraitDisplay;
  }
}

export default SiteConfiguration;