import { useEffect, useLayoutEffect, useReducer, useRef } from "preact/hooks";

import { toast, reducer } from './core';
import { inset, offset } from "./css";

import type { Dispatch } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import type { ToasterProps, ToasterAction, ToasterPosition } from "./types";

var ToasterDispatcher: Dispatch<ToasterAction> | null;

const Toaster: FunctionalComponent<ToasterProps> = ({ className, style }) => {
  const [toast, dispatch] = useReducer(reducer, []);
  const toasterRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    ToasterDispatcher = dispatch;
    return () => ToasterDispatcher = null;
  }, []);

  useLayoutEffect(() => {
    let i = 0;
    for (const child of (toasterRef.current!.children as HTMLCollectionOf<HTMLLIElement>)) {
      child.style.translate = offset(toast, toasterRef.current!.children, i);
      i++;
    }
  }, [toast]);

  const toasts = toast.map(t =>
    <li
      style={{
        width: "fit-content",
        position: "absolute",
        inset: inset(t.config.position as ToasterPosition),
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

export default Toaster;
export { toast, ToasterDispatcher };
