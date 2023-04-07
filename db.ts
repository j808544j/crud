const MongoClient = require("mongodb").MongoClient;
export const client = new MongoClient(
  "mongodb+srv://j808544j:j808544j@cluster0.t2hit5b.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
