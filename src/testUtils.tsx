/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/export */
import { render } from '@testing-library/react';
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import { ColorScheme, MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PropsWithChildren, useState } from 'react';

import { BASE_ENDPOINT } from './helpers/constants';
import theme from './theme';

const AllTheProviders = ({ children }: PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextTheme = (value as ColorScheme) || (colorScheme === 'dark' ? 'light' : 'dark');
    if (colorScheme !== nextTheme) {
      setColorScheme(nextTheme);
    }
  };

  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher: (resource, init) =>
          fetch(BASE_ENDPOINT + resource, init).then((res) => res.json()),
      }}
    >
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...theme, colorScheme }}>
          <Notifications position='top-right' />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </SWRConfig>
  );
};

// Read: https://testing-library.com/docs/react-testing-library/setup#custom-render
function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

// override render export
export { customRender as render };
