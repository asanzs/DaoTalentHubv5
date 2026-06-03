import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'accounts': false,
      '@walletconnect/ethereum-provider': false,
      '@base-org/account': false,
      '@coinbase/wallet-sdk': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
      'pino-pretty': false,
      'lokijs': false,
      'encoding': false,
      'porto': false,
      'porto/internal': false
    };

    return config;
  },
};

export default withNextIntl(nextConfig);
