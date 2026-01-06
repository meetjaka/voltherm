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
  Save
} from 'lucide-react';
import { checkAdminSession, clearAdminSession } from '@/lib/adminAuth';
import { 
  getProducts, 
  saveProducts, 
  getCertificates, 
  saveCertificates, 
  getContactInfo, 
  saveContactInfo,
  type Product,
  type Certificate,
  type ContactInfo
} from '@/lib/adminData';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'contact' | 'certificates' | 'overview'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCertificate, setIsAddingCertificate] = useState(false);

  useEffect(() => {
    if (!checkAdminSession()) {
      router.push('/voltherm-admin');
      return;
    }
    
    // Load data
    setProducts(getProducts());
    setCertificates(getCertificates());
    setContactInfo(getContactInfo());
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleSaveProduct = (product: Product) => {
    const updatedProducts = editingProduct?.id 
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, { ...product, id: Date.now() }];
    
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

  const handleToggleProductVisibility = (id: number) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Product visibility updated');
  };

  const handleSaveCertificate = (cert: Certificate) => {
    const updatedCerts = editingCertificate?.id 
      ? certificates.map(c => c.id === cert.id ? cert : c)
      : [...certificates, { ...cert, id: `cert${Date.now()}` }];
    
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

  if (!checkAdminSession()) {
    return null;
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <header className='bg-white border-b border-slate-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center'>
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
            </nav>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {activeTab === 'overview' && (
              <OverviewTab 
                productsCount={products.length}
                certificatesCount={certificates.length}
                visibleProductsCount={products.filter(p => p.visible).length}
              />
            )}
            
            {activeTab === 'products' && (
              <ProductsTab
                products={products}
                editingProduct={editingProduct}
                isAddingProduct={isAddingProduct}
                setEditingProduct={setEditingProduct}
                setIsAddingProduct={setIsAddingProduct}
                onSave={handleSaveProduct}
                onDelete={handleDeleteProduct}
                onToggleVisibility={handleToggleProductVisibility}
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
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ productsCount, certificatesCount, visibleProductsCount }: any) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-2'>Dashboard Overview</h2>
        <p className='text-slate-600'>Manage your website content and settings</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
            <div className='w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center'>
              <Eye className='w-6 h-6 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-900'>{visibleProductsCount}</p>
              <p className='text-sm text-slate-600'>Visible Products</p>
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
      </div>

      <div className='bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl p-6 text-white'>
        <h3 className='text-xl font-bold mb-2'>Quick Actions</h3>
        <p className='text-teal-50 mb-4'>Use the sidebar to navigate to different sections and manage your content.</p>
        <div className='flex flex-wrap gap-3'>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Add Products</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Update Contact</span>
          <span className='px-3 py-1 bg-white/20 rounded-full text-sm'>Manage Certificates</span>
        </div>
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab({ products, editingProduct, isAddingProduct, setEditingProduct, setIsAddingProduct, onSave, onDelete, onToggleVisibility }: any) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    image: '',
    specs: [''],
    color: 'from-teal-500 to-cyan-400',
    visible: true
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
        color: 'from-teal-500 to-cyan-400',
        visible: true
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

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Color Gradient</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            >
              <option value='from-teal-500 to-cyan-400'>Teal to Cyan</option>
              <option value='from-blue-500 to-cyan-400'>Blue to Cyan</option>
              <option value='from-purple-500 to-pink-400'>Purple to Pink</option>
              <option value='from-amber-500 to-orange-400'>Amber to Orange</option>
              <option value='from-red-500 to-pink-400'>Red to Pink</option>
              <option value='from-slate-500 to-gray-600'>Slate to Gray</option>
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='visible'
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className='w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500'
            />
            <label htmlFor='visible' className='text-sm font-medium text-slate-700'>
              Visible on homepage
            </label>
          </div>

          <button
            type='submit'
            className='w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
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
                    <h3 className='font-bold text-slate-900'>{product.title}</h3>
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
                      onClick={() => onToggleVisibility(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.visible
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                      title={product.visible ? 'Visible' : 'Hidden'}
                    >
                      {product.visible ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
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
          className='w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
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
            className='w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-all'
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
