import { Component, OnInit } from '@angular/core';
import {FollowerFollowingService} from '../follower-following.service';
import {Router} from '@angular/router';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-select-followers',
  templateUrl: './select-followers.component.html',
  styleUrls: ['./select-followers.component.scss']
})
export class SelectFollowersComponent implements OnInit {

  constructor(private ffService: FollowerFollowingService, private router: Router, private groupService: GroupService) { }
  private followers;
  private addedUsers = [];
  ngOnInit() {
    this.ffService.getFollowers().subscribe(data => {
      console.log(data);
      this.followers = data;
    });
  }

  selectProfile(id) {
    this.addedUsers.push(id);
    /*this.groupService.addUserToGroup(id).subscribe(data => {
      alert('User added successfully');
    });*/
    alert('User added successfully');
    console.log(this.addedUsers);
    if (this.addedUsers.indexOf(id) != null) {
      console.log(true);
      console.log(this.addedUsers.indexOf(id));
    } else {
      console.log(false);
    }
  }

  removeProfile(id) {
    // this.addedUsers.indexOf(id);
    /*if (this.addedUsers.indexOf(id) != null) {
      this.groupService.addUserToGroup(id).subscribe(data => {
        alert('User removed successfully');
      });
    }*/
    const index = this.addedUsers.indexOf(id);
    this.addedUsers.splice(index, 1);
    alert('User removed successfully');
    console.log(this.addedUsers);
  }

  checkUser(userId) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.addedUsers.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.addedUsers[i] == userId) {
        return true;
      }
    }
    return false;
  }
}
