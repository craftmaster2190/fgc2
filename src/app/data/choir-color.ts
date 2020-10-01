import { SwipeInputArray } from '../swipe-select/swipe-select.component';
import { capitalCase } from 'change-case';

export enum ChoirColor {
  'black' = 'black',
  'blueSky' = 'blue-sky',
  'blueTeal' = 'blue-teal',
  'blue' = 'blue',
  'pastelBright' = 'pastel-bright',
  'pastelDark' = 'pastel-dark',
  'pastelNeutral' = 'pastel-neutral',
  'pastelPinkValentines' = 'pastel-pink-valentines',
  'purpleLight' = 'purple-light',
  'purpleNeutral' = 'purple-neutral',
  'purple' = 'purple',
  'redBright' = 'red-bright',
  'redDark' = 'red-dark',
  'redMauve' = 'red-mauve',
  'redPink' = 'red-pink',
  'white' = 'white',
}

export const ChoirColors = [
  ChoirColor.black,
  ChoirColor.blueSky,
  ChoirColor.blueTeal,
  ChoirColor.blue,
  // ChoirColor.pastelBright,
  // ChoirColor.pastelDark,
  ChoirColor.pastelNeutral,
  ChoirColor.pastelPinkValentines,
  ChoirColor.purpleLight,
  // ChoirColor.purpleNeutral,
  ChoirColor.purple,
  ChoirColor.redBright,
  // ChoirColor.redDark,
  ChoirColor.redMauve,
  ChoirColor.redPink,
  ChoirColor.white,
];

export const ChoirColorsSwipeArray: SwipeInputArray = ChoirColors.map(
  (color) => ({
    src: 'assets/choir/' + color + '.png',
    name: capitalCase(color),
  })
);
