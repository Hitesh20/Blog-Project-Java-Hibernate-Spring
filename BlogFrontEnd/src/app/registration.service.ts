import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient ) {}
  private url = 'http://localhost:2019';

  public createUser(user) {
    return this.http.post(this.url + '/addUsers', user);
  }

  public getUser() {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<User>(this.url + '/callUser', {headers});
  }

  public viewUser(id) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get<User>(this.url + '/viewUser/' + id, {headers});
  }

  editMyUser(user) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post<User>(this.url + '/editUser' , user, {headers});
  }

  findUser(searchedItem) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/searchUser/' + searchedItem, {headers});
  }
}
