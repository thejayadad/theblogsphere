'use client';

import React, { useState, useEffect } from 'react';
import { getUserBlog } from '@/lib/actions/blog/user-blog';
import Navbar from '../../_components/navbar/navbar';
import Aside from '../../_components/aside/aside';
import {useSession} from "next-auth/react"

const Layout = ({ children, params }) => {
  const { id } = params; // Assume `params` is passed as a prop
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [blog, setBlog] = useState(null);
  const { data: session, status } = useSession(); // Get session and status
  
  console.log("Layout Id ", id);
  console.log("Session Data: ", session); // Log session data
  const userEmail = session?.user.email
  console.log("USerEmail " + userEmail)
  // Function to toggle visibility
  const toggleAsideVisibility = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  // Fetch blog data on client-side
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Directly call getUserBlog function
        const data = await getUserBlog(id); 
        console.log("Layout Data ", data);
        setBlog(data); // Set blog state with fetched data
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className='h-screen '>
      <div className='flex flex-col h-screen overflow-y-hidden w-full'>
      <Navbar toggleAsideVisibility={toggleAsideVisibility} />
        <div className='flex w-full'>
          {/* Conditionally render the aside based on state */}
          {isAsideVisible && (
            <>
            <Aside blog={blog} userEmail={userEmail} />
            </>
          )}
          <main
          style={{maxWidth: '2000px'}}
          className='flex w-full flex-col mx-auto'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
