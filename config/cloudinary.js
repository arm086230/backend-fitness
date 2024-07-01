const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "diojfi1cx",
  api_key: "176879335334883",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
