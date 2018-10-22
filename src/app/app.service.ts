import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  data: string;
  constructor(private http: HttpClient) {}

  getToDoList(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/webapi/getTodoList');
  }
}

class Item {
  id: number;
  name: string;
}
