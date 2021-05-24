import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | undefined;
  menus: Menu[] | undefined;
  restaurantId : string = '-1';
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private store: Store<{ restaurants: Restaurant [] }>) {
    this.restaurant = new Restaurant();
    this.menus = [];
  }

  async ngOnInit() {
    this.getRestaurantDetails();
  }

  getRestaurantDetails(): void {
    this.route.params.forEach((params: Params) => {
      this.restaurantId = params._id;
      this.store.select('restaurants').pipe(take(1)).subscribe((restaurants) => {
        if(restaurants.length > 1) {
          this.restaurant = restaurants.find((restaurant) => restaurant._id === this.restaurantId);
          this.menus = this.restaurant?.menus;
        }
      });
      // this.apiClient.getRestaurant(this.restaurantId)
      //   .subscribe((restaurant) => {
      //     this.restaurant = restaurant;
      //     this.menus = restaurant.menus;
      //     // console.log(this.menus);
      //   });
    });
  }
}
