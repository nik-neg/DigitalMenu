import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { RestaurantStoreService } from '../services/restaurant-store.service';
import { ApiClientService } from '../services/api-client.service';
import { UpdateDishDTO } from '../dish/dto/update-dish.dto';
@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
})
export class MenuEditComponent implements OnInit {
  restaurantId: string = '-1';
  restaurant: any; // for faster development
  updateRestaurantMenusDTO: UpdateDishDTO; // for faster development
  menuId: string = '-1';
  menus: Menu [];
  values: string = '';



  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantStoreService,
    private apiClient: ApiClientService
    ) {
      this.restaurant = new Restaurant();
      this.updateRestaurantMenusDTO = new UpdateDishDTO();
      this.menus = [];
      this.route.url.subscribe(url => {
        this.restaurantId = url[1].path;
        this.menuId = url[3].path;
      });
   }

   get diagnostic() { return JSON.stringify(this.updateRestaurantMenusDTO); }

   async getRestaurantDetails() {
    const restaurant = await this.restaurantService.getRestaurant(this.restaurantId);
    this.restaurant = restaurant;
    this.menus = this.restaurant.menus;
    // this.updateRestaurantMenusDTO =
    // this.menus.map((menu) => {
    //   const menuName = menu.name;
    //   const dishes = menu.dishes?.map((dish) => {
    //     return {
    //       name: dish.name,
    //       price: dish.price
    //     }
    //    });
    //   return {
    //     name: menuName,
    //     dish: dishes
    //   }
    // //  })
    //  console.log(this.updateRestaurantMenus);

    // this.restaurantService.restaurant$.subscribe(restaurant => {
    // this.restaurant = restaurant;
    // this.menus = this.restaurant.menus;
    // });
   }

   mapRestaurantToUpdateValues() {
    return this.menus.map((menu) => {
      const _id = menu._id;
      const menuName = menu.name;
      const dishes = menu.dishes?.map((dish) => {
        return {
          name: dish.name,
          price: dish.price
        }
       });
      return {
        _id: _id,
        name: menuName,
        dish: dishes
      }
     })
   }

  submit(e:any) {
    e.preventDefault();
    // values for update
    const menuId = e.target.menu_id.value;
    const menuName = e.target.menuname.value;
    const dishName = e.target.dishname.value;
    let price = e.target.price.value;
    price = price.slice(1, price.length);

    this.updateRestaurantMenusDTO._id = menuId;
    this.updateRestaurantMenusDTO.name = menuName;
    this.updateRestaurantMenusDTO.price = price;

    console.log(this.updateRestaurantMenusDTO);

    // call update
    // const dtoValues = this.mapRestaurantToUpdateValues();
    // console.log(dtoValues);
    // const filterUpdateValue = dtoValues.filter((item) => item._id === menuId);
    // console.log(filterUpdateValue);
    // update store
  }


  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
  }
}
