const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
mongoose.set('strictQuery', false);
const connectionString=process.env.MONGO_URI
mongoose.connect(connectionString)

const database = mongoose.connection;
database.on('error',(error)=>{
console.log(error);
})
app.use(express.json())
app.use('/users',userRoutes)
database.once('connected', ()=>{
    console.log("Database connected");
})

const PORT = process.env.PORT || 6000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} ...`);

})