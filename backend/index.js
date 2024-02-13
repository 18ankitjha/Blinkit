const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
var cors = require('cors')
const app = express()
app.use(cors())
const port = 5000
require('dotenv').config();

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/images',require('./routes/image'))

app.listen(port, () => {
  console.log(`Notebook listening on port ${port}`)
})
