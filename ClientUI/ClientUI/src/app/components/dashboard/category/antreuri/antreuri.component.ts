import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-antreuri',
  templateUrl: './antreuri.component.html',
  styleUrls: ['./antreuri.component.css']
})
export class AntreuriComponent implements OnInit {
  username: string = '';
  userId: string = '';
  constructor(private router: Router, private userService: UserService, private cartService: CartService) { }

  cardRows: any[] = [
    [
      { title: 'Pizza Casei', image: './assets/jpg/categoryPizza.png', id: 1, quantity: 0, price: 30 },
      { title: 'Pizza Quatro Stagioni', image: 'cart.png', id: 3, quantity: 0, price: 25 }
    ],
    [
      { title: 'Pizza Hawai', image: 'cart.png', id: 2, quantity: 0, price: 30 },
      { title: 'Card 4', image: 'cart.png', id: 5, quantity: 0 }
    ],
    [
      { title: 'Card 5', image: 'cart.png', id: 6, quantity: 0 },
      { title: 'Card 6', image: 'cart.png', id: 7, quantity: 0 }
    ],
    [
      { title: 'Card 7', image: 'cart.png', id: 8, quantity: 0 },
      { title: 'Card 8', image: 'cart.png', id: 9, quantity: 0 }
    ]
  ];

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

  decreaseQuantity(card: any) {
    if (card.quantity > 0) {
      card.quantity--;
    }
  }

  increaseQuantity(card: any) {
    card.quantity++;
  }

  addItemToCart(title: string, id: number, quantity: number, price: number, card: any) {
    if (card.quantity > 0) {
      console.log(`ItemId ${card.id}, itemName ${card.title}, quantity = ${card.quantity} , price = ${card.price * card.quantity} adaugat`);
      this.cartService.addToCartService(title, id, quantity, price);
      card.quantity = 0;
    }
  }

  updateInfo(): void {
    this.userId = this.userService.decodeToken().user_id;
    this.username = this.userService.decodeToken().username;
  }


}

