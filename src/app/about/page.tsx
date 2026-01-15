'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { Battery, Sun, Plug, Lightbulb, Rocket, Sparkles, Leaf } from 'lucide-react';

import NavbarDemo from '@/components/demos/NavbarDemo';
import { type Certificate, getCertificates } from '@/lib/adminData';

export default function AboutPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    useEffect(() => {
        setCertificates(getCertificates());
    }, []);

    return (
        <main className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
            <NavbarDemo />

            {/* Hero Section */}
            <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-6 pt-32 pb-24'>
                <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]' />
                <div className='absolute inset-0 bg-gradient-to-t from-slate-900/50' />
                <div className='relative mx-auto max-w-7xl'>
                    <div className='inline-block rounded-full bg-teal-500/10 px-4 py-2 mb-6 backdrop-blur-sm border border-teal-500/20'>
                        <span className='text-sm font-semibold text-teal-400'>ISO 9001:2015 Certified</span>
                    </div>
                    <h1 className='mb-6 text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>
                        About Voltherm
                    </h1>
                    <p className='max-w-3xl text-xl text-slate-300 leading-relaxed'>
                        Leading innovation in battery technology and renewable energy solutions for a sustainable future
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className='px-6 -mt-12 relative z-10'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        <div className='bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow'>
                            <div className='text-4xl font-bold text-teal-600 mb-2'>500+</div>
                            <div className='text-slate-600 font-medium'>Projects Completed</div>
                        </div>
                        <div className='bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow'>
                            <div className='text-4xl font-bold text-teal-600 mb-2'>98%</div>
                            <div className='text-slate-600 font-medium'>Client Satisfaction</div>
                        </div>
                        <div className='bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow'>
                            <div className='text-4xl font-bold text-teal-600 mb-2'>24/7</div>
                            <div className='text-slate-600 font-medium'>Technical Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content Section */}
            <section className='px-6 py-24'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid gap-16 lg:grid-cols-2 items-center'>
                        {/* Image Section */}
                        <div className='order-2 lg:order-1'>
                            <div className='relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl'>
                                <div className='absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent z-10' />
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
                            <div className='inline-block rounded-full bg-teal-100 px-4 py-2 mb-6'>
                                <span className='text-sm font-semibold text-teal-700'>Who We Are</span>
                            </div>
                            <h2 className='mb-6 text-4xl font-bold text-slate-900 leading-tight'>
                                Voltherm Innovation Private Limited
                            </h2>
                            <p className='mb-8 text-lg leading-relaxed text-slate-600'>
                                Voltherm Innovation Private Limited is an ISO 9001:2015 certified firm specialized in
                                the development of Lithium Battery Packs and Solar Consumer Products. Our services at a
                                glance: Energy Storage, Solar Consumer Products, Electric Vehicle Charging Stations EPC,
                                Solar and EV consultancy.
                            </p>
                            <p className='mb-8 text-lg leading-relaxed text-slate-600'>
                                At Voltherm Innovation Private Limited, you are assured of the quality that is provided 
                                with the highest standard of technical support.
                            </p>

                            {/* Services Grid */}
                            <div className='grid gap-4 sm:grid-cols-2'>
                                {[
                                    { icon: Battery, title: 'Energy Storage' },
                                    { icon: Sun, title: 'Solar Consumer Products' },
                                    { icon: Plug, title: 'EV Charging Stations EPC' },
                                    { icon: Lightbulb, title: 'Solar & EV Consultancy' }
                                ].map((service, index) => (
                                    <div key={index} className='flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all group'>
                                        <service.icon className='h-7 w-7 text-teal-600 group-hover:scale-110 transition-transform' />
                                        <span className='font-semibold text-slate-900'>{service.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-24'>
                <div className='mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-white mb-4'>Our Core Values</h2>
                        <p className='text-xl text-slate-300'>What drives us to excellence</p>
                    </div>
                    <div className='grid gap-8 md:grid-cols-3'>
                        {[
                            { title: 'Innovation', desc: 'Pioneering cutting-edge solutions in renewable energy', icon: Rocket },
                            { title: 'Quality', desc: 'ISO certified processes ensuring highest standards', icon: Sparkles },
                            { title: 'Sustainability', desc: 'Committed to a greener, cleaner future', icon: Leaf }
                        ].map((value, index) => (
                            <div key={index} className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all'>
                                <value.icon className='h-12 w-12 text-teal-400 mb-4' />
                                <h3 className='text-2xl font-bold text-white mb-3'>{value.title}</h3>
                                <p className='text-slate-300'>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section className='px-6 py-24'>
                <div className='mx-auto max-w-7xl'>
                    <div className='text-center mb-16'>
                        <div className='inline-block rounded-full bg-teal-100 px-4 py-2 mb-6'>
                            <span className='text-sm font-semibold text-teal-700'>Certifications</span>
                        </div>
                        <h2 className='text-4xl font-bold text-slate-900 mb-4'>Certifications & Standards</h2>
                        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
                            Our commitment to quality and excellence is certified by international standards
                        </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3'>
                        {certificates.map((cert) => (
                            <button
                                key={cert.id}
                                onClick={() => setSelectedCertificate(cert)}
                                className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-slate-200 transition-all hover:shadow-2xl hover:-translate-y-2'>
                                <div className='absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all' />
                                <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-slate-50'>
                                    <Image
                                        src={cert.src}
                                        alt={cert.alt}
                                        fill
                                        className='object-contain p-4 transition-transform duration-500 group-hover:scale-110'
                                    />
                                </div>
                                <h3 className='text-center font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors'>
                                    {cert.title}
                                </h3>
                                <p className='mt-2 text-center text-sm text-slate-500'>Click to view details</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 px-6 py-24'>
                <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]' />
                <div className='relative mx-auto max-w-4xl text-center'>
                    <h2 className='mb-6 text-4xl font-bold text-white md:text-5xl'>Ready to Partner With Us?</h2>
                    <p className='mb-10 text-xl text-teal-50'>
                        Discover how Voltherm Technologies can help transform your energy solutions
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <button className='group rounded-xl bg-white px-8 py-4 font-bold text-teal-600 shadow-xl transition-all hover:shadow-2xl hover:scale-105'>
                            Contact Sales
                            <span className='inline-block ml-2 transition-transform group-hover:translate-x-1'>→</span>
                        </button>
                        <button className='rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 font-bold text-white transition-all hover:bg-white/20'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col animate-in zoom-in-95 duration-200'
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='absolute -top-4 -right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-2xl transition-all hover:scale-110 hover:rotate-90'>
                            <svg className='size-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>

                        <div className='relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl'>
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
