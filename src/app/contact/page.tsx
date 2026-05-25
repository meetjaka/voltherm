'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { type ContactInfo, defaultContactInfo } from '@/lib/adminData';
import { apiService } from '@/lib/apiService';
import { ModelMapper } from '@/lib/modelMapper';

import { toast } from 'sonner';
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles,
    Menu,
    X,
    ArrowRight,
    Activity,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        requirements: ''
    });
    const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const loadContactInfo = async () => {
            try {
                const response = await apiService.getContactInfo();
                if (response.success && response.data) {
                    setContactInfo(ModelMapper.backendToFrontendContactInfo(response.data));
                    return;
                }
            } catch {
                // API unreachable – fall through to defaults
            }
            setContactInfo(defaultContactInfo);
        };
        loadContactInfo();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await apiService.createInquiry({
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phone || '',
                requirements: formData.requirements,
                interestedProducts: [],
                cartItems: []
            });
            setSubmitSuccess(true);
            toast.success('Message sent successfully!');
            setFormData({ email: '', name: '', phone: '', requirements: '' });
            setTimeout(() => setSubmitSuccess(false), 4000);
        } catch (error) {
            console.error('Failed to send inquiry:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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

            {/* FLOATING NAVBAR (Constant padding to prevent jiggle) */}
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
                                className='group bg-[#E8610A] text-white text-xs font-bold px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-1.5'
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
                                className='bg-[#E8610A] text-white text-center text-sm font-bold py-2.5 rounded-full mt-1 transition-colors duration-300'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    )}
                </header>
            </div>

            {/* HERO SECTION */}
            <section id='contact-hero' className='pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto'>
                <div 
                    className='relative bg-[#1a1a1a] rounded-[24px] md:rounded-[36px] overflow-hidden p-8 md:p-16 z-10 shadow-xl flex flex-col justify-between min-h-[42vh]'
                    style={{ animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                    {/* Glowing subtle gradient background */}
                    <div className='absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8610A]/5 blur-[120px] pointer-events-none'></div>

                    <div className='relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full flex-1'>
                        {/* Left Column - Text Details */}
                        <div className='lg:col-span-7 flex flex-col space-y-6 text-left'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A] w-fit shadow-inner backdrop-blur-md'>
                                <Sparkles className='h-3.5 w-3.5 animate-pulse' />
                                Customer Solutions Hub
                            </div>

                            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-outfit select-none'>
                                Connect With <span className='text-[#E8610A] drop-shadow-sm'>Voltherm</span>
                            </h1>

                            <p className='text-neutral-300 text-sm md:text-base leading-relaxed font-normal font-outfit'>
                                We're ready to discuss your next energy storage solution, from initial inquiry to global deployment.
                            </p>
                        </div>

                        {/* Right Column - Image Container */}
                        <div className='lg:col-span-5 relative h-[250px] sm:h-[300px] lg:h-[350px] w-full rounded-2xl overflow-hidden select-none shadow-2xl border border-white/5 bg-neutral-900/40 p-4 flex items-center justify-center animate-fade-in-up'>
                            <Image
                                src='https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop'
                                alt='Connect With Voltherm Technologies'
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

            {/* DIRECT CONTACT CARDS */}
            <section id='contact-direct' className='px-6 pb-20 max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
                    {/* Sales & Products */}
                    <div className='group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#E8610A]/30 flex flex-col items-center text-center'>
                        <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        <div className='rounded-full bg-[#E8610A]/10 p-4 text-[#E8610A] mb-5 transition-transform duration-300 group-hover:scale-110'>
                            <Mail size={24} />
                        </div>
                        <h3 className='mb-2 text-xl font-extrabold tracking-tight text-neutral-900 font-outfit'>
                            Sales & Products
                        </h3>
                        <a
                            href={`mailto:${contactInfo.sales.email}`}
                            className='text-sm font-semibold text-neutral-500 transition-colors hover:text-[#E8610A] break-all font-outfit'
                        >
                            {contactInfo.sales.email}
                        </a>
                    </div>

                    {/* Business & Partners */}
                    <div className='group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#E8610A]/30 flex flex-col items-center text-center'>
                        <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        <div className='rounded-full bg-[#E8610A]/10 p-4 text-[#E8610A] mb-5 transition-transform duration-300 group-hover:scale-110'>
                            <Mail size={24} />
                        </div>
                        <h3 className='mb-2 text-xl font-extrabold tracking-tight text-neutral-900 font-outfit'>
                            Business & Partners
                        </h3>
                        <a
                            href={`mailto:${contactInfo.business.email}`}
                            className='text-sm font-semibold text-neutral-500 transition-colors hover:text-[#E8610A] break-all font-outfit'
                        >
                            {contactInfo.business.email}
                        </a>
                    </div>

                    {/* Direct Contact */}
                    <div className='group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#E8610A]/30 flex flex-col items-center text-center'>
                        <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        <div className='rounded-full bg-[#E8610A]/10 p-4 text-[#E8610A] mb-5 transition-transform duration-300 group-hover:scale-110'>
                            <Phone size={24} />
                        </div>
                        <h3 className='mb-2 text-xl font-extrabold tracking-tight text-neutral-900 font-outfit'>
                            Direct Contact
                        </h3>
                        <div className='space-y-1 text-center font-outfit'>
                            <a
                                href={`tel:${contactInfo.sales.phone}`}
                                className='block text-sm font-semibold text-neutral-500 transition-colors hover:text-[#E8610A]'
                            >
                                {contactInfo.sales.phone} (Sales)
                            </a>
                            <a
                                href={`tel:${contactInfo.support.phone}`}
                                className='block text-sm font-semibold text-neutral-500 transition-colors hover:text-[#E8610A]'
                            >
                                {contactInfo.support.phone} (Support)
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM AND MAPS SECTION */}
            <section 
                id='contact-form-section' 
                className={`py-12 px-6 max-w-7xl mx-auto transition-all duration-1000 transform ${
                    visibleSections['contact-form-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
                    {/* Left Column - Office Locations */}
                    <div className='space-y-8'>
                        <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl font-outfit'>
                            Our Locations
                        </h2>

                        {/* Main Office */}
                        {contactInfo.mainAddress && (
                            <div className='overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg transition-all hover:shadow-xl hover:border-neutral-300/60'>
                                <div className='bg-neutral-50/80 border-b border-neutral-100 p-6'>
                                    <h3 className='flex items-center gap-3 text-xl font-extrabold tracking-tight text-neutral-900 font-outfit'>
                                        <div className="p-2 bg-[#E8610A]/10 rounded-xl text-[#E8610A]">
                                            <MapPin size={20} />
                                        </div>
                                        Main Office
                                    </h3>
                                </div>
                                <div className='p-6 md:p-8 font-outfit'>
                                    <div className='mb-6 space-y-2 text-sm text-neutral-500 font-medium'>
                                        <p className='font-extrabold text-neutral-900 text-base'>
                                            {contactInfo.mainAddress.companyName}
                                        </p>
                                        <p>{contactInfo.mainAddress.addressLine1}</p>
                                        <p>{contactInfo.mainAddress.addressLine2}</p>
                                        <p>{contactInfo.mainAddress.city}, {contactInfo.mainAddress.state} - {contactInfo.mainAddress.pincode}</p>
                                        <p className='mt-3 font-extrabold text-neutral-900'>{contactInfo.mainAddress.phoneNumber}</p>
                                        {contactInfo.mainAddress.gst && (
                                            <p className='text-xs mt-2 border border-neutral-200 w-fit px-2 py-1 rounded bg-[#f5f5f5]'>GST: {contactInfo.mainAddress.gst}</p>
                                        )}
                                    </div>
                                    {contactInfo.mainAddress.mapUrl && (
                                        <div className='relative h-60 overflow-hidden rounded-2xl border border-neutral-200'>
                                            <iframe
                                                src={contactInfo.mainAddress.mapUrl}
                                                width='100%'
                                                height='100%'
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading='lazy'
                                                referrerPolicy='no-referrer-when-downgrade'
                                                className="filter contrast-[0.9] hover:contrast-100 transition-all duration-500"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Branch Offices */}
                        {contactInfo.branches && contactInfo.branches.map((branch) => (
                            <div key={branch.id} className='overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg transition-all hover:shadow-xl hover:border-neutral-300/60'>
                                <div className='bg-neutral-50/80 border-b border-neutral-100 p-6'>
                                    <h3 className='flex items-center gap-3 text-xl font-extrabold tracking-tight text-neutral-900 font-outfit'>
                                        <div className="p-2 bg-[#E8610A]/10 rounded-xl text-[#E8610A]">
                                            <MapPin size={20} />
                                        </div>
                                        {branch.name}
                                    </h3>
                                </div>
                                <div className='p-6 md:p-8 font-outfit'>
                                    <div className='mb-6 space-y-2 text-sm text-neutral-500 font-medium'>
                                        <p>{branch.addressLine1}</p>
                                        <p>{branch.addressLine2}</p>
                                        <p>{branch.city}, {branch.state} - {branch.pincode}</p>
                                        <p className='mt-3 font-extrabold text-neutral-900'>{branch.phone}</p>
                                    </div>
                                    {branch.mapUrl && (
                                        <div className='relative h-60 overflow-hidden rounded-2xl border border-neutral-200'>
                                            <iframe
                                                src={branch.mapUrl}
                                                width='100%'
                                                height='100%'
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading='lazy'
                                                referrerPolicy='no-referrer-when-downgrade'
                                                className="filter contrast-[0.9] hover:contrast-100 transition-all duration-500"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Inquiry Form */}
                    <div className='h-fit lg:sticky lg:top-32'>
                        <div className='overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl'>
                            <div className='bg-[#1a1a1a] p-8 text-white relative overflow-hidden'>
                                <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8610A]/10 blur-2xl'></div>
                                <h3 className='flex items-center gap-3 text-2xl font-extrabold tracking-tight relative z-10 font-outfit'>
                                    <Send className='h-6 w-6 text-[#E8610A]' />
                                    Inquiry Form
                                </h3>
                                <p className='mt-2 text-neutral-400 font-medium text-sm relative z-10'>
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-5 p-8 font-outfit'>
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='mb-2 block text-xs font-bold text-neutral-900 uppercase tracking-wider'
                                    >
                                        Email Address <span className='text-[#E8610A]'>*</span>
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        required
                                        pattern='[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                                        title='Please enter a valid email address'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='you@company.com'
                                        className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3.5 text-sm text-neutral-900 transition-all outline-none placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:ring-4 focus:ring-[#E8610A]/5'
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor='name'
                                        className='mb-2 block text-xs font-bold text-neutral-900 uppercase tracking-wider'
                                    >
                                        Full Name <span className='text-[#E8610A]'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='John Doe'
                                        className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3.5 text-sm text-neutral-900 transition-all outline-none placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:ring-4 focus:ring-[#E8610A]/5'
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label
                                        htmlFor='phone'
                                        className='mb-2 block text-xs font-bold text-neutral-900 uppercase tracking-wider'
                                    >
                                        Phone Number <span className='text-[#E8610A]'>*</span>
                                    </label>
                                    <input
                                        type='tel'
                                        id='phone'
                                        name='phone'
                                        required
                                        pattern='[0-9]{10}'
                                        minLength={10}
                                        maxLength={10}
                                        title='Please enter a valid 10-digit mobile number'
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 10) {
                                                setFormData({ ...formData, phone: value });
                                            }
                                        }}
                                        placeholder='9876543210'
                                        className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3.5 text-sm text-neutral-900 transition-all outline-none placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:ring-4 focus:ring-[#E8610A]/5'
                                    />
                                </div>

                                {/* Requirements */}
                                <div>
                                    <label
                                        htmlFor='requirements'
                                        className='mb-2 block text-xs font-bold text-neutral-900 uppercase tracking-wider'
                                    >
                                        Project Requirements <span className='text-[#E8610A]'>*</span>
                                    </label>
                                    <textarea
                                        id='requirements'
                                        name='requirements'
                                        required
                                        rows={4}
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        placeholder='Tell us about your technical specifications and scale...'
                                        className='w-full resize-none rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3.5 text-sm text-neutral-900 transition-all outline-none placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:ring-4 focus:ring-[#E8610A]/5'
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    disabled={submitting || submitSuccess}
                                    className='group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#E8610A] hover:bg-[#d05608] py-3.5 text-base font-bold text-white transition-all shadow-md hover:shadow-lg hover:shadow-[#E8610A]/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer'
                                >
                                    {submitting ? (
                                        <>
                                            <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : submitSuccess ? (
                                        <>
                                            <CheckCircle2 size={16} />
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                <p className='text-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>
                                    <span className='text-[#E8610A]'>*</span> Indicates required field
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOCIAL MEDIA SECTION */}
            <section 
                id='contact-socials' 
                className={`py-24 bg-[#f5f5f5] border-t border-neutral-200/40 transition-all duration-1000 transform ${
                    visibleSections['contact-socials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='mx-auto max-w-7xl px-6'>
                    <div className='mb-12 text-center max-w-2xl mx-auto'>
                        <div className="inline-block mb-4 rounded-full border border-[#E8610A]/20 bg-[#E8610A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A]">
                            Social Channels
                        </div>
                        <h2 className='text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl font-outfit'>
                            Connect Across Channels
                        </h2>
                        <p className='mt-3 text-neutral-500 font-medium text-base leading-relaxed'>
                            Stay updated with our latest technologies and announcements.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5'>
                        {/* Facebook */}
                        <a
                            href='https://www.facebook.com/Voltherm/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-[#1877F2] hover:shadow-xl hover:-translate-y-1'
                        >
                            <div className='rounded-full bg-neutral-50 p-4 transition-transform duration-300 group-hover:scale-110 text-neutral-400 group-hover:text-[#1877F2]'>
                                <Facebook size={24} />
                            </div>
                            <span className='text-center text-sm font-bold text-neutral-600 transition-colors group-hover:text-[#1877F2] font-outfit'>
                                Facebook
                            </span>
                        </a>

                        {/* Instagram */}
                        <a
                            href='https://www.instagram.com/volthermtech/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-pink-500 hover:shadow-xl hover:-translate-y-1'
                        >
                            <div className='rounded-full bg-neutral-50 p-4 transition-transform duration-300 group-hover:scale-110 text-neutral-400 group-hover:text-pink-500'>
                                <Instagram size={24} />
                            </div>
                            <span className='text-center text-sm font-bold text-neutral-600 transition-colors group-hover:text-pink-500 font-outfit'>
                                Instagram
                            </span>
                        </a>

                        {/* Twitter */}
                        <a
                            href='https://x.com/voltherm'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-xl hover:-translate-y-1'
                        >
                            <div className='rounded-full bg-neutral-50 p-4 transition-transform duration-300 group-hover:scale-110 text-neutral-400 group-hover:text-neutral-900'>
                                <Twitter size={24} />
                            </div>
                            <span className='text-center text-sm font-bold text-neutral-600 transition-colors group-hover:text-neutral-900 font-outfit'>
                                Twitter
                            </span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href='https://www.linkedin.com/company/volthermtechnologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-[#0A66C2] hover:shadow-xl hover:-translate-y-1'
                        >
                            <div className='rounded-full bg-neutral-50 p-4 transition-transform duration-300 group-hover:scale-110 text-neutral-400 group-hover:text-[#0A66C2]'>
                                <Linkedin size={24} />
                            </div>
                            <span className='text-center text-sm font-bold text-neutral-600 transition-colors group-hover:text-[#0A66C2] font-outfit'>
                                LinkedIn
                            </span>
                        </a>

                        {/* Indiamart */}
                        <a
                            href='https://www.indiamart.com/voltherm-technologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-orange-500 hover:shadow-xl hover:-translate-y-1'
                        >
                            <div className='flex h-14 items-center justify-center shrink-0'>
                                <Image
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoD3M7txqb9TdLTe_prXdviUPp6m4tEvmeA&s'
                                    alt='IndiaMART'
                                    width={64}
                                    height={24}
                                    className='object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
                                    unoptimized
                                />
                            </div>
                            <span className='text-center text-sm font-bold text-neutral-600 transition-colors group-hover:text-amber-600 font-outfit'>
                                IndiaMART
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section 
                id='contact-cta' 
                className={`py-20 bg-[#1a1a1a] relative overflow-hidden rounded-[32px] mx-4 md:mx-8 mb-16 shadow-xl z-10 transition-all duration-1000 transform ${
                    visibleSections['contact-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
                <div className='absolute inset-0 z-0 pointer-events-none'>
                    <div className='absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#E8610A]/10 blur-[120px]'></div>
                    <div className='absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#E8610A]/20 blur-[120px]'></div>
                </div>
                
                <div className='relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center px-6 font-outfit'>
                    <h2 className='mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl'>
                        Ready to Power Your Future?
                    </h2>
                    <p className='mb-8 text-neutral-300 text-base md:text-lg max-w-2xl leading-relaxed'>
                        Contact us today to discuss your energy storage requirements and see how Voltherm can scale your infrastructure.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row w-full sm:w-auto'>
                        <a
                            href='tel:+917485918169'
                            className='rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-neutral-100 hover:scale-105 hover:shadow-xl text-center'
                        >
                            Call Now
                        </a>
                        <a
                            href='mailto:Volthermtechnologies@gmail.com'
                            className='rounded-full bg-transparent border border-white/20 hover:bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-xl text-center'
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
