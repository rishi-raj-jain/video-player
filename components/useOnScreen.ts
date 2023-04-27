import { useEffect, useState, useRef, RefObject } from 'react'

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  try {
    const [isOnScreen, setIsOnScreen] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
      try {
        observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
      } catch (e) {
        console.log(e)
        setIsOnScreen(true)
      }
    }, [])
    useEffect(() => {
      try {
        if (observerRef.current && ref.current) observerRef.current.observe(ref.current)
      } catch (e) {
        console.log(e)
        setIsOnScreen(true)
      }
      return () => {
        if (observerRef.current) observerRef.current.disconnect()
      }
    }, [ref])
    return isOnScreen
  } catch (e) {
    console.log(e)
    return true
  }
}
