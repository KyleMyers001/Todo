import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class AjaxService {
  data: string;
  constructor() { }

  post(url, body) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    });
  }

  delete(url, body) {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    });
  }

  get(url) {
    return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      return myJson;
    });
  }
}

export default AjaxService;