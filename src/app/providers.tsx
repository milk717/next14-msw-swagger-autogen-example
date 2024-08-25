'use client';

import { MSWProvider } from '@/widgets/msw';
import { NextUIProvider } from '@nextui-org/system';
import { PropsWithChildren } from 'react';

const Providers: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <MSWProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </MSWProvider>
  );
};

export default Providers;
