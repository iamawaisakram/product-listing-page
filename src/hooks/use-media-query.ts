import { useSyncExternalStore } from 'react'

function getServerSnapshot(): boolean {
  return false
}

function subscribe(callback: () => void): () => void {
  globalThis.addEventListener('resize', callback)
  return () => globalThis.removeEventListener('resize', callback)
}

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => globalThis.matchMedia(query).matches

  const matches = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  return matches
}

export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)')
}
