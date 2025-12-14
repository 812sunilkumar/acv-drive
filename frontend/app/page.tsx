'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(3);

  const faqs = [
    {
      question: 'Do I need to make a deposit to book a test drive?',
      answer: 'No deposit is required to book a test drive. Simply fill out the booking form and we\'ll confirm your appointment.',
    },
    {
      question: 'What do I need to bring for the test drive?',
      answer: 'Please bring a valid driver\'s license and proof of insurance. Our team will handle the rest.',
    },
    {
      question: 'Can I test drive multiple vehicles in one visit?',
      answer: 'Yes, you can schedule multiple test drives during your visit. Contact us to arrange back-to-back appointments.',
    },
    {
      question: 'How long does a test drive last?',
      answer: 'You can choose from 30 minutes, 1 hour, 2 hours, or 3 hours. We recommend at least 1 hour to get a real feel for the vehicle.',
    },
    {
      question: 'Is the test drive supervised?',
      answer: 'Our expert team will provide guidance at the start, but you\'ll have the freedom to drive independently during your test drive.',
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, you can cancel or reschedule your booking up to 24 hours before your scheduled time. Contact us to make changes.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Murphy',
      location: 'Dublin',
      rating: 5,
      quote: 'Fantastic experience! The booking process was seamless, and the Tesla Model 3 was incredible. The staff were knowledgeable and helpful throughout.',
      avatar: '👩',
    },
    {
      name: 'James O\'Brien',
      location: 'Cork',
      rating: 5,
      quote: 'I tested the BMW i4 and was blown away. Drive made the whole process easy and stress-free. Highly recommend for anyone considering an electric vehicle.',
      avatar: '👨',
    },
    {
      name: 'Emma Walsh',
      location: 'Galway',
      rating: 5,
      quote: 'The team at Drive were brilliant! They let me try multiple models and answered all my questions. Ended up buying the Hyundai Ioniq 5!',
      avatar: '👩',
    },
  ];

  const features = [
    {
      icon: '🚗',
      title: 'Premium Fleet',
      description: 'Latest electric vehicles from top manufacturers including Tesla, BMW, Audi, and more.',
      color: 'text-blue-500',
    },
    {
      icon: '📍',
      title: 'Nationwide Coverage',
      description: '8 convenient locations across Ireland - Dublin, Cork, Galway, Limerick, and more.',
      color: 'text-purple-500',
    },
    {
      icon: '⏰',
      title: 'Flexible Scheduling',
      description: 'Choose from multiple time slots and test drive durations from 30 minutes to 3 hours.',
      color: 'text-green-500',
    },
    {
      icon: '🛡️',
      title: 'Fully Insured',
      description: 'All test drives are fully insured with comprehensive coverage for your peace of mind.',
      color: 'text-orange-500',
    },
    {
      icon: '🎓',
      title: 'Expert Guidance',
      description: 'Our knowledgeable team will guide you through every feature of your chosen vehicle.',
      color: 'text-blue-600',
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with bookings and inquiries.',
      color: 'text-red-500',
    },
  ];

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
            {features.map((feature, index) => (
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
            <div>
              <div className="text-5xl mb-4">👥</div>
              <div className="text-5xl font-bold text-blue-300 mb-2">5,000+</div>
              <div className="text-gray-300 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl mb-4">🚗</div>
              <div className="text-5xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-gray-300 text-lg">Electric Models</div>
            </div>
            <div>
              <div className="text-5xl mb-4">⭐</div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">4.9/5</div>
              <div className="text-gray-300 text-lg">Average Rating</div>
            </div>
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
            {testimonials.map((testimonial, index) => (
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
            {faqs.map((faq, index) => (
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
                <a href="#" className="text-gray-300 hover:text-white transition-colors">📘</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">🐦</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">📷</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">💼</a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Our Locations</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Dublin City Centre</li>
                <li>Cork</li>
                <li>Galway</li>
                <li>Limerick</li>
                <li>Waterford</li>
                <li className="text-gray-400">+ 3 more locations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📞 +353 1 234 5678</li>
                <li className="text-xs text-gray-400">Mon-Sat 9am-6pm</li>
                <li>✉️ info@drive.ie</li>
                <li>📍 123 Main Street, Dublin 2, Ireland</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div>© 2024 Drive Ireland. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
