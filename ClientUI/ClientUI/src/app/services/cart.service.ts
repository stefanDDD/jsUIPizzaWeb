import { CartComponent } from '../components/dashboard/cart/cart.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private shoppingCart: any[] = [];
  private ordersNum: number = 0;
  constructor() { }

  addToCartService(itemName: any, itemId: number, quantity: number, price: number): void {
    if (quantity > 0) {
      this.shoppingCart.push({ itemName: itemName, itemId: itemId, quantity: quantity, price: price });
      this.ordersNum += quantity;
    }
  }

  getShoppingCart(): any[] {
    return this.shoppingCart;
  }

  getOrdersNum(): any {
    return this.ordersNum;
  }
  deleteNum(): void {
    this.ordersNum = 0;
  }

}
