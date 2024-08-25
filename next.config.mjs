const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      /**
       * Setting `resolve.alias` to `false` will tell webpack to ignore a module.
       * `msw/node` is a server-only module that exports methods not available in the `browser`.
       *
       * @see https://github.com/mswjs/msw/issues/1801#issuecomment-1794145119
       */
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false,
      };
    }

    return config;
  },
  experimental: { instrumentationHook: !isProduction },
};

export default nextConfig;
