// Main Data Service - Uses hybridDataService for all operations
// This is the primary interface that components should use

import hybridDataServiceInstance from './hybridDataService';
import { type Product, type Certificate, type Inquiry, type ContactInfo } from './adminData';

// Re-export the hybrid data service as the main data service
export const dataService = hybridDataServiceInstance;

// Export hybridDataService for backward compatibility
export const hybridDataService = hybridDataServiceInstance;

// Export individual methods for convenience
export const getProducts = () => hybridDataServiceInstance.getProducts();
export const getFeaturedProducts = () => hybridDataServiceInstance.getFeaturedProducts();
export const getCertificates = () => hybridDataServiceInstance.getCertificates();
export const submitInquiry = (inquiry: Partial<Inquiry>) => hybridDataServiceInstance.submitInquiry(inquiry);
export const getContactInfo = () => hybridDataServiceInstance.getContactInfo();
export const getConnectionStatus = () => hybridDataServiceInstance.getConnectionStatus();

// Export types
export type { Product, Certificate, Inquiry, ContactInfo };

export default dataService;