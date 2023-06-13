const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/auth');
const mongoString =  process.env.DATABASE_URL;




const app = express();
// console.log('5fft')
app.use('/api',routes);
app.use('/api',require('./routes/sell'))
app.use(express.json());




// console.log(mongoString);

mongoose.connect(mongoString);
const database = mongoose.connection;

// console.log('hhf')
database.on('error',(error)=>{
    console.log(error)
})
// console.log('ribfiwd')
database.once('connected',()=>{
    console.log('Database Connected')
})



app.listen(3000,()=>{
    console.log(`Server is loading on port ${3000}`)
})