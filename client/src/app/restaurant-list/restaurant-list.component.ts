import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  @Input() restaurantList: Restaurant[];

  constructor() {
    this.restaurantList = [];
  }

  showdetails = () => {
    console.log('click');
  };

  ngOnInit(): void {
  }
}
