// The page that'll redirect to the home page and then the specifc show modal

'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ShowPage() {
  const router = useRouter()
  const params = useParams()
  useEffect(() => {
    router.push(`/`)
    if (params?.id) {
      router.push(`/show/${params.id}`)
    }
  }, [])
  return <></>
}
