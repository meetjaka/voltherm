import type { Product, Certificate, Inquiry, ContactInfo } from './adminData';

export class ModelMapper {
  // Convert Frontend Product to Backend-compatible JSON
  static frontendToBackendProduct(product: Partial<Product>): any {
    console.log('🔄 ModelMapper: Converting frontend product to backend format...');
    console.log('📥 Input product:', JSON.stringify(product, null, 2));
    
    // Process technical specifications
    const specFields: string[] = [];
    const specValues: string[] = [];
    
    if (product.technicalSpecs && Array.isArray(product.technicalSpecs)) {
      // Standard format: array of {key, value} objects
      product.technicalSpecs.forEach((spec) => {
        const field = spec?.key?.trim();
        const value = spec?.value?.trim();
        if (field && value) {
          specFields.push(field);
          specValues.push(value);
        }
      });
    } else if ((product as any).specificationFields && (product as any).specificationValues) {
      // Direct arrays format
      const minLength = Math.min((product as any).specificationFields.length, (product as any).specificationValues.length);
      for (let i = 0; i < minLength; i++) {
        const field = (product as any).specificationFields[i]?.trim();
        const value = (product as any).specificationValues[i]?.trim();
        if (field && value) {
          specFields.push(field);
          specValues.push(value);
        }
      }
    }
    
    console.log(`📊 Processed specifications: ${specFields.length} fields, ${specValues.length} values`);
    
    // Build backend product with exact field names expected by backend
    const backendProduct = {
      // Only include productId for updates, never for new products
      ...((product as any).backendId ? { productId: (product as any).backendId } : {}),
      productName: product.title?.trim() || (product as any).productName?.trim() || '',
      price: Math.max(0, Number(product.price) || 0),
      featured: Boolean(product.featured),
      available: product.available !== false, // Jackson strips 'is' prefix: isAvailable() getter → JSON key 'available'
      category: product.category?.trim() || '',
      subCategory: (product as any).subCategoryId?.trim() || (product as any).subCategory?.trim() || '',
      productDescription: product.description?.trim() || '', // Backend field is 'productDescription', not 'description'
      specificationFields: specFields, // Backend expects array with this field name
      specificationValues: specValues, // Backend expects array with this field name
      quickSpecs: Array.isArray(product.specs) ? product.specs.filter(s => s.trim()) : [], // Backend expects "quickSpecs" array, not "tags"
      voltage: (product as any).voltage || '',
      capacity: (product as any).capacity || ''
    };
    
    // Remove any undefined/null values to keep JSON clean
    Object.keys(backendProduct).forEach(key => {
      if ((backendProduct as any)[key] === undefined || (backendProduct as any)[key] === null) {
        delete (backendProduct as any)[key];
      }
    });
    
    console.log('📤 Output backend product:', JSON.stringify(backendProduct, null, 2));
    
    // Final JSON validation
    try {
      const jsonTest = JSON.stringify(backendProduct);
      JSON.parse(jsonTest); // Ensure it's valid JSON
      console.log('✅ Backend product data validated and JSON-compliant');
    } catch (jsonError) {
      console.error('❌ JSON validation failed:', jsonError);
      throw new Error('Product data is not JSON serializable');
    }
    
    return backendProduct;
  }

