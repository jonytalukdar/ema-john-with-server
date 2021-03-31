const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shsop.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const products = client.db('emaJohnStore').collection('products');
  app.post('addProducts', (req, res) => {
    const product = req.body;
    products.insertOne(product).then((result) => {
      console.log(result);
    });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
