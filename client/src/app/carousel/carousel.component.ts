import { Component, OnInit, Input} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../restaurant/entities/restaurant';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() restaurantList: Restaurant[];

  constructor(config: NgbCarouselConfig) {
    this.restaurantList = [];
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  showdetails = () => {
    console.log("click");
   };

  ngOnInit(): void {
  }

}
