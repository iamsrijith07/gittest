import { motion } from "framer-motion";

const steps = [
  { k: "01", t: "Discover", s: "Audit", d: "Deep dive into your business, market, funnel, and competitors. Find the leak; find the lever." },
  { k: "02", t: "Map", s: "Strategy", d: "Translate insight into a 90-day roadmap with channels, content, and milestones." },
  { k: "03", t: "Build", s: "Execution", d: "Ship the website, campaigns, content, and tracking — fast and to a high bar." },
  { k: "04", t: "Scale", s: "Optimization", d: "Measure weekly. Double down on what compounds. Cut what doesn't. Repeat." },
];

export function Process() {
  return (
    <section 
      id="process" 
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF, #F0F8F3 60%, #FFFFFF)" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold mb-4">A four-act journey from audit to scale.</h2>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative w-full">
          
          {/* SVG Path */}
          <svg 
            className="w-full h-auto" 
            viewBox="0 0 1000 250" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 125,124 C 245,124 255,28 375,28 C 500,28 500,220 625,220 C 750,220 750,92 875,92" 
              stroke="#94a3b8" 
              strokeWidth="3" 
              strokeDasharray="10 10" 
              fill="none"
            />
          </svg>

          {/* Absolute Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-4 w-full h-full pointer-events-none">
            {steps.map((st, i) => {
              // Alternating logic: Even index (0,2) top, Odd index (1,3) bottom
              const isTop = i % 2 === 0;
              
              return (
                <div key={st.k} className="relative flex flex-col items-center justify-center pointer-events-auto">
                  
                  {/* Text Container */}
                  <div className={`absolute w-full px-4 text-center ${isTop ? "bottom-[60%]" : "top-[60%]"}`}>
                    <div className="text-2xl font-semibold text-slate-800">{st.t}</div>
                    <div className="text-sm uppercase tracking-widest text-slate-500 mb-2">{st.s}</div>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-[200px] mx-auto">{st.d}</p>
                  </div>

                  {/* Node Badge */}
                  <div className="w-14 h-14 rounded-full bg-[#3d5a73] flex items-center justify-center border-[6px] border-[#F2F9F5] shadow-lg">
                    <span className="text-white text-lg font-bold">{st.k}</span>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}