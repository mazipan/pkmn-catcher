import { useParams } from 'react-router-dom';
import { Badge, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import useSWR from 'swr';

import { Pokemon, PokemonType } from '~/types/Pokemon';
import { ENDPOINTS } from '~/helpers/constants';
import PageLoader from '~/components/PageLoader';
import ErrorBox from '~/components/ErrorBox';
import BreadcrumbList from '~/components/BreadcrumbList';
import ImageLoader from '~/components/ImageLoader';
import { pokemonTypeMapper } from '~/helpers/dataParser';
import { PokemonStat } from '~/types/Pokemon';
import BookmarkButton from '~/components/BookmarkButton';

export default function DetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR<Pokemon>(ENDPOINTS.POKEMON + `/${id}`);

  if (isLoading) return <PageLoader />;
  if (!isLoading && error) return <ErrorBox message={`${error}`} />;

  console.log(isLoading, data, error);

  return (
    <Stack>
      {data ? (
        <>
          <BreadcrumbList
            items={[
              {
                title: data.name,
                href: `/detail/${data?.id}`,
              },
            ]}
          />
          <Stack justify='center' align='center'>
            <Image
              withPlaceholder
              placeholder={<ImageLoader />}
              src={data.sprites.other?.dream_world?.front_default}
              width={200}
              height={200}
              fit='contain'
              alt={data.name}
              styles={{
                placeholder: {
                  minHeight: '200px',
                },
              }}
            />
            <Title order={1}>{data.name}</Title>
            <BookmarkButton item={data} />
          </Stack>

          <Stack mt='sm' spacing='xs'>
            <Card shadow='lg' withBorder>
              <Text weight={700}>Base Info</Text>
              <Group position='left' spacing='xs' mt='md'>
                <Badge radius='sm' color='blue' variant='light'>
                  Weight: {data.weight}
                </Badge>
                <Badge radius='sm' color='green' variant='light'>
                  Height: {data.height}
                </Badge>
                <Badge radius='sm' color='violet' variant='light'>
                  Base Exp: {data.base_experience}
                </Badge>
              </Group>
            </Card>
            <Card shadow='lg' withBorder>
              <Text weight={700}>Types</Text>
              <Group position='left' spacing='xs' mt='md'>
                {data.types.map(pokemonTypeMapper).map((t: PokemonType) => (
                  <Stack
                    align='center'
                    justify='center'
                    p='xs'
                    spacing={1}
                    key={t.type.url}
                    sx={{
                      backgroundColor: t.type.color,
                      borderRadius: 4,
                    }}
                  >
                    <Image
                      withPlaceholder
                      placeholder={<ImageLoader />}
                      src={t.type.badge}
                      width={20}
                      height={20}
                      fit='contain'
                      alt={t.type.name}
                      styles={{
                        placeholder: {
                          minHeight: '20px',
                        },
                      }}
                    />
                    <Text color='white'>{t.type.name}</Text>
                  </Stack>
                ))}
              </Group>
            </Card>
            <Card shadow='lg' withBorder>
              <Text weight={700}>Stats</Text>
              <Group position='left' spacing='xs' mt='md'>
                {data.stats.map((stat: PokemonStat) => (
                  <Badge radius='sm' color='blue' variant='light' key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </Badge>
                ))}
              </Group>
            </Card>
          </Stack>
        </>
      ) : null}
    </Stack>
  );
}
