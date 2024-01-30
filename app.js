import express from 'express';
import { connectDatabase, closeDatabase } from './db.js';
import usersRoutes from './routes/usersRoutes.js';
import postsRoutes from './routes/postsRoutes.js';

//require("dotenv").config();

const app = express();
app.use(express.json());

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const db = await connectDatabase("admin");
    await db.command({ ping: 1 });
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch (e) {
    console.error("Error connecting to mongoDB");
  } 
  finally {
    // Ensures that the client will close when you finish/error
    await closeDatabase();
  }
}
run().catch(console.dir);

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
})