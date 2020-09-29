import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TieColor, TieColors, TieColorsSwipeArray } from '../data/tie-color';
import { indexOfOrUndefined } from '../../util/arrays';

@Component({
  selector: 'app-tie-select',
  templateUrl: './tie-select.component.html',
  styleUrls: ['./tie-select.component.scss'],
})
export class TieSelectComponent implements OnChanges {
  public selectedTieIndex: number;
  @Input() public selectedTie: TieColor;
  @Output() public selectedTieChange = new EventEmitter<TieColor>();
  public ties = TieColorsSwipeArray;

  public constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTie) {
      this.selectedTieIndex = indexOfOrUndefined(TieColors, this.selectedTie);
    }
  }

  public onSwipeUpdateTie(index): void {
    this.selectedTieIndex = index;
    this.selectedTie = TieColors[this.selectedTieIndex];
    this.selectedTieChange.emit(this.selectedTie);
  }
}
