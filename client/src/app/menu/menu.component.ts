import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from './entities/menu';

import { setResetMaliciousRequest } from '../ngrx/actions/admin.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;

  @Input() restaurantId: string | undefined = '-1';

  @Input() isAdmin: boolean | undefined = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>,
  ) {
    this.menu = new Menu();
  }

  async checkAdmin() {
    this.store.select('store').pipe(take(1))
      .subscribe((store) => {
        if (store) {
          this.isAdmin = store.restaurants.find((restaurant) => restaurant._id === this.restaurantId)?.isAdmin;
        }
      });
  }

  setMaliciousRequest(maliciousRequest: boolean): void {
    this.store.dispatch(setResetMaliciousRequest({ maliciousRequest }));
  }

  async checkCredentials(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (params.isAdmin === 'true' && !this.isAdmin) {
        this.setMaliciousRequest(true);
        return this.router.navigate(['/']);
      }
      return;
    });
  }

  editURL() {
    if (this.isAdmin) {
      // TODO: flash data before redirect or check store
      return this.router.navigate(
        [`menu/${this.menu._id}`],
        { relativeTo: this.route }, // queryParams: {id: this.restaurantId}
      );
    }
    return '/';
  }

  async ngOnInit(): Promise<void> {
    await this.checkAdmin();
    await this.checkCredentials();
  }
}
