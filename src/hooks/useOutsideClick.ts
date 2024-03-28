import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
  additionalRefs: RefObject<HTMLElement>[] = [],
  additionalHandler?: () => void,
  idOfUnwantedElement?: string,
  isHolding?: boolean
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function useClickHandler(e: MouseEvent | TouchEvent) {
      const targetId = (e.target as HTMLElement).id;
      if (isHolding) return;

      if (targetId === "darkModeIcon" || targetId === "darkModeButton") return;

      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !additionalRefs.some(
          (ref) => ref.current && ref.current.contains(e.target as Node)
        )
      ) {
        if (targetId !== "overlay" && idOfUnwantedElement !== targetId) {
          handler();
        } else {
          if (idOfUnwantedElement === targetId) return;
          if (additionalHandler) additionalHandler();
        }
      }
    }

    document.addEventListener("click", useClickHandler, listenCapturing);
    document.addEventListener("touchstart", useClickHandler, listenCapturing);

    return () => {
      document.removeEventListener("click", useClickHandler, listenCapturing);
      document.removeEventListener(
        "touchstart",
        useClickHandler,
        listenCapturing
      );
    };
  }, [
    handler,
    listenCapturing,
    additionalRefs,
    additionalHandler,
    idOfUnwantedElement,
    isHolding,
  ]);

  return ref;
}
