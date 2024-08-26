import prisma from '@/lib/prisma';
import React from 'react'

const SettingsPage = async ({params}) => {
    const { id } = params; // Assume `params` is passed as a prop
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        }
    })
  return (
    <div>
        {blog?.name}
        SettingsPage</div>
  )
}

export default SettingsPage