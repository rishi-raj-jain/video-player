import Shows from '@/components/Shows'

export const revalidate = 0

export default async function Home() {
  return (
    <>
      <h2 className="ml-10 mt-10 text-xl font-medium text-gray-100 md:text-xl">Top Picks</h2>
      <div className="w-full flex flex-col overflow-y-hidden">
        <Shows url="/l0-api/schedule?country=US&date=2012-01-01" />
      </div>
      <h2 className="ml-10 mt-5 text-xl font-medium text-gray-100 md:text-xl">Indian Shows Today</h2>
      <div className="w-full flex flex-col overflow-y-hidden">
        <Shows url="/l0-api/schedule?country=IN&date=2012-01-01" />
      </div>
    </>
  )
}
