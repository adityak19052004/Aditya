
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const uri = "mongodb+srv://adityakbanglore372:adityak2004@cluster0.5yhme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
app.use(bodyParser.json()); // To parse JSON bodies

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

// GET endpoint to retrieve an item
app.get("/grocery", async (req, res) => {
  try {
    const db = client.db("trial");
    const coll = db.collection("grocery");
    const item = await coll.findOne({ "adi": "adi" });
    res.json({ "message": item ? item.beebzz : "Item not found" });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST endpoint to add a new grocery item
app.post("/grocery", async (req, res) => {
  try {
    const db = client.db("trial");
    const coll = db.collection("grocery");
    const newItem = req.body; // Expecting the new item in the request body

    const result = await coll.insertOne(newItem);
    res.status(201).json({ message: "Item added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while adding the item" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
