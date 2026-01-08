'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import NavbarDemo from '@/components/demos/NavbarDemo';
import { getMainCategories, type MainCategory } from '@/lib/adminData';

export default function ProductsPage() {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);

  useEffect(() => {
    setMainCategories(getMainCategories().filter(c => c.visible));
  }, []);

  return (
    <main className='min-h-screen w-full bg-slate-50'>
      <NavbarDemo />
      
      {/* Hero Section */}
      <section className='bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-white'>
        <div className='mx-auto max-w-7xl'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20 mb-6'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Home
          </Link>
          
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Our Product Applications
          </h1>
          <p className='text-xl text-slate-300 max-w-3xl'>
            Explore our battery solutions across different industries and applications. Choose a category to discover the perfect energy storage solution for your needs.
          </p>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {mainCategories.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <p className='text-slate-600 text-lg'>No product categories available at the moment.</p>
            </div>
          ) : (
            mainCategories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className='group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1'
                >
                  {/* Category Image */}
                  <div className='relative h-64 w-full overflow-hidden bg-slate-200'>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className='object-cover transition-transform group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
                  </div>

                  {/* Category Content */}
                  <div className='p-6'>
                    <h2 className='text-2xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors'>
                      {category.name}
                    </h2>
                    <p className='text-slate-600 mb-4'>{category.description}</p>
                    
                    <div className='flex items-center gap-2 text-teal-600 font-medium'>
                      View Products
                      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-teal-500 transition-colors' />
                </Link>
              ))
          )}
        </div>

        {/* Info Section */}
        <div className='mt-16 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white'>
          <h3 className='text-2xl font-bold mb-4'>Need Help Choosing?</h3>
          <p className='text-white/90 mb-6 max-w-3xl'>
            Our team of experts is ready to help you find the perfect battery solution for your specific application. Contact us for personalized recommendations and technical specifications.
          </p>
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors'
          >
            Contact Our Team
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </section>
    </main>
  );
}
