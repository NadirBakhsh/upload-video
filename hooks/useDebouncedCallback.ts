import { useCallback, useRef } from "react"

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null)
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}

export default useDebounce