const db = require("../models/db")

exports.deletebooking = async (req, res, next) => {
    const {delebooks} = req.params
    console.log('TEST');
    console.log(delebooks);
    try{
        const delebook = await db.booking.delete({
            where:{
                id : Number(delebooks)
            }
        })
        res.json(delebook)
    }catch(err){
        next(err)
    }
}
exports.createbooking = async (req, res, next) => {
    try{
        const{ TrainertId , bookingDateTime ,status} = req.body;

        console.log(req.body);
        const booking = await db.booking.create({
            data:{
                userId: req.user.id,
                TrainertId,
                bookingDateTime: new Date(bookingDateTime),
                status
            }
        })
        res.json({message :"create OK", booking })
    }catch(err){
        next(err)
    }
}

exports.getbooking = async (req, res, next) => {
        
    try {
        const getbooking = await db.booking.findMany({
            where : { userId : req.user.id}
            
        })
        res.json({message : "get bookings", getbooking })
    } catch (error) {
        next(error)
    }
}
