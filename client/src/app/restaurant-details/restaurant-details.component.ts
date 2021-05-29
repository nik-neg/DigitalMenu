import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApiClientService } from '../services/api-client.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { setResetMaliciousRequest } from '../ngrx/actions/admin.actions';
import { RestaurantStoreService } from '../services/restaurant-store.service';
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
    private router: Router,
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

      // api call
      this.apiClient.getRestaurant(this.restaurantId)
        .subscribe((restaurant) => {
          this.restaurant = restaurant;
          this.menus = restaurant.menus;
        });
    });
  }

  getRestaurantFromStore() {
    const promisedRestaurant = this.restaurantService.getRestaurant(this.restaurantId);
    promisedRestaurant
    .then(restaurant => {
      this.restaurant = restaurant;
      this.menus = restaurant?.menus;
    })
    .catch(err => console.log(err));
  }

  async resetMaliciousRequest(maliciousRequest: boolean): Promise<void> {
    this.store.dispatch(setResetMaliciousRequest({ maliciousRequest }));
  }

  backToMainPage() {
    return this.router.navigate(
      [`/`],
    );
  }

  async ngOnInit() {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
  }
}
