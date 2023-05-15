import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '../testUtils';

import IndexComponent from './index';

import DefaultLayout from '~/layouts/default.layout';

describe('Testing Homepage', () => {
  it('Should render HomePage with DefaultLayout', async () => {
    const routes = [
      {
        path: '/',
        Component: DefaultLayout,
        children: [
          {
            path: '/',
            element: <IndexComponent />,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('My Bookmarks')).toBeDefined();
    expect(screen.getByText('👾 Pkmn-Catcher © 2023, Crafted by mazipan')).toBeDefined();
    expect(await screen.findByText('bulbasaur')).toBeDefined();
    expect(await screen.findByText('ivysaur')).toBeDefined();

    // Check the total pokemons
    expect(await screen.findAllByText('See Detail')).toHaveLength(20);
  });
});
