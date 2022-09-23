const {getDatabase} = require('./mongo');




const collectionName = 'products';

async function insertProduct(product) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(product);
  return insertedId;
}

async function getProducts() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getSingleProduct(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    stock_number: id
  })
}

async function deleteProduct(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    stock_number: id 
  })
}

async function updateProduct(id, product) {
  const database = await getDatabase();
  await database.collection(collectionName).findOneAndUpdate(
    { stock_number: id },
    {
      $set: {
        ...product
      }
    },
    {
      upsert: true
    }
  )
  

}
module.exports = {
  insertProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
};

