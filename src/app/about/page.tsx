'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import NavbarDemo from '@/components/demos/NavbarDemo';
import { getCertificates, type Certificate } from '@/lib/adminData';

export default function AboutPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    useEffect(() => {
        setCertificates(getCertificates());
    }, []);

    return (
        <main className='min-h-screen bg-white'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='bg-linear-to-b from-slate-900 to-slate-800 px-6 pt-32 pb-20 text-white'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>About Us</h1>
                    <p className='max-w-2xl text-lg text-slate-300'>
                        Leading innovation in battery technology and renewable energy solutions
                    </p>
                </div>
            </section>

            {/* About Content Section */}
            <section className='px-6 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-12 lg:grid-cols-2'>
                        {/* Text Content */}
                        <div className='flex flex-col justify-center'>
                            <h2 className='mb-6 text-3xl font-bold text-slate-900'>Voltherm Technologies LLP</h2>
                            <p className='mb-6 text-lg leading-relaxed text-slate-700'>
                                Voltherm Technologies LLP is an ISO 9001:2015 certified firm specialized in the
                                development of Lithium Battery Packs and Solar Consumer Products. Our services at a
                                glance: Energy Storage, Solar Consumer Products, Electric Vehicle Charging Stations EPC,
                                Solar and EV consultancy. At Voltherm Technologies, you are assured of the quality that
                                is provided with the highest standard of technical support.
                            </p>

                            {/* Services List */}
                            <div className='grid gap-4 md:grid-cols-2'>
                                <div className='flex items-start gap-3'>
                                    <div className='mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500'>
                                        <svg className='size-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                    <span className='font-semibold text-slate-900'>Energy Storage</span>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500'>
                                        <svg className='size-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                    <span className='font-semibold text-slate-900'>Solar Consumer Products</span>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500'>
                                        <svg className='size-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                    <span className='font-semibold text-slate-900'>EV Charging Stations EPC</span>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500'>
                                        <svg className='size-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                    <span className='font-semibold text-slate-900'>Solar & EV Consultancy</span>
                                </div>
                            </div>

                            {/* Quality Assurance */}
                            <div className='mt-8 rounded-lg border-l-4 border-teal-500 bg-teal-50 p-6'>
                                <h3 className='mb-2 font-semibold text-teal-900'>Quality Assurance</h3>
                                <p className='text-sm text-teal-800'>
                                    ISO 9001:2015 certified with highest standard of technical support and commitment to
                                    excellence
                                </p>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className='flex items-center justify-center'>
                            <div className='relative h-96 w-full'>
                                <Image
                                    src='https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop'
                                    alt='Voltherm Technologies'
                                    fill
                                    className='rounded-lg object-cover shadow-2xl'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section className='bg-slate-50 px-6 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <h2 className='mb-4 text-3xl font-bold text-slate-900'>Certifications & Standards</h2>
                    <p className='mb-12 text-lg text-slate-600'>
                        Our commitment to quality and excellence is certified by international standards
                    </p>

                    <div className='grid gap-8 md:grid-cols-3'>
                        {certificates.map((cert) => (
                            <button
                                key={cert.id}
                                onClick={() => setSelectedCertificate(cert)}
                                className='group flex cursor-pointer flex-col items-center rounded-lg bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl'>
                                <div className='relative mb-4 h-40 w-full overflow-hidden rounded'>
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className='rounded object-contain transition-transform duration-300 group-hover:scale-110'
                                    />
                                </div>
                                <h3 className='text-center font-semibold text-slate-900 transition-colors group-hover:text-teal-600'>
                                    {cert.title}
                                </h3>
                                <p className='mt-2 text-xs text-slate-500'>Click to view</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='bg-linear-to-r from-teal-500 to-cyan-500 px-6 py-16 text-white'>
                <div className='mx-auto max-w-7xl text-center'>
                    <h2 className='mb-4 text-3xl font-bold'>Ready to Partner With Us?</h2>
                    <p className='mb-8 text-lg text-teal-50'>
                        Discover how Voltherm Technologies can help transform your energy solutions
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <button className='rounded-lg bg-white px-8 py-3 font-semibold text-teal-600 transition-all hover:bg-slate-100 hover:shadow-lg'>
                            Contact Sales
                        </button>
                        <button className='rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm transition-opacity duration-300'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='animate-in fade-in zoom-in relative flex h-full max-h-[95vh] w-full max-w-6xl flex-col duration-300'
                        onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='absolute top-4 right-4 z-10 flex size-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all hover:scale-110 hover:bg-slate-100'>
                            <svg className='size-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>

                        {/* Image Container */}
                        <div className='relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl bg-white'>
                            <Image
                                src={selectedCertificate.src}
                                alt={selectedCertificate.alt}
                                width={1400}
                                height={1000}
                                className='h-full w-full object-contain p-6'
                                priority
                            />
                        </div>

                        {/* Certificate Title */}
                        <div className='mt-4 text-center'>
                            <h3 className='text-xl font-semibold text-white'>{selectedCertificate.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
