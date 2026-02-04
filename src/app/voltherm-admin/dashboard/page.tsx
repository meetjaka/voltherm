'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import CategoryIcon from '@/components/CategoryIcon';
import { checkAdminSession, clearAdminSession } from '@/lib/adminAuth';
import adminDataService from '@/lib/adminDataService';
import { apiService } from '@/lib/apiService';
import {
    type Certificate,
    type ContactInfo,
    type Inquiry,
    type MainCategory,
    type Product,
    type SubCategory
} from '@/lib/adminData';

import {
    AlertCircle,
    ArrowUpRight,
    Download,
    Edit,
    Eye,
    EyeOff,
    FileText,
    Filter,
    Image as ImageIcon,
    Info,
    LayoutDashboard,
    LogOut,
    Mail,
    MapPin,
    Package,
    Plus,
    Save,
    Settings,
    Star,
    Trash2,
    Upload,
    User,
    X
} from 'lucide-react';
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
            }`}>
            <div className='flex items-center gap-3'>
                <Icon
                    className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}
                />
                <span>{label}</span>
            </div>

            {badge > 0 && (
                <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        isActive ? 'bg-white text-teal-600' : 'bg-red-500 text-white'
                    }`}>
                    {badge}
                </span>
            )}

            {isActive && (
                <div className='absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white/20' />
            )}
        </button>
    );
};

const SidebarSection = ({ title, children }: any) => (
    <div className='mb-6'>
        <h3 className='mb-2 px-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase'>{title}</h3>
        <div className='space-y-1'>{children}</div>
    </div>
);

