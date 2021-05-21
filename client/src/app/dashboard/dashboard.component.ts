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
    {title: 'Cuba Life', slogan: 'Madrid - Visit us', imagePath: "../../assets/images/restaurants/la_cuba.jpg"},
    {title: 'Burger Bar', slogan: 'Miami - Try our Big Deal :)', imagePath: "./../assets/images/restaurants/burger_bar.jpg"},
    {title: 'Delicat', slogan: 'Tel Aviv Marina - Enjoy!', imagePath: "./../assets/images/restaurants/delicat.jpg"},
    {title: 'The Spot', slogan: 'Nizza - Magnifique cuisine', imagePath: "../../assets/images/restaurants/the_spot.jpg"},
    {title: 'Mar e Sol', slogan: 'Lissabon - Come to see the sea', imagePath: "./../assets/images/restaurants/mar_e_sol.jpg"},
    {title: 'Green Lounge', slogan: 'Tokyo - From 10 a.m. to 11 p.m', imagePath: "./../assets/images/restaurants/green_lounge.jpg"},
    {title: 'La Rustica', slogan: 'Rome - Cucina italiana', imagePath: "../../assets/images/restaurants/la_rustica.jpg"},
    {title: 'Surf & Turf Bar', slogan: 'San Francisco - Best shrimps', imagePath: "./../assets/images/restaurants/surf_and_turf_bar.jpg"},
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
      for (let i = 0; i < this.restaurants.length; i++) {
        this.restaurants[i].imagePath = this.images[i] ? this.images[i].imagePath : 'no image';
        this.restaurants[i].slogan = this.images[i] ? this.images[i].slogan : '';
      }
      })
    }

  ngOnInit(): void {
    this.getRestaurants();
  }
}
