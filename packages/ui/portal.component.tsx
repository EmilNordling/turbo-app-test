import { ReactNode, RefObject, forwardRef, ElementRef } from "react";
import { useSsrSafeLayoutEffect, useMisbehavedForceUpdate } from "hooks";
import { createPortal } from "react-dom";

interface Props {
  containerRef?: RefObject<HTMLElement>;
  children: ReactNode;
}

const Portal = forwardRef<ElementRef<"div">, Props>(
  ({ containerRef, children }, forwardedRef) => {
    const hostElement = containerRef?.current ?? globalThis?.document?.body;
    const forceUpdate = useMisbehavedForceUpdate();

    useSsrSafeLayoutEffect(() => {
      //  containerRef.current won't be set on first render, so we force a re-render.
      // Because we do this in `useLayoutEffect`, we still avoid a flash.
      forceUpdate();
    });

    if (hostElement) {
      return createPortal(
        <div
          ref={forwardedRef}
          style={
            // The assumption we're making is that if the hostElement is on body,
            // you most likely want it to be on top on everything.
            hostElement === globalThis?.document.body
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2_147_483_647, // a maxed 32-bit number. Seems to be what most browser vendors uses.
                }
              : undefined
          }
        >
          {children}
        </div>,
        hostElement
      );
    }

    return null;
  }
);
