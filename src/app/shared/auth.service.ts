import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  users = [
    { login: 'admin', password: 'admin123', role: 'admin' },
    { login: 'user', password: 'user123', role: 'user' },
  ];

  LoggedIn = false;
  private currentRole: string | null = null;

  logIn(login: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.login === login && u.password === password
    );
    if (user) {
      this.LoggedIn = true;
      this.currentRole = user.role
      console.log('User role:', this.currentRole);
      return true;
    }
    return false;
  }

  logOut() {
    this.LoggedIn = false;
    this.currentRole = null;
  }

  isLogged(): boolean {
    return this.LoggedIn;
  }

  isAdmin(): boolean {
    return this.currentRole === 'admin';
  }

  getRole(): string | null {
    return this.currentRole;
  }
}
