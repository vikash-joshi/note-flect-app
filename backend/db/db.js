/*require('dotenv').config();

const mongoose=require('mongoose');
const mongoURI=process.env.Mongoose_URI;
const ConnectMongoose=()=>
{
    mongoose.connect(mongoURI);
    console.log('connected')
}


module.exports=ConnectMongoose


/*
const uri = "mongodb+srv://dbuser:<n43cuuB2yXOUvGOu>@cluster0.n6mih0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
";


mongodb+srv://dbuser:n43cuuB2yXOUvGOu@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority*/
/*
require('dotenv').config();
//const mongoURI=process.env.Mongoose_URI;
const { MongoClient, ServerApiVersion } = require('mongodb');
const url=process.env.Mongoose_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports={ run}
//run().catch(console.dir);

*/
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose');
const url = process.env.Mongoose_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: '1',  // MongoDB Stable API Version 1 (introduced in MongoDB 5.0+)
      strict: true,
      deprecationErrors: false
    },
    serverSelectionTimeoutMS: 30000,  // Wait up to 30 seconds for server selection
  });

if (!url) {
  console.error("MongoDB URI is not set. Check your .env file.");
  process.exit(1);  // Exit the process if MongoDB URI is not set
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
});
async function connectdb(){
    try {
        // Connect the client to the server
        await client.connect();
        
        // Send a ping to confirm a successful connection
        await client.db("NoteFlect").command({ ping: 1 });
        
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
      } finally {
        // Ensure that the client will close when finished/error
      //  await client.close();
      }   
}

async function CloseConnection() {
    try {
        // Connect the client to the server
        await client.connect();
        
        // Send a ping to confirm a successful connection
        await client.db("NoteFlect").command({ ping: 1 });

        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB successfully');
          });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
      } finally {
        // Ensure that the client will close when finished/error
        await client.close();
      }
}
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("NoteFlect").command({ ping: 1 });

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB successfully');
      });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  } finally {
    // Ensure that the client will close when finished/error
    await client.close();
  }
}

async function name(params) {
    try{
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB successfully');
          });
    }
    catch(ex)
    {

    }
}

module.exports = { run };



