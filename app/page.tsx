import { Fragment } from 'react'
import Shows from '@/components/Shows'
import { fetchMovieDataConfig, fetchPopularDataConfig } from '@/lib/movies'

export const revalidate = 0

export default async function Home() {
  return (
    <>
      {[...fetchPopularDataConfig, ...fetchMovieDataConfig].map((i, _) => (
        <Fragment key={_}>
          <h2 className="ml-10 mt-10 text-xl font-medium text-gray-100 md:text-xl">{i.title}</h2>
          <div className="w-full flex flex-col overflow-y-hidden">
            <Shows url={`/l0-themoviedb-api${i.url}`} />
          </div>
        </Fragment>
      ))}
    </>
  )
}
