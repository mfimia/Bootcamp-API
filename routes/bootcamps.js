import  express  from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // I can send data in, for example, an object and express would automatically convert it to JSON.
  // No need to use JSON.stringify. However, we would do res.json instead of res.send
  // res.send("Hello from express");
  // Setting up successful request (200)
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new bootcamp" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

export default router;
