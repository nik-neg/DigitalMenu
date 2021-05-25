import { Injectable } from '@angular/core';
import { Restaurant } from '../app/restaurant/entities/restaurant';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {
  private restaurantList: Restaurant [] = [];
  restaurantList$ = new BehaviorSubject< Restaurant []>([]);
  constructor(private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>) { }

  async getRestaurants() {
    this.store.select('store').pipe(take(1))
    .subscribe((store) => {
      if (store) {
        this.restaurantList = store.restaurants;
        this.restaurantList$.next(this.restaurantList);
      }
      console.log(this.restaurantList);
      console.log(this.restaurantList$);
    });
  }
}
