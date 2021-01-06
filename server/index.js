const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const { graphqlHTTP } = require('express-graphql')
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
// postgres connection
const client = require('./config/postgres')
const apiRoutes = require('./routes');

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
app.use(cookieParser())
app.use('/api/graphql',graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}),)
app.use('/api', apiRoutes);

app.get('/',async (req,res)=>{
  const data = await client.query('SELECT * FROM users');
  res.status(200);
  res.json(data.rows);
})


app.listen(PORT,()=> console.log(`server listening at ${PORT}`))
