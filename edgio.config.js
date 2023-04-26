module.exports = {
  connector: './edgio',
  routes: './edgio/routes.ts',
  backends: {
    api: {
      hostHeader: 'api.tvmaze.com',
      domainOrIp: 'api.tvmaze.com',
      disableCheckCert: true,
    },
    image: {
      hostHeader: 'opt.moovweb.net',
      domainOrIp: 'opt.moovweb.net',
      disableCheckCert: true,
    },
  },
  // origins: [
  //   {
  //     name: 'api',
  //     override_host_header: 'api.tvmaze.com',
  //     tls_verify: {
  //       sni_hint_and_strict_san_check: 'api.tvmaze.com',
  //       use_sni: true,
  //     },
  //     hosts: [
  //       {
  //         location: [
  //           {
  //             hostname: 'api.tvmaze.com',
  //           },
  //         ],
  //         scheme: 'match',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'image',
  //     override_host_header: 'opt.moovweb.net',
  //     tls_verify: {
  //       sni_hint_and_strict_san_check: 'opt.moovweb.net',
  //       use_sni: true,
  //     },
  //     hosts: [
  //       {
  //         location: [
  //           {
  //             hostname: 'opt.moovweb.net',
  //           },
  //         ],
  //         scheme: 'match',
  //       },
  //     ],
  //   },
  // ],
}
