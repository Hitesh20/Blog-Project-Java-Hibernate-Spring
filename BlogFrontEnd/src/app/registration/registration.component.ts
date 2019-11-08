import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../registration.service';
import {User} from '../User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private register: RegistrationService, private router: Router ) { }

  // tslint:disable-next-line:new-parens
  private user: User = new class implements User {
    active: boolean;
    email: string;
    gender: string;
    id: number;
    mobileNo: number;
    name: string;
    password: string;
    role: string;
  };

  ngOnInit() {
  }
  createUser() {
    if (this.user.email != null && this.user.gender != null && this.user.mobileNo != null && this.user.name != null
      && this.user.password != null ) {
      this.register.createUser(this.user).subscribe(data => {
        alert('User created successfully.');
        this.router.navigate(['home/login']);
      });
    } else {
      alert('Please fill all the details.');
    }
  }

}
