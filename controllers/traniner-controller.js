const db = require('../models/db');
const {Status} = require ('@prisma/client')

exports.createtraniner = async (req, res, next) => {
    try{
        const {name , age , img , phone , stasus} = req.body;
        // console.log(req.body);
        const userId = req.user.id;
        const traniner = await db.trainer.create({
            data:{
                name,
                age,
                img,
                phone,
                stasus,
                userId
            }
        })
        res.json({message : 'createtraniner ok', traniner})
    }catch(err){
        next(err)
    }
}

exports.gettrainer = async (req , res , next) => {
    try{
        const gettrainer = await db.trainer.findMany({
            // where : { userId : req.user.id}
        })
        res.json(gettrainer)
    }catch(err){
        next(err)
    }
}


exports.getAllStatus = async (req, res, next) => {
    res.json({status: Object.values(Status)})
  }