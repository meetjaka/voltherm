import Image from 'next/image';
import Link from 'next/link';

const productMap: Record<string, {
  title: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}> = {
  'li-ion-2w': {
    title: 'Lithium ion Battery Pack (2 Wheeler)',
    description:
      'High-performance lithium-ion battery solution designed for two-wheeler EVs. Optimized for energy density, safety, and reliability.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png',
    specs: [
      { label: 'Chemistry', value: 'Lithium Ion' },
      { label: 'Nominal Voltage', value: '48V' },
      { label: 'Capacity', value: '35Ah' },
      { label: 'Charge Rate', value: 'Fast Charge Supported' }
    ]
  },
  'lifepo4-pack': {
    title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
    description:
      'LiFePo4 pack offering excellent thermal stability, long cycle life, and consistent performance across conditions.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop',
    specs: [
      { label: 'Chemistry', value: 'LiFePo4' },
      { label: 'Nominal Voltage', value: '51.2V' },
      { label: 'Capacity', value: '100Ah' },
      { label: 'Cycles', value: '6000+' }
    ]
  },
  'solar-smart-bench': {
    title: 'Solar Smart Bench',
    description:
      'Solar-powered intelligent bench with integrated storage and charging, ideal for public installations.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
    specs: [
      { label: 'Power', value: '300W Solar' },
      { label: 'Storage', value: '2kWh' },
      { label: 'Charging', value: 'USB-C, Wireless' }
    ]
  },
  'drone-pack': {
    title: 'Drone Battery Pack',
    description:
      'Lightweight, high power battery pack for UAV applications with fast charging capability.',
    image: 'https://5.imimg.com/data5/ANDROID/Default/2025/9/546735543/OQ/MC/GY/100678072/product-jpeg.jpg',
    specs: [
      { label: 'Chemistry', value: 'LiPo' },
      { label: 'Capacity', value: '25000mAh' },
      { label: 'Weight', value: 'Lightweight Design' }
    ]
  },
  'stackable-packs': {
    title: 'Stackable Battery Packs',
    description:
      'Modular, rack-mount stackable packs for scalable energy storage deployments.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=1200&auto=format&fit=crop',
    specs: [
      { label: 'Form Factor', value: 'Rack Mount' },
      { label: 'Scalability', value: 'Up to 500kWh' },
      { label: 'Management', value: 'Smart BMS' }
    ]
  }
};

import BackControls from '@/components/BackControls';

interface Params { params: Promise<{ slug: string }> }

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;
  const product = productMap[slug];

  if (!product) {
    return (
      <main className='mx-auto max-w-3xl p-8'>
        <h1 className='text-2xl font-bold text-slate-900'>Product not found</h1>
        <p className='mt-2 text-slate-600'>Please return to the store and select a valid product.</p>
        <Link href='/store' className='mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-white'>Back to Store</Link>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full bg-white'>
      {/* Top bar with Back/Close (Client Component) */}
      <BackControls />
      {/* Centered vertical layout */}
      <section className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10'>
        {/* Header badge */}
        <div className='inline-flex items-center rounded-full border border-teal-500/30 bg-teal-50/50 px-4 py-2 text-sm font-medium text-teal-600'>
          <span className='mr-2 h-2 w-2 rounded-full bg-teal-500'></span>
          Product Details
        </div>

        {/* Title & description */}
        <h1 className='mt-4 text-4xl font-bold text-slate-900 text-center'>{product.title}</h1>
        <p className='mt-4 text-lg text-slate-600 text-center max-w-3xl mx-auto'>{product.description}</p>

        {/* Hero visual */}
        <div className='mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-xl'>
          <div className='relative h-[420px] overflow-hidden rounded-2xl'>
            <Image src={product.image} alt={product.title} fill className='object-cover' />
          </div>
          <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <button className='rounded-full bg-slate-900 px-6 py-3 text-white'>Download Brochure</button>
            <button className='rounded-full border border-slate-200 bg-white px-6 py-3 text-slate-900 shadow-sm hover:border-teal-500 hover:text-teal-600'>Add to Cart</button>
          </div>
        </div>

        {/* Spec grid */}
        <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {product.specs.map((s) => (
            <div key={s.label} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-sm text-slate-500'>{s.label}</p>
              <p className='mt-1 font-semibold text-slate-900'>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Additional sections for more details */}
        <div className='mt-12 space-y-8'>
          <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-semibold text-slate-900'>Key Features</h2>
            <ul className='mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 text-slate-700'>
              <li>Advanced thermal management for consistent performance</li>
              <li>Smart BMS with safety protections</li>
              <li>Fast charging support with optimized cycle life</li>
              <li>Rugged housing suitable for demanding environments</li>
            </ul>
          </section>

          <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-semibold text-slate-900'>Applications</h2>
            <p className='mt-3 text-slate-700'>Electric two-wheelers, light mobility platforms, and modular energy storage.</p>
          </section>

          <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-semibold text-slate-900'>Downloads</h2>
            <p className='mt-3 text-slate-700'>Datasheet, installation guide, and warranty terms available upon request.</p>
          </section>
        </div>

        {/* Back link */}
        <div className='mt-10 text-center'>
          <Link href='/store' className='text-teal-600 hover:text-teal-700'>← Back to Store</Link>
        </div>
      </section>
    </main>
  );
}

// Ensure static generation for known product slugs to avoid sync dynamic API warnings
export const dynamic = 'force-static';
export function generateStaticParams() {
  return Object.keys(productMap).map((slug) => ({ slug }));
}
