// The page that'll redirect to the home page and then the specifc show modal

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ShowPage({ params }: { params: { id: string | number } }) {
  const router = useRouter()
  useEffect(() => {
    router.push(`/show/${params.id}`)
  }, [])
  return <></>
}
