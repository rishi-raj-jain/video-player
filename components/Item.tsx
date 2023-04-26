'use client'

import { Prefetch } from '@edgio/react'
import { useRouter } from 'next/navigation'

const fallbackImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAACmCAMAAADAp3D7AAAAA1BMVEWAgICQdD0xAAAAK0lEQVR4nO3BMQEAAADCoPVP7W8GoAAAAAAAAAAAAAAAAAAAAAAAAAAAeANRtAABpXaWUQAAAABJRU5ErkJggg=='

interface TVMazeProps {
  name?: string
  id?: string | number
  image?: { medium?: string; original?: string }
}

interface TMDBProps {
  title?: string
  id?: string | number
  poster_path?: string
  original_title?: string
}

interface ItemProps extends TMDBProps, TVMazeProps {}

const Item = (itemProps: ItemProps) => {
  const router = useRouter()
  const id = itemProps?.id ?? 1
  const name = itemProps?.name ?? itemProps?.original_title ?? itemProps?.title ?? 'Placeholder'
  const image = itemProps?.image
    ? itemProps?.image?.medium ?? itemProps?.image?.original
    : itemProps?.poster_path
    ? `/l0-opt?quality=30&img=https://image.tmdb.org/t/p/original${itemProps?.poster_path}`
    : fallbackImage
  return (
    <Prefetch url={`/l0-themoviedb-api/movie/${id}`}>
      <a
        href={`/show/${id}`}
        onClick={(e) => {
          e.preventDefault()
          router.push(`/show/${id}`)
        }}
        className="flex flex-col min-w-[150px]"
      >
        <img
          alt={name}
          src={image}
          width="150px"
          height="225px"
          loading="lazy"
          className={['object-cover object-center min-h-[225px] rounded', !image && 'animate-pulse'].filter((i) => i).join(' ')}
        />
        <Prefetch url={`/l0-themoviedb-api/movie/${id}/credits`}>
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
