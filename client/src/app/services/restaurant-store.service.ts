import { Injectable } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  retrieveRestaurants,
  setResetMaliciousRequest,
  updateRestaurants,
} from '../ngrx/actions/admin.actions';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {
  private restaurantList: Restaurant [] = [];
  restaurantList$ = new BehaviorSubject< Restaurant []>([]);
  maliciousRequest$ =  new BehaviorSubject<boolean>(false);

  constructor(private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>) { }


  async retrieveRestaurants(restaurants: Restaurant[]) {
    const maliciousRequest  = false;
    this.store.dispatch(retrieveRestaurants({
      restaurants,
      maliciousRequest,
    }));
  }

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
    return this.restaurantList.find(restaurant => restaurant._id === restaurantId);
  }

  setMaliciousRequest(maliciousRequest: boolean): void {
    this.store.dispatch(setResetMaliciousRequest({ maliciousRequest }));
  }

  updateRestaurants(restaurants: Restaurant[]) {
    this.store.dispatch(updateRestaurants({
      restaurants,
    }));
  }

  async getMaliciousRequestStatus(): Promise<void>{
    this.store.select('store').pipe(take(1))
    .subscribe((storeObject) => this.maliciousRequest$.next(storeObject?.maliciousRequest));
  }

}
