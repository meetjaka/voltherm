import Image from 'next/image';

import AnimatedTestimonialsDemo from '@/components/demos/AnimatedTestimonialsDemo';
import BentoGridDemo from '@/components/demos/BentoGridDemo';
import NavbarDemo from '@/components/demos/NavbarDemo';
import ProductCarouselDemo from '@/components/demos/ProductCarouselDemo';
import StickyScrollRevealDemo from '@/components/demos/StickyScrollRevealDemo';

import { CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <main className='min-h-screen w-full font-sans'>
            {/* Navigation */}
            <NavbarDemo />

            {/* Hero Section */}
            <section className='relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-violet-50/40 pt-40 md:pt-44 lg:pt-48'>
                <div className='absolute inset-0 z-0'>
                    <div className='pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-purple-400/15 blur-3xl'></div>
                    <div className='pointer-events-none absolute bottom-0 right-0 h-96 w-96 bg-[radial-gradient(circle_at_80%_20%,rgba(139,69,139,0.20),transparent_45%)] opacity-70 blur-2xl'></div>
                    <div className='pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_85%_15%,rgba(128,57,123,0.14),transparent_50%)] opacity-[0.15]'></div>
                </div>

                <div className='relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
                        <div className='space-y-8'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur'>
                                <Sparkles className='h-4 w-4' />
                                Next Gen Energy Storage
                            </div>
                            <h1 className='text-foreground text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl'>
                                Powering the <span className='text-primary'>Future of Motion</span>
                            </h1>
                            <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl'>
                                Advanced thermal management, intelligent BMS, and high-density battery modules engineered for electric mobility, aerospace, and grid-scale storage.
                            </p>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div className='flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur'>
                                    <ShieldCheck className='text-primary h-5 w-5' />
                                    <div>
                                        <p className='text-sm font-semibold text-foreground'>Safety-first architecture</p>
                                        <p className='text-xs text-muted-foreground'>Redundant thermal control with active fault isolation.</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur'>
                                    <Zap className='text-primary h-5 w-5' />
                                    <div>
                                        <p className='text-sm font-semibold text-foreground'>High power density</p>
                                        <p className='text-xs text-muted-foreground'>Peak discharge optimized for performance vehicles.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:items-center'>
                                <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
                                    <a
                                        href='#technology'
                                        className='group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center rounded-lg px-8 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl'>
                                        Explore Technology
                                        <svg
                                            className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M13 7l5 5m0 0l-5 5m5-5H6'
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href='#products'
                                        className='border-border text-foreground hover:border-primary/60 hover:bg-white flex items-center justify-center rounded-lg border-2 bg-white px-8 py-3.5 text-base font-semibold shadow-sm transition-all duration-200'>
                                        View Products
                                    </a>
                                </div>
                                <div className='flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur'>
                                    <CheckCircle2 className='text-primary h-5 w-5' />
                                    ISO 9001 • UL 1973 • IEC 62619
                                </div>
                            </div>
                        </div>

                        <div className='relative flex h-125 items-center justify-center lg:h-150'>
                            <div className='absolute -left-6 top-10 h-24 w-24 rounded-full bg-purple-100/70 blur-2xl'></div>
                            <div className='absolute inset-0 rounded-[36px] bg-gradient-to-br from-purple-400/12 via-white to-violet-100/10 blur-3xl'></div>
                            <Image
                                src='https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop'
                                alt='Battery Module'
                                width={640}
                                height={640}
                                className='relative rounded-3xl border border-white/50 object-cover shadow-2xl shadow-primary/10'
                                priority
                            />
                            <div className='absolute -bottom-6 right-6 w-64 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur'>
                                <p className='text-xs font-semibold uppercase tracking-[0.14em] text-slate-500'>Performance Snapshot</p>
                                <div className='mt-3 grid grid-cols-2 gap-3 text-sm'>
                                    <div>
                                        <p className='text-muted-foreground text-xs'>Energy Density</p>
                                        <p className='text-foreground font-semibold'>260 Wh/kg</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground text-xs'>Cycle Life</p>
                                        <p className='text-foreground font-semibold'>&gt;4,000</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground text-xs'>Thermal Band</p>
                                        <p className='text-foreground font-semibold'>-20°C to 55°C</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground text-xs'>Response</p>
                                        <p className='text-foreground font-semibold'>5 ms BMS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Section */}
            <section id='products' className='bg-white py-24'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>
                            Integrated Energy Ecosystem
                        </h2>
                        <p className='text-muted-foreground text-lg'>
                            Modular solutions designed to work in perfect harmony
                        </p>
                    </div>
                    <BentoGridDemo />
                </div>
            </section>

            {/* Sticky Scroll Technology Section - Full Screen */}
            <section id='technology' className='min-h-screen w-full'>
                <StickyScrollRevealDemo />
            </section>

            {/* Animated Testimonials Section */}
            <section className='bg-white py-24'>
                <div className='mb-8 text-center'>
                    <h2 className='mb-4 text-3xl font-bold text-slate-900 md:text-4xl'>Trusted by Industry Leaders</h2>
                    <p className='text-lg text-slate-600'>See what our partners say about working with Voltara</p>
                </div>
                <AnimatedTestimonialsDemo />
            </section>

            {/* Product Carousel Section */}
            <section id='carousel' className='w-full bg-white'>
                <ProductCarouselDemo />
            </section>

            {/* Footer */}
            {/* <footer className='border-t border-slate-200 bg-slate-50 pt-20 pb-10'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
                        <div>
                            <div className='mb-6 flex items-center'>
                                <div className='mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-900 font-bold text-white'>
                                    V
                                </div>
                                <span className='text-xl font-bold text-slate-900'>VOLTARA</span>
                            </div>
                            <p className='mb-6 text-slate-500'>
                                Pioneering the future of energy storage with advanced thermal management and cell
                                chemistry.
                            </p>
                        </div>

                        <div>
                            <h4 className='mb-6 font-bold text-slate-900'>Products</h4>
                            <ul className='space-y-4 text-slate-500'>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        Battery Modules
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        Thermal Systems
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        Energy Storage
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='mb-6 font-bold text-slate-900'>Company</h4>
                            <ul className='space-y-4 text-slate-500'>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='transition-colors hover:text-teal-500'>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className='mb-6 font-bold text-slate-900'>Certifications</h4>
                            <div className='flex flex-wrap gap-4'>
                                <div className='rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400'>
                                    ISO 9001
                                </div>
                                <div className='rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400'>
                                    UL 1973
                                </div>
                                <div className='rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400'>
                                    IEC 62619
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-between border-t border-slate-200 pt-8 text-sm text-slate-400 md:flex-row'>
                        <p>&copy; 2025 Voltherm Technologies. All rights reserved.</p>
                        <div className='mt-6 flex flex-col items-center gap-6 md:mt-0 md:flex-row md:gap-8'>
                            <div className='flex gap-4 items-center'>
                                <a href='https://www.facebook.com/Voltherm/' target='_blank' rel='noopener noreferrer' className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Facebook size={18} className='text-slate-600 transition-colors group-hover:text-white' />
                                </a>
                                <a href='https://www.instagram.com/volthermtech/' target='_blank' rel='noopener noreferrer' className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Instagram size={18} className='text-slate-600 transition-colors group-hover:text-white' />
                                </a>
                                <a href='https://x.com/voltherm' target='_blank' rel='noopener noreferrer' className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Twitter size={18} className='text-slate-600 transition-colors group-hover:text-white' />
                                </a>
                                <a href='https://www.linkedin.com/company/volthermtechnologies/' target='_blank' rel='noopener noreferrer' className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Linkedin size={18} className='text-slate-600 transition-colors group-hover:text-white' />
                                </a>
                                <a href='https://www.indiamart.com/voltherm-technologies/' target='_blank' rel='noopener noreferrer' className='transition-opacity hover:opacity-80'>
                                    <Image 
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoD3M7txqb9TdLTe_prXdviUPp6m4tEvmeA&s' 
                                        alt='IndiaMART' 
                                        width={80} 
                                        height={30}
                                        className='object-contain'
                                    />
                                </a>
                            </div>
                            <div className='flex space-x-6'>
                                <a href='#' className='hover:text-slate-900'>
                                    Privacy Policy
                                </a>
                                <a href='#' className='hover:text-slate-900'>
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}
        </main>
    );
};

export default HomePage;
