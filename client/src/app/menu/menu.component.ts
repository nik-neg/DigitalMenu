import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu/entities/menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: Menu;
  constructor() {
    this.menu = new Menu();
   }

  ngOnInit(): void {
  }

  menuURL() {
    return `/restaurants/${this.menu.restaurant}/menu/${this.menu._id}`;
  }

}
