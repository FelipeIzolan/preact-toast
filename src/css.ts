import type { ToasterPosition, ToasterState } from "./types";

const inset = (position: ToasterPosition) => {
  return `${position.startsWith("top") ? 0 : 'auto'} ${position.endsWith("right") || position.endsWith('center') ? 0 : 'auto'} ${position.startsWith("bottom") ? 0 : 'auto'} ${position.endsWith("left") || position.endsWith('center') ? 0 : 'auto'}`;
}

const offset = (state: ToasterState, children: HTMLCollection, i: number) => {
  let offset = 0;
  let position = state[i].config.position;

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
