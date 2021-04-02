import { Component, Input, OnInit } from '@angular/core';
import {
  PersonCorrectsValuesData,
  PersonData,
} from '../game/game-data.service';

@Component({
  selector: 'app-person-selector-container',
  templateUrl: './person-selector-container.component.html',
  styleUrls: ['./person-selector-container.component.scss'],
})
export class PersonSelectorContainerComponent implements OnInit {
  @Input() public person: PersonData;
  @Input() public correct?: Partial<PersonCorrectsValuesData>;
  @Input() public disabled: boolean;

  public constructor() {}

  public ngOnInit(): void {}
}
