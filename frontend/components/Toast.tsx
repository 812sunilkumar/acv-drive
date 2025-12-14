'use client';

import React, { useEffect, useState } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay to trigger animation
      const showTimer = setTimeout(() => setShow(true), 10);
      
      // Auto-dismiss after duration
      const dismissTimer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          onClose();
        }, 500); // Wait for fade-out
      }, duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(dismissTimer);
      };
    } else {
      setShow(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor = 
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    'bg-blue-500';

  const icon = 
    type === 'success' ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : type === 'error' ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999] flex items-center gap-4 px-5 py-4 rounded-xl shadow-2xl text-white
        transform transition-all duration-500 ease-out
        ${show ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${bgColor}
        min-w-[340px] max-w-md
        backdrop-blur-sm
        border border-white/20
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
        {icon}
      </div>
      <p className="flex-1 font-semibold text-sm leading-relaxed pr-2">{message}</p>
      <button
        onClick={() => {
          setShow(false);
          setTimeout(() => onClose(), 300);
        }}
        className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
