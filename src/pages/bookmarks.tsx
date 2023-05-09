import { Button, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import BreadcrumbList from '~/components/BreadcrumbList';
import SimplePokeItem from '~/components/SimplePokeItem';
import { pokemonListMapper } from '~/helpers/dataParser';
import { getBookmarks } from '~/helpers/storage';
import { PokemonListItemParsed } from '~/types/Pokemon';

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<PokemonListItemParsed[]>([]);

  async function fetchBookmarks() {
    const foundInStorage: PokemonListItemParsed[] | null = await getBookmarks();
    console.log("storage", foundInStorage)
    if (foundInStorage) {
      setBookmarks(foundInStorage);
    }
  }

  useEffect(() => {
    fetchBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <BreadcrumbList
        items={[
          {
            title: 'My Bookmarks',
            href: `/bookmarks`,
          },
        ]}
      />
      {bookmarks && bookmarks.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridGap: '25px 20px',
          }}
        >
          {bookmarks.map(pokemonListMapper).map((item: PokemonListItemParsed) => (
            <SimplePokeItem key={item.url} item={item} withBookmark />
          ))}
        </div>
      ) : (
        <Stack align='center' mt='xl'>
          <Title>No Pokèmon have been bookmarked yet!</Title>
          <Text color='dimmed' size='xl' mb='lg' fw={700}>
            Let's browse the available Pokèmon and bookmark it, so you can find it faster next time.
          </Text>
          <Button
            variant='outline'
            size='md'
            onClick={() => {
              window.location.assign('/');
            }}
          >
            Browse Pokèmon
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
