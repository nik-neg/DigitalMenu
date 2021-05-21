import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListSmallDevicesComponent } from './restaurant-list-small-devices.component';

describe('RestaurantListSmallDevicesComponent', () => {
  let component: RestaurantListSmallDevicesComponent;
  let fixture: ComponentFixture<RestaurantListSmallDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListSmallDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListSmallDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
