class Cookie {
  name: string;
  data: string;
  expirationDays: number;
  constructor(name, data, expirationDays) {
    this.name = name;
    this.data = data;
    this.expirationDays = expirationDays;
    this.setCookie();
  }

  static getCookie(name): string {
    name = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  public setCookie(): void {
    const date = new Date();
    date.setTime(date.getTime() + (this.expirationDays*24*60*60*1000));
    const expires = 'expires='+ date.toUTCString();
    document.cookie = this.name + '=' + this.data + ';' + expires + ';path=/';
  }
}

export default Cookie;