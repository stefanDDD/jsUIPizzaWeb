import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorCartComponent } from './error-cart/error-cart.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCart: any[] = [];

  userid: string = '';
  username: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  text: string = '';

  constructor(private router: Router, private userService: UserService, private cartService: CartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    console.log(token);
    if (!token) {
      this.router.navigate(['./login']);
    } else {
      this.userService.verifyToken(token).subscribe(
        (response: any) => {
          console.log("Token VALID");
          const username = this.userService.decodeToken();
          console.log('Username:', username);
          this.updateInfo();
        },
        (error) => {
          console.log(error);
          localStorage.removeItem('token');
          this.router.navigate(['./login']);
        }
      );
    }

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
  updateInfo(): void {
    this.userid = this.userService.decodeToken().user_id;
    this.username = this.userService.decodeToken().username;
    this.email = this.userService.decodeToken().e_mail;
    this.name = this.userService.decodeToken().full_name;
    this.address = this.userService.decodeToken().address;
    this.phone = this.userService.decodeToken().phone_number;
    this.shoppingCart = this.cartService.getShoppingCart();
  }

  addToCart(item_id: number, quantity: number): void {
    console.log(this.userid);
    this.shoppingCart.push({ user_id: this.userid, item_id, quantity });
  }
  deleteCart(): void {
    this.shoppingCart.length = 0;
    this.cartService.deleteNum();
  }
  sendCart(): void {
    if (this.shoppingCart.length < 1) {
      this.openDialog();
    } else {
      this.userService.addNewOrder(this.userid, this.getTotal()).subscribe(
        (response: any) => {
          console.log("Order sent.");
          this.shoppingCart.forEach(item => {
            this.userService.sentCart(this.userid, item.itemId, item.quantity).subscribe(
              (response: any) => {
                console.log(`Item sent: user_id=${item.itemId}, item_id=${item.itemId}, quantity=${item.quantity}`);
              },
              (error) => {
                console.log(`Error sending item: user_id=${this.userid}, item_id=${item.id}`, error);
                console.log(error);
                this.openDialog();
              }
            );
          });
          this.deleteCart();
          this.cartService.deleteNum();
        },
        (error) => {
          console.log(error);
          this.openDialog();
        }
      );
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorCartComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  getTotal(): number {
    let total = 0;

    for (const item of this.shoppingCart) {
      total += item.quantity * item.price;
    }
    return total;
  }

}
