import { Component } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login-assignment',
  standalone: true,
  imports: [
    FormsModule,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatInput,
    MatButton
  ],
  templateUrl: './login-assignment.component.html',
  styleUrl: './login-assignment.component.css'
})
export class LoginAssignmentComponent {
  login = '';
  password = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.logIn(this.login, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
}
