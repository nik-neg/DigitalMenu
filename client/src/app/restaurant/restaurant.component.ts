import { Component, Input, OnInit } from '@angular/core';
import { RestaurantStoreService } from '../services/restaurant-store.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import slugify from 'slugify';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: any;

  @Input() isAdmin = false;

  @Input() id: any = '-1'; // any neccessary, because of dependencies to to other components

  name: string = 'placeholder';

  constructor(private restaurantService: RestaurantStoreService) {
    this.restaurant = new Restaurant();
  }

  async slugifyName() {
    this.name = this.restaurant.name;
    this.name = slugify(this.name, {lower: true,});
  }

  restaurantDetailsURL() {
    return `/restaurants/${this.name}/${this.restaurant._id}`;
  }

  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    await this.slugifyName();
  }
}
