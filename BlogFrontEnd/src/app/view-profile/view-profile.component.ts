import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';
import {BlogService} from '../blog.service';
import {FollowerFollowingService} from '../follower-following.service';
import {Blog} from '../Blog';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  private userId;
  private viewUser;
  private viewBlogs;
  private isFollowing = false;
  private user;
  private role;
  constructor(private route: ActivatedRoute, private registrationService: RegistrationService,
              private blogService: BlogService, private ffService: FollowerFollowingService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('userId'));
      this.userId = id;
    });
    this.registrationService.viewUser(this.userId).subscribe(data => this.viewUser = data);
    this.blogService.viewPost(this.userId).subscribe(data => this.viewBlogs = data);
    this.ffService.checkIfCurrentUserIsFollower(this.userId).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data === 'true') {
        this.isFollowing = true;
      }
      console.log(data);
    });
    this.registrationService.getUser().subscribe( data => {
      this.user = data;
      this.role = this.user.role;
    });
  }

  followUser() {
    this.ffService.followThisUser(this.userId).subscribe(data => {
      this.isFollowing = true;
    });
  }

  unfollowUser() {
    this.ffService.unfollowThisUser(this.userId).subscribe(data => {
      this.isFollowing = false;
    });
  }

  deleteBlog(id) {
    this.blogService.deleteParticularBlog(id).subscribe(data => {
      alert('Blog deleted successfully.');
      this.router.navigate(['feed']);
    });
  }

  editBlog(id) {
    this.router.navigate(['editPost', id]);
  }
}
