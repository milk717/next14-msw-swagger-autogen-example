import { DefaultBodyType, StrictRequest } from 'msw';

export const responseSelector = (
  request: StrictRequest<DefaultBodyType>,
  resultArray: [unknown, { status: number }][]
) => {
  const { headers } = request;
  const mswStatusCode = Number(headers.get('x-msw-status-code') ?? 200);

  return resultArray.find(([, { status }]) => mswStatusCode === status) ?? resultArray[0];
};
