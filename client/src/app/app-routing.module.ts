import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  { path: 'restaurants/:_id', component: RestaurantDetailsComponent },
  { path: 'restaurants/:_id/menu/:_id', component: MenuComponent },
  {path: "edit", component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
