const express = require("express");
const router = express.Router();
const coursecontroller = require("../controllers/course-controller")
const upload = require('../middlewares/upload');

router.get("/getcourses",coursecontroller.getcourse);
router.post("/postcourses", upload.array("image" , 1),coursecontroller.createcourse);
router.patch("/updatecourses/:id",coursecontroller.updatecourse)
router.delete("/deletecourses/:id",coursecontroller.deletecourse);
module.exports = router;
