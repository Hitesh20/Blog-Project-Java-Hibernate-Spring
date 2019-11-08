import { Component, OnInit } from '@angular/core';
import {FollowerFollowingService} from '../follower-following.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  constructor(private ffService: FollowerFollowingService) { }

  private followers;
  ngOnInit() {
    this.ffService.getFollowers().subscribe(data => this.followers = data);
  }

}
