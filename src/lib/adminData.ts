// Admin data management utilities

export interface Product {
    id: number;
    backendId?: string; // Original backend UUID for updates
    title: string;
    description: string;
    image: string;
    specs: string[];
    color?: string; // Optional color gradient for carousel/display
    category?: string;
    subCategoryId?: string; // Link to SubCategory
    categoryId?: string; // Deprecated - for backward compatibility
    visible?: boolean;
    available?: boolean; // Product availability for store
    featured?: boolean; // Product featured on home page slider
    price?: number; // Optional price field
    capacity?: string; // Battery capacity (e.g., "75 kWh")
    voltage?: string; // Battery voltage (e.g., "400V")
    technicalSpecs?: Array<{ key: string; value: string }>; // Technical specifications (max 6)
    pdfDownloadUrl?: string; // URL for downloadable product datasheet
}

export interface MainCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    visible: boolean;
    order: number;
}

export interface SubCategory {
    id: string;
    mainCategoryId: string; // Link to MainCategory
    name: string;
    slug: string;
    description: string;
    icon: string; // Icon name or emoji
    visible: boolean;
    order: number;
}

// For backward compatibility
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon?: string; // Icon name or emoji
    visible: boolean;
    order: number;
}

export interface Inquiry {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    companyName?: string;
    requirements: string;
    products: {
        id: number;
        title: string;
    }[];
    status: 'new' | 'in-progress' | 'completed' | 'rejected';
    createdAt: number;
    notes?: string;
}

export interface Certificate {
    id: string;
    src: string;
    alt: string;
    title: string;
}

export interface ContactInfo {
    sales: {
        email: string;
        phone: string;
    };
    business: {
        email: string;
    };
    support: {
        phone: string;
    };
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        indiamart?: string;
    };
    mainAddress?: {
        companyName: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
        gst?: string;
        mapUrl?: string;
    };
    branches?: Array<{
        id: string;
        name: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
        mapUrl?: string;
    }>;
}

export interface Section {
    id: string;
    title: string;
    content: string;
    visible: boolean;
}

// Default main categories (4 applications)
export const defaultMainCategories: MainCategory[] = [
    {
        id: 'main1',
        name: 'Automobile Application',
        slug: 'automobile',
        description: 'High-performance battery solutions for electric vehicles.',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format',
        visible: true,
        order: 1
    },
    {
        id: 'main2',
        name: 'Aerospace Application',
        slug: 'aerospace',
        description: 'Lightweight, reliable batteries for aerospace systems.',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format',
        visible: true,
        order: 2
    },
    {
        id: 'main3',
        name: 'BESS Application',
        slug: 'bess',
        description: 'Battery Energy Storage System solutions.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format',
        visible: true,
        order: 3
    },
    {
        id: 'main4',
        name: 'Telecom Application',
        slug: 'telecom',
        description: 'Reliable backup power for telecom infrastructure.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format',
        visible: true,
        order: 4
    }
];

// Default sub-categories
export const defaultSubCategories: SubCategory[] = [
    // Automobile Application sub-categories
    {
        id: 'sub1',
        mainCategoryId: 'main1',
        name: 'E-Bike Solutions',
        slug: 'e-bike-solutions',
        description: 'High-performance battery solutions for electric bikes',
        icon: 'Bike',
        visible: true,
        order: 1
    },
    {
        id: 'sub2',
        mainCategoryId: 'main1',
        name: 'Three-Wheeler',
        slug: 'three-wheeler',
        description: 'Robust battery systems for three-wheeler vehicles',
        icon: 'Truck',
        visible: true,
        order: 2
    },
    {
        id: 'sub3',
        mainCategoryId: 'main1',
        name: 'Two-Wheeler',
        slug: 'two-wheeler',
        description: 'Compact and efficient batteries for two-wheelers',
        icon: 'Bike',
        visible: true,
        order: 3
    },
    // Aerospace Application sub-categories
    {
        id: 'sub4',
        mainCategoryId: 'main2',
        name: 'UAV Systems',
        slug: 'uav-systems',
        description: 'Lightweight batteries for unmanned aerial vehicles',
        icon: 'Plane',
        visible: true,
        order: 1
    },
    {
        id: 'sub5',
        mainCategoryId: 'main2',
        name: 'Satellite Power',
        slug: 'satellite-power',
        description: 'High-reliability power systems for satellites',
        icon: 'Satellite',
        visible: true,
        order: 2
    },
    {
        id: 'sub6',
        mainCategoryId: 'main2',
        name: 'Aircraft Systems',
        slug: 'aircraft-systems',
        description: 'Aviation-grade battery solutions',
        icon: 'PlaneTakeoff',
        visible: true,
        order: 3
    },
    // BESS Application sub-categories
    {
        id: 'sub7',
        mainCategoryId: 'main3',
        name: 'Residential Storage',
        slug: 'residential-storage',
        description: 'Home energy storage solutions',
        icon: 'Home',
        visible: true,
        order: 1
    },
    {
        id: 'sub8',
        mainCategoryId: 'main3',
        name: 'Commercial Storage',
        slug: 'commercial-storage',
        description: 'Large-scale commercial energy storage',
        icon: 'Building',
        visible: true,
        order: 2
    },
    {
        id: 'sub9',
        mainCategoryId: 'main3',
        name: 'Grid Storage',
        slug: 'grid-storage',
        description: 'Utility-scale grid energy storage',
        icon: 'Zap',
        visible: true,
        order: 3
    },
    // Telecom Application sub-categories
    {
        id: 'sub10',
        mainCategoryId: 'main4',
        name: 'Base Station',
        slug: 'base-station',
        description: 'Backup power for telecom base stations',
        icon: 'Radio',
        visible: true,
        order: 1
    },
    {
        id: 'sub11',
        mainCategoryId: 'main4',
        name: 'Data Center',
        slug: 'data-center',
        description: 'Reliable power for data centers',
        icon: 'Server',
        visible: true,
        order: 2
    },
    {
        id: 'sub12',
        mainCategoryId: 'main4',
        name: 'Remote Sites',
        slug: 'remote-sites',
        description: 'Off-grid telecom power solutions',
        icon: 'Signal',
        visible: true,
        order: 3
    }
];

