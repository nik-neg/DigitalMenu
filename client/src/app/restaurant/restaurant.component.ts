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
  @Input() restaurant: any;
  @Input() isAdmin: boolean = false;
  @Input() id: any = '-1'; // any neccessary, because of dependencies to to other components
  constructor() {

  }

  restaurantURL() {
    //TODO: reset malicious request to false
    return `/restaurants/${this.restaurant._id}`;
  }

  async ngOnInit(): Promise<void> {

  }
}
