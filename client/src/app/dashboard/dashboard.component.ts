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
    {title: 'Cuba Life', short: 'Madrid - Visit us', src: "../../assets/images/restaurants/la_cuba.jpg"},
    {title: 'Burger Bar', short: 'Miami - Come and try our Big Deal :)', src: "./../assets/images/restaurants/burger_bar.jpg"},
    {title: 'Delicat', short: 'Tel Aviv Marina - Always good', src: "./../assets/images/restaurants/delicat.jpg"},
    {title: 'The Spot', short: 'Nizza - Try our delicous kitchen', src: "../../assets/images/restaurants/the_spot.jpg"},
    {title: 'Mar e Sol', short: 'Lissabon - Come to see the sea', src: "./../assets/images/restaurants/mar_e_sol.jpg"},
    {title: 'Green Lounge', short: 'Tokyo - Open from 10 a.m. to 11 p.m', src: "./../assets/images/restaurants/green_lounge.jpg"},
    {title: 'La Rustica', short: 'Rome - Cucina italiana tradizionale', src: "../../assets/images/restaurants/la_rustica.jpg"},
    {title: 'Surf & Turf Bar', short: 'San Francisco - Come and try our shrimps', src: "./../assets/images/restaurants/surf_and_turf_bar.jpg"},
  ];

  private restaurantsUrl = "restaurants";
  restaurants: Restaurant [];

  constructor(private apiClient: ApiClientService, config: NgbCarouselConfig) {
    this.restaurants = [];
    config.interval = 4000;
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
