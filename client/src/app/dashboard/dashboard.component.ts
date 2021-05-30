import {
  Component, OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Restaurant } from '../restaurant/entities/restaurant';
import { ApiClientService } from '../services/api-client.service';

import {
  retrieveRestaurans,
  updateRestaurants,
} from '../ngrx/actions/admin.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imagesTop = [
    {
      title: 'Cuba Life',
      slogan: 'Madrid - Visit us',
      imagePath: '../../assets/images/restaurants/cuba_life.jpg',
    },
    {
      title: 'Burger Bar',
      slogan: 'Miami - Big Deal :)',
      imagePath: './../assets/images/restaurants/burger_bar.jpg',
    },
    {
      title: 'Delicat',
      slogan: 'Tel Aviv Marina - Enjoy!',
      imagePath: './../assets/images/restaurants/delicat.jpg',
    },
    {
      title: 'The Spot',
      slogan: 'Nizza - Magnifique!',
      imagePath: '../../assets/images/restaurants/the_spot.jpg',
    },
    {
      title: 'Mar e Sol',
      slogan: 'Lissabon - Have a seat',
      imagePath: './../assets/images/restaurants/mar_e_sol.jpg',
    },
    {
      title: 'Green Lounge',
      slogan: 'Tokyo Harajuku - :)',
      imagePath: './../assets/images/restaurants/green_lounge.jpg',
    },
    {
      title: 'La Rustica',
      slogan: 'Rome - Cucina italiana',
      imagePath: '../../assets/images/restaurants/la_rustica.jpg',
    },
    {
      title: 'Surf & Turf',
      slogan: 'San Francisco - Best!',
      imagePath: './../assets/images/restaurants/surf_and_turf_bar.jpg',
    },
  ];

  imagesBottom = [
    {
      title: 'El Matador',
      slogan: 'Madrid - Coming soon!',
      imagePath: '../../assets/images/restaurants/el_matador.jpg',
    },
    {
      title: 'Potato Crunch',
      slogan: 'Miami - Coming soon!',
      imagePath: './../assets/images/restaurants/potato_crunch.jpg',
    },
    {
      title: 'Saladido',
      slogan: 'Tel Aviv - Coming soon!',
      imagePath: './../assets/images/restaurants/saladido.jpg',
    },
    {
      title: 'Oyster Hunter',
      slogan: 'Nizza - Coming soon!',
      imagePath: '../../assets/images/restaurants/oyster_hunter.jpg',
    },
    {
      title: 'Sea Heaven',
      slogan: 'Lissabon - Coming soon!',
      imagePath: './../assets/images/restaurants/seafood_heaven.jpg',
    },
    {
      title: 'Veggie Master',
      slogan: 'Tokyo - Coming soon!',
      imagePath: './../assets/images/restaurants/veggie_master.jpg',
    },
    {
      title: 'Brewery King',
      slogan: 'Rome - Coming soon!',
      imagePath: '../../assets/images/restaurants/brewery_king.jpg',
    },
    {
      title: 'Soup Splash',
      slogan: 'San Francisco - Soon!',
      imagePath: './../assets/images/restaurants/soup_splash.jpg',
    },
  ];

  private restaurantsUrl = 'restaurants';

  restaurantsTop: Restaurant [];

  restaurantsBottom: Restaurant [];

  maliciousRequest = false;

  constructor(
    private apiClient: ApiClientService,
    private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>,
  ) {
    this.restaurantsTop = [];
    this.restaurantsBottom = [];
  }

  async retrieveRestaurans(): Promise<void> {
    const restaurants = [
      ...this.restaurantsTop, ...this.restaurantsBottom,
    ];
    const { maliciousRequest } = this;
    this.store.dispatch(retrieveRestaurans({
      restaurants,
      maliciousRequest,
    }));
  }

  updateRestaurants(restaurants: []) {
    this.store.dispatch(updateRestaurants({
      restaurants,
    }));
  }

  async getRestaurants(): Promise<void> {
    this.apiClient.getRestaurants(this.restaurantsUrl)
      .subscribe((restaurants) => {
        this.restaurantsTop = restaurants.slice(
          0,
          restaurants.length / 2,
        );
        this.restaurantsBottom = restaurants.slice(
          restaurants.length / 2,
          restaurants.length,
        );
        this.restaurantsTop = this.restaurantsTop.map<Restaurant>((restaurant, index) => {
          restaurant.imagePath = this.imagesTop[index] ? this.imagesTop[index].imagePath : 'no image';
          restaurant.slogan = this.imagesTop[index] ? this.imagesTop[index].slogan : '';
          return restaurant;
        });
        this.restaurantsBottom = this.restaurantsBottom.map<Restaurant>((restaurant, index) => {
          restaurant.imagePath = this.imagesBottom[index] ? this.imagesBottom[index].imagePath : 'no image';
          restaurant.slogan = this.imagesBottom[index] ? this.imagesBottom[index].slogan : '';
          return restaurant;
        });
      });
      // await this.retrieveRestaurans();
  }

  async ngOnInit(): Promise<void> {
    this.getRestaurants();
    await this.retrieveRestaurans();
  }
}
