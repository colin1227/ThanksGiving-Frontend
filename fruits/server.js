const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session')
const cors = require('cors')
const port = 8000;
require('./db/db')

const authController = require("./controllers/auth")
const peopleController = require('./controllers/people')


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
  secret:'still not exactly sure what this does',
  resave: false,
  saveUninitialized: false
}))

//app.use("/table", brunchController);
app.use("/people", peopleController);
app.use("/auth", authController);


app.get('/',(req, res)=>{
  res.json({
      'data': 'success'
  })
})

app.listen(port,()=>{
  console.log(`listening on port ${port} `)
})