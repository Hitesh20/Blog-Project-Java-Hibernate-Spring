import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFollowersComponent } from './select-followers.component';

describe('SelectFollowersComponent', () => {
  let component: SelectFollowersComponent;
  let fixture: ComponentFixture<SelectFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
