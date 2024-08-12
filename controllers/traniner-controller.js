const db = require("../models/db");
const { Status } = require("@prisma/client");

exports.getrainer = async (req, res, next) => {
  try {
    const getusertrainer = await db.user.findMany({
      where: {
        role: "TRAINER",
        Resume: {
          some: {
            status: "Approve",
          },
        },
      },
    });
    res.json(getusertrainer);
  } catch (err) {
    next(err);
  }
};

exports.admingettrainer = async (req, res, next) => {
  try{
    const getusertrainer = await db.user.findMany({
      where: {
        role: "TRAINER",
      },
      include : {
        Resume : true
      }
    });
    res.json(getusertrainer);
  } catch (err) {
    next(err);
  }
}

exports.getUsersByTrainer = async (req, res, next) => {
  try {

    const { id } = req.params;
    const getusertrainer = await db.user.findUnique({

      where: {
        id:+id,
        role: "TRAINER",

      },
    })

    if(!getusertrainer) return res.status(500).json({message : "Trainer not found"})
    const bookings = await db.booking.findMany({
      where: {
        name: getusertrainer.name,
        
      },
      include: {
        user:true
      }
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

