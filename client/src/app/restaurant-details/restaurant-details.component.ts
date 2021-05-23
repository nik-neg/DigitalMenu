import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant;
  menus: Menu[];
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService) {
    this.restaurant = new Restaurant();
    this.menus = [];
  }

  ngOnInit() {
    this.getRestaurantDetails();
  }

  getRestaurantDetails(): void {
    this.route.params.forEach((params: Params) => {
      const restaurantId = params._id;
      this.apiClient.getRestaurant(restaurantId)
        .subscribe((restaurant) => {
          this.restaurant = restaurant;
          this.menus = restaurant.menus;
          console.log(this.menus);
        });
    });
  }
}
