import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import List from '../classes/List';
import HttpRequest from '../interfaces/HttpRequest';

@Injectable({
  providedIn: 'root'
})

class ListService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  addList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/addList', list, {headers: this.headers});
  }

  deleteList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/deleteList', list, {headers: this.headers});
  }

  getLists(userId: string): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/list/getLists?userId=${userId}`);
  }

  updateList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/updateList', list, {headers: this.headers});
  }
}

export default ListService;