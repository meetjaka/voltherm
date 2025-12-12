import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter, Globe } from 'lucide-react';

import AnimatedTestimonialsDemo from '@/components/demos/AnimatedTestimonialsDemo';
import BentoGridDemo from '@/components/demos/BentoGridDemo';
import NavbarDemo from '@/components/demos/NavbarDemo';
import ProductCarouselDemo from '@/components/demos/ProductCarouselDemo';
import StickyScrollRevealDemo from '@/components/demos/StickyScrollRevealDemo';

const HomePage: React.FC = () => {
    return (
        <main className='min-h-screen w-full font-(family-name:--font-geist-sans)'>
            {/* Navigation */}
            <NavbarDemo />

            {/* Hero Section */}
            <section className='relative flex min-h-screen items-center overflow-hidden bg-slate-50 pt-20'>
                <div className='absolute inset-0 z-0'>
                    <div className='absolute top-0 right-0 h-full w-2/3 bg-linear-to-bl from-slate-100 to-transparent opacity-50'></div>
                </div>

                <div className='relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
                        <div className='space-y-8'>
                            <div className='mb-4 inline-flex items-center rounded-full border border-teal-500/30 bg-teal-50/50 px-3 py-1 text-sm font-medium text-teal-600'>
                                <span className='mr-2 h-2 w-2 animate-pulse rounded-full bg-teal-500'></span>
                                Next Gen Energy Storage
                            </div>
                            <h1 className='text-5xl leading-tight font-bold tracking-tight text-slate-900 md:text-7xl'>
                                Powering the <br />
                                <span className='bg-linear-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent'>
                                    Future of Motion
                                </span>
                            </h1>
                            <p className='max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl'>
                                Advanced thermal management and high-density battery modules engineered for the next
                                generation of electric mobility.
                            </p>
                            <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
                                <a
                                    href='#technology'
                                    className='group flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-500/20'>
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
                                    className='flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-medium text-slate-900 shadow-sm transition-all duration-300 hover:border-teal-500 hover:text-teal-500 hover:shadow-md'>
                                    View Products
                                </a>
                            </div>
                        </div>

                        <div className='relative flex h-[500px] items-center justify-center lg:h-[600px]'>
                            <Image
                                src='https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop'
                                alt='Battery Module'
                                width={600}
                                height={600}
                                className='rounded-3xl object-cover shadow-2xl'
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Section */}
            <section id='products' className='bg-white py-24'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-3xl font-bold text-slate-900 md:text-4xl'>
                            Integrated Energy Ecosystem
                        </h2>
                        <p className='text-lg text-slate-600'>Modular solutions designed to work in perfect harmony</p>
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
            <footer className='border-t border-slate-200 bg-slate-50 pt-20 pb-10'>
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
            </footer>
        </main>
    );
};

export default HomePage;
