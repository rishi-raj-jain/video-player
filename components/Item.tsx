'use client'

import useOnScreen from './useOnScreen'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { prefetch } from '@edgio/prefetch/window'

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
    ? `https://opt.moovweb.net?quality=30&img=https://image.tmdb.org/t/p/original${itemProps?.poster_path}`
    : fallbackImage
  const ref = useRef<HTMLAnchorElement>(null)
  const isVisible = useOnScreen(ref)
  useEffect(() => {
    if (isVisible) {
      // router.prefetch(`/show/${id}`)
      // wanna cache this in the browser as well
      prefetch(`/l0-themoviedb-api/movie/${id}`, 'fetch', { includeCacheMisses: true })
      prefetch(`/l0-themoviedb-api/movie/${id}/credits`, 'fetch', { includeCacheMisses: true })
    }
  }, [isVisible])
  return (
    <a
      ref={ref}
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
        className={['object-cover object-center min-h-[225px] rounded', image === fallbackImage && 'animate-pulse'].filter((i) => i).join(' ')}
      />
      {name ? (
        <h3 className="mt-3 max-w-[150px] text-gray-300">{name}</h3>
      ) : (
        <div className="mt-3 w-[150px] h-[20px] bg-white/25 animate-pulse"></div>
      )}
    </a>
  )
}

export default Item
