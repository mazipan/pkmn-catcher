import { Stack } from '@mantine/core';
import { useState } from 'react';

import PaginatedPokeList from '~/components/PaginatedPokeList';
import { PAGINATION } from '~/helpers/constants';

const DEFAULT_PARAMETERS = {
  offset: PAGINATION.INITAL_OFFSET,
};

export default function HomePage() {
  const [parameters, setParameters] = useState([DEFAULT_PARAMETERS]);

  const handleNextPage = (newOffset: number) => {
    const isPageAlreadyExist = parameters.find((vars) => vars.offset === newOffset);
    if (!isPageAlreadyExist) {
      setParameters([...parameters, { offset: newOffset }]);
    }
  };

  return (
    <Stack>
      {parameters.map((vars, i) => (
        <PaginatedPokeList
          key={`idx${i}-offset${vars.offset}`}
          parameters={vars}
          onLoadMore={handleNextPage}
          isLastPageInTheScreen={i === parameters.length - 1}
        />
      ))}
    </Stack>
  );
}
