import { useEffect } from 'react'

export const useHorizontalScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const onScrollHandler = (e: any) => {
    let toLeft;
    let toRight;

    if (ref.current) {
      toLeft = e.deltaY < 0 && ref.current.scrollLeft > 0
      toRight = e.deltaY > 0 && ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth
      
      if (toLeft || toRight) {
        e.preventDefault()
        ref.current.scrollLeft += (e.deltaY / 1.5)
      }
    }
  }

  useEffect(() => {
    ref.current?.addEventListener('wheel', onScrollHandler, false)
  
    return () => {
      ref.current?.removeEventListener('wheel', onScrollHandler)
    }
  }, [])
}