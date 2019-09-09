import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatusListener =  new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(res => {
      console.log(res);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
    .subscribe(res => {
      const token =  res.token;
      this.token = token;
      if (token) {
        const expiresInDuriation = res.expiresIn;
        this.setAuthTimer(expiresInDuriation);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuriation * 1000);
        console.log(expirationDate);
        this.saveAuthDate(token, expirationDate);
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthDate();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting time"+duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthDate(token: string, expiresInDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiresInDate.toISOString());
  }

  private clearAuthDate() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
