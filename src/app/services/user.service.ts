import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import HttpRequest from '../interfaces/HttpRequest';
import User from '../classes/User';
import Cookie from '../classes/Cookie';
import Session from '../classes/Session';
import SiteConfiguration from '../classes/SiteConfiguration';

@Injectable({
  providedIn: 'root'
})

class UserService {
  headers: HttpHeaders;
  siteConfiguration: SiteConfiguration;
  userCookie: Cookie;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.siteConfiguration = new SiteConfiguration();
  }

  getSessionFromCookie(): Session {
    const cookieData = Cookie.getCookie('session');
    if(cookieData === '') {
      return null;
    }
    return <Session>JSON.parse(cookieData);
  }

  getUserInformation(session: Session): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`${this.siteConfiguration.apiURL}/user/getUserInformation?userId=${session.userId}`);
  }
  
  loginUser(user: User): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/user/loginUser`, user, {headers: this.headers});
  }

  registerUser(user: User): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/user/registerUser`, user, {headers: this.headers});
  }

  resetPassword(data: any) {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/user/resetPassword`, data, {headers: this.headers});
  }

  sendForgotPasswordEmail(email: string): Observable<HttpRequest> {
    const data = {
      email: email
    }
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/user/sendForgotPasswordEmail`, data, {headers: this.headers});
  }

  setAuthenticationCookie(session: Session): void {
    this.userCookie = new Cookie('session', JSON.stringify(session), 30);
  }

  updateUser(user: User): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/user/updateUser`, user, {headers: this.headers});
  }
}

export default UserService;