import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApiClientService } from '../api-client.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { setResetMaliciousRequest } from '../ngrx/actions/admin.actions';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | undefined;

  menus: Menu[] | undefined;

  restaurantId = '-1';

  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private store: Store<{ restaurants: Restaurant [] }>) {
    this.restaurant = new Restaurant();
    this.menus = [];
  }

  getRestaurantDetails(): void {
    this.route.params.forEach((params: Params) => {
      this.restaurantId = params._id;

      /*
       * This.store.select('restaurants').pipe(take(1)).subscribe((restaurants) => {
       *   If(restaurants.length > 1) {
       *     This.restaurant = restaurants.find((restaurant) => restaurant._id === this.restaurantId);
       *     This.menus = this.restaurant?.menus;
       *   }
       * });
       */
      this.apiClient.getRestaurant(this.restaurantId)
        .subscribe((restaurant) => {
          this.restaurant = restaurant;
          this.menus = restaurant.menus;
          // Console.log(this.menus);
        });
    });
  }

  async resetMaliciousRequest(): Promise<void> {
    const maliciousRequest = false; // set to false
    this.store.dispatch(setResetMaliciousRequest({maliciousRequest: maliciousRequest}));
  }

  async ngOnInit() {
    this.getRestaurantDetails();
    await this.resetMaliciousRequest();
  }

}
