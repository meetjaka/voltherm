import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const categories = [
  {
    key: 'ev-batteries',
    title: 'Electric Vehicles Batteries',
    description: 'High-performance battery solutions for electric vehicles.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png'
  },
  {
    key: 'solar-batteries',
    title: 'Solar Batteries',
    description: 'Efficient energy storage systems for solar installations.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    key: 'drone-batteries',
    title: 'Drone Batteries',
    description: 'Lightweight, powerful batteries for aerial applications.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=1000&auto=format&fit=crop'
  }
];

const productsByCategory: Record<string, Array<{ slug: string; title: string; image: string; specs: string[] }>> = {
  'ev-batteries': [
    {
      slug: 'li-ion-2w',
      title: 'Lithium ion Battery Pack (2 Wheeler)',
      image:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
      specs: ['Lithium Ion', '2 Wheeler', 'High Density']
    },
    {
      slug: 'lifepo4-pack',
      title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
      specs: ['LiFePo4', 'Long Cycle Life', 'Thermal Stability']
    }
  ],
  'solar-batteries': [
    {
      slug: 'solar-smart-bench',
      title: 'Solar Smart Bench',
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      specs: ['Solar Powered', 'Public Installations', 'Smart Charging']
    }
  ],
  'drone-batteries': [
    {
      slug: 'drone-pack',
      title: 'Drone Battery Pack',
      image:
        'https://images.unsplash.com/photo-1580255443550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
      specs: ['Lightweight', 'Fast Charge', 'High Power']
    },
    {
      slug: 'stackable-packs',
      title: 'Stackable Battery Packs',
      image:
        'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=800&auto=format&fit=crop',
      specs: ['Modular', 'Scalable', 'Rack Mount']
    }
  ]
};

export default function StorePage() {
  return (
    <main className='min-h-screen w-full bg-white'>
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        {/* Back button */}
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:border-teal-500 hover:text-teal-600 transition-colors'
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </div>

        <div className='mb-12 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-900'>Store</h1>
          <p className='mt-4 text-slate-600 text-lg'>Browse product categories and explore detailed specifications.</p>
        </div>

        {/* Category panels with horizontal product sliders */}
        <div className='space-y-10'>
          {categories.map((cat) => (
            <section key={cat.key} className='rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden'>
              {/* Header */}
              <div className='relative h-44'>
                <Image src={cat.image} alt={cat.title} fill className='object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-white/70 to-transparent'></div>
                <div className='absolute bottom-4 left-6 right-6 flex items-center justify-between'>
                  <div>
                    <h3 className='text-2xl font-bold text-slate-900'>{cat.title}</h3>
                    <p className='mt-1 text-slate-700'>{cat.description}</p>
                  </div>
                  <Link href={`/store/${cat.key}`} className='group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-900 backdrop-blur hover:border-teal-500 hover:text-teal-600'>
                    View All
                    <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                  </Link>
                </div>
              </div>

              {/* Horizontal scroll of product cards */}
              <div className='px-6 pb-6'>
                <div className='flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4'>
                  {productsByCategory[cat.key].map((p) => (
                    <Link key={p.slug} href={`/store/${p.slug}`} className='min-w-[260px] group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-teal-500 hover:shadow-md'>
                      <div className='relative h-36 w-full overflow-hidden rounded-xl'>
                        <Image src={p.image} alt={p.title} fill className='object-cover transition group-hover:scale-105' />
                      </div>
                      <h4 className='mt-3 line-clamp-2 text-base font-semibold text-slate-900'>{p.title}</h4>
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {p.specs.slice(0, 3).map((s) => (
                          <span key={s} className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700'>
                            {s}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                  {/* Placeholder card prompting view all when many products exist */}
                  <Link href={`/store/${cat.key}`} className='min-w-[220px] flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-700 hover:border-teal-500 hover:text-teal-600'>
                    See more in {cat.title}
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
