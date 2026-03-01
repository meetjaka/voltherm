import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const products = [
  {
    slug: 'solar-smart-bench',
    title: 'Solar Smart Bench',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    specs: ['Solar Powered', 'Public Installations', 'Smart Charging']
  }
];

export default function SolarBatteriesPage() {
  return (
    <main className='min-h-screen w-full bg-white'>
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        {/* Back button */}
        <div className='mb-8'>
          <Link
            href='/store'
            className='inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:border-primary hover:text-primary transition-colors'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </div>

        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900'>Solar Batteries</h1>
          <p className='mt-4 text-slate-600 text-lg'>Efficient energy storage systems for solar installations.</p>
        </div>

        {/* Products grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/store/${p.slug}`}
              className='group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-primary transition-all'
            >
              <div className='relative h-40 overflow-hidden bg-slate-100'>
                <Image src={p.image} alt={p.title} fill className='object-cover transition group-hover:scale-105' />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold text-slate-900 line-clamp-2'>{p.title}</h3>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {p.specs.map((s) => (
                    <span key={s} className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700'>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
