import { bodyOf } from './bodyOf';

export function getUser(event): { userId: string } {
  const userId = bodyOf(event).userId;
  if (!userId) {
    throw new Error('No userId!');
  }
  return { userId };
}
