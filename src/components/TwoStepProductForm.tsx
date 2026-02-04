'use client';

import { useState } from 'react';
import { Check, Save, Upload, FileText } from 'lucide-react';
import adminDataService from '@/lib/adminDataService';
import { Product } from '@/lib/adminData';

interface TwoStepProductFormProps {
  onComplete: (product: Product) => void;
  onCancel: () => void;
}

export default function TwoStepProductForm({ onComplete, onCancel }: TwoStepProductFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [savedProduct, setSavedProduct] = useState<Product | null>(null);
  const [isSavingBasic, setIsSavingBasic] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  // Form data
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSaveBasicProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBasic(true);

    try {
      const productData: Partial<Product> = {
        title: productName,
        description,
        price: price ? parseFloat(price) : undefined,
        specs: category ? [category] : [],
        featured: false,
        available: true,
      };

      console.log('🚀 Saving basic product information...');
      const savedProd = await adminDataService.createProduct(productData, imageFile || undefined, undefined);
      
      if (savedProd) {
        console.log('✅ Product saved successfully:', savedProd);
        setSavedProduct(savedProd);
        setStep(2);
      } else {
        alert('Failed to save product. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error saving product:', error);
      alert('Error saving product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSavingBasic(false);
    }
  };

  const handleUploadPdf = async () => {
    if (!savedProduct) return;

    setIsUploadingPdf(true);
    try {
      if (!pdfFile) {
        // Complete without PDF
        onComplete(savedProduct);
        return;
      }

      console.log('📄 Uploading PDF for product ID:', savedProduct.backendId || savedProduct.id);
      
      const updatedProduct = await adminDataService.updateProduct(
        savedProduct.id,
        savedProduct,
        undefined, // no image update
        pdfFile
      );

      if (updatedProduct) {
        console.log('✅ PDF uploaded successfully');
        onComplete(updatedProduct);
      } else {
        alert('Failed to upload PDF. Product was saved without PDF.');
        onComplete(savedProduct);
      }
    } catch (error) {
      console.error('❌ Error uploading PDF:', error);
      alert('Error uploading PDF: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUploadingPdf(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
            step === 1 ? 'bg-blue-600 text-white' : savedProduct ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {savedProduct ? <Check className="h-5 w-5" /> : '1'}
          </div>
          <span className={`text-sm font-medium ${
            step === 1 || savedProduct ? 'text-gray-900' : 'text-gray-500'
          }`}>
            Save Basic Info
          </span>
          <div className={`h-px w-16 ${
            savedProduct ? 'bg-green-600' : 'bg-gray-200'
          }`} />
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
            step === 2 && savedProduct ? 'bg-blue-600 text-white' : savedProduct ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-400'
          }`}>
            2
          </div>
          <span className={`text-sm font-medium ${
            step === 2 && savedProduct ? 'text-gray-900' : 'text-gray-500'
          }`}>
            Upload PDF
          </span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <form onSubmit={handleSaveBasicProduct} className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Step 1: Basic Product Information</h3>
            <p className="text-sm text-gray-500 mb-6">Save your product first to get a proper ID for file URLs</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter category"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imageFile && (
              <p className="mt-2 text-sm text-green-600">Selected: {imageFile.name}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSavingBasic}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingBasic ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save & Continue to PDF Upload
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Step 2: PDF Upload */}
      {step === 2 && savedProduct && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Step 2: Upload Product PDF</h3>
            <p className="text-sm text-gray-500 mb-6">Now upload your PDF with the correct product ID in the URL</p>
          </div>

          {/* Success message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">
                Product "{savedProduct.title}" saved successfully!
              </p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              ID: {savedProduct.backendId || savedProduct.id} - This ID will be used in the PDF URL
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Datasheet (PDF)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            />
            {pdfFile && (
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                <FileText className="h-4 w-4" />
                Selected: {pdfFile.name}
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">PDF URL will now contain proper ID</p>
                <p className="text-xs text-blue-600 mt-1">
                  Instead of: /files/null/datasheet.pdf<br />
                  You'll get: /files/{savedProduct.backendId || savedProduct.id}/datasheet.pdf
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUploadPdf}
              disabled={isUploadingPdf}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploadingPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {pdfFile ? 'Upload PDF & Complete' : 'Complete Without PDF'}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setSavedProduct(null);
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Back to Edit
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}