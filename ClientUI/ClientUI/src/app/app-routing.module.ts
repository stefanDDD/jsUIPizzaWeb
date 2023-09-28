import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { CartComponent } from './components/dashboard/cart/cart.component';
import { PizzaComponent } from './components/dashboard/category/pizza/pizza.component';
import { PasteComponent } from './components/dashboard/category/paste/paste.component';
import { PorcComponent } from './components/dashboard/category/porc/porc.component';
import { PuiComponent } from './components/dashboard/category/pui/pui.component';
import { CiorbeComponent } from './components/dashboard/category/ciorbe/ciorbe.component';
import { PesteComponent } from './components/dashboard/category/peste/peste.component';
import { AntreuriComponent } from './components/dashboard/category/antreuri/antreuri.component';
import { BauturiComponent } from './components/dashboard/category/bauturi/bauturi.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';

const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent },
{ path: 'dashboard', component: DashboardComponent }, { path: 'dashboard/profile', component: ProfileComponent },
{ path: '', redirectTo: 'login', pathMatch: "full" }, { path: 'dashboard/cart', component: CartComponent },
{ path: 'dashboard/category/pizza', component: PizzaComponent },
{ path: 'dashboard/category/paste', component: PasteComponent },
{ path: 'dashboard/category/porc', component: PorcComponent },
{ path: 'dashboard/category/pui', component: PuiComponent },
{ path: 'dashboard/category/ciorbe', component: CiorbeComponent },
{ path: 'dashboard/category/peste', component: PesteComponent },
{ path: 'dashboard/category/antreuri', component: AntreuriComponent },
{ path: 'dashboard/category/bauturi', component: BauturiComponent },
{ path: 'dashboard/orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
