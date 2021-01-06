const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const client = require('../../config/postgres')
const cookieAge = 3 * 60 * 60 * 1000;
const validator = require('validator');
const {v4:uuid} = require('uuid');
const getJWT = (id) => {
  const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:cookieAge/1000});
  return token;
}

router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(404).json({error:"please fill all the fields"});
  } 
  // to check email and get users password.
  const query = 'SELECT * FROM users WHERE email = $1'
  const params = [email]
  const user = await client.query(query,params);
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

router.post('/register', async(req,res)=>{
  const {name, email, password, age, location, collegeid, year} = req.body;

  if(!name || !email || !password || !age || !location || !collegeid || !year){
   return res.status(404).json({error:"please fill all the fields"});
  } 
  // check if the email is valid,hash the password and store the user.
  if(validator.isEmail(email)){
    const hashedPassword = await bcrypt.hash(password,10);
    const id = uuid();
    try{
      const user = await client.query('INSERT INTO users(id, name, email, password, age, location, collegeid, year, contact) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id,name,email,hashedPassword,age,location,collegeid,year, {phonenumber:"8107784040"}]);
      res.status(200).json({success:"user registered successfully"});
    }catch(e){
      console.log("error at registering user: ", e.message);
      return res.status(400).json({message:"retry by filling all the fields appropriately.", error:e.message})
    }
  }
  else{
    return res.status(400).json({error:"invalid email"})
  }
})

module.exports = router;