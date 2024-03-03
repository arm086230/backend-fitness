const db = require('../models/db');
const {Status} = require ('@prisma/client')

exports.createtraniner = async (req, res, next) => {
    try{
        const {name , age , img , phone , status} = req.body;
        // console.log(req.body);
        const userId = req.user.id;
        const traniner = await db.trainer.create({
            data:{
                name,
                age,
                img,
                phone,
                status,
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

exports.deletetainer = async (req, res , next) =>{
    const {id} = req.params
  
    try{
        const rs = await db.trainer.delete({
            where:{ id : +id }
        })
        res.json({message: 'delete',result:rs})
    }catch(err){
        next(err)
    }
  }


exports.getAllStatus = async (req, res, next) => {
    res.json({status: Object.values(Status)})
  }