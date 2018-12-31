import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import HttpRequest from '../interfaces/HttpRequest';
import User from '../classes/User';
import Cookie from '../classes/Cookie';

@Injectable({
  providedIn: 'root'
})

class UserService {
  headers: HttpHeaders;
  userCookie: Cookie;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  loginUser(user: User): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/user/loginUser', user, {headers: this.headers});
  }

  registerUser(user: User): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/user/registerUser', user, {headers: this.headers});
  }

  resetPassword(data: any) {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/user/resetPassword', data, {headers: this.headers});
  }

  sendForgotPasswordEmail(email: string): Observable<HttpRequest> {
    const data = {
      email: email
    }
    return this.http.post<HttpRequest>('http://localhost:5000/todo/user/sendForgotPasswordEmail', data, {headers: this.headers});
  }

  getUserFromCookie(): User {
    var name = 'user' + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return null;
  }

  setUserCookie(user: User): void {
    const userData = JSON.stringify(user);
    this.userCookie = new Cookie('user', userData, 30);
  }
}

export default UserService;