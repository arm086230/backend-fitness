const db = require("../models/db");

exports.deletebooking = async (req, res, next) => {
  const { delebooks } = req.params;
  // console.log('TEST');
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
    const { TrainerId, bookingDateTime, status } = req.body;

    // console.log(req.body);

    console.log(TrainerId)
    const booking = await db.booking.create({
      data: {
        user: {
          connect: {
            id: req.user.id,
          },
        },
        Trainer: {
          connect: {
            id: TrainerId,
          },
        },
        bookingDateTime: new Date(bookingDateTime),
        status,
      },
    });
    res.json({ message: "create OK", booking });
  } catch (err) {
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
