import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestaurantStoreService } from '../services/restaurant-store.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
})
export class MenuEditComponent implements OnInit {
  restaurantId: string = '-1';
  restaurant: any; // for faster development
  menuId: string = '-1';
  menus: Menu [];
  values: string = '';
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantStoreService,
    ) {
      this.restaurant = new Restaurant();
      this.menus = [];
      this.route.url.subscribe(url => {
        this.restaurantId = url[1].path;
        this.menuId = url[3].path;
      });
   }

   async getRestaurantDetails() {
    const restaurant = await this.restaurantService.getRestaurant(this.restaurantId);
    this.restaurant = restaurant;
    this.menus = this.restaurant.menus;
   }

   onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }

   update() {
     console.log('click');
   }


  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
  }
}
