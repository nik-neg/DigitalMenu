import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {
  private restaurantList: Restaurant [] = [];
  restaurantList$ = new BehaviorSubject< Restaurant []>([]);

  private restaurant: Restaurant = new Restaurant();
  restaurant$ = new BehaviorSubject< Restaurant>(new Restaurant());
  constructor(private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>) { }

  async getRestaurants() {
    this.store.select('store').pipe(take(1))
    .subscribe((store) => {
      if (store) {
        this.restaurantList = store.restaurants;
        this.restaurantList$.next(this.restaurantList);
      }
    });
  }

  async getRestaurant(restaurantId: string) : Promise<Restaurant | undefined> {
    // const restaurant = this.restaurantList.find(restaurant => restaurant._id === restaurantId);
    // if (restaurant) this.restaurant$.next(restaurant);
    return this.restaurantList.find(restaurant => restaurant._id === restaurantId);
  }
}
