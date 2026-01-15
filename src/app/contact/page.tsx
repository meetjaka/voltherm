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
        <main className='min-h-screen w-full bg-gradient-to-b from-white to-slate-50'>
            <NavbarDemo />

            {/* Hero Section with Contact Cards */}
            <section className='relative bg-slate-900 px-4 pt-24 pb-48 text-white sm:px-6 sm:pt-32 sm:pb-56'>
                <div className='mx-auto max-w-7xl'>
                    {/* Hero Text */}
                    <div className='mb-12 text-center sm:mb-16'>
                        <h1 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'>
                            Connect With Voltherm
                        </h1>
                        <p className='mx-auto max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl'>
                            We're ready to discuss your next energy storage solution, from initial inquiry to
                            deployment.
                        </p>
                    </div>

                    {/* Contact Cards - Overlapping the section */}
                    <div className='absolute right-0 bottom-0 left-0 translate-y-1/2 transform px-4 sm:px-6'>
                        <div className='mx-auto max-w-7xl'>
                            <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
                                {/* Sales & Products */}
                                <div className='rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:p-8'>
                                    <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 sm:mb-6 sm:h-16 sm:w-16'>
                                        <Mail className='h-7 w-7 text-teal-600 sm:h-8 sm:w-8' />
                                    </div>
                                    <h3 className='mb-3 text-xl font-bold text-slate-900 sm:mb-4 sm:text-2xl'>
                                        Sales & Products
                                    </h3>
                                    <a
                                        href={`mailto:${contactInfo.sales.email}`}
                                        className='text-sm font-medium break-all text-teal-600 transition-colors hover:text-teal-700 sm:text-base'>
                                        {contactInfo.sales.email}
                                    </a>
                                </div>

                                {/* Business & Partners */}
                                <div className='rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:p-8'>
                                    <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 sm:mb-6 sm:h-16 sm:w-16'>
                                        <Mail className='h-7 w-7 text-cyan-600 sm:h-8 sm:w-8' />
                                    </div>
                                    <h3 className='mb-3 text-xl font-bold text-slate-900 sm:mb-4 sm:text-2xl'>
                                        Business & Partners
                                    </h3>
                                    <a
                                        href={`mailto:${contactInfo.business.email}`}
                                        className='text-sm font-medium break-all text-cyan-600 transition-colors hover:text-cyan-700 sm:text-base'>
                                        {contactInfo.business.email}
                                    </a>
                                </div>

                                {/* Direct Contact */}
                                <div className='rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:p-8'>
                                    <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 sm:mb-6 sm:h-16 sm:w-16'>
                                        <Phone className='h-7 w-7 text-green-600 sm:h-8 sm:w-8' />
                                    </div>
                                    <h3 className='mb-3 text-xl font-bold text-slate-900 sm:mb-4 sm:text-2xl'>
                                        Direct Contact
                                    </h3>
                                    <div className='space-y-2'>
                                        <a
                                            href={`tel:${contactInfo.sales.phone}`}
                                            className='block text-sm font-medium text-slate-700 transition-colors hover:text-teal-600 sm:text-base'>
                                            {contactInfo.sales.phone} (Sales)
                                        </a>
                                        <a
                                            href={`tel:${contactInfo.support.phone}`}
                                            className='block text-sm font-medium text-slate-700 transition-colors hover:text-teal-600 sm:text-base'>
                                            {contactInfo.support.phone} (Support)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer for overlapping cards */}
            <div className='h-48 sm:h-56'></div>

            {/* Office Locations & Contact Form */}
            <section className='px-4 py-8 sm:px-6 sm:py-12'>
                <div className='mx-auto max-w-7xl'>
                    <div className='grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2'>
                        {/* Left Column - Office Locations */}
                        <div className='space-y-8'>
                            <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>Our Locations</h2>

                            {/* Main Office */}
                            {contactInfo.mainAddress && (
                                <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'>
                                    <div className='bg-slate-900 p-4 sm:p-6'>
                                        <h3 className='flex items-center gap-2 text-xl font-bold text-white sm:text-2xl'>
                                            <MapPin className='h-5 w-5 sm:h-6 sm:w-6' />
                                            Main Office
                                        </h3>
                                    </div>
                                    <div className='p-4 sm:p-6'>
                                        <div className='mb-4 space-y-2 text-sm sm:text-base'>
                                            <p className='font-semibold text-slate-900'>
                                                {contactInfo.mainAddress.companyName}
                                            </p>
                                            <p className='text-slate-700'>{contactInfo.mainAddress.addressLine1}</p>
                                            <p className='text-slate-700'>{contactInfo.mainAddress.addressLine2}</p>
                                            <p className='text-slate-700'>{contactInfo.mainAddress.city}, {contactInfo.mainAddress.state} - {contactInfo.mainAddress.pincode}</p>
                                            <p className='mt-3 font-semibold text-slate-900'>
                                                {contactInfo.mainAddress.phone}
                                            </p>
                                            {contactInfo.mainAddress.gst && (
                                                <p className='text-slate-700'>GST: {contactInfo.mainAddress.gst}</p>
                                            )}
                                        </div>
                                        {contactInfo.mainAddress.mapUrl && (
                                            <div className='relative h-48 overflow-hidden rounded-xl border border-slate-200 sm:h-64'>
                                                <iframe
                                                    src={contactInfo.mainAddress.mapUrl}
                                                    width='100%'
                                                    height='100%'
                                                    style={{ border: 0 }}
                                                    allowFullScreen
                                                    loading='lazy'
                                                    referrerPolicy='no-referrer-when-downgrade'></iframe>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Branch Offices - Dynamic */}
                            {contactInfo.branches && contactInfo.branches.map((branch) => (
                                <div key={branch.id} className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'>
                                    <div className='bg-slate-900 p-4 sm:p-6'>
                                        <h3 className='flex items-center gap-2 text-xl font-bold text-white sm:text-2xl'>
                                            <MapPin className='h-5 w-5 sm:h-6 sm:w-6' />
                                            {branch.name}
                                        </h3>
                                    </div>
                                    <div className='p-4 sm:p-6'>
                                        <div className='mb-4 space-y-2 text-sm sm:text-base'>
                                            <p className='text-slate-700'>{branch.addressLine1}</p>
                                            <p className='text-slate-700'>{branch.addressLine2}</p>
                                            <p className='text-slate-700'>{branch.city}, {branch.state} - {branch.pincode}</p>
                                            <p className='mt-3 font-semibold text-slate-900'>{branch.phone}</p>
                                        </div>
                                        {branch.mapUrl && (
                                            <div className='relative h-48 overflow-hidden rounded-xl border border-slate-200 sm:h-64'>
                                                <iframe
                                                    src={branch.mapUrl}
                                                    width='100%'
                                                    height='100%'
                                                    style={{ border: 0 }}
                                                    allowFullScreen
                                                    loading='lazy'
                                                    referrerPolicy='no-referrer-when-downgrade'></iframe>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column - Inquiry Form */}
                        <div className='h-fit lg:sticky lg:top-24'>
                            <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'>
                                <div className='bg-slate-900 p-4 sm:p-6'>
                                    <h3 className='flex items-center gap-2 text-xl font-bold text-white sm:text-2xl'>
                                        <Send className='h-5 w-5 sm:h-6 sm:w-6' />
                                        Inquiry Form
                                    </h3>
                                    <p className='mt-2 text-sm text-slate-300'>
                                        Fill out the form and we'll get back to you soon
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-4 p-4 sm:space-y-6 sm:p-6'>
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='mb-2 block text-sm font-semibold text-slate-900'>
                                            Email <span className='text-red-500'>*</span>
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
                                            placeholder='Your email'
                                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                        />
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='mb-2 block text-sm font-semibold text-slate-900'>
                                            Name <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Your name'
                                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label
                                            htmlFor='phone'
                                            className='mb-2 block text-sm font-semibold text-slate-900'>
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
                                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                        />
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <label
                                            htmlFor='requirements'
                                            className='mb-2 block text-sm font-semibold text-slate-900'>
                                            Requirements
                                        </label>
                                        <textarea
                                            id='requirements'
                                            name='requirements'
                                            rows={5}
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            placeholder='Tell us about your requirements...'
                                            className='w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type='submit'
                                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 py-3 text-base font-semibold text-white transition-all hover:bg-teal-600 hover:shadow-lg sm:py-4 sm:text-lg'>
                                        <Send className='h-5 w-5' />
                                        Send Message
                                    </button>

                                    <p className='text-center text-xs text-slate-500'>
                                        <span className='text-red-500'>*</span> Indicates required question
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className='bg-slate-100 px-4 py-8 sm:px-6 sm:py-12'>
                <div className='mx-auto max-w-7xl'>
                    <h2 className='mb-6 text-center text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl'>
                        Connect With Us
                    </h2>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5'>
                        {/* Facebook */}
                        <a
                            href='https://www.facebook.com/Voltherm/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-[#1877F2] hover:shadow-lg sm:gap-4 sm:p-6'>
                            <div className='flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-700 transition-colors group-hover:text-[#1877F2]'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
                                    />
                                </svg>
                            </div>
                            <span className='text-center text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#1877F2] sm:text-base'>
                                Facebook
                            </span>
                        </a>

                        {/* Instagram */}
                        <a
                            href='https://www.instagram.com/volthermtech/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-pink-500 hover:shadow-lg sm:gap-4 sm:p-6'>
                            <div className='flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-700 transition-colors group-hover:text-pink-500'>
                                    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                                    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' strokeLinecap='round' />
                                </svg>
                            </div>
                            <span className='text-center text-sm font-semibold text-slate-700 transition-colors group-hover:text-pink-500 sm:text-base'>
                                Instagram
                            </span>
                        </a>

                        {/* Twitter */}
                        <a
                            href='https://x.com/voltherm'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-black hover:shadow-lg sm:gap-4 sm:p-6'>
                            <div className='flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-700 transition-colors group-hover:text-black'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
                                    />
                                </svg>
                            </div>
                            <span className='text-center text-sm font-semibold text-slate-700 transition-colors group-hover:text-black sm:text-base'>
                                Twitter
                            </span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href='https://www.linkedin.com/company/volthermtechnologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-[#0A66C2] hover:shadow-lg sm:gap-4 sm:p-6'>
                            <div className='flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    className='h-full w-full text-slate-700 transition-colors group-hover:text-[#0A66C2]'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z'
                                    />
                                    <circle cx='4' cy='4' r='2' />
                                </svg>
                            </div>
                            <span className='text-center text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#0A66C2] sm:text-base'>
                                LinkedIn
                            </span>
                        </a>

                        {/* Indiamart */}
                        <a
                            href='https://www.indiamart.com/voltherm-technologies/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-orange-500 hover:shadow-lg sm:gap-4 sm:p-6'>
                            <div className='flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20'>
                                <Image
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoD3M7txqb9TdLTe_prXdviUPp6m4tEvmeA&s'
                                    alt='IndiaMART'
                                    width={80}
                                    height={30}
                                    className='object-contain grayscale transition-all group-hover:grayscale-0'
                                />
                            </div>
                            <span className='text-center text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900 sm:text-base'>
                                IndiaMART
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className='bg-slate-800 px-4 py-12 sm:px-6 sm:py-16'>
                <div className='mx-auto max-w-4xl text-center'>
                    <h2 className='mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
                        Ready to Power Your Future?
                    </h2>
                    <p className='mb-6 text-base text-white/90 sm:mb-8 sm:text-lg'>
                        Contact us today to discuss your energy storage requirements
                    </p>
                    <div className='flex flex-col justify-center gap-3 sm:flex-row sm:gap-4'>
                        <a
                            href='tel:+917485918169'
                            className='rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:shadow-xl sm:px-8 sm:py-4 sm:text-base'>
                            Call Now
                        </a>
                        <a
                            href='mailto:Volthermtechnologies@gmail.com'
                            className='rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-xl sm:px-8 sm:py-4 sm:text-base'>
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
