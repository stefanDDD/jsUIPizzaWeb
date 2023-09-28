import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  text: string = '';
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      this.router.navigate(['./login']);
    } else {
      this.userService.verifyToken(token).subscribe(
        (response: any) => {
          console.log("Token VALID");
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
  modify(): void {
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
    this.username = this.userService.decodeToken().username;
    this.email = this.userService.decodeToken().e_mail;
    this.name = this.userService.decodeToken().full_name;
    this.address = this.userService.decodeToken().address;
    this.phone = this.userService.decodeToken().phone_number;
    this.text = `
  <h2 class="titleInfo">User info</h2>
  <p><strong>Username:</strong> ${this.username}</p>
  <p><strong>Email:</strong> ${this.email}</p>
  <p><strong>Full name:</strong> ${this.name}</p>
  <p><strong>Address:</strong> ${this.address}</p>
  <p><strong>Phone number:</strong> ${this.phone}</p>
`;

  }
}
