import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { DishComponent } from './dish/dish.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantListSmallDevicesComponent } from './restaurant-list-small-devices/restaurant-list-small-devices.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { adminReducer } from './ngrx/reducer/admin.reducer';
import { environment } from '../environments/environment';
import { RestaurantEffects } from './ngrx/effects/restaurant.effects';
import { AlertTimerComponent } from './alert-timer/alert-timer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

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
    AlertTimerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({ store: adminReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([RestaurantEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
