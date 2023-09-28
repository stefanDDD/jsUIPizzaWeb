import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderinfoComponent } from './orderinfo/orderinfo.component';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  username: string = '';
  ordersText: string = '';
  currentOrder: any[] = [];
  oldOrders: any[] = [];

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog, private orderService: OrdersService) { }
  isVisible: boolean = this.orderService.getBdialog();
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      this.router.navigate(['./login']);
    } else {
      this.userService.verifyToken(token).subscribe(
        (response: any) => {
          console.log("Token VALID");
          const username = this.userService.decodeToken().username;
          console.log('Username:', username);
          this.username = username;
          this.ordersText += "Orders";
          this.userService.getOrders(username, 'order_id').subscribe(
            (data: any[]) => {
              if (data.length === 0) {
                this.ordersText = 'No orders found.';
              } else {
                this.ordersText = this.displayOrders(data);
              }
            },
            (error) => {
              console.log('Error:', error);
            }
          );
        },
        (error) => {
          console.log(error);
          localStorage.removeItem('token');
          this.router.navigate(['./login']);
        }
      );
    }
    interval(5000).subscribe(() => {
      this.currentOrder.length = 0;
      this.oldOrders.length = 0;
      this.orderStatus();
    });

  }

  addNewOrderCard(orderid: string, address: string, total: string, status: string): void {
    const newCard = { orderid, address, total, status };
    this.currentOrder.push([newCard]);
  }

  addOldOrderCard(orderid: string, address: string, total: string, status: string): void {
    const newCard = { orderid, address, total, status };

    if (this.oldOrders.length === 0 || this.oldOrders[this.oldOrders.length - 1].length === 2) {
      this.oldOrders.push([newCard]);
    } else {
      this.oldOrders[this.oldOrders.length - 1].push(newCard);
    }
  }

  displayOrders(orders: any[]): string {
    let recent = false;
    let ordersText = '';
    if (orders.length === 0) {
      ordersText = 'No orders found.';
    } else {
      orders.forEach((order, index) => {
        if (recent == false) {
          this.addNewOrderCard(order.order_id, order.address, `Total ${order.total}Ron`, order.status);
          recent = true;
        }
        else {
          this.addOldOrderCard(order.order_id, order.address, `Total ${order.total}Ron`, order.status);
        }
      });
    }
    return ordersText;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['./login']);
  }
  home(): void {
    this.router.navigate(['./dashboard']);
  }
  profile(): void {
    this.router.navigate(['./dashboard/profile']);
  }
  cart(): void {
    this.router.navigate(['./dashboard/cart']);
  }
  orders(): void {
    console.log("Orders")
  }

  orderStatus(): void {
    this.ordersText = '';
    this.userService.getOrders(this.username, 'status').subscribe(
      (data: any[]) => {
        if (data.length === 0) {
          this.ordersText = 'No orders found.';
        } else {
          this.ordersText = this.displayOrders(data);
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  orderOrderId(): void {
    this.userService.getOrders(this.username, 'order').subscribe(
      (data: any[]) => {
        if (data.length === 0) {
          this.ordersText = 'No orders found.';
        } else {
          this.ordersText = this.displayOrders(data);
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  openDialog(orderId: number): void {
    if (this.orderService.getBdialog() == false) {
      this.orderService.setOrderId(orderId);
      const dialog = this.dialog.open(OrderinfoComponent);
      this.orderService.setBdialog(true);
      this.isVisible = this.orderService.getBdialog();
      dialog.afterClosed().subscribe(() => {
      });
    }

  }

}
