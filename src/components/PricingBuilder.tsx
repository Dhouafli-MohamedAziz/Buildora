import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Type, Info, CreditCard, ToggleLeft, Table, Shield, HelpCircle, Zap, Paintbrush } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: string; yearly: string; };
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular: boolean;
  isEnabled: boolean;
}

interface PricingConfig {
  title: { text: string; enabled: boolean; };
  intro: { text: string; enabled: boolean; };
  plans: PricingPlan[];
  billingToggle: { enabled: boolean; yearlyDiscount: number; };
  comparison: { enabled: boolean; };
  guarantees: { enabled: boolean; items: string[]; };
  faq: { enabled: boolean; items: Array<{ question: string; answer: string; }>; };
  cta: { enabled: boolean; text: string; link: string; };
  styling: {
    customColors: { primary: string; secondary: string; accent: string; background: string; title: string; text: string; popular: string; };
    typography: { fontFamily: 'sans' | 'serif' | 'mono' | 'display'; fontSize: 'small' | 'medium' | 'large'; fontWeight: 'normal' | 'medium' | 'bold'; };
    spacing: 'compact' | 'comfortable' | 'spacious';
    animations: 'none' | 'fade' | 'slide' | 'bounce';
  };
}

interface PricingBuilderProps {
  projectName: string;
  onComplete: (config: PricingConfig) => void;
  onBack: () => void;
}

