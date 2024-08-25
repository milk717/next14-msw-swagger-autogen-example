'use client';

import { useEffect, useState } from 'react';

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_MODE === 'msw') {
        const { initWorker } = await import('../lib/init-worker');
        await initWorker();
      }

      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  return mswReady && children;
};

export { MSWProvider };
