import { paths as worldPaths } from 'jvectormap-content/world-merc';
import { paths as usaPaths } from 'jvectormap-content/us-merc';

export const CountryNames: Array<string> = Object.keys(worldPaths).map(
  (key) => worldPaths[key].name
);
export const StateNames: Array<string> = Object.keys(usaPaths).map(
  (key) => usaPaths[key].name
);