const PricingBuilder: React.FC<PricingBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<PricingConfig>({
    title: { text: '', enabled: true },
    intro: { text: '', enabled: false },
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        price: { monthly: '9.99', yearly: '99.99' },
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        ctaText: 'Get Started',
        ctaLink: '#',
        isPopular: false,
        isEnabled: true,
      },
      {
        id: 'pro',
        name: 'Pro',
        price: { monthly: '19.99', yearly: '199.99' },
        features: ['All Basic features', 'Pro Feature 1', 'Pro Feature 2', 'Pro Feature 3'],
        ctaText: 'Choose Pro',
        ctaLink: '#',
        isPopular: true,
        isEnabled: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: { monthly: '49.99', yearly: '499.99' },
        features: ['All Pro features', 'Enterprise Feature 1', 'Enterprise Feature 2', 'Enterprise Feature 3', 'Priority Support'],
        ctaText: 'Contact Sales',
        ctaLink: '#',
        isPopular: false,
        isEnabled: true,
      },
    ],
    billingToggle: { enabled: true, yearlyDiscount: 20 },
    comparison: { enabled: false },
    guarantees: { enabled: true, items: ['14-day free trial', 'Money-back guarantee', 'No credit card required'] },
    faq: { enabled: false, items: [] },
    cta: { enabled: false, text: '', link: '' },
    styling: {
      customColors: { primary: '#8b5cf6', secondary: '#ec4899', accent: '#f59e0b', background: '#1e293b', title: '#f8fafc', text: '#e2e8f0', popular: '#fbbf24' },
      typography: { fontFamily: 'sans', fontSize: 'medium', fontWeight: 'medium' },
      spacing: 'comfortable',
      animations: 'fade',
    },
  });

  // Color picker component (reused from HeaderBuilder)
  const ColorPicker = ({ label, color, onChange, description }: { label: string; color: string; onChange: (color: string) => void; description?: string; }) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg border-2 border-gray-600 shadow-sm"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-2 border-gray-600"
            />
          </div>
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
          placeholder="#000000"
        />
      </div>
    );
  };

  const steps = [
    { id: 1, title: 'Section Title', icon: <Type size={20} /> },
    { id: 2, title: 'Intro Text', icon: <Info size={20} /> },
    { id: 3, title: 'Pricing Plans', icon: <CreditCard size={20} /> },
    { id: 4, title: 'Billing Toggle', icon: <ToggleLeft size={20} /> },
    { id: 5, title: 'Comparison Table', icon: <Table size={20} /> },
    { id: 6, title: 'Guarantees', icon: <Shield size={20} /> },
    { id: 7, title: 'FAQ Section', icon: <HelpCircle size={20} /> },
    { id: 8, title: 'Call to Action', icon: <Zap size={20} /> },
    { id: 9, title: 'Styling & Colors', icon: <Paintbrush size={20} /> },
  ];

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return !config.title.enabled || config.title.text.trim() !== '';
      case 2:
        return !config.intro.enabled || config.intro.text.trim() !== '';
      case 3:
        return config.plans.some(plan => plan.isEnabled);
      case 7:
        return !config.faq.enabled || config.faq.items.length > 0;
      case 8:
        return !config.cta.enabled || (config.cta.text.trim() !== '' && config.cta.link.trim() !== '');
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Section Title
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Section Title</h3>
              <p className="text-gray-300">Give your pricing section a clear, compelling title</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Type size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Section Title</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, title: { ...prev.title, enabled: !prev.title.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.title.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.title.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.title.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title Text</label>
                  <input
                    type="text"
                    value={config.title.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: { ...prev.title, text: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Simple, Transparent Pricing"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 2: // Intro Text
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Intro Text</h3>
              <p className="text-gray-300">Add a brief description to build trust before showing prices</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Info size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Intro Text</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, intro: { ...prev.intro, enabled: !prev.intro.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.intro.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.intro.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.intro.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Intro Text</label>
                  <textarea
                    value={config.intro.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, intro: { ...prev.intro, text: e.target.value } }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="No hidden fees. Cancel anytime."
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 3: // Pricing Plans
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Pricing Plans</h3>
              <p className="text-gray-300">Configure your pricing plans and features</p>
            </div>
            <div className="space-y-6">
              {config.plans.map((plan, index) => (
                <div key={plan.id} className="border border-gray-600 rounded-lg p-6 bg-gray-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-gray-400" />
                      <span className="font-medium text-white">Plan {index + 1}: {plan.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newPlans = [...config.plans];
                        newPlans[index].isEnabled = !newPlans[index].isEnabled;
                        setConfig(prev => ({ ...prev, plans: newPlans }));
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${plan.isEnabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${plan.isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {plan.isEnabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => {
                              const newPlans = [...config.plans];
                              newPlans[index].name = e.target.value;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Basic"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const newPlans = [...config.plans];
                              newPlans[index].isPopular = !newPlans[index].isPopular;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${plan.isPopular ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300'}`}
                          >
                            {plan.isPopular ? 'Popular' : 'Mark Popular'}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Price ($)</label>
                          <input
                            type="text"
                            value={plan.price.monthly}
                            onChange={(e) => {
                              const newPlans = [...config.plans];
                              newPlans[index].price.monthly = e.target.value;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="9.99"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Yearly Price ($)</label>
                          <input
                            type="text"
                            value={plan.price.yearly}
                            onChange={(e) => {
                              const newPlans = [...config.plans];
                              newPlans[index].price.yearly = e.target.value;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="99.99"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
                        <textarea
                          value={plan.features.join('\n')}
                          onChange={(e) => {
                            const newPlans = [...config.plans];
                            newPlans[index].features = e.target.value.split('\n').filter(f => f.trim() !== '');
                            setConfig(prev => ({ ...prev, plans: newPlans }));
                          }}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Text</label>
                          <input
                            type="text"
                            value={plan.ctaText}
                            onChange={(e) => {
                              const newPlans = [...config.plans];
                              newPlans[index].ctaText = e.target.value;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Get Started"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Link</label>
                          <input
                            type="text"
                            value={plan.ctaLink}
                            onChange={(e) => {
                              const newPlans = [...config.plans];
                              newPlans[index].ctaLink = e.target.value;
                              setConfig(prev => ({ ...prev, plans: newPlans }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="#"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 4: // Billing Toggle
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Billing Toggle</h3>
              <p className="text-gray-300">Allow users to switch between monthly and yearly billing</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <ToggleLeft size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Billing Toggle</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, billingToggle: { ...prev.billingToggle, enabled: !prev.billingToggle.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.billingToggle.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.billingToggle.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.billingToggle.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Yearly Discount (%)</label>
                  <input
                    type="number"
                    value={config.billingToggle.yearlyDiscount}
                    onChange={(e) => setConfig(prev => ({ ...prev, billingToggle: { ...prev.billingToggle, yearlyDiscount: parseInt(e.target.value) || 0 } }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 5: // Comparison Table
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Comparison Table</h3>
              <p className="text-gray-300">Add a detailed comparison table for complex plans</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Table size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Comparison Table</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, comparison: { ...prev.comparison, enabled: !prev.comparison.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.comparison.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.comparison.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.comparison.enabled && (
                <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                  <p className="text-gray-300 text-sm">Comparison table will be automatically generated based on your pricing plans and their features.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 6: // Guarantees
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Guarantees & Trust Signals</h3>
              <p className="text-gray-300">Add trust-building elements to reduce hesitation</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Guarantees</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, guarantees: { ...prev.guarantees, enabled: !prev.guarantees.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.guarantees.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.guarantees.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.guarantees.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Guarantee Items (one per line)</label>
                  <textarea
                    value={config.guarantees.items.join('\n')}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      guarantees: { 
                        ...prev.guarantees, 
                        items: e.target.value.split('\n').filter(item => item.trim() !== '')
                      } 
                    }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="14-day free trial&#10;Money-back guarantee&#10;No credit card required"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 7: // FAQ Section
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">FAQ Section</h3>
              <p className="text-gray-300">Add common questions to overcome last-minute objections</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable FAQ Section</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, faq: { ...prev.faq, enabled: !prev.faq.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.faq.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.faq.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.faq.enabled && (
                <div className="space-y-4">
                  {config.faq.items.map((item, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-800/30">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Question {index + 1}</label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => {
                              const newItems = [...config.faq.items];
                              newItems[index].question = e.target.value;
                              setConfig(prev => ({ ...prev, faq: { ...prev.faq, items: newItems } }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Can I cancel anytime?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Answer {index + 1}</label>
                          <textarea
                            value={item.answer}
                            onChange={(e) => {
                              const newItems = [...config.faq.items];
                              newItems[index].answer = e.target.value;
                              setConfig(prev => ({ ...prev, faq: { ...prev.faq, items: newItems } }));
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Yes, you can cancel your subscription at any time."
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newItems = config.faq.items.filter((_, i) => i !== index);
                          setConfig(prev => ({ ...prev, faq: { ...prev.faq, items: newItems } }));
                        }}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newItems = [...config.faq.items, { question: '', answer: '' }];
                      setConfig(prev => ({ ...prev, faq: { ...prev.faq, items: newItems } }));
                    }}
                    className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors"
                  >
                    + Add FAQ Item
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 8: // Call to Action
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Call to Action</h3>
              <p className="text-gray-300">Add a button below the pricing to guide visitors</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable CTA Button</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, cta: { ...prev.cta, enabled: !prev.cta.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.cta.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.cta.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.cta.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={config.cta.text}
                      onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, text: e.target.value } }))}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Still not sure? Contact us"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={config.cta.link}
                      onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, link: e.target.value } }))}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="#contact"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 9: // Styling & Colors
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Styling & Visual Design</h3>
              <p className="text-gray-300">Customize every aspect of your pricing section's appearance</p>
            </div>
            {/* Custom Color Pickers */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Paintbrush size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Custom Color Design</h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ColorPicker
                  label="Primary Color"
                  color={config.styling.customColors.primary}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, primary: color } } }))}
                  description="Main brand color for buttons and highlights"
                />
                <ColorPicker
                  label="Secondary Color"
                  color={config.styling.customColors.secondary}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, secondary: color } } }))}
                  description="Supporting color for accents and hover states"
                />
                <ColorPicker
                  label="Accent Color"
                  color={config.styling.customColors.accent}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, accent: color } } }))}
                  description="Highlight color for special elements"
                />
                <ColorPicker
                  label="Background Color"
                  color={config.styling.customColors.background}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, background: color } } }))}
                  description="Main background color of the pricing section"
                />
                <ColorPicker
                  label="Title Color"
                  color={config.styling.customColors.title}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, title: color } } }))}
                  description="Color for section title and headings"
                />
                <ColorPicker
                  label="Text Color"
                  color={config.styling.customColors.text}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, text: color } } }))}
                  description="Color for body text and descriptions"
                />
                <ColorPicker
                  label="Popular Plan Color"
                  color={config.styling.customColors.popular}
                  onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, popular: color } } }))}
                  description="Color for highlighting the popular plan"
                />
              </div>
            </div>
            {/* Typography */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Type size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Typography</h4>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Family</label>
                  <div className="space-y-2">
                    {(['sans', 'serif', 'mono', 'display'] as const).map((font) => (
                      <button
                        key={font}
                        onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontFamily: font } } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontFamily === font ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{font}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                  <div className="space-y-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontSize: size } } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontSize === size ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Weight</label>
                  <div className="space-y-2">
                    {(['normal', 'medium', 'bold'] as const).map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontWeight: weight } } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontWeight === weight ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{weight}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Effects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Paintbrush size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Visual Effects</h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Spacing</label>
                  <div className="space-y-2">
                    {(['compact', 'comfortable', 'spacious'] as const).map((spacing) => (
                      <button
                        key={spacing}
                        onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, spacing } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.spacing === spacing ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{spacing}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Animations</label>
                  <div className="space-y-2">
                    {(['none', 'fade', 'slide', 'bounce'] as const).map((animation) => (
                      <button
                        key={animation}
                        onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, animations: animation } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.animations === animation ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{animation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Step {currentStep}</h3>
            <p className="text-gray-300">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-purple-700/50">
        <div className="p-4 border-b border-purple-700/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Advanced Pricing Builder</h2>
          <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-64 bg-gray-800/50 border-r border-purple-700/50 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Steps</h3>
            <ul className="space-y-2">
              {steps.map((step) => (
                <li key={step.id}>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                      currentStep === step.id
                        ? 'bg-purple-700/30 text-purple-300 font-medium'
                        : 'text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    {step.icon}
                    <span>{step.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-grow p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {renderStepContent()}
          </div>
        </div>

        <div className="p-4 border-t border-purple-700/50 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ArrowLeft size={20} /> Back
          </button>
          <span className="text-sm text-gray-400">Step {currentStep} of {steps.length}</span>
          {currentStep === steps.length ? (
            <button
              onClick={() => onComplete(config)}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                canGoNext()
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check size={20} /> Complete
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                canGoNext()
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingBuilder;
