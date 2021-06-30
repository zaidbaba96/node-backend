const cors = require('cors')
const express = require('express');
const app= express();
require("dotenv").config();
const port = process.env.PORT || 4000;


app.use(express.json())

const cookieParser = require("cookie-parser")
app.use(cookieParser());

// app.use(function (req, res, next) {

//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const User = require('./models/userSchema')
const bodyParser = require("body-parser");

const mongoose = require('mongoose')


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
  

//Middleware
// const middleware = (req, res, next)=>{
//     console.log(`Hello From Middleware`)
//     next();

// }
app.use(require('./router/auth'));
mongoose
  .connect(
    "mongodb+srv://zaidbaba:zaidbaba@cluster0.knqp5.mongodb.net/mern_profile?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false,
      bufferCommands: true
    }
  )
  .then(() => {
    console.log("MongoDB connected .....");
  })
  .catch(err => {
    console.log(err);
  });


// app.get('/about', (reeq,res)=>{
//   console.log("Hello My About")
//   res.send("Hello About the World From Server")
// })

app.get('/contact', (req,res)=>{
  console.log("Hello My About")
  res.send("Hello About the World From Server")
})


app.listen(port, (req , res)=>{

    console.log("Server Listen At 4000");

})
