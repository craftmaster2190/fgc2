export function bodyOf(event): any {
  if (typeof event.body === 'string') {
    return JSON.parse(event.body);
  }
  if (typeof event.body === 'object') {
    return event.body;
  }
  if (event.body == null) {
    return {};
  }

  throw new Error(
    'Unknown body type: ' + typeof event.body + ' - ' + event.body
  );
}
