import { Component, OnInit } from '@angular/core';
import {FollowerFollowingService} from '../follower-following.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  constructor(private ffService: FollowerFollowingService, private router: Router) { }

  private followers;
  ngOnInit() {
    this.ffService.getFollowers().subscribe(data => {
      console.log(data);
      this.followers = data;
    });
  }

  viewProfile(id) {
    this.router.navigate(['viewProfile', id]);
  }
}
