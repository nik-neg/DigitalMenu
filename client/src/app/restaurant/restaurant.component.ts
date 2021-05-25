import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: any;

  @Input() isAdmin = false;

  @Input() id: any = '-1'; // Any neccessary, because of dependencies to to other components

  constructor() {

  }

  restaurantURL() {
    return `/restaurants/${this.restaurant._id}`;
  }

  async ngOnInit(): Promise<void> {

  }
}
