"use client"

import React from "react"
import { ArrowUpRight } from "lucide-react"
import { REGIONAL_HUBS } from "../data/ecosystemData"

const features = [
  {
    id: "solar",
    name: "BuildBharat Solar",
    logo: "/build-bharat-solar.png",
    description: "Industrial solar installations and clean renewable energy grid integration for commercial developers.",
    stat: "",
    href: "/solar",
    cta: "Explore BuildBharat Solar",
  },
  {
    id: "loans",
    name: "BuildBharat Loans",
    logo: "/build-bharat-loans.png",
    description: "Structured corporate financing, project debt placement, and working capital lines for expanding MSMEs.",
    stat: "",
    href: "/loans",
    cta: "Explore BuildBharat Loans",
  },
  {
    id: "about",
    name: "Build Bharat",
    logo: "/build-bharat-logo.png",
    description: "India's premier multi-brand B2B partnership platform. We align sustainable infrastructure, corporate capital solutions, prime real estate developments, and industrial skill training under one unified verification framework.",
    stat: "",
    href: "/about",
    cta: "Explore Build Bharat",
  },
  {
    id: "real-estate",
    name: "BuildBharat Real Estate",
    logo: "/build-bharat-real-estate.png",
    description: "Strategic commercial developments, Grade-A IT parks, and logistics warehouses across economic growth corridors.",
    stat: "",
    href: "/real-estate",
    cta: "Explore BuildBharat Real Estate",
  },
  {
    id: "education",
    name: "EduTech",
    logo: "/edutech-logo.png",
    description: "High-value industrial training bootcamps, talent pipeline development, and tech career certifications.",
    stat: "",
    href: "/education",
    cta: "Explore EduTech",
  },
]

interface BuildBharatEcosystemProps {
  activeRegionFilter?: string | null;
  onClearRegionFilter?: () => void;
}

export function BuildBharatEcosystem({
  activeRegionFilter = null,
  onClearRegionFilter
}: BuildBharatEcosystemProps) {
  const selectedHub = activeRegionFilter ? REGIONAL_HUBS.find(h => h.id === activeRegionFilter) : null;
  
  // Filter features: if region filter is active, only show the ones operating in that state.
  const filteredFeatures = selectedHub
    ? features.filter(f => f.id !== "about" && selectedHub.pillarsActive.includes(f.id))
    : features;

  // Duplicate cards for seamless continuous infinite looping
  const continuousFeatures = [...filteredFeatures, ...filteredFeatures];

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      const popStateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popStateEvent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="pathways" className="w-full bg-[#eeeeec] py-20 text-left overflow-hidden relative">
      <style>{`
        @keyframes ecosystem-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ecosystem-marquee-track {
          display: flex;
          width: max-content;
          animation: ecosystem-marquee 32s linear infinite;
        }
        .ecosystem-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto px-6 mb-12">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1e3a6b] font-bold font-sans mb-3">
            The Build Bharat ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-[#1e3a6b] heading-font uppercase mb-4">
            One vision.<br />
            Four directions.
          </h2>
          <p className="text-[#5c6b80] text-sm leading-relaxed max-w-[520px]">
            India's premier multi-brand B2B partnership platform, aligning sustainable infrastructure, corporate capital, prime real estate and industrial skill training under one verification framework.
          </p>

          {/* Active Region Filter Badge */}
          {selectedHub && (
            <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#1e3a6b]/5 border border-[#1e3a6b]/10 rounded-full shadow-sm">
              <span className="text-[11px] text-stone-700 font-medium">
                Active in <strong className="text-[#1e3a6b]">{selectedHub.state}</strong>
              </span>
              <button
                onClick={onClearRegionFilter}
                className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#f0a951] text-[#3a2205] rounded hover:bg-[#f0a951]/90 cursor-pointer transition-colors border-none"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Continuous Infinite Auto-Scrolling Track */}
      <div 
        className="relative w-full overflow-hidden py-2"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)',
        }}
      >
        <div className="ecosystem-marquee-track flex gap-5 px-4">
          {continuousFeatures.map((card, idx) => (
            <a
              key={`${card.id}-${idx}`}
              href={card.href}
              onClick={(e) => handleCardClick(e, card.href)}
              className="group flex flex-col justify-between p-7 rounded-[14px] bg-gradient-to-br from-[#16305c] to-[#1f4fa0] border border-white/5 shadow-md transition-all duration-350 hover:-translate-y-1 hover:shadow-xl w-[310px] sm:w-[350px] flex-shrink-0 text-left no-underline cursor-pointer"
            >
              <div>
                {/* White Logo Badge (64x64px) */}
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 mb-5 group-hover:scale-[1.03] transition-transform duration-300 shadow-sm">
                  <img 
                    src={card.logo} 
                    alt={card.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-white font-extrabold text-lg heading-font uppercase tracking-wide mb-2">
                  {card.name}
                </h3>

                {/* Body Text */}
                <p className="text-[#cdd9ec] text-xs sm:text-[13px] leading-relaxed mb-4 font-sans font-normal">
                  {card.description}
                </p>

                {/* Translucent Stat Pill */}
                {card.stat && (
                  <span className="inline-block text-[10px] font-bold text-white px-2.5 py-1 bg-white/12 rounded-full uppercase tracking-wider select-none mb-4 font-sans">
                    {card.stat}
                  </span>
                )}
              </div>

              {/* Bottom Explore Link */}
              <div className="flex items-center gap-1.5 text-white font-semibold text-xs group-hover:underline pt-2 border-t border-white/10">
                <span>{card.cta}</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#f0a951]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
