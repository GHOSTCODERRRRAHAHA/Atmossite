import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Atmos, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium text-black mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Name and email address (when you join our waitlist)</li>
                <li>Contact information (when you reach out to us)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Shipping address (for product delivery)</li>
              </ul>
              
              <h3 className="text-xl font-medium text-black mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>IP address and browser information</li>
                <li>Usage data and analytics (via Google Analytics)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To notify you about product updates and launches</li>
                <li>To process transactions and fulfill orders</li>
                <li>To improve our website and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted service providers (Stripe for payments, Supabase for data storage)</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies to enhance your browsing experience and analyze website traffic. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@wearatmos.com<br />
                  <strong>Website:</strong> www.wearatmos.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
