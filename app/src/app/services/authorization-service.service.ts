import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {

  serverUrl = 'http://localhost:3333/api';

  private _registrationUrl = `${this.serverUrl}/register`;
  private _loginUrl = `${this.serverUrl}/login`;

  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    return this.http.post<any>(this._registrationUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }


}
