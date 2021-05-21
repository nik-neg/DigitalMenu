import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
import { ApiClientService } from '../api-client.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbCarouselConfig]
})
export class DashboardComponent implements OnInit {
  title = 'ng-carousel-demo';
  images = [
    {title: 'Cuba Life', short: 'Visit us in the center of Madrid', src: "../../assets/images/restaurants/1.jpg"},
    {title: 'Burger Bar', short: 'Come and try our Big Deal :)', src: "./../assets/images/restaurants/2.jpg"},
    {title: 'Delicat', short: 'Always good', src: "./../assets/images/restaurants/3.jpg"},
    {title: 'The Spot', short: 'Meet your friends and enjoy our kitchen', src: "../../assets/images/restaurants/4.jpg"},
    {title: 'Mar e Sol', short: 'Come to see the sea', src: "./../assets/images/restaurants/5.jpg"},
    {title: 'Green Lounge', short: 'Nice and fresh dishes from 10 a.m. to 11 p.m', src: "./../assets/images/restaurants/6.jpg"},
    {title: 'La Rustica', short: 'Cucina italiana tradizionale', src: "../../assets/images/restaurants/7.jpg"},
    {title: 'Surf & Turf Bar', short: 'Come and try our shrimps', src: "./../assets/images/restaurants/8.jpg"},
  ];

  private restaurantsUrl = "restaurants";
  restaurants: Restaurant [];

  constructor(private apiClient: ApiClientService, config: NgbCarouselConfig) {
    this.restaurants = [];
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  getRestaurants() : void {
    this.apiClient.getRestaurants(this.restaurantsUrl)
    .subscribe((restaurants) => {
      console.log(restaurants)
      this.restaurants = restaurants;
    });
  }

  ngOnInit(): void {
    this.getRestaurants();
  }

}
