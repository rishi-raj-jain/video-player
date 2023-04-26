module.exports = {
  connector: './edgio',
  routes: './edgio/routes.ts',
  backends: {
    api: {
      hostHeader: 'api.tvmaze.com',
      domainOrIp: 'api.tvmaze.com',
      disableCheckCert: true,
    },
    api_themoviedb: {
      hostHeader: 'api.themoviedb.org',
      domainOrIp: 'api.themoviedb.org',
      disableCheckCert: true,
    },
    image_themoviedb: {
      hostHeader: 'image.tmdb.org',
      domainOrIp: 'image.tmdb.org',
      disableCheckCert: true,
    },
  },
}
