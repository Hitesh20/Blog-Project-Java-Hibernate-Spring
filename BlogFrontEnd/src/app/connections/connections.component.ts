import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  private role;
  private user;
  private currentUser;
  private searchedItem: string;
  private searchedUsers;
  constructor(private blogService: BlogService, private router: Router,
              private route: ActivatedRoute, private loginService: AuthenticationService,
              private registrationService: RegistrationService) { }

  ngOnInit() {
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

}
