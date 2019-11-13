import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient ) {}
  private url = 'http://localhost:2019';

  addUserToGroup(id) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/xyx', {headers});
  }
}
