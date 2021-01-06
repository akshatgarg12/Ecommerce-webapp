const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require('graphql')
const {Products} = require('../data')
const {ProductType, SellerType} = require('../types')
const client = require('../../config/postgres')

const RootQuery = new GraphQLObjectType({
  name:'RootQuery',
  fields:{
    product:{
      name:'Product',
      type:ProductType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
      },
      async resolve(_,args){
        const {id} = args;
        const data = await client.query('SELECT * FROM product WHERE id = $1', [id])
        return data.rows[0];
      }
    },
    seller:{
      name:'Seller',
      type:SellerType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
      },
      async resolve(_, args){
        const {id} = args;
        const data = await client.query('SELECT * FROM users WHERE id = $1', [id])
        return data.rows[0];
      }
    },
    sellers:{
      name:'Sellers',
      type:GraphQLList(SellerType),
      args:{collegeid:{type:GraphQLString}},
      async resolve(_, args){
        const {collegeid} = args;
        if(collegeid){
          const data = await client.query('SELECT * FROM users WHERE collegeid = $1',[collegeid]);
          return data.rows;
        }
        const data = await client.query('SELECT * FROM users')
        return data.rows;
      }
    },
    products:{
      name:'Products',
      type:GraphQLList(ProductType),
      args:{
        maxPrice:{type:GraphQLInt},
        minPrice:{type:GraphQLInt},
        sellerId:{type:GraphQLID},
        // college:{type:GraphQLString}
      },
      resolve(_,args){
        const {maxPrice, minPrice, sellerId, college} = args;
        var products = []
        if(maxPrice){
          products = products.concat(Products.filter(product => product.price <= parseInt(maxPrice)));
        }
        if(minPrice){
          products = products.concat(Products.filter(product => product.price >= parseInt(minPrice)));
        }
        if(sellerId){
          products = products.concat(Products.filter(product => product.sellerId === parseInt(sellerId)));
        }
        // remove duplicates
        products = [...new Set(products)];
        return products;
      }
    }
  }
})
module.exports = RootQuery;