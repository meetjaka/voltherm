"use client";

import { X } from 'lucide-react';

export default function BackControls() {
  return (
    <div className='sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-slate-200'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-end'>
        <button
          onClick={() => window.history.back()}
          className='rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:border-teal-500 hover:text-teal-600 transition-colors'
          aria-label='Close'
        >
          <X className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
