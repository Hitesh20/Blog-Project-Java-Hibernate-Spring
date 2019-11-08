import { TestBed } from '@angular/core/testing';

import { FollowerFollowingService } from './follower-following.service';

describe('FollowerFollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowerFollowingService = TestBed.get(FollowerFollowingService);
    expect(service).toBeTruthy();
  });
});
