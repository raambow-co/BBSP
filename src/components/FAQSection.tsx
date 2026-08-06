import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
 
interface FAQItem {
  question: string;
  answer: string;
}
 
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
 
  // Official Build Bharat Synergy Partners FAQs configuration array
  const faqData: FAQItem[] = [
    {
      question: '1. What is Build Bharat Synergy Partners?',
      answer: 'Build Bharat Synergy Partners is a partner network that allows members to earn commissions by referring customers to our Solar, Real Estate, Loan Services, and EdTech solutions.'
    },
    {
      question: '2. How do I become a partner?',
      answer: 'Simply register on our website, complete the required details, and pay the one-time membership fee to activate your partner account.'
    },
    {
      question: '3. What do I receive after joining?',
      answer: 'After successful registration, you will receive a Unique Member ID, a Referral Code, and access to your Partner Dashboard to manage referrals and commissions.'
    },
    {
      question: '4. What services can I promote?',
      answer: 'You can refer customers for:\n\n• Solar Solutions\n• Real Estate\n• Loan Services\n• EdTech Courses'
    },
    {
      question: '5. How do I earn commissions?',
      answer: 'You earn commissions whenever your referred customer successfully purchases a product or service through Build Bharat Synergy Partners.'
    },
    {
      question: '6. Is there any limit to how much I can earn?',
      answer: 'No. There is no limit on the number of referrals you can make or the commissions you can earn.'
    },
    {
      question: '7. What is the membership fee?',
      answer: 'A one-time membership fee of ₹5,000 is required to activate your partner account.'
    },
    {
      question: '8. Is the membership fee refundable?',
      answer: 'Yes. If you are unable to complete even a single successful transaction within five (5) years of your membership, your ₹5,000 membership fee will be eligible for refund as per our Terms & Conditions.'
    },
    {
      question: '9. How can I track my referrals and commissions?',
      answer: 'Your Partner Dashboard provides real-time access to your referrals, commission status, and other partner-related activities.'
    },
    {
      question: '10. How can I contact Build Bharat Synergy Partners?',
      answer: 'You can reach our support team through the Contact Us page, email, or WhatsApp for any assistance regarding your partnership.'
    }
  ];
 
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FBF8F2] border-t border-b border-[#EBE6DD] text-left relative overflow-hidden">
      
      {/* Decorative Radial Ambient Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#B08B54]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#B08B54] bg-[#B08B54]/10 px-3.5 py-1.5 rounded-full border border-[#B08B54]/20 shadow-xs inline-flex items-center gap-1.5 font-sans">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font tracking-tight mt-4 uppercase">
            Ecosystem FAQs
          </h2>
          <p className="text-[#6E6A61] text-sm sm:text-base mt-3 leading-relaxed font-sans max-w-xl mx-auto">
            Have questions about partnership, commissions, or membership? Read our official answers below.
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-gradient-to-r from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] border border-[#EBE6DD] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#B08B54]/40"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#B08B54]/5 transition-colors gap-3"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-[#1F1D1A] heading-font uppercase tracking-wide">
                    {item.question}
                  </span>
                  <span className={`p-1.5 rounded-full border border-[#EBE6DD] text-[#6E6A61] bg-[#FAF9F6] transition-all duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#B08B54] border-[#B08B54]/30 bg-[#B08B54]/10 shadow-xs' : ''}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
 
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[400px] border-t border-[#EBE6DD]' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-[#6E6A61] text-xs leading-relaxed font-sans font-normal whitespace-pre-line bg-[#FAF9F6]/50">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