// Backward compatibility - return sub-categories as categories
export const defaultCategories: Category[] = defaultSubCategories.map(sub => ({
    ...sub,
    icon: sub.icon
}));

// Default data
export const defaultProducts: Product[] = [
    {
        id: 1,
        title: 'Lithium ion Battery Pack (2 Wheeler)',
        description:
            'High-performance lithium-ion battery solution specifically designed for two-wheeler electric vehicles with superior energy density.',
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png',
        specs: ['2 Wheeler', 'Lithium Ion', 'Premium'],
        color: 'from-teal-500 to-cyan-400',
        visible: true,
        available: true,
        subCategoryId: 'sub3', // Two-Wheeler
        categoryId: 'sub3' // Backward compatibility
    },
    {
        id: 2,
        title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
        description:
            'Safe and reliable LiFePo4 battery pack offering excellent cycle life and thermal stability for various applications.',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
        specs: ['LiFePo4', 'Reliable', 'Long Life'],
        color: 'from-blue-500 to-cyan-400',
        visible: true,
        available: true,
        subCategoryId: 'sub1', // E-Bike Solutions
        categoryId: 'sub1' // Backward compatibility
    },
    {
        id: 3,
        title: 'Solar Smart Bench',
        description:
            'Innovative solar-powered intelligent bench combining energy storage with smart charging capabilities for public spaces.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
        specs: ['Solar Powered', 'Smart Tech', 'Public'],
        color: 'from-amber-500 to-orange-400',
        visible: true,
        available: true,
        subCategoryId: 'sub1', // E-Bike Solutions
        categoryId: 'sub1' // Backward compatibility
    },
    {
        id: 4,
        title: 'LFP Battery Pack',
        description:
            'Lightweight and powerful LFP battery pack engineered for maximum performance and reliability in demanding applications.',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
        specs: ['LFP', 'Lightweight', 'High Power'],
        color: 'from-purple-500 to-pink-400',
        visible: true,
        available: true,
        subCategoryId: 'sub2', // Three-Wheeler
        categoryId: 'sub2' // Backward compatibility
    },
    {
        id: 5,
        title: 'Stackable Battery Packs',
        description:
            'Modular and stackable battery pack system designed for scalable energy storage solutions with flexible configurations.',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format',
        specs: ['Stackable', 'Modular', 'Scalable'],
        color: 'from-slate-500 to-gray-600',
        visible: true,
        available: true,
        subCategoryId: 'sub2', // Three-Wheeler
        categoryId: 'sub2' // Backward compatibility
    },
    {
        id: 6,
        title: 'Drone Battery Pack',
        description:
            'Specialized battery pack designed for drone applications with optimized weight-to-power ratio and fast charging capability.',
        image: 'https://5.imimg.com/data5/ANDROID/Default/2025/9/546735543/OQ/MC/GY/100678072/product-jpeg.jpg',
        specs: ['Drone Ready', 'Fast Charge', 'Lightweight'],
        color: 'from-red-500 to-pink-400',
        visible: true,
        available: true,
        subCategoryId: 'sub1', // E-Bike Solutions
        categoryId: 'sub1' // Backward compatibility
    }
];

