import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import HttpRequest from '../interfaces/HttpRequest';
import User from '../classes/User';
import Cookie from '../classes/Cookie';
import Session from '../classes/Session';

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

  getUserInformation(session: Session): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/user/getUserInformation?userId=${session.userId}`);
  }

  getSessionFromCookie(): Session {
    const cookieData = Cookie.getCookie('session');
    if(cookieData === '') {
      return null;
    }
    return <Session>JSON.parse(cookieData);
  }

  setAuthenticationCookie(session: Session): void {
    this.userCookie = new Cookie('session', JSON.stringify(session), 30);
  }
}

export default UserService;