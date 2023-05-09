import type { Cache } from 'swr';

import { STORAGE_DB } from './helpers/constants';

export default function storageProvider(): Cache<unknown> {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem(STORAGE_DB.MAIN_DB) || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(STORAGE_DB.MAIN_DB, appCache);
  });

  // We still use the map for write & read for performance.
  return map as Cache;
}
