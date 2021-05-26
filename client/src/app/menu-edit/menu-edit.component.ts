import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestaurantStoreService } from '../services/restaurant-store.service';
import { Restaurant } from '../restaurant/entities/restaurant';
import { Menu } from '../menu/entities/menu';
import { NgForm } from '@angular/forms';
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

  @ViewChild('testForm') testFormElement: any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantStoreService,
    private elementRef:ElementRef
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
     console.log(this.testFormElement)
   }

   ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('testform')
                                  .addEventListener('click', this.onClick.bind(this));
  }

  onClick(event?: any) {
    console.log(event.target.value);
  }

  registerUser(form: NgForm) {
    console.log(form.value);
    // {email: '...', password: '...'}
    // ... <-- now use JSON.stringify() to convert form values to json.
  }


  async ngOnInit(): Promise<void> {
    await this.restaurantService.getRestaurants();
    await this.getRestaurantDetails();
  }
}
