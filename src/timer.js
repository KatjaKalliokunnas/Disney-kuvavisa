import { readable } from 'svelte/store';

const STARTVALUE = 20;
let value = STARTVALUE;

const countdown = readable(value, (set) => {
  const interval = setInterval(() => {
    set(--value);
  }, 1000);

  return () => {
    clearInterval(interval);
    value = STARTVALUE;
    set(value);
  };
});

export default countdown;
