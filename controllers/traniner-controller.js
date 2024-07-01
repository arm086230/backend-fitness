const db = require('../models/db');
const {Status} = require ('@prisma/client')

exports.getrainer = async (req , res , next) => {
    try{
        const getusertrainer = await db.user.findMany({
            where : {role : req.params.role = "TRAINER"}
        })
        res.json(getusertrainer)
    }catch(err){
        next(err)
    }
}