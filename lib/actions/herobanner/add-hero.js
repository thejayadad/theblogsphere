'use server'
import prisma from "@/lib/prisma"

export async function createHeroBanner(eventData){
    try {
        const {title, description, imageUrl, position, isActive, blogId} = eventData
        const newHeroBanner = await prisma.hero.create({
            data: {
                title, description, imageUrl, position, isActive, blogId
            }
        })
        return newHeroBanner
    } catch (error) {
        console.log("Error creating heroBanner:", error);
        throw new Error('Error: ' + error.message); // Throw the actual error message
    }
}