// Admin data management utilities

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  specs: string[];
  color: string;
  category?: string;
  visible?: boolean;
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
}

export interface Section {
  id: string;
  title: string;
  content: string;
  visible: boolean;
}

// Default data
export const defaultProducts: Product[] = [
  {
    id: 1,
    title: 'Lithium ion Battery Pack (2 Wheeler)',
    description: 'High-performance lithium-ion battery solution specifically designed for two-wheeler electric vehicles with superior energy density.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/TL/WW/PA/100678072/60v-20ah-lithium-electric-vehicle-battery-pack.png',
    specs: ['2 Wheeler', 'Lithium Ion', 'Premium'],
    color: 'from-teal-500 to-cyan-400',
    visible: true
  },
  {
    id: 2,
    title: 'Lithium Iron Phosphate (LiFePo4) Battery Pack',
    description: 'Safe and reliable LiFePo4 battery pack offering excellent cycle life and thermal stability for various applications.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
    specs: ['LiFePo4', 'Reliable', 'Long Life'],
    color: 'from-blue-500 to-cyan-400',
    visible: true
  },
  {
    id: 3,
    title: 'Solar Smart Bench',
    description: 'Innovative solar-powered intelligent bench combining energy storage with smart charging capabilities for public spaces.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    specs: ['Solar Powered', 'Smart Tech', 'Public'],
    color: 'from-amber-500 to-orange-400',
    visible: true
  },
  {
    id: 4,
    title: 'LFP Battery Pack',
    description: 'Lightweight and powerful LFP battery pack engineered for maximum performance and reliability in demanding applications.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
    specs: ['LFP', 'Lightweight', 'High Power'],
    color: 'from-purple-500 to-pink-400',
    visible: true
  },
  {
    id: 5,
    title: 'Stackable Battery Packs',
    description: 'Modular and stackable battery pack system designed for scalable energy storage solutions with flexible configurations.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?q=80&w=800&auto=format&fit=crop',
    specs: ['Stackable', 'Modular', 'Scalable'],
    color: 'from-slate-500 to-gray-600',
    visible: true
  },
  {
    id: 6,
    title: 'Drone Battery Pack',
    description: 'Specialized battery pack designed for drone applications with optimized weight-to-power ratio and fast charging capability.',
    image: 'https://5.imimg.com/data5/ANDROID/Default/2025/9/546735543/OQ/MC/GY/100678072/product-jpeg.jpg',
    specs: ['Drone Ready', 'Fast Charge', 'Lightweight'],
    color: 'from-red-500 to-pink-400',
    visible: true
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
    email: 'Sales@VolthermTechnologies.com',
    phone: '+91-7485918169'
  },
  business: {
    email: 'Info@VolthermTechnologies.com'
  },
  support: {
    phone: '+91-9998974127'
  }
};

// Storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'voltherm_products',
  CERTIFICATES: 'voltherm_certificates',
  CONTACT: 'voltherm_contact',
  SECTIONS: 'voltherm_sections'
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
