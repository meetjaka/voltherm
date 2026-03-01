'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
        <div className='relative w-full min-h-screen flex items-center justify-center bg-white py-24 px-4 overflow-hidden'>
            {/* Background decorations */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/5 to-purple-200/5 blur-3xl mix-blend-multiply'></div>
                <div className='absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-secondary/5 to-pink-200/5 blur-[120px] mix-blend-multiply'></div>
            </div>

            <div className='relative z-10 w-full max-w-7xl mx-auto'>
                <div className='mb-16 text-center'>
                    <div className="inline-block mb-4 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                        Featured Systems
                    </div>
                    <h2 className='mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight'>
                        Our Product Range
                    </h2>
                    <p className='text-lg font-medium text-slate-600 max-w-2xl mx-auto'>Explore our cutting-edge energy solutions built for scale</p>
                </div>

                <div className='grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center'>
                    {/* Left Side - Image Carousel */}
                    <div className='relative'>
                        <div className='relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white group'>
                            {/* Decorative backing */}
                            <div className='absolute inset-0 bg-gradient-to-r from-slate-50 to-white/50 z-0'></div>
                            <Image
                                src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                                alt={product.title}
                                fill
                                className='object-cover z-10 transition-transform duration-700 ease-in-out group-hover:scale-[1.03]'
                                priority
                                unoptimized
                            />
                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-${product.color?.split('-')[1] || 'primary'}/10 to-transparent mix-blend-overlay z-20`}></div>
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-20"></div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className='absolute left-6 right-6 bottom-8 flex justify-between z-30'>
                            <button
                                onClick={prev}
                                className='rounded-full border border-white/20 bg-white/20 backdrop-blur-xl p-3 shadow-lg transition-all duration-300 hover:bg-white hover:text-primary text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                                aria-label='Previous'
                            >
                                <ChevronLeft className='h-6 w-6' />
                            </button>
                            <button
                                onClick={next}
                                className='rounded-full border border-white/20 bg-white/20 backdrop-blur-xl p-3 shadow-lg transition-all duration-300 hover:bg-white hover:text-primary text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                                aria-label='Next'
                            >
                                <ChevronRight className='h-6 w-6 ' />
                            </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className='absolute top-6 right-6 flex gap-2.5 z-30 bg-black/20 p-2.5 rounded-full backdrop-blur-md border border-white/10'>
                            {products.map((p, idx) => (
                                <button
                                    key={`carousel-dot-${p.id}-${idx}`}
                                    onClick={() => {
                                        setCurrent(idx);
                                        setAutoPlay(false);
                                    }}
                                    className={`h-2 transition-all duration-300 rounded-full ${
                                        idx === current ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/80'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className='space-y-8 flex flex-col justify-center'>
                        {/* Product Badge */}
                        <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary'>
                            <span className='mr-2 flex h-2.5 w-2.5 rounded-full bg-primary opacity-80'>
                                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary opacity-40"></span>
                            </span>
                            Product {current + 1} of {products.length}
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className='text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight'>{product.title}</h3>
                            <p className='text-lg text-slate-600 leading-relaxed font-medium'>{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            {product.specs.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className='rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md'
                                >
                                    <p className='font-bold text-slate-800 text-sm'>{spec}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col gap-4 pt-6 sm:flex-row'>
                            <a
                                href='#'
                                className='group relative flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40'
                            >
                                <div className='absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full' />
                                <span className='relative z-10 flex items-center'>
                                    Learn More
                                    <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5' />
                                </span>
                            </a>
                            <a
                                href='#'
                                className='flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:-translate-y-0.5'
                            >
                                Request Demo
                            </a>
                        </div>

                        {/* Progress Bar */}
                        <div className='w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-6'>
                            <div
                                className='h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out'
                                style={{ width: `${((current + 1) / products.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
