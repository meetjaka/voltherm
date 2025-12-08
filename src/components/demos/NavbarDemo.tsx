'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { cn } from '@/lib/utils';

export function NavbarDemo() {
    return (
        <div className='relative flex w-full items-center justify-center'>
            <Navbar className='top-2' />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cn('fixed inset-x-0 top-8 z-50 mx-auto max-w-5xl', className)}>
            <Menu setActive={setActive}>
                <Link href='/' className='flex items-center gap-3'>
                    <Image
                        src='/images/logo.png'
                        alt='Voltherm Logo'
                        width={40}
                        height={40}
                        className='object-contain'
                    />
                    <span className='text-lg font-bold'>Voltherm Technologies</span>
                </Link>
                <div className='flex items-center space-x-8'>
                    <HoveredLink href='/'>Home</HoveredLink>
                    <HoveredLink href='/about'>About Us</HoveredLink>
                    <MenuItem setActive={setActive} active={active} item='Products'>
                        <div className='flex flex-col space-y-4 text-sm'>
                            <HoveredLink href='/products/ev-batteries'>Electric Vehicles Batteries</HoveredLink>
                            <HoveredLink href='/products/solar-batteries'>Solar Batteries</HoveredLink>
                            <HoveredLink href='/products/drone-batteries'>Drone Batteries</HoveredLink>
                        </div>
                    </MenuItem>
                    <HoveredLink href='/contact'>Contact</HoveredLink>
                    <HoveredLink href='/blog'>Blog</HoveredLink>
                </div>
            </Menu>
        </div>
    );
}

export default NavbarDemo;
