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

export function getOneMonthAgoReleaseDate() {
  let date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toJSON().slice(0, 10)
}

export function dateToYearOnly(date: any) {
  return date.slice(0, 4)
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function randomize(data: any) {
  return Math.floor(Math.random() * data.length - 1)
}

export function truncate(text: string, n: number) {
  return text?.length > n ? text.substring(0, n - 1) + '...' : text
}
