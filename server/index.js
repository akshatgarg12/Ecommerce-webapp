const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const { graphqlHTTP } = require('express-graphql')
const PORT = process.env.PORT || 5000
require('dotenv').config()
const MyGraphQLSchema = require('./graphql')
// middlewares
app.use(helmet({
  // required to make graphql work
  contentSecurityPolicy:false
}))
app.use(cors())
app.use(express.json({limit:'40mb'}))
app.use(express.urlencoded({extended:true}))

app.use('/api/graphql',graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}),)

app.get('/',(req,res)=>{
  res.send("hello world");
})

app.listen(PORT,()=> console.log(`server listening at ${PORT}`))