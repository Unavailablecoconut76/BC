import React from 'react';
import { FileCheck, Lock, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'AI-powered verification of EC certificates, title deeds, and land records',
      features: ['Automated authenticity checks', 'Government database integration', 'Real-time validation', 'Fraud detection'],
    },
    {
      icon: Lock,
      title: 'Smart Contract Automation',
      description: 'Self-executing contracts with blockchain security and legal compliance',
      features: ['Automated stamp duty calculation', 'Mutual consent verification', 'Escrow management', 'Instant execution'],
    },
    {
      icon: Shield,
      title: 'Blockchain Registry',
      description: 'Immutable land ownership records with complete transaction history',
      features: ['Tamper-proof records', 'Ownership tracking', 'Mutation certification', 'Khata updation'],
    },
    {
      icon: TrendingUp,
      title: 'Future APIs',
      description: 'Integration with banks, legal firms, and property platforms',
      features: ['Banking integration', 'Legal automation', 'Property marketplaces', 'Valuation services'],
    },
  ];

  return (
    <section id="services" className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our <span className="text-emerald-600 dark:text-emerald-400">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive blockchain solutions for every aspect of land registration and property transfer
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 hover:border-emerald-400/50 dark:hover:border-emerald-500/50 transition-all shadow-lg shadow-slate-200/70 dark:shadow-black/20"
            >
              <service.icon className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
