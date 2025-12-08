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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cn('fixed inset-x-0 top-4 z-50 mx-auto max-w-5xl px-4 md:top-8', className)}>
            <Menu setActive={setActive}>
                <div className='flex w-full items-center justify-between'>
                    <Link href='/' className='flex items-center gap-2 md:gap-3'>
                        <Image
                            src='/images/logo.png'
                            alt='Voltherm Logo'
                            width={32}
                            height={32}
                            className='object-contain md:h-10 md:w-10'
                        />
                        <span className='text-sm font-bold md:text-lg'>Voltherm Technologies</span>
                    </Link>
                    
                    {/* Mobile Menu Button */}
                    <button
                        className='flex flex-col gap-1.5 p-2 md:hidden'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label='Toggle menu'
                    >
                        <span className={cn('h-0.5 w-6 bg-black dark:bg-white transition-all', isMobileMenuOpen && 'rotate-45 translate-y-2')}/>
                        <span className={cn('h-0.5 w-6 bg-black dark:bg-white transition-all', isMobileMenuOpen && 'opacity-0')}/>
                        <span className={cn('h-0.5 w-6 bg-black dark:bg-white transition-all', isMobileMenuOpen && '-rotate-45 -translate-y-2')}/>
                    </button>

                    {/* Desktop Menu */}
                    <div className='hidden items-center space-x-8 md:flex'>
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
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className='absolute left-0 right-0 top-full mt-4 flex flex-col space-y-4 rounded-2xl border border-black/[0.2] bg-white p-6 shadow-xl dark:border-white/[0.2] dark:bg-black md:hidden'>
                        <Link href='/' className='text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href='/about' className='text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                            About Us
                        </Link>
                        <div className='flex flex-col space-y-2'>
                            <p className='font-semibold text-black dark:text-white'>Products</p>
                            <div className='flex flex-col space-y-2 pl-4'>
                                <Link href='/products/ev-batteries' className='text-sm text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                                    Electric Vehicles Batteries
                                </Link>
                                <Link href='/products/solar-batteries' className='text-sm text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                                    Solar Batteries
                                </Link>
                                <Link href='/products/drone-batteries' className='text-sm text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                                    Drone Batteries
                                </Link>
                            </div>
                        </div>
                        <Link href='/contact' className='text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link href='/blog' className='text-neutral-700 hover:text-black dark:text-neutral-200' onClick={() => setIsMobileMenuOpen(false)}>
                            Blog
                        </Link>
                    </div>
                )}
            </Menu>
        </div>
    );
}

export default NavbarDemo;