export const defaultCertificates: Certificate[] = [
    {
        id: 'cert1',
        src: '/certificate/c1.png',
        alt: 'ISO Certificate 1',
        title: 'International Standard'
    },
    {
        id: 'cert2',
        src: '/certificate/c2.png',
        alt: 'ISO Certificate 2',
        title: 'Quality Management'
    },
    {
        id: 'cert3',
        src: '/certificate/c3.png',
        alt: 'ISO Certificate 3',
        title: 'Compliance'
    }
];

export const defaultContactInfo: ContactInfo = {
    sales: {
        email: 'Volthermtechnologies@gmail.com',
        phone: '+91 7485918169'
    },
    business: {
        email: 'Voltherminnovationacc@gmail.com'
    },
    support: {
        phone: '+91 7011418631'
    },
    socialMedia: {
        facebook: 'https://www.facebook.com/Voltherm/',
        instagram: 'https://www.instagram.com/volthermtech/',
        linkedin: 'https://www.linkedin.com/company/voltherm-innovation/',
        twitter: '',
        indiamart: 'https://www.indiamart.com/voltherm-technologies/'
    },
    mainAddress: {
        companyName: 'VOLTHERM INNOVATION PRIVATE LIMITED',
        addressLine1: 'Plot No. B-5/2, GIDC, Electronics Estate,',
        addressLine2: 'Sector 25, Gandhinagar',
        city: 'Gandhinagar',
        state: 'Gujarat',
        pincode: '382024',
        phone: '+91 7485918169 / +91 7011418631',
        gst: '24AAJCV4770E1Z9',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.8583!2d72.628678!3d23.249254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzU3LjMiTiA3MsKwMzcnNDMuMiJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin'
    },
    branches: [
        {
            id: 'branch1',
            name: 'Branch Office - Rajkot',
            addressLine1: 'Plot No. 103, Ruda Transport Nagar,',
            addressLine2: 'Nr. Sat Hanuman, Ahmedabad Highway, Navagam',
            city: 'Rajkot',
            state: 'Gujarat',
            pincode: '360001',
            phone: '+91-9409421304',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14779.8583!2d70.851786!3d22.328773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE5JzQzLjYiTiA3MMKwNTEnMDYuNCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin'
        }
    ]
};

// Storage keys
const STORAGE_KEYS = {
    PRODUCTS: 'voltherm_products',
    CERTIFICATES: 'voltherm_certificates',
    CONTACT: 'voltherm_contact',
    SECTIONS: 'voltherm_sections',
    INQUIRIES: 'voltherm_inquiries',
    CATEGORIES: 'voltherm_categories',
    MAIN_CATEGORIES: 'voltherm_main_categories',
    SUB_CATEGORIES: 'voltherm_sub_categories'
};

// Data management functions
export function getProducts(): Product[] {
    if (typeof window === 'undefined') return defaultProducts;
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return stored ? JSON.parse(stored) : defaultProducts;
}

export function saveProducts(products: Product[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
}

export function getCertificates(): Certificate[] {
    if (typeof window === 'undefined') return defaultCertificates;
    const stored = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    return stored ? JSON.parse(stored) : defaultCertificates;
}

export function saveCertificates(certificates: Certificate[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    }
}

export function getContactInfo(): ContactInfo {
    if (typeof window === 'undefined') return defaultContactInfo;
    const stored = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return stored ? JSON.parse(stored) : defaultContactInfo;
}

export function saveContactInfo(contact: ContactInfo) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
    }
}

export function getSections(): Section[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.SECTIONS);
    return stored ? JSON.parse(stored) : [];
}

export function saveSections(sections: Section[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections));
    }
}

// Inquiry management functions
export function getInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return stored ? JSON.parse(stored) : [];
}

export function saveInquiries(inquiries: Inquiry[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    }
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const newInquiry: Inquiry = {
        ...inquiry,
        id: `INQ${Date.now()}`,
        createdAt: Date.now(),
        status: 'new'
    };
    
    const inquiries = getInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);
    
    return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status'], notes?: string) {
    const inquiries = getInquiries();
    const updated = inquiries.map(inq => 
        inq.id === id ? { ...inq, status, notes: notes || inq.notes } : inq
    );
    saveInquiries(updated);
}

export function deleteInquiry(id: string) {
    const inquiries = getInquiries();
    const filtered = inquiries.filter(inq => inq.id !== id);
    saveInquiries(filtered);
}

// Category management functions
export function getCategories(): Category[] {
    if (typeof window === 'undefined') return defaultCategories;
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : defaultCategories;
}

export function saveCategories(categories: Category[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    }
}

