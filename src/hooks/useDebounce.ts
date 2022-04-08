import { useEffect, useState } from 'react';
import { OutputData } from '@editorjs/editorjs';

export const useDebounce = (value: OutputData, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const timer = setTimeout(() => {
          setDebouncedValue(value)
      }, delay);
    
      return () => {
        clearTimeout(timer)
      }
    }, [value])
    
    return debouncedValue
}