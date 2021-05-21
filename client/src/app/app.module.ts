import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { DishComponent } from './dish/dish.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantListSmallDevicesComponent } from './restaurant-list-small-devices/restaurant-list-small-devices.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RestaurantComponent,
    MenuComponent,
    DishComponent,
    DetailsComponent,
    EditComponent,
    RestaurantListComponent,
    RestaurantListSmallDevicesComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
