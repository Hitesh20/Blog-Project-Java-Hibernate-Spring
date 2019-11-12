import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';
import {FollowerFollowingService} from '../follower-following.service';
import {CommentService} from '../comment.service';
import {User} from '../User';
import {UserComment} from '../UserComment';
import {Blog} from '../Blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
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

  private blogId;
  private blog;
  private searchedUsers;
  private searchedItem: string;
  private user;
  private role;
  private currentUsername;
  private followings;
  private uId;
  private viewUser;
  private viewBlogs;
  private isFollowing = false;
  private allComments;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('id'));
      this.blogId = id;
    });
    this.blogService.getThisBlog(this.blogId).subscribe(data => {
      this.blog = data;
    });
    this.registrationService.getUser().subscribe(data => {
      this.user = data;
      this.role = this.user.role;
    });
    this.currentUsername = sessionStorage.getItem('username');
    this.registrationService.viewUser(this.blogId).subscribe(data => {
      this.viewUser = data;
    });
    this.commentService.getAllComments(this.blogId).subscribe(data => {
      this.allComments = data;
      console.log(this.allComments);
    });
  }

  deleteBlog(id) {
    this.blogService.deleteParticularBlog(id).subscribe(data => {
      this.blog = data;
      alert('Blog deleted successfully.');
    });
  }

  editBlog(id) {
    this.router.navigate(['editPost', id]);
  }

  makePrivate(id) {
    this.blogService.makeBlogPrivate(id).subscribe(data => {
      this.blog = data;
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
        // this.router.navigate(['viewPost', this.blogId]);
        window.location.reload();
      });
    } else {
      alert('Please add a valid comment.');
    }

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
  viewPost(postId) {
    this.router.navigate(['viewPost', postId]);
  }

}
