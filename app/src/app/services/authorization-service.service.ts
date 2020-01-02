import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {

  private _registrationUrl = 'http://localhost:3333/api/register';
  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    return this.http.post<any>(this._registrationUrl, user);
  }
}
