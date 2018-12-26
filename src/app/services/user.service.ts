import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import HttpRequest from '../interfaces/HttpRequest';
import User from '../classes/User';

@Injectable({
  providedIn: 'root'
})

class UserService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  loginUser(user): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/user/loginUser', user, {headers: this.headers});
  }

  registerUser(user): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/user/registerUser', user, {headers: this.headers});
  }
}

export default UserService;