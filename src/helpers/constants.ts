export const BASE_ENDPOINT = 'https://pokeapi.co/api/v2';

export const ENDPOINTS = {
  POKEMON: '/pokemon',
};

export const STORAGE_DB = {
  MAIN_DB: 'pkmn-cache',
  BOOKMARK: 'pkmn-bookmark',
};

export const PAGINATION = {
  SIZE: 20,
  INITAL_OFFSET: 0,
};

// Based on: https://github.com/duiker101/pokemon-type-svg-icons/blob/master/style.css
export const TYPE_COLOR: Record<string, string> = {
  normal: '#A0A29F',
  fighting: '#D3425F',
  flying: '#A1BBEC',
  poison: '#B763CF',
  ground: '#DA7C4D',
  rock: '#C9BB8A',
  bug: '#92BC2C',
  ghost: '#5F6DBC',
  steel: '#5695A3',
  fire: '#FBA54C',
  water: '#539DDF',
  grass: '#5FBD58',
  electric: '#F2D94E',
  psychic: '#FA8581',
  ice: '#75D0C1',
  dragon: '#0C69C8',
  dark: '#595761',
  fairy: '#EE90E6',
  unknown: '#A0A29F',
  shadow: '#A0A29F',
};
