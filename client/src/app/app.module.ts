import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { DishComponent } from './dish/dish.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantListSmallDevicesComponent } from './restaurant-list-small-devices/restaurant-list-small-devices.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

import { StoreModule } from '@ngrx/store';
import { adminReducer } from '../app/ngrx/reducer/admin.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

import { EffectsModule } from '@ngrx/effects';
import { RestaurantEffects } from '../app/restaurant/restaurant.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RestaurantComponent,
    MenuComponent,
    DishComponent,
    RestaurantListComponent,
    RestaurantListSmallDevicesComponent,
    CarouselComponent,
    RestaurantDetailsComponent,
    CarouselItemComponent,
    MenuEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({ restaurants: adminReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([RestaurantEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
