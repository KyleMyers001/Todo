import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../classes/Task';
import HttpRequest from '../interfaces/HttpRequest';

@Injectable({
  providedIn: 'root'
})

class TaskService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  addTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/task/addTask', task, {headers: this.headers});
  }
  
  deleteTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/task/deleteTask', task, {headers: this.headers});
  }

  getTasks(listId: string, numTasksLoaded: number): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`http://localhost:5000/todo/task/getTasks?numTasksLoaded=${numTasksLoaded}&listId=${listId}`);
  }

  updateTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>('http://localhost:5000/todo/task/updateTask', task, {headers: this.headers});
  }
}

export default TaskService;