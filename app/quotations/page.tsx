// app/quotations/page.tsx
'use client';

import React, { useState } from 'react';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Quotation {
  id: string;
  vendorId: string;
  vendorName: string;
  date: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved';
}

const SubmitQuotationsPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [quotationDate, setQuotationDate] = useState('');
  const [quotationAmount, setQuotationAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const vendors: Vendor[] = [
    { id: 'VEN001', name: 'Tech Solutions Ltd', email: 'contact@techsolutions.com', phone: '+1234567890' },
    { id: 'VEN002', name: 'Global Supplies Inc', email: 'sales@globalsupplies.com', phone: '+1234567891' },
    { id: 'VEN003', name: 'Quality Parts Co', email: 'info@qualityparts.com', phone: '+1234567892' },
    { id: 'VEN004', name: 'Prime Materials', email: 'orders@primematerials.com', phone: '+1234567893' },
  ];

  const steps = ['Select Vendor', 'Add Quotation Details', 'Review & Submit'];

  const handleNext = () => {
    if (activeStep === 0 && !selectedVendor) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (selectedVendor && quotationAmount && quotationDate) {
      const vendor = vendors.find(v => v.id === selectedVendor);
      const newQuotation: Quotation = {
        id: `QTN${Date.now()}`,
        vendorId: selectedVendor,
        vendorName: vendor?.name || '',
        date: quotationDate,
        amount: parseFloat(quotationAmount),
        status: 'submitted'
      };
      setQuotations([...quotations, newQuotation]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      setSelectedVendor('');
      setQuotationAmount('');
      setQuotationDate('');
      setActiveStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-600">VendorsBridge</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            RQF: after further procurement a2
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">Deadline: 15 June 2025</p>
        
        <div className="border-b mb-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {['Technical', 'Vendors', 'RQF', 'Quotations', 'Approvals', 'Purchase orders', 'Invoices', 'Reports', 'Activity'].map((item) => (
              <button
                key={item}
                className={`px-3 py-2 text-sm transition-colors ${
                  item === 'Quotations' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold">Submit Quotations</h2>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between mb-8">
          {steps.map((label, index) => (
            <div key={label} className="flex-1 text-center relative">
              <div className={`
                w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center
                ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}
              `}>
                {index + 1}
              </div>
              <div className="text-sm font-medium">{label}</div>
              {index < steps.length - 1 && (
                <div className={`
                  absolute top-4 left-1/2 w-full h-0.5
                  ${index < activeStep ? 'bg-blue-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {activeStep === 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Select Vendor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => setSelectedVendor(vendor.id)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                    ${selectedVendor === vendor.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
                  `}
                >
                  <h4 className="font-semibold text-lg">{vendor.name}</h4>
                  <p className="text-sm text-gray-600">ID: {vendor.id}</p>
                  <p className="text-sm text-gray-600">Email: {vendor.email}</p>
                  <p className="text-sm text-gray-600">Phone: {vendor.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Quotation Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quotation Date
                </label>
                <input
                  type="date"
                  value={quotationDate}
                  onChange={(e) => setQuotationDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount (€)
                </label>
                <input
                  type="number"
                  value={quotationAmount}
                  onChange={(e) => setQuotationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  📎 Attach Document
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  ☁️ Upload Quotation File
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Review Quotation</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vendor Name</p>
                  <p className="font-medium">{vendors.find(v => v.id === selectedVendor)?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vendor ID</p>
                  <p className="font-medium">{selectedVendor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quotation Date</p>
                  <p className="font-medium">{quotationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-green-600 text-xl">€{parseFloat(quotationAmount).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {activeStep > 0 && (
            <button onClick={handleBack} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Back
            </button>
          )}
          {activeStep < steps.length - 1 ? (
            <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={!quotationAmount || !quotationDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Quotation
            </button>
          )}
        </div>

        {showSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            ✓ Quotation submitted successfully!
          </div>
        )}
      </div>

      {/* Submitted Quotations Table */}
      {quotations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Submitted Quotations</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount (€)</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quotation) => (
                  <tr key={quotation.id} className="border-t">
                    <td className="px-4 py-2">{quotation.vendorName}</td>
                    <td className="px-4 py-2">{quotation.id}</td>
                    <td className="px-4 py-2">{quotation.date}</td>
                    <td className="px-4 py-2">€{quotation.amount.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {quotation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitQuotationsPage;