import { Component, OnInit } from '@angular/core';
import {FollowerFollowingService} from '../follower-following.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  constructor(private ffService: FollowerFollowingService, private router: Router) { }

  private followings;
  ngOnInit() {
    this.ffService.getFollowings().subscribe(data => {
      console.log(data);
      this.followings = data;
    });
  }

  viewProfile(id) {
    this.router.navigate(['viewProfile', id]);
  }
}
