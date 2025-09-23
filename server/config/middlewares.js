// path: config/middlewares.js

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com', // <-- Cloudinary ko allow kiya
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com', // <-- Yahan bhi allow kiya
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];