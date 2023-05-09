import { Loader, Stack } from '@mantine/core';
import { useCallback, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useSWR from 'swr';

import type { PokemonListItem, PokemonListItemParsed } from '~/types/Pokemon';
import ErrorBox from '~/components/ErrorBox';
import SimplePokeItem from '~/components/SimplePokeItem';
import { ENDPOINTS, PAGINATION } from '~/helpers/constants';
import { pokemonListMapper } from '~/helpers/dataParser';
import { BaseListResponse } from '~/types/BaseResponse';

interface PaginatedPokeListProps {
  onLoadMore: (page: number) => void;
  parameters: {
    offset: number;
  };
  isLastPageInTheScreen: boolean;
}

export default function PaginatedPokeList({
  onLoadMore,
  parameters = {
    offset: PAGINATION.INITAL_OFFSET,
  },
  isLastPageInTheScreen,
}: PaginatedPokeListProps) {
  const elRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useSWR<BaseListResponse<PokemonListItem[]>>(
    `${ENDPOINTS.POKEMON}/?offset=${parameters.offset}`,
  );

  // Read: https://usehooks-ts.com/react-hook/use-intersection-observer
  const entry = useIntersectionObserver(elRef, { freezeOnceVisible: true });

  const handleCallLoadMore = useCallback(() => {
    // Only allow refetching when the current request was done
    // Represented by fetching=false
    if (!isLoading && data && data.next) {
      try {
        const nextUrl = new URL(data.next);
        const nextOffset = nextUrl.searchParams.get('offset');
        if (nextOffset) {
          onLoadMore(parseInt(nextOffset, 10));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [isLoading, data, onLoadMore]);

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      handleCallLoadMore();
    }
  }, [entry, handleCallLoadMore]);

  return (
    <Stack>
      {isLoading ? (
        <Stack align='center' justify='center'>
          <Loader size='lg' />
        </Stack>
      ) : null}

      {!isLoading && error ? <ErrorBox message={error?.message} /> : null}

      <Stack mih={`${window.screen.height || 1000}px`}>
        {data && data.results.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gridGap: '25px 20px',
            }}
          >
            {data?.results?.map(pokemonListMapper).map((pokemon: PokemonListItemParsed) => (
              <SimplePokeItem key={pokemon.url} item={pokemon} />
            ))}
          </div>
        ) : null}
      </Stack>

      {isLastPageInTheScreen && (
        <div
          ref={elRef}
          style={{
            width: '100%',
            height: '50px',
          }}
        />
      )}
    </Stack>
  );
}
