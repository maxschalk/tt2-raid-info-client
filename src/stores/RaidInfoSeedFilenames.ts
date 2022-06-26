import { writable } from 'svelte/store';

export type SeedFilenames = string[];

export const seedFilenames = writable<SeedFilenames>([]);
