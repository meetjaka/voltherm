'use client';

import React from 'react';

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote: "Voltherm's battery modules have increased our fleet's overall range by 15% and cut thermal-related maintenance to zero. A true engineering marvel.",
            name: 'Sarah Chen',
            designation: 'VP of Engineering, Aero EV',
            src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop'
        },
        {
            quote: "The modular integration into our grid-scale energy storage facilities was seamless. Unmatched reliability even in extreme weather conditions.",
            name: 'Michael Rodriguez',
            designation: 'Director of Grid Ops, GridScale Energy',
            src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop'
        },
        {
            quote: "We required absolute safety limits for our aerospace applications. Voltherm's active fault isolation systems provided the exact redundancy we needed.",
            name: 'Emily Watson',
            designation: 'Chief Architect, Horizon Air',
            src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop'
        },
        {
            quote: "Their BMS analytics software lets us predict cell degradation with 99% accuracy. It's transformed how we manage our heavy-duty industrial vehicles.",
            name: 'James Kim',
            designation: 'Fleet Manager, Terra Logistics',
            src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop'
        }
    ];

    return (
        <div className="bg-slate-50/50 rounded-3xl py-10 my-10 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className='absolute -left-20 top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl'></div>
            <div className='absolute -right-20 bottom-10 h-40 w-40 rounded-full bg-secondary/5 blur-3xl'></div>
            <div className="relative z-10">
                <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
        </div>
    );
}

export default AnimatedTestimonialsDemo;