export default function AdminDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<
        'overview' | 'products' | 'inquiries' | 'certificates' | 'contact' | 'settings'
    >('overview');

    const [products, setProducts] = useState<Product[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isAddingCertificate, setIsAddingCertificate] = useState(false);
    const [showTwoStepForm, setShowTwoStepForm] = useState(false);
    const [adminUsername, setAdminUsername] = useState('Administrator');

    useEffect(() => {
        const loadData = async () => {
            setMounted(true);
            if (!checkAdminSession()) {
                router.push('/voltherm-admin');
                return;
            }
            
            try {
                console.log('🔄 Loading admin dashboard data...');
                
                // Force a clean reload by clearing any potentially stale localStorage first
                if (typeof window !== 'undefined') {
                    console.log('🧹 Clearing potentially stale localStorage data...');
                    localStorage.removeItem('voltherm_products');
                }
                
                // Fetch admin profile
                try {
                    const profileResponse = await apiService.getAdminProfile();
                    if (profileResponse.success && profileResponse.data) {
                        setAdminUsername(profileResponse.data.username);
                    }
                } catch (profileError) {
                    console.error('Failed to fetch admin profile:', profileError);
                    // Keep default "Administrator"
                }
                
                setProducts(await adminDataService.getProducts());
                setCertificates(await adminDataService.getCertificates());
                setContactInfo(await adminDataService.getContactInfo());
                setInquiries(await adminDataService.getInquiries());
                setMainCategories(await adminDataService.getMainCategories());
                setSubCategories(await adminDataService.getSubCategories());
                console.log('✅ All dashboard data loaded successfully');
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };
        
        loadData();
    }, [router]);

    const handleLogout = () => {
        clearAdminSession();
        toast.success('Logged out successfully');
        router.push('/');
    };

    if (!mounted) return null;

    const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

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
                            <div className='hidden sm:block'>
                                <h1 className='text-lg leading-none font-bold text-slate-900'>Voltherm</h1>
                                <p className='mt-0.5 text-[10px] font-semibold tracking-wider text-slate-500 uppercase'>
                                    Admin Portal
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3'>
                            <div className='hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset md:flex'>
                                <span className='relative flex h-2 w-2'>
                                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                                    <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
                                </span>
                                System Operational
                            </div>
                            <div className='mx-2 hidden h-6 w-px bg-slate-200 md:block'></div>
                            <button
                                onClick={handleLogout}
                                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600'>
                                <LogOut className='h-4 w-4' />
                                <span className='hidden sm:inline'>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
                    {/* Sidebar */}
                    <div className='lg:col-span-3'>
                        <div className='sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                            {/* Profile Snippet */}
                            <div className='mb-6 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3'>
                                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700'>
                                    <User className='h-5 w-5' />
                                </div>
                                <div className='overflow-hidden'>
                                    <p className='truncate text-sm font-bold text-slate-900'>{adminUsername}</p>
                                    <p className='truncate text-xs text-slate-500'>admin@voltherm.com</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav>
                                <SidebarSection title='Dashboard'>
                                    <SidebarItem
                                        id='overview'
                                        label='Overview'
                                        icon={LayoutDashboard}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </SidebarSection>

                                <SidebarSection title='Inventory'>
                                    <SidebarItem
                                        id='products'
                                        label='Products'
                                        icon={Package}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </SidebarSection>

                                <SidebarSection title='Communication'>
                                    <SidebarItem
                                        id='inquiries'
                                        label='Inbox'
                                        icon={Mail}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        badge={newInquiriesCount}
                                    />
                                    <SidebarItem
                                        id='contact'
                                        label='Contact Info'
                                        icon={Settings}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </SidebarSection>

                                <SidebarSection title='Site Content'>
                                    <SidebarItem
                                        id='certificates'
                                        label='Certificates'
                                        icon={ImageIcon}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </SidebarSection>

                                <SidebarSection title='Account'>
                                    <SidebarItem
                                        id='settings'
                                        label='Settings'
                                        icon={Settings}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </SidebarSection>
                            </nav>

                            {/* Quick Actions Footer */}
                            <div className='mt-4 border-t border-slate-100 pt-4'>
                                <button
                                    onClick={() => window.open('/store', '_blank')}
                                    className='flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900'>
                                    View Live Store <ArrowUpRight className='h-3 w-3' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className='space-y-6 lg:col-span-9'>
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
                                onSave={async (product: Product, imageFile?: File, pdfFile?: File) => {
                                    try {
                                        if (editingProduct?.id) {
                                            // Update existing product via backend API
                                            const updatedProduct = await adminDataService.updateProduct(product.id, product, imageFile, pdfFile);
                                            if (updatedProduct) {
                                                const updated = products.map((p) => (p.id === product.id ? updatedProduct : p));
                                                setProducts(updated);
                                                toast.success('Product updated via backend API');
                                            } else {
                                                throw new Error('Failed to update product');
                                            }
                                        } else {
                                            // Create new product via backend API
                                            if (imageFile || pdfFile) {
                                                const createdProduct = await adminDataService.createProduct(product, imageFile, pdfFile);
                                                if (createdProduct) {
                                                    const updatedProducts = [...products, createdProduct];
                                                    setProducts(updatedProducts);
                                                    toast.success('Product created via backend API');
                                                } else {
                                                    throw new Error('Failed to create product');
                                                }
                                            } else {
                                                // Fallback to localStorage if no files
                                                const newProduct = { ...product, id: Math.floor(Math.random() * 1000000000) };
                                                const updated = [...products, newProduct];
                                                setProducts(updated);
                                                await adminDataService.saveProducts(updated);
                                                toast.success('Product added to localStorage (no files)');
                                            }
                                        }
                                        setEditingProduct(null);
                                        setIsAddingProduct(false);
                                    } catch (error) {
                                        console.error('Failed to save product:', error);
                                        toast.error('Failed to save product: ' + (error as Error).message);
                                    }
                                }}
                                onDelete={async (id: number) => {
                                    if (confirm('Delete this product?')) {
                                        try {
                                            console.log('🗑️ Starting product deletion for ID:', id);
                                            
                                            // Find the product to get the backend ID
                                            const productToDelete = products.find(p => p.id === id);
                                            if (!productToDelete) {
                                                toast.error('Product not found');
                                                return;
                                            }

                                            console.log('🗑️ Deleting product:', productToDelete.title, 'ID:', id);
                                            const backendId = (productToDelete as any).backendId || id.toString();
                                            console.log('🔍 Using backend ID:', backendId);
                                            
                                            let backendDeleted = false;
                                            
                                            // Try to delete from backend
                                            if (await apiService.testConnection()) {
                                                try {
                                                    const response = await apiService.deleteProduct(backendId);
                                                    if (response.success) {
                                                        console.log('✅ Backend deletion successful');
                                                        backendDeleted = true;
                                                    } else {
                                                        console.log('⚠️ Backend deletion response not successful:', response);
                                                    }
                                                } catch (apiError) {
                                                    console.error('❌ Backend deletion API error:', apiError);
                                                    // Continue to check if it's a 404 (already deleted)
                                                    if (apiError instanceof Error && apiError.message.includes('404')) {
                                                        console.log('✅ Product was already deleted from backend (404)');
                                                        backendDeleted = true;
                                                    }
                                                }
                                            } else {
                                                console.log('⚠️ Backend not available, proceeding with local deletion');
                                            }
                                            
                                            // Update frontend state and localStorage
                                            const updated = products.filter((p) => p.id !== id);
                                            setProducts(updated);
                                            
                                            // Sync localStorage with current state
                                            const { saveProducts } = await import('@/lib/adminData');
                                            saveProducts(updated);
                                            
                                            if (backendDeleted) {
                                                toast.success('Product deleted from backend successfully');
                                            } else {
                                                toast.success('Product deleted locally (backend deletion may have failed)');
                                            }
                                            
                                        } catch (error) {
                                            console.error('Product deletion error:', error);
                                            toast.error('Failed to delete product: ' + (error as Error).message);
                                        }
                                    }
                                }}
                                onToggleFeatured={async (id: number) => {
                                    const current = products.find((p) => p.id === id);
                                    const featuredCount = products.filter((p) => p.featured).length;
                                    if (!current?.featured && featuredCount >= 6) {
                                        toast.error('Max 6 featured products');
                                        return;
                                    }
                                    if (current?.featured && featuredCount <= 3) {
                                        toast.error('Min 3 featured products');
                                        return;
                                    }
                                    const updated = products.map((p) =>
                                        p.id === id ? { ...p, featured: !p.featured } : p
                                    );
                                    setProducts(updated);
                                    await adminDataService.saveProducts(updated);
                                }}
                                onToggleAvailability={async (id: number) => {
                                    const updated = products.map((p) =>
                                        p.id === id ? { ...p, available: !p.available } : p
                                    );
                                    setProducts(updated);
                                    await adminDataService.saveProducts(updated);
                                    toast.success('Product availability updated');
                                }}
                            />
                        )}

                {activeTab === 'contact' && contactInfo && (
                    <ContactTab
                        contactInfo={contactInfo}
                        setContactInfo={setContactInfo}
                        onSave={async () => {
                            await adminDataService.saveContactInfo(contactInfo);
                            toast.success('Contact info saved');
                        }}
                    />
                )}

                {activeTab === 'settings' && <SettingsTab />}

                {activeTab === 'certificates' && (
                    <CertificatesTab
                        certificates={certificates}
                        isAddingCertificate={isAddingCertificate}
                        setIsAddingCertificate={setIsAddingCertificate}
                        onSave={async (cert: Certificate) => {
                            try {
                                await adminDataService.createCertificate(cert.title, cert.src);
                                // Reload certificates from backend
                                setCertificates(await adminDataService.getCertificates());
                                setIsAddingCertificate(false);
                                toast.success('Certificate added successfully');
                            } catch (error) {
                                console.error('Failed to add certificate:', error);
                                toast.error('Failed to add certificate: ' + (error as Error).message);
                            }
                        }}
                        onDelete={async (id: string) => {
                            if (confirm('Delete this certificate?')) {
                                try {
                                    await adminDataService.deleteCertificate(id);
                                    // Reload certificates from backend
                                    setCertificates(await adminDataService.getCertificates());
                                    toast.success('Certificate deleted successfully');
                                } catch (error) {
                                    console.error('Failed to delete certificate:', error);
                                    toast.error('Failed to delete certificate: ' + (error as Error).message);
                                }
                            }
                        }}
                    />
                )}

                        {activeTab === 'inquiries' && (
                            <InquiriesTab
                                inquiries={inquiries}
                                onStatusChange={async (id: string, status: Inquiry['status']) => {
                                    try {
                                        await adminDataService.updateInquiryStatus(id, status);
                                        // Reload inquiries from backend
                                        setInquiries(await adminDataService.getInquiries());
                                        toast.success('Status updated successfully');
                                    } catch (error) {
                                        console.error('Failed to update inquiry status:', error);
                                        toast.error('Failed to update status');
                                    }
                                }}
                                onDelete={async (id: string) => {
                                    toast.error('Delete operation not supported by backend');
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
        <div className='animate-in fade-in space-y-6'>
            <div className='relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/10'>
                <div className='relative z-10'>
                    <h2 className='text-2xl font-bold'>Welcome back, Admin</h2>
                    <p className='mt-1 mb-6 max-w-lg text-slate-400'>
                        You have {inquiries.length} total inquiries and {products.length} active products listed in your
                        store.
                    </p>
                    <button
                        onClick={() => setActiveTab('products')}
                        className='rounded-lg bg-teal-500 px-6 py-2 font-bold text-white transition-colors hover:bg-teal-400'>
                        Manage Inventory
                    </button>
                </div>
                <div className='absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-teal-500/20 to-transparent'></div>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <div
                    onClick={() => setActiveTab('inquiries')}
                    className='group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
                    <div className='mb-4 flex items-start justify-between'>
                        <div className='rounded-lg bg-amber-50 p-3 transition-colors group-hover:bg-amber-100'>
                            <Mail className='h-6 w-6 text-amber-600' />
                        </div>
                    </div>
                    <p className='text-3xl font-bold text-slate-900'>{inquiries.length}</p>
                    <p className='text-sm font-medium text-slate-500'>Inquiries</p>
                </div>
                <div
                    onClick={() => setActiveTab('products')}
                    className='group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
                    <div className='mb-4 flex items-start justify-between'>
                        <div className='rounded-lg bg-teal-50 p-3 transition-colors group-hover:bg-teal-100'>
                            <Package className='h-6 w-6 text-teal-600' />
                        </div>
                    </div>
                    <p className='text-3xl font-bold text-slate-900'>{products.length}</p>
                    <p className='text-sm font-medium text-slate-500'>Products</p>
                </div>
                <div
                    onClick={() => setActiveTab('certificates')}
                    className='group cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
                    <div className='mb-4 flex items-start justify-between'>
                        <div className='rounded-lg bg-blue-50 p-3 transition-colors group-hover:bg-blue-100'>
                            <ImageIcon className='h-6 w-6 text-blue-600' />
                        </div>
                    </div>
                    <p className='text-3xl font-bold text-slate-900'>{certificates.length}</p>
                    <p className='text-sm font-medium text-slate-500'>Certificates</p>
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
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Change Username States
    const [verifyPassword, setVerifyPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);

    // Email Settings States
    const [receiverEmail, setReceiverEmail] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [appPassword, setAppPassword] = useState('');

    // Load current credentials from localStorage (temporary mock)
    useEffect(() => {
        const loadAdminData = async () => {
            try {
                // Try to fetch from backend first
                const response = await apiService.getAdminProfile();
                if (response.success && response.data) {
                    setAdminId(response.data.username);
                    localStorage.setItem('admin_id', response.data.username);
                } else {
                    // Fallback to localStorage
                    const storedId = localStorage.getItem('admin_id') || 'admin';
                    setAdminId(storedId);
                }
            } catch (error) {
                console.error('Failed to fetch admin profile:', error);
                // Fallback to localStorage
                const storedId = localStorage.getItem('admin_id') || 'admin';
                setAdminId(storedId);
            }
            
            const storedPass = localStorage.getItem('admin_password') || 'admin123';
            setAdminPass(storedPass);
        };
        
        loadAdminData();
    }, []);

    const handleChangePassword = async () => {
        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required');
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

        try {
            if (!otpSent) {
                // Step 1: Initiate password change
                await apiService.initiatePasswordChange(currentPassword, newPassword);
                setOtpSent(true);
                toast.success('OTP sent to your email. Check your inbox!');
            } else {
                // Step 2: Verify OTP and change password
                if (!otp) {
                    toast.error('Please enter the OTP');
                    return;
                }
                await apiService.verifyPasswordChange(otp, newPassword);
                
                // Update local state
                localStorage.setItem('admin_password', newPassword);
                setAdminPass(newPassword);

                // Clear form
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setOtp('');
                setOtpSent(false);

                toast.success('Password changed successfully!');
            }
        } catch (error) {
            console.error('Password change error:', error);
            toast.error('Failed to change password. Please try again.');
            setOtpSent(false);
        }
    };

    const handleChangeUsername = async () => {
        // Validation
        if (!verifyPassword || !newUsername) {
            toast.error('All fields are required');
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

        try {
            await apiService.changeUsername(verifyPassword, newUsername);
            
            // Update local state
            localStorage.setItem('admin_id', newUsername);
            setAdminId(newUsername);

            // Clear form
            setVerifyPassword('');
            setNewUsername('');

            toast.success('Username changed successfully!');
        } catch (error) {
            console.error('Username change error:', error);
            toast.error('Failed to change username. Check your password.');
        }
    };

    const handleUpdateReceiverEmail = async () => {
        if (!receiverEmail) {
            toast.error('Receiver email is required');
            return;
        }

        try {
            await apiService.changeReceiverEmail(receiverEmail);
            setReceiverEmail('');
            toast.success('Receiver email updated successfully!');
        } catch (error) {
            console.error('Receiver email update error:', error);
            toast.error('Failed to update receiver email');
        }
    };

    const handleUpdateSenderEmail = async () => {
        if (!senderEmail || !appPassword) {
            toast.error('Both sender email and app password are required');
            return;
        }

        try {
            await apiService.changeSenderEmail(senderEmail, appPassword);
            setSenderEmail('');
            setAppPassword('');
            toast.success('Sender email updated successfully!');
        } catch (error) {
            console.error('Sender email update error:', error);
            toast.error('Failed to update sender email. Check your credentials.');
        }
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h1 className='text-3xl font-bold text-slate-900'>Account Settings</h1>
                <p className='mt-2 text-slate-600'>Manage your admin credentials, security, and email settings</p>
            </div>

            {/* Current Credentials Display */}
            <div className='rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50 p-6'>
                <h2 className='mb-4 flex items-center gap-2 text-lg font-bold text-slate-900'>
                    <User className='h-5 w-5 text-teal-600' />
                    Current Credentials
                </h2>
                <div className='grid gap-4 md:grid-cols-2'>
                    <div className='rounded-lg border border-slate-200 bg-white p-4'>
                        <p className='mb-1 text-xs text-slate-600'>Username</p>
                        <p className='text-lg font-bold text-slate-900'>{adminId}</p>
                    </div>
                    <div className='rounded-lg border border-slate-200 bg-white p-4'>
                        <p className='mb-1 text-xs text-slate-600'>Password</p>
                        <p className='text-lg font-bold text-slate-900'>••••••••</p>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='mb-6 text-2xl font-bold text-slate-900'>Change Password</h2>
                <div className='max-w-md space-y-4'>
                    {/* Current Password */}
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Current Password</label>
                        <div className='relative'>
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder='Enter current password'
                                disabled={otpSent}
                                className='w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100'
                            />
                            <button
                                type='button'
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                {showCurrentPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>New Password</label>
                        <div className='relative'>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Enter new password (min 8 characters)'
                                disabled={otpSent}
                                className='w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100'
                            />
                            <button
                                type='button'
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                {showNewPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                            </button>
                        </div>
                        {newPassword && newPassword.length < 8 && (
                            <p className='mt-1 text-xs text-red-600'>Password must be at least 8 characters</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Confirm New Password</label>
                        <input
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm new password'
                            disabled={otpSent}
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100'
                        />
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className='mt-1 text-xs text-red-600'>Passwords do not match</p>
                        )}
                    </div>

                    {/* OTP Field (shown after initiating) */}
                    {otpSent && (
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-slate-700'>Enter OTP</label>
                            <input
                                type='text'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter 6-digit OTP from email'
                                maxLength={6}
                                className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                            />
                            <p className='mt-1 text-xs text-blue-600'>Check your email for the OTP code</p>
                        </div>
                    )}

                    <button
                        onClick={handleChangePassword}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700'>
                        <Save className='h-5 w-5' />
                        {otpSent ? 'Verify OTP & Update Password' : 'Send OTP'}
                    </button>
                    
                    {otpSent && (
                        <button
                            onClick={() => {
                                setOtpSent(false);
                                setOtp('');
                            }}
                            className='w-full text-sm text-slate-600 hover:text-slate-900'>
                            Cancel and start over
                        </button>
                    )}
                </div>
            </div>

            {/* Change Username Section */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='mb-6 text-2xl font-bold text-slate-900'>Change Username</h2>
                <div className='max-w-md space-y-4'>
                    {/* Verify Password */}
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Verify Password</label>
                        <div className='relative'>
                            <input
                                type={showVerifyPassword ? 'text' : 'password'}
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                placeholder='Enter your password to verify'
                                className='w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                            />
                            <button
                                type='button'
                                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                                className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                {showVerifyPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                            </button>
                        </div>
                    </div>

                    {/* New Username */}
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>New Username</label>
                        <input
                            type='text'
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder='Enter new username (min 3 characters)'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                        />
                        {newUsername && newUsername.length < 3 && (
                            <p className='mt-1 text-xs text-red-600'>Username must be at least 3 characters</p>
                        )}
                    </div>

                    <button
                        onClick={handleChangeUsername}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700'>
                        <Save className='h-5 w-5' />
                        Update Username
                    </button>
                </div>
            </div>

            {/* Email Settings Section */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='mb-6 text-2xl font-bold text-slate-900'>Email Settings</h2>
                
                {/* Receiver Email */}
                <div className='mb-6 max-w-md space-y-4'>
                    <h3 className='text-lg font-semibold text-slate-900'>Receiver Email</h3>
                    <p className='text-sm text-slate-600'>Email address that receives inquiry notifications and OTP codes</p>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>New Receiver Email</label>
                        <input
                            type='email'
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            placeholder='company@voltherm.com'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                        />
                    </div>
                    <button
                        onClick={handleUpdateReceiverEmail}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700'>
                        <Save className='h-5 w-5' />
                        Update Receiver Email
                    </button>
                </div>

                <div className='mb-6 border-t border-slate-200'></div>

                {/* Sender Email */}
                <div className='max-w-md space-y-4'>
                    <h3 className='text-lg font-semibold text-slate-900'>Sender Email (SMTP)</h3>
                    <p className='text-sm text-slate-600'>Email address used to send emails from the system</p>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Sender Email</label>
                        <input
                            type='email'
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            placeholder='sender@gmail.com'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>App Password</label>
                        <input
                            type='password'
                            value={appPassword}
                            onChange={(e) => setAppPassword(e.target.value)}
                            placeholder='abcd efgh ijkl mnop'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                        />
                        <p className='mt-1 text-xs text-slate-500'>
                            For Gmail: Enable 2FA, then generate an App Password in Google Account Settings
                        </p>
                    </div>
                    <button
                        onClick={handleUpdateSenderEmail}
                        className='flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700'>
                        <Save className='h-5 w-5' />
                        Update Sender Email & Credentials
                    </button>
                </div>
            </div>

            {/* Info Notice */}
            <div className='rounded-2xl border border-blue-200 bg-blue-50 p-6'>
                <div className='flex gap-3'>
                    <AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-blue-600' />
                    <div>
                        <h3 className='mb-1 font-semibold text-blue-900'>Backend Integration Active</h3>
                        <p className='text-sm text-blue-800'>
                            All settings are now connected to backend APIs. Password changes require OTP verification sent to your email.
                            Category management has been removed as the backend doesn't support it yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Products Tab
function ProductsTab({
    products,
    categories,
    mainCategories,
    editingProduct,
    isAddingProduct,
    setEditingProduct,
    setIsAddingProduct,
    onSave,
    onDelete,
    onToggleFeatured,
    onToggleAvailability
}: any) {
    const [formData, setFormData] = useState<Product>({
        id: 0,
        backendId: undefined, // Preserve backend ID for updates
        title: '',
        description: '',
        image: '',
        specs: [''],
        featured: false,
        available: true
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSpecInfo, setShowSpecInfo] = useState<number | null>(null);

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        } else if (isAddingProduct) {
            setFormData({
                id: 0,
                backendId: undefined,
                title: '',
                description: '',
                image: '',
                specs: [''],
                featured: false,
                available: true,
                price: undefined,
                technicalSpecs: [
                    { key: '', value: '' },
                    { key: '', value: '' },
                    { key: '', value: '' },
                    { key: '', value: '' }
                ]
            });
            setImageFile(null);
            setPdfFile(null);
        }
    }, [editingProduct, isAddingProduct]);

    const filteredProducts = products.filter(
        (p: Product) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownloadPdf = async (product: Product) => {
        try {
            const backendId = (product as any).backendId || product.id.toString();
            const toastId = toast.loading('Downloading PDF...');
            
            const blob = await apiService.downloadProductPdf(backendId);
            
            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${product.title.replace(/[^a-zA-Z0-9]/g, '_')}_datasheet.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.dismiss(toastId);
            toast.success('PDF downloaded successfully!');
        } catch (error) {
            console.error('PDF download error:', error);
            toast.error('Failed to download PDF. File may not be available.');
        }
    };

    if (editingProduct || isAddingProduct) {
        return (
            <div className='max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
                <div className='mb-8 flex items-center justify-between'>
                    <div>
                        <h3 className='text-2xl font-bold text-slate-900'>
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <p className='mt-1 text-sm text-slate-500'>
                            Fill in all required fields to create or update a product
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setIsAddingProduct(false);
                        }}
                        className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600'>
                        <X className='h-6 w-6' />
                    </button>
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await onSave(formData, imageFile || undefined, pdfFile || undefined);
                }} className='space-y-6'>
                    {/* Basic Information */}
                    <div className='border-b border-slate-200 pb-6'>
                        <h4 className='mb-4 text-sm font-bold tracking-wider text-slate-700 uppercase'>
                            Basic Information
                        </h4>
                        <div className='space-y-4'>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Product Title *</label>
                                <input
                                    type='text'
                                    placeholder='Enter product name'
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                                    required
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Description *</label>
                                <textarea
                                    placeholder='Enter detailed product description'
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className='w-full resize-none rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                                    required
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Product Image *</label>
                                <div className='space-y-3'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setImageFile(file);
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    setFormData({ ...formData, image: event.target?.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className='w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 text-slate-900 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white file:transition-colors hover:file:bg-teal-700 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                                    />
                                    {formData.image && (
                                        <div className='relative inline-block'>
                                            <img
                                                src={formData.image}
                                                alt='Preview'
                                                className='h-auto max-w-48 rounded-lg border border-slate-200 shadow-sm'
                                            />
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    setFormData({ ...formData, image: '' });
                                                    setImageFile(null);
                                                }}
                                                className='absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600'>
                                                <X className='h-4 w-4' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Product Datasheet (PDF/DOC)</label>
                                <div className='space-y-3'>
                                    <input
                                        type='file'
                                        accept='.pdf,.doc,.docx'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setPdfFile(file);
                                            }
                                        }}
                                        className='w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 text-slate-900 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-amber-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white file:transition-colors hover:file:bg-amber-700 focus:border-transparent focus:ring-2 focus:ring-amber-500'
                                    />
                                    {pdfFile && (
                                        <div className='flex items-center space-x-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2'>
                                            <div className='text-amber-600'>
                                                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z' clipRule='evenodd' />
                                                </svg>
                                            </div>
                                            <span className='flex-1 text-sm text-slate-700 truncate'>{pdfFile.name}</span>
                                            <button
                                                type='button'
                                                onClick={() => setPdfFile(null)}
                                                className='text-amber-600 hover:text-amber-800'>
                                                <X className='h-4 w-4' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className='border-b border-slate-200 pb-6'>
                        <h4 className='mb-4 text-sm font-bold tracking-wider text-slate-700 uppercase'>
                            Specifications
                        </h4>
                        <div className='space-y-4'>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>
                                    Quick Specs (comma-separated)
                                </label>
                                <input
                                    type='text'
                                    placeholder='e.g., Portable, Compact, Lightweight'
                                    value={formData.specs.join(', ')}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            specs: e.target.value
                                                .split(',')
                                                .map((s) => s.trim())
                                                .filter((s) => s)
                                        })
                                    }
                                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <label className='mb-2 block text-sm font-medium text-slate-700'>Price *</label>
                                    <input
                                        type='number'
                                        placeholder='e.g., 50000'
                                        value={formData.price || ''}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: e.target.value ? Number(e.target.value) : undefined
                                            })
                                        }
                                        className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specs */}
                    <div className='border-b border-slate-200 pb-6'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h4 className='text-sm font-bold tracking-wider text-slate-700 uppercase'>
                                Technical Specifications (Max 6, 4 Required)
                            </h4>
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
                                className='flex items-center gap-1 rounded-lg bg-teal-100 px-3 py-1.5 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50'>
                                <Plus className='h-4 w-4' /> Add Spec
                            </button>
                        </div>
                        <div className='space-y-3'>
                            {(formData.technicalSpecs || []).map((spec, idx) => {
                                const isRequired = idx < 4;
                                const canDelete = idx >= 4;
                                const isFirstTwo = idx < 2;
                                return (
                                    <div key={idx}>
                                        <div className={`flex gap-2 ${isFirstTwo ? 'font-semibold' : ''}`}>
                                            <input
                                                type='text'
                                                placeholder='e.g., Energy Density'
                                                value={spec.key}
                                                onChange={(e) => {
                                                    const updated = [...(formData.technicalSpecs || [])];
                                                    updated[idx] = { ...updated[idx], key: e.target.value };
                                                    setFormData({ ...formData, technicalSpecs: updated });
                                                }}
                                                className={`flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500 ${isFirstTwo ? 'font-semibold' : ''}`}
                                                required={isRequired}
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
                                                className={`flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500 ${isFirstTwo ? 'font-semibold' : ''}`}
                                                required={isRequired}
                                            />
                                            {isFirstTwo && (
                                                <div className='relative'>
                                                    <button
                                                        type='button'
                                                        onClick={() => setShowSpecInfo(showSpecInfo === idx ? null : idx)}
                                                        className='rounded-lg px-3 py-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700'>
                                                        <Info className='h-4 w-4' />
                                                    </button>
                                                    {showSpecInfo === idx && (
                                                        <div className='absolute right-0 top-full mt-1 w-48 rounded-lg border border-slate-200 bg-white p-3 shadow-lg z-10'>
                                                            <p className='text-xs text-slate-700'>
                                                                These are essential technical specifications for your product. Please fill in accurate values.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {canDelete && (
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        const updated = (formData.technicalSpecs || []).filter(
                                                            (_, i) => i !== idx
                                                        );
                                                        setFormData({ ...formData, technicalSpecs: updated });
                                                    }}
                                                    className='rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50'>
                                                    <Trash2 className='h-4 w-4' />
                                                </button>
                                            )}
                                            {isRequired && (
                                                <span className='flex items-center text-xs font-semibold text-red-600'>
                                                    *
                                                </span>
                                            )}
                                        </div>
                                        {idx === 1 && (
                                            <div className='my-3 border-t border-slate-300'></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category & Status */}
                    <div className='border-b border-slate-200 pb-6'>
                        <h4 className='mb-4 text-sm font-bold tracking-wider text-slate-700 uppercase'>
                            Category & Status
                        </h4>
                        <div className='space-y-4'>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Category</label>
                                <select
                                    value={formData.subCategoryId || formData.categoryId || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            subCategoryId: e.target.value || undefined,
                                            categoryId: e.target.value || undefined
                                        })
                                    }
                                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'>
                                    <option value=''>Select a category...</option>
                                    {mainCategories.map((mainCat: MainCategory) => {
                                        const subCats = categories.filter(
                                            (c: SubCategory) => c.mainCategoryId === mainCat.id
                                        );
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
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <label className='flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 transition-colors hover:bg-slate-50'>
                                    <input
                                        type='checkbox'
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className='h-4 w-4 rounded border-slate-300 text-teal-600'
                                    />
                                    <div>
                                        <span className='font-medium text-slate-700'>⭐ Featured</span>
                                        <p className='text-xs text-slate-500'>Show on homepage slider</p>
                                    </div>
                                </label>

                                <label className='flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 transition-colors hover:bg-slate-50'>
                                    <input
                                        type='checkbox'
                                        checked={formData.available !== false}
                                        onChange={(e) =>
                                            setFormData({ ...formData, available: e.target.checked ? true : false })
                                        }
                                        className='h-4 w-4 rounded border-slate-300 text-teal-600'
                                    />
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
                            className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3 font-medium text-white transition-all hover:shadow-lg'>
                            <Save className='h-4 w-4' />
                            {editingProduct ? 'Update Product' : 'Create Product'}
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setEditingProduct(null);
                                setIsAddingProduct(false);
                            }}
                            className='rounded-lg bg-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-300'>
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
                    <p className='mt-1 text-sm text-slate-600'>
                        {filteredProducts.length} of {products.length} products
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => setIsAddingProduct(true)}
                        className='flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2.5 font-medium text-white transition-all hover:shadow-lg'>
                        <Plus className='h-4 w-4' />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className='rounded-xl border border-slate-200 bg-white p-4'>
                <input
                    type='text'
                    placeholder='Search products by name or description...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                />
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className='rounded-xl border border-slate-200 bg-white p-12 text-center'>
                    <Package className='mx-auto mb-4 h-16 w-16 text-slate-300' />
                    <h3 className='mb-2 text-xl font-bold text-slate-900'>No products found</h3>
                    <p className='text-slate-600'>
                        {searchQuery ? 'Try a different search term' : 'Create your first product to get started'}
                    </p>
                </div>
            ) : (
                <div className='space-y-2'>
                    {filteredProducts.map((product: Product) => (
                        <div
                            key={product.id}
                            className='overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-teal-300 hover:shadow-md'>
                            <div className='flex items-center gap-3 p-4'>
                                {/* Product Image - Compact */}
                                <div className='relative shrink-0'>
                                    <div className='h-24 w-24 overflow-hidden rounded-lg border-3 border-cyan-400 bg-slate-50 shadow-md'>
                                        <img
                                            src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}${product.image}` : (product.image || '/placeholder-image.jpg')}
                                            alt={product.title}
                                            className='h-full w-full object-cover'
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                    {product.featured && (
                                        <div className='absolute -top-1 -right-1 rounded-full bg-amber-400 p-1 text-white shadow-md'>
                                            <Star className='h-3.5 w-3.5 fill-current' />
                                        </div>
                                    )}
                                </div>

                                {/* Product Details - Compact */}
                                <div className='min-w-0 flex-1'>
                                    <div className='mb-1 flex items-baseline gap-2'>
                                        <h3 className='truncate text-sm font-bold text-slate-900'>{product.title}</h3>
                                        {product.available === false && (
                                            <span className='shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-amber-700'>
                                                ⚠️ Unavailable
                                            </span>
                                        )}
                                    </div>
                                    <p className='mb-2 line-clamp-1 text-xs text-slate-600'>{product.description}</p>

                                    {/* Category & Specs */}
                                    <div className='mb-2 flex flex-wrap items-center gap-2'>
                                        {(product.subCategoryId || product.categoryId) &&
                                            (() => {
                                                const subCat = categories.find(
                                                    (c: SubCategory) =>
                                                        c.id === (product.subCategoryId || product.categoryId)
                                                );
                                                if (!subCat) return null;
                                                return (
                                                    <span className='rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700'>
                                                        {subCat.icon} {subCat.name}
                                                    </span>
                                                );
                                            })()}
                                        {product.specs.slice(0, 2).map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className='rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700'>
                                                {spec}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price & Specs - Compact */}
                                    <div className='flex flex-wrap items-center gap-2 text-xs'>
                                        {product.price && (
                                            <span className='rounded bg-green-50 px-2 py-0.5 font-bold text-green-700'>
                                                💰 PKR {(product.price / 1000).toFixed(0)}K
                                            </span>
                                        )}
                                        {product.capacity && (
                                            <span className='rounded bg-blue-50 px-2 py-0.5 font-medium text-blue-700'>
                                                ⚡ {product.capacity}
                                            </span>
                                        )}
                                        {product.voltage && (
                                            <span className='rounded bg-purple-50 px-2 py-0.5 font-medium text-purple-700'>
                                                🔌 {product.voltage}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons - Compact */}
                                <div className='flex shrink-0 gap-1.5'>
                                    <button
                                        onClick={() => onToggleFeatured(product.id)}
                                        className={`flex h-9 w-9 transform items-center justify-center rounded-lg text-sm shadow-sm transition-all hover:scale-110 ${
                                            product.featured
                                                ? 'bg-amber-400 text-white hover:bg-amber-500'
                                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                        }`}
                                        title={product.featured ? 'Remove from featured' : 'Add to featured'}>
                                        ⭐
                                    </button>
                                    <button
                                        onClick={() => onToggleAvailability(product.id)}
                                        className={`flex h-9 w-9 transform items-center justify-center rounded-lg shadow-sm transition-all hover:scale-110 ${
                                            product.available !== false
                                                ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                                                : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                                        }`}
                                        title={product.available !== false ? 'Mark unavailable' : 'Mark available'}>
                                        <Package className='h-4 w-4' />
                                    </button>
                                    <button
                                        onClick={() => handleDownloadPdf(product)}
                                        className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-green-100 text-green-600 shadow-sm transition-all hover:scale-110 hover:bg-green-200'
                                        title='Download datasheet'>
                                        <Download className='h-4 w-4' />
                                    </button>
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm transition-all hover:scale-110 hover:bg-blue-200'
                                        title='Edit product'>
                                        <Edit className='h-4 w-4' />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this product?')) onDelete(product.id);
                                        }}
                                        className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-red-100 text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-200'
                                        title='Delete product'>
                                        <Trash2 className='h-4 w-4' />
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

        // Validate all required fields
        if (
            !editingBranch.name?.trim() ||
            !editingBranch.addressLine1?.trim() ||
            !editingBranch.addressLine2?.trim() ||
            !editingBranch.city?.trim() ||
            !editingBranch.state?.trim() ||
            !editingBranch.pincode?.trim() ||
            !editingBranch.phone?.trim() ||
            !editingBranch.mapUrl?.trim()
        ) {
            toast.error('All fields are required');
            return;
        }

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
                branches: branches.map((b: any) => (b.id === processedBranch.id ? processedBranch : b))
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
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-6 flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-slate-900'>
                        {isAddingBranch ? 'Add Branch' : 'Edit Branch'}
                    </h3>
                    <button
                        onClick={() => {
                            setEditingBranch(null);
                            setIsAddingBranch(false);
                        }}
                        className='text-slate-600 hover:text-slate-900'>
                        <X className='h-5 w-5' />
                    </button>
                </div>
                <div className='space-y-4'>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Branch Name *</label>
                        <input
                            type='text'
                            value={editingBranch.name}
                            onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                            placeholder='Branch Name'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            required
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Address Line 1 *</label>
                        <input
                            type='text'
                            value={editingBranch.addressLine1}
                            onChange={(e) => setEditingBranch({ ...editingBranch, addressLine1: e.target.value })}
                            placeholder='Address Line 1'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            required
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Address Line 2 *</label>
                        <input
                            type='text'
                            value={editingBranch.addressLine2}
                            onChange={(e) => setEditingBranch({ ...editingBranch, addressLine2: e.target.value })}
                            placeholder='Address Line 2'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            required
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-slate-700'>City *</label>
                            <input
                                type='text'
                                value={editingBranch.city}
                                onChange={(e) => setEditingBranch({ ...editingBranch, city: e.target.value })}
                                placeholder='City'
                                className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                                required
                            />
                        </div>
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-slate-700'>State *</label>
                            <input
                                type='text'
                                value={editingBranch.state}
                                onChange={(e) => setEditingBranch({ ...editingBranch, state: e.target.value })}
                                placeholder='State'
                                className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                                required
                            />
                        </div>
                        <div>
                            <label className='mb-2 block text-sm font-semibold text-slate-700'>Pincode *</label>
                            <input
                                type='text'
                                value={editingBranch.pincode}
                                onChange={(e) => setEditingBranch({ ...editingBranch, pincode: e.target.value })}
                                placeholder='Pincode'
                                className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>Phone *</label>
                        <input
                            type='tel'
                            value={editingBranch.phone}
                            onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                            placeholder='Phone'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            required
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            Google Maps Embed URL *
                        </label>
                        <textarea
                            value={editingBranch.mapUrl}
                            onChange={(e) => setEditingBranch({ ...editingBranch, mapUrl: e.target.value })}
                            placeholder='Paste the entire iframe code OR just the URL...'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 font-mono text-xs text-slate-900'
                            rows={3}
                            required
                        />
                        <div className='mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3'>
                            <p className='mb-2 text-xs font-semibold text-blue-900'>📍 How to get the map:</p>
                            <ol className='ml-4 list-decimal space-y-1 text-xs text-blue-800'>
                                <li>
                                    Open{' '}
                                    <a href='https://www.google.com/maps' target='_blank' className='underline'>
                                        Google Maps
                                    </a>
                                </li>
                                <li>Search for your location</li>
                                <li>
                                    Click the <strong>Share</strong> button
                                </li>
                                <li>
                                    Go to the <strong>Embed a map</strong> tab
                                </li>
                                <li>
                                    Click <strong>COPY HTML</strong>
                                </li>
                                <li>
                                    Paste the <strong>entire code</strong> here (we'll extract the URL automatically)
                                </li>
                            </ol>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveBranch}
                        className='w-full rounded-lg bg-teal-600 py-3 font-medium text-white hover:bg-teal-700'>
                        Save Branch
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {/* Contact Information */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='mb-6 text-2xl font-bold text-slate-900'>Contact Information</h2>
                <div className='space-y-6'>
                    <div>
                        <h3 className='mb-3 text-lg font-semibold text-slate-900'>Sales Contact</h3>
                        <div className='space-y-2'>
                            <input
                                type='email'
                                value={contactInfo.sales.email}
                                onChange={(e) =>
                                    setContactInfo({
                                        ...contactInfo,
                                        sales: { ...contactInfo.sales, email: e.target.value }
                                    })
                                }
                                placeholder='Email'
                                className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            />
                            <input
                                type='tel'
                                value={contactInfo.sales.phone}
                                onChange={(e) =>
                                    setContactInfo({
                                        ...contactInfo,
                                        sales: { ...contactInfo.sales, phone: e.target.value }
                                    })
                                }
                                placeholder='Phone'
                                className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className='mb-3 text-lg font-semibold text-slate-900'>Business Contact</h3>
                        <input
                            type='email'
                            value={contactInfo.business.email}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    business: { ...contactInfo.business, email: e.target.value }
                                })
                            }
                            placeholder='Email'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>

                    <div>
                        <h3 className='mb-3 text-lg font-semibold text-slate-900'>Support Contact</h3>
                        <input
                            type='tel'
                            value={contactInfo.support.phone}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    support: { ...contactInfo.support, phone: e.target.value }
                                })
                            }
                            placeholder='Phone'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='mb-6 text-2xl font-bold text-slate-900'>Social Media Links</h2>
                <div className='space-y-4'>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            <span className='inline-flex items-center gap-2'>
                                <svg className='h-5 w-5 text-blue-600' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                                Facebook
                            </span>
                        </label>
                        <input
                            type='url'
                            value={contactInfo.socialMedia?.facebook || ''}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    socialMedia: { ...contactInfo.socialMedia, facebook: e.target.value }
                                })
                            }
                            placeholder='https://www.facebook.com/yourpage'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            <span className='inline-flex items-center gap-2'>
                                <svg className='h-5 w-5 text-pink-600' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                                </svg>
                                Instagram
                            </span>
                        </label>
                        <input
                            type='url'
                            value={contactInfo.socialMedia?.instagram || ''}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    socialMedia: { ...contactInfo.socialMedia, instagram: e.target.value }
                                })
                            }
                            placeholder='https://www.instagram.com/yourprofile'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            <span className='inline-flex items-center gap-2'>
                                <svg className='h-5 w-5 text-blue-700' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                                </svg>
                                LinkedIn
                            </span>
                        </label>
                        <input
                            type='url'
                            value={contactInfo.socialMedia?.linkedin || ''}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value }
                                })
                            }
                            placeholder='https://www.linkedin.com/company/yourcompany'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            <span className='inline-flex items-center gap-2'>
                                <svg className='h-5 w-5 text-sky-500' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                                </svg>
                                Twitter (X)
                            </span>
                        </label>
                        <input
                            type='url'
                            value={contactInfo.socialMedia?.twitter || ''}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    socialMedia: { ...contactInfo.socialMedia, twitter: e.target.value }
                                })
                            }
                            placeholder='https://twitter.com/yourhandle'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-semibold text-slate-700'>
                            <span className='inline-flex items-center gap-2'>
                                <svg className='h-5 w-5 text-orange-600' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v2h-2V7zm0 4h2v8h-2v-8z' />
                                </svg>
                                IndiaMART
                            </span>
                        </label>
                        <input
                            type='url'
                            value={contactInfo.socialMedia?.indiamart || ''}
                            onChange={(e) =>
                                setContactInfo({
                                    ...contactInfo,
                                    socialMedia: { ...contactInfo.socialMedia, indiamart: e.target.value }
                                })
                            }
                            placeholder='https://www.indiamart.com/yourcompany'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        />
                    </div>
                </div>
            </div>

            {/* Main Office Address */}
            <div className='bg-white rounded-2xl border border-slate-200 p-6 shadow-sm'>
                <h2 className='text-2xl font-bold text-slate-900 mb-6'>Main Office Address</h2>
                <div className='space-y-4'>
                    <input 
                        type='text' 
                        value={contactInfo.mainAddress?.companyName || ''} 
                        onChange={(e) => setContactInfo({ 
                            ...contactInfo, 
                            mainAddress: { ...contactInfo.mainAddress, companyName: e.target.value } 
                        })} 
                        placeholder='Company Name' 
                        className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                    />
                    <input 
                        type='text' 
                        value={contactInfo.mainAddress?.addressLine1 || ''} 
                        onChange={(e) => setContactInfo({ 
                            ...contactInfo, 
                            mainAddress: { ...contactInfo.mainAddress, addressLine1: e.target.value } 
                        })} 
                        placeholder='Address Line 1' 
                        className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                    />
                    <input 
                        type='text' 
                        value={contactInfo.mainAddress?.addressLine2 || ''} 
                        onChange={(e) => setContactInfo({ 
                            ...contactInfo, 
                            mainAddress: { ...contactInfo.mainAddress, addressLine2: e.target.value } 
                        })} 
                        placeholder='Address Line 2' 
                        className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                    />
                    <div className='grid grid-cols-3 gap-4'>
                        <input 
                            type='text' 
                            value={contactInfo.mainAddress?.city || ''} 
                            onChange={(e) => setContactInfo({ 
                                ...contactInfo, 
                                mainAddress: { ...(contactInfo.mainAddress || {}), city: e.target.value } 
                            })} 
                            placeholder='City' 
                            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                        />
                        <input 
                            type='text' 
                            value={contactInfo.mainAddress?.state || ''} 
                            onChange={(e) => setContactInfo({ 
                                ...contactInfo, 
                                mainAddress: { ...(contactInfo.mainAddress || {}), state: e.target.value } 
                            })} 
                            placeholder='State' 
                            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                        />
                        <input 
                            type='text' 
                            value={contactInfo.mainAddress?.pincode || ''} 
                            onChange={(e) => setContactInfo({ 
                                ...contactInfo, 
                                mainAddress: { ...(contactInfo.mainAddress || {}), pincode: e.target.value } 
                            })} 
                            placeholder='Pincode' 
                            className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                        />
                    </div>
                    <input 
                        type='tel' 
                        value={contactInfo.mainAddress?.phone || ''} 
                        onChange={(e) => setContactInfo({ 
                            ...contactInfo, 
                            mainAddress: { ...(contactInfo.mainAddress || {}), phone: e.target.value } 
                        })} 
                        placeholder='Phone' 
                        className='w-full px-4 py-2 border border-slate-300 text-slate-900 rounded-lg' 
                    />
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Google Maps Embed</label>
                        <textarea 
                            value={contactInfo.mainAddress?.mapUrl || ''} 
                            onChange={(e) => {
                                const url = e.target.value;
                                const srcMatch = url.match(/src=["']([^"']+)["']/);
                                const extractedUrl = srcMatch ? srcMatch[1] : url;
                                setContactInfo({ 
                                    ...contactInfo, 
                                    mainAddress: { ...(contactInfo.mainAddress || {}), mapUrl: extractedUrl } 
                                });
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
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-slate-900'>Branch Offices</h2>
                    <button
                        onClick={handleAddBranch}
                        className='flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700'>
                        <Plus className='h-4 w-4' />
                        Add Branch
                    </button>
                </div>

                {!contactInfo.branches || contactInfo.branches.length === 0 ? (
                    <div className='py-12 text-center'>
                        <MapPin className='mx-auto mb-4 h-16 w-16 text-slate-300' />
                        <p className='text-slate-600'>No branch offices added yet</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {contactInfo.branches.map((branch: any) => (
                            <div
                                key={branch.id}
                                className='rounded-lg border border-slate-200 p-4 transition-all hover:border-teal-300'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex-1'>
                                        <h3 className='mb-2 font-bold text-slate-900'>{branch.name}</h3>
                                        <p className='text-sm text-slate-600'>{branch.addressLine1}</p>
                                        <p className='text-sm text-slate-600'>{branch.addressLine2}</p>
                                        <p className='text-sm text-slate-600'>
                                            {branch.city}, {branch.state} - {branch.pincode}
                                        </p>
                                        <p className='mt-2 text-sm font-medium text-slate-900'>{branch.phone}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={() => setEditingBranch(branch)}
                                            className='rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200'>
                                            <Edit className='h-4 w-4' />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBranch(branch.id)}
                                            className='rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200'>
                                            <Trash2 className='h-4 w-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button
                    onClick={onSave}
                    className='w-full rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 py-3 font-medium text-white hover:from-teal-700 hover:to-cyan-700'
                >
                    <Save className='mr-2 inline h-4 w-4' />
                    Save All Changes
                </button>
            </div>
        </div>
    );
}

// Certificates Tab
function CertificatesTab({
    certificates,
    isAddingCertificate,
    setIsAddingCertificate,
    onSave,
    onDelete
}: any) {
    const [formData, setFormData] = useState<Certificate>({
        id: '',
        src: '',
        alt: '',
        title: ''
    });

    useEffect(() => {
        if (isAddingCertificate) {
            setFormData({ id: '', src: '', alt: '', title: '' });
        }
    }, [isAddingCertificate]);

    if (isAddingCertificate) {
        return (
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-6 flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-slate-900'>Add Certificate</h3>
                    <button
                        onClick={() => {
                            setIsAddingCertificate(false);
                        }}
                        className='text-slate-600 hover:text-slate-900'>
                        <X className='h-5 w-5' />
                    </button>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave(formData);
                    }}
                    className='space-y-4'>
                    <input
                        type='text'
                        placeholder='Title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        required
                    />
                    <input
                        type='text'
                        placeholder='Alt Text'
                        value={formData.alt}
                        onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900'
                        required
                    />
                    <div className='space-y-3'>
                        <label className='block text-sm font-medium text-slate-700'>
                            Certificate Image (PNG or JPG) *
                        </label>
                        <input
                            type='file'
                            accept='image/png,image/jpeg'
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setFormData({ ...formData, src: event.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className='w-full cursor-pointer rounded-lg border border-slate-300 px-4 py-3 text-slate-900 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white file:transition-colors hover:file:bg-teal-700 focus:border-transparent focus:ring-2 focus:ring-teal-500'
                            required
                        />
                        {formData.src && (
                            <div className='relative inline-block'>
                                <img
                                    src={formData.src}
                                    alt='Preview'
                                    className='h-auto max-w-48 rounded-lg border border-slate-200 shadow-sm'
                                />
                                <button
                                    type='button'
                                    onClick={() => setFormData({ ...formData, src: '' })}
                                    className='absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600'>
                                    <X className='h-4 w-4' />
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 py-3 font-medium text-white hover:from-teal-700 hover:to-cyan-700'>
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
                <button
                    onClick={() => setIsAddingCertificate(true)}
                    className='flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700'>
                    <Plus className='h-4 w-4' />
                    Add Certificate
                </button>
            </div>
            <div className='rounded-xl border border-amber-200 bg-amber-50 p-4 mb-4'>
                <div className='flex gap-2'>
                    <AlertCircle className='h-5 w-5 text-amber-600 shrink-0 mt-0.5' />
                    <div>
                        <p className='text-sm font-semibold text-amber-900'>Backend Note</p>
                        <p className='text-sm text-amber-800'>
                            Certificate editing is not available - backend only supports create and delete operations.
                        </p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {certificates.map((cert: Certificate) => (
                    <div
                        key={cert.id}
                        className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
                        <img src={cert.src} alt={cert.alt} className='mb-3 h-32 w-full rounded-lg object-cover' />
                        <h3 className='text-sm font-bold text-slate-900'>{cert.title}</h3>
                        <div className='mt-3'>
                            <button
                                onClick={() => onDelete(cert.id)}
                                className='w-full rounded bg-red-100 py-2 text-xs font-medium text-red-600 hover:bg-red-200'>
                                Delete
                            </button>
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

    const filteredInquiries =
        statusFilter === 'all' ? inquiries : inquiries.filter((inq: Inquiry) => inq.status === statusFilter);

    const getStatusColor = (status: Inquiry['status']) => {
        switch (status) {
            case 'new':
                return 'bg-red-100 text-red-700';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700';
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-slate-100 text-slate-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold text-slate-900'>Inbox</h2>
                    <p className='text-sm text-slate-600'>Manage customer inquiries</p>
                </div>
                <div className='flex items-center gap-3'>
                    {/* View Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'compact' ? 'large' : 'compact')}
                        className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shadow-sm transition-all hover:bg-slate-200'
                        title={`Switch to ${viewMode === 'compact' ? 'large' : 'compact'} view`}>
                        {viewMode === 'compact' ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />}
                    </button>

                    {/* Status Filters */}
                    <div className='flex gap-2'>
                        {['all', 'new', 'in-progress', 'completed', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status as any)}
                                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                                    statusFilter === status
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                {status === 'all' && ` (${inquiries.length})`}
                                {status === 'new' &&
                                    ` (${inquiries.filter((i: Inquiry) => i.status === 'new').length})`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredInquiries.length === 0 ? (
                <div className='rounded-xl border border-slate-200 bg-white p-12 text-center'>
                    <Mail className='mx-auto mb-4 h-16 w-16 text-slate-300' />
                    <h3 className='mb-2 text-xl font-bold text-slate-900'>No inquiries found</h3>
                    <p className='text-slate-600'>
                        {statusFilter === 'all' ? 'No customer inquiries yet' : `No ${statusFilter} inquiries`}
                    </p>
                </div>
            ) : viewMode === 'compact' ? (
                // COMPACT VIEW
                <div className='space-y-2'>
                    {filteredInquiries.map((inquiry: Inquiry) => (
                        <div
                            key={inquiry.id}
                            className='overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:border-teal-300 hover:shadow-md'>
                            <div className='flex items-center justify-between p-4'>
                                <div className='min-w-0 flex-1'>
                                    <div className='mb-1 flex items-center gap-2'>
                                        <h3 className='truncate text-sm font-bold text-slate-900'>
                                            {inquiry.customerName}
                                        </h3>
                                        <span
                                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap ${getStatusColor(inquiry.status)}`}>
                                            {inquiry.status === 'in-progress'
                                                ? 'Progress'
                                                : inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className='mb-1 flex flex-wrap items-center gap-2 text-xs text-slate-600'>
                                        <span className='flex items-center gap-1 truncate'>
                                            <Mail className='h-3 w-3 shrink-0' />
                                            {inquiry.customerEmail}
                                        </span>
                                        {inquiry.customerPhone && (
                                            <span className='rounded bg-slate-100 px-2 py-0.5 text-slate-700'>
                                                📞 {inquiry.customerPhone}
                                            </span>
                                        )}
                                    </div>
                                    {inquiry.companyName && (
                                        <p className='text-xs text-slate-500'>🏢 {inquiry.companyName}</p>
                                    )}
                                    {inquiry.products && inquiry.products.length > 0 && (
                                        <div className='mt-1 flex items-center gap-1 text-xs text-teal-700'>
                                            <span className='font-semibold'>
                                                📦 {inquiry.products.length} Product
                                                {inquiry.products.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons - Compact */}
                                <div className='ml-3 flex shrink-0 gap-1.5'>
                                    <button
                                        onClick={() => setSelectedInquiry(inquiry)}
                                        className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm transition-all hover:scale-110 hover:bg-blue-200'
                                        title='View details'>
                                        <Eye className='h-4 w-4' />
                                    </button>
                                    {inquiry.status !== 'in-progress' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'in-progress')}
                                            className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 shadow-sm transition-all hover:scale-110 hover:bg-cyan-200'
                                            title='Mark in progress'>
                                            ⏳
                                        </button>
                                    )}
                                    {inquiry.status !== 'completed' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'completed')}
                                            className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-green-100 text-green-600 shadow-sm transition-all hover:scale-110 hover:bg-green-200'
                                            title='Mark completed'>
                                            ✓
                                        </button>
                                    )}
                                    {inquiry.status !== 'rejected' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'rejected')}
                                            className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-red-100 text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-200'
                                            title='Reject'>
                                            ✕
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this inquiry?')) onDelete(inquiry.id);
                                        }}
                                        className='flex h-9 w-9 transform items-center justify-center rounded-lg bg-red-100 text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-200'
                                        title='Delete inquiry'>
                                        <Trash2 className='h-4 w-4' />
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
                            className='overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition-all hover:border-teal-400 hover:shadow-lg'>
                            <div className='p-6'>
                                <div className='mb-4 flex items-start justify-between'>
                                    <div className='flex-1'>
                                        <h3 className='mb-1 text-lg font-bold text-slate-900'>
                                            {inquiry.customerName}
                                        </h3>
                                        <div className='flex flex-wrap items-center gap-3 text-sm text-slate-600'>
                                            <span className='flex items-center gap-1'>
                                                <Mail className='h-4 w-4' />
                                                {inquiry.customerEmail}
                                            </span>
                                            {inquiry.customerPhone && (
                                                <span className='flex items-center gap-1'>
                                                    📞 {inquiry.customerPhone}
                                                </span>
                                            )}
                                            {inquiry.companyName && (
                                                <span className='flex items-center gap-1'>
                                                    🏢 {inquiry.companyName}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap ${getStatusColor(inquiry.status)}`}>
                                        {inquiry.status === 'in-progress'
                                            ? 'In Progress'
                                            : inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                    </span>
                                </div>

                                {inquiry.createdAt && (
                                    <p className='mb-3 text-xs text-slate-500'>
                                        📅 {new Date(inquiry.createdAt).toLocaleString()}
                                    </p>
                                )}

                                {inquiry.products && inquiry.products.length > 0 && (
                                    <div className='mb-3'>
                                        <p className='mb-2 text-sm font-semibold text-slate-700'>
                                            📦 Products Interested In:
                                        </p>
                                        <div className='flex flex-wrap gap-2'>
                                            {inquiry.products.map((product) => (
                                                <span
                                                    key={product.id}
                                                    className='rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700'>
                                                    {product.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className='mb-4'>
                                    <p className='mb-2 text-sm font-semibold text-slate-700'>Requirements:</p>
                                    <p className='rounded-lg bg-slate-50 p-3 text-sm whitespace-pre-wrap text-slate-700'>
                                        {inquiry.requirements}
                                    </p>
                                </div>

                                {inquiry.notes && (
                                    <div className='mb-4'>
                                        <p className='mb-2 text-sm font-semibold text-slate-700'>Admin Notes:</p>
                                        <p className='rounded-lg bg-slate-50 p-3 text-sm text-slate-700'>
                                            {inquiry.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Actions - Large View */}
                                <div className='flex items-center gap-2 border-t border-slate-200 pt-3'>
                                    <button
                                        onClick={() => setSelectedInquiry(inquiry)}
                                        className='flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-200'>
                                        <Eye className='h-4 w-4' /> View Details
                                    </button>
                                    {inquiry.status !== 'in-progress' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'in-progress')}
                                            className='rounded-lg bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-600 transition-all hover:bg-cyan-200'>
                                            In Progress
                                        </button>
                                    )}
                                    {inquiry.status !== 'completed' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'completed')}
                                            className='rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600 transition-all hover:bg-green-200'>
                                            Complete
                                        </button>
                                    )}
                                    {inquiry.status !== 'rejected' && (
                                        <button
                                            onClick={() => onStatusChange(inquiry.id, 'rejected')}
                                            className='rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-200'>
                                            Reject
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this inquiry?')) onDelete(inquiry.id);
                                        }}
                                        className='ml-auto flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-200'>
                                        <Trash2 className='h-4 w-4' /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedInquiry && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'>
                    <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6'>
                        <div className='mb-6 flex items-center justify-between'>
                            <h3 className='text-2xl font-bold text-slate-900'>Inquiry Details</h3>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className='rounded-lg p-2 transition-colors hover:bg-slate-100'>
                                <X className='h-6 w-6' />
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
                                    <p className='text-slate-900'>
                                        {new Date(selectedInquiry.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className='text-sm font-semibold text-slate-700'>Status</label>
                                <p
                                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(selectedInquiry.status)}`}>
                                    {selectedInquiry.status.replace('-', ' ').toUpperCase()}
                                </p>
                            </div>

                            {selectedInquiry.products && selectedInquiry.products.length > 0 && (
                                <div>
                                    <label className='text-sm font-semibold text-slate-700'>
                                        Products Interested In
                                    </label>
                                    <ul className='list-inside list-disc text-slate-900'>
                                        {selectedInquiry.products.map((product) => (
                                            <li key={product.id}>{product.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <label className='text-sm font-semibold text-slate-700'>Requirements</label>
                                <p className='rounded-lg bg-slate-50 p-4 whitespace-pre-wrap text-slate-900'>
                                    {selectedInquiry.requirements}
                                </p>
                            </div>

                            {selectedInquiry.notes && (
                                <div>
                                    <label className='text-sm font-semibold text-slate-700'>Admin Notes</label>
                                    <p className='rounded-lg bg-slate-50 p-4 text-slate-900'>{selectedInquiry.notes}</p>
                                </div>
                            )}

                            {/* Status Actions */}
                            <div className='mt-6 flex gap-2 border-t border-slate-100 pt-3'>
                                {selectedInquiry.status !== 'in-progress' && (
                                    <button
                                        onClick={() => {
                                            onStatusChange(selectedInquiry.id, 'in-progress');
                                            setSelectedInquiry(null);
                                        }}
                                        className='rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>
                                        In Progress
                                    </button>
                                )}
                                {selectedInquiry.status !== 'completed' && (
                                    <button
                                        onClick={() => {
                                            onStatusChange(selectedInquiry.id, 'completed');
                                            setSelectedInquiry(null);
                                        }}
                                        className='rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700'>
                                        Complete
                                    </button>
                                )}
                                {selectedInquiry.status !== 'rejected' && (
                                    <button
                                        onClick={() => {
                                            onStatusChange(selectedInquiry.id, 'rejected');
                                            setSelectedInquiry(null);
                                        }}
                                        className='rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'>
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
