'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';

export const StickyScroll = ({
    content,
    contentClassName
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ['start start', 'end start']
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }

            return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        '#0f172a', // slate-900
        '#000000', // black
        '#171717' // neutral-900
    ];
    const linearGradients = [
        'linear-gradient(to bottom right, #06b6d4, #10b981)', // cyan-500 to emerald-500
        'linear-gradient(to bottom right, #ec4899, #6366f1)', // pink-500 to indigo-500
        'linear-gradient(to bottom right, #f97316, #eab308)' // orange-500 to yellow-500
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length]
            }}
            className='relative flex h-screen w-full justify-center overflow-y-auto'
            ref={ref}>
            <div className='relative flex w-full max-w-7xl items-start px-4 sm:px-6 lg:px-8'>
                <div className='w-full lg:w-1/2'>
                    {content.map((item, index) => (
                        <div key={item.title + index} className='my-32 first:mt-20'>
                            <motion.h2
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3
                                }}
                                className='text-3xl font-bold text-slate-100 md:text-4xl'>
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3
                                }}
                                className='mt-6 max-w-lg text-lg leading-relaxed text-slate-300'>
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className='h-96' />
                </div>
            </div>
            <div
                style={{ background: backgroundGradient }}
                className={cn(
                    'sticky top-20 right-8 hidden h-[70vh] w-[45%] max-w-2xl overflow-hidden rounded-2xl shadow-2xl lg:block',
                    contentClassName
                )}>
                {content[activeCard].content ?? null}
            </div>
        </motion.div>
    );
};
