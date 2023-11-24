import { writable } from 'svelte/store';

export const keyPressEvent = writable<KeyboardEvent | undefined>();
