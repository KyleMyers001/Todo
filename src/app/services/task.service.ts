import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../classes/Task';
import HttpRequest from '../interfaces/HttpRequest';
import SiteConfiguration from '../classes/SiteConfiguration';

@Injectable({
  providedIn: 'root'
})

class TaskService {
  headers: HttpHeaders;
  siteConfiguration: SiteConfiguration;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.siteConfiguration = new SiteConfiguration(true);
  }

  addTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/task/addTask`, task, {headers: this.headers});
  }
  
  deleteTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/task/deleteTask`, task, {headers: this.headers});
  }

  getTasks(listId: string, numTasksLoaded: number): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`${this.siteConfiguration.apiURL}/task/getTasks?numTasksLoaded=${numTasksLoaded}&listId=${listId}`);
  }

  updateTask(task: Task): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/task/updateTask`, task, {headers: this.headers});
  }
}

export default TaskService;