import { Component, OnInit } from '@angular/core';
import { ServerBusService } from '../websocket/server-bus.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public constructor(public readonly serverBus: ServerBusService) {}

  public ngOnInit(): void {}
}
