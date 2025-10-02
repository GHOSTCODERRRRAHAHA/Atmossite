import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    setIsSubmitting(false);
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about Atmos? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-6">Send us a message</h2>
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                      Message *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your question or feedback..."
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-black mb-6">Other ways to reach us</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Email</h3>
                      <p className="text-gray-600">hello@wearatmos.com</p>
                      <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Support</h3>
                      <p className="text-gray-600">support@wearatmos.com</p>
                      <p className="text-sm text-gray-500 mt-1">For technical questions and support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Phone</h3>
                      <p className="text-gray-600">Coming soon</p>
                      <p className="text-sm text-gray-500 mt-1">Phone support available after launch</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-black mb-2">Quick answers</h3>
                <p className="text-gray-600 mb-4">
                  Check our FAQ for instant answers to common questions about Atmos Halo.
                </p>
                <Link 
                  to="/faq"
                  className="inline-flex items-center text-black hover:text-gray-700 font-medium transition-colors"
                >
                  Visit FAQ
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
