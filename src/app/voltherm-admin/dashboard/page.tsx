'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Mail, 
  FileText, 
  Image as ImageIcon, 
  LogOut,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Star
} from 'lucide-react';
import CategoryIcon from '@/components/CategoryIcon';
import { checkAdminSession, clearAdminSession } from '@/lib/adminAuth';
import { 
  getProducts, 
  saveProducts, 
  getCertificates, 
  saveCertificates, 
  getContactInfo, 
  saveContactInfo,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getMainCategories,
  getSubCategories,
  type Product,
  type Certificate,
  type ContactInfo,
  type Inquiry,
  type MainCategory,
  type SubCategory
} from '@/lib/adminData';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'contact' | 'certificates' | 'inquiries' | 'overview'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!checkAdminSession()) {
      router.push('/voltherm-admin');
      return;
    }
    
    // Load data
    setProducts(getProducts());
    setCertificates(getCertificates());
    setContactInfo(getContactInfo());
    setInquiries(getInquiries());
    setMainCategories(getMainCategories());
    setSubCategories(getSubCategories());
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleSaveProduct = (product: Product) => {
    const updatedProducts = editingProduct?.id 
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, { ...product, id: Math.floor(Math.random() * 1000000000) }];
    
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setEditingProduct(null);
    setIsAddingProduct(false);
    toast.success(editingProduct ? 'Product updated' : 'Product added');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
      toast.success('Product deleted');
    }
  };

  const handleToggleFeatured = (id: number) => {
    const currentProduct = products.find(p => p.id === id);
    const featuredCount = products.filter(p => p.featured).length;
    
    // Check if trying to feature a product (currently not featured)
    if (!currentProduct?.featured) {
      if (featuredCount >= 6) {
        toast.error('Maximum 6 products can be featured on homepage slider');
        return;
      }
    } else {
      // Check if trying to unfeature a product (currently featured)
      if (featuredCount <= 3) {
        toast.error('Minimum 3 products must be featured on homepage slider');
        return;
      }
    }
    
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Product featured status updated');
  };

  const handleToggleProductAvailability = (id: number) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Product availability updated');
  };

  const handleSaveCertificate = (cert: Certificate) => {
    const updatedCerts = editingCertificate?.id 
      ? certificates.map(c => c.id === cert.id ? cert : c)
      : [...certificates, { ...cert, id: `cert${Math.floor(Math.random() * 1000000000)}` }];
    
    setCertificates(updatedCerts);
    saveCertificates(updatedCerts);
    setEditingCertificate(null);
    setIsAddingCertificate(false);
    toast.success(editingCertificate ? 'Certificate updated' : 'Certificate added');
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      const updatedCerts = certificates.filter(c => c.id !== id);
      setCertificates(updatedCerts);
      saveCertificates(updatedCerts);
      toast.success('Certificate deleted');
    }
  };

  const handleSaveContact = () => {
    if (contactInfo) {
      saveContactInfo(contactInfo);
      toast.success('Contact information updated');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <header className='bg-white border-b border-slate-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center'>
                <Settings className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-slate-900'>Admin Dashboard</h1>
                <p className='text-xs text-slate-500'>Voltherm Technologies</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
            >
              <LogOut className='w-4 h-4' />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <nav className='bg-white rounded-xl border border-slate-200 p-2 space-y-1'>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className='w-5 h-5' />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Package className='w-5 h-5' />
                Products
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Mail className='w-5 h-5' />
                Contact Info
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'certificates'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ImageIcon className='w-5 h-5' />
                Certificates
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className='w-5 h-5' />
                Inquiries
                {inquiries.filter(i => i.status === 'new').length > 0 && (
                  <span className='ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white'>
                    {inquiries.filter(i => i.status === 'new').length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {activeTab === 'overview' && (
              <OverviewTab 
                productsCount={products.length}
                certificatesCount={certificates.length}
                featuredProductsCount={products.filter(p => p.featured).length}
                inquiriesCount={inquiries.length}
                newInquiriesCount={inquiries.filter(i => i.status === 'new').length}
              />
            )}
            
            {activeTab === 'products' && (
              <ProductsTab
                products={products}
                categories={subCategories}
                mainCategories={mainCategories}
                editingProduct={editingProduct}
                isAddingProduct={isAddingProduct}
                setEditingProduct={setEditingProduct}
                setIsAddingProduct={setIsAddingProduct}
                onSave={handleSaveProduct}
                onDelete={handleDeleteProduct}
                onToggleFeatured={handleToggleFeatured}
                onToggleAvailability={handleToggleProductAvailability}
              />
            )}
            
            {activeTab === 'contact' && contactInfo && (
              <ContactTab
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                onSave={handleSaveContact}
              />
            )}
            
            {activeTab === 'certificates' && (
              <CertificatesTab
                certificates={certificates}
                editingCertificate={editingCertificate}
                isAddingCertificate={isAddingCertificate}
                setEditingCertificate={setEditingCertificate}
                setIsAddingCertificate={setIsAddingCertificate}
                onSave={handleSaveCertificate}
                onDelete={handleDeleteCertificate}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesTab
                inquiries={inquiries}
                onStatusChange={(id: string, status: 'new' | 'in-progress' | 'completed' | 'rejected', notes?: string) => {
                  updateInquiryStatus(id, status, notes);
                  setInquiries(getInquiries());
                  toast.success('Inquiry status updated');
                }}
                onDelete={(id: string) => {
                  deleteInquiry(id);
                  setInquiries(getInquiries());
                  toast.success('Inquiry deleted');
                }}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ productsCount, certificatesCount, featuredProductsCount, inquiriesCount, newInquiriesCount }: any) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-2'>Dashboard Overview</h2>
        <p className='text-slate-600'>Manage your website content and settings</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl border border-slate-200 p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center'>
              <Package className='w-6 h-6 text-teal-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-900'>{productsCount}</p>
              <p className='text-sm text-slate-600'>Total Products</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl border border-slate-200 p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center'>
              <span className='text-2xl'>⭐</span>
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-900'>{featuredProductsCount}</p>
              <p className='text-sm text-slate-600'>Featured Products</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl border border-slate-200 p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center'>
              <ImageIcon className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-900'>{certificatesCount}</p>
              <p className='text-sm text-slate-600'>Certificates</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl border border-slate-200 p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center'>
              <Mail className='w-6 h-6 text-amber-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-900'>
                {inquiriesCount}
                {newInquiriesCount > 0 && (
                  <span className='ml-2 text-base text-red-500'>({newInquiriesCount} new)</span>
                )}
              </p>
              <p className='text-sm text-slate-600'>Customer Inquiries</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-linear-to-br from-teal-500 to-cyan-500 rounded-xl p-6 text-white'>
        <h3 className='text-xl font-bold mb-2'>Quick Actions</h3>
        <p className='text-teal-50 mb-4'>Use the sidebar to navigate to different sections and manage your content.</p>
        <div className='flex flex-wrap gap-3'>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Add Products</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Update Contact</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Manage Certificates</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>View Inquiries</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Manage Certificates</span>
        </div>
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab({ products, categories, mainCategories, editingProduct, isAddingProduct, setEditingProduct, setIsAddingProduct, onSave, onDelete, onToggleFeatured, onToggleAvailability }: any) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    image: '',
    specs: [''],
    color: 'from-teal-500 to-cyan-400',
    featured: false,
    available: true
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else if (isAddingProduct) {
      setFormData({
        id: 0,
        title: '',
        description: '',
        image: '',
        specs: [''],
        featured: false,
        available: true
      });
    }
  }, [editingProduct, isAddingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingProduct || isAddingProduct) {
    return (
      <div className='bg-white rounded-xl border border-slate-200 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-slate-900'>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddingProduct(false);
            }}
            className='text-slate-600 hover:text-slate-900'
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Title</label>
            <input
              type='text'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Image URL</label>
            <input
              type='url'
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Specs (comma-separated)</label>
            <input
              type='text'
              value={formData.specs.join(', ')}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value.split(',').map(s => s.trim()) })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Spec 1, Spec 2, Spec 3'
            />
          </div>

          {/* Capacity, Voltage, Price */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Capacity (Optional)</label>
              <input
                type='text'
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value || undefined })}
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                placeholder='e.g., 75 kWh'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Voltage (Optional)</label>
              <input
                type='text'
                value={formData.voltage || ''}
                onChange={(e) => setFormData({ ...formData, voltage: e.target.value || undefined })}
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                placeholder='e.g., 400V'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Price (Optional)</label>
              <input
                type='number'
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                placeholder='e.g., 50000'
              />
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <div className='flex items-center justify-between mb-2'>
              <label className='block text-sm font-medium text-slate-700'>Technical Specifications (Max 6)</label>
              <button
                type='button'
                onClick={() => {
                  const current = formData.technicalSpecs || [];
                  if (current.length < 6) {
                    setFormData({
                      ...formData,
                      technicalSpecs: [...current, { key: '', value: '' }]
                    });
                  }
                }}
                disabled={(formData.technicalSpecs || []).length >= 6}
                className='flex items-center gap-1 px-3 py-1 text-sm bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='text-lg'>+</span> Add
              </button>
            </div>
            <div className='space-y-2'>
              {(formData.technicalSpecs || []).map((spec, idx) => (
                <div key={idx} className='flex gap-2'>
                  <input
                    type='text'
                    value={spec.key}
                    onChange={(e) => {
                      const updated = [...(formData.technicalSpecs || [])];
                      updated[idx] = { ...updated[idx], key: e.target.value };
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    placeholder='e.g., Energy Density'
                    className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                  <input
                    type='text'
                    value={spec.value}
                    onChange={(e) => {
                      const updated = [...(formData.technicalSpecs || [])];
                      updated[idx] = { ...updated[idx], value: e.target.value };
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    placeholder='e.g., 250 Wh/kg'
                    className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      const updated = (formData.technicalSpecs || []).filter((_, i) => i !== idx);
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    className='px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                  >
                    ×
                  </button>
                </div>
              ))}
              {(!formData.technicalSpecs || formData.technicalSpecs.length === 0) && (
                <p className='text-sm text-slate-500 italic'>No technical specifications added yet. Click + Add to create one.</p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Sub-Category</label>
            <select
              value={formData.subCategoryId || formData.categoryId || ''}
              onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value || undefined, categoryId: e.target.value || undefined })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            >
              <option value=''>No Sub-Category</option>
              {mainCategories.sort((a: MainCategory, b: MainCategory) => a.order - b.order).map((mainCat: MainCategory) => {
                const subCats = categories.filter((c: SubCategory) => c.mainCategoryId === mainCat.id).sort((a: SubCategory, b: SubCategory) => a.order - b.order);
                if (subCats.length === 0) return null;
                return (
                  <optgroup key={mainCat.id} label={mainCat.name}>
                    {subCats.map((subCat: SubCategory) => (
                      <option key={subCat.id} value={subCat.id}>
                        {subCat.icon} {subCat.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <p className='text-xs text-slate-500 mt-1'>Select a sub-category to organize this product</p>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='featured'
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className='w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500'
            />
            <label htmlFor='featured' className='text-sm font-medium text-slate-700 flex items-center gap-1'>
              <span>⭐</span> Featured on homepage slider
            </label>
          </div>

          <button
            type='submit'
            className='w-full py-3 px-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
          >
            <Save className='w-4 h-4 inline mr-2' />
            Save Product
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Products Management</h2>
          <p className='text-slate-600'>Manage products displayed on your website</p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
        >
          <Plus className='w-4 h-4' />
          Add Product
        </button>
      </div>

      <div className='grid gap-4'>
        {products.map((product: Product) => (
          <div key={product.id} className='bg-white rounded-xl border border-slate-200 p-4'>
            <div className='flex items-start gap-4'>
              <img 
                src={product.image} 
                alt={product.title}
                className='w-24 h-24 object-cover rounded-lg'
              />
              <div className='flex-1'>
                <div className='flex items-start justify-between'>
                  <div>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-bold text-slate-900'>{product.title}</h3>
                      {product.available === false && (
                        <span className='px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold'>
                          Unavailable
                        </span>
                      )}
                      {(product.subCategoryId || product.categoryId) && (() => {
                        const subCat = categories.find((c: SubCategory) => c.id === (product.subCategoryId || product.categoryId));
                        if (!subCat) return null;
                        const mainCat = mainCategories.find((m: MainCategory) => m.id === subCat.mainCategoryId);
                        return (
                          <span className='px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-semibold'>
                            {subCat.icon} {subCat.name} {mainCat && `· ${mainCat.name}`}
                          </span>
                        );
                      })()}
                    </div>
                    <p className='text-sm text-slate-600 mt-1'>{product.description}</p>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {product.specs.map((spec, idx) => (
                        <span key={idx} className='px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded'>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => onToggleFeatured(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.featured
                          ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                      title={product.featured ? 'Featured on homepage slider' : 'Not featured on homepage'}
                    >
                      <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => onToggleAvailability(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.available !== false
                          ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                          : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                      }`}
                      title={product.available !== false ? 'Available in store' : 'Unavailable in store'}
                    >
                      <Package className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => setEditingProduct(product)}
                      className='p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors'
                    >
                      <Edit className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className='p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Tab Component
function ContactTab({ contactInfo, setContactInfo, onSave }: any) {
  return (
    <div className='bg-white rounded-xl border border-slate-200 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-slate-900'>Contact Information</h2>
        <p className='text-slate-600'>Update contact details displayed on the contact page</p>
      </div>

      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>Sales Contact</h3>
          <div className='space-y-3'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
              <input
                type='email'
                value={contactInfo.sales.email}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  sales: { ...contactInfo.sales, email: e.target.value }
                })}
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Phone</label>
              <input
                type='tel'
                value={contactInfo.sales.phone}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  sales: { ...contactInfo.sales, phone: e.target.value }
                })}
                className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>Business Contact</h3>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
            <input
              type='email'
              value={contactInfo.business.email}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                business: { ...contactInfo.business, email: e.target.value }
              })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>Support Contact</h3>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Phone</label>
            <input
              type='tel'
              value={contactInfo.support.phone}
              onChange={(e) => setContactInfo({
                ...contactInfo,
                support: { ...contactInfo.support, phone: e.target.value }
              })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
          </div>
        </div>

        <button
          onClick={onSave}
          className='w-full py-3 px-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
        >
          <Save className='w-4 h-4 inline mr-2' />
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Certificates Tab Component
function CertificatesTab({ certificates, editingCertificate, isAddingCertificate, setEditingCertificate, setIsAddingCertificate, onSave, onDelete }: any) {
  const [formData, setFormData] = useState<Certificate>({
    id: '',
    src: '',
    alt: '',
    title: ''
  });

  useEffect(() => {
    if (editingCertificate) {
      setFormData(editingCertificate);
    } else if (isAddingCertificate) {
      setFormData({
        id: '',
        src: '',
        alt: '',
        title: ''
      });
    }
  }, [editingCertificate, isAddingCertificate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (editingCertificate || isAddingCertificate) {
    return (
      <div className='bg-white rounded-xl border border-slate-200 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-slate-900'>
            {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          <button
            onClick={() => {
              setEditingCertificate(null);
              setIsAddingCertificate(false);
            }}
            className='text-slate-600 hover:text-slate-900'
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Title</label>
            <input
              type='text'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Alt Text</label>
            <input
              type='text'
              value={formData.alt}
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Image Path</label>
            <input
              type='text'
              value={formData.src}
              onChange={(e) => setFormData({ ...formData, src: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='/certificate/filename.png'
              required
            />
            <p className='text-xs text-slate-500 mt-1'>Upload file to /public/certificate/ folder first</p>
          </div>

          <button
            type='submit'
            className='w-full py-3 px-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
          >
            <Save className='w-4 h-4 inline mr-2' />
            Save Certificate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Certificates Management</h2>
          <p className='text-slate-600'>Manage certificates displayed on the about page</p>
        </div>
        <button
          onClick={() => setIsAddingCertificate(true)}
          className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
        >
          <Plus className='w-4 h-4' />
          Add Certificate
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {certificates.map((cert: Certificate) => (
          <div key={cert.id} className='bg-white rounded-xl border border-slate-200 p-4'>
            <img 
              src={cert.src} 
              alt={cert.alt}
              className='w-full h-40 object-cover rounded-lg mb-3'
            />
            <h3 className='font-bold text-slate-900'>{cert.title}</h3>
            <p className='text-sm text-slate-600 mb-3'>{cert.alt}</p>
            <div className='flex gap-2'>
              <button
                onClick={() => setEditingCertificate(cert)}
                className='flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium'
              >
                <Edit className='w-4 h-4 inline mr-1' />
                Edit
              </button>
              <button
                onClick={() => onDelete(cert.id)}
                className='flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium'
              >
                <Trash2 className='w-4 h-4 inline mr-1' />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inquiries Tab Component
function InquiriesTab({ inquiries, onStatusChange, onDelete }: any) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | Inquiry['status']>('all');

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter((inq: Inquiry) => inq.status === statusFilter);

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Customer Inquiries</h2>
          <p className='text-slate-600'>Manage customer product inquiries from the store</p>
        </div>
        
        {/* Status Filter */}
        <div className='flex gap-2'>
          {['all', 'new', 'in-progress', 'completed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              {status === 'all' && ` (${inquiries.length})`}
              {status === 'new' && ` (${inquiries.filter((i: Inquiry) => i.status === 'new').length})`}
            </button>
          ))}
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className='bg-white rounded-xl border border-slate-200 p-12 text-center'>
          <Mail className='w-16 h-16 text-slate-300 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-slate-900 mb-2'>No inquiries found</h3>
          <p className='text-slate-600'>
            {statusFilter === 'all' 
              ? 'No customer inquiries yet' 
              : `No ${statusFilter} inquiries`}
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {filteredInquiries.map((inquiry: Inquiry) => (
            <div
              key={inquiry.id}
              className='bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='text-lg font-bold text-slate-900'>{inquiry.customerName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className='flex flex-wrap gap-4 text-sm text-slate-600'>
                    <span className='flex items-center gap-1'>
                      <Mail className='w-4 h-4' />
                      {inquiry.customerEmail}
                    </span>
                    <span>{inquiry.customerPhone}</span>
                    {inquiry.companyName && <span>Company: {inquiry.companyName}</span>}
                  </div>
                  <p className='text-xs text-slate-500 mt-2'>
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className='px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium'
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this inquiry?')) {
                        onDelete(inquiry.id);
                      }
                    }}
                    className='px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {/* Products Interested In */}
              <div className='mb-3'>
                <h4 className='text-sm font-semibold text-slate-700 mb-2'>Products ({inquiry.products.length}):</h4>
                <div className='flex flex-wrap gap-2'>
                  {inquiry.products.map((product) => (
                    <span
                      key={product.id}
                      className='px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium'
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className='mb-4'>
                <h4 className='text-sm font-semibold text-slate-700 mb-1'>Requirements:</h4>
                <p className='text-sm text-slate-600 bg-slate-50 rounded-lg p-3'>
                  {inquiry.requirements}
                </p>
              </div>

              {/* Status Actions */}
              <div className='flex gap-2 pt-3 border-t border-slate-100'>
                {inquiry.status !== 'in-progress' && (
                  <button
                    onClick={() => onStatusChange(inquiry.id, 'in-progress')}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium'
                  >
                    Mark In Progress
                  </button>
                )}
                {inquiry.status !== 'completed' && (
                  <button
                    onClick={() => onStatusChange(inquiry.id, 'completed')}
                    className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium'
                  >
                    Mark Completed
                  </button>
                )}
                {inquiry.status !== 'rejected' && (
                  <button
                    onClick={() => onStatusChange(inquiry.id, 'rejected')}
                    className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium'
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60'>
          <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-2xl font-bold text-slate-900'>Inquiry Details</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700'>Customer Name</label>
                <p className='text-slate-900'>{selectedInquiry.customerName}</p>
              </div>
              
              <div>
                <label className='text-sm font-semibold text-slate-700'>Email</label>
                <p className='text-slate-900'>{selectedInquiry.customerEmail}</p>
              </div>
              
              <div>
                <label className='text-sm font-semibold text-slate-700'>Phone</label>
                <p className='text-slate-900'>{selectedInquiry.customerPhone}</p>
              </div>

              {selectedInquiry.companyName && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Company</label>
                  <p className='text-slate-900'>{selectedInquiry.companyName}</p>
                </div>
              )}

              <div>
                <label className='text-sm font-semibold text-slate-700'>Inquiry Date</label>
                <p className='text-slate-900'>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700'>Status</label>
                <p className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedInquiry.status)}`}>
                  {selectedInquiry.status.replace('-', ' ').toUpperCase()}
                </p>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700'>Products Interested In</label>
                <ul className='list-disc list-inside text-slate-900'>
                  {selectedInquiry.products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700'>Requirements</label>
                <p className='text-slate-900 bg-slate-50 rounded-lg p-4 whitespace-pre-wrap'>
                  {selectedInquiry.requirements}
                </p>
              </div>

              {selectedInquiry.notes && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Admin Notes</label>
                  <p className='text-slate-900 bg-slate-50 rounded-lg p-4'>
                    {selectedInquiry.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
