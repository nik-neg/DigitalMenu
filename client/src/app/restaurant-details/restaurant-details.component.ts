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
  restaurant: Restaurant;

  menus: Menu[] | undefined;

  restaurantId = '-1';

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private router: Router,
    private restaurantService: RestaurantStoreService
    ) {
    this.restaurant = new Restaurant();
    this.menus = [];
  }

  async getRestaurantDetails(): Promise<void> {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.restaurantId = params._id;

      // api call
      this.apiClient.getRestaurant(this.restaurantId)
        .subscribe((restaurant) => {
          this.restaurant = restaurant;
          this.menus = restaurant.menus;
        });
    });
  }

  async checkAdmin() {
    const restaurant = await this.restaurantService.getRestaurant(this.restaurantId)
    if(restaurant !== undefined) this.restaurant.isAdmin = restaurant.isAdmin;
  }


  async checkCredentials(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (params.isAdmin === 'true' && !this.restaurant.isAdmin) {
        this.restaurantService.setMaliciousRequest(true);
        return this.router.navigate(['/']);
      }
      return;
    });
  }

  backToMainPage() {
    return this.router.navigate(
      [`/`],
    );
  }

  async ngOnInit() {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
    await this.checkAdmin();
    await this.checkCredentials();
  }
}
