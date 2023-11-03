import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserShoppingcartComponent } from './user-shoppingcart/user-shoppingcart.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: UserProfileComponent
  },
  {
    path: 'historial',
    component: UserShoppingcartComponent
  },
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDataRoutingModule { }