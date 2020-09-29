import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export function transpose<T extends StringMap>(obj: T): StringMap {
  return Object.keys(obj).reduce((prev, key) => {
    const value = obj[key];
    prev[value] = key;
    return prev;
  }, {});
}
