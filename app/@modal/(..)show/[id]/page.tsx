// The page that shows the show detail as a Modal

'use client'

class ShowProps {
  name?: string
  image?: { medium?: string }
  summary?: string
  genres?: string[]
  officialSite?: string
  language?: string
  network?: { name?: string }
}

class CastProps {
  person?: { name?: string; url?: string }
}

class ShowModalProps {
  params: { id: string }
}

import Link from 'next/link'
import { RELATIVIZE_URL } from '@/lib/utils'
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
      fetch(`/l0-api/shows/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
          try {
            console.log(res)
            setShow(res)
          } catch (e) {
            console.log(e)
          }
        })
      fetch(`/l0-api/shows/${params.id}/cast`)
        .then((res) => res.json())
        .then((res) => {
          try {
            setCast(res.slice(0, 3))
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
              {show?.image?.medium && (
                <img alt={show.name} src={RELATIVIZE_URL(show.image.medium)} className="object-cover object-center w-full h-[50vh] rounded-t" />
              )}
            </div>
            <div className="w-full flex flex-row p-5">
              <div className="w-3/5 pr-10 flex flex-col">
                {/* {show && <h3 className="text-3xl font-bold text-gray-700">{show.name}</h3>} */}
                {show?.summary && (
                  <p className="text-base font-light text-white leading-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: show.summary }} />
                )}
              </div>
              <div className="w-2/5 flex flex-col">
                {cast && cast.length > 0 && (
                  <div className="flex flex-row items-center flex-wrap">
                    <span className="text-[#777]">Cast:</span>
                    <span className="px-1"></span>
                    {cast.map((i, _) => (
                      <Fragment key={i.person?.name}>
                        <a className="text-white hover:underline" target="_blank" href={i.person?.url}>
                          {i.person?.name}
                        </a>
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
                {show?.officialSite && show.officialSite.length > 0 && (
                  <div
                    className={[
                      'flex flex-row flex-wrap items-center',
                      ((show.genres && show.genres.length > 0) || (cast && cast.length > 0)) && 'mt-3',
                    ]
                      .filter((i) => i)
                      .join(' ')}
                  >
                    <span className="text-[#777]">Official Site:</span>
                    <span className="px-1"></span>
                    <a className="break-all	text-white hover:underline" target="_blank" href={show.officialSite}>
                      {show.officialSite}
                    </a>
                  </div>
                )}
                {show?.language && show.language.length > 0 && (
                  <div
                    className={[
                      'flex flex-row flex-wrap items-center',
                      ((show.genres && show.genres.length > 0) || (cast && cast.length > 0) || show?.officialSite) && 'mt-3',
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
                      ((show.genres && show.genres.length > 0) || (cast && cast.length > 0) || show?.officialSite || show?.language) && 'mt-3',
                    ]
                      .filter((i) => i)
                      .join(' ')}
                  >
                    <span className="text-[#777]">This show runs on:</span>
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
