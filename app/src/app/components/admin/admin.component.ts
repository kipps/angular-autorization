import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AuthorizationService} from '../../services/authorization.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  userSet = {};
  constructor(private _auth: AuthorizationService, private _specialEventService: EventService, private _router: Router) {
  }

  ngOnInit() {
    this._specialEventService.getSpecialEvents()
      .subscribe(res => this.users = res, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      });
  }

  loginUser() {
    this._auth.loginUser(this.userSet)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user.email);
          this._router.navigate(['/admin']);
        },
        err => console.log(err));
    // console.log(this.userSet);
  }

}
