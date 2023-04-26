// The page that'll just embed the video player in full screen

class ShowProps {
  params: { id: string | number }
}

import { headers } from 'next/headers'
import { GET_ORIGIN } from '@/lib/utils'

export const revalidate = 0

async function getData(id: string | number) {
  const headersList = headers()
  const fetchCall = await fetch(`${GET_ORIGIN(headersList.get('host'))}/l0-themoviedb-api/movie/${id}`)
  if (fetchCall.ok) {
    const data = await fetchCall.json()
    return data
  }
  return undefined
}

const Show = async ({ params }: ShowProps) => {
  const data = await getData(params.id)
  return (
    <>
      <div className="w-screen h-screen bg-black fixed top-0 left-0 z-10">
        {data.name && <h1 className="mt-5 text-center text-4xl font-bold md:text-left">{data.name}</h1>}
      </div>
      <iframe
        className="w-screen h-screen fixed top-0 left-0 z-50"
        src="https://www.youtube.com/embed/HH0zOJVOzxs?rel=0&autoplay=1;fs=0;autohide=0;hd=0;mute=1;"
      />
    </>
  )
}

export default Show
