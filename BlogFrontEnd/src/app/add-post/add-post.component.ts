import { Component, OnInit } from '@angular/core';
import {Blog} from '../Blog';
import {BlogService} from '../blog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  // tslint:disable-next-line:new-parens
  private blog: Blog = new class implements Blog {
    author: string;
    content: string;
    date: Date;
    id: number;
    title: string;
    isPrivate: boolean;
  }
  constructor(private blogService: BlogService, private router: Router) { }
  ngOnInit() {
  }

  addBlog() {
    console.log(this.blog);
    if (this.blog.title != null && this.blog.content != null) {
      if (this.blog != null) {
        this.blog.date = new Date();
        this.blogService.addBlog(this.blog).subscribe(data => {
          alert('New Blog Added Successfully');
          this.router.navigate(['feed']);
        });
      }
    } else {
      alert('Please fill all the details carefully.');
    }
  }

}
