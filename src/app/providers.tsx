'use client';

import { MSWProvider } from '@/widgets/msw';
import { NextUIProvider } from '@nextui-org/system';
import { PropsWithChildren, useState } from 'react';
import { MswDevtools } from '@/widgets/msw/ui/msw-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientConfig } from '@/shared/lib/dehydrated-query-client';

const Providers: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <MSWProvider>
        <NextUIProvider>{children}</NextUIProvider>
        <MswDevtools enabled={process.env.NEXT_PUBLIC_DEV_MODE === 'msw'} />
      </MSWProvider>
    </QueryClientProvider>
  );
};

export default Providers;
