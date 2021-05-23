import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;
  isAdmin: boolean = true;
  constructor() {
    this.restaurant = new Restaurant();
  }

  restaurantURL() {
    return `/restaurants/${this.restaurant._id}`;
  }

  ngOnInit(): void {
  }

}
