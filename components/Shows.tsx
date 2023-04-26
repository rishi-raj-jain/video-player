'use client'

class ShowsProps {
  url?: string
  data?: any[]
}

import Item from '@/components/Item'
import { useEffect, useState } from 'react'

export default function Shows({ url, data }: ShowsProps) {
  const [shows, setShows] = useState(new Array(12).fill(0))
  useEffect(() => {
    if (!data && url)
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setShows(res)
        })
  }, [])
  return (
    <div className="overflow-x-auto flex flex-row items-stretch mt-5 gap-3">
      {(data ?? shows).map((item, index) => (
        <Item key={index} {...item['show']} />
      ))}
    </div>
  )
}
