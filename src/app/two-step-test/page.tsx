'use client';

import { useState } from 'react';
import TwoStepProductForm from '@/components/TwoStepProductForm';
import type { Product } from '@/lib/adminData';

/**
 * Test page to demonstrate the two-step product creation process
 * 
 * This implements the user's requested workflow:
 * 1. Save product to get proper ID
 * 2. Upload PDF with correct URL structure (no more /null/ in URLs)
 */

export default function TwoStepTestPage() {
  const [showForm, setShowForm] = useState(false);
  const [completedProduct, setCompletedProduct] = useState<Product | null>(null);

  const handleProductComplete = (product: Product) => {
    console.log('🎉 Two-step process completed!', product);
    setCompletedProduct(product);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Two-Step Product Creation Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This demonstrates the new workflow where we first save the product to get a proper ID, 
            then upload the PDF with the correct URL structure (no more null URLs!).
          </p>
        </div>

        {/* Success Message */}
        {completedProduct && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              ✅ Product Created Successfully!
            </h2>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>Name:</strong> {completedProduct.title}</p>
              <p><strong>ID:</strong> {completedProduct.backendId || completedProduct.id}</p>
              <p><strong>Price:</strong> ${completedProduct.price}</p>
              {completedProduct.pdfDownloadUrl && (
                <p><strong>PDF URL:</strong> <code className="bg-white px-2 py-1 rounded text-xs">{completedProduct.pdfDownloadUrl}</code></p>
              )}
              {completedProduct.image && (
                <p><strong>Image URL:</strong> <code className="bg-white px-2 py-1 rounded text-xs">{completedProduct.image}</code></p>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xs text-green-600">
                🎯 <strong>Key Achievement:</strong> PDF URL now contains proper product ID instead of "null"!
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center">
          {!showForm ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                🚀 Start Two-Step Product Creation
              </button>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-blue-800 mb-2">How the Two-Step Process Works:</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>Step 1:</strong> Save basic product information (name, price, description, image)</p>
                  <p><strong>Step 2:</strong> Upload PDF to the saved product using its proper ID</p>
                  <p className="text-xs mt-3 p-2 bg-white rounded border">
                    <strong>Result:</strong> PDF URLs will be like <code>/files/abc-123-def/datasheet.pdf</code> instead of <code>/files/null/datasheet.pdf</code>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <TwoStepProductForm
              onComplete={handleProductComplete}
              onCancel={handleCancel}
            />
          )}
        </div>

        {/* Backend Status */}
        <div className="mt-8 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-amber-800 mb-2">⚠️ Backend Status Note</h3>
            <p className="text-sm text-amber-700">
              If your backend is still returning 500 errors, this form will use localStorage fallback. 
              The two-step process concept will still work once the backend issues are resolved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}