'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
    {
        id: 1,
        title: 'Lithium ion Battery Pack (2 Wheeler)',
        description: 'High-performance lithium-ion battery solution specifically designed for two-wheeler electric vehicles with superior energy density.',
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png',
        specs: ['2 Wheeler', 'Lithium Ion', 'Premium'],
        color: 'from-teal-500 to-cyan-400'
    },
    {
        id: 2,
        title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
        description: 'Safe and reliable LiFePo4 battery pack offering excellent cycle life and thermal stability for various applications.',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
        specs: ['LiFePo4', 'Reliable', 'Long Life'],
        color: 'from-blue-500 to-cyan-400'
    },
    {
        id: 3,
        title: 'Solar Smart Bench',
        description: 'Innovative solar-powered intelligent bench combining energy storage with smart charging capabilities for public spaces.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
        specs: ['Solar Powered', 'Smart Tech', 'Public'],
        color: 'from-amber-500 to-orange-400'
    },
    {
        id: 4,
        title: 'LFP Battery Pack',
        description: 'Lightweight and powerful LFP battery pack engineered for maximum performance and reliability in demanding applications.',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
        specs: ['LFP', 'Lightweight', 'High Power'],
        color: 'from-purple-500 to-pink-400'
    },
    {
        id: 5,
        title: 'Stackable Battery Packs',
        description: 'Modular and stackable battery pack system designed for scalable energy storage solutions with flexible configurations.',
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=800&auto=format&fit=crop',
        specs: ['Stackable', 'Modular', 'Scalable'],
        color: 'from-slate-500 to-gray-600'
    },
    {
        id: 6,
        title: 'Drone Battery Pack',
        description: 'Specialized battery pack designed for drone applications with optimized weight-to-power ratio and fast charging capability.',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2025/9/546735543/OQ/MC/GY/100678072/product-jpeg.jpg',
        specs: ['Drone Ready', 'Fast Charge', 'Lightweight'],
        color: 'from-red-500 to-pink-400'
    }
];

export default function ProductCarouselDemo() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
            setDirection(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [autoPlay]);

    const next = () => {
        setCurrent((prev) => (prev + 1) % products.length);
        setDirection(1);
        setAutoPlay(false);
    };

    const prev = () => {
        setCurrent((prev) => (prev - 1 + products.length) % products.length);
        setDirection(-1);
        setAutoPlay(false);
    };

    const product = products[current];

    return (
        <div className='relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-50 py-24 px-4'>
            {/* Background decorations */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br from-teal-200/20 to-cyan-200/20 blur-3xl'></div>
                <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-tr from-purple-200/20 to-pink-200/20 blur-3xl'></div>
            </div>

            <div className='relative z-10 w-full max-w-6xl'>
                <div className='mb-12 text-center'>
                    <h2 className='mb-4 text-4xl font-bold text-slate-900 md:text-5xl'>
                        Our Product Range
                    </h2>
                    <p className='text-lg text-slate-600'>Explore our cutting-edge energy solutions</p>
                </div>

                <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 items-center'>
                    {/* Left Side - Image Carousel */}
                    <div className='relative'>
                        <div className='relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className='object-cover transition-transform duration-500 hover:scale-105'
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20 mix-blend-multiply`}></div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className='absolute left-0 right-0 bottom-6 flex justify-center gap-4'>
                            <button
                                onClick={prev}
                                className='rounded-full bg-white/80 backdrop-blur-md p-3 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl'
                                aria-label='Previous'
                            >
                                <ChevronLeft className='h-6 w-6 text-slate-900' />
                            </button>
                            <button
                                onClick={next}
                                className='rounded-full bg-white/80 backdrop-blur-md p-3 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl'
                                aria-label='Next'
                            >
                                <ChevronRight className='h-6 w-6 text-slate-900' />
                            </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className='absolute top-6 right-6 flex gap-2'>
                            {products.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setCurrent(idx);
                                        setAutoPlay(false);
                                    }}
                                    className={`h-2 transition-all duration-300 rounded-full ${
                                        idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className='space-y-8'>
                        {/* Product Badge */}
                        <div className='inline-flex items-center rounded-full border border-teal-500/30 bg-teal-50/50 px-4 py-2 text-sm font-medium text-teal-600'>
                            <span className='mr-2 h-2 w-2 rounded-full bg-teal-500'></span>
                            Product {current + 1} of {products.length}
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className='text-4xl font-bold text-slate-900 mb-4'>{product.title}</h3>
                            <p className='text-lg text-slate-600 leading-relaxed'>{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className='grid grid-cols-3 gap-4'>
                            {product.specs.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className='rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 p-4 text-center border border-slate-200'
                                >
                                    <p className='font-semibold text-slate-900'>{spec}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
                            <a
                                href='#'
                                className='group flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-500/20'
                            >
                                Learn More
                                <svg
                                    className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-medium text-slate-900 shadow-sm transition-all duration-300 hover:border-teal-500 hover:text-teal-500'
                            >
                                Request Demo
                            </a>
                        </div>

                        {/* Progress Bar */}
                        <div className='w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-8'>
                            <div
                                className={`h-full bg-gradient-to-r ${product.color} transition-all duration-500`}
                                style={{ width: `${((current + 1) / products.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
