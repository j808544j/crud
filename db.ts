const MongoClient = require("mongodb").MongoClient;
export const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getContractCollection() {
  await client.connect();
  const database = client.db("cms");
  return database.collection("contract");
}

export async function getUserCollection() {
  await client.connect();
  const database = client.db("cms");
  return database.collection("user");
}
