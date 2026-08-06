import { Search, Compass, ShieldCheck } from 'lucide-react';
 
export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Search by Need',
      desc: 'Type your requirements in natural language or browse specific B2B pillars like Solar, Real Estate, and Capital Loans.',
      supportingDesc: 'Tell us what you need — solar, loans, real estate, or training.',
      icon: <Search className="text-[#10367D]" size={20} />,
      iconBg: 'bg-[#10367D]/10 border-[#10367D]/20 text-[#10367D]',
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Get Verified Matches',
      desc: 'Our synergy platform matches your project requirements with audited, credit-verified, and licensed providers.',
      supportingDesc: 'We match you with verified, qualified partners in your region.',
      icon: <Compass className="text-[#B08B54]" size={20} />,
      iconBg: 'bg-[#B08B54]/10 border-[#B08B54]/20 text-[#B08B54]',
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Connect & Execute',
      desc: 'Collaborate directly with authorized partner representatives to close contracts and launch operations smoothly.',
      supportingDesc: 'Connect directly and start your project with confidence.',
      icon: <ShieldCheck className="text-emerald-600" size={20} />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
      badge: 'Step 3'
    }
  ];
 
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FBF8F2] border-t border-b border-[#EBE6DD] relative overflow-hidden text-left">
      
      {/* Background Ambient Glow Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#B08B54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#10367D]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Block */}
        <div className="max-w-xl mx-auto text-center mb-12 relative z-10 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#B08B54] bg-[#B08B54]/10 px-3.5 py-1.5 rounded-full border border-[#B08B54]/20 shadow-xs inline-block font-sans">
            Ecosystem Directory Flow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font leading-tight tracking-tight uppercase">
            How Verification Works
          </h2>
          <p className="text-[#6E6A61] text-sm sm:text-base leading-relaxed font-sans font-normal">
            A secure, vetted transaction flow designed to match requirements with qualified B2B partners across India.
          </p>
        </div>
 
        {/* Steps Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
          
          {/* Left Column: 3 steps stacked vertically */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F5] to-[#F5EFE6]/70 border border-[#EBE6DD] p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#B08B54]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative z-10 text-left group"
              >
                <div>
                  {/* Card Icon & Step Number */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-xs shrink-0 ${step.iconBg}`}>
                      {step.icon}
                    </div>
                    <span className="text-3xl font-extrabold font-mono bg-gradient-to-br from-[#B08B54] to-[#10367D] bg-clip-text text-transparent opacity-30 group-hover:opacity-80 transition-opacity select-none">
                      {step.num}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B08B54] bg-[#B08B54]/10 px-2 py-0.5 rounded-md border border-[#B08B54]/20 inline-block mb-1.5 font-sans">
                    {step.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-[#1F1D1A] heading-font uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-[#6E6A61] text-xs mt-1.5 leading-relaxed font-sans font-normal">
                    {step.desc}
                  </p>
                  <p className="text-[#6E6A61]/70 text-[9px] mt-2.5 font-bold uppercase tracking-wider font-sans leading-relaxed border-t border-[#EBE6DD] pt-2">
                    {step.supportingDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Floating India Map with Radial Glow */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[460px] relative z-10 select-none">
            {/* Map Radial Glow Aura */}
            <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-[#378ADD]/15 via-[#B08B54]/15 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* Floating Map Container */}
            <div className="animate-map-float z-10 relative">
              <img 
                src="/india-map-branches-blue-borders.png" 
                alt="Build Bharat India Operations Map" 
                className="w-full h-auto max-w-[560px] object-contain pointer-events-none drop-shadow-md"
              />
            </div>
            {/* Synced Depth Shadow */}
            <div className="w-72 h-3 bg-stone-900/30 rounded-full blur-[8px] mt-8 animate-shadow-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
