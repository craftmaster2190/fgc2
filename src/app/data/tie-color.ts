import { SwipeInputArray } from '../swipe-select/swipe-select.component';
import { capitalCase } from 'change-case';

export enum TieColor {
  'brown' = 'brown',
  'pink' = 'pink',
  'red' = 'red',
  'purple' = 'purple',
  'black' = 'black',
  'blue' = 'blue',
  'skyBlue' = 'sky-blue',
  'green' = 'green',
  'orange' = 'orange',
  'yellow' = 'yellow',
}

export const TieColors = [
  TieColor.brown,
  TieColor.pink,
  TieColor.red,
  TieColor.purple,
  TieColor.black,
  TieColor.blue,
  TieColor.skyBlue,
  TieColor.green,
  TieColor.orange,
  TieColor.yellow,
];

export const TieColorsSwipeArray: SwipeInputArray = TieColors.map((color) => ({
  src: 'assets/ties/' + color + '-tie.jpg',
  name: capitalCase(color),
}));
