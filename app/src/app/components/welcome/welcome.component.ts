import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  users = [];

  constructor(private _eventService: EventService, private _authServer: AuthorizationService) {
  }

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(res => this.users = res, err => console.error(err));
  }

}
