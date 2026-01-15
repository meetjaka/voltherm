'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { type ContactInfo, getContactInfo } from '@/lib/adminData';

const Footer = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        setContactInfo(getContactInfo());
    }, []);

    const socialMedia = contactInfo?.socialMedia;

    return (
        <footer className='border-t border-slate-200 bg-slate-50 pt-20 pb-10'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <div className='mb-6 flex items-center'>
                            <div className='mr-2 flex h-8 w-8 items-center justify-center rounded bg-slate-900 font-bold text-white'>
                                V
                            </div>
                            <span className='text-xl font-bold text-slate-900'>VOLTHERM</span>
                        </div>
                        <p className='mb-6 text-slate-500'>
                            Pioneering the future of energy storage with advanced thermal management and cell chemistry.
                        </p>
                    </div>

                    <div>
                        <h4 className='mb-6 font-bold text-slate-900'>Products</h4>
                        <ul className='space-y-4 text-slate-500'>
                            <li>
                                <a href='/products/automobile' className='transition-colors hover:text-teal-500'>
                                    Automobile
                                </a>
                            </li>
                            <li>
                                <a href='/products/aerospace' className='transition-colors hover:text-teal-500'>
                                    Aerospace
                                </a>
                            </li>
                            <li>
                                <a href='/products/bess' className='transition-colors hover:text-teal-500'>
                                    BESS
                                </a>
                            </li>
                            <li>
                                <a href='/products/telecom' className='transition-colors hover:text-teal-500'>
                                    Telecom
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='mb-6 font-bold text-slate-900'>Company</h4>
                        <ul className='space-y-4 text-slate-500'>
                            <li>
                                <a href='/about' className='transition-colors hover:text-teal-500'>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href='/contact' className='transition-colors hover:text-teal-500'>
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href='/store' className='transition-colors hover:text-teal-500'>
                                    Store
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
                    <p>&copy; 2025 Voltherm Innovation Private Limited. All rights reserved.</p>
                    <div className='mt-6 flex flex-col items-center gap-6 md:mt-0 md:flex-row md:gap-8'>
                        <div className='flex items-center gap-4'>
                            {socialMedia?.facebook && (
                                <a
                                    href={socialMedia.facebook}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Facebook
                                        size={18}
                                        className='text-slate-600 transition-colors group-hover:text-white'
                                    />
                                </a>
                            )}
                            {socialMedia?.instagram && (
                                <a
                                    href={socialMedia.instagram}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Instagram
                                        size={18}
                                        className='text-slate-600 transition-colors group-hover:text-white'
                                    />
                                </a>
                            )}
                            {socialMedia?.twitter && (
                                <a
                                    href={socialMedia.twitter}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Twitter
                                        size={18}
                                        className='text-slate-600 transition-colors group-hover:text-white'
                                    />
                                </a>
                            )}
                            {socialMedia?.linkedin && (
                                <a
                                    href={socialMedia.linkedin}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='group rounded-full bg-slate-100 p-2.5 transition-all hover:bg-teal-500'>
                                    <Linkedin
                                        size={18}
                                        className='text-slate-600 transition-colors group-hover:text-white'
                                    />
                                </a>
                            )}
                            <a
                                href={socialMedia?.indiamart || 'https://www.indiamart.com/voltherm-technologies/'}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition-opacity hover:opacity-80'>
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
    );
};

export default Footer;
