import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Item from '../classes/Item';
import HttpRequest from '../interfaces/HttpRequest';

@Injectable({
  providedIn: 'root'
})

class TodoService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  // getTodoList(numItemsLoaded): Observable<HttpRequest> {
  //   return this.http.get<HttpRequest>(`http://157.230.8.20:5000/todo/getItems?numItemsLoaded=${numItemsLoaded}`);
  // }

  // deleteTodoItem(item): Observable<HttpRequest> {
  //   return this.http.post<HttpRequest>('http://157.230.8.20:5000/todo/deleteItem', item, {headers: this.headers});
  // }

  // updateTodoItem(item): Observable<HttpRequest> {
  //   return this.http.post<HttpRequest>('http://157.230.8.20:5000/todo/updateItem', item, {headers: this.headers});
  // }

  // addTodoItem(item): Observable<HttpRequest> {
  //   return this.http.post<HttpRequest>('http://157.230.8.20:5000/todo/addItem', item, {headers: this.headers});
  // }

  getTodoList(numItemsLoaded): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/getItems?numItemsLoaded=${numItemsLoaded}`);
  }

  deleteTodoItem(item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/deleteItem', item, {headers: this.headers});
  }

  updateTodoItem(item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/updateItem', item, {headers: this.headers});
  }

  addTodoItem(item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/addItem', item, {headers: this.headers});
  }
}

export default TodoService;