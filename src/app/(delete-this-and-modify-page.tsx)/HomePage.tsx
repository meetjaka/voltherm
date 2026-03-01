import Image from 'next/image';

import AnimatedTestimonialsDemo from '@/components/demos/AnimatedTestimonialsDemo';
import BentoGridDemo from '@/components/demos/BentoGridDemo';
import NavbarDemo from '@/components/demos/NavbarDemo';
import ProductCarouselDemo from '@/components/demos/ProductCarouselDemo';
import StickyScrollRevealDemo from '@/components/demos/StickyScrollRevealDemo';

import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, BatteryCharging } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <main className='min-h-screen w-full font-sans bg-slate-50 text-slate-900 overflow-hidden'>
            {/* Navigation */}
            <NavbarDemo />

            {/* Futuristic Hero Section - Light Mode */}
            <section className='relative flex min-h-screen items-center justify-center pt-32 pb-20 md:pt-40 lg:pt-48'>
                {/* Background Effects */}
                <div className='absolute inset-0 z-0 overflow-hidden'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none'>
                        <div className='absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-300/30 to-secondary/20 blur-[100px] rounded-full mix-blend-multiply'></div>
                    </div>
                    
                    {/* Grid Pattern */}
                    <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-[0.03] pointer-events-none'></div>
                    <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
                </div>

                <div className='relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
                        
                        {/* Left Content */}
                        <div className='space-y-10 flex flex-col justify-center relative'>
                            {/* Floating decorative elements */}
                            <div className='absolute -left-10 top-10 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse'></div>
                            <div className='absolute right-10 bottom-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000'></div>

                            {/* Top Badge */}
                            <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md w-fit transition-all hover:bg-white hover:shadow-md hover:scale-105'>
                                <Sparkles className='h-4 w-4 animate-pulse' />
                                Next Generation Energy
                            </div>
                            
                            {/* Main Headings */}
                            <div className='space-y-4'>
                                <h1 className='text-5xl leading-[1.1] font-extrabold tracking-tight md:text-6xl lg:text-7xl text-slate-900'>
                                    Powering the <br />
                                    <span className='bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent drop-shadow-sm'>
                                        Future of Motion
                                    </span>
                                </h1>
                                <p className='max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl font-medium'>
                                    Advanced thermal management, intelligent BMS, and high-density battery modules engineered for electric mobility, aerospace, and grid-scale storage.
                                </p>
                            </div>

                            {/* Feature Cards */}
                            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                                <div className='group flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white/80 hover:bg-white hover:border-primary/40 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                                    <div className='rounded-xl bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20'>
                                        <ShieldCheck className='text-primary h-6 w-6' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-slate-900 transition-colors'>Safety Architecture</p>
                                        <p className='text-xs text-slate-500 mt-1 leading-relaxed'>Redundant thermal control with active fault isolation.</p>
                                    </div>
                                </div>
                                <div className='group flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white/80 hover:bg-white hover:border-secondary/40 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                                    <div className='rounded-xl bg-secondary/10 p-2.5 transition-colors group-hover:bg-secondary/20'>
                                        <Zap className='text-secondary h-6 w-6' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-slate-900 transition-colors'>High Power Density</p>
                                        <p className='text-xs text-slate-500 mt-1 leading-relaxed'>Peak discharge optimized for performance vehicles.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons & Certs */}
                            <div className='flex flex-col gap-6 pt-4 sm:flex-row sm:items-center'>
                                <div className='flex flex-col gap-4 sm:flex-row'>
                                    <a
                                        href='#technology'
                                        className='group relative flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40'>
                                        <div className='absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full' />
                                        <span className='relative z-10 flex items-center'>
                                            Explore Technology
                                            <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5' />
                                        </span>
                                    </a>
                                    <a
                                        href='#products'
                                        className='group flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 px-8 py-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:shadow-md'>
                                        View Products
                                    </a>
                                </div>
                                
                                <div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-5 py-3.5 text-xs font-bold text-slate-600 backdrop-blur-md shadow-sm'>
                                    <CheckCircle2 className='text-green-500 h-5 w-5 drop-shadow-sm' />
                                    ISO 9001 &bull; UL 1973 &bull; IEC 62619
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Futuristic Graphic */}
                        <div className='relative flex h-[500px] items-center justify-center lg:h-[650px] w-full'>
                            {/* Glowing rings and background */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='absolute h-[400px] w-[400px] rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]'></div>
                                <div className='absolute h-[500px] w-[500px] rounded-full border border-secondary/10 animate-[spin_30s_linear_infinite_reverse]'></div>
                                <div className='absolute h-[600px] w-[600px] rounded-full border border-slate-300 border-dashed animate-[spin_40s_linear_infinite]'></div>
                            </div>

                            {/* Main Image Container */}
                            <div className='relative z-10 group'>
                                <div className='absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20'></div>
                                <div className='relative rounded-3xl p-1 bg-white/50 backdrop-blur-md border border-white shadow-2xl'>
                                    <Image
                                        src='https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop'
                                        alt='Battery Module'
                                        width={550}
                                        height={550}
                                        className='rounded-[22px] object-cover transition-transform duration-700 hover:scale-[1.02]'
                                        priority
                                    />
                                </div>
                                
                                {/* Floating Badges */}
                                <div className='absolute -left-12 top-20 rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur-xl animate-bounce [animation-duration:3s]'>
                                    <div className='flex items-center gap-3'>
                                        <div className='rounded-full bg-green-100 p-2 border border-green-200'>
                                            <BatteryCharging className='h-5 w-5 text-green-600' />
                                        </div>
                                        <div>
                                            <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest'>Efficiency</p>
                                            <p className='text-sm font-extrabold text-slate-900'>99.8% Peak</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='absolute -right-8 bottom-10 w-72 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-primary/30'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <p className='text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary'>System Core</p>
                                        <span className='flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse'></span>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 text-sm relative'>
                                        <div className='absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2'></div>
                                        <div className='absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 -translate-x-1/2'></div>
                                        
                                        <div className='pb-2 pr-2'>
                                            <p className='text-slate-500 font-semibold text-[11px] mb-1'>Energy Density</p>
                                            <p className='text-slate-900 font-bold tracking-tight'>260 Wh/kg</p>
                                        </div>
                                        <div className='pb-2 pl-2'>
                                            <p className='text-slate-500 font-semibold text-[11px] mb-1'>Cycle Life</p>
                                            <p className='text-slate-900 font-bold tracking-tight'>&gt;4,000</p>
                                        </div>
                                        <div className='pt-2 pr-2'>
                                            <p className='text-slate-500 font-semibold text-[11px] mb-1'>Thermal Band</p>
                                            <p className='text-slate-900 font-bold tracking-tight'>-20&deg;C to 55&deg;C</p>
                                        </div>
                                        <div className='pt-2 pl-2'>
                                            <p className='text-slate-500 font-semibold text-[11px] mb-1'>Response Time</p>
                                            <p className='text-slate-900 font-bold tracking-tight'>5 ms BMS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Section */}

            <section id='products' className='bg-white py-24 relative'>
                {/* Subtle top divider line */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
                    <div className='mb-16 text-center'>
                        <div className="inline-block mb-4 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                            Core Architecture
                        </div>
                        <h2 className='text-slate-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight'>
                            Integrated Energy Ecosystem
                        </h2>
                        <p className='text-slate-600 max-w-2xl mx-auto text-lg font-medium'>
                            Modular solutions designed to work in perfect harmony. Every Voltherm platform is built from the ground up for massive scaling.
                        </p>
                    </div>
                    <BentoGridDemo />
                </div>
            </section>

            {/* Sticky Scroll Technology Section - Full Screen */}
            <section id='technology' className='w-full bg-white relative pt-24 pb-12 z-20'>
                {/* Top divider */}
                <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 mb-16'>
                    <div className='text-center'>
                        <div className="inline-block mb-4 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-600">
                            Innovation Hub
                        </div>
                        <h2 className='text-slate-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight'>
                            Pioneering Cell Technology
                        </h2>
                        <p className='text-slate-600 max-w-2xl mx-auto text-lg font-medium'>
                            Discover the cutting-edge features that set Voltherm systems apart in performance, safety, and lifespan.
                        </p>
                    </div>
                </div>
                
                <StickyScrollRevealDemo />
            </section>

            {/* Animated Testimonials Section */}
            <section className='bg-slate-50 py-24 relative'>
                {/* Top divider */}
                <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-12 text-center'>
                        <div className="inline-block mb-4 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                            Partnerships
                        </div>
                        <h2 className='mb-4 text-3xl font-extrabold text-slate-900 md:text-5xl tracking-tight'>Trusted by Industry Leaders</h2>
                        <p className='text-lg font-medium text-slate-600 max-w-2xl mx-auto'>See what our partners say about scaling their infrastructure with Voltherm</p>
                    </div>
                    <AnimatedTestimonialsDemo />
                </div>
            </section>

            {/* Product Carousel Section */}
            <section id='carousel' className='w-full bg-white relative'>
                {/* Top divider */}
                <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-20"></div>
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
