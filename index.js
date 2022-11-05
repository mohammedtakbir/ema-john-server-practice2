const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;

//* middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.drjbcpx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productsCollection = client.db('emaJohnPractice2').collection('products');

        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.skip(page * size).limit(size).toArray();
            const count = await productsCollection.estimatedDocumentCount();
            res.send({ products, count });
        })

        app.post('/productsByIds', async (req, res) => {
            const ids = req.body;
            const objectIds = ids.map(id => ObjectId(id));
            const query = { _id: { $in: objectIds } };
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
    }
    finally {

    }
};
run().catch(err => console.log(err));





app.get('/', (req, res) => {
    res.send('ema-john practice2 server is running!')
});

app.listen(port, () => {
    console.log(`ema-john practice2 server is running on ${port} port`)
});