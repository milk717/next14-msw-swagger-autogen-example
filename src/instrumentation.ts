export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PUBLIC_DEV_MODE === 'msw') {
    const { server } = await import('~/msw/node');

    const boldGreen = (text: string) => `\x1b[1m\x1b[32m${text}\x1b[0m`;
    const boldYellow = (text: string) => `\x1b[1m\x1b[33m${text}\x1b[0m`;
    const boldCyan = (text: string) => `\x1b[1m\x1b[36m${text}\x1b[0m`;

    server.events.on('request:start', ({ request }) => {
      console.log(boldCyan(`[MSW] Request started: ${request.method} ${request.url}`));
    });

    server.events.on('request:match', ({ request }) => {
      console.log(boldGreen(`[MSW] Request matched: ${request.method} ${request.url}`));
    });

    server.events.on('request:unhandled', ({ request }) => {
      console.warn(boldYellow(`[MSW] Unhandled request: ${request.method} ${request.url}`));
    });

    server.events.on('request:end', ({ request }) => {
      console.log(boldCyan(`[MSW] Request ended: ${request.method} ${request.url}`));
    });

    server.listen({
      onUnhandledRequest: 'bypass',
    });

    console.log(boldGreen('[MSW] Mock Service Worker server started.'));
  }
}
