'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Download, X, AlertCircle, ShoppingCart, ArrowLeft, Send, Check, Minus, Plus } from 'lucide-react';
import { hybridDataService } from '@/lib/hybridDataService';
import { getCart, addToCart, removeFromCart, isInCart, updateCartItemQuantity, clearCart } from '@/lib/cartStore';
import { apiService } from '@/lib/apiService';
import { toast } from 'sonner';
import { type Product } from '@/lib/adminData';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', requirements: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const products = await hybridDataService.getProducts();
                // Compare by string to support both numeric IDs and string UUIDs
                const foundProduct = products.find(p => String(p.id) === id || p.backendId === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
                setCart(getCart());
            }
        };

        if (id) {
            loadProduct();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleAddToCart = (prod: Product) => {
        const success = addToCart({
            productId: prod.id,
            title: prod.title,
            image: prod.image,
            category: prod.category
        });
        
        if (success) {
            setCart(getCart());
            toast.success(`${prod.title} added to cart!`);
        }
    };

    const handleRemoveFromCart = (prodId: number) => {
        removeFromCart(prodId);
        setCart(getCart());
        toast.info('Item removed from cart');
    };

    const handleUpdateQuantity = (productId: number, delta: number) => {
        const item = cart.find(i => i.productId === productId);
        if (!item) return;
        updateCartItemQuantity(productId, item.quantity + delta);
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
                products: cart.map(item => ({ id: item.productId, title: item.title, quantity: item.quantity }))
            };
            const result = await hybridDataService.createInquiry(inquiry);
            if (!result) throw new Error('Failed to submit inquiry');
            setSubmitting(false);
            setSubmitSuccess(true);
            toast.success('Inquiry submitted successfully!');
            clearCart();
            setCart([]);
            setTimeout(() => {
                setShowInquiryForm(false);
                setSubmitSuccess(false);
                setFormData({ name: '', email: '', phone: '', company: '', requirements: '' });
            }, 3000);
        } catch (error) {
            console.error('Failed to submit inquiry:', error);
            setSubmitting(false);
            toast.error('Failed to submit inquiry. Please try again.');
        }
    };

    const handleDownloadPdf = async (prod: Product) => {
        try {
            const backendId = (prod as any).backendId || prod.id.toString();
            toast.loading('Downloading PDF...');
            const blob = await apiService.downloadProductPdf(backendId);
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${prod.title.replace(/[^a-z0-9]/gi, '_')}_datasheet.pdf`;
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

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-[#f5f5f5]'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-[#E8610A]/30 border-t-[#E8610A]'></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] p-6'>
                <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-400 shadow-md'>
                    <AlertCircle size={28} />
                </div>
                <h3 className='mb-2 text-2xl font-extrabold text-neutral-900 font-outfit'>Product Not Found</h3>
                <p className='text-neutral-500 font-medium font-outfit mb-6'>The product you are looking for does not exist or has been removed.</p>
                <Link href='/store' className='rounded-xl bg-[#E8610A] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#d05608] hover:shadow-lg transition-all'>
                    Return to Store
                </Link>
            </div>
        );
    }

    const itemInCart = cart.find(item => item.productId === product.id);

    return (
        <main className='min-h-screen w-full bg-[#f5f5f5] py-12 px-4 sm:px-6 md:py-24 overflow-x-clip font-outfit antialiased selection:bg-[#E8610A]/10'>
            {/* INJECT KEYFRAMES */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            ` }} />
            
            <div className='max-w-5xl mx-auto'>
                <Link
                    href='/store'
                    className='inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-5 py-2 text-xs font-bold text-neutral-600 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md mb-8'
                >
                    <ArrowLeft size={14} className='text-[#E8610A]' />
                    Back to Store
                </Link>

                <div className='relative z-10 w-full bg-white rounded-[24px] md:rounded-[36px] shadow-xl animate-fade-in-up border border-neutral-200/50'>
                    <div className='grid md:grid-cols-2 gap-8 p-8 md:p-10'>
                        {/* Left Image */}
                        <div className='relative w-full h-full'>
                            <div className='sticky top-32 rounded-[2rem] bg-[#f5f5f5]/80 p-8 flex items-center justify-center border border-neutral-200/50 aspect-square overflow-hidden'>
                                <img
                                    src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                                    alt={product.title}
                                    className='w-full h-full object-contain drop-shadow-xl transition-transform hover:scale-110 duration-700'
                                />
                            </div>
                        </div>

                        {/* Right Details */}
                        <div className='flex flex-col justify-between'>
                            <div>
                                <h1 className='text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 mb-4 font-outfit'>
                                    {product.title}
                                </h1>
                                
                                <p className='text-neutral-500 text-sm md:text-base leading-relaxed mb-8 font-medium font-outfit'>
                                    {product.description}
                                </p>

                                {/* Tech specs info */}
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 font-outfit'>
                                    {product.technicalSpecs && product.technicalSpecs[0] && product.technicalSpecs[0].key && (
                                        <div className='rounded-2xl border border-neutral-100 bg-[#f5f5f5]/60 p-4 text-center flex flex-col items-center justify-center'>
                                            <div className='text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-wide mb-1'>{product.technicalSpecs[0].key}</div>
                                            <div className='text-sm md:text-base font-extrabold text-neutral-900'>{product.technicalSpecs[0].value}</div>
                                        </div>
                                    )}
                                    {product.technicalSpecs && product.technicalSpecs[1] && product.technicalSpecs[1].key && (
                                        <div className='rounded-2xl border border-neutral-100 bg-[#f5f5f5]/60 p-4 text-center flex flex-col items-center justify-center'>
                                            <div className='text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-wide mb-1'>{product.technicalSpecs[1].key}</div>
                                            <div className='text-sm md:text-base font-extrabold text-neutral-900'>{product.technicalSpecs[1].value}</div>
                                        </div>
                                    )}
                                    <div className='rounded-2xl border border-[#E8610A]/10 bg-[#E8610A]/5 p-4 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1'>
                                        <div className='text-[10px] md:text-xs font-bold text-[#E8610A]/70 uppercase tracking-wide mb-1'>Price</div>
                                        <div className='text-base md:text-lg font-extrabold text-[#E8610A]'>
                                            {product.price ? `₹${product.price.toLocaleString()}` : 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                {/* Core Features */}
                                <div className='mb-8 font-outfit'>
                                    <h3 className='text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4'>Key Features</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {product.specs.map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className='rounded-xl bg-neutral-100 px-4 py-1.5 text-xs font-bold text-neutral-600 uppercase tracking-wide border border-neutral-200/50'
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Detailed Specifications Table */}
                                {product.technicalSpecs && product.technicalSpecs.length > 0 && product.technicalSpecs.some(s => s.key && s.value) && (
                                    <div className='mb-8 font-outfit'>
                                        <h3 className='text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4'>
                                            Detailed Specifications
                                        </h3>
                                        <div className='overflow-hidden rounded-2xl border border-neutral-200 shadow-sm'>
                                            <table className='w-full text-left border-collapse'>
                                                <tbody>
                                                    {product.technicalSpecs.filter(s => s.key && s.value).map((spec, idx) => (
                                                        <tr key={idx} className={`transition-colors hover:bg-neutral-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]/30'}`}>
                                                            <th className='py-3 px-4 text-xs font-bold text-neutral-600 w-1/3 border-b border-neutral-100 last:border-0 align-top'>
                                                                {spec.key}
                                                            </th>
                                                            <td className='py-3 px-4 text-xs font-semibold text-neutral-900 border-b border-neutral-100 last:border-0'>
                                                                {spec.value}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className='space-y-4 pt-6 border-t border-neutral-100 font-outfit mt-4'>
                                <button 
                                    onClick={() => handleDownloadPdf(product)}
                                    className='w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white px-6 py-4 text-sm font-bold text-neutral-700 transition-all hover:border-[#E8610A]/30 hover:text-[#E8610A] cursor-pointer hover:shadow-md'
                                >
                                    <Download size={18} />
                                    Download Datasheet
                                </button>
                                
                                {!itemInCart ? (
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.available === false}
                                        className={`w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition-all cursor-pointer shadow-md ${
                                            product.available === false
                                                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none'
                                                : 'bg-[#E8610A] text-white hover:bg-[#d05608] hover:shadow-xl hover:shadow-[#E8610A]/20'
                                        }`}
                                    >
                                        <ShoppingCart size={18} />
                                        {product.available === false ? 'Unavailable' : 'Add to Cart'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        className='w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-red-500/20 bg-red-50 px-6 py-4 text-sm font-bold text-red-600 transition-all hover:bg-red-100 cursor-pointer hover:border-red-500/40'
                                    >
                                        <X size={18} />
                                        Remove from Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
                                    className='rounded-full bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer'
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
                                                <img
                                                    src={item.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${item.image}` : (item.image || '/placeholder-image.jpg')}
                                                    alt={item.title}
                                                    className='object-contain p-1 w-full h-full'
                                                />
                                            </div>

                                            <div className='flex flex-1 flex-col justify-between pr-4 font-outfit'>
                                                <h4 className='font-bold text-neutral-900 line-clamp-1 leading-snug text-xs'>
                                                    {item.title}
                                                </h4>
                                                
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                                                        className='flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-[#f5f5f5] text-neutral-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors cursor-pointer'
                                                    >
                                                        <Minus size={10} />
                                                    </button>
                                                    <span className='w-4 text-center text-xs font-bold text-neutral-800'>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                                                        className='flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-[#f5f5f5] text-neutral-600 hover:bg-neutral-100 cursor-pointer'
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
                                    className='mt-8 rounded-full bg-neutral-100 hover:bg-neutral-200 px-8 py-2.5 text-xs font-bold text-neutral-700 transition cursor-pointer'
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
                                            className='rounded-full bg-white/10 p-2 text-white hover:bg-white/20 cursor-pointer'
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
