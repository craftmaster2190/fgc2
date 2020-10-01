import { Component, OnInit } from '@angular/core';
import { ServerBusService } from '../websocket/server-bus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public constructor(private readonly serverBus: ServerBusService) {
    this.serverBus.connect().subscribe();
    this.serverBus.send({ type: 'init' });
    this.serverBus.send({ type: 'test' });
    this.serverBus.send({ action: 'answer', answers: { test: 'test' } });
  }

  public ngOnInit(): void {}
}
