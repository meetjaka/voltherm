// Hybrid Data Service - Connects Frontend to Backend API
// Handles data migration from localStorage to backend with proper error handling

import { apiService } from './apiService';
import { ModelMapper } from './modelMapper';
import { type Product, type Certificate, type Inquiry, type ContactInfo } from './adminData';

class HybridDataService {
  private isOnline = true;

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

  async getProducts(): Promise<Product[]> {
    try {
      if (await this.checkConnection()) {
        console.log('✅ Loading products from backend API');
        const response = await apiService.getProducts();
        if (response.success && response.data) {
          const backendProducts = response.data.map(ModelMapper.backendToFrontendProduct);
          
          // IMPORTANT: Always sync localStorage with backend data to prevent duplicates
          console.log('🧹 Clearing localStorage and syncing with backend data');
          const { saveProducts } = await import('./adminData');
          saveProducts(backendProducts);
          console.log('📱 localStorage synchronized with', backendProducts.length, 'products from backend');
          
          return backendProducts;
        }
      }
    } catch (error) {
      console.warn('⚠️ Backend API failed, falling back to localStorage:', error);
    }

    // Fallback to localStorage only if backend is completely unavailable
    console.log('📱 Loading products from localStorage (backend unavailable)');
    const { getProducts } = await import('./adminData');
    const localProducts = getProducts();
    console.log('📱 Loaded', localProducts.length, 'products from localStorage');
    return localProducts;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      if (await this.checkConnection()) {
        console.log('✅ Loading featured products from backend API');
        const response = await apiService.getFeaturedProducts();
        if (response.success && response.data) {
          return response.data.map(ModelMapper.backendToFrontendProduct);
        }
      }
    } catch (error) {
      console.warn('⚠️ Backend API failed, falling back to localStorage:', error);
    }

    // Fallback to localStorage
    console.log('📱 Loading featured products from localStorage');
    const { getProducts } = await import('./adminData');
    return getProducts().filter(p => p.featured);
  }

  async getCertificates(): Promise<Certificate[]> {
    try {
      if (await this.checkConnection()) {
        console.log('✅ Loading certificates from backend API');
        const response = await apiService.getCertificates();
        if (response.success && response.data) {
          return response.data.map(ModelMapper.backendToFrontendCertificate);
        }
      }
    } catch (error) {
      console.warn('⚠️ Backend API failed, falling back to localStorage:', error);
    }

    // Fallback to localStorage
    console.log('📱 Loading certificates from localStorage');
    const { getCertificates } = await import('./adminData');
    return getCertificates();
  }

  async submitInquiry(inquiry: Partial<Inquiry>): Promise<Inquiry | null> {
    try {
      console.log('🚀 [INQUIRY] Submitting inquiry to backend API...');
      console.log('📋 [INQUIRY DATA]', inquiry);
      
      // Transform to backend format
      const backendInquiry = ModelMapper.frontendToBackendInquiry(inquiry as Inquiry);
      console.log('📤 [BACKEND FORMAT]', backendInquiry);
      
      const response = await apiService.createInquiry(backendInquiry);
      
      if (response.success && response.data) {
        console.log('✅ [SUCCESS] Inquiry submitted to backend API');
        this.isOnline = true;
        return ModelMapper.backendToFrontendInquiry(response.data);
      } else {
        console.error('❌ [ERROR] Backend response was not successful:', response);
      }
    } catch (error) {
      console.error('❌ [API ERROR] Backend API failed:', error);
      this.isOnline = false;
    }

    // Fallback to localStorage
    console.warn('📱 [FALLBACK] Saving inquiry to localStorage');
    const { addInquiry } = await import('./adminData');
    
    // Create a valid inquiry object for localStorage
    const validInquiry = {
      customerName: inquiry.customerName || '',
      customerEmail: inquiry.customerEmail || '',
      customerPhone: inquiry.customerPhone || '',
      companyName: inquiry.companyName,
      requirements: inquiry.requirements || '',
      products: inquiry.products || []
    };
    
    return addInquiry(validInquiry);
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      if (await this.checkConnection()) {
        console.log('✅ Loading contact info from backend API');
        try {
          const response = await apiService.getContactInfo();
          if (response.success && response.data) {
            return ModelMapper.backendToFrontendContactInfo(response.data);
          }
        } catch (apiError) {
          console.warn('⚠️ Contact info API call failed:', apiError);
          // Continue to localStorage fallback
        }
      }
    } catch (error) {
      console.warn('⚠️ Backend connection check failed, falling back to localStorage:', error);
    }

    // Fallback to localStorage
    console.log('📱 Loading contact info from localStorage');
    const { getContactInfo } = await import('./adminData');
    return getContactInfo();
  }

  // Create inquiry method (alias for submitInquiry for compatibility)
  async createInquiry(inquiry: Partial<Inquiry>): Promise<Inquiry | null> {
    return this.submitInquiry(inquiry);
  }

  // Status method for debugging
  getConnectionStatus(): { online: boolean; apiUrl: string } {
    return {
      online: this.isOnline,
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'
    };
  }
}

export const hybridDataService = new HybridDataService();
export default hybridDataService;