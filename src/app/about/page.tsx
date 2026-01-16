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
        <main className='min-h-screen bg-white'>
            <NavbarDemo />

            {/* Hero Section - Clean white with primary accent */}
            <section className='border-border relative border-b bg-white px-6 pt-40 pb-20 lg:pt-48'>
                <div className='mx-auto max-w-7xl'>
                    <div className='border-primary/20 bg-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2'>
                        <svg className='text-primary size-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                                fillRule='evenodd'
                                d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span className='text-primary text-sm font-semibold'>ISO 9001:2015 Certified</span>
                    </div>
                    <h1 className='text-foreground mb-6 text-5xl font-bold md:text-6xl lg:text-7xl'>About Voltherm</h1>
                    <p className='text-muted-foreground max-w-3xl text-xl leading-relaxed'>
                        Leading innovation in battery technology and renewable energy solutions for a sustainable future
                    </p>
                </div>
            </section>

            {/* Stats Section - White cards with primary accents */}
            <section className='bg-white px-6 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            { value: '500+', label: 'Projects Completed' },
                            { value: '98%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Technical Support' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className='group border-border hover:border-primary cursor-pointer rounded-xl border bg-white p-8 transition-all duration-300 hover:shadow-lg'
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = (y - centerY) / 20;
                                    const rotateY = (centerX - x) / 20;
                                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                                }}>
                                <div className='text-primary mb-2 text-4xl font-bold'>{stat.value}</div>
                                <div className='text-muted-foreground text-lg'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content Section - White background */}
            <section className='border-border border-t bg-white px-6 py-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid items-center gap-16 lg:grid-cols-2'>
                        {/* 3D Image */}
                        <div className='order-2 lg:order-1' style={{ perspective: '1500px' }}>
                            <div
                                className='border-border relative h-[500px] w-full overflow-hidden rounded-2xl border shadow-xl'
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
                                    className='object-cover'
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className='order-1 lg:order-2'>
                            <div className='border-primary/20 bg-primary/5 mb-6 inline-block rounded-full border px-4 py-2'>
                                <span className='text-primary text-sm font-semibold'>Who We Are</span>
                            </div>
                            <h2 className='text-foreground mb-6 text-4xl leading-tight font-bold'>
                                Voltherm Innovation Private Limited
                            </h2>
                            <p className='text-muted-foreground mb-6 text-lg leading-relaxed'>
                                Voltherm Innovation Private Limited is an ISO 9001:2015 certified firm specialized in
                                the development of Lithium Battery Packs and Solar Consumer Products.
                            </p>
                            <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
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
                                        className='group border-border hover:border-primary flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-4 transition-all'
                                        style={{ transformStyle: 'preserve-3d' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateZ(10px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateZ(0px)';
                                        }}>
                                        <div className='text-2xl'>{service.icon}</div>
                                        <span className='text-foreground group-hover:text-primary font-semibold transition-colors'>
                                            {service.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Light background */}
            <section className='border-border border-y bg-white px-6 py-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-4xl font-bold'>Our Core Values</h2>
                        <p className='text-muted-foreground text-xl'>What drives us to excellence</p>
                    </div>
                    <div className='grid gap-8 md:grid-cols-3' style={{ perspective: '1500px' }}>
                        {[
                            {
                                title: 'Innovation',
                                desc: 'Pioneering cutting-edge solutions in renewable energy',
                                icon: '🚀'
                            },
                            {
                                title: 'Quality',
                                desc: 'ISO certified processes ensuring highest standards',
                                icon: '✨'
                            },
                            { title: 'Sustainability', desc: 'Committed to a greener, cleaner future', icon: '🌱' }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className='border-border hover:border-primary cursor-pointer rounded-xl border bg-white p-8 transition-all duration-300 hover:shadow-lg'
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = (y - centerY) / 20;
                                    const rotateY = (centerX - x) / 20;
                                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                                }}>
                                <div className='mb-4 text-5xl'>{value.icon}</div>
                                <h3 className='text-foreground mb-3 text-2xl font-bold'>{value.title}</h3>
                                <p className='text-muted-foreground'>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates Section - White background */}
            <section className='bg-white px-6 py-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-16 text-center'>
                        <div className='border-primary/20 bg-primary/5 mb-6 inline-block rounded-full border px-4 py-2'>
                            <span className='text-primary text-sm font-semibold'>Certifications</span>
                        </div>
                        <h2 className='text-foreground mb-4 text-4xl font-bold'>Certifications & Standards</h2>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                            Our commitment to quality and excellence is certified by international standards
                        </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3' style={{ perspective: '2000px' }}>
                        {certificates.map((cert) => (
                            <button
                                key={cert.id}
                                onClick={() => setSelectedCertificate(cert)}
                                className='group border-border hover:border-primary rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-xl'
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    const rotateX = (y - centerY) / 15;
                                    const rotateY = (centerX - x) / 15;
                                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                                }}>
                                <div className='relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-white'>
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className='object-contain p-4 transition-transform duration-500 group-hover:scale-110'
                                    />
                                </div>
                                <h3 className='text-foreground group-hover:text-primary text-center text-lg font-bold transition-colors'>
                                    {cert.title}
                                </h3>
                                <p className='text-muted-foreground mt-2 text-center text-sm'>Click to view details</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Gradient background with white text */}
            <section className='from-primary relative overflow-hidden bg-gradient-to-br to-red-900 px-6 py-20'>
                {/* Decorative elements */}
                <div className='absolute top-0 right-0 -mt-48 -ml-48 h-96 w-96 rounded-full bg-white/5'></div>
                <div className='absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-white/5'></div>

                <div className='relative z-10 mx-auto max-w-4xl text-center'>
                    <h2 className='mb-6 text-4xl font-bold text-white md:text-5xl'>Ready to Partner With Us?</h2>
                    <p className='mb-10 text-xl text-white/90'>
                        Discover how Voltherm Technologies can help transform your energy solutions
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <button className='group text-primary rounded-lg bg-white px-8 py-4 font-bold shadow-lg transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-2xl'>
                            Contact Sales
                            <span className='ml-2 inline-block transition-transform group-hover:translate-x-1'>→</span>
                        </button>
                        <button className='rounded-lg border-2 border-white bg-transparent px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div
                    className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='animate-in zoom-in-95 relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col duration-200'
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='text-foreground absolute -top-4 -right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 hover:rotate-90'>
                            <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>

                        <div className='border-border relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-2xl'>
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
                            <h3 className='text-2xl font-bold text-white'>{selectedCertificate.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
