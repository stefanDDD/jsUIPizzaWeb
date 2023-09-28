import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AES } from 'crypto-js';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  ordersNum: any;
  constructor(private router: Router, private userService: UserService, private cartService: CartService) { }

  cardRows: any[] = [
    [
      { title: 'Pizza', image: 'assets/jpg/categoryPizza.png', route: 'pizza' },
      { title: 'Carne de porc', image: 'assets/jpg/categoryPorc.png', route: 'porc' }
    ],
    [
      { title: 'Paste', image: 'assets/jpg/categoryPaste.png', route: 'paste' },
      { title: 'Pui', image: 'assets/jpg/categoryPui.png', route: 'pui' }
    ],
    [
      { title: 'Ciorbe', image: 'assets/jpg/categoryCiorbe.png', route: 'ciorbe' },
      { title: 'Peste', image: 'assets/jpg/categoryPeste.png', route: 'peste' }
    ],
    [
      { title: 'Antreuri', image: 'assets/jpg/categoryAntreuri.png', route: 'antreuri' },
      { title: 'Bauturi', image: 'assets/jpg/categoryBauturi.png', route: 'bauturi' }
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
          this.ordersNum = this.cartService.getOrdersNum();
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
  orders(): void {
    this.router.navigate(['./dashboard/orders']);
  }

}
