export function arrayEquals<T>(a: Array<T>, b: Array<T>): boolean {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  a = a.slice().sort();
  b = b.slice().sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function indexOfOrUndefined<T>(
  array: Array<T>,
  find: T
): number | undefined {
  const index = array?.indexOf(find);
  return index != null && index > -1 ? index : undefined;
}

export function englishAndJoin<T>(array: Array<T>): string {
  if (array.length <= 1) {
    return array.join(', ');
  }
  return (
    array.slice(0, array.length - 1).join(', ') +
    ' and ' +
    array[array.length - 1]
  );
}
