const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  parse
} = require('graphql')

const {Sellers, Products, Colleges} = require('../data');

// product type
const ProductType = new GraphQLObjectType({
  name:'Product',
  fields:()=>({
    id:{type: new GraphQLNonNull(GraphQLID)},
    sellerId:{type: new GraphQLNonNull(GraphQLID)},
    title:{type:new GraphQLNonNull(GraphQLString)},
    img:{type:new GraphQLNonNull(GraphQLString)},
    price:{type:new GraphQLNonNull(GraphQLInt)},
    avialable:{type: new GraphQLNonNull(GraphQLBoolean)},
    seller:{
      type:SellerType,
      resolve(parent, _){
        return Sellers.filter((seller) => seller.id === parent.sellerId)[0];
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
    displayImg:{type:GraphQLString},
    email:{type:GraphQLString},
    location:{type:GraphQLString},
    age:{type:GraphQLInt},
    college:{
      type:CollegeType,
      resolve(parent, _){
        return Colleges.filter(college => college.id === parseInt(parent.collegeId))[0];
      }
    },
    year:{type:GraphQLInt},
    contact:{
      type:ContactType,
      resolve(parent, _){
        return Sellers.filter(seller => seller.id === parseInt(parent.id))[0].contact;
      }
    },
    products:{
      type:GraphQLList(ProductType),
      resolve(parent, _){
        return Products.filter(product => product.sellerId === parseInt(parent.id));
      }
    }
  })
})

// contact type
const ContactType = new GraphQLObjectType({
  name:'Contact',
  fields:()=>({
    phoneNumber:{type:GraphQLString},
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
    studentsNum:{
      type:GraphQLInt,
      resolve(parent,_){
        return Sellers.filter(seller => seller.collegeId === parseInt(parent.id)).length;
      }
    },
  })
})


module.exports = {
  ProductType,
  SellerType
}