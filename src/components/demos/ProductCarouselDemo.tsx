'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Product } from '@/lib/adminData';
import { hybridDataService } from '@/lib/dataService';

export default function ProductCarouselDemo() {
    const [products, setProducts] = useState<Product[]>([]);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        // Load featured products using hybrid service (API first, localStorage fallback)
        const loadFeaturedProducts = async () => {
            try {
                const featuredProducts = await hybridDataService.getFeaturedProducts();
                setProducts(featuredProducts);
                console.log('🎯 Featured products loaded:', featuredProducts.length);
            } catch (error) {
                console.error('Failed to load featured products:', error);
            }
        };

        loadFeaturedProducts();
    }, []);

    useEffect(() => {
        if (!autoPlay || products.length === 0) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
            setDirection(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [autoPlay, products.length]);

    const next = () => {
        if (products.length === 0) return;
        setCurrent((prev) => (prev + 1) % products.length);
        setDirection(1);
        setAutoPlay(false);
    };

    const prev = () => {
        if (products.length === 0) return;
        setCurrent((prev) => (prev - 1 + products.length) % products.length);
        setDirection(-1);
        setAutoPlay(false);
    };

    // Don't render if no products available
    if (products.length === 0) {
        return null;
    }

    const product = products[current];
    
    // Extra safety check
    if (!product) {
        return null;
    }

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
                        <div className='relative h-100 md:h-125 rounded-3xl overflow-hidden shadow-2xl'>
                            <Image
                                src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                                alt={product.title}
                                fill
                                className='object-cover transition-transform duration-500 hover:scale-105'
                                priority
                                unoptimized
                            />
                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-linear-to-br ${product.color} opacity-20 mix-blend-multiply`}></div>
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
                            {products.map((product, idx) => (
                                <button
                                    key={`carousel-dot-${product.id}-${idx}`}
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
                                className={`h-full bg-linear-to-r ${product.color} transition-all duration-500`}
                                style={{ width: `${((current + 1) / products.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
