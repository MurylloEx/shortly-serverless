import 'reflect-metadata';

function now() {
  return new Date().toISOString();
}

export const Time = { now };
