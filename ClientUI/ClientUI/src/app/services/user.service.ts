import { Injectable } from '@angular/core';
import { } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environments.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  addNewOrder(user_id: any, total: any) {
    const data = {
      user_id: user_id,
      total: total
    };
    return this.httpClient.post(this.url + '/user/addneworder', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  sentCart(user_id: string, item_id: number, quantity: number) {
    const data = {
      user_id: user_id,
      item_id: item_id,
      quantity: quantity
    };

    console.log(data);

    return this.httpClient.post(this.url + '/user/sendcart', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  checkToken() {
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  getOrders(username: any, order: string): Observable<any[]> {
    const url = `${this.url}/user/orderstatus/${username}`;
    return this.httpClient.get<any[]>(url);
  }

  getOrderInfo(orderId: any): Observable<any> {
    const url = `${this.url}/user/orderstatus/${orderId}`;
    return this.httpClient.get<any>(url);
  }

  verifyToken(token: string) {
    const data = { token: token };

    return this.httpClient.post(this.url + '/user/verifyToken', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken;
    }
    return null;
  }

}
