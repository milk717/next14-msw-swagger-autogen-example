'use client';

import { MSWProvider } from '@/widgets/msw';
import { PropsWithChildren } from 'react';

const Providers: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <MSWProvider>{children}</MSWProvider>;
};

export default Providers;
