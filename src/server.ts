import app from "./app";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const port = 5000;
let server: any;

const mongodbURI = "mongodb+srv://testDB:5ACXqs4CpcecmfgM@cluster0.jpopwep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(mongodbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  try {
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");

    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

bootstrap();
