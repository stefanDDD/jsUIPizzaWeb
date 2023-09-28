import { Injectable } from '@angular/core';
import { } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from 'src/environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private bdialog: boolean = false;
  private orderId: number = 0;
  url = environments.apiUrl;

  constructor(private http: HttpClient) { };

  getOrderInfo(orderId: any): Observable<any> {
    const url = `${this.url}/user/orderinfo/${orderId}`;
    return this.http.get<any>(url);
  }

  getBdialog(): boolean {
    return this.bdialog;
  }
  setBdialog(value: boolean): void {
    this.bdialog = value;
  }
  setOrderId(value: number): void {
    this.orderId = value;
  }
  getOrderId(): number {
    return this.orderId;
  }
}
