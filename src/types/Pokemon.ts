export interface BasePokeItem {
  name: string;
  url: string;
}

export interface PokemonTypeItemExtended extends BasePokeItem {
  badge?: string;
  color?: string;
}

export interface PokemonType {
  slot: number;
  type: PokemonTypeItemExtended;
}

export interface PokemonAbility {
  slot: number;
  ability: BasePokeItem;
}

export interface PokemonMove {
  move: BasePokeItem;
}

export interface PokemonStat {
  stat: BasePokeItem;
  effort: number;
  base_stat: number;
}

export interface PokemonSpriteOther {
  dream_world?: {
    front_default: string;
    front_female?: string;
  };
  home?: {
    front_default: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
  };
  ['official-artwork']?: {
    front_default: string;
    front_shiny?: string;
  };
}

export interface PokemonSprites {
  back_default: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: PokemonSpriteOther;
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  base_experience: number;
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: PokemonSprites;
  weight: number;
}

export type PokemonListItem = Pick<Pokemon, 'url' | 'name'>;
export type PokemonListItemParsed = Pick<Pokemon, 'url' | 'name' | 'id' | 'sprites'>;
