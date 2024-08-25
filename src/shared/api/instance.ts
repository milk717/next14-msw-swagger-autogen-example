import ky from 'ky';

const apiInstance = ky.create({ prefixUrl: '/api' });

export { apiInstance };
