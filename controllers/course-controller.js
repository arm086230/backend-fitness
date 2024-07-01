// const { name } = require("body-parser");
const db = require("../models/db");
const cloudupload = require("../utils/cloudupload");
exports.getcourse = async (req, res, next) => {
  try {
    const getProduct = await db.product.findMany();
    res.json(getProduct);
  } catch (err) {
    next(err);
  }
};

exports.createcourse = async (req, res, next) => {
  try {
    const { name, detailed, image, price } = req.body;
    // Assuming req.files is an array of files
    const imagePromise = req.files.map((file) => {
      return cloudupload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);
    const createProduct = await db.product.create({
      data: {
        name,
        detailed,
        image: imageUrlArray[0],
        price: +price,
      },
    });
    res.json({ message: "Pending product creation", createProduct });
  } catch (err) {
    next(err);
  }
};

exports.updatecourse = async (req, res, next) => {
  const { id } = req.params;
  const { name, detailed, image, price } = req.body;

  try {
    const rs = await db.product.update({
      where: { id: + id },
      data: {
        name,
        detailed,
        image,
        price: +price,
      },
    });
    res.json({ message: "Updated ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deletecourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await db.product.delete({
      where: { id: +id },
    });
    res.json({ message: "Deleted product", result: rs });
  } catch (err) {
    next(err);
  }
}
