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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                        <span className='text-sm font-bold text-slate-900 md:text-lg'>Voltherm Technologies</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className='flex flex-col gap-1.5 p-2 md:hidden'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label='Toggle menu'>
                        <span
                            className={cn(
                                'h-0.5 w-6 bg-slate-700 transition-all',
                                isMobileMenuOpen && 'translate-y-2 rotate-45'
                            )}
                        />
                        <span
                            className={cn(
                                'h-0.5 w-6 bg-slate-700 transition-all',
                                isMobileMenuOpen && 'opacity-0'
                            )}
                        />
                        <span
                            className={cn(
                                'h-0.5 w-6 bg-slate-700 transition-all',
                                isMobileMenuOpen && '-translate-y-2 -rotate-45'
                            )}
                        />
                    </button>

                    {/* Desktop Menu */}
                    <div className='hidden items-center space-x-8 md:flex'>
                        <HoveredLink href='/'>Home</HoveredLink>
                        <HoveredLink href='/about'>About Us</HoveredLink>
                        <div className='relative' onMouseEnter={() => setActive('Products')}>
                            <Link 
                                href='/products' 
                                className='cursor-pointer text-slate-700 hover:text-slate-900'>
                                Products
                            </Link>
                            {active === 'Products' && (
                                <div className='absolute top-[calc(100%+1.2rem)] left-1/2 -translate-x-1/2 transform pt-4'>
                                    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl backdrop-blur-sm'>
                                        <div className='h-full w-max p-4'>
                                            <div className='grid grid-cols-2 gap-10 p-4 text-sm'>
                                                <ProductItem
                                                    title='Automobile Application'
                                                    href='/products/automobile'
                                                    src='https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png'
                                                    description='High-performance battery solutions for electric vehicles.'
                                                />
                                                <ProductItem
                                                    title='Aerospace Application'
                                                    href='/products/aerospace'
                                                    src='https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2670&auto=format&fit=crop'
                                                    description='Lightweight, reliable batteries for aerospace systems.'
                                                />
                                                <ProductItem
                                                    title='BESS Application'
                                                    href='/products/bess'
                                                    src='https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop'
                                                    description='Battery Energy Storage System solutions.'
                                                />
                                                <ProductItem
                                                    title='Telecom Application'
                                                    href='/products/telecom'
                                                    src='https://images.unsplash.com/photo-1526628653408-7c62979aab60?q=80&w=2670&auto=format&fit=crop'
                                                    description='Reliable backup power for telecom infrastructure.'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <HoveredLink href='/contact'>Contact</HoveredLink>
                        <HoveredLink href='/store'>Store</HoveredLink>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className='absolute top-full right-0 left-0 mt-4 flex flex-col space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:hidden'>
                        <Link
                            href='/'
                            className='text-slate-700 hover:text-slate-900'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link
                            href='/about'
                            className='text-slate-700 hover:text-slate-900'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            About Us
                        </Link>
                        <div className='flex flex-col space-y-2'>
                            <Link
                                href='/products'
                                className='font-semibold text-slate-900 hover:underline'
                                onClick={() => setIsMobileMenuOpen(false)}>
                                Products
                            </Link>
                            <div className='flex flex-col space-y-2 pl-4'>
                                <Link
                                    href='/products/automobile'
                                    className='text-sm text-slate-600 hover:text-slate-900'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Automobile Application
                                </Link>
                                <Link
                                    href='/products/aerospace'
                                    className='text-sm text-slate-600 hover:text-slate-900'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Aerospace Application
                                </Link>
                                <Link
                                    href='/products/bess'
                                    className='text-sm text-slate-600 hover:text-slate-900'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    BESS Application
                                </Link>
                                <Link
                                    href='/products/telecom'
                                    className='text-sm text-slate-600 hover:text-slate-900'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Telecom Application
                                </Link>
                            </div>
                        </div>
                        <Link
                            href='/contact'
                            className='text-slate-700 hover:text-slate-900'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link
                            href='/store'
                            className='text-slate-700 hover:text-slate-900'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Store
                        </Link>
                    </div>
                )}
            </Menu>
        </div>
    );
}

export default NavbarDemo;
