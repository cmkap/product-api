const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8080;

const app = express();


app.use(bodyParser.json())

app.use(cors());

const {startDatabase} = require('./database/mongo');
const {insertProduct, getProducts, getSingleProduct, deleteProduct, updateProduct} = require('./database/products');




app.get('/products', async(req,res) => {
    res.send(await getProducts());
});

// This responds a GET request
app.get('/products/:productId', async(req, res) => {
    res.send(await getSingleProduct(req.params.productId));
})

// This responds a POST request
app.post('/products', async(req, res) => {
    const newProduct = req.body;
    await insertProduct(newProduct);
    res.send({ message: 'New product added.'})
})

// This responds a PUT request
app.put('/products/:productId', async(req, res) => {
    const updatedProduct = req.body;
    await updateProduct(req.params.productId, updatedProduct);
    res.send({ message: 'Product updated.' });
})

// This responds a Delete request
app.delete('/products/:id', async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ message: 'Product removed.' });
  });

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertProduct({
        "stock_number":"12345",
        "name":"Pro Batteries",
        "Description":"Batteries",
        "Price":"£1.99"
    })
})
// start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})