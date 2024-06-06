import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';
  private registerUrl = 'http://localhost:8080/signup';
  username = new BehaviorSubject<string>('');
  role = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  login(credentials: any) {
    return this.http.post(this.loginUrl, credentials);
  }

  register(user: any) {
    return this.http.post(this.registerUrl, user);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('jwtToken');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  forgotPassword(username: string) {
    return this.http.post('http://localhost:8080/login/forgot-password', { username });
  }


  resetPassword(token: string, newPassword: string) {
    return this.http.post('http://localhost:8080/login/reset-password', { token, newPassword });
  }
}
