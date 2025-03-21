import { writable } from 'svelte/store';

export const apiDataStore = writable({});

export const levelsStore = writable({"mixing": {}, "solution": {}});

export const connectedStore = writable([]);
