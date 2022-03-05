import { useEffect } from "react";

/**
 *
 */
export function useStatusBarColor(color: string): void {
  useEffect(() => {
    const doc = document.documentElement;
    const prev = doc.style.backgroundColor;

    doc.style.backgroundColor = color;

    return () => {
      doc.style.backgroundColor = prev;
    };
  }, []);
}
