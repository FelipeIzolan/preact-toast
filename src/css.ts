import type { ToastPosition, ToasterState } from "./types";

const inset = (position: ToastPosition) => {
  return `${position.startsWith("top") ? 0 : 'auto'} ${position.endsWith("right") || position.endsWith('center') ? 0 : 'auto'} ${position.startsWith("bottom") ? 0 : 'auto'} ${position.endsWith("left") || position.endsWith('center') ? 0 : 'auto'}`;
}

const offset = (state: ToasterState, children: HTMLCollection, i: number, default_position: ToastPosition, position?: ToastPosition) => {
  let offset = 0;
  let pos = position ?? default_position;

  for (let j = 0; j < i; j++) {
    offset += 
      (state[j].config.position ?? default_position) == pos ? 
      children[j].clientHeight + 12 :
      0;
  }

  return `0 ${pos.startsWith("bottom") ? -offset : offset}px`;
}

export {
  inset,
  offset
}
