import "dotenv/config";
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;
 const pool = new Pool({ connectionString });
 const adapter = new PrismaPg(pool);
 const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

app.use(express.json());

 //routes 

 app.get("/users", async (req, res) => {
   try {
     const users = await prisma.user.findMany();
     res.json(users);
   } catch (error) {
     res.status(500).json({ error: "Failed to fetch users" });
   }
 });

//update user
 app.put("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: req.body,
    });

    res.json({updatedUser});

    }catch(error){
    res.status(500).json({ error: "Failed to update user" });
    }
 } );

//delete user

app.delete("/users/:id", async (req, res) => {
    
});
app.listen(PORT, () => {
  console.log(`Server is running on 3000`);
});
