import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegistrationService} from '../registration.service';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private blogService: BlogService) { }
  private searchedItem: string;
  private currentUser;
  private result;
  @Output() private childEvent = new EventEmitter();
  ngOnInit() {
    this.registrationService.getUser().subscribe(data => {
      this.currentUser = data;
    });
  }

  searchOnClick() {
    // tslint:disable-next-line:triple-equals
    if (this.searchedItem != undefined && this.searchedItem != '') {
      this.blogService.getSearchedResult(this.searchedItem).subscribe(data => {
        this.result = data;
        this.childEvent.emit(this.result);
      });
    }
  }

}
