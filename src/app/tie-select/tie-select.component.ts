import { Component, OnInit } from '@angular/core';
import { TieColorsSwipeArray } from '../data/tie-color';

@Component({
  selector: 'app-tie-select',
  templateUrl: './tie-select.component.html',
  styleUrls: ['./tie-select.component.scss'],
})
export class TieSelectComponent implements OnInit {
  public selectedTie;
  public ties = TieColorsSwipeArray;

  public constructor() {}

  public ngOnInit(): void {}
}
