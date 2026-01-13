'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import NavbarDemo from '@/components/demos/NavbarDemo';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { cn } from '@/lib/utils';

interface Product {
    id: number;
    name: string;
    tagline: string;
    image: string;
    price: string;
    capacity: string;
    voltage: string;
    weight: string;
    description: string;
    features: string[];
    specs: {
        label: string;
        value: string;
    }[];
}

const products: Product[] = [
    {
        id: 1,
        name: 'Voltherm BESS Pro Industrial X1',
        tagline: 'Large-Scale Energy Storage Solution',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop',
        price: '₹8,50,000',
        capacity: '250 kWh',
        voltage: '900V',
        weight: '2500 kg',
        description:
            'Industrial-grade BESS for grid stabilization and peak load management. Designed for utility-scale energy storage and renewable integration.',
        features: [
            'Utility-scale capacity',
            'Grid integration certified',
            'Smart load balancing',
            'Automatic failover',
            'Real-time monitoring',
            '20-year industrial warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '250 kWh' },
            { label: 'Power Rating', value: '500 kW' },
            { label: 'Round-trip Efficiency', value: '95%' },
            { label: 'Cycle Life', value: '10,000+ cycles' },
            { label: 'Dimensions', value: '3000 x 2000 x 800 mm' },
            { label: 'Container Type', value: 'Modular Industrial' }
        ]
    },
    {
        id: 2,
        name: 'Voltherm BESS Commercial E2',
        tagline: 'Mid-Scale Commercial Storage',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
        price: '₹5,25,000',
        capacity: '150 kWh',
        voltage: '750V',
        weight: '1500 kg',
        description:
            'Commercial-grade battery energy storage for businesses and facilities. Perfect for demand charge reduction and backup power.',
        features: [
            'Demand charge management',
            'Time-of-use optimization',
            'Peak shaving capability',
            'UPS functionality',
            'Mobile monitoring app',
            '15-year commercial warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '150 kWh' },
            { label: 'Power Rating', value: '300 kW' },
            { label: 'Round-trip Efficiency', value: '94%' },
            { label: 'Cycle Life', value: '8,000+ cycles' },
            { label: 'Dimensions', value: '2400 x 1600 x 600 mm' },
            { label: 'Container Type', value: 'Modular Commercial' }
        ]
    },
    {
        id: 3,
        name: 'Voltherm BESS Pro Ultra U3',
        tagline: 'Maximum Capacity Grid Storage',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2670&auto=format&fit=crop',
        price: '₹12,50,000',
        capacity: '500 kWh',
        voltage: '1200V',
        weight: '5000 kg',
        description:
            'Ultimate BESS solution for large-scale renewable integration and grid services. Engineered for maximum capacity and reliability.',
        features: [
            'Mega-scale capacity for utilities',
            'Multiple grid service capabilities',
            'Advanced energy management system',
            'Redundant control units',
            '24/7 remote monitoring',
            '25-year utility warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '500 kWh' },
            { label: 'Power Rating', value: '1000 kW' },
            { label: 'Round-trip Efficiency', value: '96%' },
            { label: 'Cycle Life', value: '12,000+ cycles' },
            { label: 'Dimensions', value: '4000 x 2500 x 1000 mm' },
            { label: 'Container Type', value: 'Modular Utility-Scale' }
        ]
    }
];

