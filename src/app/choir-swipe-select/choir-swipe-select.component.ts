import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ChoirColor,
  ChoirColors,
  ChoirColorsSwipeArray,
} from '../data/choir-color';
import { indexOfOrUndefined } from '../../util/arrays';

const choirColorInit = (color, suffix) => ({
  src: `assets/choir/${color}.${suffix}`,
  name: color,
});

@Component({
  selector: 'app-choir-swipe-select',
  templateUrl: './choir-swipe-select.component.html',
  styleUrls: ['./choir-swipe-select.component.scss'],
})
export class ChoirSwipeSelectComponent implements OnChanges {
  public selectedIndex: number;
  public readonly choirColors = ChoirColorsSwipeArray;
  @Input() public selectedColor: ChoirColor;
  @Output() public selectedColorChange = new EventEmitter<ChoirColor>();
  @Input() public correct?: Set<string>;
  @Input() public disabled: boolean;

  public constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedColor) {
      this.selectedIndex = indexOfOrUndefined(ChoirColors, this.selectedColor);
    }
  }

  public getColorName(): string {
    return this.choirColors[this.selectedIndex]?.name;
  }

  public selectedIndexChange(index: number): void {
    this.selectedIndex = index;
    this.selectedColor = ChoirColors[this.selectedIndex];
    this.selectedColorChange.emit(this.selectedColor);
  }
}
