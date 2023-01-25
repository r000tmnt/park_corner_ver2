import { MongoClient } from "mongodb";

const client: any = new MongoClient(process.env.MongoDB_url || "mongodb://localhost:27023/")

export default client;