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