  // Convert Backend Product to Frontend Product
  static backendToFrontendProduct(backendProduct: any): Product {
    console.log('🔄 ModelMapper: Converting backend product to frontend format...');
    
    // Backend sends arrays, not comma-separated strings
    const specFields = Array.isArray(backendProduct.specificationFields) 
      ? backendProduct.specificationFields 
      : (backendProduct.specifications ? backendProduct.specifications.split(',').map((s: string) => s.trim()).filter((s: string) => s) : []);
    
    const specValues = Array.isArray(backendProduct.specificationValues) 
      ? backendProduct.specificationValues 
      : (backendProduct.specificationValues ? backendProduct.specificationValues.split(',').map((s: string) => s.trim()).filter((s: string) => s) : []);
    
    // Build technical specs array
    const technicalSpecs = [];
    const maxLength = Math.max(specFields.length, specValues.length);
    for (let i = 0; i < Math.min(maxLength, 6); i++) {
      technicalSpecs.push({
        key: specFields[i] || '',
        value: specValues[i] || ''
      });
    }
    
    // Ensure at least 4 specs for form compatibility
    while (technicalSpecs.length < 4) {
      technicalSpecs.push({ key: '', value: '' });
    }
    
    // Backend sends quickSpecs array, not tags string
    const quickSpecsArray = Array.isArray(backendProduct.quickSpecs) 
      ? backendProduct.quickSpecs 
      : (backendProduct.tags ? backendProduct.tags.split(',').map((s: string) => s.trim()).filter((s: string) => s) : []);
    
    const frontendProduct: Product = {
      id: backendProduct.id || backendProduct.productId || Math.floor(Math.random() * 1000000),
      backendId: backendProduct.id || backendProduct.productId, // Store backend ID for updates
      title: backendProduct.productName || backendProduct.title || '',
      description: backendProduct.productDescription || backendProduct.description || '', // Backend uses 'productDescription'
      image: backendProduct.imageUrl || backendProduct.image || '',
      price: backendProduct.price || 0,
      featured: Boolean(backendProduct.featured),
      available: backendProduct.available !== false, // Jackson strips 'is' from isAvailable() getter → JSON key is 'available'
      specs: quickSpecsArray,
      technicalSpecs: technicalSpecs,
      category: backendProduct.category || '',
      subCategoryId: backendProduct.subCategory || backendProduct.subCategoryId || '',
      voltage: backendProduct.voltage || '',
      capacity: backendProduct.capacity || '',
      pdfDownloadUrl: backendProduct.pdfDownloadUrl || backendProduct.pdfUrl || null
    };
    
    console.log('✅ Frontend product converted:', frontendProduct.title);
    return frontendProduct;
  }

