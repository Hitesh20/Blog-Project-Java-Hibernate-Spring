import { Component, OnInit } from '@angular/core';
import {FollowerFollowingService} from '../follower-following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  constructor(private ffService: FollowerFollowingService) { }

  private followings;
  ngOnInit() {
    this.ffService.getFollowings().subscribe(data => this.followings = data);
  }

}
