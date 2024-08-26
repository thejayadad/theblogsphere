'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiArrowLeft, FiImage, FiSettings } from 'react-icons/fi';
import BlogItem from './blog-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Aside = ({ blog }) => {
  const [width, setWidth] = useState(320); // Initial width of the sidebar
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef(null);
  const pathname = usePathname(); // Get the current pathname

  // Function to handle mouse down event for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault(); // Prevent text selection
  };

  // Function to handle mouse move event for resizing the sidebar
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;

    // Set width with both min and max constraints
    const constrainedWidth = Math.max(80, Math.min(newWidth, 320)); // Minimum width of 80px, maximum width of 320px
    setWidth(constrainedWidth);
  };

  // Function to handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mousemove and mouseup on mount and remove them on unmount
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Routes with conditional styling for active state
  const routes = [
    {
      href: `/blog/${blog?.id}/settings`,
      label: 'Settings',
      active: pathname === `/blog/${blog?.id}/settings`,
      icon: FiSettings,
    },
    {
      href: `/blog/${blog?.id}/heros`,
      label: 'HeroBanner',
      active: pathname === `/blog/${blog?.id}/heros`,
      icon: FiImage,
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className={`group/sidebar h-[100vh] bg-primary/10 overflow-y-hidden overflow-x-hidden relative flex flex-col z-[10000] transition-all duration-300 bg-orange-300`}
    >
      <div>
        <BlogItem blog={blog} />
      </div>

      <div className='mt-8'>
        <div className='pl-[18px] flex flex-col space-y-4'>
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`text-sm flex items-center space-x-2 font-medium transition-colors ${
                route.active ? 'text-primay/10 font-bold' : 'text-gray-600 hover:text-primary'
              }`}
            >
              <route.icon className='h-5 w-5 mr-2' />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div
        className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/30 top-0 right-0 flex items-center justify-center'
        onMouseDown={handleMouseDown}
      >
        {/* Drag handle */}
        <div className='w-1 h-full bg-gray-500'>
          <FiArrowLeft className='h-4 w-4' />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
