'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X, Send, Check, AlertCircle, ArrowLeft, Filter } from 'lucide-react';
import NavbarDemo from '@/components/demos/NavbarDemo';
import CategoryIcon from '@/components/CategoryIcon';
import { getProducts, getSubCategories, getMainCategories, type Product, type SubCategory, type MainCategory } from '@/lib/adminData';
import { getCart, addToCart, removeFromCart, isInCart, getCartCount, clearCart, type CartItem } from '@/lib/cartStore';

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'available' | 'unavailable'>('all');
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | 'all'>('all');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadedProducts = getProducts();
    
    // Ensure all products have subCategoryId (migration for old data)
    const migratedProducts = loadedProducts.map(product => {
      if (!product.subCategoryId && !product.categoryId) {
        // If no category, assign to first sub-category
        return { ...product, subCategoryId: 'sub1', categoryId: 'sub1' };
      }
      if (!product.subCategoryId && product.categoryId) {
        // If only categoryId exists, copy it to subCategoryId
        return { ...product, subCategoryId: product.categoryId };
      }
      return product;
    });
    
    setProducts(migratedProducts);
    setMainCategories(getMainCategories().filter(c => c.visible)); // Only show visible main categories
    setSubCategories(getSubCategories().filter(c => c.visible)); // Only show visible sub-categories
    setCart(getCart());
  }, []);

  const handleAddToCart = (product: Product) => {
    const success = addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      category: product.category
    });
    
    if (success) {
      setCart(getCart());
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save inquiry to localStorage (this will be replaced with API call later)
    const inquiry = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      companyName: formData.company,
      requirements: formData.requirements,
      products: cart.map(item => ({
        id: item.productId,
        title: item.title
      }))
    };

    // Import and use the addInquiry function
    const { addInquiry } = await import('@/lib/adminData');
    addInquiry(inquiry);

    setSubmitting(false);
    setSubmitSuccess(true);
    
    // Clear cart and form
    clearCart();
    setCart([]);
    
    setTimeout(() => {
      setShowInquiryForm(false);
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requirements: ''
      });
    }, 3000);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Filter by visibility
    if (product.visible === false) return false;
    
    // Filter by sub-category
    if (selectedSubCategoryId !== 'all') {
      if ((product.subCategoryId || product.categoryId) !== selectedSubCategoryId) return false;
    }
    // Filter by main category if no sub-category is selected
    else if (selectedMainCategoryId !== 'all') {
      const productSubCategory = subCategories.find(sc => sc.id === (product.subCategoryId || product.categoryId));
      if (!productSubCategory || productSubCategory.mainCategoryId !== selectedMainCategoryId) return false;
    }
    
    // Filter by availability
    if (filterAvailable === 'available' && !product.available) return false;
    if (filterAvailable === 'unavailable' && product.available !== false) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.specs.some(spec => spec.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Get sub-categories for selected main category
  const filteredSubCategories = selectedMainCategoryId === 'all' 
    ? [] 
    : subCategories.filter(sc => sc.mainCategoryId === selectedMainCategoryId).sort((a, b) => a.order - b.order);

  // Handle main category selection
  const handleMainCategorySelect = (categoryId: string) => {
    setSelectedMainCategoryId(categoryId);
    setSelectedSubCategoryId('all'); // Reset sub-category when main category changes
  };

  return (
    <main className='min-h-screen w-full bg-slate-50'>
      <NavbarDemo />
      
      {/* Fixed Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className='fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-teal-500 px-6 py-4 text-white shadow-2xl transition-all hover:scale-105 hover:bg-teal-600'
      >
        <ShoppingCart className='h-6 w-6' />
        <span className='font-semibold'>{cart.length}</span>
      </button>

      {/* Header */}
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
            Product Store
          </h1>
          <p className='text-xl text-slate-300 max-w-3xl'>
            Browse our complete collection of energy storage solutions. Add products to cart and send inquiry for all selected items at once.
          </p>

          {/* Search and Filter */}
          <div className='mt-8 space-y-4'>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
            
            {/* Main Category Filters */}
            {mainCategories.length > 0 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-slate-300'>Main Categories</p>
                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => handleMainCategorySelect('all')}
                    className={`rounded-lg px-4 py-2 font-medium transition-all ${
                      selectedMainCategoryId === 'all'
                        ? 'bg-teal-500 text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    All Categories
                  </button>
                  {mainCategories
                    .sort((a, b) => a.order - b.order)
                    .map((mainCategory) => {
                      const categorySubCount = subCategories.filter(sc => sc.mainCategoryId === mainCategory.id).length;
                      return (
                        <button
                          key={mainCategory.id}
                          onClick={() => handleMainCategorySelect(mainCategory.id)}
                          className={`rounded-lg px-4 py-2 font-medium transition-all ${
                            selectedMainCategoryId === mainCategory.id
                              ? 'bg-teal-500 text-white'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20'
                          }`}
                        >
                          {mainCategory.name}
                          {categorySubCount > 0 && (
                            <span className='ml-2 text-xs opacity-75'>({categorySubCount})</span>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
            
            {/* Sub-Category Filters - Only show when a main category is selected */}
            {selectedMainCategoryId !== 'all' && filteredSubCategories.length > 0 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-slate-300'>Sub-Categories</p>
                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => setSelectedSubCategoryId('all')}
                    className={`rounded-lg px-4 py-2 font-medium transition-all ${
                      selectedSubCategoryId === 'all'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    All Sub-Categories
                  </button>
                  {filteredSubCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => setSelectedSubCategoryId(subCategory.id)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${
                        selectedSubCategoryId === subCategory.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <CategoryIcon name={subCategory.icon} className='w-4 h-4' />
                      <span>{subCategory.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Availability Filters */}
            <div className='space-y-2'>
              <p className='text-sm font-medium text-slate-300'>Availability</p>
              <div className='flex gap-2'>
                <button
                  onClick={() => setFilterAvailable('all')}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    filterAvailable === 'all'
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterAvailable('available')}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    filterAvailable === 'available'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => setFilterAvailable('unavailable')}
                  className={`rounded-lg px-4 py-2 font-medium transition-all ${
                    filterAvailable === 'unavailable'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  Unavailable
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='mb-6 text-sm text-slate-600'>
          Showing {filteredProducts.length} of {products.filter(p => p.visible !== false).length} products
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1'
            >
              {/* Availability Badge */}
              {product.available === false && (
                <div className='absolute top-4 right-4 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-lg'>
                  Unavailable
                </div>
              )}
              
              {/* In Cart Badge */}
              {isInCart(product.id) && (
                <div className='absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-lg'>
                  <Check className='h-3 w-3' />
                  In Cart
                </div>
              )}

              {/* Product Image */}
              <div className='relative h-48 w-full overflow-hidden rounded-xl bg-slate-100 mb-4'>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  unoptimized
                />
              </div>

              {/* Product Info */}
              <h3 className='text-xl font-bold text-slate-900 mb-2 line-clamp-2'>
                {product.title}
              </h3>
              
              <p className='text-sm text-slate-600 mb-4 line-clamp-3'>
                {product.description}
              </p>

              {/* Specs */}
              <div className='flex flex-wrap gap-2 mb-4'>
                {product.specs.slice(0, 3).map((spec, idx) => (
                  <span
                    key={idx}
                    className='rounded-full border-2 border-cyan-500 bg-white px-3 py-1 text-xs font-medium text-cyan-500'
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className='flex gap-2'>
                {!isInCart(product.id) ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.available === false}
                    className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-all ${
                      product.available === false
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-teal-500 text-white hover:bg-teal-600 hover:shadow-lg'
                    }`}
                  >
                    {product.available === false ? 'Unavailable' : 'Add to Cart'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className='flex-1 rounded-lg border-2 border-teal-500 bg-white px-4 py-3 font-semibold text-teal-500 transition-all hover:bg-teal-50'
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className='text-center py-16'>
            <AlertCircle className='h-16 w-16 text-slate-400 mx-auto mb-4' />
            <h3 className='text-2xl font-bold text-slate-900 mb-2'>No products found</h3>
            <p className='text-slate-600'>Try adjusting your filters or search query</p>
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className='fixed inset-0 z-50 flex items-end justify-end'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => setShowCart(false)}
          />
          
          {/* Cart Panel */}
          <div className='relative h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='bg-teal-500 p-6 text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold'>Your Cart</h2>
                  <p className='text-teal-100'>{cart.length} items selected</p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className='rounded-full bg-white/20 p-2 transition-all hover:bg-white/30'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-6'>
              {cart.length === 0 ? (
                <div className='text-center py-16'>
                  <ShoppingCart className='h-16 w-16 text-slate-300 mx-auto mb-4' />
                  <p className='text-slate-600'>Your cart is empty</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className='flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4'
                    >
                      <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className='object-cover'
                          sizes='80px'
                          unoptimized
                        />
                      </div>
                      
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-slate-900 line-clamp-2 mb-1'>
                          {item.title}
                        </h4>
                        {item.category && (
                          <span className='text-xs text-slate-500'>{item.category}</span>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className='shrink-0 text-red-500 hover:text-red-600'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {cart.length > 0 && (
              <div className='border-t border-slate-200 bg-white p-6'>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowInquiryForm(true);
                  }}
                  className='w-full rounded-xl bg-teal-500 px-6 py-4 font-semibold text-white transition-all hover:bg-teal-600 hover:shadow-lg'
                >
                  Proceed to Inquiry
                  <Send className='inline-block ml-2 h-5 w-5' />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={() => !submitting && setShowInquiryForm(false)}
          />
          
          {/* Form Modal */}
          <div className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl'>
            {submitSuccess ? (
              // Success Message
              <div className='p-12 text-center'>
                <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
                  <Check className='h-10 w-10 text-green-600' />
                </div>
                <h3 className='text-3xl font-bold text-slate-900 mb-4'>Inquiry Sent!</h3>
                <p className='text-lg text-slate-600'>
                  Thank you for your interest. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className='bg-teal-500 p-6 text-white'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-2xl font-bold'>Send Inquiry</h2>
                      <p className='text-teal-100'>For {cart.length} selected products</p>
                    </div>
                    <button
                      onClick={() => setShowInquiryForm(false)}
                      disabled={submitting}
                      className='rounded-full bg-white/20 p-2 transition-all hover:bg-white/30 disabled:opacity-50'
                    >
                      <X className='h-6 w-6' />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitInquiry} className='p-6 space-y-6'>
                  {/* Selected Products Summary */}
                  <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                    <h3 className='font-semibold text-slate-900 mb-3'>Selected Products:</h3>
                    <ul className='space-y-2'>
                      {cart.map((item) => (
                        <li key={item.productId} className='flex items-center gap-2 text-sm text-slate-700'>
                          <div className='h-2 w-2 rounded-full bg-teal-500' />
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Form Fields */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Full Name *
                      </label>
                      <input
                        type='text'
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='John Doe'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Email Address *
                      </label>
                      <input
                        type='email'
                        required
                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                        title='Please enter a valid email address'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='john@example.com'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Phone Number *
                      </label>
                      <input
                        type='tel'
                        required
                        pattern='[0-9]{10}'
                        minLength={10}
                        maxLength={10}
                        title='Please enter a valid 10-digit mobile number'
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            setFormData({ ...formData, phone: value });
                          }
                        }}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='9876543210'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-slate-700 mb-2'>
                        Company Name
                      </label>
                      <input
                        type='text'
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder='Your Company'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Requirements / Message *
                    </label>
                    <textarea
                      required
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={5}
                      className='w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500'
                      placeholder='Please describe your requirements, quantities, delivery location, and any specific needs...'
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={submitting}
                    className='w-full rounded-xl bg-teal-500 px-6 py-4 font-semibold text-white transition-all hover:bg-teal-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {submitting ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                        Sending...
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2'>
                        <Send className='h-5 w-5' />
                        Send Inquiry
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

