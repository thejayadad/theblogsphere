'use client';

import Box from '@/components/box';
import Logo from '@/components/logo';
import { Button } from '@nextui-org/react';
import React from 'react';
import {FiMenu} from "react-icons/fi"

const Navbar = ({ toggleAsideVisibility }) => {
  return (
    <div className='w-full  z-10 shadow-sm'>
        <div className='py-4  border-b-[1px]'>
            <Box>
            <div  className='flex  flex-row w-full items-center justify-between gap-3 md:gap-0'>
                <div className='flex items-center'>
                <Button
                    onClick={toggleAsideVisibility} className="cursor-pointer"
                    >
                        <FiMenu className='h-4 w-4' />
                    </Button>
                    <Logo />
                </div>
                </div>
            </Box>
        </div>
    </div>
  );
};

export default Navbar;
