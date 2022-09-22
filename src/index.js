const express = require('express');
const app = express();
const port = 8080;

const {startDatabase} = require('./database/mongo');
const {insertProduct, getProducts} = require('./database/products');


const product = [
    {
        "stock_number":"12345",
        "name":"Pro Batteries",
        "Description":"Batteries",
        "Price":"£1.99"
    },
]

// This responds a GET request
app.get('/products/:productId', (req, res) => {
    console.log("Got a GET request");
    res.send('Hello GET\n');
})

// This responds a POST request
app.post('/products', function (req, res) {
    console.log("Got a POST request");
    res.send('Hello POST\n');
})

// This responds a PUT request
app.put('/products/:productId', function (req, res) {
    console.log("Got a PUT request");
    res.send('Hello PUT\n');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})