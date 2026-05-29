import React from 'react';
import { AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

const AboutSection = () => {
  const problems = [
    'Fraudulent land transactions and fake documents',
    'Manual verification processes taking weeks or months',
    'Lack of transparency in land ownership records',
    'Complex paperwork and bureaucratic delays',
    'High risk of disputes and legal complications',
  ];

  const solutions = [
    'Immutable blockchain records prevent tampering',
    'AI-powered document verification in minutes',
    'Complete transaction transparency for all stakeholders',
    'Smart contracts automate legal compliance',
    'Digital signatures and cryptographic security',
  ];

  return (
    <section id="about" className="min-h-screen bg-slate-100 dark:bg-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="text-emerald-600 dark:text-emerald-400">GoLand</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Transforming land registry with blockchain technology to eliminate fraud, reduce complexity,
            and ensure transparent property transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-500/20 rounded-xl p-8 shadow-lg shadow-slate-200/70 dark:shadow-black/20">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Problem</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-red-500 dark:text-red-400 mt-1">✗</span>
                  <span className="text-slate-600 dark:text-slate-300">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-8 shadow-lg shadow-slate-200/70 dark:shadow-black/20">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Solution</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                  <span className="text-slate-600 dark:text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg shadow-slate-200/70 dark:shadow-black/20">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Identity Verification', desc: 'Sellers, buyers, and govt. authorities verify credentials' },
              { step: '2', title: 'Document Upload', desc: 'EC certifications, title deeds, and land records verified' },
              { step: '3', title: 'Smart Contract', desc: 'Automated agreement with blockchain immutability' },
              { step: '4', title: 'Transfer Complete', desc: 'Ownership updated in land authority records' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400 rotate-[-90deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
