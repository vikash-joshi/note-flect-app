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

const { MongoClient, ServerApiVersion } = require('mongodb');
const url="mongodb+srv://jitani5571:GL0YqXDoCeY8i0S2@noteapp.qhbis.mongodb.net/?retryWrites=true&w=majority&appName=NoteApp"
//const uri="mongodb://jitani5571:<GL0YqXDoCeY8i0S2>@<NoteApp>/NoteFlect?ssl=true&replicaSet=atlas-13gsof-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NoteApp"
const uri = "mongodb+srv://jitani5571:GL0YqXDoCeY8i0S2@NoteApp.mongodb.net/NoteFlect?retryWrites=true&w=majority";
//const uri = "mongodb+srv://vikash:RX25xpojrKvq66vV@cluster0.mongodb.net/NoteFlect?retryWrites=true&w=majority";

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


