import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../registration.service';
import {Router} from '@angular/router';
import {User} from '../User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: User;
  private name;
  private role;
  private address;
  private mobileNo;
  private email;
  private gender;
  constructor(private registrationService: RegistrationService, private router: Router) { }
  ngOnInit() {
    this.registrationService.getUser().subscribe( data => {
      console.log(data);
      this.user = data;
      this.email = this.user.email;
      this.name = this.user.name;
      this.mobileNo = this.user.mobileNo;
      this.gender = this.user.gender;
      this.role = this.user.role;
      console.log(this.user);
    });
  }

  editUser() {
    this.registrationService.editMyUser(this.user).subscribe(data => {
      this.user = data;
      alert('Details updated successfully.');
      this.router.navigate(['logout']);
    });
  }

}
