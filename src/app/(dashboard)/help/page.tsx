'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'billing' | 'technical' | 'features';
}

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  href?: string;
  onClick?: () => void;
}

export default function HelpPage() {
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState<'general' | 'billing' | 'technical' | 'features'>('general');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQ[] = [
    // General FAQs
    {
      id: 'general-1',
      question: 'What is Buildora?',
      answer: 'Buildora is an AI-powered web development platform that helps you create, design, and deploy websites quickly. It combines advanced AI assistance with intuitive design tools to streamline your web development workflow.',
      category: 'general'
    },
    {
      id: 'general-2',
      question: 'How do I get started?',
      answer: 'Getting started is easy! Simply sign up for a free account, choose a template or start from scratch, and use our AI assistant to help you build your website. You can create up to 3 projects on the free trial.',
      category: 'general'
    },
    {
      id: 'general-3',
      question: 'What browsers are supported?',
      answer: 'Buildora works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience.',
      category: 'general'
    },
    // Billing FAQs
    {
      id: 'billing-1',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.',
      category: 'billing'
    },
    {
      id: 'billing-2',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. We also offer a 14-day money-back guarantee.',
      category: 'billing'
    },
    {
      id: 'billing-3',
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 14-day money-back guarantee. If you\'re not satisfied with our service, contact our support team within 14 days of your purchase for a full refund.',
      category: 'billing'
    },
    // Technical FAQs
    {
      id: 'technical-1',
      question: 'How do I export my project?',
      answer: 'You can export your project by going to the project settings and clicking "Export". This will download your project files as a ZIP archive containing all your code and assets.',
      category: 'technical'
    },
    {
      id: 'technical-2',
      question: 'Can I use my own domain?',
      answer: 'Yes! Basic and Premium plans include custom domain support. You can connect your own domain through the project settings or use our subdomain service.',
      category: 'technical'
    },
    {
      id: 'technical-3',
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and security practices to protect your data. All data is stored securely and we never share your information with third parties.',
      category: 'technical'
    },
    // Features FAQs
    {
      id: 'features-1',
      question: 'What AI features are available?',
      answer: 'Our AI assistant can help you with code generation, design suggestions, content creation, and debugging. The AI capabilities vary by plan - Premium users get access to advanced AI features.',
      category: 'features'
    },
    {
      id: 'features-2',
      question: 'Can I collaborate with team members?',
      answer: 'Team collaboration is available on the Premium plan. You can invite team members, assign roles, and work together on projects in real-time.',
      category: 'features'
    },
    {
      id: 'features-3',
      question: 'What templates are available?',
      answer: 'We offer hundreds of professionally designed templates across various industries. Templates are categorized by type and industry, and new ones are added regularly.',
      category: 'features'
    }
  ];

  const supportOptions: SupportOption[] = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      icon: '📧',
      action: 'Send Email',
      href: 'mailto:support@buildora.com'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: '💬',
      action: 'Start Chat',
      onClick: () => {
        // In a real app, this would open a chat widget
        alert('Live chat feature coming soon!');
      }
    },
    {
      id: 'docs',
      title: 'Documentation',
      description: 'Browse our comprehensive guides',
      icon: '📚',
      action: 'View Docs',
      href: '/docs'
    },
    {
      id: 'community',
      title: 'Community Forum',
      description: 'Connect with other developers',
      icon: '👥',
      action: 'Join Forum',
      href: '/community'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.category === activeCategory && 
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col w-screen h-screen overflow-hidden text-white">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ left: '20%', top: '10%' }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Advanced Navbar */}
        <AdvancedNavbar />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 w-full h-full pt-16 relative z-10">
          <div className="flex-1 min-h-0 w-full h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-gray-400">Find answers to your questions and get the help you need</p>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Support Options Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Get Help</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {supportOptions.map((option) => (
                    <div
                      key={option.id}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">{option.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                        {option.href ? (
                          <a
                            href={option.href}
                            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all"
                          >
                            {option.action}
                          </a>
                        ) : (
                          <button
                            onClick={option.onClick}
                            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all"
                          >
                            {option.action}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                
                {/* Category Tabs */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'general', label: 'General', icon: '🏠' },
                      { id: 'billing', label: 'Billing', icon: '💳' },
                      { id: 'technical', label: 'Technical', icon: '⚙️' },
                      { id: 'features', label: 'Features', icon: '✨' }
                    ].map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeCategory === category.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                      >
                        <span className="text-white font-medium">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            openFAQ === faq.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                    <p className="text-gray-400">Try adjusting your search terms or browse different categories</p>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
                  <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our support team is here to help you get the most out of Buildora.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:support@buildora.com"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all"
                    >
                      Contact Support
                    </a>
                    <a
                      href="/docs"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20"
                    >
                      View Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 