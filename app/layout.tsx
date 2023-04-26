class LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import AuthContext from './AuthContext'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { GET_ORIGIN } from '@/lib/utils'
import ServiceWorker from '@/components/ServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({}): Promise<Metadata> {
  const headersList = headers()
  let url = GET_ORIGIN(headersList.get('host'))
  if (url?.endsWith('/')) {
    url = url.substring(0, url.length - 1)
  }
  const path = headersList.get('ott-pathname') ?? headersList.get('next-url')
  if (path) url += path
  return {
    title: 'Home',
    description: 'Welcome to Next.js',
    twitter: {
      title: 'Home',
      creator: '@rishi_raj_jain_',
      card: 'summary_large_image',
      description: 'Welcome to Next.js',
      images: {
        url: 'https://rishi.app/static/favicon-image.jpg',
        alt: 'Rishi',
      },
    },
    openGraph: {
      url,
      title: 'Home',
      description: 'Welcome to Next.js',
      siteName: 'Next.js',
      locale: 'en-US',
      type: 'website',
      images: {
        url: 'https://rishi.app/static/favicon-image.jpg',
        alt: 'Rishi',
      },
    },
  }
}

export default async function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col bg-[#141414] ${inter.className}`}>
        <AuthContext session={JSON.parse(headers().get('x-session') ?? '{}')}>
          {modal}
          <div className="flex w-full flex-col items-start">
            <Navbar />
            {children}
          </div>
          <div className="w-full py-5"></div>
          <div className="flex flex-row space-x-2">
            <span className="ml-5 md:ml-10 text-gray-300">Author:</span>
            <a className="font-semibold text-white" target="_blank" href="https://linkedin.com/in/rishi-raj-jain">
              Rishi Raj Jain
            </a>
          </div>
          <div className="w-full py-5"></div>
          <ServiceWorker />
        </AuthContext>
      </body>
    </html>
  )
}
