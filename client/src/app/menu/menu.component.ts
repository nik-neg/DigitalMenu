import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from './entities/menu';

import { setResetMaliciousRequest } from '../ngrx/actions/admin.actions';
import { RestaurantStoreService } from '../services/restaurant-store.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;

  @Input()
  restaurantId: string = '-1';

  @Input() isAdmin: boolean | undefined = false;

  sum: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.menu = new Menu();
    this.sum = 0;
  }

  async calculateSum(): Promise<void> {
    this.menu.dishes.forEach((dish) => {
      this.sum += dish.price !== undefined ? dish.price: 0;
    })
  }

  editURL() {
    if (this.isAdmin) {
      return this.router.navigate(
        [`menu/${this.menu._id}`],
        { relativeTo: this.route },
      );
    }
    return '/';
  }

  async ngOnInit(): Promise<void> {
    await this.calculateSum()
  }
}
