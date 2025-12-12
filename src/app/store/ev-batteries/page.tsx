import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const products = [
  {
    slug: 'li-ion-2w',
    title: 'Lithium ion Battery Pack (2 Wheeler)',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png',
    specs: ['Lithium Ion', '2 Wheeler', 'High Density']
  },
  {
    slug: 'lifepo4-pack',
    title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
    specs: ['LiFePo4', 'Long Cycle Life', 'Thermal Stability']
  }
];

export default function EVBatteriesPage() {
  return (
    <main className='min-h-screen w-full bg-white'>
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        {/* Back button */}
        <div className='mb-8'>
          <Link
            href='/store'
            className='inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:border-teal-500 hover:text-teal-600 transition-colors'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </div>

        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900'>Electric Vehicles Batteries</h1>
          <p className='mt-4 text-slate-600 text-lg'>High-performance battery solutions for electric vehicles.</p>
        </div>

        {/* Products grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/store/${p.slug}`}
              className='group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-teal-500 transition-all'
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
