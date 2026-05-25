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
        // target: ref
        container: ref,
        offset: ['start start', 'end start']
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);

        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            const currentDistance = Math.abs(latest - cardsBreakpoints[acc]);

            if (distance < currentDistance) {

                return index;
            }

            return acc;
        }, 0);

        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        '#f8fafc', // slate-50
        '#ffffff', // white
        '#f1f5f9'  // slate-100
    ];
    const linearGradients = [
        'linear-gradient(to bottom right, #f87171, #b91c1c)', // primary/red
        'linear-gradient(to bottom right, #c084fc, #6b21a8)', // secondary/purple
        'linear-gradient(to bottom right, #38bdf8, #0369a1)'  // accent/blue
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <>
            {/* Mobile/Tablet view: Natural page flow with inline images to prevent mobile scrolling glitches */}
            <div className='block xl:hidden w-full px-6 space-y-12 pb-16'>
                {content.map((item, index) => (
                    <div key={item.title + index} className='flex flex-col space-y-4 border-b border-neutral-200/40 pb-8 last:border-none'>
                        <h2 className='text-2xl font-extrabold text-neutral-900 tracking-tight font-outfit'>
                            {item.title}
                        </h2>
                        {item.content && (
                            <div className='relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-neutral-100 bg-[#1a1a1a]/5'>
                                {item.content}
                            </div>
                        )}
                        <p className='text-neutral-500 text-sm font-medium leading-relaxed font-outfit'>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Desktop view: Premium sticky scroll-capture container */}
            <motion.div
                animate={{
                    backgroundColor: backgroundColors[activeCard % backgroundColors.length]
                }}
                className='hidden xl:flex relative h-screen w-full justify-center overflow-y-auto border-y border-neutral-200/30'
                ref={ref}
            >
                <div className='relative flex w-full max-w-7xl items-start px-8'>
                    <div className='w-full xl:w-1/2 pt-10'>
                        {content.map((item, index) => (
                            <div key={item.title + index} className='my-32 first:mt-32'>
                                <motion.h2
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3
                                    }}
                                    className='text-3xl font-extrabold text-slate-900 md:text-5xl tracking-tight font-outfit'>
                                    {item.title}
                                </motion.h2>
                                <motion.p
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3
                                    }}
                                    className='mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-600 font-outfit'>
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
                        'sticky top-20 right-8 hidden h-[70vh] w-[45%] max-w-2xl overflow-hidden rounded-3xl shadow-2xl xl:block border border-slate-200/50',
                        contentClassName
                    )}>
                    {content[activeCard].content ?? null}
                </div>
            </motion.div>
        </>
    );
};
