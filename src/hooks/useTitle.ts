import { useEffect } from "react"

export const useTitle = (title: string) => {
    const documentDefined = typeof document !== 'undefined'

    useEffect(() => {
      if (!documentDefined) return

      if (document.title !== title) document.title = title
    }, [title])
    
}