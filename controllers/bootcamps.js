// Creating all methods in this file
// Describing the methods in comments is a best practice (3 comments above)
import restart from "nodemon";
import Bootcamp from "../models/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async (req, res, next) => {
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // try {
  // When the request is successful, we find all the bootcamps and return them with 200 status
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
  // Rejection (error) handled by error handler middleware (imported on ErrorResponse)
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // } catch (err) {
  //   // Non formatted id
  //   next(err);
  // }
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // try {
  // If the request is successful, we find the bootcamp with given id (in URL) and get its info from database
  const bootcamp = await Bootcamp.findById(req.params.id);
  // Adding extra logic to leave out IDs that are syntactically correct but they don't correspond to any bootcamp
  // Formatted id but not found in the database
  if (!bootcamp) {
    // Adding return keyworkd to make sure function stops here
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
  // Rejection (error) handled by error handler middleware (imported on ErrorResponse)
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // } catch (err) {
  //   // Non formatted id
  //   next(err);
  // }
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
// We are declaring this function as async so we can handle incoming promises generated by the .create() mongoose method
export const createBootcamp = asyncHandler(async (req, res, next) => {
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // try {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // Rejection (error) handled by error handler middleware (imported on ErrorResponse)
  // } catch (err) {
  //   next(err);
  // }
  // This mongoose method below takes the body of the request and creates a new Bootcamp in our model
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // Find and update (third parameter is an object with settings)
  // try {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // If the bootcamp doesn't exist, we send a 400 response
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  console.log(bootcamp);
  // If the bootcamp does exist, we send a 200 response with the updated data
  res.status(200).json({ success: true, data: bootcamp });
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // Rejection (error) handled by error handler middleware (imported on ErrorResponse)
  // } catch (err) {
  //   next(err);
  // }
});

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // try {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  // If the bootcamp doesn't exist, we send a 400 response
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  // If the bootcamp does exist, we send a 200 response with the updated data
  res.status(200).json({ success: true, data: {} });
  // ----Getting rid of trycatchblock and using now asyncHandler to not repeat code
  // Rejection (error) handled by error handler middleware (imported on ErrorResponse)
  // } catch (err) {
  //   next(err);
  // }
});
