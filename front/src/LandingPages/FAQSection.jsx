import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'How does blockchain ensure security in land transactions?',
      answer:
        'Blockchain creates an immutable, distributed ledger where every transaction is cryptographically secured and verified by multiple nodes. Once recorded, data cannot be altered or deleted, preventing fraud and unauthorized changes to land records.',
    },
    {
      question: 'What documents are required for registration?',
      answer:
        'You need EC (Encumbrance Certificate), title deeds, land records, government-issued ID, and property tax receipts. Our platform verifies these documents automatically through government database integration.',
    },
    {
      question: 'How long does the verification process take?',
      answer:
        'Traditional verification takes weeks or months. With GoLand, automated document verification and smart contract execution complete in minutes to hours, depending on government authority response times.',
    },
    {
      question: 'Is the platform legally compliant?',
      answer:
        'Yes, GoLand ensures compliance with all applicable land registration laws, stamp duty regulations, and registration requirements. Smart contracts incorporate taxation rules and legal frameworks automatically.',
    },
    {
      question: 'What are smart contracts and how do they work?',
      answer:
        'Smart contracts are self-executing agreements with terms written in code. They automatically execute when conditions are met (verification complete, payment received, consent provided), eliminating intermediaries and reducing errors.',
    },
    {
      question: 'How does government integration work?',
      answer:
        'We integrate with land authority databases for real-time verification of records, mutation certificates, and ownership history. Government officials can access and validate transactions through our secure portal.',
    },
    {
      question: 'What happens if there is a dispute?',
      answer:
        'All transaction records are immutably stored on the blockchain with timestamps and digital signatures. This provides irrefutable evidence for dispute resolution and legal proceedings.',
    },
    {
      question: 'Can I track my land ownership history?',
      answer:
        'Yes, the blockchain maintains complete ownership history, including all previous transactions, mutations, and certifications. This is accessible to authorized parties at any time.',
    },
  ];

  return (
    <section id="faq" className="min-h-screen bg-slate-100 dark:bg-slate-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked <span className="text-emerald-600 dark:text-emerald-400">Questions</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Everything you need to know about GoLand and blockchain land registry
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md shadow-slate-200/60 dark:shadow-black/20"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
              >
                <span className="text-slate-900 dark:text-white font-semibold pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
