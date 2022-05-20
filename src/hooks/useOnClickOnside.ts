import React, { useEffect } from "react";

export const useOnClickOnside = (
  ref: React.RefObject<HTMLDivElement> | null,
  cb: (e: React.MouseEvent) => void
) => {
  useEffect(() => {
    const handler = (e: any) => {
      if (ref === null) return;
      if (!ref!.current || !ref!.current.contains(e.target)) return;
      console.log('onside');
      
      cb(e);
    };

    document.addEventListener("mousedown", handler, { capture: true });

    return () => {
      document.removeEventListener("mousedown", handler, { capture: true });
    };
  }, [ref, cb]);
};
