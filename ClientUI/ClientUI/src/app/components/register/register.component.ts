import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: any = FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  registerSubmit() {
    const newUser = this.register.value;
    console.log(newUser);

    var data = {
      username: newUser.username,
      full_name: newUser.fullname,
      e_mail: newUser.email,
      phone_number: newUser.phone,
      address: newUser.address,
      password: newUser.pass
    }
    this.userService.signup(data).subscribe((response: any) => {
      this.router.navigate(['./dashboard']);
    }, (error) => {
      console.log(error);
    })
  }
  goToLogin() {
    this.router.navigate(['login']);
  }

}
