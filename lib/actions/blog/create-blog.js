'use server'
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function createBlog(eventData){
    const session = await auth()
    const user = session?.user
    const userEmail = user?.email
    console.log("UserEmail " + userEmail)
    try {
        const {name, blogUrl} = eventData
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }
        const newBlog = await prisma.blog.create({
            data: {
                name, blogUrl, userId: existingUser.email
            }
        })
        return newBlog
    } catch (error) {
        console.log("Error creating blog:", error);
        throw new Error('Error: ' + error.message); // Throw the actual error message
    }
}