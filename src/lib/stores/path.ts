// src/lib/stores/path.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'path';

function createPathStore() {
	const initial: string[] = browser
		? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
		: [];

	const store = writable<string[]>(initial);

	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		});
	}

	return store;
}

export const path = createPathStore();
