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
    try{
        const products = await getProducts()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
});

// This responds a GET request
app.get('/products/:productId', async(req, res) => {
    try{
        const product = await getSingleProduct(req.params.productId)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: err.message})
    }
    
})

// This responds a POST request
app.post('/products', async(req, res) => {
    const product = req.body;
    try{
      await insertProduct(product)  
      res.status(201).json({message: 'Product inserted'})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// This responds a PUT request
app.put('/products/:productId', async(req, res) => {
    const updatedProduct = req.body;
    try{
        await updateProduct(req.params.productId, updatedProduct);
        res.status(200).json({ message: 'Product updated.' });
    } catch (err){
        res.status(400).json({ message: err.message })
    }
    
})

// This responds a Delete request
app.delete('/products/:id', async (req, res) => {
    await deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product removed.' });
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