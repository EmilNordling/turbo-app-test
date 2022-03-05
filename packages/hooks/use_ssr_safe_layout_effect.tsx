import { useLayoutEffect } from "react";

/**
 * `useEffect` and `useLayoutEffect`are not meant to run on the server. To
 * suppress any warnings, this hook will just no-op on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
export const useSsrSafeLayoutEffect = (
  globalThis?.document
    ? useLayoutEffect
    : () => {
        // noop
      }
) as typeof useLayoutEffect;
