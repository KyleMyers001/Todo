import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Item from '../classes/Item';

@Injectable({
  providedIn: 'root'
})

class TodoService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  }

  getTodoList(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/webapi/getTodoList');
  }

  deleteTodoItem(item): Observable<Item[]> {
    const body = `id=${item.id}`;
    return this.http.post<Item[]>('http://localhost:3000/webapi/deleteTodoItem', body, {headers: this.headers});
  }

  updateTodoItem(item): Observable<Item[]> {
    const body = `id=${item.id}&name=${item.name}`;
    return this.http.post<Item[]>('http://localhost:3000/webapi/updateTodoItem', body, {headers: this.headers});
  }

  addTodoItem(item): Observable<Item> {
    const body = `name=${item.name}`;
    return this.http.post<Item>('http://localhost:3000/webapi/addTodoItem', body, {headers: this.headers});
  }
}

export default TodoService;