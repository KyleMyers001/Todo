import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Item from '../classes/Item';
import List from '../classes/List';
import HttpRequest from '../interfaces/HttpRequest';

@Injectable({
  providedIn: 'root'
})

class TodoService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  addItem(item: Item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/item/addItem', item, {headers: this.headers});
  }
  
  addList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/addList', list, {headers: this.headers});
  }

  deleteItem(item: Item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/item/deleteItem', item, {headers: this.headers});
  }

  deleteList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/deleteList', list, {headers: this.headers});
  }

  getLists(userId: string): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/list/getLists?userId=${userId}`);
  }

  getItems(listId: string, numItemsLoaded: number): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/item/getItems?numItemsLoaded=${numItemsLoaded}&listId=${listId}`);
  }

  updateItem(item: Item): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/item/updateItem', item, {headers: this.headers});
  }

  updateList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/list/updateList', list, {headers: this.headers});
  }

}

export default TodoService;