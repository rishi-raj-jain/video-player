'use client'

import { Prefetch } from '@edgio/react'
import { useRouter } from 'next/navigation'
import { RELATIVIZE_URL } from '@/lib/utils'

const fallbackImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAACmCAMAAADAp3D7AAAAA1BMVEWAgICQdD0xAAAAK0lEQVR4nO3BMQEAAADCoPVP7W8GoAAAAAAAAAAAAAAAAAAAAAAAAAAAeANRtAABpXaWUQAAAABJRU5ErkJggg=='

class ItemProps {
  name?: string | undefined
  id?: string | number | undefined
  image?: { medium?: string; original?: string }
}

const Item = ({ id = 1, name, image }: ItemProps) => {
  const router = useRouter()
  return (
    <Prefetch url={`/l0-api/shows/${id}`}>
      <a
        onClick={(e) => {
          e.preventDefault()
          router.push(`/show/${id}`)
        }}
        href={`/show/${id}`}
        className="flex flex-col min-w-[150px]"
      >
        <img
          width={150}
          height={210.71}
          alt={name ?? ''}
          className={[!image && 'animate-pulse', 'rounded'].filter((i) => i).join(' ')}
          src={RELATIVIZE_URL(image?.medium ?? image?.original ?? fallbackImage)}
        />
        <Prefetch url={`/l0-api/shows/${id}/cast`}>
          {name ? (
            <h3 className="mt-3 max-w-[150px] text-gray-300">{name}</h3>
          ) : (
            <div className="mt-3 w-[150px] h-[20px] bg-white/25 animate-pulse"></div>
          )}
        </Prefetch>
      </a>
    </Prefetch>
  )
}

export default Item
