import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
  additionalRefs: RefObject<HTMLElement>[] = [],
  additionalHandler?: () => void
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function useClickHandler(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !additionalRefs.some(
          (ref) => ref.current && ref.current.contains(e.target as Node)
        )
      ) {
        if ((e.target as HTMLElement).id !== "overlay") {
          handler();
        } else {
          if (additionalHandler) additionalHandler();
        }
      }
    }

    document.addEventListener("click", useClickHandler, listenCapturing);

    return () => {
      document.removeEventListener("click", useClickHandler, listenCapturing);
    };
  }, [handler, listenCapturing, additionalRefs, additionalHandler]);

  return ref;
}
