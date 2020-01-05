import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  specialEvents = [];

  constructor(private _specialEventService: EventService, private _router: Router) {
  }

  ngOnInit() {
    this._specialEventService.getSpecialEvents()
      .subscribe(res => this.specialEvents = res, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      });
  }

}
