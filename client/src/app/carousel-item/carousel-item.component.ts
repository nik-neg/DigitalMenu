import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';

import slugify from 'slugify';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {
  @Input()
  restaurant!: Restaurant;

  restaurantName: string | undefined;

  constructor() {
    this.restaurant = new Restaurant();
  }

  async slugifyName() {
    this.restaurantName = this.restaurant.name;
    this.restaurantName = slugify(this.restaurantName || 'placeholder', { lower: true, });
  }

  async ngOnInit(): Promise<void> {
    await this.slugifyName();
  }
}
