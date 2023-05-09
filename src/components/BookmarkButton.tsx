import { Badge, Button, Group } from '@mantine/core';
import { IconBookmarkPlus, IconBookmarkMinus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useCallback, useEffect, useState } from 'react';

import { addToBookmark, isExistInBookmark, removeFromBookmark } from '~/helpers/storage';
import { PokemonListItemParsed } from '~/types/Pokemon';
import { BASE_ENDPOINT, ENDPOINTS } from '~/helpers/constants';

interface BookmarkButtonProps {
  item: PokemonListItemParsed;
  withBadge?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
}

export default function BookmarkButton({
  item,
  withBadge,
  fullWidth,
  outline,
}: BookmarkButtonProps) {
  const [isExist, setIsExist] = useState<boolean>(false);

  const bookmarkChecker = useCallback(
    async function bookmarkChecker() {
      const found = await isExistInBookmark(item.id);
      setIsExist(found);
    },
    [item.id],
  );

  async function handleClickBookmark() {
    if (!isExist) {
      await addToBookmark({
        url: item.url || `${BASE_ENDPOINT}${ENDPOINTS.POKEMON}/${item.id}`,
        id: item.id,
        name: item.name,
        sprites: {
          other: {
            dream_world: {
              front_default: item?.sprites?.other?.dream_world?.front_default || '',
            },
          },
        },
      } as PokemonListItemParsed);
      notifications.show({
        autoClose: 3000,
        title: 'Pokèmon Bookmarked!',
        message: `Pokèmon ${item.name} have been added to bookmark list.`,
      });
      setIsExist(true);
    } else {
      await removeFromBookmark(item);
      notifications.show({
        autoClose: 3000,
        title: 'Bookmark Removed!',
        message: `Pokèmon ${item.name} have been remove from bookmark list.`,
      });
      setIsExist(false);
    }
  }

  useEffect(() => {
    if (item.id) {
      bookmarkChecker();
    }
  }, [item.id, bookmarkChecker]);

  return (
    <Group>
      {isExist && withBadge ? <Badge>Bookmarked</Badge> : null}
      <Button
        leftIcon={isExist ? <IconBookmarkMinus /> : <IconBookmarkPlus />}
        onClick={handleClickBookmark}
        color={isExist ? 'red' : 'blue'}
        variant={outline ? 'outline' : 'filled'}
        fullWidth={fullWidth}
      >
        {isExist ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
      </Button>
    </Group>
  );
}
