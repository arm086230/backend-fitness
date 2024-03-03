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


exports.workout = async (req, res, next) => {

    try {
    const { workoutType , WorkoutDate,img , advice } = req.body;
    console.log(req.body);
    const userId = req.user.id;
    const workout = await db.workout.create({
        data:{
            workoutType,
            WorkoutDate,
            img,
            advice,
            userId
        }
    })
    res.json({message:'successful', workout})
    } catch (err) {
      next(err);
    }
  };
  exports.deleteuser = async (req, res , next) => {
    const {id} = req.params;
    try{
        const rs = await db.user.delete({
            where:{ id : +id }
        })
        res.json({message : "Deleted user", result : rs})
    }catch(err){
        next(err)
    }
  }

//   exports.updateuser = async (req , res , next) =>{
//     const {id} = req.params;
//     const {role} = req.body;
//     try{
//         const rs = await db.user.update({
//             where:{ id : +id },
//             data:{
//                 role,
//             }
//         })
//         res.json({message : "Updated ok", result : rs})
//     }catch(err){
//         next(err)
//     }
//   }