const ProductCard = ({ product }: { product: Product }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <CardContainer className='inter-var w-full'>
                <CardBody className='group/card relative h-auto w-full rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-2xl'>
                    <CardItem translateZ='50' className='text-xl font-bold text-slate-900'>
                        {product.name}
                    </CardItem>
                    <CardItem
                        as='p'
                        translateZ='60'
                        className='mt-2 max-w-sm text-sm text-slate-600'>
                        {product.tagline}
                    </CardItem>

                    <CardItem translateZ='100' className='mt-6 w-full'>
                        <div className='relative h-64 w-full overflow-hidden rounded-xl'>
                            <Image
                                src={product.image}
                                height={400}
                                width={600}
                                className='h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110'
                                alt={product.name}
                            />
                        </div>
                    </CardItem>

                    <div className='mt-6 grid grid-cols-3 gap-3'>
                        <CardItem
                            translateZ={40}
                            className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-center'>
                            <div className='text-xs text-slate-500'>Capacity</div>
                            <div className='mt-1 font-semibold text-slate-900'>{product.capacity}</div>
                        </CardItem>
                        <CardItem
                            translateZ={40}
                            className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-center'>
                            <div className='text-xs text-slate-500'>Voltage</div>
                            <div className='mt-1 font-semibold text-slate-900'>{product.voltage}</div>
                        </CardItem>
                        <CardItem
                            translateZ={40}
                            className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-center'>
                            <div className='text-xs text-slate-500'>Price</div>
                            <div className='mt-1 font-semibold text-teal-600'>{product.price}</div>
                        </CardItem>
                    </div>

                    <div className='mt-8 flex items-center justify-between'>
                        <CardItem
                            translateZ={20}
                            as='button'
                            onClick={() => setShowDetails(true)}
                            className='rounded-lg px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100'>
                            More Details →
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as='button'
                            className='rounded-lg bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg'>
                            Get Quote
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>

            {/* Detailed View Modal */}
            {showDetails && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
                    onClick={() => setShowDetails(false)}>
                    <div
                        className='relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl'
                        onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={() => setShowDetails(false)}
                            className='absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-700'>
                            <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className='grid gap-0 md:grid-cols-2'>
                            {/* Image Section */}
                            <div className='relative h-100 overflow-hidden bg-slate-900 md:h-auto'>
                                <Image
                                    src={product.image}
                                    fill
                                    className='object-cover transition-transform duration-700 hover:scale-110'
                                    alt={product.name}
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent'></div>
                                <div className='absolute right-6 bottom-6 left-6'>
                                    <h2 className='text-2xl font-bold text-white'>{product.name}</h2>
                                    <p className='mt-2 text-sm text-slate-200'>{product.tagline}</p>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className='p-8'>
                                <div className='mb-6'>
                                    <div className='mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                                        Description
                                    </div>
                                    <p className='text-sm leading-relaxed text-slate-700'>{product.description}</p>
                                </div>

                                <div className='mb-6'>
                                    <div className='mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                                        Key Features
                                    </div>
                                    <ul className='space-y-2'>
                                        {product.features.map((feature, index) => (
                                            <li key={index} className='flex items-start gap-2 text-sm text-slate-700'>
                                                <svg
                                                    className='mt-0.5 size-5 shrink-0 text-teal-500'
                                                    fill='currentColor'
                                                    viewBox='0 0 20 20'>
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                        clipRule='evenodd'
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='mb-6'>
                                    <div className='mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                                        Technical Specifications
                                    </div>
                                    <div className='space-y-2'>
                                        {product.specs.map((spec, index) => (
                                            <div
                                                key={index}
                                                className='flex justify-between border-b border-slate-200 pb-2'>
                                                <span className='text-sm text-slate-600'>{spec.label}</span>
                                                <span className='text-sm font-semibold text-slate-900'>
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='flex gap-3 pt-4'>
                                    <button className='flex-1 rounded-lg border-2 border-slate-900 px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-slate-900 hover:text-white'>
                                        Download Datasheet
                                    </button>
                                    <button className='flex-1 rounded-lg bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg'>
                                        Request Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default function BESSApplicationPage() {
    const [activeSection, setActiveSection] = useState<'all' | 'utility' | 'commercial' | 'microgrid'>('all');

    const sections = [
        {
            id: 'utility',
            label: 'Utility-Scale',
            title: 'Utility-Scale Storage Solutions',
            description: 'Large-capacity energy storage systems for grid stabilization and renewable integration'
        },
        {
            id: 'commercial',
            label: 'Commercial',
            title: 'Commercial Facility Solutions',
            description: 'Mid-scale energy storage for businesses and industrial facilities'
        },
        {
            id: 'microgrid',
            label: 'Microgrid',
            title: 'Microgrid and Resilience Solutions',
            description: 'Advanced BESS for microgrids and critical infrastructure protection'
        }
    ];

    return (
        <main className='min-h-screen bg-slate-50'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='bg-linear-to-b from-slate-900 to-slate-800 px-6 pt-32 pb-20 text-white'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>BESS Application</h1>
                    <p className='max-w-2xl text-lg text-slate-300'>
                        Battery Energy Storage Systems for grid-scale and utility applications
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className='border-b border-slate-200 bg-white px-6 py-8'>
                <div className='mx-auto max-w-7xl'>
                    <div className='flex flex-wrap gap-3'>
                        <button
                            onClick={() => setActiveSection('all')}
                            className={cn(
                                'rounded-lg px-6 py-2.5 font-semibold transition-all',
                                activeSection === 'all'
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            )}>
                            All Sections
                        </button>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id as 'utility' | 'commercial' | 'microgrid')}
                                className={cn(
                                    'rounded-lg px-6 py-2.5 font-semibold transition-all',
                                    activeSection === section.id
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                )}>
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Utility-Scale Storage Solutions Section */}
            {(activeSection === 'all' || activeSection === 'utility') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Utility-Scale Storage Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Large-capacity energy storage systems for grid stabilization and renewable integration
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Commercial Facility Solutions Section */}
            {(activeSection === 'all' || activeSection === 'commercial') && (
                <section className='bg-white px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Commercial Facility Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Mid-scale energy storage for businesses and industrial facilities
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`commercial-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Microgrid and Resilience Solutions Section */}
            {(activeSection === 'all' || activeSection === 'microgrid') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Microgrid and Resilience Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Advanced BESS for microgrids and critical infrastructure protection
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`microgrid-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
