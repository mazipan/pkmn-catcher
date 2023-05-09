import { Card, Image, Text, Group, Button, Stack } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';

import BookmarkButton from './BookmarkButton';

import type { PokemonListItemParsed } from '~/types/Pokemon';
import ImageLoader from '~/components/ImageLoader';

interface SimplePokeItemProps {
  item: PokemonListItemParsed;
  withBookmark?: boolean;
}

export default function SimplePokeItem({ item, withBookmark }: SimplePokeItemProps) {
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  // Read: https://usehooks-ts.com/react-hook/use-intersection-observer
  const entry = useIntersectionObserver(imageRef, {
    freezeOnceVisible: true,
    rootMargin: '10%',
  });

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      setImageSrc(item?.sprites.other?.dream_world?.front_default || '');
    }
  }, [item, entry]);

  return (
    <Card shadow='sm' padding='sm' radius='md' withBorder>
      <Stack justify='center' align='center'>
        <Image
          withPlaceholder
          placeholder={<ImageLoader />}
          src={imageSrc}
          width={100}
          height={100}
          fit='contain'
          alt={item.name}
          imageRef={imageRef}
          styles={{
            placeholder: {
              height: '100px',
            },
          }}
        />
      </Stack>

      <Stack mt='md' spacing='xs'>
        <Group position='center'>
          <Text weight={700} size='xl'>
            {item.name}
          </Text>
        </Group>

        {withBookmark ? <BookmarkButton item={item} fullWidth={true} outline={true} /> : null}

        <Button
          component={Link}
          to={`/detail/${item.id}`}
          rightIcon={<IconArrowRight size='1.1rem' />}
        >
          See Detail
        </Button>
      </Stack>
    </Card>
  );
}
