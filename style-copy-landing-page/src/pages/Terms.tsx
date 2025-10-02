import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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
            <h1 className="text-4xl font-bold text-black mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using the Atmos website and services, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Atmos's 
                website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">Under this license you may not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or public display</li>
                <li>Attempt to reverse engineer any software on Atmos's website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Product Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Atmos Halo is currently in development. All product specifications, features, and 
                release dates are subject to change without notice.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Pre-orders are deposits and fully refundable</li>
                <li>Estimated shipping dates are subject to change</li>
                <li>Final product may differ from promotional materials</li>
                <li>We reserve the right to cancel orders if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Waitlist and Pre-Orders</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By joining our waitlist or placing a pre-order:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You agree to receive product updates and notifications</li>
                <li>Your deposit is fully refundable at any time</li>
                <li>You understand delivery dates are estimates</li>
                <li>You can cancel your pre-order without penalty</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All payments are processed securely through Stripe. By making a payment, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate payment information</li>
                <li>Pay all charges incurred by your account</li>
                <li>Notify us of any unauthorized charges</li>
                <li>Accept our refund and return policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer a generous refund policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Pre-order deposits are 100% refundable</li>
                <li>30-day return window after product delivery</li>
                <li>Products must be in original condition</li>
                <li>Refunds processed within 5-10 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the website, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-black mb-4">Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The materials on Atmos's website are provided on an 'as is' basis. Atmos makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including without limitation, implied warranties or conditions of merchantability, 
                fitness for a particular purpose, or non-infringement of intellectual property or 
                other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Limitations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In no event shall Atmos or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on Atmos's website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These terms and conditions are governed by and construed in accordance with the laws 
                of the United States and you irrevocably submit to the exclusive jurisdiction of the 
                courts in that state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to revise these terms of service at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@wearatmos.com<br />
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

export default Terms;
