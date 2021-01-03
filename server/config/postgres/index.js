const { Client } = require('pg')
const config = {
  host: 'localhost',
  port: 5432,
  user: 'akshatgarg',
  password: 'admin',
  database:'test'
};

const client = new Client(config)
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to db')
  }
})
module.exports = client;