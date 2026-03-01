'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X, Send, Check, AlertCircle, ArrowLeft, Filter, Download, Search } from 'lucide-react';
import NavbarDemo from '@/components/demos/NavbarDemo';
import CategoryIcon from '@/components/CategoryIcon';
import { getSubCategories, getMainCategories, type Product, type SubCategory, type MainCategory } from '@/lib/adminData';
import { getCart, addToCart, removeFromCart, isInCart, getCartCount, clearCart, type CartItem } from '@/lib/cartStore';
import { hybridDataService } from '@/lib/hybridDataService';
import { apiService } from '@/lib/apiService';
import { toast } from 'sonner';

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    const loadData = async () => {
      try {
        // Load products from hybrid service (API first, localStorage fallback)
        const loadedProducts = await hybridDataService.getProducts();
        
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
        
        // Log connection status for debugging
        const status = hybridDataService.getConnectionStatus();
        console.log('🌐 Data Service Status:', status);
      } catch (error) {
        console.error('Failed to load products:', error);
        // Even if API fails, we still have localStorage fallback
        setMainCategories(getMainCategories().filter(c => c.visible));
        setSubCategories(getSubCategories().filter(c => c.visible));
        setCart(getCart());
      }
    };

    loadData();
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

    try {
      // Create inquiry object
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

      // Submit using hybrid service (API first, localStorage fallback)
      console.log('📧 [STORE] Submitting inquiry...', inquiry);
      const result = await hybridDataService.createInquiry(inquiry);
      
      if (!result) {
        throw new Error('Failed to submit inquiry');
      }

      console.log('✅ [STORE] Inquiry submitted successfully:', result);
      setSubmitting(false);
      setSubmitSuccess(true);
      
      // Show success toast
      toast.success('Inquiry submitted successfully!');
      
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
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setSubmitting(false);
      // You could add error state here if needed
      alert('Failed to submit inquiry. Please try again.');
    }
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

  const handleDownloadPdf = async (product: Product) => {
    try {
      // Get the backend product ID
      const backendId = (product as any).backendId || product.id.toString();
      
      toast.loading('Downloading PDF...');
      const blob = await apiService.downloadProductPdf(backendId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.title.replace(/[^a-z0-9]/gi, '_')}_datasheet.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Failed to download PDF:', error);
      toast.dismiss();
      toast.error('Failed to download PDF. File may not be available.');
    }
  };

  return (
    <main className='min-h-screen w-full bg-slate-50 font-sans selection:bg-primary/20'>
      <NavbarDemo />
      
      {/* Fixed Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className='fixed right-6 bottom-6 z-40 flex h-16 w-auto min-w-[4rem] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-purple-600 px-6 text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20'
      >
        <ShoppingCart className='h-6 w-6' />
        <span className='flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-white/20 px-2 text-sm font-bold backdrop-blur-md'>
          {cart.length}
        </span>
      </button>

      {/* Header */}
      <section className='relative overflow-hidden bg-white border-b border-slate-200 px-6 pt-32 pb-20'>
        {/* Abstract Background Elements */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute -left-[20%] -top-[20%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary/10 via-purple-400/5 to-transparent blur-[100px] mix-blend-multiply'></div>
          <div className='absolute -right-[10%] top-[40%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-secondary/10 via-cyan-400/5 to-transparent blur-[80px] mix-blend-multiply'></div>
          
          {/* Subtle Grid Pattern */}
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40'></div>
        </div>

        <div className='relative z-10 mx-auto max-w-7xl'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md mb-8'
          >
            <ArrowLeft className='h-4 w-4 text-primary' />
            Back to Home
          </Link>
          
          <div className='max-w-4xl'>
            <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl mb-6'>
              Voltherm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-secondary drop-shadow-sm">Store</span>
            </h1>
            <p className='text-lg font-medium text-slate-600 sm:text-xl md:text-2xl leading-relaxed'>
              Browse our complete collection of energy storage solutions. Add products to cart and send an inquiry for all selected items at once.
            </p>
          </div>

          {/* Search and Filters */}
          <div className='mt-12 space-y-8 rounded-3xl border border-white bg-white/60 p-6 md:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl'>
            
            {/* Search Input */}
            <div className='relative max-w-3xl'>
              <div className='absolute inset-y-0 left-5 flex items-center pointer-events-none'>
                <Search className='h-6 w-6 text-primary/50' />
              </div>
              <input
                type='text'
                placeholder='Search products, specs, or features...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-6 py-4 text-lg font-medium text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10'
              />
            </div>
            
            <div className='grid gap-8 lg:grid-cols-2'>
              {/* Category Filters Area */}
              <div className='space-y-6'>
                {/* Main Category Filters */}
                {mainCategories.length > 0 && (
                  <div>
                    <p className='mb-3 text-sm font-bold uppercase tracking-wider text-slate-500'>
                      Categories
                    </p>
                    <div className='flex flex-wrap gap-2.5'>
                      <button
                        onClick={() => handleMainCategorySelect('all')}
                        className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                          selectedMainCategoryId === 'all'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
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
                              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                                selectedMainCategoryId === mainCategory.id
                                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              {mainCategory.name}
                              {categorySubCount > 0 && (
                                <span className={`ml-2 text-xs opacity-75 ${selectedMainCategoryId === mainCategory.id ? 'text-white' : 'text-slate-400'}`}>
                                  ({categorySubCount})
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
                
                {/* Sub-Category Filters */}
                {selectedMainCategoryId !== 'all' && filteredSubCategories.length > 0 && (
                  <div className='rounded-2xl border border-slate-100 bg-slate-50/50 p-5'>
                    <p className='mb-3 text-sm font-bold uppercase tracking-wider text-slate-500'>
                      Sub-Categories
                    </p>
                    <div className='flex flex-wrap gap-2.5'>
                      <button
                        onClick={() => setSelectedSubCategoryId('all')}
                        className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                          selectedSubCategoryId === 'all'
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                            : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        All Filters
                      </button>
                      {filteredSubCategories.map((subCategory) => (
                        <button
                          key={subCategory.id}
                          onClick={() => setSelectedSubCategoryId(subCategory.id)}
                          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                            selectedSubCategoryId === subCategory.id
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                              : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {subCategory.icon && (
                            <CategoryIcon name={subCategory.icon} className={`w-4 h-4 ${selectedSubCategoryId === subCategory.id ? 'text-white' : 'text-purple-600'}`} />
                          )}
                          <span>{subCategory.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tools Area */}
              <div className='space-y-6 lg:border-l lg:border-slate-200 lg:pl-8'>
                {/* Availability Filters */}
                <div>
                  <p className='mb-3 text-sm font-bold uppercase tracking-wider text-slate-500'>
                    Stock Status
                  </p>
                  <div className='flex flex-wrap gap-2.5'>
                    <button
                      onClick={() => setFilterAvailable('all')}
                      className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                        filterAvailable === 'all'
                          ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/20'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      All Items
                    </button>
                    <button
                      onClick={() => setFilterAvailable('available')}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                        filterAvailable === 'available'
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-emerald-600'
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${filterAvailable === 'available' ? 'bg-white' : 'bg-emerald-500'}`}></div>
                      Available
                    </button>
                    <button
                      onClick={() => setFilterAvailable('unavailable')}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                        filterAvailable === 'unavailable'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-orange-600'
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${filterAvailable === 'unavailable' ? 'bg-white' : 'bg-orange-500'}`}></div>
                      Unavailable
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className='mx-auto max-w-7xl px-6 lg:px-8 py-20'>
        <div className='mb-8 flex items-center justify-between border-b border-slate-200 pb-4'>
          <h2 className='text-3xl font-bold text-slate-900'>Products</h2>
          <div className='text-sm font-semibold text-slate-500 rounded-full bg-slate-100 px-4 py-1.5'>
            Showing <span className='text-slate-900'>{filteredProducts.length}</span> of {products.filter(p => p.visible !== false).length}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.map((product, index) => (
            <div
              key={`product-${product.id}-${index}`}
              className='group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none'></div>
              
              {/* Availability Badge */}
              {product.available === false && (
                <div className='absolute top-6 right-6 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-orange-500/30'>
                  Unavailable
                </div>
              )}
              
              {/* In Cart Badge */}
              {isInCart(product.id) && (
                <div className='absolute top-6 left-6 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-primary/30'>
                  <Check className='h-3.5 w-3.5' />
                  In Cart
                </div>
              )}

              {/* Product Image */}
              <div className='relative mb-6 h-56 w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100'>
                <Image
                  src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                  alt={product.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  unoptimized
                />
              </div>

              {/* Product Info */}
              <div className='flex-1'>
                <h3 className='mb-3 text-2xl font-bold tracking-tight text-slate-900 line-clamp-2 md:text-xl relative z-10'>
                  {product.title}
                </h3>
                
                <p className='mb-6 text-sm font-medium text-slate-500 line-clamp-3 relative z-10'>
                  {product.description}
                </p>

                {/* Info Blocks - Technical Specs, Price */}
                <div className='mb-6 grid grid-cols-3 gap-3 relative z-10'>
                  {product.technicalSpecs && product.technicalSpecs[0] && (
                    <div className='flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-3'>
                      <div className='text-xs font-semibold text-slate-400'>{product.technicalSpecs[0].key}</div>
                      <div className='mt-1 text-sm font-bold text-slate-900 text-center line-clamp-1'>
                        {product.technicalSpecs[0].value || 'N/A'}
                      </div>
                    </div>
                  )}
                  {product.technicalSpecs && product.technicalSpecs[1] && (
                    <div className='flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-3'>
                      <div className='text-xs font-semibold text-slate-400'>{product.technicalSpecs[1].key}</div>
                      <div className='mt-1 text-sm font-bold text-slate-900 text-center line-clamp-1'>
                        {product.technicalSpecs[1].value || 'N/A'}
                      </div>
                    </div>
                  )}
                  <div className='flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-primary/5 p-3'>
                    <div className='text-xs font-semibold text-primary/70'>Price</div>
                    <div className='mt-1 text-sm font-bold text-primary line-clamp-1'>
                      {product.price ? `₹${product.price.toLocaleString()}` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className='mb-8 flex flex-wrap gap-2 relative z-10'>
                  {product.specs.slice(0, 3).map((spec, idx) => (
                    <span
                      key={idx}
                      className='rounded-md border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-600'
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-3 relative z-10 mt-auto'>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className='flex-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                >
                  Details
                </button>
                {!isInCart(product.id) ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.available === false}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      product.available === false
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
                    }`}
                  >
                    {product.available === false ? 'Unavailable' : 'Add to Cart'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className='flex-1 rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-100'
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className='flex flex-col items-center justify-center py-32'>
            <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100'>
              <AlertCircle className='h-12 w-12 text-slate-400' />
            </div>
            <h3 className='mb-2 text-2xl font-bold text-slate-900'>No products found</h3>
            <p className='text-lg font-medium text-slate-500'>Try adjusting your filters or search query.</p>
          </div>
        )}
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity'
            onClick={() => setSelectedProduct(null)}
          />
          
          {/* Modal */}
          <div className='relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl'>
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className='absolute top-6 right-6 z-20 rounded-full bg-slate-100/80 p-2.5 backdrop-blur shadow-sm transition-all hover:bg-slate-200 hover:scale-105'
            >
              <X className='h-5 w-5 text-slate-700' />
            </button>

            <div className='grid md:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-10'>
              {/* Left: Image */}
              <div className='rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4'>
                <img
                  src={selectedProduct.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${selectedProduct.image}` : (selectedProduct.image || '/placeholder-image.jpg')}
                  alt={selectedProduct.title}
                  className='max-w-full max-h-[60vh] object-contain drop-shadow-lg'
                />
              </div>

              {/* Right: Details */}
              <div className='flex flex-col'>
                <h2 className='text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-4'>
                  {selectedProduct.title}
                </h2>
                
                <p className='text-slate-600 mb-8 font-medium leading-relaxed text-lg'>
                  {selectedProduct.description}
                </p>

                {/* Info Blocks */}
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8'>
                  {selectedProduct.technicalSpecs && selectedProduct.technicalSpecs[0] && (
                    <div className='rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center flex flex-col items-center justify-center'>
                      <div className='text-sm font-semibold text-slate-400 mb-1'>{selectedProduct.technicalSpecs[0].key}</div>
                      <div className='text-lg font-bold text-slate-900'>
                        {selectedProduct.technicalSpecs[0].value || 'N/A'}
                      </div>
                    </div>
                  )}
                  {selectedProduct.technicalSpecs && selectedProduct.technicalSpecs[1] && (
                    <div className='rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center flex flex-col items-center justify-center'>
                      <div className='text-sm font-semibold text-slate-400 mb-1'>{selectedProduct.technicalSpecs[1].key}</div>
                      <div className='text-lg font-bold text-slate-900'>
                        {selectedProduct.technicalSpecs[1].value || 'N/A'}
                      </div>
                    </div>
                  )}
                  <div className='rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1'>
                    <div className='text-sm font-semibold text-primary/70 mb-1'>Price</div>
                    <div className='text-xl font-bold text-primary'>
                      {selectedProduct.price ? `₹${selectedProduct.price.toLocaleString()}` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className='mb-8'>
                  <h3 className='text-sm font-bold uppercase tracking-wider text-slate-500 mb-4'>Key Features</h3>
                  <div className='flex flex-wrap gap-2.5'>
                    {selectedProduct.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className='rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-600'
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                {selectedProduct.technicalSpecs && selectedProduct.technicalSpecs.length > 0 && (
                  <div className='mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
                    <div className='bg-slate-50 px-6 py-4 border-b border-slate-200'>
                      <h3 className='text-sm font-bold uppercase tracking-wider text-slate-500'>
                        Technical Specifications
                      </h3>
                    </div>
                    <div className='divide-y divide-slate-100'>
                      {selectedProduct.technicalSpecs.map((spec, idx) => (
                        <div key={idx} className='flex justify-between items-center px-6 py-4 hover:bg-slate-50/50 transition-colors'>
                          <span className='text-slate-500 font-medium'>{spec.key}</span>
                          <span className='font-bold text-slate-900 text-right'>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className='mt-auto space-y-4 pt-4'>
                  <button 
                    onClick={() => handleDownloadPdf(selectedProduct)}
                    className='w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition-all hover:border-primary/30 hover:bg-slate-50 hover:text-primary'>
                    <Download className='h-5 w-5' />
                    Download Datasheet
                  </button>
                  
                  <button className='group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-600 px-6 py-4 font-bold text-lg text-white shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:scale-[1.01]'>
                    <div className='absolute inset-0 bg-white/20 transition-transform -translate-x-full -skew-x-12 group-hover:translate-x-full duration-700 ease-in-out pointer-events-none'></div>
                    <span className='relative z-10'>Request a Quote</span>
                  </button>

                  {!isInCart(selectedProduct.id) ? (
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={selectedProduct.available === false}
                      className={`w-full rounded-2xl px-6 py-4 font-bold text-lg transition-all ${
                        selectedProduct.available === false
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30'
                      }`}
                    >
                      {selectedProduct.available === false ? 'Unavailable' : 'Add to Cart'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleRemoveFromCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                      className='w-full rounded-2xl border-2 border-red-500 bg-red-50 px-6 py-4 font-bold text-red-600 transition-all hover:bg-red-100'
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className='fixed inset-0 z-50 flex items-end justify-end'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity'
            onClick={() => setShowCart(false)}
          />
          
          {/* Cart Panel */}
          <div className='relative h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='bg-white px-6 py-8 border-b border-slate-100 relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 pointer-events-none'></div>
              <div className='relative flex items-center justify-between'>
                <div>
                  <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Your Cart</h2>
                  <p className='text-slate-500 font-medium mt-1'>{cart.length} item{cart.length !== 1 ? 's' : ''} selected</p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className='rounded-full bg-slate-100 p-2.5 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-6 bg-slate-50/50'>
              {cart.length === 0 ? (
                <div className='text-center py-20'>
                  <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100'>
                    <ShoppingCart className='h-10 w-10 text-slate-300' />
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 mb-2'>Your cart is empty</h3>
                  <p className='text-slate-500 font-medium'>Add some products to get started.</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className='group flex gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md'
                    >
                      <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center'>
                        <Image
                          src={item.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${item.image}` : (item.image || '/placeholder-image.jpg')}
                          alt={item.title}
                          fill
                          className='object-contain p-2'
                          sizes='96px'
                          unoptimized
                        />
                      </div>
                      
                      <div className='flex flex-1 flex-col py-1'>
                        <h4 className='font-bold text-slate-900 line-clamp-2 mb-1.5 pr-6 leading-snug'>
                          {item.title}
                        </h4>
                        {item.category && (
                          <span className='inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 w-fit'>
                            {item.category}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className='absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors'
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
              <div className='border-t border-slate-200 bg-white p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]'>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowInquiryForm(true);
                  }}
                  className='group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-purple-600 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:scale-[1.02]'
                >
                  Proceed to Inquiry
                  <Send className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity'
            onClick={() => !submitting && setShowInquiryForm(false)}
          />
          
          {/* Form Modal */}
          <div className='relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl'>
            {submitSuccess ? (
              // Success Message
              <div className='p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]'>
                <div className='mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100'>
                  <Check className='h-12 w-12 text-emerald-600' />
                </div>
                <h3 className='text-4xl font-extrabold text-slate-900 mb-4 tracking-tight'>Inquiry Sent!</h3>
                <p className='text-lg font-medium text-slate-500 max-w-md mx-auto'>
                  Thank you for your interest. Our team has received your request and will contact you shortly.
                </p>
                <button 
                  onClick={() => setShowInquiryForm(false)}
                  className='mt-10 rounded-full bg-slate-100 px-8 py-3 font-bold text-slate-700 transition hover:bg-slate-200'>
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className='relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 p-8 text-white'>
                  {/* Abstract shapes */}
                  <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl'></div>
                  
                  <div className='relative z-10 flex items-center justify-between'>
                    <div>
                      <h2 className='text-3xl font-extrabold tracking-tight mb-2'>Submit Inquiry</h2>
                      <p className='text-white/80 font-medium'>Requesting details for {cart.length} selected item{cart.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                      onClick={() => setShowInquiryForm(false)}
                      disabled={submitting}
                      className='rounded-full bg-white/20 p-2.5 transition-all hover:bg-white/30 disabled:opacity-50 backdrop-blur-sm'
                    >
                      <X className='h-6 w-6' />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitInquiry} className='p-8 space-y-8'>
                  {/* Selected Products Summary */}
                  <div className='rounded-2xl border border-slate-100 bg-slate-50 p-5'>
                    <h3 className='font-bold text-slate-900 mb-4 flex items-center gap-2'>
                      <ShoppingCart className='w-5 h-5 text-primary' />
                      Selected Products
                    </h3>
                    <ul className='grid gap-2 sm:grid-cols-2'>
                      {cart.map((item) => (
                        <li key={item.productId} className='flex items-start gap-3 text-sm font-medium text-slate-700'>
                          <div className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                          <span className='line-clamp-2 leading-tight'>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Form Fields */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500'>
                        Full Name <span className='text-primary'>*</span>
                      </label>
                      <input
                        type='text'
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10'
                        placeholder='John Doe'
                      />
                    </div>

                    <div>
                      <label className='mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500'>
                        Email Address <span className='text-primary'>*</span>
                      </label>
                      <input
                        type='email'
                        required
                        pattern='[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                        title='Please enter a valid email address'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10'
                        placeholder='john@company.com'
                      />
                    </div>

                    <div>
                      <label className='mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500'>
                        Phone Number <span className='text-primary'>*</span>
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
                        className='w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10'
                        placeholder='9876543210'
                      />
                    </div>

                    <div>
                      <label className='mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500'>
                        Company Name
                      </label>
                      <input
                        type='text'
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className='w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10'
                        placeholder='Your Company Ltd.'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500'>
                      Requirements / Message <span className='text-primary'>*</span>
                    </label>
                    <textarea
                      required
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={4}
                      className='w-full rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none'
                      placeholder='Please describe your requirements, quantities, or specific application needs...'
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={submitting}
                    className='group flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-2xl disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed'
                  >
                    {submitting ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                        Sending Inquiry...
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2 relative'>
                        <Send className='h-5 w-5' />
                        Submit Inquiry Request
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

