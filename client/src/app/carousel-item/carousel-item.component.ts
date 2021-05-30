import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {
  @Input() restaurant: Restaurant;

  isAdmin = true;

  constructor() {
    this.restaurant = new Restaurant();
  }

  ngOnInit(): void {
  }
}
