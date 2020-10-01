import { Component, OnInit } from '@angular/core';
import { GameDataService } from './game-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public constructor(public readonly gameData: GameDataService) {}

  public ngOnInit(): void {}
}
