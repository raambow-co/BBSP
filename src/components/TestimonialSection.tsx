import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  companyName: string;
  quote: string;
  category: 'Solar' | 'Loans' | 'Real Estate' | 'EdTech';
  author: string;
  role: string;
}

export function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      companyName: 'Surya Vamsi Infrastructure',
      quote: 'BuildBharat Solar enabled us to install 2.5 MWp rooftop panels on our logistics park in Hyderabad. The 0% down financing through BuildBharat Loans made the transition financially seamless.',
      category: 'Solar',
      author: 'Surya Vamsi',
      role: 'MD & Founder'
    },
    {
      companyName: 'Capital Green Realty',
      quote: 'Securing project debt financing for our LEED-certified residential gated communities was fast and transparent. We managed to close ₹24 Cr credit line in record time.',
      category: 'Loans',
      author: 'R. K. Sharma',
      role: 'Finance Director'
    },
    {
      companyName: 'RaambowTech Corp',
      quote: 'We sourced 45 verified software engineer interns from the EduTech skill cohorts. Every student possessed solid technical capability and went straight into active production roles.',
      category: 'EdTech',
      author: 'D Sudheer Reddy',
      role: 'Technology Operations Lead'
    },
    {
      companyName: 'Vanguard Infra Developers',
      quote: 'BuildBharat Real Estate helped us aggregate 18 acres of prime commercial land in the Bengaluru-Hubli corridor. Transparent title verification saved us months of due diligence.',
      category: 'Real Estate',
      author: 'Vikramaditya Rao',
      role: 'Chief Investment Officer'
    },
    {
      companyName: 'Apex Clean Energy Ltd',
      quote: 'We commissioned 12 industrial solar microgrids across AP and Telangana seamlessly. BuildBharat provided vetted vendors and complete turnkey subsidies execution.',
      category: 'Solar',
      author: 'Ananya Deshmukh',
      role: 'Head of Renewable Projects'
    }
  ];

  const categoryThemes = {
    Solar: 'border-[#B08B54]/40 text-[#B08B54] bg-[#B08B54]/10',
    Loans: 'border-[#10367D]/40 text-[#10367D] bg-[#10367D]/10',
    'Real Estate': 'border-[#B08B54]/40 text-[#B08B54] bg-[#B08B54]/10',
    EdTech: 'border-[#10367D]/40 text-[#10367D] bg-[#10367D]/10'
  };

  // Duplicate for seamless infinite continuous scroll
  const continuousTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gradient-to-b from-[#FBF8F2] via-[#FAF6EE] to-[#F5EFE6] border-t border-b border-[#EBE6DD] text-left relative overflow-hidden">
      <style>{`
        @keyframes testimonial-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .testimonial-marquee-track {
          display: flex;
          width: max-content;
          animation: testimonial-marquee 35s linear infinite;
        }
        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Decorative Background Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B08B54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#10367D]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#B08B54] bg-[#B08B54]/10 px-3.5 py-1.5 rounded-full border border-[#B08B54]/20 shadow-xs inline-block font-sans">
            Ecosystem Impact
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font tracking-tight mt-4 uppercase">
            Ecosystem Success Stories
          </h2>
          <p className="text-[#6E6A61] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            See how corporate entities and developers are scaling their operations through BuildBharat.
          </p>
        </div>

      </div>

      {/* Continuous Automatic Infinite Marquee Track */}
      <div 
        className="relative w-full overflow-hidden py-2 z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
        }}
      >
        <div className="testimonial-marquee-track flex gap-6 px-4">
          {continuousTestimonials.map((t, idx) => (
            <div 
              key={`${t.companyName}-${idx}`} 
              className="w-[310px] sm:w-[360px] flex-shrink-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F5] to-[#F5EFE6]/70 border border-[#EBE6DD] p-7 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#B08B54]/50 transition-all duration-350 flex flex-col justify-between relative group cursor-pointer"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-2xs font-sans ${categoryThemes[t.category]}`}>
                    {t.category}
                  </span>
                  <div className="p-2 rounded-xl bg-[#B08B54]/10 border border-[#B08B54]/20 text-[#B08B54]">
                    <Quote size={18} />
                  </div>
                </div>

                <p className="text-[#1F1D1A]/85 text-xs sm:text-sm italic leading-relaxed font-sans font-normal pt-1">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#EBE6DD] flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B08B54]/20 to-[#10367D]/20 flex items-center justify-center font-extrabold text-sm text-[#B08B54] border border-[#B08B54]/30 shadow-xs shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-extrabold text-xs uppercase text-[#1F1D1A] heading-font tracking-wide truncate">
                    {t.author}
                  </h4>
                  <span className="text-[9px] text-[#6E6A61] uppercase tracking-widest block font-sans font-semibold mt-0.5 truncate">
                    {t.role}, {t.companyName}
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Gold Highlight Line on Hover */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#B08B54]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
