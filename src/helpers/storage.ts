import localForage from 'localforage';

import { STORAGE_DB } from './constants';

import { PokemonListItemParsed } from '~/types/Pokemon';

localForage.config({
  driver: process.env.NODE_ENV === 'test' ? localForage.LOCALSTORAGE : localForage.INDEXEDDB,
  name: STORAGE_DB.BOOKMARK,
  version: 1.0,
});

export async function getFromStorage<Type>(key: string): Promise<Type | null> {
  try {
    const result = await localForage.getItem<Type>(key);
    return result;
  } catch (error) {
    console.debug(`Failed to get storage ${key}`, error);
  }
  return null;
}

export async function getBookmarks(): Promise<PokemonListItemParsed[] | null> {
  return await getFromStorage<PokemonListItemParsed[]>(STORAGE_DB.BOOKMARK);
}

export async function addToBookmark(pokemon: PokemonListItemParsed): Promise<void> {
  const existing: PokemonListItemParsed[] | null = await getBookmarks();

  if (existing) {
    await localForage.setItem(STORAGE_DB.BOOKMARK, [...existing, ...[pokemon]]);
  } else {
    await localForage.setItem(STORAGE_DB.BOOKMARK, [pokemon]);
  }
}

export async function removeFromBookmark(poke: PokemonListItemParsed): Promise<void> {
  const existing: PokemonListItemParsed[] | null = await getBookmarks();

  if (existing) {
    await localForage.setItem(
      STORAGE_DB.BOOKMARK,
      (existing || []).filter((item) => item.id !== poke.id),
    );
  }
}

export async function isExistInBookmark(itemId: number): Promise<boolean> {
  const existing: PokemonListItemParsed[] | null = await getBookmarks();

  if (existing) {
    const matchItem = existing.find((item: PokemonListItemParsed) => item.id === itemId);
    return Boolean(matchItem);
  }

  return false;
}
