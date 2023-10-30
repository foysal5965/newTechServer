const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("New tech is ready");
});
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3v10x4o.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const featuredProductsCollection = client
      .db("NewTech")
      .collection("featuredProducts");
    const productsDetailsCollection = client
      .db("NewTech")
      .collection("productsDetails");
    app.get("/featured-products", async (req, res) => {
      const query = {};
      const featuredProducts = await featuredProductsCollection
        .find(query)
        .toArray();
      res.send(featuredProducts);
    });
    app.get("/featured-products-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category: id };
      const products = await productsDetailsCollection.find(query).toArray();
      res.send(products);
    });
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      
      const query = { _id:new ObjectId(id) };
      
      const products = await productsDetailsCollection.findOne(query)
      res.send(products);
    });
  } finally {
  }
}
run().catch((er) => console.log(er));
app.listen(port, () => {});
