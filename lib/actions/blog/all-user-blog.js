'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function allUserBlogs() {
  try {
    const session = await auth();
    const user = session?.user;
    const userEmail = user?.email;
    console.log("UserEmail " + userEmail);

    if (!userEmail) {
      throw new Error('User is not authenticated');
    }

    // Fetch all blogs created by the authenticated user
    const userBlogs = await prisma.blog.findMany({
      where: { userId: userEmail },
      orderBy: { createdAt: 'desc' }, // Order by the most recent
    });

    return userBlogs;
  } catch (error) {
    console.log("Error fetching user blogs:", error);
    throw new Error('Error: ' + error.message); // Throw the actual error message
  }
}
