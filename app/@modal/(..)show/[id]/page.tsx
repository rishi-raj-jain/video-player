// The page that shows the show detail as a Modal

'use client'

const fallbackImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAACmCAMAAADAp3D7AAAAA1BMVEWAgICQdD0xAAAAK0lEQVR4nO3BMQEAAADCoPVP7W8GoAAAAAAAAAAAAAAAAAAAAAAAAAAAeANRtAABpXaWUQAAAABJRU5ErkJggg=='

class ShowProps {
  name?: string
  image?: { medium?: string }
  summary?: string
  genres?: string[]
  language?: string
  network?: { name?: string }
}

class CastProps {
  name?: string
}

class ShowModalProps {
  params: { id: string }
}

import Link from 'next/link'
import { X, TriangleIcon } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ProductDialog, ProductDialogCancel, ProductDialogContent, ProductDialogDescription, ProductDialogHeader } from '@/components/ProductDialog'

export const revalidate = 0

export default function Product({ params }: ShowModalProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const [show, setShow] = useState<ShowProps>()
  const [cast, setCast] = useState<CastProps[]>([])
  useEffect(() => {
    if (params.id) {
      fetch(`/l0-themoviedb-api/movie/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
          try {
            console.log(res)
            const showObject: ShowProps = {
              name: res?.original_title ?? res?.title ?? 'Placeholder',
              image: { medium: res?.poster_path ?? fallbackImage },
              summary: res?.overview ?? '',
              genres: res?.genres?.map((i: { name: string }) => i.name),
              language: res?.original_language ?? res?.spoken_languages?.length ? res?.spoken_languages[0]?.name : '',
              network: { name: res?.production_companies?.length ? res?.production_companies[0].name : 'FastFlix' },
            }
            setShow(showObject)
          } catch (e) {
            console.log(e)
          }
        })
      fetch(`/l0-themoviedb-api/movie/${params.id}/credits`)
        .then((res) => res.json())
        .then((res) => {
          try {
            console.log(res)
            setCast(res.cast.slice(0, 3))
          } catch (e) {
            console.log(e)
          }
        })
    }
  }, [])
  useEffect(() => {
    if (!pathname?.includes('/show/')) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [pathname])
  return (
    <ProductDialog open={open}>
      <ProductDialogContent>
        <ProductDialogHeader>
          <ProductDialogDescription className="bg-[#181818] rounded-b flex justify-center flex-col rounded">
            <div className="w-full relative">
              <div className="flex flex-row items-center absolute pb-5 pl-5 bottom-0 left-0">
                <Link
                  href={`/play/${params.id}`}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-black font-medium rounded text-sm px-8 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex flex-row items-center gap-x-3"
                >
                  <TriangleIcon className="rotate-90 fill-black" size={20} />
                  <span className="font-medium text-lg">Play</span>
                </Link>
              </div>
              {show?.image?.medium ? (
                <img
                  alt={show.name}
                  className="object-cover object-center w-full h-[50vh] rounded-t"
                  src={`https://opt.moovweb.net?quality=30&img=https://image.tmdb.org/t/p/original${show.image.medium}`}
                />
              ) : (
                <img alt={'Fallback Image'} src={fallbackImage} className="object-cover object-center w-full h-[50vh] rounded-t" />
              )}
            </div>
            <div className="w-full flex flex-row p-5">
              <div className="w-3/5 pr-10 flex flex-col">
                {show?.summary ? (
                  <p className="text-base font-light text-white leading-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: show.summary }} />
                ) : (
                  <div className="w-full flex flex-col">
                    <p className="h-[10px] w-full bg-white animate-pulse"></p>
                    <p className="h-[10px] mt-3 w-full bg-white animate-pulse"></p>
                    <p className="h-[10px] mt-3 w-full bg-white animate-pulse"></p>
                  </div>
                )}
              </div>
              <div className="w-2/5 flex flex-col">
                {cast && cast.length > 0 && (
                  <div className="flex flex-row items-center flex-wrap">
                    <span className="text-[#777]">Cast:</span>
                    <span className="px-1"></span>
                    {cast.map((i, _) => (
                      <Fragment key={i.name}>
                        <span className="text-white hover:underline">{i.name}</span>
                        {_ !== cast.length - 1 && <span className="text-white">,&nbsp;</span>}
                      </Fragment>
                    ))}
                  </div>
                )}
                {show?.genres && show.genres.length > 0 && (
                  <div className={['flex flex-row items-center', cast.length > 0 && 'mt-3'].filter((i) => i).join(' ')}>
                    <span className="text-[#777]">Genres:</span>
                    <span className="px-1"></span>
                    {show.genres.map((i, _) => (
                      <Fragment key={i}>
                        <span className="text-white">{i}</span>
                        {show.genres && _ !== show.genres.length - 1 && <span className="text-white">,&nbsp;</span>}
                      </Fragment>
                    ))}
                  </div>
                )}
                {show?.language && show.language.length > 0 && (
                  <div
                    className={[
                      'flex flex-row flex-wrap items-center',
                      ((show.genres && show.genres.length > 0) || (cast && cast.length > 0)) && 'mt-3',
                    ]
                      .filter((i) => i)
                      .join(' ')}
                  >
                    <span className="text-[#777]">Language:</span>
                    <span className="px-1"></span>
                    <span className="break-all	text-white">{show.language}</span>
                  </div>
                )}
                {show?.network?.name && (
                  <div
                    className={[
                      'flex flex-row flex-wrap items-center',
                      ((show.genres && show.genres.length > 0) || (cast && cast.length > 0) || show?.language) && 'mt-3',
                    ]
                      .filter((i) => i)
                      .join(' ')}
                  >
                    <span className="text-[#777]">This movie is produced by:</span>
                    <span className="px-1"></span>
                    <span className="break-all	text-white">{show.network.name}</span>
                  </div>
                )}
              </div>
            </div>
          </ProductDialogDescription>
        </ProductDialogHeader>
        <ProductDialogCancel
          onClick={() => {
            router.push('/')
          }}
          className="px-[9px] rounded-full absolute right-3 top-3 bg-black/75"
        >
          <X color="#FFF" size={22.5} />
        </ProductDialogCancel>
      </ProductDialogContent>
    </ProductDialog>
  )
}
