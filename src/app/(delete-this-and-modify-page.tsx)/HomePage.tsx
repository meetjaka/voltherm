'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import AnimatedTestimonialsDemo from '@/components/demos/AnimatedTestimonialsDemo';
import BentoGridDemo from '@/components/demos/BentoGridDemo';
import ProductCarouselDemo from '@/components/demos/ProductCarouselDemo';
import StickyScrollRevealDemo from '@/components/demos/StickyScrollRevealDemo';

import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Car,
    Radio,
    Database,
    BatteryCharging,
    Menu,
    X,
    Shield,
    Sun,
    Zap
} from 'lucide-react';

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const verticalsRef = useRef<HTMLDivElement>(null);

    const categories = ['Automotive', 'Telecom', 'BESS', 'Lead Replacement'];

    // Dynamic Hero Content based on selected tab
    const heroContent = [
        {
            badge: 'Automotive Energy',
            title: 'Powering the Future of Motion',
            desc: 'Advanced thermal management, intelligent BMS, and high-density battery modules engineered for electric mobility, aerospace, and performance vehicles.',
            image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
            specs: ['ISO 9001', 'UL 1973', 'IEC 62619']
        },
        {
            badge: 'Telecom Backup',
            title: 'Uninterrupted Grid & Telecom Power',
            desc: 'Highly resilient energy storage systems with intelligent BMS, active fault isolation, and optimized backup capability for critical network infrastructures.',
            image: 'https://images.unsplash.com/photo-1544669146-6c4d76717a6a?q=80&w=1200&auto=format&fit=crop',
            specs: ['IP65 Rated', 'Remote Telemetry', 'Long Standby']
        },
        {
            badge: 'Commercial Storage',
            title: 'Smart Grid-Scale Energy Storage',
            desc: 'Modular, containerized Battery Energy Storage Systems (BESS) designed for grid stability, peak shaving, and clean industrial energy backup.',
            image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1200&auto=format&fit=crop',
            specs: ['MW-scale Systems', 'Active Thermal', 'Peak Shaving']
        },
        {
            badge: 'Industrial Power',
            title: 'High-Density Lead Acid Replacement',
            desc: 'Lightweight, zero-maintenance lithium battery packs engineered as a drop-in replacement for forklift, marine, and industrial deep-cycle applications.',
            image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop',
            specs: ['Drop-in Fit', '3x Cycle Life', 'Zero Maintenance']
        }
    ];

    const verticalCards = [
        {
            title: 'Automotive',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
            icon: Car,
            desc: 'High-performance electric mobility battery packs engineered for automotive, marine, and aerospace transport.'
        },
        {
            title: 'Telecom Backup',
            image: 'https://images.unsplash.com/photo-1544669146-6c4d76717a6a?q=80&w=800&auto=format&fit=crop',
            icon: Radio,
            desc: 'Resilient energy storage backup systems optimized for critical cellular networks and fiber backbones.'
        },
        {
            title: 'Grid BESS',
            image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop',
            icon: Database,
            desc: 'Grid-scale, containerized Battery Energy Storage Systems designed for power stabilization and peak shaving.'
        },
        {
            title: 'Lead Replacement',
            image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
            icon: BatteryCharging,
            desc: 'Maintenance-free, high-density lithium replacement packs for heavy duty industrial deep-cycle systems.'
        },
        {
            title: 'Solar Products',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
            icon: Sun,
            desc: 'High-efficiency solar consumer products, advanced solar lanterns, and modular home microgrid systems.'
        },
        {
            title: 'EV Charging EPC',
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop',
            icon: Zap,
            desc: 'End-to-end turnkey EPC services for EV charging parks, smart grid connections, and modular fast-chargers.'
        },
        {
            title: 'Custom Packing',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
            icon: Sparkles,
            desc: 'Tailored lithium packs customized for extreme environments, aerospace telemetry, and specialized medical tools.'
        },
        {
            title: 'Aerospace Power',
            image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop',
            icon: Shield,
            desc: 'Ultra-reliability high-voltage battery modules designed and certified for defense and high-altitude systems.'
        }
    ];

    // Scroll listeners
    useEffect(() => {
        const handleScroll = () => {
            // Navbar scroll state
            setIsScrolled(window.scrollY > 20);

            // Verticals sticky horizontal scroll progress
            if (verticalsRef.current) {
                const rect = verticalsRef.current.getBoundingClientRect();
                const containerHeight = rect.height;
                const viewportHeight = window.innerHeight;
                const scrollTop = -rect.top;
                const scrollableHeight = containerHeight - viewportHeight;

                if (scrollableHeight > 0) {
                    let progress = scrollTop / scrollableHeight;
                    progress = Math.max(0, Math.min(1, progress));
                    setScrollProgress(progress);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        
        // Initial call
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Intersection observer for section fade-in animation
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.15 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const activeHero = heroContent[activeTab];

    const slideDuration = 6000; // 6 seconds
    const intervalTime = 50; // 50ms for buttery-smooth animations

    useEffect(() => {
        setProgress(0);
        
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, (elapsedTime / slideDuration) * 100);
            
            setProgress(currentProgress);

            if (elapsedTime >= slideDuration) {
                clearInterval(timer);
                setActiveTab((prev) => (prev + 1) % categories.length);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [activeTab]);

    const handleTabClick = (idx: number) => {
        setActiveTab(idx);
        setProgress(0);
    };

    return (
        <main className='min-h-screen w-full bg-[#f5f5f5] text-neutral-900 overflow-x-clip font-outfit antialiased'>
            {/* Inject Page Keyframes & Animation Utilities */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes contentSwap {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-content-swap {
                    animation: contentSwap 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0%;
                    height: 2px;
                    bottom: -4px;
                    left: 50%;
                    background-color: #E8610A;
                    transition: all 0.3s ease-in-out;
                    transform: translateX(-50%);
                }
                .nav-link:hover::after {
                    width: 70%;
                }
                .nav-link-active::after {
                    width: 70%;
                    background-color: #E8610A;
                }
            ` }} />

            {/* FLOATING NAVBAR (Constant padding to prevent jiggle) */}
            <div className='fixed top-4 md:top-6 inset-x-0 z-50 mx-auto max-w-5xl px-4 w-full select-none'>
                <header
                    className={`transition-all duration-300 w-full rounded-full border py-3 px-6 md:px-8 ${
                        isScrolled 
                            ? 'bg-white/95 backdrop-blur-md shadow-lg border-neutral-200/60' 
                            : 'bg-white/90 backdrop-blur-sm shadow-md border-neutral-200/30'
                    }`}
                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}
                >
                    <div className='flex items-center justify-between w-full'>
                        {/* Logo */}
                        <Link href='/' className='flex items-center gap-3 select-none group pointer-events-auto'>
                            <Image
                                src='/images/logon.png'
                                alt='Voltherm Logo'
                                width={28}
                                height={28}
                                className='object-contain transition-transform duration-500 group-hover:scale-105'
                                priority
                            />
                            <span className='font-extrabold text-lg tracking-tight text-neutral-900 font-outfit uppercase'>
                                VOLTHERM
                            </span>
                        </Link>

                        {/* Centered Desktop Menu */}
                        <nav className='hidden md:flex items-center space-x-8 font-outfit pointer-events-auto'>
                            <Link href='/' className='nav-link nav-link-active relative text-sm font-bold text-neutral-900 hover:text-[#E8610A] transition-colors'>
                                Home
                            </Link>
                            <Link href='/aboutus' className='nav-link relative text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors'>
                                About Us
                            </Link>
                            <Link href='/store' className='nav-link relative text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors'>
                                Store
                            </Link>
                        </nav>

                        {/* Desktop Contact CTA */}
                        <div className='hidden md:block pointer-events-auto'>
                            <Link
                                href='/contact'
                                className='group bg-[#111] hover:bg-[#E8610A] text-white text-xs font-bold px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-1.5'
                            >
                                Contact Us
                                <ArrowRight size={12} className='transition-transform duration-300 group-hover:translate-x-0.5' />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='md:hidden p-1.5 text-neutral-900 focus:outline-none pointer-events-auto'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label='Toggle menu'
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className='md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-neutral-100/80 px-6 py-5 flex flex-col space-y-4 rounded-3xl shadow-xl animate-fade-in-up font-outfit pointer-events-auto'>
                            <Link
                                href='/'
                                className='text-sm font-bold text-[#E8610A] py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href='/aboutus'
                                className='text-sm font-semibold text-neutral-600 hover:text-neutral-900 py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href='/store'
                                className='text-sm font-semibold text-neutral-600 hover:text-neutral-900 py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Store
                            </Link>
                            <Link
                                href='/contact'
                                className='bg-[#111] hover:bg-[#E8610A] text-white text-center text-sm font-bold py-2.5 rounded-full mt-1 transition-colors duration-300'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    )}
                </header>
            </div>

            {/* HERO SECTION */}
            <section className='pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
                <div 
                    className='relative bg-[#1a1a1a] rounded-[24px] md:rounded-[36px] overflow-hidden p-8 md:p-16 z-10 shadow-xl flex flex-col justify-between min-h-[500px] md:min-h-[75vh]'
                    style={{ animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                    {/* Glowing subtle gradient background */}
                    <div className='absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8610A]/5 blur-[120px] pointer-events-none'></div>

                    <div className='relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full flex-1 mb-8'>
                        {/* Left Column - Text Details */}
                        <div key={`hero-text-${activeTab}`} className='lg:col-span-6 flex flex-col space-y-6 animate-content-swap text-left'>
                            {/* Dynamic Sparkle badge */}
                            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A] w-fit shadow-inner backdrop-blur-md'>
                                <Sparkles className='h-3.5 w-3.5 animate-pulse' />
                                {activeHero.badge}
                            </div>

                            {/* Dynamic Bold Headline */}
                            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-outfit select-none'>
                                {activeHero.title.split(' ').slice(0, -2).join(' ')} <br />
                                <span className='text-[#E8610A] drop-shadow-sm'>
                                    {activeHero.title.split(' ').slice(-2).join(' ')}
                                </span>
                            </h1>

                            {/* Dynamic Description */}
                            <p className='text-neutral-300 text-sm md:text-base leading-relaxed font-normal font-outfit'>
                                {activeHero.desc}
                            </p>

                            {/* Dynamic Quick Spec list */}
                            <div className='flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-xs md:text-sm font-semibold text-neutral-400'>
                                {activeHero.specs.map((spec, sidx) => (
                                    <span key={sidx} className='flex items-center gap-1.5'>
                                        <CheckCircle2 className='text-[#E8610A] h-4 w-4' /> {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Hero CTAs */}
                            <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                                <a
                                    href='#technology'
                                    className='group flex items-center justify-center rounded-full bg-[#E8610A] hover:bg-[#d05608] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95'
                                >
                                    Explore Technology
                                    <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                                </a>
                                <a
                                    href='#products'
                                    className='group flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95'
                                >
                                    View Products
                                </a>
                            </div>
                        </div>

                        {/* Right Column - Product Image */}
                        <div key={`hero-bg-${activeTab}`} className='lg:col-span-6 relative h-[280px] sm:h-[350px] lg:h-[450px] w-full rounded-2xl overflow-hidden select-none animate-content-swap shadow-2xl border border-white/5 bg-neutral-900/40 p-4 flex items-center justify-center'>
                            <Image
                                src={activeHero.image}
                                alt={activeHero.title}
                                fill
                                className='object-cover rounded-xl opacity-90 transition-transform duration-1000'
                                priority
                                unoptimized
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none'></div>
                        </div>
                    </div>

                    {/* Bottom Category/Tab Bar */}
                    <div className='relative z-20 w-full border-t border-white/10 pt-6'>
                        {/* Tabs Row Container */}
                        <div className='relative w-full max-w-2xl grid grid-cols-4 select-none gap-4 md:gap-6'>
                            {categories.map((cat, idx) => (
                                <button
                                    key={cat}
                                    className='group flex flex-col text-left focus:outline-none cursor-pointer w-full'
                                    onClick={() => handleTabClick(idx)}
                                >
                                    <span className={`pb-3 text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 ${
                                        activeTab === idx ? 'text-white font-extrabold' : 'text-neutral-400 hover:text-white'
                                    }`}>
                                        {cat}
                                    </span>
                                    {/* Underline Progress Track */}
                                    <div className='relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden'>
                                        <div 
                                            className={`absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 ease-linear`}
                                            style={{ 
                                                width: activeTab === idx ? `${progress}%` : '0%',
                                                boxShadow: activeTab === idx ? '0 0 6px rgba(255, 255, 255, 0.8)' : 'none'
                                            }}
                                        ></div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR COMPANY INTRO SECTION (New) */}
            <section id='our-company' className='py-20 px-6 max-w-7xl mx-auto' style={{ animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-[32px] p-8 md:p-16 border border-neutral-200/60 shadow-lg relative overflow-hidden'>
                    <div className='absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#E8610A]/5 blur-[100px] pointer-events-none'></div>
                    
                    {/* Image Column */}
                    <div className='lg:col-span-6 relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-md border border-neutral-100/50 group'>
                        <Image
                            src='https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop'
                            alt='Our Company Sustainable Transition'
                            fill
                            className='object-cover opacity-95 transition-transform duration-700 group-hover:scale-105'
                            unoptimized
                        />
                        <div className='absolute inset-0 bg-gradient-to-tr from-[#E8610A]/5 to-transparent mix-blend-overlay'></div>
                    </div>

                    {/* Text Column */}
                    <div className='lg:col-span-6 flex flex-col space-y-6 text-left lg:pl-6'>
                        <div className='flex items-center gap-2 select-none'>
                            <span className='w-3 h-3 bg-[#E8610A] rounded-sm shadow-sm'></span>
                            <h2 className='text-sm font-extrabold uppercase tracking-widest text-[#E8610A] font-outfit'>
                                Our Company
                            </h2>
                        </div>

                        <p className='text-neutral-900 font-extrabold text-2xl md:text-3xl leading-tight font-outfit'>
                            At Voltherm, we're committed to driving a seamless transition to safe and clean energy.
                        </p>
                        
                        <p className='text-neutral-500 text-sm md:text-base leading-relaxed font-normal font-outfit'>
                            Our singular purpose is to empower a sustainable future, making us a go-to partner for advanced battery solutions. We design, engineer, and deploy high-density energy architectures for global markets.
                        </p>

                        <div className='pt-2'>
                            <Link
                                href='/aboutus'
                                className='group inline-flex items-center justify-center rounded-full bg-[#E8610A] hover:bg-[#d05608] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8610A]/20 transition-all duration-300 hover:scale-105 active:scale-95'
                            >
                                About Us
                                <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* VERTICALS SECTION (8-Card Sticky Horizontal Scroll with Premium Translate-Y Hover Effect) */}
            <section 
                id='verticals' 
                ref={verticalsRef}
                className='relative w-full bg-[#f5f5f5] pt-8 md:pt-16'
            >
                {/* Desktop view with sticky horizontal scroll (increased height to 400vh for a slower, smoother scroll experience across 8 cards) */}
                <div className='hidden md:block relative w-full h-0 md:h-[400vh] overflow-hidden md:overflow-visible'>
                    <div className='sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-12 lg:px-24'>
                        
                        {/* Section Header */}
                        <div className='w-full max-w-7xl mx-auto flex items-start justify-between mb-10 select-none'>
                            <div className='flex items-center gap-2'>
                                <span className='w-3 h-3 bg-[#E8610A] rounded-sm shadow-sm'></span>
                                <h2 className='text-sm font-extrabold uppercase tracking-widest text-[#E8610A] font-outfit'>
                                    Verticals
                                </h2>
                            </div>
                            <p className='text-neutral-500 font-medium text-right max-w-md text-sm font-outfit leading-relaxed'>
                                As a trusted partner for advanced battery solutions, we offer a comprehensive range of products and services.
                            </p>
                        </div>

                        {/* Scrolling Container */}
                        <div className='relative w-full max-w-7xl mx-auto'>
                            <div 
                                className='flex gap-6 w-[280%] transition-transform duration-300 ease-out py-4'
                                style={{ transform: `translateX(-${scrollProgress * 64.3}%)` }}
                            >
                                {verticalCards.map((card, idx) => {
                                    const IconComponent = card.icon;
                                    return (
                                        <div
                                            key={`desktop-card-${idx}`}
                                            className='group relative rounded-3xl overflow-hidden aspect-[3/4] h-[55vh] shadow-md border border-neutral-200/20 cursor-pointer bg-white transition-all duration-500 w-full'
                                        >
                                            {/* Full bleed image background */}
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                                                unoptimized
                                            />
                                            {/* Dark gradient vignette bottom overlay */}
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-0 z-10'></div>
                                            
                                            {/* Bottom Default Content Layer */}
                                            <div className='absolute inset-x-0 bottom-0 p-6 z-20 flex items-center gap-3 transition-all duration-300 ease-in-out group-hover:translate-y-12 group-hover:opacity-0'>
                                                <span className='rounded-full bg-[#E8610A] p-2.5 shadow-md shadow-[#E8610A]/20 text-white shrink-0'>
                                                    <IconComponent size={18} />
                                                </span>
                                                <h3 className='text-lg font-extrabold text-white tracking-tight font-outfit'>
                                                    {card.title}
                                                </h3>
                                            </div>

                                            {/* Slide-Up Dark Translucent Slip Cover (Lighter bg-black/45, slower duration-700, translate-y-full) */}
                                            <div className='absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col justify-end p-6 z-30 transition-transform duration-700 ease-in-out translate-y-full group-hover:translate-y-0'>
                                                <div className='flex items-center gap-3 mb-4'>
                                                    <span className='rounded-full bg-[#E8610A]/20 p-2.5 text-[#E8610A] border border-[#E8610A]/30 shrink-0'>
                                                        <IconComponent size={18} />
                                                    </span>
                                                    <h3 className='text-lg font-extrabold text-white tracking-tight font-outfit'>
                                                        {card.title}
                                                    </h3>
                                                </div>
                                                <p className='text-neutral-200 text-xs font-normal font-outfit leading-relaxed'>
                                                    {card.desc}
                                                </p>
                                                <div className='mt-5 flex items-center gap-2 text-[#E8610A] font-bold text-xs uppercase tracking-wider select-none'>
                                                    Explore Solutions <ArrowRight size={12} className='transition-transform duration-300 group-hover:translate-x-1' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet view - swipeable horizontal carousel */}
                <div className='block md:hidden px-6 pb-4 select-none'>
                    {/* Header */}
                    <div className='flex flex-col space-y-3 mb-8'>
                        <div className='flex items-center gap-2'>
                            <span className='w-2.5 h-2.5 bg-[#E8610A] rounded-sm'></span>
                            <h2 className='text-xs font-extrabold uppercase tracking-widest text-[#E8610A]'>
                                Verticals
                            </h2>
                        </div>
                        <p className='text-neutral-500 text-xs font-medium leading-relaxed'>
                            As a trusted partner for advanced battery solutions, we offer a comprehensive range of products and services.
                        </p>
                    </div>

                    {/* Carousel Row */}
                    <div className='flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6'>
                        {verticalCards.map((card, idx) => {
                            const IconComponent = card.icon;
                            return (
                                <div
                                    key={`mobile-card-${idx}`}
                                    className='group relative rounded-2xl overflow-hidden snap-center shrink-0 w-[75vw] h-[380px] shadow-md border border-neutral-100 bg-white'
                                >
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className='object-cover transition-transform duration-700 ease-out'
                                        unoptimized
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0'></div>
                                    
                                    {/* Default Mobile Info */}
                                    <div className='absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end transition-all duration-300 ease-in-out group-hover:translate-y-12 group-hover:opacity-0'>
                                        <div className='flex items-center gap-3'>
                                            <span className='rounded-full bg-[#E8610A] p-2 text-white shrink-0'>
                                                <IconComponent size={16} />
                                            </span>
                                            <h3 className='text-base font-extrabold text-white font-outfit'>
                                                {card.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Slide-Up Overlay Mobile Slip */}
                                    <div className='absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col justify-end p-5 z-30 transition-transform duration-700 ease-in-out translate-y-full group-hover:translate-y-0'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <span className='rounded-full bg-[#E8610A]/20 p-2 text-[#E8610A] shrink-0'>
                                                <IconComponent size={16} />
                                            </span>
                                            <h3 className='text-base font-extrabold text-white font-outfit'>
                                                {card.title}
                                            </h3>
                                        </div>
                                        <p className='text-neutral-200 text-[11px] font-outfit leading-relaxed'>
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* BENTO GRID (CORE ARCHITECTURE) SECTION */}
            <section 
                id='products' 
                className={`py-12 md:py-24 bg-[#f5f5f5] md:transition-all md:duration-1000 md:transform ${
                    visibleSections['products'] ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12'>
                    <div className='mb-16 text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Core Architecture
                        </div>
                        <h2 className='text-neutral-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight font-outfit'>
                            Integrated Energy Ecosystem
                        </h2>
                        <p className='text-neutral-500 text-base font-medium leading-relaxed'>
                            Modular solutions designed to work in perfect harmony. Every Voltherm platform is built from the ground up for massive scaling.
                        </p>
                    </div>
                    <BentoGridDemo />
                </div>
            </section>

            {/* STICKY SCROLL TECHNOLOGY SECTION */}
            <section 
                id='technology' 
                className={`py-12 md:py-24 bg-[#f5f5f5] border-t border-neutral-200/40 md:transition-all md:duration-1000 md:transform ${
                    visibleSections['technology'] ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12 mb-16'>
                    <div className='text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Innovation Hub
                        </div>
                        <h2 className='text-neutral-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight font-outfit'>
                            Pioneering Cell Technology
                        </h2>
                        <p className='text-neutral-500 text-base font-medium leading-relaxed'>
                            Discover the cutting-edge features that set Voltherm systems apart in performance, safety, and lifespan.
                        </p>
                    </div>
                </div>
                <StickyScrollRevealDemo />
            </section>

            {/* ANIMATED TESTIMONIALS SECTION */}
            <section 
                id='testimonials'
                className={`py-12 md:py-24 bg-[#f5f5f5] border-t border-neutral-200/40 md:transition-all md:duration-1000 md:transform ${
                    visibleSections['testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12'>
                    <div className='mb-12 text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Partnerships
                        </div>
                        <h2 className='mb-4 text-3xl font-extrabold text-neutral-900 md:text-5xl tracking-tight font-outfit'>
                            Trusted by Industry Leaders
                        </h2>
                        <p className='text-neutral-500 text-base font-medium leading-relaxed'>
                            See what our partners say about scaling their infrastructure with Voltherm.
                        </p>
                    </div>
                    <AnimatedTestimonialsDemo />
                </div>
            </section>

            {/* PRODUCT CAROUSEL SECTION */}
            <section 
                id='carousel' 
                className={`w-full bg-[#f5f5f5] border-t border-neutral-200/40 md:transition-all md:duration-1000 md:transform ${
                    visibleSections['carousel'] ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-12'
                }`}
            >
                <ProductCarouselDemo />
            </section>
        </main>
    );
};

export default HomePage;
