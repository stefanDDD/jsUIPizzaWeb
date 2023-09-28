import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  username: string = '';
  userId: string = '';
  ordersNum: any;
  constructor(private router: Router, private userService: UserService, private cartService: CartService) { }

  cardRows: any[] = [
    [
      { title: 'Pizza Casei', image: './assets/jpg/categoryPizza/pizzaalex.jpg', id: 1, quantity: 0, price: 30, description: '– sos de roșii, mozzarella, șuncă, bacon, salam, măsline' },
      { title: 'Pizza Quatro Stagioni', image: './assets/jpg/categoryPizza/pizza4stagioni.jpg', id: 3, quantity: 0, price: 25, description: '– sos de roșii, mozzarella, șuncă, ciuperci, măsline, ardei, porumb' }
    ],
    [
      { title: 'Pizza Hawai', image: './assets/jpg/categoryPizza/pizzahawai.jpg', id: 2, quantity: 0, price: 30, description: '– mozzarella, șuncă, ananas' },
      { title: 'Pizza Margherita', image: './assets/jpg/categoryPizza/pizzamargherita.jpg', id: 4, quantity: 0, price: 23, description: '– sos de roșii, mozzarella, parmezan, oregano' }
    ],
    [
      { title: 'Pizza Prosciutto', image: './assets/jpg/categoryPizza/pizzaprosciuto.jpg', id: 5, quantity: 0, price: 26, description: '– sos de roșii, mozzarella, șuncă' },
      { title: 'Pizza Prosciutto Funghi', image: './assets/jpg/categoryPizza/pizzaprosciutofun.jpg', id: 6, quantity: 0, price: 27, description: '– sos de roșii, mozzarella, șuncă, ciuperci' }
    ],
    [
      { title: 'Pizza Capricioasa', image: './assets/jpg/categoryPizza/pizzacapricioasa.jpg', id: 7, quantity: 0, price: 28, description: '– sos de roșii, mozzarella, șuncă, ciuperci, măsline' },
      { title: 'Pizza 4Formagi', image: './assets/jpg/categoryPizza/pizza4fromagi.jpg', id: 8, quantity: 0, price: 29, description: '– mozzarella, gorgonzola, parmezan, brie' }
    ],
    [
      { title: 'Pizza Family', image: './assets/jpg/categoryPizza/pizzafamily.jpg', id: 9, quantity: 0, price: 85, description: '– sos de roșii, mozarella, șuncă, salam, bacon, măsline, porumb, măsline, ardei gras' },
      { title: 'Pizza 4Carne', image: './assets/jpg/categoryPizza/pizza4carne.jpg', id: 10, quantity: 0, price: 29, description: '– sos de roșii, mozzarella, suncă, salam, bacon, cârnați' }
    ],
    [
      { title: 'Pizza Prosciutto Rucola', image: './assets/jpg/categoryPizza/pizzaprosciutor.jpg', id: 11, quantity: 0, price: 30, description: '– sos de roșii, mozzarella, prosciutto, rucola, roșii' },
      { title: 'Pizza Tonno', image: './assets/jpg/categoryPizza/pizzatonno.jpg', id: 12, quantity: 0, price: 29, description: '– sos de roșii, mozzarella, ton, ceapă' }
    ],
    [
      { title: 'Pizza Toscana', image: './assets/jpg/categoryPizza/pizzatoscana.jpg', id: 13, quantity: 0, price: 28, description: '– sos de roșii, mozzarella, șuncă, bacon, ciuperci' },
      { title: 'Pizza Chicken', image: './assets/jpg/categoryPizza/pizzachicken.jpg', id: 14, quantity: 0, price: 29, description: '– sos de roșii, mozzarella, piept de pui, roșii' }
    ],
    [
      { title: 'Pizza Diavola', image: './assets/jpg/categoryPizza/pizzadiavola.jpg', id: 15, quantity: 0, price: 29, description: '– sos de roșii, mozzarella, salam, ardei iute' },
      { title: 'Pizza Salami', image: './assets/jpg/categoryPizza/pizzasalami.jpg', id: 16, quantity: 0, price: 30, description: '– sos de roșii, mozzarella, salam' }
    ],
    [
      { title: 'Pizza Taraneasca', image: './assets/jpg/categoryPizza/pizzataraneasca.jpg', id: 17, quantity: 0, price: 30, description: '– sos de roșii, brânză burduf, cârnați, bacon, ceapă roșie, ardei gras, porumb' },
      { title: 'Pizza Vegetariana', image: './assets/jpg/categoryPizza/pizzavegetariana.jpg', id: 18, quantity: 0, price: 27, description: '– sos de roșii, mozzarella, ciuperci, măsline, porumb, roșii' }
    ]
  ];

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.ordersNum = this.cartService.getOrdersNum();
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
      this.ordersNum = this.cartService.getOrdersNum();
    }
  }

  updateInfo(): void {
    this.userId = this.userService.decodeToken().user_id;
    this.username = this.userService.decodeToken().username;
  }


}
