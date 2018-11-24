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
    // this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getTodoList(): Observable<HttpRequest> {
    return this.http.get<HttpRequest>('http://localhost:3000/todo/getItems');
  }

  deleteTodoItem(item): Observable<HttpRequest> {
    // const body = `id=${item.id}`;
    // return this.http.post<Item[]>('http://localhost:3000/todo/deleteItem', body, {headers: this.headers});
    return this.http.post<HttpRequest>('http://localhost:3000/todo/deleteItem', item, {headers: this.headers});
  }

  updateTodoItem(item): Observable<HttpRequest> {
    // const body = `id=${item.id}&name=${item.name}`;
    // return this.http.post<Item[]>('http://localhost:3000/todo/updateItem', body, {headers: this.headers});
    return this.http.post<HttpRequest>('http://localhost:3000/todo/updateItem', item, {headers: this.headers});
  }

  addTodoItem(item): Observable<HttpRequest> {
    // const body = `name=${item.name}`;
    // return this.http.post<Item>('http://localhost:3000/todo/addItem', body, {headers: this.headers});
    return this.http.post<HttpRequest>('http://localhost:3000/todo/addItem', item, {headers: this.headers});
  }
}

export default TodoService;