import { Component, OnInit } from '@angular/core';
import { SwipeInputArray } from '../swipe-select/swipe-select.component';

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
  selectedChoirColor;
  choirColors: SwipeInputArray = [
    'black',
    'blue-sky',
    'blue-teal',
    'blue',
    'pastel-bright',
    'pastel-dark',
    'pastel-neutral',
    'pastel-pink-valentines',
    'purple-light',
    'purple-neutral',
    'purple',
    'red-bright',
    'red-dark',
    'red-mauve',
    'red-pink',
    'white',
  ].map((color) => ({ src: 'assets/choir/' + color + '.png', name: color }));

  constructor() {}

  ngOnInit(): void {}
}
