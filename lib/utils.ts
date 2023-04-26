import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function CLSX(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function RELATIVIZE_URL(str?: string | undefined) {
  if (str) {
    return str.replace('https://static.tvmaze.com', '/l0-opt?quality=30&img=https://static.tvmaze.com')
  }
}

export function GET_ORIGIN(hostURL?: string | null) {
  let origin
  if (hostURL) {
    hostURL = hostURL.replace('http://', '').replace('https://', '')
    if (hostURL.includes('localhost:') || hostURL.includes('127.0.0.1')) {
      origin = `http://${hostURL}`
    } else {
      origin = `https://${hostURL}`
    }
  }
  return origin
}
