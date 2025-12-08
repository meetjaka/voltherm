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
                        <div className='grid grid-cols-2 gap-10 p-4 text-sm'>
                            <ProductItem
                                title='Electric Vehicles Batteries'
                                href='/products/ev-batteries'
                                src='https://lh3.googleusercontent.com/sitesv/AAzXCkciXfJDOe8H422kucQO97PvUbBFNCVm7LZkD1IiBJyyweS2iK4K8O33uK4t3J4BgYjlIvslpMSeMSkW8S_YnOAvvcyCWl5eX-ruByYLsW7nxNQlax4MxLrhxUoSxNp_a47iY3aTdEirnismB8vTMxjgbFR7Hja84wCKchZIHmPZumXaY0UBFmEfVIEhMmQHObxgULn15pAG5t-hmKAfNeMzjLRXGuYKqCtU=w1280'
                                description='High-performance battery solutions for electric vehicles.'
                            />
                            <ProductItem
                                title='Solar Batteries'
                                href='/products/solar-batteries'
                                src='https://lh3.googleusercontent.com/sitesv/AAzXCkcLg3HzkHWw1eEcAIIsekRSOQNgKInxrLsWtrYmjFObNpfsxycRlJv7kO7N52dHr3HehEUoO-m4Xm1_dvCCw-uQyNcHrCSROqnhQR7ztid22IyW_zmgJ6DpNN8S_HDbhCdnGMaYG3W6ZY1ZPaUAdGT7L_zo1ltdm1wiuUiuh_nsNkNu18CEAllAW0QT73BgxfbbmGAZyawmlddOAW84srRiP0MjnGRPbRsWIVc=w1280'
                                description='Efficient energy storage systems for solar installations.'
                            />
                            <ProductItem
                                title='Drone Batteries'
                                href='/products/drone-batteries'
                                src='https://lh3.googleusercontent.com/sitesv/AAzXCkd_en2oY4YeKahM-nYiWzTfgOpkivvaeQuM-gECdVGANVvrzEYX3tYKgFG15R_2mchV9RfWwz0QX6tJXl0uWDczARswGso2I7YFd985rWawtCxlCxRg_QVSReZT1-oCwgtoSRIuhkf74iiBgr_N84uEnmRxe6ybu3Z25p-YsXeti9nlsrMCt_VTjW2Gsn8AC0ynY3zG0vveUfU2dd-zt6dDgWCIAUue8APgk64=w1280'
                                description='Lightweight, powerful batteries for aerial applications.'
                            />
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
