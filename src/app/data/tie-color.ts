import { SwipeInputArray } from '../swipe-select/swipe-select.component';

export enum TieColor {
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
}

export const TieColors = [
  TieColor.brown,
  TieColor.pink,
  TieColor.red,
  TieColor.purple,
  TieColor.black,
  TieColor.blue,
  TieColor.sky,
  TieColor.green,
  TieColor.orange,
  TieColor.yellow,
];

export const TieColorsSwipeArray: SwipeInputArray = TieColors.map(
  (tieColor) => TieColor[tieColor]
).map((color) => ({
  src: 'assets/ties/' + color + '-tie.jpg',
  name: color,
}));
