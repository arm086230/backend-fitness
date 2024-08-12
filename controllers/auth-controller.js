const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudupload = require("../utils/cloudupload");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      username,
      password,
      confirmPassword,
      email,
      phone,
      age,
      sex,
      role,
    } = req.body;

    // Access the files using the field names
    const imageFiles = req.files['image'] || [];
    const resumeFiles = req.files['resumefile'] || [];

    // Upload image files to cloud
    const imagePromise = imageFiles.map((file) => cloudupload(file.path));
    const imageUrlArray = await Promise.all(imagePromise);

    // Upload resume files to cloud
    const resumePromise = resumeFiles.map((file) => cloudupload(file.path));
    const resumeUrlArray = await Promise.all(resumePromise);

    // Validation
    if (!(name && username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("Confirm password does not match");
    }

    let data = {
      name,
      username,
      password: await bcrypt.hash(password, 8),
      email,
      phone,
      age,
      sex,
      image: imageUrlArray[0], // Assuming single image
    };

    if (role) {
      const allowedRoles = ["USER", "ADMIN", "TRAINER"];
      if (!allowedRoles.includes(role)) {
        return next(new Error("Invalid role specified"));
      }
      data.role = role;
    }

    const rs = await db.user.create({ data });

    if (role === "TRAINER" && resumeUrlArray.length > 0) {
      await db.resume.create({
        data: {
          resumefile: resumeUrlArray[0], // Assuming single resume file
          userId: rs.id,
        },
      });
    }

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
    console.error(err);
  }
};




exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!(username.trim() && password.trim())) {
      return next(new Error("Fulfill all inputs"));
    }

    const user = await db.user.findFirstOrThrow({ where: { username } });

    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid login password");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // console.log(token)
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error login" });
  }
};

exports.getme = (req, res, next) => {
  res.json(req.user);
};
