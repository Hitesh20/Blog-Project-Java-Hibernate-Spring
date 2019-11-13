import { Component, OnInit } from '@angular/core';
import {Blog} from '../Blog';
import {BlogService} from '../blog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';
import {FollowerFollowingService} from '../follower-following.service';
import {User} from '../User';
import {CommentService} from '../comment.service';
import {UserComment} from '../UserComment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})


export class FeedComponent implements OnInit {
  // tslint:disable-next-line:new-parens
  private userComment: UserComment = new class implements UserComment {
    id: number;
    user: User;
    blog: Blog;
    comment: string;
    date: Date;
  };
  constructor(private blogService: BlogService, private router: Router,
              private route: ActivatedRoute, private loginService: AuthenticationService,
              private registrationService: RegistrationService, private ffService: FollowerFollowingService,
              private commentService: CommentService) { }
  private searchedUsers;
  private followings;

  private blogs;
  private role;
  private user;
  private currentUser;
  private searchedItem: string;

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => this.blogs = data);
    this.registrationService.getUser().subscribe( data => {
      this.user = data;
      this.role = this.user.role;
    });
    this.currentUser = sessionStorage.getItem('username');
    this.ffService.getFollowings().subscribe(data => {
      console.log(data);
      this.followings = data;
    });
  }

  deleteBlog(id) {
    this.blogService.deleteParticularBlog(id).subscribe(data => {
      this.blogs = data;
      alert('Blog deleted successfully.');
    });
  }

  editBlog(id) {
    this.router.navigate(['editPost', id]);
  }

  makePrivate(id) {
    this.blogService.makeBlogPrivate(id).subscribe(data => {
      this.blogs = data;
      alert('Blog made private.');
    });
  }

  searchOnClick() {
    this.searchedUsers = null;
    // tslint:disable-next-line:triple-equals
    if (this.searchedItem != undefined && this.searchedItem != '') {
      this.registrationService.findUser(this.searchedItem).subscribe(data => {
        this.searchedUsers = data;
      });
    } else {
      this.searchedUsers = null;
    }
  }

  viewProfile(id) {
    this.router.navigate(['viewProfile', id]);
  }

  seeFollowers() {
    this.router.navigate(['connections/followers']);
  }

  seeFollowing() {
    this.router.navigate(['connections/following']);
  }

  checkFollowing(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.followings.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (id == this.followings[i].following.userId) {
        return true;
      }
    }
    return false;
  }


  postComment(commentt, blog) {
    console.log(commentt);
    // tslint:disable-next-line:triple-equals
    if (commentt != null && commentt != '') {
      this.userComment.comment = commentt;
      this.userComment.date = new Date();
      this.userComment.blog = blog;
      console.log(this.userComment);
      this.commentService.addComment(this.userComment).subscribe(data => {
        alert('New Comment Added Successfully');
        this.router.navigate(['viewPost', blog.postId]);
      });
    } else {
      alert('Please add a valid comment.');
    }

  }

  viewPost(postId) {
    this.router.navigate(['viewPost', postId]);
  }

  selectFollowers() {
    this.router.navigate(['selectFollowers']);
  }
}