export function addCategory(category: Omit<Category, 'id' | 'order'>): Category {
    const categories = getCategories();
    const newCategory: Category = {
        ...category,
        id: `cat${Date.now()}`,
        order: categories.length + 1
    };
    
    categories.push(newCategory);
    saveCategories(categories);
    
    return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>) {
    const categories = getCategories();
    const updated = categories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
    );
    saveCategories(updated);
}

export function deleteCategory(id: string) {
    const categories = getCategories();
    const filtered = categories.filter(cat => cat.id !== id);
    
    // Reorder remaining categories
    const reordered = filtered.map((cat, index) => ({
        ...cat,
        order: index + 1
    }));
    
    saveCategories(reordered);
    
    // Also remove categoryId from products
    const products = getProducts();
    const updatedProducts = products.map(p => 
        p.categoryId === id ? { ...p, categoryId: undefined } : p
    );
    saveProducts(updatedProducts);
}

export function reorderCategories(categoryIds: string[]) {
    const categories = getCategories();
    const reordered = categoryIds.map((id, index) => {
        const cat = categories.find(c => c.id === id);
        return cat ? { ...cat, order: index + 1 } : null;
    }).filter(Boolean) as Category[];
    
    saveCategories(reordered);
}

// Main Category management functions
export function getMainCategories(): MainCategory[] {
    if (typeof window === 'undefined') return defaultMainCategories;
    const stored = localStorage.getItem(STORAGE_KEYS.MAIN_CATEGORIES);
    return stored ? JSON.parse(stored) : defaultMainCategories;
}

export function saveMainCategories(categories: MainCategory[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.MAIN_CATEGORIES, JSON.stringify(categories));
    }
}

export function addMainCategory(category: Omit<MainCategory, 'id' | 'order'>): MainCategory {
    const categories = getMainCategories();
    const newCategory: MainCategory = {
        ...category,
        id: `main${Date.now()}`,
        order: categories.length + 1
    };
    
    categories.push(newCategory);
    saveMainCategories(categories);
    
    return newCategory;
}

export function updateMainCategory(id: string, updates: Partial<MainCategory>) {
    const categories = getMainCategories();
    const updated = categories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
    );
    saveMainCategories(updated);
}

export function deleteMainCategory(id: string) {
    const categories = getMainCategories();
    const filtered = categories.filter(cat => cat.id !== id);
    
    // Reorder remaining categories
    const reordered = filtered.map((cat, index) => ({
        ...cat,
        order: index + 1
    }));
    
    saveMainCategories(reordered);
    
    // Also delete all sub-categories under this main category
    const subCategories = getSubCategories();
    const filteredSubs = subCategories.filter(sub => sub.mainCategoryId !== id);
    saveSubCategories(filteredSubs);
    
    // Remove subCategoryId from affected products
    const products = getProducts();
    const affectedSubIds = subCategories
        .filter(sub => sub.mainCategoryId === id)
        .map(sub => sub.id);
    const updatedProducts = products.map(p => 
        affectedSubIds.includes(p.subCategoryId || '') 
            ? { ...p, subCategoryId: undefined, categoryId: undefined } 
            : p
    );
    saveProducts(updatedProducts);
}

// Sub-Category management functions
export function getSubCategories(): SubCategory[] {
    if (typeof window === 'undefined') return defaultSubCategories;
    const stored = localStorage.getItem(STORAGE_KEYS.SUB_CATEGORIES);
    return stored ? JSON.parse(stored) : defaultSubCategories;
}

export function getSubCategoriesByMainCategory(mainCategoryId: string): SubCategory[] {
    return getSubCategories().filter(sub => sub.mainCategoryId === mainCategoryId);
}

export function saveSubCategories(categories: SubCategory[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SUB_CATEGORIES, JSON.stringify(categories));
    }
}

export function addSubCategory(category: Omit<SubCategory, 'id' | 'order'>): SubCategory {
    const categories = getSubCategories();
    const sameCategorySubCategories = categories.filter(c => c.mainCategoryId === category.mainCategoryId);
    const newCategory: SubCategory = {
        ...category,
        id: `sub${Date.now()}`,
        order: sameCategorySubCategories.length + 1
    };
    
    categories.push(newCategory);
    saveSubCategories(categories);
    
    return newCategory;
}

export function updateSubCategory(id: string, updates: Partial<SubCategory>) {
    const categories = getSubCategories();
    const updated = categories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
    );
    saveSubCategories(updated);
}

export function deleteSubCategory(id: string) {
    const categories = getSubCategories();
    const filtered = categories.filter(cat => cat.id !== id);
    saveSubCategories(filtered);
    
    // Also remove subCategoryId from products
    const products = getProducts();
    const updatedProducts = products.map(p => 
        p.subCategoryId === id ? { ...p, subCategoryId: undefined, categoryId: undefined } : p
    );
    saveProducts(updatedProducts);
}
