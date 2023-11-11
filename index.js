const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
 

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzobjs3.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, 
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
   client.connect();
      const petsCollection = client.db('pets').collection('allPets');
       app.get('/pets', async (req, res) => {
      const cursor = petsCollection.find({});
      const pets = await cursor.toArray();

      res.send(pets);
       });
      app.get('/pets/:id', async (req, res) => {
      const id = req.params.id;
     const result = await petsCollection.findOne({ _id: new ObjectId(id) });
     
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})