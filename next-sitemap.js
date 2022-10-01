const siteUrl = 'https://muabangenshin.com/';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/dashboards'
      }
    ],

    additionalPaths: async (config) => [
      await config.transform(config, '/comments')
    ],
    additionalSitemaps: ['http://localhost:3000/serversite.xml']
  }
};
