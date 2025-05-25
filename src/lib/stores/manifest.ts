import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { manifest as mockManifest } from '$lib/mock/mock.js';
import type { Folder } from '$lib/types';

const STORAGE_KEY = 'manifest';

function createManifestStore() {
  const initial = browser
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') ?? structuredClone(mockManifest)
    : structuredClone(mockManifest);

  const store = writable<Folder>(initial);

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
  }

  return store;
}

export const manifest = createManifestStore();
