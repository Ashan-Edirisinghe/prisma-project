import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import prisma from '@/lib/prisma';

  

export async function GET() {
 try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(jobs);
  } catch (error) {
    console.error("DB ERROR:", error);
    return new Response("Database error", { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
        }

        // Get the user from database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await req.json();
        const { title, type, company, description, location } = body;

        // Create the job
        const job = await prisma.job.create({
            data: {
                title,
                type,
                company,
                description,
                location,
                postedById: user.id
            }
        });

        return NextResponse.json({ success: true, job }, { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}

//get posted jobs by user

 