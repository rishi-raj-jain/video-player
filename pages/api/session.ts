import { Session } from 'next-auth'
import { GET_ORIGIN } from '../../lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

async function getSession(cookie: string | null, host: string | null): Promise<Session> {
  if (!cookie || !host) return { expires: '' }
  const response = await fetch(`${GET_ORIGIN(host)}/api/auth/session`, {
    headers: {
      cookie,
    },
  })
  if (!response.ok) return { expires: '' }
  const session = await response.json()
  return Object.keys(session).length > 0 ? session : { expires: '' }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const session = await getSession(request.headers['cookie']!, request.headers['host']!)
    response.setHeader('set-cookie', `x-session=${JSON.stringify(session)}; path=/;`)
    response.status(200).json({})
  }
}
