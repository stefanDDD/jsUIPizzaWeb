import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-cart',
  templateUrl: './error-cart.component.html',
  styleUrls: ['./error-cart.component.css']
})
export class ErrorCartComponent implements OnInit {
  isVisible: boolean = true;

  ngOnInit(): void { }
  closeError(): void {
    console.log("User authenticated.")
    this.isVisible = false;
  }
}
