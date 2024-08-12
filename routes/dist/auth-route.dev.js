"use strict";

var express = require("express");

var router = express.Router();

var authController = require("../controllers/auth-controller");

var authenticate = require("../middlewares/authenticate");

var workController = require("../controllers/work-controller");

var adminuser = require("../controllers/admin-controller");

var upload = require("../middlewares/upload");

router.post("/register", upload.fields([{
  name: "image",
  maxCount: 1
}, {
  name: "resumefile",
  maxCount: 1
}]), authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getme);
router.post("/workout", authenticate, workController.workout);
router.get("/getworkout", upload.array("image", 1), authenticate, workController.getworkout);
router.get("/all-status", authenticate, workController.getAllStatus);
router["delete"]("/del/:id", authenticate, workController.deleteworkout);
router.get("/getuser", authenticate, adminuser.getadminuser);
router["delete"]("/deluser/:id", authenticate, adminuser.deleteuser);
router.patch("/updateuser/:id", authenticate, adminuser.updateuser);
router.patch("/update/:id", authenticate, adminuser.updatestatustrainer);
router.get("/get/:id", authenticate, adminuser.getuserById);
router.get('/getresume', authenticate, adminuser.getresume);
module.exports = router; // router.get('/log', read)
// router.get('/log/:id',  list)