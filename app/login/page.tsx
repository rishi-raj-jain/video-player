import Button from '@/components/Button'
import { redirect } from 'next/navigation'
import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

async function getSessionAndProviders() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    redirect('/')
  }
  return (await getProviders()) || []
}

export default async function SignIn() {
  const providers = await getSessionAndProviders()
  return (
    <>
      <div className="py-32 w-full flex flex-col items-center">
        <div className="w-[320px] flex flex-col items-start">
          <h2 className="text-[#727272]">Welcome Back</h2>
          <h1 className="mt-1 text-xl text-white">Sign In To Your Account</h1>
          {Object.values(providers).map((provider) => (
            <Button key={provider.name} provider={provider} />
          ))}
        </div>
      </div>
    </>
  )
}
