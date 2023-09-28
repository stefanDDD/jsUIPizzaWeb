import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', Validators.required],
      pass: ['', Validators.required]
    });

    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const isTokenValid = this.userService.verifyToken(savedToken);
      if (isTokenValid) {
        this.router.navigate(['./dashboard']);
      }
      else {
        console.log('Empty token. Generate a new one.');
      }
    }
  }

  loginSubmit() {
    const newUser = this.login.value;
    console.log(newUser);

    const data = {
      username: newUser.username,
      password: newUser.pass
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['./dashboard']);
      },
      (error) => {
        console.log(error);
        this.openDialog();
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  goToSignup() {
    this.router.navigate(['register']);
  }

}
