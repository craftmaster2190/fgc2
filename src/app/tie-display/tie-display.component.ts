import { Component, Input, OnInit } from '@angular/core';
import { TieColor, TieColors, TieColorsSwipeArray } from '../data/tie-color';
import { indexOfOrUndefined } from '../../util/arrays';

@Component({
  selector: 'app-tie-display',
  templateUrl: './tie-display.component.html',
  styleUrls: ['./tie-display.component.scss'],
})
export class TieDisplayComponent implements OnInit {
  @Input() public tieColor: TieColor;

  public constructor() {}

  public get src(): string {
    return TieColorsSwipeArray[indexOfOrUndefined(TieColors, this.tieColor)]
      ?.src;
  }

  public ngOnInit(): void {}
}
