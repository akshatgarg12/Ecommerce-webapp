const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const client = require('../../config/postgres')
const cookieAge = 3 * 60 * 60 * 1000;

const getJWT = (id) => {
  const token = jwt.sign({id},"some-secret",{expiresIn:cookieAge/1000});
  return token;
}
router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(404).json({error:"please fill all the fields"});
  } 
  // to check email and get users password.
  const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  if(user.rows.length){
    const {id} = user.rows[0];
    const storedPassword = user.rows[0].password;
    
    bcrypt.compare(password, storedPassword, (err,match)=>{
      if(err){
      console.log(err);
       return res.status(404).json({error:"You are unauthorized"});
      }
      if(match){
          res.cookie('user', getJWT(id), {httpOnly:true, maxAge:cookieAge});
          res.status(200).json({success:"You have been logged in!", user:user.rows[0]})
      }else{
        res.status(404).json({error:"Invalid password"});
      }
    });

  }else{
    
    res.cookie('user', null, {httpOnly:true, maxAge:0});
    res.status(404).json({error:"user with email doesn't exists"})
  }
  
});

module.exports = router;