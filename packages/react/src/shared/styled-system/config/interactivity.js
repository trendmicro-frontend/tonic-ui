import system from '../core/system';

const config = {
  appearance: true,
  caretColor: true,
  cursor: true,
  outline: true,
  outlineColor: true,
  outlineOffset: true,
  pointerEvents: true,
  resize: true,
  userSelect: true,
};

const interactivity = system(config);

export default interactivity;
