// API Service for connecting to Voltherm Backend
// This replaces localStorage with actual backend API calls

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com';

// API response interface to match backend
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        status: number;
    };
}

// Backend model interfaces matching the Java models
export interface BackendProduct {
    productId: string;
    productName: string;
    price: number;
    featured: boolean;
    available: boolean;
    category: string;
    subCategory: string;
    specificationFields: string[];
    specificationValues: string[];
    quickSpecs: string[];
    imageUrl: string;
    pdfDownloadUrl?: string;
}

export interface BackendCertificate {
    id: string;
    name: string;
    url: string;
}

export interface BackendInquiry {
    id?: string;
    createdAt?: string; // ISO string from Java Instant
    email: string;
    name: string;
    phoneNumber: string;
    requirements: string;
    company?: string;
    interestedProducts: string[];
    status?: string;
}

// Backend Office interface to match exact Java model
export interface BackendOffice {
    branchId: string;
    branchName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    mapUrl: string;
    phoneNumber: string;
    pincode: number;
}

export interface BackendContactInfo {
    id: string;
    salesEmail: string;
    salesPhoneNumber: string;
    businessEmail: string;
    supportPhoneNumber: string;
    mainAddress: string;
    branches: BackendOffice[];
    facebookUrl?: string;
    xUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    indiamartUrl?: string;
}

class ApiService {
    // Generic API call method
    private async apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        
        // Don't set Content-Type for FormData (browser will set it with boundary)
        const isFormData = options.body instanceof FormData;
        
