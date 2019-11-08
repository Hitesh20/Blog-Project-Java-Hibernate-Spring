import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class FollowerFollowingService {
  constructor(private http: HttpClient ) {}
  private url = 'http://localhost:2019';

  checkIfCurrentUserIsFollower(userId) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/checkIsFollowing/' + userId, {headers});
  }

  followThisUser(userId) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/followUser/' + userId, {headers});
  }

  unfollowThisUser(userId) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/unfollowUser/' + userId, {headers});
  }

  getFollowers() {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/getFollowers', {headers});
  }

  getFollowings() {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/getFollowings', {headers});
  }
}
