import { writable } from 'svelte/store';

const player = writable({ name: null, scores: 0 });

export default player;
