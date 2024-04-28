import { useEffect, useLayoutEffect, useReducer, useRef } from "preact/hooks";

import { toast, reducer, setDispatcher } from './core';
import { inset, offset } from "./css";

import type { FunctionalComponent } from "preact";
import type { ToasterProps } from "./types";

const Toaster: FunctionalComponent<ToasterProps> = ({ className, style, position }) => {
  const [toast, dispatch] = useReducer(reducer, []);
  const toasterRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setDispatcher(dispatch);
    return () => setDispatcher(null);
  }, []);

  useLayoutEffect(() => {
    for (let i = 0; i < toast.length; i++) {
      let t = toast[i];
      let c = toasterRef.current!.children as HTMLCollectionOf<HTMLLIElement>;

      c[i].style.translate = offset(toast, c, i, t.config.position ?? position);
    }
  }, [toast]);

  const toasts = toast.map(t =>
    <li
      style={{
        width: "fit-content",
        position: "absolute",
        inset: inset(t.config.position ?? position),
        marginLeft: "auto",
        marginRight: "auto",
        ...(t.config.style ?? style)
      }} 
      class={t.config.className ?? className}
    >
    {t.message}
    </li>
  );

  return (
    <ul
      ref={toasterRef}
      style={{
        inset: "16px",
        zIndex: 9999,
        position: "fixed",
        listStyle: "none",
        pointerEvents: "none"
      }}
    >
    {toasts} 
    </ul>
  );
}

export default toast;
export { Toaster };
