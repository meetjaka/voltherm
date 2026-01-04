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
        name: 'Voltherm Telecom Pro X1',
        tagline: 'Premium Telecom Backup Power',
        image: 'https://images.unsplash.com/photo-1526628653408-7c62979aab60?q=80&w=2670&auto=format&fit=crop',
        price: '₹1,85,000',
        capacity: '40 kWh',
        voltage: '48V',
        weight: '320 kg',
        description:
            'High-reliability backup power for telecom towers and network infrastructure. Designed for 24/7 operation and extreme environmental conditions.',
        features: [
            'Extreme temperature tolerance',
            'Dust and water resistant',
            'Automatic switchover',
            'Self-healing thermal management',
            'Remote monitoring capability',
            '10-year telecom warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '40 kWh' },
            { label: 'Output Voltage', value: '48V DC' },
            { label: 'Round-trip Efficiency', value: '93%' },
            { label: 'Cycle Life', value: '6,000+ cycles' },
            { label: 'Dimensions', value: '1200 x 800 x 600 mm' },
            { label: 'Operating Temp Range', value: '-30°C to 70°C' }
        ]
    },
    {
        id: 2,
        name: 'Voltherm Telecom Standard E2',
        tagline: 'Reliable Network Backup Solution',
        image: 'https://images.unsplash.com/photo-1495675779969-25a91617d120?q=80&w=2670&auto=format&fit=crop',
        price: '₹1,25,000',
        capacity: '25 kWh',
        voltage: '48V',
        weight: '200 kg',
        description:
            'Cost-effective backup power system for small to medium telecom installations. Proven reliability in field deployments.',
        features: [
            'Compact footprint',
            'Simple installation',
            'Low maintenance',
            'Battery health monitoring',
            'Standard connectivity',
            '7-year warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '25 kWh' },
            { label: 'Output Voltage', value: '48V DC' },
            { label: 'Round-trip Efficiency', value: '91%' },
            { label: 'Cycle Life', value: '4,000+ cycles' },
            { label: 'Dimensions', value: '1000 x 700 x 500 mm' },
            { label: 'Operating Temp Range', value: '-20°C to 60°C' }
        ]
    },
    {
        id: 3,
        name: 'Voltherm Telecom Ultra U3',
        tagline: 'Maximum Capacity Network Backup',
        image: 'https://images.unsplash.com/photo-1580894892991-d3e87ddf1e02?q=80&w=2670&auto=format&fit=crop',
        price: '₹2,85,000',
        capacity: '60 kWh',
        voltage: '48V',
        weight: '480 kg',
        description:
            'Ultra-capacity backup power for large telecom facilities and base station clusters. Engineered for maximum uptime and resilience.',
        features: [
            'Maximum capacity storage',
            'Multi-unit scalability',
            'Advanced thermal regulation',
            'Intelligent load management',
            '24/7 remote diagnostics',
            '12-year premium warranty'
        ],
        specs: [
            { label: 'Energy Capacity', value: '60 kWh' },
            { label: 'Output Voltage', value: '48V DC' },
            { label: 'Round-trip Efficiency', value: '94%' },
            { label: 'Cycle Life', value: '8,000+ cycles' },
            { label: 'Dimensions', value: '1400 x 900 x 700 mm' },
            { label: 'Operating Temp Range', value: '-40°C to 75°C' }
        ]
    }
];

const ProductCard = ({ product }: { product: Product }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <CardContainer className='inter-var w-full'>
                <CardBody className='group/card relative h-auto w-full rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-2xl dark:border-white/20 dark:bg-black'>
                    <CardItem translateZ='50' className='text-xl font-bold text-slate-900 dark:text-white'>
                        {product.name}
                    </CardItem>
                    <CardItem
                        as='p'
                        translateZ='60'
                        className='mt-2 max-w-sm text-sm text-slate-600 dark:text-neutral-300'>
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

export default function TelecomApplicationPage() {
    const [activeSection, setActiveSection] = useState<'all' | 'base' | 'datacenter' | 'remote'>('all');

    const sections = [
        {
            id: 'base',
            label: 'Base Stations',
            title: 'Base Station Solutions',
            description: 'Reliable backup power for cellular base stations and towers'
        },
        {
            id: 'datacenter',
            label: 'Data Centers',
            title: 'Data Center and Network Solutions',
            description: 'High-capacity backup systems for data centers and network facilities'
        },
        {
            id: 'remote',
            label: 'Remote Sites',
            title: 'Remote Site Solutions',
            description: 'Portable and reliable backup power for remote telecom installations'
        }
    ];

    return (
        <main className='min-h-screen bg-slate-50'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='bg-linear-to-b from-slate-900 to-slate-800 px-6 pt-32 pb-20 text-white'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Telecom Application</h1>
                    <p className='max-w-2xl text-lg text-slate-300'>
                        Reliable backup power solutions for telecom infrastructure and network systems
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
                                onClick={() => setActiveSection(section.id as 'base' | 'datacenter' | 'remote')}
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

            {/* Base Station Solutions Section */}
            {(activeSection === 'all' || activeSection === 'base') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Base Station Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Reliable backup power for cellular base stations and towers
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Data Center and Network Solutions Section */}
            {(activeSection === 'all' || activeSection === 'datacenter') && (
                <section className='bg-white px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Data Center and Network Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            High-capacity backup systems for data centers and network facilities
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`datacenter-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Remote Site Solutions Section */}
            {(activeSection === 'all' || activeSection === 'remote') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Remote Site Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Portable and reliable backup power for remote telecom installations
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`remote-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
