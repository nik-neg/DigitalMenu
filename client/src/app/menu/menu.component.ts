import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu/entities/menu';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Restaurant } from '../restaurant/entities/restaurant';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;
  @Input() restaurantId: string | undefined = '-1';
  isAdmin: boolean | undefined = false;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<{ restaurants: Restaurant [] }>) {
    this.menu = new Menu();
   }

  checkCredentials(): void {
    this.route.queryParams.subscribe(params => {
     if (params['isAdmin'] === 'true'  && !this.isAdmin) {  //TODO: check store for the admin rights for this menu
      console.log("bacl")
      return this.router.navigate(['/']);
    }
    return;
  });
  }

  editURL() {
    if (this.isAdmin) {
      return this.router.navigate([`menu/${this.menu._id}`], { relativeTo: this.route });
    } else {
      return '/';
    }
  }

  checkAdmin() {
    this.store.select('restaurants').pipe(take(1)).subscribe((restaurants) => {
      if(restaurants.length > 1) {
        console.log(restaurants);
        this.isAdmin = restaurants.find((restaurant) => restaurant._id === this.restaurantId)?.isAdmin;

      }
    });
  }

  ngOnInit(): void {
    // this.getMenuDetails();
    this.checkAdmin() ;
    this.checkCredentials();
  }

}
