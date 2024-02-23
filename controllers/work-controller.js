const db = require("../models/db")
const {Status} = require ("@prisma/client")

exports.workout = async (req, res, next) => {

    try {
    const { workoutType , WorkoutDate,img , advice } = req.body;
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

  exports.getworkout = async (req, res, next) => {
    try {
      const getworkout = await db.workout.findMany({
        // where : { userId : req.user.id}
      })
      res.json(getworkout)
    } catch (err) {
      next(err)
    }
  }


  exports.updateworkout = async (req, res, next) => {
    // validate req.params + req.body
    const {id} = req.params
    const data = req.body
    try {
      const rs = await db.todo.update({
        data :  {...data},
        where: { id : +id , userId : req.user.id} 
      })
      res.json({msg: 'Update ok', result: rs})
    }catch(err){
      next(err)
    }
  }

  exports.getAllStatus = async (req, res, next) => {
    res.json({status: Object.values(Status)})
  }