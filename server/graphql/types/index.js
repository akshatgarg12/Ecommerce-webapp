const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const {Sellers, Products, Colleges} = require('../data');
const client = require('../../config/postgres');
// product type
const ProductType = new GraphQLObjectType({
  name:'Product',
  fields:()=>({
    id:{type: new GraphQLNonNull(GraphQLID)},
    sellerid:{type: new GraphQLNonNull(GraphQLID)},
    title:{type:new GraphQLNonNull(GraphQLString)},
    img:{type:new GraphQLNonNull(GraphQLString)},
    price:{type:new GraphQLNonNull(GraphQLInt)},
    avialable:{type: new GraphQLNonNull(GraphQLBoolean)},
    seller:{
      type:SellerType,
      async resolve(parent, _){
        const data = await client.query('SELECT * FROM users WHERE id = $1', [parent.sellerId])
        return data.rows[0];
      }
    }
  })
})

// seller type
const SellerType = new GraphQLObjectType({
  name:'Seller',
  fields:()=>({
    id:{type: new GraphQLNonNull(GraphQLID)},
    name:{type:GraphQLString},
    displayimg:{type:GraphQLString},
    email:{type:GraphQLString},
    location:{type:GraphQLString},
    age:{type:GraphQLInt},
    college:{
      type:CollegeType,
      async resolve(parent, _){
        const data = await client.query('SELECT * FROM college WHERE id = $1', [parent.collegeid])
        // console.log()
        return data.rows[0];
      }
    },
    year:{type:GraphQLInt},
    contact:{
      type:ContactType,
      resolve(parent, _){
        return parent.contact;
      }
    },
    products:{
      type:GraphQLList(ProductType),
      async resolve(parent, _){
        const data = await client.query('SELECT * FROM product WHERE sellerId = $1', [parent.id]);
        return data.rows;
      }
    }
  })
})

// contact type
const ContactType = new GraphQLObjectType({
  name:'Contact',
  fields:()=>({
    phonenumber:{type:GraphQLString},
    address:{type:GraphQLString},
    facebook:{type:GraphQLString},
    instagram:{type:GraphQLString}
  })
})

// college type
const CollegeType = new GraphQLObjectType({
  name:'College',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    location:{type:GraphQLString},
    studentnumber:{
      type:GraphQLInt,
      // resolve(parent,_){
      //   return Sellers.filter(seller => seller.collegeId === parseInt(parent.id)).length;
      // }
    },
  })
})


module.exports = {
  ProductType,
  SellerType
}