import { Component, OnInit } from '@angular/core';
import { SwipeInputArray } from '../swipe-select/swipe-select.component';
import { ChoirColorsSwipeArray } from '../data/choir-color';

const choirColorInit = (color, suffix) => ({
  src: `assets/choir/${color}.${suffix}`,
  name: color,
});

@Component({
  selector: 'app-choir-swipe-select',
  templateUrl: './choir-swipe-select.component.html',
  styleUrls: ['./choir-swipe-select.component.scss'],
})
export class ChoirSwipeSelectComponent implements OnInit {
  public selectedChoirColor;
  public choirColors = ChoirColorsSwipeArray;

  public constructor() {}

  public ngOnInit(): void {}

  public getColorName(): string {
    return this.choirColors[this.selectedChoirColor]?.name;
  }
}
