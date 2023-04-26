'use client'

import { useEffect } from 'react'
import { prefetch } from '@edgio/prefetch/window'
import install from '@edgio/prefetch/window/install'

export default function ServiceWorker() {
  useEffect(() => {
    install().then(() => {
      document.querySelectorAll('[href*=".css"]').forEach((i) => {
        // @ts-ignore
        prefetch(i.href)
      })
      document.querySelectorAll('[src*=".png"]').forEach((i) => {
        // @ts-ignore
        prefetch(i.src)
      })
      document.querySelectorAll('[src*=".jpg"]').forEach((i) => {
        // @ts-ignore
        prefetch(i.src)
      })
    })
  })
  return <></>
}
