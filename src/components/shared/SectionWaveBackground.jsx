import React from 'react';

export default function SectionWaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -bottom-24 -right-[18%] w-[130%] min-w-[58rem] text-[#e7f5ea] ">
        <svg viewBox="0 0 1440 600" className="w-full h-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,450 C300,550 500,200 900,300 C1200,400 1440,50 1440,50 L1440,600 L0,600 Z" />
        </svg>
      </div>
      <div className="absolute -bottom-16 -right-[10%] w-[120%] min-w-[54rem] text-primary/10 ">
        <svg viewBox="0 0 1440 600" className="w-full h-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,500 C400,600 600,100 1000,250 C1300,350 1440,150 1440,150 L1440,600 L0,600 Z" />
        </svg>
      </div>
    </div>
  );
}
