// Code snippet taken from async/await educational webpage(acuriousanimal.com)
// This function receives a function and returns a function with 3 parameters that returns a promise
// Created this function to receive all our asynchronous code and handle it in this format
// Takes a function, whcih takes parameters, triggers the function with the parameters and adds a catch block which applies "next"
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
