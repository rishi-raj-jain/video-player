import { join } from 'path'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { CustomCacheKey, Router } from '@edgio/core'
import { isProductionBuild } from '@edgio/core/environment'

dotenv.config({
  path: '.env.production',
})

const router = new Router()

router.match('/service-worker.js', ({ serviceWorker }) => {
  serviceWorker('.edgio/temp/service-worker.js')
})

router.get('/l0-api/:path*', ({ proxy, cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
      staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
    },
    browser: false,
  })
  proxy('api', { path: '/:path*' })
})

router.get('/l0-themoviedb-api/:path*', ({ proxy, cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
      staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
    },
    browser: false,
  })
  proxy('api_themoviedb', {
    path: '/3/:path*',
    transformRequest: (request) => {
      const url = new URL(request.url, 'https://domain.com')
      url.searchParams.append('api_key', process.env.TMDB_KEY!)
      request.url = url.toString().replace('https://domain.com', '')
    },
  })
})

router.get('/_next/image', ({ cache, renderWithApp, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
    key: new CustomCacheKey().excludeAllQueryParametersExcept('url', 'w', 'q'),
  })
  renderWithApp()
})

if (isProductionBuild()) {
  try {
    const publicDir = readFileSync(join(process.cwd(), 'public_routes'), 'utf8')
    publicDir.split(',').forEach((i) => {
      router.match(`/${i}`, ({ serveStatic }) => {
        serveStatic(`public/${i}`)
      })
    })
  } catch (e) {}

  router.match('/_next/static/:path*', ({ serveStatic }) => {
    serveStatic('.next/static/:path*')
  })

  const dynamicPaths = ['/', '/show/:id', '/play/:id']

  dynamicPaths.forEach((i) => {
    router.match({ path: i, headers: { 'Next-Router-State-Tree': null } }, ({ cache, renderWithApp, removeUpstreamResponseHeader }) => {
      removeUpstreamResponseHeader('set-cookie')
      removeUpstreamResponseHeader('cache-control')
      cache({
        browser: false,
        edge: {
          maxAgeSeconds: 60 * 60,
          staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
        },
        key: new CustomCacheKey().addHeader('Next-Router-State-Tree'),
      })
      renderWithApp()
    })

    router.match({ path: i, headers: { 'Next-Router-State-Tree': /.*/ } }, ({ cache, renderWithApp, removeUpstreamResponseHeader }) => {
      removeUpstreamResponseHeader('set-cookie')
      removeUpstreamResponseHeader('cache-control')
      cache({
        browser: false,
        edge: {
          maxAgeSeconds: 60 * 60,
          staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
        },
        key: new CustomCacheKey().addHeader('Next-Router-State-Tree'),
      })
      renderWithApp()
    })
  })
}

router.match('/:path*', ({ cache, renderWithApp }) => {
  cache({
    edge: false,
    browser: false,
  })
  renderWithApp()
})

module.exports = router
