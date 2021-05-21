import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
@Component({
  selector: 'app-restaurant-list-small-devices',
  templateUrl: './restaurant-list-small-devices.component.html',
  styleUrls: ['./restaurant-list-small-devices.component.scss']
})
export class RestaurantListSmallDevicesComponent implements OnInit {
  @Input() restaurantList: Restaurant[];
  constructor() {
    this.restaurantList = [];
  }

  showdetails = () => {
    console.log("click");
  };


  ngOnInit(): void {
  }

}
