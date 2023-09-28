import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.component.html',
  styleUrls: ['./orderinfo.component.css']
})
export class OrderinfoComponent implements OnInit {
  isVisible: boolean = true;
  orderId: number = 0;
  orderInfo: string = '';
  orderFullname: string = '';
  orderUsername: string = '';
  orderPhoneNumber: string = '';
  orderAddress: string = '';
  orderItems: string = '';
  orderSent: string = '';
  orderTotal: string = '';
  orderArrival: string = '';
  constructor(private orderService: OrdersService) { };

  ngOnInit(): void {
    this.orderId = this.orderService.getOrderId();
    this.getOrderInfo();

    interval(5000).subscribe(() => {
      this.getOrderInfo();
    })


  }
  closeError(): void {
    this.orderService.setBdialog(false);
    this.isVisible = false;
  }

  getOrderInfo(): void {
    this.orderService.getOrderInfo(this.orderId).subscribe(
      (data: any) => {
        this.orderUsername = data[0].username;
        this.orderPhoneNumber = data[0].phone_number;
        this.orderAddress = data[0].address;
        this.orderFullname = data[0].full_name;
        this.orderInfo = data[0].status;
        this.orderSent = data[0].timestamp;
        this.orderTotal = data[0].total;
        this.orderArrival = data[0].arrivalTime;
        this.orderItems = data[0].items.reduce((text: string, item: any) => {
          return text + item.itemInfo + '\n\n';
        }, '');
      },
      (error) => {
        console.log(error);
      }

    );
  }
}
