const db = require("../models/db")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  const { name, username, password, confirmPassword, email } = req.body;
  try {
    // validation
    if (!(name && username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const data = {
      name,
      username,
      password : hashedPassword,
      email
    };

    const rs = await db.user.create({ data  })
    // console.log(rs)

    res.json({ msg: 'Register successful' })
  } catch (err) {
    next(err);
  }
};

exports.login = async (req , res , next) => {
  const { username , password } = req.body
  try{
    if(!(username.trim() && password.trim())){
      return next(new Error("Fulfill all inputs"));
    }

    const user = await db.user.findFirstOrThrow({where: {username}})

    const pwOk = await bcrypt.compare(password, user.password)
    if(!pwOk){
      throw new Error('invalid login password')
    }

    const payload = {id : user.id}
    const token = jwt.sign(payload , process.env.JWT_SECRET,{
      expiresIn: '30d'
    })
    // console.log(token)
    res.json({token: token})

  }catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error registering' });
}

}

exports.getme = (req,res,next) => {
  res.json(req.user)
}