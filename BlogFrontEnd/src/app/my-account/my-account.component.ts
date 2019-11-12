import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';
import {User} from '../User';
import {UserComment} from '../UserComment';
import {Blog} from '../Blog';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

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
              private registrationService: RegistrationService, private commentService: CommentService) { }

  private blogs;
  private role;
  private user: User;
  private currentUser;
  ngOnInit() {
    this.blogService.getBlogsOfMyAccount().subscribe(data => this.blogs = data);
    this.registrationService.getUser().subscribe( data => {
      this.user = data;
      this.role = this.user.role;
    });
    this.currentUser = sessionStorage.getItem('username');
  }

  goToEditProfile() {
    this.router.navigate(['editProfile']);
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
        this.router.navigate(['viewPost', blog.postId]);
      });
    } else {
      alert('Please add a valid comment.');
    }

  }

  viewPost(postId) {
    this.router.navigate(['viewPost', postId]);
  }
}
