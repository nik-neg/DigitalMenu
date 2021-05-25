import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApiClientService } from '../api-client.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { setResetMaliciousRequest } from '../ngrx/actions/admin.actions';
import { RestaurantStoreService } from '../restaurant-store.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | undefined;

  menus: Menu[] | undefined;

  restaurantId = '-1';

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private store: Store< { restaurants: Restaurant[], maliciousRequest: boolean }>,
    private restaurantService: RestaurantStoreService
    ) {
    this.restaurant = new Restaurant();
    this.menus = [];
    // this.getRestaurantDetails();
  }

  async getRestaurantDetails(): Promise<void> {
    this.route.params.forEach((params: Params) => {
      this.restaurantId = params._id;

      // store service
      // this.restaurantService.restaurantList$.subscribe((restaurants: Restaurant []) => {
      //   console.log(restaurants, 'on init')
      //   this.restaurant = restaurants.find((restaurant) => restaurant._id === this.restaurantId);
      //   this.menus = this.restaurant?.menus;
      // })

      // store
      // this.store.select('restaurants').pipe(take(1)).subscribe((restaurants) => {
      //   console.log(restaurants);
      //   if(restaurants?.length > 1) {
      //     this.restaurant = restaurants.find((restaurant) => restaurant._id === this.restaurantId);
      //     this.menus = this.restaurant?.menus;
      //   }
      // });

      // api call
      this.apiClient.getRestaurant(this.restaurantId)
        .subscribe((restaurant) => {
          this.restaurant = restaurant;
          this.menus = restaurant.menus;
        });
    });
  }

  async resetMaliciousRequest(maliciousRequest: boolean): Promise<void> {
    this.store.dispatch(setResetMaliciousRequest({ maliciousRequest }));
  }

  async ngOnInit() {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
    // await this.restaurantService.getRestaurants();
    // this.restaurantService.restaurantList$.subscribe((restaurants: Restaurant []) => {
    //   console.log(restaurants, 'on init')
    //   this.restaurant = restaurants.find((restaurant) => restaurant._id === this.restaurantId);
    //   this.menus = this.restaurant?.menus;
    // })
    await this.resetMaliciousRequest(false);
  }
}
