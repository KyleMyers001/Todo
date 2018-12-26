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

  setCookie() {
    const date = new Date();
    date.setTime(date.getTime() + (this.expirationDays*24*60*60*1000));
    const expires = "expires="+ date.toUTCString();
    document.cookie = this.name + "=" + this.data + ";" + expires + ";path=/";
  }
}

export default Cookie;