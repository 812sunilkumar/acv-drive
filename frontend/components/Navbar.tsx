'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-indigo-900 font-bold text-xl">⚡</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">Drive</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white hover:text-indigo-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/booktestdrive" 
              className="px-4 py-2 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Book Test Drive
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
