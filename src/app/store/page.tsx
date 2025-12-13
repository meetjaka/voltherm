'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

// --- Data Definitions (Moved outside component for clarity, contents unchanged) ---
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
        'https://5.imimg.com/data5/ANDROID/Default/2025/9/546735543/OQ/MC/GY/100678072/product-jpeg.jpg',
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
// --- End Data Definitions ---


export default function StorePage() {
  return (
    <main className='min-h-screen w-full bg-slate-50'> {/* Changed bg-white to bg-slate-50 for softer look */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20'> {/* Adjusted vertical padding */}
        
        {/* Back button */}
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-slate-900 shadow-md hover:border-teal-500 hover:text-teal-600 transition-colors'
            aria-label="Go back"
          >
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </div>

        {/* Page Header */}
        <div className='mb-12 text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight'> {/* Added tracking-tight and extabold */}
            Product Store
          </h1>
          <p className='mt-3 text-slate-600 text-lg max-w-2xl mx-auto'> {/* Adjusted mt and added max-width */}
            Browse product categories and explore detailed specifications.
          </p>
        </div>

        {/* Category panels with horizontal product sliders */}
        <div className='space-y-12 sm:space-y-16'> {/* Increased spacing between categories */}
          {categories.map((cat) => (
            <section 
              key={cat.key} 
              className='rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden group' // Upgraded shadow/border/radius
            >
              
              {/* Category Header (Mobile Optimized) */}
              <div className='relative h-44 sm:h-56'> {/* Increased height slightly on desktop */}
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill 
                  className='object-cover transition-transform duration-500 group-hover:scale-105' 
                  sizes="(max-width: 768px) 100vw, 700px" // Improved image loading performance
                />
                {/* Optimized Overlay for contrast on mobile */}
                <div className='absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent'></div> 
                
                <div className='absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'> {/* Added mobile padding (left/right 4) and flex-col for small screens */}
                  
                  {/* Title and Description */}
                  <div className='max-w-full sm:max-w-md'>
                    <h3 className='text-2xl font-bold text-white drop-shadow-md'>{cat.title}</h3> {/* Ensure title is white and clear */}
                    <p className='mt-1 text-slate-300 text-sm drop-shadow-md'>{cat.description}</p> {/* Ensure description is visible */}
                  </div>
                  
                  {/* View All Button */}
                  <Link 
                    href={`/store/${cat.key}`} 
                    className='group inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600 shrink-0' // Changed to solid teal button for clarity
                  >
                    View All
                    <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                  </Link>
                </div>
              </div>

              {/* Horizontal scroll of product cards (Mobile Optimized Scroll) */}
              <div className='px-4 sm:px-6 pb-6'> {/* Adjusted horizontal padding for mobile view */}
                
                <div className='flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 -my-4'> {/* Optimized gap and negative margin */}
                  
                  {productsByCategory[cat.key].map((p) => (
                    <Link 
                      key={p.slug} 
                      href={`/store/${cat.key}/${p.slug}`} // Fixed link structure to include category key
                      className='min-w-60 max-w-65 group rounded-2xl border border-slate-200 bg-white p-4 shadow-lg hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5' // Upgraded card style and hover effect
                    >
                      <div className='relative h-36 w-full overflow-hidden rounded-xl bg-slate-100'> {/* Added bg for placeholder */}
                        <Image 
                          src={p.image} 
                          alt={p.title} 
                          fill 
                          className='object-cover transition group-hover:scale-105 duration-300' 
                          sizes="260px" // Optimized image loading for the card size
                        />
                      </div>
                      
                      <h4 className='mt-3 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors'> {/* Larger, bolder title */}
                        {p.title}
                      </h4>
                      
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {p.specs.slice(0, 3).map((s) => (
                          <span 
                            key={s} 
                            className='rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700 font-medium' // Updated tag style
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                  
                  {/* View All Placeholder card (Consistent size for scroll) */}
                  <Link 
                    href={`/store/${cat.key}`} 
                    className='min-w-60 max-w-65 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-700 hover:border-teal-500 hover:text-teal-600 transition-colors text-center p-4'
                  >
                    <ChevronRight className='h-8 w-8 mb-3' />
                    <span className='text-base font-semibold'>See more in {cat.title}</span>
                    <p className='text-sm mt-1 text-slate-500'>(View {cat.title} Collection)</p>
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
