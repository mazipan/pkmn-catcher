import { BASE_ENDPOINT, ENDPOINTS, TYPE_COLOR } from './constants';

import { PokemonListItem, PokemonListItemParsed, PokemonType } from '~/types/Pokemon';

export function pokemonListMapper(pokemon: PokemonListItem): PokemonListItemParsed {
  const id = pokemon.url.replace(BASE_ENDPOINT + ENDPOINTS.POKEMON, '').replaceAll('/', '');
  const idNumber = parseInt(id, 10);
  const dreamWorld = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idNumber}.svg`;

  return {
    ...pokemon,
    id: idNumber,
    sprites: {
      back_default: '',
      back_female: '',
      back_shiny: '',
      back_shiny_female: '',
      front_default: '',
      front_female: '',
      front_shiny: '',
      front_shiny_female: '',
      other: {
        dream_world: {
          front_default: dreamWorld,
        },
      },
    },
  };
}

export function pokemonTypeMapper(pokemonType: PokemonType) {
  const name = pokemonType.type.name;
  const badge = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${name}.svg`;
  const color = TYPE_COLOR[name] || '#A0A29F';

  return {
    ...pokemonType,
    type: {
      ...pokemonType.type,
      badge,
      color,
    },
  };
}
