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
        name: 'Voltherm Auto Pro X1',
        tagline: 'Premium EV Battery for High Performance',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2672&auto=format&fit=crop',
        price: '₹1,45,000',
        capacity: '75 kWh',
        voltage: '400V',
        weight: '450 kg',
        description:
            'Our flagship EV battery designed for premium electric vehicles. Features advanced thermal management and industry-leading energy density for maximum range and performance.',
        features: [
            'Advanced thermal management system',
            'Fast charging capability (0-80% in 30 mins)',
            'Extended lifespan with 3000+ charge cycles',
            'Integrated battery management system',
            'IP67 waterproof rating',
            '10-year warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '250 Wh/kg' },
            { label: 'Peak Power', value: '250 kW' },
            { label: 'Operating Temperature', value: '-20°C to 60°C' },
            { label: 'Charging Time', value: '45 minutes (DC Fast)' },
            { label: 'Dimensions', value: '1200 x 800 x 150 mm' },
            { label: 'Cell Type', value: 'Lithium NMC' }
        ]
    },
    {
        id: 2,
        name: 'Voltherm Auto Eco E2',
        tagline: 'Efficient & Affordable EV Solution',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2671&auto=format&fit=crop',
        price: '₹85,000',
        capacity: '50 kWh',
        voltage: '350V',
        weight: '320 kg',
        description:
            'Perfect balance of performance and affordability. Designed for compact EVs and daily commuters seeking reliable, cost-effective energy storage.',
        features: [
            'Optimized for city driving',
            'Compact and lightweight design',
            'Smart charging optimization',
            '2000+ charge cycles',
            'Eco-friendly materials',
            '7-year warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '200 Wh/kg' },
            { label: 'Peak Power', value: '150 kW' },
            { label: 'Operating Temperature', value: '-10°C to 50°C' },
            { label: 'Charging Time', value: '60 minutes (DC Fast)' },
            { label: 'Dimensions', value: '1000 x 700 x 130 mm' },
            { label: 'Cell Type', value: 'Lithium LFP' }
        ]
    },
    {
        id: 3,
        name: 'Voltherm Auto Ultra U3',
        tagline: 'Maximum Range & Endurance',
        image: 'https://images.unsplash.com/photo-1614963366795-e5e51c3f2ef4?q=80&w=2670&auto=format&fit=crop',
        price: '₹2,25,000',
        capacity: '100 kWh',
        voltage: '800V',
        weight: '580 kg',
        description:
            'Ultimate EV battery for long-distance travel and heavy-duty applications. Engineered for maximum energy storage and rapid charging capabilities.',
        features: [
            'Ultra-high capacity for extended range',
            'Ultra-fast 800V charging architecture',
            'Advanced cooling with liquid thermal system',
            '5000+ charge cycles guaranteed',
            'Military-grade durability',
            '12-year comprehensive warranty'
        ],
        specs: [
            { label: 'Energy Density', value: '280 Wh/kg' },
            { label: 'Peak Power', value: '350 kW' },
            { label: 'Operating Temperature', value: '-30°C to 65°C' },
            { label: 'Charging Time', value: '20 minutes (0-80%)' },
            { label: 'Dimensions', value: '1400 x 900 x 180 mm' },
            { label: 'Cell Type', value: 'Lithium NMC 811' }
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

export default function AutomobileApplicationPage() {
    const [activeSection, setActiveSection] = useState<'all' | 'ebike' | 'three' | 'two'>('all');

    const sections = [
        {
            id: 'ebike',
            label: 'E-Bike Solutions',
            title: 'E-Bike Solutions',
            description: 'Lightweight and efficient batteries for electric bicycles and e-scooters'
        },
        {
            id: 'three',
            label: 'Three-Wheeler',
            title: 'Three-Wheeler Vehicle Solutions',
            description: 'Reliable battery systems for auto-rickshaws and three-wheeler vehicles'
        },
        {
            id: 'two',
            label: 'Two-Wheeler',
            title: 'Two-Wheeler Vehicle Solutions',
            description: 'Compact and powerful batteries for motorcycles and electric scooters'
        }
    ];

    return (
        <main className='min-h-screen bg-slate-50'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='bg-linear-to-b from-slate-900 to-slate-800 px-6 pt-32 pb-20 text-white'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Automobile Application</h1>
                    <p className='max-w-2xl text-lg text-slate-300'>
                        Advanced energy storage solutions engineered for the future of electric mobility
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
                                    ? 'bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            )}>
                            All Sections
                        </button>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id as 'ebike' | 'three' | 'two')}
                                className={cn(
                                    'rounded-lg px-6 py-2.5 font-semibold transition-all',
                                    activeSection === section.id
                                        ? 'bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                )}>
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* E-Bike Solutions Section */}
            {(activeSection === 'all' || activeSection === 'ebike') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>E-Bike Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Lightweight and efficient batteries for electric bicycles and e-scooters
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Three-Wheeler Vehicle Solutions Section */}
            {(activeSection === 'all' || activeSection === 'three') && (
                <section className='bg-white px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Three-Wheeler Vehicle Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Reliable battery systems for auto-rickshaws and three-wheeler vehicles
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`three-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Two-Wheeler Vehicle Solutions Section */}
            {(activeSection === 'all' || activeSection === 'two') && (
                <section className='px-6 py-16'>
                    <div className='mx-auto max-w-7xl'>
                        <h2 className='mb-2 text-3xl font-bold text-slate-900'>Two-Wheeler Vehicle Solutions</h2>
                        <p className='mb-8 text-lg text-slate-600'>
                            Compact and powerful batteries for motorcycles and electric scooters
                        </p>
                        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {products.map((product) => (
                                <ProductCard key={`two-${product.id}`} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
