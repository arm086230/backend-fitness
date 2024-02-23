const db  = require('../models/db')

exports.getadminbooking = async (req, res, next) => {
    try{
        const getadminbooking = await db.booking.findMany({
            //   where : { userId : req.user.id}
        })
        res.json(getadminbooking)
    }catch(error){
        next(error)
    }
}

exports.getadminuser = async (req, res, next) => {
    try{
        const getadminbooking = await db.user.findMany({
            //   where : { userId : req.user.id}
        })
        res.json(getadminbooking)
    }catch(error){
        next(error)
    }
}