        const defaultOptions: RequestInit = {
            headers: isFormData ? {
                ...options.headers,
            } : {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Important for session-based auth
            ...options,
        };

        try {
            // Add timeout to the fetch request (longer for file uploads)
            const timeout = isFormData ? 60000 : 30000; // 60s for uploads, 30s for normal requests
            const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), timeout);
            });

            const response = await Promise.race([
                fetch(url, defaultOptions),
                timeoutPromise
            ]);
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API Error for ${endpoint}:`, error);
            throw error;
        }
    }

    // Test connection method with retry logic
    async testConnection(): Promise<boolean> {
        const maxRetries = 3;
        const retryDelay = 1000; // 1 second

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔄 Testing backend connection (attempt ${attempt}/${maxRetries})...`);
                const response = await this.apiCall<ApiResponse<BackendProduct[]>>('/api/products');
                console.log('✅ Backend connection successful');
                return response.success;
            } catch (error) {
                console.warn(`⚠️ Backend connection attempt ${attempt} failed:`, error);
                
                if (attempt < maxRetries) {
                    console.log(`⏳ Retrying in ${retryDelay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                } else {
                    console.error('❌ All backend connection attempts failed');
                    return false;
                }
            }
        }
        return false;
    }

    // Product API methods
    async getProducts(): Promise<ApiResponse<BackendProduct[]>> {
        return await this.apiCall<ApiResponse<BackendProduct[]>>('/api/products');
    }

    async getProductById(productId: string): Promise<ApiResponse<BackendProduct>> {
        return await this.apiCall<ApiResponse<BackendProduct>>(`/api/products/${productId}`);
    }

    async getFeaturedProducts(): Promise<ApiResponse<BackendProduct[]>> {
        return await this.apiCall<ApiResponse<BackendProduct[]>>('/api/products/featured');
    }

    async createProduct(product: Partial<BackendProduct>, imageFile?: File, pdfFile?: File): Promise<ApiResponse<BackendProduct>> {
        const formData = new FormData();
        
        // Remove productId for new products to avoid conflicts
        const { productId, ...productWithoutId } = product;
        
        console.log('� API: Creating product with comprehensive debugging');
        console.log('📝 Original product data:', product);
        console.log('🔍 Product data after removing ID:', productWithoutId);
        console.log('📊 Product data JSON:', JSON.stringify(productWithoutId, null, 2));
        console.log('🔍 Image file:', imageFile ? `${imageFile.name} (${imageFile.size} bytes, ${imageFile.type})` : 'none');
        console.log('🔍 PDF file:', pdfFile ? `${pdfFile.name} (${pdfFile.size} bytes, ${pdfFile.type})` : 'none');
        console.log('🔍 Product data keys:', Object.keys(productWithoutId));
        
        // Validate critical fields before sending
        if (!productWithoutId.productName || productWithoutId.productName.trim() === '') {
            throw new Error('Product name is required');
        }
        
        if (!productWithoutId.price || productWithoutId.price < 0) {
            console.warn('⚠️ Invalid price detected:', productWithoutId.price);
        }
        
        formData.append('product', JSON.stringify(productWithoutId));
        
        // Backend requires image parameter, so create placeholder if none provided
        if (imageFile) {
            formData.append('image', imageFile);
            console.log('📎 Image file added:', imageFile.size, 'bytes');
        } else {
            // Create a small transparent placeholder image
            const placeholderBlob = new Blob([new Uint8Array([])], { type: 'image/png' });
            const placeholderFile = new File([placeholderBlob], 'placeholder.png', { type: 'image/png' });
            formData.append('image', placeholderFile);
            console.log('📎 Placeholder image added (backend requires image parameter)');
        }
        
        if (pdfFile) {
            formData.append('pdf', pdfFile);
            console.log('📎 PDF file added:', pdfFile.size, 'bytes');
        }

        // Log FormData contents
        console.log('📤 FormData entries:');
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
            } else {
                console.log(`  ${key}: ${typeof value === 'string' && value.length > 200 ? value.substring(0, 200) + '...' : value}`);
            }
        }

        const url = `${API_BASE_URL}/api/products`;
        console.log('🌐 Making POST request to:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        console.log('📡 Response received:');
        console.log('   Status:', response.status, response.statusText);
        console.log('   Headers:', Array.from(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('🔥 Backend error details:');
            console.error('   Status:', response.status);
            console.error('   Status Text:', response.statusText);
            console.error('   Error Body:', errorText);
            
            if (response.status === 500) {
                console.error('🔥 Internal Server Error Analysis:');
                console.error('   Possible causes:');
                console.error('   1. Invalid JSON format in product field');
                console.error('   2. Backend validation failure');
                console.error('   3. Database constraint violation');
                console.error('   4. File processing error');
                console.error('   5. Missing required field on backend');
                console.error('   6. Data type mismatch');
            }
            
            throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Product created successfully:', result);
        return result;
    }

    async updateProduct(productId: string, product: Partial<BackendProduct>, imageFile?: File, pdfFile?: File): Promise<ApiResponse<BackendProduct>> {
        console.log('🔍 API: Updating product with backend ID:', productId);
        console.log('🔍 Product data being sent:', product);
        console.log('🔍 Image file:', imageFile?.name);
        console.log('🔍 PDF file:', pdfFile?.name);
        
        // Ensure the product object includes the productId for backend reference
        const productWithId = { ...product, productId };
        
        const formData = new FormData();
        formData.append('product', JSON.stringify(productWithId));
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        const url = `${API_BASE_URL}/api/products/${productId}`;
        console.log('🔍 Making PUT request to:', url);
        
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Backend update error response:', errorText);
            throw new Error(`Failed to update product: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }

    async deleteProduct(productId: string): Promise<ApiResponse<void>> {
        return await this.apiCall<ApiResponse<void>>(`/api/products/${productId}`, {
            method: 'DELETE',
        });
    }

    async downloadProductPdf(productId: string): Promise<Blob> {
        const url = `${API_BASE_URL}/api/products/${productId}/pdf`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to download PDF: ${response.status}`);
        }

        return await response.blob();
    }

    // Certificate API methods
    async getCertificates(): Promise<ApiResponse<BackendCertificate[]>> {
        return await this.apiCall<ApiResponse<BackendCertificate[]>>('/api/certificates');
    }

    async createCertificate(formData: FormData): Promise<ApiResponse<BackendCertificate>> {
        return await this.apiCall<ApiResponse<BackendCertificate>>('/api/certificates', {
            method: 'POST',
            body: formData,
        });
    }

    async deleteCertificate(certificateId: string): Promise<ApiResponse<void>> {
        return await this.apiCall<ApiResponse<void>>(`/api/certificates/${certificateId}`, {
            method: 'DELETE',
        });
    }

    // Inquiry API methods
    async createInquiry(inquiry: BackendInquiry): Promise<ApiResponse<BackendInquiry>> {
        return await this.apiCall<ApiResponse<BackendInquiry>>('/api/inquiries', {
            method: 'POST',
            body: JSON.stringify(inquiry),
        });
    }

    async getInquiries(): Promise<ApiResponse<BackendInquiry[]>> {
        return await this.apiCall<ApiResponse<BackendInquiry[]>>('/api/inquiries');
    }

    async updateInquiryStatus(inquiryId: string, status: string): Promise<ApiResponse<BackendInquiry>> {
        return await this.apiCall<ApiResponse<BackendInquiry>>(`/api/inquiries/${inquiryId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }

    // Contact Info API methods
    async getContactInfo(): Promise<ApiResponse<BackendContactInfo>> {
        return await this.apiCall<ApiResponse<BackendContactInfo>>('/api/contact-info');
    }

    async updateContactInfo(contactInfo: BackendContactInfo): Promise<ApiResponse<BackendContactInfo>> {
        return await this.apiCall<ApiResponse<BackendContactInfo>>('/api/contact-info', {
            method: 'PUT',
            body: JSON.stringify(contactInfo),
        });
    }

    async addOffice(office: BackendOffice): Promise<ApiResponse<BackendOffice>> {
        return await this.apiCall<ApiResponse<BackendOffice>>('/api/contact-info/offices', {
            method: 'POST',
            body: JSON.stringify(office),
        });
    }

    async updateOffice(branchId: string, office: BackendOffice): Promise<ApiResponse<BackendOffice>> {
        return await this.apiCall<ApiResponse<BackendOffice>>(`/api/contact-info/offices/${branchId}`, {
            method: 'PUT',
            body: JSON.stringify(office),
        });
    }

    async deleteOffice(branchId: string): Promise<ApiResponse<void>> {
        return await this.apiCall<ApiResponse<void>>(`/api/contact-info/offices/${branchId}`, {
            method: 'DELETE',
        });
    }

    // Admin authentication
    async adminLogin(username: string, password: string): Promise<ApiResponse<{ username: string; message: string }>> {
        return await this.apiCall<ApiResponse<{ username: string; message: string }>>('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    async getAdminProfile(): Promise<ApiResponse<{ username: string }>> {
        return await this.apiCall<ApiResponse<{ username: string }>>('/api/admin/profile');
    }

    async adminLogout(): Promise<void> {
        await this.apiCall('/api/admin/logout', {
            method: 'POST',
        });
    }

    // Admin Settings APIs
    async initiatePasswordChange(currentPassword: string, newPassword: string): Promise<ApiResponse<string>> {
        return await this.apiCall<ApiResponse<string>>('/api/settings/password/initiate', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    }

    async verifyPasswordChange(otp: string, newPassword: string): Promise<ApiResponse<string>> {
        return await this.apiCall<ApiResponse<string>>('/api/settings/password/verify', {
            method: 'POST',
            body: JSON.stringify({ otp, newPassword }),
        });
    }

    async changeUsername(currentPassword: string, newUsername: string): Promise<ApiResponse<string>> {
        return await this.apiCall<ApiResponse<string>>('/api/settings/username', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newUsername }),
        });
    }

    async changeReceiverEmail(receiverEmail: string): Promise<ApiResponse<string>> {
        return await this.apiCall<ApiResponse<string>>('/api/settings/email/receiver', {
            method: 'POST',
            body: JSON.stringify({ receiverEmail }),
        });
    }

    async changeSenderEmail(senderEmail: string, appPassword: string): Promise<ApiResponse<string>> {
        return await this.apiCall<ApiResponse<string>>('/api/settings/email/sender', {
            method: 'POST',
            body: JSON.stringify({ senderEmail, appPassword }),
        });
    }
}

// Export singleton instance
export const apiService = new ApiService();

// Export default
export default apiService;