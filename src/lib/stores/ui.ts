// src/lib/stores/path.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'ui';

export type UILayout = "Grid" | "List" | "Column";

export type UIOptions = {
    layout: UILayout
}

export let defaultUIOptions = {
    layout: "Grid" as UILayout
}

// UI Options Store
function createUIOptionsStore() {
	const initial: UIOptions = browser
		? JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultUIOptions))
		: defaultUIOptions;

	const { subscribe, set, update } = writable<UIOptions>(initial);

	if (browser) {
		subscribe((value) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		});
	}

	return {
		subscribe,
		setLayout: (layout: UILayout) =>
			update((opts) => {
				const updated = { ...opts, layout };
				return updated;
			}),
		reset: () => set(defaultUIOptions)
	};
}

export const uiOptions = createUIOptionsStore();
