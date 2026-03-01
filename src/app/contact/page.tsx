'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import NavbarDemo from '@/components/demos/NavbarDemo';
import { type ContactInfo, getContactInfo } from '@/lib/adminData';

import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        requirements: ''
    });
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        const loadContactInfo = () => {
            const data = getContactInfo();
            console.log('Contact Info Loaded:', data); // Debug log
            console.log('Branches:', data?.branches); // Debug log
            setContactInfo(data);
        };
        loadContactInfo();
        
        // Listen for storage changes (when admin updates contact info)
        const handleStorageChange = () => {
            loadContactInfo();
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!contactInfo) return null;

    return (
        <main className='min-h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden relative'>
            <NavbarDemo />

            {/* Hero Section - Light Mode with Futuristic Glows and Grid */}
            <section className='relative flex min-h-[50vh] flex-col items-center justify-center pt-32 pb-32 lg:pt-48 lg:pb-40'>
                {/* Background Effects */}
                <div className='absolute inset-0 z-0 overflow-hidden'>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none'>
                        <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-300/30 to-secondary/20 blur-[100px] rounded-full mix-blend-multiply'></div>
                    </div>
                    {/* Grid Pattern */}
                    <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-50 pointer-events-none'></div>
                </div>

                <div className='relative z-10 mx-auto max-w-7xl px-6 text-center'>
                    <h1 className='mb-6 text-5xl font-extrabold md:text-6xl lg:text-7xl tracking-tight text-slate-900'>
                        Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-secondary drop-shadow-sm">Voltherm</span>
                    </h1>
                    <p className='mx-auto max-w-3xl text-lg font-medium md:text-xl text-slate-600 leading-relaxed'>
                        We're ready to discuss your next energy storage solution, from initial inquiry to deployment.
                    </p>
                </div>
            </section>

            {/* Contact Cards - Floating Glass */}
            <section className='relative z-20 -mt-24 px-6 pb-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
                        {/* Sales & Products */}
                        <div className='group relative overflow-hidden rounded-3xl border border-white bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:border-primary/20'>
                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            <div className='relative z-10'>
                                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20'>
                                    <Mail className='h-8 w-8 text-primary' />
                                </div>
                                <h3 className='mb-3 text-2xl font-bold tracking-tight text-slate-900'>
                                    Sales & Products
                                </h3>
                                <a
                                    href={`mailto:${contactInfo.sales.email}`}
                                    className='text-base font-semibold text-slate-600 transition-colors hover:text-primary break-all'>
                                    {contactInfo.sales.email}
                                </a>
                            </div>
                        </div>

                        {/* Business & Partners */}
                        <div className='group relative overflow-hidden rounded-3xl border border-white bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:border-purple-500/20'>
                            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            <div className='relative z-10'>
                                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 transition-colors group-hover:bg-purple-500/20'>
                                    <Mail className='h-8 w-8 text-purple-600' />
                                </div>
                                <h3 className='mb-3 text-2xl font-bold tracking-tight text-slate-900'>
                                    Business & Partners
                                </h3>
                                <a
                                    href={`mailto:${contactInfo.business.email}`}
                                    className='text-base font-semibold text-slate-600 transition-colors hover:text-purple-600 break-all'>
                                    {contactInfo.business.email}
                                </a>
                            </div>
                        </div>

                        {/* Direct Contact */}
                        <div className='group relative overflow-hidden rounded-3xl border border-white bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl hover:border-secondary/20'>
                            <div className='absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            <div className='relative z-10'>
                                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 transition-colors group-hover:bg-secondary/20'>
                                    <Phone className='h-8 w-8 text-secondary' />
                                </div>
                                <h3 className='mb-3 text-2xl font-bold tracking-tight text-slate-900'>
                                    Direct Contact
                                </h3>
                                <div className='space-y-2'>
                                    <a
                                        href={`tel:${contactInfo.sales.phone}`}
                                        className='block text-base font-semibold text-slate-600 transition-colors hover:text-secondary'>
                                        {contactInfo.sales.phone} (Sales)
                                    </a>
                                    <a
                                        href={`tel:${contactInfo.support.phone}`}
                                        className='block text-base font-semibold text-slate-600 transition-colors hover:text-secondary'>
                                        {contactInfo.support.phone} (Support)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Locations & Contact Form */}
            <section className='relative z-20 px-6 py-12 md:py-20'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
                        {/* Left Column - Office Locations */}
                        <div className='space-y-8'>
                            <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl'>
                                Our Locations
                            </h2>

                            {/* Main Office */}
                            {contactInfo.mainAddress && (
                                <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl'>
                                    <div className='bg-slate-50 border-b border-slate-100 p-6'>
                                        <h3 className='flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900'>
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <MapPin className='h-6 w-6 text-primary' />
                                            </div>
                                            Main Office
                                        </h3>
                                    </div>
                                    <div className='p-6 md:p-8'>
                                        <div className='mb-6 space-y-3 text-base text-slate-600'>
                                            <p className='font-bold text-slate-900 text-lg'>
                                                {contactInfo.mainAddress.companyName}
                                            </p>
                                            <p>{contactInfo.mainAddress.addressLine1}</p>
                                            <p>{contactInfo.mainAddress.addressLine2}</p>
                                            <p>{contactInfo.mainAddress.city}, {contactInfo.mainAddress.state} - {contactInfo.mainAddress.pincode}</p>
                                            <p className='mt-4 font-bold text-slate-900'>
                                                {contactInfo.mainAddress.phone}
                                            </p>
                                            {contactInfo.mainAddress.gst && (
                                                <p className='text-sm mt-2'>GST: {contactInfo.mainAddress.gst}</p>
                                            )}
                                        </div>
                                        {contactInfo.mainAddress.mapUrl && (
                                            <div className='relative h-64 overflow-hidden rounded-2xl border border-slate-200'>
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

                            {/* Branch Offices - Dynamic */}
                            {contactInfo.branches && contactInfo.branches.map((branch) => (
                                <div key={branch.id} className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl'>
                                    <div className='bg-slate-50 border-b border-slate-100 p-6'>
                                        <h3 className='flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900'>
                                            <div className="p-2 bg-purple-500/10 rounded-xl">
                                                <MapPin className='h-6 w-6 text-purple-600' />
                                            </div>
                                            {branch.name}
                                        </h3>
                                    </div>
                                    <div className='p-6 md:p-8'>
                                        <div className='mb-6 space-y-3 text-base text-slate-600'>
                                            <p>{branch.addressLine1}</p>
                                            <p>{branch.addressLine2}</p>
                                            <p>{branch.city}, {branch.state} - {branch.pincode}</p>
                                            <p className='mt-4 font-bold text-slate-900'>{branch.phone}</p>
                                        </div>
                                        {branch.mapUrl && (
                                            <div className='relative h-64 overflow-hidden rounded-2xl border border-slate-200'>
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
                            <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50'>
                                <div className='bg-gradient-to-r from-primary to-purple-600 p-8 text-white relative overflow-hidden'>
                                    <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl'></div>
                                    <h3 className='flex items-center gap-3 text-3xl font-bold tracking-tight relative z-10'>
                                        <Send className='h-7 w-7' />
                                        Inquiry Form
                                    </h3>
                                    <p className='mt-3 text-white/80 font-medium relative z-10'>
                                        Fill out the form and our team will get back to you within 24 hours.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-6 p-8'>
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='mb-2 block text-sm font-bold text-slate-900 uppercase tracking-wide'>
                                            Email Address <span className='text-primary'>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            required
                                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                                            title='Please enter a valid email address'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='you@company.com'
                                            className='w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                                        />
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='mb-2 block text-sm font-bold text-slate-900 uppercase tracking-wide'>
                                            Full Name <span className='text-primary'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='John Doe'
                                            className='w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label
                                            htmlFor='phone'
                                            className='mb-2 block text-sm font-bold text-slate-900 uppercase tracking-wide'>
                                            Phone Number
                                        </label>
                                        <input
                                            type='tel'
                                            id='phone'
                                            name='phone'
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
                                            className='w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                                        />
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <label
                                            htmlFor='requirements'
                                            className='mb-2 block text-sm font-bold text-slate-900 uppercase tracking-wide'>
                                            Project Requirements
                                        </label>
                                        <textarea
                                            id='requirements'
                                            name='requirements'
                                            rows={5}
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            placeholder='Tell us about your technical specifications and scale...'
                                            className='w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type='submit'
                                        className='group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-4 text-lg font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'>
                                        <div className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]'>
                                            <div className='relative h-full w-8 bg-white/20' />
                                        </div>
                                        <Send className='h-5 w-5' />
                                        Send Message
                                    </button>

                                    <p className='text-center text-xs font-medium text-slate-500'>
                                        <span className='text-primary'>*</span> Indicates required field
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className='bg-white px-6 py-20 border-t border-slate-200'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl'>
                            Connect Across Channels
                        </h2>
                        <p className='mt-4 text-lg text-slate-600 font-medium'>Stay updated with our latest technologies and announcements.</p>
                    </div>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5'>
                        {/* Facebook */}
                        <a
                            href='https://www.facebook.com/Voltherm/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[#1877F2] hover:bg-white hover:shadow-xl hover:shadow-[#1877F2]/10 hover:-translate-y-1'>
                            <div className='flex h-16 w-16 items-center justify-center'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-400 transition-colors group-hover:text-[#1877F2]'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
                                    />
                                </svg>
                            </div>
                            <span className='text-center text-base font-bold text-slate-600 transition-colors group-hover:text-[#1877F2]'>
                                Facebook
                            </span>
                        </a>

                        {/* Instagram */}
                        <a
                            href='https://www.instagram.com/volthermtech/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-pink-500 hover:bg-white hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1'>
                            <div className='flex h-16 w-16 items-center justify-center'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-400 transition-colors group-hover:text-pink-500'>
                                    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                                    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' strokeLinecap='round' />
                                </svg>
                            </div>
                            <span className='text-center text-base font-bold text-slate-600 transition-colors group-hover:text-pink-500'>
                                Instagram
                            </span>
                        </a>

                        {/* Twitter */}
                        <a
                            href='https://x.com/voltherm'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-slate-900 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1'>
                            <div className='flex h-16 w-16 items-center justify-center'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-400 transition-colors group-hover:text-slate-900'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
                                    />
                                </svg>
                            </div>
                            <span className='text-center text-base font-bold text-slate-600 transition-colors group-hover:text-slate-900'>
                                Twitter
                            </span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href='https://www.linkedin.com/company/volthermtechnologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[#0A66C2] hover:bg-white hover:shadow-xl hover:shadow-[#0A66C2]/10 hover:-translate-y-1'>
                            <div className='flex h-16 w-16 items-center justify-center'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-400 transition-colors group-hover:text-[#0A66C2]'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z'
                                    />
                                    <circle cx='4' cy='4' r='2' />
                                </svg>
                            </div>
                            <span className='text-center text-base font-bold text-slate-600 transition-colors group-hover:text-[#0A66C2]'>
                                LinkedIn
                            </span>
                        </a>

                        {/* Indiamart */}
                        <a
                            href='https://www.indiamart.com/voltherm-technologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-orange-500 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1'>
                            <div className='flex h-16 w-16 items-center justify-center'>
                                <Image
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoD3M7txqb9TdLTe_prXdviUPp6m4tEvmeA&s'
                                    alt='IndiaMART'
                                    width={80}
                                    height={30}
                                    className='object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
                                    unoptimized
                                />
                            </div>
                            <span className='text-center text-base font-bold text-slate-600 transition-colors group-hover:text-amber-600'>
                                IndiaMART
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className='relative bg-slate-900 px-6 py-20 overflow-hidden'>
                <div className='absolute inset-0 z-0 pointer-events-none'>
                    <div className='absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[120px]'></div>
                    <div className='absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]'></div>
                </div>
                
                <div className='relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center'>
                    <h2 className='mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
                        Ready to Power Your Future?
                    </h2>
                    <p className='mb-10 text-lg font-medium text-slate-300 md:text-xl max-w-2xl'>
                        Contact us today to discuss your energy storage requirements and see how Voltherm can scale your infrastructure.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <a
                            href='tel:+917485918169'
                            className='rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 hover:shadow-xl'>
                            Call Now
                        </a>
                        <a
                            href='mailto:Volthermtechnologies@gmail.com'
                            className='rounded-full bg-slate-800 border border-slate-700 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-700 hover:scale-105 hover:shadow-xl'>
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
