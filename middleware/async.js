// Code snippet taken from async/await educational webpage(acuriousanimal.com)
// This function receives a function and returns a function with 3 parameters that returns a promise
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
