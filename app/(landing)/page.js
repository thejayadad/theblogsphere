import React from 'react'
import { auth, signIn, signOut } from '@/auth'
import { FiLogOut, FiUser } from "react-icons/fi"
import Link from 'next/link'
import CreateBlog from '@/components/blog/new-blog/create-blog'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await auth()
  const user = session?.user
  if (user && user.email) {
    const userWithBlogs = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        blogs: {
          orderBy: { createdAt: 'desc' }, // Order blogs by most recent
          take: 1, // Take the most recent blog
        },
      },
    });

    if (userWithBlogs?.blogs?.length > 0) {
      const mostRecentBlogId = userWithBlogs.blogs[0].id;
      // Server-side redirection to the most recent blog
      redirect(`/blog/${mostRecentBlogId}`);
      return null; // Prevent further rendering
    }
  }
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
        <div>
        {user ? 
            <div className='flex space-x-12 items-center'>
                <CreateBlog />
                <LogoutButton />
            </div>   
            :
            <>
            <SignInButton />
            </> 
        }
        </div>
    </section>
  )
}
function SignInButton(){
  return (
      <form
      action={async () => {
          'use server'
          await signIn()
      }}
      >
          <button
          type='submit'>
              <FiUser className='h-4 w-4' />
          </button>
      </form>
  )
}

function LogoutButton(){
  return(
      <form
      action={async () => {
          'use server'
          await signOut()
      }}
      >
          <button
          type='submit'
          >
              <FiLogOut className='h-4 w-4' />
          </button>
      </form>
  )
}

export default HomePage