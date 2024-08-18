require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const {run }=require('./db/db')
app.use(cookieParser());
app.use(bodyParser.json());
const allowedOrigins = [ 'https://noteflect.netlify.app','http://localhost:3000'] 

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If your frontend needs to send cookies or authorization headers
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/User'));
app.use('/api/Admin', require('./routes/admin'));
app.use('/api/Request', require('./routes/Request'));

app.listen(port, async () => {
  await run().catch(ex=>{
    console.log(ex);
  });
  console.log(`Example app listening on port ${port}`)
})
