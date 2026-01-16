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
        <div className={cn('fixed inset-x-0 top-4 z-50 mx-auto max-w-6xl px-4 md:top-6', className)}>
            <Menu setActive={setActive}>
                <div
                    className={cn(
                        'flex w-full items-center justify-between bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md transition-all duration-300 md:px-6 md:py-4',
                        isScrolled && 'shadow-lg'
                    )}>
                    <Link
                        href='/'
                        className='group flex items-center gap-2 transition-all duration-200 hover:opacity-80 md:gap-3'>
                        <Image
                            src='/images/logon.png'
                            alt='Voltherm Logo'
                            width={32}
                            height={32}
                            className='object-contain transition-transform duration-200 group-hover:scale-105 md:h-10 md:w-10'
                        />
                        <span className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-sm font-bold text-transparent md:text-lg'>
                            Voltherm Technologies
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className='hover:bg-accent flex flex-col gap-1.5 rounded-lg p-2 transition-colors md:hidden'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label='Toggle menu'>
                        <span
                            className={cn(
                                'bg-foreground h-0.5 w-6 transition-all duration-300',
                                isMobileMenuOpen && 'translate-y-2 rotate-45'
                            )}
                        />
                        <span
                            className={cn(
                                'bg-foreground h-0.5 w-6 transition-all duration-300',
                                isMobileMenuOpen && 'opacity-0'
                            )}
                        />
                        <span
                            className={cn(
                                'bg-foreground h-0.5 w-6 transition-all duration-300',
                                isMobileMenuOpen && '-translate-y-2 -rotate-45'
                            )}
                        />
                    </button>

                    {/* Desktop Menu */}
                    <div className='hidden items-center space-x-1 md:flex'>
                        <Link
                            href='/'
                            className='group text-foreground hover:bg-accent hover:text-accent-foreground relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'>
                            Home
                            <span className='bg-primary absolute inset-x-4 bottom-0 h-0.5 scale-x-0 transition-transform duration-200 group-hover:scale-x-100'></span>
                        </Link>
                        <Link
                            href='/about'
                            className='group text-foreground hover:bg-accent hover:text-accent-foreground relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'>
                            About Us
                            <span className='bg-primary absolute inset-x-4 bottom-0 h-0.5 scale-x-0 transition-transform duration-200 group-hover:scale-x-100'></span>
                        </Link>
                        <div
                            className='relative'
                            onMouseEnter={() => setActive('Products')}
                            onMouseLeave={() => setActive(null)}>
                            <Link
                                href='/products'
                                className='group text-foreground hover:bg-accent hover:text-accent-foreground relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'>
                                Products
                                <svg
                                    className='h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M19 9l-7 7-7-7'
                                    />
                                </svg>
                                <span className='bg-primary absolute inset-x-4 bottom-0 h-0.5 scale-x-0 transition-transform duration-200 group-hover:scale-x-100'></span>
                            </Link>
                            {active === 'Products' && (
                                <div className='absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 transform pt-2'>
                                    <div className='overflow-hidden rounded-xl bg-white shadow-xl backdrop-blur-sm'>
                                        <div className='h-full w-max p-2'>
                                            <div className='grid grid-cols-2 gap-2 p-3'>
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
                        <Link
                            href='/contact'
                            className='group text-foreground hover:bg-accent hover:text-accent-foreground relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'>
                            Contact
                            <span className='bg-primary absolute inset-x-4 bottom-0 h-0.5 scale-x-0 transition-transform duration-200 group-hover:scale-x-100'></span>
                        </Link>
                        <Link
                            href='/store'
                            className='bg-primary text-primary-foreground hover:bg-primary/90 ml-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md'>
                            Store
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className='absolute top-full right-0 left-0 mt-2 flex flex-col space-y-1 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-md md:hidden'>
                        <Link
                            href='/'
                            className='text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link
                            href='/about'
                            className='text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            About Us
                        </Link>
                        <div className='flex flex-col'>
                            <Link
                                href='/products'
                                className='text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200'
                                onClick={() => setIsMobileMenuOpen(false)}>
                                Products
                            </Link>
                            <div className='border-primary/20 mt-1 flex flex-col space-y-1 border-l-2 pl-4'>
                                <Link
                                    href='/products/automobile'
                                    className='text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded px-3 py-2 text-sm transition-all duration-200'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Automobile Application
                                </Link>
                                <Link
                                    href='/products/aerospace'
                                    className='text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded px-3 py-2 text-sm transition-all duration-200'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Aerospace Application
                                </Link>
                                <Link
                                    href='/products/bess'
                                    className='text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded px-3 py-2 text-sm transition-all duration-200'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    BESS Application
                                </Link>
                                <Link
                                    href='/products/telecom'
                                    className='text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded px-3 py-2 text-sm transition-all duration-200'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    Telecom Application
                                </Link>
                            </div>
                        </div>
                        <Link
                            href='/contact'
                            className='text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link
                            href='/store'
                            className='bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition-all duration-200'
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
