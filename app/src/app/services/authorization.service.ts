import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  serverUrl = 'http://localhost:3333/api';

  private _registrationUrl = `${this.serverUrl}/register`;
  private _loginUrl = `${this.serverUrl}/login`;

  constructor(private http: HttpClient, private _router: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this._registrationUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // Method adds token to localstorage
  getToken() {
    return localStorage.getItem('token');
  }

  // All data remove from localstorage
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/']);
  }

  // Method adds user name to header
  userName() {
    return localStorage.getItem('user');
  }
}
