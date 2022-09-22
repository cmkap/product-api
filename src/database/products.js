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

module.exports = {
  insertProduct,
  getProducts,
};