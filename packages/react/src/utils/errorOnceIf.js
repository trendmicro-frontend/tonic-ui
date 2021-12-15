import once from './once';

const errorOnceIf = once((options) => {
  const condition = options?.condition;
  const message = options?.message;
  if (condition) {
    console.error(message);
  }
});

export default errorOnceIf;
