// Two-step Product Creation Handler for AdminDataService
// This implements the user's requested workflow:
// Step 1: Save product to get proper ID
// Step 2: Upload PDF with correct URL structure

import { Product } from './adminData';

export class TwoStepProductCreator {
    
    /**
     * Step 1: Save basic product information to get a proper backend ID
     * @param product - Product data without files
     * @param imageFile - Optional image file (can be included in step 1)
     * @returns Promise<Product | null> - Saved product with proper backend ID
     */
    static async saveBasicProduct(product: Partial<Product>, imageFile?: File): Promise<Product | null> {
        console.log('🚀 Step 1: Saving basic product information...');
        
        try {
            // Import adminDataService dynamically to avoid circular imports
            const { default: adminDataService } = await import('./adminDataService');
            
            // Save product without PDF first
            const savedProduct = await adminDataService.createProduct(product, imageFile, undefined);
            
            if (savedProduct) {
                console.log('✅ Step 1 Complete: Product saved with ID:', savedProduct.backendId || savedProduct.id);
                console.log('📋 Product Details:', {
                    id: savedProduct.id,
                    backendId: savedProduct.backendId,
                    title: savedProduct.title,
                    hasImage: !!savedProduct.image
                });
                return savedProduct;
            } else {
                console.error('❌ Step 1 Failed: Product was not saved');
                return null;
            }
        } catch (error) {
            console.error('❌ Step 1 Error:', error);
            throw error;
        }
    }
    
    /**
     * Step 2: Upload PDF to existing product with proper ID in URL
     * @param savedProduct - The product from step 1 with proper backend ID
     * @param pdfFile - PDF file to upload
     * @returns Promise<Product | null> - Updated product with PDF URL containing proper ID
     */
    static async uploadPdfToProduct(savedProduct: Product, pdfFile: File): Promise<Product | null> {
        console.log('📄 Step 2: Uploading PDF to existing product...');
        console.log('🔍 Product ID for PDF URL:', savedProduct.backendId || savedProduct.id);
        
        try {
            // Import adminDataService dynamically
            const { default: adminDataService } = await import('./adminDataService');
            
            // Update the existing product with PDF file
            // The backend will now use the proper product ID in the PDF URL
            const updatedProduct = await adminDataService.updateProduct(
                savedProduct.id,
                savedProduct,
                undefined, // No image update
                pdfFile
            );
            
            if (updatedProduct) {
                console.log('✅ Step 2 Complete: PDF uploaded successfully');
                console.log('📄 PDF URL should now contain proper ID instead of null');
                console.log('🔗 Updated product:', {
                    id: updatedProduct.id,
                    backendId: updatedProduct.backendId,
                    pdfDownloadUrl: updatedProduct.pdfDownloadUrl
                });
                return updatedProduct;
            } else {
                console.error('❌ Step 2 Failed: PDF upload failed');
                return savedProduct; // Return original product, at least it was saved
            }
        } catch (error) {
            console.error('❌ Step 2 Error:', error);
            console.warn('⚠️ Product was saved successfully, but PDF upload failed');
            return savedProduct; // Return the saved product even if PDF fails
        }
    }
    
    /**
     * Complete two-step product creation workflow
     * @param product - Product data
     * @param imageFile - Optional image file
     * @param pdfFile - Optional PDF file
     * @returns Promise<Product | null> - Final product with all data and files
     */
    static async createProductTwoStep(
        product: Partial<Product>, 
        imageFile?: File, 
        pdfFile?: File
    ): Promise<Product | null> {
        console.log('🎯 Starting two-step product creation workflow...');
        
        try {
            // Step 1: Save basic product info (with image if provided)
            const savedProduct = await this.saveBasicProduct(product, imageFile);
            
            if (!savedProduct) {
                throw new Error('Step 1 failed - could not save basic product information');
            }
            
            // Step 2: Upload PDF if provided
            if (pdfFile) {
                console.log('📄 PDF file provided, proceeding to step 2...');
                const finalProduct = await this.uploadPdfToProduct(savedProduct, pdfFile);
                return finalProduct;
            } else {
                console.log('📄 No PDF file provided, workflow complete');
                return savedProduct;
            }
            
        } catch (error) {
            console.error('❌ Two-step workflow failed:', error);
            throw error;
        }
    }
}

// Export as default for easy importing
export default TwoStepProductCreator;