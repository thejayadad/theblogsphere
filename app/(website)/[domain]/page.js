import prisma from '@/lib/prisma';
import React from 'react';

const AllPostPage = async ({ params }) => {
  // Log params to debug and check if blogUrl is being received
  console.log('Params:', params);

  // Destructure blogUrl from params
  const blogUrl = params.id; // Access the blogUrl directly
  console.log("All Post Blog " + blogUrl);

  // Fetch the blog details by its blogUrl
  const blog = await prisma.blog.findFirst({
    where: {
      blogUrl: params.domain, // Use blogUrl to find the specific blog
    },
    include: {
      herobanner: {
        where: {
          isActive: true, // Only include hero banners where isActive is true
        },
      },
    },
  });
  const hero = await prisma.hero.findFirst({
    where:{
        blogId: blog.id
    }
  })
  // If the blog is not found, return a not found message
  if (!blog) {
    return <div>Blog not found</div>;
  }     

  return (
    <div className="p-8 flex flex-col items-center justify-center h-full w-full">
      {/* Display the Blog Name */}
      <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>
      <h1 className="text-3xl font-bold mb-4">{blog.blogUrl}</h1>
      <h1 className="text-3xl font-bold mb-4">{blog.id}</h1>


      <div className="flex flex-col w-full gap-4">
        {/* Display each Hero Banner with title, description, image URL, and position */}
        {/* {blog.herobanner.map((hero) => (
          <div key={hero.id} className="bg-white shadow-md rounded p-4 mb-4 w-full">
            <h2 className="text-xl font-semibold">{hero.title}</h2>
            <p className="text-gray-700 mb-2">{hero.description}</p>
            {hero.imageUrl && (
              <img src={hero.imageUrl} alt={hero.title} className="mb-2 max-w-full h-auto rounded" />
            )}
            <p className="text-gray-500">Position: {hero.position}</p>
          </div>
        ))} */}
        {hero?.title}
        {hero?.description}
      </div>
    </div>
  );
};

export default AllPostPage;
