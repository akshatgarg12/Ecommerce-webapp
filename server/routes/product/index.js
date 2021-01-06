// CRUD for products
const router = require('express').Router()
const authMiddleware = require('../../middleware/auth')
const {v4:uuid} = require('uuid')
const client = require('../../config/postgres')
router.use(authMiddleware);

router.route('/')
      .post(async(req,res)=>{
        // add a product
        const {title, img, price, description, categoryid} = req.body;
        if(!title || !img || !price || !description || !categoryid){
          return res.status(404).json({error:"please fill all the fields"});
        }
        const id = uuid();
        const sellerid = req.user.id;
        const query = 'INSERT INTO product(id, title, sellerid, img, price, avialable, description, categoryid) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
        const params = [id, title, sellerid, img, price, true, description, categoryid];
        try{
          const product = await client.query(query,params);
          res.status(200).json({message:"product successfully added!"});
        }catch(e){
          console.log(e.message);
          return res.status(404).json({error:e.message});
        }
        
      })
      .delete(async(req,res)=>{
        // delete a product
        const {id} = req.body;
        if(!id) return res.status(404).json({error:"please specify the product to delete"});
        const sellerid = req.user.id;
        const query = 'DELETE FROM product WHERE id = $1 AND sellerid = $2';
        const params = [id, sellerid];
        try{
          const product = await client.query(query,params);
          res.status(200).json({message:"product successfully deleted!"});
        }catch(e){
          console.log(e.message);
          return res.status(404).json({error:e.message});
        }
      })
      .patch(async(req,res)=>{
        // update a product
        const {id,title, img, price, description, categoryid, avialable} = req.body;
        if(!id || !title || !img || !price || !description || !categoryid || !avialable){
          return res.status(404).json({error:"please fill all the fields"});
        }
        const sellerid = req.user.id;
        const query = 'UPDATE product SET title=$3,img=$4, price=$5, description = $6, categoryid = $7, avialable = $8 WHERE id = $1 AND sellerid = $2';
        const params = [id, sellerid, title, img, price, description, categoryid, avialable];
        try{
          const product = await client.query(query,params);
          res.status(200).json({message:"product successfully updated!"});
        }catch(e){
          console.log(e.message);
          return res.status(404).json({error:e.message});
        }
      });



module.exports = router;