import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function seed() {
    const connectionString = process.env.DATABASE_URL!;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    try {
        await prisma.user.createMany({
            data: [
                { email: "ashan@gmailcom", name: "Ashan" },
                { email: "kumar@gmailcom", name: "Kumar" },
                { email: "nimal@gmailcom", name: "Nimal" }
            ]
        });
        console.log("Seeded 3 users successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
      
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

seed();