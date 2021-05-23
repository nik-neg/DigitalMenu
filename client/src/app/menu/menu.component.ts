import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu/entities/menu';
import { ActivatedRoute, Params, ParamMap  } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;
  isAdmin: boolean = false
  constructor(private route: ActivatedRoute) {
    this.menu = new Menu();
   }

  ngOnInit(): void {
    this.getRestaurantDetails();
  }
  getRestaurantDetails(): void {
    this.route.queryParams.subscribe(params => {
      this.isAdmin = params['isAdmin'] === 'true' ? true : false;
    });
  }

  editURL() {
    if (this.isAdmin) {
      return `/restaurants/${this.menu.restaurant}/menu/${this.menu._id}`;
    } else {
      // alert('only admins can edit menus');
      return '/'; // pass param to route ?
    }
  }

}
