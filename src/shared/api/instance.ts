import ky from 'ky';

const apiInstance = ky.create({ prefixUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL });

export { apiInstance };
