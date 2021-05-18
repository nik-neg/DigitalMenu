import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/entities/restaurant';
import { ApiClientService } from '../api-client.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private restaurantsUrl = "restaurants";
  restaurants: Restaurant [];

  constructor(private apiClient: ApiClientService) {
    this.restaurants = [];
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
