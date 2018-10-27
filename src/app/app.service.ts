import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AjaxService } from './ajax.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  data: string;
  constructor(private http: HttpClient, private ajaxService: AjaxService) { }

  getTodoList(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/webapi/getTodoList');
  }

  deleteTodoItem(item): void {
    var body = `id=${item.id}`;
    this.ajaxService.delete('http://localhost:3000/webapi/deleteTodoItem', body);
  }

  updateTodoItem(item): void {
    var body = `id=${item.id}&name=${item.name}`;
    this.ajaxService.post('http://localhost:3000/webapi/updateTodoItem', body);
  }

  addTodoItem(item): void {
    var body = `name=${item.name}`;
    this.ajaxService.post('http://localhost:3000/webapi/addTodoItem', body);
  }
}

class Item {
  id: number;
  name: string;
}
