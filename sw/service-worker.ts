import { Prefetcher } from '@edgio/prefetch/sw'
import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'

skipWaiting()
clientsClaim()
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
