import React from 'react';

export function ClientMarquee() {
  const logos = [
    { src: '/build-bharat-solar.png', alt: 'BuildBharat Solar' },
    { src: '/build-bharat-loans.png', alt: 'BuildBharat Loans' },
    { src: '/build-bharat-real-estate.png', alt: 'BuildBharat Real Estate' },
    { src: '/build-bharat-education.png', alt: 'BuildBharat Education' },
    { src: '/edutech-logo.png', alt: 'EduTech' },
    { src: '/raambow-tech-logo.jpg', alt: 'Raambow Tech' },
  ];

  // Duplicate the logos once to allow seamless looping
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-[#F4F1EA] border-b border-stone-200/80 overflow-hidden relative">
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="container-custom mx-auto text-center mb-6">
        <span className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-stone-500 font-sans block select-none">
          Trusted by businesses across Andhra Pradesh
        </span>
      </div>

      <div 
        className="relative w-full overflow-hidden py-4"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
        }}
      >
        <div className="marquee-container flex gap-6 px-3">
          {marqueeLogos.map((logo, idx) => (
            <div 
              key={idx}
              className="w-[220px] h-[90px] bg-white rounded-[14px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-stone-150 flex items-center justify-center p-5 flex-shrink-0 transition-all duration-350 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] group cursor-pointer"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-full max-w-full object-contain transition-all duration-350" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
