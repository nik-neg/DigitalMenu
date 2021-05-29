import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { Dish } from '../dish/entities/dish';
import { RestaurantStoreService } from '../services/restaurant-store.service';
import { ApiClientService } from '../services/api-client.service';
import { UpdateDishDTO } from '../dish/dto/update-dish.dto';
import { Store } from '@ngrx/store';

import {
  updateRestaurants,
} from '../ngrx/actions/admin.actions';
@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
})
export class MenuEditComponent implements OnInit {
  restaurantId: string = '-1';
  restaurant: any; // for faster development
  updateRestaurantMenusDTO: UpdateDishDTO;
  menuId: string = '-1';
  menus: Menu [];
  menu: Menu;
  values: string = '';
  restaurantList: Restaurant [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantStoreService,
    private apiClient: ApiClientService,
    private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>
    ) {
      this.restaurant = new Restaurant();
      this.updateRestaurantMenusDTO = new UpdateDishDTO();
      this.menus = [];
      this.menu = new Menu();
      this.route.url.subscribe(url => {
        this.restaurantId = url[1].path;
        this.menuId = url[3].path;
      });
   }

   async getRestaurantDetails() {
    const restaurant = await this.restaurantService.getRestaurant(this.restaurantId);
    this.restaurant = restaurant;
    this.menus = this.restaurant.menus;
    this.menu = this.restaurant.menus.filter((menu: any) => menu._id === this.menuId )[0];
   }

   mapRestaurantMenusToMenuUpdateValues() {
    return this.menus.map((menu:Menu) => {
      const _id = menu._id;
      const menuName = menu.name;
      const dishes = menu.dishes?.map((dish) => {
        return {
          _id: dish._id,
          name: dish.name,
          price: dish.price
        }
       });
      return {
        _id: _id,
        name: menuName,
        dishes: dishes
      }
     })
   }

   updateRestaurants(restaurants: Restaurant[]) {
    this.store.dispatch(updateRestaurants({
      restaurants,
    }));
  }

  createBodyForUpdate(dishName: string, menuName: string, price: string) {
    this.updateRestaurantMenusDTO.name = dishName;
    this.updateRestaurantMenusDTO.menuName = menuName;
    this.updateRestaurantMenusDTO.price = price;
    return this.updateRestaurantMenusDTO;
  }

  async updateMenu(
    restaurantId: string,
    menuId: string,
    dishId: string,
    body: any,
    updateResponse: { dish: any, menu: any} ): Promise<any> {
    await this.apiClient.updateDish(restaurantId, menuId, dishId, body)
    .toPromise()
    .then((data: any) => updateResponse = data);
    return updateResponse;
  }

  getRestaurantDataFromRestaurantService() {
    this.restaurantService.restaurantList$.subscribe((restaurants: Restaurant []) => {
      this.restaurantList = restaurants;
    });
  }

  findIndexOfMenuAndOtherMenus(restaurantForUpdate: any, filterString: string, selector: string) { // name , id
    const indexMenu = restaurantForUpdate.menus.findIndex((menu: any) => menu[selector] === filterString);
    const otherMenus = restaurantForUpdate.menus.filter((menu: any) => menu[selector] !== filterString);
    return [indexMenu, otherMenus];
  }

  generateDishObjectForStoreUpdate(updateResponse: any, dish: any) {
    let dishObject = Object.assign({}, new Dish());
    dishObject.name = updateResponse.dish.name;
    dishObject.price = updateResponse.dish.price;
    for (const [key, value] of Object.entries(dish)) {
      if (key === 'name' || key === 'price') continue;
      dishObject[key] = dish[key];
    }
    return dishObject;
  }

  generateMenuObjectForStoreUpdate(updatedDishes: any, menuForUpdate: any) {
    let menuObject = Object.assign({}, new Menu());
    menuObject.dishes = updatedDishes;
    for (const [key, value] of Object.entries(menuForUpdate)) {
      if (key === 'dishes') continue;
      menuObject[key] = menuForUpdate[key];
    }
    return menuObject
  }

  generateRestaurantObjectForStoreUpdate(tempMenu: any, otherMenus: any, restaurantForUpdate: any ) {
    let tempRestaurant = Object.assign({}, new Restaurant());
    tempRestaurant.menus = tempRestaurant.menus.concat(tempMenu).concat(otherMenus);
    for (const [key, value] of Object.entries(restaurantForUpdate)) {
      if (key === 'menus') continue;
      tempRestaurant[key] = restaurantForUpdate[key];
    }
    return tempRestaurant;
  }

  async submit(e:any) {
    e.preventDefault();
    // values for update
    const menuName = e.target.menuname.value;
    const dishName = e.target.dishname.value;
    const dishId = e.target.dish_id.value; // use of bcrypt ?
    const menuId = e.target.menu_id.value; // use of bcrypt ?
    let price = e.target.price.value;
    price = price.slice(1, price.length);

    const body = this.createBodyForUpdate(dishName, menuName, price);
    // call update with api client
    let updateResponse : { dish: any, menu: any} = {dish: undefined, menu: undefined };
    updateResponse = await this.updateMenu(this.restaurantId, this.menuId, dishId, body, updateResponse);

    // update store
    // get data from behavioural subject
    this.getRestaurantDataFromRestaurantService();
    // check to add or remove the dish
    const indexRestaurant = this.restaurantList.findIndex((restaurant) => restaurant._id === this.restaurantId);
    let restaurantForUpdate = this.restaurantList[indexRestaurant];

    // find menu which has been updated
    let indexMenu;
    let otherMenus;
    if(menuName) {
      [indexMenu, otherMenus] = this.findIndexOfMenuAndOtherMenus(restaurantForUpdate, menuName, 'name');
    } else {
      [indexMenu, otherMenus] = this.findIndexOfMenuAndOtherMenus(restaurantForUpdate, menuId, '_id');
    }
    let menuForUpdate = restaurantForUpdate.menus[indexMenu];

    let updatedDishes : any = [];
    if(menuForUpdate) {
      const index = menuForUpdate.dishes?.findIndex((dish) => dish._id === updateResponse.dish._id);
      if (index && index > -1 && menuName.length < 1) { // remove from dish list in menu
        updatedDishes = menuForUpdate.dishes.filter((dish) => dish._id !== updateResponse.dish._id);
      } else if (index && index > -1) { // update the dish list in menu
        updatedDishes = menuForUpdate.dishes.map((dish) => {
          if (dish._id === updateResponse.dish._id) {
            return this.generateDishObjectForStoreUpdate(updateResponse, dish);
          }
          return dish;
        });
      } else { // add to dish list in menu
        updatedDishes = menuForUpdate.dishes.map((dish) => dish);
        updatedDishes = updatedDishes?.concat(updateResponse.dish);
      }
    }
    let tempMenu = this.generateMenuObjectForStoreUpdate(updatedDishes, menuForUpdate);
    let tempRestaurant = this.generateRestaurantObjectForStoreUpdate(tempMenu, otherMenus, restaurantForUpdate);

    const otherRestaurants = this.restaurantList.filter((restaurant) => restaurant._id !== tempRestaurant._id);
    const restaurantsForDispatch = [tempRestaurant].concat(otherRestaurants);

    // update store via reducer
    this.updateRestaurants(restaurantsForDispatch)
  }

  restaurantDetails() {
    return this.router.navigate(
      [`restaurants/${this.restaurant._id}`],
    );
  }

  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
  }
}
