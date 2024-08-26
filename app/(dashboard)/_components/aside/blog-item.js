'use client';

import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FiChevronsDown } from 'react-icons/fi';
import { allUserBlogs } from '@/lib/actions/blog/all-user-blog';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js for client-side navigation
import CreateBlogForm from '@/components/blog/new-blog/create-blog-form';
import CreateBlog from '@/components/blog/new-blog/create-blog';
import {Select, SelectItem} from "@nextui-org/react";


const BlogItem = ({blog}) => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter(); // Initialize the router for redirection

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userBlogs = await allUserBlogs(); // Fetch all blogs created by the user
        console.log("Fetched Blogs: ", userBlogs);
        setBlogs(userBlogs); // Set the fetched blogs in state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogSelect = (blogId) => {
    router.push(`/blog/${blogId}`); // Redirect to the selected blog's page
  };

  return (
    <div className='flex items-center border  text-sm p-3 w-full hover:bg-primary/5'>
        <Select
        label={blog?.name}
        className="max-w-xs" 
  
        >
      {blogs.length > 0 ? (
            blogs.map((blog) => (
               <SelectItem
               onClick={() => handleBlogSelect(blog.id)}
               key={blog.id}>
                {blog?.name}
               </SelectItem> 
            ))
        ) :
        (
            <SelectItem>
                <p>No Blogs Found</p>
            </SelectItem>
        )
        
        }
        </Select>
      {/* <Dropdown backdrop="blur">
        <DropdownTrigger>
          <button variant="light" className='flex outline-none items-center justify-between w-full'>
            <div>
              {blog?.name}
            </div>
            <div>
              <FiChevronsDown className='h-4 w-4' />
            </div>
          </button>
        </DropdownTrigger>
        <DropdownMenu className='w-full' variant="faded" aria-label="User Blogs">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <DropdownItem key={blog.id} onClick={() => handleBlogSelect(blog.id)}>
                {blog.name}
              </DropdownItem>
      
            ))
          ) : (
            <DropdownItem key="no-blogs" disabled>
              No blogs found
            </DropdownItem>
          )}
           <DropdownItem>
               <CreateBlog />
                </DropdownItem>            
        </DropdownMenu>
      </Dropdown> */}
    </div>
  );
};

export default BlogItem;
