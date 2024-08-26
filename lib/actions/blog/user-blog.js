'use server';

import prisma from '@/lib/prisma';

export async function getUserBlog(id) {
  try {

    // Verify if the user exists in the database
    const userWithBlogs = await prisma.blog.findUnique({
      where: { id: id },
     
    });

    return userWithBlogs
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}
