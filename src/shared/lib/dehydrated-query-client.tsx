import { cache } from 'react';
import {
  dehydrate,
  MutationCache,
  QueryClient,
  QueryClientConfig,
  QueryKey,
} from '@tanstack/react-query';

const isSameQueryKey = (q1: QueryKey, q2: QueryKey) => {
  return JSON.stringify(q1) === JSON.stringify(q2);
};

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const queryClient = getQueryClient();
      void queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
        exact: false,
      });
    },
  }),
};

const getQueryClient = cache(() => new QueryClient(queryClientConfig));

const getDehydratedQueryClientByQueries = async <
  PrefetchQueries extends {
    queryKey: QueryKey;
    queryFn: () => ReturnType<PrefetchQueries['queryFn']>;
  },
>(
  prefetchQueries: PrefetchQueries[]
) => {
  const queryClient = getQueryClient();

  await Promise.all(
    prefetchQueries.map(async ({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  const { queries } = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      prefetchQueries.some((prefetchQuery) =>
        isSameQueryKey(prefetchQuery.queryKey, query.queryKey)
      ),
  });

  return queries.filter(({ state }) => state.status !== 'error');
};

export { getQueryClient, queryClientConfig, getDehydratedQueryClientByQueries };
