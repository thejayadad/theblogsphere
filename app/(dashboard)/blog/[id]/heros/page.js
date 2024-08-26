import ReusableTable from '@/components/table/reusable-table';
import prisma from '@/lib/prisma';
import React from 'react';

const HeroPage = async ({ params }) => {
  const { id } = params;

  // Fetch the blog details
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  // Fetch all hero banners associated with the blog ID
  const heroBanners = await prisma.hero.findMany({
    where: {
      blogId: id,
    },
  });

  return (
    <div className='p-8 flex flex-col items-center justify-center h-full w-full'>
      <div className='flex flex-col mb-4'>
        <h1 className='text-2xl font-bold mb-2'>HeroBanner Page</h1>
        <p className='text-sm text-gray-600'>Create & Update all hero Banners</p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <ReusableTable
          data={heroBanners}
          columns={[
            { uid: 'title', name: 'Title', sortable: true },
            { uid: 'description', name: 'Description', sortable: true },
            { uid: 'isActive', name: 'Is Active', sortable: true },
            { uid: 'actions', name: 'Actions', sortable: false },
          ]}
      
        />
      </div>
    </div>
  );
};

export default HeroPage;
