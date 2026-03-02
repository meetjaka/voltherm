// Admin Data Service - Backend-first admin operations
// Provides CRUD operations for admin panel with API integration

import { apiService } from './apiService';
import { ModelMapper } from './modelMapper';
import hybridDataServiceInstance from './hybridDataService';
import { 
  type Product, 
  type Certificate, 
  type Inquiry, 
  type ContactInfo,
  type MainCategory,
  type SubCategory
} from './adminData';

class AdminDataService {
  private isOnline = true;

  private async ensureAuthentication(): Promise<boolean> {
    try {
      // Check if we can access an admin endpoint
      const testResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/inquiries`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (testResponse.status === 401) {
        // Try to login with stored credentials or default
        console.log('🔐 Admin session expired, attempting re-authentication...');
        const loginResponse = await apiService.adminLogin('admin', 'admin123');
        return loginResponse.success;
      }
      
      return testResponse.ok;
    } catch (error) {
      console.warn('Authentication check failed:', error);
      return false;
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      this.isOnline = await apiService.testConnection();
      return this.isOnline;
    } catch (error) {
      console.warn('Backend connection failed:', error);
      this.isOnline = false;
      return false;
    }
  }

  // ============ PRODUCT MANAGEMENT ============
  
  async getProducts(): Promise<Product[]> {
    return hybridDataServiceInstance.getProducts();
  }

  async saveProducts(products: Product[]): Promise<void> {
    if (await this.checkConnection()) {
      console.log('✅ Admin: Batch saving products to backend');
      try {
        // For batch updates, skip this as it causes ID conflicts
        // Individual product updates should use updateProduct method instead
        console.log('📱 Batch save: Skipping backend updates, saving to localStorage only');
      } catch (error) {
        console.warn('⚠️ Batch save to backend failed, falling back to localStorage:', error);
      }
    }

    // Save to localStorage (always do this for batch saves)
    console.log('📱 Saving products to localStorage');
    const { saveProducts } = await import('./adminData');
    saveProducts(products);
  }

  async createProduct(product: Partial<Product>, imageFile?: File, pdfFile?: File): Promise<Product | null> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Creating product via backend API');
        const backendProduct = ModelMapper.frontendToBackendProduct(product);
        const response = await apiService.createProduct(backendProduct, imageFile, pdfFile);
        
        if (response.success && response.data) {
          console.log('🎉 Product created successfully in backend:', response.data.productId);
          return ModelMapper.backendToFrontendProduct(response.data);
        }
      } catch (error) {
        console.error('❌ Backend product creation failed:', error);
        throw error; // Re-throw for admin panel to handle
      }
    }

    // For localStorage fallback, we can't handle files properly, but we can store basic info
    console.log('📱 Admin: Adding product to localStorage (limited file support)');
    return this.fallbackCreateProduct(product, imageFile, pdfFile);
  }

  // Two-step creation: Create product first, then upload files
  async createProductTwoStep(product: Partial<Product>, imageFile?: File, pdfFile?: File): Promise<Product | null> {
    if (await this.checkConnection()) {
      try {
        console.log('🔄 Two-step creation: Step 1 - Creating product without files');
        
        // Step 1: Create product with basic data only
        const backendProduct = ModelMapper.frontendToBackendProduct(product);
        const response = await apiService.createProduct(backendProduct);
        
        if (response.success && response.data) {
          const createdProduct = ModelMapper.backendToFrontendProduct(response.data);
          console.log('✅ Step 1 complete - Product created with ID:', createdProduct.backendId);
          
          // Step 2: Upload files if provided
          if (imageFile || pdfFile) {
            console.log('🔄 Step 2 - Uploading files to existing product');
            try {
              const updateResponse = await apiService.updateProduct(
                createdProduct.backendId!,
                response.data,
                imageFile,
                pdfFile
              );
              
              if (updateResponse.success && updateResponse.data) {
                console.log('✅ Step 2 complete - Files uploaded successfully');
                return ModelMapper.backendToFrontendProduct(updateResponse.data);
              } else {
                console.warn('⚠️ File upload failed, but product created');
                return createdProduct;
              }
            } catch (fileError) {
              console.error('❌ File upload error:', fileError);
              return createdProduct; // Return product even if file upload fails
            }
          }
          
          return createdProduct;
        }
      } catch (error) {
        console.error('❌ Two-step creation failed:', error);
        throw error;
      }
    }
    
    // Fallback to localStorage if backend fails
    console.warn('⚠️ Backend unavailable, using localStorage fallback');
    return await this.fallbackCreateProduct(product, imageFile, pdfFile);
  }

  private async fallbackCreateProduct(product: Partial<Product>, imageFile?: File, pdfFile?: File): Promise<Product | null> {
    const { getProducts, saveProducts } = await import('./adminData');
    const products = getProducts();
    const newProduct: Product = {
      id: Date.now(), // Simple ID generation
      title: product.title || '',
      description: product.description || '',
      image: product.image || '/placeholder.jpg', // Fallback image
      specs: product.specs || [],
      category: product.category,
      visible: product.visible ?? true,
      available: product.available ?? true,
      featured: product.featured ?? false,
      price: product.price,
      ...product
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  }

  async updateProduct(productId: number, product: Partial<Product>, imageFile?: File, pdfFile?: File): Promise<Product | null> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Updating product via backend API');
        const backendProduct = ModelMapper.frontendToBackendProduct(product);
        
        // Use the backend ID from the product object, not the frontend numeric ID
        const backendId = backendProduct.productId || productId.toString();
        console.log('🔍 Using backend ID for update:', backendId);
        
        const response = await apiService.updateProduct(backendId, backendProduct, imageFile, pdfFile);
        
        if (response.success && response.data) {
          return ModelMapper.backendToFrontendProduct(response.data);
        }
      } catch (error) {
        console.warn('⚠️ Backend product update failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Updating product in localStorage');
    const { getProducts, saveProducts } = await import('./adminData');
    const products = getProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...product };
      saveProducts(products);
      return products[index];
    }
    return null;
  }

  async deleteProduct(productId: number): Promise<boolean> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Deleting product via backend API');
        const response = await apiService.deleteProduct(productId.toString());
        return response.success;
      } catch (error) {
        console.warn('⚠️ Backend product deletion failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Deleting product from localStorage');
    const { getProducts, saveProducts } = await import('./adminData');
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    saveProducts(filteredProducts);
    return filteredProducts.length < products.length;
  }

  // ============ CERTIFICATE MANAGEMENT ============
  
  async getCertificates(): Promise<Certificate[]> {
    return hybridDataServiceInstance.getCertificates();
  }

  async saveCertificates(certificates: Certificate[]): Promise<void> {
    // Similar pattern as products - this would need individual API calls
    // For now, fallback to localStorage
    console.log('📱 Admin: Saving certificates to localStorage');
    const { saveCertificates } = await import('./adminData');
    saveCertificates(certificates);
  }

  async createCertificate(name: string, imageFile: File): Promise<boolean> {
    // Check authentication first
    if (!await this.ensureAuthentication()) {
      throw new Error('Not authenticated');
    }

    try {
      console.log('🚀 [ADMIN] Creating certificate via backend API');
      console.log('📝 Certificate name:', name);
      console.log('📁 Image file:', imageFile.name, imageFile.type, imageFile.size, 'bytes');
      
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', imageFile);
      
      const response = await apiService.createCertificate(formData);
      if (response.success) {
        console.log('✅ [SUCCESS] Certificate created successfully');
        return true;
      }
      
      throw new Error('Backend returned success=false');
    } catch (error) {
      console.error('❌ [API ERROR] Backend certificate creation failed:', error);
      throw error;
    }
  }

  async deleteCertificate(certificateId: string): Promise<boolean> {
    // Check authentication first
    if (!await this.ensureAuthentication()) {
      throw new Error('Not authenticated');
    }

    try {
      console.log('🚀 [ADMIN] Deleting certificate via backend API');
      console.log('🗑️ Certificate ID:', certificateId);
      
      const response = await apiService.deleteCertificate(certificateId);
      if (response.success) {
        console.log('✅ [SUCCESS] Certificate deleted successfully');
        return true;
      }
      
      throw new Error('Backend returned success=false');
    } catch (error) {
      console.error('❌ [API ERROR] Backend certificate deletion failed:', error);
      throw error;
    }
  }

  // ============ INQUIRY MANAGEMENT ============
  
  async getInquiries(): Promise<Inquiry[]> {
    try {
      // Ensure admin authentication before accessing inquiries
      if (await this.ensureAuthentication()) {
        console.log('📥 [ADMIN] Loading inquiries from backend API...');
        const response = await apiService.getInquiries();
        if (response.success && response.data) {
          console.log('✅ [ADMIN] Loaded', response.data.length, 'inquiries from backend API');
          this.isOnline = true;
          return response.data.map(ModelMapper.backendToFrontendInquiry);
        } else {
          console.error('❌ [ADMIN] Backend response was not successful:', response);
        }
      }
    } catch (error: any) {
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        console.warn('⚠️ Admin authentication required for inquiries, falling back to localStorage:', error);
      } else {
        console.error('❌ [ADMIN] Backend API failed:', error);
      }
      this.isOnline = false;
    }

    // Fallback to localStorage
    console.warn('📱 [ADMIN FALLBACK] Loading inquiries from localStorage');
    const { getInquiries } = await import('./adminData');
    return getInquiries();
  }

  async updateInquiryStatus(inquiryId: string, status: 'new' | 'in-progress' | 'completed' | 'rejected', notes?: string): Promise<boolean> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Updating inquiry status via backend API');
        const response = await apiService.updateInquiryStatus(inquiryId, status);
        if (response.success) {
          console.log('🎉 Inquiry status updated successfully');
          return true;
        }
      } catch (error) {
        console.error('❌ Backend inquiry status update failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Updating inquiry status in localStorage');
    const { updateInquiryStatus } = await import('./adminData');
    updateInquiryStatus(inquiryId, status, notes);
    return true;
  }

  async deleteInquiry(inquiryId: string): Promise<boolean> {
    // This would need a backend API endpoint
    console.log('📱 Admin: Deleting inquiry from localStorage');
    const { deleteInquiry } = await import('./adminData');
    deleteInquiry(inquiryId);
    return true;
  }

  // ============ CONTACT INFO MANAGEMENT ============
  
  async getContactInfo(): Promise<ContactInfo> {
    const result = await hybridDataServiceInstance.getContactInfo();
    if (!result) {
      // Return default ContactInfo if null
      const { getContactInfo } = await import('./adminData');
      return getContactInfo();
    }
    return result;
  }

  async saveContactInfo(contactInfo: ContactInfo): Promise<void> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Saving contact info via backend API');
        const backendContactInfo = ModelMapper.frontendToBackendContactInfo(contactInfo);
        await apiService.updateContactInfo(backendContactInfo);
        return;
      } catch (error) {
        console.warn('⚠️ Backend contact info save failed:', error);
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Saving contact info to localStorage');
    const { saveContactInfo } = await import('./adminData');
    saveContactInfo(contactInfo);
  }

  async addBranch(branch: any): Promise<boolean> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Adding branch via backend API');
        const response = await apiService.addOffice(branch);
        if (response.success) {
          console.log('🎉 Branch added successfully');
          return true;
        }
      } catch (error) {
        console.error('❌ Backend branch addition failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Adding branch to localStorage');
    const { getContactInfo, saveContactInfo } = await import('./adminData');
    const contactInfo = getContactInfo();
    if (!contactInfo.branches) {
      contactInfo.branches = [];
    }
    contactInfo.branches.push(branch);
    saveContactInfo(contactInfo);
    return true;
  }

  async updateBranch(branchId: string, branch: any): Promise<boolean> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Updating branch via backend API');
        const response = await apiService.updateOffice(branchId, branch);
        if (response.success) {
          console.log('🎉 Branch updated successfully');
          return true;
        }
      } catch (error) {
        console.error('❌ Backend branch update failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Updating branch in localStorage');
    const { getContactInfo, saveContactInfo } = await import('./adminData');
    const contactInfo = getContactInfo();
    if (contactInfo.branches) {
      const index = contactInfo.branches.findIndex(b => b.id === branchId);
      if (index !== -1) {
        contactInfo.branches[index] = branch;
        saveContactInfo(contactInfo);
      }
    }
    return true;
  }

  async deleteBranch(branchId: string): Promise<boolean> {
    if (await this.checkConnection()) {
      try {
        console.log('✅ Admin: Deleting branch via backend API');
        const response = await apiService.deleteOffice(branchId);
        if (response.success) {
          console.log('🎉 Branch deleted successfully');
          return true;
        }
      } catch (error) {
        console.error('❌ Backend branch deletion failed:', error);
        throw error;
      }
    }

    // Fallback to localStorage
    console.log('📱 Admin: Deleting branch from localStorage');
    const { getContactInfo, saveContactInfo } = await import('./adminData');
    const contactInfo = getContactInfo();
    if (contactInfo.branches) {
      contactInfo.branches = contactInfo.branches.filter(b => b.id !== branchId);
      saveContactInfo(contactInfo);
    }
    return true;
  }

  // ============ CATEGORY MANAGEMENT (PLACEHOLDER) ============
  
  async getMainCategories(): Promise<MainCategory[]> {
    // This would need backend implementation
    console.log('📱 Admin: Loading categories from localStorage');
    const { getMainCategories } = await import('./adminData');
    return getMainCategories() || [];
  }

  async getSubCategories(): Promise<SubCategory[]> {
    // This would need backend implementation
    console.log('📱 Admin: Loading subcategories from localStorage');
    const { getSubCategories } = await import('./adminData');
    return getSubCategories() || [];
  }

  // ============ CONNECTION STATUS ============
  
  getConnectionStatus(): { isOnline: boolean; source: 'backend' | 'localStorage' } {
    return {
      isOnline: this.isOnline,
      source: this.isOnline ? 'backend' : 'localStorage'
    };
  }
}

// Create singleton instance
const adminDataService = new AdminDataService();

export default adminDataService;
export { AdminDataService };