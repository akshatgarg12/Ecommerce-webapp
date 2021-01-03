const Products = [
  {
    id:1,
    title:'Wooden Cupboard',
    img:'photo_of_cupboard',
    price:2000,
    avialable:true,
    sellerId:2,    
  },
  {
    id:2,
    title:'mattress',
    img:'photo_of_mattress',
    price:1000,
    avialable:false,
    sellerId:3,
  },
  {
    id:3,
    title:'pencil stand',
    img:'photo_of_stand',
    price:100,
    avialable:true,
    sellerId:3,
  }
];

const Sellers = [
  {
    id:1,
    name:'Akshat Garg',
    location:'Ranchi',
    age:19,
    collegeId:3,
    year:2,
    contact:{
      phoneNumber:8107784040,
      address:"471, Adarsh Nagar",
      facebook:"fb_akshatgarg26",
      instagram:"insta_ak7hat"
    }
  },
  {
    id:2,
    name:'Riu Roy',
    location:'Bombay',
    age:19,
    collegeId:1,
    year:1,
    contact:{
      phoneNumber:9829016664,
      address:"Jawahar Nagar",
      facebook:"fb_riu",
      instagram:"insta_riu"
    }
  },
  {
    id:3,
    name:'Buxxo',
    location:'NYC',
    age:19,
    collegeId:2,
    year:4,
    contact:{
      phoneNumber:8107784040,
      address:"471, Adarsh Nagar",
      facebook:"fb_akshatgarg26",
      instagram:"insta_ak7hat"
    }
  }
];

const Colleges = [
  {
    id:1,
    name:'Mithibai',
    location:'Mumbai',
  },
  {
    id:2,
    name:'MIT',
    location:'Michigan',
  },
  {
    id:3,
    name:'BITM',
    location:'Ranchi',
  }
]

module.exports = {
  Products,
  Sellers,
  Colleges
}