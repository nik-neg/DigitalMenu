import { TestBed } from '@angular/core/testing';

import { RestaurantStoreService } from './restaurant-store.service';

describe('RestaurantStoreService', () => {
  let service: RestaurantStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
