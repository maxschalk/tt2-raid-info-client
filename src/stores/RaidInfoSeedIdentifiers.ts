// TODO Probably not needed

import { writable } from 'svelte/store';

export type SeedIdentifiers = string[];

export const seedIdentifiers = writable<SeedIdentifiers>([]);
