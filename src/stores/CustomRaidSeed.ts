import { writable, type Writable } from 'svelte/store';

export const fileUploadContent: Writable<string> = writable('');
