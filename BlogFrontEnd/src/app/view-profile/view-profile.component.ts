import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  private userId;
  private viewUser;
  private viewBlogs;
  constructor(private route: ActivatedRoute, private registrationService: RegistrationService,
              private blogService: BlogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('userId'));
      this.userId = id;
    });
    this.registrationService.viewUser(this.userId).subscribe(data => this.viewUser = data);
    this.blogService.viewPost(this.userId).subscribe(data => this.viewBlogs = data);
  }

}
