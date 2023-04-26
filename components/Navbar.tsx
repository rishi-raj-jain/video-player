'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const callbackUrl = searchParams?.get('callbackUrl')
    if (callbackUrl) {
      router.replace(callbackUrl)
    }
  }, [searchParams])
  useEffect(() => {
    fetch('/api/session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        setStatus(true)
      })
  }, [])
  useEffect(() => {
    if (status) {
      if (!session?.user?.email?.length) {
        if (pathname && pathname !== '/login' && pathname.startsWith('/play/')) {
          router.replace('/login')
        }
      } else {
        if (pathname === '/login') {
          router.replace('/')
        }
      }
    }
  }, [status, session, pathname])
  return (
    <div className="w-full mt-5 flex flex-row items-center justify-between">
      <Link className="flex flex-row gap-x-2 ml-5 md:ml-10 items-center" href="/">
        <img alt="Edgio Logo" src="/logo/white.svg" width="75px" />
        <img alt="Plus Icon" src="/plus.png" height="8px" width="8px" />
        <img alt="TVMaze Logo" src="/logo/tvmaze.png" height="32px" width="101.2px" />
      </Link>
      <div className="mr-5 md:mr-10 flex flex-row items-center">
        {status ? (
          session?.user?.email && session?.user?.email?.length > 0 ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="cursor-pointer" asChild>
                <img
                  src={
                    session.user.image ??
                    'http://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbg8b9gDW0a4RN42JzXExXzjVU1EnPFfRBh0CpUQMcu_nm6Qwk5NRIkIxLoG8I-2JRU_dt_KvqdkT3a7eTWwBv0DgbvaCZA.png?r=54a'
                  }
                  width="32px"
                  height="32px"
                  loading="lazy"
                  className="rounded object-cover"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="mt-1 mr-10 bg-[#181818]">
                  <DropdownMenu.Item className="text-[#a5a5a5] hover:outline-none focus:outline-none hover:text-white px-5 py-2.5">
                    {session?.user?.name}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      if (status) signOut()
                    }}
                    className="text-[#a5a5a5] hover:outline-none focus:outline-none hover:text-white px-5 py-2.5 cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <button
              onClick={() => {
                if (status) router.replace('/login')
              }}
              className="bg-red-800 px-2 md:px-5 py-1 text-white rounded-0 appearance-none md:uppercase"
            >
              Sign In
            </button>
          )
        ) : (
          <button className="bg-white px-2 md:px-5 py-1 text-white rounded-0 appearance-none md:uppercase animate-pulse">Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Navbar
