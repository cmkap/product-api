const express = require('express');
const app = express();
const port = 8080;

const {startDatabase} = require('./database/mongo');
const {insertProduct, getProducts, deleteProduct, updateProduct} = require('./database/products');




app.get('/products', async(req,res) => {
    res.send(await getProducts());
});

// This responds a GET request
app.get('/products/:productId', (req, res) => {
    console.log("Got a GET request");
    res.send('Hello GET\n');
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
  await updateProduct(req.params.id, updatedProduct);
  res.send({ message: 'Product updated.' });
})

// This respinds a Delete request
app.delete('product/:id', async (req, res) => {
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