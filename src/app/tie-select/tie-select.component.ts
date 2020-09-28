import { Component, OnInit } from '@angular/core';
import { SwipeInputArray } from '../swipe-select/swipe-select.component';

@Component({
  selector: 'app-tie-select',
  templateUrl: './tie-select.component.html',
  styleUrls: ['./tie-select.component.scss'],
})
export class TieSelectComponent implements OnInit {
  selectedTie;
  ties: SwipeInputArray = [
    'brown',
    'pink',
    'red',
    'purple',
    'black',
    'blue',
    'sky',
    'green',
    'orange',
    'yellow',
  ].map((color) => ({
    src: 'assets/ties/' + color + '-tie.jpg',
    name: color,
  }));

  constructor() {}

  ngOnInit(): void {}
}
