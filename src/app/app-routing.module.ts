import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent},
  { path: 'home',component: HomeComponent},
  { path: 'cart',component: CartComponent},
  { path: 'orders',component: OrdersComponent},
  { path: 'view-product/:product',component: ViewProductComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',redirectTo:'login',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
