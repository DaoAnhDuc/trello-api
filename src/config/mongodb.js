/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const MONGODB_URI = env.MONGODB_URI;
const DB_NAME = env.DB_NAME;
import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let trelloDatabaseInstance = null;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClientInstance.connect();

    // Send a ping to confirm a successful connection
    trelloDatabaseInstance = await mongoClientInstance.db(DB_NAME);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to DB first!");
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
