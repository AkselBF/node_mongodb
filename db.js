import { MongoClient, ServerApiVersion } from 'mongodb';
import "dotenv/config";

const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDatabase(dbName = "lectureTest") {
  try {
    await client.connect();
    console.log("Connected to database");
    return client.db(dbName);
  }
  catch (e) {
    console.error("Error connecting to the database", e);
    throw e;
  }
}

async function closeDatabase() {
  try {
    await client.close();
    console.log("Closed to database");
    client.db("lectureTest");
  }
  catch (e) {
    console.error("Error closing to the database", e);
    throw e;
  }
}

export {connectDatabase, closeDatabase};