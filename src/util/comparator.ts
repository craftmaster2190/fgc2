export function comparator<T>(a: T, b: T): number {
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
}

export function compareFor<T, C>(mapper: (t: T) => C): (a: T, b: T) => number {
  return (a, b) => comparator(mapper(a), mapper(b));
}
