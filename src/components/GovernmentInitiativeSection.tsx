import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Zap, Banknote, ShieldCheck, BadgeCheck, ArrowUpRight } from 'lucide-react';

interface SubsidyTier {
  kw: string;
  subsidy: number;
  label: string;
}

// Data array for subsidy tiers to make it easy to update if revised
const SUBSIDY_TIERS: SubsidyTier[] = [
  { kw: "1 kW System", subsidy: 30000, label: "Direct Financial Assistance" },
  { kw: "2 kW System", subsidy: 60000, label: "Direct Financial Assistance" },
  { kw: "3 kW or Higher", subsidy: 78000, label: "Maximum Cap Assistance" }
];

// Factual figures are sourced from the official PM Surya Ghar portal (pmsuryaghar.gov.in) as of 2026.
// Note: Subsidy schemes are subject to revision by the Ministry of New and Renewable Energy (MNRE).
const CountUp: React.FC<{ target: number; duration?: number; trigger: boolean }> = ({ target, duration = 1.2, trigger }) => {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }
    if (!trigger) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [trigger, target, duration, shouldReduceMotion]);

  return <span>₹{count.toLocaleString('en-IN')}</span>;
};

export const GovernmentInitiativeSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-12 bg-gradient-to-b from-[#FBF8F2] to-[#FFFFFF] border-t-2 border-stone-200 relative overflow-hidden text-left"
    >
      {/* Saffron & Green Accent Lines at the top border */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      <div className="container-custom max-w-5xl mx-auto px-6">
        
        {/* Main Grid: Info + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Badge with subtle tricolor accent dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1F1D1A]/5 border border-[#1F1D1A]/10 rounded-full">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                <span className="w-2 h-2 rounded-full bg-stone-300" />
                <span className="w-2 h-2 rounded-full bg-[#138808]" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E6A61] font-sans">
                Government of India Initiative
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-wide leading-tight">
              PM Surya Ghar:<br />Muft Bijli Yojana
            </h2>

            {/* Intro Paragraph */}
            <p className="text-[#6E6A61] text-base leading-relaxed font-sans">
              Launched in February 2024 by the Government of India, this is the country's flagship rooftop solar scheme, aiming to bring solar power to one crore (10 million) households. It provides direct financial subsidy plus up to 300 units of free electricity every month through net metering.
            </p>

            {/* Highlights Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { text: "Up to 300 units free electricity/month", icon: <Zap size={16} className="text-[#FF9933]" /> },
                { text: "Subsidy paid directly to bank account", icon: <Banknote size={16} className="text-[#138808]" /> },
                { text: "Collateral-free loans at concessional rates", icon: <ShieldCheck size={16} className="text-[#B08B54]" /> },
                { text: "MNRE-approved vendor network access", icon: <BadgeCheck size={16} className="text-[#B08B54]" /> }
              ].map((chip, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-white border border-[#EBE6DD] rounded-xl shadow-sm hover:border-[#B08B54]/40 transition-colors"
                >
                  <span className="shrink-0">{chip.icon}</span>
                  <span className="text-[#1F1D1A] text-xs font-semibold font-sans">{chip.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="https://pmsuryaghar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#B08B54] hover:bg-[#1F1D1A] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Learn More on Official Portal</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

          {/* Strong Visual Image panel */}
          <div className="lg:col-span-5">
            <div className="relative border border-[#EBE6DD] p-2 bg-[#FFFFFF] rounded-2xl shadow-xl overflow-hidden group">
              <img 
                src="/pm-surya-ghar.png" 
                alt="PM Surya Ghar Rooftop Solar Installation in India"
                className="w-full h-80 object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-[10px] font-bold uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-lg inline-block w-fit backdrop-blur-sm">
                Swadeshi Solar Energy Scheme
              </div>
            </div>
          </div>

        </div>

        {/* Subsidy Tiers Grid Section */}
        <div className="border-t border-[#EBE6DD] pt-12">
          <div className="text-center mb-10">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#B08B54] subheading-font mb-2">
              National Subsidy Matrix
            </h3>
            <p className="text-xs text-[#6E6A61] font-sans">
              Direct Benefit Transfer (DBT) subsidy matrix for residential installations
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {SUBSIDY_TIERS.map((tier, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="bg-white border border-[#EBE6DD] p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#B08B54]/40 transition-all text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E6A61] block mb-2 font-sans">
                    {tier.kw}
                  </span>
                  <h4 className="text-3xl font-extrabold text-[#1F1D1A] font-sans tracking-tight mb-2">
                    <CountUp target={tier.subsidy} trigger={isInView} />
                  </h4>
                </div>
                <div className="border-t border-[#EBE6DD] pt-3 mt-4">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#B08B54] block">
                    {tier.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default GovernmentInitiativeSection;
