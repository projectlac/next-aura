const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
    disableStaticImages: true
  }
};

module.exports = withImages(redirects);
