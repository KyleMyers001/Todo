class SiteConfiguration {
  apiURL: string;
  constructor(isDev: boolean) {
    this.apiURL = 'http://localhost:5000/todo';
    // if(!isDev) {
    //   this.apiURL = 'https://kylemyersapi.net/todo';
    // } else {
    //   this.apiURL = 'http://localhost:5000/todo';
    // }
  }
}

export default SiteConfiguration;