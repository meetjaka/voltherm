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
        name: 'Voltherm Aero Ultra Light X1',
        tagline: 'Premium Aerospace Battery System',
        image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2670&auto=format&fit=crop',
        price: '₹3,50,000',
        capacity: '120 kWh',
        voltage: '800V',
        weight: '240 kg',
        description:
            'Ultra-lightweight aerospace battery system designed for aircraft and drone applications. Features exceptional power-to-weight ratio and redundancy systems.',
        features: [
            'Exceptional power-to-weight ratio',
            'Military-grade reliability',
            'Triple redundancy safety systems',
            'Operating at extreme altitudes',
            'Electromagnetic shielding',
            '15-year aerospace warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '500 Wh/kg' },
            { label: 'Peak Power', value: '400 kW' },
            { label: 'Operating Temperature', value: '-40°C to 85°C' },
            { label: 'Max Altitude', value: '50,000 ft' },
            { label: 'Dimensions', value: '1500 x 600 x 100 mm' },
            { label: 'Cell Type', value: 'Lithium Polymer Aerospace Grade' }
        ]
    },
    {
        id: 2,
        name: 'Voltherm Aero Precision E2',
        tagline: 'High-Precision Aerospace Solution',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
        price: '₹2,50,000',
        capacity: '80 kWh',
        voltage: '600V',
        weight: '180 kg',
        description:
            'Precision-engineered aerospace battery for commercial and private aircraft. Includes advanced monitoring and predictive maintenance systems.',
        features: [
            'Advanced predictive maintenance',
            'Real-time health monitoring',
            'Lightweight composite casing',
            'Quick-swap connectors',
            'EMI/RFI shielding',
            '12-year aerospace warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '450 Wh/kg' },
            { label: 'Peak Power', value: '300 kW' },
            { label: 'Operating Temperature', value: '-35°C to 80°C' },
            { label: 'Max Altitude', value: '45,000 ft' },
            { label: 'Dimensions', value: '1300 x 550 x 90 mm' },
            { label: 'Cell Type', value: 'Lithium Ion Aerospace Grade' }
        ]
    },
    {
        id: 3,
        name: 'Voltherm Aero Heavy Duty U3',
        tagline: 'Heavy-Duty Aerospace Applications',
        image: 'https://images.unsplash.com/photo-1513721331351-33da63d19c48?q=80&w=2670&auto=format&fit=crop',
        price: '₹4,50,000',
        capacity: '150 kWh',
        voltage: '900V',
        weight: '320 kg',
        description:
            'Heavy-duty aerospace battery system for long-range aircraft and high-power UAVs. Engineered for maximum capacity and reliability.',
        features: [
            'Maximum capacity for extended range',
            'Advanced thermal regulation',
            'Redundant control systems',
            'Crash-resistant design',
            'Anti-interference shielding',
            '15-year comprehensive aerospace warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '470 Wh/kg' },
            { label: 'Peak Power', value: '450 kW' },
            { label: 'Operating Temperature', value: '-45°C to 90°C' },
            { label: 'Max Altitude', value: '55,000 ft' },
            { label: 'Dimensions', value: '1600 x 700 x 120 mm' },
            { label: 'Cell Type', value: 'Lithium Polymer Aerospace Grade' }
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

export default function AerospaceApplicationPage() {
    const [activeSection, setActiveSection] = useState<'all' | 'commercial' | 'uav' | 'heli'>('all');

    const sections = [
        {
            id: 'commercial',
            label: 'Commercial Aircraft',
            title: 'Commercial Aircraft Solutions',
            description: 'High-capacity battery systems for commercial aircraft and regional jets'
        },
        {
            id: 'uav',
            label: 'UAV & Drones',
            title: 'UAV and Drone Solutions',
            description: 'Lightweight batteries for unmanned aerial vehicles and drone platforms'
        },
        {
            id: 'heli',
            label: 'Helicopters',
            title: 'Helicopter and Special Aircraft Solutions',
            description: 'Specialized battery systems for helicopters and experimental aircraft'
        }
    ];

    return (
        <main className='min-h-screen bg-slate-50'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='bg-linear-to-b from-slate-900 to-slate-800 px-6 pt-32 pb-20 text-white'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Aerospace Application</h1>
                    <p className='max-w-2xl text-lg text-slate-300'>
                        Premium aerospace battery systems for aircraft and aerial platforms
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
                                onClick={() => setActiveSection(section.id as 'commercial' | 'uav' | 'heli')}
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

            {/* Commercial Aircraft Solutions Section */}
            {(activeSection === 'all' || activeSection === 'commercial') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Commercial Aircraft Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            High-capacity battery systems for commercial aircraft and regional jets
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* UAV and Drone Solutions Section */}
            {(activeSection === 'all' || activeSection === 'uav') && (
                <section className='bg-white px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>UAV and Drone Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Lightweight batteries for unmanned aerial vehicles and drone platforms
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`uav-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Helicopter and Special Aircraft Solutions Section */}
            {(activeSection === 'all' || activeSection === 'heli') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>
                            Helicopter and Special Aircraft Solutions
                        </h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Specialized battery systems for helicopters and experimental aircraft
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`heli-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
