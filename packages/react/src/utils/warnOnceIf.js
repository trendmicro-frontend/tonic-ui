import once from './once';

const warnOnceIf = once((options) => {
  const condition = options?.condition;
  const message = options?.message;
  if (condition) {
    console.warn(message);
  }
});

export default warnOnceIf;
