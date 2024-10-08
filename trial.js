const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

// GET endpoint to retrieve all grocery items
app.get("/grocery", async (req, res) => {
  try {
    const db = client.db("trial");
    const coll = db.collection("grocery");
    const items = await coll.find({}).toArray(); // Retrieve all items
    res.json(items);
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

// DELETE endpoint to remove a grocery item by ID
app.delete("/grocery/:id", async (req, res) => {
  try {
    const db = client.db("trial");
    const coll = db.collection("grocery");
    const id = req.params.id; // Get the ID from the request parameters

    const result = await coll.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Item removed" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "An error occurred while removing the item" });
  }
});

// PUT endpoint to update the grocery list (optional implementation)
app.put("/grocery", async (req, res) => {
  try {
    const db = client.db("trial");
    const coll = db.collection("grocery");
    const items = req.body; // Expecting the list of items in the request body

    // Clear existing items (optional)
    await coll.deleteMany({});

    // Insert new items
    const result = await coll.insertMany(items);
    res.status(200).json({ message: "Grocery list updated", count: result.insertedCount });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while updating the grocery list" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
