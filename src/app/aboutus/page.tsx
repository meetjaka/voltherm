'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import NavbarDemo from '@/components/demos/NavbarDemo';
import { type Certificate, getCertificates } from '@/lib/adminData';

export default function AboutPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    useEffect(() => {
        setCertificates(getCertificates());
    }, []);

    return (
        <main className='min-h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans'>
            <NavbarDemo />

            {/* Hero Section - Light Mode with Futuristic Glows and Grid */}
            <section className='relative flex min-h-[70vh] items-center justify-center pt-40 pb-20 lg:pt-48'>
                {/* Background Effects */}
                <div className='absolute inset-0 z-0 overflow-hidden'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none'>
                        <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-300/30 to-secondary/20 blur-[100px] rounded-full mix-blend-multiply'></div>
                    </div>
                    {/* Grid Pattern */}
                    <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-50 pointer-events-none'></div>
                </div>

                <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
                    <div className='border-primary/20 bg-white/60 shadow-sm backdrop-blur-md mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 hover:bg-white transition-all hover:-translate-y-1'>
                        <svg className='text-primary size-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                                fillRule='evenodd'
                                d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span className='text-primary text-sm font-bold uppercase tracking-widest'>ISO 9001:2015 Certified</span>
                    </div>
                    <h1 className='mb-6 text-5xl font-extrabold md:text-6xl lg:text-7xl tracking-tight text-slate-900'>
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-secondary drop-shadow-sm">Voltherm</span>
                    </h1>
                    <p className='mx-auto max-w-3xl text-lg font-medium md:text-xl text-slate-600 leading-relaxed'>
                        Leading innovation in battery technology and renewable energy solutions for a sustainable future. Built for scale, engineered for safety.
                    </p>
                </div>
            </section>

            {/* Stats Section - Floating Glass Cards */}
            <section className='relative z-20 -mt-10 px-6 pb-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            { value: '500+', label: 'Projects Completed' },
                            { value: '98%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Technical Support' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className='group relative cursor-pointer overflow-hidden rounded-2xl border border-white bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:border-primary/20 text-center'
                            >
                                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                <div className='relative z-10 text-primary mb-2 text-5xl font-extrabold tracking-tight'>{stat.value}</div>
                                <div className='relative z-10 text-slate-500 font-semibold uppercase tracking-wider text-sm'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content Section - White background */}
            <section className='relative bg-white px-6 py-28'>
                 {/* Subtle top divider line */}
                 <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className='mx-auto max-w-7xl'>
                    <div className='grid items-center gap-16 lg:grid-cols-2'>
                        {/* 3D Image */}
                        <div className='order-2 lg:order-1' style={{ perspective: '1500px' }}>
                            <div
                                className='group relative h-[500px] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl transition-transform duration-700'
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = (y - centerY) / 30;
                                    const rotateY = (centerX - x) / 30;
                                    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                                }}>
                                <Image
                                    src='https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop'
                                    alt='Voltherm Technologies'
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                                />
                                <div className='absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay'></div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className='order-1 lg:order-2'>
                            <div className='border-secondary/20 bg-secondary/5 mb-6 inline-block rounded-full border px-4 py-1.5'>
                                <span className='text-secondary text-xs font-bold uppercase tracking-wider'>Who We Are</span>
                            </div>
                            <h2 className='text-slate-900 mb-6 text-4xl lg:text-5xl tracking-tight leading-tight font-extrabold'>
                                Voltherm Innovation Private Limited
                            </h2>
                            <p className='text-slate-600 font-medium mb-6 text-lg leading-relaxed'>
                                Voltherm Innovation Private Limited is an ISO 9001:2015 certified firm specialized in
                                the development of Lithium Battery Packs and Solar Consumer Products.
                            </p>
                            <p className='text-slate-600 font-medium mb-8 text-lg leading-relaxed'>
                                Our services include Energy Storage, Solar Consumer Products, Electric Vehicle Charging
                                Stations EPC, and Solar & EV consultancy with the highest standard of technical support.
                            </p>

                            {/* Services Grid - White cards with hover */}
                            <div className='grid gap-4 sm:grid-cols-2'>
                                {[
                                    { icon: '⚡', title: 'Energy Storage' },
                                    { icon: '☀️', title: 'Solar Consumer Products' },
                                    { icon: '🔌', title: 'EV Charging Stations' },
                                    { icon: '💡', title: 'Solar & EV Consultancy' }
                                ].map((service, index) => (
                                    <div
                                        key={index}
                                        className='group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-primary/30 hover:-translate-y-1'
                                        style={{ transformStyle: 'preserve-3d' }}>
                                        <div className='flex items-center justify-center size-10 rounded-full bg-white shadow-sm border border-slate-100 text-xl group-hover:scale-110 transition-transform'>{service.icon}</div>
                                        <span className='text-slate-800 font-bold text-sm transition-colors group-hover:text-primary'>
                                            {service.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='relative bg-slate-50 px-6 py-28'>
                 {/* Top divider */}
                 <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                 
                <div className='mx-auto max-w-7xl relative z-10'>
                    <div className='mb-16 text-center'>
                        <div className='border-purple-500/20 bg-purple-500/5 mb-4 inline-block rounded-full border px-4 py-1.5'>
                            <span className='text-purple-600 text-xs font-bold uppercase tracking-wider'>Foundation</span>
                        </div>
                        <h2 className='text-slate-900 mb-4 text-4xl md:text-5xl font-extrabold tracking-tight'>Our Core Values</h2>
                        <p className='text-slate-600 max-w-2xl mx-auto font-medium text-lg'>What drives us to excellence in the modern energy landscape</p>
                    </div>
                    <div className='grid gap-8 md:grid-cols-3' style={{ perspective: '1500px' }}>
                        {[
                            {
                                title: 'Innovation',
                                desc: 'Pioneering cutting-edge solutions in renewable energy and battery architectures.',
                                icon: '🚀'
                            },
                            {
                                title: 'Quality',
                                desc: 'ISO certified strict processes ensuring the highest manufacturing standards.',
                                icon: '✨'
                            },
                            { 
                                title: 'Sustainability', 
                                desc: 'Committed to a greener, cleaner future through circular economy lifecycles.', 
                                icon: '🌱' 
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className='group relative border-slate-200/60 overflow-hidden cursor-pointer rounded-2xl border bg-white/80 p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white hover:border-primary/30 text-center backdrop-blur-md'
                            >
                                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                                <div className='relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-4xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>{value.icon}</div>
                                <h3 className='relative z-10 text-slate-900 mb-3 text-2xl font-extrabold tracking-tight'>{value.title}</h3>
                                <p className='relative z-10 text-slate-600 font-medium leading-relaxed'>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section className='bg-white px-6 py-28 relative'>
                {/* Top divider */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                
                <div className='mx-auto max-w-7xl relative z-10'>
                    <div className='mb-16 text-center'>
                        <div className='border-primary/20 bg-primary/5 mb-6 inline-block rounded-full border px-4 py-1.5'>
                            <span className='text-primary text-xs font-bold uppercase tracking-wider'>Standards</span>
                        </div>
                        <h2 className='text-slate-900 mb-4 text-4xl md:text-5xl font-extrabold tracking-tight'>Global Certifications</h2>
                        <p className='text-slate-600 font-medium mx-auto max-w-2xl text-lg'>
                            Our commitment to quality and excellence is continuously certified by international rigorous standards.
                        </p>
                    </div>

                    <div className='grid gap-10 md:grid-cols-3' style={{ perspective: '2000px' }}>
                        {certificates.map((cert) => (
                            <button
                                key={cert.id}
                                onClick={() => setSelectedCertificate(cert)}
                                className='group border-slate-200 overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/20'
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className='relative mb-6 h-56 w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100'>
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className='object-contain p-6 transition-transform duration-700 group-hover:scale-[1.15]'
                                    />
                                </div>
                                <h3 className='text-slate-900 group-hover:text-primary text-center text-xl font-extrabold tracking-tight transition-colors mb-1'>
                                    {cert.title}
                                </h3>
                                <p className='text-slate-500 mt-2 text-center text-sm font-semibold opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>Click to view detail</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Gradient background with modern styling */}
            <section className='relative overflow-hidden bg-slate-900 px-6 py-28'>
                {/* Decorative glowing backdrops */}
                <div className='absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-primary/40 blur-[100px]'></div>
                <div className='absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-secondary/40 blur-[100px]'></div>

                <div className='relative z-10 mx-auto max-w-4xl text-center'>
                    <h2 className='mb-6 text-4xl font-extrabold text-white md:text-6xl tracking-tight leading-tight'>Ready to Partner With Us?</h2>
                    <p className='mb-10 text-xl text-slate-300 font-medium font-sans'>
                        Discover how Voltherm Technologies can help transform your energy solutions. Let's build the future, together.
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <button className='group flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40'>
                            <span className="relative z-10 flex items-center">
                                Contact Sales
                                <span className='ml-2 inline-block transition-transform group-hover:translate-x-1.5'>→</span>
                            </span>
                        </button>
                        <button className='rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-105 shadow-lg'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Certificate Modal Overlay - Sleek Dark Blur */}
            {selectedCertificate && (
                <div
                    className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md duration-200'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='animate-in zoom-in-95 relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col duration-300'
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='text-slate-900 absolute -top-4 -right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 hover:rotate-90 hover:bg-slate-100'>
                            <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={3}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>

                        <div className='border-slate-800 relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)]'>
                            <Image
                                src={selectedCertificate.src}
                                alt={selectedCertificate.alt}
                                width={1400}
                                height={1000}
                                className='h-full w-full object-contain p-8'
                                priority
                            />
                        </div>

                        <div className='mt-6 text-center'>
                            <div className='inline-block rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm border border-white/10'>
                                <h3 className='text-2xl font-bold text-white tracking-wide'>{selectedCertificate.title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
