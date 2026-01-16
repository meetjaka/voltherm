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
        <main className='min-h-screen bg-white dark:bg-[oklch(0.12_0_0)]'>
            <NavbarDemo />

            {/* Hero Section - Clean white with purple accent */}
            <section className='relative bg-white dark:bg-[oklch(0.12_0_0)] px-6 pt-32 pb-20 border-b border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)]'>
                <div className='mx-auto max-w-7xl'>
                    <div className='inline-flex items-center gap-2 rounded-full border border-[oklch(0.38_0.12_295)]/20 bg-[oklch(0.38_0.12_295)]/5 px-4 py-2 mb-6'>
                        <svg className='size-4 text-[oklch(0.38_0.12_295)]' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span className='text-sm font-semibold text-[oklch(0.38_0.12_295)]'>ISO 9001:2015 Certified</span>
                    </div>
                    <h1 className='mb-6 text-5xl font-bold md:text-6xl lg:text-7xl text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)]'>
                        About Voltherm
                    </h1>
                    <p className='max-w-3xl text-xl text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)] leading-relaxed'>
                        Leading innovation in battery technology and renewable energy solutions for a sustainable future
                    </p>
                </div>
            </section>

            {/* Stats Section - White cards with purple accents */}
            <section className='px-6 py-16 bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.15_0_0)]'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {[
                            { value: '500+', label: 'Projects Completed', color: 'purple' },
                            { value: '98%', label: 'Client Satisfaction', color: 'purple' },
                            { value: '24/7', label: 'Technical Support', color: 'red' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className='group bg-white dark:bg-[oklch(0.15_0_0)] rounded-xl p-8 border border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)] hover:border-[oklch(0.38_0.12_295)] dark:hover:border-[oklch(0.55_0.12_295)] transition-all duration-300 hover:shadow-lg cursor-pointer'
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
                                <div className={`text-5xl font-bold mb-3 ${stat.color === 'purple' ? 'text-[oklch(0.38_0.12_295)] dark:text-[oklch(0.55_0.12_295)]' : 'text-[oklch(0.45_0.15_15)] dark:text-[oklch(0.60_0.15_15)]'}`}>
                                    {stat.value}
                                </div>
                                <div className='text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)] font-medium'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content Section - White background */}
            <section className='px-6 py-20 bg-white dark:bg-[oklch(0.12_0_0)]'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-16 lg:grid-cols-2 items-center'>
                        {/* 3D Image */}
                        <div className='order-2 lg:order-1' style={{ perspective: '1500px' }}>
                            <div
                                className='relative h-[500px] w-full rounded-2xl overflow-hidden border border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)] shadow-xl'
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
                            <div className='inline-block rounded-full border border-[oklch(0.38_0.12_295)]/20 bg-[oklch(0.38_0.12_295)]/5 px-4 py-2 mb-6'>
                                <span className='text-sm font-semibold text-[oklch(0.38_0.12_295)] dark:text-[oklch(0.55_0.12_295)]'>Who We Are</span>
                            </div>
                            <h2 className='mb-6 text-4xl font-bold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] leading-tight'>
                                Voltherm Innovation Private Limited
                            </h2>
                            <p className='mb-6 text-lg leading-relaxed text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)]'>
                                Voltherm Innovation Private Limited is an ISO 9001:2015 certified firm specialized in
                                the development of Lithium Battery Packs and Solar Consumer Products.
                            </p>
                            <p className='mb-8 text-lg leading-relaxed text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)]'>
                                Our services include Energy Storage, Solar Consumer Products, Electric Vehicle Charging Stations EPC,
                                and Solar & EV consultancy with the highest standard of technical support.
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
                                        className='group flex items-center gap-3 p-4 rounded-lg bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.15_0_0)] border border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)] hover:border-[oklch(0.38_0.12_295)] dark:hover:border-[oklch(0.55_0.12_295)] transition-all cursor-pointer'
                                        style={{ transformStyle: 'preserve-3d' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateZ(10px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateZ(0px)';
                                        }}>
                                        <div className='text-2xl'>{service.icon}</div>
                                        <span className='font-semibold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] group-hover:text-[oklch(0.38_0.12_295)] dark:group-hover:text-[oklch(0.55_0.12_295)] transition-colors'>
                                            {service.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Light gray background */}
            <section className='bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.15_0_0)] px-6 py-20 border-y border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)]'>
                <div className='mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] mb-4'>Our Core Values</h2>
                        <p className='text-xl text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)]'>What drives us to excellence</p>
                    </div>
                    <div className='grid gap-8 md:grid-cols-3' style={{ perspective: '1500px' }}>
                        {[
                            { title: 'Innovation', desc: 'Pioneering cutting-edge solutions in renewable energy', icon: '🚀' },
                            { title: 'Quality', desc: 'ISO certified processes ensuring highest standards', icon: '✨' },
                            { title: 'Sustainability', desc: 'Committed to a greener, cleaner future', icon: '🌱' }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className='bg-white dark:bg-[oklch(0.15_0_0)] rounded-xl p-8 border border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)] hover:border-[oklch(0.38_0.12_295)] dark:hover:border-[oklch(0.55_0.12_295)] transition-all duration-300 hover:shadow-lg cursor-pointer'
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
                                <div className='text-5xl mb-4'>{value.icon}</div>
                                <h3 className='text-2xl font-bold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] mb-3'>{value.title}</h3>
                                <p className='text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)]'>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates Section - White background */}
            <section className='px-6 py-20 bg-white dark:bg-[oklch(0.12_0_0)]'>
                <div className='mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <div className='inline-block rounded-full border border-[oklch(0.38_0.12_295)]/20 bg-[oklch(0.38_0.12_295)]/5 px-4 py-2 mb-6'>
                            <span className='text-sm font-semibold text-[oklch(0.38_0.12_295)] dark:text-[oklch(0.55_0.12_295)]'>Certifications</span>
                        </div>
                        <h2 className='text-4xl font-bold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] mb-4'>Certifications & Standards</h2>
                        <p className='text-xl text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)] max-w-2xl mx-auto'>
                            Our commitment to quality and excellence is certified by international standards
                        </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3' style={{ perspective: '2000px' }}>
                        {certificates.map((cert) => (
                            <button
                                key={cert.id}
                                onClick={() => setSelectedCertificate(cert)}
                                className='group bg-white dark:bg-[oklch(0.15_0_0)] rounded-xl p-6 border border-[oklch(0.90_0_0)] dark:border-[oklch(0.25_0_0)] hover:border-[oklch(0.38_0.12_295)] dark:hover:border-[oklch(0.55_0.12_295)] transition-all duration-300 hover:shadow-xl'
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
                                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                                }}>
                                <div className='relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.12_0_0)]'>
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className='object-contain p-4 transition-transform duration-500 group-hover:scale-110'
                                    />
                                </div>
                                <h3 className='text-center font-bold text-[oklch(0.15_0_0)] dark:text-[oklch(0.95_0_0)] text-lg group-hover:text-[oklch(0.38_0.12_295)] dark:group-hover:text-[oklch(0.55_0.12_295)] transition-colors'>
                                    {cert.title}
                                </h3>
                                <p className='mt-2 text-center text-sm text-[oklch(0.45_0_0)] dark:text-[oklch(0.60_0_0)]'>Click to view details</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Purple background with white text */}
            <section className='relative bg-[oklch(0.38_0.12_295)] dark:bg-[oklch(0.55_0.12_295)] px-6 py-20'>
                <div className='mx-auto max-w-4xl text-center'>
                    <h2 className='mb-6 text-4xl font-bold text-white md:text-5xl'>Ready to Partner With Us?</h2>
                    <p className='mb-10 text-xl text-white/90'>
                        Discover how Voltherm Technologies can help transform your energy solutions
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <button className='group rounded-lg bg-white px-8 py-4 font-bold text-[oklch(0.38_0.12_295)] shadow-lg transition-all hover:shadow-xl hover:scale-105'>
                            Contact Sales
                            <span className='inline-block ml-2 transition-transform group-hover:translate-x-1'>→</span>
                        </button>
                        <button className='rounded-lg border-2 border-white bg-transparent px-8 py-4 font-bold text-white transition-all hover:bg-white/10'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col animate-in zoom-in-95 duration-200'
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='absolute -top-4 -right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white text-[oklch(0.15_0_0)] shadow-xl transition-all hover:scale-110 hover:rotate-90'>
                            <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>

                        <div className='relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl border border-[oklch(0.90_0_0)]'>
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
