import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
import { initialState } from '../../app/ngrx/reducer/admin.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;
  // isAdmin: boolean = true;
  isAdmin$: Observable<boolean>;
  constructor(private store: Store<{ isAdmin: boolean }>) {
    this.restaurant = new Restaurant();
    this.isAdmin$ = this.getValue(this.store.select('isAdmin'));
    // this.showme();
  }

  getValue(obj: Observable<any>){
    let value: any;
    obj.subscribe(v => value = v);
    return value;
  }


  showme() {
    console.log(this.getValue(this.isAdmin$));     // single value => works
  }

  restaurantURL() {
    return `/restaurants/${this.restaurant._id}`;
  }

  ngOnInit(): void {
  }

}