  // Convert Backend Certificate to Frontend Certificate
  static backendToFrontendCertificate(backendCert: any): Certificate {
    const rawUrl: string = backendCert.imageUrl || backendCert.url || '';
    // Relative paths (e.g. /images/uuid.jpg) must be prefixed with the backend
    // base URL so they resolve against Spring Boot, not the Next.js origin.
    const API_BASE = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL)
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:8080';
    const resolvedUrl = rawUrl.startsWith('/') ? `${API_BASE}${rawUrl}` : rawUrl;
    return {
      id: backendCert.id,
      src: resolvedUrl,
      alt: backendCert.name || 'Certificate',
      title: backendCert.name || 'Certificate'
    };
  }
  
  // Note: Certificate creation uses FormData, not JSON transformation

  // Convert Frontend Inquiry to Backend Inquiry  
  static frontendToBackendInquiry(inquiry: Inquiry): any {
    // Extract product IDs from products array (backend expects string[] not object[])
    let productIds: string[] = [];
    if (Array.isArray(inquiry.products)) {
      productIds = inquiry.products.map((p: any) => {
        // If it's an object with id property, extract id
        if (typeof p === 'object' && p.id) {
          return String(p.id);
        }
        // If it's already a string, use it
        return String(p);
      });
    }
    
    console.log('🔄 [MODEL MAPPER] Converting inquiry to backend format');
    console.log('📥 Frontend products:', inquiry.products);
    console.log('📤 Backend productIds:', productIds);
    
    return {
      id: inquiry.id,
      name: inquiry.customerName,
      email: inquiry.customerEmail,
      phoneNumber: inquiry.customerPhone,
      company: inquiry.companyName,
      requirements: inquiry.requirements,
      status: inquiry.status,
      interestedProducts: productIds,
      cartItems: Array.isArray(inquiry.products)
        ? inquiry.products.map((p: any) => ({
            title: typeof p === 'object' ? (p.title || String(p.id)) : String(p),
            quantity: typeof p === 'object' ? (p.quantity ?? 1) : 1
          }))
        : [],
      createdAt: inquiry.createdAt
    };
  }

  // Convert Backend Inquiry to Frontend Inquiry
  static backendToFrontendInquiry(backendInquiry: any): Inquiry {
    return {
      id: backendInquiry.id,
      customerName: backendInquiry.name,
      customerEmail: backendInquiry.email,
      customerPhone: backendInquiry.phoneNumber,
      companyName: backendInquiry.company,
      requirements: backendInquiry.requirements,
      status: backendInquiry.status || 'new',
      products: backendInquiry.interestedProducts || [],
      createdAt: backendInquiry.createdAt,
      notes: backendInquiry.notes
    };
  }

  // Convert Backend ContactInfo to Frontend ContactInfo
  static backendToFrontendContactInfo(backendContact: any): ContactInfo {
    const branches = (backendContact.branches || []).map((b: any) => ({
      id: b.branchId || b.id || '',
      name: b.branchName || b.name || '',
      addressLine1: b.addressLine1 || '',
      addressLine2: b.addressLine2 || '',
      city: b.city || '',
      state: b.state || '',
      pincode: String(b.pincode || ''),
      phone: b.phoneNumber || b.phone || '',
      mapUrl: b.mapUrl || ''
    }));

    const mainAddress = backendContact.mainAddress
      ? {
          companyName: backendContact.mainAddress.companyName || '',
          addressLine1: backendContact.mainAddress.addressLine1 || '',
          addressLine2: backendContact.mainAddress.addressLine2 || '',
          city: backendContact.mainAddress.city || '',
          state: backendContact.mainAddress.state || '',
          pincode: String(backendContact.mainAddress.pincode || ''),
          phoneNumber: backendContact.mainAddress.phoneNumber || '',
          gst: backendContact.mainAddress.gst || '',
          mapUrl: backendContact.mainAddress.mapUrl || ''
        }
      : undefined;

    return {
      sales: {
        email: backendContact.salesEmail || '',
        phone: backendContact.salesPhoneNumber || ''
      },
      business: {
        email: backendContact.businessEmail || ''
      },
      support: {
        phone: backendContact.supportPhoneNumber || ''
      },
      socialMedia: {
        facebook: backendContact.facebookUrl || '',
        instagram: backendContact.instagramUrl || '',
        linkedin: backendContact.linkedinUrl || '',
        twitter: backendContact.xUrl || '',
        indiamart: backendContact.indiamartUrl || ''
      },
      mainAddress,
      branches
    };
  }

  // Convert Frontend ContactInfo to Backend ContactInfo
  static frontendToBackendContactInfo(frontendContact: ContactInfo): any {
    const branches = (frontendContact.branches || []).map((b: any) => ({
      branchId: b.id || '',
      branchName: b.name || '',
      addressLine1: b.addressLine1 || '',
      addressLine2: b.addressLine2 || '',
      city: b.city || '',
      state: b.state || '',
      pincode: parseInt(b.pincode) || 0,
      phoneNumber: b.phone || b.phoneNumber || '',
      mapUrl: b.mapUrl || ''
    }));

    const mainAddress = frontendContact.mainAddress
      ? {
          companyName: frontendContact.mainAddress.companyName || '',
          addressLine1: frontendContact.mainAddress.addressLine1 || '',
          addressLine2: frontendContact.mainAddress.addressLine2 || '',
          city: frontendContact.mainAddress.city || '',
          state: frontendContact.mainAddress.state || '',
          pincode: frontendContact.mainAddress.pincode || '',
          phoneNumber: frontendContact.mainAddress.phoneNumber || '',
          gst: frontendContact.mainAddress.gst || '',
          mapUrl: frontendContact.mainAddress.mapUrl || ''
        }
      : null;

    return {
      salesEmail: frontendContact.sales?.email || '',
      salesPhoneNumber: frontendContact.sales?.phone || '',
      businessEmail: frontendContact.business?.email || '',
      supportPhoneNumber: frontendContact.support?.phone || '',
      facebookUrl: frontendContact.socialMedia?.facebook || '',
      instagramUrl: frontendContact.socialMedia?.instagram || '',
      linkedinUrl: frontendContact.socialMedia?.linkedin || '',
      xUrl: frontendContact.socialMedia?.twitter || '',
      indiamartUrl: frontendContact.socialMedia?.indiamart || '',
      mainAddress,
      branches
    };
  }
}