const jwt = require('jsonwebtoken')
const auth = (req,res,next) => {
  const {user} = req.cookies;
  if(user){
    try{
      const token = jwt.verify(user,process.env.JWT_SECRET);
      req.user = token;
      next();
    }catch(e){
      res.cookie('user', null, {maxAge:0});
      res.status(401).json({error:"login to access this data"});
    }
  }else{
    res.cookie('user', null, {maxAge:0});
    res.status(401).json({error:"login to access this data"});
  }
}

module.exports = auth;