import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = 'http://localhost:3333/api';
  private _welcomeUrl = `${this.url}/welcome`;
  private _adminUrl = `${this.url}/admin`;

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._welcomeUrl);
  }

  getSpecialEvents() {
    return this.http.get<any>(this._adminUrl);
  }

}
