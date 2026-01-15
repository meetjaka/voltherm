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
  Star,
  MapPin
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
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inquiries' | 'certificates' | 'contact' | 'settings'>('overview');
  
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

                <SidebarSection title="Account">
                  <SidebarItem id="settings" label="Settings" icon={Settings} activeTab={activeTab} setActiveTab={setActiveTab} />
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

            {activeTab === 'settings' && (
              <SettingsTab />
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

// Settings Tab
function SettingsTab() {
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  // Change Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Change Username States
  const [verifyPassword, setVerifyPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  
  // Load current credentials from localStorage (temporary mock)
  useEffect(() => {
    const storedId = localStorage.getItem('admin_id') || 'admin123';
    const storedPass = localStorage.getItem('admin_password') || '123456789';
    setAdminId(storedId);
    setAdminPass(storedPass);
  }, []);
  
  const handleChangePassword = () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }
    
    if (currentPassword !== adminPass) {
      toast.error('Current password is incorrect');
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    // Save new password (temporary localStorage - will be replaced with API)
    localStorage.setItem('admin_password', newPassword);
    setAdminPass(newPassword);
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    toast.success('Password changed successfully!');
  };
  
  const handleChangeUsername = () => {
    // Validation
    if (!verifyPassword || !newUsername) {
      toast.error('All fields are required');
      return;
    }
    
    if (verifyPassword !== adminPass) {
      toast.error('Password is incorrect');
      return;
    }
    
    if (newUsername.length < 3) {
      toast.error('Username must be at least 3 characters');
      return;
    }
    
    if (newUsername === adminId) {
      toast.error('New username is same as current');
      return;
    }
    
    // Save new username (temporary localStorage - will be replaced with API)
    localStorage.setItem('admin_id', newUsername);
    setAdminId(newUsername);
    
    // Clear form
    setVerifyPassword('');
    setNewUsername('');
    
    toast.success('Username changed successfully!');
  };
  
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h1 className='text-3xl font-bold text-slate-900'>Account Settings</h1>
        <p className='text-slate-600 mt-2'>Manage your admin credentials and security</p>
      </div>
      
      {/* Current Credentials Display */}
      <div className='bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200 p-6'>
        <h2 className='text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'>
          <User className='w-5 h-5 text-teal-600' />
          Current Credentials
        </h2>
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='bg-white rounded-lg p-4 border border-slate-200'>
            <p className='text-xs text-slate-600 mb-1'>Username</p>
            <p className='text-lg font-bold text-slate-900'>{adminId}</p>
          </div>
          <div className='bg-white rounded-lg p-4 border border-slate-200'>
            <p className='text-xs text-slate-600 mb-1'>Password</p>
            <p className='text-lg font-bold text-slate-900'>••••••••</p>
          </div>
        </div>
      </div>
      
      {/* Change Password Section */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Change Password</h2>
        <div className='space-y-4 max-w-md'>
          {/* Current Password */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Current Password</label>
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder='Enter current password'
                className='w-full px-4 py-3 pr-12 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
              <button
                type='button'
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
              >
                {showCurrentPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>
          
          {/* New Password */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>New Password</label>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password (min 8 characters)'
                className='w-full px-4 py-3 pr-12 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
              <button
                type='button'
                onClick={() => setShowNewPassword(!showNewPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
              >
                {showNewPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
            {newPassword && newPassword.length < 8 && (
              <p className='text-xs text-red-600 mt-1'>Password must be at least 8 characters</p>
            )}
          </div>
          
          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Confirm New Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm new password'
              className='w-full px-4 py-3 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className='text-xs text-red-600 mt-1'>Passwords do not match</p>
            )}
          </div>
          
          <button
            onClick={handleChangePassword}
            className='w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2'
          >
            <Save className='w-5 h-5' />
            Update Password
          </button>
        </div>
      </div>
      
      {/* Change Username Section */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Change Username</h2>
        <div className='space-y-4 max-w-md'>
          {/* Verify Password */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Verify Password</label>
            <div className='relative'>
              <input
                type={showVerifyPassword ? 'text' : 'password'}
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder='Enter your password to verify'
                className='w-full px-4 py-3 pr-12 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
              <button
                type='button'
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
              >
                {showVerifyPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>
          
          {/* New Username */}
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>New Username</label>
            <input
              type='text'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder='Enter new username (min 3 characters)'
              className='w-full px-4 py-3 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
            {newUsername && newUsername.length < 3 && (
              <p className='text-xs text-red-600 mt-1'>Username must be at least 3 characters</p>
            )}
          </div>
          
          <button
            onClick={handleChangeUsername}
            className='w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2'
          >
            <Save className='w-5 h-5' />
            Update Username
          </button>
        </div>
      </div>
      
      {/* Info Notice */}
      <div className='bg-amber-50 border border-amber-200 rounded-2xl p-6'>
        <div className='flex gap-3'>
          <AlertCircle className='w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' />
          <div>
            <h3 className='font-semibold text-amber-900 mb-1'>Important Security Note</h3>
            <p className='text-sm text-amber-800'>
              Currently using temporary localStorage storage. Once backend is ready, credentials will be securely stored with BCrypt hashing and proper authentication endpoints.
            </p>
          </div>
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProducts = products.filter((p: Product) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (editingProduct || isAddingProduct) {
    return (
      <div className='bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-4xl'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-2xl font-bold text-slate-900'>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <p className='text-slate-500 text-sm mt-1'>Fill in all required fields to create or update a product</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddingProduct(false);
            }}
            className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }} className='space-y-6'>
          {/* Basic Information */}
          <div className='border-b border-slate-200 pb-6'>
            <h4 className='text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider'>Basic Information</h4>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Product Title *</label>
                <input
                  type='text'
                  placeholder='Enter product name'
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Description *</label>
                <textarea
                  placeholder='Enter detailed product description'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Image URL *</label>
                <input
                  type='url'
                  placeholder='https://example.com/product-image.jpg'
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  required
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className='border-b border-slate-200 pb-6'>
            <h4 className='text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider'>Specifications</h4>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Quick Specs (comma-separated)</label>
                <input
                  type='text'
                  placeholder='e.g., Portable, Compact, Lightweight'
                  value={formData.specs.join(', ')}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Capacity</label>
                  <input type='text' placeholder='e.g., 75 kWh' value={formData.capacity || ''} onChange={(e) => setFormData({ ...formData, capacity: e.target.value || undefined })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Voltage</label>
                  <input type='text' placeholder='e.g., 400V' value={formData.voltage || ''} onChange={(e) => setFormData({ ...formData, voltage: e.target.value || undefined })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Price</label>
                  <input type='number' placeholder='e.g., 50000' value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })} className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className='border-b border-slate-200 pb-6'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='text-sm font-bold text-slate-700 uppercase tracking-wider'>Technical Specifications (Max 6)</h4>
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
                className='flex items-center gap-1 px-3 py-1.5 text-sm bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium'
              >
                <Plus className='w-4 h-4' /> Add Spec
              </button>
            </div>
            <div className='space-y-3'>
              {(formData.technicalSpecs || []).map((spec, idx) => (
                <div key={idx} className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='e.g., Energy Density'
                    value={spec.key}
                    onChange={(e) => {
                      const updated = [...(formData.technicalSpecs || [])];
                      updated[idx] = { ...updated[idx], key: e.target.value };
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    className='flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                  <input
                    type='text'
                    placeholder='e.g., 250 Wh/kg'
                    value={spec.value}
                    onChange={(e) => {
                      const updated = [...(formData.technicalSpecs || [])];
                      updated[idx] = { ...updated[idx], value: e.target.value };
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    className='flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      const updated = (formData.technicalSpecs || []).filter((_, i) => i !== idx);
                      setFormData({ ...formData, technicalSpecs: updated });
                    }}
                    className='px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
              {(!formData.technicalSpecs || formData.technicalSpecs.length === 0) && (
                <p className='text-sm text-slate-500 italic text-center py-2'>No technical specs added yet</p>
              )}
            </div>
          </div>

          {/* Category & Status */}
          <div className='border-b border-slate-200 pb-6'>
            <h4 className='text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider'>Category & Status</h4>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Category</label>
                <select
                  value={formData.subCategoryId || formData.categoryId || ''}
                  onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value || undefined, categoryId: e.target.value || undefined })}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                >
                  <option value=''>Select a category...</option>
                  {mainCategories.map((mainCat: MainCategory) => {
                    const subCats = categories.filter((c: SubCategory) => c.mainCategoryId === mainCat.id);
                    if (subCats.length === 0) return null;
                    return (
                      <optgroup key={mainCat.id} label={mainCat.name}>
                        {subCats.map((subCat: SubCategory) => (
                          <option key={subCat.id} value={subCat.id}>{subCat.icon} {subCat.name}</option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <label className='flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors'>
                  <input type='checkbox' checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className='w-4 h-4 text-teal-600 border-slate-300 rounded' />
                  <div>
                    <span className='font-medium text-slate-700'>⭐ Featured</span>
                    <p className='text-xs text-slate-500'>Show on homepage slider</p>
                  </div>
                </label>

                <label className='flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors'>
                  <input type='checkbox' checked={formData.available !== false} onChange={(e) => setFormData({ ...formData, available: e.target.checked ? true : false })} className='w-4 h-4 text-teal-600 border-slate-300 rounded' />
                  <div>
                    <span className='font-medium text-slate-700'>📦 Available</span>
                    <p className='text-xs text-slate-500'>Product is in stock</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className='flex gap-3 pt-6'>
            <button
              type='submit'
              className='flex-1 py-3 px-4 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2'
            >
              <Save className='w-4 h-4' />
              Save Product
            </button>
            <button
              type='button'
              onClick={() => {
                setEditingProduct(null);
                setIsAddingProduct(false);
              }}
              className='px-4 py-3 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-slate-900'>Products</h2>
          <p className='text-slate-600 text-sm mt-1'>{filteredProducts.length} of {products.length} products</p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className='flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all font-medium'
        >
          <Plus className='w-4 h-4' />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className='bg-white rounded-xl border border-slate-200 p-4'>
        <input
          type='text'
          placeholder='Search products by name or description...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className='bg-white rounded-xl border border-slate-200 p-12 text-center'>
          <Package className='w-16 h-16 text-slate-300 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-slate-900 mb-2'>No products found</h3>
          <p className='text-slate-600'>{searchQuery ? 'Try a different search term' : 'Create your first product to get started'}</p>
        </div>
      ) : (
        <div className='space-y-2'>
          {filteredProducts.map((product: Product) => (
            <div key={product.id} className='bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all overflow-hidden'>
              <div className='flex items-center gap-3 p-4'>
                {/* Product Image - Compact */}
                <div className='relative shrink-0'>
                  <div className='w-24 h-24 rounded-lg border-3 border-cyan-400 overflow-hidden bg-slate-50 shadow-md'>
                    <img src={product.image} alt={product.title} className='w-full h-full object-cover' />
                  </div>
                  {product.featured && (
                    <div className='absolute -top-1 -right-1 bg-amber-400 text-white p-1 rounded-full shadow-md'>
                      <Star className='w-3.5 h-3.5 fill-current' />
                    </div>
                  )}
                </div>

                {/* Product Details - Compact */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-baseline gap-2 mb-1'>
                    <h3 className='font-bold text-slate-900 text-sm truncate'>{product.title}</h3>
                    {product.available === false && (
                      <span className='px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full whitespace-nowrap shrink-0'>⚠️ Unavailable</span>
                    )}
                  </div>
                  <p className='text-slate-600 text-xs line-clamp-1 mb-2'>{product.description}</p>

                  {/* Category & Specs */}
                  <div className='flex items-center gap-2 flex-wrap mb-2'>
                    {(product.subCategoryId || product.categoryId) && (() => {
                      const subCat = categories.find((c: SubCategory) => c.id === (product.subCategoryId || product.categoryId));
                      if (!subCat) return null;
                      return (
                        <span className='px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full'>
                          {subCat.icon} {subCat.name}
                        </span>
                      );
                    })()}
                    {product.specs.slice(0, 2).map((spec, idx) => (
                      <span key={idx} className='px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded'>
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Price & Specs - Compact */}
                  <div className='flex items-center gap-2 text-xs flex-wrap'>
                    {product.price && (
                      <span className='px-2 py-0.5 bg-green-50 text-green-700 rounded font-bold'>💰 PKR {(product.price / 1000).toFixed(0)}K</span>
                    )}
                    {product.capacity && (
                      <span className='px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium'>⚡ {product.capacity}</span>
                    )}
                    {product.voltage && (
                      <span className='px-2 py-0.5 bg-purple-50 text-purple-700 rounded font-medium'>🔌 {product.voltage}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Compact */}
                <div className='flex gap-1.5 shrink-0'>
                  <button
                    onClick={() => onToggleFeatured(product.id)}
                    className={`w-9 h-9 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center text-sm shadow-sm ${
                      product.featured
                        ? 'bg-amber-400 text-white hover:bg-amber-500'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                    title={product.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    ⭐
                  </button>
                  <button
                    onClick={() => onToggleAvailability(product.id)}
                    className={`w-9 h-9 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center shadow-sm ${
                      product.available !== false
                        ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                        : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                    }`}
                    title={product.available !== false ? 'Mark unavailable' : 'Mark available'}
                  >
                    <Package className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className='w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                    title='Edit product'
                  >
                    <Edit className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this product?')) onDelete(product.id);
                    }}
                    className='w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                    title='Delete product'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Contact Tab
function ContactTab({ contactInfo, setContactInfo, onSave }: any) {
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [isAddingBranch, setIsAddingBranch] = useState(false);

  const handleAddBranch = () => {
    const newBranch = {
      id: `branch${Date.now()}`,
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      mapUrl: ''
    };
    setEditingBranch(newBranch);
    setIsAddingBranch(true);
  };

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Extract URL from iframe HTML if pasted
    const iframeMatch = url.match(/src=["']([^"']+)["']/);
    if (iframeMatch) {
      return iframeMatch[1];
    }
    
    // If already an embed URL, return as is
    if (url.includes('google.com/maps/embed')) return url;
    
    // Try to extract coordinates or place ID from various Google Maps URL formats
    try {
      // Handle maps.app.goo.gl short URLs - can't convert without API, guide user
      if (url.includes('maps.app.goo.gl') || url.includes('goo.gl')) {
        return ''; // Return empty, will show instruction
      }
      
      // Handle regular google.com/maps URLs with coordinates
      const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        const lat = coordMatch[1];
        const lng = coordMatch[2];
        return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin`;
      }
      
      // Handle place URLs
      const placeMatch = url.match(/place\/([^\/]+)/);
      if (placeMatch) {
        const placeName = encodeURIComponent(placeMatch[1]);
        return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${placeName}`;
      }
    } catch (e) {
      console.error('Error converting map URL:', e);
    }
    
    return url;
  };

  const handleSaveBranch = () => {
    if (!editingBranch) return;
    
    // Convert map URL if needed
    const processedBranch = {
      ...editingBranch,
      mapUrl: convertToEmbedUrl(editingBranch.mapUrl)
    };
    
    const branches = contactInfo.branches || [];
    if (isAddingBranch) {
      setContactInfo({ 
        ...contactInfo, 
        branches: [...branches, processedBranch] 
      });
    } else {
      setContactInfo({
        ...contactInfo,
        branches: branches.map((b: any) => b.id === processedBranch.id ? processedBranch : b)
      });
    }
    setEditingBranch(null);
    setIsAddingBranch(false);
  };

  const handleDeleteBranch = (id: string) => {
    if (confirm('Delete this branch?')) {
      setContactInfo({
        ...contactInfo,
        branches: (contactInfo.branches || []).filter((b: any) => b.id !== id)
      });
    }
  };

  if (editingBranch) {
    return (
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-slate-900'>
            {isAddingBranch ? 'Add Branch' : 'Edit Branch'}
          </h3>
          <button onClick={() => { setEditingBranch(null); setIsAddingBranch(false); }} className='text-slate-600 hover:text-slate-900'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='space-y-4'>
          <input type='text' value={editingBranch.name} onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })} placeholder='Branch Name' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <input type='text' value={editingBranch.addressLine1} onChange={(e) => setEditingBranch({ ...editingBranch, addressLine1: e.target.value })} placeholder='Address Line 1' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <input type='text' value={editingBranch.addressLine2} onChange={(e) => setEditingBranch({ ...editingBranch, addressLine2: e.target.value })} placeholder='Address Line 2' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <div className='grid grid-cols-3 gap-4'>
            <input type='text' value={editingBranch.city} onChange={(e) => setEditingBranch({ ...editingBranch, city: e.target.value })} placeholder='City' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <input type='text' value={editingBranch.state} onChange={(e) => setEditingBranch({ ...editingBranch, state: e.target.value })} placeholder='State' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <input type='text' value={editingBranch.pincode} onChange={(e) => setEditingBranch({ ...editingBranch, pincode: e.target.value })} placeholder='Pincode' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <input type='tel' value={editingBranch.phone} onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })} placeholder='Phone' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Google Maps Embed URL</label>
            <textarea 
              value={editingBranch.mapUrl} 
              onChange={(e) => setEditingBranch({ ...editingBranch, mapUrl: e.target.value })} 
              placeholder='Paste the entire iframe code OR just the URL...' 
              className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-mono text-xs'
              rows={3}
            />
            <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-xs text-blue-900 font-semibold mb-2'>📍 How to get the map:</p>
              <ol className='text-xs text-blue-800 space-y-1 ml-4 list-decimal'>
                <li>Open <a href='https://www.google.com/maps' target='_blank' className='underline'>Google Maps</a></li>
                <li>Search for your location</li>
                <li>Click the <strong>Share</strong> button</li>
                <li>Go to the <strong>Embed a map</strong> tab</li>
                <li>Click <strong>COPY HTML</strong></li>
                <li>Paste the <strong>entire code</strong> here (we'll extract the URL automatically)</li>
              </ol>
            </div>
          </div>
          <button onClick={handleSaveBranch} className='w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700'>
            Save Branch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Contact Information */}
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
        </div>
      </div>

      {/* Social Media Links */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Social Media Links</h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              <span className='inline-flex items-center gap-2'>
                <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 24 24'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>
                Facebook
              </span>
            </label>
            <input type='url' value={contactInfo.socialMedia?.facebook || ''} onChange={(e) => setContactInfo({ ...contactInfo, socialMedia: { ...contactInfo.socialMedia, facebook: e.target.value } })} placeholder='https://www.facebook.com/yourpage' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              <span className='inline-flex items-center gap-2'>
                <svg className='w-5 h-5 text-pink-600' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/></svg>
                Instagram
              </span>
            </label>
            <input type='url' value={contactInfo.socialMedia?.instagram || ''} onChange={(e) => setContactInfo({ ...contactInfo, socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value } })} placeholder='https://www.instagram.com/yourprofile' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              <span className='inline-flex items-center gap-2'>
                <svg className='w-5 h-5 text-blue-700' fill='currentColor' viewBox='0 0 24 24'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>
                LinkedIn
              </span>
            </label>
            <input type='url' value={contactInfo.socialMedia?.linkedin || ''} onChange={(e) => setContactInfo({ ...contactInfo, socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value } })} placeholder='https://www.linkedin.com/company/yourcompany' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              <span className='inline-flex items-center gap-2'>
                <svg className='w-5 h-5 text-sky-500' fill='currentColor' viewBox='0 0 24 24'><path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/></svg>
                Twitter (X)
              </span>
            </label>
            <input type='url' value={contactInfo.socialMedia?.twitter || ''} onChange={(e) => setContactInfo({ ...contactInfo, socialMedia: { ...contactInfo.socialMedia, twitter: e.target.value } })} placeholder='https://twitter.com/yourhandle' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              <span className='inline-flex items-center gap-2'>
                <svg className='w-5 h-5 text-orange-600' fill='currentColor' viewBox='0 0 24 24'><path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v2h-2V7zm0 4h2v8h-2v-8z'/></svg>
                IndiaMART
              </span>
            </label>
            <input type='url' value={contactInfo.socialMedia?.indiamart || ''} onChange={(e) => setContactInfo({ ...contactInfo, socialMedia: { ...contactInfo.socialMedia, indiamart: e.target.value } })} placeholder='https://www.indiamart.com/yourcompany' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
        </div>
      </div>

      {/* Mdiv>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Google Maps Embed URL</label>
            <input type='text' value={contactInfo.mainAddress?.mapUrl || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, mapUrl: e.target.value } })} placeholder='Paste embed URL here...' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-xs text-blue-900 font-semibold mb-2'>📍 How to get the embed URL:</p>
              <ol className='text-xs text-blue-800 space-y-1 ml-4 list-decimal'>
                <li>Open <a href='https://www.google.com/maps' target='_blank' className='underline'>Google Maps</a></li>
                <li>Search for your location</li>
                <li>Click <strong>Share</strong> → <strong>Embed a map</strong> tab</li>
                <li>Copy the src="..." URL from the HTML code</li>
              </ol>
            </div>
          </div
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Main Office Address</h2>
        <div className='space-y-4'>
          <input type='text' value={contactInfo.mainAddress?.companyName || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, companyName: e.target.value } })} placeholder='Company Name' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <input type='text' value={contactInfo.mainAddress?.addressLine1 || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, addressLine1: e.target.value } })} placeholder='Address Line 1' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <input type='text' value={contactInfo.mainAddress?.addressLine2 || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, addressLine2: e.target.value } })} placeholder='Address Line 2' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <div className='grid grid-cols-3 gap-4'>
            <input type='text' value={contactInfo.mainAddress?.city || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, city: e.target.value } })} placeholder='City' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <input type='text' value={contactInfo.mainAddress?.state || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, state: e.target.value } })} placeholder='State' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
            <input type='text' value={contactInfo.mainAddress?.pincode || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, pincode: e.target.value } })} placeholder='Pincode' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          </div>
          <input type='tel' value={contactInfo.mainAddress?.phone || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, phone: e.target.value } })} placeholder='Phone' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          <input type='text' value={contactInfo.mainAddress?.gst || ''} onChange={(e) => setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, gst: e.target.value } })} placeholder='GST Number' className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' />
          
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>Google Maps Embed</label>
            <textarea 
              value={contactInfo.mainAddress?.mapUrl || ''} 
              onChange={(e) => {
                const url = e.target.value;
                const extractedUrl = url.match(/src=["']([^"']+)["']/)?.[1] || url;
                setContactInfo({ ...contactInfo, mainAddress: { ...contactInfo.mainAddress, mapUrl: extractedUrl } });
              }} 
              placeholder='Paste the entire iframe code here...' 
              className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-mono text-xs'
              rows={3}
            />
            <div className='mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-xs text-blue-900 font-semibold mb-2'>📍 Paste the entire iframe HTML code above</p>
              <p className='text-xs text-blue-800'>The URL will be extracted automatically from the code.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Offices */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-slate-900'>Branch Offices</h2>
          <button onClick={handleAddBranch} className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium'>
            <Plus className='w-4 h-4' />
            Add Branch
          </button>
        </div>
        
        {(!contactInfo.branches || contactInfo.branches.length === 0) ? (
          <div className='text-center py-12'>
            <MapPin className='w-16 h-16 text-slate-300 mx-auto mb-4' />
            <p className='text-slate-600'>No branch offices added yet</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {contactInfo.branches.map((branch: any) => (
              <div key={branch.id} className='border border-slate-200 rounded-lg p-4 hover:border-teal-300 transition-all'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-bold text-slate-900 mb-2'>{branch.name}</h3>
                    <p className='text-sm text-slate-600'>{branch.addressLine1}</p>
                    <p className='text-sm text-slate-600'>{branch.addressLine2}</p>
                    <p className='text-sm text-slate-600'>{branch.city}, {branch.state} - {branch.pincode}</p>
                    <p className='text-sm text-slate-900 font-medium mt-2'>{branch.phone}</p>
                  </div>
                  <div className='flex gap-2'>
                    <button onClick={() => setEditingBranch(branch)} className='p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200'>
                      <Edit className='w-4 h-4' />
                    </button>
                    <button onClick={() => handleDeleteBranch(branch.id)} className='p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200'>
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <button onClick={onSave} className='w-full py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-medium rounded-lg hover:from-teal-700 hover:to-cyan-700'>
        <Save className='w-4 h-4 inline mr-2' />
        Save All Changes
      </button>
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
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-slate-900'>
            {editingCertificate ? 'Edit Certificate' : 'Add Certificate'}
          </h3>
          <button
            onClick={() => {
              setEditingCertificate(null);
              setIsAddingCertificate(false);
            }}
            className='text-slate-600 hover:text-slate-900'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
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
  const [viewMode, setViewMode] = useState<'compact' | 'large'>('compact');

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
        <div className='flex items-center gap-3'>
          {/* View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'compact' ? 'large' : 'compact')}
            className='w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center shadow-sm'
            title={`Switch to ${viewMode === 'compact' ? 'large' : 'compact'} view`}
          >
            {viewMode === 'compact' ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
          </button>

          {/* Status Filters */}
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
      ) : viewMode === 'compact' ? (
        // COMPACT VIEW
        <div className='space-y-2'>
          {filteredInquiries.map((inquiry: Inquiry) => (
            <div
              key={inquiry.id}
              className='bg-white rounded-lg border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all overflow-hidden'
            >
              <div className='flex items-center justify-between p-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h3 className='font-bold text-slate-900 text-sm truncate'>{inquiry.customerName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status === 'in-progress' ? 'Progress' : inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-slate-600 flex-wrap mb-1'>
                    <span className='flex items-center gap-1 truncate'>
                      <Mail className='w-3 h-3 shrink-0' />
                      {inquiry.customerEmail}
                    </span>
                    {inquiry.customerPhone && (
                      <span className='px-2 py-0.5 bg-slate-100 text-slate-700 rounded'>📞 {inquiry.customerPhone}</span>
                    )}
                  </div>
                  {inquiry.companyName && (
                    <p className='text-xs text-slate-500'>🏢 {inquiry.companyName}</p>
                  )}
                  {inquiry.products && inquiry.products.length > 0 && (
                    <div className='flex items-center gap-1 text-xs text-teal-700 mt-1'>
                      <span className='font-semibold'>📦 {inquiry.products.length} Product{inquiry.products.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons - Compact */}
                <div className='flex gap-1.5 shrink-0 ml-3'>
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className='w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                    title='View details'
                  >
                    <Eye className='w-4 h-4' />
                  </button>
                  {inquiry.status !== 'in-progress' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'in-progress')}
                      className='w-9 h-9 rounded-lg bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                      title='Mark in progress'
                    >
                      ⏳
                    </button>
                  )}
                  {inquiry.status !== 'completed' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'completed')}
                      className='w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                      title='Mark completed'
                    >
                      ✓
                    </button>
                  )}
                  {inquiry.status !== 'rejected' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'rejected')}
                      className='w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                      title='Reject'
                    >
                      ✕
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry?')) onDelete(inquiry.id);
                    }}
                    className='w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110 flex items-center justify-center shadow-sm'
                    title='Delete inquiry'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // LARGE VIEW
        <div className='space-y-4'>
          {filteredInquiries.map((inquiry: Inquiry) => (
            <div
              key={inquiry.id}
              className='bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all overflow-hidden'
            >
              <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-bold text-slate-900 mb-1'>{inquiry.customerName}</h3>
                    <div className='flex items-center gap-3 text-sm text-slate-600 flex-wrap'>
                      <span className='flex items-center gap-1'>
                        <Mail className='w-4 h-4' />
                        {inquiry.customerEmail}
                      </span>
                      {inquiry.customerPhone && (
                        <span className='flex items-center gap-1'>📞 {inquiry.customerPhone}</span>
                      )}
                      {inquiry.companyName && (
                        <span className='flex items-center gap-1'>🏢 {inquiry.companyName}</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status === 'in-progress' ? 'In Progress' : inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                </div>

                {inquiry.createdAt && (
                  <p className='text-xs text-slate-500 mb-3'>📅 {new Date(inquiry.createdAt).toLocaleString()}</p>
                )}

                {inquiry.products && inquiry.products.length > 0 && (
                  <div className='mb-3'>
                    <p className='text-sm font-semibold text-slate-700 mb-2'>📦 Products Interested In:</p>
                    <div className='flex flex-wrap gap-2'>
                      {inquiry.products.map((product) => (
                        <span key={product.id} className='px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium'>
                          {product.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className='mb-4'>
                  <p className='text-sm font-semibold text-slate-700 mb-2'>Requirements:</p>
                  <p className='text-slate-700 bg-slate-50 rounded-lg p-3 text-sm whitespace-pre-wrap'>
                    {inquiry.requirements}
                  </p>
                </div>

                {inquiry.notes && (
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-slate-700 mb-2'>Admin Notes:</p>
                    <p className='text-slate-700 bg-slate-50 rounded-lg p-3 text-sm'>
                      {inquiry.notes}
                    </p>
                  </div>
                )}

                {/* Actions - Large View */}
                <div className='flex items-center gap-2 pt-3 border-t border-slate-200'>
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className='px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all font-medium text-sm flex items-center gap-2'
                  >
                    <Eye className='w-4 h-4' /> View Details
                  </button>
                  {inquiry.status !== 'in-progress' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'in-progress')}
                      className='px-4 py-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition-all font-medium text-sm'
                    >
                      In Progress
                    </button>
                  )}
                  {inquiry.status !== 'completed' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'completed')}
                      className='px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all font-medium text-sm'
                    >
                      Complete
                    </button>
                  )}
                  {inquiry.status !== 'rejected' && (
                    <button
                      onClick={() => onStatusChange(inquiry.id, 'rejected')}
                      className='px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium text-sm'
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry?')) onDelete(inquiry.id);
                    }}
                    className='px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium text-sm ml-auto flex items-center gap-2'
                  >
                    <Trash2 className='w-4 h-4' /> Delete
                  </button>
                </div>
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
