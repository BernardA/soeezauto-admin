module.exports = {
    // reactStrictMode: true,
    images: {
        domains: ['soeezauto-api', 'localhost', 'www.soeezauto.com', 'www.soeezauto.ma'],
    },
    webpack: (config) => {
        // eslint-disable-next-line no-param-reassign
        config.resolve.fallback = { fs: false };

        return config;
    },
};
