'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { type Certificate } from '@/lib/adminData';
import hybridDataService from '@/lib/hybridDataService';

import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Menu,
    X,
    Shield,
    Heart,
    Zap,
    HelpCircle,
    Activity,
    Award,
    Battery,
    Sun,
    Lightbulb,
    Leaf
} from 'lucide-react';

export default function AboutPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const loadCertificates = async () => {
            try {
                console.log('🔄 [ABOUT US] Loading certificates from API...');
                const certs = await hybridDataService.getCertificates();
                console.log('✅ [ABOUT US] Loaded', certs.length, 'certificates');
                setCertificates(certs);
            } catch (error) {
                console.error('❌ [ABOUT US] Failed to load certificates:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadCertificates();
    }, []);

    // Scroll listener for navbar scroll state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for section fade-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

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
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

            {/* FLOATING NAVBAR */}
            <div className='fixed top-4 md:top-6 inset-x-0 z-50 mx-auto max-w-5xl px-4 w-full select-none'>
                <header
                    className={`transition-all duration-300 w-full rounded-full border py-3 px-6 md:px-8 ${
                        isScrolled 
                            ? 'bg-white/95 backdrop-blur-md shadow-lg border-neutral-200/60' 
                            : 'bg-white/90 backdrop-blur-sm shadow-md border-neutral-200/20'
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
                            <Link href='/' className='nav-link relative text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors'>
                                Home
                            </Link>
                            <Link href='/aboutus' className='nav-link nav-link-active relative text-sm font-bold text-neutral-900 hover:text-[#E8610A] transition-colors'>
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
                                className='text-sm font-semibold text-neutral-600 hover:text-neutral-900 py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href='/aboutus'
                                className='text-sm font-bold text-[#E8610A] py-1.5 border-b border-neutral-50'
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
            <section id='about-hero' className='pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto'>
                <div 
                    className='relative bg-[#1a1a1a] rounded-[24px] md:rounded-[36px] overflow-hidden p-8 md:p-16 z-10 shadow-xl flex flex-col justify-between min-h-[50vh]'
                    style={{ animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                    {/* Glowing subtle gradient background */}
                    <div className='absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8610A]/5 blur-[120px] pointer-events-none'></div>

                    <div className='relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full flex-1'>
                        {/* Left Column - Text Details */}
                        <div className='lg:col-span-7 flex flex-col space-y-6 text-left'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A] w-fit shadow-inner backdrop-blur-md'>
                                <Sparkles className='h-3.5 w-3.5 animate-pulse' />
                                ISO 9001:2015 Certified
                            </div>

                            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-outfit select-none'>
                                About <span className='text-[#E8610A] drop-shadow-sm'>Voltherm</span>
                            </h1>

                            <p className='text-neutral-300 text-sm md:text-base leading-relaxed font-normal font-outfit'>
                                Leading innovation in battery technology and renewable energy solutions for a sustainable future. Built for scale, engineered for safety.
                            </p>
                        </div>

                        {/* Right Column - Image Container */}
                        <div className='lg:col-span-5 relative h-[250px] sm:h-[300px] lg:h-[350px] w-full rounded-2xl overflow-hidden select-none shadow-2xl border border-white/5 bg-neutral-900/40 p-4 flex items-center justify-center animate-fade-in-up'>
                            <Image
                                src='https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
                                alt='Voltherm Technologies Collaboration'
                                fill
                                className='object-cover rounded-xl opacity-90 transition-transform duration-1000'
                                priority
                                unoptimized
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none'></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section id='about-stats' className='px-6 pb-20 max-w-7xl mx-auto'>
                <div className='grid gap-6 md:grid-cols-3'>
                    {[
                        { value: '500+', label: 'Projects Completed', icon: Zap },
                        { value: '98%', label: 'Client Satisfaction', icon: Heart },
                        { value: '24/7', label: 'Technical Support', icon: Shield }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className='group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#E8610A]/30 flex flex-col items-center text-center'
                            >
                                <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                                <div className='rounded-full bg-[#E8610A]/10 p-3 text-[#E8610A] mb-4 transition-transform duration-300 group-hover:scale-110'>
                                    <Icon size={20} />
                                </div>
                                <div className='text-neutral-900 mb-1 text-4xl font-extrabold tracking-tight font-outfit'>{stat.value}</div>
                                <div className='text-neutral-500 font-semibold uppercase tracking-wider text-xs font-outfit'>{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* WHO WE ARE SECTION */}
            <section 
                id='about-who' 
                className={`py-24 bg-[#f5f5f5] border-t border-neutral-200/40 transition-all duration-1000 transform ${
                    visibleSections['about-who'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12'>
                    <div className='grid items-center gap-16 lg:grid-cols-2'>
                        {/* 3D Image Card */}
                        <div className='relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-neutral-200 bg-white group'>
                            <Image
                                src='https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
                                alt='Voltherm Technologies'
                                fill
                                className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                                unoptimized
                            />
                            <div className='absolute inset-0 bg-gradient-to-tr from-[#E8610A]/10 to-transparent mix-blend-overlay'></div>
                        </div>

                        {/* Text details */}
                        <div className='flex flex-col space-y-6'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A] w-fit'>
                                <Activity size={12} />
                                Who We Are
                            </div>
                            <h2 className='text-neutral-900 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight font-outfit'>
                                Voltherm Innovation Private Limited
                            </h2>
                            <p className='text-neutral-600 font-medium text-base leading-relaxed'>
                                Voltherm Innovation Private Limited is an ISO 9001:2015 certified firm specialized in the development of Lithium Battery Packs and Solar Consumer Products.
                            </p>
                            <p className='text-neutral-600 font-medium text-base leading-relaxed'>
                                Our services include Energy Storage, Solar Consumer Products, Electric Vehicle Charging Stations EPC, and Solar & EV consultancy with the highest standard of technical support.
                            </p>

                            {/* Services List */}
                            <div className='grid gap-4 sm:grid-cols-2 pt-2'>
                                {[
                                    { icon: Battery, title: 'Energy Storage' },
                                    { icon: Sun, title: 'Solar Consumer Products' },
                                    { icon: Zap, title: 'EV Charging Stations' },
                                    { icon: Lightbulb, title: 'Solar & EV Consultancy' }
                                ].map((service, index) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={index}
                                            className='group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:shadow-md hover:border-[#E8610A]/30 hover:-translate-y-0.5'
                                        >
                                            <div className='flex items-center justify-center size-10 rounded-full bg-[#E8610A]/10 text-[#E8610A] group-hover:scale-105 transition-transform'>
                                                <Icon size={18} />
                                            </div>
                                            <span className='text-neutral-800 font-bold text-sm group-hover:text-[#E8610A] transition-colors font-outfit'>
                                                {service.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section 
                id='about-values' 
                className={`py-24 bg-[#f5f5f5] border-t border-neutral-200/40 transition-all duration-1000 transform ${
                    visibleSections['about-values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12'>
                    <div className='mb-16 text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Foundation
                        </div>
                        <h2 className='text-neutral-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight font-outfit'>
                            Our Core Values
                        </h2>
                        <p className='text-neutral-500 text-base font-medium leading-relaxed'>
                            What drives us to excellence in the modern energy landscape.
                        </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3'>
                        {[
                            {
                                title: 'Innovation',
                                desc: 'Pioneering cutting-edge solutions in renewable energy and battery architectures.',
                                icon: Sparkles
                            },
                            {
                                title: 'Quality',
                                desc: 'ISO certified strict processes ensuring the highest manufacturing standards.',
                                icon: Award
                            },
                            {
                                title: 'Sustainability',
                                desc: 'Committed to a greener, cleaner future through circular economy lifecycles.',
                                icon: Leaf
                            }
                        ].map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className='group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#E8610A]/30 text-center'
                                >
                                    <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                                    <div className='relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8610A]/10 text-[#E8610A] mb-6 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2'>
                                        <Icon size={28} />
                                    </div>
                                    <h3 className='relative z-10 text-neutral-900 mb-3 text-xl font-extrabold tracking-tight font-outfit'>{value.title}</h3>
                                    <p className='relative z-10 text-neutral-500 font-medium text-sm leading-relaxed font-outfit'>{value.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <section 
                id='about-certs' 
                className={`py-24 bg-[#f5f5f5] border-t border-neutral-200/40 transition-all duration-1000 transform ${
                    visibleSections['about-certs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6 md:px-12'>
                    <div className='mb-16 text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Standards
                        </div>
                        <h2 className='text-neutral-900 mb-4 text-3xl font-extrabold md:text-5xl tracking-tight font-outfit'>
                            Global Certifications
                        </h2>
                        <p className='text-neutral-500 text-base font-medium leading-relaxed'>
                            Our commitment to quality and excellence is continuously certified by international rigorous standards.
                        </p>
                    </div>

                    {loading ? (
                        <div className='text-center py-12 font-medium text-neutral-500'>Loading certifications...</div>
                    ) : (
                        <div className='grid gap-8 md:grid-cols-3'>
                            {certificates.map((cert) => (
                                <button
                                    key={cert.id}
                                    onClick={() => setSelectedCertificate(cert)}
                                    className='group border-neutral-200 overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#E8610A]/40 focus:outline-none focus:ring-2 focus:ring-[#E8610A]/20'
                                >
                                    <div className='relative mb-6 h-56 w-full overflow-hidden rounded-2xl bg-[#f5f5f5] border border-neutral-100'>
                                        <Image
                                            src={cert.src}
                                            alt={cert.alt}
                                            fill
                                            unoptimized
                                            className='object-contain p-6 transition-transform duration-75 group-hover:scale-[1.08]'
                                        />
                                    </div>
                                    <h3 className='text-neutral-950 group-hover:text-[#E8610A] text-center text-lg font-bold tracking-tight transition-colors font-outfit'>
                                        {cert.title}
                                    </h3>
                                    <p className='text-neutral-400 mt-2 text-center text-xs font-semibold opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>Click to view detail</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA SECTION */}
            <section 
                id='about-cta' 
                className={`py-24 bg-[#1a1a1a] relative overflow-hidden rounded-[32px] mx-4 md:mx-8 mb-16 shadow-xl z-10 transition-all duration-1000 transform ${
                    visibleSections['about-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                {/* Glowing decorations */}
                <div className='absolute top-0 right-0 -mt-24 -mr-24 h-80 w-80 rounded-full bg-[#E8610A]/20 blur-[80px]'></div>
                <div className='absolute bottom-0 left-0 -mb-24 -ml-24 h-80 w-80 rounded-full bg-[#E8610A]/10 blur-[80px]'></div>

                <div className='relative z-10 max-w-3xl mx-auto text-center px-6'>
                    <h2 className='text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 font-outfit'>
                        Ready to Partner With Us?
                    </h2>
                    <p className='text-neutral-300 text-base md:text-lg font-normal mb-8 font-outfit leading-relaxed'>
                        Discover how Voltherm Technologies can help transform your energy solutions. Let's build the future, together.
                    </p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        <Link 
                            href='/contact'
                            className='group flex items-center justify-center rounded-full bg-[#E8610A] hover:bg-[#d05608] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8610A]/20 transition-all duration-300 hover:scale-105 active:scale-95'
                        >
                            Contact Sales
                            <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                        </Link>
                        <a 
                            href='#about-who'
                            className='rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95'
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Certificate Modal Overlay */}
            {selectedCertificate && (
                <div
                    className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm duration-200'
                    onClick={() => setSelectedCertificate(null)}>
                    <div
                        className='animate-in zoom-in-95 relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col duration-300'
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCertificate(null)}
                            className='text-neutral-900 absolute -top-3 -right-3 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:scale-110 hover:bg-neutral-100'>
                            <X size={18} />
                        </button>

                        <div className='relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-white shadow-2xl'>
                            <Image
                                src={selectedCertificate.src}
                                alt={selectedCertificate.alt}
                                width={1200}
                                height={850}
                                unoptimized
                                className='h-full w-full object-contain p-6'
                                priority
                            />
                        </div>

                        <div className='mt-5 text-center'>
                            <div className='inline-block rounded-full bg-white/10 px-5 py-2 backdrop-blur-md border border-white/10'>
                                <h3 className='text-lg font-bold text-white tracking-wide font-outfit'>{selectedCertificate.title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
