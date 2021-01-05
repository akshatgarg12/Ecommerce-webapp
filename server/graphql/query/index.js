const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = require('graphql')
const {Products, Sellers} = require('../data')
const {ProductType, SellerType} = require('../types')

const RootQuery = new GraphQLObjectType({
  name:'RootQuery',
  fields:{
    product:{
      name:'Product',
      type:ProductType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
      },
      resolve(_,args){
        const {id} = args;
        return Products.filter((product) => product.id === parseInt(id))[0]
      }
    },
    seller:{
      name:'Seller',
      type:SellerType,
      args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
      },
      resolve(_, args){
        const {id} = args;
        return Sellers.filter(seller=> seller.id === parseInt(id))[0];
      }
    },
    sellers:{
      name:'Sellers',
      type:GraphQLList(SellerType),
      resolve(_, args){
        return Sellers;
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