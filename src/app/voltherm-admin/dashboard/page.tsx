'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Mail, 
  Image as ImageIcon, 
  LogOut,
  Settings,
  Plus,
  Edit,
  Trash2,
  X,
  Filter,
  User,
  ArrowUpRight,
  FileText,
  AlertCircle,
  Save,
  Eye,
  EyeOff,
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

// Sidebar Components
const SidebarItem = ({ id, label, icon: Icon, activeTab, setActiveTab, badge }: any) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
        <span>{label}</span>
      </div>
      
      {badge > 0 && (
        <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
          isActive ? 'bg-white text-teal-600' : 'bg-red-500 text-white'
        }`}>
          {badge}
        </span>
      )}
      
      {isActive && (
        <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white/20" />
      )}
    </button>
  );
};

const SidebarSection = ({ title, children }: any) => (
  <div className="mb-6">
    <h3 className="mb-2 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
      {title}
    </h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inquiries' | 'certificates' | 'contact'>('overview');
  
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

  if (!mounted) return null;

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className='min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900'>
      
      {/* Top Header */}
      <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 shadow-lg shadow-slate-900/20'>
                <span className='text-lg font-bold text-teal-400'>V</span>
              </div>
              <div className="hidden sm:block">
                <h1 className='text-lg font-bold leading-none text-slate-900'>Voltherm</h1>
                <p className='mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500'>Admin Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                System Operational
              </div>
              <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600'
              >
                <LogOut className='h-4 w-4' />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          
          {/* Sidebar */}
          <div className='lg:col-span-3'>
            <div className='sticky top-24 rounded-2xl bg-white p-4 shadow-sm border border-slate-200'>
              
              {/* Profile Snippet */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <User className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-bold text-slate-900">Administrator</p>
                  <p className="truncate text-xs text-slate-500">admin@voltherm.com</p>
                </div>
              </div>

              {/* Navigation */}
              <nav>
                <SidebarSection title="Dashboard">
                  <SidebarItem id="overview" label="Overview" icon={LayoutDashboard} activeTab={activeTab} setActiveTab={setActiveTab} />
                </SidebarSection>

                <SidebarSection title="Inventory">
                  <SidebarItem id="products" label="Products" icon={Package} activeTab={activeTab} setActiveTab={setActiveTab} />
                </SidebarSection>

                <SidebarSection title="Communication">
                  <SidebarItem 
                    id="inquiries" 
                    label="Inbox" 
                    icon={Mail} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    badge={newInquiriesCount}
                  />
                  <SidebarItem id="contact" label="Contact Info" icon={Settings} activeTab={activeTab} setActiveTab={setActiveTab} />
                </SidebarSection>

                <SidebarSection title="Site Content">
                  <SidebarItem id="certificates" label="Certificates" icon={ImageIcon} activeTab={activeTab} setActiveTab={setActiveTab} />
                </SidebarSection>
              </nav>

              {/* Quick Actions Footer */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <button onClick={() => window.open('/', '_blank')} className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                  View Live Store <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-9 space-y-6'>
            {activeTab === 'overview' && (
              <OverviewTab 
                products={products}
                inquiries={inquiries}
                certificates={certificates}
                setActiveTab={setActiveTab}
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
                onSave={(product: Product) => {
                  const updated = editingProduct?.id 
                    ? products.map(p => p.id === product.id ? product : p)
                    : [...products, { ...product, id: Math.floor(Math.random() * 1000000000) }];
                  setProducts(updated);
                  saveProducts(updated);
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                  toast.success(editingProduct ? 'Product updated' : 'Product added');
                }}
                onDelete={(id: number) => {
                  if (confirm('Delete this product?')) {
                    const updated = products.filter(p => p.id !== id);
                    setProducts(updated);
                    saveProducts(updated);
                    toast.success('Product deleted');
                  }
                }}
                onToggleFeatured={(id: number) => {
                  const current = products.find(p => p.id === id);
                  const featuredCount = products.filter(p => p.featured).length;
                  if (!current?.featured && featuredCount >= 6) {
                    toast.error('Max 6 featured products');
                    return;
                  }
                  if (current?.featured && featuredCount <= 3) {
                    toast.error('Min 3 featured products');
                    return;
                  }
                  const updated = products.map(p => 
                    p.id === id ? { ...p, featured: !p.featured } : p
                  );
                  setProducts(updated);
                  saveProducts(updated);
                }}
                onToggleAvailability={(id: number) => {
                  const updated = products.map(p => 
                    p.id === id ? { ...p, available: !p.available } : p
                  );
                  setProducts(updated);
                  saveProducts(updated);
                  toast.success('Product availability updated');
                }}
              />
            )}
            
            {activeTab === 'contact' && contactInfo && (
              <ContactTab
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                onSave={() => {
                  saveContactInfo(contactInfo);
                  toast.success('Contact info saved');
                }}
              />
            )}
            
            {activeTab === 'certificates' && (
              <CertificatesTab
                certificates={certificates}
                editingCertificate={editingCertificate}
                isAddingCertificate={isAddingCertificate}
                setEditingCertificate={setEditingCertificate}
                setIsAddingCertificate={setIsAddingCertificate}
                onSave={(cert: Certificate) => {
                  const updated = editingCertificate?.id 
                    ? certificates.map(c => c.id === cert.id ? cert : c)
                    : [...certificates, { ...cert, id: `cert${Math.floor(Math.random() * 1000000000)}` }];
                  setCertificates(updated);
                  saveCertificates(updated);
                  setEditingCertificate(null);
                  setIsAddingCertificate(false);
                  toast.success(editingCertificate ? 'Certificate updated' : 'Certificate added');
                }}
                onDelete={(id: string) => {
                  if (confirm('Delete this certificate?')) {
                    const updated = certificates.filter(c => c.id !== id);
                    setCertificates(updated);
                    saveCertificates(updated);
                    toast.success('Certificate deleted');
                  }
                }}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesTab
                inquiries={inquiries}
                onStatusChange={(id: string, status: Inquiry['status']) => {
                  updateInquiryStatus(id, status);
                  setInquiries(getInquiries());
                  toast.success('Status updated');
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

// Overview Tab
function OverviewTab({ products, inquiries, certificates, setActiveTab }: any) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="rounded-2xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
          <p className="text-slate-400 mt-1 mb-6 max-w-lg">You have {inquiries.length} total inquiries and {products.length} active products listed in your store.</p>
          <button onClick={() => setActiveTab('products')} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-6 rounded-lg transition-colors">Manage Inventory</button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-teal-500/20 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => setActiveTab('inquiries')} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors"><Mail className="w-6 h-6 text-amber-600"/></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{inquiries.length}</p>
          <p className="text-sm font-medium text-slate-500">Inquiries</p>
        </div>
        <div onClick={() => setActiveTab('products')} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors"><Package className="w-6 h-6 text-teal-600"/></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{products.length}</p>
          <p className="text-sm font-medium text-slate-500">Products</p>
        </div>
        <div onClick={() => setActiveTab('certificates')} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"><ImageIcon className="w-6 h-6 text-blue-600"/></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{certificates.length}</p>
          <p className="text-sm font-medium text-slate-500">Certificates</p>
        </div>
      </div>
    </div>
  );
}

// Products Tab
function ProductsTab({ products, categories, mainCategories, editingProduct, isAddingProduct, setEditingProduct, setIsAddingProduct, onSave, onDelete, onToggleFeatured, onToggleAvailability }: any) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: '',
    description: '',
    image: '',
    specs: [''],
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

  if (editingProduct || isAddingProduct) {
    return (
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-slate-900'>
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h3>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddingProduct(false);
            }}
            className='text-slate-400 hover:text-slate-600'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }} className='space-y-4'>
          <input
            type='text'
            placeholder='Product Title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            required
          />

          <textarea
            placeholder='Description'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            required
          />

          <input
            type='url'
            placeholder='Image URL'
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            required
          />

          <input
            type='text'
            placeholder='Specs (comma-separated)'
            value={formData.specs.join(', ')}
            onChange={(e) => setFormData({ ...formData, specs: e.target.value.split(',').map(s => s.trim()) })}
            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
          />

          <div className='grid grid-cols-3 gap-4'>
            <input type='text' placeholder='Capacity' value={formData.capacity || ''} onChange={(e) => setFormData({ ...formData, capacity: e.target.value || undefined })} className='px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
            <input type='text' placeholder='Voltage' value={formData.voltage || ''} onChange={(e) => setFormData({ ...formData, voltage: e.target.value || undefined })} className='px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
            <input type='number' placeholder='Price' value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })} className='px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
          </div>

          <div>
            <div className='flex items-center justify-between mb-2'>
              <label className='text-sm font-medium text-slate-700'>Technical Specs (Max 6)</label>
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
                className='text-sm px-3 py-1 bg-teal-100 text-teal-600 rounded hover:bg-teal-200 transition-colors'
              >
                + Add
              </button>
            </div>
            <div className='space-y-2'>
              {(formData.technicalSpecs || []).map((spec, idx) => (
                <div key={idx} className='flex gap-2'>
                  <input type='text' placeholder='Key' value={spec.key} onChange={(e) => { const updated = [...(formData.technicalSpecs || [])]; updated[idx] = { ...updated[idx], key: e.target.value }; setFormData({ ...formData, technicalSpecs: updated }); }} className='flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
                  <input type='text' placeholder='Value' value={spec.value} onChange={(e) => { const updated = [...(formData.technicalSpecs || [])]; updated[idx] = { ...updated[idx], value: e.target.value }; setFormData({ ...formData, technicalSpecs: updated }); }} className='flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
                  <button type='button' onClick={() => { const updated = (formData.technicalSpecs || []).filter((_, i) => i !== idx); setFormData({ ...formData, technicalSpecs: updated }); }} className='px-3 py-2 text-red-600 hover:text-red-700'>×</button>
                </div>
              ))}
            </div>
          </div>

          <select
            value={formData.subCategoryId || formData.categoryId || ''}
            onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value || undefined, categoryId: e.target.value || undefined })}
            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500'
          >
            <option value=''>No Sub-Category</option>
            {mainCategories.map((mainCat: MainCategory) => {
              const subCats = categories.filter((c: SubCategory) => c.mainCategoryId === mainCat.id);
              return (
                <optgroup key={mainCat.id} label={mainCat.name}>
                  {subCats.map((subCat: SubCategory) => (
                    <option key={subCat.id} value={subCat.id}>{subCat.icon} {subCat.name}</option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <label className='flex items-center gap-2 text-slate-700'>
            <input type='checkbox' checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className='w-4 h-4' />
            <span className='text-sm'>Featured on homepage</span>
          </label>

          <button type='submit' className='w-full py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-medium rounded-lg hover:from-teal-700 hover:to-cyan-700'>
            Save Product
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Products ({products.length})</h2>
          <p className='text-slate-600 text-sm'>Manage your product catalog</p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium'
        >
          <Plus className='w-4 h-4' />
          Add Product
        </button>
      </div>

      <div className='grid gap-4'>
        {products.map((product: Product) => (
          <div key={product.id} className='bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all'>
            <div className='flex items-start gap-4'>
              <img src={product.image} alt={product.title} className='w-20 h-20 object-cover rounded-lg' />
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
                    <p className='text-slate-600 text-sm mt-1'>{product.description}</p>
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {product.specs.map((spec, idx) => (
                        <span key={idx} className='px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded'>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button onClick={() => onToggleFeatured(product.id)} className={`p-2 rounded transition-colors ${product.featured ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`} title={product.featured ? 'Featured on homepage slider' : 'Not featured on homepage'}>
                      <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-600' : ''}`} />
                    </button>
                    <button onClick={() => onToggleAvailability(product.id)} className={`p-2 rounded transition-colors ${product.available !== false ? 'bg-teal-100 text-teal-600 hover:bg-teal-200' : 'bg-amber-100 text-amber-600 hover:bg-amber-200'}`} title={product.available !== false ? 'Available in store' : 'Unavailable in store'}>
                      {product.available !== false ? <Package className='w-4 h-4' /> : <Package className='w-4 h-4 opacity-50' />}
                    </button>
                    <button onClick={() => setEditingProduct(product)} className='p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'>
                      <Edit className='w-4 h-4' />
                    </button>
                    <button onClick={() => onDelete(product.id)} className='p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'>
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

// Contact Tab
function ContactTab({ contactInfo, setContactInfo, onSave }: any) {
  return (
    <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
      <h2 className='text-2xl font-bold text-slate-900 mb-6'>Contact Information</h2>

      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-3'>Sales Contact</h3>
          <div className='space-y-2'>
            <input type='email' value={contactInfo.sales.email} onChange={(e) => setContactInfo({ ...contactInfo, sales: { ...contactInfo.sales, email: e.target.value } })} placeholder='Email' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <input type='tel' value={contactInfo.sales.phone} onChange={(e) => setContactInfo({ ...contactInfo, sales: { ...contactInfo.sales, phone: e.target.value } })} placeholder='Phone' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-3'>Business Contact</h3>
          <input type='email' value={contactInfo.business.email} onChange={(e) => setContactInfo({ ...contactInfo, business: { ...contactInfo.business, email: e.target.value } })} placeholder='Email' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
        </div>

        <div>
          <h3 className='text-lg font-semibold text-slate-900 mb-3'>Support Contact</h3>
          <input type='tel' value={contactInfo.support.phone} onChange={(e) => setContactInfo({ ...contactInfo, support: { ...contactInfo.support, phone: e.target.value } })} placeholder='Phone' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
        </div>

        <button onClick={onSave} className='w-full py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-medium rounded-lg hover:from-teal-700 hover:to-cyan-700'>
          <Save className='w-4 h-4 inline mr-2' />
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Certificates Tab
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
      setFormData({ id: '', src: '', alt: '', title: '' });
    }
  }, [editingCertificate, isAddingCertificate]);

  if (editingCertificate || isAddingCertificate) {
    return (
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h3 className='text-xl font-bold text-slate-900 mb-6'>
          {editingCertificate ? 'Edit Certificate' : 'Add Certificate'}
        </h3>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className='space-y-4'>
          <input type='text' placeholder='Title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' required />
          <input type='text' placeholder='Alt Text' value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' required />
          <input type='text' placeholder='Image Path' value={formData.src} onChange={(e) => setFormData({ ...formData, src: e.target.value })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' required />
          <button type='submit' className='w-full py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-medium rounded-lg'>
            Save Certificate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-slate-900'>Certificates</h2>
        <button onClick={() => setIsAddingCertificate(true)} className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium'>
          <Plus className='w-4 h-4' />
          Add
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {certificates.map((cert: Certificate) => (
          <div key={cert.id} className='bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all'>
            <img src={cert.src} alt={cert.alt} className='w-full h-32 object-cover rounded-lg mb-3' />
            <h3 className='font-bold text-slate-900 text-sm'>{cert.title}</h3>
            <div className='flex gap-2 mt-3'>
              <button onClick={() => setEditingCertificate(cert)} className='flex-1 py-2 bg-blue-100 text-blue-600 rounded text-xs font-medium'>Edit</button>
              <button onClick={() => onDelete(cert.id)} className='flex-1 py-2 bg-red-100 text-red-600 rounded text-xs font-medium'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inquiries Tab
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
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Inbox</h2>
          <p className='text-slate-600 text-sm'>Manage customer inquiries</p>
        </div>
        <div className='flex gap-2'>
          {['all', 'new', 'in-progress', 'completed', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-teal-600 text-white'
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
                    {inquiry.customerPhone && <span>{inquiry.customerPhone}</span>}
                    {inquiry.companyName && <span>Company: {inquiry.companyName}</span>}
                  </div>
                  <p className='text-xs text-slate-500 mt-2'>
                    {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'N/A'}
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
              {inquiry.products && inquiry.products.length > 0 && (
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
              )}

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
              
              {selectedInquiry.customerPhone && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Phone</label>
                  <p className='text-slate-900'>{selectedInquiry.customerPhone}</p>
                </div>
              )}

              {selectedInquiry.companyName && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Company</label>
                  <p className='text-slate-900'>{selectedInquiry.companyName}</p>
                </div>
              )}

              {selectedInquiry.createdAt && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Inquiry Date</label>
                  <p className='text-slate-900'>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
              )}

              <div>
                <label className='text-sm font-semibold text-slate-700'>Status</label>
                <p className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedInquiry.status)}`}>
                  {selectedInquiry.status.replace('-', ' ').toUpperCase()}
                </p>
              </div>

              {selectedInquiry.products && selectedInquiry.products.length > 0 && (
                <div>
                  <label className='text-sm font-semibold text-slate-700'>Products Interested In</label>
                  <ul className='list-disc list-inside text-slate-900'>
                    {selectedInquiry.products.map((product) => (
                      <li key={product.id}>{product.title}</li>
                    ))}
                  </ul>
                </div>
              )}

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

              {/* Status Actions */}
              <div className='flex gap-2 pt-3 border-t border-slate-100 mt-6'>
                {selectedInquiry.status !== 'in-progress' && (
                  <button
                    onClick={() => { onStatusChange(selectedInquiry.id, 'in-progress'); setSelectedInquiry(null); }}
                    className='px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700'
                  >
                    In Progress
                  </button>
                )}
                {selectedInquiry.status !== 'completed' && (
                  <button
                    onClick={() => { onStatusChange(selectedInquiry.id, 'completed'); setSelectedInquiry(null); }}
                    className='px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700'
                  >
                    Complete
                  </button>
                )}
                {selectedInquiry.status !== 'rejected' && (
                  <button
                    onClick={() => { onStatusChange(selectedInquiry.id, 'rejected'); setSelectedInquiry(null); }}
                    className='px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700'
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
