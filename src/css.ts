import type { ToastPosition, ToasterState } from "./types";

const inset = (position: ToastPosition) => {
  return `${position.startsWith("top") ? 0 : 'auto'} ${position.endsWith("right") || position.endsWith('center') ? 0 : 'auto'} ${position.startsWith("bottom") ? 0 : 'auto'} ${position.endsWith("left") || position.endsWith('center') ? 0 : 'auto'}`;
}

const offset = (state: ToasterState, children: HTMLCollection, i: number, position: ToastPosition) => {
  let offset = 0;

  for (let j = 0; j < i; j++) {
    offset += 
      state[j].config.position == position ? 
      children[j].clientHeight + 12 :
      0;
  }

  return `0 ${position!.startsWith("bottom") ? -offset : offset}px`;
}

export {
  inset,
  offset
}
