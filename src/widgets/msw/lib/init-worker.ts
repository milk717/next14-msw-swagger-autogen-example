const initWorker = async () => {
  if (typeof window !== 'undefined') {
    const { worker } = await import('~/msw/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};

export { initWorker };
