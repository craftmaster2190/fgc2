import { Component, OnInit } from '@angular/core';
import { ServerBusService } from '../websocket/server-bus.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public ngOnInit(): void {}
}
