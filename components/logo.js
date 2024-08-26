'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link 
    className='flex items-center'
    href={'/'}>
        <Image
    className='hidden md:block cursor-pointer'
    alt='logo'
    height='100'
    src='/logo.png'
    width='100'
    />
    </Link>
  )
}

export default Logo