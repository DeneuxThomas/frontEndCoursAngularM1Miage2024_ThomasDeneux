import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignements/assignment.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatIconModule,
    MatSidenavContainer,
    MatNavList,
    MatToolbar,
    MatListItem,
    MatSidenav,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  // Ajout d'une référence pour le sidenav
  toggleSidenav(sidenav: any) {
    sidenav.toggle();
  }

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const login = 'admin';
    const password = 'adminpass';

    if (!this.authService.isLogged()) {
      if (this.authService.logIn(login, password)) {
        console.log('Login successful');
        console.log('User role:', this.authService.getRole());
      } else {
        console.log('Login failed');
      }
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }
}
