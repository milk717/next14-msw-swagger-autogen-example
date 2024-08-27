import ky from 'ky';
import { getMswStatusCode } from '@/widgets/msw';

const apiInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        if (process.env.NEXT_PUBLIC_DEV_MODE === 'msw') {
          request.headers.set('x-msw-status-code', getMswStatusCode());
        }
      },
    ],
  },
});

export { apiInstance };
