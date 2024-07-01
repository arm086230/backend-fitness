const db = require("../models/db");

exports.deletebooking = async (req, res, next) => {
  const { delebooks } = req.params;
  console.log(delebooks);
  try {
    const delebook = await db.booking.delete({
      where: {
        id: Number(delebooks),
      },
    });
    res.json(delebook);
  } catch (err) {
    next(err);
  }
};

exports.createbooking = async (req, res, next) => {
  try {
    const input = req.body;

    // Validate input fields
    if (!input.userId || !input.name || !input.bookingDateTime || !input.bookingDate || !input.expiryDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check and parse dates
    const bookingDateTime = new Date(input.bookingDateTime);
    const bookingDate = new Date(input.bookingDate);
    const expiryDate = new Date(input.expiryDate);

    // Validate date objects
    if (isNaN(bookingDateTime.getTime()) || isNaN(bookingDate.getTime()) || isNaN(expiryDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format provided" });
    }

    // Create the booking
    const booking = await db.booking.create({
      data: {
        userId: input.userId,
        name: input.name,
        sex: input.sex,
        age: input.age,
        phone: input.phone,
        bookingDateTime,
        bookingDate,
        expiryDate,
        status: "Pending",
      }
    });

    // Respond with success message and booking details
    res.json({ message: "Booking created successfully", booking });
  } catch (err) {
    // Handle errors
    next(err);
  }
};


exports.getbooking = async (req, res, next) => {
  try {
    const getbooking = await db.booking.findMany({
      where: { userId: req.user.id },
    });
    res.json({ message: "get bookings", getbooking });
  } catch (error) {
    next(error);
  }
};

exports.updatebooking = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const rs = await db.booking.update({
      where: { id: +id },
      data: {
        status,
      },
    });
    res.json({ msg: "Update ok", result: rs });
  } catch (err) {
    next(err);
  }
};
