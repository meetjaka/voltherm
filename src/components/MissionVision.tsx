'use client';

import React from 'react';

const MissionVision = () => {
    return (
        <section className='relative overflow-hidden bg-white py-24'>
            {/* Subtle grid pattern background */}
            <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'></div>

            <div className='relative mx-auto max-w-7xl px-6'>
                <div className='grid items-start gap-16 lg:grid-cols-2'>
                    {/* Mission Card */}
                    <div className='group relative'>
                        <div className='absolute -inset-px rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 blur transition duration-500 group-hover:opacity-100'></div>
                        <div className='relative rounded-2xl border border-slate-200 bg-white p-10 transition-shadow duration-300 hover:shadow-xl'>
                            <div className='mb-8 flex items-start justify-between'>
                                <h3 className='text-3xl font-bold text-slate-900'>Mission</h3>
                                <div className='flex size-14 items-center justify-center rounded-xl bg-teal-500/10'>
                                    <svg
                                        className='size-7 text-teal-600'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M13 10V3L4 14h7v7l9-11h-7z'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-lg leading-relaxed text-slate-600'>
                                We look to convey state-of-the-art technology to our clients so that the dream of a{' '}
                                <strong className='text-slate-900'>"new India"</strong> is realized. Our core values
                                revolve around <strong className='text-slate-900'>innovation</strong>, with transparency
                                being invariable; this is our way of functioning in the business ecosystem and
                                recognizing the talents of the individuals we work with and the reliance of the people
                                who believe us with their homes.
                            </p>
                            <div className='mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500'></div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className='group relative'>
                        <div className='absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 blur transition duration-500 group-hover:opacity-100'></div>
                        <div className='relative rounded-2xl border border-slate-200 bg-white p-10 transition-shadow duration-300 hover:shadow-xl'>
                            <div className='mb-8 flex items-start justify-between'>
                                <h3 className='text-3xl font-bold text-slate-900'>Vision</h3>
                                <div className='flex size-14 items-center justify-center rounded-xl bg-cyan-500/10'>
                                    <svg
                                        className='size-7 text-cyan-600'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-lg leading-relaxed text-slate-600'>
                                Provide a superior,{' '}
                                <strong className='text-slate-900'>cleaner and greener future</strong> for India.
                                Revolutionize our nation as a trusted sustainability partner and stay forward in a
                                changing environment by being{' '}
                                <strong className='text-slate-900'>
                                    innovative, entrepreneurial, open, zealous and smart
                                </strong>
                                .
                            </p>
                            <div className='mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
