'use client';

import React from 'react';

import Image from 'next/image';

import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';

const content = [
    {
        title: 'Revolutionary Cell Chemistry',
        description:
            'Our advanced lithium-iron-phosphate (LiFePO4) cells deliver unprecedented energy density and cycle life. With over 10,000 charge cycles at 80% depth of discharge, Voltara batteries outlast conventional systems by 3x. Advanced silicon-graphene anodes enable 30% higher capacity while maintaining superior thermal stability.',
        content: (
            <div className='flex h-full w-full items-center justify-center text-white'>
                <Image
                    src='https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop'
                    width={300}
                    height={300}
                    className='h-full w-full rounded-lg object-cover'
                    alt='advanced battery cells'
                />
            </div>
        )
    },
    {
        title: 'Active Thermal Management',
        description:
            'Our proprietary liquid cooling system maintains optimal cell temperature across all operating conditions. AI-powered thermal algorithms predict heat generation patterns and adjust cooling in real-time, ensuring consistent performance from -20°C to 55°C. This extends battery life by 40% compared to passive cooling systems.',
        content: (
            <div className='flex h-full w-full items-center justify-center text-white'>
                <Image
                    src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
                    width={300}
                    height={300}
                    className='h-full w-full rounded-lg object-cover'
                    alt='thermal management system'
                />
            </div>
        )
    },
    {
        title: 'Multi-Layer Protection',
        description:
            'Safety is paramount. Every Voltara battery features redundant protection systems: cell-level monitoring, pack-level BMS, and system-level safety controls. Our batteries meet UL 1973, IEC 62619, and UN 38.3 standards. Built-in fire suppression and automatic disconnect ensure your installation is protected against any fault condition.',
        content: (
            <div className='flex h-full w-full items-center justify-center text-white'>
                <Image
                    src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2071&auto=format&fit=crop'
                    width={300}
                    height={300}
                    className='h-full w-full rounded-lg object-cover'
                    alt='battery safety systems'
                />
            </div>
        )
    },
    {
        title: 'Circular Economy Design',
        description:
            'Voltara batteries are designed for end-to-end sustainability. Our modular architecture enables easy repair and cell replacement, extending system life to 20+ years. At end-of-life, 95% of materials are recyclable through our certified partner network. Every battery includes a digital passport tracking its lifecycle and ensuring responsible recycling.',
        content: (
            <div className='flex h-full w-full items-center justify-center text-white'>
                <Image
                    src='https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop'
                    width={300}
                    height={300}
                    className='h-full w-full rounded-lg object-cover'
                    alt='sustainable battery recycling'
                />
            </div>
        )
    }
];

export function StickyScrollRevealDemo() {
    return (
        <div className='w-full'>
            <StickyScroll content={content} />
        </div>
    );
}

export default StickyScrollRevealDemo;
