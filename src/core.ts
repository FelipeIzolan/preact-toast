
import type { JSX } from "preact";
import type { Dispatch } from "preact/hooks";
import type { Toast, ToastConfig, ToasterAction, ToasterState } from "./types";

var ToasterDispatcher: Dispatch<ToasterAction> | null;

const setDispatcher = (d: Dispatch<ToasterAction> | null) => ToasterDispatcher = d;

const reducer = (state: ToasterState, action: ToasterAction) => {
  switch (action.type) {
    case "ADD": 
      return [(action.payload as Toast), ...state];
    case "DEL":
      clearInterval(action.payload as number);
      return [...state.filter(x => x.id != (action.payload as number))];
  }
}

function toast(message: string | JSX.Element, config?: ToastConfig | number) {
  if (!ToasterDispatcher) return 0;

  let c: ToastConfig = config ? (typeof config == "number" ? { ms: config } : config) : {};
  c.ms ??= 3000;

  const toast: Toast = {
    message,
    config: c,
    id: setTimeout(() => ToasterDispatcher!({ type: "DEL", payload: toast.id as number }), c.ms)
  }

  ToasterDispatcher({ type: "ADD", payload: toast });
  return toast.id as number;
}

toast.stop = (id: number) => {
  if (!ToasterDispatcher) return;
  ToasterDispatcher!({ type: "DEL", payload: id });
}

export {
  setDispatcher,
  reducer,
  toast
}
