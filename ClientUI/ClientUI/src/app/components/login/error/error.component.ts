import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  isVisible: boolean = true;

  ngOnInit(): void { }
  closeError(): void {
    console.log("User authenticated.")
    this.isVisible = false;
  }
}
