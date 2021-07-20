import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'restaurants/:name/:_id',
    component: RestaurantDetailsComponent,
  },
  {
    path: 'restaurants/:name/:_id/menu/:_id',
    component: MenuEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
