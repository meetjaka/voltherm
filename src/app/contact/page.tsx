'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import NavbarDemo from '@/components/demos/NavbarDemo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    requirements: ''
  });

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

  return (
    <main className='min-h-screen w-full bg-gradient-to-b from-white to-slate-50'>
      <NavbarDemo />

      {/* Hero Section with Contact Cards */}
      <section className='relative bg-slate-900 px-4 sm:px-6 pt-24 sm:pt-32 pb-48 sm:pb-56 text-white'>
        <div className='mx-auto max-w-7xl'>
          {/* Hero Text */}
          <div className='text-center mb-12 sm:mb-16'>
            <h1 className='mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
              Connect With Voltherm
            </h1>
            <p className='max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed'>
              We're ready to discuss your next energy storage solution, from initial inquiry to deployment.
            </p>
          </div>

          {/* Contact Cards - Overlapping the section */}
          <div className='absolute left-0 right-0 bottom-0 transform translate-y-1/2 px-4 sm:px-6'>
            <div className='mx-auto max-w-7xl'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
                {/* Sales & Products */}
                <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300'>
                  <div className='flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/10 mb-5 sm:mb-6'>
                    <Mail className='w-7 h-7 sm:w-8 sm:h-8 text-teal-600' />
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4'>Sales & Products</h3>
                  <a
                    href='mailto:Sales@VolthermTechnologies.com'
                    className='text-teal-600 hover:text-teal-700 font-medium break-all text-sm sm:text-base transition-colors'
                  >
                    Sales@VolthermTechnologies.com
                  </a>
                </div>

                {/* Business & Partners */}
                <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300'>
                  <div className='flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 mb-5 sm:mb-6'>
                    <Mail className='w-7 h-7 sm:w-8 sm:h-8 text-cyan-600' />
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4'>Business & Partners</h3>
                  <a
                    href='mailto:Info@VolthermTechnologies.com'
                    className='text-cyan-600 hover:text-cyan-700 font-medium break-all text-sm sm:text-base transition-colors'
                  >
                    Info@VolthermTechnologies.com
                  </a>
                </div>

                {/* Direct Contact */}
                <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300'>
                  <div className='flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-500/10 mb-5 sm:mb-6'>
                    <Phone className='w-7 h-7 sm:w-8 sm:h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4'>Direct Contact</h3>
                  <div className='space-y-2'>
                    <a
                      href='tel:+917485918169'
                      className='block text-slate-700 hover:text-teal-600 font-medium text-sm sm:text-base transition-colors'
                    >
                      +91-7485918169 (Sales)
                    </a>
                    <a
                      href='tel:+919998974127'
                      className='block text-slate-700 hover:text-teal-600 font-medium text-sm sm:text-base transition-colors'
                    >
                      +91-9998974127 (Support)
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
      <section className='px-4 sm:px-6 py-8 sm:py-12'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12'>
            {/* Left Column - Office Locations */}
            <div className='space-y-8'>
              <h2 className='text-2xl sm:text-3xl font-bold text-slate-900'>Our Locations</h2>

              {/* Main Office */}
              <div className='bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg'>
                <div className='p-4 sm:p-6 bg-slate-900'>
                  <h3 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
                    <MapPin className='w-5 h-5 sm:w-6 sm:h-6' />
                    Main Office
                  </h3>
                </div>
                <div className='p-4 sm:p-6'>
                  <div className='space-y-2 mb-4 text-sm sm:text-base'>
                    <p className='text-slate-700'>Plot No. B-5/2,</p>
                    <p className='text-slate-700'>Electronics Estate GIDC,</p>
                    <p className='text-slate-700'>Sector 25,</p>
                    <p className='text-slate-700'>Gandhinagar, GJ - 382024</p>
                    <p className='text-slate-900 font-semibold mt-3'>M: +91-7485918169</p>
                  </div>
                  <div className='relative h-48 sm:h-64 rounded-xl overflow-hidden border border-slate-200'>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.8583!2d72.628678!3d23.249254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzU3LjMiTiA3MsKwMzcnNDMuMiJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Branch Office */}
              <div className='bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg'>
                <div className='p-4 sm:p-6 bg-slate-900'>
                  <h3 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
                    <MapPin className='w-5 h-5 sm:w-6 sm:h-6' />
                    Branch Office
                  </h3>
                </div>
                <div className='p-4 sm:p-6'>
                  <div className='space-y-2 mb-4 text-sm sm:text-base'>
                    <p className='text-slate-700'>Plot No. 103,</p>
                    <p className='text-slate-700'>Ruda Transport Nagar,</p>
                    <p className='text-slate-700'>Nr. Sat Hanuman, Ahmedabad Highway,</p>
                    <p className='text-slate-700'>Navagam, Rajkot, GJ - 360001</p>
                    <p className='text-slate-900 font-semibold mt-3'>M: +91-9409421304</p>
                  </div>
                  <div className='relative h-48 sm:h-64 rounded-xl overflow-hidden border border-slate-200'>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14779.8583!2d70.851786!3d22.328773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE5JzQzLjYiTiA3MMKwNTEnMDYuNCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Inquiry Form */}
            <div className='lg:sticky lg:top-24 h-fit'>
              <div className='bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden'>
                <div className='p-4 sm:p-6 bg-slate-900'>
                  <h3 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
                    <Send className='w-5 h-5 sm:w-6 sm:h-6' />
                    Inquiry Form
                  </h3>
                  <p className='text-slate-300 text-sm mt-2'>Fill out the form and we'll get back to you soon</p>
                </div>

                <form onSubmit={handleSubmit} className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
                  {/* Email */}
                  <div>
                    <label htmlFor='email' className='block text-sm font-semibold text-slate-900 mb-2'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Your email'
                      className='w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400'
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor='name' className='block text-sm font-semibold text-slate-900 mb-2'>
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
                      className='w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400'
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor='phone' className='block text-sm font-semibold text-slate-900 mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='Your phone number'
                      className='w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400'
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label htmlFor='requirements' className='block text-sm font-semibold text-slate-900 mb-2'>
                      Requirements
                    </label>
                    <textarea
                      id='requirements'
                      name='requirements'
                      rows={5}
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder='Tell us about your requirements...'
                      className='w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400'
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    className='w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 sm:py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base sm:text-lg'
                  >
                    <Send className='w-5 h-5' />
                    Send Message
                  </button>

                  <p className='text-xs text-slate-500 text-center'>
                    <span className='text-red-500'>*</span> Indicates required question
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className='px-4 sm:px-6 py-8 sm:py-12 bg-slate-100'>
        <div className='mx-auto max-w-7xl'>
          <h2 className='text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-6 sm:mb-8'>Connect With Us</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6'>
            {/* Facebook */}
            <a
              href='https://www.facebook.com/Voltherm/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 hover:border-[#1877F2] hover:shadow-lg transition-all group flex flex-col items-center gap-3 sm:gap-4'
            >
              <div className='w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='w-full h-full text-slate-700 group-hover:text-[#1877F2] transition-colors'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
                </svg>
              </div>
              <span className='text-sm sm:text-base font-semibold text-slate-700 group-hover:text-[#1877F2] transition-colors text-center'>
                Facebook
              </span>
            </a>

            {/* Instagram */}
            <a
              href='https://www.instagram.com/volthermtech/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 hover:border-pink-500 hover:shadow-lg transition-all group flex flex-col items-center gap-3 sm:gap-4'
            >
              <div className='w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='w-full h-full text-slate-700 group-hover:text-pink-500 transition-colors'>
                  <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                  <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' strokeLinecap='round' />
                </svg>
              </div>
              <span className='text-sm sm:text-base font-semibold text-slate-700 group-hover:text-pink-500 transition-colors text-center'>
                Instagram
              </span>
            </a>

            {/* Twitter */}
            <a
              href='https://x.com/voltherm'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 hover:border-black hover:shadow-lg transition-all group flex flex-col items-center gap-3 sm:gap-4'
            >
              <div className='w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='w-full h-full text-slate-700 group-hover:text-black transition-colors'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </div>
              <span className='text-sm sm:text-base font-semibold text-slate-700 group-hover:text-black transition-colors text-center'>
                Twitter
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href='https://www.linkedin.com/company/volthermtechnologies/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 hover:border-[#0A66C2] hover:shadow-lg transition-all group flex flex-col items-center gap-3 sm:gap-4'
            >
              <div className='w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='w-full h-full text-slate-700 group-hover:text-[#0A66C2] transition-colors'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z' />
                  <circle cx='4' cy='4' r='2' />
                </svg>
              </div>
              <span className='text-sm sm:text-base font-semibold text-slate-700 group-hover:text-[#0A66C2] transition-colors text-center'>
                LinkedIn
              </span>
            </a>

            {/* Indiamart */}
            <a
              href='https://www.indiamart.com/voltherm-technologies/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 hover:border-orange-500 hover:shadow-lg transition-all group flex flex-col items-center gap-3 sm:gap-4'
            >
              <div className='w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center'>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoD3M7txqb9TdLTe_prXdviUPp6m4tEvmeA&s'
                  alt='IndiaMART'
                  width={80}
                  height={30}
                  className='object-contain grayscale group-hover:grayscale-0 transition-all'
                />
              </div>
              <span className='text-sm sm:text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-center'>
                IndiaMART
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='px-4 sm:px-6 py-12 sm:py-16 bg-slate-800'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>
            Ready to Power Your Future?
          </h2>
          <p className='text-base sm:text-lg text-white/90 mb-6 sm:mb-8'>
            Contact us today to discuss your energy storage requirements
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
            <a
              href='tel:+917485918169'
              className='px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 font-semibold rounded-lg hover:shadow-xl transition-all text-sm sm:text-base'
            >
              Call Now
            </a>
            <a
              href='mailto:Sales@VolthermTechnologies.com'
              className='px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white font-semibold rounded-lg hover:shadow-xl transition-all text-sm sm:text-base'
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
