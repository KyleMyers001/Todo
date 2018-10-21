import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  data: string;
  getToDoList() {
    return [
      {
        id: 1,
        name: 'Take out trash'
      },
      {
        id: 2,
        name: 'Go to movies'
      }
    ]
  }
}
