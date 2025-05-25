export const consumePromise = (promise: Promise<unknown>) => {
  promise.catch((error) => {
    console.error("Error consuming promise:", error);
  });
};
