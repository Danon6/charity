import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">WhatsApp Clone</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/donate">Donate</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/blog">Blog</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="!isAuthenticated">
              <a class="nav-link" routerLink="/login">Login</a>
            </li>
            <li class="nav-item" *ngIf="isAuthenticated">
              <a class="nav-link" routerLink="/chat">Chat</a>
            </li>
            <li class="nav-item" *ngIf="isAuthenticated">
              <a class="nav-link" (click)="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-link {
      cursor: pointer;
    }
  `]
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
