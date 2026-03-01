'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export function NavbarDemo() {
    return (
        <div className='relative flex w-full items-center justify-center z-50'>
            <Navbar className='top-4 md:top-6' />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cn('fixed inset-x-0 z-50 mx-auto max-w-5xl px-4 transition-all duration-500', className)}>
            <nav
                className={cn(
                    'relative flex w-full items-center justify-between rounded-full border border-white/20 bg-white/60 px-4 py-2.5 shadow-lg shadow-purple-900/5 backdrop-blur-xl transition-all duration-500 md:px-6 md:py-3',
                    isScrolled && 'border-white/50 bg-white/80 shadow-xl shadow-purple-900/10 backdrop-blur-2xl'
                )}>
                
                {/* Logo Section */}
                <Link
                    href='/'
                    className='group relative z-10 flex items-center gap-2 transition-all duration-300 hover:opacity-90 md:gap-3'>
                    <div className='absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100' />
                    <Image
                        src='/images/logon.png'
                        alt='Voltherm Logo'
                        width={36}
                        height={36}
                        className='relative z-10 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110 md:h-10 md:w-10'
                    />
                    <span className='from-primary to-secondary relative z-10 bg-gradient-to-r bg-clip-text text-base font-extrabold tracking-tight text-transparent md:text-xl'>
                        Voltherm
                    </span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className='group relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/40 bg-white/50 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-md md:hidden'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label='Toggle menu'>
                    <span
                        className={cn(
                            'bg-foreground block h-0.5 w-5 rounded-full transition-all duration-300',
                            isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                        )}
                    />
                    <span
                        className={cn(
                            'bg-foreground block h-0.5 w-5 rounded-full transition-all duration-300',
                            isMobileMenuOpen ? 'opacity-0' : ''
                        )}
                    />
                    <span
                        className={cn(
                            'bg-foreground block h-0.5 w-5 rounded-full transition-all duration-300',
                            isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                        )}
                    />
                </button>

                {/* Desktop Menu */}
                <div className='relative z-10 hidden items-center space-x-1 md:flex'>
                    {['Home', 'About Us', 'Contact'].map((item) => {
                        const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className='text-foreground/80 hover:text-primary group relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300'>
                                <span className='relative z-10'>{item}</span>
                                <div className='bg-primary/10 absolute inset-0 z-0 scale-75 rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100' />
                            </Link>
                        );
                    })}
                    <div className='pl-2'>
                        <Link
                            href='/store'
                            className='bg-primary text-primary-foreground shadow-primary/30 hover:shadow-primary/50 group relative flex items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                            <div className='absolute inset-0 z-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]' />
                            <span className='relative z-10'>Store</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className='absolute right-0 left-0 top-full mt-4 flex flex-col space-y-2 rounded-3xl border border-white/40 bg-white/90 p-5 shadow-[0_20px_40px_rgba(139,69,139,0.1)] backdrop-blur-2xl md:hidden'>
                        {['Home', 'About Us', 'Contact'].map((item) => {
                            const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`;
                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    className='text-foreground hover:bg-primary/5 hover:text-primary rounded-2xl px-5 py-3 text-sm font-semibold transition-colors'
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    {item}
                                </Link>
                            );
                        })}
                        <Link
                            href='/store'
                            className='bg-primary text-primary-foreground mt-2 rounded-2xl px-5 py-3.5 text-center text-sm font-bold shadow-md transition-all active:scale-95'
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Store
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default NavbarDemo;
