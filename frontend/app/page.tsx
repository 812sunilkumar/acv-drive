'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import {
  FAQS,
  TESTIMONIALS,
  FEATURES,
  STATISTICS,
  FOOTER_QUICK_LINKS,
  FOOTER_LOCATIONS,
  FOOTER_CONTACT,
  FOOTER_LEGAL_LINKS,
  SOCIAL_LINKS,
} from '../constants/home';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzI4YjciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0YzFkOTYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCwwIEw2MDAsNjAwIEw2MDAsMCBMMCwwIFoiIGZpbGw9InVybCgjYSkiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Experience the future of driving. Book your test drive today and discover your perfect electric vehicle across Ireland.
            </h1>
            <Link href="/booktestdrive">
              <button className="px-8 py-4 bg-white text-indigo-900 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                Book Test Drive →
              </button>
            </Link>
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-4xl font-bold text-green-400">10+</div>
                <div className="text-gray-300 mt-1">Car Models</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">8</div>
                <div className="text-gray-300 mt-1">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Drive Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Drive?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to experience the latest electric vehicles with premium service and nationwide coverage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className={`text-4xl mb-4 ${feature.color}`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {STATISTICS.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Your Test Drive Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Test Drive</h2>
            <p className="text-xl text-gray-600">Fill in the details below and we'll get you on the road</p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
            <Link href="/booktestdrive">
              <button className="w-full px-6 py-4 bg-indigo-900 text-white font-bold text-lg rounded-lg hover:bg-indigo-800 transition-all shadow-md">
                Book Your Test Drive
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've found their perfect electric vehicle through Drive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about booking your test drive.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-600">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <span className="text-indigo-900 font-bold text-xl">⚡</span>
                </div>
                <span className="text-xl font-bold">Drive</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Ireland's premier electric vehicle test drive service. Experience the future of driving today.
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <a key={index} href={link.href} className="text-gray-300 hover:text-white transition-colors" aria-label={link.label}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {FOOTER_QUICK_LINKS.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Our Locations</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {FOOTER_LOCATIONS.map((location, index) => (
                  <li key={index} className={location.startsWith('+') ? 'text-gray-400' : ''}>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {FOOTER_CONTACT.map((contact, index) => (
                  <li key={index}>
                    {contact.icon} {contact.text}
                    {contact.subtext && (
                      <div className="text-xs text-gray-400">{contact.subtext}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div>© 2024 Drive Ireland. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              {FOOTER_LEGAL_LINKS.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
