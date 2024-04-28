import type { CSSProperties, JSX } from "preact/compat"

export type ToasterPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type ToastConfig = {
  ms?: number,
  style?: CSSProperties,
  position?: ToasterPosition,
  className?: string,
};

export type Toast = {
  message: string | JSX.Element,
  config: ToastConfig,
  id?: number // <- timeout-id
};

export type ToasterState = Toast[];

export type ToasterAction = {
  type: "ADD" | "DEL",
  payload: Toast | number
};

export type ToasterProps = {
  className?: string,
  style?: CSSProperties
};

