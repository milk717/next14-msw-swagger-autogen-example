'use client';

import { MSWProvider } from '@/widgets/msw';
import { NextUIProvider } from '@nextui-org/system';
import { PropsWithChildren } from 'react';
import { MswDevtools } from '@/widgets/msw/ui/msw-devtools';

const Providers: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <MSWProvider>
      <NextUIProvider>{children}</NextUIProvider>
      <MswDevtools enabled={process.env.NEXT_PUBLIC_DEV_MODE === 'msw'} />
    </MSWProvider>
  );
};

export default Providers;
