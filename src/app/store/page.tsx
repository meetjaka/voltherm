'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
    ShoppingCart,
    X,
    Send,
    Check,
    AlertCircle,
    ArrowLeft,
    Download,
    Search,
    Minus,
    Plus,
    Sparkles,
    Menu,
    ArrowRight
} from 'lucide-react';

import CategoryIcon from '@/components/CategoryIcon';
import { getSubCategories, getMainCategories, type Product, type SubCategory, type MainCategory } from '@/lib/adminData';
import { getCart, addToCart, removeFromCart, updateCartItemQuantity, isInCart, clearCart, type CartItem } from '@/lib/cartStore';
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                const loadedProducts = await hybridDataService.getProducts();
                
                // Ensure all products have subCategoryId (migration for old data)
                const migratedProducts = loadedProducts.map(product => {
                    if (!product.subCategoryId && !product.categoryId) {
                        return { ...product, subCategoryId: 'sub1', categoryId: 'sub1' };
                    }
                    if (!product.subCategoryId && product.categoryId) {
                        return { ...product, subCategoryId: product.categoryId };
                    }
                    return product;
                });
                
                setProducts(migratedProducts);
                setMainCategories(getMainCategories().filter(c => c.visible));
                setSubCategories(getSubCategories().filter(c => c.visible));
                setCart(getCart());
            } catch (error) {
                console.error('Failed to load products:', error);
                setMainCategories(getMainCategories().filter(c => c.visible));
                setSubCategories(getSubCategories().filter(c => c.visible));
                setCart(getCart());
            }
        };

        loadData();
    }, []);

    // Scroll listener for navbar scroll state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            toast.success(`${product.title} added to cart!`);
        }
    };

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
        setCart(getCart());
        toast.info('Item removed from cart');
    };

    const handleUpdateQuantity = (productId: number, delta: number) => {
        const item = cart.find(i => i.productId === productId);
        if (!item) return;
        const newQty = item.quantity + delta;
        updateCartItemQuantity(productId, newQty);
        setCart(getCart());
    };

    const handleSubmitInquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const inquiry = {
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                companyName: formData.company,
                requirements: formData.requirements,
                products: cart.map(item => ({
                    id: item.productId,
                    title: item.title,
                    quantity: item.quantity
                }))
            };

            const result = await hybridDataService.createInquiry(inquiry);
            if (!result) {
                throw new Error('Failed to submit inquiry');
            }

            setSubmitting(false);
            setSubmitSuccess(true);
            toast.success('Inquiry submitted successfully!');
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
            toast.error('Failed to submit inquiry. Please try again.');
        }
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        if (product.visible === false) return false;
        
        if (selectedSubCategoryId !== 'all') {
            if ((product.subCategoryId || product.categoryId) !== selectedSubCategoryId) return false;
        } else if (selectedMainCategoryId !== 'all') {
            const productSubCategory = subCategories.find(sc => sc.id === (product.subCategoryId || product.categoryId));
            if (!productSubCategory || productSubCategory.mainCategoryId !== selectedMainCategoryId) return false;
        }
        
        if (filterAvailable === 'available' && product.available === false) return false;
        if (filterAvailable === 'unavailable' && product.available !== false) return false;
        
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

    const visibleProducts = products.filter(p => p.visible !== false);
    const getProductCountForMainCategory = (mainCategoryId: string) =>
        visibleProducts.filter(p => {
            const sc = subCategories.find(sc => sc.id === (p.subCategoryId || p.categoryId));
            return sc?.mainCategoryId === mainCategoryId;
        }).length;

    const getProductCountForSubCategory = (subCategoryId: string) =>
        visibleProducts.filter(p => (p.subCategoryId || p.categoryId) === subCategoryId).length;

    const handleMainCategorySelect = (categoryId: string) => {
        setSelectedMainCategoryId(categoryId);
        setSelectedSubCategoryId('all');
    };

    const handleDownloadPdf = async (product: Product) => {
        try {
            const backendId = (product as any).backendId || product.id.toString();
            toast.loading('Downloading PDF...');
            const blob = await apiService.downloadProductPdf(backendId);
            
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
            toast.error('PDF datasheet not available for download.');
        }
    };

    return (
        <main className='min-h-screen w-full bg-[#f5f5f5] text-neutral-900 overflow-x-clip font-outfit antialiased selection:bg-[#E8610A]/10'>
            {/* Inject Page Keyframes & Animation Utilities */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0%;
                    height: 2px;
                    bottom: -4px;
                    left: 50%;
                    background-color: #E8610A;
                    transition: all 0.3s ease-in-out;
                    transform: translateX(-50%);
                }
                .nav-link:hover::after {
                    width: 70%;
                }
                .nav-link-active::after {
                    width: 70%;
                    background-color: #E8610A;
                }
            ` }} />

            {/* FLOATING NAVBAR (Constant padding to prevent jiggle) */}
            <div className='fixed top-4 md:top-6 inset-x-0 z-50 mx-auto max-w-5xl px-4 w-full select-none'>
                <header
                    className={`transition-all duration-300 w-full rounded-full border py-3 px-6 md:px-8 ${
                        isScrolled 
                            ? 'bg-white/95 backdrop-blur-md shadow-lg border-neutral-200/60' 
                            : 'bg-white/90 backdrop-blur-sm shadow-md border-neutral-200/20'
                    }`}
                    style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}
                >
                    <div className='flex items-center justify-between w-full'>
                        {/* Logo */}
                        <Link href='/' className='flex items-center gap-3 select-none group pointer-events-auto'>
                            <Image
                                src='/images/logon.png'
                                alt='Voltherm Logo'
                                width={28}
                                height={28}
                                className='object-contain transition-transform duration-500 group-hover:scale-105'
                                priority
                            />
                            <span className='font-extrabold text-lg tracking-tight text-neutral-900 font-outfit uppercase'>
                                VOLTHERM
                            </span>
                        </Link>

                        {/* Centered Desktop Menu */}
                        <nav className='hidden md:flex items-center space-x-8 font-outfit pointer-events-auto'>
                            <Link href='/' className='nav-link relative text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors'>
                                Home
                            </Link>
                            <Link href='/aboutus' className='nav-link relative text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors'>
                                About Us
                            </Link>
                            <Link href='/store' className='nav-link nav-link-active relative text-sm font-bold text-neutral-900 hover:text-[#E8610A] transition-colors'>
                                Store
                            </Link>
                        </nav>

                        {/* Desktop Contact CTA */}
                        <div className='hidden md:block pointer-events-auto'>
                            <Link
                                href='/contact'
                                className='group bg-[#111] hover:bg-[#E8610A] text-white text-xs font-bold px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-1.5'
                            >
                                Contact Us
                                <ArrowRight size={12} className='transition-transform duration-300 group-hover:translate-x-0.5' />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='md:hidden p-1.5 text-neutral-900 focus:outline-none pointer-events-auto'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label='Toggle menu'
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className='md:hidden absolute top-full left-4 right-4 mt-2 bg-white border border-neutral-100/80 px-6 py-5 flex flex-col space-y-4 rounded-3xl shadow-xl animate-fade-in-up font-outfit pointer-events-auto'>
                            <Link
                                href='/'
                                className='text-sm font-semibold text-neutral-600 hover:text-neutral-900 py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href='/aboutus'
                                className='text-sm font-semibold text-neutral-600 hover:text-neutral-900 py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href='/store'
                                className='text-sm font-bold text-[#E8610A] py-1.5 border-b border-neutral-50'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Store
                            </Link>
                            <Link
                                href='/contact'
                                className='bg-[#111] hover:bg-[#E8610A] text-white text-center text-sm font-bold py-2.5 rounded-full mt-1 transition-colors duration-300'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    )}
                </header>
            </div>

            {/* FIXED CART FLOATING CTA */}
            <button
                onClick={() => setShowCart(true)}
                className='fixed right-6 bottom-6 z-40 flex h-16 w-auto min-w-[4rem] items-center justify-center gap-3 rounded-full bg-[#E8610A] px-6 text-white shadow-xl shadow-[#E8610A]/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none cursor-pointer select-none active:scale-95'
            >
                <ShoppingCart className='h-6 w-6' />
                <span className='flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white text-xs font-bold text-[#E8610A] px-1.5'>
                    {cart.length}
                </span>
            </button>

            {/* STORE HEADER */}
            <section id='store-header' className='pt-36 pb-12 px-6 max-w-7xl mx-auto'>
                <Link
                    href='/'
                    className='inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-5 py-2 text-xs font-bold text-neutral-600 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md mb-8'
                >
                    <ArrowLeft size={14} className='text-[#E8610A]' />
                    Back to Home
                </Link>

                <div 
                    className='relative bg-[#1a1a1a] rounded-[24px] md:rounded-[36px] overflow-hidden p-8 md:p-16 z-10 shadow-xl flex flex-col justify-between min-h-[35vh]'
                    style={{ animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                    {/* Glowing subtle gradient background */}
                    <div className='absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8610A]/5 blur-[120px] pointer-events-none'></div>

                    <div className='relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full flex-1'>
                        {/* Left Column - Text Details */}
                        <div className='lg:col-span-7 flex flex-col space-y-6 text-left'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E8610A] w-fit shadow-inner backdrop-blur-md'>
                                <Sparkles className='h-3.5 w-3.5 animate-pulse' />
                                Dynamic Energy Ecosystem
                            </div>

                            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-outfit select-none'>
                                Voltherm <span className='text-[#E8610A] drop-shadow-sm'>Store</span>
                            </h1>

                            <p className='text-neutral-300 text-sm md:text-base leading-relaxed font-normal font-outfit'>
                                Browse our complete collection of energy storage solutions. Add products to cart and submit a single inquiry request for all selected items at once.
                            </p>
                        </div>

                        {/* Right Column - Image Container */}
                        <div className='lg:col-span-5 relative h-[220px] sm:h-[260px] lg:h-[300px] w-full rounded-2xl overflow-hidden select-none shadow-2xl border border-white/5 bg-neutral-900/40 p-4 flex items-center justify-center animate-fade-in-up'>
                            <Image
                                src='https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1200&auto=format&fit=crop'
                                alt='Voltherm Store Energy Ecosystem'
                                fill
                                className='object-cover rounded-xl opacity-90 transition-transform duration-1000'
                                priority
                                unoptimized
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none'></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH AND FILTERS */}
            <section id='store-filters' className='px-6 pb-12 max-w-7xl mx-auto font-outfit'>
                <div className='rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-md'>
                    {/* Search Input */}
                    <div className='relative max-w-3xl mb-8'>
                        <div className='absolute inset-y-0 left-5 flex items-center pointer-events-none text-neutral-400'>
                            <Search size={20} />
                        </div>
                        <input
                            type='text'
                            placeholder='Search products, specs, or features...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full rounded-2xl border border-neutral-200 bg-[#f5f5f5] pl-14 pr-6 py-3.5 text-base font-semibold text-neutral-900 placeholder-neutral-400 shadow-inner outline-none transition-all focus:border-[#E8610A] focus:bg-white focus:ring-4 focus:ring-[#E8610A]/5'
                        />
                    </div>

                    <div className='grid gap-8 lg:grid-cols-2'>
                        {/* Category Filters Area */}
                        <div className='space-y-6'>
                            {mainCategories.length > 0 && (
                                <div>
                                    <p className='mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400'>
                                        Categories
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                        <button
                                            onClick={() => handleMainCategorySelect('all')}
                                            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                                                selectedMainCategoryId === 'all'
                                                    ? 'bg-[#E8610A] text-white shadow-md'
                                                    : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                                            }`}
                                        >
                                            All Categories
                                        </button>
                                        {mainCategories
                                            .sort((a, b) => a.order - b.order)
                                            .map((mainCategory) => (
                                                <button
                                                    key={mainCategory.id}
                                                    onClick={() => handleMainCategorySelect(mainCategory.id)}
                                                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                                                        selectedMainCategoryId === mainCategory.id
                                                            ? 'bg-[#E8610A] text-white shadow-md'
                                                            : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                                                    }`}
                                                >
                                                    {mainCategory.name}
                                                    <span className={`ml-1.5 opacity-75 ${selectedMainCategoryId === mainCategory.id ? 'text-white' : 'text-neutral-400'}`}>
                                                        ({getProductCountForMainCategory(mainCategory.id)})
                                                    </span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Sub-Category Filters */}
                            {selectedMainCategoryId !== 'all' && filteredSubCategories.length > 0 && (
                                <div className='rounded-2xl border border-neutral-100 bg-[#f5f5f5]/60 p-4'>
                                    <p className='mb-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400'>
                                        Sub-Filters
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                        <button
                                            onClick={() => setSelectedSubCategoryId('all')}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                                                selectedSubCategoryId === 'all'
                                                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                                                    : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                                            }`}
                                        >
                                            All Filters
                                        </button>
                                        {filteredSubCategories.map((subCategory) => (
                                            <button
                                                key={subCategory.id}
                                                onClick={() => setSelectedSubCategoryId(subCategory.id)}
                                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                                                    selectedSubCategoryId === subCategory.id
                                                        ? 'bg-[#1a1a1a] text-white shadow-sm'
                                                        : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                                                }`}
                                            >
                                                {subCategory.icon && (
                                                    <CategoryIcon name={subCategory.icon} className={`w-3.5 h-3.5 ${selectedSubCategoryId === subCategory.id ? 'text-[#E8610A]' : 'text-neutral-400'}`} />
                                                )}
                                                <span>{subCategory.name}</span>
                                                <span className={`opacity-75 ${selectedSubCategoryId === subCategory.id ? 'text-white' : 'text-neutral-400'}`}>
                                                    ({getProductCountForSubCategory(subCategory.id)})
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stock Availability Filter */}
                        <div className='space-y-4 lg:border-l lg:border-neutral-200 lg:pl-8 flex flex-col justify-center'>
                            <div>
                                <p className='mb-3 text-xs font-bold uppercase tracking-wider text-neutral-400'>
                                    Stock Status
                                </p>
                                <div className='flex flex-wrap gap-2'>
                                    <button
                                        onClick={() => setFilterAvailable('all')}
                                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                                            filterAvailable === 'all'
                                                ? 'bg-[#111] text-white shadow-sm'
                                                : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                                        }`}
                                    >
                                        All Items
                                    </button>
                                    <button
                                        onClick={() => setFilterAvailable('available')}
                                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                                            filterAvailable === 'available'
                                                ? 'bg-[#E8610A] text-white shadow-sm'
                                                : 'border border-neutral-200 bg-white text-neutral-600 hover:text-[#E8610A] hover:border-[#E8610A]/30'
                                        }`}
                                    >
                                        <div className={`h-1.5 w-1.5 rounded-full ${filterAvailable === 'available' ? 'bg-white' : 'bg-[#E8610A]'}`}></div>
                                        Available
                                    </button>
                                    <button
                                        onClick={() => setFilterAvailable('unavailable')}
                                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                                            filterAvailable === 'unavailable'
                                                ? 'bg-neutral-800 text-white shadow-sm'
                                                : 'border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900'
                                        }`}
                                    >
                                        <div className={`h-1.5 w-1.5 rounded-full ${filterAvailable === 'unavailable' ? 'bg-white' : 'bg-neutral-400'}`}></div>
                                        Unavailable
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS GRID */}
            <section id='store-grid' className='mx-auto max-w-7xl px-6 pb-24 font-outfit'>
                <div className='mb-8 flex items-center justify-between border-b border-neutral-200 pb-4'>
                    <h2 className='text-2xl font-extrabold text-neutral-900 font-outfit'>Products</h2>
                    <div className='text-xs font-bold text-neutral-500 rounded-full bg-white border border-neutral-200 px-4 py-1.5'>
                        Showing <span className='text-neutral-950 font-extrabold'>{filteredProducts.length}</span> of {products.filter(p => p.visible !== false).length}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProducts.map((product, index) => {
                        const isUnavailable = product.available === false;
                        return (
                            <div
                                key={`product-${product.id}-${index}`}
                                className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-neutral-200 bg-white p-6 shadow-md transition-all duration-300 ${
                                    isUnavailable
                                        ? 'opacity-60 grayscale select-none'
                                        : 'hover:-translate-y-1.5 hover:border-[#E8610A]/30 hover:shadow-xl'
                                }`}
                            >
                                <div className='absolute inset-0 bg-gradient-to-br from-[#E8610A]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none'></div>
                                
                                {/* Status Badges */}
                                {product.available === false && (
                                    <div className='absolute top-5 right-5 z-10 rounded-full bg-neutral-800 px-3 py-1 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider'>
                                        Unavailable
                                    </div>
                                )}
                                
                                {isInCart(product.id) && (
                                    <div className='absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-full bg-[#E8610A] px-3 py-1.5 text-[10px] font-bold text-white shadow-md shadow-[#E8610A]/10 uppercase tracking-wider'>
                                        <Check size={12} />
                                        In Cart
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className='relative mb-5 h-52 w-full overflow-hidden rounded-2xl bg-[#f5f5f5] border border-neutral-100 flex items-center justify-center'>
                                    <Image
                                        src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                                        alt={product.title}
                                        fill
                                        className='object-cover p-1 transition-transform duration-700 group-hover:scale-[1.02]'
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        unoptimized
                                    />
                                </div>

                                {/* Info */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div>
                                        <h3 className='mb-2 text-xl font-extrabold tracking-tight text-neutral-900 line-clamp-2 font-outfit relative z-10'>
                                            {product.title}
                                        </h3>
                                        
                                        <p className='mb-4 text-xs font-semibold text-neutral-400 line-clamp-3 font-outfit relative z-10 leading-relaxed'>
                                            {product.description}
                                        </p>

                                        {/* Specs Info grid */}
                                        <div className='mb-5 grid grid-cols-3 gap-2 relative z-10 font-outfit'>
                                            {product.technicalSpecs && product.technicalSpecs[0] && (
                                                <div className='flex flex-col items-center justify-center rounded-xl border border-neutral-100 bg-[#f5f5f5]/60 p-2'>
                                                    <div className='text-[9px] font-bold text-neutral-400 uppercase tracking-wide'>{product.technicalSpecs[0].key}</div>
                                                    <div className='mt-0.5 text-xs font-extrabold text-neutral-800 text-center line-clamp-1'>
                                                        {product.technicalSpecs[0].value || 'N/A'}
                                                    </div>
                                                </div>
                                            )}
                                            {product.technicalSpecs && product.technicalSpecs[1] && (
                                                <div className='flex flex-col items-center justify-center rounded-xl border border-neutral-100 bg-[#f5f5f5]/60 p-2'>
                                                    <div className='text-[9px] font-bold text-neutral-400 uppercase tracking-wide'>{product.technicalSpecs[1].key}</div>
                                                    <div className='mt-0.5 text-xs font-extrabold text-neutral-800 text-center line-clamp-1'>
                                                        {product.technicalSpecs[1].value || 'N/A'}
                                                    </div>
                                                </div>
                                            )}
                                            <div className='flex flex-col items-center justify-center rounded-xl border border-[#E8610A]/10 bg-[#E8610A]/5 p-2'>
                                                <div className='text-[9px] font-bold text-[#E8610A]/70 uppercase tracking-wide'>Price</div>
                                                <div className='mt-0.5 text-xs font-extrabold text-[#E8610A] line-clamp-1'>
                                                    {product.price ? `₹${product.price.toLocaleString()}` : 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech specs pills */}
                                    <div className='mb-6 flex flex-wrap gap-1.5 relative z-10'>
                                        {product.specs.slice(0, 3).map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className='rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wide'
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-3 relative z-10 mt-auto w-full'>
                                    {isUnavailable ? (
                                        <button
                                            disabled={true}
                                            className='flex-1 rounded-xl border-2 px-4 py-2.5 text-xs font-bold transition-all cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300'
                                        >
                                            Details
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/store/product/${product.id}`}
                                            className='flex-1 flex justify-center items-center rounded-xl border-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                                        >
                                            Details
                                        </Link>
                                    )}
                                    {!isInCart(product.id) ? (
                                        <button
                                            onClick={() => !isUnavailable && handleAddToCart(product)}
                                            disabled={isUnavailable}
                                            className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                                                isUnavailable
                                                    ? 'bg-neutral-100 text-neutral-300'
                                                    : 'bg-[#E8610A] text-white hover:bg-[#d05608] hover:shadow-md hover:shadow-[#E8610A]/10'
                                            }`}
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRemoveFromCart(product.id)}
                                            className='flex-1 rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition-all hover:bg-red-100 cursor-pointer'
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-neutral-200'>
                        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 shadow-inner'>
                            <AlertCircle size={28} />
                        </div>
                        <h3 className='mb-1 text-xl font-bold text-neutral-900 font-outfit'>No products found</h3>
                        <p className='text-sm text-neutral-500 font-medium font-outfit'>Try adjusting your search terms or filters.</p>
                    </div>
                )}
            </section>

            {/* PRODUCT DETAILS MODAL REMOVED - NOW USING NEW PAGE */}

            {/* CART SIDEBAR PANEL */}
            {showCart && (
                <div className='fixed inset-0 z-50 flex items-end justify-end select-none font-outfit'>
                    <div
                        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
                        onClick={() => setShowCart(false)}
                    />
                    
                    <div className='relative h-full w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col font-outfit animate-fade-in-up'>
                        <div className='bg-[#1a1a1a] px-6 py-7 border-b border-neutral-900/10 relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-[#E8610A]/10 to-transparent pointer-events-none'></div>
                            <div className='relative flex items-center justify-between'>
                                <div>
                                    <h2 className='text-2xl font-extrabold text-white tracking-tight font-outfit'>Your Cart</h2>
                                    <p className='text-neutral-400 font-medium text-xs mt-1'>{cart.length} item{cart.length !== 1 ? 's' : ''} selected</p>
                                </div>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className='rounded-full bg-white/10 p-2 text-white hover:bg-white/20'
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Cart items */}
                        <div className='flex-1 overflow-y-auto p-6 bg-[#f5f5f5]/50'>
                            {cart.length === 0 ? (
                                <div className='text-center py-20 flex flex-col items-center justify-center font-outfit'>
                                    <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400'>
                                        <ShoppingCart size={24} />
                                    </div>
                                    <h3 className='text-lg font-bold text-neutral-900 mb-1'>Your cart is empty</h3>
                                    <p className='text-xs text-neutral-400 font-semibold'>Add some products to get started.</p>
                                </div>
                            ) : (
                                <div className='space-y-4'>
                                    {cart.map((item) => (
                                        <div
                                            key={item.productId}
                                            className='relative flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-neutral-300'
                                        >
                                            <button
                                                onClick={() => handleRemoveFromCart(item.productId)}
                                                className='absolute top-3 right-3 z-10 rounded-full p-1 text-neutral-300 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer'
                                                aria-label='Remove from cart'
                                            >
                                                <X size={14} />
                                            </button>

                                            <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5] border border-neutral-100 flex items-center justify-center'>
                                                <Image
                                                    src={item.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${item.image}` : (item.image || '/placeholder-image.jpg')}
                                                    alt={item.title}
                                                    fill
                                                    className='object-contain p-1'
                                                    sizes='64px'
                                                    unoptimized
                                                />
                                            </div>

                                            <div className='flex flex-1 flex-col justify-between pr-4 font-outfit'>
                                                <h4 className='font-bold text-neutral-900 line-clamp-1 leading-snug text-xs'>
                                                    {item.title}
                                                </h4>
                                                
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                                                        className='flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-[#f5f5f5] text-neutral-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors'
                                                    >
                                                        <Minus size={10} />
                                                    </button>
                                                    <span className='w-4 text-center text-xs font-bold text-neutral-800'>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                                                        className='flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-[#f5f5f5] text-neutral-600 hover:bg-neutral-100'
                                                    >
                                                        <Plus size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Checkout Proceed action */}
                        {cart.length > 0 && (
                            <div className='border-t border-neutral-200 bg-white p-6 shadow-md'>
                                <button
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowInquiryForm(true);
                                    }}
                                    className='group flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8610A] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#d05608] hover:shadow-lg transition-all cursor-pointer'
                                >
                                    Proceed to Inquiry
                                    <Send size={14} className='transition-transform group-hover:translate-x-0.5' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* INQUIRY SUBMIT MODAL FORM */}
            {showInquiryForm && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-outfit select-none'>
                    <div
                        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
                        onClick={() => !submitting && setShowInquiryForm(false)}
                    />
                    
                    <div className='relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl'>
                        {submitSuccess ? (
                            <div className='p-12 text-center flex flex-col items-center justify-center min-h-[350px] font-outfit animate-fade-in-up'>
                                <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md'>
                                    <Check size={36} />
                                </div>
                                <h3 className='text-3xl font-extrabold text-neutral-900 mb-3 tracking-tight'>Inquiry Sent!</h3>
                                <p className='text-neutral-500 text-sm font-medium max-w-sm mx-auto leading-relaxed'>
                                    Thank you for your interest. Our solutions team has received your request and will contact you within 24 hours.
                                </p>
                                <button 
                                    onClick={() => setShowInquiryForm(false)}
                                    className='mt-8 rounded-full bg-neutral-100 hover:bg-neutral-200 px-8 py-2.5 text-xs font-bold text-neutral-700 transition'
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className='relative overflow-hidden bg-[#1a1a1a] p-8 text-white'>
                                    <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8610A]/10 blur-2xl'></div>
                                    <div className='relative z-10 flex items-center justify-between'>
                                        <div>
                                            <h2 className='text-2xl font-extrabold tracking-tight mb-1'>Submit Inquiry</h2>
                                            <p className='text-neutral-400 font-medium text-xs'>Requesting spec quotes for {cart.length} selected item{cart.length !== 1 ? 's' : ''}</p>
                                        </div>
                                        <button
                                            onClick={() => setShowInquiryForm(false)}
                                            disabled={submitting}
                                            className='rounded-full bg-white/10 p-2 text-white hover:bg-white/20'
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmitInquiry} className='p-8 space-y-6 font-outfit'>
                                    {/* Products list summary */}
                                    <div className='rounded-2xl border border-neutral-100 bg-[#f5f5f5] p-5'>
                                        <h3 className='font-extrabold text-neutral-800 text-sm mb-3.5 flex items-center gap-2'>
                                            <ShoppingCart size={16} className='text-[#E8610A]' />
                                            Selected Products Summary
                                        </h3>
                                        <ul className='grid gap-1.5 sm:grid-cols-2'>
                                            {cart.map((item) => (
                                                <li key={item.productId} className='flex items-center gap-2 text-xs font-bold text-neutral-600'>
                                                    <div className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8610A]' />
                                                    <span className='line-clamp-1 leading-tight'>{item.title} (x{item.quantity})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Form Fields */}
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                        <div>
                                            <label className='mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500'>
                                                Full Name <span className='text-[#E8610A]'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E8610A]/5'
                                                placeholder='John Doe'
                                            />
                                        </div>

                                        <div>
                                            <label className='mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500'>
                                                Email Address <span className='text-[#E8610A]'>*</span>
                                            </label>
                                            <input
                                                type='email'
                                                required
                                                pattern='[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E8610A]/5'
                                                placeholder='john@company.com'
                                            />
                                        </div>

                                        <div>
                                            <label className='mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500'>
                                                Phone Number <span className='text-[#E8610A]'>*</span>
                                            </label>
                                            <input
                                                type='tel'
                                                required
                                                pattern='[0-9]{10}'
                                                minLength={10}
                                                maxLength={10}
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 10) {
                                                        setFormData({ ...formData, phone: value });
                                                    }
                                                }}
                                                className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E8610A]/5'
                                                placeholder='9876543210'
                                            />
                                        </div>

                                        <div>
                                            <label className='mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500'>
                                                Company Name
                                            </label>
                                            <input
                                                type='text'
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E8610A]/5'
                                                placeholder='Your Company Ltd.'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500'>
                                            Project Specifications & Message <span className='text-[#E8610A]'>*</span>
                                        </label>
                                        <textarea
                                            required
                                            value={formData.requirements}
                                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                            rows={4}
                                            className='w-full rounded-xl border border-neutral-200 bg-[#f5f5f5] px-4 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#E8610A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E8610A]/5 resize-none'
                                            placeholder='Please describe your required capacities, volumes, or application schedules...'
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type='submit'
                                        disabled={submitting}
                                        className='group flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#E8610A] px-5 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#d05608] hover:shadow-lg disabled:bg-neutral-300 disabled:shadow-none cursor-pointer'
                                    >
                                        {submitting ? (
                                            <span className='flex items-center justify-center gap-2'>
                                                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                                                Sending Inquiry Request...
                                            </span>
                                        ) : (
                                            <span className='flex items-center justify-center gap-2 relative'>
                                                <Send size={14} />
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
