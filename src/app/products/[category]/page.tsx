'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';
import NavbarDemo from '@/components/demos/NavbarDemo';
import { 
  getMainCategories, 
  getSubCategoriesByMainCategory, 
  getProducts,
  type MainCategory, 
  type SubCategory,
  type Product 
} from '@/lib/adminData';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allMainCategories = getMainCategories();
    const category = allMainCategories.find(c => c.slug === categorySlug);
    
    if (category) {
      setMainCategory(category);
      const subs = getSubCategoriesByMainCategory(category.id).filter(s => s.visible);
      setSubCategories(subs);
      
      // Get all products for sub-categories
      const allProducts = getProducts().filter(p => p.visible !== false);
      const subIds = subs.map(s => s.id);
      const filteredProducts = allProducts.filter(p => subIds.includes(p.subCategoryId || ''));
      setProducts(filteredProducts);
    }
  }, [categorySlug]);

  const getProductCountBySubCategory = (subCategoryId: string) => {
    return products.filter(p => p.subCategoryId === subCategoryId).length;
  };

  if (!mainCategory) {
    return (
      <main className='min-h-screen w-full bg-slate-50'>
        <NavbarDemo />
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-slate-900 mb-4'>Category Not Found</h1>
            <Link href='/products' className='text-teal-600 hover:underline'>
              Back to All Categories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full bg-slate-50'>
      <NavbarDemo />
      
      {/* Hero Section */}
      <section className='bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-white'>
        <div className='mx-auto max-w-7xl'>
          <Link
            href='/products'
            className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20 mb-6'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to All Categories
          </Link>
          
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            {mainCategory.name}
          </h1>
          <p className='text-xl text-slate-300 max-w-3xl'>
            {mainCategory.description}
          </p>
        </div>
      </section>

      {/* Sub-Categories Grid */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-slate-900 mb-2'>Product Categories</h2>
          <p className='text-slate-600'>
            Explore our specialized battery solutions for different vehicle types
          </p>
        </div>

        {subCategories.length === 0 ? (
          <div className='bg-white rounded-xl border border-slate-200 p-12 text-center'>
            <Package className='w-16 h-16 text-slate-300 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-slate-900 mb-2'>No Sub-Categories Available</h3>
            <p className='text-slate-600 mb-4'>
              This category doesn't have any sub-categories yet.
            </p>
            <Link
              href='/store'
              className='inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {subCategories
              .sort((a, b) => a.order - b.order)
              .map((subCategory) => {
                const productCount = getProductCountBySubCategory(subCategory.id);
                
                return (
                  <Link
                    key={subCategory.id}
                    href={`/store?category=${subCategory.id}`}
                    className='group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <span className='text-5xl'>{subCategory.icon}</span>
                        <div>
                          <h3 className='font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors'>
                            {subCategory.name}
                          </h3>
                          <p className='text-sm text-slate-500'>{productCount} products</p>
                        </div>
                      </div>
                    </div>

                    <p className='text-sm text-slate-600 mb-4'>{subCategory.description}</p>

                    <div className='flex items-center gap-2 text-teal-600 font-medium text-sm'>
                      View Products
                      <ArrowLeft className='h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1' />
                    </div>
                  </Link>
                );
              })}
          </div>
        )}

        {/* View All Products Button */}
        {subCategories.length > 0 && (
          <div className='mt-12 text-center'>
            <Link
              href='/store'
              className='inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all'
            >
              View All {mainCategory.name} Products
              <ArrowLeft className='h-5 w-5 rotate-180' />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
