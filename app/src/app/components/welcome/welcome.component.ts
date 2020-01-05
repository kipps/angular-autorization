import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  events = [];

  constructor(private _eventService: EventService) {
  }

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(res => this.events = res, err => console.error(err));
  }

}
