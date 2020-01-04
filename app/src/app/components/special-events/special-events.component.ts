import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private _specialEventService: EventService) {
  }

  ngOnInit() {
    this._specialEventService.getSpecialEvents()
      .subscribe(res => this.specialEvents = res, err => console.error(err));
  }

}
