import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './components/login/error/error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { OrdSendMsgComponent } from './components/dashboard/cart/ord-send-msg/ord-send-msg.component';
import { ErrorCartComponent } from './components/dashboard/cart/error-cart/error-cart.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { OrderinfoComponent } from './components/dashboard/orders/orderinfo/orderinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ErrorComponent,
    ProfileComponent,
    CartComponent,
    PizzaComponent,
    PasteComponent,
    PorcComponent,
    PuiComponent,
    CiorbeComponent,
    PesteComponent,
    AntreuriComponent,
    BauturiComponent,
    OrdSendMsgComponent,
    ErrorCartComponent,
    OrdersComponent,
    OrderinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
