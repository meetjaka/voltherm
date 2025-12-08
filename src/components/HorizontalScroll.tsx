'use client';

import React, { useEffect, useRef } from 'react';

import Image from 'next/image';

interface ScrollSection {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const sections: ScrollSection[] = [
    {
        title: 'Revolutionary Cell Chemistry',
        subtitle: 'Innovation',
        description:
            'Our proprietary electrolyte formulation delivers unprecedented energy density while maintaining thermal stability across extreme temperature ranges.',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop'
    },
    {
        title: 'Active Thermal Management',
        subtitle: 'Performance',
        description:
            'AI-driven liquid cooling systems maintain optimal operating temperatures, extending battery life by up to 40% compared to passive cooling solutions.',
        image: 'https://images.unsplash.com/photo-1620288627223-537a28b55cf5?q=80&w=2000&auto=format&fit=crop'
    },
    {
        title: 'Multi-Layer Protection',
        subtitle: 'Safety',
        description:
            'Redundant safety systems including thermal runaway prevention, pressure relief valves, and intelligent BMS monitoring ensure zero-incident operation.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop'
    },
    {
        title: 'Circular Economy Design',
        subtitle: 'Sustainability',
        description:
            '95% recyclable materials and modular architecture enable easy component replacement, reducing environmental impact throughout the product lifecycle.',
        image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop'
    }
];

export function HorizontalScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-900'>
            {/* Section Title */}
            <div className='absolute top-8 left-1/2 z-10 -translate-x-1/2 transform text-center'>
                <h2 className='mb-2 text-3xl font-bold text-white md:text-4xl'>Advanced Technology</h2>
                <p className='text-slate-300'>Scroll to explore our innovations</p>
            </div>

            {/* Horizontal Scrolling Container */}
            <div
                ref={containerRef}
                className='scrollbar-hide flex h-full snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden'
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className='flex h-full w-screen flex-none snap-center items-center justify-center px-8 md:px-16'>
                        <div className='grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2'>
                            {/* Text Content */}
                            <div className='order-2 space-y-6 text-white lg:order-1'>
                                <span className='text-sm font-bold tracking-wider text-teal-400 uppercase'>
                                    {section.subtitle}
                                </span>
                                <h3 className='text-4xl leading-tight font-bold md:text-5xl'>{section.title}</h3>
                                <p className='text-lg leading-relaxed text-slate-300'>{section.description}</p>
                                <div className='flex items-center gap-2 text-sm text-slate-400'>
                                    <span>
                                        Section {index + 1} of {sections.length}
                                    </span>
                                    <div className='flex gap-1'>
                                        {sections.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 rounded-full transition-all ${
                                                    i === index ? 'w-8 bg-teal-400' : 'w-1 bg-slate-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className='relative order-1 h-[400px] overflow-hidden rounded-3xl shadow-2xl lg:order-2 lg:h-[600px]'>
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className='object-cover'
                                    sizes='(max-width: 1024px) 100vw, 50vw'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 transform animate-bounce items-center gap-2 text-white'>
                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
                <span className='text-sm'>Scroll to continue</span>
            </div>
        </div>
    );
}

export default HorizontalScroll;
