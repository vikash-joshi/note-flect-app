require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT
//var cors = require('cors')
const cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const ConnectMongoose=require('./db/db')
//const { StartTask } =require('./common/custoncron')
//const { startCronJobs } = require('./common/cronjobs');

//app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.json());
// Server-side code (example in Express.js)
// Server-side code (example in Express.js)

// Define allowed origins
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
/*app.use(cors({
  origin:[ 'https://noteflect.netlify.app','http://localhost:3000'],
 methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If your frontend needs to send cookies or authorization headers
  optionsSuccessStatus: 200,
}));
*/

app.use(express.json())
//StartTask(); 
//startCronJobs();
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/User'));
app.use('/api/Admin', require('./routes/admin'));


app.listen(port, async () => {
  await ConnectMongoose();
  console.log(`Example app listening on port ${port}`)
})
