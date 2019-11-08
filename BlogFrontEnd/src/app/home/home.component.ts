import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToLoginComponent() {
    this.router.navigate(['login'], {relativeTo: this.route});
  }

  goToRegisterationComponent() {
    this.router.navigate(['register'], {relativeTo: this.route});
  }
}
