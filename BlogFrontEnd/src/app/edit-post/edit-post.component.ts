import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  private blogId;
  private blog;
  constructor(private blogService: BlogService, private router: Router,
              private route: ActivatedRoute, private loginService: AuthenticationService) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('id'));
      this.blogId = id;
    });
    this.blogService.getThisBlog(this.blogId).subscribe((data => this.blog = data));
  }
  editBlog(blog) {
    this.blogService.editParticularBlog(blog).subscribe(data => {
      alert('Blog updated successfully.');
      this.router.navigate(['feed']);
    });

  }
}
