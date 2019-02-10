import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import List from '../classes/List';
import HttpRequest from '../interfaces/HttpRequest';
import SiteConfiguration from '../classes/SiteConfiguration';

@Injectable({
  providedIn: 'root'
})

class ListService {
  headers: HttpHeaders;
  siteConfiguration: SiteConfiguration;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.siteConfiguration = new SiteConfiguration(true);
  }

  addList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/list/addList`, list, {headers: this.headers});
  }

  deleteList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/list/deleteList`, list, {headers: this.headers});
  }

  getLists(userId: string): Observable<HttpRequest> {
    return this.http.get<HttpRequest>(`${this.siteConfiguration.apiURL}/list/getLists?userId=${userId}`);
  }

  updateList(list: List): Observable<HttpRequest> {
    return this.http.post<HttpRequest>(`${this.siteConfiguration.apiURL}/list/updateList`, list, {headers: this.headers});
  }
}

export default ListService;