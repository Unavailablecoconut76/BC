import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MaterialIcon from '../components/MaterialIcon';
import LandingSectionHeader from '../components/LandingSectionHeader';
import './FAQSection.css';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'Do I need cryptocurrency to use GoLand?',
      answer:
        'No. GoLand uses MetaMask as an identity wallet only. Gas fees on Polygon are fractions of a cent per transaction.',
    },
    {
      question: 'Is my property document stored publicly on the blockchain?',
      answer:
        'No. Documents are encrypted with AES-256 before IPFS upload. Only SHA-256 hashes are stored on-chain.',
    },
    {
      question: 'What happens if a government official rejects my document?',
      answer:
        'You receive an email notification and can re-upload corrected documents. The workflow pauses until all documents are verified.',
    },
    {
      question: 'How is double registration fraud prevented?',
      answer:
        'LandRegistry.sol enforces a unique landID. Second registrations for the same ID are rejected at the smart contract level.',
    },
    {
      question: 'Is GoLand integrated with NGDRS or Bhulekh?',
      answer:
        'The current proof-of-concept runs on Polygon Mumbai Testnet. Production integration with NGDRS, Bhulekh, and DigiLocker is planned.',
    },
    {
      question: 'How long does a transfer take on GoLand?',
      answer:
        'An estimated 10–18 days compared to the current 90–120 day manual process.',
    },
  ];

  return (
    <section id="faq" className="landing-section-anchor faq-section">
      <div className="faq-section__bg" />
      <div className="faq-section__container">
        <LandingSectionHeader
          label="FAQs"
          title="Common questions"
          subtitle="Quick answers for citizens and evaluators reviewing the system."
        />

        <div className="faq-section__list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`landing-card faq-section__item ${
                openFaq === idx ? 'border-primary/30 ring-1 ring-primary/10' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="faq-section__question"
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="font-body-md text-on-surface font-semibold text-left">{faq.question}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    openFaq === idx ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-primary'
                  }`}
                >
                  <MaterialIcon
                    name="expand_more"
                    size={22}
                    className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-md pb-md border-t border-outline-variant pt-md bg-surface-container-low/40"
                    >
                      <p className="font-body-md text-on-surface-variant leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
