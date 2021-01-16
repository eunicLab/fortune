import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleItemComponent } from './components/single-item/single-item.component'
import {AdminComponent } from './components/admin/admin.component'
import { StuffsComponent } from './components/stuffs/stuffs.component'
import { BasketComponent } from './components/basket/basket.component'
import { LoginComponent} from './components/login/login.component'

const routes: Routes = [
  { path: 'Product/:id', component: SingleItemComponent, },
  { path: 'Admin', component: AdminComponent },
  { path: 'Basket', component: BasketComponent },
  { path: 'Login', component: LoginComponent },
  { path: '', component: StuffsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
