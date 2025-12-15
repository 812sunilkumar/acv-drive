'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTestDriveBooking } from '../../lib/hooks';
import { DURATION_OPTIONS, FORM_FIELDS } from '../../constants/testDrive';
import Navbar from '../../components/Navbar';
import Toast from '../../components/Toast';

// Lazy load components for better performance
const LocationSelector = dynamic(() => import('../../components/LocationSelector'), {
  loading: () => <div className="h-14 bg-gray-200 rounded animate-pulse" />,
});
const VehicleSelector = dynamic(() => import('../../components/VehicleSelector'), {
  loading: () => <div className="h-14 bg-gray-200 rounded animate-pulse" />,
});
const BookingButton = dynamic(() => import('../../components/BookingButton'), {
  loading: () => <div className="h-10 bg-gray-200 rounded animate-pulse" />,
});
const VehicleInfo = dynamic(() => import('../../components/VehicleInfo'), {
  loading: () => <div className="h-40 bg-gray-200 rounded animate-pulse" />,
});

export default function BookTestDrive() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean } | null>(null);

  const {
    locations,
    vehicles,
    selectedLocation,
    selectedVehicle,
    formData,
    message,
    isErrorMessage,
    isFormValid,
    loading,
    loadingLocations,
    loadingVehicles,
    minDate,
    maxDate,
    setSelectedLocation,
    setSelectedVehicle,
    updateFormData,
    submitBooking,
    setMessage,
  } = useTestDriveBooking({
    apiBase: process.env.PUBLIC_API_BASE || 'http://localhost:5000',
    onSuccess: (reservationId) => {
      console.log('Booking successful:', reservationId);
    },
    onError: (error) => {
      console.error('Booking error:', error);
    },
  });

  // Show toast when message changes
  useEffect(() => {
    if (message) {
      setToast({
        message,
        type: isErrorMessage ? 'error' : 'success',
        isVisible: true,
      });
    } else {
      setToast(null);
    }
  }, [message, isErrorMessage]);

  const handleBooking = async () => {
    await submitBooking();
  };

  const handleCloseToast = () => {
    setToast(null);
    setMessage('');
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    updateFormData({ [field]: value } as Partial<typeof formData>);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Test Drive</h1>
            <p className="text-xl text-gray-600">Fill in the details below and we'll get you on the road</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{FORM_FIELDS.personalInfo.title}</h2>
                <div className="space-y-5">
                  {FORM_FIELDS.personalInfo.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {field.icon}
                        </span>
                        <input
                          type={field.type}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900 placeholder-gray-400"
                          required={field.required}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Drive Preferences Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{FORM_FIELDS.preferences.title}</h2>
                <div className="space-y-5">
                  {/* Location Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">📍</span>
                      <div className="pl-10">
                        <LocationSelector
                          locations={locations}
                          selectedLocation={selectedLocation}
                          onLocationChange={setSelectedLocation}
                          loading={loadingLocations}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Car Model <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">🚗</span>
                      <div className="pl-10">
                        <VehicleSelector
                          vehicles={vehicles}
                          selectedVehicle={selectedVehicle}
                          onVehicleChange={setSelectedVehicle}
                          loading={loadingVehicles}
                          disabled={!selectedLocation}
                        />
                      </div>
                    </div>
                    {selectedVehicle && (
                      <div className="mt-4">
                        <VehicleInfo vehicle={selectedVehicle} />
                      </div>
                    )}
                  </div>

                  {/* Date and Time Fields */}
                  {FORM_FIELDS.preferences.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {field.icon}
                        </span>
                        <input
                          type={field.type}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          min={field.name === 'date' ? minDate : undefined}
                          max={field.name === 'date' ? maxDate : undefined}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                          required={field.required}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Duration Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Drive Duration <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {DURATION_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleInputChange('duration', option.value)}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            formData.duration === option.value
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <BookingButton
                  onClick={handleBooking}
                  loading={loading}
                  disabled={!isFormValid}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={handleCloseToast}
          duration={5000}
        />
      )}
    </div>
  );
}
