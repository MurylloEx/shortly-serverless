import { posix } from 'path';

export function Lambda(path: string) {
  return posix.join('packages/lambda/functions', path);
}
