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
  const productsCollection = client.db('emaJohnStore').collection('products');
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productsCollection.insertMany(product).then((result) => {
      res.send(result.insertCount);
      console.log(result.insertCount);
    });
  });

  app.get('/products', (req, res) => {
    productsCollection
      .find({})
      .limit(20)
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.get('/product/:key', (req, res) => {
    productsCollection
      .find({ key: req.params.key })
      .limit(20)
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  app.post('/productsByKeys', (req, res) => {
    const productKeys = req.body;
    productsCollection
      .find({ key: { $in: productKeys } })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);
