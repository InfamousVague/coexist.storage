import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { PredefinedColor, type Color } from 'june-uikit';

const STORAGE_KEY = 'primaryColor';

function createPrimaryColorStore() {
  const defaultColor = PredefinedColor.BrewedMustard;

  const initial = browser
    ? (localStorage.getItem(STORAGE_KEY) as Color) ?? defaultColor
    : defaultColor;

  const store = writable<Color>(initial);

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(STORAGE_KEY, value);
      document.documentElement.style.setProperty('--color-primary', `var(--${value})`);
    });
  }

  return store;
}

export const primaryColor = createPrimaryColorStore();
