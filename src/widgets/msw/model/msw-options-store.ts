const changeMswStatusCode = (statusCode: string) => {
  localStorage.setItem('mswStatusCode', statusCode);
};

const getMswStatusCode = () => {
  return localStorage.getItem('mswStatusCode') ?? '200';
};

export { changeMswStatusCode, getMswStatusCode };
